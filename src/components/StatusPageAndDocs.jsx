// What an application status page and product/technical documentation are, why auditors and customers care,
// which criteria they support, what good looks like and the evidence to keep.
const TH = 'p-2 text-left font-semibold text-gray-900 dark:text-white bg-gray-50 dark:bg-slate-800 align-top';
const TD = 'p-2 align-top border-t border-gray-200 dark:border-slate-700 text-gray-700 dark:text-slate-300';
const P = 'text-sm text-gray-700 dark:text-slate-300';
const H = 'mt-4 mb-1 font-semibold text-gray-900 dark:text-white';

function Table({ head, rows, min = 760 }) {
  return (
    <div className="overflow-x-auto" tabIndex={0} role="region" aria-label={head.join(', ')}>
      <table className="w-full text-sm" style={{ minWidth: min }}>
        <thead><tr>{head.map((h) => <th key={h} scope="col" className={TH}>{h}</th>)}</tr></thead>
        <tbody>{rows.map((r) => <tr key={r[0]}>{r.map((c, j) => <td key={j} className={`${TD} ${j === 0 ? 'font-medium' : ''}`}>{c}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}

const STATUS = [
  ['What it is', 'A public or customer-only web page showing whether each part of the service is working (for example API, dashboard, messaging, login), current incidents, planned maintenance and past incident history. Common tools: Atlassian Statuspage, Instatus, Better Stack, or a self-hosted page.'],
  ['Why it matters', 'It is how the company tells customers about outages and maintenance in a consistent, timely way. Customers use it to check SLAs, and enterprise questionnaires often ask for the link.'],
  ['What good looks like', 'Components match how customers see the product; status changes within an agreed time of an incident being declared (for example 30 minutes for a major outage); updates at set intervals until resolved; maintenance announced in advance; subscribe option by email or webhook; hosted separately from the main platform so it stays up during an outage; uptime history kept.'],
  ['Who owns it', 'Incident commander or on-call lead posts updates; support and communications approve wording for major incidents.'],
  ['Common gaps', 'Page shows "all systems operational" during a real outage; updated only after the incident ends; components too vague to be useful; hosted on the same infrastructure that failed; no record of who posted what.'],
  ['Evidence to keep', 'Link and screenshot of the page, incident history for the audit period, timestamps of each update compared with the incident ticket, maintenance notices, and the procedure that says when and how to post.'],
];

const DOCS = [
  ['Product documentation', 'Explains the product to customers: user guides, admin guides, help center articles, release notes, known limitations, and how customers configure security features (SSO, roles, data retention).', 'Customers, support', 'CC2.3 (external communication of commitments and responsibilities)'],
  ['API and integration documentation', 'Endpoints, authentication, rate limits, error codes, webhooks, data formats and versioning.', 'Customer developers, partners', 'CC2.3; PI1 if processing integrity is in scope'],
  ['Technical or architecture documentation', 'System architecture and data flow diagrams, environments, network layout, third-party services, where data is stored and encrypted, and trust boundaries.', 'Engineering, security, auditors', 'Basis of the SOC 2 system description (DC 200); CC2.1; ISO 27001 A.5.9 and A.8.20 to A.8.22'],
  ['Operating procedures and runbooks', 'Step-by-step instructions for deployments, backups and restores, incident handling, on-call, access changes and scaling.', 'Engineering, operations', 'ISO 27001 A.5.37 (documented operating procedures); CC7.4; CC8.1'],
  ['Shared responsibility and customer responsibilities', 'What the customer must do (manage their users, protect API keys, configure retention). In a SOC 2 report these become complementary user entity controls (CUECs).', 'Customers, auditors', 'CC2.3; listed in Section 3 of the SOC 2 report'],
  ['Security and trust documentation', 'Security overview or whitepaper, trust center, subprocessor list, data processing terms, uptime and support commitments.', 'Customers, sales, procurement', 'CC2.3; C1 and P criteria where in scope'],
];

const AUDIT = [
  ['Is documentation current?', 'Compare the architecture diagram and data flow to the live cloud setup and the asset inventory', 'Diagram date and owner, matching inventory export'],
  ['Are changes reflected?', 'Pick a recent major change and check the docs or release notes were updated', 'Change ticket linked to doc update'],
  ['Are customer commitments communicated?', 'Check terms, product docs and the status page say the same thing as the contract and SLA', 'Links and screenshots'],
  ['Are runbooks used?', 'Ask an engineer to walk through a restore or deployment using the runbook', 'Runbook version and last review date'],
  ['Is incident communication timely?', 'Compare status page update times to incident ticket times for sampled incidents', 'Incident tickets and status history'],
];

export default function StatusPageAndDocs() {
  return (
    <details id="status-page-docs" className="mb-6 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-[#1e293b] scroll-mt-24">
      <summary className="cursor-pointer px-4 py-3 font-semibold text-gray-900 dark:text-white">Application status page and product/technical documentation: what they mean for an audit</summary>
      <div className="px-4 pb-4">
        <p className={P}>Both are about communication. The status page tells customers whether the service is working right now. Documentation tells customers how to use the service safely, and tells engineers and auditors how the system is built and run. In SOC 2 they mainly support CC2.3 (communicating with external parties) and the availability criteria; in ISO 27001 they support documented procedures and supplier and customer communication.</p>

        <h3 className={H}>Application status page</h3>
        <Table head={['Aspect', 'Detail']} rows={STATUS} min={640} />
        <p className={`mt-2 ${P}`}>Criteria it supports: SOC 2 CC2.3 and CC7.4 (communicating incidents), A1.1 and A1.2 if availability is in scope; ISO 27001 A.5.24 and A.5.26 (incident communication) and A.5.14 (information transfer).</p>

        <h3 className={H}>Product and technical documentation</h3>
        <Table head={['Type', 'What it covers', 'Main audience', 'Criteria it supports']} rows={DOCS} min={900} />

        <h3 className={H}>How an auditor tests them</h3>
        <Table head={['Question', 'How it is tested', 'Evidence']} rows={AUDIT} min={760} />

        <p className={`mt-3 ${P}`}><span className="font-semibold">Interview line:</span> "I treat the status page and documentation as controls, not marketing. Each has an owner, a review date and evidence. For the status page I check that update times match incident tickets. For documentation I check that the architecture diagram matches the live environment, because the SOC 2 system description is built from it."</p>
      </div>
    </details>
  );
}
