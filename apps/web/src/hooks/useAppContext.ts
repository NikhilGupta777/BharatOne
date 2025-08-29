import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import type { AppContextType } from '../lib/types';
import { useI18n } from '../i18n/I18nProvider';

export const useAppContext = () => {
  const context = useContext(AppContext);
  const { t } = useI18n();

  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  
  return { ...context, t };
};