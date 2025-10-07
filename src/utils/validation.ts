// Utilitários de validação para integração n8n
import { validateN8NSetup } from '../lib/n8n-config';

export const validateIntegration = async () => {
  const results = {
    n8n: false,
    netlify: false,
    whatsapp: false,
    feedback: false,
  };

  try {
    // Testar n8n
    results.n8n = await validateN8NSetup();
    
    // Testar Netlify Functions
    try {
      const response = await fetch('/.netlify/functions/api/client_plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ siteSlug: 'test' }),
      });
      results.netlify = response.ok;
    } catch (error) {
      console.warn('Netlify Functions não disponíveis:', error);
    }

    // Testar WhatsApp
    try {
      const response = await fetch('/.netlify/functions/api/wa/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          siteSlug: 'test', 
          message: 'Teste de integração' 
        }),
      });
      results.whatsapp = response.ok;
    } catch (error) {
      console.warn('WhatsApp API não disponível:', error);
    }

    // Testar Feedback
    try {
      const response = await fetch('/.netlify/functions/api/feedbacks/list', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ siteSlug: 'test' }),
      });
      results.feedback = response.ok;
    } catch (error) {
      console.warn('Feedback API não disponível:', error);
    }

  } catch (error) {
    console.error('Erro na validação:', error);
  }

  return results;
};

export const logIntegrationStatus = (results: Record<string, boolean>) => {
  console.log('🔍 Status da Integração ELEVEA:');
  console.log(`✅ n8n: ${results.n8n ? 'Conectado' : '❌ Desconectado'}`);
  console.log(`✅ Netlify Functions: ${results.netlify ? 'Ativo' : '❌ Inativo'}`);
  console.log(`✅ WhatsApp API: ${results.whatsapp ? 'Funcionando' : '❌ Com problemas'}`);
  console.log(`✅ Feedback API: ${results.feedback ? 'Funcionando' : '❌ Com problemas'}`);
  
  const allWorking = Object.values(results).every(Boolean);
  console.log(`\n🎯 Status Geral: ${allWorking ? '✅ Tudo funcionando!' : '⚠️ Alguns serviços com problemas'}`);
  
  return allWorking;
};
