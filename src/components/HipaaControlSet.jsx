import { useMemo, useState } from 'react';
import { hipaaControls, HIPAA_CATEGORIES, HIPAA_BA_CE_COMPARE } from '../data/hipaaControlSet.js';
import { RefTable } from './kb/TopicExtras.jsx';

const H = 'text-gray-900 dark:text-white';
const TXT = 'text-gray-700 dark:text-slate-300';
const MUTED = 'text-gray-500 dark:text-slate-400';
const LINE = 'border-gray-200 dark:border-slate-700';
const FIELD = 'ui-input px-2 py-1.5 border rounded-lg text-sm min-w-0';
const BTN = 'btn btn-secondary px-3 py-1.5 rounded-lg text-sm';
const COLS = ['Control ID', 'Control Name', 'Requirement Category', 'HIPAA Citation', 'Required / Addressable', 'Applies To', 'Control Description', 'Evidence Expected', 'Mapped Frameworks'];

const applies = (c) => (c.appliesTo.length === 2 ? 'BA + CE' : c.appliesTo[0] === 'BA' ? 'BA' : 'CE only');
const BADGE = {
  'BA + CE': 'bg-sky-100 text-sky-900 border-sky-300 dark:bg-sky-900/40 dark:text-sky-100 dark:border-sky-700',
  BA: 'bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-900/40 dark:text-emerald-100 dark:border-emerald-700',
  'CE only': 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-900/40 dark:text-amber-100 dark:border-amber-700',
};
const row = (c) => [c.id, c.name, c.category, c.citation, c.requirement, applies(c), c.description, c.evidence.join('; '), c.mapped || ''];

function Control({ c }) {
  const a = applies(c);
  return (
    <div className={`border ${LINE} rounded-lg p-3 bg-white dark:bg-[#1e293b] min-w-0`}>
      <div className="flex flex-wrap items-center gap-2">
        <span className={`text-xs font-mono ${MUTED}`}>{c.id}</span>
        <span className={`text-[11px] px-1.5 py-0.5 rounded border font-semibold ${BADGE[a]}`}>{a}</span>
        <span className={`text-[11px] px-1.5 py-0.5 rounded border ${LINE} ${TXT}`}>{c.requirement}</span>
      </div>
      <p className={`mt-1 font-semibold ${H} break-words`}>{c.name}</p>
      <dl className="mt-1 grid grid-cols-1 md:grid-cols-[10rem_1fr] gap-x-3 gap-y-1 text-sm">
        <dt className={`font-semibold ${H}`}>Requirement Category</dt><dd className={TXT}>{c.category}</dd>
        <dt className={`font-semibold ${H}`}>HIPAA Citation</dt><dd className={`${TXT} break-words`}>{c.citation}</dd>
        <dt className={`font-semibold ${H}`}>Control Description</dt><dd className={`${TXT} break-words`}>{c.description}</dd>
        <dt className={`font-semibold ${H}`}>Evidence Expected</dt>
        <dd><ul className={`list-disc pl-5 ${TXT}`}>{c.evidence.map((e) => <li key={e} className="break-words">{e}</li>)}</ul></dd>
        {c.mapped && <><dt className={`font-semibold ${H}`}>Mapped Frameworks</dt><dd className={`${TXT} break-words`}>{c.mapped}</dd></>}
      </dl>
    </div>
  );
}

function Grouped({ list }) {
  return HIPAA_CATEGORIES.filter((cat) => list.some((c) => c.category === cat)).map((cat) => {
    const items = list.filter((c) => c.category === cat);
    return (
      <details key={cat} open className={`border ${LINE} rounded-lg`}>
        <summary className={`cursor-pointer px-3 py-2 text-sm font-semibold ${H}`}>{cat} <span className={`font-normal ${MUTED}`}>({items.length})</span></summary>
        <div className="p-3 pt-0 space-y-2">{items.map((c) => <Control key={c.id} c={c} />)}</div>
      </details>
    );
  });
}

export default function HipaaControlSet() {
  const [set, setSet] = useState('BA');
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('');
  const [app, setApp] = useState('');
  const [req, setReq] = useState('');

  const inSet = useMemo(() => hipaaControls.filter((c) => (set === 'CE' ? true : c.appliesTo.includes('BA'))), [set]);
  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase();
    return inSet.filter((c) => (!t || row(c).join(' ').toLowerCase().includes(t)) && (!cat || c.category === cat) && (!app || applies(c) === app)
      && (!req || c.requirement.includes(req)));
  }, [inSet, q, cat, app, req]);
  const common = filtered.filter((c) => c.appliesTo.length === 2);
  const baOnly = filtered.filter((c) => c.appliesTo.length === 1 && c.appliesTo[0] === 'BA');
  const ceOnly = filtered.filter((c) => c.appliesTo.length === 1 && c.appliesTo[0] === 'CE');
  const counts = { total: inSet.length, common: inSet.filter((c) => c.appliesTo.length === 2).length, ba: inSet.filter((c) => applies(c) === 'BA').length, ce: inSet.filter((c) => applies(c) === 'CE only').length };

  const exportCsv = () => {
    const q2 = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`;
    const csv = [COLS, ...filtered.map(row)].map((r) => r.map(q2).join(',')).join('\r\n');
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([`﻿${csv}`], { type: 'text/csv;charset=utf-8' }));
    a.download = `HIPAA_${set === 'CE' ? 'Covered_Entity' : 'Business_Associate'}_controls.csv`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  };

  return (
    <section id="hipaa-control-set" className="cheat-sheet max-w-6xl mx-auto px-4 my-10 scroll-mt-24">
      <h2 className={`text-2xl font-serif font-bold ${H}`}>HIPAA control set: Business Associate or Covered Entity</h2>
      <div className={`mt-3 border ${LINE} rounded-lg p-4 bg-white dark:bg-[#1e293b] text-sm ${TXT} space-y-1`}>
        <p><span className={`font-semibold ${H}`}>Covered Entity: </span>health plans, healthcare clearinghouses, and healthcare providers who transmit health information electronically (45 CFR 160.103).</p>
        <p><span className={`font-semibold ${H}`}>Business Associate: </span>a person or vendor that creates, receives, maintains or transmits PHI on behalf of a Covered Entity (for example SaaS, cloud hosting, billing, IT and AI vendors). Subcontractors of a BA are also BAs.</p>
        <p className={MUTED}>A Covered Entity that also performs services for other CEs selects both. Selecting Covered Entity always includes every Business Associate requirement plus the CE-only requirements.</p>
      </div>

      <div className="no-print mt-4 flex flex-wrap items-center gap-2" role="group" aria-label="Control set">
        {[['BA', 'Business Associate'], ['CE', 'Covered Entity (+ Business Associate)']].map(([k, l]) => (
          <button key={k} type="button" aria-pressed={set === k} onClick={() => setSet(k)}
            className="btn btn-secondary px-3 py-1.5 rounded-full text-sm">{l}</button>
        ))}
      </div>
      <p className={`mt-2 text-sm ${TXT}`} aria-live="polite">
        <span className={`font-semibold ${H}`}>{counts.total}</span> requirements · {counts.common} common · {counts.ba} BA-specific · {counts.ce} CE-only
      </p>

      <div className="no-print mt-3 flex flex-col sm:flex-row sm:flex-wrap gap-2">
        <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search controls" aria-label="Search controls" className={`${FIELD} sm:w-56`} />
        <select value={cat} onChange={(e) => setCat(e.target.value)} aria-label="Requirement Category" className={FIELD}>
          <option value="">All categories</option>{HIPAA_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <select value={app} onChange={(e) => setApp(e.target.value)} aria-label="Applies To" className={FIELD}>
          <option value="">Applies to: all</option><option>BA + CE</option><option>BA</option>{set === 'CE' && <option>CE only</option>}
        </select>
        <select value={req} onChange={(e) => setReq(e.target.value)} aria-label="Required or Addressable" className={FIELD}>
          <option value="">Required and addressable</option><option value="Required">Required</option><option value="Addressable">Addressable</option>
        </select>
        <button type="button" className={BTN} onClick={exportCsv}>Export CSV</button>
        <button type="button" className={BTN} onClick={() => { document.body.dataset.printSheet = 'hipaa-control-set'; window.print(); setTimeout(() => { delete document.body.dataset.printSheet; }, 500); }}>Print / PDF</button>
        <span className={`self-center text-xs ${MUTED}`}>{filtered.length} shown</span>
      </div>

      <div className="mt-5 space-y-6">
        <div>
          <h3 className={`text-lg font-bold ${H}`}>A. Common requirements (BA and CE)</h3>
          <div className="mt-2 space-y-2">{common.length ? <Grouped list={common} /> : <p className={`text-sm ${MUTED}`}>No common controls match the filters.</p>}</div>
        </div>
        <div>
          <h3 className={`text-lg font-bold ${H}`}>B. Differences: Business Associate obligations</h3>
          <div className="mt-2 space-y-2">{baOnly.length ? <Grouped list={baOnly} /> : <p className={`text-sm ${MUTED}`}>No BA controls match the filters.</p>}</div>
        </div>
        <div>
          <h3 className={`text-lg font-bold ${H}`}>C. Differences: Covered Entity only obligations</h3>
          {set === 'CE' ? (
            <div className="mt-2 space-y-2">{ceOnly.length ? <Grouped list={ceOnly} /> : <p className={`text-sm ${MUTED}`}>No CE controls match the filters.</p>}</div>
          ) : (
            <details className={`mt-2 border ${LINE} rounded-lg`}>
              <summary className={`cursor-pointer px-3 py-2 text-sm ${TXT}`}>Not applicable to Business Associates. Select Covered Entity to view.</summary>
            </details>
          )}
        </div>
        <div>
          <h3 className={`text-lg font-bold ${H}`}>D. Side-by-side: Business Associate and Covered Entity</h3>
          <div className="mt-2"><RefTable label="BA and CE compared" columns={['Topic', 'Business Associate', 'Covered Entity']} rows={HIPAA_BA_CE_COMPARE} /></div>
        </div>
      </div>
      <p className={`mt-4 text-xs ${MUTED}`}>Control structure based on the HIPAA Security, Privacy and Breach Notification Rules (45 CFR Parts 160 and 164). Validate scope against your GRC platform and legal counsel.</p>
    </section>
  );
}
