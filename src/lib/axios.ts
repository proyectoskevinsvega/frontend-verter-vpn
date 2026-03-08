/// <reference types="vite/client" />
import axios, { AxiosError, type InternalAxiosRequestConfig, type AxiosResponse } from 'axios';

// Construct API URL from environment variables
const API_URL = import.meta.env.VITE_API_BASE_URL || 
                (import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}${import.meta.env.VITE_API_BASE_PATH || '/api/v1'}` : '/api/v1');

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Crucial for HTTP-Only cookies (JWT & Refresh Token)
  headers: {
    'Content-Type': 'application/json',
  },
});

let csrfToken: string | null = null;
let isFetchingCsrf = false;
let csrfSubscribers: ((token: string) => void)[] = [];

const onCsrfFetched = (token: string) => {
  csrfSubscribers.forEach((callback) => callback(token));
  csrfSubscribers = [];
};

const addCsrfSubscriber = (callback: (token: string) => void) => {
  csrfSubscribers.push(callback);
};

export const fetchCsrfToken = async (): Promise<string> => {
  if (csrfToken) return csrfToken;

  if (isFetchingCsrf) {
    return new Promise((resolve) => {
      addCsrfSubscriber(resolve);
    });
  }

  isFetchingCsrf = true;
  try {
    const response = await api.get('/auth/csrf');
    csrfToken = response.data.csrf_token;
    onCsrfFetched(csrfToken as string);
    return csrfToken as string;
  } catch (error) {
    console.error('Failed to fetch CSRF token:', error);
    throw error;
  } finally {
    isFetchingCsrf = false;
  }
};

// Request Interceptor: Attach CSRF Token to mutating requests
api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const isMutatingRequest = ['post', 'put', 'patch', 'delete'].includes(
      config.method?.toLowerCase() || ''
    );

    if (isMutatingRequest) {
      const token = await fetchCsrfToken();
      if (token) {
        config.headers['X-CSRF-Token'] = token;
      }

      // Auto-inyección Multi-Inquilino (SaaS B2B)
      // Agrega el ID de la Empresa automáticamente a todos los payloads JSON
      if (config.data && typeof config.data === 'object' && !config.data.tenant_id) {
        config.data.tenant_id = import.meta.env.VITE_TENANT_SLUG || 'vertercloud';
      }
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

let isRefreshing = false;
let failedQueue: { resolve: (value?: unknown) => void; reject: (reason?: any) => void }[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token as any);
    }
  });
  failedQueue = [];
};

// Response Interceptor: Handle 401 Unauthorized with Token Refresh Queueing
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    // Handle 401 errors, but exclude login and the refresh request itself to avoid loops
    if (
      error.response?.status === 401 && 
      !originalRequest._retry && 
      originalRequest.url !== '/auth/login' && 
      originalRequest.url !== '/auth/me' && 
      !originalRequest.url?.includes('/auth/refresh')
    ) {
      if (isRefreshing) {
        // If already refreshing, add this request to the queue
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => {
            return api(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Attempt to refresh the token. The request interceptor will inject tenant_id.
        await api.post('/auth/refresh', {});
        
        processQueue(null);
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError);
        // Clear CSRF on hard auth failure
        csrfToken = null;
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // Force CSRF refresh if the token was invalid
    const responseData = error.response?.data as any;
    if (error.response?.status === 403 && responseData?.error === 'invalid csrf token') {
      csrfToken = null;
    }

    return Promise.reject(error);
  }
);

