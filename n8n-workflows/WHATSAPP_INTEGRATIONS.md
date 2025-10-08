# 📱 INTEGRAÇÕES WHATSAPP - ELEVEA

## 🎯 DUAS INTEGRAÇÕES COMPLEMENTARES

O sistema ELEVEA possui **DUAS integrações de WhatsApp** para diferentes casos de uso:

---

## 1️⃣ **WhatsApp Business API (OFICIAL)**

### 📌 **Uso:** Disparos em massa e campanhas
### ✅ **Vantagens:**
- Oficial e confiável
- Suporta templates aprovados
- Envio em massa
- Métricas oficiais
- Sem risco de ban

### 📋 **Requisitos:**
- Conta WhatsApp Business verificada
- Phone Number ID
- Access Token (Facebook Business)

### 🔗 **Endpoint:**
```
POST /.netlify/functions/api/whatsapp/send-bulk
```

### 📦 **Payload:**
```json
{
  "siteSlug": "cliente-xyz",
  "recipients": [
    "5596999999999",
    "5596888888888"
  ],
  "message": "Olá! Temos uma promoção especial para você!",
  "mediaUrl": "https://example.com/image.jpg" // opcional
}
```

### 💡 **Exemplo de Uso no Frontend:**
```typescript
import { api } from '@/lib/api';

// Enviar campanha para múltiplos contatos
const recipients = ['5596999999999', '5596888888888'];
const message = 'Promoção especial! 50% OFF em todos os planos!';

const result = await api.sendWhatsAppBulk(
  'meu-site', 
  recipients, 
  message
);

if (result.success) {
  console.log(`✅ Mensagem enviada para ${recipients.length} contatos!`);
}
```

### 🎯 **Casos de Uso:**
- ✅ Campanhas de marketing
- ✅ Promoções em massa
- ✅ Newsletters via WhatsApp
- ✅ Avisos importantes para todos os clientes
- ✅ Confirmações de pedidos/agendamentos

---

## 2️⃣ **EVOLUTION API (NÃO OFICIAL)**

### 📌 **Uso:** Mensagens personalizadas com IA
### ✅ **Vantagens:**
- Suporta agentes de IA
- Conversas interativas
- Respostas automáticas personalizadas
- Mais flexível
- Sem limite de templates

### ⚠️ **Desvantagens:**
- Não oficial (risco de ban se usar incorretamente)
- Requer servidor próprio
- Precisa de QR Code para conectar

### 📋 **Requisitos:**
- Evolution API instalada (self-hosted)
- Instance criada e conectada
- API Key
- OpenAI API Key (para IA)

### 🔗 **Endpoints:**

#### **Enviar com IA:**
```
POST /.netlify/functions/api/whatsapp/send-ai
```

#### **Webhook (receber mensagens):**
```
POST /.netlify/functions/api/whatsapp/evolution-webhook
```

#### **Buscar mensagens:**
```
POST /.netlify/functions/api/whatsapp/get-messages
```

### 📦 **Payload - Enviar com IA:**
```json
{
  "siteSlug": "cliente-xyz",
  "phone": "5596999999999",
  "message": "Quero saber mais sobre os planos",
  "useAI": true,
  "context": "Cliente interessado em plano VIP, orçamento até R$ 500/mês"
}
```

### 💡 **Exemplo de Uso no Frontend:**
```typescript
import { useWhatsApp } from '@/hooks/useWhatsApp';

function ChatComponent() {
  const { sendMessageWithAI, loading } = useWhatsApp('meu-site');
  
  const handleSendWithAI = async () => {
    const success = await sendMessageWithAI(
      '5596999999999',
      'Olá! Quais são os planos disponíveis?',
      true, // usar IA
      'Cliente perguntando sobre planos e preços'
    );
    
    if (success) {
      console.log('✅ Mensagem enviada e processada pela IA!');
    }
  };
  
  return (
    <button onClick={handleSendWithAI} disabled={loading}>
      {loading ? 'Enviando...' : 'Enviar com IA'}
    </button>
  );
}
```

### 🤖 **Como funciona a IA:**

```
Cliente envia: "Quais são os planos?"
    ↓
Evolution API recebe
    ↓
n8n processa
    ↓
OpenAI gera resposta contextual
    ↓
Evolution API envia resposta
    ↓
Cliente recebe: "Olá! Temos 3 planos: Starter (R$ 97/mês)..."
```

### 🎯 **Casos de Uso:**
- ✅ Atendimento automático
- ✅ Chatbot inteligente
- ✅ Respostas personalizadas
- ✅ Suporte 24/7
- ✅ Qualificação de leads
- ✅ Agendamentos automáticos

---

## 🔄 **COMPARAÇÃO**

| Recurso | WhatsApp Business (Oficial) | Evolution API (IA) |
|---------|---------------------------|-------------------|
| **Status** | Oficial | Não oficial |
| **Uso principal** | Disparos em massa | Conversas com IA |
| **Templates** | Obrigatórios | Livres |
| **IA integrada** | ❌ Não | ✅ Sim |
| **Risco de ban** | Muito baixo | Médio (se abusar) |
| **Custo** | Facebook cobra | Grátis (self-hosted) |
| **Setup** | Conta Business | QR Code + Servidor |
| **Limite de envios** | Conforme tier | Ilimitado |
| **Métricas** | Oficiais | Customizadas |

---

## 🛠️ **CONFIGURAÇÃO**

### **WhatsApp Business API (Oficial)**

1. **Criar conta Facebook Business**
   - Acesse [business.facebook.com](https://business.facebook.com)
   - Crie uma conta Business

2. **Configurar WhatsApp Business**
   - Meta for Developers → WhatsApp
   - Criar app
   - Adicionar número de telefone
   - Obter Phone Number ID e Access Token

3. **Configurar no Netlify (ENV VARS):**
```env
WHATSAPP_PHONE_ID=123456789012345
WHATSAPP_BUSINESS_TOKEN=EAAxxxxxxxxxxxxxxx
```

4. **Configurar no n8n (Globals Config):**
```json
{
  "WHATSAPP_PHONE_ID": "123456789012345",
  "WHATSAPP_BUSINESS_TOKEN": "EAAxxxxxxxxxxxxxxx"
}
```

---

### **Evolution API (Não Oficial)**

1. **Instalar Evolution API**
```bash
# Docker
docker run -d \
  --name evolution-api \
  -p 8080:8080 \
  -e AUTHENTICATION_API_KEY=sua-api-key-aqui \
  atendai/evolution-api:latest
```

2. **Criar instância**
```bash
curl -X POST http://localhost:8080/instance/create \
  -H "apikey: sua-api-key-aqui" \
  -H "Content-Type: application/json" \
  -d '{
    "instanceName": "elevea-instance",
    "qrcode": true
  }'
```

3. **Conectar via QR Code**
   - Abra WhatsApp no celular
   - Aparelhos conectados → Conectar novo aparelho
   - Escaneie o QR Code retornado

4. **Configurar Webhook**
```bash
curl -X POST http://localhost:8080/webhook/set/elevea-instance \
  -H "apikey: sua-api-key-aqui" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://agenciaelevea.netlify.app/.netlify/functions/api/whatsapp/evolution-webhook",
    "webhook_by_events": true,
    "events": ["messages.upsert"]
  }'
```

5. **Configurar no Netlify (ENV VARS):**
```env
EVOLUTION_API_URL=http://seu-servidor:8080
EVOLUTION_API_KEY=sua-api-key-aqui
EVOLUTION_INSTANCE_NAME=elevea-instance
OPENAI_API_KEY=sk-proj-xxxxx
```

6. **Configurar no n8n (Globals Config):**
```json
{
  "EVOLUTION_API_URL": "http://seu-servidor:8080",
  "EVOLUTION_API_KEY": "sua-api-key-aqui",
  "EVOLUTION_INSTANCE_NAME": "elevea-instance",
  "OPENAI_API_KEY": "sk-proj-xxxxx"
}
```

---

## 🧪 **TESTES**

### **Teste WhatsApp Business (Oficial):**
```bash
curl -X POST http://localhost:8888/.netlify/functions/api/whatsapp/send-bulk \
  -H "Content-Type: application/json" \
  -d '{
    "siteSlug": "teste",
    "recipients": ["5596999999999"],
    "message": "Teste de disparo em massa!"
  }'
```

### **Teste Evolution API (IA):**
```bash
curl -X POST http://localhost:8888/.netlify/functions/api/whatsapp/send-ai \
  -H "Content-Type: application/json" \
  -d '{
    "siteSlug": "teste",
    "phone": "5596999999999",
    "message": "Quais são os planos disponíveis?",
    "useAI": true,
    "context": "Cliente perguntando sobre planos"
  }'
```

---

## 📊 **FLUXOS IMPLEMENTADOS**

### **Fluxo 1: Disparo em Massa (Oficial)**
```
Frontend → Netlify Function (send-bulk)
    ↓ (adiciona WHATSAPP_BUSINESS_TOKEN)
n8n → WhatsApp Business API
    ↓ (envia para todos os recipients)
Clientes recebem
```

### **Fluxo 2: Mensagem com IA (Evolution)**
```
Cliente envia mensagem
    ↓
Evolution API → Webhook
    ↓
Netlify Function (evolution-webhook)
    ↓ (adiciona OPENAI_API_KEY)
n8n → OpenAI (gera resposta)
    ↓
n8n → Evolution API (envia resposta)
    ↓
Cliente recebe resposta da IA
```

---

## 🎯 **QUANDO USAR CADA UMA**

### **Use WhatsApp Business API (Oficial) para:**
- ✅ Campanhas de marketing
- ✅ Disparos em massa (100+ mensagens)
- ✅ Notificações transacionais (pedidos, agendamentos)
- ✅ Confirmações e alertas
- ✅ Mensagens com templates aprovados

### **Use Evolution API (IA) para:**
- ✅ Atendimento personalizado
- ✅ Chatbot inteligente
- ✅ Respostas contextuais
- ✅ Suporte automatizado
- ✅ Qualificação de leads
- ✅ Conversas 1-a-1

---

## ✅ **RESULTADO FINAL**

Com as DUAS integrações, você tem:

✅ **WhatsApp Business API** para campanhas e disparos oficiais
✅ **Evolution API** para atendimento inteligente com IA
✅ **Netlify Functions** para ambas as APIs
✅ **Hooks React** para usar no frontend
✅ **n8n workflows** processando tudo
✅ **Sistema completo e profissional!**

**Pronto para atender milhares de clientes com automação total!** 🚀
