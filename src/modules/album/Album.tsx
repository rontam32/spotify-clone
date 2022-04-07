import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useHeader from "../../hooks/use-header";
import api from "../../utils/api";
import { AlbumType } from "../../models/Album";
import AlbumTopInfoSection from "../../components/containers/album-top-info-section/AlbumTopInfoSection";
import ActionBar from "../../components/containers/action-bar/ActionBar";
import TrackDataGrid from "../../components/data-tables/track-data-grid/TrackDataGrid";
import { Artist } from "../../models/Artist";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { TableHeader } from "../../models/Application";
import { Item } from "../../models/Common";
import { convertMilliSecToDisplayTime } from "../../utils";
import classes from "./Album.module.scss";
import FavoriteButton from '../../components/common/buttons/favorite-button/FavoriteButton';
import { SnackbarContext } from "../../contexts";
import TrackTable from "../../contexts/DataGridContext";

const Album = () => {
  const [details, setDetails] =
    useState<{
      albumDetail: AlbumType.AlbumDetail;
      artistsDetail: Artist.ArtistDetail[];
    }>();
  const [isAlbumSaved, setIsAlbumSaved] = useState<boolean>(false);
  const params = useParams();
  const albumId = params.albumId;
  useHeader();
  const snackBarHandler = useContext(SnackbarContext).openSnackBar;

  const tableHeaders: TableHeader[] = [
    {
      key: "name",
      name: "Album",
      rowTemplate: (item: Item, currentTrackId) => {
        return (
          <div className={classes["name-col"]}>
            <div
              className={
                item.id === currentTrackId
                  ? `${classes.name} ${classes.playing}`
                  : classes.name
              }
            >
              {item.name}
            </div>
            <div className={classes.artist}>
              {item.explicit && <span className={classes.explicity}>E</span>}
              <span>
                {item.artists.map((artist, index) => {
                  if (index !== item.artists.length - 1) {
                    return (
                      <>
                        <Link
                          className={classes["artist-name"]}
                          to={`/artist/${artist.id}`}
                        >
                          {artist.name}
                        </Link>
                        {`, `}
                      </>
                    );
                  }
                  return (
                    <Link
                      className={classes["artist-name"]}
                      to={`/artist/${artist.id}`}
                    >
                      {artist.name}
                    </Link>
                  );
                })}
              </span>
            </div>
          </div>
        );
      },
    },
    {
      key: 'favorite',
      favButtonTemplate: (buttonCss: string, currentTrackId?: string, isTracksSaved?: boolean) => {
        const saveTrackHandler = async (isSave: boolean) => {
          isSave ? await api.put(`/me/tracks/?ids=${currentTrackId}`, {}) : await api.delete(`/me/tracks/?ids=${currentTrackId}`, {});
          isSave ? snackBarHandler('Saved to Your Liked Songs', 'save_track') : snackBarHandler('Removed from Your Liked Songs', 'remove_track');;
        }
        return <FavoriteButton
        cssClass={buttonCss}
        favoriteHandler={() => {saveTrackHandler(true)}}
        unfavoriteHandler={() => {saveTrackHandler(false)}}
        isCurrentlyFavorited={isTracksSaved}
        />
      },
      name: '',
      cellProps: { align: "right" }
    },
    {
      key: "duration_ms",
      name: () => {
        return (
          <AccessTimeIcon
          style={{
            height: 16,
            width: 16,
          }}
        />
        );
      },
      rowTemplate: (item: Item) => {
        const { min, sec } = convertMilliSecToDisplayTime(item.duration_ms);
        return (
          <>
            <div className="default-table-cell">{`${min}:${sec}`}</div>
          </>
        );
      },
      cellProps: { align: "right", width: 40 },
    },
  ];

  const favoriteHandler = (isFavoriteSelected: boolean) => {
    const saveAlbum = async () => {

        if (details?.albumDetail) {
            const url = `/me/albums?ids=${details?.albumDetail.id}`;

            if (isFavoriteSelected) {
                await api.put(url, {}); 
                snackBarHandler('Saved to Your Library', 'save_album');  
            } else {
                await api.delete(url, {});
                snackBarHandler('Removed from Your Library', 'remove_album');
            }
        }
    }
    saveAlbum();
}

  useEffect(() => {
    const getAlbumDetail = async () => {
      const albumDetailResponse = await api.get(`/albums/${albumId}`, {});

      let artistsDetailResponses: Artist.ArtistDetail[];
      if (albumDetailResponse.artists.length > 0) {
        artistsDetailResponses = await Promise.all(
          albumDetailResponse.artists.map(async (artist: any) => {
            const res = await api.get(`/artists/${artist.id}`, {});
            return res;
          })
        );

        setDetails({
          albumDetail: albumDetailResponse,
          artistsDetail: artistsDetailResponses,
        });
      }
    };

    getAlbumDetail();
  }, []);

  useEffect(() => {
    const checkSavedAlbum = async () => {
        if (details?.albumDetail) {
            const response: boolean[] = await api.get(`/me/albums/contains?ids=${details.albumDetail.id}`, {});
            setIsAlbumSaved(response[0]);
        }
    }

    checkSavedAlbum();
}, [details?.albumDetail]);

  return (
    <>
      <AlbumTopInfoSection
        albumDetail={details?.albumDetail}
        artistsDetail={details?.artistsDetail}
      />
      {details?.albumDetail && <ActionBar categoryDetail={details.albumDetail} checkIsCategorySaved={isAlbumSaved} favoriteHandler={favoriteHandler}/>}
      <div className={classes["table-container"]}>
        <TrackTable tableConfig={{
          rows: details?.albumDetail?.tracks.items || [],
          headers: tableHeaders,
          categoryUri: details?.albumDetail?.uri || "",
          categoryDetail: details?.albumDetail
        }}/>
      </div>
    </>
  );
};

export default Album;
