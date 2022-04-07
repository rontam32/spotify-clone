import classes from "./VolumeSlider.module.scss";
import { StyledSlider } from "../WebPlayback.styles";
import VolumeButton from "../../common/buttons/volume-button/VolumeButton";
import { useSelector } from "react-redux";
import { useCallback, useEffect, useRef, useState } from "react";
import { cloneDeep, throttle } from "lodash";
import { createSelector } from "@reduxjs/toolkit";
import api from "../../../utils/api";
const VolumeSlider = () => {
  const playerVolume = useSelector((state: any) => state.playback?.volume);
  const player = useSelector(
    createSelector(
      (state: any) => state.playback,
      (playback) => cloneDeep(playback?.player)
    )
  );
  const [playerVolumePosition, setPlayerVolumePosition] = useState(0);
  const isFirstLoaded = useRef(false);
  const sliderChangeHandler = useCallback(
    (
      event: Event | React.SyntheticEvent<Element, Event>,
      value: number | number[]
    ) => {
      if (typeof value === "number") setPlayerVolumePosition(value);
    },
    []
  );

  const updateVolumeHandler = useCallback(
    async (volume: number) => {
      if (player) {
        await player?.setVolume(volume / 100);
        // await api.put(`/me/player/volume?volume_percent=${volume}`, {});
      }
    },
    [player]
  );

  const throttled = useRef((_callback: (volume: number) => Promise<void>) => {
    return throttle(_callback, 300);
  });

  const throttleUpdateVolume = useCallback(
    throttled.current(updateVolumeHandler),
    []
  );

  const clickVolumeHandler = useCallback(
    (isMuted: boolean) => {
      const volume = isMuted ? 0 : 100;
      updateVolumeHandler(volume);
      setPlayerVolumePosition(volume);
    },
    [updateVolumeHandler]
  );

  useEffect(() => {
    throttleUpdateVolume(playerVolumePosition);
  }, [playerVolumePosition]);

  useEffect(() => {
    setPlayerVolumePosition(playerVolume * 100);
  }, [playerVolume]);

  return (
    <div className={classes["volume-controller"]}>
      <VolumeButton
        volume={playerVolumePosition}
        clickVolumeHandler={clickVolumeHandler}
      />
      <StyledSlider
        key={`volume-silider`}
        value={playerVolumePosition}
        onChange={sliderChangeHandler}
        max={100}
      />
    </div>
  );
};

export default VolumeSlider;
