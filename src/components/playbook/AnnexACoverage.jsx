import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ANNEX_A_CONTROLS } from '../../data/iso27001AnnexA.js';
import { ANNEX_A_EVIDENCE, ANNEX_A_LINKS } from '../../data/playbookAdditions/iso27001.js';

/** Coverage table for all 93 Annex A controls: implementation guidance and evidence. */
export default function AnnexACoverage() {
  const [q, setQ] = useState('');
  const rows = useMemo(() => ANNEX_A_CONTROLS.filter(c => !q || `${c.id} ${c.title} ${c.purpose}`.toLowerCase().includes(q.toLowerCase())), [q]);
  return (
    <section id="annex-a-coverage" className="max-w-6xl mx-auto px-4 py-10 scroll-mt-24">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Annex A coverage: all {ANNEX_A_CONTROLS.length} controls</h2>
      <p className="text-sm text-gray-600 dark:text-slate-300 mb-3 max-w-3xl">Implementation guidance is a plain-language paraphrase, not the standard's text. Annex A controls are selected through risk treatment and recorded in the Statement of Applicability; not every control applies to every organization.</p>
      <label className="block mb-3 text-sm text-gray-700 dark:text-slate-300">Filter
        <input value={q} onChange={e => setQ(e.target.value)} placeholder="For example A.8 or logging" className="ml-2 px-2 py-1 rounded border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800" />
      </label>
      <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-slate-700" tabIndex={0} role="region" aria-label="Annex A coverage table">
        <table className="w-full text-sm min-w-[860px]">
          <thead className="bg-gray-50 dark:bg-slate-800"><tr>{['Control', 'Title', 'Implementation guidance', 'Evidence', 'More detail'].map(h => <th key={h} scope="col" className="text-left p-2 font-semibold text-gray-900 dark:text-white">{h}</th>)}</tr></thead>
          <tbody>{rows.map(c => (
            <tr key={c.id} className="border-t border-gray-200 dark:border-slate-700 align-top">
              <td className="p-2 font-mono text-xs whitespace-nowrap text-gray-900 dark:text-white">{c.id}</td>
              <td className="p-2 text-gray-900 dark:text-white">{c.title}</td>
              <td className="p-2 text-gray-700 dark:text-slate-300">{c.purpose}</td>
              <td className="p-2 text-gray-700 dark:text-slate-300">{ANNEX_A_EVIDENCE[c.id]}</td>
              <td className="p-2 text-xs">{ANNEX_A_LINKS[c.id] ? <Link className="underline text-indigo-700 dark:text-indigo-300" to={ANNEX_A_LINKS[c.id]}>Audit playbook task</Link> : <Link className="underline text-indigo-700 dark:text-indigo-300" to="/iso/27001/la">Statement of Applicability</Link>}</td>
            </tr>))}</tbody>
        </table>
      </div>
    </section>
  );
}
