import { createAsyncThunk } from "@reduxjs/toolkit";
import { Track } from "../../../models/Common";
import { GenericPlaylist } from "../../../models/Playlist";
import service from "../services/playlistService";

const moduleName = "playlist-display";

export const checkSavedPlaylist = createAsyncThunk(
  `${moduleName}/checkSavedPlaylist`,
  async ({
    playlistDetailId,
    userProfileId,
  }: {
    playlistDetailId: string;
    userProfileId: string;
  }) => {
    const response: boolean[] = await service.checkSavedPlaylist(
      playlistDetailId,
      userProfileId
    );
    return response[0];
  }
);

export const getPlaylistDetail = createAsyncThunk(
  `${moduleName}/getPlaylistDetail`,
  async ({ playlistId = "" }: { playlistId?: string }) => {
    const response: GenericPlaylist.PlaylistDetail =
      await service.getPlaylistDetail(playlistId);
    return response;
  }
);

export const getPlaylistTracks = createAsyncThunk(
  `${moduleName}/getPlaylistTracks`,
  async ({
    playlistId,
    isLikedSongs,
  }: {
    playlistId?: string;
    isLikedSongs: boolean;
  }) => {
    const response = await service.getPlaylistTracks(playlistId || '', isLikedSongs);
    return response.items.map((item: any) => {
      const track = { ...item.track };
      track.added_at = item.added_at;
      return track;
    }) as Track[];
  }
);
