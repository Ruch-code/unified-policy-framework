import * as D from '../data/infraNetworkAudit.js';

const LINE = 'border-gray-200 dark:border-slate-700';
const TXT = 'text-gray-700 dark:text-slate-300';
const H = 'text-gray-900 dark:text-white';

function Rows({ label, headers, rows, min = 600 }) {
  return (
    <div className={`overflow-x-auto rounded border ${LINE}`} tabIndex={0} role="region" aria-label={label}>
      <table className="w-full text-sm" style={{ minWidth: min }}>
        <thead className="bg-gray-50 dark:bg-slate-800"><tr>{headers.map((h) => <th key={h} scope="col" className={`text-left p-2 font-semibold ${H}`}>{h}</th>)}</tr></thead>
        <tbody>{rows.map((r) => <tr key={r[0]} className={`border-t ${LINE} align-top`}>{r.map((c, j) => <td key={j} className={`p-2 ${j === 0 ? `font-semibold ${H}` : TXT}`}>{c}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}

const Sub = ({ children }) => <h3 className={`text-base font-semibold pt-2 ${H}`}>{children}</h3>;

export default function InfraNetworkAudit() {
  return (
    <div id="infra-network-audit" className="bg-white border border-gray-200 rounded p-5 dark:bg-[#1e293b] dark:border-[#334155] space-y-4">
      <h2 className={`text-xl font-bold ${H}`}>Infrastructure and Network Security Audit</h2>
      <p className={`text-sm max-w-3xl ${TXT}`}>{D.INTRO}</p>

      <Sub>Asset inventory</Sub>
      <Rows label="Asset inventory" headers={['Area', 'What it covers', 'Audit questions']} rows={D.ASSET_INVENTORY} min={800} />

      <Sub>Network basics</Sub>
      <Rows label="Network basics" headers={['Term', 'Meaning']} rows={D.NETWORK_BASICS} />
      <Sub>OSI vs TCP/IP and where controls sit</Sub>
      <Rows label="OSI and TCP/IP" headers={['OSI layer', 'TCP/IP layer', 'Examples', 'Controls at this layer']} rows={D.OSI_TCPIP} min={800} />

      <Sub>Firewall types</Sub>
      <Rows label="Firewall types" headers={['Type', 'Layer', 'How it works']} rows={D.FIREWALL_TYPES} min={800} />
      <Sub>How to audit a firewall</Sub>
      <Rows label="Firewall audit" headers={['Area', 'What to ask', 'Evidence']} rows={D.FIREWALL_AUDIT} min={900} />
      <Sub>Checks on traffic to a port</Sub>
      <Rows label="Traffic checks" headers={['Check', 'What it confirms']} rows={D.TRAFFIC_CHECKS} />
      <Sub>Common ports</Sub>
      <Rows label="Common ports" headers={['Port', 'Service', 'Audit view']} rows={D.PORTS} min={700} />
      <Sub>Insecure ports and their secure replacements</Sub>
      <Rows label="Insecure ports" headers={['Port', 'Service', 'Why it is insecure', 'Secure alternative']} rows={D.INSECURE_PORTS} min={900} />
      <Sub>Secure ports</Sub>
      <Rows label="Secure ports" headers={['Port', 'Service', 'What it protects', 'What to verify']} rows={D.SECURE_PORTS} min={900} />
      <p className={`text-sm max-w-3xl ${TXT}`}>{D.PORT_NOTE}</p>

      <Sub>Email security</Sub>
      <Rows label="Email security" headers={['Control', 'What it does', 'What good looks like']} rows={D.EMAIL_SECURITY} min={900} />

      <Sub>Defence in depth</Sub>
      <Rows label="Defence in depth" headers={['Layer', 'What to check', 'Evidence']} rows={D.DEFENCE_IN_DEPTH} min={1000} />
      <Sub>Wireless security</Sub>
      <Rows label="Wireless" headers={['Area', 'Expectation']} rows={D.WIRELESS} />

      <Sub>Encoding, hashing and encryption</Sub>
      <Rows label="Cryptography" headers={['Term', 'Meaning']} rows={D.CRYPTO} />

      <Sub>Vulnerability scanning vs penetration testing</Sub>
      <Rows label="Vulnerability scan vs pentest" headers={['', 'Vulnerability scan', 'Penetration test']} rows={D.VULN_VS_PENTEST} min={800} />
      <Rows label="Security teams" headers={['Term', 'Meaning']} rows={D.TEAMS} />
      <Sub>Bug bounty</Sub>
      <Rows label="Bug bounty" headers={['Topic', 'Detail']} rows={D.BUG_BOUNTY} />
      <Sub>Application security in the SDLC</Sub>
      <Rows label="SAST and DAST" headers={['Term', 'Meaning']} rows={D.APPSEC} />
      <Sub>Threat modelling and intelligence</Sub>
      <Rows label="Threat modelling" headers={['Method', 'Summary']} rows={D.THREAT_MODELS} />

      <Sub>Operational controls</Sub>
      <Rows label="Operational controls" headers={['Control', 'What to check', 'Evidence']} rows={D.OPS} min={1000} />
      <Sub>Business continuity and disaster recovery</Sub>
      <Rows label="BCP and DR" headers={['Term', 'Meaning']} rows={D.BCDR} />
      <Sub>Phishing and awareness</Sub>
      <Rows label="Phishing triggers" headers={['Trigger', 'Example and note']} rows={D.PHISHING} />

      <Sub>Risk management</Sub>
      <Rows label="Risk assessment steps" headers={['Step', 'Activity']} rows={D.RISK_STEPS} />
      <Rows label="Risk register fields" headers={['Field', 'Purpose']} rows={D.RISK_REGISTER} />
      <Rows label="Quantitative risk" headers={['Measure', 'Formula']} rows={D.QUANT} />

      <p className="text-xs text-gray-500 dark:text-slate-400">Guidance is general. Confirm review frequencies and SLAs against the framework and contracts in scope.</p>
    </div>
  );
}
