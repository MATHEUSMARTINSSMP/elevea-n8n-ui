# 📚 Documentação Elevea

## 🎯 Visão Geral
Sistema completo de gestão de negócios locais com IA integrada.

## 🏗️ Arquitetura

### Frontend (React + TypeScript)
- **Páginas**: Dashboard, Admin, Cliente
- **Componentes**: UI reutilizáveis
- **Hooks**: Autenticação, API, PWA

### Backend (n8n Workflows)
- **Workflows**: Automatizações e integrações
- **APIs**: Endpoints para frontend
- **Integrações**: Google, WhatsApp, Airtable

## 🚀 Como Usar

### Desenvolvimento
```bash
npm install
npm run dev
```

### Produção
```bash
npm run build
```

## 📁 Estrutura do Projeto
```
src/
├── components/     # Componentes React
├── pages/         # Páginas da aplicação
├── hooks/         # Hooks customizados
├── lib/           # Utilitários e configurações
└── types/         # Definições TypeScript

workflows/
└── n8n-backend/   # Workflows do n8n
```

## 🔗 Integrações
- **Google Calendar**: Agendamentos
- **WhatsApp**: Comunicação
- **Airtable**: Base de dados
- **ElevenLabs**: Text-to-Speech
