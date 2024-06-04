import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/axiosConfig';
import { setCredentials, clearCredentials } from './authSlice';
import Cookies from 'js-cookie';

const fetchAndSetUser = async(dispatch) => {
    const userResponse = await api.get(`/get-user?accessToken=${Cookies.get('accessToken')}`);

    const user = userResponse.data.user;
    sessionStorage.setItem("user", JSON.stringify(user));
    Cookies.set('user', user._id);

    dispatch(setCredentials({
        user: JSON.stringify(user),
        accessToken: Cookies.get('accessToken'),
        refreshToken: Cookies.get('refreshToken'),
    }));
};

export const login = createAsyncThunk('auth/login', async (credentials, { dispatch }) => {
    await api.post('/login', credentials);
    await fetchAndSetUser(dispatch);
});

export const register = createAsyncThunk('auth/register', async (userInfo, { dispatch }) => {
    await api.post('/register', userInfo);
    await fetchAndSetUser(dispatch);
});

export const logout = createAsyncThunk('auth/logout', async (_, { dispatch }) => {
    await api.get('/logout');
    dispatch(clearCredentials());
});

export const updateUserInfo = createAsyncThunk('auth/updateUserInfo', async (userInfo, { dispatch }) => {
    await api.put('/update-user-info', userInfo);
    await fetchAndSetUser(dispatch);
});

export const updateProfilePicture = createAsyncThunk('auth/updateProfilePicture', async (userInfo, { dispatch }) => {
    await api.put('/update-user-avatar', userInfo);
    await fetchAndSetUser(dispatch);
});

export const updatePassword = createAsyncThunk('auth/updatePassword', async (userInfo, { dispatch }) => {
    await api.put('/update-user-password', userInfo);
    await fetchAndSetUser(dispatch);
});
