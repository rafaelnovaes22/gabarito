import { useState, type ReactNode } from "react";
import { BookOpen, Boxes, Layers, Ruler } from "lucide-react";
import { ComponentsExplorer } from "./ComponentsExplorer";
import { Foundations } from "./Foundations";
import { GettingStarted } from "./GettingStarted";

type Section = "start" | "foundations" | "components";

const NAV: Array<{ id: Section; label: string; icon: ReactNode }> = [
  { id: "start", label: "Getting Started", icon: <BookOpen size={15} aria-hidden="true" /> },
  { id: "foundations", label: "Foundations", icon: <Layers size={15} aria-hidden="true" /> },
  { id: "components", label: "Components", icon: <Boxes size={15} aria-hidden="true" /> },
];

const HEADINGS: Record<Section, { kicker: string; title: string; sub: string }> = {
  start: {
    kicker: "Seção 01",
    title: "Getting Started",
    sub: "Instale, importe os tokens e renderize a primeira peça.",
  },
  foundations: {
    kicker: "Seção 02",
    title: "Foundations",
    sub: "Cor, tipo, espaço e raio. O vocabulário mínimo do sistema.",
  },
  components: {
    kicker: "Seção 03",
    title: "Components",
    sub: "Busque, inspecione o preview vivo e copie o exemplo.",
  },
};

export default function App(): ReactNode {
  const [section, setSection] = useState<Section>("start");
  const heading = HEADINGS[section];

  return (
    <div className="min-h-screen min-w-0 bg-gbg font-sans text-gink">
      <header className="sticky top-0 z-10 border-b border-white/10 bg-gbg/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-5xl min-w-0 flex-wrap items-center gap-3 px-4 py-3">
          <span className="flex min-w-0 items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-gaccent text-[#101110]">
              <Ruler size={17} aria-hidden="true" />
            </span>
            <span className="min-w-0">
              <span className="block text-[12px] font-medium uppercase tracking-[0.14em] text-gmuted">
                Gabarito
              </span>
              <span className="block truncate text-[15px] font-semibold leading-tight">
                Design System
              </span>
            </span>
          </span>
          <nav aria-label="Seções" className="ml-auto flex min-w-0 flex-wrap gap-1.5">
            {NAV.map((n) => {
              const active = n.id === section;
              return (
                <button
                  key={n.id}
                  type="button"
                  onClick={() => setSection(n.id)}
                  aria-current={active ? "page" : undefined}
                  className={`inline-flex items-center gap-1.5 rounded-[10px] border px-3 py-1.5 text-[13px] transition-colors ${
                    active
                      ? "border-gaccent bg-gaccent/10 text-gaccent"
                      : "border-white/10 text-gmuted hover:border-gmuted hover:text-gink"
                  }`}
                >
                  {n.icon}
                  {n.label}
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl min-w-0 px-4 pb-16 pt-8">
        <div className="mb-6 min-w-0">
          <p className="text-[12px] font-medium uppercase tracking-[0.14em] text-gaccent">
            {heading.kicker}
          </p>
          <h1 className="mt-1 text-[22px] font-semibold leading-tight">{heading.title}</h1>
          <p className="mt-1 max-w-prose text-[15px] text-gmuted">{heading.sub}</p>
        </div>

        {section === "start" ? <GettingStarted /> : null}
        {section === "foundations" ? <Foundations /> : null}
        {section === "components" ? <ComponentsExplorer /> : null}
      </main>

      <footer className="border-t border-white/10">
        <div className="mx-auto flex w-full max-w-5xl min-w-0 flex-wrap items-center justify-between gap-2 px-4 py-4">
          <p className="text-[12px] uppercase tracking-[0.14em] text-gmuted">
            Gabarito, instrumento de precisão no escuro
          </p>
          <p className="tnum font-mono text-[12px] text-gmuted">v0.1.0</p>
        </div>
      </footer>
    </div>
  );
}
