import { createSlice } from "@reduxjs/toolkit";
import { AlbumType } from "../../../models/Album";
import { Artist } from "../../../models/Artist";
import { GenericPlaylist } from "../../../models/Playlist";
import { store } from "../../../redux/store";
import { retrieveSavedAlbums, retrieveFollowedArtists } from "../async-thunks/collectionAsyncThunk";
import { checkSavedPlaylist } from "../async-thunks/playlistAsyncThunk";

const initialState: {
    savedAlbums: AlbumType.AlbumDetail[] | null,
    followedArtists: Artist.ArtistDetail[] | null,
    savedPlaylists: GenericPlaylist.PlaylistDetail[]
} = {
    savedAlbums: null,
    followedArtists: null,
    savedPlaylists: store.getState().playlist.playlists
  };

export const collectionSlice = createSlice({
    name: 'collection',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(retrieveSavedAlbums.fulfilled, (state, action) => {
            state.savedAlbums = action.payload.savedAlbums;
        });
        builder.addCase(retrieveFollowedArtists.fulfilled, (state, action) => {
            state.followedArtists = action.payload.followedArtists;
        });
      },
});