import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './',  // ← ОТНОСИТЕЛЬНЫЕ пути для GitHub Pages!
  build: {
    outDir: '../dist',
    assetsDir: 'assets',
    sourcemap: false
  },
  server: {
    proxy: {
      '/api': 'http://127.0.0.1:8000'
    }
  }
})
