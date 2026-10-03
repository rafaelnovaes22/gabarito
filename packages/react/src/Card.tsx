/** @gabarito {"name": "Card", "description": "Painel de conteúdo sobre o fundo da oficina.", "tags": ["painel", "layout", "conteudo"]} */
import type { ReactNode } from "react";

export interface CardProps {
  title?: string;
  children: ReactNode;
}

export function Card({ title, children }: CardProps) {
  return (
    <section className="rounded-[10px] border border-white/10 bg-gab-panel p-4 shadow-[0_8px_24px_rgba(0,0,0,0.35)]">
      {title === undefined ? null : (
        <h3 className="mb-2 text-[22px] font-semibold leading-tight text-gab-ink">{title}</h3>
      )}
      <div className="text-[15px] leading-relaxed text-gab-ink">{children}</div>
    </section>
  );
}
