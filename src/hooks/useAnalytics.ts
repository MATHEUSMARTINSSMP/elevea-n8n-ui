import { useState, useEffect, useCallback } from 'react';
import { webhookService } from '../lib/webhooks';

export interface AnalyticsData {
  totalEvents: number;
  uniquePages: number;
  avgEventsPerPage: number;
  eventsByType: Record<string, number>;
  deviceBreakdown: Record<string, number>;
  browserBreakdown: Record<string, number>;
  topEvents: Array<[string, number]>;
  topPages: Array<[string, number]>;
}

export interface AnalyticsEvent {
  siteSlug: string;
  eventType: string;
  eventData?: any;
  pageUrl?: string;
  referrer?: string;
  ipAddress?: string;
  userAgent?: string;
}

export const useAnalytics = (siteSlug?: string) => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadAnalytics = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await webhookService.getAnalytics(siteSlug);

      if (response.success && response.data) {
        setAnalyticsData(response.data.analytics || response.data);
      } else {
        setError(response.error || 'Failed to load analytics');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to load analytics');
    } finally {
      setIsLoading(false);
    }
  }, [siteSlug]);

  const trackEvent = useCallback(async (event: AnalyticsEvent) => {
    try {
      const response = await webhookService.trackEvent(event);
      
      if (!response.success) {
        console.error('Failed to track event:', response.error);
      }
      
      return response.success;
    } catch (error) {
      console.error('Error tracking event:', error);
      return false;
    }
  }, []);

  const trackPageView = useCallback(async (pageUrl: string, siteSlug: string) => {
    return trackEvent({
      siteSlug,
      eventType: 'pageview',
      pageUrl,
      userAgent: navigator.userAgent,
    });
  }, [trackEvent]);

  const trackClick = useCallback(async (element: string, pageUrl: string, siteSlug: string) => {
    return trackEvent({
      siteSlug,
      eventType: 'click',
      eventData: { element },
      pageUrl,
    });
  }, [trackEvent]);

  const trackFormSubmit = useCallback(async (formName: string, pageUrl: string, siteSlug: string) => {
    return trackEvent({
      siteSlug,
      eventType: 'form_submit',
      eventData: { formName },
      pageUrl,
    });
  }, [trackEvent]);

  const trackConversion = useCallback(async (conversionType: string, value?: number, pageUrl?: string, siteSlug?: string) => {
    if (!siteSlug) return false;
    
    return trackEvent({
      siteSlug,
      eventType: 'conversion',
      eventData: { conversionType, value },
      pageUrl,
    });
  }, [trackEvent]);

  // Load analytics on mount
  useEffect(() => {
    if (siteSlug) {
      loadAnalytics();
    }
  }, [siteSlug, loadAnalytics]);

  return {
    analyticsData,
    isLoading,
    error,
    loadAnalytics,
    trackEvent,
    trackPageView,
    trackClick,
    trackFormSubmit,
    trackConversion,
  };
};
