import React from 'react';

export default function Content() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Conteúdo da Página do Cliente</h1>
      <p className="text-lg mb-4">
        Bem-vindo à sua área exclusiva! Aqui você encontrará informações importantes e recursos personalizados.
      </p>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Seus Dados</h2>
        <p>Detalhes da sua conta, histórico de atividades, etc.</p>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Recursos Rápidos</h2>
        <ul className="list-disc list-inside">
          <li><a href="/profile" className="text-blue-600 hover:underline">Meu Perfil</a></li>
          <li><a href="/settings" className="text-blue-600 hover:underline">Configurações</a></li>
          <li><a href="/support" className="text-blue-600 hover:underline">Suporte</a></li>
        </ul>
      </div>
    </div>
  );
}
