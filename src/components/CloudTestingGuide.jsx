import { useEffect, useState } from 'react';
import { Check, Copy, ChevronDown } from 'lucide-react';
import CloudControlTesting from './CloudControlTesting.jsx';
import { INTRO, METHODS, TABLE_COLUMNS, AREAS, MONITORING_LIMITS, EVIDENCE, SAMPLING, PARTS } from '../data/cloudTestingGuide.js';

// Knowledge Base topic: Cloud Control Testing Guide (moved from the home page Regional tab and expanded).
// Side panel lists each part, highlights the one in view, and collapses on phones.
const H2 = 'text-lg font-bold text-navy-900 dark:text-text-dark-primary mb-3 scroll-mt-24';
const P = 'text-sm text-gray-700 dark:text-text-dark-secondary';
const TH = 'p-2 text-left font-semibold text-navy-900 dark:text-text-dark-primary bg-surface-50 dark:bg-slate-800 align-top';
const TD = 'p-2 align-top border-t border-surface-200 dark:border-surface-dark-200 text-gray-700 dark:text-text-dark-secondary';
const CARD = 'rounded-2xl border border-surface-200 dark:border-surface-dark-200 bg-white dark:bg-slate-900/60 p-4 md:p-6 mb-6';

// Only full CLI commands get a copy button; field names and values are shown as code only.
const isCommand = (t) => /^(aws|gcloud|az) /.test(t);

function CopyCode({ text }) {
  const [done, setDone] = useState(false);
  const copy = () => {
    try { navigator.clipboard?.writeText(text); setDone(true); setTimeout(() => setDone(false), 1200); } catch { /* clipboard unavailable */ }
  };
  return (
    <span className="inline">
      <code className="font-mono text-[11px] [overflow-wrap:anywhere] rounded bg-surface-100 dark:bg-slate-800 px-1 py-0.5 text-navy-900 dark:text-slate-100">{text}</code>
      {isCommand(text) && <button type="button" onClick={copy} aria-label={`Copy command ${text}`} className="ml-0.5 align-middle p-0.5 rounded text-gray-500 hover:text-sky-700 dark:hover:text-sky-300">
        {done ? <Check className="w-3 h-3" aria-hidden="true" /> : <Copy className="w-3 h-3" aria-hidden="true" />}
      </button>}
    </span>
  );
}

// Render text with `code` segments as copyable commands.
function Rich({ text }) {
  if (!text) return null;
  const parts = String(text).split(/(`[^`]+`)/g);
  return <>{parts.map((s, i) => (s.startsWith('`') && s.endsWith('`') ? <CopyCode key={i} text={s.slice(1, -1)} /> : <span key={i}>{s}</span>))}</>;
}

function Table({ head, rows, min = 700, label }) {
  return (
    <div className="overflow-x-auto" tabIndex={0} role="region" aria-label={label || head.join(', ')}>
      <table className="w-full text-sm" style={{ minWidth: min }}>
        <thead><tr>{head.map((h) => <th key={h} scope="col" className={TH}>{h}</th>)}</tr></thead>
        <tbody>{rows.map((r, i) => <tr key={i}>{r.map((c, j) => <td key={j} className={`${TD} ${j === 0 ? 'font-medium whitespace-nowrap' : ''}`}><Rich text={c} /></td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}

function AreaTable({ area }) {
  return (
    <div className="overflow-x-auto" tabIndex={0} role="region" aria-label={`${area.title} test procedures`}>
      <table className="w-full text-sm table-fixed min-w-[1500px]">
        <colgroup>{[110, 140, 270, 270, 270, 130, 160, 150].map((w, i) => <col key={i} style={{ width: w }} />)}</colgroup>
        <thead><tr>{TABLE_COLUMNS.map((h) => <th key={h} scope="col" className={TH}>{h}</th>)}</tr></thead>
        <tbody>
          {area.rows.map((r, i) => (
            <tr key={`${r.id}-${i}`}>
              <td className={`${TD} font-medium whitespace-nowrap`}>{r.id}</td>
              <td className={TD}>{r.obj}</td>
              {r.all && !r.aws ? (
                <td className={TD} colSpan={3}><span className="font-semibold">All clouds: </span><Rich text={r.all} /></td>
              ) : (
                ['aws', 'gcp', 'azure'].map((c) => <td key={c} className={TD}><Rich text={r[c]} /></td>)
              )}
              <td className={TD}>{r.method}</td>
              <td className={TD}>{r.ev}</td>
              <td className={TD}>{r.exc}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {area.rows.filter((r) => r.note || (r.all && r.aws)).map((r, i) => (
        <p key={i} className={`mt-2 ${P}`}><span className="font-semibold">{r.id}, {r.obj}: </span><Rich text={r.all && r.aws ? `All clouds: ${r.all}` : r.note} /></p>
      ))}
    </div>
  );
}

function SidePanel({ active }) {
  const [open, setOpen] = useState(false);
  const links = (
    <ul className="space-y-0.5">
      {PARTS.map(([id, label]) => (
        <li key={id}>
          <a href={`#cct-${id}`} onClick={() => setOpen(false)} aria-current={active === id ? 'true' : undefined}
            className={`block rounded-md px-2 py-1 text-sm transition-colors ${active === id ? 'bg-sky-100 text-sky-800 font-semibold dark:bg-sky-900/40 dark:text-sky-200' : 'text-gray-700 dark:text-text-dark-secondary hover:bg-surface-100 dark:hover:bg-slate-800'}`}>{label}</a>
        </li>
      ))}
    </ul>
  );
  return (
    <nav aria-label="Cloud Control Testing Guide sections" className="lg:hidden">
      <button type="button" className="w-full flex items-center justify-between rounded-lg border border-surface-200 dark:border-surface-dark-200 px-3 py-2 text-sm font-semibold text-navy-900 dark:text-text-dark-primary" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
        Guide sections <ChevronDown className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
      </button>
      <div className={`${open ? 'block' : 'hidden'} mt-2`}>{links}</div>
    </nav>
  );
}

export default function CloudTestingGuide() {
  const [active, setActive] = useState('intro');
  useEffect(() => {
    const els = PARTS.map(([id]) => document.getElementById(`cct-${id}`)).filter(Boolean);
    if (!els.length || typeof IntersectionObserver === 'undefined') return undefined;
    const io = new IntersectionObserver((entries) => {
      const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (vis[0]) {
        const id = vis[0].target.id.replace('cct-', '');
        setActive(id);
        window.dispatchEvent(new CustomEvent('kb-subsection', { detail: id }));
      }
    }, { rootMargin: '-90px 0px -60% 0px' });
    els.forEach((el) => io.observe(el));
    // Open a deep link such as #cct-cc6 once the content exists.
    const h = window.location.hash;
    if (h.startsWith('#cct-')) setTimeout(() => document.getElementById(h.slice(1))?.scrollIntoView(), 100);
    return () => io.disconnect();
  }, []);

  return (
    <div className="grid gap-4">
      <SidePanel active={active} />
      <div className="min-w-0">
        <section id="cct-intro" className={`${CARD} scroll-mt-24`}>
          <h2 className="text-xl font-bold text-navy-900 dark:text-text-dark-primary mb-2">Cloud Control Testing Guide: AWS, GCP and Azure</h2>
          <p className={P}>{INTRO}</p>
          <p className={`mt-2 text-xs text-gray-500 dark:text-text-dark-muted`}>Every procedure runs directly in the AWS, GCP or Azure console or CLI. No compliance platform is needed. Placeholders appear as &lt;PROJECT_ID&gt;.</p>
        </section>

        <section id="cct-methods" className={`${CARD} scroll-mt-24`}>
          <h2 className={H2}>Testing Methods</h2>
          <Table head={['Method', 'What it means', 'Evidence strength', 'Cloud example']} rows={METHODS} min={640} />
        </section>

        {AREAS.map((a) => (
          <section key={a.id} id={`cct-${a.id}`} className={`${CARD} scroll-mt-24`}>
            <h2 className={H2}>{a.title}</h2>
            <AreaTable area={a} />
          </section>
        ))}

        <section id="cct-monitoring" className={`${CARD} scroll-mt-24`}>
          <h2 className={H2}>Why Automated Monitoring Is Not Enough</h2>
          <p className={P}>Automated monitoring is valuable for keeping controls healthy, but it is not audit evidence on its own. Six limits explain why an auditor still tests independently.</p>
          <ul className={`mt-2 list-disc pl-5 space-y-1 ${P}`}>{MONITORING_LIMITS.map(([t, d]) => <li key={t}><span className="font-semibold">{t}: </span>{d}</li>)}</ul>
        </section>

        <section id="cct-evidence" className={`${CARD} scroll-mt-24`}>
          <h2 className={H2}>Evidence Checklist</h2>
          <Table head={['Evidence item', 'AWS source', 'GCP source', 'Azure source', 'Frequency', 'Retention']} rows={EVIDENCE} min={900} />
          <p className={`mt-2 text-xs text-gray-500 dark:text-text-dark-muted`}>Retention: keep evidence for the audit period plus the period your policy or contracts require. HIPAA documentation is kept for 6 years under 164.316(b)(2).</p>
        </section>

        <section id="cct-sampling" className={`${CARD} scroll-mt-24`}>
          <h2 className={H2}>Sampling Guidance</h2>
          <Table head={['Control frequency', 'Suggested sample size']} rows={SAMPLING} min={360} />
          <p className={`mt-2 ${P}`}>Sample sizes vary by auditor and firm methodology; treat these as common starting points. Confirm the population is complete before you select any sample.</p>
        </section>

        <section id="cct-by-cloud" className="scroll-mt-24">
          <p className={`mb-2 ${P}`}>The view below is the original guide, organised by cloud and control domain. It adds containers, Kubernetes and asset inventory checks, with CSV export and print.</p>
          <CloudControlTesting />
        </section>
      </div>
    </div>
  );
}
