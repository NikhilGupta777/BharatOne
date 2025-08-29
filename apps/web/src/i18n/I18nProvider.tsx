import React, { createContext, useContext, useState, useCallback } from 'react';
import type { Locale } from '../lib/types';
import en from './locales/en.json';
import hi from './locales/hi.json';

const translations = { en, hi };

type I18nContextType = {
  locale: Locale;
  setLocale: React.Dispatch<React.SetStateAction<Locale>>;
  t: (key: keyof typeof en) => string;
};

const I18nContext = createContext<I18nContextType | null>(null);

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocale] = useState<Locale>('en');

  const t = useCallback((key: keyof typeof en): string => {
    return translations[locale][key] || translations['en'][key];
  }, [locale]);

  const value = { locale, setLocale, t };

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = (): I18nContextType => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};