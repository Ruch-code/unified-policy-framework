// Six layers of AI governance, each built on the one above it, with a short explanation of every element.
const P = 'text-sm leading-relaxed text-gray-700 dark:text-gray-300';
const TH = 'p-2 text-left font-semibold text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-900';
const TD = 'p-2 align-top border-t border-gray-100 dark:border-gray-700 text-gray-700 dark:text-gray-300';

const LAYERS = [
  ['1. AI inventory', 'Know what AI you have before you govern it.', [
    ['Shadow AI detection', 'Find AI tools and features in use without approval, through network, SaaS and expense data.'],
    ['System classification', 'Record each system\'s type, purpose, users and data so like systems are handled the same way.'],
    ['Risk tiering', 'Rate each system (for example high, medium, low, or by EU AI Act category) to set how much control it needs.'],
    ['Ownership assignment', 'Name one accountable business owner and one technical owner per system.'],
    ['Model registry', 'Keep a versioned list of models in use, where they run and who approved them.'],
  ], 'shadow-ai'],
  ['2. Data foundation', 'Good AI depends on knowing and trusting the data behind it.', [
    ['Source tracking', 'Record where every training, fine-tuning and retrieval dataset comes from and on what terms.'],
    ['Lineage mapping', 'Trace how data moves and changes from source to model to output.'],
    ['Quality validation', 'Check completeness, accuracy and format before data is used.'],
    ['Freshness monitoring', 'Alert when data used for retrieval or training is out of date.'],
    ['Data bias screening', 'Test datasets for under-representation or skew before training.'],
  ], 'secure-rag-pipeline'],
  ['3. Data security and access', 'Protect the data and limit who and what can reach it.', [
    ['Encryption', 'Encrypt data at rest and in transit, including vector stores and model artefacts.'],
    ['Anonymisation', 'Remove or mask personal identifiers where the use case does not need them.'],
    ['Role-based access', 'Give access by role, and make retrieval respect each user\'s own permissions.'],
    ['Least privilege', 'Give people, services and agents only the access the task needs.'],
    ['Key management', 'Store and rotate keys in a managed service, with access logged.'],
  ], 'agent-harness-layers'],
  ['4. Model assurance', 'Prove the model works as intended and keeps working.', [
    ['Model cards', 'Document purpose, limits, data and test results for each model.'],
    ['Performance benchmarks', 'Measure accuracy and other metrics against agreed thresholds before release.'],
    ['Fairness testing', 'Compare outcomes across groups to find unfair differences.'],
    ['Red-teaming', 'Attack the system on purpose with jailbreaks, prompt injection and misuse.'],
    ['Drift detection', 'Watch production for changes in data or behaviour that reduce quality.'],
  ], 'ai-security-audit'],
  ['5. Human oversight', 'People stay able to understand, challenge and stop AI decisions.', [
    ['Decision review', 'People review AI decisions that significantly affect individuals or the business.'],
    ['Escalation paths', 'Clear routes to raise concerns about AI behaviour quickly.'],
    ['Override authority', 'Named people can stop, reverse or override an AI action.'],
    ['Output validation', 'Check outputs before they reach customers or other systems.'],
    ['Accountability mapping', 'Show who is responsible for each AI decision, from team to board.'],
  ], 'agent-autonomy-controls'],
  ['6. Compliance and audit', 'Show regulators, customers and auditors that the layers above work.', [
    ['EU AI Act mapping', 'Map each system to its AI Act role and risk tier and the duties that follow.'],
    ['GDPR alignment', 'Confirm lawful basis, DPIAs, transparency and rights handling for personal data.'],
    ['Policy enforcement', 'Turn AI policy into enforced controls, not just documents.'],
    ['Incident reporting', 'Log, investigate and report AI incidents, including to regulators where required.'],
    ['Audit trails', 'Keep records of decisions, approvals, changes and tool calls for review.'],
  ], 'rai-crosswalk'],
];

export default function AiGovernanceSixLayers() {
  return (
    <details className="my-6 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5" id="ai-governance-six-layers">
      <summary className="cursor-pointer text-lg font-bold text-gray-900 dark:text-white">Six layers of AI governance, from inventory to audit</summary>
      <div className="mt-3 space-y-4">
        <p className={P}>Each layer depends on the one above it: you cannot secure data you have not traced, or audit a model you have not inventoried. Use the layers as a checklist for an AI governance programme; each links to the section on this page with more detail.</p>
        {LAYERS.map(([name, why, items, link]) => (
          <section key={name}>
            <h3 className="text-base font-bold text-violet-800 dark:text-violet-300">{name}</h3>
            <p className={P}>{why} <a className="ui-link" href={`#${link}`}>More detail</a></p>
            <div className="overflow-x-auto mt-1" tabIndex={0} role="region" aria-label={name}>
              <table className="w-full text-sm" style={{ minWidth: 560 }}>
                <thead><tr><th scope="col" className={TH}>Element</th><th scope="col" className={TH}>What it means</th></tr></thead>
                <tbody>{items.map(([e, m]) => <tr key={e}><td className={`${TD} font-semibold text-gray-900 dark:text-white w-1/4`}>{e}</td><td className={TD}>{m}</td></tr>)}</tbody>
              </table>
            </div>
          </section>
        ))}
      </div>
    </details>
  );
}
