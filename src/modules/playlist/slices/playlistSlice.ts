import { createSlice } from "@reduxjs/toolkit";
import { checkSavedPlaylist } from "../async-thunks/playlistAsyncThunk";

const initialState = {
    playlistResponse: {} as any,
    isPlaylistSaved: false
  };

export const slice = createSlice({
    name: 'playlist-display',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(checkSavedPlaylist.fulfilled, (state, action) => {
            state.isPlaylistSaved = action.payload;
          })
      },
});