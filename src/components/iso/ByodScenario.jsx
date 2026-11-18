import { Link } from 'react-router-dom';
import FlowDiagram from '../crypto/FlowDiagram.jsx';

// Worked audit scenario for the ISO 27001 Lead Implementer scoping section:
// unmanaged BYOD access to corporate data, and how to classify it.
const P = 'text-sm text-gray-700 dark:text-gray-300';
const H = 'font-semibold text-gray-900 dark:text-white mt-4 mb-1';
const TH = 'p-2 text-left font-semibold text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-900';
const TD = 'p-2 align-top border-t border-gray-100 dark:border-gray-700 text-gray-700 dark:text-gray-300';

const GAPS = [
  ['Username and password only, no MFA', 'A.8.5 Secure authentication', 'Enforce MFA for all access to corporate systems, phishing-resistant for admins'],
  ['Personal devices with no management (no MDM)', 'A.8.1 User endpoint devices; A.6.7 Remote working', 'Enrol devices in MDM, or use app protection policies on BYOD that keep corporate data in a managed container'],
  ['No endpoint security', 'A.8.7 Protection against malware', 'Require EDR or anti-malware as a condition of access, checked by conditional access'],
  ['No DLP', 'A.8.12 Data leakage prevention', 'Block download, copy and print of classified data to unmanaged devices; apply DLP on email and cloud storage'],
  ['No VDI or secure workspace', 'A.8.1, A.6.7 (a design choice, not a requirement)', 'Offer VDI or browser-only access for users who will not enrol their device'],
  ['No firewall rule review', 'A.8.20 Networks security; A.8.22 Segregation of networks', 'Review firewall and security group rules at least every six months, with owner sign-off'],
  ['No BYOD rules', 'A.5.10 Acceptable use; A.6.2 Terms of employment', 'Approve a BYOD policy with minimum device requirements and signed acknowledgement'],
];

export default function ByodScenario() {
  return (
    <details id="byod-scenario" className="max-w-6xl mx-auto my-4 px-4 scroll-mt-24 group">
      <summary className="cursor-pointer rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 text-lg font-bold text-gray-900 dark:text-white">Worked scenario: staff access corporate data from unmanaged personal devices</summary>
      <div className="mt-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 md:p-5">
        <p className={P}><span className="font-semibold">The situation:</span> employees reach corporate data on their own devices (BYOD) with only a username and password. There is no MFA, no MDM, no endpoint security, no DLP, no VDI and no firewall rule review.</p>

        <h3 className={H}>Nonconformity, conformity or finding?</h3>
        <p className={P}>ISO 27001 does not require any specific tool. It requires you to assess risks and treat them (clauses 6.1.2 and 6.1.3), and to implement the controls your Statement of Applicability says apply. So the classification depends on what the ISMS says, not on the missing tools alone.</p>
        <FlowDiagram title="How to decide" steps={[
          { label: 'Was the BYOD risk assessed?', note: 'Clause 6.1.2' },
          { label: 'Treatment chosen and approved?', note: 'Clause 6.1.3, risk owner' },
          { label: 'Controls marked applicable in SoA?', note: 'A.8.1, A.8.5, A.8.7, A.8.12' },
          { label: 'Are they implemented?', tone: 'risk', note: 'No: nonconformity' },
          { label: 'Formally accepted with reason?', tone: 'safe', note: 'Yes: not an NC, possibly an OFI' },
        ]} />

        <h3 className={H}>In this scenario: nonconformity, most likely major</h3>
        <ul className={`list-disc pl-5 space-y-1 ${P}`}>
          <li><span className="font-medium">Why it is a nonconformity:</span> corporate data is reachable from devices the organisation does not control, protected only by a password. Unless the risk was assessed and formally accepted, the organisation has not treated an obvious risk (clause 6.1.3), and the endpoint and authentication controls in the SoA are not in place.</li>
          <li><span className="font-medium">Why major:</span> it affects every user and all corporate data, several controls are missing at once, and there is no compensating control. That puts the ISMS's ability to protect information in doubt, which is the usual test for a major.</li>
          <li><span className="font-medium">When it would be minor:</span> if most controls exist and one is missing in part, for example MFA covers everything except one legacy app.</li>
          <li><span className="font-medium">When it is not a nonconformity:</span> if the risk was assessed, the risk owner formally accepted it with a reason and an expiry date, and that matches the risk acceptance criteria. The auditor may still raise an opportunity for improvement.</li>
        </ul>

        <h3 className={H}>Suggested finding wording</h3>
        <p className={`${P} italic`}>"Staff access corporate email and file storage from personal devices using only a username and password. No MFA, device management, endpoint protection or data leakage controls are applied, and no risk acceptance was found for this. This does not meet clause 6.1.3 or controls A.8.1, A.8.5, A.8.7 and A.8.12, which the Statement of Applicability marks as applicable."</p>

        <h3 className={H}>Gaps, controls and recommendations</h3>
        <div className="overflow-x-auto" tabIndex={0} role="region" aria-label="BYOD gaps and recommendations">
          <table className="w-full min-w-[640px] text-sm">
            <thead><tr>{['Gap', 'ISO 27001:2022 control', 'Recommendation'].map((h) => <th key={h} scope="col" className={TH}>{h}</th>)}</tr></thead>
            <tbody>{GAPS.map((r) => <tr key={r[0]}>{r.map((c, j) => <td key={j} className={`${TD} ${j === 0 ? 'font-medium' : ''}`}>{c}</td>)}</tr>)}</tbody>
          </table>
        </div>

        <h3 className={H}>Order of fixes</h3>
        <FlowDiagram steps={[
          { label: 'MFA for everyone', note: 'Days, biggest risk reduction' },
          { label: 'Conditional access', note: 'Block unhealthy devices' },
          { label: 'MDM or app protection', note: 'Weeks' },
          { label: 'EDR and DLP', note: 'Weeks to months' },
          { label: 'BYOD policy and training' },
          { label: 'Firewall review cycle', tone: 'safe' },
        ]} caption="For the audit, record the corrective action with owners and dates, then show evidence of each step as it closes." />
        <p className={`mt-3 ${P}`}>See also <Link className="ui-link" to="/knowledge?topic=edp">Endpoint and Data Protection</Link> and <Link className="ui-link" to="/knowledge?topic=finding-classification">Classifying Findings</Link>.</p>
      </div>
    </details>
  );
}
