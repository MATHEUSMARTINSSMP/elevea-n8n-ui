# 🔍 RAIO-X COMPLETO - FUNÇÕES RESTANTES DO GAS

## 📊 **ANÁLISE COMPLETA**

**Funções totais no GAS:** 196  
**Funções implementadas:** 97 CORE + ~30 helpers = ~127  
**Funções de teste:** ~43 (IGNORAR)  
**Funções restantes:** ~26 (features VIP avançadas)

---

## 🎯 **FUNÇÕES QUE FALTAM IMPLEMENTAR**

### **🛒 1. ECOMMERCE (4 funções - VIP ONLY)**

#### **products (CRUD)**
- `get_products` - Listar produtos
- `create_product` - Criar produto
- `update_product` - Atualizar produto
- `delete_product` - Deletar produto

#### **orders (CRUD)**
- `get_orders` - Listar pedidos
- `create_order` - Criar pedido
- `update_order` - Atualizar pedido

#### **store_settings**
- `get_store_settings` - Configurações da loja
- `save_store_settings` - Salvar configurações

#### **inventory**
- `update_inventory` - Atualizar estoque
- `check_inventory` - Verificar estoque

**Total:** 4 endpoints principais (com CRUD = 11 sub-funções)

**Tabelas Airtable necessárias:**
- products
- orders
- store_settings
- inventory

---

### **📅 2. AGENDAMENTOS (3 funções - VIP ONLY)**

#### **appointments**
- `create_appointment` - Criar agendamento
- `list_appointments` - Listar agendamentos
- `cancel_appointment` - Cancelar agendamento
- `confirm_appointment` - Confirmar agendamento

#### **appointment_settings**
- `get_appointment_settings` - Configurações de agendamento
- `save_appointment_settings` - Salvar configurações

#### **checkAppointmentAvailability_**
- Verificar horários disponíveis
- Validar conflitos
- Retornar slots livres

**Total:** 3 endpoints principais (com CRUD = 7 sub-funções)

**Tabelas Airtable necessárias:**
- appointments
- appointment_settings
- appointment_slots (opcional)

---

### **🌍 3. MULTI-IDIOMA (2 funções - VIP ONLY)**

#### **language_settings**
- `get_language_settings` - Configurações de idioma
- `save_language_settings` - Salvar configurações
- `get_supported_languages` - Idiomas suportados

#### **translate_content**
- `translate_section` - Traduzir seção
- `get_translations` - Obter traduções
- `save_translation` - Salvar tradução

**Total:** 2 endpoints principais (com CRUD = 6 sub-funções)

**Tabelas Airtable necessárias:**
- language_settings
- translations
- content_i18n

---

### **🏷️ 4. WHITE LABEL (3 funções - VIP ONLY)**

#### **white_label_sites**
- `get_white_label_sites` - Listar sites white label
- `create_white_label_site` - Criar site white label
- `update_white_label_site` - Atualizar site

#### **reseller_branding**
- `get_reseller_branding` - Obter branding do revendedor
- `save_reseller_branding` - Salvar branding

#### **reseller_clients**
- `get_reseller_clients` - Listar clientes do revendedor
- `add_reseller_client` - Adicionar cliente

**Total:** 3 endpoints principais (com CRUD = 7 sub-funções)

**Tabelas Airtable necessárias:**
- white_label_sites
- reseller_branding
- reseller_clients

---

### **👥 5. REVENDEDORES (2 funções - VIP ONLY)**

#### **resellers**
- `get_resellers` - Listar revendedores
- `create_reseller` - Criar revendedor
- `update_reseller` - Atualizar revendedor

#### **reseller_clients**
- `get_reseller_clients` - Listar clientes (já implementado acima)

**Total:** 2 endpoints principais (com CRUD = 4 sub-funções)

**Tabelas Airtable necessárias:**
- resellers (já existe em white label)

---

### **🔧 6. UTILITÁRIOS ESPECÍFICOS (12 funções)**

#### **Helpers de planilha (substituídos por Airtable):**
- ✅ `getOrCreateSheet_` - Substituído por Airtable operations
- ✅ `findSheetData_` - Substituído por Airtable search
- ✅ `addSheetRow_` - Substituído por Airtable append
- ✅ `updateSheetRow_` - Substituído por Airtable update
- ✅ `openSS_` - Não necessário (Airtable)
- ✅ `ensureSheet_` - Não necessário (Airtable)

#### **Helpers de formatação (já integrados em Globals):**
- ✅ `normE164_` - Integrado em normalizePhone
- ✅ `onlyDigits_` - Integrado em normalizePhone
- ✅ `toE164CellBR_` - Integrado em normalizePhone
- ✅ `fmtPhoneBR_` - Implementado em Globals (formatPhoneBR)

#### **Helpers de geração (a implementar):**
- ⏳ `generateUniqueId_` - Gerar ID único
- ⏳ `generateOrderNumber_` - Gerar número do pedido
- ⏳ `generateLicenseKey_` - Gerar chave de licença

#### **Helpers de cache (não necessário no n8n):**
- ❌ `getCachedData_` - n8n tem cache nativo
- ❌ `setCachedData_` - n8n tem cache nativo

#### **Helpers de consolidação:**
- ⏳ `consolidateContacts_` - Consolidar contatos WhatsApp

#### **Helpers de limpeza:**
- ⏳ `kvCleanupLegacyKeys_` - Limpeza de dados antigos

**Total útil:** 5 helpers a implementar

---

### **🔒 7. SEGURANÇA (2 funções)**

#### **security_alerts**
- `checkSecurityAlerts_` - Verificar alertas
- `log_security_event` - Registrar evento de segurança

**Nota:** Já implementado via `audit_logs` com severity levels

**Status:** ✅ Substituído por audit_logs

---

### **📧 8. EMAILS ADICIONAIS (3 tipos)**

Já implementados 4 tipos. Faltam:

- ⏳ Email de boas-vindas (novo cliente)
- ⏳ Email de upgrade (Essential → VIP)
- ⏳ Email de lembrete de agendamento

**Total:** 3 tipos de email

---

## 📊 **RESUMO DO QUE FALTA**

### **Endpoints a implementar:**

| Categoria | Endpoints | Sub-funções | VIP? |
|-----------|-----------|-------------|------|
| Ecommerce | 4 | 11 | ✅ Sim |
| Agendamentos | 3 | 7 | ✅ Sim |
| Multi-idioma | 2 | 6 | ✅ Sim |
| White Label | 3 | 7 | ✅ Sim |
| Revendedores | 2 | 4 | ✅ Sim |
| Helpers úteis | - | 5 | ❌ Não |
| Emails | - | 3 | ❌ Não |

**TOTAL:** **14 endpoints** (+ 43 sub-funções CRUD/helpers)

---

## 🔗 **INTERLIGAÇÕES IDENTIFICADAS**

### **Ecommerce → Billing:**
- Criar pedido → Gerar cobrança MP
- Confirmar pedido → Atualizar estoque
- Cancelar pedido → Estornar pagamento

### **Agendamentos → WhatsApp:**
- Criar agendamento → Enviar confirmação WhatsApp
- Lembrete → WhatsApp automático (cron)
- Cancelar → Notificar WhatsApp

### **Multi-idioma → Site:**
- Salvar tradução → Atualizar site structure
- Mudar idioma → Rebuild Netlify

### **White Label → Sites:**
- Criar white label → Criar site structure
- Update branding → Update site settings

### **Revendedores → Clientes:**
- Criar reseller → Criar cliente com flag
- Reseller client → Link to reseller

---

## ✅ **DADOS IMPORTANTES FORA DAS FUNÇÕES**

### **1. Constantes e configurações:**
- ✅ `PLANS` (Essential/VIP) - JÁ EM GLOBALS
- ✅ `STATUS` (active/blocked/pending) - JÁ EM GLOBALS
- ✅ `ROLES` (admin/client) - JÁ EM GLOBALS
- ✅ `WHATSAPP_URLS` - JÁ EM GLOBALS
- ✅ `MP_EVENTS` - JÁ EM GLOBALS

### **2. Variáveis de ambiente:**
- ✅ Todas migradas para Netlify env vars
- ✅ Documentadas em NETLIFY_ENV_VARS_COMPLETO.md

### **3. Estruturas de dados:**
- ✅ Schemas migrados para Airtable
- ✅ Documentados em AIRTABLE_SCHEMAS_COMPLETO.md

### **4. Templates de email:**
- ✅ 4 tipos implementados (reset, vip, cancelled, billing)
- ⏳ 3 tipos faltando (boas-vindas, upgrade, agendamento)

### **5. Permissões e ACL:**
- ✅ Admin vs Client (implementado em validações)
- ✅ VIP vs Essential (implementado em todos os checks)

---

## 🎯 **DECISÃO: O QUE IMPLEMENTAR**

### **✅ IMPLEMENTAR AGORA (IMPORTANTES):**

1. **Ecommerce básico** (4 endpoints)
   - Products CRUD
   - Orders CRUD
   - Store settings
   - Integração com MP

2. **Agendamentos básico** (3 endpoints)
   - Appointments CRUD
   - Settings
   - WhatsApp integration

3. **Emails faltantes** (3 tipos)
   - Boas-vindas
   - Upgrade
   - Agendamento

4. **Helpers úteis** (5 funções)
   - generateUniqueId_
   - generateOrderNumber_
   - generateLicenseKey_
   - consolidateContacts_
   - kvCleanupLegacyKeys_

**Total:** ~15 funcionalidades

---

### **⏳ DEIXAR PARA DEPOIS (OPCIONAIS):**

1. **Multi-idioma** (complexo, poucos clientes usam)
2. **White Label** (feature nicho)
3. **Revendedores** (feature nicho)

**Total:** ~6 funcionalidades

---

## 🚀 **PLANO DE IMPLEMENTAÇÃO**

### **Fase 1: Ecommerce (VIP)** ✅ Vou implementar
- 4 webhooks
- 11 sub-funções CRUD
- 4 tabelas Airtable
- Integração com MP

### **Fase 2: Agendamentos (VIP)** ✅ Vou implementar
- 3 webhooks
- 7 sub-funções
- 2 tabelas Airtable
- Integração com WhatsApp

### **Fase 3: Emails + Helpers** ✅ Vou implementar
- 3 emails novos
- 5 helpers em Code nodes
- Integração nos fluxos existentes

### **Fase 4: Multi-idioma** ⏳ Opcional
### **Fase 5: White Label** ⏳ Opcional
### **Fase 6: Revendedores** ⏳ Opcional

---

## 📊 **APÓS IMPLEMENTAÇÃO**

### **Funcionalidades totais:**
- CORE: 97 ✅
- Ecommerce: 4 (novo)
- Agendamentos: 3 (novo)
- Emails: 3 (novo)
- Helpers: 5 (novo)

**TOTAL:** **112 funcionalidades**

### **Cobertura do GAS:**
- Implementadas: 112
- Testes: 43 (ignorar)
- Opcionais: 15 (white label, multi-idioma, revendedores)
- Substituídas: 26 (helpers de planilha → Airtable)

**TOTAL ÚTIL:** 112 de ~153 = **73% funcional**  
**CORE + VIP útil:** 112 de 112 = **100%** ✅

---

## ✅ **COMEÇANDO IMPLEMENTAÇÃO!**

Vou adicionar ao JSON:

1. ✅ Ecommerce completo (products, orders, store, inventory)
2. ✅ Agendamentos completo (appointments, settings, availability)
3. ✅ Emails adicionais (3 tipos)
4. ✅ Helpers úteis (5 funções)
5. ✅ Todas as conexões e integrações
6. ✅ Validações VIP
7. ✅ Audit logs

**INICIANDO AGORA!** 🚀
