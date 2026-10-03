import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import { createMcpHttpApp } from '../../mcp/src/http.js';

const PORT = Number(process.env.PORT) || 5190;
const HERE = path.dirname(fileURLToPath(import.meta.url));
const DIST = process.env.PORTAL_DIST || path.join(HERE, '..', '..', 'portal', 'dist');

export function createApp() {
  const app = express();
  app.get('/health', (_req, res) => res.json({ ok: true, service: 'gabarito' }));
  app.use('/mcp', createMcpHttpApp());
  app.use(express.static(DIST));
  app.get('*', (_req, res) => res.sendFile(path.join(DIST, 'index.html')));
  return app;
}

const isDirectRun = process.argv[1] && path.basename(process.argv[1]).includes('index');
if (isDirectRun) {
  createApp().listen(PORT, '0.0.0.0', () => {
    console.log(`[gabarito] portal + mcp na porta ${PORT}`);
  });
}
