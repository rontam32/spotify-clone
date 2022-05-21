import api from "../../../utils/api"

const service = {
    getSavedAlbums() {
        return api.get('/me/albums', {});
    },
    getFollowedArtists() {
        return api.get('/me/following', {type: 'artist'});
    }
}

export default service;