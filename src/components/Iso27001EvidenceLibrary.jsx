import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import DATA from '../data/iso27001-evidence.json';

const H = 'text-gray-900 dark:text-white';
const TXT = 'text-gray-700 dark:text-slate-300';
const MUTED = 'text-gray-600 dark:text-slate-400';
const LINE = 'border-gray-200 dark:border-slate-700';
const SEC = 'btn btn-secondary px-3 py-1.5 rounded-lg text-sm';
const PILL = 'btn btn-secondary px-3 py-1 rounded-full text-xs';
const STORE = 'onelens_iso27001_evidence_ticks';
const TYPES = ['Policy', 'Procedure', 'Record', 'Automated test', 'Screenshot/Config', 'Report', 'Contract', 'Training'];
const SLUG = Object.fromEntries(DATA.categories.map((c, i) => [DATA.category_slugs[i], c]));
const FOOT = 'Guidance only. Refer to ISO/IEC 27001:2022 for authoritative requirements.';

const readTicks = () => { try { return JSON.parse(localStorage.getItem(STORE) || '{}') || {}; } catch { return {}; } };
const writeTicks = (t) => { try { localStorage.setItem(STORE, JSON.stringify(t)); } catch { /* storage unavailable */ } };
const key = (id, i) => `${id}::${i}`;
const usesCore = (item) => item.evidence.some((e) => /policy|policies|ISMS (scope|policy)|procedure for|Statement of Applicability|master list|communication plan|objectives plan|Incident Response Plan|BC\/DR Plan|Code of Conduct/i.test(e));

function CoreDocs() {
  return (
    <details id="iso-core-docs" className={`border ${LINE} rounded-lg bg-white dark:bg-[#1e293b] scroll-mt-24`}>
      <summary className={`cursor-pointer px-4 py-3 font-semibold ${H}`}>Core ISMS document set</summary>
      <div className="px-4 pb-4 grid md:grid-cols-2 gap-4 text-sm">
        <div>
          <p className={`font-semibold ${H}`}>ISMS documents</p>
          <ul className={`mt-1 list-disc pl-5 ${TXT} space-y-0.5`}>{DATA.core_documents.isms.map((d) => <li key={d}>{d}</li>)}</ul>
        </div>
        <div>
          <p className={`font-semibold ${H}`}>Policies</p>
          <ul className={`mt-1 list-disc pl-5 ${TXT} space-y-0.5`}>{DATA.core_documents.policies.map((d) => <li key={d}>{d}</li>)}</ul>
        </div>
      </div>
    </details>
  );
}

function Card({ item, ticks, onTick }) {
  const [open, setOpen] = useState(false);
  const done = item.evidence.filter((_, i) => ticks[key(item.id, i)]).length;
  const bodyId = `iso-ev-${item.id.replace(/\./g, '-')}`;
  return (
    <div className={`border ${LINE} rounded-lg bg-white dark:bg-[#1e293b] min-w-0`}>
      <button type="button" aria-expanded={open} aria-controls={bodyId} onClick={() => setOpen((o) => !o)}
        className="w-full text-left px-3 py-2.5 flex items-start gap-2 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
        <span aria-hidden="true" className={`mt-0.5 ${MUTED}`}>{open ? '▾' : '▸'}</span>
        <span className="flex-1 min-w-0">
          <span className={`font-mono text-xs ${MUTED}`}>{item.id}</span>
          <span className={`block font-semibold ${H} break-words`}>{item.title}</span>
        </span>
        <span className={`shrink-0 text-xs ${MUTED}`}>{done}/{item.evidence.length}</span>
      </button>
      {open && (
        <div id={bodyId} className="px-3 pb-3 space-y-3 text-sm">
          <p className={TXT}>{item.requirement_summary}</p>
          <fieldset>
            <legend className={`font-semibold ${H}`}>Evidence</legend>
            <ul className="mt-1 space-y-1">
              {item.evidence.map((e, i) => (
                <li key={e}>
                  <label className={`flex items-start gap-2 ${TXT}`}>
                    <input type="checkbox" className="mt-1" checked={!!ticks[key(item.id, i)]} onChange={() => onTick(key(item.id, i))} />
                    <span className="break-words">{e}</span>
                  </label>
                </li>
              ))}
            </ul>
            {usesCore(item) && <a href="#iso-core-docs" className="mt-1 inline-block text-xs ui-link">Uses the core ISMS document set</a>}
          </fieldset>
          <div className="flex flex-wrap gap-1.5">
            {item.evidence_types.map((t) => <span key={t} className="badge badge-neutral text-[11px] px-2 py-0.5">{t}</span>)}
            <span className="badge badge-primary text-[11px] px-2 py-0.5">{item.frequency}</span>
            {item.inherited && <span className="badge badge-warning text-[11px] px-2 py-0.5">Inherited from cloud provider</span>}
          </div>
          <p className={TXT}><span className={`font-semibold ${H}`}>What the auditor samples: </span>{item.auditor_sampling}</p>
        </div>
      )}
    </div>
  );
}

export default function Iso27001EvidenceLibrary() {
  const [cat, setCat] = useState(() => { try { return SLUG[new URLSearchParams(window.location.search).get('cat')] || ''; } catch { return ''; } });
  const [type, setType] = useState('');
  const [inheritedOnly, setInheritedOnly] = useState(false);
  const [q, setQ] = useState('');
  const [ticks, setTicks] = useState(readTicks);

  useEffect(() => {
    if (!cat) return;
    const el = document.getElementById('iso-evidence-library');
    if (el && new URLSearchParams(window.location.search).get('cat')) el.scrollIntoView({ block: 'start' });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onTick = (k) => setTicks((t) => { const n = { ...t, [k]: !t[k] }; if (!n[k]) delete n[k]; writeTicks(n); return n; });
  const reset = () => { setTicks({}); writeTicks({}); };

  const shown = useMemo(() => {
    const t = q.trim().toLowerCase();
    return DATA.items.filter((it) => (!cat || it.category === cat) && (!type || it.evidence_types.includes(type)) && (!inheritedOnly || it.inherited)
      && (!t || `${it.id} ${it.title} ${it.evidence.join(' ')}`.toLowerCase().includes(t)));
  }, [cat, type, inheritedOnly, q]);

  const progress = DATA.categories.map((c) => {
    const its = DATA.items.filter((i) => i.category === c);
    const total = its.reduce((n, i) => n + i.evidence.length, 0);
    const done = its.reduce((n, i) => n + i.evidence.filter((_, k) => ticks[key(i.id, k)]).length, 0);
    return { c, total, done, pct: total ? Math.round((done / total) * 100) : 0 };
  });

  const exportCsv = () => {
    const cols = ['ID', 'Title', 'Category', 'Type', 'Requirement', 'Evidence', 'Evidence Type', 'Frequency', 'Auditor Sampling', 'Inherited'];
    const esc = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`;
    const rows = shown.map((i) => [i.id, i.title, i.category, i.type, i.requirement_summary, i.evidence.join('; '), i.evidence_types.join('; '), i.frequency, i.auditor_sampling, i.inherited ? 'Yes' : 'No']);
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([`﻿${[cols, ...rows].map((r) => r.map(esc).join(',')).join('\r\n')}`], { type: 'text/csv;charset=utf-8' }));
    a.download = 'ISO27001_2022_evidence_library.csv';
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  };

  const groups = DATA.categories.filter((c) => shown.some((i) => i.category === c));

  return (
    <section id="iso-evidence-library" className="max-w-6xl mx-auto px-4 my-10 scroll-mt-24">
      <h2 className={`text-2xl font-serif font-bold ${H}`}>ISO 27001:2022 requirement categories and evidence library</h2>
      <p className={`mt-1 text-sm ${TXT}`}>Every clause from 4.1 to 10.2 and all 93 Annex A controls, with the evidence a certification audit typically looks for. Tick items as you collect them; progress stays in this browser.</p>

      <div className="mt-4"><CoreDocs /></div>

      <div className="mt-4 flex flex-wrap gap-1.5" role="group" aria-label="Requirement category">
        <button type="button" className={PILL} aria-pressed={!cat} onClick={() => setCat('')}>All</button>
        {DATA.categories.map((c) => <button key={c} type="button" className={PILL} aria-pressed={cat === c} onClick={() => setCat(cat === c ? '' : c)}>{c}</button>)}
      </div>

      <div className="mt-3 flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-2">
        <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search ID, title or evidence" aria-label="Search ID, title or evidence" className="ui-input border rounded-lg px-2 py-1.5 text-sm sm:w-64" />
        <select value={type} onChange={(e) => setType(e.target.value)} aria-label="Evidence type" className="ui-input border rounded-lg px-2 py-1.5 text-sm">
          <option value="">All evidence types</option>{TYPES.map((t) => <option key={t}>{t}</option>)}
        </select>
        <label className={`flex items-center gap-2 text-sm ${TXT}`}><input type="checkbox" checked={inheritedOnly} onChange={(e) => setInheritedOnly(e.target.checked)} />Inherited from cloud provider</label>
        <span className={`text-xs ${MUTED}`} aria-live="polite">{shown.length} of {DATA.items.length}</span>
        <div className="flex gap-2 sm:ml-auto">
          <button type="button" className={SEC} onClick={exportCsv}>Export CSV</button>
          <button type="button" className={SEC} onClick={reset}>Reset progress</button>
        </div>
      </div>

      <div className="mt-5 space-y-6">
        {groups.map((c) => {
          const p = progress.find((x) => x.c === c);
          return (
            <div key={c}>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className={`text-lg font-bold ${H}`}>{c}</h3>
                <span className={`text-xs ${MUTED}`}>{p.done} of {p.total} evidence items ticked ({p.pct}%)</span>
              </div>
              <div className="mt-1 h-2 rounded bg-gray-200 dark:bg-slate-700 overflow-hidden" role="progressbar" aria-label={`${c} progress`} aria-valuenow={p.pct} aria-valuemin={0} aria-valuemax={100}>
                <div className="h-full" style={{ width: `${p.pct}%`, background: 'var(--ui-primary)' }} />
              </div>
              {c === DATA.categories[9] && <p className={`mt-2 text-sm ${MUTED}`}>{DATA.physical_note}</p>}
              <div className="mt-2 grid gap-2 md:grid-cols-2">
                {shown.filter((i) => i.category === c).map((i) => <Card key={i.id} item={i} ticks={ticks} onTick={onTick} />)}
              </div>
            </div>
          );
        })}
        {!groups.length && <p className={`text-sm ${MUTED}`}>Nothing matches these filters.</p>}
      </div>
      <p className={`mt-6 text-xs ${MUTED}`}>{FOOT}</p>
    </section>
  );
}

export function Iso27001AuditorSampling() {
  return (
    <section id="iso-auditor-sampling" className="max-w-6xl mx-auto px-4 my-10 scroll-mt-24">
      <h2 className={`text-2xl font-serif font-bold ${H}`}>What the auditor samples, by category</h2>
      <p className={`mt-1 text-sm ${TXT}`}>A quick cross-reference. Each row opens the matching category in the evidence library on the Lead Implementer page.</p>
      <div className="mt-3 grid gap-2 md:grid-cols-2">
        {DATA.categories.map((c, i) => (
          <details key={c} className={`border ${LINE} rounded-lg bg-white dark:bg-[#1e293b]`}>
            <summary className={`cursor-pointer px-3 py-2 text-sm font-semibold ${H}`}>{c}</summary>
            <div className="px-3 pb-3 text-sm">
              <p className={TXT}>{DATA.la_sampling[i]}</p>
              <Link to={`/iso/27001/li?cat=${DATA.category_slugs[i]}`} className="mt-1 inline-block text-xs ui-link">Open this category in the evidence library</Link>
            </div>
          </details>
        ))}
      </div>
      <p className={`mt-3 text-xs ${MUTED}`}>{FOOT}</p>
    </section>
  );
}
