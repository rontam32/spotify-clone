import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../utils/api";

const moduleName = 'playlist-display';

export const checkSavedPlaylist = createAsyncThunk(
    `${moduleName}/checkSavedPlaylist`,
    async ({playlistDetailId, userProfileId} : {
        playlistDetailId: string;
        userProfileId: string;
    }) => {
        const response: boolean[] = await api.get(
            `/playlists/${playlistDetailId}/followers/contains?ids=${userProfileId}`,
            {}
          );
        return response[0];
    }
);