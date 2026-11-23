// Policy vs procedure vs SOP: plain-English comparison with ITGC examples.
const P = 'text-sm text-gray-700 dark:text-gray-300';
const H = 'mt-5 mb-1 text-base font-semibold text-gray-900 dark:text-white';
const TH = 'p-2 text-left font-semibold text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-900';
const TD = 'p-2 align-top border-t border-gray-100 dark:border-gray-700 text-gray-700 dark:text-gray-300';

function Table({ head, rows }) {
  return (
    <div className="overflow-x-auto my-2" tabIndex={0} role="region" aria-label={head.join(', ')}>
      <table className="w-full text-sm" style={{ minWidth: 640 }}>
        <thead><tr>{head.map((h) => <th key={h} scope="col" className={TH}>{h}</th>)}</tr></thead>
        <tbody>{rows.map((r) => <tr key={r[0]}>{r.map((c, j) => <td key={j} className={`${TD} ${j === 0 ? 'font-medium' : ''}`}>{c}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}

export default function PolicySopProcedure() {
  return (
    <details className="rounded-2xl border border-gray-200 dark:border-gray-700 p-5 my-4" id="policy-vs-sop">
      <summary className="cursor-pointer text-lg font-bold text-gray-900 dark:text-white">Policy vs procedure vs SOP: the difference, with examples</summary>
      <div className="mt-3">
        <p className={P}>A simple way to remember it: the <strong>policy</strong> says <em>what</em> must happen and <em>why</em>. The <strong>procedure</strong> says <em>who</em> does it, <em>when</em>, and in what order across a process. The <strong>SOP</strong> (standard operating procedure) says exactly <em>how</em> one person performs one task, click by click, so everyone does it the same way.</p>
        <p className={`${P} mt-2`}>Many companies use "procedure" and "SOP" as the same word. That is fine. ISO 27001 and SOC 2 do not require the split; they require that the documented way of working exists, is approved and is followed. Where the split is used, it usually looks like the table below.</p>

        <h3 className={H}>Side by side</h3>
        <Table head={['Aspect', 'Policy', 'Procedure', 'SOP']} rows={[
          ['Answers', 'What and why', 'Who, when and in what order', 'Exactly how, step by step'],
          ['Level', 'Strategic, organisation wide', 'Process level, across teams', 'Task level, one role or system'],
          ['Audience', 'Everyone in scope', 'Teams that run the process', 'The person doing the task'],
          ['Approved by', 'Senior management or board', 'Process owner', 'Team lead or process owner'],
          ['Changes', 'Rarely, reviewed yearly', 'When the process changes', 'Often, when a tool or screen changes'],
          ['Length', 'One to a few pages', 'A few pages, often with a flow', 'Detailed steps, often screenshots'],
          ['Auditor uses it to', 'Check management intent and scope', 'Design the walkthrough and test the control', 'Reperform the task and check consistency'],
        ]} />

        <h3 className={H}>How they fit together</h3>
        <p className={P}>Policy → Standard (measurable rules) → Procedure → SOP or work instruction → Records (the evidence the work happened). Each level must agree with the one above it. If the SOP says access reviews are yearly but the policy says quarterly, an auditor will raise a finding.</p>

        <h3 className={H}>ITGC examples</h3>
        <Table head={['ITGC area', 'Policy says', 'Procedure says', 'SOP says']} rows={[
          ['User access', 'Access is granted on least privilege with documented approval.', 'Manager raises a ticket, system owner approves, IT provisions, ticket is closed with evidence.', 'In the identity provider: open Users, choose Add user, assign the approved group only, attach the screenshot to the ticket.'],
          ['Access review', 'Privileged and in-scope access is reviewed every quarter.', 'GRC exports user lists in week 1, owners certify by week 3, IT removes flagged access by week 4.', 'Export the user list with the report name and timestamp, filter to active accounts, send the reviewer template, record each decision.'],
          ['Change management', 'Production changes are tested, approved and traceable.', 'Developer opens a pull request, peer reviews, QA tests, change approver signs off, release is logged.', 'Branch protection requires one approving review; merge only after the CI pipeline passes; link the ticket ID in the pull request title.'],
          ['Backup', 'Critical data is backed up and restores are tested.', 'Daily backups run automatically; infrastructure team tests a restore every quarter and records the result.', 'Pick one backup at random, restore it to the test account, compare row counts, log the result and screenshots.'],
          ['Offboarding', 'Leavers lose access promptly.', 'HR notifies IT on the last day; IT disables accounts within one working day and recovers devices.', 'Suspend the user in the identity provider, revoke sessions, transfer file ownership, remove from groups, close the ticket.'],
        ]} />

        <h3 className={H}>Common mistakes</h3>
        <ul className={`list-disc pl-5 space-y-1 ${P}`}>
          <li>Putting step-by-step instructions in the policy, so it must be re-approved every time a screen changes.</li>
          <li>A policy with no procedure behind it, so nobody knows how the rule is actually met.</li>
          <li>Procedures that do not match what people really do. Auditors test reality, not the document.</li>
          <li>Different frequencies or owners in the policy and the SOP.</li>
          <li>No record step, so the work happens but there is no evidence for the auditor.</li>
        </ul>

        <h3 className={H}>When to write each</h3>
        <ul className={`list-disc pl-5 space-y-1 ${P}`}>
          <li><strong>Policy:</strong> when management needs to set a rule that applies across the organisation or a framework requires one.</li>
          <li><strong>Procedure:</strong> when a process involves more than one person or team, or a control needs a defined owner and timing.</li>
          <li><strong>SOP:</strong> when a task must be done the same way every time, is done by several people, is error prone, or is a key control an auditor will reperform.</li>
        </ul>
      </div>
    </details>
  );
}
