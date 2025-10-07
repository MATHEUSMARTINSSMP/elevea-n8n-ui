import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Check, X } from 'lucide-react';
import { openWhatsApp } from '../lib/whatsapp';

const plans = [
  {
    name: 'Starter',
    price: 'R$ 97',
    period: '/mês',
    description: 'Perfeito para começar',
    features: [
      '1 site',
      '5 páginas',
      'IA básica',
      'Suporte por email',
      'Templates básicos'
    ],
    limitations: [
      'Sem analytics avançado',
      'Sem automação'
    ],
    popular: false
  },
  {
    name: 'Professional',
    price: 'R$ 197',
    period: '/mês',
    description: 'Para profissionais em crescimento',
    features: [
      '3 sites',
      'Páginas ilimitadas',
      'IA avançada',
      'Analytics completo',
      'Automação básica',
      'Suporte prioritário',
      'Templates premium'
    ],
    limitations: [],
    popular: true
  },
  {
    name: 'Enterprise',
    price: 'R$ 397',
    period: '/mês',
    description: 'Para empresas em expansão',
    features: [
      'Sites ilimitados',
      'Páginas ilimitadas',
      'IA completa',
      'Analytics avançado',
      'Automação completa',
      'Suporte 24/7',
      'Templates exclusivos',
      'API personalizada'
    ],
    limitations: [],
    popular: false
  }
];

export function PricingCards() {
  const handleGetPlan = (planName: string) => {
    openWhatsApp(`Olá! Tenho interesse no plano ${planName}. Pode me ajudar com mais informações?`);
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Escolha seu plano
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Planos flexíveis para cada etapa do seu negócio
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative ${
                plan.popular 
                  ? 'border-[#8B4513] shadow-xl scale-105' 
                  : 'border-gray-200'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-[#8B4513] text-white px-4 py-1 rounded-full text-sm font-medium">
                    Mais Popular
                  </span>
                </div>
              )}
              
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription className="text-lg">{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-[#8B4513]">{plan.price}</span>
                  <span className="text-gray-600">{plan.period}</span>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-3" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                  
                  {plan.limitations.map((limitation, limitationIndex) => (
                    <div key={limitationIndex} className="flex items-center">
                      <X className="h-5 w-5 text-red-500 mr-3" />
                      <span className="text-gray-500 line-through">{limitation}</span>
                    </div>
                  ))}
                </div>
                
                <Button 
                  onClick={() => handleGetPlan(plan.name)}
                  className={`w-full mt-6 ${
                    plan.popular
                      ? 'bg-[#8B4513] hover:bg-[#A0522D] text-white'
                      : 'bg-gray-900 hover:bg-gray-800 text-white'
                  }`}
                >
                  Começar agora
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
