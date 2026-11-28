import { Link } from 'react-router-dom';
import SortableGrid from '../kb/SortableGrid.jsx';
import { NewBadge } from '../updates/UpdateBits.jsx';

// How to apply NIST CSF 2.0 (NIST CSWP 29) in an organisation, with category guidance and a worked example.
const P = 'text-sm leading-relaxed text-gray-700 dark:text-gray-300';
const H = 'mt-5 mb-1 text-base font-semibold text-gray-900 dark:text-white';
const TH = 'p-2 text-left font-semibold text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-900';
const TD = 'p-2 align-top border-t border-gray-100 dark:border-gray-700 text-gray-700 dark:text-gray-300';
const Ol = ({ items }) => <ol className={`list-decimal pl-5 space-y-1 ${P}`}>{items.map((x) => <li key={x}>{x}</li>)}</ol>;

function Table({ head, rows, min = 640 }) {
  return (
    <div className="overflow-x-auto my-2" tabIndex={0} role="region" aria-label={head.join(', ')}>
      <table className="w-full text-sm" style={{ minWidth: min }}>
        <thead><tr>{head.map((h) => <th key={h} scope="col" className={TH}>{h}</th>)}</tr></thead>
        <tbody>{rows.map((r) => <tr key={r[0]}>{r.map((c, j) => <td key={j} className={`${TD} ${j === 0 ? 'font-medium' : ''}`}>{c}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}

// [category, function, what good looks like, example evidence, OneLens page]
const CATS = [
  ['GV.OC Organisational context', 'Govern', 'Mission, stakeholders, legal and contract duties and critical services are understood and used in risk decisions', 'Obligations register, critical services list', 'Unified Control Framework'],
  ['GV.RM Risk management strategy', 'Govern', 'Risk appetite and tolerance are agreed and drive priorities', 'Approved risk appetite statement, risk methodology', 'Risk Assessment and Treatment'],
  ['GV.RR Roles, responsibilities and authorities', 'Govern', 'Named owners and authority for cybersecurity, including leadership accountability', 'RACI, job descriptions, board minutes', 'Policy Lifecycle'],
  ['GV.PO Policy', 'Govern', 'Policies are approved, communicated, enforced and reviewed', 'Policy register, acknowledgements', 'Policy Lifecycle'],
  ['GV.OV Oversight', 'Govern', 'Results of the risk strategy are reviewed and the strategy is adjusted', 'Management review minutes, KPI and KRI reports', 'KPI and KRI Library'],
  ['GV.SC Supply chain risk management', 'Govern', 'Suppliers are tiered, assessed, contracted and monitored', 'Vendor inventory, assessments, contracts', 'Vendor risk'],
  ['ID.AM Asset management', 'Identify', 'Hardware, software, data, services and suppliers are inventoried with owners', 'Asset inventory, data inventory', 'Infrastructure Security Review'],
  ['ID.RA Risk assessment', 'Identify', 'Threats, vulnerabilities, likelihood and impact are assessed and prioritised', 'Risk register, threat intelligence inputs', 'Risk Assessment and Treatment'],
  ['ID.IM Improvement', 'Identify', 'Lessons from audits, tests and incidents drive improvements', 'Corrective action tracker, lessons learned', 'Classifying Findings'],
  ['PR.AA Identity, authentication and access control', 'Protect', 'Least privilege, MFA and access reviews for people, services and devices', 'Access reviews, MFA reports', 'Least Privilege and Segregation of Duties'],
  ['PR.AT Awareness and training', 'Protect', 'Staff and privileged users get role-based training and simulations', 'Training records, phishing results', 'Awareness and Physical Checks'],
  ['PR.DS Data security', 'Protect', 'Data is protected at rest, in transit and in use, including DLP and backups', 'Encryption settings, DLP rules, backup tests', 'Endpoint Data Protection and DLP'],
  ['PR.PS Platform security', 'Protect', 'Hardened configurations, patching, logging and secure development', 'Baselines, patch reports, change records', 'Change Management'],
  ['PR.IR Technology infrastructure resilience', 'Protect', 'Networks and environments are protected and capacity and resilience meet needs', 'Network diagrams, firewall reviews, capacity plans', 'Infrastructure Security Review'],
  ['DE.CM Continuous monitoring', 'Detect', 'Networks, endpoints, users and suppliers are monitored for adverse events', 'SIEM coverage list, EDR deployment report', 'Security Operations'],
  ['DE.AE Adverse event analysis', 'Detect', 'Alerts are triaged, correlated and escalated with context', 'Alert triage records, detection register', 'Security Operations'],
  ['RS.MA Incident management', 'Respond', 'Incidents are declared, prioritised, escalated and managed to a plan', 'Incident register, incident records', 'Incident Management policy and workflow'],
  ['RS.AN Incident analysis', 'Respond', 'Scope and root cause are established with preserved evidence', 'Investigation notes, RCA', 'Incident Management policy and workflow'],
  ['RS.CO Incident response reporting and communication', 'Respond', 'Stakeholders and regulators are informed as required', 'Notification decisions, communications log', 'Breach notification cheat sheet'],
  ['RS.MI Incident mitigation', 'Respond', 'Incidents are contained and eradicated', 'Containment actions, approvals', 'Security Operations'],
  ['RC.RP Incident recovery plan execution', 'Recover', 'Restoration follows the plan and is validated', 'Recovery records, restore tests', 'ISO 22301 BCMS'],
  ['RC.CO Incident recovery communication', 'Recover', 'Recovery progress is communicated internally and externally', 'Status updates, customer notices', 'Tabletop Exercise'],
];

const LINKS = [
  ['Unified Control Framework', '/unified-framework'], ['Risk Assessment and Treatment', '/#risk-assessment'], ['Policy Lifecycle', '/knowledge?topic=policy-lifecycle'],
  ['KPI and KRI Library', '/knowledge?topic=kpi-kri'], ['Vendor risk', '/#vendor-risk'], ['Infrastructure Security Review', '/knowledge?topic=infra-review'],
  ['Classifying Findings', '/knowledge?topic=finding-classification'], ['Least Privilege and Segregation of Duties', '/#access-governance'], ['Awareness and Physical Checks', '/knowledge?topic=awareness'],
  ['Endpoint Data Protection and DLP', '/knowledge?topic=edp'], ['Change Management', '/knowledge?topic=change'], ['Security Operations', '/#regional'],
  ['Incident Management policy and workflow', '/knowledge?topic=policy-lifecycle'], ['Breach notification cheat sheet', '/cheat-sheets#breach-deadlines'], ['ISO 22301 BCMS', '/iso/22301'], ['Tabletop Exercise', '/knowledge?topic=tabletop'],
];

export default function NistApplyCsf() {
  return (
    <section id="nist-apply-csf" className="max-w-6xl mx-auto px-4 my-8 scroll-mt-24">
      <details className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5" open>
        <summary className="cursor-pointer text-lg font-bold text-gray-900 dark:text-white">How to apply CSF 2.0 in an organisation<NewBadge /></summary>
        <p className="mt-1 text-[11px] text-gray-500 dark:text-slate-400">Last verified: 26 Nov 2026. Source: NIST CSWP 29 (The NIST Cybersecurity Framework 2.0).</p>
        <div className="mt-3">
          <h3 className={H}>Steps</h3>
          <Ol items={[
            'Scope: decide which business units, services and systems the profile covers.',
            'Current Profile: rate how well each CSF outcome is achieved today, with evidence.',
            'Target Profile: set the outcomes you need, based on risk appetite, obligations and threats.',
            'Gap analysis: compare current and target for each category and note the cause of each gap.',
            'Prioritised action plan: order actions by risk reduction, cost and dependencies, with owners and dates.',
            'Implement, then measure and repeat: track progress, update both profiles yearly and after major changes.',
          ]} />

          <h3 className={H}>Tiers 1 to 4</h3>
          <Table head={['Tier', 'Name', 'What it looks like']} rows={[
            ['1', 'Partial', 'Cybersecurity is ad hoc and reactive; little awareness of risk at leadership level.'],
            ['2', 'Risk informed', 'Leadership approves risk practices but they are not organisation-wide policy.'],
            ['3', 'Repeatable', 'Practices are approved as policy, applied consistently and updated as risk changes.'],
            ['4', 'Adaptive', 'Practices adapt from lessons learned and predictive indicators; risk is part of culture.'],
          ]} />
          <p className={P}>Tiers describe how rigorous governance and risk management practices are. They are not a maturity score that must reach 4; choose the tier that fits your risk.</p>

          <h3 className={H}>Six functions and their categories</h3>
          <SortableGrid label="NIST CSF 2.0 categories" headers={['Category', 'Function', 'What good looks like', 'Example evidence', 'OneLens page']} rows={CATS} file="nist-csf-2-categories" min={1100} />
          <p className={P}>OneLens pages: {LINKS.map(([l, u], i) => <span key={l}>{i ? ' · ' : ''}<Link className="ui-link" to={u}>{l}</Link></span>)}</p>

          <h3 className={H}>Worked example: 200-person SaaS company, Tier 1 to Tier 3 in 12 months</h3>
          <Table head={['Quarter', 'Milestones']} rows={[
            ['Q1', 'Scope agreed; Current Profile completed; risk appetite approved; security lead named; asset and vendor inventories started.'],
            ['Q2', 'Target Profile approved; core policies approved and acknowledged; MFA everywhere; access reviews and vulnerability SLAs running; awareness plan launched.'],
            ['Q3', 'Central logging and alert triage; incident plan approved and tested in a tabletop; critical suppliers tiered and assessed; backup restore tested.'],
            ['Q4', 'Metrics reported to leadership quarterly; internal review of all categories; lessons fed into ID.IM; profiles updated; practices consistent enough to call Tier 3.'],
          ]} />

          <div className="mt-4 rounded-xl border border-indigo-200 dark:border-indigo-800 p-4">
            <p className="font-semibold text-gray-900 dark:text-white">CSF vs ISO 27001</p>
            <p className={P}>CSF sets outcomes and priorities and is voluntary; there is no CSF certification. ISO 27001 is a certifiable management system with required clauses and an Annex A control set. Use CSF to decide what matters most and to report to the board, and ISO 27001 to run and certify the programme. Short crosswalk: GV.PO to A.5.1; GV.SC to A.5.19 to A.5.22; ID.AM to A.5.9; PR.AA to A.5.15 to A.5.18 and A.8.2 to A.8.5; PR.AT to A.6.3; DE.CM to A.8.16; RS.MA to A.5.24 to A.5.26; RC.RP to A.5.29 and A.5.30. Check NIST&apos;s published informative references for the full mapping.</p>
          </div>

          <h3 className={H}>How CSF connects to the rest of the GRC programme</h3>
          <Table head={['Programme element', 'How CSF is used']} rows={[
            ['Risk register', 'Tag each risk with the CSF categories it affects, so gaps and risks are reported in the same language'],
            ['Policies', 'Map each policy to the categories it supports (for example access control policy to PR.AA), which shows uncovered categories'],
            ['Audits', 'Use the Current Profile as an audit plan input and map findings back to categories'],
            ['Security metrics', 'Pick one or two outcome metrics per function (for example MTTD for Detect, MTTR for Respond)'],
            ['Executive reporting', 'Report a profile by function each quarter with movement against the target and the top gaps'],
          ]} />

          <h3 className={H}>Self-assessment</h3>
          <p className={P}>Rate each category 0 to 4 and export the gaps in the <Link className="ui-link" to="/grc-maturity#csf-gap">CSF 2.0 gap self-assessment</Link>, which scores each function and lists your biggest gaps.</p>
        </div>
      </details>
    </section>
  );
}
