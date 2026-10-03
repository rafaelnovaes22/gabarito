import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { createGabaritoServer } from './server.js';

async function main(): Promise<void> {
  const server = createGabaritoServer();
  await server.connect(new StdioServerTransport());
}

main().catch((err) => {
  console.error('[gabarito-mcp]', err);
  process.exit(1);
});
