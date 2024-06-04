// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice.js';
import apiReducer from './api/apiSlice.js';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    api: apiReducer,
  },
  
});

export default store;
