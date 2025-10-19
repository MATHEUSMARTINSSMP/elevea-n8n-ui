import { useState, useEffect, useCallback } from 'react';
import { webhookService } from '../lib/webhooks';
import { useAuth } from './useAuth';

export interface VIPStatus {
  is_vip: boolean;
  vip_level?: 'basic' | 'premium' | 'enterprise';
  expires_at?: string;
  features?: string[];
  billing_status?: 'active' | 'inactive' | 'suspended' | 'overdue';
}

export interface VIPFeatures {
  can_create_sites: boolean;
  can_use_analytics: boolean;
  can_use_whatsapp: boolean;
  can_use_chatwoot: boolean;
  can_use_ai_features: boolean;
  max_sites: number;
  max_storage: number; // in MB
  support_level: 'basic' | 'priority' | 'dedicated';
}

export const useVIP = () => {
  const { user, isAuthenticated } = useAuth();
  const [vipStatus, setVipStatus] = useState<VIPStatus | null>(null);
  const [vipFeatures, setVipFeatures] = useState<VIPFeatures | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check VIP status when user changes
  useEffect(() => {
    if (isAuthenticated && user) {
      checkVIPStatus();
    } else {
      setVipStatus(null);
      setVipFeatures(null);
    }
  }, [isAuthenticated, user]);

  const checkVIPStatus = useCallback(async () => {
    if (!user) return;

    try {
      setIsLoading(true);
      setError(null);

      const response = await webhookService.checkVIPStatus(user.id);

      if (response.success && response.data) {
        setVipStatus(response.data);
        setVipFeatures(response.data.features || getDefaultVIPFeatures(response.data.vip_level));
      } else {
        setError(response.error || 'Failed to check VIP status');
        setVipStatus({ is_vip: false });
        setVipFeatures(getDefaultVIPFeatures('basic'));
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to check VIP status');
      setVipStatus({ is_vip: false });
      setVipFeatures(getDefaultVIPFeatures('basic'));
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  const getDefaultVIPFeatures = (level: string): VIPFeatures => {
    switch (level) {
      case 'enterprise':
        return {
          can_create_sites: true,
          can_use_analytics: true,
          can_use_whatsapp: true,
          can_use_chatwoot: true,
          can_use_ai_features: true,
          max_sites: -1, // unlimited
          max_storage: 10000, // 10GB
          support_level: 'dedicated',
        };
      case 'premium':
        return {
          can_create_sites: true,
          can_use_analytics: true,
          can_use_whatsapp: true,
          can_use_chatwoot: true,
          can_use_ai_features: true,
          max_sites: 5,
          max_storage: 1000, // 1GB
          support_level: 'priority',
        };
      case 'basic':
      default:
        return {
          can_create_sites: true,
          can_use_analytics: false,
          can_use_whatsapp: false,
          can_use_chatwoot: false,
          can_use_ai_features: false,
          max_sites: 1,
          max_storage: 100, // 100MB
          support_level: 'basic',
        };
    }
  };

  const hasFeature = useCallback((feature: keyof VIPFeatures): boolean => {
    if (!vipFeatures || !vipStatus?.is_vip) return false;
    return vipFeatures[feature] as boolean;
  }, [vipFeatures, vipStatus]);

  const canCreateMoreSites = useCallback((): boolean => {
    if (!vipFeatures || !vipStatus?.is_vip) return false;
    if (vipFeatures.max_sites === -1) return true; // unlimited
    // TODO: Get current site count from user data
    return true; // For now, assume user can create more sites
  }, [vipFeatures, vipStatus]);

  const isVIPExpired = useCallback((): boolean => {
    if (!vipStatus?.expires_at) return false;
    return new Date(vipStatus.expires_at) < new Date();
  }, [vipStatus]);

  const getDaysUntilExpiration = useCallback((): number | null => {
    if (!vipStatus?.expires_at) return null;
    const expirationDate = new Date(vipStatus.expires_at);
    const now = new Date();
    const diffTime = expirationDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }, [vipStatus]);

  const shouldShowVIPWarning = useCallback((): boolean => {
    const daysUntilExpiration = getDaysUntilExpiration();
    return daysUntilExpiration !== null && daysUntilExpiration <= 7;
  }, [getDaysUntilExpiration]);

  const getVIPDisplayName = useCallback((): string => {
    if (!vipStatus?.is_vip) return 'Free';
    return vipStatus.vip_level ? vipStatus.vip_level.charAt(0).toUpperCase() + vipStatus.vip_level.slice(1) : 'VIP';
  }, [vipStatus]);

  const getVIPColor = useCallback((): string => {
    if (!vipStatus?.is_vip) return 'gray';
    switch (vipStatus.vip_level) {
      case 'enterprise': return 'purple';
      case 'premium': return 'blue';
      case 'basic': return 'green';
      default: return 'gray';
    }
  }, [vipStatus]);

  return {
    vipStatus,
    vipFeatures,
    isLoading,
    error,
    isVIP: vipStatus?.is_vip || false,
    vipLevel: vipStatus?.vip_level || 'basic',
    billingStatus: vipStatus?.billing_status || 'inactive',
    hasFeature,
    canCreateMoreSites,
    isVIPExpired,
    getDaysUntilExpiration,
    shouldShowVIPWarning,
    getVIPDisplayName,
    getVIPColor,
    refreshVIPStatus: checkVIPStatus,
  };
};
