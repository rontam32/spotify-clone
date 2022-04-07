import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    player: null,
    isPlaying: false,
    deviceId: '',
    track: null,
    position: 0,
    volume: 0
}

export const playbackSlice = createSlice({
    name: 'playback',
    initialState,
    reducers: {
        addDeviceId(state, action) {
            state.deviceId = action.payload.deviceId;
        },

        updateIsPlaying(state, action) {
            state.isPlaying = action.payload.isPlaying;
        },

        updatePlayer(state, action) {
            state.player = action.payload.player;
        },
        updateTrack(state, action) {
            state.track = action.payload.track;
        },
        setPosition(state, action) {
            state.position = action.payload.position;
        },
        setVolume(state, action) {
            state.volume = action.payload.volume;
        }
    }
});

export const playbackReducer = playbackSlice.reducer;
export const playbackActions = playbackSlice.actions;