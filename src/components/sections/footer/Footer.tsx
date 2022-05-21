import { isEqual, last } from 'lodash';
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createSelector } from 'reselect';
import { Artist } from '../../../models/Common';
import classes from './Footer.module.scss';
import WebPlayback from '../../player/web-playback/WebPlayback';
import VolumeSlider from '../../player/volume-slider/VolumeSlider';

const Footer = () => {
    const currentPlaybackTrack = useSelector(createSelector((state: any) => state.playback, playback => playback?.track), isEqual);
    const albumInfo = useRef({
        albumId: '',
        albumName: '',
        albumImgUrl: '',
        albumArtists: [] as any[]
    })
    useEffect(() => {
        if (currentPlaybackTrack) {
            const uri = currentPlaybackTrack.album.uri as string;

            albumInfo.current = {
                albumId: last(uri.split(':')) || '',
                albumImgUrl: currentPlaybackTrack.album.images[0].url,
                albumName: currentPlaybackTrack.album.name,
                albumArtists: currentPlaybackTrack.artists.map((artist: Artist) => {
                    return {
                        name: artist.name,
                        id: last(artist.uri.split(':')) || ''
                    }
                })

            };
        }
    }, [currentPlaybackTrack]);
    
    return (
        <>
        <div className={classes.container}>
            <div className={classes['track-info']}>
                {currentPlaybackTrack && <div className={classes['info-wrapper']}>
                    <div className={classes['cover-photo']} draggable="true">
                        <img src={albumInfo.current.albumImgUrl}></img>
                    </div>
                    <div className={classes['cover-info']}>
                        <Link className={classes.name} to={`/album/${albumInfo.current.albumId}`}>{currentPlaybackTrack.name}</Link>
                        <div className={classes.artists}>{albumInfo.current.albumArtists.map((artist, index) => {
                            return <>
                                <Link key={artist.id} className={classes['artist-name']} to={`/artist/${artist.id}`}>{artist.name}</Link>{index !== (albumInfo.current.albumArtists.length - 1) ? ', ' : ''}
                            </>;
                        })}</div>
                    </div>
                </div>}
            </div>
            <div className={classes.player}>
                <WebPlayback />
            </div>
            <div className={classes.other}>
                <VolumeSlider />
            </div>
        </div>
     </>
    )
}

export default Footer;