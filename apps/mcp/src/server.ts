import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  type CallToolResult,
} from '@modelcontextprotocol/sdk/types.js';
import { getComponent, getTokens, listComponents, searchComponents } from './registry.js';

function summarize() {
  return listComponents().map((c) => ({
    name: c.name,
    description: c.description,
    tags: c.tags,
    props: c.props.map((p) => `${p.optional ? '[' : ''}${p.name}: ${p.type}${p.optional ? ']' : ''}`),
  }));
}

function textResult(text: string): CallToolResult {
  return { content: [{ type: 'text', text }] };
}

function stringArg(args: unknown, key: string): string {
  if (args && typeof args === 'object' && typeof (args as Record<string, unknown>)[key] === 'string') {
    return String((args as Record<string, unknown>)[key]);
  }
  return '';
}

export function createGabaritoServer(): Server {
  const server = new Server({ name: 'gabarito', version: '0.1.0' }, { capabilities: { tools: {} } });

  server.setRequestHandler(ListToolsRequestSchema, async () => ({
    tools: [
      {
        name: 'list_components',
        description: 'Lista os componentes do design system Gabarito com descricao, tags e props.',
        inputSchema: { type: 'object', properties: {} },
      },
      {
        name: 'get_component',
        description: 'Retorna o codigo-fonte TSX completo de um componente Gabarito para copiar no projeto.',
        inputSchema: {
          type: 'object',
          properties: { name: { type: 'string', description: 'Nome do componente, ex. KpiCard' } },
          required: ['name'],
        },
      },
      {
        name: 'search_components',
        description: 'Busca componentes por nome, descricao ou tag.',
        inputSchema: {
          type: 'object',
          properties: { query: { type: 'string', description: 'Termo de busca, ex. "formulario"' } },
          required: ['query'],
        },
      },
      {
        name: 'get_tokens',
        description: 'Retorna os tokens CSS do Gabarito (cores, raios, espacamento) para importar no projeto.',
        inputSchema: { type: 'object', properties: {} },
      },
    ],
  }));

  server.setRequestHandler(CallToolRequestSchema, async (request): Promise<CallToolResult> => {
    const { name, arguments: args } = request.params;
    switch (name) {
      case 'list_components':
        return textResult(JSON.stringify(summarize(), null, 2));
      case 'get_component': {
        const component = getComponent(stringArg(args, 'name'));
        if (!component) return { ...textResult('Componente nao encontrado.'), isError: true };
        return textResult(component.source);
      }
      case 'search_components':
        return textResult(JSON.stringify(searchComponents(stringArg(args, 'query')).map((c) => c.name)));
      case 'get_tokens':
        return textResult(getTokens());
      default:
        return { ...textResult(`Tool desconhecida: ${name}.`), isError: true };
    }
  });

  return server;
}
