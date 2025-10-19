import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

// Contexto para gerenciar sessão
interface SessionContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: any | null;
  checkSession: () => Promise<void>;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

// Hook para usar o contexto de sessão
export function useSession() {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error('useSession must be used within a WaitSession provider');
  }
  return context;
}

// Componente para aguardar a verificação de sessão
interface WaitSessionProps {
  children: ReactNode;
}

export function WaitSession({ children }: WaitSessionProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const location = useLocation();

  const checkSession = async () => {
    try {
      setIsLoading(true);
      
      // Verificar se há token no localStorage
      const token = localStorage.getItem('elevea_token');
      const userData = localStorage.getItem('elevea_user');
      
      if (token && userData) {
        const user = JSON.parse(userData);
        setUser(user);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Erro ao verificar sessão:', error);
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  // Verificar sessão quando a rota mudar
  useEffect(() => {
    checkSession();
  }, [location.pathname]);

  const contextValue: SessionContextType = {
    isAuthenticated,
    isLoading,
    user,
    checkSession,
  };

  // Mostrar loading enquanto verifica a sessão
  if (isLoading) {
    return (
      <div
        style={{
          position: 'fixed',
          inset: 0,
          display: 'grid',
          placeItems: 'center',
          fontFamily: 'system-ui, sans-serif',
          opacity: 0.8,
        }}
      >
        Verificando sessão...
      </div>
    );
  }

  return (
    <SessionContext.Provider value={contextValue}>
      {children}
    </SessionContext.Provider>
  );
}

// Exportar também como default para compatibilidade
export default WaitSession;
