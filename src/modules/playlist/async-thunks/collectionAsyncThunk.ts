import { createAsyncThunk } from "@reduxjs/toolkit";
import service from "../services/collectionService";

const moduleName = 'search';

export const retrieveSavedAlbums = createAsyncThunk(
    `${moduleName}/retrieveSavedAlbums`,
    async () => {
        const getSavedAlbumsResponse = await service.getSavedAlbums();
        console.log(getSavedAlbumsResponse.items);

        return {
            savedAlbums: getSavedAlbumsResponse.items,
        }
    }
)

export const retrieveFollowedArtists = createAsyncThunk(
    `${moduleName}/retrieveFollowedArtist`,
    async () => {
        const getFollowedArtistsResponse = await service.getFollowedArtists();
        return {
            followedArtists: getFollowedArtistsResponse.artists.items
        }
    }
)