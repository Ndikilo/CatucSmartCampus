
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load environment variables based on the current mode
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    base: mode === 'production' ? '/SmartCampus/' : '/',
    plugins: [
      react({
        jsxImportSource: '@emotion/react',
        babel: {
          plugins: ['@emotion/babel-plugin']
        }
      })
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '@common': path.resolve(__dirname, './src/common'),
        '@staff': path.resolve(__dirname, './src/roles/staff'),
        '@student': path.resolve(__dirname, './src/roles/student'),
        '@admin': path.resolve(__dirname, './src/roles/admin'),
      },
    },
    define: {
      // Forward environment variables to the client
      'import.meta.env.VITE_VERCEL_PROJECT_ID': JSON.stringify(env.VITE_VERCEL_PROJECT_ID || ''),
      'import.meta.env.VITE_NEWS_API_KEY': JSON.stringify(env.VITE_NEWS_API_KEY || ''),
      'import.meta.env.VITE_API_BASE_URL': JSON.stringify(env.VITE_API_BASE_URL || 'http://localhost:3000/api'),
      'import.meta.env.VITE_APP_TITLE': JSON.stringify(env.VITE_APP_TITLE || 'SmartCampus'),
      'import.meta.env.MODE': JSON.stringify(mode),
      'process.env.NODE_ENV': JSON.stringify(mode),
      'process.env.VITE_VERCEL_PROJECT_ID': JSON.stringify(env.VITE_VERCEL_PROJECT_ID || ''),
      'process.env.VITE_NEWS_API_KEY': JSON.stringify(env.VITE_NEWS_API_KEY || ''),
      'process.env.VITE_API_BASE_URL': JSON.stringify(env.VITE_API_BASE_URL || 'http://localhost:3000/api'),
      'process.env.VITE_APP_TITLE': JSON.stringify(env.VITE_APP_TITLE || 'SmartCampus')
    },
    server: {
      fs: {
        strict: false,
      },
      host: '0.0.0.0',
      port: 5173,
      strictPort: false, // Allow Vite to find the next available port
      open: true, // Open the browser on server start
      cors: true, // Enable CORS for all origins
      proxy: {
        // Proxy API requests to your backend server
        '/api': {
          target: 'http://localhost:3000',
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      },
      hmr: {
        // Enable HMR (Hot Module Replacement)
        overlay: true,
        host: 'localhost',
        port: 5173,
        protocol: 'ws',
        clientPort: 5173 // Explicitly set client port for WebSocket
      },
      watch: {
        // Watch for changes in these directories
        usePolling: true,
        interval: 100,
        ignored: ['**/node_modules/**', '**/.git/**']
      },
      // Add WebSocket ping/pong to prevent timeouts
      ws: {
        heartbeat: 60000, // Send a ping every 60 seconds
        clientTracking: true
      },
    },
    preview: {
      host: '0.0.0.0',
      port: 4173, // Default Vite preview port
      strictPort: true,
    },
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: false,
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      },
      rollupOptions: {
        output: {
          manualChunks: {
            // Split vendor libraries into separate chunks
            vendor: ['react', 'react-dom', 'react-router-dom'],
            mui: ['@mui/material', '@emotion/react', '@emotion/styled']
          }
        }
      },
      emptyOutDir: true
    }
  };
});
