import { TableHeader } from "../../models/Application";
import { Track } from "../../models/Common";
import classes from "./pages/playlist/Playlist.module.scss";
import { Link } from "react-router-dom";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { convertMilliSecToDisplayTime } from "../../utils";
import moment from 'moment';
import api from "../../utils/api";
import FavoriteButton from "../../components/common/buttons/favorite-button/FavoriteButton";

export const PLAYLIST_TABLE_HEADER: (snackBarHandler: (id: string, message: string) => void) => TableHeader[] = (snackBarHandler: (id: string, message: string) => void) => {
    return [
        {
          key: "name",
          name: "Title",
          rowTemplate: (track: Track, currentTrackId) => {
            return (
              <div className={classes['title']}>
                <div className={classes['album-image']}>
                  <img src={track.album.images[0].url}></img>
                </div>
                <div className={`${classes["name-col"]} w-fit flex-1 whitespace-nowrap overflow-hidden`}>
                  <div
                    className={
                      `${track.id === currentTrackId
                        ? `${classes.name} ${classes.playing}`
                        : classes.name} overflow-hidden text-ellipsis`
                    }
                  >
                    {track.name}
                  </div>
                  <div className={classes.artist}>
                    <span>
                      {track.artists.map((artist, index) => {
                        if (index !== track.artists.length - 1) {
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
              </div>
            );
          },
          cellProps: { sx : {
            width: '30%'
          }},
        },
        {
          key: 'album',
          name: 'Album',
          rowTemplate: (track: Track) => {
            return (
              <div className="default-table-cell overflow-hidden text-ellipsis whitespace-nowrap">{track.album.name}</div>
            );
          },
          cellProps: { sx : {
            width: '25%',
            maxWidth: '200px'
          }},
        },
        {
          key: 'date_added',
          name: 'Date Added',
          rowTemplate: (track: Track) => {
            return (
              <div className="default-table-cell ">{moment(track.added_at).format('ll')}</div>
            );
          }
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
          rowTemplate: (item: Track) => {
            const { min, sec } = convertMilliSecToDisplayTime(item.duration_ms);
            return (
              <>
                <div className="default-table-cell">{`${min}:${sec}`}</div>
              </>
            );
          },
          cellProps: { align: "right", width: 40 },
        },
      ]
};