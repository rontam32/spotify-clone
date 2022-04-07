import { createSlice } from "@reduxjs/toolkit";
import { Track } from "../../../models/Common";
import { GenericPlaylist } from "../../../models/Playlist";
import { checkSavedPlaylist, getPlaylistDetail, getPlaylistTracks } from "../async-thunks/playlistAsyncThunk";

const initialState: {
    playlistDetail: GenericPlaylist.PlaylistDetail | null;
    playlistTracks: Track[];
    isPlaylistSaved: boolean;
} = {
    playlistDetail: null,
    playlistTracks: [],
    isPlaylistSaved: false
  };

export const slice = createSlice({
    name: 'playlist-display',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(checkSavedPlaylist.fulfilled, (state, action) => {
            state.isPlaylistSaved = action.payload;
        });

        builder.addCase(getPlaylistDetail.fulfilled, (state, action) => {
            state.playlistDetail = action.payload;
        });

        builder.addCase(getPlaylistTracks.fulfilled, (state, action) => {
            state.playlistTracks = action.payload;
        });
      },
});