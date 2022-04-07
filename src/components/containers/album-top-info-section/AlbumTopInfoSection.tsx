import classes from "./AlbumTopInfoSection.module.scss";
import { AlbumType } from "../../../models/Album";
import { Artist } from "../../../models/Artist";
import { Link } from "react-router-dom";
import { convertMilliSecToDisplayTime } from "../../../utils";
import { GenericProps } from "../../../models/Application";
import TopInfoSectionWrapper from '../../wrapper/top-info-section-wrapper/TopInfoSectionWrapper';
interface AlbumTopInfoSectionProps {
  albumDetail?: AlbumType.AlbumDetail;
  artistsDetail?: Artist.ArtistDetail[];
}

const AlbumTopInfoSection = ({
  artistsDetail,
  albumDetail,
}: GenericProps<AlbumTopInfoSectionProps>) => {
  let totalAlbumDurationInMin = "0";
  let totalAlbumDurationInSec = "00";

  if (albumDetail) {
    const totalAlbumDurationInMilliSec =
      albumDetail?.tracks.items
        .map((item) => {
          return item.duration_ms;
        })
        .reduce((prev, current) => {
          return prev + current;
        }, 0) || 0;

    const { min, sec } = convertMilliSecToDisplayTime(
      totalAlbumDurationInMilliSec
    );
    totalAlbumDurationInMin = min;
    totalAlbumDurationInSec = sec;
  }

  let artistsInfo;

  if (artistsDetail) {
    if (artistsDetail.length > 1) {
      artistsInfo = <span style={{ color: '#fff'}}>Various Artists</span>;
    } else if (artistsDetail.length === 1) {
      artistsInfo = (
        <span>
          <img src={artistsDetail[0].images[2].url || ""}></img>
          <Link to="/artist">{artistsDetail[0].name || ""}</Link>
        </span>
      );
    }
  }

  return (
    <TopInfoSectionWrapper detail={albumDetail}>
      <div className={classes["artist-info"]}>
            {artistsInfo}
            <span className={classes["extra-info"]}>
              {albumDetail?.release_date
                ? new Date(albumDetail?.release_date).getFullYear()
                : ""}
            </span>
            <span className={classes["extra-info"]}>{`${
              albumDetail?.total_tracks || ""
            } songs, `}</span>
            <span
              className={classes["extra-info"]}
            >{`${totalAlbumDurationInMin} min ${totalAlbumDurationInSec} sec`}</span>
          </div>
    </TopInfoSectionWrapper>
  );
};

export default AlbumTopInfoSection;
