import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import 'react-i18next';

const root = createRoot(document.getElementById('root') as HTMLElement);

declare module 'react-i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common';
  }
}

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
