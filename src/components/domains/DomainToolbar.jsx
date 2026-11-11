import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DOMAIN_BY_CODE, HELP_TEXT } from '../../data/controlDomains.js';
import DomainPill, { pillStyle } from './DomainPill.jsx';

export const SAFEGUARDS = ['Administrative', 'Physical', 'Technical', 'Organizational / Documentation', 'Breach Notification', 'Privacy Rule'];

const readStore = (k) => { try { return JSON.parse(localStorage.getItem(k) || 'null'); } catch { return null; } };
const writeStore = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* storage unavailable */ } };

/**
 * Filter state shared by the toolbar and the task list. URL query wins over the remembered selection.
 * URL keys: domains=AST,IAC  safeguards=Technical,Physical
 */
export function useDomainFilters(storeKey) {
  const [state, setState] = useState(() => {
    if (typeof window === 'undefined') return { domains: [], safeguards: [] };
    const q = new URLSearchParams(window.location.search);
    const fromUrl = { domains: (q.get('domains') || '').split(',').filter(Boolean), safeguards: (q.get('safeguards') || '').split(',').filter(Boolean) };
    if (fromUrl.domains.length || fromUrl.safeguards.length) return fromUrl;
    const saved = readStore(storeKey);
    return saved && Array.isArray(saved.domains) ? { domains: saved.domains, safeguards: saved.safeguards || [] } : { domains: [], safeguards: [] };
  });
  useEffect(() => {
    writeStore(storeKey, state);
    try {
      const url = new URL(window.location.href);
      state.domains.length ? url.searchParams.set('domains', state.domains.join(',')) : url.searchParams.delete('domains');
      state.safeguards.length ? url.searchParams.set('safeguards', state.safeguards.join(',')) : url.searchParams.delete('safeguards');
      window.history.replaceState(window.history.state, '', url);
    } catch { /* non-browser */ }
  }, [state, storeKey]);
  const toggle = (key, v) => setState((s) => ({ ...s, [key]: s[key].includes(v) ? s[key].filter((x) => x !== v) : [...s[key], v] }));
  const clear = () => setState({ domains: [], safeguards: [] });
  return { ...state, toggle, clear, active: state.domains.length + state.safeguards.length > 0 };
}

function Chip({ pressed, onClick, children, style }) {
  return (
    <button type="button" aria-pressed={pressed} onClick={onClick} style={pressed ? style : undefined}
      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 ${pressed ? 'ring-2 ring-offset-1 ring-gray-500 dark:ring-slate-300 dark:ring-offset-slate-900' : 'bg-white text-gray-700 border-gray-300 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-600'}`}>
      {children}
    </button>
  );
}

/**
 * counts: { [code]: n } for domains on this page. safeguardCounts: { [category]: n } or null.
 * visible: { total, completed, hours } for the filtered set.
 */
export default function DomainToolbar({ counts, safeguardCounts, filters, visible, guessedCount }) {
  const [sortAz, setSortAz] = useState(false);
  const [sheet, setSheet] = useState(false);
  const codes = Object.keys(counts).sort((a, b) => (sortAz ? DOMAIN_BY_CODE[a].name.localeCompare(DOMAIN_BY_CODE[b].name) : counts[b] - counts[a] || DOMAIN_BY_CODE[a].name.localeCompare(DOMAIN_BY_CODE[b].name)));
  const n = filters.domains.length + filters.safeguards.length;

  const panel = (
    <div className="space-y-3">
      <div>
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <p id="domain-filter-label" className="text-xs font-bold uppercase tracking-wide text-gray-600 dark:text-slate-300">Domain</p>
          <button type="button" onClick={() => setSortAz((v) => !v)} className="text-xs underline text-gray-600 dark:text-slate-300">
            Sort: {sortAz ? 'A to Z' : 'by count'}
          </button>
        </div>
        <div role="group" aria-labelledby="domain-filter-label" className="flex flex-wrap gap-1.5">
          {codes.map((c) => (
            <Chip key={c} pressed={filters.domains.includes(c)} onClick={() => filters.toggle('domains', c)} style={pillStyle(c)}>
              {DOMAIN_BY_CODE[c].name} ({counts[c]})
            </Chip>
          ))}
        </div>
      </div>
      {safeguardCounts && (
        <div>
          <p id="safeguard-filter-label" className="text-xs font-bold uppercase tracking-wide text-gray-600 dark:text-slate-300 mb-1.5">Safeguard category</p>
          <div role="group" aria-labelledby="safeguard-filter-label" className="flex flex-wrap gap-1.5">
            {SAFEGUARDS.filter((s) => safeguardCounts[s]).map((s) => (
              <Chip key={s} pressed={filters.safeguards.includes(s)} onClick={() => filters.toggle('safeguards', s)}>{s} ({safeguardCounts[s]})</Chip>
            ))}
          </div>
        </div>
      )}
      {filters.domains.length > 0 && (
        <p className="text-xs flex flex-wrap gap-x-3 gap-y-1">
          {filters.domains.map((c) => (
            <Link key={c} to={`/domains/${c}`} className="underline text-sky-700 dark:text-sky-300">See {DOMAIN_BY_CODE[c].name} across all frameworks</Link>
          ))}
        </p>
      )}
    </div>
  );

  return (
    <div className="mb-6 rounded-2xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4">
      <details className="mb-3">
        <summary className="cursor-pointer text-sm font-semibold text-gray-900 dark:text-white">Domains on this page ({codes.length})</summary>
        <ul className="mt-2 grid sm:grid-cols-2 lg:grid-cols-2 gap-1.5">
          {[...codes].sort((a, b) => counts[b] - counts[a]).map((c) => (
            <li key={c} className="flex items-center justify-between gap-2 text-sm text-gray-700 dark:text-slate-300">
              <DomainPill code={c} />
              <span className="tabular-nums">{counts[c]}</span>
            </li>
          ))}
        </ul>
        <p className="mt-2 text-xs text-gray-500 dark:text-slate-400">{HELP_TEXT}{guessedCount > 0 ? ` Pills marked * were assigned by topic because the card has no catalogue citation.` : ''}</p>
      </details>

      <div className="flex flex-wrap items-center gap-3">
        <button type="button" onClick={() => setSheet(true)} className="sm:hidden inline-flex items-center gap-1 rounded-lg border border-gray-300 dark:border-slate-600 px-3 py-1.5 text-sm font-semibold text-gray-800 dark:text-slate-100">
          Filters{n ? ` (${n})` : ''}
        </button>
        <p className="text-sm text-gray-700 dark:text-slate-300" aria-live="polite">
          {filters.active ? `Showing ${visible.total} tasks: ${visible.completed}/${visible.total} complete, ~${visible.hours}h` : `${visible.total} tasks`}
        </p>
        {filters.active && <button type="button" onClick={filters.clear} className="text-sm underline text-red-700 dark:text-red-300">Clear filters</button>}
      </div>
      <div className="hidden sm:block mt-3">{panel}</div>

      {sheet && (
        <div className="sm:hidden fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Filters">
          <button type="button" aria-label="Close filters" className="absolute inset-0 bg-black/40" onClick={() => setSheet(false)} />
          <div className="absolute bottom-0 inset-x-0 max-h-[80vh] overflow-y-auto rounded-t-2xl bg-white dark:bg-slate-900 p-4 shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <p className="font-semibold text-gray-900 dark:text-white">Filters</p>
              <button type="button" onClick={() => setSheet(false)} className="text-sm underline text-gray-700 dark:text-slate-200">Done</button>
            </div>
            {panel}
          </div>
        </div>
      )}
    </div>
  );
}
