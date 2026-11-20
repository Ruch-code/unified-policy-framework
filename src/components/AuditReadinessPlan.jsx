import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PARTS, FRAMEWORKS, DOMAINS, STARTUP, PENTEST, EDR, AUTOMATION, GAPS, TIMELINE, SURVEILLANCE, DELEGATE, MSG_SCOPE, MSG_RISKS, FOLLOWUPS, CLOSING } from '../data/auditReadinessPlan.js';

// Knowledge Base topic: Lead GRC audit readiness and certification plan.
// Links out to existing topics for detail instead of repeating them.
export const ARP_PARTS = PARTS;
const CARD = 'rounded-2xl border border-surface-200 dark:border-surface-dark-200 bg-white dark:bg-slate-900/60 p-4 md:p-6 mb-6 scroll-mt-24';
const H2 = 'text-lg font-bold text-navy-900 dark:text-text-dark-primary mb-2';
const P = 'text-sm text-gray-700 dark:text-text-dark-secondary';
const TH = 'p-2 text-left font-semibold text-navy-900 dark:text-text-dark-primary bg-surface-50 dark:bg-slate-800 align-top';
const TD = 'p-2 align-top border-t border-surface-200 dark:border-surface-dark-200 text-gray-700 dark:text-text-dark-secondary';
const SAY = 'mt-3 rounded-lg border-l-4 border-sky-600 bg-surface-50 dark:bg-slate-800 p-3 text-sm text-navy-900 dark:text-text-dark-primary';

const to = (t) => (t.startsWith('/') ? t : `/knowledge?topic=${t}`);

function Table({ head, rows, min = 700, label, render }) {
  return (
    <div className="overflow-x-auto" tabIndex={0} role="region" aria-label={label || head.join(', ')}>
      <table className="w-full text-sm" style={{ minWidth: min }}>
        <thead><tr>{head.map((h) => <th key={h} scope="col" className={TH}>{h}</th>)}</tr></thead>
        <tbody>{rows.map((r, i) => <tr key={i}>{(render ? render(r) : r).map((c, j) => <td key={j} className={`${TD} ${j === 0 ? 'font-medium' : ''}`}>{c}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}

function Section({ id, title, children }) {
  return <details open id={`arp-${id}`} className={CARD}><summary className="cursor-pointer list-none"><h2 className={`${H2} inline`}>{title}</h2></summary><div className="mt-2">{children}</div></details>;
}

export default function AuditReadinessPlan() {
  const [, setActive] = useState('frameworks');
  useEffect(() => {
    const els = PARTS.map(([id]) => document.getElementById(`arp-${id}`)).filter(Boolean);
    if (!els.length || typeof IntersectionObserver === 'undefined') return undefined;
    const io = new IntersectionObserver((entries) => {
      const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (vis[0]) { const id = vis[0].target.id.replace('arp-', ''); setActive(id); window.dispatchEvent(new CustomEvent('kb-subsection', { detail: id })); }
    }, { rootMargin: '-90px 0px -60% 0px' });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="min-w-0">
      <section className={CARD}>
        <h2 className="text-xl font-bold text-navy-900 dark:text-text-dark-primary mb-2">Audit Readiness and Certification Plan (Lead GRC)</h2>
        <p className={P}>One plan from readiness to report for SOC 2 Type I and Type II, ISO 27001 certification and surveillance, and ISO 42001, with the privacy and security areas customers expect. Where a topic is covered in depth elsewhere on OneLens, the table links to it instead of repeating it. Timelines are typical ranges and vary by auditor and company.</p>
      </section>

      <Section id="frameworks" title="1. Framework overview">
        <Table head={['Framework', 'What is assessed', 'Evidence auditors expect', 'Teams involved', 'What causes findings', 'What the Lead GRC owns']} rows={FRAMEWORKS} min={1200} />
        <p className={SAY}>"I treat SOC 2, ISO 27001 and ISO 42001 as one programme with one control set. The audits differ in format, not in the controls underneath."</p>
      </Section>

      <Section id="domains" title="2. Control domains">
        <p className={`mb-2 ${P}`}>Each row is the checklist I use per domain. Follow the link in the last column for the full testing steps.</p>
        <Table head={['Domain', 'Objective', 'How to test', 'Evidence', 'Common gaps', 'Remediation', 'Owner', 'Frequency', 'Automatable?', 'Detail']} rows={DOMAINS} min={1900}
          render={(r) => [...r.slice(0, 9), r[9] ? <Link className="ui-link" to={to(r[9])}>Open</Link> : 'Below']} />
      </Section>

      <Section id="startup" title="3. Weak access and change controls: what a startup can do">
        <p className={P}>{STARTUP.intro}</p>
        <h3 className="mt-3 mb-1 font-semibold text-navy-900 dark:text-text-dark-primary">Minimum viable control set</h3>
        <Table head={['Control', 'Switch on by']} rows={STARTUP.mvc} min={480} />
        <h3 className="mt-3 mb-1 font-semibold text-navy-900 dark:text-text-dark-primary">Aligning audit dates to when controls started</h3>
        <Table head={['Audit', 'Earliest realistic timing']} rows={STARTUP.align} min={480} />
        <p className={SAY}>{STARTUP.say}</p>
      </Section>

      <Section id="pentest" title="4. Penetration test types">
        <Table head={['Test', 'What it covers', 'When', 'Tracking to closure']} rows={PENTEST} min={760} />
        <p className={`mt-2 ${P}`}>Scope comes from the system boundary in the audit scope. Every critical and high finding gets a ticket, an owner and a retest. Share the summary letter with customers, not the full report.</p>
      </Section>

      <Section id="edr" title="5. EDR explained">
        <Table head={['Question', 'Answer']} min={600} rows={[
          ['What it is', EDR.what], ['How it differs from antivirus', EDR.vsAv], ['What it monitors', EDR.monitors], ['Response actions', EDR.response],
          ['Audit evidence', EDR.evidence], ['Common gaps', EDR.gaps], ['How to test coverage', EDR.test], ['Examples', EDR.examples],
        ]} />
      </Section>

      <Section id="automation" title="6. Evidence automation sources">
        <p className={`mb-2 ${P}`}>Start from a common control library, map each control to its evidence source and owner, then automate the pull. The <Link className="ui-link" to="/knowledge?topic=evidence">Evidence Automation</Link> and <Link className="ui-link" to="/knowledge?topic=streamline">Streamlining GRC</Link> topics cover the method; this table covers the sources.</p>
        <Table head={['Source', 'Evidence it can pull', 'Control supported', 'Still needs human review']} rows={AUTOMATION} min={860} />
      </Section>

      <Section id="gaps" title="7. Known gaps and remediations">
        <Table head={['Gap', 'Why it matters', 'Audit impact', 'Remediation', 'Evidence after the fix', 'Typical time to fix']} rows={GAPS} min={1200} />
        <p className={`mt-2 ${P}`}>For a Type II, fixing a control does not clean the past period. The fix stops new exceptions from the date it starts.</p>
      </Section>

      <Section id="timeline" title="8. Timelines from readiness to report">
        <Table head={['Phase', 'SOC 2 Type I', 'SOC 2 Type II', 'ISO 27001', 'ISO 42001']} rows={TIMELINE} min={1000} />
        <h3 className="mt-4 mb-1 font-semibold text-navy-900 dark:text-text-dark-primary">ISO 27001 surveillance</h3>
        <ul className={`list-disc pl-5 space-y-1 ${P}`}>{SURVEILLANCE.map((s) => <li key={s}>{s}</li>)}</ul>
      </Section>

      <Section id="delegation" title="9. Delegation model">
        <Table head={['Can be delegated to junior team members', 'Kept by the Lead']} rows={DELEGATE} min={560} />
        <p className={SAY}>"Juniors gather and organise; I decide and sign off. Anything that goes to an auditor or a customer, or sets a risk rating, passes my review."</p>
      </Section>

      <Section id="messaging" title="10. Applied: an AI-enabled messaging SaaS platform">
        <p className={`mb-2 ${P}`}>Assume the platform processes customer messages, phone numbers, API traffic, chatbot flows, AI prompts and outputs, channel integrations (WhatsApp, SMS, email, chat) and support data.</p>
        <Table head={['Component', 'In scope?', 'Why']} rows={MSG_SCOPE} min={700} />
        <div className="mt-3"><Table head={['Area', 'What to cover']} rows={MSG_RISKS} min={640} /></div>
        <p className={`mt-2 ${P}`}>Tabletop: use the <Link className="ui-link" to="/knowledge?topic=tabletop">Tabletop Exercise</Link> template with this inject sequence: a leaked customer API key starts sending spam, the channel provider threatens suspension, then the attacker exports contact lists through the admin console. Decisions tested: revoke keys, customer notice, regulator notice (for example CERT-In within 6 hours in India, GDPR within 72 hours), provider communication. For AI vendor review questions, see <Link className="ui-link" to="/?section=ai-vendors#vendor-risk">AI vendor assurance</Link>.</p>
      </Section>

      <Section id="followups" title="11. Hard follow-up questions">
        <Table head={['Question', 'Strong answer']} rows={FOLLOWUPS} min={640} />
      </Section>

      <Section id="closing" title="12. Closing statement">
        <p className={SAY}>{CLOSING}</p>
      </Section>
    </div>
  );
}
