import { sectionCls, h3Cls, leadCls } from './riskUtils.jsx';

// Security exception management: time-bound, approved departures from a policy or standard.
const TH = 'p-2 text-left font-semibold text-navy-900 dark:text-text-dark-primary bg-surface-50 dark:bg-slate-800 align-top';
const TD = 'p-2 align-top border-t border-surface-200 dark:border-surface-dark-200 text-navy-700 dark:text-text-dark-secondary';
const P = 'text-sm text-navy-700 dark:text-text-dark-secondary';

const STEPS = [
  ['1. Request', 'Owner submits one form: which policy or standard is not met, the system, why, and the business impact of complying now', 'Requester'],
  ['2. Assess', 'Security rates the risk with the same scoring as the risk register and proposes a compensating control', 'Security or GRC'],
  ['3. Approve', 'Approver depends on risk: CISO for medium, leadership for high, no approval for critical (fix instead)', 'CISO or leadership'],
  ['4. Record', 'Entry in the exception register with expiry date (usually 6 to 12 months at most) and remediation plan', 'GRC'],
  ['5. Monitor', 'Monthly review of open exceptions; reminders 30 days before expiry', 'GRC'],
  ['6. Close or renew', 'Close when fixed with evidence. Renewal needs a fresh review; nothing renews automatically. Expired exceptions become findings', 'Owner and approver'],
];

const REGISTER = ['Exception ID', 'Policy or standard', 'System', 'Reason', 'Risk score', 'Compensating control', 'Owner', 'Approver', 'Approved on', 'Expires on', 'Remediation plan', 'Status'];
const EXAMPLE = ['EXC-014', 'Access control standard: MFA on all systems', 'Legacy warehouse management system at regional hubs', 'Vendor version does not support SSO or MFA; upgrade planned', '12 (High)', 'Network isolation to hub VLAN, IP allow-list, quarterly account review, login alerts', 'Head of Warehouse IT', 'CISO and CTO', '[DATE]', '[DATE + 6 months]', 'Upgrade to supported version with SSO by [DATE]', 'Open'];

export default function SecurityExceptions() {
  return (
    <section id="ra-exceptions" className={sectionCls}>
      <h3 className={h3Cls}>Security exception management</h3>
      <p className={leadCls}>An exception is a time-bound, approved departure from a policy or standard. It is a form of risk acceptance, so it uses the same scoring, but it always has an expiry date and a compensating control.</p>
      <div className="overflow-x-auto" tabIndex={0} role="region" aria-label="Exception process">
        <table className="w-full text-sm min-w-[640px]">
          <thead><tr>{['Step', 'What happens', 'Who'].map((h) => <th key={h} scope="col" className={TH}>{h}</th>)}</tr></thead>
          <tbody>{STEPS.map((r) => <tr key={r[0]}>{r.map((c, j) => <td key={j} className={`${TD} ${j === 0 ? 'font-medium whitespace-nowrap' : ''}`}>{c}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <h4 className="mt-5 mb-2 font-semibold text-navy-900 dark:text-text-dark-primary">Exception register, with an example</h4>
      <div className="overflow-x-auto" tabIndex={0} role="region" aria-label="Exception register">
        <table className="w-full text-sm min-w-[1500px]">
          <thead><tr>{REGISTER.map((h) => <th key={h} scope="col" className={TH}>{h}</th>)}</tr></thead>
          <tbody><tr>{EXAMPLE.map((c, j) => <td key={j} className={TD}>{c}</td>)}</tr></tbody>
        </table>
      </div>
      <p className={`mt-3 ${P}`}>Report open exceptions to leadership by age and risk. A growing list usually means a standard is unrealistic or a fix is not funded. Auditors check that exceptions were approved before the deviation and were not expired at the time of testing (ISO 27001 clause 6.1.3 and 8.3; SOC 2 CC3.2 and CC5.3).</p>
    </section>
  );
}
