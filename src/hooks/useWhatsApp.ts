import { useState, useCallback } from 'react';
import { api } from '../lib/api';

interface WhatsAppMessage {
  id: string;
  from: string;
  to: string;
  message: string;
  timestamp: string;
  type: 'sent' | 'received';
}

interface UseWhatsAppReturn {
  // Estados
  messages: WhatsAppMessage[];
  loading: boolean;
  error: string | null;
  
  // WhatsApp Business API (Oficial) - Disparo em Massa
  sendBulkMessage: (recipients: string[], message: string, mediaUrl?: string) => Promise<boolean>;
  
  // Evolution API (Não oficial) - Mensagens com IA
  sendMessageWithAI: (phone: string, message: string, useAI?: boolean, context?: string) => Promise<boolean>;
  
  // Buscar mensagens
  fetchMessages: (phone?: string, limit?: number) => Promise<void>;
  
  // Reset
  reset: () => void;
}

export function useWhatsApp(siteSlug: string): UseWhatsAppReturn {
  const [messages, setMessages] = useState<WhatsAppMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // WhatsApp Business API - Disparo em Massa
  const sendBulkMessage = useCallback(async (
    recipients: string[], 
    message: string, 
    mediaUrl?: string
  ): Promise<boolean> => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await api.sendWhatsAppBulk(siteSlug, recipients, message, mediaUrl);
      
      if (response.success) {
        return true;
      } else {
        setError(response.error || 'Erro ao enviar mensagens em massa');
        return false;
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(errorMsg);
      return false;
    } finally {
      setLoading(false);
    }
  }, [siteSlug]);

  // Evolution API - Mensagem com IA
  const sendMessageWithAI = useCallback(async (
    phone: string,
    message: string,
    useAI: boolean = false,
    context?: string
  ): Promise<boolean> => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await api.sendWhatsAppWithAI(siteSlug, phone, message, useAI, context);
      
      if (response.success) {
        return true;
      } else {
        setError(response.error || 'Erro ao enviar mensagem com IA');
        return false;
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(errorMsg);
      return false;
    } finally {
      setLoading(false);
    }
  }, [siteSlug]);

  // Buscar mensagens
  const fetchMessages = useCallback(async (phone?: string, limit: number = 50) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await api.getWhatsAppMessages(siteSlug, phone, limit);
      
      if (response.success && response.data) {
        setMessages(response.data.messages || []);
      } else {
        setError(response.error || 'Erro ao buscar mensagens');
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  }, [siteSlug]);

  // Reset
  const reset = useCallback(() => {
    setMessages([]);
    setLoading(false);
    setError(null);
  }, []);

  return {
    messages,
    loading,
    error,
    sendBulkMessage,
    sendMessageWithAI,
    fetchMessages,
    reset,
  };
}
