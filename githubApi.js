/**
 * Re-export the GitHub contributions handler from the canonical Vercel API route
 * at api/github/contributions.js for backwards compatibility with Vite and Node server.
 */

export {
  handleGithubApi,
  getGithubContributions,
  default,
} from './api/github/contributions.js';
