import axios from 'axios';

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
  async (config) => {
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
      if (config.data && typeof config.data === 'object') {
        config.data.tenant_id = import.meta.env.VITE_TENANT_SLUG || 'default';
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle 401 Unauthorized (Token refresh logic could be added here if needed, but the backend handles HTTP-only cookies, so usually a 401 just means session expired)
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Optional: If backend supports a /auth/refresh endpoint via cookie, we can attempt a transparent retry here.
    if (error.response?.status === 401 && !originalRequest._retry && originalRequest.url !== '/auth/login') {
      originalRequest._retry = true;
      try {
        await api.post('/auth/refresh');
        // Retry the original request after successful refresh
        return api(originalRequest);
      } catch (refreshError) {
        // If refresh fails, let the error propagate (AuthContext will likely catch this and log out)
        return Promise.reject(refreshError);
      }
    }

    // Force CSRF refresh if the token was invalid
    if (error.response?.status === 403 && error.response?.data?.error === 'invalid csrf token') {
      csrfToken = null;
    }

    return Promise.reject(error);
  }
);
