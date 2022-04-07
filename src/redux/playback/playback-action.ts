import api from '../../utils/api'

export const togglePlay = (index: number, contextUri: string, play: boolean) => {
    const requestBody: {[key: string]: any} = {
        context_uri: contextUri
    };
    if (!contextUri.includes('artist')) {
        requestBody.offset = {
            position: index
        }
    }
    return async (dispatch: any) => {
        const updatePlayback = async () => {
            const response = play ? await api.put(`/me/player/play`, requestBody) : await api.put(`/me/player/pause`, requestBody);
        }

        updatePlayback();
    };
   
}