import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Buffer } from 'buffer'
import './index.css'
import App from './App.tsx'

// Global error handling
window.addEventListener('error', (e) => {
  // Suppress Chrome extension errors
  if (e.message?.includes('chrome.runtime') || e.message?.includes('Extension ID')) {
    console.warn('Chrome extension error suppressed:', e.message);
    return;
  }
  console.error('Global error:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
  // Suppress Chrome extension errors
  if (e.reason?.message?.includes('chrome.runtime.sendMessage') || 
      e.reason?.message?.includes('Extension ID')) {
    console.warn('Chrome extension error suppressed:', e.reason.message);
    e.preventDefault();
    return;
  }
  console.error('Unhandled promise rejection:', e.reason);
});

// Polyfill Buffer for browser
if (!window.Buffer) {
  window.Buffer = Buffer
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
