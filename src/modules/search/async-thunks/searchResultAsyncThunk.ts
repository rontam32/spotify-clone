import { createAsyncThunk } from '@reduxjs/toolkit';
import { TYPE_GET_DATA_TYPE_MAPPING } from '../Search.constant';
import service from '../services/searchResultService';

const moduleName = 'search';

export const getSearchTracks = createAsyncThunk(
    `${moduleName}/getSearchTracks`,
    async ({searchQuery, searchTypes} : {
        searchQuery: string; 
        searchTypes: { [key: string]: string };
    }) => {
        const response = await service.getSearchList(searchQuery, searchTypes);
        return response["tracks"].items
    }
);

export const saveTrack = createAsyncThunk(
    `${moduleName}/saveTrack`,
    async ({trackId} : {
        trackId: string; 
    }) => {
        await service.updateSavedTrack(true, trackId);
        return {
            status: "SUCCESSED"
        }
    }
);

export const removeSavedTrack = createAsyncThunk(
    `${moduleName}/removeSavedTrack`,
    async ({trackId} : {
        trackId: string; 
    }) => {
        await service.updateSavedTrack(false, trackId);
        return {
            status: "SUCCESSED"
        }
    }
);

export const getSearchListByType = createAsyncThunk(
    `${moduleName}/getSearchListByType`,
    async ({offset, type, query} : {
        offset: number; 
        type: string;
        query: string;
    }) => {
        const response = await service.getSearchListByType(type, type, offset);
        return response;
    }
);