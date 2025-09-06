/// <reference types="vite/client" />
import axios from 'axios';
import { getToken } from './auth';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL
});

api.interceptors.request.use(config => {
  const token = getToken();
  if (token) {
    config.headers = config.headers || {};
    (config.headers as any).Authorization = `Bearer ${token}`;
    
  }
  return config;
});