export interface Experience {
  role: string;
  company: string;
  /** Human-readable period, used by the LaTeX CV generator. */
  period: string;
  /** "YYYY-MM" */
  start: string;
  /** "YYYY-MM", or null for the current role. */
  end: string | null;
  /** Ordered by importance. */
  stack: string[];
  bullets: string[];
}
