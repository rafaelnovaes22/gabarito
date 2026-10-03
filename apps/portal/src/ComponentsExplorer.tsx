import { useMemo, useState } from "react";
import { Boxes, Search } from "lucide-react";
import { COMPONENTS, type ComponentDoc } from "./catalog";
import { CodeBlock, Specimen } from "./ui";

function matches(c: ComponentDoc, q: string): boolean {
  const needle = q.trim().toLowerCase();
  if (needle === "") return true;
  if (c.name.toLowerCase().includes(needle)) return true;
  return c.tags.some((t) => t.toLowerCase().includes(needle));
}

export function ComponentsExplorer() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string>(COMPONENTS[0]?.name ?? "");
  const filtered = useMemo(() => COMPONENTS.filter((c) => matches(c, query)), [query]);
  const active: ComponentDoc | undefined =
    filtered.find((c) => c.name === selected) ?? filtered[0];
  const activeIndex = active ? COMPONENTS.findIndex((c) => c.name === active.name) : 0;
  const code = `G-${String(9 + Math.max(activeIndex, 0)).padStart(2, "0")}`;

  return (
    <div className="grid min-w-0 gap-4">
      <div className="relative min-w-0">
        <Search
          size={16}
          aria-hidden="true"
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gmuted"
        />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar por nome ou tag: form, modal, status"
          type="search"
          aria-label="Buscar componentes"
          className="w-full min-w-0 rounded-[10px] border border-white/10 bg-gpanel py-2.5 pl-9 pr-3 text-[15px] text-gink placeholder:text-gmuted/70 focus:border-gaccent focus:outline-none"
        />
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-[10px] border border-white/10 bg-gpanel p-5 text-[15px] text-gmuted">
          Nenhum componente para “{query}”. Limpe a busca.
        </p>
      ) : (
        <div className="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((c) => {
            const isActive = c.name === active?.name;
            return (
              <button
                key={c.name}
                type="button"
                onClick={() => setSelected(c.name)}
                aria-pressed={isActive}
                className={`min-w-0 rounded-[10px] border p-4 text-left transition-colors ${
                  isActive ? "border-gaccent bg-gpanel" : "border-white/10 bg-gpanel hover:border-gmuted"
                }`}
              >
                <span className="flex items-center gap-2">
                  <Boxes size={15} aria-hidden="true" className={isActive ? "text-gaccent" : "text-gmuted"} />
                  <span className="font-mono text-[15px] font-semibold text-gink">{c.name}</span>
                </span>
                <span className="mt-1 block truncate text-[13px] text-gmuted">{c.description}</span>
                <span className="mt-2 flex flex-wrap gap-1.5">
                  {c.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/10 px-2 py-0.5 font-mono text-[12px] text-gmuted"
                    >
                      {t}
                    </span>
                  ))}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {active ? (
        <Specimen code={code} title={`Componente ${active.name}`}>
          <p className="mb-3 text-[15px] text-gink">{active.description}</p>
          <div className="mb-4 rounded-[10px] border border-white/10 bg-[#0c0d0c] p-4">
            {active.preview}
          </div>
          <p className="mb-2 text-[12px] font-medium uppercase tracking-[0.14em] text-gmuted">Props</p>
          <div className="mb-4 overflow-x-auto rounded-[10px] border border-white/10">
            <table className="w-full min-w-[520px] border-collapse text-left text-[15px]">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="px-3 py-2 text-[12px] font-medium uppercase tracking-[0.14em] text-gmuted">Prop</th>
                  <th className="px-3 py-2 text-[12px] font-medium uppercase tracking-[0.14em] text-gmuted">Tipo</th>
                  <th className="px-3 py-2 text-[12px] font-medium uppercase tracking-[0.14em] text-gmuted">Padrão</th>
                  <th className="px-3 py-2 text-[12px] font-medium uppercase tracking-[0.14em] text-gmuted">Descrição</th>
                </tr>
              </thead>
              <tbody>
                {active.props.map((p) => (
                  <tr key={p.name} className="border-b border-white/5 align-top last:border-0">
                    <td className="px-3 py-2 font-mono text-[13px] text-gaccent">{p.name}</td>
                    <td className="px-3 py-2 font-mono text-[13px] text-gink">{p.type}</td>
                    <td className="tnum px-3 py-2 font-mono text-[13px] text-gmuted">{p.defaultValue}</td>
                    <td className="px-3 py-2 text-gink">{p.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <CodeBlock code={active.example} language="tsx" />
        </Specimen>
      ) : null}
    </div>
  );
}
