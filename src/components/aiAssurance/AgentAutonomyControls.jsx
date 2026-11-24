// Classifying and controlling autonomous AI agents by what they can do, not by which model they use.
// Ideas paraphrased from "The Autonomous AI Agent Control Book" (Hernan Huwyler). OneLens summary, not a copy.
const P = 'text-sm leading-relaxed text-gray-700 dark:text-gray-300';
const H = 'mt-5 mb-1 text-base font-semibold text-gray-900 dark:text-white';
const TH = 'p-2 text-left font-semibold text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-900';
const TD = 'p-2 align-top border-t border-gray-100 dark:border-gray-700 text-gray-700 dark:text-gray-300';

function Table({ head, rows }) {
  return (
    <div className="overflow-x-auto my-2" tabIndex={0} role="region" aria-label={head.join(', ')}>
      <table className="w-full text-sm" style={{ minWidth: head.length > 2 ? 760 : 560 }}>
        <thead><tr>{head.map((h) => <th key={h} scope="col" className={TH}>{h}</th>)}</tr></thead>
        <tbody>{rows.map((r) => <tr key={r[0]}>{r.map((c, j) => <td key={j} className={`${TD} ${j === 0 ? 'font-medium' : ''}`}>{c}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}

export default function AgentAutonomyControls() {
  return (
    <details className="my-6 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5" id="agent-autonomy-controls">
      <summary className="cursor-pointer text-lg font-bold text-gray-900 dark:text-white">Controlling autonomous agents: autonomy levels, ownership, authority, testing and cost</summary>
      <div className="mt-3">
        <p className={P}>The model is not the agent. Risk comes from what the agent is allowed to do: the tools, permissions and approvals around it. So classify each <strong>material business action</strong> the agent can take, not the application as a whole. A typical trigger: a finance assistant that used to draft payment suggestions is given the ability to pay, and the clerk who used to check its work turns out to have been an undocumented control.</p>

        <h3 className={H}>Autonomy levels and the primary control at each</h3>
        <Table head={['Level', 'What the agent does', 'Primary control']} rows={[
          ['1. Suggest', 'Retrieves and recommends; a person acts.', 'Authorised retrieval and source provenance, so people are not misled by what it read.'],
          ['2. Act with approval', 'Prepares an action that a person approves.', 'Meaningful oversight: the approver sees enough context and has time and authority to say no. Avoid approval theater, where clicks are rubber stamps.'],
          ['3. Act alone', 'Starts and completes actions without approval.', 'Limits enforced in code (amounts, rates, scopes), circuit breakers, and a human gate before irreversible, high-consequence actions.'],
        ]} />

        <h3 className={H}>Classification card: seven questions per action</h3>
        <Table head={['Question', 'What it decides']} rows={[
          ['1. Do people rely on the output to make decisions?', 'Level'],
          ['2. Can the agent start a change in a system?', 'Level'],
          ['3. Can it complete that change without approval?', 'Level'],
          ['4. Does it have its own identity and revocable credentials?', 'Modifier'],
          ['5. Can the action be reversed?', 'Modifier'],
          ['6. What is the largest loss per action and per day?', 'Modifier'],
          ['7. Does it affect regulated outcomes or personal data?', 'Modifier'],
        ]} />
        <p className={P}>The card records the action, level, modifiers, an accountable owner, a tested revocation path, and reassessment triggers: a new tool, permission, model, data source or approval rule.</p>

        <h3 className={H}>Control pointers</h3>
        <Table head={['Area', 'What good looks like']} rows={[
          ['Ownership', 'Every agent in the inventory has a named business owner. Agents nobody owns are found through identity, API key and cloud reviews and either adopted or switched off.'],
          ['Agent identity', 'The agent has its own non-human identity, not a borrowed user account, so its actions are attributable and it can be revoked without locking out a person.'],
          ['Revocation test', 'Disabling the agent is tested, timed and evidenced, not just documented.'],
          ['Tool-call authority', 'Each tool call spends authority: scope tools narrowly, set per-call and per-day limits, and log every call with the instruction behind it.'],
          ['Attack path first', 'Map how injected content, a compromised tool or a poisoned data source could reach a high-impact action before deployment, and put controls on that path.'],
          ['Failure clock', 'Detection and response time is measured from the first failure, so monitoring and kill switches must act faster than the agent can repeat the error.'],
          ['Repeated-run testing', 'Agents are probabilistic; one passing test proves little. Run the same scenario many times and set a pass rate, including adversarial and injection cases.'],
          ['Evidence that lasts', 'Keep versioned records of model, prompt, tools, configuration and test results so evidence still holds after the model is updated.'],
          ['Cost governance', 'Usage costs have a named owner, budgets and alerts, and runaway loops trip a spending circuit breaker.'],
          ['Sustained controls', 'Controls are documented and owned so they survive when the people who built the agent move on.'],
        ]} />
        <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">Source: ideas summarised from Hernan Huwyler, The Autonomous AI Agent Control Book. Paraphrased; check the book for full detail and its ISO/IEC 27090 and EN 18286 commentary.</p>
      </div>
    </details>
  );
}
