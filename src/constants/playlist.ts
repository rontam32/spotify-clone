import { GenericPlaylist } from "../models/Playlist"

export const defaultContentInfo: (name?: string) => GenericPlaylist.FeaturedPlaylistsContentInfo = (playlistName?: string) => {
    return {
        playlistItems: [],
        playlistName: playlistName || ''
    }
}