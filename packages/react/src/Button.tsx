/** @gabarito {"name": "Button", "description": "Botão da oficina com três variantes e três tamanhos.", "tags": ["acao", "formulario", "clique"]} */
import type { ReactNode } from "react";

export interface ButtonProps {
  variant?: "primary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  children: ReactNode;
}

const variants: Record<string, string> = {
  primary: "bg-gab-accent text-[#101110] hover:brightness-110",
  ghost: "border border-white/15 bg-transparent text-gab-ink hover:border-gab-accent hover:text-gab-accent",
  danger: "bg-[#b3402a] text-gab-ink hover:brightness-110",
};

const sizes: Record<string, string> = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2 text-[15px]",
  lg: "px-5 py-3 text-base",
};

export function Button({ variant = "primary", size = "md", disabled = false, type = "button", onClick, children }: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 rounded-[10px] font-medium transition duration-200 ease-out disabled:cursor-not-allowed disabled:opacity-45 ${variants[variant] ?? ""} ${sizes[size] ?? ""}`}
    >
      {children}
    </button>
  );
}
