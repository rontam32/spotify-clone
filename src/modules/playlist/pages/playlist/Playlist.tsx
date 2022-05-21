import { useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import PlaylistTopInfoSection from "../../../../components/containers/playlist-top-info-section/PlaylistTopInfoSection";
import ActionBar from "../../../../components/containers/action-bar/ActionBar";
import { followUnfollowPlaylist } from "../../../../redux/playlist/playlist-slice";
import { useAppDispatch } from "../../../../redux/store";
import { useSelector } from "react-redux";
import { SnackbarContext } from "../../../../contexts";
import useHeader from "../../../../hooks/use-header";
import classes from "./Playlist.module.scss";
import TrackTable from "../../../../contexts/DataGridContext";
import { PLAYLIST_TABLE_HEADER } from "../../Playlist.constant";
import { getPlaylistDetail, getPlaylistTracks, checkSavedPlaylist } from "../../async-thunks/playlistAsyncThunk";

const Playlist = () => {
  const params = useParams();
  const playlistId = params.playlistId;
  const location = useLocation();
  const isLikedSongs = location.pathname.includes('tracks') && !playlistId;
  const dispatch = useAppDispatch();
  useHeader();
  const snackBarHandler = useContext(SnackbarContext).openSnackBar;
  const { userProfile } = useSelector((state: any) => state.auth);
  const { playlistDetail, playlistTracks, isPlaylistSaved } = useSelector((state: any) => state['playlist-display']);
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

  useEffect(() => {
    if (playlistId) {
      dispatch(getPlaylistDetail({playlistId}));
    }
    dispatch(getPlaylistTracks({playlistId, isLikedSongs}));

  }, [playlistId, isLikedSongs]);

  useEffect(() => {
    if (playlistDetail && userProfile.id) {
      dispatch(checkSavedPlaylist({playlistDetailId: playlistDetail.id, userProfileId: userProfile.id}))
    }
  }, [playlistDetail, userProfile.id]);

  return (
    <>
      <PlaylistTopInfoSection
          playlistDetail={playlistDetail}
          playlistTracks={playlistTracks}
      ></PlaylistTopInfoSection>
      {playlistDetail && (
        <ActionBar
          favoriteHandler={favoriteHandler}
          categoryDetail={playlistDetail}
          checkIsCategorySaved={isPlaylistSaved}
          albumDetail={playlistTracks[0]?.album}
          albumTrackNumber={playlistTracks[0]?.track_number || ''}
        />
      )}

      <div className={classes["table-container"]}>

        <TrackTable tableConfig={{
          rows: playlistTracks || [],
          headers: PLAYLIST_TABLE_HEADER(snackBarHandler),
          categoryUri: playlistDetail?.uri || "",
          categoryDetail: playlistDetail,
          isLikedSongs,
          isSearchResultOrLikedSongs: true
        }}/>
      </div>
    </>
  );
};

export default Playlist;
