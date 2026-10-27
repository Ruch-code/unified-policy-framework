import { bandFor } from '../../data/riskAssessment/methodology';

export const score = (l, i) => (Number(l) || 0) * (Number(i) || 0);

export function BandBadge({ value }) {
  const b = bandFor(value);
  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold whitespace-nowrap"
      style={{ background: b.color, color: b.text }}
      title={`${b.label} (${b.min} to ${b.max})`}
    >
      {value} {b.label}
    </span>
  );
}

const STORAGE_KEY = 'onelens-risk-register-v1';

export function loadUserRisks() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveUserRisks(rows) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(rows));
  } catch {
    /* storage unavailable: keep in memory only */
  }
}

export const sectionCls = 'mb-10 rounded-2xl border border-surface-200 dark:border-surface-dark-200 bg-white dark:bg-surface-dark-100 p-5 md:p-8';
export const h3Cls = 'text-xl md:text-2xl font-bold text-navy-900 dark:text-text-dark-primary mb-2';
export const leadCls = 'text-sm text-navy-600 dark:text-text-dark-secondary mb-5 max-w-3xl';
export const inputCls = 'px-3 py-2 rounded-lg text-sm border border-surface-300 dark:border-surface-dark-300 bg-white dark:bg-slate-800 text-navy-900 dark:text-text-dark-primary focus:outline-none focus:ring-2 focus:ring-indigo-500/40';
