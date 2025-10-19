import React from 'react';

export default function Premium() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full mx-4">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
            <span className="text-white text-2xl font-bold">P</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Obrigado pelo Premium!
          </h1>
          <p className="text-gray-600 mb-6">
            Você agora tem acesso a todos os recursos premium da nossa plataforma.
          </p>
          <div className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-green-800 mb-2">Benefícios Premium:</h3>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Acesso completo a todas as funcionalidades</li>
                <li>• Suporte prioritário 24/7</li>
                <li>• Recursos avançados de analytics</li>
                <li>• Integrações exclusivas</li>
              </ul>
            </div>
            <button 
              onClick={() => window.location.href = '/dashboard'}
              className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 px-6 rounded-lg font-semibold hover:from-purple-600 hover:to-blue-600 transition-all duration-200"
            >
              Acessar Dashboard Premium
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
