/** @gabarito {"name": "Badge", "description": "Selo compacto de estado em quatro tons.", "tags": ["estado", "status", "selo"]} */
import type { ReactNode } from "react";

export interface BadgeProps {
  tone?: "ok" | "warn" | "danger" | "neutral";
  children: ReactNode;
}

const tones: Record<string, string> = {
  ok: "border-[#4c8a4f]/40 bg-[#4c8a4f]/15 text-[#9bd3a0]",
  warn: "border-gab-accent/40 bg-gab-accent/15 text-gab-accent",
  danger: "border-[#b3402a]/40 bg-[#b3402a]/15 text-[#f0a08e]",
  neutral: "border-white/15 bg-white/5 text-gab-muted",
};

export function Badge({ tone = "neutral", children }: BadgeProps) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-[999px] border px-2.5 py-0.5 text-xs font-medium uppercase tracking-[0.12em] ${tones[tone] ?? ""}`}>
      {children}
    </span>
  );
}
