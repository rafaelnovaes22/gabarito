import { useState, type ReactNode } from "react";
import { Check, Copy } from "lucide-react";

export function useCopy(): [boolean, (text: string) => Promise<void>] {
  const [copied, setCopied] = useState(false);

  async function copy(text: string): Promise<void> {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const area = document.createElement("textarea");
      area.value = text;
      document.body.appendChild(area);
      area.select();
      document.execCommand("copy");
      area.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return [copied, copy];
}

function CropMarks(): ReactNode {
  const base = "pointer-events-none absolute h-3 w-3 border-gmuted/80";
  return (
    <>
      <span aria-hidden="true" className={`${base} left-1.5 top-1.5 border-l border-t`} />
      <span aria-hidden="true" className={`${base} right-1.5 top-1.5 border-r border-t`} />
      <span aria-hidden="true" className={`${base} bottom-1.5 left-1.5 border-b border-l`} />
      <span aria-hidden="true" className={`${base} bottom-1.5 right-1.5 border-b border-r`} />
    </>
  );
}

export function Specimen({
  code,
  title,
  children,
}: {
  code: string;
  title: string;
  children: ReactNode;
}): ReactNode {
  return (
    <section className="relative min-w-0 rounded-[10px] border border-white/10 bg-gpanel p-5 pt-7 sm:p-6 sm:pt-8">
      <CropMarks />
      <header className="mb-4 flex min-w-0 items-baseline justify-between gap-3">
        <p className="truncate text-[12px] font-medium uppercase tracking-[0.14em] text-gmuted">
          {title}
        </p>
        <span className="tnum shrink-0 font-mono text-[12px] text-gaccent">{code}</span>
      </header>
      <div className="min-w-0">{children}</div>
    </section>
  );
}

export function CodeBlock({ code, language }: { code: string; language: string }): ReactNode {
  const [copied, copy] = useCopy();
  return (
    <div className="min-w-0 overflow-hidden rounded-[10px] border border-white/10 bg-[#0c0d0c]">
      <div className="flex items-center justify-between gap-2 border-b border-white/10 px-3 py-2">
        <span className="text-[12px] font-medium uppercase tracking-[0.14em] text-gmuted">
          {language}
        </span>
        <button
          type="button"
          onClick={() => void copy(code)}
          className="inline-flex items-center gap-1.5 rounded-[10px] border border-white/10 px-2.5 py-1 text-[12px] uppercase tracking-[0.12em] text-gink transition-colors hover:border-gaccent hover:text-gaccent"
        >
          {copied ? <Check size={14} aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />}
          {copied ? "Copiado" : "Copiar"}
        </button>
      </div>
      <pre className="overflow-x-auto p-3 font-mono text-[13px] leading-relaxed text-gink">
        <code>{code}</code>
      </pre>
    </div>
  );
}

export function Label({ children }: { children: ReactNode }): ReactNode {
  return (
    <p className="text-[12px] font-medium uppercase tracking-[0.14em] text-gmuted">{children}</p>
  );
}
