import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/tg-store-app/',  // ← Имя репозитория!
  
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000',  // ← URL бэкенда
        changeOrigin: true,
        secure: true
      }
    }
  },
  
  build: {
    outDir: 'dist',
    sourcemap: false
  }
})
