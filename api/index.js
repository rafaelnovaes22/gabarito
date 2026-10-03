// apps/server/src/index.ts
import path from "node:path";
import { fileURLToPath as fileURLToPath2 } from "node:url";
import express2 from "express";

// apps/mcp/src/http.ts
import express from "express";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";

// apps/mcp/src/server.ts
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema
} from "@modelcontextprotocol/sdk/types.js";

// apps/mcp/src/registry.ts
import { readdirSync, readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
function resolveComponentsDir() {
  if (process.env.GABARITO_COMPONENTS_DIR && existsSync(process.env.GABARITO_COMPONENTS_DIR)) {
    return process.env.GABARITO_COMPONENTS_DIR;
  }
  const here = dirname(fileURLToPath(import.meta.url));
  const candidates = [
    join(here, "..", "..", "..", "packages", "react", "src"),
    join(here, "..", "..", "..", "..", "packages", "react", "src"),
    join(here, "..", "components"),
    join(process.cwd(), "packages", "react", "src")
  ];
  for (const dir of candidates) {
    if (existsSync(dir)) return dir;
  }
  throw new Error("Diretorio de componentes Gabarito nao encontrado.");
}
function parseHeader(source) {
  const match = source.match(/@gabarito\s+(\{.*\})/);
  if (!match) return null;
  try {
    const data = JSON.parse(match[1]);
    if (!data.name) return null;
    return { name: data.name, description: data.description || "", tags: data.tags || [] };
  } catch {
    return null;
  }
}
function parseProps(source, componentName) {
  const block = source.match(new RegExp(`export interface ${componentName}Props\\s*\\{([^}]*)\\}`));
  if (!block) return [];
  return block[1].split("\n").map((line) => line.trim().replace(/;$/, "")).filter((line) => line.includes(":")).map((line) => {
    const [rawName, ...rest] = line.split(":");
    const name = rawName.trim().replace("?", "");
    return { name, type: rest.join(":").trim(), optional: rawName.includes("?") };
  });
}
var cache = null;
function listComponents() {
  if (cache) return cache;
  const dir = resolveComponentsDir();
  const files = readdirSync(dir).filter((f) => f.endsWith(".tsx"));
  cache = files.flatMap((file) => {
    const source = readFileSync(join(dir, file), "utf8");
    const header = parseHeader(source);
    if (!header) return [];
    return [{
      name: header.name,
      description: header.description,
      tags: header.tags,
      props: parseProps(source, header.name),
      source
    }];
  });
  return cache;
}
function getComponent(name) {
  const found = listComponents().find((c) => c.name.toLowerCase() === name.toLowerCase());
  return found || null;
}
function searchComponents(query) {
  const needle = query.toLowerCase().trim();
  if (!needle) return listComponents();
  return listComponents().filter(
    (c) => c.name.toLowerCase().includes(needle) || c.description.toLowerCase().includes(needle) || c.tags.some((t) => t.toLowerCase().includes(needle))
  );
}
function getTokens() {
  const dir = resolveComponentsDir();
  const path2 = join(dir, "tokens.css");
  if (!existsSync(path2)) throw new Error("tokens.css nao encontrado.");
  return readFileSync(path2, "utf8");
}

// apps/mcp/src/server.ts
function summarize() {
  return listComponents().map((c) => ({
    name: c.name,
    description: c.description,
    tags: c.tags,
    props: c.props.map((p) => `${p.optional ? "[" : ""}${p.name}: ${p.type}${p.optional ? "]" : ""}`)
  }));
}
function textResult(text) {
  return { content: [{ type: "text", text }] };
}
function stringArg(args, key) {
  if (args && typeof args === "object" && typeof args[key] === "string") {
    return String(args[key]);
  }
  return "";
}
function createGabaritoServer() {
  const server = new Server({ name: "gabarito", version: "0.1.0" }, { capabilities: { tools: {} } });
  server.setRequestHandler(ListToolsRequestSchema, async () => ({
    tools: [
      {
        name: "list_components",
        description: "Lista os componentes do design system Gabarito com descricao, tags e props.",
        inputSchema: { type: "object", properties: {} }
      },
      {
        name: "get_component",
        description: "Retorna o codigo-fonte TSX completo de um componente Gabarito para copiar no projeto.",
        inputSchema: {
          type: "object",
          properties: { name: { type: "string", description: "Nome do componente, ex. KpiCard" } },
          required: ["name"]
        }
      },
      {
        name: "search_components",
        description: "Busca componentes por nome, descricao ou tag.",
        inputSchema: {
          type: "object",
          properties: { query: { type: "string", description: 'Termo de busca, ex. "formulario"' } },
          required: ["query"]
        }
      },
      {
        name: "get_tokens",
        description: "Retorna os tokens CSS do Gabarito (cores, raios, espacamento) para importar no projeto.",
        inputSchema: { type: "object", properties: {} }
      }
    ]
  }));
  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;
    switch (name) {
      case "list_components":
        return textResult(JSON.stringify(summarize(), null, 2));
      case "get_component": {
        const component = getComponent(stringArg(args, "name"));
        if (!component) return { ...textResult("Componente nao encontrado."), isError: true };
        return textResult(component.source);
      }
      case "search_components":
        return textResult(JSON.stringify(searchComponents(stringArg(args, "query")).map((c) => c.name)));
      case "get_tokens":
        return textResult(getTokens());
      default:
        return { ...textResult(`Tool desconhecida: ${name}.`), isError: true };
    }
  });
  return server;
}

// apps/mcp/src/http.ts
function createMcpHttpApp() {
  const app2 = express();
  app2.use(express.json());
  app2.post("/", async (req, res) => {
    try {
      const server = createGabaritoServer();
      const transport = new StreamableHTTPServerTransport({ sessionIdGenerator: void 0 });
      await server.connect(transport);
      await transport.handleRequest(req, res, req.body);
    } catch (err) {
      console.error("[gabarito-mcp http]", err);
      if (!res.headersSent) res.status(500).json({ error: "Erro interno no MCP Gabarito." });
    }
  });
  app2.get("/", (_req, res) => res.status(405).json({ error: "Use POST em /mcp." }));
  app2.delete("/", (_req, res) => res.status(405).json({ error: "Sessao stateless: nada a encerrar." }));
  return app2;
}

// apps/server/src/index.ts
var PORT = Number(process.env.PORT) || 5190;
var HERE = path.dirname(fileURLToPath2(import.meta.url));
var DIST = process.env.PORTAL_DIST || path.join(HERE, "..", "..", "portal", "dist");
function createApp() {
  const app2 = express2();
  app2.get("/health", (_req, res) => res.json({ ok: true, service: "gabarito" }));
  app2.use("/mcp", createMcpHttpApp());
  app2.use(express2.static(DIST));
  app2.get("*", (_req, res) => res.sendFile(path.join(DIST, "index.html")));
  return app2;
}
var isDirectRun = process.argv[1] && path.basename(process.argv[1]).includes("index");
if (isDirectRun) {
  createApp().listen(PORT, "0.0.0.0", () => {
    console.log(`[gabarito] portal + mcp na porta ${PORT}`);
  });
}

// apps/server/src/vercel.ts
var app = createApp();
function handler(req, res) {
  app(req, res);
}
export {
  handler as default
};
