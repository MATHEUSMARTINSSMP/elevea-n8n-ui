// Webhook Integration with N8N Backend
import { WEBHOOK_ENDPOINTS } from './webhook-endpoints';

const N8N_BASE_URL = 'https://fluxos.eleveaagencia.com.br';

export interface WebhookResponse {
  success: boolean;
  data?: any;
  error?: string;
  statusCode?: number;
}

export interface OnboardingStartData {
  email: string;
  name: string;
  company: string;
  phone?: string;
  user_id?: string;
  company_history?: string;
  mission?: string;
  vision?: string;
  values?: string;
  main_products?: string;
  services_description?: string;
  address?: string;
  whatsapp?: string;
  instagram?: string;
  facebook?: string;
  business_hours?: string;
  color_primary?: string;
  color_secondary?: string;
  color_accent?: string;
  visual_style?: string;
  logo_url?: string;
  site_type?: string;
  desired_sections?: string;
  company_images?: string[];
  product_images?: string[];
}

export interface GeneratePromptData {
  site_slug: string;
}

class WebhookService {
  private baseURL: string;

  constructor() {
    this.baseURL = N8N_BASE_URL;
  }

  private async makeRequest(endpoint: string, data: any): Promise<WebhookResponse> {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      return {
        success: response.ok,
        data: result,
        statusCode: response.status,
        error: response.ok ? undefined : result.error || 'Unknown error'
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Network error',
        statusCode: 0
      };
    }
  }

  // Onboarding Webhooks
  async startOnboarding(data: OnboardingStartData): Promise<WebhookResponse> {
    return this.makeRequest('/webhook-test/onboarding-start', data);
  }

  async generatePrompt(data: GeneratePromptData): Promise<WebhookResponse> {
    return this.makeRequest('/webhook-test/generate-prompt', data);
  }

  // Authentication Webhooks
  async login(credentials: { email: string; password: string }): Promise<WebhookResponse> {
    return this.makeRequest(WEBHOOK_ENDPOINTS.AUTH.LOGIN, credentials);
  }

  async register(userData: { email: string; name: string; password: string }): Promise<WebhookResponse> {
    return this.makeRequest(WEBHOOK_ENDPOINTS.AUTH.REGISTER, userData);
  }

  async resetPassword(email: string): Promise<WebhookResponse> {
    return this.makeRequest(WEBHOOK_ENDPOINTS.AUTH.RESET_PASSWORD, { email });
  }

  async verifyToken(token: string): Promise<WebhookResponse> {
    return this.makeRequest(WEBHOOK_ENDPOINTS.AUTH.VERIFY_TOKEN, { token });
  }

  async checkVIPStatus(userId: string): Promise<WebhookResponse> {
    return this.makeRequest(WEBHOOK_ENDPOINTS.AUTH.CHECK_VIP_STATUS, { user_id: userId });
  }

  // Admin Webhooks
  async blockSite(data: { siteSlug: string; action: string; reason: string; admin: string }): Promise<WebhookResponse> {
    return this.makeRequest(WEBHOOK_ENDPOINTS.ADMIN.BLOCK_SITE, data);
  }

  async unblockSite(data: { siteSlug: string; reason: string; admin: string }): Promise<WebhookResponse> {
    return this.makeRequest(WEBHOOK_ENDPOINTS.ADMIN.UNBLOCK_SITE, data);
  }

  async suspendSite(data: { siteSlug: string; reason: string; admin: string }): Promise<WebhookResponse> {
    return this.makeRequest(WEBHOOK_ENDPOINTS.ADMIN.SUSPEND_SITE, data);
  }

  async activateSite(data: { siteSlug: string; reason: string; admin: string }): Promise<WebhookResponse> {
    return this.makeRequest(WEBHOOK_ENDPOINTS.ADMIN.ACTIVATE_SITE, data);
  }

  async getUserList(): Promise<WebhookResponse> {
    return this.makeRequest(WEBHOOK_ENDPOINTS.ADMIN.GET_USER_LIST, {});
  }

  async getSiteStatus(siteSlug: string): Promise<WebhookResponse> {
    return this.makeRequest(WEBHOOK_ENDPOINTS.ADMIN.GET_SITE_STATUS, { siteSlug });
  }

  // Analytics Webhooks
  async trackEvent(data: {
    siteSlug: string;
    eventType: string;
    eventData?: any;
    pageUrl?: string;
    referrer?: string;
    ipAddress?: string;
    userAgent?: string;
  }): Promise<WebhookResponse> {
    return this.makeRequest(WEBHOOK_ENDPOINTS.ANALYTICS.TRACK_EVENT, data);
  }

  async getAnalytics(siteSlug?: string): Promise<WebhookResponse> {
    const endpoint = siteSlug 
      ? `${WEBHOOK_ENDPOINTS.ANALYTICS.GET_DASHBOARD}?siteSlug=${siteSlug}`
      : WEBHOOK_ENDPOINTS.ANALYTICS.GET_DASHBOARD;
    
    try {
      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();

      return {
        success: response.ok,
        data: result,
        statusCode: response.status,
        error: response.ok ? undefined : result.error || 'Unknown error'
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Network error',
        statusCode: 0
      };
    }
  }

  async getTraffic(siteSlug?: string): Promise<WebhookResponse> {
    const endpoint = siteSlug 
      ? `${WEBHOOK_ENDPOINTS.ANALYTICS.GET_TRAFFIC}?siteSlug=${siteSlug}`
      : WEBHOOK_ENDPOINTS.ANALYTICS.GET_TRAFFIC;
    
    try {
      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();

      return {
        success: response.ok,
        data: result,
        statusCode: response.status,
        error: response.ok ? undefined : result.error || 'Unknown error'
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Network error',
        statusCode: 0
      };
    }
  }

  // Billing Webhooks
  async createInvoice(data: {
    userId: string;
    amount: number;
    description: string;
    dueDate: string;
  }): Promise<WebhookResponse> {
    return this.makeRequest(WEBHOOK_ENDPOINTS.BILLING.CREATE_INVOICE, data);
  }

  async processPayment(data: {
    invoiceId: string;
    paymentMethod: string;
    amount: number;
  }): Promise<WebhookResponse> {
    return this.makeRequest(WEBHOOK_ENDPOINTS.BILLING.PROCESS_PAYMENT, data);
  }

  async checkPaymentStatus(paymentId: string): Promise<WebhookResponse> {
    return this.makeRequest(WEBHOOK_ENDPOINTS.BILLING.CHECK_PAYMENT_STATUS, { paymentId });
  }

  async getInvoices(userId?: string): Promise<WebhookResponse> {
    const data = userId ? { userId } : {};
    return this.makeRequest(WEBHOOK_ENDPOINTS.BILLING.GET_INVOICES, data);
  }

  async updatePlan(data: {
    userId: string;
    planType: string;
    billingCycle: string;
  }): Promise<WebhookResponse> {
    return this.makeRequest(WEBHOOK_ENDPOINTS.BILLING.UPDATE_PLAN, data);
  }

  // Content Webhooks
  async createSite(data: {
    userId: string;
    siteName: string;
    siteSlug: string;
    template?: string;
  }): Promise<WebhookResponse> {
    return this.makeRequest(WEBHOOK_ENDPOINTS.CONTENT.CREATE_SITE, data);
  }

  async updateSite(data: {
    siteSlug: string;
    updates: any;
  }): Promise<WebhookResponse> {
    return this.makeRequest(WEBHOOK_ENDPOINTS.CONTENT.UPDATE_SITE, data);
  }

  async deleteSite(siteSlug: string): Promise<WebhookResponse> {
    return this.makeRequest(WEBHOOK_ENDPOINTS.CONTENT.DELETE_SITE, { siteSlug });
  }

  async getSiteData(siteSlug: string): Promise<WebhookResponse> {
    return this.makeRequest(WEBHOOK_ENDPOINTS.CONTENT.GET_SITE_DATA, { siteSlug });
  }

  async publishSite(siteSlug: string): Promise<WebhookResponse> {
    return this.makeRequest(WEBHOOK_ENDPOINTS.CONTENT.PUBLISH_SITE, { siteSlug });
  }

  async getSiteList(userId?: string): Promise<WebhookResponse> {
    const data = userId ? { userId } : {};
    return this.makeRequest(WEBHOOK_ENDPOINTS.CONTENT.GET_SITE_LIST, data);
  }

  // MCP Integration Webhooks
  async sendWhatsAppMessage(data: {
    phone: string;
    message: string;
    siteSlug?: string;
  }): Promise<WebhookResponse> {
    return this.makeRequest(WEBHOOK_ENDPOINTS.MCP.WHATSAPP_SEND, data);
  }

  async sendChatwootMessage(data: {
    accountId: string;
    conversationId: string;
    message: string;
    url?: string;
  }): Promise<WebhookResponse> {
    return this.makeRequest(WEBHOOK_ENDPOINTS.MCP.CHATWOOT_SEND, data);
  }

  async sendTelegramMessage(data: {
    chatId: string;
    message: string;
    parseMode?: string;
  }): Promise<WebhookResponse> {
    return this.makeRequest(WEBHOOK_ENDPOINTS.MCP.TELEGRAM_SEND, data);
  }

  async generateWithOpenAI(data: {
    prompt: string;
    model?: string;
    maxTokens?: number;
  }): Promise<WebhookResponse> {
    return this.makeRequest(WEBHOOK_ENDPOINTS.MCP.OPENAI_GENERATE, data);
  }

  async textToSpeech(data: {
    text: string;
    voice?: string;
    model?: string;
  }): Promise<WebhookResponse> {
    return this.makeRequest(WEBHOOK_ENDPOINTS.MCP.ELEVENLABS_TTS, data);
  }

  async googleCalendarAction(data: {
    action: 'create' | 'update' | 'delete' | 'list';
    eventData?: any;
    calendarId?: string;
    eventId?: string;
  }): Promise<WebhookResponse> {
    return this.makeRequest(WEBHOOK_ENDPOINTS.MCP.GOOGLE_CALENDAR, data);
  }
}

export const webhookService = new WebhookService();
