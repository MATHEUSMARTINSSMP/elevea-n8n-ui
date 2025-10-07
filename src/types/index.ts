// Tipos para autenticação
export interface User {
  id: string;
  email: string;
  name: string;
  plan: 'starter' | 'professional' | 'enterprise';
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}

// Tipos para clientes
export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  website?: string;
  status: 'active' | 'inactive' | 'pending';
  createdAt: string;
}

// Tipos para analytics
export interface AnalyticsData {
  visitors: number;
  pageViews: number;
  conversions: number;
  bounceRate: number;
  avgSessionDuration: number;
  topPages: Array<{
    path: string;
    views: number;
  }>;
}

// Tipos para templates
export interface Template {
  id: string;
  name: string;
  category: string;
  preview: string;
  features: string[];
  price: number;
}

// Tipos para leads
export interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  source: string;
  status: 'new' | 'contacted' | 'qualified' | 'converted';
  score: number;
  createdAt: string;
}

// Tipos para feedbacks
export interface Feedback {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  rating: number;
  comment: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

// Tipos para reviews do Google
export interface GoogleReview {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
  origin: 'google' | 'facebook' | 'other';
}

// Tipos para WhatsApp
export interface WhatsAppMessage {
  id: string;
  from: string;
  to: string;
  message: string;
  timestamp: string;
  status: 'sent' | 'delivered' | 'read' | 'failed';
}

// Tipos para onboarding
export interface OnboardingData {
  siteSlug: string;
  formData: {
    fullName: string;
    document: string;
    email: string;
    phone: string;
    company: string;
    plan: string;
    brand?: string;
    order?: string;
    mp_preapprovalId?: string;
    mp_paymentId?: string;
  };
  assets?: {
    logo?: string;
    images?: string[];
  };
  status: 'pending' | 'in_progress' | 'completed';
  createdAt: string;
}

// Tipos para API responses
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Tipos para configurações
export interface SiteConfig {
  siteSlug: string;
  name: string;
  domain: string;
  plan: string;
  features: string[];
  settings: Record<string, any>;
}
