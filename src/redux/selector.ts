import { cloneDeep } from "lodash";
import { createSelector } from '@reduxjs/toolkit';

export const selectPlayer = createSelector((state: any) => state.playback, playback => cloneDeep(playback?.player));
export const selectTrackUri = createSelector((state: any) => state.playback, playback => {
  return playback?.track?.album.uri;
});
export const selectIsCurrentCagetoryPlaying = (uri: string) => {
    return createSelector(
        createSelector((state: any) => state.playback, playback => playback?.track?.album.uri),
        createSelector((state: any) => state.playback, playback => playback?.isPlaying),
        (trackUri, isPlaying) => {
          return (trackUri === uri) && isPlaying
        }
      )
};
export const selectIsPlaying = createSelector((state: any) => state.playback, playback => playback?.isPlaying);
export const selectCurrentTrackId = createSelector((state: any) => state.playback, playback => playback?.track?.id);