import { Link } from 'react-router-dom';
import SortableGrid from './SortableGrid.jsx';
import { NewBadge } from '../updates/UpdateBits.jsx';
import { CHEAT_SHEETS } from '../../data/cheatSheets.js';

// Extends the Incident Management entry: standards crosswalk, governance requirements,
// regulatory clocks (reused from the breach deadlines cheat sheet) and security incident vs ITSM major incident.
const P = 'text-sm text-gray-700 dark:text-gray-300';
const H = 'mt-4 mb-1 text-base font-semibold text-gray-900 dark:text-white';
const BOX = 'rounded-2xl border border-gray-200 dark:border-gray-700 p-5 my-4';
const Ul = ({ items }) => <ul className={`list-disc pl-5 space-y-1 ${P}`}>{items.map((x) => <li key={x}>{x}</li>)}</ul>;

const CROSSWALK = [
  ['Plan and prepare', 'Preparation, mapped to CSF Govern, Identify and Protect', 'Approved plan, severity matrix, roles, contacts, tools, tabletop'],
  ['Detect and report', 'Detect (DE.CM, DE.AE)', 'Detect and report: record time and source, preserve logs'],
  ['Assess and decide', 'Detect (DE.AE) and Respond (RS.MA)', 'Triage and declare: severity, roles, restricted record'],
  ['Respond', 'Respond (RS.MA, RS.AN, RS.CO, RS.MI) and Recover (RC.RP, RC.CO)', 'Contain, analyse and eradicate, recover and communicate, assess notification duties'],
  ['Learn lessons', 'Identify: Improvement (ID.IM)', 'Close and improve: blameless review, root cause, tracked actions'],
];

const breach = CHEAT_SHEETS.find((s) => s.id === 'breach-deadlines');

export default function IncidentGovernanceExtras() {
  return (
    <details className={BOX} id="incident-governance">
      <summary className="cursor-pointer text-lg font-bold text-gray-900 dark:text-white">Incident governance: ISO/IEC 27035 and NIST crosswalk, roles, regulatory clocks and ITSM<NewBadge /></summary>
      <p className="mt-1 text-[11px] text-gray-500 dark:text-slate-400">Last verified: 26 Nov 2026. Sources: ISO/IEC 27035-1:2023, NIST SP 800-61 Rev. 3.</p>
      <div className="mt-3">
        <h3 className={H}>Crosswalk</h3>
        <SortableGrid label="ISO 27035-1 vs NIST 800-61r3 vs OneLens" headers={['ISO/IEC 27035-1:2023 phase', 'NIST SP 800-61r3 (CSF 2.0 functions)', 'OneLens workflow step']} rows={CROSSWALK} file="incident-standards-crosswalk" />

        <h3 className={H}>Governance requirements</h3>
        <Ul items={[
          'Policy owner: a named executive owns the incident management policy and its annual review.',
          'Roles: the incident commander runs the response and makes decisions; the technical lead directs investigation and containment; the communications lead handles internal, customer and regulator messages with Legal.',
          'Crisis management team: activation triggers set in advance, for example critical severity, customer data exposure, regulator notification, ransomware or media interest.',
          'Decision rights: who can isolate production systems, take services offline, pay for external help or approve external statements.',
          'Board reporting: significant incidents reported to the board or a committee, with a periodic summary of all incidents and trends.',
          'Evidence and chain of custody: who collected what, when and how, with hashes where relevant, stored with restricted access.',
          'Incident register: every incident logged with severity, timeline, owner, root cause and actions.',
          'Metrics: mean time to detect (MTTD), mean time to acknowledge (MTTA), mean time to resolve (MTTR) and recurrence rate.',
          'Annual tabletop: at least one exercise a year with leadership, with findings tracked to closure.',
        ]} />

        <h3 className={H}>Regulatory clocks</h3>
        {breach && <SortableGrid label="Incident regulatory clocks" headers={breach.columns} rows={breach.rows} file="incident-regulatory-clocks" min={1000} />}
        <p className={P}>Same data as the <Link className="ui-link" to="/cheat-sheets#breach-deadlines">breach notification deadlines cheat sheet</Link>. Sector regulators such as RBI and SEBI can set their own reporting timelines; check the current circulars for your licence.</p>

        <h3 className={H}>Security incident vs ITSM major incident</h3>
        <p className={P}>An ITSM major incident is a serious service outage handled to restore service fast, usually by IT operations. A security incident is a threat to confidentiality, integrity or availability caused by an attack or misuse, handled by security with evidence preservation and possible legal notification. One event can be both: ransomware is a major outage and a security incident, so both processes run with clear handoffs and one incident commander.</p>
        <Ul items={[
          'Problem management finds the root cause behind repeated or major incidents and records known errors.',
          'Change management delivers the fix: the RCA raises a change request, which goes through normal approval and testing.',
          'Failed change review: when a change causes an incident, the post-implementation review feeds back into change risk assessment and testing.',
        ]} />
      </div>
    </details>
  );
}
