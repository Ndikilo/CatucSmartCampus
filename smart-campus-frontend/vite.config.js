import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@common': path.resolve(__dirname, './src/common'),
      '@staff': path.resolve(__dirname, './src/roles/staff'),
      '@student': path.resolve(__dirname, './src/roles/student'),
      '@admin': path.resolve(__dirname, './src/roles/admin'),
    },
  },
  define: {
    // Only include the environment variables that are needed in the client-side code
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
      VITE_APP_TITLE: JSON.stringify(process.env.VITE_APP_TITLE || 'SmartCampus'),
      VITE_API_BASE_URL: JSON.stringify(process.env.VITE_API_BASE_URL || 'http://localhost:3000/api')
      // Add other environment variables that are needed in the client-side code
      // Always prefix them with VITE_ to make them available in the client
    }
  },
  server: {
    fs: {
      strict: false,
    },
    host: '0.0.0.0',
    port: 5173,
    strictPort: false, // Allow Vite to find the next available port
    open: false, // Changed to false to prevent automatic browser opening
    cors: true, // Enable CORS for development
    proxy: {
      // Example proxy configuration - uncomment and modify as needed
      // '/api': {
      //   target: 'http://localhost:3000',
      //   changeOrigin: true,
      //   secure: false,
      //   rewrite: (path) => path.replace(/^\/api/, '')
      // }
    },
    hmr: {
      host: 'localhost',
      port: 5173,
      protocol: 'ws',
      overlay: true, // Show error overlay in the browser
      clientPort: 5173 // Explicitly set client port for WebSocket
    },
    watch: {
      usePolling: true, // Useful for WSL2 or Docker
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
    emptyOutDir: true,
  },
})
