import { useMemo, useRef, useState } from 'react';
import { Cloud, Copy, Printer, Check, ChevronDown } from 'lucide-react';
import { CLOUDS, COLUMNS, DOMAINS } from '../data/cloudControlTests.js';

const TAB_KEY = 'cct-cloud-tab';
const FW_FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'SOC 2', label: 'SOC 2' },
  { id: 'HIPAA', label: 'HIPAA' },
  { id: 'Both', label: 'Both' },
];

function readTab() {
  try { const v = localStorage.getItem(TAB_KEY); if (CLOUDS.some(c => c.id === v)) return v; } catch { /* storage unavailable */ }
  return 'aws';
}
function saveTab(v) {
  try { localStorage.setItem(TAB_KEY, v); } catch { /* storage unavailable */ }
}
const csvCell = v => `"${String(v ?? '').replace(/"/g, '""')}"`;
const fwMatch = (rowFw, f) => f === 'all' || (f === 'Both' ? rowFw === 'Both' : rowFw === f || rowFw === 'Both');

const PRINT_CSS = `
@media print {
  body * { visibility: hidden !important; }
  #cloud-control-testing, #cloud-control-testing * { visibility: visible !important; }
  #cloud-control-testing { position: absolute; left: 0; top: 0; width: 100%; background: #fff !important; color: #000 !important; border: 0 !important; padding: 0 !important; }
  #cloud-control-testing .cct-no-print, #cloud-control-testing .cct-cards { display: none !important; }
  #cloud-control-testing .cct-table-wrap { display: block !important; overflow: visible !important; }
  #cloud-control-testing table { font-size: 8pt; }
  #cloud-control-testing th, #cloud-control-testing td { color: #000 !important; background: #fff !important; }
}`;

const chip = active => `px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 ${
  active ? 'bg-sky-600 border-sky-600 text-white' : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-sky-400'}`;

export default function CloudControlTesting() {
  const [tab, setTab] = useState(readTab);
  const [domain, setDomain] = useState('all');
  const [fw, setFw] = useState('all');
  const [copied, setCopied] = useState(false);
  const tabRefs = useRef({});

  const cloud = CLOUDS.find(c => c.id === tab) || CLOUDS[0];
  const domainsHere = DOMAINS.filter(d => cloud.rows.some(r => r.d === d));
  const rows = useMemo(
    () => cloud.rows.filter(r => (domain === 'all' || r.d === domain) && fwMatch(r.fw, fw)),
    [cloud, domain, fw],
  );

  const selectTab = id => { setTab(id); saveTab(id); setDomain('all'); };
  const onTabKey = e => {
    const i = CLOUDS.findIndex(c => c.id === tab);
    let n = null;
    if (e.key === 'ArrowRight') n = (i + 1) % CLOUDS.length;
    if (e.key === 'ArrowLeft') n = (i - 1 + CLOUDS.length) % CLOUDS.length;
    if (e.key === 'Home') n = 0;
    if (e.key === 'End') n = CLOUDS.length - 1;
    if (n !== null) { e.preventDefault(); selectTab(CLOUDS[n].id); tabRefs.current[CLOUDS[n].id]?.focus(); }
  };

  const copyCsv = async () => {
    const head = [...COLUMNS.map(c => c[1]), 'Framework scope'];
    const lines = [head.map(csvCell).join(',')].concat(rows.map(r => [...COLUMNS.map(c => r[c[0]]), r.fw].map(csvCell).join(',')));
    const text = lines.join('\n');
    try { await navigator.clipboard.writeText(text); }
    catch {
      const ta = document.createElement('textarea'); ta.value = text; document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); } catch { /* ignore */ } ta.remove();
    }
    setCopied(true); setTimeout(() => setCopied(false), 1800);
  };

  return (
    <section id="cloud-control-testing" aria-labelledby="cct-title" className="scroll-mt-24 rounded-2xl border border-sky-300 dark:border-sky-900/50 bg-gradient-to-r from-sky-50 to-indigo-50 dark:from-sky-950/40 dark:to-indigo-950/40 p-4 sm:p-6 md:p-8 overflow-hidden">
      <style>{PRINT_CSS}</style>
      <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-6">
        <span className="inline-flex w-12 h-12 rounded-xl bg-sky-600 text-white items-center justify-center shrink-0">
          <Cloud className="w-6 h-6" aria-hidden="true" />
        </span>
        <div className="flex-1 min-w-0">
          <h2 id="cct-title" className="text-lg font-extrabold text-navy-900 dark:text-text-dark-primary">Cloud Control Testing Guide: AWS, GCP and Azure</h2>
          <p className="text-sm text-navy-600 dark:text-text-dark-secondary mt-1 max-w-3xl">
            Continuous monitoring platforms check cloud configuration automatically and flag drift, which keeps controls healthy between audits.
            An auditor still tests each control independently, because an automated pass shows a setting at a point in time, not that the control operated across the whole period or that the tool covered every account.
            Testing combines four methods: Inquiry (asking the control owner), Inspection (reviewing configuration and records), Observation (watching the control operate) and Reperformance (re-running the check yourself).
            This guide covers SOC 2 (CC6, CC7, CC8, A1) and the HIPAA Security Rule (164.308, 164.312).
          </p>
        </div>
        <div className="flex gap-2 shrink-0 cct-no-print">
          <button type="button" onClick={copyCsv} className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-lg border border-sky-600 text-sky-700 dark:text-sky-300 text-sm font-semibold hover:bg-sky-100 dark:hover:bg-sky-900/30 transition-colors" aria-label={`Copy ${cloud.label} table as CSV`}>
            {copied ? <Check className="w-4 h-4" aria-hidden="true" /> : <Copy className="w-4 h-4" aria-hidden="true" />} {copied ? 'Copied' : 'Copy table as CSV'}
          </button>
          <button type="button" onClick={() => window.print()} className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-lg bg-sky-600 text-white text-sm font-bold hover:bg-sky-700 transition-colors">
            <Printer className="w-4 h-4" aria-hidden="true" /> Print guide
          </button>
        </div>
      </div>

      <div role="tablist" aria-label="Cloud provider" className="mt-6 flex flex-wrap gap-2 cct-no-print" onKeyDown={onTabKey}>
        {CLOUDS.map(c => (
          <button key={c.id} ref={el => { tabRefs.current[c.id] = el; }} role="tab" id={`cct-tab-${c.id}`} aria-selected={tab === c.id} aria-controls="cct-panel" tabIndex={tab === c.id ? 0 : -1}
            onClick={() => selectTab(c.id)}
            className={`px-4 py-2 rounded-lg text-sm font-bold border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 ${tab === c.id ? 'bg-navy-900 dark:bg-sky-700 text-white border-transparent' : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-700 hover:border-sky-400'}`}>
            {c.label}
          </button>
        ))}
      </div>

      <div id="cct-panel" role="tabpanel" aria-labelledby={`cct-tab-${tab}`} className="mt-4">
        <div className="space-y-2 cct-no-print">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by control domain">
            <button type="button" className={chip(domain === 'all')} aria-pressed={domain === 'all'} onClick={() => setDomain('all')}>All domains</button>
            {domainsHere.map(d => <button key={d} type="button" className={chip(domain === d)} aria-pressed={domain === d} onClick={() => setDomain(d)}>{d}</button>)}
          </div>
          <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter by framework">
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-300 mr-1">Framework:</span>
            {FW_FILTERS.map(f => <button key={f.id} type="button" className={chip(fw === f.id)} aria-pressed={fw === f.id} onClick={() => setFw(f.id)}>{f.label}</button>)}
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">{rows.length} control{rows.length !== 1 ? 's' : ''} shown for {cloud.label}.</p>
        </div>

        {/* Desktop and print: table */}
        <div className="cct-table-wrap hidden md:block mt-4 overflow-x-auto rounded-xl border border-sky-200 dark:border-sky-900/40 bg-white dark:bg-slate-900">
          <table className="min-w-[1400px] w-full text-xs border-collapse">
            <caption className="sr-only">{cloud.label} cloud control tests</caption>
            <thead>
              <tr>
                {COLUMNS.map(([k, label]) => (
                  <th key={k} scope="col" className="text-left align-bottom font-bold px-3 py-2 bg-sky-100 dark:bg-sky-900/40 text-navy-900 dark:text-text-dark-primary border-b border-sky-200 dark:border-sky-900/50">{label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i} className="align-top odd:bg-white even:bg-slate-50 dark:odd:bg-slate-900 dark:even:bg-slate-800/50">
                  {COLUMNS.map(([k]) => (
                    <td key={k} className={`px-3 py-2 border-b border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 ${k === 'cli' ? 'font-mono text-[11px] break-words' : ''} ${k === 'd' ? 'font-semibold whitespace-nowrap' : ''}`}>
                      {r[k]}{k === 'map' && <span className="block mt-1 text-[10px] font-bold uppercase tracking-wide text-sky-700 dark:text-sky-300">{r.fw === 'Both' ? 'SOC 2 and HIPAA' : r.fw}</span>}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile: expandable cards */}
        <div className="cct-cards md:hidden mt-4 space-y-2">
          {rows.map((r, i) => (
            <details key={i} className="group rounded-xl border border-sky-200 dark:border-sky-900/40 bg-white dark:bg-slate-900">
              <summary className="list-none cursor-pointer p-3 flex items-start justify-between gap-2">
                <span className="min-w-0">
                  <span className="block text-[10px] font-bold uppercase tracking-wide text-sky-700 dark:text-sky-300">{r.d}</span>
                  <span className="block text-sm font-semibold text-navy-900 dark:text-text-dark-primary break-words">{r.obj}</span>
                </span>
                <ChevronDown className="w-4 h-4 mt-1 shrink-0 text-slate-400 transition-transform group-open:rotate-180" aria-hidden="true" />
              </summary>
              <dl className="px-3 pb-3 space-y-2 text-xs">
                {COLUMNS.filter(([k]) => k !== 'd' && k !== 'obj').map(([k, label]) => (
                  <div key={k}>
                    <dt className="font-bold text-navy-900 dark:text-text-dark-primary">{label}</dt>
                    <dd className={`text-slate-700 dark:text-slate-200 break-words ${k === 'cli' ? 'font-mono text-[11px]' : ''}`}>{r[k]}</dd>
                  </div>
                ))}
              </dl>
            </details>
          ))}
        </div>
        {rows.length === 0 && <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">No controls match these filters.</p>}
      </div>

      <div className="mt-6 grid md:grid-cols-2 gap-4">
        <div className="rounded-xl bg-white/80 dark:bg-gray-900/60 border border-sky-200 dark:border-sky-900/40 p-4">
          <h3 className="font-bold text-sm text-navy-900 dark:text-text-dark-primary">Sampling and population</h3>
          <ul className="mt-2 space-y-1.5 text-xs text-navy-600 dark:text-text-dark-secondary list-disc pl-4">
            <li>Configuration controls (encryption, logging, public access): test the full population at a point in time, plus evidence that the setting held through the period.</li>
            <li>Event-driven controls (terminations, alerts, vulnerability fixes, change approvals): pull the full population for the period, then sample per the auditor's table, for example 1 for annual, 2 for quarterly and 25 for controls that operate many times a day.</li>
            <li>Confirm population completeness first, before selecting any sample.</li>
            <li>If a population is only partly evidenced, keep it as a draft. Do not submit it incomplete.</li>
          </ul>
        </div>
        <div className="rounded-xl bg-white/80 dark:bg-gray-900/60 border border-sky-200 dark:border-sky-900/40 p-4">
          <h3 className="font-bold text-sm text-navy-900 dark:text-text-dark-primary">Evidence naming and handling</h3>
          <ul className="mt-2 space-y-1.5 text-xs text-navy-600 dark:text-text-dark-secondary list-disc pl-4">
            <li>Name files as <code className="font-mono">&lt;ControlID&gt;_&lt;Cloud&gt;_&lt;Resource&gt;_&lt;YYYY-MM-DD&gt;.&lt;ext&gt;</code>.</li>
            <li>Screenshots show the account or project identifier (redact before publishing), the region and a system timestamp.</li>
            <li>Export CLI output as JSON or CSV, with the command shown at the top of the file.</li>
            <li>Evidence uploaded but not yet reviewed is marked "file uploaded, to review", never "done".</li>
            <li>Superseded evidence is archived and labelled, not deleted.</li>
          </ul>
        </div>
      </div>

      <p className="mt-4 text-[11px] text-slate-600 dark:text-slate-400">
        All commands are read-only. Run them with a least-privilege audit role (for example SecurityAudit and ViewOnlyAccess in AWS, Security Reviewer and Viewer in GCP, Reader and Security Reader in Azure). Replace placeholders such as ACCOUNT_ID, PROJECT_ID and BUCKET_NAME with your own values.
      </p>
    </section>
  );
}
