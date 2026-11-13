import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as U from '../../data/nov2026Updates.js';
import { H, TXT, LINE, CARD, Pending, Sources, BlockTitle, Rows, NewBadge, Verified } from './UpdateBits.jsx';

// ---------- 1. DPDPA ----------

function Countdown() {
  const target = new Date(U.DPDPA_COUNTDOWN_TARGET).getTime();
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => { const t = setInterval(() => setNow(Date.now()), 60000); return () => clearInterval(t); }, []);
  const ms = Math.max(0, target - now);
  const days = Math.floor(ms / 86400000);
  const hours = Math.floor((ms % 86400000) / 3600000);
  return (
    <p className={`text-sm ${TXT}`} aria-live="polite">
      <span className={`font-semibold ${H}`}>{ms === 0 ? 'Phase 3 is in force.' : `${days} days ${hours} hours`}</span>{ms > 0 && ' until Phase 3 (13 May 2027, IST)'}
    </p>
  );
}

export function DpdpaUpdates() {
  return (
    <section id="dpdpa-updates" className={`${CARD} space-y-8`}>
      <div>
        <BlockTitle as="h2">India: DPDPA Phased Rollout</BlockTitle>
        <div className="mt-2"><Countdown /></div>
      </div>

      {/* 1a. Timeline */}
      <ol className="grid gap-4 md:grid-cols-3" aria-label="DPDPA phases">
        {U.DPDPA_PHASES.map((p) => (
          <li key={p.phase} className={`border-t-4 ${p.status === 'Upcoming' ? 'border-gray-300 dark:border-slate-600' : 'border-[#344c67]'} pt-3`}>
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-slate-400">{p.phase} · {p.status}</p>
            <p className={`text-lg font-bold ${H}`}>{p.date}</p>
            <ul className={`mt-2 space-y-2 text-sm ${TXT}`}>
              {p.points.map((pt) => (
                <li key={pt.text}>
                  {pt.text}{pt.verify && <Pending />}
                  <Sources keys={pt.src} />
                  {pt.note && <p className="mt-1 text-[11px] text-gray-500 dark:text-slate-400">Note: {pt.note}</p>}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
      <p className={`text-xs ${TXT}`}>{U.DPDPA_PORTAL_NOTE.text}{U.DPDPA_PORTAL_NOTE.verify && <Pending />} <Sources keys={U.DPDPA_PORTAL_NOTE.src} /></p>

      {/* 1b. Core rules */}
      <div>
        <BlockTitle>Core Data Fiduciary Rules</BlockTitle>
        <div className="mt-3"><Rows label="Core Data Fiduciary Rules" min={1200} headers={['Rule', 'Act section', 'Obligation', 'Evidence an auditor would ask for', 'ISO 27001:2022 / SOC 2 / GDPR mapping']} rows={U.DPDPA_CORE_RULES} /></div>
        <p className="mt-2"><Sources keys={['rules', 'act']} /></p>
      </div>

      {/* 1c. Grievance */}
      <div>
        <BlockTitle>Grievance Redressal and Contact Point</BlockTitle>
        <dl className="mt-3 space-y-3 text-sm">
          {U.DPDPA_GRIEVANCE.map((g) => (
            <div key={g.title}><dt className={`font-semibold ${H}`}>{g.title}</dt><dd className={TXT}>{g.text} <Sources keys={g.src} /></dd></div>
          ))}
        </dl>
        <p className={`mt-4 text-sm font-semibold ${H}`}>Practical checklist</p>
        <ul className={`mt-1 list-disc pl-5 space-y-1 text-sm ${TXT}`}>{U.DPDPA_GRIEVANCE_CHECKLIST.map((c) => <li key={c}>{c}</li>)}</ul>
      </div>

      {/* 1d. Board readiness */}
      <div className={`border-l-0 border ${LINE} rounded p-4 bg-gray-50 dark:bg-slate-800`}>
        <p className={`text-sm font-semibold ${H}`}>Board-readiness test<NewBadge /></p>
        <p className={`mt-1 text-sm ${TXT}`}>{U.DPDPA_BOARD_READINESS}</p>
        <Verified />
      </div>

      {/* 1e. Resources */}
      <div>
        <BlockTitle>DPDPA Resources</BlockTitle>
        <ul className={`mt-2 space-y-1 text-sm ${TXT}`}>
          {U.DPDPA_RESOURCES.map((r) => (
            <li key={r.title}><span className={`font-semibold ${H}`}>{r.url ? <a className="underline" href={r.url} target="_blank" rel="noopener noreferrer">{r.title}</a> : r.title}</span>, {r.by} ({r.type})</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// ---------- 2. AI privacy ----------

export function AiPrivacyUpdates() {
  const r = U.AI_PIPELINE_RISK;
  return (
    <section id="ai-updates" className={`${CARD} space-y-8`}>
      <div>
        <BlockTitle as="h2">{r.title}</BlockTitle>
        <div className="mt-3"><Rows label="AI pipeline privacy risk" min={1000}
          headers={['Scope', 'Risk', 'Likelihood', 'Impact', 'Treatment']}
          rows={[[r.scope, r.risk, r.likelihood, r.impact, r.treatment.join('; ')]]} /></div>
        <p className="mt-2"><Sources keys={['rules']} /></p>
      </div>

      <div>
        <BlockTitle>Security layers for AI</BlockTitle>
        <div className="mt-3 flex flex-col-reverse gap-1 max-w-2xl" aria-label="Security layers, bottom to top">
          {U.AI_LAYERS.map(([name, desc], i) => (
            <div key={name} className={`border ${LINE} rounded px-3 py-2`} style={{ marginLeft: `${i * 12}px` }}>
              <p className={`text-sm font-semibold ${H}`}>{i + 1}. {name}</p>
              <p className={`text-xs ${TXT}`}>{desc}</p>
            </div>
          ))}
        </div>
        <p className={`mt-2 text-sm italic ${TXT}`}>{U.AI_LAYERS_CAPTION}</p>
      </div>

      <div>
        <BlockTitle>Agentic AI controls</BlockTitle>
        <p className={`mt-2 text-sm ${TXT}`}><span className={`font-semibold ${H}`}>Key risk: </span>{U.AGENTIC_RISK}</p>
        <div className="mt-3"><Rows label="Agentic AI controls" min={700} headers={['Control', 'ISO/IEC 42001 Annex A', 'NIST AI RMF function']} rows={U.AGENTIC_CONTROLS} /></div>
        <p className="mt-2"><Sources keys={['iso42001', 'nistAi']} /></p>
        <p className={`mt-2 text-sm ${TXT}`}>Agents also need identity and access controls: see the <Link to="/#access-governance" className="underline">AI agent persona in Persona and Access Governance</Link>.</p>
      </div>
    </section>
  );
}

// ---------- 3. AI agent persona ----------

export function AiAgentPersona() {
  const p = U.AI_AGENT_PERSONA;
  return (
    <section id="ai-agent-persona" className={`${CARD} max-w-7xl mx-auto`}>
      <BlockTitle as="h2">{p.title}</BlockTitle>
      <p className={`mt-2 text-sm ${TXT}`}>{p.note}</p>
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        {p.categories.map((c) => (
          <div key={c.name} className={`border ${LINE} rounded p-3`}>
            <p className={`font-semibold text-sm ${H}`}>{c.name}</p>
            <ul className={`mt-2 list-disc pl-5 space-y-1 text-sm ${TXT}`}>{c.requirements.map((x) => <li key={x}>{x}</li>)}</ul>
            <p className="mt-2 text-[11px] text-gray-500 dark:text-slate-400">{c.frameworks.join(' · ')}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ---------- 4. Vendor risk ----------

export function VendorUpdates() {
  const t = U.TSMC_CASE;
  const c = U.CONCENTRATION;
  return (
    <section id="vendor-updates" className={`${CARD} space-y-8`}>
      <div>
        <BlockTitle as="h2">Case study: {t.title}</BlockTitle>
        <div className="mt-3 grid gap-6 md:grid-cols-2">
          <div>
            <p className={`text-sm font-semibold ${H}`}>Confirmed by TSMC (filing of 12 Nov 2026)</p>
            <ul className={`mt-1 list-disc pl-5 space-y-1 text-sm ${TXT}`}>{t.confirmed.map((x) => <li key={x}>{x}</li>)}</ul>
            <p className="mt-1"><Sources keys={t.confirmedSrc} /></p>
          </div>
          <div>
            <p className={`text-sm font-semibold ${H}`}>Claimed by the attacker, not confirmed by TSMC</p>
            <ul className={`mt-1 list-disc pl-5 space-y-1 text-sm ${TXT}`}>{t.unconfirmed.map((x) => <li key={x}>{x} <span className="text-[11px] text-gray-500 dark:text-slate-400">(unconfirmed)</span></li>)}</ul>
          </div>
        </div>
        <p className={`mt-4 text-sm font-semibold ${H}`}>TPRM lessons</p>
        <ul className={`mt-1 list-disc pl-5 space-y-1 text-sm ${TXT}`}>{t.lessons.map((x) => <li key={x}>{x}</li>)}</ul>
        <p className={`mt-3 text-sm ${TXT}`}>{t.dpdpaLink} <Link to="/#regional" className="underline">See DPDPA Rules 6 and 7</Link>.</p>
      </div>

      <div>
        <BlockTitle>{c.title}</BlockTitle>
        <p className={`mt-2 text-sm ${TXT}`}><span className={`font-semibold ${H}`}>Example: </span>{c.example} <Sources keys={c.exampleSrc} /></p>
        <ul className={`mt-2 list-disc pl-5 space-y-1 text-sm ${TXT}`}>{c.controls.map((x) => <li key={x}>{x}</li>)}</ul>
        <p className="mt-2 text-xs text-gray-500 dark:text-slate-400">Mapping: {c.mapping}</p>
        <p className={`mt-2 text-sm italic ${TXT}`}>{c.note}</p>
      </div>
    </section>
  );
}

// ---------- 5. Incident response ----------

export function IrUpdates() {
  return (
    <section id="ir-updates" className={`${CARD} space-y-8`}>
      <div>
        <BlockTitle as="h2">Major incident communications</BlockTitle>
        <ul className={`mt-2 list-disc pl-5 space-y-1 text-sm ${TXT}`}>{U.IR_COMMS.map((x) => <li key={x}>{x}</li>)}</ul>
      </div>
      <div>
        <BlockTitle>Key-person and institutional knowledge risk</BlockTitle>
        <p className={`mt-2 text-sm ${TXT}`}>{U.KEY_PERSON.risk}</p>
        <p className={`mt-2 text-sm ${TXT}`}><span className={`font-semibold ${H}`}>Controls: </span>{U.KEY_PERSON.controls.join(', ')}.</p>
      </div>
      <div>
        <BlockTitle>DPDPA breach clock</BlockTitle>
        <div className="mt-3"><Rows label="DPDPA breach clock" min={560} headers={['When', 'What']} rows={U.DPDPA_BREACH_CLOCK} /></div>
        <p className="mt-2"><Sources keys={['rules']} /> <span className="text-[11px] text-gray-500 dark:text-slate-400">Applies from 13 May 2027.</span></p>
      </div>
    </section>
  );
}

// ---------- 6. CISO continuity ----------

export function CisoContinuity() {
  const c = U.CISO_CONTINUITY;
  return (
    <section id="ciso-continuity" className={CARD}>
      <BlockTitle as="h2">Security programme continuity (CISO succession)</BlockTitle>
      <ul className={`mt-3 list-disc pl-5 space-y-1 text-sm ${TXT}`}>{c.points.map((x) => <li key={x}>{x}</li>)}</ul>
      <p className={`mt-3 text-sm ${TXT}`}>{c.regulatory.text}{c.regulatory.verify && <Pending />} <Sources keys={c.regulatory.src} /></p>
    </section>
  );
}

// ---------- 7. Interview questions ----------

export function Nov2026Questions() {
  return (
    <section id="interview-nov2026" className={CARD}>
      <BlockTitle as="h2">Current topics: DPDPA, agentic AI, vendors and continuity</BlockTitle>
      <div className="mt-4 space-y-3">
        {U.NOV2026_QUESTIONS.map((x) => (
          <details key={x.q} className={`border ${LINE} rounded`}>
            <summary className={`cursor-pointer p-3 text-sm font-semibold ${H}`}>{x.q}</summary>
            <div className="px-3 pb-3">
              <p className={`text-sm ${TXT}`}>{x.a}</p>
              <p className="mt-2 text-[11px] text-gray-500 dark:text-slate-400">Covered in: {x.section}</p>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
