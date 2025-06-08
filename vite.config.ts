import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    global: 'globalThis',
    'process.env': {},
  },
  resolve: {
    alias: {
      buffer: 'buffer',
    }
  },
  optimizeDeps: {
    include: ['@biconomy/account', '@biconomy/bundler', '@biconomy/paymaster', '@biconomy/core-types', 'buffer']
  }
})
