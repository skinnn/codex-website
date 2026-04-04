"use client";

import { createContext, useContext, ReactNode } from 'react';
import { SiteSettings } from '@/types'

type SiteSettingsMetadata = SiteSettings['metadata'];

const SiteSettingsContext = createContext<SiteSettingsMetadata | undefined>(undefined);

export const SiteSettingsProvider = ({ 
  children, 
  value 
}: { 
  children: ReactNode; 
  value: SiteSettingsMetadata; // Data passed from the Server
}) => {
  return (
    <SiteSettingsContext.Provider value={value}>
      {children}
    </SiteSettingsContext.Provider>
  );
};

export const useSiteSettings = () => {
  const context = useContext(SiteSettingsContext);
  if (context === undefined) {
    throw new Error('useSiteSettings must be used within a SiteSettingsProvider');
  }
  return context;
};