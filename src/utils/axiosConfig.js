import axios from 'axios';
import Cookies from 'js-cookie';
import store from '../features/store';
import { logout } from '../features/auth/authActions';
import { setCredentials } from '../features/auth/authSlice';

const api = axios.create({
    baseURL: 'http://localhost:5000/api', 
    withCredentials: true,
});

// api.interceptors.request.use(
//     config => {
//         const accessToken = Cookies.get('accessToken');
//         if (accessToken) {
//             config.headers.Authorization = `Bearer ${accessToken}`;
//         }
//         return config;
//     },
//     error => {
//         return Promise.reject(error);
//     }
// );

api.interceptors.response.use(
    response => {
        return response;
    },
    async error => {
        if (error.response && error.response.status === 401) {
            try {
                await api.post('/refresh', {
                    refreshToken: Cookies.get('refreshToken'),
                });

                store.dispatch(setCredentials({
                    user: Cookies.get('user'),
                    accessToken: Cookies.get('accessToken'),
                    refreshToken: Cookies.get('refreshToken'),
                }));

                return api(error.config);
            } catch (refreshError) {
                store.dispatch(logout());
                return Promise.reject(refreshError);
            }
        } else if (error.response && error.response.status === 402) {
            store.dispatch(logout());
        }

        return Promise.reject(error);
    }
);

export default api;
