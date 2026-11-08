import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { handleGithubApi } from './githubApi.js';

const root = fileURLToPath(new URL('.', import.meta.url));
const dist = resolve(root, 'dist');
const mime = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.ico': 'image/x-icon' };

const server = createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost');
  if (await handleGithubApi(req, res)) return;
  try {
    const file = resolve(dist, `.${decodeURIComponent(url.pathname)}`);
    const safeFile = file.startsWith(dist) ? file : join(dist, 'index.html');
    const target = await stat(safeFile).then((s) => s.isFile() ? safeFile : join(dist, 'index.html')).catch(() => join(dist, 'index.html'));
    const body = await readFile(target);
    res.writeHead(200, { 'Content-Type': mime[extname(target)] || 'application/octet-stream' }); res.end(body);
  } catch { res.writeHead(404); res.end('Not found'); }
});

server.listen(Number(process.env.PORT || 3000), '0.0.0.0', () => console.log(`Portfolio server listening on ${process.env.PORT || 3000}`));
