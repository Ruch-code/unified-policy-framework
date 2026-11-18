import { useState } from 'react';

// More worked nonconformity scenarios for the ISO 27001 Lead Implementer page, grouped by scope area.
// Grading is typical, not fixed: the certification body decides based on evidence and how widespread the issue is.
const SCENARIOS = [
  // [area, situation, grade, why (clause or control), recommendations]
  ['Management system', 'No internal audit was carried out in the certification cycle.', 'Major', 'Clause 9.2 requires internal audits at planned intervals. Without one, the ISMS has no independent check that it works.', ['Plan an internal audit programme covering all clauses and applicable controls.', 'Use a competent, independent auditor, or outsource it if the team is too small.', 'Complete it and record results before the next external audit.']],
  ['Management system', 'Management review happened, but top management did not attend and several required inputs were missing.', 'Minor (major if no review at all)', 'Clause 9.3 requires top management to review the ISMS using the inputs listed in 9.3.2.', ['Book the review in leadership calendars a year ahead.', 'Use a minutes template that lists every 9.3.2 input.', 'Record decisions and actions with owners.']],
  ['Management system', 'The risk register was not updated after the company moved to a new cloud provider.', 'Minor', 'Clauses 6.1.2 and 8.2 require risk assessments at planned intervals and when significant changes occur; clause 6.3 requires changes to be planned.', ['Add "major change" as a trigger in the risk procedure.', 'Reassess risks for the new provider and update treatment plans.', 'Link the change process to the risk register.']],
  ['Management system', 'The Statement of Applicability excludes secure development controls, but the company builds its own software.', 'Minor (major if several key controls are excluded without reason)', 'Clause 6.1.3 d) requires a justification for each exclusion, and it must match the scope and risks.', ['Re-run the control selection against the risk assessment.', 'Include A.8.25 to A.8.29 and record how each is met.', 'Have the SoA reviewed by someone outside the team that wrote it.']],
  ['Management system', 'Security objectives exist, but nobody measures them.', 'Minor', 'Clauses 6.2 and 9.1 require objectives to be monitored and results evaluated.', ['Give each objective a measure, target, owner and review date.', 'Report progress in the management review.']],
  ['Policies and people', 'Security policies were drafted but never approved or communicated to staff.', 'Minor', 'Clause 5.2 and A.5.1 require an approved policy that is communicated and available.', ['Get policies approved by the named authority.', 'Publish them where staff work and collect acknowledgements.']],
  ['Policies and people', 'New joiners in the last six months did not complete security awareness training.', 'Minor', 'Clauses 7.2 and 7.3 and A.6.3 require competence and awareness.', ['Add training to the onboarding checklist with a due date in week one.', 'Track completion against the HR joiner list, not the training tool list.']],
  ['Access', '2 of 25 sampled leavers kept access to company systems for more than a week after leaving.', 'Minor', 'A.5.18 Access rights and A.6.5 Responsibilities after termination require timely removal.', ['Trigger access removal automatically from the HR exit date.', 'Run a monthly check of active accounts against the HR leaver list.']],
  ['Access', 'Administrators share one admin account, and its activity is never reviewed.', 'Minor (major if it covers all production systems)', 'A.8.2 Privileged access rights, A.5.16 Identity management and A.8.15 Logging require named accounts and traceable actions.', ['Give each admin a named account with MFA.', 'Store any break-glass account in a vault with alerting.', 'Review privileged activity logs at least monthly.']],
  ['Operations', 'Backups run every night, but no restore has ever been tested.', 'Minor', 'A.8.13 Information backup requires backups to be tested; A.5.30 requires ICT readiness for continuity.', ['Schedule restore tests, at least quarterly for critical systems.', 'Record time taken against the RTO and data loss against the RPO.']],
  ['Operations', 'Production changes were deployed without the approval the change procedure requires.', 'Minor', 'A.8.32 Change management requires changes to follow the documented procedure.', ['Enforce approval in the deployment pipeline (branch protection, required reviewers).', 'Sample changes monthly to confirm the control works.']],
  ['Operations', 'A security incident was handled, but nothing was recorded and no lessons were captured.', 'Minor', 'A.5.26 Response to incidents, A.5.27 Learning from incidents and A.5.28 Collection of evidence require records and follow-up.', ['Use one incident ticket template with timeline, actions and root cause.', 'Hold a short lessons-learned review after every significant incident.']],
  ['Suppliers', 'A supplier with access to customer data was onboarded without any security assessment or security terms in the contract.', 'Minor (major if it applies to all critical suppliers)', 'A.5.19 to A.5.22 require supplier risks to be assessed, agreed in contracts and monitored.', ['Tier suppliers by data and access.', 'Assess critical suppliers before onboarding and yearly after.', 'Add security and breach notification clauses to contracts.']],
  ['Physical', 'Visitors to the in-scope office are not logged or escorted.', 'Minor', 'A.7.2 Physical entry requires entry controls for secure areas.', ['Introduce a visitor log and badges.', 'Escort visitors in areas where information is processed.']],
];

const AREAS = ['All', ...new Set(SCENARIOS.map((s) => s[0]))];

export default function NcScenarios() {
  const [area, setArea] = useState('All');
  const rows = SCENARIOS.filter((s) => area === 'All' || s[0] === area);
  return (
    <details id="nc-scenarios" className="max-w-6xl mx-auto my-4 px-4 scroll-mt-24">
      <summary className="cursor-pointer rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 text-lg font-bold text-gray-900 dark:text-white">More nonconformity scenarios by scope area</summary>
      <div className="mt-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 md:p-5">
        <p className="text-sm text-gray-700 dark:text-gray-300">Common findings, the grade they usually get, why, and how to fix them. Grades are typical; the auditor decides based on how widespread the issue is and whether anything compensates for it.</p>
        <div className="flex flex-wrap gap-2 my-3" role="group" aria-label="Filter by scope area">
          {AREAS.map((a) => <button key={a} type="button" aria-pressed={area === a} onClick={() => setArea(a)} className="btn btn-secondary px-2.5 py-1 rounded-full text-xs">{a}</button>)}
        </div>
        <div className="space-y-2">
          {rows.map(([a, sit, grade, why, recs]) => (
            <details key={sit} className="rounded-lg border border-gray-200 dark:border-gray-700 p-3">
              <summary className="cursor-pointer text-sm text-gray-900 dark:text-white"><span className="font-semibold">{sit}</span> <span className="text-xs text-gray-600 dark:text-gray-400">({a})</span></summary>
              <dl className="mt-2 grid grid-cols-1 sm:grid-cols-[120px_1fr] gap-x-3 gap-y-1 text-sm text-gray-700 dark:text-gray-300">
                <dt className="font-medium">Likely grade</dt><dd>{grade}</dd>
                <dt className="font-medium">Why</dt><dd>{why}</dd>
                <dt className="font-medium">Recommendations</dt><dd><ul className="list-disc pl-5 space-y-0.5">{recs.map((r) => <li key={r}>{r}</li>)}</ul></dd>
              </dl>
            </details>
          ))}
        </div>
      </div>
    </details>
  );
}
