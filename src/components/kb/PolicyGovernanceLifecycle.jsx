import SortableGrid from './SortableGrid.jsx';
import { NewBadge } from '../updates/UpdateBits.jsx';

// Extends the Policy Lifecycle topic: governance flow, RACI, exceptions register and an adoption check.
const P = 'text-sm text-gray-700 dark:text-gray-300';
const H = 'mt-4 mb-1 text-base font-semibold text-gray-900 dark:text-white';
const BOX = 'rounded-2xl border border-gray-200 dark:border-gray-700 p-5 my-4';

const FLOW = ['Need identified', 'Draft', 'Stakeholder review', 'Legal and HR review', 'Approval authority', 'Publish', 'Communicate and acknowledge', 'Implement and train', 'Monitor compliance', 'Exceptions register', 'Annual review or review on trigger', 'Retire'];

const RACI = [
  ['Identify need and draft', 'Policy owner', 'CISO or function head', 'Security, IT, affected teams', 'Leadership'],
  ['Legal and HR review', 'Legal and HR', 'Policy owner', 'Privacy, compliance', 'Policy owner'],
  ['Approve', 'Approval authority (for example CISO, executive committee or board)', 'Approval authority', 'Policy owner', 'All staff'],
  ['Publish and communicate', 'Compliance or GRC team', 'Policy owner', 'Internal communications', 'All affected staff'],
  ['Acknowledge and train', 'Line managers', 'HR', 'Security awareness lead', 'Policy owner'],
  ['Monitor and report compliance', 'GRC team', 'Policy owner', 'Internal audit', 'Leadership'],
  ['Approve exceptions', 'Risk owner', 'CISO or delegated authority', 'Policy owner', 'GRC team'],
  ['Review and retire', 'Policy owner', 'Approval authority', 'Affected teams', 'All staff'],
];

const EXCEPTIONS = [
  ['EX-001', 'Access Control Policy 4.2 (MFA on all admin access)', 'Legacy plant system cannot support MFA', 'Network isolation and jump host with logging', 'Operations manager', 'CISO', '[Date]', '[Date + 6 months]', 'Open'],
  ['EX-002', 'Change Management Policy 3.1 (peer review)', 'Two-person team during leave period', 'Weekly review of all production changes by engineering lead', 'Engineering lead', 'CTO', '[Date]', '[Date + 3 months]', 'Open'],
  ['EX-003', 'Data Retention Standard 2.4', 'Contract requires longer customer data retention', 'Restricted access and encryption; contract clause recorded', 'Legal', 'DPO', '[Date]', '[Contract end]', 'Closed'],
];

export default function PolicyGovernanceLifecycle() {
  return (
    <details className={BOX} id="policy-governance-lifecycle">
      <summary className="cursor-pointer text-lg font-bold text-gray-900 dark:text-white">Policy governance lifecycle, RACI and exceptions register<NewBadge /></summary>
      <p className="mt-1 text-[11px] text-gray-500 dark:text-slate-400">Last verified: 26 Nov 2026</p>
      <div className="mt-3">
        <h3 className={H}>Lifecycle</h3>
        <ol className="flex flex-wrap gap-2" aria-label="Policy governance lifecycle">
          {FLOW.map((s, i) => (
            <li key={s} className="flex items-center gap-2 text-sm">
              <span className="rounded-lg border border-indigo-300 dark:border-indigo-700 bg-indigo-50 dark:bg-indigo-900/30 px-2 py-1 text-gray-900 dark:text-white"><span className="font-semibold">{i + 1}.</span> {s}</span>
              {i < FLOW.length - 1 && <span aria-hidden="true" className="text-gray-400">→</span>}
            </li>
          ))}
        </ol>

        <h3 className={H}>RACI</h3>
        <SortableGrid label="Policy governance RACI" headers={['Activity', 'Responsible', 'Accountable', 'Consulted', 'Informed']} rows={RACI} file="policy-governance-raci" min={860} />

        <h3 className={H}>Policy exceptions register (template)</h3>
        <p className={P}>Use Export (.xlsx) to download the register with these example rows, then replace them with your own.</p>
        <SortableGrid label="Policy exceptions register" headers={['ID', 'Policy and clause', 'Reason', 'Compensating control', 'Risk owner', 'Approver', 'Approved on', 'Expires on', 'Status']} rows={EXCEPTIONS} file="policy-exceptions-register" min={1200} />

        <h3 className={H}>Governance for the Change and Incident Management policies</h3>
        <SortableGrid label="Policy governance for change and incident management" headers={['Item', 'Change Management policy', 'Incident Management policy']} file="change-incident-policy-governance" min={900} rows={[
          ['Policy owner', 'Head of IT operations or engineering', 'CISO or head of security operations'],
          ['Approver', 'CIO or CTO', 'CISO, with executive sign-off'],
          ['Review frequency', 'Yearly, and after major process or tooling changes', 'Yearly, and after every major incident or exercise'],
          ['Exceptions', 'Recorded in the exceptions register with expiry and compensating control', 'Recorded in the exceptions register with expiry and compensating control'],
          ['Monitoring', 'Failed change rate, emergency change share, unauthorised changes found', 'MTTD, MTTR, incidents by severity, overdue post-incident actions'],
          ['Audit evidence', 'Change population from the tool, sampled tickets with approval, test and backout plan, post-implementation reviews', 'Incident register, sampled records with timeline, notification decisions, post-incident reviews, exercise reports'],
        ]} />

        <h3 className={H}>Sample policy language</h3>
        <div className={`rounded-lg border border-gray-200 dark:border-slate-700 p-3 ${P}`}>
          <p><strong>Change Management:</strong> &quot;All changes to production systems must be recorded in the change management tool, assessed for risk and impact, tested, and approved before implementation according to their category. The person who develops a change must not be the only person to approve and deploy it. Emergency changes may be implemented to restore service or prevent harm, but must be approved retrospectively within two working days. Every normal and emergency change must include a backout plan.&quot;</p>
          <p className="mt-2"><strong>Incident Management:</strong> &quot;All employees and contractors must report suspected security incidents immediately through the approved channels. The security team will classify each incident by severity and assign an incident commander for high and critical incidents. Evidence must be preserved and handled to maintain its integrity. Legal and privacy teams must be consulted on any incident that may involve personal or regulated data, to decide on notification. A post-incident review must be completed for every high and critical incident.&quot;</p>
        </div>

        <div className="mt-4 rounded-xl border border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-900/20 p-4">
          <p className="font-semibold text-gray-900 dark:text-white">Approved isn&apos;t the same as implemented</p>
          <p className={P}>After a policy is approved or changed, check that it is followed: training completion for affected staff, configuration evidence that the rule is enforced (for example MFA or branch protection settings), and a spot check about 30 days after the change.</p>
        </div>
      </div>
    </details>
  );
}
