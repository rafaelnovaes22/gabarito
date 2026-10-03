/** @gabarito {"name": "Table", "description": "Tabela simples de colunas e linhas para dados operacionais.", "tags": ["dados", "lista", "tabela"]} */
import type { ReactNode } from "react";

export interface TableColumn {
  key: string;
  label: string;
}

export interface TableProps {
  columns: TableColumn[];
  rows: Record<string, ReactNode>[];
}

export function Table({ columns, rows }: TableProps) {
  return (
    <div className="overflow-x-auto rounded-[10px] border border-white/10 bg-gab-panel shadow-[0_8px_24px_rgba(0,0,0,0.35)]">
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="border-b border-white/10">
            {columns.map((column) => (
              <th key={column.key} className="px-4 py-2 text-xs font-medium uppercase tracking-[0.12em] text-gab-muted">
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index} className="border-b border-white/5 transition duration-150 ease-out last:border-0 hover:bg-white/5">
              {columns.map((column) => (
                <td key={column.key} className="px-4 py-2 text-[15px] text-gab-ink">
                  {row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
