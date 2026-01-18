import type { ReactNode } from 'react';

interface CheckboxProps {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  icon: ReactNode;
  label: string;
}

export function Checkbox({ id, checked, onChange, icon, label }: CheckboxProps) {
  return (
    <label
      htmlFor={id}
      className="flex items-center gap-3 bg-background border border-border rounded-lg p-3 cursor-pointer hover:border-indigo-500/50 transition-all"
    >
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only peer"
      />
      <div className="w-5 h-5 border-2 border-border rounded flex items-center justify-center peer-checked:bg-indigo-500 peer-checked:border-indigo-500 transition-all">
        <svg
          className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          style={{ opacity: checked ? 1 : 0 }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <span className="flex items-center gap-2 text-sm text-white">
        <span className="text-muted w-4">{icon}</span>
        {label}
      </span>
    </label>
  );
}
