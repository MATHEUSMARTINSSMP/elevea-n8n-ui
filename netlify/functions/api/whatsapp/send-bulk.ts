import { Handler } from '@netlify/functions';

/**
 * WhatsApp Business API - Envio em Massa (Oficial)
 * Usado para campanhas e disparos massivos
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
    const { siteSlug, recipients, message, mediaUrl } = JSON.parse(event.body || '{}');
    
    if (!siteSlug || !recipients || !Array.isArray(recipients) || recipients.length === 0) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          success: false, 
          error: 'siteSlug e recipients (array) são obrigatórios' 
        }),
      };
    }

    if (!message) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          success: false, 
          error: 'message é obrigatório' 
        }),
      };
    }

    // Chamada para n8n com credenciais do WhatsApp Business API
    const n8nResponse = await fetch(`${process.env.N8N_BASE_URL}/webhook/api/whatsapp/send-bulk`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.N8N_SIGNING_SECRET}`,
      },
      body: JSON.stringify({
        siteSlug,
        recipients,
        message,
        mediaUrl,
        // Adiciona credenciais do WhatsApp Business
        whatsapp: {
          phoneId: process.env.WHATSAPP_PHONE_ID,
          accessToken: process.env.WHATSAPP_BUSINESS_TOKEN,
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
        recipients: recipients.length,
        timestamp: new Date().toISOString()
      }),
    };
  } catch (error) {
    console.error('Error in whatsapp/send-bulk:', error);
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
