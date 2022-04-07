import {configureStore, getDefaultMiddleware, combineReducers, Reducer} from '@reduxjs/toolkit';
import { playbackReducer } from './playback/playback-slice';
import { playlistReducer } from './playlist/playlist-slice';
import { authReducer } from './auth/auth-slice';
import { useDispatch } from 'react-redux';

const staticReducers: {[key: string]: Reducer} = {
    playback: playbackReducer,
    playlist: playlistReducer,
    auth: authReducer
}

const combinedStaticReducers = combineReducers(staticReducers);

export type State = ReturnType<typeof combinedStaticReducers>;


const createReducers = (moduleName: string, reducer: Reducer) => {
    if (!staticReducers[moduleName]) {
        staticReducers[moduleName] = reducer;
    }

    return combineReducers(staticReducers);
};

const customizedMiddleware = getDefaultMiddleware({
    serializableCheck: false
  });

export const store = configureStore({
    reducer: staticReducers,
    middleware: customizedMiddleware
});

export const injectAsyncReducer = (moduleName: string, reducer: Reducer) => {
    store.replaceReducer(createReducers(moduleName, reducer) as any);
};

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export const dispatch = store.dispatch;
