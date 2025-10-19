import { useState, useCallback } from 'react';
import { webhookService } from '../lib/webhooks';

export interface AdminAction {
  siteSlug: string;
  action: 'block' | 'unblock' | 'suspend' | 'activate';
  reason: string;
  admin: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  site_slug: string;
  status: 'active' | 'blocked' | 'inactive' | 'suspended';
  role: 'client' | 'admin';
  created_at: string;
  updated_at: string;
}

export interface SiteStatus {
  siteSlug: string;
  status: 'active' | 'blocked' | 'inactive' | 'suspended';
  lastUpdated: string;
  updatedBy: string;
  reason?: string;
}

export const useAdmin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const blockSite = useCallback(async (data: Omit<AdminAction, 'action'>) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await webhookService.blockSite({
        ...data,
        action: 'block',
      });

      if (!response.success) {
        setError(response.error || 'Failed to block site');
        return { success: false, error: response.error };
      }

      return { success: true, data: response.data };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to block site';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const unblockSite = useCallback(async (data: Omit<AdminAction, 'action'>) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await webhookService.unblockSite(data);

      if (!response.success) {
        setError(response.error || 'Failed to unblock site');
        return { success: false, error: response.error };
      }

      return { success: true, data: response.data };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to unblock site';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const suspendSite = useCallback(async (data: Omit<AdminAction, 'action'>) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await webhookService.suspendSite(data);

      if (!response.success) {
        setError(response.error || 'Failed to suspend site');
        return { success: false, error: response.error };
      }

      return { success: true, data: response.data };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to suspend site';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const activateSite = useCallback(async (data: Omit<AdminAction, 'action'>) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await webhookService.activateSite(data);

      if (!response.success) {
        setError(response.error || 'Failed to activate site');
        return { success: false, error: response.error };
      }

      return { success: true, data: response.data };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to activate site';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getUserList = useCallback(async (): Promise<{ success: boolean; data?: User[]; error?: string }> => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await webhookService.getUserList();

      if (!response.success) {
        setError(response.error || 'Failed to get user list');
        return { success: false, error: response.error };
      }

      return { success: true, data: response.data };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to get user list';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getSiteStatus = useCallback(async (siteSlug: string): Promise<{ success: boolean; data?: SiteStatus; error?: string }> => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await webhookService.getSiteStatus(siteSlug);

      if (!response.success) {
        setError(response.error || 'Failed to get site status');
        return { success: false, error: response.error };
      }

      return { success: true, data: response.data };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to get site status';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getStatusColor = useCallback((status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'blocked': return 'text-red-600 bg-red-100';
      case 'inactive': return 'text-gray-600 bg-gray-100';
      case 'suspended': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  }, []);

  const getStatusText = useCallback((status: string) => {
    switch (status) {
      case 'active': return 'Ativo';
      case 'blocked': return 'Bloqueado';
      case 'inactive': return 'Inativo';
      case 'suspended': return 'Suspenso';
      default: return 'Desconhecido';
    }
  }, []);

  return {
    isLoading,
    error,
    blockSite,
    unblockSite,
    suspendSite,
    activateSite,
    getUserList,
    getSiteStatus,
    getStatusColor,
    getStatusText,
  };
};
