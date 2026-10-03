/** @gabarito {"name": "Tabs", "description": "Navegação por abas controlada para seções do painel.", "tags": ["navegacao", "abas", "painel"]} */
export interface TabItem {
  key: string;
  label: string;
}

export interface TabsProps {
  tabs: TabItem[];
  active: string;
  onChange: (key: string) => void;
}

export function Tabs({ tabs, active, onChange }: TabsProps) {
  return (
    <div role="tablist" className="inline-flex gap-1 rounded-[999px] border border-white/10 bg-gab-panel p-1">
      {tabs.map((tab) => {
        const selected = tab.key === active;
        return (
          <button
            key={tab.key}
            role="tab"
            aria-selected={selected}
            onClick={() => onChange(tab.key)}
            className={`rounded-[999px] px-4 py-1.5 text-[15px] transition duration-200 ease-out ${selected ? "bg-gab-accent text-[#101110]" : "text-gab-muted hover:text-gab-ink"}`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
