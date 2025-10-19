import React from 'react';
import { useVIP } from '../../hooks/useVIP';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Alert, AlertDescription } from '../ui/alert';
import { 
  Crown, 
  Star, 
  Zap, 
  Shield, 
  Clock, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  Loader2
} from 'lucide-react';

interface VIPStatusProps {
  showUpgradeButton?: boolean;
  onUpgrade?: () => void;
}

export const VIPStatus: React.FC<VIPStatusProps> = ({ showUpgradeButton = true, onUpgrade }) => {
  const {
    vipStatus,
    vipFeatures,
    isLoading,
    error,
    isVIP,
    vipLevel,
    billingStatus,
    hasFeature,
    canCreateMoreSites,
    isVIPExpired,
    getDaysUntilExpiration,
    shouldShowVIPWarning,
    getVIPDisplayName,
    getVIPColor,
  } = useVIP();

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardContent className="flex items-center justify-center py-6">
          <Loader2 className="h-6 w-6 animate-spin mr-2" />
          <span>Verificando status VIP...</span>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          Erro ao verificar status VIP: {error}
        </AlertDescription>
      </Alert>
    );
  }

  const getVIPIcon = () => {
    switch (vipLevel) {
      case 'enterprise': return <Crown className="h-5 w-5" />;
      case 'premium': return <Star className="h-5 w-5" />;
      case 'basic': return <Zap className="h-5 w-5" />;
      default: return <Shield className="h-5 w-5" />;
    }
  };

  const getBillingStatusColor = () => {
    switch (billingStatus) {
      case 'active': return 'bg-green-500';
      case 'inactive': return 'bg-gray-500';
      case 'suspended': return 'bg-red-500';
      case 'overdue': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  const getBillingStatusText = () => {
    switch (billingStatus) {
      case 'active': return 'Ativo';
      case 'inactive': return 'Inativo';
      case 'suspended': return 'Suspenso';
      case 'overdue': return 'Em Atraso';
      default: return 'Desconhecido';
    }
  };

  return (
    <div className="space-y-4">
      {/* VIP Status Card */}
      <Card className="w-full">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {getVIPIcon()}
              <CardTitle className="text-lg">Status VIP</CardTitle>
            </div>
            <Badge 
              variant={isVIP ? "default" : "secondary"}
              className={`${getVIPColor() === 'purple' ? 'bg-purple-500' : 
                         getVIPColor() === 'blue' ? 'bg-blue-500' : 
                         getVIPColor() === 'green' ? 'bg-green-500' : 'bg-gray-500'}`}
            >
              {getVIPDisplayName()}
            </Badge>
          </div>
          <CardDescription>
            {isVIP ? 'Você tem acesso a recursos premium' : 'Faça upgrade para acessar recursos premium'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Billing Status */}
          {isVIP && (
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Status da Cobrança:</span>
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${getBillingStatusColor()}`} />
                <span className="text-sm">{getBillingStatusText()}</span>
              </div>
            </div>
          )}

          {/* Expiration Warning */}
          {shouldShowVIPWarning() && (
            <Alert>
              <Clock className="h-4 w-4" />
              <AlertDescription>
                Seu plano VIP expira em {getDaysUntilExpiration()} dias. 
                Renove para manter o acesso aos recursos premium.
              </AlertDescription>
            </Alert>
          )}

          {/* Expired VIP */}
          {isVIPExpired() && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Seu plano VIP expirou. Faça upgrade para restaurar o acesso aos recursos premium.
              </AlertDescription>
            </Alert>
          )}

          {/* Upgrade Button */}
          {showUpgradeButton && !isVIP && (
            <Button 
              onClick={onUpgrade}
              className="w-full"
              variant="default"
            >
              <Crown className="mr-2 h-4 w-4" />
              Fazer Upgrade para VIP
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Features Card */}
      {vipFeatures && (
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-lg">Recursos Disponíveis</CardTitle>
            <CardDescription>
              Veja quais recursos você tem acesso
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  {hasFeature('can_use_analytics') ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-500" />
                  )}
                  <span className="text-sm">Analytics Avançado</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  {hasFeature('can_use_whatsapp') ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-500" />
                  )}
                  <span className="text-sm">Integração WhatsApp</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  {hasFeature('can_use_chatwoot') ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-500" />
                  )}
                  <span className="text-sm">Chatwoot</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  {hasFeature('can_use_ai_features') ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-500" />
                  )}
                  <span className="text-sm">Recursos de IA</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Sites Máximos:</span>
                  <span className="text-sm font-medium">
                    {vipFeatures.max_sites === -1 ? 'Ilimitado' : vipFeatures.max_sites}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm">Armazenamento:</span>
                  <span className="text-sm font-medium">
                    {vipFeatures.max_storage} MB
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm">Suporte:</span>
                  <span className="text-sm font-medium capitalize">
                    {vipFeatures.support_level}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
