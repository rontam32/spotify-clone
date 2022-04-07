import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { GenericPlaylist } from '../../models/Playlist'
import api from "../../utils/api";
const initialState: {
    playlists: GenericPlaylist.PlaylistDetail[];
    playlistStatus: 'idle' | 'pending' | 'fulfilled';
} = {
    playlists: [],
    playlistStatus: 'idle',
};

export const followUnfollowPlaylist = createAsyncThunk(
    'playlist/followUnfollowPlaylist',
    async (payload: {
        playlistId: string; 
        follow: boolean;
    }) => {
        payload.follow ? await api.put(`/playlists/${payload.playlistId}/followers`, { public: true }) : await api.delete(`/playlists/${payload.playlistId}/followers`, {});
        const playListRes = await api.get('/me/playlists', {
            limit: '50'
        });
        return playListRes.items;
    }
)

export const getPlaylist = createAsyncThunk(
    'playlist/getPlaylist',
    async () => {
        const playListRes = await api.get('/me/playlists', {
            limit: '50'
        });
        return playListRes.items;
    }
)

export const playlistSlice = createSlice({
    name: 'playlist',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getPlaylist.pending, (state) => {
            state.playlistStatus = 'pending';
        });
        builder.addCase(getPlaylist.fulfilled, (state, action) => {
            state.playlists = action.payload;
            state.playlistStatus = 'fulfilled';
        });
        builder.addCase(followUnfollowPlaylist.pending, (state) => {
            state.playlistStatus = 'pending';
        });
        builder.addCase(followUnfollowPlaylist.fulfilled, (state, action) => {
            state.playlists = action.payload;
            state.playlistStatus = 'fulfilled';
        });
    }
});

export const playlistReducer = playlistSlice.reducer;
export const playlistActions = playlistSlice.actions;