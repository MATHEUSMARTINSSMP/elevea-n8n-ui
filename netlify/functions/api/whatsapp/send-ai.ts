import { Handler } from '@netlify/functions';

/**
 * Evolution API - Envio com IA
 * Usado para mensagens personalizadas com agentes de IA
 */
const handler: Handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    const { siteSlug, phone, message, useAI, context: chatContext } = JSON.parse(event.body || '{}');
    
    if (!siteSlug || !phone || !message) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          success: false, 
          error: 'siteSlug, phone e message são obrigatórios' 
        }),
      };
    }

    // Chamada para n8n com credenciais da Evolution API
    const n8nResponse = await fetch(`${process.env.N8N_BASE_URL}/webhook/api/whatsapp/send-ai`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.N8N_SIGNING_SECRET}`,
      },
      body: JSON.stringify({
        siteSlug,
        phone,
        message,
        useAI: useAI || false,
        context: chatContext || 'Cliente da ELEVEA solicitando informações',
        // Adiciona credenciais da Evolution API
        evolution: {
          url: process.env.EVOLUTION_API_URL,
          apiKey: process.env.EVOLUTION_API_KEY,
          instanceName: process.env.EVOLUTION_INSTANCE_NAME || 'elevea-instance',
        },
        // Adiciona credenciais da OpenAI (se usar IA)
        openai: {
          apiKey: process.env.OPENAI_API_KEY,
        },
        timestamp: new Date().toISOString(),
      }),
    });

    if (!n8nResponse.ok) {
      throw new Error(`n8n Error: ${n8nResponse.status}`);
    }

    const data = await n8nResponse.json();

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        success: true, 
        data,
        aiUsed: useAI || false,
        timestamp: new Date().toISOString()
      }),
    };
  } catch (error) {
    console.error('Error in whatsapp/send-ai:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        success: false, 
        error: error instanceof Error ? error.message : 'Erro interno' 
      }),
    };
  }
};

export { handler };
