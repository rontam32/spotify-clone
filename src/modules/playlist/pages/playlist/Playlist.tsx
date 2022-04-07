import { useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import PlaylistTopInfoSection from "../../../../components/containers/playlist-top-info-section/PlaylistTopInfoSection";
import ActionBar from "../../../../components/containers/action-bar/ActionBar";
import { Track } from "../../../../models/Common";
import { GenericPlaylist } from "../../../../models/Playlist";
import api from "../../../../utils/api";
import { followUnfollowPlaylist } from "../../../../redux/playlist/playlist-slice";
import { useAppDispatch } from "../../../../redux/store";
import { useSelector } from "react-redux";
import { SnackbarContext } from "../../../../contexts";
import useHeader from "../../../../hooks/use-header";
import classes from "./Playlist.module.scss";
import TrackTable from "../../../../contexts/DataGridContext";
import { PLAYLIST_TABLE_HEADER } from "../../Playlist.constant";

const Playlist = () => {
  const params = useParams();
  const location = useLocation();
  const isLikedSongs = location.pathname.includes('tracks');

  const [isPlaylistSaved, setIsPlaylistSaved] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  useHeader();
  const snackBarHandler = useContext(SnackbarContext).openSnackBar;
  const { userProfile } = useSelector((state: any) => state.auth);
  // const { playlistResponse } = useSelector((state: any) => state['playlist-display']);
  const playlistId = params.playlistId;
  const favoriteHandler = async (isFavoriteSelected: boolean) => {
    if (playlistId) {
      await dispatch(
        followUnfollowPlaylist({
          playlistId,
          follow: isFavoriteSelected,
        })
      );
      if (isFavoriteSelected) {
        snackBarHandler("Saved to Your Library", "save_album");
      } else {
        snackBarHandler("Removed from Your Library", "remove_album");
      }
    }
  };
  const [detail, setDetail] = useState<{
      playlistDetail: GenericPlaylist.PlaylistDetail;
      playlistTracks: Track[];
    }>();

  useEffect(() => {
    const getDetail = async () => {
      const playlistDetailResponse = !isLikedSongs ? await api.get(
        `/playlists/${playlistId}`,
        {}
      ) : null;
      const playlistTracksResponse = await api.get(
        !isLikedSongs ? `/playlists/${playlistId}/tracks` : '/me/tracks',
        {
          offset: 0,
          limit: isLikedSongs ? 50 : 100,
        }
      );

      setDetail({
        playlistDetail: playlistDetailResponse,
        playlistTracks: playlistTracksResponse.items.map((item: any) => {
          const track = {...item.track};
          track.added_at = item.added_at;
          return track;
        }) as Track[],
      });
    };

    getDetail();
  }, [playlistId, isLikedSongs]);

  useEffect(() => {
    const checkSavedPlaylist = async () => {
      if (detail?.playlistDetail && userProfile.id) {
        const response: boolean[] = await api.get(
          `/playlists/${detail.playlistDetail.id}/followers/contains?ids=${userProfile.id}`,
          {}
        );
        setIsPlaylistSaved(response[0]);
      }
    };

    checkSavedPlaylist();
  }, [detail?.playlistDetail, userProfile.id]);

  return (
    <>
      <PlaylistTopInfoSection
          playlistDetail={detail?.playlistDetail}
          playlistTracks={detail?.playlistTracks}
      ></PlaylistTopInfoSection>
      {detail && (
        <ActionBar
          favoriteHandler={favoriteHandler}
          categoryDetail={detail.playlistDetail}
          checkIsCategorySaved={isPlaylistSaved}
          albumDetail={detail.playlistTracks[0].album}
          albumTrackNumber={detail.playlistTracks[0].track_number}
        />
      )}

      <div className={classes["table-container"]}>

        <TrackTable tableConfig={{
          rows: detail?.playlistTracks || [],
          headers: PLAYLIST_TABLE_HEADER(snackBarHandler),
          categoryUri: detail?.playlistDetail?.uri || "",
          categoryDetail: detail?.playlistDetail,
          isLikedSongs,
          isSearchResultOrLikedSongs: true
        }}/>
      </div>
    </>
  );
};

export default Playlist;
