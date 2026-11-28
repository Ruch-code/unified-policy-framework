// Harness engineering: the layers built around a model so AI agents can work safely across the SDLC.
const P = 'text-sm leading-relaxed text-gray-700 dark:text-gray-300';
const H = 'mt-5 mb-1 text-base font-semibold text-gray-900 dark:text-white';
const TH = 'p-2 text-left font-semibold text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-900 align-bottom';
const TD = 'p-2 align-top border-t border-gray-100 dark:border-gray-700 text-gray-700 dark:text-gray-300';

const LAYERS = [
  ['1. Model (core)', 'Reasoning and generation', 'Approved model list, version pinning, provider due diligence, data use and retention terms', 'Model register, vendor assessment, contract terms'],
  ['2. Context', 'Service catalogue, ownership, documentation and agent instruction files (such as AGENTS.md) that tell the agent how the codebase and team work', 'Only approved, current sources; no secrets or customer data in context files; owners for each source; protection against poisoned or injected content', 'Context source inventory, review history of instruction files, secret scanning results'],
  ['3. Tools', 'MCP servers, actions and APIs the agent can call (chat, code repos, tickets, CI/CD, clusters, monitoring)', 'Allow-list of tools, each tool scoped to the minimum actions, rate limits, logging of every call with its input', 'Tool register with scopes, tool-call logs'],
  ['4. Permissions', 'Role-based access, scoped short-lived tokens and approvals', 'Agent has its own non-human identity, least privilege, no shared or personal tokens, approval for write or production actions, revocation tested', 'Identity and token inventory, access review, approval records, revocation test'],
  ['5. Guardrails', 'Policies, scorecards and human gates', 'Policy as code (for example no direct pushes to main, required reviews, blocked commands), quality and security scorecards, human sign-off before irreversible or high-impact steps', 'Policy configuration, scorecard results, gate approvals'],
  ['6. Observe and evaluate (outer)', 'Traces, evaluations, cost and feedback', 'Full traces of prompts, tool calls and outputs; repeated evaluation runs with pass thresholds; cost budgets and alerts; user feedback loop into fixes', 'Trace retention, evaluation reports, cost dashboards, feedback tickets'],
];

export default function AgentHarnessLayers() {
  return (
    <details className="my-6 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5" id="agent-harness-layers">
      <summary className="cursor-pointer text-lg font-bold text-gray-900 dark:text-white">Harness engineering: the layers around an AI coding agent</summary>
      <div className="mt-3">
        <p className={P}>The model on its own only reasons and generates. What makes an agent safe and useful in engineering is the harness around it: the context it reads, the tools it can call, the permissions it holds, the guardrails that stop it, and the observation that shows what it did. An agentic engineering platform orchestrates agents, workflows and context across the SDLC by stacking these layers, with each outer layer constraining the ones inside it.</p>

        <h3 className={H}>The six layers, from the inside out</h3>
        <div className="overflow-x-auto my-2" tabIndex={0} role="region" aria-label="Agent harness layers">
          <table className="w-full text-sm" style={{ minWidth: 980 }}>
            <thead><tr>{['Layer', 'What it is', 'GRC controls', 'Evidence'].map((h) => <th key={h} scope="col" className={TH}>{h}</th>)}</tr></thead>
            <tbody>{LAYERS.map((r) => <tr key={r[0]}>{r.map((c, j) => <td key={j} className={`${TD} ${j === 0 ? 'font-semibold text-gray-900 dark:text-white' : ''}`}>{c}</td>)}</tr>)}</tbody>
          </table>
        </div>

        <h3 className={H}>Reference architecture: the path of an agent request</h3>
        <ol className="space-y-2 my-2" aria-label="Agent security request flow">
          {[
            ['User', 'Connects the agent to their accounts.', false],
            ['Identity and consent gateway', 'The user approves the exact systems and scopes. MFA to connect, step-up MFA for sensitive actions.', false],
            ['Input guard', 'Emails, web pages, PDFs and tickets are untrusted content: treated as data, never as commands.', true],
            ['AI agent', 'Runs with its own identity, least privilege per task, and short-lived, revocable tokens.', false],
            ['Policy and approval gateway', 'Enforces scopes on every tool call and sends irreversible actions to a human approver, who confirms or denies.', false],
            ['Approved MCP servers and tools', 'Allow-listed, version pinned and reviewed; nothing installed outside the registry.', false],
            ['Business systems', 'Email, payments, CRM and data stores, reached only through the approved path.', false],
          ].map(([t, d, untrusted], i) => (
            <li key={t} className={`rounded-lg border p-3 text-sm ${untrusted ? 'border-orange-400 dark:border-orange-600 bg-orange-50 dark:bg-orange-900/20' : 'border-teal-300 dark:border-teal-700'}`}>
              <span className="font-semibold text-gray-900 dark:text-white">{i + 1}. {t}{untrusted ? ' (untrusted input)' : ''}</span>
              <span className="block text-gray-700 dark:text-gray-300">{d}</span>
            </li>
          ))}
        </ol>
        <p className={P}><strong>Audit log and monitoring across every step:</strong> each consent, tool call, approval and decision is logged, alerted on and reviewed, so you can reconstruct what the agent did and on whose authority.</p>

        <h3 className={H}>Why the order matters</h3>
        <ul className={`list-disc pl-5 space-y-1 ${P}`}>
          <li>Inner layers decide what the agent can do; outer layers decide what it is allowed to do and prove what it did.</li>
          <li>A gap in an inner layer, such as an over-scoped tool or a token with admin rights, cannot be fully fixed by guardrails alone.</li>
          <li>Observation is the evidence layer: without traces and evaluations there is nothing to show an auditor or to investigate after an incident.</li>
        </ul>

        <h3 className={H}>Questions to ask when reviewing an agent setup</h3>
        <ul className={`list-disc pl-5 space-y-1 ${P}`}>
          <li>Which models are approved, and who decides when one changes?</li>
          <li>What context files and sources does the agent read, who owns them, and could untrusted content reach them?</li>
          <li>Which tools can it call, with which scopes, and are calls logged?</li>
          <li>Does it have its own identity, and can it act in production without a human approval?</li>
          <li>Which policies are enforced in code, and where are the human gates?</li>
          <li>Can you replay what the agent did last week, what it cost, and how often it passes evaluations?</li>
        </ul>

        <h3 className={H}>Interview line</h3>
        <p className={P}>&quot;I treat the model as one layer. I review the harness around it from the inside out: trusted context, scoped tools, a separate agent identity with least privilege, guardrails and human gates for high-impact actions, and full traces, evaluations and cost tracking so we can prove what the agent did.&quot;</p>
      </div>
    </details>
  );
}
