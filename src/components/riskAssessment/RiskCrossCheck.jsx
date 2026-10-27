import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronRight, ArrowRight } from 'lucide-react';
import { CROSSWALK, CROSSWALK_BY_ID } from '../../data/riskAssessment/crosswalk';

function FrameworkRows({ fw }) {
  const [open, setOpen] = useState(null);
  return (
    <ul className="space-y-1.5">
      {fw.rows.map((r) => {
        const isOpen = open === r.ref;
        return (
          <li key={r.ref} className="rounded-lg border border-surface-200 dark:border-surface-dark-200 bg-white dark:bg-surface-dark-100">
            <button type="button" onClick={() => setOpen(isOpen ? null : r.ref)} aria-expanded={isOpen} className="w-full flex items-start gap-2 px-3 py-2 text-left">
              {isOpen ? <ChevronDown className="w-3.5 h-3.5 mt-0.5 shrink-0 text-gray-500" /> : <ChevronRight className="w-3.5 h-3.5 mt-0.5 shrink-0 text-gray-500" />}
              <span className="font-mono text-[11px] font-bold text-indigo-700 dark:text-indigo-300 shrink-0 w-28">{r.ref}</span>
              <span className="text-xs text-navy-900 dark:text-text-dark-primary">{r.requirement}</span>
            </button>
            {isOpen && (
              <div className="px-3 pb-3 grid gap-3 md:grid-cols-3 text-xs text-navy-700 dark:text-text-dark-secondary">
                <div>
                  <p className="font-semibold text-navy-900 dark:text-text-dark-primary mb-1">What to do</p>
                  <p>{r.whatToDo}</p>
                  <p className="mt-1"><strong>Controls:</strong> {r.controls.join(', ')}</p>
                </div>
                <div>
                  <p className="font-semibold text-navy-900 dark:text-text-dark-primary mb-1">Tests</p>
                  <ul className="list-disc pl-4 space-y-0.5">{r.tests.map((t) => <li key={t}>{t}</li>)}</ul>
                </div>
                <div>
                  <p className="font-semibold text-navy-900 dark:text-text-dark-primary mb-1">Evidence</p>
                  <ul className="list-disc pl-4 space-y-0.5">{r.evidence.map((e) => <li key={e}>{e}</li>)}</ul>
                </div>
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}

/** Drop-in block for a framework playbook page. */
export function RiskCrossCheckBlock({ frameworkId }) {
  const fw = CROSSWALK_BY_ID[frameworkId];
  if (!fw) return null;
  return (
    <section id="risk-assessment-crosscheck" className="max-w-6xl mx-auto px-4 my-10">
      <div className="rounded-2xl border border-indigo-200 dark:border-indigo-900/50 bg-indigo-50/60 dark:bg-indigo-950/20 p-5 md:p-6">
        <div className="flex flex-col sm:flex-row sm:items-start gap-3 mb-4">
          <div className="flex-1">
            <h2 className="text-lg font-bold text-navy-900 dark:text-text-dark-primary">Risk assessment for {fw.name}</h2>
            <p className="text-sm text-navy-600 dark:text-text-dark-secondary mt-1">{fw.summary}</p>
          </div>
          <Link to="/#risk-assessment" className="inline-flex items-center gap-1.5 shrink-0 px-3 py-2 rounded-lg bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700">
            Open Risk Assessment module <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <FrameworkRows fw={fw} />
      </div>
    </section>
  );
}

/** Section 7 inside the module: every framework in one place. */
export default function RiskCrossCheck() {
  const [fwId, setFwId] = useState(CROSSWALK[0].id);
  const fw = CROSSWALK_BY_ID[fwId];
  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-3" role="tablist" aria-label="Framework">
        {CROSSWALK.map((f) => (
          <button
            key={f.id}
            type="button"
            role="tab"
            aria-selected={fwId === f.id}
            onClick={() => setFwId(f.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${fwId === f.id ? 'bg-indigo-600 text-white border-indigo-600' : 'border-surface-300 dark:border-surface-dark-300 text-navy-700 dark:text-text-dark-secondary hover:bg-surface-100 dark:hover:bg-slate-800'}`}
          >
            {f.name}
          </button>
        ))}
      </div>
      <p className="text-sm text-navy-600 dark:text-text-dark-secondary mb-3">{fw.summary}</p>
      <FrameworkRows key={fw.id} fw={fw} />
    </div>
  );
}
