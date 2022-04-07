import { Artist } from "../Common";

export interface CategoryGridContents {
    name: string;
    description?: string;
    artists?: Artist[]
    id: string;
    img: string;
    containerClickHandler: (e: React.MouseEvent) => void;
    uri?: string;
    isCategoryPlaying?: (currentTrackUri: string) => boolean;
    isArtist?: boolean;
    trackNumber?: number;
    
};