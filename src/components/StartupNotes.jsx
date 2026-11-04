import { PANELS } from '../data/startupVariants.js';

/** Note panel for startup and remote-first variants. */
export default function StartupNotes({ id, className = '' }) {
  const p = PANELS[id];
  return (
    <div className={`rounded-xl border border-amber-200 dark:border-amber-800 bg-amber-50/60 dark:bg-amber-900/20 p-4 my-4 ${className}`}>
      <h4 className="font-bold text-sm text-navy-900 dark:text-text-dark-primary mb-2">{p.title}</h4>
      <ul className="list-disc pl-5 space-y-1 text-sm text-navy-700 dark:text-text-dark-secondary">{p.items.map((t) => <li key={t}>{t}</li>)}</ul>
    </div>
  );
}
