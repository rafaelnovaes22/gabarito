import express from 'express';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { createGabaritoServer } from './server.js';

export function createMcpHttpApp() {
  const app = express();
  app.use(express.json());

  app.post('/', async (req, res) => {
    try {
      const server = createGabaritoServer();
      const transport = new StreamableHTTPServerTransport({ sessionIdGenerator: undefined });
      await server.connect(transport);
      await transport.handleRequest(req, res, req.body);
    } catch (err) {
      console.error('[gabarito-mcp http]', err);
      if (!res.headersSent) res.status(500).json({ error: 'Erro interno no MCP Gabarito.' });
    }
  });

  app.get('/', (_req, res) => res.status(405).json({ error: 'Use POST em /mcp.' }));
  app.delete('/', (_req, res) => res.status(405).json({ error: 'Sessao stateless: nada a encerrar.' }));

  return app;
}
