import { useState } from 'react';
import { CONTROLS } from '../../data/riskAssessment/controls';
import { CONTROL_CIA } from '../../data/riskAssessment/controlCia';

const TONE = { C: 'sky', I: 'violet', A: 'emerald' };
const P_CLS = { sky: 'bg-sky-600 text-white', violet: 'bg-violet-600 text-white', emerald: 'bg-emerald-600 text-white' };
const S_CLS = { sky: 'border border-sky-400 text-sky-700 dark:text-sky-300', violet: 'border border-violet-400 text-violet-700 dark:text-violet-300', emerald: 'border border-emerald-400 text-emerald-700 dark:text-emerald-300' };
const LABEL = { C: 'Confidentiality', I: 'Integrity', A: 'Availability' };

export function CiaBadges({ id, size = 'sm' }) {
  const m = CONTROL_CIA[id]; if (!m) return null;
  const sz = size === 'sm' ? 'w-5 h-5 text-[10px]' : 'w-7 h-7 text-xs';
  return (
    <span className="inline-flex gap-1 shrink-0" aria-label={['C', 'I', 'A'].filter(k => m[k]).map(k => `${LABEL[k]} ${m[k] === 'P' ? 'primary' : 'supporting'}`).join(', ')}>
      {['C', 'I', 'A'].map(k => m[k]
        ? <span key={k} title={`${LABEL[k]}: ${m[k] === 'P' ? 'primary' : 'supporting'}`} className={`inline-flex items-center justify-center rounded-full font-bold ${sz} ${m[k] === 'P' ? P_CLS[TONE[k]] : S_CLS[TONE[k]]}`}>{k}</span>
        : <span key={k} className={`inline-flex items-center justify-center rounded-full ${sz} text-gray-300 dark:text-gray-600`} aria-hidden="true">·</span>)}
    </span>
  );
}

export default function ControlCiaMap() {
  const [f, setF] = useState('All');
  const rows = CONTROLS.filter(c => f === 'All' || CONTROL_CIA[c.id]?.[f] === 'P');
  const count = k => CONTROLS.filter(c => CONTROL_CIA[c.id]?.[k] === 'P').length;
  return (
    <div id="ra-cia" className="mt-6 scroll-mt-24">
      <h4 className="font-semibold text-sm text-navy-900 dark:text-text-dark-primary mb-1">CIA mapping for every control</h4>
      <p className="text-xs text-navy-600 dark:text-text-dark-secondary mb-3">Filled circle = primary protection; outlined = supporting. Governance controls support all three indirectly. Use this to check that each risk's CIA impact is covered by at least one primary control.</p>
      <div className="grid grid-cols-2 gap-2 mb-3">
        {['C', 'I', 'A'].map(k => <button key={k} type="button" aria-pressed={f === k} onClick={() => setF(f === k ? 'All' : k)} className={`rounded-xl p-3 text-left border ${f === k ? 'ring-2 ring-offset-1 ring-indigo-400' : ''} ${S_CLS[TONE[k]]}`}>
          <span className="block text-2xl font-bold">{count(k)}</span><span className="text-xs font-semibold">{LABEL[k]} (primary)</span></button>)}
      </div>
      <div className="overflow-x-auto rounded-xl border border-surface-200 dark:border-surface-dark-200">
        <table className="w-full text-xs min-w-[720px]">
          <thead><tr className="bg-surface-50 dark:bg-slate-800">{['Control', 'Name', 'C', 'I', 'A', 'Why'].map(h => <th key={h} scope="col" className="px-3 py-2 text-left font-bold text-navy-700 dark:text-text-dark-secondary">{h}</th>)}</tr></thead>
          <tbody className="divide-y divide-surface-200 dark:divide-surface-dark-200">
            {rows.map(c => { const m = CONTROL_CIA[c.id] || {}; return (
              <tr key={c.id}>
                <td className="px-3 py-2 font-mono text-indigo-700 dark:text-indigo-300">{c.id}</td>
                <td className="px-3 py-2 font-medium text-navy-900 dark:text-text-dark-primary">{c.name}</td>
                {['C', 'I', 'A'].map(k => <td key={k} className="px-3 py-2 text-center">{m[k] ? <span className={`inline-flex items-center justify-center w-5 h-5 rounded-full font-bold text-[10px] ${m[k] === 'P' ? P_CLS[TONE[k]] : S_CLS[TONE[k]]}`}>{m[k] === 'P' ? '●' : '○'}</span> : <span className="text-gray-300 dark:text-gray-600">–</span>}</td>)}
                <td className="px-3 py-2 text-navy-600 dark:text-text-dark-secondary">{m.why}</td>
              </tr>); })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
