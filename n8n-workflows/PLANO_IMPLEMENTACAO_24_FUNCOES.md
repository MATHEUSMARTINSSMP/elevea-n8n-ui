# 🚀 PLANO DE IMPLEMENTAÇÃO - 24 FUNÇÕES VIP

## 📋 **ORDEM DE IMPLEMENTAÇÃO**

### **FASE 1: HELPERS ESSENCIAIS (5 funções)**
Adicionar ao `code-globals` as funções que TODAS as outras vão precisar:

1. ✅ `generateUniqueId()` - UUID v4
2. ✅ `generateOrderNumber()` - ORD-{timestamp}-{random}
3. ✅ `generateLicenseKey()` - XXXX-XXXX-XXXX-XXXX
4. ✅ `consolidateContacts(rows)` - Unifica contatos duplicados
5. ✅ `processMessageVariables(msg, vars)` - {{saudacao}}, {{nome}}, etc.

**Implementação:** Expandir o node `code-globals` (ID: code-globals, linha ~73)

---

### **FASE 2: WHATSAPP AVANÇADO (4 endpoints)**

#### **2.1 - Listar Contatos**
- **Endpoint:** `api/whatsapp/contacts`
- **Método:** POST
- **Nodes:**
  - Webhook → Code (filtrar/paginar) → Airtable Search (whatsapp_contacts) → Respond

#### **2.2 - Importar Contatos**
- **Endpoint:** `api/whatsapp/contacts/import`
- **Método:** POST
- **Nodes:**
  - Webhook → Code (validar array) → Loop (cada contato) → Airtable Append → Code (consolidar) → Respond
- **Validações:** Telefone E.164, nome obrigatório
- **Interligação:** Usa `consolidateContacts()` e `normalizePhone()`

#### **2.3 - Atualizar Contato**
- **Endpoint:** `api/whatsapp/contacts/update`
- **Método:** POST
- **Nodes:**
  - Webhook → Code (validar) → Airtable Search (by phone) → Airtable Update → Respond
- **Interligação:** Atualiza nome, empresa, tags, profilePicUrl

#### **2.4 - CRUD Templates WhatsApp**
- **Endpoint:** `api/whatsapp/templates/upsert`
- **Método:** POST
- **Nodes:**
  - Webhook → Code (validar) → Airtable Search (by id) → IF (exists?) → Airtable Update/Append → Respond
- **Interligação:** Usa `generateUniqueId()` se novo

---

### **FASE 3: ECOMMERCE COMPLETO (7 endpoints)**

#### **3.1 - Atualizar Produto**
- **Endpoint:** `api/ecommerce/products/update`
- **Método:** POST
- **Nodes:**
  - Webhook → Code (validar VIP) → Airtable Search (products by id) → Airtable Update → Respond
- **Validação:** VIP only, product id obrigatório
- **Interligação:** Atualiza `updated_at` automaticamente

#### **3.2 - Deletar Produto**
- **Endpoint:** `api/ecommerce/products/delete`
- **Método:** POST
- **Nodes:**
  - Webhook → Code (validar VIP) → Airtable Search → Airtable Update (active=false) → Respond
- **Interligação:** Soft delete (active=false), mantém histórico

#### **3.3 - Listar Pedidos**
- **Endpoint:** `api/ecommerce/orders`
- **Método:** POST
- **Nodes:**
  - Webhook → Code (validar VIP + filtros) → Airtable List (orders) → Code (paginar) → Respond
- **Filtros:** status, date range, customer

#### **3.4 - Criar Pedido**
- **Endpoint:** `api/ecommerce/orders/create`
- **Método:** POST
- **Nodes:**
  - Webhook → Code (validar VIP) → Code (gerar order number) → Airtable Append (orders) → IF (payment_method=mp) → HTTP (Mercado Pago) → Respond
- **Interligação:** 
  - Usa `generateOrderNumber()`
  - Cria cobrança no MP se payment_method='mercadopago'
  - Envia email confirmação
  - Envia WhatsApp confirmação

#### **3.5 - Atualizar Status Pedido**
- **Endpoint:** `api/ecommerce/orders/status`
- **Método:** POST
- **Nodes:**
  - Webhook → Code (validar) → Airtable Search (orders) → Airtable Update → IF (status=paid) → [Email + WhatsApp] → IF (status=cancelled) → [MP Refund] → Respond
- **Interligações:**
  - status='paid' → Email + WhatsApp confirmação
  - status='cancelled' → Estorno MP (se aplicável)
  - status='shipped' → WhatsApp com código rastreio
  - Atualiza estoque se status='paid'

#### **3.6 - Atualizar Config Loja**
- **Endpoint:** `api/ecommerce/store/settings/update`
- **Método:** POST
- **Nodes:**
  - Webhook → Code (validar VIP) → Airtable Search → Airtable Update/Append → Respond

#### **3.7 - Analytics Loja**
- **Endpoint:** `api/ecommerce/analytics`
- **Método:** POST
- **Nodes:**
  - Webhook → Code (validar VIP) → Airtable List (orders) → Code (agregar dados) → Respond
- **Dados:** Total vendas, produtos mais vendidos, receita, conversão

---

### **FASE 4: AGENDAMENTOS COMPLETO (4 endpoints)**

#### **4.1 - Listar Agendamentos**
- **Endpoint:** `api/appointments`
- **Método:** POST
- **Nodes:**
  - Webhook → Code (validar VIP + filtros) → Airtable List (appointments) → Code (paginar) → Respond
- **Filtros:** date range, status, customer

#### **4.2 - Cancelar Agendamento**
- **Endpoint:** `api/appointments/cancel`
- **Método:** POST
- **Nodes:**
  - Webhook → Code (validar) → Airtable Search → Airtable Update (status=cancelled) → Code (preparar WhatsApp) → HTTP (WhatsApp) → Email → Respond
- **Interligação:**
  - Envia WhatsApp cancelamento
  - Envia Email cancelamento
  - Registra no audit_logs

#### **4.3 - Confirmar Agendamento**
- **Endpoint:** `api/appointments/confirm`
- **Método:** POST
- **Nodes:**
  - Webhook → Code (validar) → Airtable Search → Airtable Update (status=confirmed) → Code (preparar WhatsApp) → HTTP (WhatsApp) → Email → Respond
- **Interligação:**
  - Envia WhatsApp confirmação
  - Envia Email confirmação
  - Adiciona ao Google Calendar (se integrado)

#### **4.4 - Atualizar Config Agendamento**
- **Endpoint:** `api/appointments/settings/update`
- **Método:** POST
- **Nodes:**
  - Webhook → Code (validar VIP) → Airtable Search → Airtable Update/Append → Respond

---

### **FASE 5: AUDIT & SECURITY (4 endpoints)**

#### **5.1 - Alertas de Segurança**
- **Endpoint:** `api/audit/security-alerts`
- **Método:** POST
- **Nodes:**
  - Webhook → Airtable List (security_alerts) → Code (filtrar) → Respond
- **Filtros:** severity, resolved, date range

#### **5.2 - Gerar Relatório Audit**
- **Endpoint:** `api/audit/reports/generate`
- **Método:** POST
- **Nodes:**
  - Webhook → Code (validar admin) → Airtable List (audit_logs) → Code (agregar por categoria/severity/usuário) → Respond
- **Output:** CSV ou JSON com estatísticas completas

#### **5.3 - Resolver Alerta**
- **Endpoint:** `api/audit/alerts/resolve`
- **Método:** POST
- **Nodes:**
  - Webhook → Code (validar admin) → Airtable Search (alert) → Airtable Update (resolved=true) → Respond

#### **5.4 - Estatísticas Audit**
- **Endpoint:** `api/audit/statistics`
- **Método:** POST
- **Nodes:**
  - Webhook → Airtable List (audit_logs) → Code (agregar métricas) → Respond
- **Métricas:**
  - Total eventos por dia/semana/mês
  - Eventos por categoria
  - Eventos por severidade
  - Top usuários/sites
  - Padrões suspeitos

---

## 🔗 **CONEXÕES E INTEGRAÇÕES**

### **Ecommerce → Mercado Pago:**
```
ecommerce_create_order (status=pending)
  → HTTP POST Mercado Pago (criar preferência)
  → Salva payment_id no order
  → Retorna link de pagamento

Mercado Pago Webhook (payment_approved)
  → Busca order por payment_id
  → ecommerce_update_order_status (status=paid)
  → Envia Email + WhatsApp confirmação
  → Atualiza estoque
```

### **Agendamentos → WhatsApp → Cron:**
```
appointment_create
  → Salva no Airtable
  → Envia WhatsApp confirmação imediata
  → Envia Email confirmação

Cron (daily 08:00)
  → Busca appointments próximos (24h)
  → Para cada um: envia WhatsApp lembrete
```

### **WhatsApp Contacts → Messages:**
```
wa_import_contacts
  → Valida e normaliza telefones
  → Usa consolidateContacts() para unificar
  → Salva em whatsapp_contacts

wa_send_bulk
  → Busca contatos ativos
  → Filtra por tags (se especificado)
  → Envia mensagem para cada um
  → Salva em whatsapp_messages
```

---

## 📊 **NOVOS NODES NO JSON**

### **Totais:**
- **Webhooks novos:** 18 (4 WA + 7 Ecommerce + 4 Appointments + 4 Audit - 1 já existe)
- **Code nodes novos:** ~25 (validações, processamento, agregações)
- **Airtable operations novos:** ~35 (search, update, append, list)
- **HTTP requests novos:** ~8 (MP, WhatsApp, Email)
- **IF nodes novos:** ~12 (validações VIP, status checks)
- **Respond nodes novos:** 18

**TOTAL NODES NOVOS: ~116**

**TOTAL NODES JSON APÓS IMPLEMENTAÇÃO: ~356 nodes**

---

## ✅ **APÓS IMPLEMENTAÇÃO COMPLETA**

### **Endpoints totais:**
- Atual: 45
- Novos: 18
- **Total: 63 endpoints** ✅

### **Funções totais:**
- Core: 97
- Helpers: 30
- VIP novas: 24
- **Total: 151 funções** ✅

### **Cobertura GAS:**
- Funções úteis: ~153
- Implementadas: 151
- **Cobertura: 98.7%** ✅

---

## 🎯 **COMEÇANDO IMPLEMENTAÇÃO!**

Vou adicionar em LOTES para facilitar o controle:

1. **LOTE 1:** Helpers em code-globals (5 funções)
2. **LOTE 2:** WhatsApp Avançado (4 endpoints)
3. **LOTE 3:** Ecommerce Parte 1 (4 endpoints - CRUD produtos/loja)
4. **LOTE 4:** Ecommerce Parte 2 (3 endpoints - Orders + MP integration)
5. **LOTE 5:** Agendamentos (4 endpoints + WhatsApp integration)
6. **LOTE 6:** Audit & Security (4 endpoints)

**INICIANDO LOTE 1 AGORA!** 🔥
