import { useEffect, useRef, useState } from "react";
import { GenericPlaylist } from '../models/Playlist';

const usePlaylistGrid = (configsArg?: GenericPlaylist.PlaylistGridConfig[]) => {
    const [configs, setConfig] = useState(configsArg);
    const [playlistContents, setPlaylistsContent] = useState<GenericPlaylist.FeaturedPlaylistsContentInfo[]>([]);
    useEffect(() => {
        if (configs) {
            if (configs.length > 0) {
                for (const config of configs) {
                    let playlistContentInfo: any;
                    const getPlaylist = async () => {
                        let extraPropertData = {};
                        if (config.extraPropertyFn) {
                            extraPropertData = await config.extraPropertyFn();
                        }
                        const items = await config.getPlaylistFn();
                        playlistContentInfo = {
                            playlistItems: items.map(config.transformplaylistItemsFn),
                            ...extraPropertData
                        }
                        setPlaylistsContent(prevState => {
                            const updatedState = [...prevState];
                            updatedState.push(playlistContentInfo as GenericPlaylist.FeaturedPlaylistsContentInfo);
                            return updatedState;
                        });
                    }
            
                    getPlaylist();
                }
            }
        }
    }, [configs])

    return {
        playlistContent: playlistContents,
        setPlaylistGridConfig: setConfig
    };

}

export default usePlaylistGrid;