// src/lib/whatsapp.ts
// Configuração do WhatsApp para contato direto

// Número do WhatsApp da agência (formato internacional sem +)
export const WHATSAPP_NUMBER = '559699999999'; // Substitua pelo número real

// URL base do WhatsApp Web
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

/**
 * Gera uma mensagem pré-formatada para o WhatsApp
 * @param context - Contexto da mensagem (ex: "duvida-plano", "contato-comercial")
 * @param extraInfo - Informações adicionais para incluir na mensagem
 * @returns Mensagem formatada
 */
export function waMessage(context: string = '', extraInfo?: Record<string, any>): string {
  let message = 'Olá! Gostaria de mais informações sobre os serviços da Elevea.';
  
  if (context) {
    const contextMessages: Record<string, string> = {
      'duvida-plano': 'Olá! Tenho dúvidas sobre os planos disponíveis.',
      'contato-comercial': 'Olá! Gostaria de falar sobre um projeto.',
      'suporte': 'Olá! Preciso de suporte técnico.',
      'upgrade': 'Olá! Gostaria de fazer upgrade do meu plano.',
      'agendar-demo': 'Olá! Gostaria de agendar uma demonstração.',
    };
    
    message = contextMessages[context] || message;
  }
  
  if (extraInfo) {
    const infoStr = Object.entries(extraInfo)
      .map(([key, value]) => `${key}: ${value}`)
      .join('\n');
    message += `\n\n${infoStr}`;
  }
  
  return message;
}

/**
 * Gera uma URL completa do WhatsApp com mensagem pré-preenchida
 * @param context - Contexto da mensagem
 * @param extraInfo - Informações adicionais
 * @returns URL do WhatsApp com mensagem
 */
export function getWhatsAppLink(context?: string, extraInfo?: Record<string, any>): string {
  const message = waMessage(context, extraInfo);
  return `${WHATSAPP_URL}?text=${encodeURIComponent(message)}`;
}

/**
 * Abre o WhatsApp em uma nova aba com mensagem pré-preenchida
 * @param context - Contexto da mensagem
 * @param extraInfo - Informações adicionais
 */
export function openWhatsApp(context?: string, extraInfo?: Record<string, any>): void {
  const link = getWhatsAppLink(context, extraInfo);
  window.open(link, '_blank', 'noopener,noreferrer');
}