import { Handler } from '@netlify/functions';

/**
 * Evolution API - Webhook para Mensagens Recebidas
 * Recebe mensagens dos clientes e processa com IA
 */
const handler: Handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, apikey',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    const payload = JSON.parse(event.body || '{}');
    
    // Evolution API envia eventos com estrutura específica
    const { event: eventType, instance, data } = payload;
    
    console.log('Evolution Webhook received:', { eventType, instance, data });

    // Chamada para n8n processar a mensagem
    const n8nResponse = await fetch(`${process.env.N8N_BASE_URL}/webhook/api/whatsapp/webhook/evolution`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.N8N_SIGNING_SECRET}`,
      },
      body: JSON.stringify({
        event: eventType,
        instance: instance,
        data: data,
        // Adiciona credenciais da Evolution API para responder
        evolution: {
          url: process.env.EVOLUTION_API_URL,
          apiKey: process.env.EVOLUTION_API_KEY,
          instanceName: instance || process.env.EVOLUTION_INSTANCE_NAME,
        },
        // Adiciona credenciais da OpenAI para gerar resposta
        openai: {
          apiKey: process.env.OPENAI_API_KEY,
        },
        timestamp: new Date().toISOString(),
      }),
    });

    if (!n8nResponse.ok) {
      console.error('n8n Error:', n8nResponse.status, n8nResponse.statusText);
    }

    const responseData = await n8nResponse.json().catch(() => ({ success: true }));

    // Evolution API espera uma resposta rápida
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        success: true,
        received: true,
        timestamp: new Date().toISOString()
      }),
    };
  } catch (error) {
    console.error('Error in evolution-webhook:', error);
    // Retorna 200 mesmo com erro para não quebrar o webhook da Evolution
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        success: false, 
        error: error instanceof Error ? error.message : 'Erro interno',
        received: true
      }),
    };
  }
};

export { handler };
