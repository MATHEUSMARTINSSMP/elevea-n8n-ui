# 🚀 GUIA RÁPIDO DE INÍCIO - ELEVEA N8N

## ⏱️ **TEMPO ESTIMADO: 10-15 HORAS**

Este guia passo-a-passo vai te ajudar a colocar o sistema ELEVEA em produção rapidamente.

---

## 📋 **CHECKLIST PRÉ-REQUISITOS**

Antes de começar, certifique-se de ter acesso a:

- [ ] Conta GitHub (para o código)
- [ ] Conta Netlify (hospedagem frontend)
- [ ] Conta n8n Cloud (backend)
- [ ] Conta Airtable (banco de dados)
- [ ] Conta Resend (emails)
- [ ] Conta WhatsApp Business API (opcional, mas recomendado)
- [ ] Conta Evolution API (opcional, para IA)
- [ ] Conta Mercado Pago (pagamentos)
- [ ] Conta Google Cloud (OAuth e GMB)
- [ ] Conta Telegram Bot (alertas, opcional)

---

## 🏃 **PASSO 1: CONFIGURAR AIRTABLE (30-45 min)**

### **1.1 Criar conta Airtable**
1. Acesse https://airtable.com
2. Crie uma conta gratuita ou Plus
3. Crie uma nova base chamada "ELEVEA Production"

### **1.2 Criar as 15 tabelas**

**Use o documento completo:** `AIRTABLE_SCHEMAS_COMPLETO.md`

Para cada tabela, copie os campos exatos:

1. **users** (9 campos)
2. **clients** (12 campos)
3. **tokens** (8 campos)
4. **whatsapp_messages** (10 campos)
5. **whatsapp_contacts** (10 campos)
6. **whatsapp_templates** (10 campos)
7. **billing** (11 campos)
8. **payments** (10 campos)
9. **google_credentials** (13 campos)
10. **google_reviews** (11 campos)
11. **feedbacks** (12 campos)
12. **leads** (12 campos)
13. **analytics_events** (11 campos)
14. **onboardings** (15 campos)
15. **audit_logs** (10 campos)

### **1.3 Obter API Key e Base ID**

1. Vá em https://airtable.com/account
2. Clique em "Generate personal access token"
3. Copie o token (começa com `key...`)
4. Vá na sua base e copie o Base ID da URL (começa com `app...`)

**Anote:**
```
AIRTABLE_API_KEY=keyXXXXXXXXXXXXXX
AIRTABLE_BASE_ID=appXXXXXXXXXXXXXX
```

---

## 🤖 **PASSO 2: CONFIGURAR N8N (45-60 min)**

### **2.1 Criar conta n8n Cloud**
1. Acesse https://n8n.io
2. Crie uma conta (plano Cloud padrão, ~$20/mês)
3. Crie um novo workflow

### **2.2 Configurar credenciais**

No n8n, vá em **Settings → Credentials** e adicione:

1. **Airtable**
   - Nome: "Airtable ELEVEA"
   - API Key: `(seu token do passo 1.3)`

2. **HTTP Header Auth** (para Resend)
   - Nome: "Resend API"
   - Header Name: `Authorization`
   - Header Value: `Bearer re_XXXXXXXXX` (obtenha em https://resend.com)

3. **HTTP Header Auth** (para WhatsApp Business)
   - Nome: "WhatsApp Business"
   - Header Name: `Authorization`
   - Header Value: `Bearer EAAxxxxxx` (obtenha no Facebook Developers)

4. **HTTP Header Auth** (para Evolution API)
   - Nome: "Evolution API"
   - Header Name: `apikey`
   - Header Value: `(sua chave da Evolution API)`

5. **Google OAuth2**
   - Nome: "Google OAuth"
   - Client ID: `(obtenha no Google Cloud Console)`
   - Client Secret: `(obtenha no Google Cloud Console)`
   - Scopes: `https://www.googleapis.com/auth/business.manage,https://www.googleapis.com/auth/userinfo.email`

### **2.3 Importar workflows**

**Você precisará criar os workflows manualmente seguindo:**
- `GUIA_IMPLEMENTACAO_COMPLETA.md`
- `AIRTABLE_SCHEMAS_COMPLETO.md`

**Principais workflows a criar:**

1. **Auth & Users** (6 webhooks)
2. **Clients** (3 webhooks)
3. **WhatsApp** (6 webhooks)
4. **Mercado Pago** (2 webhooks)
5. **Google** (4 webhooks)
6. **Feedback** (3 webhooks)
7. **Leads** (2 webhooks)
8. **Analytics** (3 webhooks)
9. **Site** (4 webhooks)
10. **Onboarding** (3 webhooks)
11. **Admin** (4 webhooks)
12. **Cron Jobs** (4 schedules)

### **2.4 Ativar workflows**

Certifique-se de:
- [ ] Ativar todos os webhooks
- [ ] Ativar todos os cron jobs
- [ ] Testar com requests de exemplo

### **2.5 Obter URLs dos webhooks**

Copie as URLs geradas pelo n8n (formato: `https://your-instance.app.n8n.cloud/webhook/api/...`)

---

## 🌐 **PASSO 3: CONFIGURAR NETLIFY (30-45 min)**

### **3.1 Criar conta Netlify**
1. Acesse https://netlify.com
2. Crie uma conta (plano gratuito)
3. Conecte com GitHub

### **3.2 Deploy do repositório**

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/elevea-n8n-ui.git
cd elevea-n8n-ui

# Instale dependências
npm install

# Faça o primeiro deploy
netlify deploy --prod
```

Ou pela interface:
1. Vá em "Add new site"
2. Conecte ao repositório GitHub
3. Configure:
   - Build command: `npm run build`
   - Publish directory: `dist`

### **3.3 Configurar variáveis de ambiente**

**Use o documento completo:** `NETLIFY_ENV_VARS_COMPLETO.md`

No Netlify, vá em **Site settings → Environment variables** e adicione:

**Mínimo essencial (20 variáveis):**

```bash
# Aplicação
VITE_APP_NAME=ELEVEA
VITE_ENV=production
VITE_SITE_URL=https://seu-site.netlify.app
VITE_N8N_URL=https://your-n8n.app.n8n.cloud/webhook
N8N_BASE_URL=https://your-n8n.app.n8n.cloud/webhook
N8N_SIGNING_SECRET=sua-chave-secreta
ADMIN_DASH_TOKEN=token-admin

# Resend
RESEND_API_KEY=re_xxxxxxxxx
RESEND_FROM_EMAIL=noreply@elevea.com

# Airtable
AIRTABLE_API_KEY=keyXXXXXXXXXX
AIRTABLE_BASE_ID=appXXXXXXXXXX

# WhatsApp Business
WHATSAPP_BUSINESS_TOKEN=EAAxxxxxx
WHATSAPP_PHONE_NUMBER_ID=123456789
WHATSAPP_API_URL=https://graph.facebook.com/v18.0

# Mercado Pago
MERCADO_PAGO_ACCESS_TOKEN=APP_USR-xxxxxx
MERCADO_PAGO_PUBLIC_KEY=APP_USR-xxxxxx

# Google
GOOGLE_CLIENT_ID=xxxxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-xxxxx

# JWT
JWT_SECRET=sua-chave-jwt-secreta
```

**Para lista completa (60+ variáveis):** veja `NETLIFY_ENV_VARS_COMPLETO.md`

### **3.4 Configurar domínio (opcional)**

Se você tem um domínio:
1. Vá em **Domain settings**
2. Adicione seu domínio
3. Configure DNS conforme instruções
4. Ative SSL (automático)

---

## 🔧 **PASSO 4: CONFIGURAR INTEGRAÇÕES (60-90 min)**

### **4.1 Google Cloud Console**

1. Acesse https://console.cloud.google.com
2. Crie um novo projeto "ELEVEA"
3. Ative as APIs:
   - Google My Business API
   - Google OAuth2 API
4. Crie credenciais OAuth 2.0:
   - Tipo: Aplicativo da Web
   - Origens JavaScript autorizadas: `https://seu-site.netlify.app`
   - URIs de redirecionamento: `https://seu-site.netlify.app/google/callback`
5. Copie Client ID e Client Secret

### **4.2 WhatsApp Business API**

1. Acesse https://developers.facebook.com
2. Crie um app "ELEVEA WhatsApp"
3. Adicione produto "WhatsApp Business"
4. Configure:
   - Phone number
   - Webhooks
   - Templates de mensagem
5. Copie:
   - Access Token
   - Phone Number ID
   - Webhook Verify Token

### **4.3 Evolution API (opcional)**

1. Acesse seu provedor de Evolution API
2. Crie uma nova instância
3. Obtenha:
   - API Key
   - Instance ID
   - URL da API

### **4.4 Mercado Pago**

1. Acesse https://www.mercadopago.com.br/developers
2. Crie uma aplicação "ELEVEA"
3. Obtenha:
   - Access Token (produção)
   - Public Key
4. Configure webhook:
   - URL: `https://your-n8n.app.n8n.cloud/webhook/api/mercadopago/webhook`
   - Eventos: payment, subscription

### **4.5 Resend**

1. Acesse https://resend.com
2. Crie uma conta
3. Adicione domínio (ou use resend.dev para testes)
4. Gere API Key
5. Configure DNS (se usar domínio próprio)

### **4.6 Telegram (opcional)**

1. Fale com @BotFather no Telegram
2. Crie novo bot: `/newbot`
3. Copie o token
4. Obtenha seu Chat ID:
   - Fale com @userinfobot
   - Copie o ID

---

## ✅ **PASSO 5: TESTAR TUDO (60-90 min)**

### **5.1 Teste de autenticação**

```bash
# Ping
curl https://your-n8n.app.n8n.cloud/webhook/api/ping

# Login
curl -X POST https://your-n8n.app.n8n.cloud/webhook/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@elevea.com","password":"senha123"}'
```

### **5.2 Teste de email**

```bash
curl -X POST https://your-n8n.app.n8n.cloud/webhook/api/auth/password-reset-request \
  -H "Content-Type: application/json" \
  -d '{"email":"seu-email@gmail.com"}'
```

Verifique se recebeu o email.

### **5.3 Teste de WhatsApp**

```bash
# Envio com API oficial
curl -X POST https://your-n8n.app.n8n.cloud/webhook/api/whatsapp/send-bulk \
  -H "Content-Type: application/json" \
  -d '{
    "siteSlug":"teste",
    "phones":["5511999999999"],
    "message":"Teste ELEVEA"
  }'
```

### **5.4 Teste de Airtable**

1. Crie um cliente manualmente no Airtable
2. Faça request para obter dados:

```bash
curl -X POST https://your-n8n.app.n8n.cloud/webhook/api/client/plan \
  -H "Content-Type: application/json" \
  -d '{"siteSlug":"teste"}'
```

### **5.5 Teste de Google OAuth**

1. Acesse `https://seu-site.netlify.app`
2. Faça login
3. Conecte Google My Business
4. Verifique se reviews são carregados

### **5.6 Teste de Mercado Pago**

1. Use a ferramenta de testes do Mercado Pago
2. Envie um webhook de teste
3. Verifique se o status do cliente muda

### **5.7 Teste de cron jobs**

1. No n8n, execute manualmente cada cron
2. Verifique os logs
3. Confirme que as ações foram executadas

---

## 📊 **PASSO 6: MONITORAR (Contínuo)**

### **6.1 Configurar alertas**

1. No Telegram, adicione o bot que você criou
2. Envie uma mensagem de teste
3. Configure alertas para:
   - Erros críticos
   - Pagamentos recebidos
   - Novos reviews
   - Novos leads

### **6.2 Verificar logs**

Diariamente:
- [ ] Logs do n8n
- [ ] Logs do Netlify
- [ ] Status do Airtable
- [ ] Quota das APIs

### **6.3 Backups**

Semanalmente:
- [ ] Export do Airtable (via cron)
- [ ] Export dos workflows n8n
- [ ] Backup das variáveis de ambiente

---

## 🎯 **CHECKLIST FINAL**

### **Antes de ir para produção:**

- [ ] Todas as variáveis de ambiente configuradas
- [ ] Todos os webhooks funcionando
- [ ] Emails sendo enviados
- [ ] WhatsApp enviando mensagens
- [ ] Mercado Pago processando webhooks
- [ ] Google OAuth funcionando
- [ ] Cron jobs executando
- [ ] Logs sendo registrados
- [ ] Alertas configurados
- [ ] Backups configurados
- [ ] Frontend publicado
- [ ] Domínio configurado (se aplicável)
- [ ] SSL ativo
- [ ] Testes manuais feitos
- [ ] Documentação revisada

### **Após ir para produção:**

- [ ] Monitorar logs por 24h
- [ ] Testar fluxos reais
- [ ] Verificar performance
- [ ] Coletar feedback
- [ ] Ajustar conforme necessário

---

## 🆘 **SOLUÇÃO DE PROBLEMAS**

### **Problema: Webhook não responde**

✅ **Solução:**
1. Verifique se o workflow está ativo no n8n
2. Confirme a URL do webhook
3. Teste com curl direto no n8n
4. Verifique logs de erro

### **Problema: Email não envia**

✅ **Solução:**
1. Confirme API Key do Resend
2. Verifique domínio configurado
3. Confira DNS (SPF, DKIM)
4. Teste com email de teste do Resend

### **Problema: WhatsApp não envia**

✅ **Solução:**
1. Confirme token do WhatsApp Business
2. Verifique se o número está verificado
3. Confirme templates aprovados
4. Teste com número de teste

### **Problema: Airtable retorna erro**

✅ **Solução:**
1. Confirme API Key
2. Verifique Base ID
3. Confirme nomes das tabelas
4. Verifique estrutura dos campos

### **Problema: Google OAuth falha**

✅ **Solução:**
1. Confirme Client ID e Secret
2. Verifique redirect URI
3. Confirme scopes
4. Reautorize a aplicação

---

## 📞 **SUPORTE**

Se tiver problemas:

1. **Revise a documentação:**
   - `GUIA_IMPLEMENTACAO_COMPLETA.md`
   - `AIRTABLE_SCHEMAS_COMPLETO.md`
   - `NETLIFY_ENV_VARS_COMPLETO.md`

2. **Verifique os logs:**
   - n8n execution logs
   - Netlify function logs
   - Browser console

3. **Teste isoladamente:**
   - Cada integração separadamente
   - Use curl para testar APIs
   - Verifique responses

4. **Contato:**
   - Email: contato@agenciaelevea.com
   - WhatsApp: (XX) XXXXX-XXXX

---

## 🎉 **PRONTO!**

Seu sistema ELEVEA está agora 100% funcional em produção!

**Próximos passos:**
- Adicione seus primeiros clientes
- Configure templates do WhatsApp
- Personalize o frontend
- Adicione novos recursos conforme necessário

**Boa sorte! 🚀**
