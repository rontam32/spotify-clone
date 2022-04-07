import api from "../../../utils/api";

const service = {
  checkSavedPlaylist(playlistDetailId: string, userProfileId: string) {
    return api.get(
      `/playlists/${playlistDetailId}/followers/contains?ids=${userProfileId}`,
      {}
    );
  },
  getPlaylistDetail(playlistId: string) {
    return api.get(`/playlists/${playlistId}`, {});
  },
  getPlaylistTracks(playlistId: string, isLikedSongs = false) {
    return api.get(
      !isLikedSongs ? `/playlists/${playlistId}/tracks` : "/me/tracks",
      {
        offset: 0,
        limit: isLikedSongs ? 50 : 100,
      }
    );
  },
};

export default service;
