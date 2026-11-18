import { Link } from 'react-router-dom';
import FlowDiagram from './crypto/FlowDiagram.jsx';

// Knowledge Base topic: cybersecurity, compliance and privacy for logistics, supply chain and transport platforms.
// Detail on general topics (risk, exceptions, IR, BCP, vendors, awareness) is linked rather than repeated.
const CARD = 'rounded-2xl border border-surface-200 dark:border-surface-dark-200 bg-white dark:bg-slate-900/60 p-4 md:p-6 mb-6';
const H2 = 'text-lg font-bold text-navy-900 dark:text-text-dark-primary mb-2';
const P = 'text-sm text-gray-700 dark:text-text-dark-secondary';
const TH = 'p-2 text-left font-semibold text-navy-900 dark:text-text-dark-primary bg-surface-50 dark:bg-slate-800 align-top';
const TD = 'p-2 align-top border-t border-surface-200 dark:border-surface-dark-200 text-gray-700 dark:text-text-dark-secondary';

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

const SURFACE = [
  ['Customer and shipper apps', 'Account takeover, credential stuffing, fake bookings', 'MFA or OTP with rate limits, bot protection, fraud monitoring'],
  ['Tracking and partner APIs', 'Scraping of shipment, address and phone data; broken object-level access', 'API authentication per partner, object-level checks, rate limits, API pen testing'],
  ['Driver and rider apps', 'Shared logins, lost phones, consignee data kept on device', 'Named accounts, MDM or app-level wipe, show only the active delivery, number masking'],
  ['Warehouse and hub systems', 'Ransomware, legacy systems without MFA, shared scanner logins', 'Network segmentation, EDR, offline backups, exceptions with compensating controls'],
  ['Fleet telematics and IoT', 'Default passwords, unpatched devices, location data exposure', 'Device inventory, changed credentials, separate network, firmware updates'],
  ['Payments and COD reconciliation', 'Fraud, tampering with cash-on-delivery records', 'Segregation of duties, reconciliation controls, audit logs'],
  ['Data lake and analytics', 'Bulk personal data copies, broad analyst access', 'Masking, role-based access, retention limits'],
  ['Partners and carriers', 'Partner portal misuse, accounts left active after offboarding', 'Tiered vendor reviews, quarterly partner access reviews, contract clauses'],
];

const FRAMEWORKS = [
  ['ISO 27001', 'Backbone ISMS and certification customers ask for', 'Scope the platform, hubs that run IT systems, and corporate IT'],
  ['NIST CSF 2.0', 'Structure for Govern, Identify, Protect, Detect, Respond and Recover; good for maturity reporting to leadership', 'Use as the reporting view, mapped to the same controls'],
  ['DPDP Act 2023 and Rules', 'Consignee, customer, driver and employee personal data', 'Notices, purpose and retention limits, rights requests, breach reporting; processor role for client shipments'],
  ['CERT-In directions', 'All Indian organisations', '6-hour incident reporting, 180-day log retention in India, time sync'],
  ['Sector and customer rules', 'Contracts with e-commerce, pharma or government clients may add requirements', 'Track them in the legal and contractual register'],
];

export default function LogisticsSecurity() {
  return (
    <div className="min-w-0">
      <section className={CARD}>
        <h2 className="text-xl font-bold text-navy-900 dark:text-text-dark-primary mb-2">Logistics and Supply Chain Security</h2>
        <p className={P}>Running cybersecurity, compliance and privacy for a tech-driven logistics, supply chain and transport platform. The attack surface reaches far beyond offices: hubs, vehicles, handheld scanners, driver apps and hundreds of partners. General programme topics are linked rather than repeated.</p>
      </section>

      <section className={CARD}>
        <h2 className={H2}>How data moves through a shipment</h2>
        <FlowDiagram steps={[
          { label: 'Booking', note: 'Shipper and consignee details' },
          { label: 'Pickup and first mile', note: 'Partner or own fleet' },
          { label: 'Hub sorting', note: 'Scanners, warehouse systems', tone: 'risk' },
          { label: 'Line haul', note: 'Telematics, carriers' },
          { label: 'Last mile', note: 'Driver app sees address and phone', tone: 'risk' },
          { label: 'Delivery and COD', note: 'Proof of delivery, payments' },
        ]} caption="Personal data is touched at every step, often by partners. Each hand-off is a place to limit what data is shared and for how long." />
      </section>

      <section className={CARD}>
        <h2 className={H2}>Attack surface and controls</h2>
        <Table head={['Area', 'Main risks', 'Key controls']} rows={SURFACE} />
      </section>

      <section className={CARD}>
        <h2 className={H2}>Frameworks and how they fit</h2>
        <Table head={['Framework', 'Why it applies', 'How to use it']} rows={FRAMEWORKS} min={700} />
      </section>

      <section className={CARD}>
        <h2 className={H2}>Programme areas and where to find them</h2>
        <ul className={`list-disc pl-5 space-y-1 ${P}`}>
          <li>Risk assessments, risk types and security exception management: <Link className="ui-link" to="/#risk-assessment">Risk Assessment</Link></li>
          <li>Secure-by-design in product and infrastructure: <Link className="ui-link" to="/knowledge?topic=cicd">CI/CD Pipelines</Link> and <Link className="ui-link" to="/knowledge?topic=secrets">Secrets Scanning</Link></li>
          <li>Incident response and BCP-DR, including a tabletop template: <Link className="ui-link" to="/knowledge?topic=tabletop">Tabletop Exercise</Link></li>
          <li>Internal audits and classifying findings: <Link className="ui-link" to="/knowledge?topic=audit-readiness">Audit Readiness Plan</Link> and <Link className="ui-link" to="/knowledge?topic=finding-classification">Classifying Findings</Link></li>
          <li>Vendor compliance and third-party risk: <Link className="ui-link" to="/#vendor-risk">Vendor Risk</Link></li>
          <li>Awareness training: <Link className="ui-link" to="/knowledge?topic=awareness">Awareness and Physical Checks</Link></li>
          <li>DPDP obligations: <Link className="ui-link" to="/dpdpa">DPDPA</Link>; CERT-In and SEBI CSCRF: <Link className="ui-link" to="/cscrf">CSCRF</Link></li>
          <li>Interview questions for this role: Interview Prep, role "Head of Cyber Security, Compliance and Privacy: Logistics"</li>
        </ul>
      </section>

      <section className={CARD}>
        <h2 className={H2}>Logistics-specific BCP points</h2>
        <ul className={`list-disc pl-5 space-y-1 ${P}`}>
          <li>Manual workarounds at hubs if systems are down: printed manifests, offline scanning and later sync, practised before peak season.</li>
          <li>Carrier and cloud dependency map, with a fallback carrier or region for critical lanes.</li>
          <li>Peak-season freeze on risky changes, with extra monitoring.</li>
          <li>Recovery priorities set by business impact: booking and tracking APIs, hub sorting, then reporting.</li>
        </ul>
      </section>
    </div>
  );
}
