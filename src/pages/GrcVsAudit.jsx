import { Link } from 'react-router-dom';

// GRC (first/second line: design, own, run, prove) vs audit (independent assurance: test, sample, conclude), side by side.
const TH = 'p-3 text-left font-semibold text-gray-900 dark:text-white bg-gray-50 dark:bg-slate-800 align-bottom';
const TD = 'p-3 align-top border-t border-gray-200 dark:border-slate-700 text-gray-700 dark:text-slate-300';

const CORE = [
  ['Role', 'Helps the business design, run and improve controls; owns the programme', 'Independently checks whether controls are designed well and actually worked'],
  ['Main question', 'Are we managing this risk well enough, and how do we get better?', 'Can I rely on this control, based on evidence?'],
  ['Time view', 'Now and next: current risk, upcoming changes, roadmap', 'The audit period that already happened'],
  ['Output', 'Risk register, policies, control design, remediation plans, metrics', 'Test results, findings, opinion or report'],
  ['Attitude to gaps', 'Find early, fix, accept risk formally if needed', 'Report what was found; a fix after the period does not erase the exception'],
  ['Independence', 'Part of the organisation; can advise and build', 'Must not audit work they designed or ran'],
  ['Evidence', 'Builds and keeps evidence as a by-product of running controls', 'Requests evidence, checks completeness and accuracy, samples it'],
  ['Success looks like', 'Lower risk, fewer surprises, smooth audits', 'A supportable conclusion, with no missed material issues'],
];

const TOPICS = [
  ['User access review', 'Define review frequency and owners, automate the user lists, make sure managers actually review and removals happen', 'Is the user list complete? Was every in-scope app reviewed on time, by the right person? Were removals done? Samples leavers and new joiners', 'Dated system user exports, signed reviews, removal tickets, HR leaver list', '/#access-governance'],
  ['Shared accounts', 'Reduce them, keep credentials in a vault, name the people who can use them, rotate after leavers', 'Who can actually use the account, and was the password rotated when someone left?', 'Shared account register, vault sharing list and checkout log, rotation records', '/#access-governance'],
  ['Segregation of duties', 'Build the conflict matrix with the business, design roles that avoid conflicts, set up mitigating reviews where conflicts are unavoidable', 'Do any users hold conflicting access? Were exceptions approved and did the mitigating control actually operate?', 'Conflict matrix, SoD conflict report, exception register, mitigating review evidence', '/#access-governance'],
  ['Firewall review', 'Set the review standard, make sure every rule has an owner and reason, retire unused rules', 'Was every rule reviewed in the period? Were risky rules fixed? Were changes approved before going live?', 'Dated rule export with hit counts, signed review, change and remediation tickets', '/knowledge?topic=infra-review'],
  ['Change management', 'Design a workable process that engineers follow, with automation in the pipeline', 'For a sample of changes: approved before release, tested, and made by someone other than the approver?', 'Complete change population from the system, sampled tickets, deployment logs', '/knowledge?topic=change'],
  ['Vulnerability management', 'Set SLAs by severity, track ageing, agree exceptions with owners', 'Were scans run as required, and were critical findings fixed within SLA or formally excepted?', 'Scan schedules and reports, ticket ageing, exception approvals', '/#regional'],
  ['Incident response', 'Write and test the plan, run tabletop exercises, improve after incidents', 'Was the plan tested? For sampled incidents, were they logged, classified, escalated and closed with lessons learned?', 'IR plan, test report, incident tickets, post-incident reviews', '/#regional'],
  ['Vendor risk', 'Tier vendors, assess the critical ones, put security terms in contracts, monitor', 'Is the vendor list complete? Were high-risk vendors assessed before onboarding and reviewed on schedule?', 'Vendor inventory, assessments, SOC reports reviewed, contracts', '/#vendor-risk'],
  ['DLP', 'Choose channels and rules, tune policies, manage exceptions', 'Is DLP enforced or only monitoring? Do test scenarios get blocked? Are alerts reviewed?', 'Rule exports, scenario test results, alert tickets, exception register', '/knowledge?topic=edp'],
  ['Business continuity (BIA)', 'Run the BIA with owners, set recovery targets, close gaps between need and capability', 'Is the BIA current and approved? Were plans tested and did recovery meet the targets?', 'BIA records, approved RTO/RPO, exercise reports, action closure', '/iso/22301'],
  ['Policies', 'Write usable policies, map them to controls, keep them current', 'Approved, reviewed on schedule, communicated, and does practice match the policy?', 'Version history, approvals, acknowledgements, evidence of practice', '/knowledge?topic=policy-lifecycle'],
];

const GAPS = [
  ['1. Spotting the gap', 'Self-assessment, control monitoring, risk reviews, metrics and incidents show a control is weak or missing', 'Walkthroughs, design review, sample testing and reperformance show the control failed or does not exist'],
  ['2. Judging it', 'Rates the risk against appetite: likelihood, impact, who is affected', 'Classifies it: design gap or operating failure, and severity (deficiency, significant deficiency, material weakness, or minor or major nonconformity)'],
  ['3. Recording it', 'Risk register and issue tracker with owner, due date and treatment', 'Finding or exception in the audit report or management letter'],
  ['4. Responding', 'Builds the fix: new control, automation, policy or process change; or formal risk acceptance with an approver and expiry', 'Asks for a management response and action plan; does not design the fix'],
  ['5. Closing it', 'Collects evidence that the fix operated for long enough, then retests before closing', 'Validates remediation in follow-up or the next audit; a fix after the period does not change the earlier result'],
];

const SOD = [
  ['Purpose', 'Prevent one person from both doing and hiding a harmful action, while keeping the business able to work', 'Confirm no user can complete a high-risk process alone without detection'],
  ['Conflict matrix', 'Build it with process owners: which functions conflict and how severe each risk is', 'Inspect the matrix: is it complete for in-scope processes, approved and current?'],
  ['Role design', 'Design roles that avoid conflicts from the start; remove toxic combinations from role templates', 'Test that role definitions match the matrix; look for conflicts hidden in composite roles'],
  ['Provisioning', 'Run a conflict check in the access request so approvers see the risk before approving', 'Sample new access and role changes: was the conflict check done before access was granted?'],
  ['Accepted conflicts', 'Where a small team cannot separate duties, agree a mitigating control with an owner, frequency and expiry', 'Check each exception was approved at the right level and that the mitigating review actually ran, with evidence'],
  ['Privileged and emergency access', 'Time-bound break-glass access with logging and independent review', 'Sample sessions: reason, log and reviewer sign-off by someone other than the user'],
  ['Monitoring', 'Include SoD results in the periodic access review and track conflicts as a KRI', 'Confirm conflicts are in the review population and removals were completed'],
  ['Actual activity', 'Use transaction monitoring for the highest-risk conflicts', 'For high-risk conflicts, check whether anyone actually performed both steps'],
  ['Evidence', 'Keep the matrix, conflict reports, exception register and mitigation evidence as you go', 'Requests a complete user and role export, the conflict report, the exception register and mitigation records'],
  ['Outcome', 'Fewer conflicts over time, each remaining one owned and mitigated', 'A conclusion: effective, or a deficiency with severity based on what could go wrong'],
];

const QUESTIONS = [
  ['GRC asks', 'What is our biggest risk here, who owns it, and what is the plan?', 'Audit asks', 'Show me the evidence that the control operated for the full period.'],
  ['GRC asks', 'Is this control proportionate to the risk and practical for the team?', 'Audit asks', 'How do I know this population is complete and accurate?'],
  ['GRC asks', 'Can we automate this so evidence is produced as we work?', 'Audit asks', 'Who performed it, when, and was it someone independent?'],
  ['GRC asks', 'Should we accept, fix or transfer this gap?', 'Audit asks', 'Is this a design gap or an operating failure, and how severe is it?'],
];

export default function GrcVsAudit({ embedded = false }) {
  const Title = embedded ? 'h2' : 'h1';
  return (
    <details id="grc-vs-audit" open className={embedded ? 'scroll-mt-24' : 'max-w-6xl mx-auto px-4 py-10'}>
      <summary className="cursor-pointer text-3xl font-bold text-gray-900 dark:text-white"><Title className="inline">GRC view vs Audit view</Title></summary>
      <div className="mt-4 space-y-8">
      <header>
        <p className="mt-2 max-w-3xl text-sm text-gray-700 dark:text-slate-300">The same control looks different depending on whether you build and run it (GRC) or independently test it (audit). Knowing both views helps you design controls that pass audit, and answer interview questions from the right angle.</p>
      </header>

      <details className="rounded-xl border border-gray-200 dark:border-slate-700 p-3" open>
        <summary className="cursor-pointer text-xl font-semibold text-gray-900 dark:text-white mb-2">The core difference</summary>
        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-slate-700" tabIndex={0} role="region" aria-label="GRC vs audit core difference">
          <table className="w-full text-sm min-w-[760px]">
            <thead><tr>{['Aspect', 'GRC view', 'Audit view'].map((h) => <th key={h} scope="col" className={TH}>{h}</th>)}</tr></thead>
            <tbody>{CORE.map((r) => <tr key={r[0]}>{r.map((c, j) => <td key={j} className={`${TD} ${j === 0 ? 'font-semibold text-gray-900 dark:text-white' : ''}`}>{c}</td>)}</tr>)}</tbody>
          </table>
        </div>
      </details>

      <details className="rounded-xl border border-gray-200 dark:border-slate-700 p-3" open>
        <summary className="cursor-pointer text-xl font-semibold text-gray-900 dark:text-white mb-2">Topic by topic</summary>
        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-slate-700" tabIndex={0} role="region" aria-label="GRC vs audit by topic">
          <table className="w-full text-sm min-w-[1100px]">
            <thead><tr>{['Topic', 'GRC view: design and run', 'Audit view: test and conclude', 'Evidence the auditor asks for', 'Detail'].map((h) => <th key={h} scope="col" className={TH}>{h}</th>)}</tr></thead>
            <tbody>{TOPICS.map(([t, g, a, e, href]) => (
              <tr key={t}>
                <td className={`${TD} font-semibold text-gray-900 dark:text-white`}>{t}</td>
                <td className={TD}>{g}</td><td className={TD}>{a}</td><td className={TD}>{e}</td>
                <td className={TD}><Link className="ui-link" to={href}>Open</Link></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </details>

      <details id="sod-grc-vs-audit" className="scroll-mt-24" className="rounded-xl border border-gray-200 dark:border-slate-700 p-3" open>
        <summary className="cursor-pointer text-xl font-semibold text-gray-900 dark:text-white mb-2">Segregation of duties: GRC view vs audit view</summary>
        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-slate-700" tabIndex={0} role="region" aria-label="Segregation of duties GRC vs audit">
          <table className="w-full text-sm min-w-[860px]">
            <thead><tr>{['Area', 'GRC view: design and run', 'Audit view: test and conclude'].map((h) => <th key={h} scope="col" className={TH}>{h}</th>)}</tr></thead>
            <tbody>{SOD.map((r) => <tr key={r[0]}>{r.map((c, j) => <td key={j} className={`${TD} ${j === 0 ? 'font-semibold text-gray-900 dark:text-white' : ''}`}>{c}</td>)}</tr>)}</tbody>
          </table>
        </div>
        <p className="mt-2 text-sm text-gray-700 dark:text-slate-300">Example: in a five-person finance team, the same person creates vendors and releases payments. GRC agrees a monthly review of new vendors against payments by the finance controller. The auditor samples three months and checks the controller actually compared the lists and followed up anything unusual. Full testing steps are in <Link className="ui-link" to="/#access-governance">Least Privilege and Segregation of Duties</Link>.</p>
      </details>

      <details className="rounded-xl border border-gray-200 dark:border-slate-700 p-3" open>
        <summary className="cursor-pointer text-xl font-semibold text-gray-900 dark:text-white mb-2">How GRC closes gaps and how audit finds them</summary>
        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-slate-700" tabIndex={0} role="region" aria-label="Gap lifecycle">
          <table className="w-full text-sm min-w-[860px]">
            <thead><tr>{['Stage', 'GRC: covers the gap', 'Audit: finds the gap'].map((h) => <th key={h} scope="col" className={TH}>{h}</th>)}</tr></thead>
            <tbody>{GAPS.map((r) => <tr key={r[0]}>{r.map((c, j) => <td key={j} className={`${TD} ${j === 0 ? 'font-semibold text-gray-900 dark:text-white' : ''}`}>{c}</td>)}</tr>)}</tbody>
          </table>
        </div>
      </details>

      <details className="rounded-xl border border-gray-200 dark:border-slate-700 p-3" open>
        <summary className="cursor-pointer text-xl font-semibold text-gray-900 dark:text-white mb-2">Typical questions from each side</summary>
        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-slate-700" tabIndex={0} role="region" aria-label="Typical questions">
          <table className="w-full text-sm min-w-[700px]">
            <thead><tr>{['GRC asks', 'Audit asks'].map((h) => <th key={h} scope="col" className={TH}>{h}</th>)}</tr></thead>
            <tbody>{QUESTIONS.map((r) => <tr key={r[1]}><td className={TD}>{r[1]}</td><td className={TD}>{r[3]}</td></tr>)}</tbody>
          </table>
        </div>
      </details>

      <section className="rounded-xl border border-indigo-200 dark:border-indigo-800 p-4 text-sm text-gray-700 dark:text-slate-300">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Interview line</h2>
        <p>&quot;In GRC I design controls with the audit test in mind: a complete population, a named performer, a dated record and a follow-up on exceptions. That way the evidence exists as a by-product of doing the work, and the audit becomes a check rather than a scramble.&quot;</p>
      </section>
      </div>
    </details>
  );
}
