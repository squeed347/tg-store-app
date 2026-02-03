import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/tg-store-app/',  // ← ТОЧНО имя вашего репозитория!
  
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000',  // ← Ваш бэкенд
        changeOrigin: true
      }
    }
  },
  
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  }
})
