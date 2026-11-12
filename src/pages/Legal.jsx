import { LEGAL_UPDATED, TERMS, PRIVACY, COOKIE_INTRO, STORAGE_ITEMS, COOKIE_SECTIONS, LICENSES_INTRO, LICENSES } from '../data/legal.js';

const H = 'text-gray-900 dark:text-white';
const TXT = 'text-gray-700 dark:text-slate-300';

function Section({ title, body }) {
  return (
    <section className="mb-6">
      <h2 className={`text-lg font-semibold mb-1.5 ${H}`}>{title}</h2>
      {Array.isArray(body) ? (
        <dl className="space-y-2">
          {body.map(([k, v]) => (
            <div key={k}>
              <dt className={`text-sm font-semibold ${H}`}>{k}</dt>
              <dd className={`text-sm ${TXT}`}>{v}</dd>
            </div>
          ))}
        </dl>
      ) : <p className={`text-sm ${TXT}`}>{body}</p>}
    </section>
  );
}

function LegalPage({ title, sections }) {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className={`text-3xl font-serif font-bold mb-1 ${H}`}>{title}</h1>
      <p className="text-sm text-gray-500 dark:text-slate-400 mb-8">Last updated {LEGAL_UPDATED}</p>
      {sections.map(([t, b]) => <Section key={t} title={t} body={b} />)}
    </div>
  );
}

export function TermsPage() { return <LegalPage title="Terms of Use" sections={TERMS} />; }
export function PrivacyPage() { return <LegalPage title="Privacy Policy" sections={PRIVACY} />; }

function Grid({ label, heads, rows }) {
  return (
    <div className="overflow-x-auto rounded border border-gray-200 dark:border-slate-700 mb-6" role="region" aria-label={label} tabIndex={0}>
      <table className="w-full text-sm" style={{ minWidth: 640 }}>
        <thead className="bg-gray-50 dark:bg-slate-800"><tr>{heads.map((h) => <th key={h} scope="col" className={`text-left p-2 font-semibold ${H}`}>{h}</th>)}</tr></thead>
        <tbody>{rows.map((r) => <tr key={r[0]} className="border-t border-gray-200 dark:border-slate-700 align-top">{r.map((c, j) => <td key={j} className={`p-2 ${j === 0 ? `font-semibold ${H}` : TXT}`}>{c}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}

export function CookiePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className={`text-3xl font-serif font-bold mb-1 ${H}`}>Cookie Policy</h1>
      <p className="text-sm text-gray-500 dark:text-slate-400 mb-8">Last updated {LEGAL_UPDATED}</p>
      <p className={`text-sm mb-6 ${TXT}`}>{COOKIE_INTRO}</p>
      <h2 className={`text-lg font-semibold mb-2 ${H}`}>What is stored in your browser</h2>
      <Grid label="Browser storage" heads={['Item', 'Where', 'Purpose', 'How long', 'Category']} rows={STORAGE_ITEMS} />
      {COOKIE_SECTIONS.map(([t, b]) => <Section key={t} title={t} body={b} />)}
    </div>
  );
}

export function LicensesPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className={`text-3xl font-serif font-bold mb-1 ${H}`}>Open-Source Licences and Attributions</h1>
      <p className="text-sm text-gray-500 dark:text-slate-400 mb-8">Last updated {LEGAL_UPDATED}</p>
      <p className={`text-sm mb-6 ${TXT}`}>{LICENSES_INTRO}</p>
      <Grid label="Licences" heads={['Component', 'Licence', 'Attribution or note']} rows={LICENSES} />
    </div>
  );
}
