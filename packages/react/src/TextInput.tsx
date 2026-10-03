/** @gabarito {"name": "TextInput", "description": "Campo de texto com rótulo, dica e estado de erro.", "tags": ["formulario", "entrada", "texto"]} */
export interface TextInputProps {
  label: string;
  value: string;
  onChange: (next: string) => void;
  hint?: string;
  error?: string;
  placeholder?: string;
  name?: string;
  type?: string;
}

export function TextInput({ label, value, onChange, hint, error, placeholder, name, type = "text" }: TextInputProps) {
  const invalid = error !== undefined && error !== "";
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium uppercase tracking-[0.12em] text-gab-muted">{label}</span>
      <input
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        aria-invalid={invalid}
        onChange={(event) => onChange(event.currentTarget.value)}
        className={`w-full rounded-[10px] border bg-gab-bg px-3 py-2 text-[15px] text-gab-ink outline-none transition duration-200 ease-out placeholder:text-gab-muted/60 focus:border-gab-accent ${invalid ? "border-[#b3402a]" : "border-white/15"}`}
      />
      {invalid ? (
        <span className="mt-1 block text-[15px] text-[#f0a08e]">{error}</span>
      ) : hint === undefined ? null : (
        <span className="mt-1 block text-[15px] text-gab-muted">{hint}</span>
      )}
    </label>
  );
}
