import axios from 'axios';
import { ENDPOINTS } from './endpoints';

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

const axiosClient = axios.create({ baseURL, headers: { 'Content-Type': 'application/json' } });

// Attach JWT
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('nivaala_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// 401 -> logout
axiosClient.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('nivaala_token');
      localStorage.removeItem('nivaala_user');
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export { ENDPOINTS };
export default axiosClient;
