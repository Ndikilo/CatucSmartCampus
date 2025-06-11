
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
    // Environment variables configuration
    envDir: '.',
    envPrefix: ['VITE_', 'PUBLIC_'],
    
    server: {
      fs: {
        strict: false,
      },
      host: '0.0.0.0',
      port: 5173,
      strictPort: false,
      open: true,
      cors: true,
      proxy: {
        '/api': {
          target: 'http://localhost:3000',
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      },
      hmr: {
        overlay: true,
        host: 'localhost',
        port: 5173,
        protocol: 'ws',
        clientPort: 5173
      },
      watch: {
        usePolling: true,
        interval: 100,
        ignored: ['**/node_modules/**', '**/.git/**']
      },
      ws: {
        heartbeat: 60000,
        clientTracking: true
      },
    },
    preview: {
      host: '0.0.0.0',
      port: 4173,
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
            vendor: ['react', 'react-dom', 'react-router-dom'],
            mui: ['@mui/material', '@emotion/react', '@emotion/styled']
          }
        }
      },
      emptyOutDir: true
    }
  };
});
