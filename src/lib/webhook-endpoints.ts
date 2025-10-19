// N8N Webhook Endpoints Configuration
const N8N_BASE_URL = 'https://fluxos.eleveaagencia.com.br';

export const WEBHOOK_ENDPOINTS = {
  // AUTH Workflows
  AUTH: {
    LOGIN: `${N8N_BASE_URL}/webhook/api/auth/login`,
    REGISTER: `${N8N_BASE_URL}/webhook-test/auth/register`,
    RESET_PASSWORD: `${N8N_BASE_URL}/webhook-test/auth/reset-password`,
    VERIFY_TOKEN: `${N8N_BASE_URL}/webhook-test/auth/verify-token`,
    CHECK_VIP_STATUS: `${N8N_BASE_URL}/webhook-test/auth/check-vip`,
  },

  // ONBOARDING Workflows
  ONBOARDING: {
    START: `${N8N_BASE_URL}/webhook-test/onboarding/start`,
    GENERATE_PROMPT: `${N8N_BASE_URL}/webhook-test/onboarding/generate-prompt`,
    COMPLETE_STEP: `${N8N_BASE_URL}/webhook-test/onboarding/complete-step`,
    FINALIZE: `${N8N_BASE_URL}/webhook-test/onboarding/finalize`,
  },

  // ANALYTICS Workflows
  ANALYTICS: {
    TRACK_EVENT: `${N8N_BASE_URL}/webhook-test/analytics/track`,
    GET_DASHBOARD: `${N8N_BASE_URL}/webhook-test/analytics/dashboard`,
    GET_TRAFFIC: `${N8N_BASE_URL}/webhook-test/analytics/traffic`,
    EXPORT_DATA: `${N8N_BASE_URL}/webhook-test/analytics/export`,
  },

  // ADMIN Workflows
  ADMIN: {
    BLOCK_SITE: `${N8N_BASE_URL}/webhook-test/admin/block-site`,
    UNBLOCK_SITE: `${N8N_BASE_URL}/webhook-test/admin/unblock-site`,
    SUSPEND_SITE: `${N8N_BASE_URL}/webhook-test/admin/suspend-site`,
    ACTIVATE_SITE: `${N8N_BASE_URL}/webhook-test/admin/activate-site`,
    GET_USER_LIST: `${N8N_BASE_URL}/webhook-test/admin/users`,
    GET_SITE_STATUS: `${N8N_BASE_URL}/webhook-test/admin/site-status`,
  },

  // BILLING Workflows
  BILLING: {
    CREATE_INVOICE: `${N8N_BASE_URL}/webhook-test/billing/create-invoice`,
    PROCESS_PAYMENT: `${N8N_BASE_URL}/webhook-test/billing/process-payment`,
    CHECK_PAYMENT_STATUS: `${N8N_BASE_URL}/webhook-test/billing/payment-status`,
    GET_INVOICES: `${N8N_BASE_URL}/webhook-test/billing/invoices`,
    UPDATE_PLAN: `${N8N_BASE_URL}/webhook-test/billing/update-plan`,
  },

  // CONTENT Workflows
  CONTENT: {
    CREATE_SITE: `${N8N_BASE_URL}/webhook-test/content/create-site`,
    UPDATE_SITE: `${N8N_BASE_URL}/webhook-test/content/update-site`,
    DELETE_SITE: `${N8N_BASE_URL}/webhook-test/content/delete-site`,
    GET_SITE_DATA: `${N8N_BASE_URL}/webhook-test/content/site-data`,
    PUBLISH_SITE: `${N8N_BASE_URL}/webhook-test/content/publish-site`,
    GET_SITE_LIST: `${N8N_BASE_URL}/webhook-test/content/sites`,
  },

  // MCP (Multi-Chain Proxy) Workflows
  MCP: {
    GOOGLE_CALENDAR: `${N8N_BASE_URL}/webhook-test/mcp/google-calendar`,
    WHATSAPP_SEND: `${N8N_BASE_URL}/webhook-test/mcp/whatsapp/send`,
    CHATWOOT_SEND: `${N8N_BASE_URL}/webhook-test/mcp/chatwoot/send`,
    TELEGRAM_SEND: `${N8N_BASE_URL}/webhook-test/mcp/telegram/send`,
    OPENAI_GENERATE: `${N8N_BASE_URL}/webhook-test/mcp/openai/generate`,
    ELEVENLABS_TTS: `${N8N_BASE_URL}/webhook-test/mcp/elevenlabs/tts`,
  },

  // INTEGRATION Workflows
  INTEGRATION: {
    WHATSAPP_WEBHOOK: `${N8N_BASE_URL}/webhook-test/integration/whatsapp`,
    CHATWOOT_WEBHOOK: `${N8N_BASE_URL}/webhook-test/integration/chatwoot`,
    TELEGRAM_WEBHOOK: `${N8N_BASE_URL}/webhook-test/integration/telegram`,
    AIRTABLE_SYNC: `${N8N_BASE_URL}/webhook-test/integration/airtable/sync`,
    SUPABASE_SYNC: `${N8N_BASE_URL}/webhook-test/integration/supabase/sync`,
  },
} as const;

export type WebhookCategory = keyof typeof WEBHOOK_ENDPOINTS;
export type WebhookEndpoint = typeof WEBHOOK_ENDPOINTS[WebhookCategory][keyof typeof WEBHOOK_ENDPOINTS[WebhookCategory]];
