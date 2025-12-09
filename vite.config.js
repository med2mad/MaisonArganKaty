import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy all requests to your Laravel backend
      '^/(cart|orders)': {
        target: 'http://localhost:8000',//'https://mak.ct.ws',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path, // Keep the original path
      }
    }
  }
})