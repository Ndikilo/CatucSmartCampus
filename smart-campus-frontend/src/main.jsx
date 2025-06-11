import React from 'react';
import ReactDOM from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './common/theme/theme.js';
import { AuthProvider } from './common/context/AuthContext';
import ErrorFallback from './common/components/ErrorFallback';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


const router = createBrowserRouter(
  [
    {
      path: '/*',
      element: (
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AuthProvider>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <App />
            </ErrorBoundary>
          </AuthProvider>
        </ThemeProvider>
      ),
    },
  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    },
  }
);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <RouterProvider 
        router={router} 
        fallbackElement={
          <div style={{ padding: '1rem', textAlign: 'center' }}>
            Loading...
          </div>
        }
      />
    </ErrorBoundary>
  </React.StrictMode>
);
