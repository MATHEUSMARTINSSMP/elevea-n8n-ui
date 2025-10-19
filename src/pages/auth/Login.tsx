import React, { useState } from 'react';
import { LoginForm } from '../../components/auth/LoginForm';
import { ResetPasswordForm } from '../../components/auth/ResetPasswordForm';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { ArrowLeft, Sparkles } from 'lucide-react';

export const Login: React.FC = () => {
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [showUpgrade, setShowUpgrade] = useState(false);

  const handleLoginSuccess = () => {
    // Redirect to dashboard or home page
    window.location.href = '/dashboard';
  };

  const handleResetSuccess = () => {
    setShowResetPassword(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center space-x-2">
            <Sparkles className="h-8 w-8 text-indigo-600" />
            <h1 className="text-2xl font-bold text-gray-900">Elevea</h1>
          </div>
          <p className="text-gray-600">
            {showResetPassword ? 'Recupere sua senha' : 'Acesse sua conta'}
          </p>
        </div>

        {/* Main Form */}
        {showResetPassword ? (
          <ResetPasswordForm
            onBack={() => setShowResetPassword(false)}
            onSuccess={handleResetSuccess}
          />
        ) : (
          <LoginForm
            onSuccess={handleLoginSuccess}
            onForgotPassword={() => setShowResetPassword(true)}
          />
        )}

        {/* VIP Upgrade Banner */}
        {!showResetPassword && (
          <Card className="border-indigo-200 bg-indigo-50">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-indigo-900">
                  Desbloqueie Recursos Premium
                </CardTitle>
                <Badge variant="secondary" className="bg-indigo-100 text-indigo-800">
                  VIP
                </Badge>
              </div>
              <CardDescription className="text-indigo-700 text-xs">
                Acesso a analytics, WhatsApp, Chatwoot e IA
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <Button
                variant="outline"
                size="sm"
                className="w-full border-indigo-200 text-indigo-700 hover:bg-indigo-100"
                onClick={() => setShowUpgrade(true)}
              >
                Ver Planos VIP
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Features Preview */}
        {!showResetPassword && (
          <div className="grid grid-cols-2 gap-3 text-center">
            <div className="bg-white rounded-lg p-3 shadow-sm">
              <div className="text-xs font-medium text-gray-900">Analytics</div>
              <div className="text-xs text-gray-500">Dados em tempo real</div>
            </div>
            <div className="bg-white rounded-lg p-3 shadow-sm">
              <div className="text-xs font-medium text-gray-900">WhatsApp</div>
              <div className="text-xs text-gray-500">Bot inteligente</div>
            </div>
            <div className="bg-white rounded-lg p-3 shadow-sm">
              <div className="text-xs font-medium text-gray-900">Chatwoot</div>
              <div className="text-xs text-gray-500">Suporte integrado</div>
            </div>
            <div className="bg-white rounded-lg p-3 shadow-sm">
              <div className="text-xs font-medium text-gray-900">IA</div>
              <div className="text-xs text-gray-500">Automação avançada</div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center text-xs text-gray-500">
          <p>© 2024 Elevea. Todos os direitos reservados.</p>
          <p className="mt-1">
            Precisa de ajuda?{' '}
            <a href="mailto:suporte@elevea.com" className="text-indigo-600 hover:underline">
              Entre em contato
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};