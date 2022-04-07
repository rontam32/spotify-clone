import api from '../../utils/api';
import { playlistActions } from './playlist-slice';

// export const retrievePlaylists = () => {
//     return async (dispatch: any) => {
//         const playListRes = await api.get('/me/playlists', {
//             limit: '50'
//         });

//         dispatch(playlistActions.getPlaylists({
//             playlists: playListRes.items
//         }));
//     }
// }