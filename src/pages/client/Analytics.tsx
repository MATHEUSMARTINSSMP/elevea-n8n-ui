import React from 'react';
import { useAnalytics } from '@/lib/analytics';

export default function Analytics() {
  const { trackEvent, trackPage } = useAnalytics();

  React.useEffect(() => {
    trackPage('Client Analytics Page');
  }, [trackPage]);

  const handleEvent = (eventName: string) => {
    trackEvent(eventName, {
      page: 'analytics',
      timestamp: new Date().toISOString()
    });
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Analytics do Cliente</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Card de Visitas */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Visitas</h2>
          <div className="text-3xl font-bold text-blue-600 mb-2">1,234</div>
          <p className="text-gray-600">Últimos 30 dias</p>
          <button 
            onClick={() => handleEvent('analytics_visits_viewed')}
            className="mt-4 text-blue-600 hover:underline"
          >
            Ver detalhes →
          </button>
        </div>

        {/* Card de Conversões */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Conversões</h2>
          <div className="text-3xl font-bold text-green-600 mb-2">89</div>
          <p className="text-gray-600">Últimos 30 dias</p>
          <button 
            onClick={() => handleEvent('analytics_conversions_viewed')}
            className="mt-4 text-green-600 hover:underline"
          >
            Ver detalhes →
          </button>
        </div>

        {/* Card de Receita */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Receita</h2>
          <div className="text-3xl font-bold text-purple-600 mb-2">R$ 12,345</div>
          <p className="text-gray-600">Últimos 30 dias</p>
          <button 
            onClick={() => handleEvent('analytics_revenue_viewed')}
            className="mt-4 text-purple-600 hover:underline"
          >
            Ver detalhes →
          </button>
        </div>
      </div>

      {/* Gráfico de Performance */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Performance dos Últimos 7 Dias</h2>
        <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
          <p className="text-gray-500">Gráfico de Performance</p>
        </div>
        <button 
          onClick={() => handleEvent('analytics_performance_viewed')}
          className="mt-4 text-blue-600 hover:underline"
        >
          Exportar dados →
        </button>
      </div>

      {/* Relatórios Rápidos */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Relatórios Rápidos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button 
            onClick={() => handleEvent('analytics_report_daily')}
            className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Relatório Diário
          </button>
          <button 
            onClick={() => handleEvent('analytics_report_weekly')}
            className="bg-green-500 text-white py-3 px-6 rounded-lg hover:bg-green-600 transition-colors"
          >
            Relatório Semanal
          </button>
          <button 
            onClick={() => handleEvent('analytics_report_monthly')}
            className="bg-purple-500 text-white py-3 px-6 rounded-lg hover:bg-purple-600 transition-colors"
          >
            Relatório Mensal
          </button>
          <button 
            onClick={() => handleEvent('analytics_report_custom')}
            className="bg-gray-500 text-white py-3 px-6 rounded-lg hover:bg-gray-600 transition-colors"
          >
            Relatório Personalizado
          </button>
        </div>
      </div>
    </div>
  );
}
