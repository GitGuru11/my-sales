// lib/axios.ts
import axios, { AxiosError } from 'axios';
import { AppError } from '@/types/error';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || '/api',
  timeout: 10000,
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // You can add auth headers or other request modifications here
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<AppError>) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      const message = error.response.data?.message || 'An unexpected error occurred';
      const status = error.response.status;
      const code = error.response.data?.code || 'UNKNOWN_ERROR';
      
      throw new AppError(message, code, status);
    } else if (error.request) {
      // The request was made but no response was received
      throw new AppError('No response received from server', 'NETWORK_ERROR');
    } else {
      // Something happened in setting up the request
      throw new AppError('Failed to make request', 'REQUEST_SETUP_ERROR');
    }
  }
);

export default api;
