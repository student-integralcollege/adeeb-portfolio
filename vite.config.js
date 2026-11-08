import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { handleGithubApi } from './githubApi.js'

const githubApiPlugin = {
  name: 'github-contributions-api',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      if (req.url?.startsWith('/api/github/contributions')) {
        handleGithubApi(req, res).catch(next)
      } else next()
    })
  },
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load server secrets for the middleware without defining them in the client bundle.
  const serverEnv = loadEnv(mode, process.cwd(), '')
  if (serverEnv.GITHUB_TOKEN) process.env.GITHUB_TOKEN = serverEnv.GITHUB_TOKEN
  if (serverEnv.GITHUB_USERNAME) process.env.GITHUB_USERNAME = serverEnv.GITHUB_USERNAME
  return {
    plugins: [react(), githubApiPlugin],
  }
})
