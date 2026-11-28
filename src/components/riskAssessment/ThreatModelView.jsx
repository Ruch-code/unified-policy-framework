import { Link } from 'react-router-dom';

// Asset-threat-vulnerability-defence view of risk: how threats exploit vulnerabilities to reach critical assets,
// and where defences break the path.
const P = 'text-sm leading-relaxed text-gray-700 dark:text-slate-300';
const H = 'mt-4 mb-1 text-base font-semibold text-gray-900 dark:text-white';
const TH = 'p-2.5 text-left font-semibold text-gray-900 dark:text-white bg-gray-50 dark:bg-slate-800 align-bottom';
const TD = 'p-2.5 align-top border-t border-gray-200 dark:border-slate-700 text-gray-700 dark:text-slate-300';

function Table({ head, rows, label, min = 760 }) {
  return (
    <div className="overflow-x-auto rounded border border-gray-200 dark:border-slate-700 my-2" tabIndex={0} role="region" aria-label={label}>
      <table className="w-full text-sm" style={{ minWidth: min }}>
        <thead><tr>{head.map((h) => <th key={h} scope="col" className={TH}>{h}</th>)}</tr></thead>
        <tbody>{rows.map((r) => <tr key={r[0]}>{r.map((c, j) => <td key={j} className={`${TD} ${j === 0 ? 'font-semibold text-gray-900 dark:text-white' : ''}`}>{c}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}

const FLOW = [
  ['Threats', 'Who could cause harm', 'External actors (criminals, hacktivists, nation states), internal actors (careless or malicious staff), supplier actors (vendors and their staff or systems)'],
  ['Vulnerabilities', 'Weaknesses they can exploit', 'Software bugs, software vulnerabilities (unpatched CVEs, insecure code), infrastructure vulnerabilities (misconfiguration, weak network design, end-of-life systems)'],
  ['Defences', 'Controls that block or detect the attack path', 'Network firewalls, IP allow-listing, network segmentation, segregation of duties, data encryption, anti-malware, least privilege access, hardened services, IPS/IDS, security monitoring'],
  ['Critical assets', 'What must be protected', 'Credentials, sensitive emails, personal data (PII), admin workstations, data centre, credit card data'],
];

const ASSETS = [
  ['Credentials', 'Phishing, credential stuffing, insider misuse', 'Weak or reused passwords, no MFA, secrets in code', 'MFA, least privilege, password vault, secret scanning, security monitoring'],
  ['Sensitive emails', 'Business email compromise, mailbox takeover, insider forwarding', 'No MFA, auto-forward allowed, weak email authentication', 'MFA, DLP, block auto-forwarding, SPF/DKIM/DMARC, monitoring'],
  ['PII data', 'Data theft by attackers, insiders or suppliers', 'Unencrypted stores, broad access, unpatched apps', 'Encryption, least privilege, segmentation, DLP, access reviews'],
  ['Admin workstations', 'Malware leading to privileged access', 'Unpatched OS, local admin rights, general browsing', 'Hardened builds, anti-malware/EDR, privileged access workstations, segregation of duties'],
  ['Data centre', 'Physical intrusion, network attacks, supplier access', 'Flat network, open management ports, weak physical controls', 'Firewalls, segmentation, IP allow-listing, IPS/IDS, physical security'],
  ['Credit card data', 'Card skimming, database theft', 'Card data outside the PCI scope boundary, weak encryption', 'Tokenisation, encryption, segmentation of the cardholder data environment, monitoring'],
];

export default function ThreatModelView() {
  return (
    <details className="my-6 rounded-xl border border-gray-200 dark:border-slate-700 p-5" id="threat-model-view">
      <summary className="cursor-pointer text-lg font-bold text-gray-900 dark:text-white">Threat model: assets, threats, vulnerabilities and defences</summary>
      <div className="mt-3">
        <p className={P}>A simple threat model reads from right to left: a threat actor exploits a vulnerability to reach a critical asset. Risk is high where a valuable asset sits behind a weakness that a capable threat can exploit. Defences sit in the path to block, slow down or detect the attack. A risk exists only when all three are present: an asset worth protecting, a threat, and a vulnerability the threat can use.</p>

        <h3 className={H}>The four elements</h3>
        <Table label="Threat model elements" head={['Element', 'Question it answers', 'Examples']} rows={FLOW} />

        <h3 className={H}>Asset by asset</h3>
        <Table label="Threat model by asset" head={['Critical asset', 'Likely threats', 'Typical vulnerabilities', 'Defences']} rows={ASSETS} min={900} />

        <h3 className={H}>How to use it in a risk assessment</h3>
        <ol className={`list-decimal pl-5 space-y-1 ${P}`}>
          <li>List critical assets with owners and their value to the business.</li>
          <li>For each asset, name the realistic threat actors: external, internal and supplier.</li>
          <li>Identify the vulnerabilities each threat could use, from scans, pen tests, audits and architecture reviews.</li>
          <li>Map the defences already in place on each path and test whether they work.</li>
          <li>Rate the remaining risk and add controls where a high-value asset has an open path.</li>
          <li>Repeat when assets, threats or the architecture change.</li>
        </ol>
        <p className={`mt-2 ${P}`}>Structured methods such as STRIDE and PASTA are in <Link className="ui-link" to="/knowledge?topic=infranet">Infra and Network Audit</Link>; threat modelling in the development lifecycle is in the <Link className="ui-link" to="/#engineering-partnership">Engineering Partnership</Link> module.</p>
      </div>
    </details>
  );
}
