import axios from 'axios';

// On the live site use the Render backend; on your computer use the Vite proxy.
const API_URL = import.meta.env.PROD
  ? 'https://movie-watchlist-hgn1.onrender.com/api'
  : '/api';

const api = axios.create({ baseURL: API_URL });

// attach the JWT to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const errMsg = (e) => e.response?.data?.message || 'Could not reach the server. Is the backend running?';
export default api;