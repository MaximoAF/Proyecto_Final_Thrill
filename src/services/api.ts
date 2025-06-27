import axios from 'axios';
import { useSesionStore } from '../store/slices/SesionStore';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

//Interceptor para agregar token
api.interceptors.request.use(config => {
  const token = useSesionStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

//Interceptor para manejar token vencido
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      //useSesionStore.getState().closeSesion();
      //window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
