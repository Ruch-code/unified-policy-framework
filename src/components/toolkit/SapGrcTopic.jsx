import { Link } from 'react-router-dom';
import ToolkitModule, { ModuleTable } from './ToolkitModule.jsx';
import SortableGrid from '../kb/SortableGrid.jsx';
import { NewBadge } from '../updates/UpdateBits.jsx';
import { CHEAT_SHEETS } from '../../data/cheatSheets.js';

// SAP GRC Access Control: rule set design, Firefighter governance, key transactions and ITGC testing.
// Module overview and a worked example already live in ERP Security Review; this topic links to them.
const P = 'text-sm text-gray-700 dark:text-gray-300';
const H3 = 'mt-4 mb-1 font-semibold text-gray-900 dark:text-white';
export const SAP_GRC_VERIFIED = '26 Nov 2026';

export const SAP_TCODES = [
  ['PFCG', 'Role maintenance: create and change roles, authorisations and profiles', 'Role change history; sample role changes traced to approval and transport'],
  ['SU01', 'User maintenance: create, change, lock and set validity of users', 'User master data for sampled joiners and leavers; lock status and valid-to dates'],
  ['SU53', 'Shows the last failed authorisation check for a user', 'Screenshot attached to access requests to show the exact authorisation needed'],
  ['SUIM', 'User information system: reports on users, roles, profiles and authorisations (for example RSUSR002)', 'Lists of users with critical authorisations such as SAP_ALL; who can run sensitive transactions'],
  ['ST01 / STAUTHTRACE', 'System trace and authorisation trace for a user or transaction', 'Trace output used when designing least-privilege roles'],
  ['SM19 / RSAU_CONFIG', 'Security audit log configuration (RSAU_CONFIG in newer releases)', 'Proof the audit log is switched on with the right filters'],
  ['SM20 / RSAU_READ_LOG', 'Security audit log analysis (RSAU_READ_LOG in newer releases)', 'Log extracts for Firefighter sessions and privileged activity'],
  ['GRAC_EAM', 'Emergency Access Management launchpad used to start a Firefighter session (check the name in your release)', 'Session list, reason codes and timestamps'],
];

const FIREFIGHTER_CHECKLIST = CHEAT_SHEETS.find((c) => c.id === 'sap-firefighter').rows;

function Intro() {
  return (
    <>
      <p className="text-[11px] text-gray-500 dark:text-slate-400">New<NewBadge /> Last verified: {SAP_GRC_VERIFIED}</p>
      <h3 className={H3}>Overview</h3>
      <p className={P}>SAP Access Control has five main capabilities: Access Risk Analysis (ARA) checks users and roles against the SoD rule set; Access Request Management (ARM) runs the request and approval workflow; Business Role Management (BRM) designs business roles; Emergency Access Management (EAM) controls Firefighter access; User Access Review (UAR) runs periodic certification. SAP Process Control documents and tests internal controls, and SAP Risk Management covers enterprise risk. A capability table and a worked vendor-payment example are in <Link className="ui-link" to="/knowledge?topic=erp">ERP Security Review</Link>.</p>

      <p className={P}>Beyond Access Control, SAP GRC Process Control tracks compliance obligations by linking regulations and policies to controls, running automated control monitoring and manual control tests, and collecting sign-offs. SAP Audit Management supports internal audit planning, fieldwork, findings and follow-up. Check which components your organisation licenses.</p>

      <h3 className={H3}>Stakeholders</h3>
      <ModuleTable head={['Stakeholder', 'Role in SAP GRC']} rows={[
        ['Business process owners', 'Define functions and risks with GRC, approve access to their processes, own mitigating controls and access review decisions'],
        ['IT and SAP security (Basis, role administrators)', 'Build and maintain roles, provision access, run technical configuration and transports'],
        ['GRC or compliance team', 'Own the rule set, run risk analysis, manage mitigations, coordinate access reviews and report'],
        ['Information security', 'Set access policy, review privileged and Firefighter use, link SAP risks to the wider security programme'],
        ['Internal and external auditors', 'Test SoD, provisioning, reviews and emergency access; rely on GRC reports after checking completeness'],
        ['Firefighter controllers', 'Review emergency access sessions and sign off'],
      ]} />

      <h3 className={H3}>SoD rule set design</h3>
      <ModuleTable head={['Level', 'What it is', 'Example']} rows={[
        ['Function', 'A business activity made of one or more actions', 'Maintain vendor master'],
        ['Action', 'A transaction or service that performs the function', 'XK01, FK01 or the S/4HANA app for creating a supplier'],
        ['Permission', 'The authorisation object and field values that make the action possible', 'F_LFA1_BUK with activity 01 (create)'],
        ['Risk', 'Two functions that should not sit with one person, or one critical function', 'Maintain vendor master + Process vendor payments'],
        ['Severity', 'Critical, high, medium or low, set with the business', 'Fake vendor and payment: critical'],
        ['Mitigating control', 'A control that reduces an accepted risk, with an owner and review frequency', 'Monthly review of new vendors against payments by the finance controller'],
      ]} />
      <p className={P}>Start from the delivered rule set, then tune it with the business: remove functions you do not use, add custom transactions, and set severity from real business impact. Record who approved each change to the rule set.</p>

      <h3 className={H3}>Firefighter governance</h3>
      <SortableGrid label="SAP Firefighter governance checklist" headers={['Area', 'What good looks like']} rows={FIREFIGHTER_CHECKLIST} file="sap-firefighter-checklist" min={640} />

      <h3 className={H3}>Key transactions</h3>
      <SortableGrid label="SAP key transactions for audit" headers={['Transaction', 'Purpose', 'Audit evidence']} rows={SAP_TCODES} file="sap-key-transactions" />
      <p className="text-xs text-gray-500 dark:text-slate-400">Transaction names follow SAP Help; availability depends on release (ECC, S/4HANA) and configuration. The full ITGC control matrix with tables is in the SAP ITGC assessment plan under <Link className="ui-link" to="/knowledge?topic=erp">ERP Security Review</Link>.</p>

      <div className="mt-4 rounded-xl border border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-900/20 p-4">
        <p className="font-semibold text-gray-900 dark:text-white">Planning ahead</p>
        <p className={P}>Based on SAP&apos;s current release strategy, maintenance for SAP Access Control 12.0 is set to end on 31 December 2027, and SAP has announced a successor edition that runs on SAP HANA. Confirm dates on the SAP Release Strategy page for your contract. Decisions to make before moving: the upgrade or migration path, rule set clean-up (remove unused functions and stale mitigations), and who owns each control after go-live.</p>
      </div>
    </>
  );
}

export default function SapGrcTopic() {
  const m = {
    title: 'SAP GRC Access Control',
    what: 'SAP GRC Access Control manages who can do what in SAP and connected systems: segregation of duties, access requests, role design, emergency access and access reviews. Auditors rely on its reports for SOX and ISO 27001 access testing, so the tool itself must be well governed.',
    when: 'Rule set review yearly and after major business changes; Firefighter logs reviewed after every session; access reviews at least yearly (quarterly for critical roles is common).',
    tags: ['SAP', 'Access Control', 'SoD', 'Firefighter', 'SOX'],
    intro: <Intro />,
    steps: [
      'User provisioning: request through ARM, risk analysis shown to the approver, approval before provisioning.',
      'Termination: HR leaver feed locks or removes SAP users on or before the last day.',
      'Periodic access review: UAR campaign for all users and roles, with removals completed and evidenced.',
      'SoD conflicts: run ARA, remediate or mitigate each conflict, and assign mitigation owners.',
      'Emergency access: Firefighter sessions approved, logged and reviewed by the controller within the SLA.',
      'Changes to roles and rule sets: approved, tested and transported, with change history kept.',
    ],
    test: [
      'Sample new users and confirm the approval and risk analysis came before provisioning.',
      'Match the HR leaver list to SAP user lock or validity dates.',
      'Re-run or inspect the SoD conflict report and test a sample of mitigations for evidence of operation.',
      'Sample Firefighter sessions and check reason, log and controller sign-off within the SLA.',
      'Sample role and rule set changes and trace them to approval and transport.',
    ],
    evidence: ['ARM request and approval records with risk analysis results', 'SoD conflict report and mitigation register', 'Mitigating control evidence (for example signed monthly reviews)', 'Firefighter session logs and controller sign-off', 'UAR campaign results and removal tickets', 'Rule set and role change history'],
    pitfalls: ['Rule set never tuned, so reports are full of noise and real conflicts are ignored.', 'Mitigations assigned with no evidence that the review happened.', 'Firefighter logs not reviewed, or reviewed by the user themselves.', 'Reports run with filters that leave users out of the population.'],
    maps: ['SOX 404 ITGCs: access and change', 'ISO 27001:2022 A.5.15 to A.5.18, A.8.2', 'SOC 2 CC6.1 to CC6.3'],
    related: <p className={`mt-3 ${P}`}>See also <Link className="ui-link" to="/knowledge?topic=erp">ERP Security Review</Link> and <Link className="ui-link" to="/#access-governance">Least Privilege and Segregation of Duties</Link>.</p>,
    source: 'SAP Help Portal: SAP Access Control; SAP Release Strategy',
    verified: SAP_GRC_VERIFIED,
  };
  return <ToolkitModule m={m} />;
}
