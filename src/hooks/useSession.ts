import { useState, useEffect } from 'react';
import React from 'react';

export interface User {
  email: string;
  role: 'admin' | 'client';
  siteSlug?: string;
  plan?: string;
}

export function useSession() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar se há usuário salvo no localStorage
    const savedEmail = localStorage.getItem('elevea_last_email');
    if (savedEmail) {
      // Simular carregamento de usuário
      // Em produção, isso viria de uma API
      setUser({
        email: savedEmail,
        role: savedEmail.includes('admin') ? 'admin' : 'client',
        siteSlug: savedEmail.split('@')[0],
        plan: 'vip' // Simulação para desenvolvimento
      });
    }
    setLoading(false);
  }, []);

  return { user, loading };
}

// Re-export PrivateRoute from components for convenience
export { default as PrivateRoute } from '@/components/PrivateRoute';
