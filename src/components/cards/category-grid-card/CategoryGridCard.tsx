import React, { useCallback } from "react";
import classes from "./CategoryGridCard.module.scss";
import { MediaContainer } from "./CategoryGridCard.styles";
import { Link } from "react-router-dom";
import {
  CategoryGridContents,
  GenericProps,
} from "../../../models/Application";
import PlayButton from "../../common/buttons/play-button/PlayButton";
import { useDispatch, useSelector } from "react-redux";
import { togglePlay } from "../../../redux/playback/playback-action";
import { createSelector } from "@reduxjs/toolkit";
import { cloneDeep } from "lodash";

const CategoryGridCard = ({
  name,
  description,
  artists,
  img,
  containerClickHandler,
  uri,
  isArtist,
  trackNumber = 0
}: GenericProps<CategoryGridContents>) => {
  const dispatch = useDispatch();
  const player = useSelector(createSelector((state: any) => state.playback, playback => cloneDeep(playback?.player)));
  const trackUri = useSelector(createSelector((state: any) => state.playback, playback => playback?.track?.album.uri));
  const isCurrentCategoryPlaying = useSelector(createSelector(
    createSelector((state: any) => state.playback, playback => playback?.track?.album.uri),
    createSelector((state: any) => state.playback, playback => playback?.isPlaying),
    (trackUri, isPlaying) => {
      return (trackUri === uri) && isPlaying
    }
  ));
  const clickPlayHandler = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (trackUri === uri) {
      player.togglePlay()
      return;
    }
    console.log(trackNumber, uri);
    if (uri) dispatch(togglePlay(trackNumber, uri, true));
  }, [trackUri, uri, player]);

  const pauseHandler = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    player.togglePlay();
  }, [player]);

  let artistContent;
  if (artists) {
    artistContent = artists.map((artist, index) => (
      <>
        <Link
          className={classes.artist}
          key={artist.id + index}
          to={`/artist/${artist.id}`}
        >
          {artist.name}
        </Link>
        {index !== artists!.length - 1 ? ", " : ""}
      </>
    ));
  }
  return (
    <MediaContainer className={classes.card} onClick={containerClickHandler}>
      <div className={classes["inner-card-container"]}>
        <div className={classes["image-wrapper"]}>
          <div className={classes["image"]} style={{
            backgroundImage: `url(${img})`,
            borderRadius: isArtist ? '50%' : 'unset'
          }}></div>
          <div className={classes["button-container"]}>
            {uri && <PlayButton
              pauseHandler={pauseHandler}
              playHandler={clickPlayHandler}
              isCurrentTrackPlaying={isCurrentCategoryPlaying}
            />}
          </div>
        </div>
        <div className={classes.name}>{name}</div>
        {(artists || description) && <div className={classes.description}>
          {artists ? artistContent : description}
        </div>}
      </div>
    </MediaContainer>
  );
};

export default CategoryGridCard;
