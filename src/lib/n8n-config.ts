// Configuração para integração com n8n
export const N8N_CONFIG = {
  // Data Stores que devem existir no n8n
  dataStores: {
    clients: {
      fields: ['siteSlug', 'name', 'plan', 'active', 'createdAt', 'updatedAt'],
      description: 'Registro de cada cliente'
    },
    tokens: {
      fields: ['siteSlug', 'provider', 'access_token', 'refresh_token', 'expires_at'],
      description: 'Credenciais OAuth2 (Google, Meta, etc.)'
    },
    settings: {
      fields: ['siteSlug', 'key', 'value'],
      description: 'Configurações personalizadas por cliente'
    },
    reviews: {
      fields: ['siteSlug', 'author', 'rating', 'text', 'origin', 'date'],
      description: 'Avaliações do Google My Business'
    },
    feedbacks: {
      fields: ['siteSlug', 'name', 'rating', 'comment', 'createdAt'],
      description: 'Feedbacks internos dos clientes'
    },
    logs: {
      fields: ['siteSlug', 'action', 'status', 'timestamp', 'details'],
      description: 'Logs de auditoria geral'
    },
    billing: {
      fields: ['siteSlug', 'plan', 'status', 'payment_date', 'amount'],
      description: 'Cobrança e planos'
    },
    onboardings: {
      fields: ['siteSlug', 'form_data', 'assets', 'status', 'createdAt'],
      description: 'Dados de onboarding dos clientes'
    }
  },

  // Workflows que devem existir no n8n
  workflows: {
    client_plan: {
      description: 'Retorna plano e status do cliente',
      endpoint: '/webhook/client_plan',
      method: 'POST'
    },
    auth_status: {
      description: 'Verifica login e plano ativo',
      endpoint: '/webhook/auth_status',
      method: 'POST'
    },
    wa_list: {
      description: 'Lista mensagens WhatsApp',
      endpoint: '/webhook/wa/list',
      method: 'POST'
    },
    wa_send: {
      description: 'Envia mensagens WhatsApp',
      endpoint: '/webhook/wa/send',
      method: 'POST'
    },
    reviews_list: {
      description: 'Lista Google Reviews',
      endpoint: '/webhook/reviews/list',
      method: 'POST'
    },
    reviews_sync: {
      description: 'Sincroniza novos reviews',
      endpoint: '/webhook/reviews/sync',
      method: 'POST'
    },
    feedbacks_list: {
      description: 'Lista feedbacks internos',
      endpoint: '/webhook/feedbacks/list',
      method: 'POST'
    },
    feedbacks_submit: {
      description: 'Submete novo feedback',
      endpoint: '/webhook/feedbacks/submit',
      method: 'POST'
    },
    onboarding_save: {
      description: 'Salva formulário de onboarding',
      endpoint: '/webhook/onboarding/save',
      method: 'POST'
    },
    onboarding_get: {
      description: 'Retorna dados do onboarding',
      endpoint: '/webhook/onboarding/get',
      method: 'POST'
    }
  },

  // Automações que devem existir no n8n
  automations: {
    tokens_refresh: {
      description: 'Atualiza tokens OAuth2',
      frequency: 'A cada 10 minutos',
      trigger: 'Schedule'
    },
    reviews_sync: {
      description: 'Sincroniza reviews Google',
      frequency: '1x ao dia',
      trigger: 'Schedule'
    },
    billing_check: {
      description: 'Verifica cobrança e desativa módulos',
      frequency: '1x ao dia',
      trigger: 'Schedule'
    },
    backup_workflows: {
      description: 'Backup dos workflows',
      frequency: '1x ao dia',
      trigger: 'Schedule'
    },
    notifications: {
      description: 'Alertas via Telegram/Email',
      frequency: 'Instantâneo',
      trigger: 'Webhook'
    }
  }
} as const;

// Função para validar se o n8n está configurado corretamente
export const validateN8NSetup = async () => {
  try {
    const response = await fetch('/.netlify/functions/api/client_plan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ siteSlug: 'test' }),
    });
    
    return response.ok;
  } catch (error) {
    console.error('Erro ao validar setup n8n:', error);
    return false;
  }
};
