import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CategoryGrid from "../../../../components/containers/category-grid/CategoryGrid";
import TopPaddingContainer from "../../../../components/wrapper/top-padding-container/TopPaddingContainer";
import useHeader from "../../../../hooks/use-header";
import { CategoryGridContents } from "../../../../models/Application";
import { TYPES_CATEGORY_GRID_MAPPING, TYPES_TITLE_MAPPING, TYPE_GET_DATA_TYPE_MAPPING } from "../../Playlist.constant";
import { useNavigate } from 'react-router';
import { isEqual } from "lodash";
import { retrieveFollowedArtists, retrieveSavedAlbums } from "../../async-thunks/collectionAsyncThunk";

const Collection = () => {
    const [type, setType] = useState(TYPE_GET_DATA_TYPE_MAPPING.PLAYLISTS);
    const { followedArtists, savedAlbums, savedPlaylists} = useSelector((state: any) => state.collection, isEqual);
    const typeResponseMap = {
        [TYPE_GET_DATA_TYPE_MAPPING.PLAYLISTS]: [...savedPlaylists],
        [TYPE_GET_DATA_TYPE_MAPPING.ARTISTS]: followedArtists,
        [TYPE_GET_DATA_TYPE_MAPPING.ALBUMS]: savedAlbums
    };
    const {userProfile} = useSelector((state: any) => state.auth, isEqual);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const tabCallbackFn = (type: string) => {
        setType(type);
        navigate(`/collection/${type}`)
    };
    const [libraryContent, setLibraryContent] = useState<CategoryGridContents[]>([]);

    useHeader('collection', tabCallbackFn);
    useEffect(() => {
        if (type === TYPE_GET_DATA_TYPE_MAPPING.ARTISTS && !followedArtists) {
            dispatch(retrieveFollowedArtists());
            return;
        }

        if (type === TYPE_GET_DATA_TYPE_MAPPING.ALBUMS && !savedAlbums) {
            dispatch(retrieveSavedAlbums());
            return;
        }

        if (type && typeResponseMap[type]) setLibraryContent(TYPES_CATEGORY_GRID_MAPPING(typeResponseMap[type], navigate, type, userProfile.id));
        
    }, [type]);

    useEffect(() => {
        if (type === TYPE_GET_DATA_TYPE_MAPPING.ARTISTS && followedArtists) {
            setLibraryContent(TYPES_CATEGORY_GRID_MAPPING(followedArtists, navigate, type, userProfile.id));
            return;
        }

        if (type === TYPE_GET_DATA_TYPE_MAPPING.ALBUMS && savedAlbums) {
            setLibraryContent(TYPES_CATEGORY_GRID_MAPPING(savedAlbums, navigate, type, userProfile.id));
            return;
        }
    }, [followedArtists, savedAlbums]);

    return <TopPaddingContainer>
        <CategoryGrid
            id={type} 
            key={type} 
            title={TYPES_TITLE_MAPPING[type]} 
            contents={libraryContent} 
            seeAllLink='' 
            isFullScreen={true}
        />
    </TopPaddingContainer>
}

export default Collection;