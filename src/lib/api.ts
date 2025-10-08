// Configuração da API para integração com n8n via Netlify Functions
export const API_CONFIG = {
  baseUrl: '/.netlify/functions/api',
  endpoints: {
    // Autenticação e clientes
    clientPlan: '/client_plan',
    authStatus: '/auth_status',
    
    // WhatsApp Business API (Oficial - Disparos em massa)
    whatsappBulkSend: '/whatsapp/send-bulk',
    
    // Evolution API (Não oficial - Mensagens com IA)
    whatsappAISend: '/whatsapp/send-ai',
    whatsappGetMessages: '/whatsapp/get-messages',
    whatsappEvolutionWebhook: '/whatsapp/evolution-webhook',
    
    // WhatsApp - endpoints legados (compatibilidade)
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
    
    // Leads
    leadsCapture: '/leads/capture',
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

  // WhatsApp Business API (Oficial) - Disparos em Massa
  sendWhatsAppBulk: (siteSlug: string, recipients: string[], message: string, mediaUrl?: string) =>
    apiRequest(API_CONFIG.endpoints.whatsappBulkSend, {
      method: 'POST',
      body: JSON.stringify({ siteSlug, recipients, message, mediaUrl }),
    }),

  // Evolution API (Não oficial) - Mensagens com IA
  sendWhatsAppWithAI: (siteSlug: string, phone: string, message: string, useAI: boolean = false, context?: string) =>
    apiRequest(API_CONFIG.endpoints.whatsappAISend, {
      method: 'POST',
      body: JSON.stringify({ siteSlug, phone, message, useAI, context }),
    }),

  getWhatsAppMessages: (siteSlug: string, phone?: string, limit?: number) =>
    apiRequest(API_CONFIG.endpoints.whatsappGetMessages, {
      method: 'POST',
      body: JSON.stringify({ siteSlug, phone, limit }),
    }),

  // WhatsApp - Funções legadas (compatibilidade)
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

  submitFeedback: (siteSlug: string, feedback: { name: string; rating: number; comment: string; email?: string; phone?: string }) =>
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

  // Leads
  captureL: (siteSlug: string, lead: { name: string; email: string; phone?: string; source?: string; score?: number }) =>
    apiRequest(API_CONFIG.endpoints.leadsCapture, {
      method: 'POST',
      body: JSON.stringify({ siteSlug, ...lead }),
    }),
};