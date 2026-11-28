import AiFraudGuide from '../kb/AiFraudGuide.jsx';
import IncidentGovernanceExtras from '../kb/IncidentGovernanceExtras.jsx';
import PolicyGovernanceLifecycle from '../kb/PolicyGovernanceLifecycle.jsx';
import AwarenessProgrammeExtras from '../kb/AwarenessProgrammeExtras.jsx';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import PolicySopProcedure from './PolicySopProcedure.jsx';
import SapItgcPlan from './SapItgcPlan.jsx';
import { SapAccessControlGuide, AwarenessCycleMetrics, ChangeIncidentPolicyBlueprints } from '../kb/InterviewHubExtras.jsx';
import ToolkitModule, { ModuleTable, ModuleTemplates } from './ToolkitModule.jsx';

// GRC toolkit phase 4 modules. Each is a Knowledge Base topic except BIA and DR, which sits on the ISO 22301 page.
const P = 'text-sm text-gray-700 dark:text-gray-300';
const H3 = 'font-semibold text-gray-900 dark:text-white mb-1 mt-4';

/* ---------- Module C: customer trust and questionnaires ---------- */
export const ANSWERS = [
  ['Encryption', 'Do you encrypt customer data at rest and in transit?', '[Company] encrypts customer data at rest using AES-256 and in transit using TLS 1.2 or higher. Keys are managed in a cloud key management service with restricted access and rotation.', 'CRY-01', 'Encryption settings screenshot, TLS scan, key management policy'],
  ['Access control', 'How is access to production granted and reviewed?', 'Access follows least privilege, is approved by the system owner before it is granted, and is reviewed quarterly. Leavers lose access within one working day.', 'IAM-01, IAM-03', 'Access policy, sample approvals, last access review'],
  ['MFA', 'Is MFA enforced?', 'MFA is enforced for all staff through our identity provider for email, cloud consoles, source code and production access.', 'IAM-04', 'Identity provider MFA policy screenshot'],
  ['Logging', 'Do you log and monitor security events?', 'Security logs from cloud, identity and production systems are centralised, retained for at least 12 months and monitored with alerting reviewed by a named team.', 'LOG-01, LOG-02', 'Logging architecture, retention settings, sample alert'],
  ['BCP and DR', 'Do you have a business continuity and disaster recovery plan?', 'Yes. The plan sets recovery objectives for critical services, backups are tested at least annually, and the plan is exercised at least once a year.', 'BCP-01, BCP-02', 'BC/DR plan, last restore test, last exercise report'],
  ['Incident response', 'Do you have an incident response plan, and how fast do you notify customers?', 'Our incident response plan defines roles, severity levels and communication. We notify affected customers without undue delay and within contractual timelines.', 'IR-01, IR-02', 'Incident response plan, last tabletop report'],
  ['Vendor management', 'How do you manage your own suppliers?', 'Vendors are tiered by risk, assessed before onboarding, bound by security and data protection terms, and reviewed at least annually if critical.', 'TPR-01, TPR-02', 'Vendor policy, vendor register, sample assessment'],
  ['SDLC', 'How do you secure software development?', 'Code changes are peer reviewed, scanned automatically for vulnerabilities and secrets, tested, and approved before release to production.', 'DEV-01, CHG-01', 'SDLC policy, sample pull request, scan results'],
  ['Privacy', 'How do you handle personal data?', 'We process personal data only for agreed purposes, keep a record of processing, support data subject requests and apply retention limits.', 'PRV-01, PRV-02, PRV-03', 'Privacy notice, record of processing, DSR log'],
  ['Data residency', 'Where is customer data stored?', 'Customer data is stored in [region] on [cloud provider]. We do not move it to other regions without customer agreement.', 'AST-02', 'Hosting configuration, sub-processor list'],
];

export function CustomerTrustTab() {
  const [q, setQ] = useState('');
  const rows = ANSWERS.filter((a) => !q || a.join(' ').toLowerCase().includes(q.toLowerCase()));
  const m = {
    title: 'Customer trust and security questionnaires',
    what: 'Customers send security questionnaires and contract addenda before they buy. A customer trust process answers them quickly and consistently from an approved answer bank, so sales is not blocked and nothing is over-promised.',
    when: 'Continuous. Review the answer bank at least every six months and after any major change.',
    tags: ['Customer trust', 'Questionnaires', 'SOC 2', 'ISO 27001'],
    steps: [
      'Intake: log every request with customer, questionnaire type (SIG Lite or Core, CAIQ, custom RFI, security addendum), due date and owner.',
      'Triage: check if a trust centre, SOC 2 report or ISO certificate answers it before filling anything in.',
      'Answer from the approved answer bank; mark each answer reused or new.',
      'Send new or unusual answers to a subject matter expert for review.',
      'Approve: security lead signs off; Legal reviews contractual commitments.',
      'Send, then add new approved answers back into the bank.',
      'Track turnaround time and reuse rate.',
    ],
    test: ['Sample three completed questionnaires and trace answers to the approved bank and to evidence.', 'Check that commitments made (for example breach notice in 24 hours) match policy and contracts.'],
    evidence: ['Questionnaire tracker', 'Approved answer bank with owner and review date', 'SME and approver sign-off'],
    pitfalls: ['Sales staff answering from memory.', 'Promising controls that do not exist.', 'Answer bank never reviewed after changes.'],
    maps: ['ISO 27001:2022 Clause 7.4 (communication)', 'SOC 2 CC2.3 (communication with external parties)', 'Unified Control Framework IDs shown against each answer'],
    templates: [
      { name: 'Questionnaire response tracker', file: 'questionnaire-tracker.xlsx', desc: 'customer placeholder, type, due date, owner, status, answers reused and SME sign-off' },
      { name: 'Security Questionnaire Answer Library', file: 'questionnaire-answer-library.xlsx', desc: 'the existing generic answer bank template' },
    ],
    source: 'Common customer trust practice; AICPA TSC CC2.3; ISO/IEC 27001:2022 Clause 7.4',
    intro: (
      <>
        <h3 className={H3}>Answer bank</h3>
        <p className={P}>Generic answers to adapt. Each lists the unified control it relies on (see <Link className="ui-link" to="/unified-framework">Unified Control Framework</Link>) and the evidence that supports it. Replace [placeholders] and only claim what you can prove.</p>
        <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search answers" aria-label="Search answers" className="ui-input mt-2 rounded border px-2 py-1.5 text-sm w-56" />
        <div className="mt-2 space-y-2">{rows.map((a) => (
          <details key={a[0]} className="rounded border border-gray-200 dark:border-gray-700 p-3">
            <summary className="cursor-pointer text-sm font-semibold text-gray-900 dark:text-white">{a[0]}: {a[1]}</summary>
            <p className={`mt-2 ${P}`}>{a[2]}</p>
            <p className={`mt-1 text-xs ${P}`}><span className="font-medium">Control:</span> {a[3]}. <span className="font-medium">Evidence:</span> {a[4]}.</p>
          </details>
        ))}</div>
      </>
    ),
  };
  return <ToolkitModule m={m} />;
}

/* ---------- Module D: policy lifecycle ---------- */
export function PolicyLifecycleTab() {
  const m = {
    title: 'Policy, standard, procedure and guideline lifecycle',
    what: 'Policies say what the organisation requires and why. They only work if each one has an owner, is approved, is read by the people it applies to and is kept current.',
    when: 'Review each document at least yearly, and earlier after an incident, a new regulation or a major system change.',
    tags: ['Policy', 'Governance', 'ISO 27001', 'SOC 2'],
    intro: (
      <>
        <h3 className={H3}>The four document types</h3>
        <ModuleTable head={['Type', 'What it is', 'Example', 'Mandatory?']} rows={[
          ['Policy', 'High-level rules and intent, approved by management', 'Access control policy: access is least privilege and reviewed', 'Yes'],
          ['Standard', 'Specific, measurable requirements that support a policy', 'Passwords at least 14 characters; MFA on all admin access', 'Yes'],
          ['Procedure (SOP)', 'Step-by-step instructions to carry out a task', 'How to run the quarterly access review', 'Yes, as written'],
          ['Guideline', 'Recommended good practice', 'Tips for spotting phishing', 'No, advisory'],
        ]} />
        <PolicySopProcedure />
        <ChangeIncidentPolicyBlueprints />
        <PolicyGovernanceLifecycle />
        <IncidentGovernanceExtras />
      </>
    ),
    steps: ['Draft using the standard template, with owner and scope.', 'Review with the owner, affected teams and Legal where needed.', 'Approve by the named authority (for example CISO or leadership).', 'Publish in one place staff already use.', 'Communicate the change and what it means for people.', 'Collect acknowledgements from everyone in scope.', 'Review yearly or on a trigger event; archive superseded versions, do not delete them.'],
    test: ['Pick five policies from the register and check approval date, version and next review date.', 'Sample ten staff and confirm they acknowledged the current version.', 'Check one procedure is actually followed by watching it or inspecting its records.'],
    evidence: ['Policy register', 'Approved versions with version history', 'Acknowledgement report', 'Evidence of the last annual review'],
    pitfalls: ['Policies copied from templates that do not match reality.', 'Review dates passed with no review.', 'Old versions deleted, so auditors cannot see what applied at the time.'],
    maps: ['ISO 27001:2022 Clause 5.2, Clause 7.5, A.5.1, A.5.37', 'SOC 2 CC5.3, CC2.2', 'NIST CSF 2.0 GV.PO'],
    related: <p className={`mt-3 ${P}`}>The required policy lists are in <Link className="ui-link" to="/iso/27001/li#iso-mandatory-docs">ISO 27001 mandatory documents</Link> and <Link className="ui-link" to="/soc2#soc2-policies">SOC 2 expected policies</Link>. Ready-made policies are in <Link className="ui-link" to="/templates">Templates</Link>.</p>,
    templates: [
      { name: 'Policy register', file: 'policy-register.xlsx', desc: 'name, type, owner, version, approval date, next review date and mapped controls' },
      { name: 'SOP skeleton', file: 'sop-skeleton.docx', desc: 'purpose, scope, roles, procedure steps and document control' },
    ],
    source: 'ISO/IEC 27001:2022 Clauses 5.2 and 7.5; AICPA TSC CC5.3',
  };
  return <ToolkitModule m={m} />;
}

/* ---------- Module I: pre-IPO and M&A due diligence ---------- */
export function DueDiligenceTab() {
  const m = {
    title: 'Pre-IPO and M&A security due diligence',
    what: 'Before a listing or an acquisition, investors and acquirers check whether security and privacy risks could affect value, disclosures or integration. The same checklist works whether you are being assessed or assessing a target.',
    when: '6 to 18 months before a listing; during due diligence for an acquisition; again before integration.',
    tags: ['Due diligence', 'M&A', 'SOX', 'Risk'],
    steps: ['Governance: who owns security, board reporting, policies and their approval dates.', 'Certifications and reports: SOC 2, ISO 27001, PCI DSS, their scope and any exceptions.', 'Incident history: breaches, regulator notices, lawsuits and how they were closed.', 'Data protection: data inventory, record of processing, cross-border transfers, privacy complaints.', 'ITGC readiness for SOX if listing in the US: access, change, operations and their test results.', 'Third-party risk: critical vendors, their reports, open issues.', 'Open audit findings and risk acceptances.', 'Technical check: external attack surface scan and penetration test results.', 'Summarise findings by impact on value, disclosure and integration cost.'],
    test: ['Trace each claimed certification to the certificate or report and confirm scope covers the business being listed or bought.', 'Ask for evidence of closure for every incident and audit finding marked closed.'],
    evidence: ['Completed due diligence checklist', 'Reports and certificates', 'Incident and findings registers', 'Data room index'],
    pitfalls: ['Certificates that cover only part of the business.', 'Incidents disclosed late in the process.', 'No owner for integration security after signing.'],
    maps: ['SOX 404 ITGCs (US listings)', 'For US registrants: SEC cybersecurity disclosure rules (Form 8-K Item 1.05 and Regulation S-K Item 106)', 'For Indian listings: confirm disclosure obligations with counsel'],
    related: <p className={`mt-3 ${P}`}>ITGC testing is in the <Link className="ui-link" to="/knowledge?topic=it-audit">IT Audit Toolkit</Link>; vendor reviews in <a className="ui-link" href="/#vendor-risk">Vendor Risk Management</a>.</p>,
    templates: [{ name: 'Pre-IPO and M&A security due diligence checklist', file: 'due-diligence-checklist.xlsx', desc: 'area, question, evidence requested, response, risk rating and follow-up' }],
    source: 'Common due diligence practice; SEC final rule on cybersecurity disclosure (2023)',
  };
  return <ToolkitModule m={m} />;
}

/* ---------- Module N: awareness and physical spot checks ---------- */
export function AwarenessTab() {
  const m = {
    title: 'Security awareness and physical spot checks',
    what: 'An awareness programme makes security part of how people work. Physical spot checks confirm that office rules, like clean desks and visitor logs, actually happen.',
    when: 'Annual plan with monthly themes; induction for every new joiner; phishing simulations at least quarterly; spot checks quarterly per office.',
    tags: ['Awareness', 'Training', 'Phishing', 'Physical security'],
    steps: [
      'Annual plan: one theme a month (phishing, passwords, data handling, travel, incident reporting), channels (mailers, posters, short videos, quizzes, events) and an owner per month.',
      'Induction: a 30-minute session in week one covering acceptable use, data handling and how to report an incident, with a signed acknowledgement.',
      'Role-based training: developers (secure coding), finance (payment fraud), support (social engineering), admins (privileged access).',
      'Phishing simulations: run a baseline → target by role → assign a short remedial module to anyone who clicks → track click and report rates over time.',
      'Physical spot checks: walk the office with a checklist (clean desk, screen lock, visitor log, badge access, secure disposal bins, tailgating) and record findings.',
      'Report completion, phishing trends and spot check results to management each quarter.',
    ],
    test: ['Sample new joiners and confirm induction training before or within the first week.', 'Check training completion against the HR list, not the training tool list.', 'Review the last two phishing campaigns and follow-up training for clickers.'],
    evidence: ['Awareness plan', 'Training completion report', 'Phishing campaign results', 'Spot check records with actions'],
    pitfalls: ['Annual click-through training only.', 'Punishing clickers, which stops people reporting.', 'Spot checks done once and never repeated.'],
    maps: ['ISO 27001:2022 A.6.3, A.7.2, A.7.7, A.7.14', 'SOC 2 CC1.4, CC2.2', 'NIST CSF 2.0 PR.AT', 'CIS Controls v8.1 Control 14', 'HIPAA Security Rule 45 CFR 164.308(a)(5)', 'PCI DSS v4.0 Requirement 12.6'],
    related: <p className={`mt-3 ${P}`}>Training and phishing metrics are in the <Link className="ui-link" to="/knowledge?topic=kpi-kri">KPI and KRI library</Link>.</p>,
    intro: <><AwarenessCycleMetrics /><AwarenessProgrammeExtras /><AiFraudGuide /></>,
    templates: [
      { name: 'Awareness annual plan', file: 'awareness-annual-plan.xlsx', desc: 'month, theme, audience, channel, owner and completion' },
      { name: 'Phishing simulation tracker', file: 'phishing-tracker.xlsx', desc: 'campaign, audience, delivered, clicked, reported, rates and remedial training' },
      { name: 'Physical spot check checklist', file: 'physical-spot-check.xlsx', desc: 'location, check item, result, finding and action' },
      { name: 'Employee security self-assessment', file: 'employee-security-self-assessment.xlsx', desc: 'short yes or no questionnaire for staff' },
    ],
    source: 'ISO/IEC 27001:2022 Annex A; NIST CSF 2.0; CIS Controls v8.1',
  };
  return <ToolkitModule m={m} />;
}

/* ---------- Module O: ERP security review ---------- */
export function ErpReviewTab() {
  const m = {
    title: 'ERP security review',
    what: 'ERP systems (enterprise resource planning: finance, purchasing, payroll, for example SAP or Oracle) hold the records that drive financial statements. A security review checks who can do what, and whether changes and critical actions are controlled.',
    when: 'Yearly, before SOX or financial audits, and after major upgrades.',
    tags: ['ERP', 'ITGC', 'SoD', 'SOX'],
    steps: [
      'Privileged and generic accounts: list superuser, firefighter (emergency access) and shared accounts; confirm owners, approvals and log review.',
      'Critical transactions: list sensitive actions (create vendor, change bank details, post journals, run payroll) and who can perform them.',
      'Segregation of duties: compare user roles against the conflict matrix; record mitigating controls for any accepted conflict.',
      'Change and transport controls: confirm changes move from development to test to production through an approved process, and no one changes production directly.',
      'Parameter and configuration settings: password rules, session timeout, tolerance limits and system change options.',
      'Audit logging: confirm logs for critical tables and transactions are on, protected and reviewed.',
      'Report findings with risk, owner and due date.',
    ],
    test: ['Run the SoD conflict report and test a sample of conflicts for mitigating control evidence.', 'Sample emergency access sessions and check approval and log review.', 'Sample production changes and trace them to approved transports.'],
    evidence: ['User and role extracts', 'SoD conflict report', 'Emergency access logs and reviews', 'Transport or migration logs', 'Configuration screenshots'],
    pitfalls: ['Testing roles but not the access hidden in composite or derived roles.', 'Generic accounts with no owner.', 'Direct production changes allowed "temporarily".'],
    maps: ['ISO 27001:2022 A.5.3, A.8.2, A.8.15, A.8.32', 'SOX 404 ITGCs: access, change and operations', 'COSO 2013 Principle 11'],
    intro: <><SapAccessControlGuide /><SapItgcPlan /></>,
    related: <p className={`mt-3 ${P}`}>The SoD conflict matrix template and testing steps are in the <Link className="ui-link" to="/knowledge?topic=it-audit">IT Audit Toolkit</Link>. Rule set design, Firefighter governance and key transactions are in <Link className="ui-link" to="/knowledge?topic=sap-grc">SAP GRC Access Control</Link>.</p>,
    templates: [{ name: 'ERP security review checklist', file: 'erp-security-checklist.xlsx', desc: 'area, check, how to test, result, finding and owner' }],
    source: 'Common IT audit practice; COSO 2013; PCAOB AS 2201',
  };
  return <ToolkitModule m={m} />;
}

/* ---------- Module H: BIA and IT DR mock drills (ISO 22301 page) ---------- */
export function BiaDrillCard() {
  return (
    <details id="bia-dr-drill" className="max-w-6xl mx-auto my-6 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 scroll-mt-24">
      <summary className="cursor-pointer p-5 text-lg font-bold text-gray-900 dark:text-white">Business Impact Analysis and IT DR mock drills: practical guide</summary>
      <div className="px-5 pb-5">
        <p className={P}>The BIA tells you what to recover first and how fast. The DR mock drill proves you can. Run the BIA yearly, and a DR drill at least yearly for each critical service.</p>
        <h3 className={H3}>BIA terms</h3>
        <ModuleTable head={['Term', 'Meaning', 'Example']} rows={[
          ['MTPD', 'Maximum tolerable period of disruption: the point after which the damage becomes unacceptable', 'Payments down for 24 hours'],
          ['RTO', 'Recovery time objective: when the service must be back, shorter than MTPD', '4 hours'],
          ['RPO', 'Recovery point objective: how much data you can lose, measured in time', '15 minutes'],
          ['MBCO', 'Minimum business continuity objective: the reduced level of service acceptable during disruption', '50% of normal transaction volume'],
        ]} />
        <h3 className={H3}>Impact categories over time</h3>
        <ModuleTable head={['Impact', '1 hour', '4 hours', '1 day', '1 week']} rows={[['Financial', '', '', '', ''], ['Customer', '', '', '', ''], ['Regulatory', '', '', '', ''], ['Reputation', '', '', '', ''], ['Operational', '', '', '', '']]} />
        <p className={P}>Rate each cell Low, Medium, High or Severe. The first column that reaches Severe sets the MTPD.</p>
        <h3 className={H3}>BIA steps</h3>
        <ol className={`list-decimal pl-5 space-y-1 ${P}`}>{['List products and services in scope.', 'Identify the processes behind each one.', 'Map dependencies: people, systems, data, vendors, sites.', 'Rate impact over time for each process.', 'Set MTPD, RTO, RPO and MBCO.', 'Get the results approved by process owners and leadership.'].map((x) => <li key={x}>{x}</li>)}</ol>
        <h3 className={H3}>Running an IT DR mock drill</h3>
        <ol className={`list-decimal pl-5 space-y-1 ${P}`}>{['Set objectives: for example restore the payments database within 4 hours with no more than 15 minutes of data loss.', 'Choose the scenario: region outage, ransomware, database corruption.', 'Name participants and observers; share the call tree.', 'Activate the call tree and record response times.', 'Run the recovery steps from the runbook, timing each one.', 'Compare actual times to RTO and RPO.', 'Record observations and lessons learnt.', 'Raise corrective actions with owners and dates, and schedule a retest.'].map((x) => <li key={x}>{x}</li>)}</ol>
        <h3 className={H3}>Maps to</h3>
        <ul className={`list-disc pl-5 space-y-1 ${P}`}><li>ISO 22301:2019 Clauses 8.2.2 (BIA), 8.4 (business continuity plans), 8.5 (exercise programme)</li><li>ISO 27001:2022 A.5.29, A.5.30, A.8.13, A.8.14</li><li>SOC 2 A1.2, A1.3</li></ul>
        <ModuleTemplates items={[
          { name: 'BIA questionnaire and workbook', file: 'bia-workbook.xlsx', desc: 'process, dependencies, impact over time, MTPD, RTO, RPO and MBCO' },
          { name: 'DR drill plan and report', file: 'dr-drill-plan-report.docx', desc: 'objectives, scenario, participants, timings against RTO and RPO, lessons and actions' },
          { name: 'Call tree', file: 'call-tree.xlsx', desc: 'role, primary and backup contact, escalation order and response time' },
        ]} />
        <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">Source: ISO 22301:2019; ISO/IEC 27001:2022 Annex A; AICPA TSC A1. Last verified: 17 Nov 2026.</p>
      </div>
    </details>
  );
}
