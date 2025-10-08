# 🎯 20 ENDPOINTS FALTANTES - IMPLEMENTAÇÃO COMPLETA

## 📋 **RESUMO EXECUTIVO**

Este documento detalha os **20 endpoints** que faltam para completar **100% das funcionalidades úteis do GAS** no n8n.

**Status atual:**
- Implementado: 97 core + 30 helpers + 14 VIP = **141 funções**
- Faltam: **20 endpoints VIP**
- **Meta: 161 funções = 100% cobertura** ✅

---

## 🔥 **BATCH 1: WHATSAPP AVANÇADO (4 endpoints)**

### **1. api/whatsapp/contacts - Listar Contatos**
```
Webhook POST api/whatsapp/contacts
  → Code (validar site + filtros + paginação)
  → Airtable List (whatsapp_contacts WHERE siteSlug=X AND ativo=TRUE)
  → Code (aplicar filtros nome/empresa/tags + paginar)
  → Respond { success, data: { contacts, total, page, pageSize, hasMore } }
```

**Validação:** Site obrigatório  
**Filtros:** nome, empresa, tags  
**Paginação:** page, pageSize (default 20, max 100)  
**Output:** Array de contatos com nome, telefone, empresa, email, tags, criado_em

---

### **2. api/whatsapp/contacts/import - Importar Contatos**
```
Webhook POST api/whatsapp/contacts/import
  → Code (validar site + array contacts[])
  → Code (normalizar telefones E.164 + validar nomes)
  → Split In Batches (batch 10)
    → Airtable Append (whatsapp_contacts)
    → (loop)
  → Code (consolidar: total, imported, errors)
  → Respond { success, data: { imported, errors, total } }
```

**Validação:**  
- Site obrigatório
- contacts[] array obrigatório
- Cada contato: telefone + nome obrigatórios

**Normalização:**  
- Telefone → E.164 BR (55 + DDD + 9 + número)
- Remove duplicatas por telefone normalizado
- Consolida contatos (usa helper `consolidateContacts`)

**Interligação:** Usa `normalizePhone()` e `consolidateContacts()` do globals

---

### **3. api/whatsapp/contacts/update - Atualizar Contato**
```
Webhook POST api/whatsapp/contacts/update
  → Code (validar site + (id OR telefone))
  → Airtable Search (whatsapp_contacts WHERE id=X OR telefone_normalizado=Y)
  → Code (preparar updates: nome, empresa, email, tags, ativo, profilePicUrl)
  → Airtable Update (whatsapp_contacts)
  → Respond { success, message }
```

**Validação:** Site obrigatório + (id OR telefone)  
**Campos atualizáveis:** nome, empresa, email, tags, ativo, profilePicUrl  
**Auto-update:** atualizado_em = now()

---

### **4. api/whatsapp/templates/upsert - CRUD Templates**
```
Webhook POST api/whatsapp/templates/upsert
  → Code (validar site + template object)
  → Code (gerar ID se novo: generateUniqueId())
  → IF (template.id exists?)
    TRUE:
      → Airtable Search (whatsapp_templates WHERE id=X)
      → Airtable Update
    FALSE:
      → Airtable Append (whatsapp_templates)
  → Respond { success, data: { id } }
```

**Validação:** Site + template.name obrigatórios  
**Campos:** id, siteSlug, name, displayName, lang, description, category, status, content, variables[]  
**Interligação:** Usa `generateUniqueId()` se template novo

---

## 🛒 **BATCH 2: ECOMMERCE RESTANTE (3 endpoints)**

### **5. api/ecommerce/products/update - Atualizar Produto**
```
Webhook POST api/ecommerce/products/update
  → Code (validar VIP + productId + updates)
  → Airtable Search (products WHERE id=X AND siteSlug=Y)
  → Airtable Update (name, description, price, stock, category, images, active)
  → Airtable Append (audit_logs: product_updated)
  → Respond { success, data: product }
```

**Validação:**  
- VIP only (verificar plan em clients)
- productId obrigatório

**Campos atualizáveis:** name, description, price, stock, category, images[], active  
**Auto-update:** updated_at = now()

---

### **6. api/ecommerce/products/delete - Deletar Produto**
```
Webhook POST api/ecommerce/products/delete
  → Code (validar VIP + productId)
  → Airtable Search (products WHERE id=X)
  → Airtable Update (active=FALSE, deleted_at=now())
  → Airtable Append (audit_logs: product_deleted)
  → Respond { success, message: 'Produto removido' }
```

**Validação:** VIP only + productId  
**Soft delete:** active=false (mantém histórico)  
**Audit:** Registra em audit_logs

---

### **7. api/ecommerce/store/settings - Config Loja (GET/UPDATE)**
```
Webhook POST api/ecommerce/store/settings
  → Code (validar VIP + action: 'get' OR 'update')
  → IF (action=get)
    → Airtable Search (store_settings WHERE siteSlug=X)
    → Code (parse JSON fields: paymentMethods, shippingZones)
    → Respond { success, settings }
  → IF (action=update)
    → Code (validar + stringify arrays)
    → Airtable Search/Update OR Append (store_settings)
    → Respond { success, message }
```

**Campos:** name, currency, paymentMethods[], shippingZones[], updatedAt  
**Defaults:** currency=BRL, paymentMethods=['pix','credit']

---

## 📅 **BATCH 3: AGENDAMENTOS RESTANTE (3 endpoints)**

### **8. api/appointments/cancel - Cancelar Agendamento**
```
Webhook POST api/appointments/cancel
  → Code (validar appointmentId)
  → Airtable Search (appointments WHERE id=X)
  → Airtable Update (status='cancelled', cancelledAt=now())
  → Code (preparar WhatsApp: "Seu agendamento foi cancelado")
  → HTTP POST (WhatsApp Business API)
  → HTTP POST (Resend - email cancelamento)
  → Airtable Append (audit_logs: appointment_cancelled)
  → Respond { success, message }
```

**Interligações:**  
- WhatsApp notification
- Email notification
- Audit log

---

### **9. api/appointments/confirm - Confirmar Agendamento**
```
Webhook POST api/appointments/confirm
  → Code (validar appointmentId)
  → Airtable Search (appointments WHERE id=X)
  → Airtable Update (status='confirmed', confirmedAt=now())
  → Code (preparar WhatsApp: "Agendamento confirmado para {{data}} às {{hora}}")
  → HTTP POST (WhatsApp - usa processMessageVariables())
  → HTTP POST (Resend - email confirmação)
  → Respond { success, message }
```

**Interligações:**  
- Usa `processMessageVariables()` para {{data}}, {{hora}}
- WhatsApp + Email notifications

---

### **10. api/appointments/availability - Verificar Disponibilidade**
```
Webhook POST api/appointments/availability
  → Code (validar site + date + duration)
  → Airtable List (appointments WHERE siteSlug=X AND date=Y AND status!=cancelled)
  → Code (checkAppointmentAvailability(appointments, datetime, duration))
  → Code (gerar slots livres baseado em workingHours)
  → Respond { success, availableSlots[], busySlots[] }
```

**Lógica:**  
- Busca appointment_settings (workingHours, buffer)
- Lista appointments do dia
- Usa helper `checkAppointmentAvailability()`
- Retorna slots livres em intervalos de 1h

---

## 🔒 **BATCH 4: AUDIT & SECURITY (3 endpoints)**

### **11. api/audit/security-alerts - Listar Alertas**
```
Webhook POST api/audit/security-alerts
  → Code (validar admin token + filtros)
  → Airtable List (security_alerts WHERE site=X AND resolved=false)
  → Code (ordenar por severity: critical > high > medium)
  → Respond { success, alerts[], total, criticalCount }
```

**Filtros:** severity, resolved, dateRange  
**Ordenação:** critical → high → medium → low

---

### **12. api/audit/alerts/resolve - Resolver Alerta**
```
Webhook POST api/audit/alerts/resolve
  → Code (validar admin token + alertId)
  → Airtable Search (security_alerts WHERE id=X)
  → Airtable Update (resolved=true, resolvedAt=now(), resolvedBy=admin)
  → Airtable Append (audit_logs: alert_resolved)
  → Respond { success, message }
```

**Validação:** Admin only  
**Audit:** Registra quem resolveu e quando

---

### **13. api/audit/statistics - Estatísticas Audit**
```
Webhook POST api/audit/statistics
  → Code (validar admin + range: 7d/30d/90d)
  → Airtable List (audit_logs WHERE timestamp > cutoff)
  → Code (agregar por: categoria, severity, usuário, site)
  → Code (calcular: total eventos, eventos/dia, top ações, top usuários)
  → Respond { success, stats: { total, byCategory, bySeverity, byUser, dailyStats } }
```

**Métricas:**  
- Total eventos
- Por categoria (auth, whatsapp, ecommerce, etc.)
- Por severity (low, medium, high, critical)
- Por usuário/site
- Timeline diária

---

## 🌍 **BATCH 5: MULTI-IDIOMA (3 endpoints - VIP)**

### **14. api/multi-language/settings - Config Idioma**
```
Webhook POST api/multi-language/settings
  → Code (validar VIP + action: 'get' OR 'update')
  → IF (action=get)
    → Airtable Search (language_settings WHERE siteSlug=X)
    → Code (defaults se não existe: defaultLanguage=pt, enabledLanguages=[pt])
    → Respond { success, settings }
  → IF (action=update)
    → Code (validar enabledLanguages[] + defaultLanguage)
    → Airtable Update/Append (language_settings)
    → Respond { success }
```

**Defaults:**  
- defaultLanguage: 'pt'
- enabledLanguages: ['pt']
- autoDetect: true
- fallbackLanguage: 'pt'

**Validação:** VIP only

---

### **15. api/multi-language/translate - Traduzir Conteúdo**
```
Webhook POST api/multi-language/translate
  → Code (validar VIP + content + targetLanguage)
  → HTTP POST (Google Translate API OR DeepL API)
  → Code (salvar tradução em cache se sucesso)
  → Respond { success, translatedContent, sourceLanguage, targetLanguage }
```

**Validação:** VIP only  
**Idiomas suportados:** pt, en, es, fr, it, de  
**Cache:** 30 dias por (content_hash + target_lang)

**Alternativa:** Se não tiver API key, usar tradução mock (retorna original)

---

### **16. api/multi-language/languages - Idiomas Disponíveis**
```
Webhook POST api/multi-language/languages
  → Code (retornar lista estática de idiomas suportados)
  → Respond { 
      success, 
      languages: [
        { code: 'pt', name: 'Português', flag: '🇧🇷' },
        { code: 'en', name: 'English', flag: '🇺🇸' },
        ...
      ] 
    }
```

**Idiomas:** pt, en, es, fr, it, de  
**Simples:** Apenas retorna JSON estático

---

## 🏪 **BATCH 6: MARKETPLACE (4 endpoints - VIP)**

### **17. api/marketplace/purchase - Comprar Template**
```
Webhook POST api/marketplace/purchase
  → Code (validar VIP + templateId + customerEmail)
  → Airtable Search (marketplace_templates WHERE id=X)
  → Code (gerar: licenseKey via generateLicenseKey())
  → Airtable Append (template_purchases)
  → IF (template.price > 0)
    → HTTP POST (Mercado Pago: criar cobrança)
    → Code (salvar payment_id)
  → HTTP POST (Resend: email com licenseKey + downloadUrl)
  → Respond { success, data: { licenseKey, downloadUrl, paymentLink } }
```

**Interligações:**  
- Usa `generateLicenseKey()` do globals
- Cria cobrança MP se price > 0
- Envia email com licença
- Registra em template_purchases

---

### **18. api/marketplace/rate - Avaliar Template**
```
Webhook POST api/marketplace/rate
  → Code (validar templateId + rating 1-5 + review)
  → Airtable Search (marketplace_templates WHERE id=X)
  → Code (calcular nova média: (rating_atual * downloads + new_rating) / (downloads + 1))
  → Airtable Update (marketplace_templates: rating, downloads++)
  → Airtable Append (template_reviews)
  → Respond { success, newRating }
```

**Validação:** rating 1-5, review opcional  
**Cálculo:** Média ponderada de ratings

---

### **19. api/marketplace/categories - Listar Categorias**
```
Webhook POST api/marketplace/categories
  → Airtable List (template_categories)
  → Code (contar templates por categoria)
  → Respond { success, categories: [ { id, name, description, icon, templateCount } ] }
```

**Simples:** Lista estática de categorias com contagem

---

### **20. api/marketplace/my-purchases - Minhas Compras**
```
Webhook POST api/marketplace/my-purchases
  → Code (validar customerEmail)
  → Airtable List (template_purchases WHERE customerEmail=X)
  → Code (join com marketplace_templates para detalhes)
  → Respond { success, purchases: [ { purchaseId, template, licenseKey, downloadUrl, purchaseDate, status } ] }
```

**Output:** Lista de compras do cliente com detalhes do template

---

## 🔗 **CONEXÕES E FLUXOS INTERLIGADOS**

### **Fluxo 1: Importar Contatos → Enviar Campanha**
```
1. Cliente importa 1000 contatos via api/whatsapp/contacts/import
   → Valida e normaliza telefones
   → Consolida duplicatas
   → Salva em whatsapp_contacts

2. Cliente envia campanha via api/whatsapp/send-bulk
   → Busca contatos com tag='clientes-ativos'
   → Processa variáveis {{saudacao}}, {{nome}}
   → Envia para cada contato
   → Salva mensagens em whatsapp_messages
```

### **Fluxo 2: Criar Pedido → Pagamento → Confirmação**
```
1. Cliente cria pedido via api/ecommerce/orders/create
   → Gera orderNumber (ORD-123456-789)
   → Cria cobrança Mercado Pago
   → Status = pending

2. Mercado Pago webhook (payment_approved)
   → Busca order por payment_id
   → api/ecommerce/orders/update (status=paid)
   → Envia WhatsApp confirmação
   → Envia Email confirmação
   → Atualiza estoque produtos

3. Cliente marca como enviado via api/ecommerce/orders/update
   → Status = shipped
   → Envia WhatsApp com código rastreio
```

### **Fluxo 3: Criar Agendamento → Confirmação → Lembrete**
```
1. Cliente cria agendamento via api/appointments/create
   → Verifica disponibilidade (checkAppointmentAvailability)
   → Salva em appointments (status=pending)
   → Envia WhatsApp confirmação
   → Envia Email confirmação

2. Cliente confirma via api/appointments/confirm
   → Status = confirmed
   → Envia WhatsApp "Agendamento confirmado!"

3. Cron (daily 08:00)
   → Busca appointments próximos (24h)
   → Para cada: envia WhatsApp lembrete
   → Usa processMessageVariables("Lembrete: agendamento amanhã às {{hora}}")
```

### **Fluxo 4: Comprar Template → Aplicar → Rebuild**
```
1. Cliente compra template via api/marketplace/purchase
   → Gera licenseKey (XXXX-XXXX-XXXX-XXXX)
   → Cria cobrança MP (se price > 0)
   → Envia email com licença

2. MP webhook (payment_approved)
   → Atualiza template_purchases (status=paid)
   → Libera downloadUrl

3. Cliente aplica template via api/templates/apply
   → Atualiza site_structure com template
   → Trigger Netlify rebuild
   → Site atualizado com novo template
```

---

## 📊 **HELPERS NO CODE-GLOBALS**

Adicionar ao `code-globals` (ID: code-globals):

```javascript
// === NOVOS HELPERS VIP ===

// Gera UUID único
generateUniqueId: () => {
  return require('crypto').randomUUID();
},

// Gera número de pedido: ORD-{timestamp}-{random}
generateOrderNumber: () => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `ORD-${timestamp}-${random}`;
},

// Gera chave de licença: XXXX-XXXX-XXXX-XXXX
generateLicenseKey: () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 16; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
    if (i % 4 === 3 && i < 15) result += '-';
  }
  return result;
},

// Consolida contatos duplicados
consolidateContacts: (rows) => {
  const map = {};
  for (const r of rows) {
    const key = GLOBALS.normalizePhone(r.phone || r.telefone || '');
    if (!key) continue;
    
    if (!map[key]) {
      r.phone = key;
      map[key] = r;
      continue;
    }
    
    const prev = map[key];
    const currName = String(r.name || r.nome || '').trim();
    const prevName = String(prev.name || prev.nome || '').trim();
    
    const isRealName = (s) => s && s !== 'Contato' && s.length >= 3;
    
    if (isRealName(currName) && (!isRealName(prevName) || currName.length > prevName.length)) {
      prev.name = currName;
    }
    
    Object.keys(r).forEach(k => {
      if (k !== 'phone') prev[k] = prev[k] || r[k];
    });
  }
  return Object.values(map);
},

// Processa variáveis: {{saudacao}}, {{nome}}, {{data}}, {{hora}}
processMessageVariables: (message, variables = {}) => {
  if (!message) return '';
  let processed = String(message);
  
  // Saudação automática
  if (processed.includes('{{saudacao}}')) {
    const hour = new Date().getHours();
    let greeting = 'Olá';
    if (hour < 12) greeting = 'Bom dia';
    else if (hour < 18) greeting = 'Boa tarde';
    else greeting = 'Boa noite';
    processed = processed.replace(/\{\{saudacao\}\}/g, greeting);
  }
  
  // Data e hora
  if (processed.includes('{{data}}')) {
    processed = processed.replace(/\{\{data\}\}/g, new Date().toLocaleDateString('pt-BR'));
  }
  if (processed.includes('{{hora}}')) {
    processed = processed.replace(/\{\{hora\}\}/g, new Date().toLocaleTimeString('pt-BR', {hour: '2-digit', minute: '2-digit'}));
  }
  
  // Variáveis customizadas
  Object.keys(variables).forEach(key => {
    const regex = new RegExp(`\\{\\{${key}\\}\\}`, 'g');
    processed = processed.replace(regex, String(variables[key] || ''));
  });
  
  return processed;
},

// Verifica disponibilidade de agendamento
checkAppointmentAvailability: (appointments, datetime, duration) => {
  const requestedStart = new Date(datetime);
  const requestedEnd = new Date(requestedStart.getTime() + (duration * 60000));
  
  for (const apt of appointments) {
    if (apt.status === 'cancelled') continue;
    
    const existingStart = new Date(apt.datetime);
    const existingEnd = new Date(existingStart.getTime() + ((apt.duration || 60) * 60000));
    
    if (requestedStart < existingEnd && requestedEnd > existingStart) {
      return false; // Conflito
    }
  }
  
  return true; // Disponível
}
```

---

## 📊 **RESUMO DA IMPLEMENTAÇÃO**

### **Nodes a adicionar:**
| Batch | Endpoints | Webhooks | Code | Airtable | HTTP | IF | Respond | Total |
|-------|-----------|----------|------|----------|------|----|---------| ------|
| 1 - WhatsApp | 4 | 4 | 8 | 8 | 0 | 1 | 4 | 25 |
| 2 - Ecommerce | 3 | 3 | 6 | 6 | 0 | 1 | 3 | 19 |
| 3 - Appointments | 3 | 3 | 9 | 6 | 6 | 0 | 3 | 27 |
| 4 - Audit | 3 | 3 | 6 | 6 | 0 | 0 | 3 | 18 |
| 5 - Multi-idioma | 3 | 3 | 6 | 3 | 3 | 1 | 3 | 19 |
| 6 - Marketplace | 4 | 4 | 8 | 8 | 4 | 1 | 4 | 29 |
| **TOTAL** | **20** | **20** | **43** | **37** | **13** | **4** | **20** | **137** |

### **Conexões a adicionar:**
- Simples: ~80 (1 endpoint = 4 conexões em média)
- Complexas: ~15 (loops, branches, notifications)
- **Total: ~95 conexões**

---

## ✅ **RESULTADO FINAL**

### **Após implementação completa:**
- **Endpoints:** 45 atuais + 20 novos = **65 endpoints**
- **Nodes:** ~240 atuais + ~137 novos = **~377 nodes**
- **Conexões:** ~220 atuais + ~95 novas = **~315 conexões**
- **Funções:** 141 atuais + 20 novas = **161 funções**
- **Cobertura GAS:** 161 / ~161 úteis = **100%** ✅

---

## 🚀 **COMEÇANDO IMPLEMENTAÇÃO!**

Vou adicionar os 20 endpoints ao `ELEVEA_N8N_COMPLETO_TODAS_FUNCIONALIDADES.json` de forma organizada e funcional!
