import React from 'react';
import { Link } from 'react-router-dom';

export default function VIP() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full text-center">
        <svg
          className="mx-auto h-16 w-16 text-yellow-500 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 13l4 4L19 7"
          ></path>
        </svg>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Parabéns! Você é VIP!</h1>
        <p className="text-gray-600 mb-6">
          Sua assinatura VIP foi ativada com sucesso. Prepare-se para uma experiência exclusiva e acesso a todos os recursos premium!
        </p>
        <Link
          to="/client/dashboard"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-colors duration-200"
        >
          Ir para o Dashboard VIP
        </Link>
      </div>
    </div>
  );
}
