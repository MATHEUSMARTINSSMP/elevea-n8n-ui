// Analytics Library - Compatível com múltiplos provedores
import { useCallback, useState } from 'react';

// Tipos para analytics
export interface AnalyticsUser {
  id: string;
  email: string;
  role?: string;
  siteSlug?: string;
  plan?: string;
}

export interface AnalyticsEvent {
  event: string;
  properties?: Record<string, any>;
  timestamp?: Date;
}

// Configuração do analytics
interface AnalyticsConfig {
  enabled: boolean;
  debug: boolean;
  provider: 'none' | 'google' | 'mixpanel' | 'posthog' | 'custom';
  apiKey?: string;
  projectId?: string;
}

// Estado global do analytics
let analyticsInstance: AnalyticsAdapter | null = null;
let currentUser: AnalyticsUser | null = null;

// Interface para adapters de analytics
interface AnalyticsAdapter {
  init(config: AnalyticsConfig): Promise<void>;
  identify(user: AnalyticsUser, hasConsent?: boolean): void;
  reset(): void;
  trackEvent(event: string, properties?: Record<string, any>): void;
  trackPage(page: string, properties?: Record<string, any>): void;
  setUserProperty(key: string, value: any): void;
  featureUsed?(feature: string, properties?: Record<string, any>): void;
}

// Adapter básico (NOOP)
class NoopAnalyticsAdapter implements AnalyticsAdapter {
  async init(config: AnalyticsConfig): Promise<void> {
    console.log('[Analytics] NOOP adapter initialized');
  }

  identify(user: AnalyticsUser, hasConsent?: boolean): void {
    console.log('[Analytics] NOOP identify:', user);
  }

  reset(): void {
    console.log('[Analytics] NOOP reset');
  }

  trackEvent(event: string, properties?: Record<string, any>): void {
    console.log('[Analytics] NOOP trackEvent:', event, properties);
  }

  trackPage(page: string, properties?: Record<string, any>): void {
    console.log('[Analytics] NOOP trackPage:', page, properties);
  }

  setUserProperty(key: string, value: any): void {
    console.log('[Analytics] NOOP setUserProperty:', key, value);
  }

  featureUsed?(feature: string, properties?: Record<string, any>): void {
    console.log('[Analytics] NOOP featureUsed:', feature, properties);
  }
}

// Adapter para Google Analytics 4
class GoogleAnalyticsAdapter implements AnalyticsAdapter {
  private gtag: any;

  async init(config: AnalyticsConfig): Promise<void> {
    if (typeof window === 'undefined') return;

    // Carregar Google Analytics
    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=${config.apiKey}`;
    script.async = true;
    document.head.appendChild(script);

    return new Promise((resolve) => {
      script.onload = () => {
        this.gtag = (window as any).gtag;
        this.gtag('config', config.apiKey, {
          send_page_view: false, // Controlamos manualmente
        });
        resolve();
      };
    });
  }

  identify(user: AnalyticsUser, hasConsent?: boolean): void {
    if (!this.gtag) return;
    
    this.gtag('config', 'GA_MEASUREMENT_ID', {
      user_id: user.id,
      custom_map: {
        user_role: user.role,
        user_plan: user.plan,
        site_slug: user.siteSlug,
      },
    });
  }

  reset(): void {
    if (!this.gtag) return;
    this.gtag('config', 'GA_MEASUREMENT_ID', {
      user_id: null,
    });
  }

  trackEvent(event: string, properties?: Record<string, any>): void {
    if (!this.gtag) return;
    this.gtag('event', event, properties);
  }

  trackPage(page: string, properties?: Record<string, any>): void {
    if (!this.gtag) return;
    this.gtag('event', 'page_view', {
      page_title: page,
      page_location: window.location.href,
      ...properties,
    });
  }

  setUserProperty(key: string, value: any): void {
    if (!this.gtag) return;
    this.gtag('config', 'GA_MEASUREMENT_ID', {
      [key]: value,
    });
  }
}

// Adapter customizado para N8N
class N8NAnalyticsAdapter implements AnalyticsAdapter {
  private baseURL: string;

  constructor() {
    this.baseURL = 'https://fluxos.eleveaagencia.com.br/webhook/api/analytics';
  }

  async init(config: AnalyticsConfig): Promise<void> {
    console.log('[Analytics] N8N adapter initialized');
  }

  identify(user: AnalyticsUser, hasConsent?: boolean): void {
    currentUser = user;
    console.log('[Analytics] N8N identify:', user);
  }

  reset(): void {
    currentUser = null;
    console.log('[Analytics] N8N reset');
  }

  trackEvent(event: string, properties?: Record<string, any>): void {
    // Enviar evento para N8N
    this.sendToN8N('track', {
      event,
      properties: {
        ...properties,
        user_id: currentUser?.id,
        user_email: currentUser?.email,
        timestamp: new Date().toISOString(),
      },
    });
  }

  trackPage(page: string, properties?: Record<string, any>): void {
    this.sendToN8N('page', {
      page,
      properties: {
        ...properties,
        user_id: currentUser?.id,
        user_email: currentUser?.email,
        timestamp: new Date().toISOString(),
      },
    });
  }

  setUserProperty(key: string, value: any): void {
    if (currentUser) {
      (currentUser as any)[key] = value;
    }
  }

  private async sendToN8N(type: string, data: any): Promise<void> {
    try {
      await fetch(`${this.baseURL}/track`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type,
          data,
        }),
      });
    } catch (error) {
      console.warn('[Analytics] Failed to send to N8N:', error);
    }
  }
}

// Configuração padrão
const defaultConfig: AnalyticsConfig = {
  enabled: true,
  debug: process.env.NODE_ENV === 'development',
  provider: 'n8n', // Usar N8N por padrão
};

// Instância global do analytics
export const analytics: AnalyticsAdapter = new N8NAnalyticsAdapter();

// Função para inicializar analytics
export async function initAnalytics(config: Partial<AnalyticsConfig> = {}): Promise<void> {
  const finalConfig = { ...defaultConfig, ...config };
  
  if (!finalConfig.enabled) {
    analyticsInstance = new NoopAnalyticsAdapter();
    return;
  }

  switch (finalConfig.provider) {
    case 'google':
      analyticsInstance = new GoogleAnalyticsAdapter();
      break;
    case 'n8n':
      analyticsInstance = new N8NAnalyticsAdapter();
      break;
    default:
      analyticsInstance = new NoopAnalyticsAdapter();
  }

  await analyticsInstance.init(finalConfig);
}

// Função para identificar usuário
export function identifyUser(user: AnalyticsUser, hasConsent: boolean = false): void {
  if (analyticsInstance) {
    analyticsInstance.identify(user, hasConsent);
  }
}

// Função para resetar usuário
export function resetUser(): void {
  if (analyticsInstance) {
    analyticsInstance.reset();
  }
}

// Hook para usar analytics
export function useAnalytics() {
  const [isReady, setIsReady] = useState(false);

  // Verificar se analytics está pronto
  useCallback(() => {
    setIsReady(!!analyticsInstance);
  }, []);

  const trackEvent = useCallback((event: string, properties?: Record<string, any>) => {
    if (analyticsInstance) {
      analyticsInstance.trackEvent(event, properties);
    }
  }, []);

  const trackPage = useCallback((page: string, properties?: Record<string, any>) => {
    if (analyticsInstance) {
      analyticsInstance.trackPage(page, properties);
    }
  }, []);

  const setUserProperty = useCallback((key: string, value: any) => {
    if (analyticsInstance) {
      analyticsInstance.setUserProperty(key, value);
    }
  }, []);

  const featureUsed = useCallback((feature: string, properties?: Record<string, any>) => {
    if (analyticsInstance?.featureUsed) {
      analyticsInstance.featureUsed(feature, properties);
    }
  }, []);

  return {
    isReady,
    trackEvent,
    trackPage,
    setUserProperty,
    featureUsed,
  };
}

// Utilitários para tracking
export const trackEvent = (event: string, properties?: Record<string, any>) => {
  if (analyticsInstance) {
    analyticsInstance.trackEvent(event, properties);
  }
};

export const trackPage = (page: string, properties?: Record<string, any>) => {
  if (analyticsInstance) {
    analyticsInstance.trackPage(page, properties);
  }
};

export const setUserProperty = (key: string, value: any) => {
  if (analyticsInstance) {
    analyticsInstance.setUserProperty(key, value);
  }
};

// Exportar tudo que o AnalyticsProvider precisa
export {
  AnalyticsUser,
  AnalyticsEvent,
  AnalyticsConfig,
  AnalyticsAdapter,
};
