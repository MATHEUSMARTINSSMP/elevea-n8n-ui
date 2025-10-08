import { Handler } from '@netlify/functions';

const handler: Handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Content-Type': 'application/json',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    const { siteSlug } = JSON.parse(event.body || '{}');
    
    if (!siteSlug) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ success: false, error: 'siteSlug é obrigatório' }),
      };
    }

    // Chamada para n8n com endpoint CORRETO
    const n8nResponse = await fetch(`${process.env.N8N_BASE_URL}/webhook/api/client/plan`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.N8N_SIGNING_SECRET}`,
        'x-elevea-key': process.env.N8N_SIGNING_SECRET,
      },
      body: JSON.stringify({
        body: {
          siteSlug,
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
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error('Error in client_plan:', error);
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