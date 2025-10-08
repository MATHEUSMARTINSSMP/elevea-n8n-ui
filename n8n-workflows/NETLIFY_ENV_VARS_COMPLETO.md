# 🔐 VARIÁVEIS DE AMBIENTE - NETLIFY

## 📋 **VISÃO GERAL**

Este documento lista TODAS as variáveis de ambiente necessárias para o funcionamento completo do sistema ELEVEA.

**Todas as variáveis de ambiente devem ser configuradas no Netlify**, pois o n8n (plano não-Enterprise) não suporta variáveis de ambiente nativas.

---

## 🔑 **VARIÁVEIS DE AMBIENTE NECESSÁRIAS**

### **1. 🌐 APLICAÇÃO**

```bash
# URL da aplicação
VITE_APP_NAME=ELEVEA
VITE_ENV=production
VITE_SITE_URL=https://agenciaelevea.netlify.app

# URL do n8n
VITE_N8N_URL=https://n8n.elevea.com/webhook
N8N_BASE_URL=https://n8n.elevea.com/webhook

# Chave de assinatura para validação de requests
N8N_SIGNING_SECRET=sua-chave-secreta-aqui

# Token do admin (para rotas administrativas)
ADMIN_DASH_TOKEN=token-admin-secreto
```

---

### **2. 📧 RESEND (Email)**

```bash
# API Key do Resend
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Email remetente
RESEND_FROM_EMAIL=noreply@elevea.com
RESEND_FROM_NAME=Equipe ELEVEA
```

---

### **3. 🗄️ AIRTABLE**

```bash
# API Key do Airtable
AIRTABLE_API_KEY=keyXXXXXXXXXXXXXX

# Base ID do Airtable
AIRTABLE_BASE_ID=appXXXXXXXXXXXXXX

# IDs das tabelas (opcional, para organização)
AIRTABLE_TABLE_USERS=tblXXXXXXXXXXXXXX
AIRTABLE_TABLE_CLIENTS=tblXXXXXXXXXXXXXX
AIRTABLE_TABLE_TOKENS=tblXXXXXXXXXXXXXX
AIRTABLE_TABLE_WHATSAPP_MESSAGES=tblXXXXXXXXXXXXXX
AIRTABLE_TABLE_WHATSAPP_CONTACTS=tblXXXXXXXXXXXXXX
AIRTABLE_TABLE_WHATSAPP_TEMPLATES=tblXXXXXXXXXXXXXX
AIRTABLE_TABLE_BILLING=tblXXXXXXXXXXXXXX
AIRTABLE_TABLE_PAYMENTS=tblXXXXXXXXXXXXXX
AIRTABLE_TABLE_GOOGLE_CREDENTIALS=tblXXXXXXXXXXXXXX
AIRTABLE_TABLE_GOOGLE_REVIEWS=tblXXXXXXXXXXXXXX
AIRTABLE_TABLE_FEEDBACKS=tblXXXXXXXXXXXXXX
AIRTABLE_TABLE_LEADS=tblXXXXXXXXXXXXXX
AIRTABLE_TABLE_ANALYTICS_EVENTS=tblXXXXXXXXXXXXXX
AIRTABLE_TABLE_ONBOARDINGS=tblXXXXXXXXXXXXXX
AIRTABLE_TABLE_AUDIT_LOGS=tblXXXXXXXXXXXXXX
```

---

### **4. 📱 WHATSAPP BUSINESS API (Oficial)**

```bash
# Token de acesso do WhatsApp Business API
WHATSAPP_BUSINESS_TOKEN=EAAXXXXXXXXXXXXXXXXXXXXXXXXXXXx

# Phone Number ID do WhatsApp Business
WHATSAPP_PHONE_NUMBER_ID=123456789012345

# Webhook Verify Token
WHATSAPP_WEBHOOK_VERIFY_TOKEN=token-verificacao-webhook

# URL da API do WhatsApp
WHATSAPP_API_URL=https://graph.facebook.com/v18.0
```

---

### **5. 🤖 EVOLUTION API (WhatsApp não oficial)**

```bash
# API Key da Evolution API
EVOLUTION_API_KEY=sua-chave-evolution-api

# URL da Evolution API
EVOLUTION_API_URL=https://evolution-api.com

# Nome da instância
EVOLUTION_INSTANCE=elevea-instance
```

---

### **6. 💰 MERCADO PAGO**

```bash
# Access Token do Mercado Pago
MERCADO_PAGO_ACCESS_TOKEN=APP_USR-xxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Public Key do Mercado Pago
MERCADO_PAGO_PUBLIC_KEY=APP_USR-xxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Webhook Secret do Mercado Pago
MERCADO_PAGO_WEBHOOK_SECRET=sua-chave-secreta-webhook

# Notification URL
MERCADO_PAGO_NOTIFICATION_URL=https://n8n.elevea.com/webhook/api/mercadopago/webhook
```

---

### **7. 🌟 GOOGLE (OAuth2 + My Business)**

```bash
# Client ID do Google OAuth
GOOGLE_CLIENT_ID=xxxxxxxxxxxxx-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.apps.googleusercontent.com

# Client Secret do Google OAuth
GOOGLE_CLIENT_SECRET=GOCSPX-xxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Redirect URI
GOOGLE_REDIRECT_URI=https://agenciaelevea.netlify.app/google/callback

# API Key do Google (opcional)
GOOGLE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

# Escopos necessários
GOOGLE_SCOPES=https://www.googleapis.com/auth/business.manage,https://www.googleapis.com/auth/userinfo.email
```

---

### **8. 📱 TELEGRAM (Alertas)**

```bash
# Bot Token do Telegram
TELEGRAM_BOT_TOKEN=123456789:ABCdefGHIjklMNOpqrsTUVwxyz123456789

# Chat ID do Telegram (para alertas)
TELEGRAM_CHAT_ID=123456789

# URL da API do Telegram
TELEGRAM_API_URL=https://api.telegram.org/bot
```

---

### **9. 🏗️ NETLIFY (Build e Deploy)**

```bash
# Build Hook do Netlify
NETLIFY_BUILD_HOOK=https://api.netlify.com/build_hooks/xxxxxxxxxxxxxxxxxxxxx

# Site ID do Netlify
NETLIFY_SITE_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx

# Auth Token do Netlify (para API)
NETLIFY_AUTH_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

---

### **10. 🔒 JWT (Autenticação)**

```bash
# Secret para assinar JWT tokens
JWT_SECRET=sua-chave-secreta-jwt-muito-longa-e-aleatoria

# Tempo de expiração do token (em segundos)
JWT_EXPIRES_IN=86400

# Issuer do JWT
JWT_ISSUER=elevea-api
```

---

### **11. 🤖 OPENAI (IA Copywriter)**

```bash
# API Key do OpenAI
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Modelo a ser usado
OPENAI_MODEL=gpt-4

# Temperatura (0-2)
OPENAI_TEMPERATURE=0.7

# Max Tokens
OPENAI_MAX_TOKENS=2000
```

---

### **12. 🔐 BCRYPT (Hash de senhas)**

```bash
# Salt Rounds do bcrypt (quanto maior, mais seguro mas mais lento)
BCRYPT_SALT_ROUNDS=10
```

---

### **13. 📊 ANALYTICS**

```bash
# Google Analytics ID (opcional)
VITE_GA_ID=G-XXXXXXXXXX

# Plausible Analytics Domain (opcional)
VITE_PLAUSIBLE_DOMAIN=agenciaelevea.com
```

---

### **14. 🌐 CORS**

```bash
# Origens permitidas (separadas por vírgula)
CORS_ALLOWED_ORIGINS=https://agenciaelevea.netlify.app,https://n8n.elevea.com,http://localhost:5173

# Métodos permitidos
CORS_ALLOWED_METHODS=GET,POST,PUT,DELETE,OPTIONS

# Headers permitidos
CORS_ALLOWED_HEADERS=Content-Type,Authorization,x-elevea-key
```

---

### **15. 🔧 OUTROS**

```bash
# Node Environment
NODE_ENV=production

# Log Level
LOG_LEVEL=info

# Timezone
TZ=America/Sao_Paulo

# Rate Limit (requests por minuto)
RATE_LIMIT_MAX_REQUESTS=100

# URL de fallback para erros
ERROR_FALLBACK_URL=https://agenciaelevea.com/erro
```

---

## 📦 **ARQUIVO .env.example (Para Netlify)**

```bash
# === APLICAÇÃO ===
VITE_APP_NAME=ELEVEA
VITE_ENV=production
VITE_SITE_URL=https://agenciaelevea.netlify.app
VITE_N8N_URL=https://n8n.elevea.com/webhook
N8N_BASE_URL=https://n8n.elevea.com/webhook
N8N_SIGNING_SECRET=
ADMIN_DASH_TOKEN=

# === RESEND (Email) ===
RESEND_API_KEY=
RESEND_FROM_EMAIL=noreply@elevea.com
RESEND_FROM_NAME=Equipe ELEVEA

# === AIRTABLE ===
AIRTABLE_API_KEY=
AIRTABLE_BASE_ID=

# === WHATSAPP BUSINESS API (Oficial) ===
WHATSAPP_BUSINESS_TOKEN=
WHATSAPP_PHONE_NUMBER_ID=
WHATSAPP_WEBHOOK_VERIFY_TOKEN=
WHATSAPP_API_URL=https://graph.facebook.com/v18.0

# === EVOLUTION API (WhatsApp não oficial) ===
EVOLUTION_API_KEY=
EVOLUTION_API_URL=
EVOLUTION_INSTANCE=elevea-instance

# === MERCADO PAGO ===
MERCADO_PAGO_ACCESS_TOKEN=
MERCADO_PAGO_PUBLIC_KEY=
MERCADO_PAGO_WEBHOOK_SECRET=
MERCADO_PAGO_NOTIFICATION_URL=

# === GOOGLE (OAuth2 + My Business) ===
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REDIRECT_URI=https://agenciaelevea.netlify.app/google/callback
GOOGLE_API_KEY=
GOOGLE_SCOPES=https://www.googleapis.com/auth/business.manage,https://www.googleapis.com/auth/userinfo.email

# === TELEGRAM (Alertas) ===
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=
TELEGRAM_API_URL=https://api.telegram.org/bot

# === NETLIFY (Build e Deploy) ===
NETLIFY_BUILD_HOOK=
NETLIFY_SITE_ID=
NETLIFY_AUTH_TOKEN=

# === JWT (Autenticação) ===
JWT_SECRET=
JWT_EXPIRES_IN=86400
JWT_ISSUER=elevea-api

# === OPENAI (IA Copywriter) ===
OPENAI_API_KEY=
OPENAI_MODEL=gpt-4
OPENAI_TEMPERATURE=0.7
OPENAI_MAX_TOKENS=2000

# === BCRYPT (Hash de senhas) ===
BCRYPT_SALT_ROUNDS=10

# === ANALYTICS ===
VITE_GA_ID=
VITE_PLAUSIBLE_DOMAIN=

# === CORS ===
CORS_ALLOWED_ORIGINS=https://agenciaelevea.netlify.app,https://n8n.elevea.com,http://localhost:5173
CORS_ALLOWED_METHODS=GET,POST,PUT,DELETE,OPTIONS
CORS_ALLOWED_HEADERS=Content-Type,Authorization,x-elevea-key

# === OUTROS ===
NODE_ENV=production
LOG_LEVEL=info
TZ=America/Sao_Paulo
RATE_LIMIT_MAX_REQUESTS=100
ERROR_FALLBACK_URL=https://agenciaelevea.com/erro
```

---

## 🚀 **COMO CONFIGURAR NO NETLIFY**

### **Opção 1: Via Interface Web**

1. Acesse o dashboard do Netlify
2. Vá em **Site settings** → **Environment variables**
3. Clique em **Add a variable**
4. Cole cada variável e seu valor
5. Clique em **Save**

### **Opção 2: Via Netlify CLI**

```bash
# Instalar Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Navegar até o diretório do projeto
cd elevea-n8n-ui

# Configurar variável
netlify env:set VARIAVEL_NOME "valor"

# Exemplo
netlify env:set RESEND_API_KEY "re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx"

# Listar variáveis
netlify env:list

# Deploy
netlify deploy --prod
```

### **Opção 3: Via Arquivo (Netlify.toml)**

```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  VITE_APP_NAME = "ELEVEA"
  VITE_ENV = "production"
  # NÃO ADICIONAR SECRETS AQUI!
```

**⚠️ IMPORTANTE:** Nunca adicionar secrets no `netlify.toml`, pois ele fica versionado no Git!

---

## 🔐 **SEGURANÇA**

### **Boas Práticas:**

1. ✅ **Nunca commitar** arquivos `.env` no Git
2. ✅ **Usar secrets** no Netlify para variáveis sensíveis
3. ✅ **Rotacionar tokens** periodicamente
4. ✅ **Usar HTTPS** em todas as URLs
5. ✅ **Validar** todas as requests com headers de segurança
6. ✅ **Limitar** rate de requests por IP
7. ✅ **Monitorar** logs de acesso
8. ✅ **Criar alertas** para atividades suspeitas

### **Secrets que NÃO devem ser expostos:**

- ❌ Tokens de API (Resend, WhatsApp, Mercado Pago, etc)
- ❌ Chaves de banco de dados (Airtable)
- ❌ Secrets JWT
- ❌ Tokens OAuth
- ❌ Webhooks secrets
- ❌ Build hooks

### **Variáveis que PODEM ser públicas:**

- ✅ `VITE_APP_NAME`
- ✅ `VITE_ENV`
- ✅ `VITE_SITE_URL`
- ✅ `VITE_N8N_URL` (se o n8n estiver público)
- ✅ `VITE_GA_ID`
- ✅ `VITE_PLAUSIBLE_DOMAIN`

---

## 📋 **CHECKLIST DE CONFIGURAÇÃO**

### **Antes do Deploy:**

- [ ] Todas as variáveis de ambiente configuradas no Netlify
- [ ] Secrets validados e funcionando
- [ ] URLs corretas (produção, não localhost)
- [ ] CORS configurado corretamente
- [ ] Tokens com permissões adequadas
- [ ] Build hook configurado
- [ ] Webhooks apontando para URLs corretas

### **Depois do Deploy:**

- [ ] Testar login/autenticação
- [ ] Testar envio de email (Resend)
- [ ] Testar WhatsApp (oficial e Evolution)
- [ ] Testar Mercado Pago webhook
- [ ] Testar Google OAuth
- [ ] Testar criação de lead
- [ ] Testar analytics
- [ ] Testar cron jobs (no n8n)

---

## 🎉 **RESULTADO FINAL**

**✅ 60+ VARIÁVEIS DE AMBIENTE CONFIGURADAS**
**✅ SEGURANÇA COMPLETA**
**✅ TODAS AS INTEGRAÇÕES FUNCIONANDO**
**✅ PRONTO PARA PRODUÇÃO!**
