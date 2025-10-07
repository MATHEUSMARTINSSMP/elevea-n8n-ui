import { useState, useCallback } from 'react';
import { apiRequest } from '../lib/api';

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface UseApiReturn<T> extends UseApiState<T> {
  execute: (...args: any[]) => Promise<{ success: boolean; data?: T; error?: string }>;
  reset: () => void;
}

export function useApi<T = any>(
  apiFunction: (...args: any[]) => Promise<{ success: boolean; data?: T; error?: string }>
): UseApiReturn<T> {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(async (...args: any[]) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const response = await apiFunction(...args);
      
      if (response.success) {
        setState({
          data: response.data || null,
          loading: false,
          error: null,
        });
      } else {
        setState({
          data: null,
          loading: false,
          error: response.error || 'Erro desconhecido',
        });
      }
      
      return response;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      setState({
        data: null,
        loading: false,
        error: errorMessage,
      });
      
      return {
        success: false,
        error: errorMessage,
      };
    }
  }, [apiFunction]);

  const reset = useCallback(() => {
    setState({
      data: null,
      loading: false,
      error: null,
    });
  }, []);

  return {
    ...state,
    execute,
    reset,
  };
}

// Hooks específicos para cada funcionalidade
export function useClientPlan(siteSlug: string) {
  return useApi(() => apiRequest('/client_plan', {
    method: 'POST',
    body: JSON.stringify({ siteSlug }),
  }));
}

export function useWhatsAppMessages(siteSlug: string) {
  return useApi(() => apiRequest('/wa/list', {
    method: 'POST',
    body: JSON.stringify({ siteSlug }),
  }));
}

export function useReviews(siteSlug: string) {
  return useApi(() => apiRequest('/reviews/list', {
    method: 'POST',
    body: JSON.stringify({ siteSlug }),
  }));
}

export function useFeedbacks(siteSlug: string) {
  return useApi(() => apiRequest('/feedbacks/list', {
    method: 'POST',
    body: JSON.stringify({ siteSlug }),
  }));
}
