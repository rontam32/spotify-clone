import { Image } from '../Common/common-response-type';

export interface PlaybackState {
    album: Album;
    artists: Artist[];
    duration_ms: number;
    id: string;
    is_playable: boolean;
    linked_from: LinkedFrom;
    media_type: string;
    name: string;
    track_type: string;
    type: string;
    uid: string;
    uri: string;

}

interface Album {
    iamges: Image[];
    name: string;
    uri: string;
}

interface Artist {
    name: string;
    uri: string;
}

interface LinkedFrom {
    url: string;
    id: string;
}