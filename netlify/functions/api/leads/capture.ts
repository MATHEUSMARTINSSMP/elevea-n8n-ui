import { Handler } from '@netlify/functions';

/**
 * Lead Capture - Captura de Leads
 * Recebe e armazena leads capturados no site
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
    const { siteSlug, name, email, phone, source, score } = JSON.parse(event.body || '{}');
    
    if (!siteSlug || !name || !email) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          success: false, 
          error: 'siteSlug, name e email são obrigatórios' 
        }),
      };
    }

    // Chamada para n8n
    const n8nResponse = await fetch(`${process.env.N8N_BASE_URL}/webhook/api/leads/capture`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.N8N_SIGNING_SECRET}`,
        'x-elevea-key': process.env.N8N_SIGNING_SECRET,
      },
      body: JSON.stringify({
        body: {
          siteSlug,
          name,
          email,
          phone,
          source: source || 'website',
          score: score || 50,
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
    console.error('Error in leads/capture:', error);
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
