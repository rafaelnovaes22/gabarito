import { useState, type ReactNode } from "react";
import { Badge, Button, Card, KpiCard, Modal, Table, Tabs, TextInput } from "@gabarito/react";

export interface PropDoc {
  name: string;
  type: string;
  defaultValue: string;
  description: string;
}

export interface ComponentDoc {
  name: string;
  tags: string[];
  description: string;
  props: PropDoc[];
  example: string;
  preview: ReactNode;
}

function TextInputDemo(): ReactNode {
  const [value, setValue] = useState("G-01");
  return (
    <div className="max-w-sm">
      <TextInput label="Peça" value={value} onChange={setValue} hint="Código da peça no gabarito." placeholder="Ex.: G-01" />
    </div>
  );
}

function TabsDemo(): ReactNode {
  const [active, setActive] = useState("medidas");
  return (
    <Tabs
      tabs={[
        { key: "medidas", label: "Medidas" },
        { key: "cortes", label: "Cortes" },
        { key: "provas", label: "Provas" },
      ]}
      active={active}
      onChange={setActive}
    />
  );
}

function ModalDemo(): ReactNode {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button variant="ghost" onClick={() => setOpen(true)}>Abrir prova</Button>
      <Modal open={open} onClose={() => setOpen(false)} title="Descartar prova?">
        Esta ação não pode ser desfeita.
      </Modal>
    </div>
  );
}

export const COMPONENTS: ComponentDoc[] = [
  {
    name: "Button",
    tags: ["acao", "formulario", "clique"],
    description: "Botão da oficina com três variantes e três tamanhos.",
    props: [
      { name: "variant", type: '"primary" | "ghost" | "danger"', defaultValue: '"primary"', description: "Hierarquia visual no painel escuro." },
      { name: "size", type: '"sm" | "md" | "lg"', defaultValue: '"md"', description: "Altura e corpo do rótulo." },
      { name: "disabled", type: "boolean", defaultValue: "false", description: "Desativa clique e reduz opacidade." },
      { name: "type", type: '"button" | "submit" | "reset"', defaultValue: '"button"', description: "Tipo do botão nativo." },
      { name: "onClick", type: "() => void", defaultValue: "—", description: "Ação do clique." },
      { name: "children", type: "ReactNode", defaultValue: "—", description: "Rótulo da ação." },
    ],
    example: `import { Button } from "@gabarito/react";

export function Acao() {
  return <Button variant="primary">Salvar medida</Button>;
}`,
    preview: (
      <div className="flex min-w-0 flex-wrap gap-3">
        <Button variant="primary">Salvar medida</Button>
        <Button variant="ghost">Fantasma</Button>
        <Button variant="danger">Descartar</Button>
      </div>
    ),
  },
  {
    name: "Badge",
    tags: ["estado", "status", "selo"],
    description: "Selo compacto de estado em quatro tons.",
    props: [
      { name: "tone", type: '"ok" | "warn" | "danger" | "neutral"', defaultValue: '"neutral"', description: "Tom do selo; warn usa o acento." },
      { name: "children", type: "ReactNode", defaultValue: "—", description: "Texto do selo." },
    ],
    example: `import { Badge } from "@gabarito/react";

export function Estado() {
  return <Badge tone="ok">Calibrado</Badge>;
}`,
    preview: (
      <div className="flex min-w-0 flex-wrap gap-2">
        <Badge tone="ok">Calibrado</Badge>
        <Badge tone="warn">Atenção</Badge>
        <Badge tone="danger">Erro</Badge>
        <Badge tone="neutral">Rascunho</Badge>
      </div>
    ),
  },
  {
    name: "Card",
    tags: ["painel", "layout", "conteudo"],
    description: "Painel de conteúdo sobre o fundo da oficina.",
    props: [
      { name: "title", type: "string", defaultValue: "—", description: "Título no topo do cartão." },
      { name: "children", type: "ReactNode", defaultValue: "—", description: "Conteúdo interno." },
    ],
    example: `import { Card } from "@gabarito/react";

export function Resumo() {
  return <Card title="Tiragem">12 peças calibradas</Card>;
}`,
    preview: (
      <div className="max-w-sm">
        <Card title="Tiragem">12 peças calibradas</Card>
      </div>
    ),
  },
  {
    name: "KpiCard",
    tags: ["metrica", "numero", "dashboard"],
    description: "Cartão de métrica com numeral grande e variação direcional.",
    props: [
      { name: "label", type: "string", defaultValue: "—", description: "Rótulo em caixa alta." },
      { name: "value", type: "string", defaultValue: "—", description: "Numeral herói com tabular-nums." },
      { name: "delta", type: "number", defaultValue: "—", description: "Variação percentual com seta direcional." },
      { name: "hint", type: "string", defaultValue: "—", description: "Contexto da métrica." },
    ],
    example: `import { KpiCard } from "@gabarito/react";

export function Painel() {
  return <KpiCard label="Receita do mês" value="R$ 48.200" delta={12} hint="vs. mês anterior" />;
}`,
    preview: (
      <div className="max-w-sm">
        <KpiCard label="Receita do mês" value="R$ 48.200" delta={12} hint="vs. mês anterior" />
      </div>
    ),
  },
  {
    name: "TextInput",
    tags: ["formulario", "entrada", "texto"],
    description: "Campo de texto com rótulo, dica e estado de erro.",
    props: [
      { name: "label", type: "string", defaultValue: "—", description: "Rótulo acima do campo." },
      { name: "value", type: "string", defaultValue: "—", description: "Valor controlado." },
      { name: "onChange", type: "(next: string) => void", defaultValue: "—", description: "Recebe o novo valor." },
      { name: "hint", type: "string", defaultValue: "—", description: "Texto de apoio abaixo do campo." },
      { name: "error", type: "string", defaultValue: "—", description: "Mensagem de erro; pinta a borda de alerta." },
      { name: "placeholder", type: "string", defaultValue: "—", description: "Exemplo dentro do campo." },
    ],
    example: `import { TextInput } from "@gabarito/react";

export function Peca({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return <TextInput label="Peça" value={value} onChange={onChange} hint="Ex.: G-01" />;
}`,
    preview: <TextInputDemo />,
  },
  {
    name: "Table",
    tags: ["dados", "lista", "tabela"],
    description: "Tabela simples de colunas e linhas para dados operacionais.",
    props: [
      { name: "columns", type: "TableColumn[]", defaultValue: "—", description: "Colunas com key e label." },
      { name: "rows", type: "Record<string, ReactNode>[]", defaultValue: "—", description: "Linhas indexadas pela key da coluna." },
    ],
    example: `import { Table } from "@gabarito/react";

export function Tiragens() {
  return (
    <Table
      columns={[{ key: "peca", label: "Peça" }, { key: "estado", label: "Estado" }]}
      rows={[{ peca: "G-01", estado: "Calibrada" }]}
    />
  );
}`,
    preview: (
      <Table
        columns={[
          { key: "peca", label: "Peça" },
          { key: "estado", label: "Estado" },
        ]}
        rows={[
          { peca: "G-01", estado: <Badge tone="ok">Calibrada</Badge> },
          { peca: "G-02", estado: <Badge tone="warn">Em prova</Badge> },
        ]}
      />
    ),
  },
  {
    name: "Tabs",
    tags: ["navegacao", "abas", "painel"],
    description: "Navegação por abas controlada para seções do painel.",
    props: [
      { name: "tabs", type: "TabItem[]", defaultValue: "—", description: "Abas com key e label." },
      { name: "active", type: "string", defaultValue: "—", description: "Key da aba ativa." },
      { name: "onChange", type: "(key: string) => void", defaultValue: "—", description: "Troca a aba ativa." },
    ],
    example: `import { Tabs } from "@gabarito/react";

export function Secoes({ active, onChange }: { active: string; onChange: (k: string) => void }) {
  return <Tabs tabs={[{ key: "a", label: "Medidas" }]} active={active} onChange={onChange} />;
}`,
    preview: <TabsDemo />,
  },
  {
    name: "Modal",
    tags: ["dialogo", "sobreposicao", "foco"],
    description: "Janela sobreposta com título e fechamento para ações focadas.",
    props: [
      { name: "open", type: "boolean", defaultValue: "false", description: "Controla a visibilidade." },
      { name: "onClose", type: "() => void", defaultValue: "—", description: "Chamado ao fechar." },
      { name: "title", type: "string", defaultValue: "—", description: "Título da janela." },
      { name: "children", type: "ReactNode", defaultValue: "—", description: "Corpo da janela." },
    ],
    example: `import { Modal } from "@gabarito/react";

export function Confirmar({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Modal open={open} onClose={onClose} title="Descartar prova?">
      Esta ação não pode ser desfeita.
    </Modal>
  );
}`,
    preview: <ModalDemo />,
  },
];
