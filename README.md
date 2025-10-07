# ELEVEA - Plataforma de Sites Inteligentes

Uma plataforma SaaS moderna para criação de sites inteligentes e automação de marketing digital, desenvolvida com React, Vite, Tailwind CSS e shadcn/ui, integrada com n8n para automação.

## 🚀 Tecnologias

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui + Radix UI
- **Backend**: n8n (webhooks e automação)
- **Deploy**: Netlify (Frontend) + n8n (Backend)

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── ui/             # Componentes base (shadcn/ui)
│   ├── Layout.tsx      # Layout principal
│   ├── HeroSection.tsx # Seção hero
│   ├── FeaturesGrid.tsx# Grid de funcionalidades
│   ├── PricingCards.tsx# Cards de preços
│   ├── WhatsAppButton.tsx # Botão WhatsApp
│   └── FeedbackWidget.tsx # Widget de feedback
├── pages/              # Páginas da aplicação
│   ├── Index.tsx       # Página inicial
│   ├── Login.tsx       # Login
│   ├── Dashboard.tsx   # Dashboard do cliente
│   └── obrigado/       # Página de agradecimento
├── lib/                # Configurações e utilitários
│   ├── api.ts          # Configuração da API
│   ├── whatsapp.ts     # Configuração WhatsApp
│   └── n8n-config.ts   # Configuração n8n
├── hooks/              # Hooks personalizados
│   └── useApi.ts       # Hook para API
├── types/              # Tipos TypeScript
│   └── index.ts        # Definições de tipos
├── constants/          # Constantes da aplicação
│   └── index.ts        # Configurações e constantes
├── App.tsx             # Componente principal
└── main.tsx            # Entry point

netlify/functions/api/  # Netlify Functions (Proxy para n8n)
├── client_plan.ts      # Plano do cliente
├── wa/                 # WhatsApp
│   ├── send.ts         # Enviar mensagem
│   └── list.ts         # Listar mensagens
├── reviews/            # Google Reviews
│   └── list.ts         # Listar reviews
├── feedbacks/          # Feedbacks
│   ├── list.ts         # Listar feedbacks
│   └── submit.ts       # Submeter feedback
├── analytics.ts        # Analytics
└── templates.ts        # Templates
```

## 🛠️ Como executar

### Pré-requisitos

- Node.js >= 18.16.0
- npm ou yarn
- Conta n8n configurada

### Instalação

1. Clone o repositório:
```bash
git clone <repository-url>
cd elevea-n8n-ui
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações:
```env
# Configuração do n8n
N8N_BASE_URL=https://n8n.elevea.com
N8N_SIGNING_SECRET=seu_token_unico_aqui
ADMIN_DASH_TOKEN=token_para_rotas_admin

# Configuração do WhatsApp
VITE_WHATSAPP_URL=https://wa.me/5596981032928?text=Olá! Quero um site Elevea. Pode me ajudar?

# Configuração da aplicação
VITE_APP_NAME=ELEVEA
VITE_ENV=production
VITE_SITE_URL=https://agenciaelevea.netlify.app
VITE_SITE_SLUG=elevea-agencia
```

4. Execute em modo de desenvolvimento:
```bash
npm run dev
```

5. Acesse `http://localhost:5173`

### Build para produção

```bash
npm run build
npm run preview
```

## 🔗 Integração com n8n

O projeto está configurado para se comunicar com endpoints n8n via Netlify Functions proxy. Os endpoints disponíveis são:

- `/api/client_plan` - Plano e status do cliente
- `/api/auth_status` - Verificação de autenticação
- `/api/wa/list` - Lista mensagens WhatsApp
- `/api/wa/send` - Envia mensagens WhatsApp
- `/api/reviews/list` - Lista Google Reviews
- `/api/reviews/sync` - Sincroniza reviews
- `/api/feedbacks/list` - Lista feedbacks
- `/api/feedbacks/submit` - Submete feedback
- `/api/onboarding/save` - Salva onboarding
- `/api/onboarding/get` - Recupera onboarding
- `/api/analytics` - Dados analíticos
- `/api/templates` - Templates disponíveis

## 🏗️ Configuração do n8n

### Data Stores necessários:

1. **clients** - Registro de cada cliente
2. **tokens** - Credenciais OAuth2
3. **settings** - Configurações personalizadas
4. **reviews** - Avaliações Google My Business
5. **feedbacks** - Feedbacks internos
6. **logs** - Logs de auditoria
7. **billing** - Cobrança e planos
8. **onboardings** - Dados de onboarding

### Workflows necessários:

- `client_plan` - Retorna plano do cliente
- `auth_status` - Verifica autenticação
- `wa_list` - Lista mensagens WhatsApp
- `wa_send` - Envia mensagens WhatsApp
- `reviews_list` - Lista Google Reviews
- `reviews_sync` - Sincroniza reviews
- `feedbacks_list` - Lista feedbacks
- `feedbacks_submit` - Submete feedback
- `onboarding_save` - Salva onboarding
- `onboarding_get` - Recupera onboarding
- `analytics` - Dados analíticos
- `templates` - Templates disponíveis

## 📝 Scripts Disponíveis

- `npm run dev` - Executa em modo desenvolvimento
- `npm run dev:netlify` - Executa com Netlify Functions
- `npm run build` - Gera build de produção
- `npm run preview` - Visualiza build de produção
- `npm run lint` - Executa linter

## 🎨 Design System

O projeto utiliza um design system consistente baseado em:

- **Cores principais**: Marrom (#8B4513) e tons de bege
- **Tipografia**: Sistema de fontes do Tailwind
- **Componentes**: shadcn/ui para consistência
- **Layout**: Mobile-first e responsivo

## 🚀 Deploy

### Netlify (Frontend)

1. Conecte o repositório ao Netlify
2. Configure as variáveis de ambiente
3. Deploy automático via Git

### n8n (Backend)

1. Configure os Data Stores
2. Crie os workflows necessários
3. Configure as automações
4. Teste a integração

## 🔄 Fluxo de Comunicação

```
Frontend (React) 
    ↓
Netlify Functions (/.netlify/functions/api/)
    ↓ (com assinatura secreta)
n8n Webhooks (https://n8n.elevea.com/webhook/)
    ↓
Data Stores n8n + Integrações (Google, WhatsApp, etc.)
```

## 📄 Licença

Este projeto é privado e proprietário da ELEVEA.

## 🤝 Suporte

Para suporte técnico, entre em contato:
- Email: suporte@elevea.com
- WhatsApp: (96) 98103-2928
- Website: https://agenciaelevea.netlify.app
