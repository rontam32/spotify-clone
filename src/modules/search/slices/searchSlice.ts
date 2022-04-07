import { createSlice } from "@reduxjs/toolkit";
import { getSearchTracks } from "../async-thunks/searchResultAsyncThunk";

const initialState = {
    tracks: [] as any[],
  };

export const slice = createSlice({
    name: 'search-result',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getSearchTracks.fulfilled, (state, action) => {
          state.tracks = [...action.payload];
        })
      },
});