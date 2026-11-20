import { Link } from 'react-router-dom';
import FlowDiagram from '../crypto/FlowDiagram.jsx';

// Knowledge Base topic: how to streamline a GRC programme, step by step.
// Each step links to the detailed page on the site instead of repeating it.
const CARD = 'bg-white border border-gray-200 rounded-2xl p-5 mb-4 dark:bg-gray-800 dark:border-gray-700';
const P = 'text-sm text-gray-700 dark:text-gray-300';

const STEPS = [
  {
    t: 'Take stock of what you already do',
    why: 'Most teams run the same control two or three times because each framework was set up separately.',
    do: ['List every framework, customer requirement and regulation you answer to.', 'List every recurring task: access reviews, vendor reviews, training, risk reviews, audits.', 'Note who does each task, how often and how long it takes.'],
    result: 'One list of obligations and one list of recurring work, with hours.',
    link: null,
  },
  {
    t: 'Build one control set and map frameworks to it',
    why: 'One control with one owner and one piece of evidence can satisfy SOC 2, ISO 27001, HIPAA and DPDPA together. Test once, comply many.',
    do: ['Start from a unified control framework instead of each standard\'s list.', 'Merge duplicate controls and give each one owner.', 'Map each control to every framework reference it covers.'],
    result: 'A single control register with framework mappings.',
    link: ['Unified Control Framework', '/unified-framework'],
  },
  {
    t: 'Right-size scope',
    why: 'Over-scoping adds controls, evidence and audit days with no extra assurance.',
    do: ['Agree which systems, teams and locations are truly in scope.', 'Write down exclusions with reasons.', 'Use shared responsibility with cloud providers instead of testing their controls yourself.'],
    result: 'A documented scope that auditors accept and teams understand.',
    link: ['ISO 27001 scoping guide', '/iso/27001/la'],
  },
  {
    t: 'Clean up policies',
    why: 'Too many overlapping policies means nobody reads them and reviews never finish.',
    do: ['Merge overlapping policies into a short, consistent set.', 'Move detail into standards and procedures that the owning team maintains.', 'Put every document in one register with owner and review date.'],
    result: 'Fewer, clearer documents with a review cycle that actually runs.',
    link: ['Policy Lifecycle', '/knowledge?topic=policy-lifecycle'],
  },
  {
    t: 'Put recurring work on one calendar',
    why: 'Missed reviews are the most common audit finding, and they usually come from tasks with no date or owner.',
    do: ['Create a compliance calendar from the recurring task list.', 'Give each task an owner, a due date and the evidence it produces.', 'Send reminders automatically.'],
    result: 'Nothing depends on someone remembering.',
    link: null,
  },
  {
    t: 'Automate evidence collection',
    why: 'Screenshots and spreadsheets take most of a GRC team\'s time each month.',
    do: ['Start with the highest-volume evidence: access lists, MFA status, device encryption, training completion.', 'Pull it from source systems on a schedule.', 'Keep a human check for anything automation cannot judge.'],
    result: 'Evidence is ready before the auditor asks.',
    link: ['Evidence Automation', '/knowledge?topic=evidence'],
  },
  {
    t: 'Choose tooling that fits your size',
    why: 'A tool cannot fix an unclear process, and an oversized tool becomes its own project.',
    do: ['Write down the process first, then pick the tool.', 'For small teams, a tracker and shared folders may be enough.', 'Move to a GRC platform when manual effort or the number of frameworks makes it worth it.'],
    result: 'Tools that save time instead of adding admin.',
    link: ['GRC Tooling', '/knowledge?topic=tooling'],
  },
  {
    t: 'Reuse answers for customers',
    why: 'Security questionnaires repeat the same questions; answering each from scratch slows sales.',
    do: ['Keep an approved answer bank linked to controls and evidence.', 'Publish a trust page or share your SOC 2 report under NDA.'],
    result: 'Faster questionnaires with consistent answers.',
    link: ['Customer Trust and Questionnaires', '/knowledge?topic=customer-trust'],
  },
  {
    t: 'Agree an audit charter',
    why: 'Without a charter, audits keep being challenged on scope, access and who they report to, and each one restarts the same argument.',
    do: ['Write a short charter for internal audit (and for the ISMS internal audit programme if you run one).', 'Get it approved by the board or audit committee.', 'Plan audits from it once a year, so every framework is covered by one audit plan.'],
    result: 'Audits run on agreed rules, with access and independence settled in advance.',
    link: ['Audit charter details below', '#audit-charter'],
  },
  {
    t: 'Measure and report',
    why: 'Without measures, you cannot show the programme is working or where to invest.',
    do: ['Pick a short set of KPIs and KRIs.', 'Report trends to management monthly or quarterly.', 'Track time spent on GRC tasks before and after each change.'],
    result: 'Evidence that streamlining saved time and reduced risk.',
    link: ['KPI and KRI library', '/knowledge?topic=kpi-kri'],
  },
  {
    t: 'Review and improve each year',
    why: 'Frameworks, products and teams change, so the programme drifts if nobody looks at it.',
    do: ['Use the management review and internal audit to find waste and gaps.', 'Retire controls that no longer reduce risk.', 'Re-check scope and mappings when frameworks are updated.'],
    result: 'A programme that stays lean as the business grows.',
    link: ['GRC Maturity Model', '/grc-maturity'],
  },
];

const QUICK_WINS = [
  'Combine SOC 2 and ISO 27001 audits with the same auditor and one evidence set.',
  'Run one quarterly access review that covers every framework, not one per framework.',
  'Use one risk register for security, privacy and vendor risk, with a category column.',
  'Hold one management review that covers every certification.',
  'Turn the most common audit requests into a standing evidence folder.',
];

export default function StreamlineGrc() {
  return (
    <div>
      <div className={CARD}>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">How to streamline GRC, step by step</h2>
        <p className={P}>Streamlining means doing each piece of compliance work once, with one owner and one piece of evidence, and letting it count for every framework that needs it. The steps below run in order. Each links to the detailed page on this site.</p>
        <FlowDiagram title="The path at a glance" steps={[
          { label: 'Take stock' }, { label: 'One control set' }, { label: 'Right-size scope' }, { label: 'Clean up policies' },
          { label: 'One calendar' }, { label: 'Automate evidence' }, { label: 'Fit-for-size tools' }, { label: 'Measure', tone: 'safe' },
        ]} />
      </div>
      {STEPS.map((s, i) => (
        <details key={s.t} className={CARD} open={i === 0}>
          <summary className="cursor-pointer font-semibold text-gray-900 dark:text-white">Step {i + 1}: {s.t}</summary>
          <p className={`mt-3 ${P}`}><span className="font-semibold">Why: </span>{s.why}</p>
          <ul className={`mt-2 list-disc pl-5 space-y-1 ${P}`}>{s.do.map((d) => <li key={d}>{d}</li>)}</ul>
          <p className={`mt-2 ${P}`}><span className="font-semibold">Result: </span>{s.result}</p>
          {s.link && <p className={`mt-2 ${P}`}>{s.link[1].startsWith('#') ? <a className="ui-link" href={s.link[1]}>{s.link[0]}</a> : <Link className="ui-link" to={s.link[1]}>{s.link[0]}</Link>}</p>}
        </details>
      ))}
      <details id="audit-charter" className={`${CARD} scroll-mt-24`}>
        <summary className="cursor-pointer font-semibold text-gray-900 dark:text-white">Audit charter: what it is and what it should contain</summary>
        <p className={`mt-3 ${P}`}>An audit charter is a short, formal document, approved by the board or audit committee, that sets out why internal audit exists, what it can look at, what access it has and who it reports to. Think of it as the audit team's terms of engagement with the organisation.</p>
        <FlowDiagram title="Where the charter sits" steps={[
          { label: 'Board or audit committee', note: 'Approves the charter' },
          { label: 'Audit charter', note: 'Mandate, scope, authority' },
          { label: 'Annual audit plan', note: 'Risk based' },
          { label: 'Individual audits', note: 'Fieldwork and findings' },
          { label: 'Reports to the board', tone: 'safe' },
        ]} />
        <h3 className="font-semibold text-gray-900 dark:text-white mt-2 mb-1">What it should contain</h3>
        <ul className={`list-disc pl-5 space-y-1 ${P}`}>
          {['Purpose and mandate: why internal audit exists and the value it should add.', 'Scope: which entities, processes, systems and risks it can review, including IT, security, privacy and third parties.', 'Authority: unrestricted access to records, systems, people and premises needed for audits.', 'Independence and reporting lines: functional reporting to the audit committee, administrative reporting to a senior executive (often the CEO or CFO), and no operational duties that it later audits.', 'Responsibilities: of internal audit, management and the audit committee, including how findings are agreed and tracked.', 'Standards: commitment to follow the IIA Global Internal Audit Standards (2024) or the methodology the organisation adopts.', 'Quality: how the function checks its own work, such as periodic internal and external quality assessments.', 'Review: how often the charter is reviewed, usually yearly, and who approves changes.'].map((x) => <li key={x}>{x}</li>)}
        </ul>
        <h3 className="font-semibold text-gray-900 dark:text-white mt-4 mb-1">How it helps streamline GRC</h3>
        <ul className={`list-disc pl-5 space-y-1 ${P}`}>
          <li>One audit plan can cover ISO 27001 clause 9.2 internal audits, SOC 2 monitoring (CC4.1) and SOX testing, instead of separate programmes.</li>
          <li>Access disputes are settled in advance, so fieldwork does not stall.</li>
          <li>Independence is clear: the person who designs a control does not audit it.</li>
        </ul>
        <h3 className="font-semibold text-gray-900 dark:text-white mt-4 mb-1">Common pitfalls</h3>
        <ul className={`list-disc pl-5 space-y-1 ${P}`}>
          <li>Charter approved once and never reviewed.</li>
          <li>Internal audit reporting only to the CFO, with no direct line to the audit committee.</li>
          <li>Small companies where the GRC lead both runs and audits the ISMS. Use an outside auditor for the parts you designed.</li>
        </ul>
        <p className={`mt-3 text-xs text-gray-500 dark:text-gray-400`}>Source: IIA Global Internal Audit Standards (2024); ISO/IEC 27001:2022 clause 9.2; AICPA TSC CC4.1. Last verified: 17 Nov 2026.</p>
      </details>
      <div className={CARD}>
        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Quick wins</h3>
        <ul className={`list-disc pl-5 space-y-1 ${P}`}>{QUICK_WINS.map((q) => <li key={q}>{q}</li>)}</ul>
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400">Guidance only. Adapt to your organisation and audit scope.</p>
    </div>
  );
}
