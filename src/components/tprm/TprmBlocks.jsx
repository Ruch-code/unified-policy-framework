import { useMemo, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import * as M from '../../data/tprm/operatingModel.js';
import TemplateDownloadButton from '../templates/TemplateDownloadButton.jsx';
import { useAuth } from '../../context/AuthContext.jsx';

const h4c = 'font-bold text-navy-900 dark:text-text-dark-primary';
const small = 'text-sm text-navy-600 dark:text-text-dark-secondary';
export const Note = ({ children, tone = 'sky' }) => <p className={`text-xs rounded-lg p-3 ${tone === 'amber' ? 'bg-amber-50 dark:bg-amber-950/30 text-amber-900 dark:text-amber-200' : 'bg-sky-50 dark:bg-sky-950/30 text-sky-900 dark:text-sky-200'}`}>{children}</p>;

export function Fold({ title, summary, children, defaultOpen = false, id }) {
  return (
    <details id={id} open={defaultOpen} className="group rounded-xl border border-surface-300 dark:border-surface-dark-300 bg-white dark:bg-surface-dark-100 scroll-mt-24">
      <summary className="flex items-start justify-between gap-3 p-4 cursor-pointer list-none">
        <span><span className={h4c}>{title}</span>{summary && <span className={`block ${small} mt-0.5`}>{summary}</span>}</span>
        <ChevronDown className="w-4 h-4 mt-1 shrink-0 text-gray-500 transition-transform group-open:rotate-180" aria-hidden="true" />
      </summary>
      <div className="px-4 pb-4 space-y-3">{children}</div>
    </details>
  );
}
export function T({ headers, rows, caption, min = 640 }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-surface-200 dark:border-surface-dark-200" tabIndex={0} role="region" aria-label={caption || headers.join(', ')}>
      <table className="w-full text-xs" style={{ minWidth: min }}>
        {caption && <caption className="text-left p-2 text-xs font-semibold text-navy-700 dark:text-text-dark-secondary">{caption}</caption>}
        <thead className="bg-surface-100 dark:bg-slate-800"><tr>{headers.map(h => <th key={h} scope="col" className="text-left p-2 font-semibold text-navy-900 dark:text-text-dark-primary">{h}</th>)}</tr></thead>
        <tbody>{rows.map((r, i) => <tr key={i} className="border-t border-surface-200 dark:border-surface-dark-200 align-top">{r.map((c, j) => <td key={j} className={`p-2 text-navy-700 dark:text-text-dark-secondary ${j === 0 ? 'font-medium text-navy-900 dark:text-text-dark-primary' : ''}`}>{c}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}
export const L = ({ items, ordered, caption }) => { const Tag = ordered ? 'ol' : 'ul'; return <div>{caption && <p className="text-xs font-semibold text-navy-700 dark:text-text-dark-secondary mb-1">{caption}</p>}<Tag className={`text-sm text-navy-700 dark:text-text-dark-secondary space-y-1 pl-5 ${ordered ? 'list-decimal' : 'list-disc'}`}>{items.map(i => <li key={i}>{i}</li>)}</Tag></div>; };

export const TPRM_TEMPLATES = [
  { name: 'Vendor intake and data-flow questionnaire', file: 'tprm-intake-dataflow.xlsx' },
  { name: 'Inherent and residual risk assessment', file: 'tprm-risk-assessment.xlsx' },
  { name: 'Evidence request list by tier', file: 'tprm-evidence-request.xlsx' },
  { name: 'SOC 2 review worksheet', file: 'tprm-soc2-worksheet.xlsx' },
  { name: 'Due-diligence decision memo', file: 'tprm-decision-memo.docx' },
  { name: 'Sub-processor register and change review', file: 'tprm-subprocessor-register.xlsx' },
  { name: 'Contract clause checklist (needs counsel review)', file: 'tprm-clause-checklist.xlsx' },
  { name: 'Issue, remediation and risk-acceptance register', file: 'tprm-issue-register.xlsx' },
  { name: 'Annual and event-driven review checklist', file: 'tprm-review-checklist.xlsx' },
  { name: 'Vendor incident brief and offboarding checklist', file: 'tprm-incident-offboarding.docx' },
];
export function TemplateStrip({ files, title = 'Templates' }) {
  const { user } = useAuth();
  const items = files ? TPRM_TEMPLATES.filter(t => files.includes(t.file)) : TPRM_TEMPLATES;
  return (
    <div className="rounded-xl border border-violet-200 dark:border-violet-800 bg-violet-50/60 dark:bg-violet-900/10 p-4">
      <p className={`${h4c} text-sm mb-2`}>{title}</p>
      {!user ? <p className={small}>Log in to download templates.</p> :
        <ul className="space-y-2">{items.map(t => <li key={t.file} className="flex items-center justify-between gap-3 text-sm text-navy-800 dark:text-text-dark-primary"><span>{t.name}</span><TemplateDownloadButton template={t} compact /></li>)}</ul>}
    </div>
  );
}

/* ---------- Governance ---------- */
export function Governance() {
  return (
    <Fold id="tprm-governance" title="Programme governance" summary="Purpose, scope, risk appetite, baseline, roles, escalation and the vendor inventory.">
      <p className={small}>{M.PROGRAM.purpose}</p>
      <L caption="Scope" items={M.PROGRAM.scope} />
      <L caption="Risk appetite statements (examples to adapt)" items={M.PROGRAM.appetite} />
      <L caption="Minimum control baseline for any vendor with data or access" items={M.PROGRAM.baseline} />
      <Note>{M.PROGRAM.exceptions}</Note>
      <T caption="RACI (R responsible, A accountable, C consulted, I informed)" headers={['Activity', ...M.RACI.roles]} rows={M.RACI.rows} min={1000} />
      <L caption="Escalation path" items={M.RACI.escalation} ordered />
      <T caption="Vendor, service, legal entity and sub-processor: keep them separate" headers={['Term', 'Meaning', 'How to record it']} rows={M.ENTITY_TERMS} />
      <T caption="Vendor and service inventory: data dictionary" headers={['Field', 'Source', 'Notes']} rows={M.INVENTORY_FIELDS} />
      <T caption="Handling different vendor types" headers={['Type', 'Approach']} rows={M.VENDOR_TYPES} />
    </Fold>
  );
}

/* ---------- Lifecycle SOPs ---------- */
export function LifecycleOps() {
  return (
    <div className="space-y-4">
      <T caption="Gates: what must be complete, and when" headers={['Gate', 'Stages that must be complete']} rows={M.GATES} />
      <div className="space-y-2">
        {M.STAGES.map((s, i) => (
          <Fold key={s.id} id={`tprm-stage-${s.id}`} title={`${i + 1}. ${s.name}`} summary={`${s.objective} Gate: ${s.gate}.`}>
            <T headers={['Item', 'Detail']} min={520} rows={[['Entry criteria', s.entry], ['Owner and contributors', s.owner], ['Decision / gate', s.decision], ['Target timing', s.timing], ['Exceptions and escalation', s.escalation], ['Next stage', s.next]]} />
            <div className="grid md:grid-cols-2 gap-3">
              <L caption="Inputs" items={s.inputs} /><L caption="Outputs" items={s.outputs} />
              <L caption="Steps" items={s.steps} ordered /><L caption="Required evidence" items={s.evidence} />
            </div>
            {s.id === 'incident' && <IncidentPlaybook />}
            {s.id === 'offboard' && <L caption="Exit checklist" items={M.EXIT} />}
          </Fold>
        ))}
      </div>
      <Fold title="Emergency procurement path" summary="When normal due diligence cannot finish in time.">
        <L items={M.EMERGENCY} />
      </Fold>
      <Note tone="amber">Timings are internal service levels to configure, not legal deadlines.</Note>
    </div>
  );
}
export function IncidentPlaybook() {
  return (
    <div className="space-y-3">
      <T caption="Notification decision tree (not every vendor incident triggers notice)" headers={['Question', 'Action']} rows={M.INCIDENT_TREE} />
      <L caption="Evidence checklist" items={M.INCIDENT_EVIDENCE} />
      <div className="rounded-lg border border-surface-200 dark:border-surface-dark-200 p-3">
        <p className="text-xs font-semibold text-navy-700 dark:text-text-dark-secondary mb-1">{M.TTX.title}</p>
        <L items={M.TTX.injects} ordered /><L caption="Discuss" items={M.TTX.questions} />
      </div>
    </div>
  );
}

/* ---------- Tiering ---------- */
export const scoreOf = (s) => { const tw = M.DIMENSIONS.reduce((a, d) => a + d.weight, 0); return M.DIMENSIONS.reduce((a, d) => a + (s[d.id] || 1) * d.weight, 0) / tw; };
export const tierOf = (v) => M.TIER_CUTOFFS.find(t => v >= t.min);
export function TieringModel() {
  const [s, setS] = useState(() => Object.fromEntries(M.DIMENSIONS.map(d => [d.id, 1])));
  const v = scoreOf(s); const base = tierOf(v);
  const floor = useMemo(() => { let t = base.tier; if (s.crit === 5 && s.subst >= 4) t = Math.min(t, 1); if (s.data === 5 || s.access === 5 || s.ai === 5) t = Math.min(t, 2); return t; }, [s, base]);
  const final = M.TIER_CUTOFFS.find(t => t.tier === floor);
  return (
    <div className="space-y-4">
      <div className="grid lg:grid-cols-[1fr_320px] gap-4">
        <div className="space-y-2">
          {M.DIMENSIONS.map(d => (
            <fieldset key={d.id} className="rounded-xl border border-surface-300 dark:border-surface-dark-300 bg-white dark:bg-surface-dark-100 p-3">
              <legend className="text-sm font-semibold text-navy-900 dark:text-text-dark-primary px-1">{d.name} <span className="text-xs font-normal text-navy-500">(weight {d.weight}%)</span></legend>
              <div className="grid sm:grid-cols-2 gap-1">{d.scale.map((lab, i) => (
                <label key={lab} className="flex items-start gap-2 text-xs text-navy-700 dark:text-text-dark-secondary cursor-pointer"><input type="radio" className="mt-0.5" name={`dim-${d.id}`} checked={s[d.id] === i + 1} onChange={() => setS(x => ({ ...x, [d.id]: i + 1 }))} /><span><strong>{i + 1}</strong> {lab}</span></label>))}</div>
            </fieldset>))}
        </div>
        <div className="lg:sticky lg:top-24 self-start rounded-xl border border-surface-300 dark:border-surface-dark-300 bg-white dark:bg-surface-dark-100 p-4" aria-live="polite">
          <p className="text-xs uppercase tracking-wide text-navy-500">Weighted inherent score (1 to 5)</p>
          <p className="text-4xl font-extrabold text-navy-900 dark:text-text-dark-primary">{v.toFixed(2)}</p>
          <p className={`${h4c} mt-2`}>{final.label}</p>
          {final.tier !== base.tier && <p className="text-xs text-amber-700 dark:text-amber-300">Raised from {base.label} by an override floor.</p>}
          <p className={`${small} mt-1`}>{final.desc}</p>
          <p className="text-[11px] mt-3 text-navy-500">Score = sum(score × weight) / 100. Cutoffs: Tier 1 ≥ 3.6, Tier 2 ≥ 2.8, Tier 3 ≥ 2.0. Example values to calibrate.</p>
        </div>
      </div>
      <L caption="Override floors and tie-breakers" items={M.OVERRIDES} />
      <Fold title="Worked examples (fictional, illustrative)" summary="Three vendors from intake to monitoring.">
        <T headers={['Vendor and service', 'Score / tier', 'Evidence considered', 'Gaps', 'Decision and approver', 'Owner', 'Monitoring and next trigger']} min={1000}
          rows={M.EXAMPLES.map(e => { const v2 = scoreOf(e.scores); return [`${e.name}: ${e.service}`, `${v2.toFixed(2)} → ${e.decision.split('.')[0]}`, e.evidence, e.gaps, e.decision, e.owner, `${e.monitor} Next: ${e.next}`]; })} />
      </Fold>
      <Fold title="Evidence confidence and staleness" summary="How to treat missing, expired, out-of-scope or contradictory evidence.">
        <T headers={['Situation', 'What it looks like', 'What to do']} rows={M.CONFIDENCE} />
      </Fold>
      <L caption="Every assessment record includes" items={M.RECORD_FIELDS} />
    </div>
  );
}

/* ---------- Assurance ---------- */
export function Assurance() {
  return (
    <div className="space-y-4">
      <T caption="Step-by-step SOC 2 review" headers={['Step', 'What to check', 'Decision rule']} rows={M.SOC2_STEPS} />
      <div className="grid md:grid-cols-2 gap-3"><L caption="When a SOC 2 report is not enough" items={M.SOC2_INSUFFICIENT} /><L caption="Compensating evidence to ask for" items={M.COMPENSATING} /></div>
      <T caption="Evidence by tier with acceptance and escalation criteria" headers={['Tier', 'Evidence to request', 'Accept when', 'Escalate or reject when']} rows={M.EVIDENCE_BY_TIER} min={900} />
      <Note>A certificate or report is evidence, not proof of acceptable risk. Always check scope, period, exceptions and CUECs against the service you are buying.</Note>
    </div>
  );
}

/* ---------- Sub-processors ---------- */
export function SubProcessorOps() {
  return (
    <div className="space-y-3">
      <L caption="Dependency register fields" items={M.DEP_REGISTER} />
      <L caption="Contract expectations for sub-processors" items={M.DEP_CONTRACT} />
      <L caption="Review triggers" items={M.DEP_TRIGGERS} />
      <L caption="Concentration analysis" items={M.CONCENTRATION} />
      <Note tone="amber">{M.NTH_LIMITS}</Note>
    </div>
  );
}

/* ---------- Monitoring and issues ---------- */
export function MonitoringOps() {
  return (
    <div className="space-y-3">
      <T caption="Review cadence (example internal policy)" headers={['Tier', 'Scheduled review', 'Between reviews']} rows={M.CADENCE} />
      <T caption="Monitoring sources and limitations" headers={['Source', 'Limitation']} rows={M.MON_SOURCES} />
    </div>
  );
}
export function IssueOps() {
  return (
    <div className="space-y-3">
      <T caption="Finding severity and remediation targets (configurable)" headers={['Severity', 'Example', 'Target to remediate', 'Risk acceptance approver and maximum term']} rows={M.SEVERITY} />
      <L caption="Rules" items={['Closure needs evidence reviewed by Security or Privacy, not a vendor statement alone', 'Overdue items escalate one level automatically', 'Compensating controls are documented and tested', 'Every risk acceptance has an expiry and must be reapproved or closed', 'Expired acceptances become open findings']} />
      <T caption="Key risk and performance indicators" headers={['KRI / KPI', 'Definition', 'Owner', 'Data source', 'Frequency', 'Example threshold']} rows={M.KRIS} min={900} />
      <L caption="Audit trail and reporting" items={M.AUDIT_TRAIL} />
    </div>
  );
}

/* ---------- Regional laws ---------- */
export function LegalTable() {
  return (
    <div className="space-y-3">
      <Note tone="amber">Applicability depends on the entity, its role, the service, data, geography and contracts. Not every organisation or vendor is covered by every regime. This is not legal advice. Last checked: {M.CHECKED}.</Note>
      <T caption="Key third-party obligations, with duty holder and primary source" min={980} headers={['Instrument', 'Type', 'Article', 'Duty holder', 'What it requires', 'Status']}
        rows={M.LEGAL.map(r => [r.law, r.type, <a key="a" href={r.src} target="_blank" rel="noopener noreferrer" className="underline text-indigo-700 dark:text-indigo-300">{r.art}</a>, r.duty, r.claim, r.status])} />
      <L caption="Corrections made to the jurisdiction list" items={M.LAW_CORRECTIONS} />
    </div>
  );
}
export function SectorGuide({ sector }) {
  const rows = M.SECTOR_GUIDE[sector]; if (!rows) return null;
  return <T caption="Scope, obligation, controls, evidence and caveats" min={760} headers={['Who may be in scope', 'Obligation or expectation', 'Control implications', 'Evidence', 'Caveats']} rows={rows} />;
}
