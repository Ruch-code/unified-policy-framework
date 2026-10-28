import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Search, FolderDown, Loader2 } from 'lucide-react';
import data from '../data/templates.json';
import { downloadCategoryZip } from '../utils/templateDocx.js';
import TemplateDownloadButton, { FrameworkBadges, FW_CHIPS } from '../components/templates/TemplateDownloadButton.jsx';

function CategorySection({ category, templates, forceOpen }) {
  const [open, setOpen] = useState(true);
  const [zipping, setZipping] = useState(false);
  const isOpen = forceOpen || open;
  const zip = async () => {
    setZipping(true);
    try { await downloadCategoryZip({ ...category, templates }); }
    catch (e) { console.error('Zip download failed', e); }
    finally { setZipping(false); }
  };
  return (
    <section className="rounded-2xl border border-slate-200 dark:border-slate-700/70 bg-white dark:bg-slate-900/60 overflow-hidden">
      <div className="flex flex-wrap items-center gap-2 p-4 sm:px-5">
        <button
          type="button"
          onClick={() => setOpen(o => !o)}
          aria-expanded={isOpen}
          className="flex-1 min-w-0 flex items-center gap-2 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 rounded"
        >
          <ChevronDown className={`w-5 h-5 shrink-0 text-violet-600 transition-transform ${isOpen ? '' : '-rotate-90'}`} aria-hidden="true" />
          <h2 className="text-base sm:text-lg font-bold text-navy-900 dark:text-text-dark-primary">{category.name}</h2>
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 shrink-0">{templates.length}</span>
        </button>
        <button
          type="button"
          onClick={zip}
          disabled={zipping}
          aria-label={`Download all ${category.name} templates as a zip file`}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border border-violet-300 dark:border-violet-700 text-violet-700 dark:text-violet-300 hover:bg-violet-50 dark:hover:bg-violet-900/30 disabled:opacity-60 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
        >
          {zipping ? <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" /> : <FolderDown className="w-4 h-4" aria-hidden="true" />}
          Download all in this category
        </button>
      </div>
      {isOpen && (
        <ul className="divide-y divide-slate-100 dark:divide-slate-800 border-t border-slate-100 dark:border-slate-800">
          {templates.map(t => (
            <li key={t.slug} className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-3 px-4 sm:px-5 py-3">
              <TemplateDownloadButton template={t} compact />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-navy-900 dark:text-text-dark-primary break-words">{t.name}</p>
                <p className="text-sm text-navy-600 dark:text-text-dark-secondary mt-0.5 break-words">{t.purpose}</p>
                <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1">
                  <FrameworkBadges frameworks={t.frameworks} />
                  <Link to={`/templates/${t.slug}`} className="text-xs font-semibold text-violet-700 dark:text-violet-300 hover:underline">Preview</Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default function Templates() {
  const [fw, setFw] = useState('ALL');
  const [q, setQ] = useState('');
  const query = q.trim().toLowerCase();

  const filtered = useMemo(() => data.categories.map(c => ({
    category: c,
    templates: c.templates.filter(t =>
      (fw === 'ALL' || t.frameworks.includes(fw)) &&
      (!query || t.name.toLowerCase().includes(query) || t.purpose.toLowerCase().includes(query))),
  })).filter(g => g.templates.length), [fw, query]);
  const count = filtered.reduce((n, g) => n + g.templates.length, 0);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 sm:py-10 overflow-x-hidden">
      <header className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900 dark:text-text-dark-primary">Evidence &amp; Document Templates</h1>
        <p className="mt-2 text-navy-600 dark:text-text-dark-secondary">Generic, audit-ready templates mapped to SOC 2, ISO 27001:2022, HIPAA and GDPR.</p>
        <p className="mt-1 text-sm text-navy-600 dark:text-text-dark-secondary">Policies and documents download as Word. Logs, records and trackers download as Excel so you can add rows, filter and sort.</p>
      </header>

      <div className="flex flex-col gap-3 mb-6">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by framework">
          {FW_CHIPS.map(c => (
            <button
              key={c.id}
              type="button"
              onClick={() => setFw(c.id)}
              aria-pressed={fw === c.id}
              className={`px-3 py-1.5 rounded-full text-sm font-semibold border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400
                ${fw === c.id
                  ? 'bg-violet-600 border-violet-600 text-white'
                  : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-violet-400'}`}
            >
              {c.label}
            </button>
          ))}
        </div>
        <label className="relative block">
          <span className="sr-only">Search templates</span>
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true" />
          <input
            type="search"
            value={q}
            onChange={e => setQ(e.target.value)}
            placeholder="Search by name or purpose"
            className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-violet-400"
          />
        </label>
        <p className="text-xs text-slate-500 dark:text-slate-400" aria-live="polite">{count} templates</p>
      </div>

      <div className="space-y-4">
        {filtered.map(g => (
          <CategorySection key={g.category.id} category={g.category} templates={g.templates} forceOpen={!!query} />
        ))}
        {!filtered.length && <p className="text-sm text-slate-500 dark:text-slate-400">No templates match this filter.</p>}
      </div>
    </div>
  );
}
