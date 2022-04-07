import axios, { AxiosRequestHeaders, Method } from 'axios';
import { HTTP_METHODS } from '../constants';

const defaults = {
    authURL: 'https://accounts.spotify.com',
    baseURL: process.env.REACT_APP_BASE_URL as string,
    headers: (): AxiosRequestHeaders => {
        const token = sessionStorage.getItem('access_token');
        return {
            'Content-Type': 'application/json',
            Authorization: token ? `Bearer ${token}` : '',
        }
    },
    error: {
        code: 'INTERNAL_ERROR',
        message: 'Something went wrong. Please check your internet connection or contact our support.',
        status: 500,
        data: {},
      },
};

const api = (method: Method, url: string, variables: {[key: string]: any}) => {
    return new Promise<any> ((resolve, reject) => {
        axios({
            url: `${defaults.baseURL}${url}`,
            method,
            headers: defaults.headers(),
            params: method === HTTP_METHODS.GET ? variables : undefined,
            data: method !== HTTP_METHODS.GET ? variables : undefined
        }).then(
            response => {
                resolve(response.data)
            }
        ).catch(
            (error) => {
                if (error.response) {
                    reject(error.response.data.error)
                } else {
                    reject(defaults.error)
                }
            }
        )
    })
}

export default {
    get: (url: string, variables: {[key: string]: any}) => api(HTTP_METHODS.GET, url, variables),
    post: (url: string, variables: {[key: string]: any}) => api(HTTP_METHODS.POST, url, variables),
    put: (url: string, variables: {[key: string]: any}) => api(HTTP_METHODS.PUT, url, variables),
    delete: (url: string, variables: {[key: string]: any}) => api(HTTP_METHODS.DELETE, url, variables),
}
