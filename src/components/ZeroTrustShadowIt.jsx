import GrcAngle from './kb/GrcAngle.jsx';
import * as D from '../data/zeroTrustShadowIt.js';
import MappingWorkbookCard from './mappings/MappingWorkbookCard.jsx';
import ZT_MAPPING from '../data/mappings/zeroTrust.json';

const LINE = 'border-gray-200 dark:border-slate-700';
const TXT = 'text-gray-700 dark:text-slate-300';
const H = 'text-gray-900 dark:text-white';

function Rows({ label, headers, rows, min = 900 }) {
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

export default function ZeroTrustShadowIt() {
  return (
    <div id="zero-trust-shadow-it" className="bg-white border border-gray-200 rounded p-5 dark:bg-[#1e293b] dark:border-[#334155] space-y-4">
      <h2 className={`text-xl font-bold ${H}`}>Zero Trust and Shadow IT</h2>
      <Sub>Zero trust principles</Sub>
      <p className={`text-sm max-w-3xl ${TXT}`}>{D.ZT_INTRO}</p>
      <Rows label="Zero trust principles" headers={['Principle', 'What it means', 'Practical example', 'Evidence an auditor accepts']} rows={D.ZT_PRINCIPLES} min={1100} />
      <Sub>Access models and NIST SP 800-207</Sub>
      <p className={`text-sm max-w-3xl ${TXT}`}>NIST SP 800-207 describes zero trust architecture: never trust, always verify. A policy decision point decides each request and a policy enforcement point applies it, using identity, device and context signals.</p>
      <ul className={`list-disc pl-5 space-y-1 text-sm max-w-3xl ${TXT}`}>
        <li><strong>RBAC (role-based):</strong> access follows the job role, for example payroll clerk. Simple, but roles grow too broad over time.</li>
        <li><strong>ABAC (attribute-based):</strong> access depends on attributes of the user, resource and context, such as department, data classification, device health and location.</li>
        <li><strong>PBAC (policy-based):</strong> central written policies combine roles and attributes into rules, often managed as code.</li>
        <li><strong>MFA and continuous verification:</strong> phishing-resistant MFA at sign-in, then trust is re-checked during the session when risk changes.</li>
        <li><strong>Least privilege:</strong> only the access needed, for only as long as needed.</li>
      </ul>
      <GrcAngle>ISO 27001:2022 A.5.15 (access control), A.5.18 (access rights), A.8.2 (privileged access), A.8.5 (secure authentication), A.8.22 (segregation of networks); SOC 2 CC6.1 to CC6.3. Evidence: access policy, MFA reports, access reviews, conditional access rules.</GrcAngle>
      <Sub>{D.ZT_SCENARIO_TITLE}</Sub>
      <Rows label="Zero trust worked example" headers={['Step', 'What happens', 'Principle applied']} rows={D.ZT_SCENARIO} />
      <p className={`text-sm max-w-3xl ${TXT}`}>{D.ZT_CONTRAST}</p>
      <Sub>Maturity by pillar (CISA Zero Trust Maturity Model)</Sub>
      <Rows label="Zero trust pillars" headers={['Pillar', 'Typical starting point', 'Target state']} rows={D.ZT_PILLARS} />
      <Sub>Shadow IT</Sub>
      <p className={`text-sm max-w-3xl ${TXT}`}>{D.SIT_INTRO}</p>
      <Rows label="Shadow IT examples" headers={['Practical example', 'Risk', 'How it is found', 'Response']} rows={D.SIT_SCENARIOS} min={1100} />
      <Sub>How to discover shadow IT</Sub>
      <Rows label="Shadow IT discovery" headers={['Source', 'What it shows']} rows={D.SIT_DISCOVERY} min={600} />
      <Sub>How to reduce it</Sub>
      <Rows label="Reducing shadow IT" headers={['Practice', 'Why it works']} rows={D.SIT_PREVENT} min={600} />
      <Sub>Related framework requirements</Sub>
      <MappingWorkbookCard bare data={ZT_MAPPING} intro="Download the control-by-control mapping for zero trust and shadow IT across ISO 27001:2022, SOC 2, NIST SP 800-207 and CSF 2.0, and HIPAA. Control references are paraphrased for orientation. Check the official text before relying on them." />
    </div>
  );
}
