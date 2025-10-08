# 🚀 ELEVEA - Sistema Completo de Automação e Marketing

[![Status](https://img.shields.io/badge/status-production-success)]()
[![Version](https://img.shields.io/badge/version-3.0-blue)]()
[![License](https://img.shields.io/badge/license-MIT-green)]()

## 📋 **SOBRE O PROJETO**

ELEVEA é uma plataforma SaaS completa para criação de sites inteligentes e automação de marketing para empresas locais. O sistema foi completamente migrado de Google Apps Script (GAS) para uma arquitetura moderna baseada em **n8n + Airtable + Netlify**.

### **🎯 Objetivo**

Fornecer uma solução completa, escalável e de fácil manutenção para agências de marketing digital gerenciarem sites, leads, WhatsApp, reviews do Google My Business, pagamentos e muito mais.

---

## 🏗️ **ARQUITETURA**

```
┌─────────────────────────────────────────────────────────┐
│              FRONTEND (React + Vite)                     │
│           Netlify + Tailwind + shadcn/ui                │
└──────────────────────────┬───────────────────────────────┘
                           │ HTTPS
                           ▼
┌──────────────────────────────────────────────────────────┐
│         NETLIFY FUNCTIONS (Proxy + Security)             │
│    Injeta secrets, valida, encaminha para n8n           │
└──────────────────────────┬───────────────────────────────┘
                           │ HTTPS + Headers
                           ▼
┌──────────────────────────────────────────────────────────┐
│               N8N (Backend + Automações)                 │
│   Webhooks, Code nodes, Integrações, Cron jobs          │
└────┬────────┬─────────┬──────────┬──────────┬───────────┘
     │        │         │          │          │
     ▼        ▼         ▼          ▼          ▼
┌─────────┐ ┌───────┐ ┌────────┐ ┌────────┐ ┌──────────┐
│Airtable │ │Resend │ │WhatsApp│ │ Google │ │ Mercado  │
│  (DB)   │ │(Email)│ │ (2 APIs│ │ OAuth2 │ │   Pago   │
│         │ │       │ │Official│ │   GMB  │ │          │
│         │ │       │ │+Evolut)│ │        │ │          │
└─────────┘ └───────┘ └────────┘ └────────┘ └──────────┘
```

---

## 🛠️ **STACK TECNOLÓGICA**

### **Frontend**
- **React 18** - Biblioteca UI
- **Vite** - Build tool
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **shadcn/ui** - Component library
- **React Router** - Routing
- **React Query** - Data fetching

### **Backend**
- **n8n** - Workflow automation
- **Netlify Functions** - Serverless proxy
- **Airtable** - Database
- **Node.js** - Runtime

### **Integrações**
- **Resend** - Serviço de email
- **WhatsApp Business API** - Mensagens em massa
- **Evolution API** - WhatsApp com IA
- **Mercado Pago** - Pagamentos
- **Google OAuth2** - Autenticação
- **Google My Business** - Reviews
- **OpenAI** - IA Copywriter
- **Telegram** - Alertas

---

## 📊 **FUNCIONALIDADES**

### **✅ 196 Funcionalidades Implementadas**

#### **🔐 Autenticação**
- Login com JWT
- Reset de senha
- Gerenciamento de usuários
- Sessões seguras

#### **👥 Clientes**
- Gerenciamento completo
- Planos VIP e Essential
- Billing e pagamentos
- Bloqueio/desbloqueio

#### **📱 WhatsApp**
- **API Oficial:** Disparo em massa, templates
- **Evolution API:** Chatbot com IA, conversas
- Gerenciamento de contatos
- Histórico de mensagens

#### **💰 Mercado Pago**
- Assinaturas recorrentes
- Webhooks de pagamento
- Gerenciamento de billing
- Bloqueio automático por inadimplência

#### **🌟 Google My Business**
- Conexão via OAuth2
- Sincronização de reviews
- Renovação automática de tokens
- Notificações de novos reviews

#### **💬 Feedback**
- Sistema de coleta
- Aprovação manual
- Publicação no site
- Moderação

#### **🎯 Leads**
- Captura via formulários
- Lead scoring
- Gerenciamento de pipeline
- Analytics

#### **📊 Analytics**
- Rastreamento de eventos
- Dashboard de métricas
- Análise de tráfego
- Conversion tracking

#### **🏗️ Site Management**
- Editor de conteúdo
- Gerenciamento de seções
- Configurações globais
- Deploy automático

#### **📝 Onboarding**
- Processo guiado
- Geração de prompt IA
- Upload de assets
- Bootstrap automático

#### **🏪 Ecommerce (VIP)**
- Gerenciamento de produtos
- Processamento de pedidos
- Controle de estoque
- Integração com pagamentos

#### **📅 Agendamentos (VIP)**
- Sistema de reservas
- Disponibilidade
- Notificações automáticas
- Gerenciamento de horários

#### **🌐 Multi-idioma (VIP)**
- Suporte a múltiplos idiomas
- Tradução automática
- Gerenciamento de conteúdo

#### **🎨 Marketplace (VIP)**
- Templates profissionais
- Categorias
- Sistema de compra

#### **🔒 Segurança**
- Audit logs
- Security alerts
- Monitoramento
- Validações

---

## 📦 **PLANOS**

### **🆓 Essential (Gratuito)**
- ✅ 1 site básico
- ✅ Google My Business
- ✅ 100 mensagens WhatsApp/mês
- ✅ 10 requisições IA/mês
- ✅ 1GB storage

### **⭐ VIP (R$ 97/mês)**
- ✅ Sites ilimitados
- ✅ Todas as features Essential
- ✅ IA Copywriter ilimitado
- ✅ WhatsApp Chatbot ilimitado
- ✅ Auto SEO
- ✅ Lead Scoring
- ✅ Agendamentos
- ✅ Multi-idioma
- ✅ Ecommerce completo
- ✅ Templates Premium
- ✅ White Label
- ✅ Audit Logs
- ✅ Storage ilimitado

---

## 🚀 **INSTALAÇÃO E SETUP**

### **1. Pré-requisitos**

```bash
# Node.js 18+
node --version

# npm ou yarn
npm --version
```

### **2. Clone o repositório**

```bash
git clone https://github.com/seu-usuario/elevea-n8n-ui.git
cd elevea-n8n-ui
```

### **3. Instale as dependências**

```bash
npm install
```

### **4. Configure as variáveis de ambiente**

```bash
# Copie o arquivo de exemplo
cp .env.example .env

# Edite com suas credenciais
nano .env
```

**Veja a lista completa de variáveis em:** `n8n-workflows/NETLIFY_ENV_VARS_COMPLETO.md`

### **5. Rode localmente**

```bash
# Desenvolvimento
npm run dev

# Build
npm run build

# Preview
npm run preview
```

---

## 📁 **ESTRUTURA DO PROJETO**

```
elevea-n8n-ui/
├── src/
│   ├── components/         # Componentes React
│   │   ├── Layout.tsx
│   │   ├── Header.tsx
│   │   ├── HeroSection.tsx
│   │   ├── FeaturesGrid.tsx
│   │   ├── PricingCards.tsx
│   │   └── ...
│   ├── pages/              # Páginas
│   │   ├── Index.tsx
│   │   ├── Login.tsx
│   │   ├── Dashboard.tsx
│   │   └── ...
│   ├── lib/                # Bibliotecas e helpers
│   │   ├── api.ts          # Configuração de API
│   │   └── utils.ts
│   ├── types/              # TypeScript types
│   ├── App.tsx             # App principal
│   └── main.tsx            # Entry point
├── public/                 # Assets públicos
├── n8n-workflows/          # Documentação e workflows n8n
│   ├── MIGRACAO_COMPLETA_GAS_PARA_N8N.md
│   ├── GUIA_IMPLEMENTACAO_COMPLETA.md
│   ├── AIRTABLE_SCHEMAS_COMPLETO.md
│   ├── NETLIFY_ENV_VARS_COMPLETO.md
│   ├── RESUMO_EXECUTIVO_FINAL.md
│   └── ...
├── package.json
├── vite.config.ts
├── tailwind.config.ts
└── README.md
```

---

## 🗄️ **BANCO DE DADOS (Airtable)**

### **15 Tabelas Estruturadas:**

1. **users** - Usuários e autenticação
2. **clients** - Dados dos clientes
3. **tokens** - Tokens OAuth
4. **whatsapp_messages** - Mensagens WhatsApp
5. **whatsapp_contacts** - Contatos WhatsApp
6. **whatsapp_templates** - Templates WhatsApp
7. **billing** - Cobrança e assinaturas
8. **payments** - Histórico de pagamentos
9. **google_credentials** - Credenciais Google
10. **google_reviews** - Reviews do Google
11. **feedbacks** - Feedbacks dos clientes
12. **leads** - Leads capturados
13. **analytics_events** - Eventos de analytics
14. **onboardings** - Processos de onboarding
15. **audit_logs** - Logs de auditoria

**Schemas completos em:** `n8n-workflows/AIRTABLE_SCHEMAS_COMPLETO.md`

---

## 🔗 **ENDPOINTS DA API**

### **Base URL:** `https://n8n.elevea.com/webhook/api`

### **Autenticação**
- `GET /ping` - Health check
- `POST /auth/login` - Login
- `POST /auth/set-password` - Definir senha
- `POST /auth/me` - Dados do usuário
- `POST /auth/password-reset-request` - Solicitar reset
- `POST /auth/password-reset-confirm` - Confirmar reset

### **Clientes**
- `POST /client/plan` - Obter plano do cliente
- `POST /client/billing` - Dados de cobrança
- `POST /client/status` - Status do cliente

### **WhatsApp**
- `POST /whatsapp/send-bulk` - Envio em massa (oficial)
- `POST /whatsapp/send-ai` - Envio com IA (Evolution)
- `GET /whatsapp/messages` - Histórico
- `GET /whatsapp/templates` - Templates

### **Mercado Pago**
- `POST /mercadopago/webhook` - Webhook de pagamentos

### **Google**
- `POST /google/credentials` - Salvar credenciais
- `GET /google/reviews` - Listar reviews
- `POST /google/sync` - Sincronizar

### **Outros**
- Feedback, Leads, Analytics, Site, Onboarding, Admin, etc.

**Documentação completa em:** `n8n-workflows/GUIA_IMPLEMENTACAO_COMPLETA.md`

---

## 🔄 **CRON JOBS**

### **Automações Agendadas:**

1. **Token Refresh** - A cada 50 minutos
   - Renova tokens Google expirando

2. **Billing Check** - Diariamente às 00:00
   - Verifica pagamentos
   - Bloqueia inadimplentes

3. **Reviews Sync** - Diariamente às 06:00
   - Sincroniza reviews do Google
   - Notifica novos reviews

4. **Backup** - Diariamente às 02:00
   - Exporta dados do Airtable
   - Envia para storage

---

## 🧪 **TESTES**

```bash
# Rodar testes (se configurados)
npm run test

# Linter
npm run lint

# Type check
npm run type-check
```

---

## 🚀 **DEPLOY**

### **Netlify (Recomendado)**

```bash
# Instalar Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod
```

### **Outras opções**
- Vercel
- Railway
- Render
- Docker

---

## 📚 **DOCUMENTAÇÃO**

### **Documentos Principais:**

1. **MIGRACAO_COMPLETA_GAS_PARA_N8N.md**
   - Mapeamento completo de 196 funcionalidades
   - Categorização e organização

2. **GUIA_IMPLEMENTACAO_COMPLETA.md**
   - Estratégia de migração
   - Fluxos detalhados
   - Exemplos de código

3. **AIRTABLE_SCHEMAS_COMPLETO.md**
   - Schemas de 15 tabelas
   - 150+ campos definidos
   - Relacionamentos

4. **NETLIFY_ENV_VARS_COMPLETO.md**
   - 60+ variáveis de ambiente
   - Configuração completa
   - Boas práticas

5. **RESUMO_EXECUTIVO_FINAL.md**
   - Overview completo do projeto
   - Métricas e resultados
   - Próximos passos

---

## 🤝 **CONTRIBUINDO**

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

---

## 📝 **LICENÇA**

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

---

## 👥 **EQUIPE**

- **Matheus Martins** - *Developer*
- **Equipe ELEVEA** - *Agência*

---

## 📞 **CONTATO**

- **Website:** https://agenciaelevea.com
- **Email:** contato@agenciaelevea.com
- **WhatsApp:** (XX) XXXXX-XXXX

---

## 🎉 **AGRADECIMENTOS**

- n8n.io pela plataforma incrível
- Airtable pelo banco de dados robusto
- Netlify pela hospedagem eficiente
- Resend pelo serviço de email
- Comunidade open-source

---

## 📊 **STATUS DO PROJETO**

**Última atualização:** 07 de Janeiro de 2025  
**Versão:** 3.0 - Definitiva  
**Status:** ✅ Produção

### **Métricas:**
- ✅ 196/196 funcionalidades (100%)
- ✅ 50+ endpoints criados
- ✅ 15 tabelas Airtable
- ✅ 9 integrações externas
- ✅ 4 cron jobs
- ✅ 60+ variáveis de ambiente
- ✅ 100% documentado

---

**Feito com ❤️ pela equipe ELEVEA**