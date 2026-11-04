import { useMemo, useState } from 'react';
import { ChevronRight, Search } from 'lucide-react';
import { CONTROLS, MATRIX_SECTIONS, CONTROL_TASKS, SCOPE_NOTE, CATALOG_NOTE, SCOPE_SUMMARY, scopeBadges, sectionInScope, controlInScope, sectionIds } from '../data/soc2Criteria.js';

const FILTERS = [['all', 'All'], ['type1', 'Type I scope'], ['type2', 'Type II scope']];
const TEXT = 'text-navy-700 dark:text-text-dark-secondary';
const LINE = 'border-surface-200 dark:border-surface-dark-200';

function ControlRow({ id, taskTitle }) {
  const c = CONTROLS[id];
  const links = (CONTROL_TASKS[id] || []).map(taskTitle).filter(Boolean);
  return (
    <li className={`border-t ${LINE} py-2 text-sm ${TEXT}`}>
      <p className="font-semibold text-navy-900 dark:text-text-dark-primary break-words"><span className="font-mono">{id}</span> {c.name}</p>
      <p>{c.desc}</p>
      <div className="mt-1 flex flex-wrap gap-1">{scopeBadges(id).map((b) => <span key={b} className="px-1.5 py-0.5 rounded text-[11px] font-semibold bg-violet-100 text-violet-800 dark:bg-violet-900/40 dark:text-violet-200">{b}</span>)}</div>
      <p className="mt-1 text-xs"><strong>Linked OneLens tasks:</strong> {links.length ? links.join('; ') : 'None linked yet'}</p>
    </li>
  );
}

export default function Soc2ControlMatrix({ framework }) {
  const [filter, setFilter] = useState('all');
  const [q, setQ] = useState('');
  const taskTitle = useMemo(() => (ref) => {
    const [l, i] = ref.split('.').map(Number);
    const w = framework?.weeksData?.[l - 1];
    const tasks = w?.days ? w.days.flatMap((d) => d.tasks || []) : w?.tasks || [];
    const t = tasks[i];
    return t ? `L${l}: ${t.title || t}` : '';
  }, [framework]);
  const needle = q.trim().toLowerCase();
  const match = (id, sub) => !needle || CONTROLS[id].name.toLowerCase().includes(needle) || sub.title.toLowerCase().includes(needle) || sub.id.toLowerCase().includes(needle);
  const sections = MATRIX_SECTIONS.filter((s) => sectionInScope(s.key, filter)).map((s) => ({ ...s, subs: s.subs.map((x) => ({ ...x, ids: x.ids.filter((id) => controlInScope(id, filter) && match(id, x)) })).filter((x) => x.ids.length) })).filter((s) => s.subs.length || (s.addIfInScope && !needle));
  const visible = new Set(sections.flatMap(sectionIds));
  return (
    <section id="soc2-controls-by-criteria" className="max-w-6xl mx-auto px-4 my-10 scroll-mt-24">
      <div className={`rounded-2xl border ${LINE} bg-white dark:bg-slate-900/60 p-4 md:p-6`}>
        <h2 className="grc-section-title mb-2">SOC 2 Controls by Criteria</h2>
        <p className={`text-sm mb-3 ${TEXT}`}>{CATALOG_NOTE}</p>
        <p className={`text-sm mb-3 ${TEXT}`}>{SCOPE_NOTE}</p>
        <div className="overflow-x-auto mb-2"><table className={`w-full min-w-[34rem] text-sm ${TEXT}`}>
          <thead><tr className="text-left text-navy-900 dark:text-text-dark-primary">{['Report', 'Timing', 'Categories', 'Criteria', 'Controls'].map((h) => <th key={h} scope="col" className="p-2">{h}</th>)}</tr></thead>
          <tbody>{SCOPE_SUMMARY.map((r) => <tr key={r[0]} className={`border-t ${LINE}`}>{r.map((c) => <td key={c} className="p-2">{c}</td>)}</tr>)}</tbody>
        </table></div>
        <ul className={`list-disc pl-5 text-sm mb-4 ${TEXT}`}><li>Controls added by Confidentiality: 76</li><li>Controls added by Privacy: 77 to 99</li></ul>
        <div className="flex flex-wrap items-center gap-2 mb-3">
          {FILTERS.map(([k, l]) => <button key={k} type="button" aria-pressed={filter === k} onClick={() => setFilter(k)} className={`px-3 py-1.5 rounded-lg text-xs font-semibold border focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 ${filter === k ? 'bg-violet-600 text-white border-violet-600' : `${LINE} ${TEXT}`}`}>{l}</button>)}
          <span className="relative flex-1 min-w-[12rem]"><Search className="w-3.5 h-3.5 absolute left-2 top-2.5 text-gray-400" aria-hidden="true" />
            <input aria-label="Search controls by name or criterion" placeholder="Search control name or criterion" value={q} onChange={(e) => setQ(e.target.value)} className={`w-full rounded-lg border ${LINE} bg-white dark:bg-slate-900 pl-7 pr-2 py-2 text-xs text-navy-900 dark:text-text-dark-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400`} /></span>
          <span className={`text-xs font-semibold ${TEXT}`} aria-live="polite">{visible.size} controls shown</span>
        </div>
        <div className="space-y-2">{sections.map((s) => (
          <details key={s.key} className={`group rounded-xl border ${LINE}`}>
            <summary className="flex items-center gap-2 p-3 cursor-pointer font-semibold text-sm text-navy-900 dark:text-text-dark-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 rounded-xl">
              <ChevronRight className="w-4 h-4 shrink-0 transition-transform group-open:rotate-90" aria-hidden="true" />
              <span className="flex-1 min-w-0 break-words">{s.label}</span>
              <span className="text-xs shrink-0">{s.addIfInScope ? 'Add if in scope' : `${sectionIds(s).length} controls`}</span>
            </summary>
            <div className="px-3 pb-3">
              {s.addIfInScope && <p className={`text-sm ${TEXT}`}>Add if in scope. This category is not part of this control catalog. See its tasks in each level and the Trust Services Criteria matrix below.</p>}
              {s.subs.map((x) => <div key={x.id} className="mt-2"><h3 className="text-sm font-bold text-navy-900 dark:text-text-dark-primary mb-1">{x.title}</h3><ul>{x.ids.map((id) => <ControlRow key={id} id={id} taskTitle={taskTitle} />)}</ul></div>)}
            </div>
          </details>
        ))}</div>
      </div>
    </section>
  );
}
