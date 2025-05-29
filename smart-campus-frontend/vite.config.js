import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
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
      overlay: true // Show error overlay in the browser
    },
    watch: {
      usePolling: true, // Useful for WSL2 or Docker
      ignored: ['**/node_modules/**', '**/.git/**']
    }
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
