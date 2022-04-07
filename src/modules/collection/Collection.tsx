import { useState } from "react";
import TopPaddingContainer from "../../components/wrapper/top-padding-container/TopPaddingContainer"
import useHeader from "../../hooks/use-header";

const TYPES = {
    PLAYLISTS: 'playlists',
    PODCASTS: 'podcasts',
    ARTISTS: 'artists',
    ALBUMS: 'albums'
}
const Collection = () => {
    const [type, setType] = useState(TYPES.PLAYLISTS);
    const tabCallbackFn = (type: string) => {
        setType(type);
    }
    useHeader('collection', tabCallbackFn);
    return <TopPaddingContainer>
        
    </TopPaddingContainer>
}

export default Collection;