import { Link } from 'react-router-dom';
import TemplateDownloadButton from './templates/TemplateDownloadButton.jsx';
import { useAuth } from '../context/AuthContext.jsx';

// Knowledge Base topic: IT audit toolkit (Module J) and access testing (Module K).
// Only covers what the site did not already have; links out to existing SOX, access and TPRM content.
const CARD = 'bg-white border border-gray-200 rounded-2xl p-5 mb-4 dark:bg-gray-800 dark:border-gray-700 scroll-mt-24';
const P = 'text-sm text-gray-700 dark:text-gray-300';
const TH = 'p-2 text-left font-semibold text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-900';
const TD = 'p-2 align-top border-t border-gray-100 dark:border-gray-700 text-gray-700 dark:text-gray-300';
const VERIFIED = '17 Nov 2026';

function Table({ head, rows }) {
  return (
    <div className="overflow-x-auto my-3" tabIndex={0} role="region" aria-label={head.join(', ')}>
      <table className="w-full min-w-[560px] text-sm">
        <thead><tr>{head.map((h) => <th key={h} scope="col" className={TH}>{h}</th>)}</tr></thead>
        <tbody>{rows.map((r, i) => <tr key={i}>{r.map((c, j) => <td key={j} className={`${TD} ${j === 0 ? 'font-medium' : ''}`}>{c}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}
const Ol = ({ items }) => <ol className={`list-decimal pl-5 space-y-1 ${P}`}>{items.map((x) => <li key={x}>{x}</li>)}</ol>;
const Ul = ({ items }) => <ul className={`list-disc pl-5 space-y-1 ${P}`}>{items.map((x) => <li key={x}>{x}</li>)}</ul>;

function Templates({ items }) {
  const { user } = useAuth();
  return (
    <div className="mt-4 rounded-xl border border-gray-200 dark:border-gray-700 p-3">
      <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Templates</p>
      {!user ? <p className="text-xs text-gray-600 dark:text-gray-400">Log in to download templates.</p> : (
        <ul className="space-y-2">{items.map((t) => (
          <li key={t.file} className="flex flex-wrap items-center justify-between gap-2 text-sm"><span className="text-gray-800 dark:text-gray-200"><span className="font-medium">{t.name}</span>: {t.desc}</span><TemplateDownloadButton template={t} compact /></li>
        ))}</ul>
      )}
    </div>
  );
}
const Source = ({ text }) => <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">Source: {text}. Last verified: {VERIFIED}.</p>;

const SAMPLES = [
  ['Annual', '1', '1'],
  ['Quarterly', '2', '2'],
  ['Monthly', '2 to 5', '2'],
  ['Weekly', '5 to 15', '5'],
  ['Daily', '20 to 40', '15'],
  ['Multiple times a day', '25 to 60', '25'],
  ['Automated (ITGCs effective)', '1 per variation', '1'],
];

const SECTIONS = [
  { id: 'samples', title: 'Sample sizes by control frequency', body: (
    <>
      <p className={P}>Firms set their own sample tables. The ranges below are common starting points. Use the higher end when the control is high risk, has failed before, or relies on manual judgement.</p>
      <Table head={['Control frequency', 'Typical sample (operating effectiveness)', 'Lower risk minimum']} rows={SAMPLES} />
      <Ul items={['Select samples from the full period under audit, spread across it, and record how you selected them.', 'One exception in a small sample usually means the control failed. Do not extend the sample to hide it without a documented approach agreed in advance.']} />
      <p className={`mt-2 ${P}`}>The SOX cycle, deficiency classes and ITGC vs ITAC comparison are on the <Link className="ui-link" to="/sox">SOX 404 page</Link>.</p>
      <Source text="Common practice in external and internal audit methodologies; PCAOB AS 2201 for the overall approach" />
    </>
  ) },
  { id: 'itac', title: 'ITAC testing basics', body: (
    <>
      <p className={P}>IT application controls run inside a system: they block, calculate or check data automatically. If ITGCs are effective, one test per variation of the control is usually enough, then rely on change control to show it has not changed.</p>
      <Table head={['Type', 'Example', 'How to test']} rows={[
        ['Configuration', 'Three-way match tolerance set to 5%', 'Inspect the setting in the system with the system owner, screenshot with date and user'],
        ['Calculation', 'Interest or invoice totals', 'Re-perform the calculation for one item per variation'],
        ['Interface', 'Orders flow from the web app to the ledger', 'Compare record counts and totals at both ends for a sample run'],
        ['Edit check', 'Field rejects a future date', 'Try a valid and an invalid entry in a test environment and record both results'],
      ]} />
      <Source text="Common audit practice; PCAOB AS 2201 on reliance on automated controls" />
    </>
  ) },
  { id: 'ipe', title: 'Testing reports (IPE): completeness and accuracy', body: (
    <>
      <p className={P}>Any system report you use as a population or as evidence must be proven complete and accurate before you rely on it.</p>
      <Ol items={['Record how the report was produced: system, report name, parameters, date run and who ran it. Watch it being run or get a screenshot of the parameters.', 'Completeness: agree the record count or total to an independent source, such as the general ledger or a second system.', 'Accuracy: trace a few rows from the report back to the system, and a few from the system forward to the report.', 'If the report is custom or a query, check the query logic, or check that the report is covered by change control.', 'File the parameter screenshot and your reconciliation with the test.']} />
      <Source text="Common audit practice for information produced by the entity" />
    </>
  ) },
  { id: 'rcm', title: 'Building a Risk and Control Matrix (RCM)', body: (
    <>
      <p className={P}>The RCM is the backbone of an audit: one row per control, linked to the risk it addresses and to how it will be tested.</p>
      <Ol items={['List processes and systems in scope.', 'For each process, write the risks in plain words (what could go wrong).', 'Record the control that addresses each risk: ID, description, owner, frequency, manual or automated, preventive or detective, key or non-key.', 'Map each control to the framework references you need (SOX assertion, SOC 2 criteria, ISO control).', 'Add the test approach: walkthrough steps, population, sample size, attributes to test.', 'Agree the RCM with control owners before testing starts.']} />
      <Source text="Common audit practice" />
    </>
  ) },
  { id: 'soc-reports', title: 'Reviewing a SOC 1 vs SOC 2 report', body: (
    <>
      <Table head={['Check', 'SOC 1', 'SOC 2']} rows={[
        ['What it covers', 'Controls relevant to the user\'s financial reporting', 'Security and other Trust Services Criteria'],
        ['Who uses it', 'User auditors and finance teams (SOX reliance)', 'Customers, security and vendor risk teams'],
        ['Period', 'Should overlap your fiscal year; get a bridge letter for the gap', 'Should be recent, usually within 12 months'],
        ['Opinion', 'Unqualified, qualified, adverse or disclaimer', 'Same'],
        ['Exceptions', 'Assess if they affect your financial statements', 'Assess if they affect the services you use'],
        ['CUECs', 'Map each to a control you operate', 'Map each to a control you operate'],
        ['Subservice organisations', 'Carved out or inclusive; get their reports if carved out', 'Same'],
      ]} />
      <p className={P}>The full SOC 2 review worksheet is in <a className="ui-link" href="/#vendor-risk">Vendor Risk Management</a> and its template strip.</p>
      <Source text="AICPA SSAE 18 (SOC 1) and AICPA Trust Services Criteria (SOC 2)" />
    </>
  ) },
  { id: 'analytics', title: 'Data analytics: testing every change ticket', body: (
    <>
      <p className={P}>Instead of sampling 25 changes, export every change ticket for the period from the ticketing tool and test the full population with simple rules in a spreadsheet or script.</p>
      <Table head={['Rule', 'Logic', 'Exception means']} rows={[
        ['Approved before release', 'Approval date is earlier than deployment date', 'Change went live without prior approval'],
        ['Requester is not the implementer', 'Requester ID differs from implementer ID', 'Segregation of duties gap'],
        ['Approver is not the implementer', 'Approver ID differs from implementer ID', 'Self-approval'],
        ['Emergency changes reviewed', 'Emergency flag set and post-implementation review date within the agreed days', 'Emergency change never reviewed'],
        ['Tested', 'Test evidence field or linked test run is present', 'Untested change'],
        ['Matches deployments', 'Every deployment in the release log has a ticket', 'Unauthorised change outside the process'],
      ]} />
      <Ul items={['First prove the export is complete (see IPE above): agree ticket count to the tool and deployment count to the release log.', 'Follow up every exception with the owner before calling it a finding.']} />
      <Source text="Common audit practice; tool-neutral" />
    </>
  ) },
  { id: 'findings', title: 'Writing audit findings', body: (
    <>
      <Table head={['Element', 'What to write', 'Example']} rows={[
        ['Condition', 'What you found, with numbers', '3 of 25 sampled leavers kept system access more than 5 days after leaving'],
        ['Criteria', 'What should have happened', 'Access policy: remove access within 1 working day'],
        ['Cause', 'Why it happened', 'HR does not notify IT when contractors leave'],
        ['Effect', 'The risk or impact', 'Former staff could access customer data'],
        ['Recommendation', 'What to fix', 'Add contractor exits to the automated HR to IT trigger'],
        ['Management response', 'Agreed action, owner and due date', 'IT manager, automate by 31 March'],
      ]} />
      <p className={P}>For the full report layout, use the existing Internal Audit Report template in <Link className="ui-link" to="/templates">Templates</Link>.</p>
      <Source text="IIA Global Internal Audit Standards (2024) on communicating results" />
    </>
  ) },
  { id: 'jml', title: 'Access: joiner, mover and leaver testing', body: (
    <>
      <Table head={['Event', 'Control', 'Test']} rows={[
        ['Joiner', 'Access granted only after an approved request, matching the role', 'Sample new hires from HR; trace each to a request, approval date before grant, and access matching the role'],
        ['Mover', 'Old access removed when role changes', 'Sample role changes from HR; compare access before and after; old role access should be gone within the agreed days'],
        ['Leaver', 'All access removed by the agreed deadline', 'Sample leavers from HR; compare the HR exit date to the account disable date in each in-scope system'],
      ]} />
      <Ul items={['Always start from the HR list, not the IT list, so you catch people IT never heard about.', 'Check service and shared accounts separately; they have no HR record.']} />
      <p className={P}>User access reviews, least privilege and segregation of duties strategies are in <a className="ui-link" href="/#access-governance">Access Governance</a>.</p>
      <Source text="Common audit practice; ISO 27001 A.5.18 and SOC 2 CC6.2 for the requirements" />
    </>
  ) },
];

const TEMPLATES = [
  { name: 'Risk and Control Matrix (RCM)', file: 'rcm-template.xlsx', desc: 'risks, controls, attributes, framework references and test approach' },
  { name: 'ITGC test workpaper', file: 'itgc-workpaper.xlsx', desc: 'separate test of design and operating effectiveness tabs' },
  { name: 'Audit finding', file: 'audit-finding.docx', desc: 'condition, criteria, cause, effect, recommendation and response' },
  { name: 'Sample size reference', file: 'sample-size-reference.xlsx', desc: 'sample sizes by control frequency and risk' },
  { name: 'Joiner, mover and leaver tracker', file: 'jml-tracker.xlsx', desc: 'HR event, request, approval, grant or removal date and SLA check' },
  { name: 'Segregation of duties conflict matrix', file: 'sod-conflict-matrix.xlsx', desc: 'conflicting roles or tasks, risk and mitigating control' },
];

export default function ItAuditToolkit() {
  return (
    <div>
      <div className={CARD}>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">IT audit toolkit</h2>
        <p className={P}>Practical how-to for testing IT controls: sample sizes, application controls, report testing, the RCM, SOC report review, full-population analytics, writing findings and access testing.</p>
        <nav aria-label="Toolkit sections" className="mt-3 flex flex-wrap gap-x-3 gap-y-1">{SECTIONS.map((s) => <a key={s.id} href={`#tk-${s.id}`} className="ui-link text-xs">{s.title}</a>)}</nav>
      </div>
      {SECTIONS.map((s, i) => (
        <details key={s.id} id={`tk-${s.id}`} open={i === 0} className={CARD}>
          <summary className="cursor-pointer font-semibold text-gray-900 dark:text-white">{s.title}</summary>
          <div className="mt-3">{s.body}</div>
        </details>
      ))}
      <Templates items={TEMPLATES} />
    </div>
  );
}
