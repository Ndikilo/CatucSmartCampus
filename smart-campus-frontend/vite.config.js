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
    'process.env': process.env
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
