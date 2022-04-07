import { GenericProps } from "../../../models/Application";
import classes from "./TopInfoSectionWrapper.module.scss";
import { AlbumType } from "../../../models/Album";
import { GenericPlaylist } from "../../../models/Playlist";

interface TopInfoSectionWrapperProps {
  detail?: {
    images: {url: string}[],
    album_type?: string;
    type?: string;
    name: string;
  };
}

const DEFAULT_DETAIL = {
  images: [{
    url: `${window.location.origin}/liked-song.png`,
  }],
  album_type: 'playlist',
  name: 'Liked Songs'
}

const TopInfoSectionWrapper = ({
  detail = DEFAULT_DETAIL,
  children,
}: GenericProps<TopInfoSectionWrapperProps>) => {
  return (
    <>
      <div className={classes["main-wrapper"]}>
        <div className={classes["top-section-container"]}>
          <div className={classes["album-image"]}>
            <img src={detail.images[0].url} alt="playlist img"></img>
          </div>
          <div className={classes["album-info"]}>
            {detail && (
              <>
                <div className={classes["type"]}>
                  {detail.album_type?.toUpperCase() ||
                    detail.type?.toUpperCase()}
                </div>
                <div className={classes.name}>{detail.name}</div>
                {children}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TopInfoSectionWrapper;
