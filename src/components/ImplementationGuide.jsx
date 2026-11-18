import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PARTS, INTAKE, SCOPE, CONTROLS, EVIDENCE, TESTING, ROADMAP, GAP_COLUMNS, GAP_EXAMPLES, SEVERITY, DELIVERABLES } from '../data/implementationGuide.js';

// Knowledge Base topic: SOC 2, ISO 27001 and HIPAA implementation guide.
// Framework mappings, owners and frequencies live in the Unified Control Framework; this page adds build, evidence and test detail.
export const IMPL_PARTS = PARTS;
const CARD = 'rounded-2xl border border-surface-200 dark:border-surface-dark-200 bg-white dark:bg-slate-900/60 p-4 md:p-6 mb-6 scroll-mt-24';
const H2 = 'text-lg font-bold text-navy-900 dark:text-text-dark-primary mb-2';
const P = 'text-sm text-gray-700 dark:text-text-dark-secondary';
const TH = 'p-2 text-left font-semibold text-navy-900 dark:text-text-dark-primary bg-surface-50 dark:bg-slate-800 align-top';
const TD = 'p-2 align-top border-t border-surface-200 dark:border-surface-dark-200 text-gray-700 dark:text-text-dark-secondary';

function Table({ head, rows, min = 700 }) {
  return (
    <div className="overflow-x-auto" tabIndex={0} role="region" aria-label={head.join(', ')}>
      <table className="w-full text-sm" style={{ minWidth: min }}>
        <thead><tr>{head.map((h) => <th key={h} scope="col" className={TH}>{h}</th>)}</tr></thead>
        <tbody>{rows.map((r, i) => <tr key={i}>{r.map((c, j) => <td key={j} className={`${TD} ${j === 0 ? 'font-medium whitespace-nowrap' : ''}`}>{c}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}

const Section = ({ id, title, children }) => <section id={`impl-${id}`} className={CARD}><h2 className={H2}>{title}</h2>{children}</section>;

export default function ImplementationGuide() {
  useEffect(() => {
    const els = PARTS.map(([id]) => document.getElementById(`impl-${id}`)).filter(Boolean);
    if (!els.length || typeof IntersectionObserver === 'undefined') return undefined;
    const io = new IntersectionObserver((entries) => {
      const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (vis[0]) window.dispatchEvent(new CustomEvent('kb-subsection', { detail: vis[0].target.id.replace('impl-', '') }));
    }, { rootMargin: '-90px 0px -60% 0px' });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="min-w-0">
      <section className={CARD}>
        <h2 className="text-xl font-bold text-navy-900 dark:text-text-dark-primary mb-2">Implementation Guide: SOC 2, ISO 27001 and HIPAA</h2>
        <p className={P}>A 12-week plan a GRC analyst can run end to end. Fill the intake first; the placeholders in square brackets carry through the rest of the guide. Control IDs match the <Link className="ui-link" to="/unified-framework">Unified Control Framework</Link>, which already holds the framework mappings, owners and frequencies, so they are not repeated here.</p>
      </section>

      <Section id="intake" title="1. Intake and scope">
        <Table head={['Field', 'Value', 'Why it matters']} rows={INTAKE} min={640} />
        <div className="mt-3"><Table head={['Scope element', 'Content']} rows={SCOPE} min={640} /></div>
      </Section>

      <Section id="mapping" title="2. Framework mapping">
        <p className={P}>Use one control per requirement theme and map it to every framework, so one piece of evidence serves SOC 2, ISO 27001 Annex A and the HIPAA Security Rule. The full mapping, with owner, frequency and reusable evidence per control, is on the <Link className="ui-link" to="/unified-framework">Unified Control Framework</Link> page and can be exported to Excel as the starting control matrix. Drop controls that are out of scope (for example AI-01 when there is no AI system) and record why.</p>
      </Section>

      <Section id="controls" title="3. Control build sheet">
        <p className={`mb-2 ${P}`}>For each control: where it lives, how to build it, how to test it, what passes and what usually goes wrong.</p>
        <Table head={['UCF ID', 'Control', 'System of record', 'Implementation steps', 'Testing procedure', 'Pass criteria', 'Common failure modes']} rows={CONTROLS} min={1500} />
      </Section>

      <Section id="evidence" title="4. Evidence plan">
        <Table head={['UCF ID', 'Evidence', 'Source', 'Collection method', 'Date range', 'Reviewer or approver', 'Quality standard', 'Storage', 'Frequency']} rows={EVIDENCE} min={1400} />
        <p className={`mt-2 ${P}`}>Every file is named with the control ID, system and date. Evidence is reviewed by GRC before it goes to the auditor. Superseded evidence is archived, not deleted.</p>
      </Section>

      <Section id="testing" title="5. Testing plan">
        <Table head={['Element', 'How to do it', 'Applies to']} rows={TESTING} min={700} />
      </Section>

      <Section id="roadmap" title="6. 12-week roadmap">
        <Table head={['Weeks', 'Focus', 'Key tasks', 'Owner', 'Output']} rows={ROADMAP} min={900} />
        <p className={`mt-2 ${P}`}>A Type II needs an observation period after week 12. Week 12 ends readiness for a Type I, ISO Stage 1 or a HIPAA readiness report.</p>
      </Section>

      <Section id="remediation" title="7. Gap tracker">
        <Table head={GAP_COLUMNS} rows={GAP_EXAMPLES} min={1300} />
        <div className="mt-3"><Table head={['Severity', 'Meaning', 'Target']} rows={SEVERITY} min={560} /></div>
      </Section>

      <Section id="deliverables" title="8. Final deliverables">
        <p className={`mb-2 ${P}`}>Each deliverable already exists on OneLens as a template or page.</p>
        <Table head={['Deliverable', 'Where to find it', 'Open']} rows={DELIVERABLES.map(([d, w, l]) => [d, w, <Link key={l} className="ui-link" to={l}>Open</Link>])} min={640} />
      </Section>
    </div>
  );
}
