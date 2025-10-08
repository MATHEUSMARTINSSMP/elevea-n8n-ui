# ✅ CHECKLIST DE PRODUÇÃO - ELEVEA + N8N

## 🎯 **USE ESTE CHECKLIST ANTES DE IR PARA PRODUÇÃO**

---

## 📋 **FASE 1: PREPARAÇÃO DO N8N**

### **1.1 Importar Workflow**
- [ ] Acesse n8n → Workflows
- [ ] Clique em "Import from File"
- [ ] Selecione `n8n-workflows/ELEVEAN8N.json`
- [ ] Clique em "Import"
- [ ] Workflow importado com sucesso

### **1.2 Editar Valores nos Nós Code**

Abra CADA nó Code e edite os valores no topo do código:

- [ ] **📱 Code - Prepare Bulk**
  ```javascript
  const WHATSAPP_PHONE_ID = 'SEU_PHONE_ID';
  const WHATSAPP_TOKEN = 'EAAxxxx';
  ```

- [ ] **🤖 Code - Prepare AI**
  ```javascript
  const EVOLUTION_URL = 'http://seu-servidor:8080';
  const EVOLUTION_KEY = 'sua-api-key';
  const OPENAI_KEY = 'sk-proj-xxxx';
  ```

- [ ] **📨 Code - Process Incoming**
  ```javascript
  const EVOLUTION_URL = 'http://seu-servidor:8080';
  const EVOLUTION_KEY = 'sua-api-key';
  const OPENAI_KEY = 'sk-proj-xxxx';
  ```

- [ ] **💰 Code - Process Mercado Pago**
  ```javascript
  const TELEGRAM_TOKEN = 'SEU_BOT_TOKEN';
  const TELEGRAM_CHAT = 'SEU_CHAT_ID';
  ```

- [ ] **💳 Code - Prepare Billing Check**
  ```javascript
  const MP_TOKEN = 'APP_USR-xxxx';
  ```

- [ ] **⭐ Code - Prepare Reviews Sync**
  ```javascript
  const PLACES_KEY = 'AIzaSy_xxxx';
  ```

- [ ] **💾 Set - Backup Message**
  ```javascript
  const TELEGRAM_TOKEN = 'SEU_BOT_TOKEN';
  const TELEGRAM_CHAT = 'SEU_CHAT_ID';
  ```

- [ ] **🔒 Code - Validate Security**
  ```javascript
  const VALID_KEY = 'elevea-super-secret-key-change-me';
  ```

- [ ] **🔄 HTTP - Refresh Google Token**
  ```javascript
  client_id: 'SEU_GOOGLE_CLIENT_ID'
  client_secret: 'GOCSPX-xxxx'
  ```

### **1.3 Configurar Credenciais**

- [ ] **Gmail OAuth2**
  - n8n → Credentials → Add New → Gmail OAuth2
  - Client ID: (do Google Cloud Console)
  - Client Secret: (do Google Cloud Console)
  - Authorize

- [ ] **Airtable**
  - n8n → Credentials → Add New → Airtable Personal Access Token
  - Token: (do Airtable Developer Hub)
  - Test

### **1.4 Conectar Credenciais aos Nós**

- [ ] Nó "📧 Gmail - Send Reset" → Credencial Gmail
- [ ] Todos os nós Airtable → Credencial Airtable

### **1.5 Ativar Workflow**

- [ ] Clique em "Active" (canto superior direito)
- [ ] Verifique se ficou verde
- [ ] Teste um webhook simples

---

## 📋 **FASE 2: CONFIGURAÇÃO DO AIRTABLE**

### **2.1 Criar Base**
- [ ] Acesse [airtable.com](https://airtable.com)
- [ ] Create → Base from scratch
- [ ] Nome: **ELEVEA**

### **2.2 Criar Tabelas**

#### **Tabela 1: clients**
- [ ] Nome: `clients`
- [ ] Campos:
  - `siteSlug` (Single line text) - Primary
  - `name` (Single line text)
  - `email` (Email)
  - `phone` (Phone)
  - `plan` (Single select: essential, vip)
  - `status` (Single select: active, blocked, pending, paused)
  - `manualBlock` (Checkbox)
  - `preapproval_id` (Single line text)
  - `google_place_id` (Single line text) ← **NOVO! Para reviews sync**
  - `createdAt` (Date)
  - `updatedAt` (Date)

#### **Tabela 2: feedbacks**
- [ ] Nome: `feedbacks`
- [ ] Campos:
  - `siteSlug` (Single line text)
  - `name` (Single line text)
  - `email` (Email)
  - `phone` (Phone)
  - `rating` (Number: 1-5)
  - `comment` (Long text)
  - `status` (Single select: pending, approved, rejected)
  - `createdAt` (Date)

#### **Tabela 3: leads**
- [ ] Nome: `leads`
- [ ] Campos:
  - `siteSlug` (Single line text)
  - `name` (Single line text)
  - `email` (Email)
  - `phone` (Phone)
  - `source` (Single line text)
  - `status` (Single select: new, contacted, qualified, converted)
  - `score` (Number: 0-100)
  - `createdAt` (Date)

#### **Tabela 4: tokens**
- [ ] Nome: `tokens`
- [ ] Campos:
  - `siteSlug` (Single line text)
  - `provider` (Single select: google, meta, whatsapp)
  - `access_token` (Long text)
  - `refresh_token` (Long text)
  - `expires_at` (Date)
  - `createdAt` (Date)
  - `updatedAt` (Date)

#### **Tabela 5: reviews**
- [ ] Nome: `reviews`
- [ ] Campos:
  - `siteSlug` (Single line text)
  - `author` (Single line text)
  - `rating` (Number: 1-5)
  - `text` (Long text)
  - `date` (Date)
  - `origin` (Single select: google, facebook, website)
  - `reviewId` (Single line text)

#### **Tabela 6: onboardings**
- [ ] Nome: `onboardings`
- [ ] Campos:
  - `siteSlug` (Single line text) - Primary
  - `formData` (Long text - será JSON)
  - `status` (Single select: pending, in_progress, completed)
  - `createdAt` (Date)
  - `completedAt` (Date)

#### **Tabela 7: logs** (opcional)
- [ ] Nome: `logs`
- [ ] Campos:
  - `siteSlug` (Single line text)
  - `action` (Single line text)
  - `status` (Single select: success, error)
  - `details` (Long text)
  - `timestamp` (Date)

### **2.3 Obter Token**
- [ ] Airtable → Account → Developer Hub
- [ ] Personal Access Token → Create Token
- [ ] Dê acesso à base ELEVEA
- [ ] Copie o token (começa com `pat...`)

---

## 📋 **FASE 3: CONFIGURAÇÃO DO NETLIFY**

### **3.1 Configurar ENV VARS**

Netlify → Site → Site Settings → Environment → Add variable

- [ ] `N8N_BASE_URL` = `https://seu-n8n.com`
- [ ] `N8N_SIGNING_SECRET` = `elevea-super-secret-key-change-me`

**WhatsApp Business API:**
- [ ] `WHATSAPP_PHONE_ID` = `123456789012345`
- [ ] `WHATSAPP_BUSINESS_TOKEN` = `EAAxxxxxxx`

**Evolution API:**
- [ ] `EVOLUTION_API_URL` = `http://seu-servidor:8080`
- [ ] `EVOLUTION_API_KEY` = `sua-api-key`
- [ ] `EVOLUTION_INSTANCE_NAME` = `elevea-instance`

**OpenAI:**
- [ ] `OPENAI_API_KEY` = `sk-proj-xxxxxxx`

**Google:**
- [ ] `GOOGLE_CLIENT_ID` = `xxx.apps.googleusercontent.com`
- [ ] `GOOGLE_CLIENT_SECRET` = `GOCSPX-xxxxxx`
- [ ] `GOOGLE_PLACES_API_KEY` = `AIzaSyxxxxxx`

**Mercado Pago:**
- [ ] `MP_ACCESS_TOKEN` = `APP_USR-xxxxxxx`

**Telegram:**
- [ ] `TELEGRAM_BOT_TOKEN` = `123456:ABC-DEF...`
- [ ] `TELEGRAM_CHAT_ID` = `123456789`

### **3.2 Deploy**
- [ ] Salve as variáveis
- [ ] Trigger new deploy
- [ ] Aguarde conclusão
- [ ] Verifique se Functions estão ativas

---

## 📋 **FASE 4: CONFIGURAÇÃO DA EVOLUTION API**

### **4.1 Instalar Evolution API**

```bash
docker run -d \
  --name evolution-api \
  -p 8080:8080 \
  -e AUTHENTICATION_API_KEY=elevea-evolution-key-2025 \
  -e DATABASE_ENABLED=true \
  atendai/evolution-api:v2
```

- [ ] Docker container rodando
- [ ] Porta 8080 acessível

### **4.2 Criar Instance**

```bash
curl -X POST http://seu-servidor:8080/instance/create \
  -H "apikey: elevea-evolution-key-2025" \
  -d '{
    "instanceName": "elevea-instance",
    "qrcode": true,
    "webhook": {
      "url": "https://agenciaelevea.netlify.app/.netlify/functions/api/whatsapp/evolution-webhook",
      "webhook_by_events": true,
      "events": ["messages.upsert"]
    }
  }'
```

- [ ] Instance criada
- [ ] QR Code gerado

### **4.3 Conectar WhatsApp**

- [ ] Abra WhatsApp no celular
- [ ] Aparelhos conectados → Conectar
- [ ] Escaneie o QR Code retornado
- [ ] Aguarde confirmação

### **4.4 Verificar Conexão**

```bash
curl http://seu-servidor:8080/instance/connectionState/elevea-instance \
  -H "apikey: elevea-evolution-key-2025"
```

- [ ] Status: "open"
- [ ] Instance conectada

---

## 📋 **FASE 5: TESTES FINAIS**

### **5.1 Teste Login**
```bash
curl -X POST https://seu-n8n.com/webhook/api/auth/login \
  -H "x-elevea-key: elevea-super-secret-key-change-me" \
  -d '{"email":"admin@elevea.com","password":"123456"}'
```
- [ ] Retorna `{ "success": true, "user": {...}, "token": "..." }`

### **5.2 Teste Client Plan**
```bash
curl -X POST https://seu-n8n.com/webhook/api/client/plan \
  -d '{"siteSlug":"teste-site"}'
```
- [ ] Retorna dados do Airtable
- [ ] Status e plano corretos

### **5.3 Teste WhatsApp Bulk**
```bash
curl -X POST https://seu-n8n.com/webhook/api/whatsapp/send-bulk \
  -d '{
    "siteSlug":"teste",
    "recipients":["5596999999999"],
    "message":"Teste de envio em massa"
  }'
```
- [ ] Mensagem enviada
- [ ] Retorna `{ "success": true, "sent": 1 }`

### **5.4 Teste WhatsApp AI**
```bash
curl -X POST https://seu-n8n.com/webhook/api/whatsapp/send-ai \
  -d '{
    "phone":"5596999999999",
    "message":"Quais são os planos?",
    "useAI":true,
    "context":"Cliente perguntando sobre planos"
  }'
```
- [ ] IA gera resposta
- [ ] Evolution envia mensagem
- [ ] Retorna `{ "success": true, "aiUsed": true }`

### **5.5 Teste Feedback**
```bash
curl -X POST https://seu-n8n.com/webhook/api/feedback/submit \
  -d '{
    "siteSlug":"teste",
    "name":"João",
    "rating":5,
    "comment":"Muito bom!"
  }'
```
- [ ] Feedback salvo no Airtable
- [ ] Status: "pending"
- [ ] Retorna `{ "success": true }`

### **5.6 Teste Lead Capture**
```bash
curl -X POST https://seu-n8n.com/webhook/api/leads/capture \
  -d '{
    "siteSlug":"teste",
    "name":"Maria",
    "email":"maria@email.com",
    "phone":"5596999999999",
    "source":"landing-page"
  }'
```
- [ ] Lead salvo no Airtable
- [ ] Score padrão: 50
- [ ] Retorna `{ "success": true }`

### **5.7 Teste Mercado Pago Webhook**
```bash
curl -X POST https://seu-n8n.com/webhook/api/mercadopago/webhook \
  -d '{
    "type":"subscription_authorized",
    "data":{
      "id":"MP123",
      "external_reference":"teste-site"
    }
  }'
```
- [ ] Cliente ativado no Airtable
- [ ] Plano: vip
- [ ] Status: active
- [ ] Telegram recebeu alerta

### **5.8 Teste Admin Toggle**
```bash
curl -X POST https://seu-n8n.com/webhook/api/admin/toggle-block \
  -d '{"siteSlug":"teste-site","action":"block"}'
```
- [ ] Cliente bloqueado no Airtable
- [ ] Status: blocked
- [ ] Retorna `{ "success": true }`

### **5.9 Teste Reviews**
```bash
curl -X POST https://seu-n8n.com/webhook/api/google/reviews/list \
  -d '{"siteSlug":"teste-site"}'
```
- [ ] Retorna reviews do Airtable
- [ ] Ordenado por data (mais recente primeiro)

---

## 📋 **FASE 6: VERIFICAR AUTOMAÇÕES**

### **6.1 Token Refresh (10min)**
- [ ] Aguarde 10 minutos
- [ ] Verifique n8n → Executions
- [ ] Deve aparecer execução do "Token Refresh"
- [ ] Tokens expirados devem ser renovados

### **6.2 Billing Check (6AM daily)**
- [ ] Configure para testar manualmente:
  - Clique em "Execute Workflow" no nó Schedule
- [ ] Verifica clientes VIP ativos
- [ ] Consulta Mercado Pago
- [ ] Bloqueia se necessário

### **6.3 Reviews Sync (8AM daily)**
- [ ] Configure para testar manualmente
- [ ] Busca clientes com `google_place_id`
- [ ] Consulta Google Places API
- [ ] Salva reviews no Airtable
- [ ] Ignora duplicados

### **6.4 Backup (2AM daily)**
- [ ] Configure para testar manualmente
- [ ] Envia mensagem para Telegram
- [ ] Admin recebe confirmação

---

## 📋 **FASE 7: VERIFICAR NETLIFY FUNCTIONS**

### **7.1 Listar Functions Ativas**
```bash
# No terminal
cd netlify/functions/api
ls -R
```

Deve ter:
- [ ] `whatsapp/send-bulk.ts`
- [ ] `whatsapp/send-ai.ts`
- [ ] `whatsapp/evolution-webhook.ts`
- [ ] `whatsapp/get-messages.ts`
- [ ] `wa/send.ts`
- [ ] `wa/list.ts`
- [ ] `client_plan.ts`
- [ ] `feedbacks/list.ts`
- [ ] `feedbacks/submit.ts`
- [ ] `reviews/list.ts`
- [ ] `analytics.ts`
- [ ] `templates.ts`
- [ ] `leads/capture.ts`

### **7.2 Testar Localmente**
```bash
npm run dev:netlify
```

- [ ] Netlify Dev rodando
- [ ] Functions disponíveis em `http://localhost:8888`
- [ ] Teste um endpoint local

---

## 📋 **FASE 8: VERIFICAR FRONTEND**

### **8.1 Verificar Imports**
- [ ] `src/lib/api.ts` existe
- [ ] `src/lib/whatsapp.ts` existe
- [ ] `src/hooks/useApi.ts` existe
- [ ] `src/hooks/useWhatsApp.ts` existe
- [ ] `src/types/index.ts` existe
- [ ] `src/constants/index.ts` existe

### **8.2 Verificar Componentes**
- [ ] `WhatsAppButton.tsx` usa `openWhatsApp()` de `lib/whatsapp`
- [ ] `FeedbackWidget.tsx` usa endpoint correto
- [ ] `Header.tsx` usa `WHATSAPP_URL` de `lib/whatsapp`

### **8.3 Build e Preview**
```bash
npm run build
npm run preview
```

- [ ] Build sem erros
- [ ] Preview funciona
- [ ] Console sem erros críticos

---

## 📋 **FASE 9: SEGURANÇA**

### **9.1 Chave de Segurança**
- [ ] Troque `elevea-super-secret-key-change-me` por uma chave forte
- [ ] Use o mesmo valor em:
  - Nó "Code - Validate Security" no n8n
  - ENV VAR `N8N_SIGNING_SECRET` no Netlify

### **9.2 Tokens e Secrets**
- [ ] Todos os tokens estão nas ENV VARS do Netlify
- [ ] Nenhum token hardcoded no frontend
- [ ] `.env` no `.gitignore`

---

## 📋 **FASE 10: MONITORAMENTO**

### **10.1 Configurar Alertas**
- [ ] Telegram Bot configurado
- [ ] Chat ID correto
- [ ] Teste envio de mensagem

### **10.2 Logs**
- [ ] n8n → Executions (verificar histórico)
- [ ] Netlify → Functions (verificar logs)
- [ ] Airtable → Logs table (se criada)

---

## 🎉 **CHECKLIST FINAL DE GO-LIVE**

- [ ] ✅ Workflow n8n ativo
- [ ] ✅ Todos os valores editados nos nós Code
- [ ] ✅ Credenciais configuradas (Gmail, Airtable)
- [ ] ✅ Airtable: 7 tabelas criadas
- [ ] ✅ Netlify: 14 ENV VARS configuradas
- [ ] ✅ Evolution API instalada e conectada
- [ ] ✅ WhatsApp Business API configurada
- [ ] ✅ Todos os endpoints testados e funcionando
- [ ] ✅ Automações verificadas
- [ ] ✅ Telegram recebendo alertas
- [ ] ✅ Frontend buildado e sem erros
- [ ] ✅ Chave de segurança trocada
- [ ] ✅ Backup configurado

---

## 🚀 **IR PARA PRODUÇÃO**

Quando **TODOS** os checkboxes estiverem marcados:

```bash
# 1. Fazer build final
npm run build

# 2. Deploy no Netlify
git add .
git commit -m "🚀 Deploy para produção - Sistema completo"
git push origin main

# 3. Aguardar deploy
# Netlify faz deploy automático

# 4. Verificar
https://agenciaelevea.netlify.app

# 5. Testar em produção
curl -X POST https://seu-n8n.com/webhook/api/auth/login ...
```

---

## ✅ **SISTEMA ESTÁ PRONTO QUANDO:**

✅ Todos os checkboxes estão marcados
✅ Todos os testes passaram
✅ Automações funcionando
✅ Telegram recebendo notificações
✅ WhatsApp enviando mensagens
✅ Airtable armazenando dados
✅ Frontend sem erros

**PARABÉNS! SISTEMA EM PRODUÇÃO!** 🎉🚀

---

**Versão:** 3.0 - Production Ready  
**Data:** Janeiro 2025  
**Status:** ✅ Aprovado para Go-Live
