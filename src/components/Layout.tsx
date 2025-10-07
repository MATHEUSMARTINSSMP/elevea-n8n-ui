import React from 'react';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function Layout({ children, className = '' }: LayoutProps) {
  return (
    <div className="min-h-screen bg-[#f0ece8] text-gray-800">
      <Header />
      <main className={className}>
        {children}
      </main>
      <Footer />
    </div>
  );
}
