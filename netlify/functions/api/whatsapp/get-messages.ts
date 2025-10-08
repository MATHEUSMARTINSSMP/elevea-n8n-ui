import { Handler } from '@netlify/functions';

/**
 * Evolution API - Buscar Histórico de Mensagens
 * Retorna conversas e mensagens do cliente
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
    const { siteSlug, phone, limit } = JSON.parse(event.body || '{}');
    
    if (!siteSlug) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          success: false, 
          error: 'siteSlug é obrigatório' 
        }),
      };
    }

    // Chamada para n8n
    const n8nResponse = await fetch(`${process.env.N8N_BASE_URL}/webhook/api/whatsapp/get-messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.N8N_SIGNING_SECRET}`,
      },
      body: JSON.stringify({
        siteSlug,
        phone,
        limit: limit || 50,
        evolution: {
          url: process.env.EVOLUTION_API_URL,
          apiKey: process.env.EVOLUTION_API_KEY,
          instanceName: process.env.EVOLUTION_INSTANCE_NAME,
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
      body: JSON.stringify({ success: true, data }),
    };
  } catch (error) {
    console.error('Error in whatsapp/get-messages:', error);
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
