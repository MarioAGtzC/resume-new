/** Parses "YYYY-MM" into a Date at the start of that month. */
export function parseMonth(value: string) {
  const [year, month] = value.split('-').map(Number);
  return new Date(year, month - 1, 1);
}

export function monthsBetween(start: Date, end: Date = new Date()) {
  return (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
}

/** 54 → "4 yr 6 mo" */
export function formatDuration(months: number) {
  const years = Math.floor(months / 12);
  const rest = months % 12;
  return [years ? `${years} yr` : '', rest ? `${rest} mo` : ''].filter(Boolean).join(' ') || '< 1 mo';
}

/** 54 → "4y 6m" */
export function formatShortDuration(months: number) {
  const years = Math.floor(months / 12);
  const rest = months % 12;
  return rest ? `${years}y ${rest}m` : `${years}y`;
}

/** Date → "Apr 2022" */
export function formatMonth(date: Date) {
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

/** Splits "AWS (Lambda, Lex), Docker" on top-level commas only. */
export function splitList(value: string) {
  const items: string[] = [];
  let depth = 0;
  let current = '';
  for (const char of value) {
    if (char === '(') depth += 1;
    if (char === ')') depth -= 1;
    if (char === ',' && depth === 0) {
      items.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  if (current.trim()) items.push(current.trim());
  return items;
}
