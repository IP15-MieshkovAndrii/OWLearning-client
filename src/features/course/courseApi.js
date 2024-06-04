import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/axiosConfig';



export const createCourse = createAsyncThunk('course/create-course', async (data, { dispatch }) => {
    console.log(3)
    await api.post('/create-course', data);
});

