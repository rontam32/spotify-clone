import { ExternalUrls, Track } from "../Common";

export module RecentlyPlayedPlaylist {
    
    interface Context {
        external_urls: ExternalUrls;
        href: string;
        type: string;
        uri: string;
    }
    
    export interface RecentlyPlayedPlaylistItem {
        track: Track;
        played_at: Date;
        context: Context;
    }
}