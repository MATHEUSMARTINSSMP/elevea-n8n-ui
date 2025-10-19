import { Handler } from '@netlify/functions';

const handler: Handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Content-Type': 'application/json',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  // Verificar autenticação de admin
  const authHeader = event.headers.authorization;
  const adminToken = process.env.ADMIN_DASH_TOKEN;
  
  if (!authHeader || authHeader !== `Bearer ${adminToken}`) {
    return {
      statusCode: 401,
      headers,
      body: JSON.stringify({ success: false, error: 'Unauthorized' }),
    };
  }

  try {
    if (event.httpMethod === 'POST') {
      // Criar novo build hook para cliente
      const { siteSlug, buildHookUrl, clientName } = JSON.parse(event.body || '{}');
      
      if (!siteSlug || !buildHookUrl) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ 
            success: false, 
            error: 'siteSlug e buildHookUrl são obrigatórios' 
          }),
        };
      }

      // Atualizar cliente no Airtable via n8n
      const n8nResponse = await fetch(`${process.env.N8N_BASE_URL}/webhook/api/admin/update-client-build-hook`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.N8N_SIGNING_SECRET}`,
        },
        body: JSON.stringify({
          siteSlug,
          buildHookUrl,
          clientName,
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
          message: 'Build hook configurado com sucesso',
          data,
        }),
      };
    }

    if (event.httpMethod === 'GET') {
      // Listar build hooks dos clientes
      const { siteSlug } = event.queryStringParameters || {};
      
      const n8nResponse = await fetch(`${process.env.N8N_BASE_URL}/webhook/api/admin/list-client-build-hooks?siteSlug=${siteSlug || ''}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${process.env.N8N_SIGNING_SECRET}`,
        },
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
    }

    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ success: false, error: 'Method not allowed' }),
    };

  } catch (error) {
    console.error('Error in admin-build-hooks:', error);
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



