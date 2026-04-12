import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import './index.css';
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { PlanProvider } from './context/PlanContext.jsx';
import AppErrorBoundary from './components/AppErrorBoundary.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <AppErrorBoundary>
        <AuthProvider>
          <PlanProvider>
            <App />
          </PlanProvider>
        </AuthProvider>
      </AppErrorBoundary>
    </HelmetProvider>
  </StrictMode>,
);
