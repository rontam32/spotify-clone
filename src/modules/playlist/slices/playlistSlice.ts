import { createSlice } from "@reduxjs/toolkit";
import { Track } from "../../../models/Common";
import { GenericPlaylist } from "../../../models/Playlist";
import { checkSavedPlaylist, getPlaylistDetail, getPlaylistTracks } from "../async-thunks/playlistAsyncThunk";

const initialState: {
    playlistDetail: GenericPlaylist.PlaylistDetail | null;
    playlistTracks: Track[];
    isPlaylistSaved: boolean;
    totalSavedTracks: number;
} = {
    playlistDetail: null,
    playlistTracks: [],
    isPlaylistSaved: false,
    totalSavedTracks: 0
  };

export const playlistSlice = createSlice({
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
            state.playlistTracks = action.payload.savedTracks;
            state.totalSavedTracks = action.payload.totalSavedTracks;
        });
      },
});