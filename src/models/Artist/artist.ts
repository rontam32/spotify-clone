import { Artist, ExternalUrls, Image } from '../Common';

export module Artist {

    export interface Followers {
        href?: any;
        total: number;
    }

    export interface ArtistDetail {
        external_urls: ExternalUrls;
        followers: Followers;
        genres: string[];
        href: string;
        id: string;
        images: Image[];
        name: string;
        popularity: number;
        type: string;
        uri: string;
    }

}

