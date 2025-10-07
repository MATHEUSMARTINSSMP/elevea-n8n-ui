// Configuração do WhatsApp para integração com n8n
export const WHATSAPP_URL = 
  (import.meta.env.VITE_WHATSAPP_URL as string)?.trim() || 
  'https://wa.me/5596981032928?text=Olá! Quero um site Elevea. Pode me ajudar?';

export const waMessage = (message: string = '') => {
  const baseUrl = WHATSAPP_URL.split('?')[0];
  const params = new URLSearchParams(WHATSAPP_URL.split('?')[1] || '');
  if (message) {
    params.set('text', message);
  }
  return `${baseUrl}?${params.toString()}`;
};

// Função para enviar mensagem via n8n
export const sendWhatsAppMessage = async (message: string, phone?: string, siteSlug: string = 'elevea-agencia') => {
  try {
    const response = await fetch('/.netlify/functions/api/wa/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        phone,
        siteSlug,
      }),
    });
    
    if (!response.ok) {
      throw new Error('Erro ao enviar mensagem');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Erro ao enviar mensagem WhatsApp:', error);
    // Fallback para URL direta
    window.open(waMessage(message), '_blank');
  }
};

// Função para abrir WhatsApp diretamente (fallback)
export const openWhatsApp = (message?: string) => {
  const url = message ? waMessage(message) : WHATSAPP_URL;
  window.open(url, '_blank', 'noopener,noreferrer');
};
