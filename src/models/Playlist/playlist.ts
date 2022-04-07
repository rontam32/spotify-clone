import { CategoryGridContents } from "../Application";
import { ExternalUrls, Image, Tracks, Track } from "../Common";


export module GenericPlaylist {

  interface AddedBy {
    external_urls: ExternalUrls;
    href: string;
    id: string;
    type: string;
    uri: string;
  }

  interface VideoThumbnail {
    url?: any;
  }

  export interface GenericPlaylistItem {
    added_at: Date;
    added_by: AddedBy;
    is_local: boolean;
    primary_color?: any;
    track: Track;
    video_thumbnail: VideoThumbnail;
  }

  export interface FeaturedPlaylistsContentInfo {
    playlistItems: CategoryGridContents[];
    playlistName: string;
    playlistId?: string | number;
  }

  export interface Followers {
    href?: any;
    total: number;
  }

  interface Owner {
    display_name: string;
    external_urls: ExternalUrls;
    href: string;
    id: string;
    type: string;
    uri: string;
  }

  export interface PlaylistDetail {
    collaborative: boolean;
    description: string;
    external_urls: ExternalUrls;
    followers: Followers;
    href: string;
    id: string;
    images: Image[];
    name: string;
    owner: Owner;
    primary_color?: any;
    public: boolean;
    snapshot_id: string;
    tracks: Tracks;
    type: string;
    uri: string;
  }

  export interface PlaylistGridConfig {
    getPlaylistFn: (preGetPlaylistData?: any) => Promise<any[]>;
    transformplaylistItemsFn: (playlistItem: any) => CategoryGridContents;
    playlistName?: string;
    extraPropertyFn?: () => Promise<any> | any
  }
}
