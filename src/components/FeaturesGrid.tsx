import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { 
  Bot, 
  BarChart3, 
  Smartphone, 
  Globe, 
  Zap, 
  Shield 
} from 'lucide-react';

const features = [
  {
    icon: Bot,
    title: 'IA Integrada',
    description: 'Criação automática de conteúdo e otimização com inteligência artificial'
  },
  {
    icon: BarChart3,
    title: 'Analytics Avançado',
    description: 'Acompanhe métricas detalhadas e insights de performance'
  },
  {
    icon: Smartphone,
    title: 'Mobile First',
    description: 'Sites otimizados para todos os dispositivos e telas'
  },
  {
    icon: Globe,
    title: 'SEO Automático',
    description: 'Otimização automática para mecanismos de busca'
  },
  {
    icon: Zap,
    title: 'Automação Inteligente',
    description: 'Automatize campanhas e workflows de marketing'
  },
  {
    icon: Shield,
    title: 'Segurança Total',
    description: 'Proteção completa dos dados e conformidade LGPD'
  }
];

export function FeaturesGrid() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Por que escolher a ELEVEA?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Nossa plataforma combina tecnologia de ponta com simplicidade de uso
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 bg-[#8B4513]/10 rounded-full w-fit">
                  <feature.icon className="h-8 w-8 text-[#8B4513]" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-600">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
