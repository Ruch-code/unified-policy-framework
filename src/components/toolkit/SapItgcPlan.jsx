// SAP ITGC assessment plan: scope, controls with transaction codes, evidence, testing, sampling, deficiencies, reporting.
const P = 'text-sm text-gray-700 dark:text-gray-300';
const H = 'mt-5 mb-1 text-base font-semibold text-gray-900 dark:text-white';
const TH = 'p-2 text-left font-semibold text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-900';
const TD = 'p-2 align-top border-t border-gray-100 dark:border-gray-700 text-gray-700 dark:text-gray-300';

function Table({ head, rows }) {
  return (
    <div className="overflow-x-auto my-2" tabIndex={0} role="region" aria-label={head.join(', ')}>
      <table className="w-full text-sm" style={{ minWidth: 720 }}>
        <thead><tr>{head.map((h) => <th key={h} scope="col" className={TH}>{h}</th>)}</tr></thead>
        <tbody>{rows.map((r) => <tr key={r[0]}>{r.map((c, j) => <td key={j} className={`${TD} ${j === 0 ? 'font-medium' : ''}`}>{c}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}

export default function SapItgcPlan() {
  return (
    <details className="rounded-2xl border border-gray-200 dark:border-gray-700 p-5 my-4" id="sap-itgc-plan">
      <summary className="cursor-pointer text-lg font-bold text-gray-900 dark:text-white">SAP ITGC assessment plan</summary>
      <div className="mt-3">
        <p className={P}>A ready-to-use plan for testing IT general controls over an SAP system (ECC or S/4HANA) that supports financial reporting. Transaction codes (T-codes) are listed so you know where to look; confirm the exact codes on the client's release, as some changed in S/4HANA.</p>

        <h3 className={H}>1. Scope</h3>
        <ul className={`list-disc pl-5 space-y-1 ${P}`}>
          <li>Systems and clients: production client(s), plus development and quality systems for change management. Include the database and operating system layers that support SAP.</li>
          <li>Modules in scope: those that feed the financial statements, usually FI, CO, MM, SD and HR/payroll.</li>
          <li>Period: the audit period (for example 12 months), with an interim and a roll-forward test if needed.</li>
          <li>Out of scope: record what is excluded and why, for example a non-financial module.</li>
        </ul>

        <h3 className={H}>2. Control matrix with T-codes</h3>
        <Table head={['Domain', 'Control', 'Where to look (T-code or table)', 'Test approach']} rows={[
          ['Access', 'New users are approved before access is granted', 'SU01, SUIM (users by creation date), table USR02', 'Sample new users and trace to approved request before the creation date'],
          ['Access', 'Leavers are removed promptly', 'SUIM, USR02 (lock status, valid-to date), HR leaver list', 'Match HR leavers to SAP users; check lock or end date against termination date'],
          ['Access', 'Periodic user access review', 'SUIM, AGR_USERS (users per role)', 'Inspect review evidence, completeness of the population and removal of flagged access'],
          ['Access', 'Privileged access restricted (SAP_ALL, SAP_NEW, critical authorisations)', 'SUIM (users by profile), SU01', 'List holders of SAP_ALL and SAP_NEW; each needs justification or removal'],
          ['Access', 'Default users secured (SAP*, DDIC, EARLYWATCH, TMSADM)', 'RSUSR003 report, profile parameter login/no_automatic_user_sapstar', 'Run RSUSR003 in each client; confirm passwords changed and users locked where not needed'],
          ['Access', 'Emergency (firefighter) access approved and reviewed', 'SAP GRC Emergency Access Management logs or custom process', 'Sample sessions; check approval, reason and log review by the owner'],
          ['Access', 'Role changes controlled', 'PFCG, role change documents', 'Sample role changes and trace to approval and transport'],
          ['Access', 'Segregation of duties', 'SAP GRC Access Risk Analysis or SUIM-based rule set', 'Run the conflict report; test mitigating controls for accepted conflicts'],
          ['Access', 'Password and logon settings', 'RSPARAM or RZ11: login/min_password_lng, login/fails_to_user_lock, rdisp/gui_auto_logout; USR40', 'Compare settings to the policy; screenshot with system ID and date'],
          ['Change', 'Changes approved, tested and moved by transport', 'STMS (import history), tables E070 and E071', 'Sample transports imported to production; trace to ticket, test sign-off and approval'],
          ['Change', 'Production is locked against direct changes', 'SE06 (system change option), SCC4 (client settings)', 'Confirm production is "not modifiable"; review any period it was opened and why'],
          ['Change', 'Developers cannot import to production', 'SUIM for S_TRANSPRT and S_CTS_ADMI authorisations', 'List users who can import; confirm they are not developers'],
          ['Change', 'Direct table changes controlled', 'SE16N edit, SM30, SCU3 (table change logs)', 'Check who can edit tables; review change logs for critical tables'],
          ['Operations', 'Batch jobs monitored and failures resolved', 'SM37 (job overview), SM36', 'Sample failed jobs and trace to follow-up; check who can schedule jobs under other users'],
          ['Operations', 'Interfaces monitored', 'SM59 (RFC destinations), WE02 or BD87 (IDocs)', 'Inspect monitoring and error resolution; review stored credentials on RFC connections'],
          ['Operations', 'Backups and restores', 'DB13 or database tooling, backup reports', 'Inspect backup logs and the last restore test'],
          ['Basis and logging', 'Security audit log enabled and reviewed', 'SM19 or RSAU_CONFIG (settings), SM20 or RSAU_READ_LOG (log)', 'Confirm critical events are logged; inspect evidence of review'],
          ['Basis and logging', 'Critical transactions locked', 'SM01 (SM01_DEV in newer releases)', 'Confirm sensitive transactions are locked in production where policy requires'],
        ]} />

        <h3 className={H}>3. Evidence request list</h3>
        <ul className={`list-disc pl-5 space-y-1 ${P}`}>
          <li>User list with creation date, last logon, lock status and valid-to date (from SUIM or USR02), with system ID and run time visible.</li>
          <li>Role and profile assignments (AGR_USERS), and holders of SAP_ALL and SAP_NEW.</li>
          <li>HR joiner and leaver lists for the period.</li>
          <li>Access requests and approvals for sampled users; access review evidence.</li>
          <li>Transport import history for production and the linked change tickets.</li>
          <li>SE06 and SCC4 screenshots and the log of any change to them.</li>
          <li>Profile parameter report (RSPARAM).</li>
          <li>Security audit log configuration and review evidence.</li>
          <li>Batch job failure list and follow-up records.</li>
          <li>Emergency access logs and reviews; SoD conflict report and mitigating controls.</li>
        </ul>

        <h3 className={H}>4. Testing strategy and sampling</h3>
        <p className={P}>For each control: walkthrough first (test of design), then test of operating effectiveness across the period. Validate every population before sampling (completeness and accuracy: who ran the report, when, with what parameters). A common sample guide is below; use your firm's methodology where one exists.</p>
        <Table head={['Control frequency', 'Typical sample size']} rows={[
          ['Annual', '1'],
          ['Quarterly', '2'],
          ['Monthly', '2 to 5'],
          ['Weekly', '5 to 15'],
          ['Daily', '20 to 40'],
          ['Many times a day (for example new users, transports)', '25 to 60, based on population and risk'],
          ['Automated or configuration setting', '1, plus evidence the setting did not change during the period'],
        ]} />

        <h3 className={H}>5. Deficiency evaluation</h3>
        <ul className={`list-disc pl-5 space-y-1 ${P}`}>
          <li>Describe the exception: condition, criteria, cause and effect.</li>
          <li>Check for compensating controls, for example a detective review that would catch the same error.</li>
          <li>Assess impact on financial reporting: which accounts, which assertions, and the likelihood and size of a misstatement.</li>
          <li>Classify as a control deficiency, significant deficiency or material weakness (SOX terms), and agree with the external auditor where relevant.</li>
          <li>For access exceptions, check what the user actually did with the access (SM20 or change documents) before concluding.</li>
        </ul>

        <h3 className={H}>6. Remediation and report</h3>
        <ul className={`list-disc pl-5 space-y-1 ${P}`}>
          <li>Each finding gets an owner, root cause, fix, target date and retest plan.</li>
          <li>Retest after the fix has operated long enough to sample (for example two quarters for a quarterly control).</li>
          <li>Report structure: executive summary, scope and approach, results by domain, findings with ratings, management responses, appendix of controls tested and samples.</li>
        </ul>
        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">T-codes and parameters are standard SAP names; availability depends on release and add-ons such as SAP GRC. Sample sizes are a common guide, not a standard.</p>
      </div>
    </details>
  );
}
