import { GenericProps } from "../../../models/Application";
import { Track } from "../../../models/Common";
import TopInfoSectionWrapper from "../../wrapper/top-info-section-wrapper/TopInfoSectionWrapper";
import classes from "./PlaylistTopInfoSection.module.scss";
import { Link } from "react-router-dom";
import { Fragment } from "react";
import { GenericPlaylist } from "../../../models/Playlist";
import { convertMilliSecToDisplayTime } from "../../../utils";
import { useSelector } from "react-redux";
import { isEqual } from "lodash";
import { Avatar } from "@mui/material";

interface PlaylistTopInfoSectionProps {
  playlistDetail?: GenericPlaylist.PlaylistDetail;
  playlistTracks?: Track[];
}

const PlaylistTopInfoSection = ({
  playlistDetail,
  playlistTracks = [],
}: GenericProps<PlaylistTopInfoSectionProps>) => {
  const {userProfile} = useSelector((state: any) => state.auth, isEqual);

  if (playlistDetail) {
    let totalAlbumDurationInMin = "0";
  let totalAlbumDurationInSec = "00";
  let totalAlbumDurationInHour = "0";
  let artistsInfo;
  const artists = playlistTracks.map((track) => {
    return track.artists[0];
  });

  if (playlistTracks.length) {
    const totalAlbumDurationInMilliSec =
      playlistTracks
        .map((item) => {
          return item.duration_ms;
        })
        .reduce((prev, current) => {
          return prev + current;
        }, 0) || 0;

    const { min, sec, hour } = convertMilliSecToDisplayTime(
      totalAlbumDurationInMilliSec
    );
    totalAlbumDurationInMin = min;
    totalAlbumDurationInSec = sec;
    totalAlbumDurationInHour = hour;
  }

  if (artists.length > 3) {
    artistsInfo = (
      <div className={classes.artists}>
        {artists.slice(0, 3).map((artist) => {
          return (
            <Fragment key={artist.id}>
              <Link className={classes.name} to={`/artist/${artist.id}`}>
                {artist.name}
              </Link>
              ,&nbsp;
            </Fragment>
          );
        })}
        and more
      </div>
    );
  }
  return (
    <TopInfoSectionWrapper detail={playlistDetail}>
    {artistsInfo}
    <div className={classes.info}>
      <Link
        className={`${classes["info-cell"]} ${classes["user-info"]}`}
        to={`/user/${playlistDetail?.owner.id}`}
      >
        {playlistDetail?.owner.display_name}
      </Link>
      <span className={classes["info-cell"]}>
        {playlistDetail?.followers.total}{" "}
        {playlistDetail?.followers.total || 0 > 1 ? "likes" : "like"}
      </span>
      <span className={classes["info-cell"]}>
        {playlistDetail?.tracks.total} songs
      </span>
      <span className={classes["info-cell"]}>
        about{" "}
        {totalAlbumDurationInHour === "0"
          ? `${totalAlbumDurationInMin} min ${totalAlbumDurationInSec} sec`
          : `${totalAlbumDurationInHour} hr ${totalAlbumDurationInMin} min`}
      </span>
    </div>
  </TopInfoSectionWrapper>
  );
  }

  const imageSrc = userProfile?.images[0].url;
  return (
    <TopInfoSectionWrapper>
    <div className={classes.info}>
      <Link
        className={`${classes["info-cell"]} ${classes["user-info"]} ${classes["liked-song"]}`}
        to={`/user/${userProfile.id}`}
      >
        <Avatar src={imageSrc} className={classes.avatar} />
        <span>{userProfile?.display_name}</span>
      </Link>
      {/* <span className={classes["info-cell"]}>
        {playlistDetail?.tracks.total} songs
      </span> */}
    </div>
  </TopInfoSectionWrapper>
  );
};

export default PlaylistTopInfoSection;
