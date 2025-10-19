import React, { createContext, useContext, useEffect, ReactNode } from 'react';
import { initAnalytics, identifyUser, resetUser, AnalyticsUser } from '@/lib/analytics';

interface AnalyticsContextType {
  identifyUser: (user: AnalyticsUser, hasConsent?: boolean) => void;
  resetUser: () => void;
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined);

interface AnalyticsProviderProps {
  children: ReactNode;
}

export default function AnalyticsProvider({ children }: AnalyticsProviderProps) {
  useEffect(() => {
    initAnalytics({
      enabled: true,
      debug: process.env.NODE_ENV === 'development',
      provider: 'n8n',
    }).catch(console.error);
  }, []);

  const contextValue: AnalyticsContextType = {
    identifyUser,
    resetUser,
  };

  return (
    <AnalyticsContext.Provider value={contextValue}>
      {children}
    </AnalyticsContext.Provider>
  );
}

export function useAnalyticsContext() {
  const context = useContext(AnalyticsContext);
  if (context === undefined) {
    throw new Error('useAnalyticsContext must be used within an AnalyticsProvider');
  }
  return context;
}
