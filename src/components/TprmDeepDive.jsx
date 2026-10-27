import { useState } from 'react';
import { ChevronDown, ChevronRight, BookOpenCheck } from 'lucide-react';
import { DEEP_DIVE } from '../data/tprmDeepDive';

function DataTable({ caption, table }) {
  return (
    <div className="mb-4">
      <p className="text-xs font-semibold text-navy-700 dark:text-text-dark-secondary mb-1.5">{caption}</p>
      <div className="overflow-x-auto rounded-lg border border-surface-200 dark:border-surface-dark-200">
        <table className="w-full text-xs">
          <thead className="bg-surface-100 dark:bg-slate-800">
            <tr>{table.headers.map((h, i) => <th key={i} className="text-left p-2 font-semibold text-navy-900 dark:text-text-dark-primary">{h}</th>)}</tr>
          </thead>
          <tbody>
            {table.rows.map((r, i) => (
              <tr key={i} className="border-t border-surface-200 dark:border-surface-dark-200 align-top">
                {r.map((c, j) => <td key={j} className={`p-2 text-navy-700 dark:text-text-dark-secondary ${j === 0 ? 'font-medium text-navy-900 dark:text-text-dark-primary' : ''}`}>{c}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ItemList({ caption, items, ordered, check }) {
  const Tag = ordered ? 'ol' : 'ul';
  return (
    <div className="mb-4">
      <p className="text-xs font-semibold text-navy-700 dark:text-text-dark-secondary mb-1.5">{caption}</p>
      <Tag className={`text-xs text-navy-700 dark:text-text-dark-secondary space-y-1 ${ordered ? 'list-decimal pl-5' : check ? '' : 'list-disc pl-5'}`}>
        {items.map((it) => (
          <li key={it} className={check ? 'flex items-start gap-2' : ''}>
            {check && <span aria-hidden="true" className="text-red-600 dark:text-red-300 shrink-0">⚑</span>}
            <span>{it}</span>
          </li>
        ))}
      </Tag>
    </div>
  );
}

export default function TprmDeepDive() {
  const [open, setOpen] = useState('residual');
  return (
    <section id="tprm-deep-dive" className="mt-12 scroll-mt-24">
      <div className="flex items-start gap-3 mb-4">
        <BookOpenCheck className="w-6 h-6 text-sky-600 shrink-0 mt-1" aria-hidden="true" />
        <div>
          <h3 className="text-2xl font-bold text-navy-900 dark:text-text-dark-primary">TPRM practitioner deep dive</h3>
          <p className="text-sm text-navy-600 dark:text-text-dark-secondary max-w-3xl">
            Residual risk, evidence review red flags, questionnaires, frameworks, KRIs and program operations. For interview practice, open the Interview Preparation Hub and choose the TPRM / Vendor Risk track.
          </p>
        </div>
      </div>
      <div className="space-y-2">
        {DEEP_DIVE.map((s) => {
          const isOpen = open === s.id;
          return (
            <div key={s.id} className="rounded-xl border border-surface-300 dark:border-surface-dark-300 bg-white dark:bg-surface-dark-100">
              <button type="button" onClick={() => setOpen(isOpen ? null : s.id)} aria-expanded={isOpen} className="w-full flex items-center gap-2 p-4 text-left">
                {isOpen ? <ChevronDown className="w-4 h-4 text-gray-500 shrink-0" /> : <ChevronRight className="w-4 h-4 text-gray-500 shrink-0" />}
                <span className="font-semibold text-navy-900 dark:text-text-dark-primary">{s.title}</span>
              </button>
              {isOpen && (
                <div className="px-4 pb-4">
                  <p className="text-sm text-navy-700 dark:text-text-dark-secondary mb-4">{s.lead}</p>
                  {(s.tables || []).map((t) => <DataTable key={t.caption} {...t} />)}
                  {(s.lists || []).map((l) => <ItemList key={l.caption} {...l} />)}
                  {s.note && <p className="text-xs rounded-lg p-3 bg-sky-50 dark:bg-sky-950/30 text-sky-900 dark:text-sky-200">{s.note}</p>}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
