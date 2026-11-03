import { useMemo, useState } from 'react';
import { FolderOpen } from 'lucide-react';
import { CONTROLS, THEMES } from '../../data/iso42001.js';
import { LIBRARY, ADAPT_NOTE, documentsFor, domainOf } from '../../data/iso42001Library.js';
import { templateBySlug } from '../../utils/templateMatch.js';
import TemplateDownloadButton from '../templates/TemplateDownloadButton.jsx';
import { useAuth } from '../../context/AuthContext.jsx';

const INPUT = 'rounded-lg border border-surface-300 dark:border-surface-dark-300 bg-white dark:bg-slate-900 text-gray-900 dark:text-text-dark-primary text-xs px-2 py-2 max-w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400';
const CARD = 'rounded-xl border border-surface-200 dark:border-surface-dark-200 bg-white dark:bg-slate-900/40 p-3 text-xs text-gray-700 dark:text-text-dark-secondary';
const DOMAINS = Object.keys(THEMES).map((k) => (k.startsWith('A.') ? k : `Clause ${k}`));

export default function PolicyTemplateLibrary() {
  const { user } = useAuth() || {};
  const [f, setF] = useState({ q: '', category: '', format: '', domain: '' });
  const [view, setView] = useState('cards');
  const rows = useMemo(() => LIBRARY.filter((d) => (!f.category || d.category === f.category) && (!f.format || d.format === f.format)
    && (!f.domain || d.mappedControls.some((c) => domainOf(c) === f.domain))
    && (!f.q || `${d.title} ${d.description} ${d.mappedControls.join(' ')}`.toLowerCase().includes(f.q.toLowerCase()))), [f]);
  const sel = (key, label, opts) => (
    <select aria-label={label} className={INPUT} value={f[key]} onChange={(e) => setF({ ...f, [key]: e.target.value })}>
      <option value="">{label}: all</option>{opts.map((o) => <option key={o}>{o}</option>)}
    </select>
  );
  return (
    <section id="policy-template-library" className="scroll-mt-24 rounded-2xl border border-surface-300 dark:border-surface-dark-300 bg-white dark:bg-slate-900/60 p-4 md:p-8 mb-10">
      <h2 className="grc-section-title mb-2"><FolderOpen className="w-6 h-6 text-violet-600" /> Policy and Template Library</h2>
      <p className="text-sm text-gray-700 dark:text-text-dark-secondary mb-3">{ADAPT_NOTE}</p>
      <div className="flex gap-2 mb-3">
        {[['cards', 'Documents'], ['map', 'Control-to-template view']].map(([v, l]) => <button key={v} type="button" aria-pressed={view === v} onClick={() => setView(v)} className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${view === v ? 'bg-violet-600 text-white border-violet-600' : 'border-surface-300 dark:border-surface-dark-300 text-gray-700 dark:text-text-dark-secondary'}`}>{l}</button>)}
      </div>
      {view === 'cards' ? (
        <>
          <div className="flex flex-wrap gap-2 mb-3">
            <input aria-label="Search library" placeholder="Search library" className={`${INPUT} flex-1 min-w-[12rem]`} value={f.q} onChange={(e) => setF({ ...f, q: e.target.value })} />
            {sel('category', 'Category', ['Policy', 'Template'])}{sel('format', 'Format', ['docx', 'xlsx'])}{sel('domain', 'Clause or domain', DOMAINS)}
          </div>
          <p className="text-xs text-gray-600 dark:text-text-dark-secondary mb-2">Showing {rows.length} of {LIBRARY.length}</p>
          <ul className="grid gap-3 md:grid-cols-2">{rows.map((d) => {
            const t = templateBySlug(d.id);
            return (
              <li key={d.id} className={`${CARD} space-y-1`}>
                <p className="text-sm font-semibold text-gray-900 dark:text-text-dark-primary">{d.title}</p>
                <p>{d.description}</p>
                <p><strong>Category:</strong> {d.category}. <strong>Format:</strong> .{d.format}. <strong>Owner:</strong> {d.ownerRole}.</p>
                <p><strong>Review:</strong> {d.reviewFrequency}.</p>
                <p className="break-words"><strong>Mapped controls:</strong> {d.mappedControls.join(', ')}</p>
                {user && t ? <TemplateDownloadButton template={t} compact /> : <p className="italic">Sign in to download.</p>}
              </li>
            );
          })}</ul>
        </>
      ) : (
        <div className="overflow-x-auto"><table className="w-full text-xs min-w-[32rem]">
          <thead><tr className="text-left text-gray-900 dark:text-text-dark-primary"><th scope="col" className="p-2">Control</th><th scope="col" className="p-2">Title</th><th scope="col" className="p-2">Supporting documents</th></tr></thead>
          <tbody className="text-gray-700 dark:text-text-dark-secondary">{CONTROLS.map((k) => {
            const docs = documentsFor(k.id);
            return <tr key={k.id} className="border-t border-surface-200 dark:border-surface-dark-200"><td className="p-2 font-mono font-bold">{k.id}</td><td className="p-2">{k.title}</td><td className="p-2">{docs.length ? docs.map((d) => d.title).join('; ') : <em>No dedicated document. Guidance: {k.implementationGuidance[0]}</em>}</td></tr>;
          })}</tbody>
        </table></div>
      )}
    </section>
  );
}
