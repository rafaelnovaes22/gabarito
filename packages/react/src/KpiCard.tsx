/** @gabarito {"name": "KpiCard", "description": "Cartão de métrica com numeral grande e variação direcional.", "tags": ["metrica", "numero", "dashboard"]} */
export interface KpiCardProps {
  label: string;
  value: string;
  delta?: number;
  hint?: string;
}

function deltaClass(delta: number): string {
  if (delta > 0) return "text-[#9bd3a0]";
  if (delta < 0) return "text-[#f0a08e]";
  return "text-gab-muted";
}

function deltaGlyph(delta: number): string {
  if (delta > 0) return "▲";
  if (delta < 0) return "▼";
  return "—";
}

export function KpiCard({ label, value, delta, hint }: KpiCardProps) {
  return (
    <section className="rounded-[10px] border border-white/10 bg-gab-panel p-4 shadow-[0_8px_24px_rgba(0,0,0,0.35)]">
      <p className="text-xs font-medium uppercase tracking-[0.12em] text-gab-muted">{label}</p>
      <p className="mt-2 font-mono text-[32px] leading-none tabular-nums text-gab-ink">{value}</p>
      {delta === undefined ? null : (
        <p className={`mt-2 text-[15px] font-medium tabular-nums ${deltaClass(delta)}`}>
          {deltaGlyph(delta)} {Math.abs(delta)}%
        </p>
      )}
      {hint === undefined ? null : <p className="mt-1 text-[15px] text-gab-muted">{hint}</p>}
    </section>
  );
}
