import SortableGrid from '../kb/SortableGrid.jsx';

// Security governance operating rhythm: forums, action tracking, ageing and escalation, leadership reporting and automation.
const P = 'text-sm leading-relaxed text-gray-700 dark:text-slate-300';
const H = 'mt-4 mb-1 text-base font-semibold text-gray-900 dark:text-white';
const Ul = ({ items }) => <ul className={`list-disc pl-5 space-y-1 ${P}`}>{items.map((x) => <li key={x}>{x}</li>)}</ul>;

const FORUMS = [
  ['Security steering committee', 'Quarterly', 'CISO, CIO/CTO, risk, compliance, business heads', 'Security posture, top risks, programme status, risk acceptances', 'Priorities, funding, risk acceptance, escalations resolved'],
  ['Security programme review', 'Monthly', 'CISO, programme owners, PMO', 'Milestones, RAG status, dependencies, blockers', 'Re-plans, ownership fixes, escalations'],
  ['Risk and remediation review', 'Fortnightly or monthly', 'Security, IT, engineering, cloud owners', 'Overdue findings, vulnerabilities, exceptions, audit actions', 'New dates with reasons, escalations, closure approvals'],
  ['Operational security review', 'Weekly', 'SOC, vulnerability management, IAM leads', 'Incidents, critical vulnerabilities, control failures', 'Immediate actions and owners'],
];

const TRACKER = [
  ['ID and title', 'Unique reference and short description'],
  ['Source', 'Audit, pen test, risk assessment, incident, scan, control test or programme'],
  ['Severity or risk rating', 'Critical, high, medium or low, using the risk methodology'],
  ['Owner and accountable leader', 'A named person, not a team, plus the executive who answers for it'],
  ['Agreed due date and SLA', 'Target date based on severity, with the original date kept'],
  ['Status and % complete', 'Not started, in progress, blocked, ready for validation, closed'],
  ['Revised date and reason', 'Every date change recorded with a reason and approver'],
  ['Age and overdue days', 'Calculated automatically from open and due dates'],
  ['Evidence of closure', 'Link to proof, validated by security before closing'],
  ['Exception or risk acceptance', 'Reference if the risk is accepted instead of fixed, with expiry'],
];

const ESCALATION = [
  ['Due within 14 days', 'Reminder to owner', 'Security governance lead'],
  ['Overdue up to 30 days', 'Owner and manager informed; recovery plan requested', 'Security governance lead'],
  ['Overdue 31 to 60 days', 'Raised at the risk and remediation review; head of function informed', 'Head of security function'],
  ['Overdue over 60 days or critical overdue', 'Raised at the steering committee; fix or formal risk acceptance required', 'CISO'],
  ['Repeated date changes', 'Remediation plan challenged; root cause of delay reviewed', 'Security governance lead'],
];

export default function SecurityGovernanceRhythm() {
  return (
    <details className="mt-6 rounded-xl border border-gray-200 dark:border-slate-700 p-4" id="security-governance-rhythm">
      <summary className="cursor-pointer text-lg font-bold text-gray-900 dark:text-white">Security governance operating rhythm: forums, action tracking, ageing and escalation</summary>
      <div className="mt-3">
        <p className={P}>Metrics only matter if someone acts on them. A security governance lead runs the rhythm that turns metrics, findings and programme status into decisions and closed actions, across security and non-security teams.</p>

        <h3 className={H}>Governance forums</h3>
        <SortableGrid label="Security governance forums" headers={['Forum', 'Cadence', 'Attendees', 'Inputs', 'Outputs']} rows={FORUMS} file="security-governance-forums" min={1000} />

        <h3 className={H}>Action and remediation tracker fields</h3>
        <SortableGrid label="Security action tracker fields" headers={['Field', 'What it holds']} rows={TRACKER} file="security-action-tracker" min={640} />
        <p className={P}>Use one tracker for all sources (audit findings, vulnerabilities, risk treatments, exceptions, programme actions), so leadership sees one list and one ageing view.</p>

        <h3 className={H}>Ageing and escalation</h3>
        <SortableGrid label="Ageing and escalation matrix" headers={['Condition', 'Action', 'Who acts']} rows={ESCALATION} file="security-escalation-matrix" min={760} />
        <p className="text-xs text-gray-500 dark:text-slate-400">Thresholds are examples; align them to your risk appetite and SLAs.</p>

        <h3 className={H}>Leadership dashboard</h3>
        <Ul items={[
          'One page: overall posture, top risks, programme RAG status, and the few metrics that moved.',
          'Trends over time, not single numbers; show targets and thresholds.',
          'Ageing view: open actions by severity and age bucket (0 to 30, 31 to 60, 61 to 90, over 90 days).',
          'Decisions needed: list the asks for leadership at the top, not the bottom.',
          'Every metric has an owner, a definition, a data source and a refresh date.',
        ]} />

        <h3 className={H}>Challenging weak remediation plans</h3>
        <Ul items={[
          'Does the plan fix the root cause or only the symptom?',
          'Is there an interim compensating control while the fix is pending?',
          'Are dependencies and owners named, with dates for each step?',
          'Is the date realistic, and what happened to the last date?',
          'If it cannot be fixed, is a formal, time-bound risk acceptance at the right level more honest?',
        ]} />

        <h3 className={H}>Automating governance</h3>
        <Ul items={[
          'Pull findings and status from source tools (ticketing, vulnerability scanner, GRC platform, cloud posture tools) instead of manual spreadsheets.',
          'Calculate ageing, SLA breaches and RAG status automatically.',
          'Send reminders and escalations by rule, and log them.',
          'Generate the leadership pack from the same data so reporting does not drift from reality.',
          'Keep a decision and action log for each forum, linked to tracker items.',
        ]} />
      </div>
    </details>
  );
}
