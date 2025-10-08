# 🗄️ SCHEMAS AIRTABLE COMPLETOS - ELEVEA

## 📋 **VISÃO GERAL**

Este documento contém os schemas completos de todas as 15 tabelas Airtable necessárias para a migração completa do GAS para n8n.

---

## **1. 👥 users**

**Descrição:** Usuários e autenticação

| Campo | Tipo | Configuração | Obrigatório | Descrição |
|-------|------|--------------|-------------|-----------|
| `user_id` | Autonumber | Primary Key | ✅ | ID único do usuário |
| `email` | Email | Unique | ✅ | Email do usuário |
| `password_hash` | Single line text | | ✅ | Hash da senha (bcrypt) |
| `role` | Single select | Options: admin, client | ✅ | Papel do usuário |
| `site_slug` | Single line text | | ✅ | Slug do site |
| `status` | Single select | Options: active, blocked, pending | ✅ | Status da conta |
| `created_at` | Date | Include time | ✅ | Data de criação |
| `updated_at` | Last modified time | | ✅ | Última atualização |
| `last_login` | Date | Include time | ❌ | Último login |

---

## **2. 📊 clients**

**Descrição:** Dados dos clientes da agência

| Campo | Tipo | Configuração | Obrigatório | Descrição |
|-------|------|--------------|-------------|-----------|
| `client_id` | Autonumber | Primary Key | ✅ | ID único do cliente |
| `site_slug` | Single line text | Unique | ✅ | Slug do site (identificador) |
| `email` | Email | | ✅ | Email do cliente |
| `name` | Single line text | | ✅ | Nome do cliente |
| `plan` | Single select | Options: essential, vip | ✅ | Plano atual |
| `status` | Single select | Options: active, blocked, pending | ✅ | Status do cliente |
| `preapproval_id` | Single line text | | ❌ | ID da assinatura no Mercado Pago |
| `last_payment` | Date | Include time | ❌ | Data do último pagamento |
| `payment_amount` | Currency | | ❌ | Valor do último pagamento |
| `manual_block` | Checkbox | | ❌ | Bloqueio manual (admin) |
| `block_reason` | Long text | | ❌ | Motivo do bloqueio |
| `created_at` | Created time | | ✅ | Data de criação |
| `updated_at` | Last modified time | | ✅ | Última atualização |

---

## **3. 🔑 tokens**

**Descrição:** Tokens OAuth (Google, Facebook, etc)

| Campo | Tipo | Configuração | Obrigatório | Descrição |
|-------|------|--------------|-------------|-----------|
| `token_id` | Autonumber | Primary Key | ✅ | ID único do token |
| `site_slug` | Single line text | | ✅ | Slug do site |
| `provider` | Single select | Options: google, facebook, instagram | ✅ | Provedor OAuth |
| `access_token` | Long text | | ✅ | Token de acesso |
| `refresh_token` | Long text | | ❌ | Token de renovação |
| `expires_at` | Date | Include time | ✅ | Data de expiração |
| `scope` | Long text | | ❌ | Escopos autorizados |
| `created_at` | Created time | | ✅ | Data de criação |
| `updated_at` | Last modified time | | ✅ | Última atualização |

---

## **4. 📱 whatsapp_messages**

**Descrição:** Histórico de mensagens WhatsApp

| Campo | Tipo | Configuração | Obrigatório | Descrição |
|-------|------|--------------|-------------|-----------|
| `message_id` | Single line text | Primary Key, Unique | ✅ | ID único da mensagem |
| `site_slug` | Single line text | | ✅ | Slug do site |
| `phone_number` | Phone number | | ✅ | Número do telefone |
| `contact_name` | Single line text | | ❌ | Nome do contato |
| `message_text` | Long text | | ✅ | Texto da mensagem |
| `direction` | Single select | Options: incoming, outgoing | ✅ | Direção da mensagem |
| `status` | Single select | Options: sent, delivered, read, failed | ✅ | Status da mensagem |
| `api_provider` | Single select | Options: official, evolution | ✅ | API utilizada |
| `metadata` | Long text | JSON | ❌ | Metadados adicionais |
| `created_at` | Created time | | ✅ | Data de criação |

---

## **5. 📇 whatsapp_contacts**

**Descrição:** Contatos WhatsApp

| Campo | Tipo | Configuração | Obrigatório | Descrição |
|-------|------|--------------|-------------|-----------|
| `contact_id` | Autonumber | Primary Key | ✅ | ID único do contato |
| `phone_number` | Phone number | Unique | ✅ | Número do telefone |
| `site_slug` | Single line text | | ✅ | Slug do site |
| `name` | Single line text | | ❌ | Nome do contato |
| `email` | Email | | ❌ | Email do contato |
| `tags` | Multiple select | | ❌ | Tags do contato |
| `notes` | Long text | | ❌ | Notas adicionais |
| `last_message_at` | Date | Include time | ❌ | Data da última mensagem |
| `created_at` | Created time | | ✅ | Data de criação |
| `updated_at` | Last modified time | | ✅ | Última atualização |

---

## **6. 📝 whatsapp_templates**

**Descrição:** Templates de mensagens WhatsApp

| Campo | Tipo | Configuração | Obrigatório | Descrição |
|-------|------|--------------|-------------|-----------|
| `template_id` | Single line text | Primary Key, Unique | ✅ | ID do template |
| `site_slug` | Single line text | | ✅ | Slug do site |
| `name` | Single line text | | ✅ | Nome do template |
| `content` | Long text | | ✅ | Conteúdo do template |
| `variables` | Long text | JSON | ❌ | Variáveis do template |
| `category` | Single select | Options: marketing, utility, authentication | ✅ | Categoria |
| `language` | Single select | Options: pt_BR, en_US, es_ES | ✅ | Idioma |
| `status` | Single select | Options: approved, pending, rejected | ✅ | Status da aprovação |
| `created_at` | Created time | | ✅ | Data de criação |
| `updated_at` | Last modified time | | ✅ | Última atualização |

---

## **7. 💰 billing**

**Descrição:** Dados de cobrança e assinaturas

| Campo | Tipo | Configuração | Obrigatório | Descrição |
|-------|------|--------------|-------------|-----------|
| `billing_id` | Autonumber | Primary Key | ✅ | ID único da cobrança |
| `site_slug` | Single line text | Unique | ✅ | Slug do site |
| `preapproval_id` | Single line text | | ❌ | ID da assinatura MP |
| `payment_date` | Date | Include time | ❌ | Data do pagamento |
| `amount` | Currency | BRL | ✅ | Valor do pagamento |
| `status` | Single select | Options: authorized, paused, cancelled, pending | ✅ | Status da assinatura |
| `provider` | Single select | Options: mercadopago, stripe, paypal | ✅ | Provedor de pagamento |
| `next_billing_date` | Date | | ❌ | Próxima cobrança |
| `payment_method` | Single line text | | ❌ | Método de pagamento |
| `created_at` | Created time | | ✅ | Data de criação |
| `updated_at` | Last modified time | | ✅ | Última atualização |

---

## **8. 💳 payments**

**Descrição:** Histórico de pagamentos

| Campo | Tipo | Configuração | Obrigatório | Descrição |
|-------|------|--------------|-------------|-----------|
| `payment_id` | Single line text | Primary Key, Unique | ✅ | ID do pagamento |
| `site_slug` | Single line text | | ✅ | Slug do site |
| `amount` | Currency | BRL | ✅ | Valor do pagamento |
| `status` | Single select | Options: approved, pending, rejected, refunded | ✅ | Status do pagamento |
| `payment_method` | Single line text | | ✅ | Método de pagamento |
| `payment_date` | Date | Include time | ✅ | Data do pagamento |
| `description` | Long text | | ❌ | Descrição do pagamento |
| `external_id` | Single line text | | ❌ | ID externo (MP, Stripe) |
| `metadata` | Long text | JSON | ❌ | Metadados adicionais |
| `created_at` | Created time | | ✅ | Data de criação |

---

## **9. 🌟 google_credentials**

**Descrição:** Credenciais Google OAuth

| Campo | Tipo | Configuração | Obrigatório | Descrição |
|-------|------|--------------|-------------|-----------|
| `credential_id` | Autonumber | Primary Key | ✅ | ID único |
| `site_slug` | Single line text | Unique | ✅ | Slug do site |
| `access_token` | Long text | | ✅ | Token de acesso |
| `refresh_token` | Long text | | ✅ | Token de renovação |
| `expires_at` | Date | Include time | ✅ | Data de expiração |
| `business_id` | Single line text | | ❌ | ID do negócio GMB |
| `location_id` | Single line text | | ❌ | ID da localização GMB |
| `business_name` | Single line text | | ❌ | Nome do negócio |
| `location_name` | Single line text | | ❌ | Nome da localização |
| `scopes` | Long text | JSON | ❌ | Escopos autorizados |
| `status` | Single select | Options: active, expired, revoked | ✅ | Status da credencial |
| `created_at` | Created time | | ✅ | Data de criação |
| `updated_at` | Last modified time | | ✅ | Última atualização |

---

## **10. ⭐ google_reviews**

**Descrição:** Reviews do Google My Business

| Campo | Tipo | Configuração | Obrigatório | Descrição |
|-------|------|--------------|-------------|-----------|
| `review_id` | Single line text | Primary Key, Unique | ✅ | ID do review |
| `site_slug` | Single line text | | ✅ | Slug do site |
| `rating` | Number | Integer (1-5) | ✅ | Avaliação (1-5 estrelas) |
| `comment` | Long text | | ❌ | Comentário do review |
| `author_name` | Single line text | | ✅ | Nome do autor |
| `author_photo` | URL | | ❌ | Foto do autor |
| `review_date` | Date | Include time | ✅ | Data do review |
| `reply` | Long text | | ❌ | Resposta ao review |
| `reply_date` | Date | Include time | ❌ | Data da resposta |
| `synced_at` | Date | Include time | ✅ | Data da sincronização |
| `created_at` | Created time | | ✅ | Data de criação |

---

## **11. 💬 feedbacks**

**Descrição:** Feedbacks dos clientes finais

| Campo | Tipo | Configuração | Obrigatório | Descrição |
|-------|------|--------------|-------------|-----------|
| `feedback_id` | Autonumber | Primary Key | ✅ | ID único do feedback |
| `site_slug` | Single line text | | ✅ | Slug do site |
| `client_name` | Single line text | | ✅ | Nome do cliente |
| `client_email` | Email | | ❌ | Email do cliente |
| `rating` | Number | Integer (1-5) | ✅ | Avaliação (1-5 estrelas) |
| `comment` | Long text | | ✅ | Comentário do feedback |
| `status` | Single select | Options: pending, approved, rejected | ✅ | Status da aprovação |
| `approved_by` | Single line text | | ❌ | Email do aprovador |
| `approved_at` | Date | Include time | ❌ | Data da aprovação |
| `published` | Checkbox | | ❌ | Publicado no site |
| `published_at` | Date | Include time | ❌ | Data da publicação |
| `created_at` | Created time | | ✅ | Data de criação |

---

## **12. 🎯 leads**

**Descrição:** Leads capturados

| Campo | Tipo | Configuração | Obrigatório | Descrição |
|-------|------|--------------|-------------|-----------|
| `lead_id` | Autonumber | Primary Key | ✅ | ID único do lead |
| `site_slug` | Single line text | | ✅ | Slug do site |
| `name` | Single line text | | ✅ | Nome do lead |
| `email` | Email | | ❌ | Email do lead |
| `phone` | Phone number | | ❌ | Telefone do lead |
| `message` | Long text | | ❌ | Mensagem do lead |
| `source` | Single select | Options: website, whatsapp, facebook, instagram, google | ✅ | Origem do lead |
| `status` | Single select | Options: new, contacted, qualified, converted, lost | ✅ | Status do lead |
| `score` | Number | Integer (0-100) | ❌ | Score do lead |
| `metadata` | Long text | JSON | ❌ | Metadados adicionais |
| `created_at` | Created time | | ✅ | Data de criação |
| `updated_at` | Last modified time | | ✅ | Última atualização |

---

## **13. 📊 analytics_events**

**Descrição:** Eventos de analytics

| Campo | Tipo | Configuração | Obrigatório | Descrição |
|-------|------|--------------|-------------|-----------|
| `event_id` | Autonumber | Primary Key | ✅ | ID único do evento |
| `site_slug` | Single line text | | ✅ | Slug do site |
| `event_type` | Single select | Options: page_view, button_click, form_submit, whatsapp_click | ✅ | Tipo do evento |
| `event_data` | Long text | JSON | ❌ | Dados do evento |
| `page_url` | URL | | ❌ | URL da página |
| `referrer` | URL | | ❌ | Referrer |
| `ip_address` | Single line text | | ❌ | IP do visitante |
| `user_agent` | Long text | | ❌ | User agent |
| `device_type` | Single select | Options: mobile, desktop, tablet | ❌ | Tipo de dispositivo |
| `browser` | Single line text | | ❌ | Navegador |
| `created_at` | Created time | | ✅ | Data de criação |

---

## **14. 📝 onboardings**

**Descrição:** Processos de onboarding

| Campo | Tipo | Configuração | Obrigatório | Descrição |
|-------|------|--------------|-------------|-----------|
| `onboarding_id` | Autonumber | Primary Key | ✅ | ID único do onboarding |
| `site_slug` | Single line text | Unique | ✅ | Slug do site |
| `business_name` | Single line text | | ✅ | Nome do negócio |
| `business_type` | Single select | Options: restaurant, salon, clinic, store, service, portfolio, other | ✅ | Tipo de negócio |
| `business_description` | Long text | | ✅ | Descrição do negócio |
| `target_audience` | Long text | | ✅ | Público-alvo |
| `colors` | Long text | JSON | ❌ | Cores (hex) |
| `logo_url` | URL | | ❌ | URL do logo |
| `images_urls` | Long text | JSON | ❌ | URLs das imagens |
| `social_links` | Long text | JSON | ❌ | Links das redes sociais |
| `contact_info` | Long text | JSON | ❌ | Informações de contato |
| `status` | Single select | Options: pending, in_progress, completed | ✅ | Status do onboarding |
| `prompt_generated` | Long text | | ❌ | Prompt gerado para IA |
| `completed_at` | Date | Include time | ❌ | Data de conclusão |
| `created_at` | Created time | | ✅ | Data de criação |
| `updated_at` | Last modified time | | ✅ | Última atualização |

---

## **15. 🔒 audit_logs**

**Descrição:** Logs de auditoria

| Campo | Tipo | Configuração | Obrigatório | Descrição |
|-------|------|--------------|-------------|-----------|
| `log_id` | Autonumber | Primary Key | ✅ | ID único do log |
| `site_slug` | Single line text | | ❌ | Slug do site (se aplicável) |
| `action` | Single select | Options: login, logout, client_created, client_blocked, payment_received, setting_changed, etc | ✅ | Ação realizada |
| `user_email` | Email | | ✅ | Email do usuário |
| `user_role` | Single select | Options: admin, client | ✅ | Papel do usuário |
| `details` | Long text | JSON | ❌ | Detalhes da ação |
| `ip_address` | Single line text | | ❌ | IP do usuário |
| `user_agent` | Long text | | ❌ | User agent |
| `severity` | Single select | Options: info, warning, error, critical | ✅ | Gravidade |
| `created_at` | Created time | | ✅ | Data de criação |

---

## 🔗 **RELACIONAMENTOS**

### **users ← → clients**
- `users.site_slug` = `clients.site_slug`

### **clients ← → tokens**
- `clients.site_slug` = `tokens.site_slug`

### **clients ← → whatsapp_messages**
- `clients.site_slug` = `whatsapp_messages.site_slug`

### **clients ← → whatsapp_contacts**
- `clients.site_slug` = `whatsapp_contacts.site_slug`

### **clients ← → whatsapp_templates**
- `clients.site_slug` = `whatsapp_templates.site_slug`

### **clients ← → billing**
- `clients.site_slug` = `billing.site_slug`

### **clients ← → payments**
- `clients.site_slug` = `payments.site_slug`

### **clients ← → google_credentials**
- `clients.site_slug` = `google_credentials.site_slug`

### **clients ← → google_reviews**
- `clients.site_slug` = `google_reviews.site_slug`

### **clients ← → feedbacks**
- `clients.site_slug` = `feedbacks.site_slug`

### **clients ← → leads**
- `clients.site_slug` = `leads.site_slug`

### **clients ← → analytics_events**
- `clients.site_slug` = `analytics_events.site_slug`

### **clients ← → onboardings**
- `clients.site_slug` = `onboardings.site_slug`

### **clients ← → audit_logs**
- `clients.site_slug` = `audit_logs.site_slug` (opcional)

---

## 📦 **SCRIPT DE CRIAÇÃO (Airtable API)**

```javascript
// Script para criar todas as bases no Airtable
const bases = [
  {
    name: "users",
    fields: [
      { name: "email", type: "email" },
      { name: "password_hash", type: "singleLineText" },
      { name: "role", type: "singleSelect", options: ["admin", "client"] },
      { name: "site_slug", type: "singleLineText" },
      { name: "status", type: "singleSelect", options: ["active", "blocked", "pending"] },
      { name: "last_login", type: "dateTime" }
    ]
  },
  // ... outros schemas
];
```

---

## 🎉 **RESULTADO FINAL**

**✅ 15 TABELAS ESTRUTURADAS**
**✅ 150+ CAMPOS DEFINIDOS**
**✅ RELACIONAMENTOS CLAROS**
**✅ TIPOS CORRETOS**
**✅ VALIDAÇÕES CONFIGURADAS**
**✅ PRONTO PARA MIGRAÇÃO!**
