import FlowDiagram from '../crypto/FlowDiagram.jsx';

// From LLM workflow to agentic AI: how each architecture works, a use case, and the security, privacy and
// regulatory risks tied to each component. Article numbers refer to GDPR and the EU AI Act.
const CARD = 'rounded-2xl border border-surface-300 dark:border-surface-dark-300 bg-white dark:bg-slate-900/60 p-6 md:p-8';
const P = 'text-sm text-gray-700 dark:text-text-dark-secondary';
const H = 'mt-4 mb-1 font-semibold text-gray-900 dark:text-text-dark-primary';
const TH = 'p-2 text-left font-semibold text-gray-900 dark:text-text-dark-primary bg-surface-50 dark:bg-slate-800 align-top';
const TD = 'p-2 align-top border-t border-surface-200 dark:border-surface-dark-200 text-gray-700 dark:text-text-dark-secondary';

const STAGES = [
  {
    id: 'workflow', title: '1. LLM workflow', who: 'Rules decide',
    flow: [{ label: 'User prompt' }, { label: 'Rules-based trigger', note: 'Step 1, 2, 3' }, { label: 'LLM', note: 'Uses tools and data sources' }, { label: 'Output', tone: 'safe' }],
    explain: 'The path is hard-coded. The LLM is one step in a fixed pipeline: good at language, but it does not choose what happens next. Tools and data sources can already be involved, but the rules decide when they are used, not the model.',
    useCase: 'Every new vendor security questionnaire is fetched from the data source, summarised by the LLM, and the summary is saved to the tracker.',
    risks: [
      ['Prompt', 'Users paste personal or confidential data, and it goes to the model provider.', 'Acceptable use policy, input filtering, approved model providers only'],
      ['Data sources to LLM', 'The rule sends whole records when the task needs one field.', 'Send only required fields (GDPR Art. 5(1)(c) data minimisation)'],
      ['Tools', 'Tool credentials sit in the workflow, so a leaked config leaks access.', 'Secrets manager, scoped service accounts, rotation'],
      ['Output', 'If the output feeds a decision about a person, automated decision rules can apply.', 'Human review of decisions (GDPR Art. 22)'],
    ],
    reg: 'EU AI Act: the risk level depends on the use, not how simple the system is. Transparency duties apply if people interact with it.',
  },
  {
    id: 'rag', title: '2. Retrieval augmented generation (RAG)', who: 'Rules decide, answer grounded in your data',
    flow: [{ label: 'User prompt' }, { label: 'Data sources', note: 'Turned into embeddings' }, { label: 'Vector database', tone: 'risk' }, { label: 'Augmented prompt', note: 'Retrieved chunks plus tools' }, { label: 'Output', tone: 'safe' }],
    explain: 'Before answering, the system searches your own documents. The question is matched against stored embeddings, and the best chunks are added to the prompt. That is the augmented part, so the answer is grounded in current company data, not only training data. New compared with the workflow: a knowledge layer. Still no real decision-making.',
    useCase: 'A policy and controls assistant: "Which ISO 27001 control covers supplier agreements and what evidence do auditors want?"',
    risks: [
      ['Data sources to embedding', 'Whatever you index becomes searchable. Index HR or customer files and anyone can query them.', 'Approve sources before indexing; classify data first'],
      ['Vector database', 'Main leakage point. Document permissions are often lost when files are chunked, and embeddings can partly reveal the original text.', 'Check the user\'s access rights at retrieval; encrypt the database; restrict access like any sensitive store'],
      ['Retrieval', 'Poisoned or tampered documents carry hidden instructions (indirect prompt injection) or false facts.', 'Source integrity checks, change control on indexed content'],
      ['Augmented prompt', 'Retrieved personal data is sent to the LLM, often a third-party processor.', 'Processor agreement with the model vendor (GDPR Art. 28)'],
    ],
    reg: 'GDPR: record the vector database in the record of processing (Art. 30); a deletion request must remove data from the source and the vector database (Art. 17); security of processing (Art. 32). EU AI Act: for high-risk uses, data governance (Art. 10) covers the quality and relevance of the knowledge base.',
  },
  {
    id: 'agent', title: '3. AI agent', who: 'The model decides the steps and acts',
    flow: [{ label: 'User goal' }, { label: 'Planning and reasoning' }, { label: 'LLM', note: 'Uses memory, chat, database' }, { label: 'Tool calls', tone: 'risk' }, { label: 'Output or action' }],
    explain: 'The model is in charge of the steps. It plans, reasons, remembers context, decides which tool to call, checks the result and continues. You give it a goal, not a fixed script. New compared with RAG: planning, reasoning, memory and self-directed tool use, so it moves from answering to doing. Retrieval becomes one tool the agent chooses to use (often called agentic RAG).',
    useCase: 'A vendor review agent: "Check if Vendor X\'s SOC 2 is current." It plans the steps, pulls the report from the trust centre, reads the dates and exceptions, compares them with the tracker, and opens a ticket if something has expired.',
    risks: [
      ['Chat input', 'Prompt injection: a malicious instruction in an email or web page the agent reads can make it act.', 'Treat external content as data; input screening; restricted actions'],
      ['Planning and reasoning', 'Wrong reasoning now leads to wrong actions, not only wrong text.', 'Log reasoning steps for audit'],
      ['Tools', 'Unauthorised tool execution and excessive agency.', 'Least privilege, scoped tokens, tool allow-list, read-only by default, human approval for send, delete, pay or access changes'],
      ['Memory', 'Sensitive data from past sessions resurfaces later or to another user.', 'Retention limits, deletion, per-user isolation'],
      ['Database', 'The agent queries more than it needs.', 'Restrict queries to approved views'],
    ],
    reg: 'GDPR: Art. 22 if the agent makes significant decisions about people; Art. 5 purpose and storage limitation for memory; a DPIA under Art. 35 is very likely required. EU AI Act: logging (Art. 12), human oversight (Art. 14), robustness and cybersecurity including manipulation such as prompt injection (Art. 15).',
  },
  {
    id: 'agentic', title: '4. Agentic AI (multi-agent)', who: 'Several agents decide together, a human approves key actions',
    flow: [{ label: 'User prompt' }, { label: 'Agent 1: thinker', note: 'Chat, memory, reasoning' }, { label: 'Agent 2: doer', note: 'Tools, database', tone: 'risk' }, { label: 'Human in the loop', tone: 'safe' }, { label: 'Output' }],
    explain: 'Specialised agents work as a team and hand work back and forth. Agent 1 talks to the user, keeps context and plans. Agent 2 uses tools and the database to act. A human approves at the action stage. This is the highest autonomy and complexity, which is why the human checkpoint is added back in.',
    useCase: 'Audit readiness: Agent 1 understands "prepare our ISO 27001 surveillance pack", plans it and tracks progress. Agent 2 pulls evidence from cloud and HR systems and updates the tracker. A human approves before anything is sent to the auditor.',
    risks: [
      ['Agent to agent link', 'Agent-to-agent prompt injection, and privilege escalation by chaining: Agent 1 cannot touch the database but can ask Agent 2, which can.', 'Validate messages between agents; separate identity and permissions per agent'],
      ['Shared memory', 'Data one agent was allowed to see leaks into the shared context and is used elsewhere.', 'Context isolation and minimisation (GDPR Art. 25)'],
      ['Tools and database', 'The same execution risks as a single agent, multiplied and harder to trace.', 'End-to-end tracing across agents'],
      ['Human in the loop', 'Approval fatigue, or approvals on low-risk steps while high-risk ones skip them.', 'Define which actions must stop for a human; sample-check approvals'],
      ['Whole system', 'Cascading errors, runaway loops and cost, and difficulty explaining why it acted.', 'Rate limits, budgets, kill switch, trace logs'],
    ],
    reg: 'GDPR: accountability (Art. 5(2)) needs trace logs showing who processed what; data protection by design (Art. 25); the human step supports Art. 22 only if the review is genuine. EU AI Act: human oversight (Art. 14) means people can understand, override and stop the system; risk management (Art. 9) must cover how agents interact; logging (Art. 12) and robustness (Art. 15) apply. If built on a general-purpose model, the provider has its own duties and you carry the deployer duties.',
  },
];

export default function AiArchitectureRisks() {
  return (
    <details className={CARD} id="ai-architecture-risks">
      <summary className="cursor-pointer grc-section-title">From LLM workflow to agentic AI: risks by architecture</summary>
      <div className="mt-3">
        <p className={P}>Read the four architectures as a shift in who decides: rules, then rules grounded in your data, then the model, then several agents with a human approving. The risk moves with it, from data in prompts, to leakage from the vector database, to unauthorised tool actions, to trust between agents and real human oversight.</p>
        <div className="overflow-x-auto mt-3" tabIndex={0} role="region" aria-label="Architecture comparison">
          <table className="w-full text-sm min-w-[640px]">
            <thead><tr>{['Architecture', 'Who decides', 'New component', 'Main risk'].map((h) => <th key={h} scope="col" className={TH}>{h}</th>)}</tr></thead>
            <tbody>{[
              ['LLM workflow', 'Rules', 'LLM as one fixed step', 'Data sent in prompts'],
              ['RAG', 'Rules, grounded in your data', 'Embeddings and vector database', 'Leakage through retrieval'],
              ['AI agent', 'The model', 'Planning, memory, tool use', 'Unauthorised actions'],
              ['Agentic AI', 'Several agents plus a human', 'Agent-to-agent hand-offs', 'Trust between agents, weak oversight'],
            ].map((r) => <tr key={r[0]}>{r.map((c, j) => <td key={j} className={`${TD} ${j === 0 ? 'font-medium' : ''}`}>{c}</td>)}</tr>)}</tbody>
          </table>
        </div>

        {STAGES.map((s) => (
          <details key={s.id} id={`ai-arch-${s.id}`} className="mt-4 rounded-xl border border-surface-200 dark:border-surface-dark-200 p-4">
            <summary className="cursor-pointer font-semibold text-gray-900 dark:text-text-dark-primary">{s.title} <span className="font-normal text-gray-500 dark:text-text-dark-muted">({s.who})</span></summary>
            <FlowDiagram steps={s.flow} />
            <h4 className={H}>How it works</h4>
            <p className={P}>{s.explain}</p>
            <h4 className={H}>Use case</h4>
            <p className={P}>{s.useCase}</p>
            <h4 className={H}>Risks by component</h4>
            <div className="overflow-x-auto" tabIndex={0} role="region" aria-label={`${s.title} risks`}>
              <table className="w-full text-sm min-w-[700px]">
                <thead><tr>{['Component', 'Risk', 'Control'].map((h) => <th key={h} scope="col" className={TH}>{h}</th>)}</tr></thead>
                <tbody>{s.risks.map((r) => <tr key={r[0]}>{r.map((c, j) => <td key={j} className={`${TD} ${j === 0 ? 'font-medium whitespace-nowrap' : ''}`}>{c}</td>)}</tr>)}</tbody>
              </table>
            </div>
            <h4 className={H}>Regulatory angle</h4>
            <p className={P}>{s.reg}</p>
          </details>
        ))}
      </div>
    </details>
  );
}
