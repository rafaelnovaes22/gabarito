import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

export interface GabaritoProp {
  name: string;
  type: string;
  optional: boolean;
}

export interface GabaritoComponent {
  name: string;
  description: string;
  tags: string[];
  props: GabaritoProp[];
  source: string;
}

function resolveComponentsDir(): string {
  if (process.env.GABARITO_COMPONENTS_DIR && existsSync(process.env.GABARITO_COMPONENTS_DIR)) {
    return process.env.GABARITO_COMPONENTS_DIR;
  }
  const here = dirname(fileURLToPath(import.meta.url));
  const candidates = [
    join(here, '..', '..', '..', 'packages', 'react', 'src'),
    join(here, '..', '..', '..', '..', 'packages', 'react', 'src'),
    join(here, '..', 'components'),
    join(process.cwd(), 'packages', 'react', 'src'),
  ];
  for (const dir of candidates) {
    if (existsSync(dir)) return dir;
  }
  throw new Error('Diretorio de componentes Gabarito nao encontrado.');
}

function parseHeader(source: string): { name: string; description: string; tags: string[] } | null {
  const match = source.match(/@gabarito\s+(\{.*\})/);
  if (!match) return null;
  try {
    const data = JSON.parse(match[1]) as { name?: string; description?: string; tags?: string[] };
    if (!data.name) return null;
    return { name: data.name, description: data.description || '', tags: data.tags || [] };
  } catch {
    return null;
  }
}

function parseProps(source: string, componentName: string): GabaritoProp[] {
  const block = source.match(new RegExp(`export interface ${componentName}Props\\s*\\{([^}]*)\\}`));
  if (!block) return [];
  return block[1]
    .split('\n')
    .map((line) => line.trim().replace(/;$/, ''))
    .filter((line) => line.includes(':'))
    .map((line) => {
      const [rawName, ...rest] = line.split(':');
      const name = rawName.trim().replace('?', '');
      return { name, type: rest.join(':').trim(), optional: rawName.includes('?') };
    });
}

let cache: GabaritoComponent[] | null = null;

export function listComponents(): GabaritoComponent[] {
  if (cache) return cache;
  const dir = resolveComponentsDir();
  const files = readdirSync(dir).filter((f) => f.endsWith('.tsx'));
  cache = files.flatMap((file) => {
    const source = readFileSync(join(dir, file), 'utf8');
    const header = parseHeader(source);
    if (!header) return [];
    return [{
      name: header.name,
      description: header.description,
      tags: header.tags,
      props: parseProps(source, header.name),
      source,
    }];
  });
  return cache;
}

export function getComponent(name: string): GabaritoComponent | null {
  const found = listComponents().find((c) => c.name.toLowerCase() === name.toLowerCase());
  return found || null;
}

export function searchComponents(query: string): GabaritoComponent[] {
  const needle = query.toLowerCase().trim();
  if (!needle) return listComponents();
  return listComponents().filter((c) =>
    c.name.toLowerCase().includes(needle) ||
    c.description.toLowerCase().includes(needle) ||
    c.tags.some((t) => t.toLowerCase().includes(needle)),
  );
}

export function getTokens(): string {
  const dir = resolveComponentsDir();
  const path = join(dir, 'tokens.css');
  if (!existsSync(path)) throw new Error('tokens.css nao encontrado.');
  return readFileSync(path, 'utf8');
}
