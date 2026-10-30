import { useState } from 'react';
import { ChevronDown, Compass } from 'lucide-react';
import { PRACTICAL_SCENARIOS, SCENARIO_TAGS } from '../../data/riskAssessment/practicalScenarios.js';
import RelatedTemplates from '../templates/RelatedTemplates.jsx';
import { sectionCls, h3Cls, leadCls } from './riskUtils.jsx';

const chip = a => `px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${a ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-surface-300 dark:border-surface-dark-300 text-navy-700 dark:text-text-dark-secondary hover:bg-surface-100 dark:hover:bg-slate-800'}`;

function Block({ title, items, ordered, tone }) {
  const L = ordered ? 'ol' : 'ul';
  return (
    <div className={`rounded-lg p-3 border ${tone}`}>
      <p className="text-[11px] font-bold uppercase tracking-wide mb-1.5">{title}</p>
      <L className={`space-y-1.5 text-sm text-navy-700 dark:text-text-dark-secondary ${ordered ? 'list-decimal' : 'list-disc'} pl-5`}>
        {items.map((x, i) => <li key={i}>{x}</li>)}
      </L>
    </div>
  );
}

export default function PracticalScenarios() {
  const [tag, setTag] = useState('All');
  const [open, setOpen] = useState(PRACTICAL_SCENARIOS[0].id);
  const list = PRACTICAL_SCENARIOS.filter(s => tag === 'All' || s.tag === tag);
  return (
    <section id="ra-scenarios" className={sectionCls}>
      <h3 className={h3Cls}>6. Practical scenarios: what to do when...</h3>
      <p className={leadCls}>Real situations GRC teams face, with a step-by-step approach, what to produce for the auditor, common pitfalls and the templates to use.</p>
      <div className="flex flex-wrap gap-2 mb-4" role="group" aria-label="Filter scenarios">
        {SCENARIO_TAGS.map(t => <button key={t} type="button" aria-pressed={tag === t} className={chip(tag === t)} onClick={() => setTag(t)}>{t}</button>)}
      </div>
      <div className="space-y-2">
        {list.map(s => {
          const isOpen = open === s.id;
          return (
            <div key={s.id} className="rounded-xl border border-surface-300 dark:border-surface-dark-300 bg-white dark:bg-slate-900 overflow-hidden">
              <button type="button" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? null : s.id)} className="w-full flex items-start gap-3 p-4 text-left hover:bg-surface-50 dark:hover:bg-slate-800/60">
                <Compass className="w-5 h-5 mt-0.5 shrink-0 text-indigo-600 dark:text-indigo-300" aria-hidden="true" />
                <span className="flex-1 min-w-0">
                  <span className="block text-[10px] font-bold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">{s.tag}</span>
                  <span className="block font-bold text-navy-900 dark:text-text-dark-primary break-words">{s.title}</span>
                </span>
                <ChevronDown className={`w-4 h-4 mt-1 shrink-0 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
              </button>
              {isOpen && (
                <div className="px-4 pb-4 space-y-3">
                  <div className="grid md:grid-cols-2 gap-3">
                    <Block title="You will recognise it when" items={s.symptoms} tone="bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800 text-amber-800 dark:text-amber-300" />
                    <div className="rounded-lg p-3 border bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800">
                      <p className="text-[11px] font-bold uppercase tracking-wide mb-1.5 text-blue-800 dark:text-blue-300">Why it matters</p>
                      <p className="text-sm text-navy-700 dark:text-text-dark-secondary">{s.why}</p>
                    </div>
                  </div>
                  <Block title="Step-by-step approach" items={s.steps} ordered tone="bg-indigo-50 border-indigo-200 dark:bg-indigo-900/20 dark:border-indigo-800 text-indigo-800 dark:text-indigo-300" />
                  <div className="grid md:grid-cols-2 gap-3">
                    <Block title="What to produce for the auditor" items={s.outputs} tone="bg-emerald-50 border-emerald-200 dark:bg-emerald-900/20 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300" />
                    <Block title="Common pitfalls" items={s.pitfalls} tone="bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800 text-red-800 dark:text-red-300" />
                  </div>
                  <p className="text-xs text-navy-600 dark:text-text-dark-secondary"><span className="font-bold">Framework mapping:</span> {s.map}</p>
                  <RelatedTemplates text={`${s.templates} ${s.map}`} limit={4} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
