import { useEffect, useMemo, useState } from 'react';
import { buildStyledXlsx } from '../../utils/styledXlsx.js';

// NIST CSF 2.0 gap self-assessment (Module B). Runs fully in the browser.
// Scores are kept only in this browser (localStorage) and never sent to a server.
const KEY = 'onelens-csf-gap-v1';
const H = 'text-gray-900 dark:text-white';
const TXT = 'text-gray-700 dark:text-slate-300';
const LINE = 'border-gray-200 dark:border-slate-700';

export const CSF_CATEGORIES = [
  ['Govern', 'GV.OC', 'Organisational context'], ['Govern', 'GV.RM', 'Risk management strategy'], ['Govern', 'GV.RR', 'Roles, responsibilities and authorities'],
  ['Govern', 'GV.PO', 'Policy'], ['Govern', 'GV.OV', 'Oversight'], ['Govern', 'GV.SC', 'Cybersecurity supply chain risk management'],
  ['Identify', 'ID.AM', 'Asset management'], ['Identify', 'ID.RA', 'Risk assessment'], ['Identify', 'ID.IM', 'Improvement'],
  ['Protect', 'PR.AA', 'Identity management, authentication and access control'], ['Protect', 'PR.AT', 'Awareness and training'], ['Protect', 'PR.DS', 'Data security'],
  ['Protect', 'PR.PS', 'Platform security'], ['Protect', 'PR.IR', 'Technology infrastructure resilience'],
  ['Detect', 'DE.CM', 'Continuous monitoring'], ['Detect', 'DE.AE', 'Adverse event analysis'],
  ['Respond', 'RS.MA', 'Incident management'], ['Respond', 'RS.AN', 'Incident analysis'], ['Respond', 'RS.CO', 'Incident response reporting and communication'], ['Respond', 'RS.MI', 'Incident mitigation'],
  ['Recover', 'RC.RP', 'Incident recovery plan execution'], ['Recover', 'RC.CO', 'Incident recovery communication'],
];
const FUNCTIONS = ['Govern', 'Identify', 'Protect', 'Detect', 'Respond', 'Recover'];
const TIERS = [['1', 'Partial'], ['2', 'Risk informed'], ['3', 'Repeatable'], ['4', 'Adaptive']];

const CROSSWALK = [
  ['Govern (GV)', 'New function. Pulls in CSF 1.1 ID.GV (governance), ID.RM (risk management strategy) and ID.SC (supply chain).'],
  ['PR.AC (1.1)', 'Becomes PR.AA (identity, authentication and access). Remote access and network integrity move to PR.IR.'],
  ['PR.IP, PR.MA, PR.PT (1.1)', 'Spread across PR.PS (platform security), PR.IR (resilience) and PR.DS (data security). Policy items move to GV.PO.'],
  ['DE.DP (1.1)', 'Removed as a category; detection process items fold into DE.AE and DE.CM.'],
  ['RS.RP, RS.IM, RC.IM (1.1)', 'Response planning becomes RS.MA. Improvement items from all functions move to ID.IM.'],
];

const load = () => { try { return JSON.parse(window.localStorage.getItem(KEY)) || {}; } catch { return {}; } };

export default function CsfGapAssessment() {
  const [data, setData] = useState(load);
  useEffect(() => { try { window.localStorage.setItem(KEY, JSON.stringify(data)); } catch { /* storage unavailable: keep in memory */ } }, [data]);
  const set = (id, k, v) => setData((d) => ({ ...d, [id]: { ...d[id], [k]: v } }));
  const gap = (id) => { const e = data[id] || {}; return e.current && e.target ? Math.max(0, Number(e.target) - Number(e.current)) : null; };

  const byFn = useMemo(() => FUNCTIONS.map((f) => {
    const cats = CSF_CATEGORIES.filter((c) => c[0] === f);
    const scored = cats.filter((c) => data[c[1]]?.current && data[c[1]]?.target);
    const avg = (k) => (scored.length ? scored.reduce((s, c) => s + Number(data[c[1]][k]), 0) / scored.length : 0);
    return { f, current: avg('current'), target: avg('target'), scored: scored.length, total: cats.length };
  }), [data]);
  const top = CSF_CATEGORIES.map((c) => [c, gap(c[1])]).filter(([, g]) => g > 0).sort((a, b) => b[1] - a[1]).slice(0, 5);

  const exportXlsx = async () => {
    const rows = CSF_CATEGORIES.map(([f, id, name]) => { const e = data[id] || {}; return [f, id, name, e.current || '', e.target || '', gap(id) ?? '', e.owner || '', e.remediation || '', e.due || '']; });
    const blob = await buildStyledXlsx([{ name: 'CSF gap assessment', columns: ['Function', 'Category', 'Name', 'Current tier', 'Target tier', 'Gap', 'Owner', 'Remediation', 'Due date'], rows, widths: [12, 10, 40, 12, 12, 8, 18, 44, 12] }]);
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'NIST_CSF_2_Gap_Assessment.xlsx'; a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  };

  const sel = 'ui-input rounded border px-1.5 py-1 text-sm w-full';
  return (
    <section id="csf-gap" className={`border-t pt-8 ${LINE} scroll-mt-20`}>
      <h2 className={`text-2xl font-serif font-bold ${H}`}>NIST CSF 2.0 gap self-assessment</h2>
      <p className={`mt-3 max-w-3xl leading-relaxed ${TXT}`}>Score each of the 22 CSF 2.0 categories for where you are today and where you need to be, using the four CSF tiers. The gap shows where to invest first. Your answers are saved only in this browser and are never sent anywhere. Clearing browser data removes them, so export to Excel to keep a copy.</p>

      <details className={`mt-4 rounded border ${LINE} p-3`}>
        <summary className={`cursor-pointer font-semibold ${H}`}>How to run a CSF gap analysis</summary>
        <ol className={`mt-2 list-decimal pl-5 space-y-1 text-sm ${TXT}`}>
          {['Agree scope and the target tier with leadership, based on risk appetite and customer or regulatory needs.', 'For each category, interview the owners and look at evidence before scoring the current tier.', 'Record the gap, an owner and a remediation action with a date for every category below target.', 'Prioritise the largest gaps in Govern, Protect and Detect first.', 'Report the result to management and rescore every 6 to 12 months.'].map((x) => <li key={x}>{x}</li>)}
        </ol>
        <p className={`mt-3 text-sm font-semibold ${H}`}>CSF 1.1 to 2.0 crosswalk (main changes)</p>
        <ul className={`mt-1 list-disc pl-5 space-y-1 text-sm ${TXT}`}>{CROSSWALK.map(([a, b]) => <li key={a}><span className="font-medium">{a}:</span> {b}</li>)}</ul>
        <p className={`mt-2 text-sm ${TXT}`}>Tiers: 1 Partial, 2 Risk informed, 3 Repeatable, 4 Adaptive.</p>
      </details>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <button type="button" onClick={exportXlsx} className="btn btn-secondary px-3 py-1.5 rounded-lg text-sm">Export to Excel</button>
        <button type="button" onClick={() => { if (window.confirm('Clear all scores in this browser?')) setData({}); }} className="btn btn-ghost px-3 py-1.5 rounded-lg text-sm">Clear</button>
      </div>

      <div className="mt-4 grid gap-2" aria-label="Gap summary by function">
        {byFn.map((r) => (
          <div key={r.f} className="grid grid-cols-[90px_1fr_auto] items-center gap-2 text-sm">
            <span className={`font-medium ${H}`}>{r.f}</span>
            <div className="relative h-3 rounded bg-gray-100 dark:bg-slate-800" role="img" aria-label={`${r.f}: current ${r.current.toFixed(1)}, target ${r.target.toFixed(1)}`}>
              <div className="absolute inset-y-0 left-0 rounded bg-gray-300 dark:bg-slate-600" style={{ width: `${(r.target / 4) * 100}%` }} />
              <div className="absolute inset-y-0 left-0 rounded bg-[#344c67] dark:bg-slate-300" style={{ width: `${(r.current / 4) * 100}%` }} />
            </div>
            <span className={`text-xs ${TXT}`}>{r.scored ? `${r.current.toFixed(1)} of ${r.target.toFixed(1)}` : `0 of ${r.total} scored`}</span>
          </div>
        ))}
        <p className={`text-xs ${TXT}`}>Dark bar: average current tier. Light bar: average target tier.</p>
      </div>
      {top.length > 0 && <p className={`mt-3 text-sm ${TXT}`}><span className="font-semibold">Largest gaps:</span> {top.map(([c, g]) => `${c[1]} ${c[2]} (${g})`).join('; ')}</p>}

      <div className="mt-4 space-y-3">
        {CSF_CATEGORIES.map(([f, id, name]) => {
          const e = data[id] || {};
          return (
            <div key={id} className={`rounded border ${LINE} p-3`}>
              <p className={`text-sm font-semibold ${H}`}>{id} {name} <span className={`font-normal text-xs ${TXT}`}>({f}){gap(id) !== null ? `, gap ${gap(id)}` : ''}</span></p>
              <div className="mt-2 grid grid-cols-2 sm:grid-cols-5 gap-2">
                <label className={`text-xs ${TXT}`}>Current<select className={sel} value={e.current || ''} onChange={(ev) => set(id, 'current', ev.target.value)}><option value="">-</option>{TIERS.map(([v, l]) => <option key={v} value={v}>{v} {l}</option>)}</select></label>
                <label className={`text-xs ${TXT}`}>Target<select className={sel} value={e.target || ''} onChange={(ev) => set(id, 'target', ev.target.value)}><option value="">-</option>{TIERS.map(([v, l]) => <option key={v} value={v}>{v} {l}</option>)}</select></label>
                <label className={`text-xs ${TXT}`}>Owner<input className={sel} value={e.owner || ''} onChange={(ev) => set(id, 'owner', ev.target.value)} /></label>
                <label className={`text-xs ${TXT} col-span-2 sm:col-span-1`}>Due date<input type="date" className={sel} value={e.due || ''} onChange={(ev) => set(id, 'due', ev.target.value)} /></label>
                <label className={`text-xs ${TXT} col-span-2 sm:col-span-1`}>Remediation<input className={sel} value={e.remediation || ''} onChange={(ev) => set(id, 'remediation', ev.target.value)} /></label>
              </div>
            </div>
          );
        })}
      </div>
      <p className={`mt-3 text-xs ${TXT}`}>Source: NIST Cybersecurity Framework 2.0 (NIST CSWP 29, February 2024). Last verified: 17 Nov 2026.</p>
    </section>
  );
}
