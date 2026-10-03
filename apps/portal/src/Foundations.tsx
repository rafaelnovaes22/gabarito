import { useState, type ReactNode } from "react";
import { Check, Copy } from "lucide-react";
import { Specimen } from "./ui";

const COLORS: Array<{ name: string; hex: string; role: string }> = [
  { name: "Fundo", hex: "#101110", role: "Base da página" },
  { name: "Painel", hex: "#171814", role: "Superfícies e specimens" },
  { name: "Tinta", hex: "#F2F0E9", role: "Texto principal" },
  { name: "Apagado", hex: "#8A8778", role: "Rótulos e apoio" },
  { name: "Acento", hex: "#E8A020", role: "Ações e numeração" },
];

function Swatch({ name, hex, role }: { name: string; hex: string; role: string }): ReactNode {
  const [copied, setCopied] = useState(false);

  async function copyHex(): Promise<void> {
    try {
      await navigator.clipboard.writeText(hex);
    } catch {
      const area = document.createElement("textarea");
      area.value = hex;
      document.body.appendChild(area);
      area.select();
      document.execCommand("copy");
      area.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <button
      type="button"
      onClick={() => void copyHex()}
      className="group min-w-0 rounded-[10px] border border-white/10 p-3 text-left transition-colors hover:border-gaccent"
      aria-label={`Copiar ${hex}`}
    >
      <span className="block h-16 w-full rounded-[10px] border border-white/10" style={{ background: hex }} />
      <span className="mt-2 flex items-center justify-between gap-2">
        <span className="text-[12px] font-medium uppercase tracking-[0.14em] text-gmuted">{name}</span>
        {copied ? (
          <Check size={14} aria-hidden="true" className="shrink-0 text-gaccent" />
        ) : (
          <Copy size={14} aria-hidden="true" className="shrink-0 text-gmuted group-hover:text-gaccent" />
        )}
      </span>
      <span className="tnum mt-0.5 block font-mono text-[15px] text-gink">{hex}</span>
      <span className="block text-[13px] text-gmuted">{copied ? "Copiado" : role}</span>
    </button>
  );
}

export function Foundations(): ReactNode {
  return (
    <div className="grid min-w-0 gap-4">
      <Specimen code="G-05" title="Cores, clique para copiar">
        <div className="grid min-w-0 grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {COLORS.map((c) => (
            <Swatch key={c.hex} name={c.name} hex={c.hex} role={c.role} />
          ))}
        </div>
      </Specimen>

      <Specimen code="G-06" title="Escala tipográfica">
        <div className="grid min-w-0 gap-4">
          <div className="border-b border-white/10 pb-4">
            <p className="text-[12px] font-medium uppercase tracking-[0.14em] text-gmuted">Rótulo / 12</p>
            <p className="mt-1 text-[12px] font-medium uppercase tracking-[0.14em] text-gink">
              Calibragem de tiragem G-06
            </p>
          </div>
          <div className="border-b border-white/10 pb-4">
            <p className="text-[12px] font-medium uppercase tracking-[0.14em] text-gmuted">Corpo / 15</p>
            <p className="mt-1 max-w-prose text-[15px] leading-relaxed text-gink">
              O instrumento mede antes de cortar. Texto corrido em 15px com entrelinha
              generosa para leitura no fundo escuro.
            </p>
          </div>
          <div className="border-b border-white/10 pb-4">
            <p className="text-[12px] font-medium uppercase tracking-[0.14em] text-gmuted">Título / 22</p>
            <p className="mt-1 text-[22px] font-semibold leading-tight text-gink">Precisão antes do corte</p>
          </div>
          <div>
            <p className="text-[12px] font-medium uppercase tracking-[0.14em] text-gmuted">
              Numeral tabular / 32
            </p>
            <p className="tnum mt-1 font-mono text-[32px] leading-none text-gink">0123456789</p>
          </div>
        </div>
      </Specimen>

      <Specimen code="G-07" title="Espaçamento, base 8px">
        <div className="flex min-w-0 flex-wrap items-end gap-4">
          {[8, 16, 24, 32, 48].map((v) => (
            <div key={v} className="min-w-0">
              <div className="rounded-[10px] bg-gaccent" style={{ width: v, height: 24 }} />
              <p className="tnum mt-2 font-mono text-[13px] text-gink">{v}px</p>
              <p className="tnum font-mono text-[12px] text-gmuted">x{(v / 8).toFixed(v % 8 === 0 ? 0 : 1)}</p>
            </div>
          ))}
        </div>
        <p className="mt-3 text-[15px] text-gmuted">Tudo é múltiplo de 8. Sem exceção.</p>
      </Specimen>

      <Specimen code="G-08" title="Raios">
        <div className="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="rounded-[10px] border border-white/10 bg-[#0c0d0c] p-4">
            <p className="text-[12px] font-medium uppercase tracking-[0.14em] text-gmuted">Cartão / 10px</p>
            <p className="tnum mt-1 font-mono text-[13px] text-gink">--g-radius-md</p>
          </div>
          <div className="border border-white/10 bg-[#0c0d0c] p-4" style={{ borderRadius: 999 }}>
            <p className="text-[12px] font-medium uppercase tracking-[0.14em] text-gmuted">Selo / 999px</p>
            <p className="tnum mt-1 font-mono text-[13px] text-gink">--g-radius-full</p>
          </div>
        </div>
      </Specimen>
    </div>
  );
}
