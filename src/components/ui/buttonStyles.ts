const base =
  'inline-flex items-center justify-center gap-2 rounded-lg px-[18px] py-[11px] text-sm font-semibold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-60';

export const buttonStyles = {
  accent: `${base} bg-accent text-on-accent hover:brightness-110`,
  outline: `${base} border border-line text-ink hover:border-line-strong hover:bg-surface-2`,
} as const;
