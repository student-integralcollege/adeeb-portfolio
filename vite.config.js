import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy requests starting with /api/github to the external GitHub contributions API
      '/api/github': {
        target: 'https://github-contributions-api.deno.dev',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api\/github/, ''),
      },
    },
  },
})
