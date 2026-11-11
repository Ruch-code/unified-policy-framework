import { LEGAL_UPDATED, TERMS, PRIVACY } from '../data/legal.js';

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
