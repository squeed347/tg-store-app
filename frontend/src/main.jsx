import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Инициализация Telegram (БЕЗОПАСНАЯ)
if (typeof window !== 'undefined') {
  const TelegramWebApp = window.Telegram?.WebApp;
  if (TelegramWebApp) {
    TelegramWebApp.ready();
    TelegramWebApp.expand();
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
