import SortableGrid from './SortableGrid.jsx';
import { NewBadge } from '../updates/UpdateBits.jsx';

// Extends the Awareness topic: role-based curriculum, phishing simulation runbook and a 12-month calendar.
const P = 'text-sm text-gray-700 dark:text-gray-300';
const H = 'mt-4 mb-1 text-base font-semibold text-gray-900 dark:text-white';
const BOX = 'rounded-2xl border border-gray-200 dark:border-gray-700 p-5 my-4';
const Ul = ({ items }) => <ul className={`list-disc pl-5 space-y-1 ${P}`}>{items.map((x) => <li key={x}>{x}</li>)}</ul>;

const CURRICULUM = [
  ['All staff', 'Onboarding in week one, annual refresher, monthly short themes', 'Phishing, reporting, data handling, MFA, acceptable use of AI tools'],
  ['Engineers', 'Onboarding plus yearly secure development module', 'Secrets handling, dependency risk, secure code review, AI coding assistant rules'],
  ['Finance', 'Quarterly short sessions', 'Payment and invoice fraud, bank detail change verification, deepfake voice and CEO fraud'],
  ['Executives', 'Twice-yearly briefing', 'Targeted impersonation, deepfake voice and video, travel and device risk, incident decision roles'],
  ['Privileged administrators', 'Before access is granted, then yearly', 'Privileged access rules, MFA fatigue attacks, help desk social engineering, break-glass use'],
];

export const AWARENESS_CALENDAR = [
  ['January', 'Phishing basics and how to report', 'All staff', 'Email, intranet', 'Security awareness lead'],
  ['February', 'MFA fatigue and push bombing', 'All staff, admins', 'Short video', 'IAM owner'],
  ['March', 'Deepfake voice and CEO fraud', 'Finance, executives', 'Briefing', 'CISO'],
  ['April', 'QR code phishing (quishing)', 'All staff', 'Poster, email', 'Security awareness lead'],
  ['May', 'Data handling and classification', 'All staff', 'E-learning', 'Data protection officer'],
  ['June', 'Safe use of AI tools', 'All staff, engineers', 'Guide and quiz', 'AI governance lead'],
  ['July', 'Physical security and visitors', 'Office staff', 'Spot check and posters', 'Facilities'],
  ['August', 'Incident reporting: what, where, how fast', 'All staff', 'Email, intranet', 'Incident manager'],
  ['September', 'Payment and invoice fraud', 'Finance, procurement', 'Workshop', 'Finance controller'],
  ['October', 'Cybersecurity awareness month: passwords and passkeys', 'All staff', 'Events, quiz', 'Security awareness lead'],
  ['November', 'Travel and remote working', 'All staff', 'Email', 'IT operations'],
  ['December', 'Seasonal scams and year review', 'All staff', 'Email, leadership note', 'CISO'],
];

export default function AwarenessProgrammeExtras() {
  return (
    <details className={BOX} id="awareness-programme-runbook">
      <summary className="cursor-pointer text-lg font-bold text-gray-900 dark:text-white">Role-based curriculum, phishing simulation runbook and 12-month calendar<NewBadge /></summary>
      <p className="mt-1 text-[11px] text-gray-500 dark:text-slate-400">Last verified: 26 Nov 2026</p>
      <div className="mt-3">
        <h3 className={H}>Role-based curriculum</h3>
        <SortableGrid label="Role-based awareness curriculum" headers={['Audience', 'Cadence', 'Topics']} rows={CURRICULUM} file="awareness-curriculum" />

        <h3 className={H}>Phishing simulation runbook</h3>
        <Ul items={[
          'Approvals: written sign-off from HR and Legal before the first campaign, and from the works council or employee representatives where local law requires it. Agree what data is collected and who sees it.',
          'Difficulty tiers: tier 1 generic lures, tier 2 branded or seasonal lures, tier 3 targeted lures built from public information (OSINT) such as job titles and suppliers, including AI-written spear phishing. Move audiences up a tier as report rates improve.',
          'Exclusions: people on leave, recently bereaved or in a live HR process; shared mailboxes; anyone the business asks to exclude with a reason recorded.',
          'No-blame handling: a click leads to a short just-in-time lesson, not discipline. Thank everyone who reports, including after a click.',
          'Repeat clickers: second click in a set period leads to a one-to-one coaching session; a third leads to a conversation with the line manager and a review of their access, never public naming.',
          'Reporting button: one-click report in the mail client that sends to the security team and confirms receipt to the user.',
          'Board reporting: quarterly trend of report rate, time to report, repeat clickers and real phish reported, with actions taken.',
        ]} />

        <h3 className={H}>12-month awareness calendar</h3>
        <p className={P}>Use Export (.xlsx) to download this as an editable template.</p>
        <SortableGrid label="12-month awareness calendar" headers={['Month', 'Theme', 'Audience', 'Channel', 'Owner']} rows={AWARENESS_CALENDAR} file="awareness-12-month-calendar" min={820} />

        <h3 className={H}>Example: one quarter&apos;s campaign</h3>
        <SortableGrid label="Quarterly awareness campaign example" headers={['Month', 'Theme', 'Activities', 'Measure']} file="quarterly-awareness-campaign" min={860} rows={[
          ['Month 1', 'Phishing and reporting', 'Short video, intranet article, tier 1 phishing simulation, reminder of the report button', 'Baseline click rate, report rate and time to report'],
          ['Month 2', 'Passwords, passkeys and MFA', 'Password manager rollout guide, MFA fatigue explainer, live 20-minute session for staff', 'Password manager adoption, MFA enrolment, session attendance'],
          ['Month 3', 'Data protection and secure remote work', 'Data handling quiz, home network and public Wi-Fi tips, tier 2 phishing simulation, feedback survey', 'Quiz score, change in click and report rates against month 1, survey results'],
        ]} />
        <p className={P}>At quarter end, report results to leadership, give extra coaching to repeat clickers, use survey feedback to fix unclear topics, and pick the next quarter&apos;s themes from the weakest results and recent real incidents.</p>

        <h3 className={H}>What auditors ask for</h3>
        <Ul items={['Training records reconciled to the HR list', 'Policy acknowledgements for the current version', 'Phishing simulation results with dates and audiences', 'Evidence of follow-up for clickers and repeat clickers', 'The approved awareness plan and management reporting']} />
      </div>
    </details>
  );
}
