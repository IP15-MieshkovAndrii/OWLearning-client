import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: Cookies.get('user') || null,
        accessToken: Cookies.get('accessToken') || null,
        refreshToken: Cookies.get('refreshToken') || null,
    },
    reducers: {
        setCredentials: (state, action) => {
            const { user, accessToken, refreshToken } = action.payload;
            state.user = user;
            state.accessToken = accessToken;
            state.refreshToken = refreshToken;
            Cookies.set('user', user);
            Cookies.set('accessToken', accessToken);
            Cookies.set('refreshToken', refreshToken);
        },
        clearCredentials: (state) => {
            state.user = null;
            state.accessToken = null;
            state.refreshToken = null;
            Cookies.remove('user');
            Cookies.remove('accessToken');
            Cookies.remove('refreshToken');
            sessionStorage.clear();
        },
    },
});

export const { setCredentials, clearCredentials } = authSlice.actions;

export default authSlice.reducer;
