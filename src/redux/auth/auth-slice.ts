import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { UserProfile } from "../../models";
import api from "../../utils/api";

const initialState: {
    auth: any;
    isAuthenticated: boolean;
    userProfile: UserProfile | null;
    isUserProfileLoaded: boolean;
} = {
    auth: null,
    isAuthenticated: false,
    userProfile: null,
    isUserProfileLoaded: false
}
export const getUserProfile = createAsyncThunk(
    'auth/getUserProfile',
    async () => {
        const userProfile = await api.get("/me", {});
        return userProfile;
    }
)

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        initAuth(state, action) {
            state.auth = action.payload.auth;
        },
        setIsAuthenticated(state, action) {
            state.isAuthenticated = action.payload.isAuthenticated;
        },
        updateUserProfile(state, action) {
            state.userProfile = action.payload.userProfile;
            state.isUserProfileLoaded = true
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getUserProfile.pending, (state) => {
            state.isUserProfileLoaded = false
        });
        builder.addCase(getUserProfile.fulfilled, (state, action) => {
            state.isUserProfileLoaded = true;
            state.userProfile = action.payload;
        });
        builder.addCase(getUserProfile.rejected, (state) => {
            state.isUserProfileLoaded = true;
            state.userProfile = null;

        })
    }
    
});

export const authReducer = authSlice.reducer;
export const authActions = authSlice.actions;