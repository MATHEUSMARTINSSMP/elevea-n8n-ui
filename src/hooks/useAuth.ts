import { useState, useEffect, useCallback } from 'react';
import { webhookService } from '../lib/webhooks';

export interface User {
  id: string;
  email: string;
  name: string;
  site_slug: string;
  status: 'active' | 'blocked' | 'inactive';
  role: 'client' | 'admin';
  is_vip: boolean;
  created_at: string;
  updated_at: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  });

  // Check authentication status on mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = useCallback(async () => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
      
      // Check if user is stored in localStorage
      const storedUser = localStorage.getItem('elevea_user');
      const storedToken = localStorage.getItem('elevea_token');
      
      if (storedUser && storedToken) {
        const user = JSON.parse(storedUser);
        
        // Verify VIP status with backend
        const vipResponse = await webhookService.checkVIPStatus(user.id);
        
        if (vipResponse.success) {
          setAuthState({
            user: { ...user, is_vip: vipResponse.data?.is_vip || false },
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } else {
          // Token might be expired, clear storage
          localStorage.removeItem('elevea_user');
          localStorage.removeItem('elevea_token');
          setAuthState({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
          });
        }
      } else {
        setAuthState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
        });
      }
    } catch (error) {
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Authentication check failed',
      });
    }
  }, []);

  const login = useCallback(async (credentials: LoginCredentials) => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
      
      const response = await webhookService.login(credentials);
      
      if (response.success && response.data) {
        const user = response.data.user;
        const token = response.data.token;
        
        // Store user data and token
        localStorage.setItem('elevea_user', JSON.stringify(user));
        localStorage.setItem('elevea_token', token);
        
        setAuthState({
          user,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
        
        return { success: true, user };
      } else {
        setAuthState(prev => ({
          ...prev,
          isLoading: false,
          error: response.error || 'Login failed',
        }));
        return { success: false, error: response.error };
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed';
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));
      return { success: false, error: errorMessage };
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('elevea_user');
    localStorage.removeItem('elevea_token');
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
  }, []);

  const resetPassword = useCallback(async (email: string) => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
      
      const response = await webhookService.resetPassword(email);
      
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: response.success ? null : response.error || 'Reset password failed',
      }));
      
      return response;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Reset password failed';
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));
      return { success: false, error: errorMessage };
    }
  }, []);

  const refreshUser = useCallback(async () => {
    if (authState.user) {
      await checkAuthStatus();
    }
  }, [authState.user, checkAuthStatus]);

  return {
    ...authState,
    login,
    logout,
    resetPassword,
    refreshUser,
    checkAuthStatus,
  };
};
