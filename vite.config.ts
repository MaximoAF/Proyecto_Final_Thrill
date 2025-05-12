import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // <- permite acceder desde la red
    strictPort: true,
    port: 5173,
    allowedHosts: ['.ngrok-free.app'] // <- permite ngrok
  }
})
