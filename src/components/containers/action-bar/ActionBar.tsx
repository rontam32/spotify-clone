import React from 'react';
import PlayButton from '../../common/buttons/play-button/PlayButton';
import classes from './ActionBar.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { GenericProps } from '../../../models/Application';
import { AlbumType } from '../../../models/Album';
import { togglePlay } from '../../../redux/playback/playback-action';
import FavoriteButton from '../../common/buttons/favorite-button/FavoriteButton';
import { GenericPlaylist } from '../../../models/Playlist';
import {selectIsCurrentCagetoryPlaying, selectTrackUri, selectPlayer, selectIsPlaying, selectCurrentTrackId} from '../../../redux/selector';
import { isEqual } from 'lodash';
import { Album } from '../../../models/Common';

interface ActionBarProps {
    categoryDetail: AlbumType.AlbumDetail | GenericPlaylist.PlaylistDetail;
    favoriteHandler: (isFavoriteSelected: boolean) => void;
    checkIsCategorySaved: boolean;
    albumDetail?: Album,
    albumTrackNumber?: number;
}

const ActionBar= ({ categoryDetail, favoriteHandler, checkIsCategorySaved, albumDetail, albumTrackNumber }: GenericProps<ActionBarProps>) => {
    const dispatch = useDispatch();
    const player = useSelector(selectPlayer, isEqual);
    const trackUri = useSelector(selectTrackUri, (left, right) => {return left === right});
    const trackId = useSelector(selectCurrentTrackId, (left, right) => {return left === right});
    const isPlaying = useSelector(selectIsPlaying, (left, right) => {return left === right});
    const isCurrentCategoryPlayingByUri = useSelector(selectIsCurrentCagetoryPlaying(categoryDetail?.uri), (left, right) => {return left === right});
    const isCurrentCategoryPlaying = (isCurrentCategoryPlayingByUri || categoryDetail?.tracks?.items.map((item: any) => {
        return item.track?.id || item?.id;
    }).includes(trackId)) && isPlaying;

    const playHandler = (e: React.MouseEvent) => {
        if (trackUri === categoryDetail?.uri || categoryDetail?.tracks?.items.map((item: any) => {
            return item.track?.id || item?.id;
        }).includes(trackId)) {
            player.togglePlay();
        } else if (albumDetail && albumTrackNumber) {
            dispatch(togglePlay(albumTrackNumber - 1, albumDetail.uri, true));
        } else {
            dispatch(togglePlay(0, categoryDetail.uri, true));
        }

    }

    const pauseHandler = (e: React.MouseEvent) => {
        e.stopPropagation();
        player.togglePlay();
    }

    return (
        <div className={classes['action-bar']}>
            <PlayButton playHandler={playHandler} pauseHandler={pauseHandler} cssClass={classes['play-button']} isCurrentTrackPlaying={isCurrentCategoryPlaying}/>
            {categoryDetail && <FavoriteButton isCurrentlyFavorited={checkIsCategorySaved} favoriteHandler={() => favoriteHandler(true)} unfavoriteHandler={() => favoriteHandler(false)}/>}
        </div>
    );
}

export default ActionBar;