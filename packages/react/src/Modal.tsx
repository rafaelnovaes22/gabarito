/** @gabarito {"name": "Modal", "description": "Janela sobreposta com título e fechamento para ações focadas.", "tags": ["dialogo", "sobreposicao", "foco"]} */
import type { ReactNode } from "react";

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

export function Modal({ open, onClose, title, children }: ModalProps) {
  if (!open) return null;
  return (
    <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button type="button" aria-label="Fechar" onClick={onClose} className="absolute inset-0 cursor-default bg-black/60" />
      <div className="relative w-full max-w-md rounded-[10px] border border-white/10 bg-gab-panel p-4 shadow-[0_8px_24px_rgba(0,0,0,0.35)]">
        <div className="mb-2 flex items-center justify-between gap-2">
          {title === undefined ? <span /> : <h3 className="text-[22px] font-semibold text-gab-ink">{title}</h3>}
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar diálogo"
            className="rounded-[999px] border border-white/15 px-2.5 py-1 text-xs uppercase tracking-[0.12em] text-gab-muted transition duration-200 ease-out hover:border-gab-accent hover:text-gab-accent"
          >
            Fechar
          </button>
        </div>
        <div className="text-[15px] text-gab-ink">{children}</div>
      </div>
    </div>
  );
}
