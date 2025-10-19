import React from 'react';
import { Routes as RouterRoutes, Route } from 'react-router-dom';
import { useSession } from './guards';

// Páginas principais
import Index from '@/pages/Index';
import Login from '@/pages/auth/Login';
import NotFound from '@/pages/NotFound';
import Upgrade from '@/pages/upgrade';

// Páginas do cliente
import ClientDashboard from '@/pages/client/Dashboard';
import ClientAnalytics from '@/pages/client/Analytics';
import ClientContent from '@/pages/client/Content';
import ClientSettings from '@/pages/client/Settings';

// Páginas administrativas
import AdminDashboard from '@/pages/admin/Dashboard';

// Páginas de obrigado
import Obrigado from '@/pages/obrigado';
import ObrigadoVIP from '@/pages/obrigado/VIP';
import ObrigadoPremium from '@/pages/obrigado/Premium';

// Páginas de políticas
import Politicas from '@/pages/politicas';

// Páginas de reset
import Reset from '@/pages/reset';

// Componente de rotas protegidas
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useSession();
  
  if (isLoading) {
    return (
      <div
        style={{
          position: 'fixed',
          inset: 0,
          display: 'grid',
          placeItems: 'center',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        Verificando autenticação...
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return <Login />;
  }
  
  return <>{children}</>;
}

// Componente principal de rotas
function Routes() {
  return (
    <RouterRoutes>
      {/* Rotas públicas */}
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<Login />} />
      <Route path="/politicas" element={<Politicas />} />
      <Route path="/reset" element={<Reset />} />
      
      {/* Rotas de obrigado */}
      <Route path="/obrigado" element={<Obrigado />} />
      <Route path="/obrigado/vip" element={<ObrigadoVIP />} />
      <Route path="/obrigado/premium" element={<ObrigadoPremium />} />
      
      {/* Rotas protegidas - Cliente */}
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <ClientDashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/analytics" 
        element={
          <ProtectedRoute>
            <ClientAnalytics />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/content" 
        element={
          <ProtectedRoute>
            <ClientContent />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/settings" 
        element={
          <ProtectedRoute>
            <ClientSettings />
          </ProtectedRoute>
        } 
      />
      
      {/* Rotas protegidas - Admin */}
      <Route 
        path="/admin" 
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        } 
      />
      
      {/* Rota de upgrade */}
      <Route path="/upgrade" element={<Upgrade />} />
      
      {/* Rota 404 */}
      <Route path="*" element={<NotFound />} />
    </RouterRoutes>
  );
}

// Exportar como default
export default Routes;
