import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';
import { AppProvider } from './context/AppContext';
import { I18nProvider } from './i18n/I18nProvider';
import './app/globals.css';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <I18nProvider>
      <AppProvider>
        <App />
      </AppProvider>
    </I18nProvider>
  </React.StrictMode>
);