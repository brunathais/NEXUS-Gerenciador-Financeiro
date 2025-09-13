import axios from 'axios';
import { getToken } from './auth';

export const api = axios.create({
  baseURL: "http://localhost:3002/api",
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers = config.headers || {};
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});
