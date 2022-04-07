import { TableCell, TableRow } from "@mui/material";
import PlayButton from "../../common/buttons/play-button/PlayButton";
import classes from "./TrackDataRow.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { togglePlay } from "../../../redux/playback/playback-action";
import { GenericProps } from "../../../models/Application";
import MoreOptionsButton from '../../common/buttons/more-options-button/MoreOptionsButton';
import { GenericPlaylist } from "../../../models/Playlist";
import {selectCurrentTrackId, selectPlayer, selectIsPlaying} from '../../../redux/selector';
import { useContext } from "react";
import { TrackTableContext } from "../../../contexts/DataGridContext";


interface TrackDataRowProps {
  rowIndex: number;
  row: any;
  albumUri: string;
  isTracksSaved: boolean;
  trackNumber?: number;
}

const MENUITEMS = (userPlaylists: GenericPlaylist.PlaylistDetail[]) => {
  return [
    {
      onClick: () => {},
      name: 'Add to queue',
      id: 'add_to_queue'
      },
      {
        onClick: () => {},
        name: 'Go to song radio',
        id: 'go_to_song_radio',
      },
      {
        onClick: () => {},
        name: 'Go to Artist',
        id: 'go_to_artist'
      },
      {
        onClick: () => {},
        name: 'Go to Album',
        id: 'go_to_album'
      },
      {
        onClick: () => {},
        name: 'Show credits',
        id: 'show_credits'
      },
      {
        onClick: () => {},
        name: 'Save to your Liked Songs',
        id: 'save_liked_song'
      },
      {
        onClick: () => {},
        name: 'Add to playlist',
        id: 'add_to_playlist',
        subItems: userPlaylists.map(playlist => {
          return {
            name: playlist.name,
            id: playlist.id,
            onClick: () => {}
          }
        })
      },
  ];
};

const TrackDataRow = ({
  rowIndex,
  row,
  isTracksSaved,
  trackNumber = 0,
  albumUri
}: GenericProps<TrackDataRowProps>) => {
  const {
    headers,
    isLikedSongs
  } = useContext(TrackTableContext);
  const currentTrackId = useSelector(selectCurrentTrackId);
  const isPlaying = useSelector(selectIsPlaying);
  const playlists = useSelector((state: any) => state.playlist.playlists) as GenericPlaylist.PlaylistDetail[];
  const menuItems = MENUITEMS(playlists || []);

  const player = useSelector(selectPlayer);
  const currentTrackPlaying = currentTrackId === row.id && isPlaying;

  const dispatch = useDispatch();

  const playHandler = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentTrackId === row.id) {
      player.togglePlay();
    } else {
      dispatch(togglePlay(trackNumber, albumUri, true));
    }
  };

  const pauseHandler = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(togglePlay(trackNumber, albumUri, false));
  };

  return (
    <TableRow key={rowIndex} className={classes["data-row"]}>
      <TableCell key={`index${rowIndex}`} width={20} className="default-table-cell">
        <div className={classes.index}>
          <span
            style={{ display: currentTrackPlaying ? "none" : "unset" }}
            className={currentTrackId === row.id ? classes.playing : ""}
          >
            {rowIndex + 1}
          </span>
          <PlayButton
            playHandler={playHandler}
            pauseHandler={pauseHandler}
            cssClass={classes["play-button"]}
            isCurrentTrackPlaying={currentTrackPlaying}
          />
          <img
            style={{ display: currentTrackPlaying ? "unset" : "none" }}
            className={classes.equaliser}
            src={`${window.location.origin}/equaliser-animated-green.gif`}
          />
        </div>
      </TableCell>
      {headers.map((header) => {
        if (header.key === 'favorite' && header.favButtonTemplate && !isLikedSongs) {
          return <TableCell
          {...header.cellProps}
          key={header.key + rowIndex}
        >
          {header.favButtonTemplate(classes.heart, row.id, isTracksSaved)}
        </TableCell>
        }
        if (header.rowTemplate) {
          return (
            <TableCell
              {...header.cellProps}
              key={header.key + rowIndex}
            >
              {header.rowTemplate(row, currentTrackId, isPlaying)}
            </TableCell>
          );
        }
        return (
          <TableCell
            {...header.cellProps}
            key={header.key + rowIndex}
          >
            {row[header.key]}
          </TableCell>
        );
      })}
      <TableCell width={34} key={`option${rowIndex}`}>
        <div className={classes["more-option-container"]}>
          <MoreOptionsButton menuItems={menuItems}/>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default TrackDataRow;
