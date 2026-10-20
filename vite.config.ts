import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Enable React's JSX transform and development-time Fast Refresh through Vite.
export default defineConfig({
  plugins: [react()],
})
