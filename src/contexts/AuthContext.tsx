import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { api, fetchCsrfToken } from '../lib/axios';
import type { User } from '../types/auth';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuth = async () => {
    setIsLoading(true);
    try {
      // First, ensure we have a CSRF token initialized
      await fetchCsrfToken();
      // Then check if the user session exists
      const response = await api.get('/auth/me');
      if (response.data && response.data.user) {
        setUser(response.data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
       // Ignore 401s on initial load, it just means they aren't logged in
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (email: string, password: string, _rememberMe = false) => {
    try {
      const tenantId = import.meta.env.VITE_TENANT_SLUG || 'default';
      const response = await api.post('/auth/login', {
        tenant_id: tenantId,
        identifier: email,
        password,
      });
      // Response might contain MFA requirements, but for now we assume standard login
      setUser(response.data.user);
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Error al iniciar sesión');
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      const tenantId = import.meta.env.VITE_TENANT_SLUG || 'default';
      await api.post('/auth/register', {
        tenant_id: tenantId,
        username: name,
        email,
        password,
      });
      // Registration successful, standard protocol is to block login until verification
      // Navigate to the Verify Email UI
      window.location.href = '/verify-email';
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Error al crear la cuenta');
    }
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      // Optional: Redirect to home or login page via Window location or React Router if injected.
      window.location.href = '/login';
    }
  };

  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    checkAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
