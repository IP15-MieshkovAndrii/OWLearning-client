// src/features/api/apiSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';
import { clearCredentials, setCredentials } from '../auth/authSlice';

const API_BASE_URL = 'https://owlearning-server.onrender.com/api'; 

const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
});

export const fetchWithRefresh = createAsyncThunk('api/fetchWithRefresh', async (arg, { getState, dispatch }) => {
    const { auth } = getState();
    try {
        const response = await api(arg);
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 401) {
        try {
            await api.post('/refresh', {
              refresh_token: Cookies.get('refreshToken'),
            });

            dispatch(setCredentials({
              user: auth.user, 
              accessToken: Cookies.get('accessToken'),
              refreshToken: Cookies.get('refreshToken'),
            }));

            const retryResponse = await api(arg);
            return retryResponse.data;
        } catch (refreshError) {
            dispatch(clearCredentials());
            throw refreshError;
        }
        } else {
        throw error;
        }
    }
});

const apiSlice = createSlice({
  name: 'api',
  initialState: {
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWithRefresh.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWithRefresh.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(fetchWithRefresh.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default apiSlice.reducer;
