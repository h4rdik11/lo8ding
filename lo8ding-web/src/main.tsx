import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import '@h4rdik11/lo8ding-lib';
import '@h4rdik11/lo8ding-lib/dist/index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
