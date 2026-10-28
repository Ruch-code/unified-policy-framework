import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import data from '../data/templates.json';
import { templateStructure, FOOTER_TEXT, templateFormat } from '../utils/templateDocx.js';
import TemplateDownloadButton, { FrameworkBadges } from '../components/templates/TemplateDownloadButton.jsx';

const H2 = 'text-base font-bold text-violet-700 dark:text-violet-300 mt-6 mb-2';
const TH = 'text-left font-semibold px-3 py-2 bg-violet-50 dark:bg-violet-900/30 text-navy-900 dark:text-text-dark-primary border border-slate-200 dark:border-slate-700';
const TD = 'px-3 py-2 border border-slate-200 dark:border-slate-700 text-navy-700 dark:text-text-dark-secondary';

function BackLink() {
  return (
    <Link to="/templates" className="inline-flex items-center gap-1.5 text-sm font-semibold text-violet-700 dark:text-violet-300 hover:underline">
      <ArrowLeft className="w-4 h-4" aria-hidden="true" /> Back to Templates
    </Link>
  );
}

export default function TemplatePreview() {
  const { slug } = useParams();
  const category = data.categories.find(c => c.templates.some(t => t.slug === slug));
  const t = category?.templates.find(x => x.slug === slug);

  if (!t) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-10">
        <BackLink />
        <p className="mt-6 text-navy-700 dark:text-text-dark-secondary">That template was not found.</p>
      </div>
    );
  }

  const s = templateStructure(t);
  const related = category.templates.filter(x => x.slug !== slug);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-10 overflow-x-hidden">
      <BackLink />
      <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-3">
        <TemplateDownloadButton template={t} />
        <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900 dark:text-text-dark-primary break-words">{t.name}</h1>
      </div>
      <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-navy-600 dark:text-text-dark-secondary">
        <span>{category.name}</span>
        <FrameworkBadges frameworks={t.frameworks} />
      </div>

      <article className="mt-6 rounded-2xl border border-slate-200 dark:border-slate-700/70 bg-white dark:bg-slate-900/60 p-4 sm:p-6 text-sm">
        <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 dark:text-slate-400">{templateFormat(t) === 'xlsx' ? 'Excel workbook structure: a Record sheet and a Document control sheet' : 'Word document structure'}</p>

        <h2 className={H2}>Document control</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <tbody>
              {s.control.map(([k, v]) => (
                <tr key={k}><th scope="row" className={TH + ' w-2/5'}>{k}</th><td className={TD}>{v}</td></tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className={H2}>Purpose</h2>
        <p className="text-navy-700 dark:text-text-dark-secondary">{s.purpose}</p>

        {s.isRecord ? (
          <>
            <h2 className={H2}>Record entries</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse min-w-[28rem]">
                <thead><tr>{s.fields.map(f => <th key={f.field} scope="col" className={TH}>{f.field}</th>)}</tr></thead>
                <tbody>
                  <tr>{s.fields.map(f => <td key={f.field} className={TD + ' italic text-slate-400'}>{f.placeholder}</td>)}</tr>
                  {[1, 2, 3, 4].map(i => <tr key={i}>{s.fields.map(f => <td key={f.field} className={TD}>&nbsp;</td>)}</tr>)}
                </tbody>
              </table>
            </div>
            <h2 className={H2}>Screenshot / attachment</h2>
            <div className="rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-700 p-6 text-center text-slate-500 dark:text-slate-400">
              Space for a screenshot or evidence reference: [System] export or screenshot, captured [Date]
            </div>
            <h2 className={H2}>Reviewed by / Date</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead><tr>{['Reviewed by (role)', 'Date', 'Outcome', 'Signature'].map(h => <th key={h} scope="col" className={TH}>{h}</th>)}</tr></thead>
                <tbody><tr>{['[Role]', '[Date]', '[Enter detail]', ''].map((v, i) => <td key={i} className={TD + ' italic text-slate-400'}>{v || ' '}</td>)}</tr></tbody>
              </table>
            </div>
          </>
        ) : (
          <>
            <h2 className={H2}>Content</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead><tr><th scope="col" className={TH}>Section / field</th><th scope="col" className={TH}>Entry</th></tr></thead>
                <tbody>
                  {s.fields.map(f => <tr key={f.field}><td className={TD}>{f.field}</td><td className={TD + ' italic text-slate-400'}>{f.placeholder}</td></tr>)}
                </tbody>
              </table>
            </div>
            <h2 className={H2}>Approval</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead><tr>{['Approved by (role)', 'Date', 'Signature'].map(h => <th key={h} scope="col" className={TH}>{h}</th>)}</tr></thead>
                <tbody><tr>{['[Role]', '[Date]', ''].map((v, i) => <td key={i} className={TD + ' italic text-slate-400'}>{v || ' '}</td>)}</tr></tbody>
              </table>
            </div>
          </>
        )}
        <p className="mt-6 pt-3 border-t border-slate-200 dark:border-slate-700 text-center text-xs text-slate-500 dark:text-slate-400">Footer: {FOOTER_TEXT}</p>
      </article>

      {related.length > 0 && (
        <section className="mt-8">
          <h2 className="text-lg font-bold text-navy-900 dark:text-text-dark-primary mb-3">Related templates in {category.name}</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {related.map(r => (
              <li key={r.slug}>
                <Link to={`/templates/${r.slug}`} className="block rounded-lg border border-slate-200 dark:border-slate-700 px-3 py-2 text-sm font-medium text-navy-800 dark:text-text-dark-primary hover:border-violet-400 hover:text-violet-700 dark:hover:text-violet-300 break-words">
                  {r.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
