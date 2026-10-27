import { useState } from 'react';
import { Download, Timer, Zap, Bot, MessageSquare, Scale, Wrench, Gauge, ChevronDown, ChevronUp } from 'lucide-react';
import { downloadXlsx } from '../utils/xlsxExport.js';

const PATTERNS = [
  {
    icon: Timer,
    title: '1. Shrink the population: access that expires itself',
    why: 'The cheapest review is the one you never run. Standing access is what fills review queues.',
    steps: [
      'Privileged and production access is just-in-time: requested, approved, time-boxed (1 to 8 hours) and logged. Tools: Entra PIM, AWS IAM Identity Center with TEAM, Teleport, CyberArk, Okta Access Requests.',
      'Elevated SaaS and project access gets a default expiry (30, 60 or 90 days) set at grant time. Renewal needs a fresh request.',
      'Contractor and intern accounts expire on contract end date pulled from HR or the vendor system.',
      'Report standing privileged access as a metric and drive it towards zero.',
    ],
    evidence: 'JIT request and approval logs, expiry configuration screenshots, count of standing privileged accounts over time.',
  },
  {
    icon: Zap,
    title: '2. Review on events, not only in big campaigns',
    why: 'A quarterly campaign of thousands of rows gets rubber-stamped. Small reviews at the moment of change get real attention.',
    steps: [
      'Mover: when HR changes department, title or manager, trigger a review of that person\'s access within 5 business days and remove access tied to the old role.',
      'Leaver: deprovision from the IdP on HR termination, and run a 24-hour check that SaaS and cloud accounts outside SSO are also closed.',
      'New privileged grant or new admin: a second person confirms within 24 hours.',
      'Keep a lighter periodic campaign as the backstop that auditors expect (quarterly for privileged, at least annually for standard access).',
    ],
    evidence: 'Joiner-mover-leaver tickets linked to HR events, timestamps showing review within SLA, periodic backstop sign-off.',
  },
  {
    icon: Bot,
    title: '3. Pre-decide the obvious, review the exceptions',
    why: 'Most rows are routine. Put the reviewer\'s time on the ones that are not.',
    steps: [
      'Auto-recommend "Keep" when access matches the role baseline (birthright access for the job code) and was used in the last 90 days.',
      'Auto-recommend "Remove" for no login in 90 days, no active manager, terminated in HR, or duplicate accounts.',
      'Flag for human decision: access outside the role baseline, privileged roles, SoD conflicts, external users.',
      'Reviewers still sign off, but they confirm a short exception list instead of every row. Document this method in the access review procedure so auditors accept it.',
    ],
    evidence: 'Role baseline matrix, recommendation rules, exception list with reviewer decisions.',
  },
  {
    icon: MessageSquare,
    title: '4. Meet reviewers where they work',
    why: 'Busy managers ignore portals. They answer a message.',
    steps: [
      'Send review items as Slack or Teams messages or email with one-click Keep and Remove buttons, captured with name and timestamp.',
      'Batch to small chunks (no more than 25 items per message) with a clear due date.',
      'Automatic reminders at 3 and 7 days, then escalation to the reviewer\'s manager, then to a named backup reviewer.',
      'If the window closes with no decision, unreviewed non-baseline access is suspended, not silently kept.',
    ],
    evidence: 'Exported decisions with reviewer identity and timestamp, reminder and escalation logs.',
  },
  {
    icon: Scale,
    title: '5. Spread and cap the workload',
    why: 'Overloaded reviewers produce poor decisions and late evidence.',
    steps: [
      'Stagger systems across the quarter (for example month 1 cloud and code, month 2 finance and HR systems, month 3 SaaS) instead of one big window.',
      'Cap items per reviewer per cycle; split large teams between the manager and the system owner.',
      'Allow documented delegation for leave or overload, but never to the user being reviewed and never to someone with an SoD conflict.',
      'System owners review privileged roles; line managers review their people\'s standard access.',
    ],
    evidence: 'Review calendar, delegation records, reviewer assignment list.',
  },
  {
    icon: Wrench,
    title: '6. Build it in before a system goes live',
    why: 'Retrofitting reviews onto a system nobody owns is where most audit findings come from.',
    steps: [
      'Every new system needs, before go-live: a named owner, SSO integration (or a documented reason why not), defined roles with a least-privilege default, an expiry default for elevated roles, and an access export (API or report) for reviews.',
      'Add these as gates in the procurement and change-management checklist.',
      'Add the system to the asset inventory and the review calendar at go-live.',
    ],
    evidence: 'Completed onboarding checklist per system, asset inventory entry, change ticket.',
  },
  {
    icon: Gauge,
    title: '7. Prove the reviews are real',
    why: 'Auditors increasingly test the quality of reviews, not just their existence.',
    steps: [
      'Track: % completed on time, % access removed, median seconds per decision, % reviewers who approved everything, time to remove after a Remove decision.',
      'Flag reviewers who approve 100% in under a few seconds per item, and spot-check 10% of their decisions.',
      'Confirm every Remove decision was actually executed in the target system (close the loop).',
      'Report the metrics to management review.',
    ],
    evidence: 'Review metrics dashboard, spot-check records, remediation tickets showing removal.',
  },
];

const RACI = [
  ['Define review scope and calendar', 'GRC', 'CISO', 'System owners', 'Managers'],
  ['Export access data', 'IT / IAM team', 'IAM lead', 'System owners', 'GRC'],
  ['Apply auto-recommendations', 'IAM team', 'IAM lead', 'GRC', 'Reviewers'],
  ['Review standard user access', 'Line managers', 'Department head', 'System owner', 'GRC'],
  ['Review privileged access', 'System owners', 'CISO', 'Security', 'GRC'],
  ['Remove access', 'IT / IAM team', 'IAM lead', 'System owner', 'Reviewer'],
  ['Verify removal and close the loop', 'GRC', 'CISO', 'IAM team', 'Auditors'],
];

const MAPPING = [
  ['SOC 2 (TSC 2017)', 'CC6.1, CC6.2, CC6.3', 'Access is authorized, modified and removed; periodic review of access'],
  ['ISO/IEC 27001:2022', 'A.5.15, A.5.18, A.8.2', 'Access control, access rights review, privileged access rights'],
  ['PCI DSS v4.0', 'Req 7.2.4, 7.2.5.1, 8.2.6', 'User accounts and privileges reviewed at least every six months; inactive accounts removed within 90 days'],
  ['HIPAA Security Rule', '164.308(a)(4), 164.308(a)(3)(ii)(C)', 'Information access management; termination procedures'],
  ['NIST SP 800-53 Rev. 5', 'AC-2, AC-2(3), AC-6(7)', 'Account management, disable inactive accounts, review of user privileges'],
  ['CIS Controls v8.1', 'Safeguards 5.1, 5.3, 6.1, 6.2', 'Account inventory, disable dormant accounts, access granting and revoking'],
];

function buildSheets() {
  const reviewHeaders = ['Review ID', 'Review Cycle', 'System / Application', 'System Owner', 'User Name', 'User Email / ID', 'Employment Type (FTE/Contractor/Service)', 'Department', 'Job Title', 'Manager', 'Role / Group / Entitlement', 'Privileged (Y/N)', 'Matches Role Baseline (Y/N)', 'Last Login Date', 'Days Since Last Use', 'HR Status (Active/Leaver/Mover)', 'SoD Conflict (Y/N)', 'Auto-Recommendation (Keep/Remove/Review)', 'Recommendation Reason', 'Reviewer', 'Reviewer Decision (Keep/Remove/Modify)', 'Decision Justification', 'Decision Date', 'Remediation Ticket', 'Removal Completed Date', 'Verified By', 'Notes'];
  const sample = [
    ['UAR-2026Q4-0001', '2026 Q4', 'AWS Production', 'Head of Platform', 'Jane Doe', 'jane.doe@company.com', 'FTE', 'Engineering', 'Senior Engineer', 'John Smith', 'AdministratorAccess', 'Y', 'N', '2026-10-20', '7', 'Active', 'N', 'Review', 'Privileged role outside baseline', 'Head of Platform', 'Modify', 'Move to JIT via Identity Center; standing admin not needed', '2026-10-24', 'IAM-1234', '2026-10-25', 'GRC Analyst', ''],
    ['UAR-2026Q4-0002', '2026 Q4', 'Salesforce', 'VP Sales', 'Ravi Kumar', 'ravi.kumar@company.com', 'Contractor', 'Sales', 'SDR', 'Priya Shah', 'Standard User', 'N', 'Y', '2026-06-02', '146', 'Active', 'N', 'Remove', 'No login in 90+ days', 'Priya Shah', 'Remove', 'Contractor no longer uses CRM', '2026-10-23', 'IT-5678', '2026-10-23', 'GRC Analyst', ''],
  ];
  return [
    {
      name: 'Instructions',
      title: 'User Access Review Template',
      notes: [
        'Use one row per user per entitlement per system. Export data from the IdP, cloud console or SaaS admin report, paste it into Review Register, then apply the recommendation rules on the Rules sheet.',
        'Reviewers only need to act on rows marked Review or Remove, but they must sign off on the whole system in Sign-off. Every Remove or Modify needs a remediation ticket and a completed date before the cycle closes.',
        'Keep the source export (with its run date and query) next to this file as evidence of completeness. Auditors will ask how you know the population is complete.',
        'Prepared by OneLens by Ruchi Kandpal. Adapt to your environment.',
      ],
      headers: ['Sheet', 'Purpose'],
      rows: [
        ['Review Register', 'Line-by-line access with auto-recommendation, reviewer decision and remediation tracking'],
        ['Rules', 'Recommendation rules that pre-decide routine access so reviewers focus on exceptions'],
        ['System Scope & Calendar', 'Which systems are reviewed, by whom, how often, and in which month'],
        ['Sign-off', 'Reviewer attestation per system, with completeness evidence'],
        ['Metrics', 'Cycle KPIs that show reviews are real, not rubber-stamped'],
        ['RACI', 'Who does what'],
        ['Framework Mapping', 'Audit requirements this review supports'],
      ],
    },
    { name: 'Review Register', title: 'Access Review Register', headers: reviewHeaders, rows: [...sample, ...Array.from({ length: 40 }, () => [])] },
    {
      name: 'Rules',
      title: 'Auto-Recommendation Rules',
      headers: ['Rule', 'Condition', 'Recommendation', 'Reviewer action'],
      rows: [
        ['R1 Leaver', 'HR status is Leaver or account owner not found in HR', 'Remove', 'Confirm and remove within 24 hours'],
        ['R2 Dormant', 'No use in 90+ days', 'Remove', 'Confirm, or justify Keep'],
        ['R3 Baseline match', 'Entitlement matches role baseline and used in last 90 days', 'Keep', 'No action needed beyond system sign-off'],
        ['R4 Privileged', 'Admin, owner, root, production write or security role', 'Review', 'Explicit decision every cycle; prefer JIT'],
        ['R5 Outside baseline', 'Entitlement not in role baseline', 'Review', 'Keep with justification, or remove'],
        ['R6 SoD conflict', 'User holds conflicting roles (e.g. deploy and approve)', 'Review', 'Remove one role or document compensating control'],
        ['R7 Mover', 'Department, title or manager changed since last cycle', 'Review', 'Remove access tied to the old role'],
        ['R8 External', 'Guest, contractor or vendor account', 'Review', 'Sponsor confirms need and end date'],
      ],
    },
    {
      name: 'System Scope & Calendar',
      title: 'Systems in Scope and Review Calendar',
      headers: ['System', 'System Owner', 'Data Classification', 'In Audit Scope (Y/N)', 'SSO Integrated (Y/N)', 'JIT for Privileged (Y/N)', 'Standard Access Frequency', 'Privileged Access Frequency', 'Review Month(s)', 'Reviewer(s)', 'Backup Reviewer', 'Export Method', 'Last Completed'],
      rows: [
        ['AWS Production', 'Head of Platform', 'Restricted', 'Y', 'Y', 'Y', 'Quarterly', 'Monthly', 'Jan, Apr, Jul, Oct', 'Head of Platform', 'CTO', 'IAM Identity Center report', '2026-10-25'],
        ...Array.from({ length: 15 }, () => []),
      ],
    },
    {
      name: 'Sign-off',
      title: 'Reviewer Attestation',
      headers: ['System', 'Review Cycle', 'Population Source and Run Date', 'Rows Reviewed', 'Kept', 'Removed', 'Modified', 'Reviewer Name', 'Reviewer Title', 'Attestation Statement', 'Sign-off Date', 'All Removals Verified (Y/N)'],
      rows: [
        ['AWS Production', '2026 Q4', 'IAM Identity Center export, 2026-10-20', '42', '38', '3', '1', 'A. Reviewer', 'Head of Platform', 'I have reviewed the access listed and confirm it is appropriate, except where marked for removal or change.', '2026-10-24', 'Y'],
        ...Array.from({ length: 15 }, () => []),
      ],
    },
    {
      name: 'Metrics',
      title: 'Review Quality Metrics',
      headers: ['Metric', 'Target', 'This Cycle', 'Previous Cycle', 'Notes'],
      rows: [
        ['% systems reviewed on time', '100%', '', '', ''],
        ['% rows auto-decided by rules', 'Track', '', '', 'Higher means less reviewer load'],
        ['% access removed or modified', 'Track', '', '', 'Near 0% every cycle can signal rubber-stamping'],
        ['Median seconds per reviewer decision', 'Track', '', '', 'Very low values suggest rubber-stamping'],
        ['Reviewers who approved 100% of items', '0 without spot-check', '', '', 'Spot-check 10% of their decisions'],
        ['Median days from Remove decision to removal', '5 business days or less', '', '', ''],
        ['Standing privileged accounts', 'Downward trend', '', '', 'Replace with JIT'],
        ['Mover reviews completed within SLA', '95%+', '', '', ''],
      ],
    },
    { name: 'RACI', title: 'RACI', headers: ['Activity', 'Responsible', 'Accountable', 'Consulted', 'Informed'], rows: RACI },
    { name: 'Framework Mapping', title: 'Framework Mapping', headers: ['Framework', 'Requirement', 'What it expects'], rows: MAPPING },
  ];
}

export default function AccessReviewByDesign() {
  const [open, setOpen] = useState(0);
  const download = () => downloadXlsx(buildSheets(), 'user-access-review-template');

  return (
    <section id="access-review-by-design" className="mt-8 scroll-mt-24 rounded-2xl border border-indigo-200 dark:border-indigo-900/50 bg-white dark:bg-gray-900/60 p-6 md:p-8">
      <div className="flex flex-col md:flex-row md:items-start gap-4 mb-6">
        <div className="flex-1">
          <h3 className="text-xl font-extrabold text-navy-900 dark:text-text-dark-primary">Access Reviews by Design for High-Volume, Busy Teams</h3>
          <p className="text-sm text-navy-600 dark:text-text-dark-secondary mt-1 max-w-3xl">
            When teams are stretched, quarterly campaigns of thousands of rows turn into rubber-stamping and late evidence. Design the review into the system instead: fewer standing permissions, smaller reviews triggered by real changes, and reviewers who only decide the exceptions.
          </p>
        </div>
        <button onClick={download} className="inline-flex items-center gap-2 shrink-0 px-4 py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-bold hover:bg-indigo-700 transition-colors">
          <Download className="w-4 h-4" /> Access Review Template (.xlsx)
        </button>
      </div>

      <div className="space-y-3">
        {PATTERNS.map((p, i) => {
          const Icon = p.icon;
          const isOpen = open === i;
          return (
            <div key={p.title} className="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <button onClick={() => setOpen(isOpen ? -1 : i)} className="w-full flex items-center gap-3 p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-800/60" aria-expanded={isOpen}>
                <span className="inline-flex w-9 h-9 rounded-lg bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 items-center justify-center shrink-0"><Icon className="w-5 h-5" /></span>
                <span className="flex-1 font-semibold text-navy-900 dark:text-text-dark-primary">{p.title}</span>
                {isOpen ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
              </button>
              {isOpen && (
                <div className="px-4 pb-4 pl-16 text-sm">
                  <p className="text-navy-600 dark:text-text-dark-secondary italic mb-2">{p.why}</p>
                  <ul className="list-disc pl-5 space-y-1.5 text-navy-700 dark:text-text-dark-secondary">
                    {p.steps.map((s) => <li key={s}>{s}</li>)}
                  </ul>
                  <p className="mt-3 text-xs text-navy-600 dark:text-text-dark-secondary"><strong className="text-navy-900 dark:text-text-dark-primary">Audit evidence:</strong> {p.evidence}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <p className="mt-6 text-xs text-navy-600 dark:text-text-dark-secondary">
        The template includes a review register with auto-recommendation columns, eight recommendation rules, a system scope and staggered calendar, reviewer sign-off, review quality metrics, a RACI and mapping to SOC 2, ISO 27001, PCI DSS, HIPAA, NIST 800-53 and CIS.
      </p>
    </section>
  );
}
