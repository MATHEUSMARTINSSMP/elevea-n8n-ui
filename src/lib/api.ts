// Configuração da API para integração com n8n via Netlify Functions
export const API_CONFIG = {
  baseUrl: '/.netlify/functions/api',
  endpoints: {
    // Autenticação e clientes
    clientPlan: '/client_plan',
    authStatus: '/auth_status',
    
    // WhatsApp
    waList: '/wa/list',
    waSend: '/wa/send',
    
    // Google My Business
    reviewsList: '/reviews/list',
    reviewsSync: '/reviews/sync',
    
    // Feedbacks
    feedbacksList: '/feedbacks/list',
    feedbacksSubmit: '/feedbacks/submit',
    
    // Onboarding
    onboardingSave: '/onboarding/save',
    onboardingGet: '/onboarding/get',
    
    // Analytics
    analytics: '/analytics',
    
    // Templates
    templates: '/templates',
  },
} as const;

// Helper para fazer requisições para n8n via Netlify Functions
export const apiRequest = async <T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<{ success: boolean; data?: T; error?: string }> => {
  try {
    const response = await fetch(`${API_CONFIG.baseUrl}${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      credentials: 'omit',
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error('API Request Error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erro desconhecido',
    };
  }
};

// Funções específicas para cada endpoint
export const api = {
  // Cliente e autenticação
  getClientPlan: (siteSlug: string) =>
    apiRequest(API_CONFIG.endpoints.clientPlan, {
      method: 'POST',
      body: JSON.stringify({ siteSlug }),
    }),

  getAuthStatus: (siteSlug: string) =>
    apiRequest(API_CONFIG.endpoints.authStatus, {
      method: 'POST',
      body: JSON.stringify({ siteSlug }),
    }),

  // WhatsApp
  getWhatsAppMessages: (siteSlug: string) =>
    apiRequest(API_CONFIG.endpoints.waList, {
      method: 'POST',
      body: JSON.stringify({ siteSlug }),
    }),

  sendWhatsAppMessage: (siteSlug: string, message: string, phone?: string) =>
    apiRequest(API_CONFIG.endpoints.waSend, {
      method: 'POST',
      body: JSON.stringify({ siteSlug, message, phone }),
    }),

  // Google Reviews
  getReviews: (siteSlug: string) =>
    apiRequest(API_CONFIG.endpoints.reviewsList, {
      method: 'POST',
      body: JSON.stringify({ siteSlug }),
    }),

  syncReviews: (siteSlug: string) =>
    apiRequest(API_CONFIG.endpoints.reviewsSync, {
      method: 'POST',
      body: JSON.stringify({ siteSlug }),
    }),

  // Feedbacks
  getFeedbacks: (siteSlug: string) =>
    apiRequest(API_CONFIG.endpoints.feedbacksList, {
      method: 'POST',
      body: JSON.stringify({ siteSlug }),
    }),

  submitFeedback: (siteSlug: string, feedback: { name: string; rating: number; comment: string }) =>
    apiRequest(API_CONFIG.endpoints.feedbacksSubmit, {
      method: 'POST',
      body: JSON.stringify({ siteSlug, ...feedback }),
    }),

  // Onboarding
  saveOnboarding: (siteSlug: string, formData: any) =>
    apiRequest(API_CONFIG.endpoints.onboardingSave, {
      method: 'POST',
      body: JSON.stringify({ siteSlug, formData }),
    }),

  getOnboarding: (siteSlug: string) =>
    apiRequest(API_CONFIG.endpoints.onboardingGet, {
      method: 'POST',
      body: JSON.stringify({ siteSlug }),
    }),

  // Analytics
  getAnalytics: (siteSlug: string) =>
    apiRequest(API_CONFIG.endpoints.analytics, {
      method: 'POST',
      body: JSON.stringify({ siteSlug }),
    }),

  // Templates
  getTemplates: () =>
    apiRequest(API_CONFIG.endpoints.templates),
};
