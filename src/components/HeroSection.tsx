import React from 'react';
import { Button } from './ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import { openWhatsApp } from '../lib/whatsapp';

export function HeroSection() {
  const handleGetStarted = () => {
    openWhatsApp('Olá! Quero criar um site profissional com a Elevea. Pode me ajudar?');
  };

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <div className="flex items-center justify-center mb-6">
            <Sparkles className="h-8 w-8 text-[#8B4513] mr-3" />
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900">
              ELEVEA
            </h1>
          </div>
          
          <p className="text-xl sm:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Crie sites inteligentes e automatize seu marketing digital com a potência da IA
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              onClick={handleGetStarted}
              className="bg-[#8B4513] hover:bg-[#A0522D] text-white px-8 py-4 text-lg"
            >
              Experimente agora
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
              className="border-[#8B4513] text-[#8B4513] hover:bg-[#8B4513] hover:text-white px-8 py-4 text-lg"
            >
              Ver demonstração
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
