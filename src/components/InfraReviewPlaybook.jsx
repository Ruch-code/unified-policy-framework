import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PARTS, APPROACH, FINDING_FIELDS, LENS, LENS_EXAMPLES, DOMAINS, FIREWALL_COLUMNS, FIREWALL_EXAMPLES, FIREWALL_NOTE, FIREWALL_EVIDENCE, FIREWALL_EVIDENCE_NOTE, KEY, CONTRACTOR } from '../data/infraReviewPlaybook.js';

// Knowledge Base topic: infrastructure security review playbook with an infrastructure leadership lens.
export const IRP_PARTS = PARTS;
const CARD = 'rounded-2xl border border-surface-200 dark:border-surface-dark-200 bg-white dark:bg-slate-900/60 p-4 md:p-6 mb-6 scroll-mt-24';
const H2 = 'text-lg font-bold text-navy-900 dark:text-text-dark-primary mb-2';
const H3 = 'mt-4 mb-1 font-semibold text-navy-900 dark:text-text-dark-primary';
const P = 'text-sm text-gray-700 dark:text-text-dark-secondary';
const TH = 'p-2 text-left font-semibold text-navy-900 dark:text-text-dark-primary bg-surface-50 dark:bg-slate-800 align-top';
const TD = 'p-2 align-top border-t border-surface-200 dark:border-surface-dark-200 text-gray-700 dark:text-text-dark-secondary';
const SAY = 'mt-2 rounded-lg border-l-4 border-sky-600 bg-surface-50 dark:bg-slate-800 p-3 text-sm text-navy-900 dark:text-text-dark-primary';
const ACT_HEAD = ['Recommendation', 'Infra priority', 'Effort', 'Business impact', 'Implementation risk', 'Rollback plan', 'Owner', 'Dependency teams'];

function Table({ head, rows, min = 760 }) {
  return (
    <div className="overflow-x-auto" tabIndex={0} role="region" aria-label={head.join(', ')}>
      <table className="w-full text-sm" style={{ minWidth: min }}>
        <thead><tr>{head.map((h) => <th key={h} scope="col" className={TH}>{h}</th>)}</tr></thead>
        <tbody>{rows.map((r, i) => <tr key={i}>{r.map((c, j) => <td key={j} className={`${TD} ${j === 0 ? 'font-medium' : ''}`}>{c}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}
const List = ({ items }) => <ul className={`list-disc pl-5 space-y-1 ${P}`}>{items.map((x) => <li key={x}>{x}</li>)}</ul>;
const Section = ({ id, title, children }) => <details open id={`irp-${id}`} className={CARD}><summary className="cursor-pointer list-none"><h2 className={`${H2} inline`}>{title}</h2></summary><div className="mt-2">{children}</div></details>;

export default function InfraReviewPlaybook() {
  useEffect(() => {
    const els = PARTS.map(([id]) => document.getElementById(`irp-${id}`)).filter(Boolean);
    if (!els.length || typeof IntersectionObserver === 'undefined') return undefined;
    const io = new IntersectionObserver((entries) => {
      const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (vis[0]) window.dispatchEvent(new CustomEvent('kb-subsection', { detail: vis[0].target.id.replace('irp-', '') }));
    }, { rootMargin: '-90px 0px -60% 0px' });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="min-w-0">
      <section className={CARD}>
        <h2 className="text-xl font-bold text-navy-900 dark:text-text-dark-primary mb-2">Infrastructure Security Review Playbook</h2>
        <p className={P}>How to review network security, BC/DR, incident response, access management and firewall rules end to end, and how to present each finding so an infrastructure leader can act on it: priority, effort, outage risk, rollback and the teams involved. Port tables, firewall types and BC/DR basics are in the <Link className="ui-link" to="/knowledge?topic=infranet">Infra &amp; Network Audit</Link> topic.</p>
      </section>

      <Section id="approach" title="1. Review approach and finding format">
        <List items={APPROACH} />
        <h3 className={H3}>Fields for every finding</h3>
        <Table head={['Field', 'What to write']} rows={FINDING_FIELDS} min={600} />
      </Section>

      <Section id="lens" title="2. Infrastructure leadership lens">
        <Table head={['Question', 'Why it matters']} rows={LENS} min={640} />
        <h3 className={H3}>Typical findings through this lens</h3>
        <Table head={['Finding', 'Risk', 'Fix type', 'Infra priority', 'Effort', 'Implementation risk', 'Rollback plan', 'Owner', 'Dependency teams']} rows={LENS_EXAMPLES} min={1400} />
      </Section>

      <Section id="domains" title="3. Domain review checklist">
        <Table head={['Domain', 'What to review', 'Red flags']} rows={DOMAINS} min={900} />
      </Section>

      <Section id="firewall" title="4. Firewall rule review register">
        <Table head={FIREWALL_COLUMNS} rows={FIREWALL_EXAMPLES} min={1500} />
        <p className={`mt-2 ${P}`}>{FIREWALL_NOTE}</p>
        <h4 className="mt-4 mb-1 font-semibold text-gray-900 dark:text-white">Evidence an auditor asks for in a firewall review</h4>
        <Table head={['Evidence', 'What it proves', 'What the auditor checks']} rows={FIREWALL_EVIDENCE} min={900} />
        <p className={`mt-2 ${P}`}>{FIREWALL_EVIDENCE_NOTE}</p>
      </Section>

      <Section id="key" title="5. Scenario: production key 180 days old against a 90-day rotation rule">
        <p className={SAY}>{KEY.advisory}</p>
        <p className={`mt-3 ${P}`}><span className="font-semibold">Risk rating: </span>{KEY.rating}</p>
        <h3 className={H3}>Control mapping</h3>
        <Table head={['Source', 'What it covers']} rows={KEY.mapping} min={640} />
        <h3 className={H3}>Recommendations through the infrastructure lens</h3>
        <Table head={ACT_HEAD} rows={KEY.actions} min={1400} />
        <h3 className={H3}>Evidence to request</h3>
        <p className={SAY}>{KEY.evidenceAsk}</p>
        <div className="mt-2"><Table head={['Area', 'Evidence']} rows={KEY.evidence} min={640} /></div>
      </Section>

      <Section id="contractor" title="6. Scenario: outsourced security consultant needing access">
        <p className={P}>{CONTRACTOR.scenario}</p>
        <h3 className={H3}>Risk classification depends on the access granted</h3>
        <Table head={['Rating', 'When it applies']} rows={CONTRACTOR.levels} min={600} />
        <p className={`mt-2 ${P}`}>Default for this scenario is High if the consultant sees production information, security tooling, vendor risk data or internal evidence. It becomes Critical if production write or standing privileged access is granted.</p>
        <h3 className={H3}>Control mapping</h3>
        <Table head={['Framework', 'Controls']} rows={CONTRACTOR.mapping} min={640} />
        <h3 className={H3}>Security controls before access</h3>
        <List items={CONTRACTOR.security} />
        <h3 className={H3}>HR and vendor management controls</h3>
        <List items={CONTRACTOR.hr} />
        <h3 className={H3}>JIT and RBAC by worker type</h3>
        <p className={`mb-2 ${P}`}>Just-in-time access means no standing privileged access: access is requested, approved, time-limited, logged and removed automatically. RBAC means access follows the role and business need, and is removed when the role changes.</p>
        <Table head={['Aspect', 'Contractor', 'Full-time employee', 'Intern']} rows={CONTRACTOR.workers} min={860} />
        <p className={SAY}>{CONTRACTOR.model}</p>
        <h3 className={H3}>Recommendations through the infrastructure lens</h3>
        <Table head={ACT_HEAD} rows={CONTRACTOR.actions} min={1400} />
        <h3 className={H3}>Evidence to request</h3>
        <p className={SAY}>{CONTRACTOR.evidenceAsk}</p>
        <div className="mt-2"><Table head={['Area', 'Evidence']} rows={CONTRACTOR.evidence} min={640} /></div>
      </Section>
    </div>
  );
}
