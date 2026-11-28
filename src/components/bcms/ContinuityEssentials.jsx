// Continuity essentials: risk assessment vs BIA, BCP vs DRP vs crisis management plan, and the four BCP test types.
const TH = 'p-2 text-left font-semibold text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-900';
const TD = 'p-2 align-top border-t border-gray-100 dark:border-gray-700 text-gray-700 dark:text-gray-300';
function Table({ head, rows, min = 760 }) {
  return (
    <div className="overflow-x-auto my-2" tabIndex={0} role="region" aria-label={head.join(', ')}>
      <table className="w-full text-sm" style={{ minWidth: min }}>
        <thead><tr>{head.map((h) => <th key={h || 'x'} scope="col" className={TH}>{h}</th>)}</tr></thead>
        <tbody>{rows.map((r) => <tr key={r[0]}>{r.map((c, j) => <td key={j} className={`${TD} ${j === 0 ? 'font-medium' : ''}`}>{c}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}
const Box = ({ id, title, children }) => (
  <details id={id} className="rounded-xl border border-gray-200 dark:border-gray-700 p-4 scroll-mt-24">
    <summary className="cursor-pointer font-bold text-gray-900 dark:text-white">{title}</summary>
    <div className="mt-2">{children}</div>
  </details>
);

export default function ContinuityEssentials() {
  return (
    <section id="continuity-essentials" className="max-w-6xl mx-auto px-4 my-8 space-y-3 scroll-mt-24">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white">Continuity essentials</h2>
      <Box id="ra-vs-bia" title="Risk assessment vs business impact analysis (BIA)">
        <Table head={['', 'Risk assessment', 'Business impact analysis']} rows={[
          ['Question it answers', 'What could go wrong, how likely is it, and how bad would it be?', 'If a critical activity stops, what is the impact over time, and how fast must it come back?'],
          ['Focus', 'Threats and vulnerabilities affecting assets and operations', 'Critical products, services, activities and the resources they depend on'],
          ['Main outputs', 'Risk register, risk ratings, treatment plan', 'Maximum tolerable period of disruption, RTO, RPO, minimum service level, dependencies'],
          ['When', 'Ongoing, as part of risk management', 'As part of continuity planning, reviewed at least yearly and after major change'],
          ['Used for', 'Deciding to reduce, transfer, avoid or accept risks', 'Choosing continuity and recovery strategies and building plans'],
        ]} />
        <p className="text-sm text-gray-700 dark:text-gray-300">The two feed each other: the BIA says what matters most and how fast; the risk assessment says what could disrupt it. ISO 22301 requires both (clause 8.2).</p>
      </Box>
      <Box id="bcp-drp-cmp" title="BCP vs disaster recovery plan vs crisis management plan">
        <Table head={['', 'Business continuity plan', 'Disaster recovery plan', 'Crisis management plan']} rows={[
          ['Focus', 'Keeping critical business activities running', 'Restoring IT systems and data', 'Leading the organisation through the event and protecting reputation'],
          ['Scope', 'All critical business operations', 'Technology', 'Decisions, stakeholders and communication'],
          ['Owned by', 'Business units with the continuity manager', 'IT', 'Senior leadership, with communications and legal'],
          ['Triggered by', 'Any significant disruption to operations', 'Failure or loss of systems or data', 'Any event threatening people, the organisation or its reputation'],
          ['Key objective', 'Minimise operational disruption', 'Meet RTO and RPO', 'Clear decisions and communication'],
          ['Time frame', 'Through the disruption until normal service', 'Short to medium term', 'Immediate and short term'],
        ]} min={900} />
        <p className="text-sm text-gray-700 dark:text-gray-300">They work together: the crisis team decides, the BCP keeps the business going with workarounds, and the DR plan brings systems back.</p>
      </Box>
      <Box id="bcp-test-types" title="Types of BCP and DR tests">
        <Table head={['Test type', 'What happens', 'Disruption and cost', 'Good for']} rows={[
          ['Paper review (checklist)', 'Owners read the plan and check contacts, steps and dependencies are current', 'None', 'Keeping plans accurate after changes'],
          ['Walk-through', 'The team talks through the plan step by step together', 'Low', 'Making sure people know their roles and finding gaps'],
          ['Tabletop or simulation', 'A facilitator runs a realistic scenario and the team responds as if it were happening', 'Low to medium', 'Testing decisions, communication and escalation'],
          ['Parallel test', 'Recovery systems are brought up alongside production without switching users over', 'Medium', 'Proving recovery works without affecting service'],
          ['Full interruption (full scale)', 'Production is switched to the recovery site or systems for real', 'High', 'The strongest evidence, used carefully once lower tests pass'],
        ]} />
        <p className="text-sm text-gray-700 dark:text-gray-300">Build up from paper reviews to live tests. Record objectives, results, issues and actions for every test; auditors ask for this evidence. A ready-made exercise is in the <a className="ui-link" href="/knowledge?topic=tabletop">tabletop exercise template</a>.</p>
      </Box>
    </section>
  );
}
