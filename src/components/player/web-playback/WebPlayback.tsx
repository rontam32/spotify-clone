import { createSelector } from "@reduxjs/toolkit";
import { cloneDeep, isEqual } from "lodash";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import classes from "./WebPlayback.module.scss";
import SkipButton from "../../common/buttons/skip-button/SkipButton";
import { StyledSlider } from "../WebPlayback.styles";
import PlayButton from "../../common/buttons/play-button/PlayButton";
import { convertMilliSecToDisplayTime } from "../../../utils";
import { selectCurrentTrackId } from "../../../redux/selector";

const WebPlayback = () => {
  const player = useSelector(createSelector(
    (state: any) => state.playback,
    (playback) => cloneDeep(playback?.player))
  );
  const currentPlaybackTrack = useSelector(createSelector(
    (state: any) => state.playback,
    (playback) => playback?.track),
    isEqual
  );

  const playerIsPlaying = useSelector(createSelector(
    (state: any) => state.playback,
    (playback) => cloneDeep(playback?.isPlaying))
  );
  const initialPosition = useSelector((state: any) => state.playback?.position);
  const currentTrackId = useSelector(selectCurrentTrackId);

  const displayTime = convertMilliSecToDisplayTime(currentPlaybackTrack?.duration_ms);

  const [displayCurrentPosition, setDisplayCurrentPosition] = useState<{
    min: string;
    sec: string;
    hour: string;
  }>(convertMilliSecToDisplayTime(0));
  const [position, setPosition] = useState<number>(0);

  const onClickSkipHandler = useCallback((isNext?: boolean) => {
      isNext ? player?.nextTrack() : player?.previousTrack();
    },[player]);

  const playHandler = useCallback((e: React.MouseEvent) => {
      player?.togglePlay();
    },[player]);

    const sliderChangeHandler = useCallback((
      event: Event | React.SyntheticEvent<Element, Event>,
      value: number | number[]
    ) => {
      if (typeof value === "number") setPosition(value);
    }, []);

    const changePlayerPosition = useCallback((event: Event | React.SyntheticEvent<Element, Event>, value: number | number[]) => {
        if (typeof value === "number") player?.seek(value);
    }, [player])

  useEffect(() => {
    setPosition(initialPosition);
  }, [initialPosition]);

  useEffect(() => {
    setPosition(0);
  }, [currentTrackId]);

  useEffect(() => {
    let interval: NodeJS.Timer | null = null;
    if (playerIsPlaying) {
      interval = setInterval(() => {
        setPosition((prev) => {
          return prev + 1000;
        });
      }, 1000);
    } else {
      if (interval) clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [playerIsPlaying]);

  useEffect(() => {
    if (position !== undefined) setDisplayCurrentPosition(convertMilliSecToDisplayTime(position));
  }, [position]);

  return (
    <>
      <div className="flex-col flex w-100">
        <div className="flex w-full items-center justify-center gap-x-2.5">
          <SkipButton
            cssClass={`${classes.skip} ${classes.button}`}
            clickHandler={(e: React.MouseEvent) => {
              onClickSkipHandler();
            }}
            type="previous"
          />
          <PlayButton
            cssClass={`${classes.play} ${classes.button}`}
            playHandler={playHandler}
            pauseHandler={playHandler}
            isCurrentTrackPlaying={playerIsPlaying}
          />
          <SkipButton
            cssClass={`${classes.skip} ${classes.button}`}
            clickHandler={(e: React.MouseEvent) => {
              onClickSkipHandler(true);
            }}
            type="next"
          />
        </div>
        <div className="items-center w-100 flex gap-1">
          <div
            className={classes.time}
          >{`${displayCurrentPosition.min}:${displayCurrentPosition.sec}`}</div>
          <StyledSlider
            key={`slider-player`}
            defaultValue={initialPosition}
            value={position}
            max={currentPlaybackTrack?.duration_ms}
            onChange={sliderChangeHandler}
            onChangeCommitted={changePlayerPosition}
          />
          <div
            className={classes.time}
          >{`${displayTime.min}:${displayTime.sec}`}</div>
        </div>
      </div>
    </>
  );
};

export default WebPlayback;
