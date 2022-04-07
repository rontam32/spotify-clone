import { ExternalUrls, Image, Tracks } from "../Common";

export module FeaturedPlaylist {

    interface Owner {
        display_name: string;
        external_urls: ExternalUrls;
        href: string;
        id: string;
        type: string;
        uri: string;
    }

    export interface FeaturedPlaylistItem {
        collaborative: boolean;
        description: string;
        external_urls: ExternalUrls;
        href: string;
        id: string;
        images: Image[];
        name: string;
        owner: Owner;
        primary_color?: any;
        public?: any;
        snapshot_id: string;
        tracks: Tracks;
        type: string;
        uri: string;
    }
}
 

