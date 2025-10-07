export const APP_CONFIG = {
  name: 'ELEVEA',
  version: '1.0.0',
  description: 'Plataforma para criação de sites inteligentes e automação de marketing',
  supportEmail: 'suporte@elevea.com',
  website: 'https://agenciaelevea.netlify.app',
  phone: '5596981032928',
} as const;

export const PLANS = {
  starter: {
    name: 'Starter',
    price: 97,
    features: ['1 site', '5 páginas', 'IA básica', 'Suporte por email', 'Templates básicos'],
    limits: { sites: 1, pages: 5 }
  },
  professional: {
    name: 'Professional', 
    price: 197,
    features: ['3 sites', 'Páginas ilimitadas', 'IA avançada', 'Analytics completo', 'Automação básica', 'Suporte prioritário', 'Templates premium'],
    limits: { sites: 3, pages: -1 }
  },
  enterprise: {
    name: 'Enterprise',
    price: 397,
    features: ['Sites ilimitados', 'Páginas ilimitadas', 'IA completa', 'Analytics avançado', 'Automação completa', 'Suporte 24/7', 'Templates exclusivos', 'API personalizada'],
    limits: { sites: -1, pages: -1 }
  }
} as const;

export const ROUTES = {
  home: '/',
  login: '/login',
  dashboard: '/dashboard',
  obrigado: '/obrigado',
  reset: '/reset',
  upgrade: '/upgrade',
  politicas: '/politicas',
} as const;

export const API_ENDPOINTS = {
  clientPlan: '/.netlify/functions/api/client_plan',
  authStatus: '/.netlify/functions/api/auth_status',
  waList: '/.netlify/functions/api/wa/list',
  waSend: '/.netlify/functions/api/wa/send',
  reviewsList: '/.netlify/functions/api/reviews/list',
  reviewsSync: '/.netlify/functions/api/reviews/sync',
  feedbacksList: '/.netlify/functions/api/feedbacks/list',
  feedbacksSubmit: '/.netlify/functions/api/feedbacks/submit',
  onboardingSave: '/.netlify/functions/api/onboarding/save',
  onboardingGet: '/.netlify/functions/api/onboarding/get',
  analytics: '/.netlify/functions/api/analytics',
  templates: '/.netlify/functions/api/templates',
} as const;

export const WHATSAPP_MESSAGES = {
  default: 'Olá! Quero um site Elevea. Pode me ajudar?',
  getStarted: 'Olá! Quero criar um site profissional com a Elevea. Pode me ajudar?',
  planInterest: (planName: string) => `Olá! Tenho interesse no plano ${planName}. Pode me ajudar com mais informações?`,
  support: 'Olá! Preciso de suporte técnico. Pode me ajudar?',
  feedback: 'Olá! Gostaria de deixar um feedback sobre o serviço.',
} as const;

export const SITE_SLUGS = {
  main: 'elevea-agencia',
  test: 'test-site',
} as const;

export const FEATURES = [
  {
    icon: 'Bot',
    title: 'IA Integrada',
    description: 'Criação automática de conteúdo e otimização com inteligência artificial'
  },
  {
    icon: 'BarChart3',
    title: 'Analytics Avançado',
    description: 'Acompanhe métricas detalhadas e insights de performance'
  },
  {
    icon: 'Smartphone',
    title: 'Mobile First',
    description: 'Sites otimizados para todos os dispositivos e telas'
  },
  {
    icon: 'Globe',
    title: 'SEO Automático',
    description: 'Otimização automática para mecanismos de busca'
  },
  {
    icon: 'Zap',
    title: 'Automação Inteligente',
    description: 'Automatize campanhas e workflows de marketing'
  },
  {
    icon: 'Shield',
    title: 'Segurança Total',
    description: 'Proteção completa dos dados e conformidade LGPD'
  }
] as const;
