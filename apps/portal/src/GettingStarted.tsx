import type { ReactNode } from "react";
import { Bot, Terminal } from "lucide-react";
import { CodeBlock, Label, Specimen } from "./ui";

const INSTALL_CMD = "pnpm add @gabarito/react@latest";

const TOKENS_SNIPPET = `import "@gabarito/react/src/tokens.css";`;

const MINIMAL_SNIPPET = `import "@gabarito/react/src/tokens.css";

export function Prova() {
  return (
    <main style={{ background: "var(--g-bg)", color: "var(--g-ink)" }}>
      <h1>Tiragem G-01</h1>
      <p style={{ color: "var(--g-muted)" }}>Instrumento de precisão no escuro.</p>
      <button
        style={{
          background: "var(--g-accent)",
          color: "#101110",
          borderRadius: "var(--g-radius-md)",
          padding: "calc(var(--g-space) * 1.5) calc(var(--g-space) * 3)",
        }}
      >
        Calibrar
      </button>
    </main>
  );
}`;

const MCP_SNIPPET = `POST /mcp  Content-Type: application/json

{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": { "name": "list_components", "arguments": {} }
}`;

const MCP_TOOLS: Array<{ name: string; what: string }> = [
  { name: "list_components", what: "Lista todos os componentes do pacote." },
  { name: "get_component", what: "Detalhe de um componente: props, exemplo, tags." },
  { name: "search_components", what: "Busca por nome ou tag." },
  { name: "get_tokens", what: "Retorna os tokens (cores, raios, espaço, fontes)." },
];

export function GettingStarted(): ReactNode {
  return (
    <div className="grid min-w-0 gap-4">
      <Specimen code="G-01" title="Instalação">
        <CodeBlock code={INSTALL_CMD} language="bash" />
        <p className="mt-3 flex items-start gap-2 text-[15px] text-gink">
          <Terminal size={16} aria-hidden="true" className="mt-1 shrink-0 text-gaccent" />
          Requer React 19. O pacote é publicado como @gabarito/react.
        </p>
      </Specimen>

      <Specimen code="G-02" title="Tokens de base">
        <CodeBlock code={TOKENS_SNIPPET} language="ts" />
        <p className="mt-3 text-[15px] text-gink">
          Importe uma vez no entry do app. Todos os valores vivem em{" "}
          <code className="font-mono text-[13px] text-gaccent">packages/react/src/tokens.css</code>{" "}
          como variáveis <code className="font-mono text-[13px]">--g-*</code>.
        </p>
      </Specimen>

      <Specimen code="G-03" title="Uso mínimo">
        <CodeBlock code={MINIMAL_SNIPPET} language="tsx" />
      </Specimen>

      <Specimen code="G-04" title="Uso por agentes">
        <div className="mb-3 flex items-center gap-2">
          <Bot size={16} aria-hidden="true" className="shrink-0 text-gaccent" />
          <Label>Endpoint MCP: /mcp</Label>
        </div>
        <p className="mb-3 text-[15px] text-gink">
          Agentes consultam o sistema via MCP com JSON-RPC. Quatro tools cobrem o catálogo
          inteiro, sem precisar ler o código-fonte.
        </p>
        <div className="overflow-x-auto rounded-[10px] border border-white/10">
          <table className="w-full min-w-[420px] border-collapse text-left text-[15px]">
            <thead>
              <tr className="border-b border-white/10">
                <th className="px-3 py-2 text-[12px] font-medium uppercase tracking-[0.14em] text-gmuted">
                  Tool
                </th>
                <th className="px-3 py-2 text-[12px] font-medium uppercase tracking-[0.14em] text-gmuted">
                  Retorna
                </th>
              </tr>
            </thead>
            <tbody>
              {MCP_TOOLS.map((t) => (
                <tr key={t.name} className="border-b border-white/5 last:border-0">
                  <td className="px-3 py-2 font-mono text-[13px] text-gaccent">{t.name}</td>
                  <td className="px-3 py-2 text-gink">{t.what}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-3">
          <CodeBlock code={MCP_SNIPPET} language="http" />
        </div>
      </Specimen>
    </div>
  );
}
