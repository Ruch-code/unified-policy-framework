// AI vendor risk assessment additions and AI agent frameworks.
// Built from practitioner material on AI third-party risk, written in our own words.

export const AI_POSITION = {
  title: 'Enterprise position for regulated organisations',
  text: 'For organisations with a low appetite for anything that can affect production, legal or regulatory outcomes: a controlled pilot may be approved with conditions and safeguards, but production approval stays withheld until use-case-specific assurance (testing, contract terms and monitoring for that exact deployment) is complete and signed off by the accountable owner.',
  conditions: ['Pilot limited to named users, synthetic or low-risk data, and read or recommend actions only', 'No customer-facing output without human review', 'Contract or pilot terms ban training on your data and name all subprocessors', 'Logging of prompts, outputs and actions from day one', 'Exit criteria and a date to decide go, extend or stop'],
};

export const AI_SUPPLY_CHAIN = {
  intro: 'You buy one AI product but inherit a chain of models, data, connectors, tools and subprocessors. The unit of risk is the use case plus its dependencies, not the vendor logo.',
  columns: ['Layer', 'What sits there', 'Question to answer'],
  rows: [
    ['Use case (business)', 'The decision or task the AI supports', 'Who is affected if it is wrong?'],
    ['Application (SaaS vendor)', 'The product your users log in to', 'Who stores prompts and outputs, and for how long?'],
    ['Model provider', 'Foundation model, version, any fine-tuning', 'Who can change the model, and do you get notice?'],
    ['Data and retrieval (RAG)', 'Your documents pulled into prompts', 'Who can see retrieved content and outputs?'],
    ['Tools, APIs and agents', 'Systems the AI can read from or act on', 'What can it do without a human?'],
    ['Hosting and subprocessors', 'Cloud regions, logging, support access', 'Where does the data go, and who else touches it?'],
  ],
  test: 'Practitioner test: for one live AI feature, name who stores prompts, who hosts the model, who can change it, who receives outputs and who can act. If any answer is "the vendor", you have found a fourth party to assess.',
};

export const AI_BLIND_SPOTS = {
  columns: ['Blind spot', 'What happens', 'Trigger to watch'],
  rows: [
    ['Undeclared AI', 'AI is switched on inside a product you already licensed; staff enable it without review', 'New AI feature in release notes or the admin console'],
    ['Fourth-party opacity', 'The vendor relies on model and infrastructure providers you never assessed', 'Subprocessor list or model provider changes'],
    ['Permission expansion', 'An assistant moves from reading documents to sending messages or changing systems', 'New connector, scope or OAuth grant'],
    ['Model change', 'An update changes behaviour, accuracy, data handling or safety controls', 'Model or version release notice'],
    ['Evidence gap', 'A policy exists, but nobody tested this use case', 'Approval without test results on file'],
  ],
};

export const AI_TPRM_COMPARE = {
  columns: ['Dimension', 'Traditional TPRM', 'AI TPRM'],
  rows: [
    ['Unit of assessment', 'The supplier', 'The supplier plus each deployed use case'],
    ['Assurance basis', 'Security certification (ISO 27001, SOC 2)', 'Certification plus task-specific accuracy, fairness, safety and autonomy tests'],
    ['Cadence', 'Onboarding and annual review', 'Also change-triggered: model, data, tool or permission change'],
    ['Data lens', 'Is regulated personal data protected?', 'Also: can outputs influence people even without personal data?'],
    ['Evidence', 'Organisational documents', 'Documents plus technical validation results'],
  ],
  note: 'A security audit on its own does not show that outputs are accurate, fair, safe or appropriately autonomous.',
};

export const AI_GATES = {
  columns: ['Gate', 'Purpose', 'Artefact it produces'],
  rows: [
    ['1. Discover', 'Find AI use cases and AI-enabled vendors', 'AI use-case and vendor inventory'],
    ['2. Map', 'Trace models, data, tools and subprocessors', 'Dependency and data-flow map'],
    ['3. Classify', 'Set the risk tier for the deployment', 'Risk tier with go, conditional or no-go criteria'],
    ['4. Assure', 'Test the use case, not just the vendor', 'Use-case test results'],
    ['5. Contract', 'Lock in AI-specific terms', 'AI clauses and exit rights'],
    ['6. Monitor', 'Watch for drift and change', 'Signals, KPIs and change log'],
    ['7. Respond', 'Handle AI incidents', 'AI incident playbook'],
    ['8. Exit', 'Leave cleanly', 'Tested exit and data deletion proof'],
  ],
  note: 'It is a cycle: a material model, data, tool or permission change sends the use case back to Gate 2.',
};

export const AI_TIERING = {
  prompts: [['Impact', 'Harm to people, finances, rights or safety'], ['Data', 'Sensitivity, retention, geography'], ['Autonomy', 'Read, recommend, decide or act'], ['Reach', 'Scale, frequency, external exposure'], ['Dependency', 'Criticality and fourth parties']],
  columns: ['Tier', 'Example deployments', 'Minimum before production'],
  rows: [
    ['Tier 3: Critical', 'Health triage, hiring, financial transfers, protected data, independent actions in production systems', 'Executive approval, independent testing, human control at the action boundary'],
    ['Tier 2: Elevated', 'Internal decision support affecting customers or staff, with human review', 'Use-case tests, contract clauses, change-triggered review'],
    ['Tier 1: Standard', 'Public marketing copy with human review', 'Approved-tool register, acceptable-use rules, light monitoring'],
  ],
  note: 'These are decision prompts, not a validated scoring model. Residual risk needs evidence and an accountable owner.',
};

export const AI_EVIDENCE = {
  columns: ['Domain', 'Promise you will hear', 'Proof to request'],
  rows: [
    ['Architecture', '"We use leading models"', 'Provider and model list, data flows, tool and connector diagram'],
    ['Data rights', '"Your data is safe"', 'Training use, retention, residency, deletion, subprocessing terms'],
    ['Testing', '"Our AI is accurate"', 'Task-specific accuracy, bias, misuse, prompt injection and red-team results'],
    ['Oversight', '"Humans stay in the loop"', 'Human review points, approvals, tamper-evident action logs'],
    ['Change control', '"We continuously improve"', 'Model release notices, version tracking, revalidation triggers'],
    ['Recovery', '"We are highly available"', 'Kill switch, incident SLA, fallback, export and exit plan'],
  ],
  note: 'Tie every statement to a named model and version, a named deployment, dates and thresholds, with independent validation where the risk warrants it.',
};

export const AI_CLAUSES = {
  columns: ['Clause', 'What to negotiate'],
  rows: [
    ['Purpose and data use', 'Permitted purposes, data-use limits, no training on customer data without approval'],
    ['Subproviders and change', 'Named subproviders, change notices, approval or objection rights where feasible'],
    ['Testing and audit', 'Minimum testing criteria, audit rights, incident notification obligations'],
    ['Human control', 'Human control points, prohibited actions, logging and access restrictions'],
    ['Exit and recovery', 'Termination, data return or deletion, transition support, recovery provisions'],
  ],
  note: 'Scale these by risk tier, jurisdiction and service criticality. Not every law requires every clause.',
};

export const AI_RACI = {
  columns: ['Activity', 'Business owner', 'Procurement / TPRM', 'AI / Technology', 'Cyber / Privacy / Legal', 'Risk / Compliance', 'Executive authority'],
  rows: [
    ['Accept use-case impact and residual risk', 'A', 'C', 'C', 'C', 'C', 'I'],
    ['Supplier due diligence and contract workflow', 'C', 'R', 'C', 'C', 'I', ''],
    ['Architecture, validation and monitoring', 'I', 'I', 'R', 'C', 'I', ''],
    ['Subject-matter control requirements', 'I', 'C', 'C', 'R', 'C', ''],
    ['Challenge, aggregate exposure, escalate', 'I', 'I', 'I', 'C', 'R', 'I'],
    ['Approve high residual risk within delegation of authority', 'R', 'I', 'I', 'C', 'C', 'A'],
  ],
  note: 'Illustrative. A = accountable (one name only), R = responsible, C = consulted, I = informed. Align to your delegation of authority.',
};

export const AI_LADDER = {
  rule: 'Never make the model the sole approver of its own privileges. Enforce tool permissions outside prompt instructions, in systems of record and your authority matrix.',
  columns: ['Level', 'What the agent can do', 'Control'],
  rows: [
    ['Read', 'Search approved files', 'Least-privilege access'],
    ['Recommend', 'Suggest decisions', 'Source checks and confidence limits'],
    ['Draft', 'Create reversible actions', 'Human review and version logs'],
    ['Act', 'Send, update, purchase', 'Bounded tool scopes and confirmations'],
    ['Critical act', 'Pay, delete, change access', 'Independent authorisation; prohibit when unsafe'],
  ],
};

export const AI_REDTEAM = {
  columns: ['Test', 'What it checks'],
  rows: [
    ['Indirect prompt injection', 'Hidden instructions inside a supplier email or retrieved document'],
    ['Tool-access abuse', 'Whether the agent can perform operations outside its approved scope'],
    ['Data exfiltration', 'Leakage through connected email, browser, search or an external URL'],
    ['Memory or context poisoning', 'Poisoned context that persists and changes future decisions'],
    ['Rollback and reconstruction', 'Whether security can disable the agent and reconstruct every action'],
  ],
  note: 'These are test categories for vendor assurance, not attack instructions. Permission and logging enforcement must be technical, not prompt-based. Reference: OWASP Top 10 for LLM Applications 2025 (LLM06 Excessive Agency).',
};

export const AI_PLAN = {
  columns: ['Window', 'Focus', 'Actions'],
  rows: [
    ['First 30 days', 'Discover', 'Inventory AI-enabled vendors and use cases; appoint one accountable owner per use case; publish a prohibited-actions list'],
    ['Days 31 to 60', 'Assure', 'Tier critical deployments; demand core evidence and run use-case tests; amend the highest-risk contracts'],
    ['Days 61 to 90', 'Operate', 'Switch on monitoring and change gates; adopt the AI incident playbook; start board reporting and run one exit test'],
  ],
  monday: 'One action for Monday: pick the single highest-impact AI use case and name its accountable owner.',
};

export const AI_CASE_AIR_CANADA = {
  title: 'Case: Moffatt v. Air Canada (2024)',
  role: 'Own deployed chatbot. Air Canada was the deployer.',
  happened: 'The airline\'s website chatbot gave a customer incorrect information about bereavement fares. British Columbia\'s Civil Resolution Tribunal held Air Canada responsible for the misleading information on its website and rejected the argument that the chatbot was a separate entity responsible for its own actions (2024 BCCRT 149).',
  proves: 'Deploying an AI interface does not move customer-facing responsibility to the system or the vendor. The decision did not establish the model architecture or vendor involvement.',
  controls: ['Test policy answers against authoritative sources before go-live and after changes', 'Audit exceptions and wrong answers', 'Provide a clear human escalation path', 'Track and close corrections, and update the source content'],
};

export const AI_STATS = [
  ['Third-party involvement in breaches doubled from 15% to 30% between the 2024 and 2025 editions', 'Verizon Data Breach Investigations Report 2025'],
  ['Over 40% of agentic AI projects predicted to be cancelled by end of 2027, partly due to inadequate risk controls', 'Gartner, June 2025'],
  ['15% of day-to-day work decisions predicted to be made autonomously by agentic AI by 2028, up from 0% in 2024', 'Gartner, June 2025'],
];

// ---------- AI agent frameworks ----------
export const AGENT_FRAMEWORKS = {
  intro: 'Agent frameworks are developer libraries for connecting a language model to tools, data and other agents. They overlap, but each has a main emphasis. The flows below are simplified, not exact architectures or a ranking.',
  columns: ['Framework', 'Main emphasis', 'Typical flow', 'Example task', 'GRC questions'],
  rows: [
    ['LangChain (and LangGraph)', 'Chaining a model with tools, memory and data stores into multi-step workflows', 'Prompt, agent, model, tools or retrievers (vector store), result', 'A support bot that looks up an order, checks the refund policy and drafts a reply', 'Which tools can it call? Are tool permissions enforced outside the prompt? Are runs traced and logged?'],
    ['AutoGen (Microsoft)', 'Several agents in a conversation, with optional human-in-the-loop and code execution', 'User query, agents converse, human can approve, code or tool executors run', 'One agent writes analysis code, another reviews it, a human approves before it runs', 'Is code execution sandboxed? Where does a human approve? Can agents loop or escalate privileges?'],
    ['CrewAI', 'Role-based agents (for example researcher, writer, editor) working on assigned tasks', 'Roles, process (sequential or hierarchical), model and tools, tasks completed', 'A writer agent drafts a policy and an editor agent checks it against a template', 'Is each role\'s access limited to its task? Who owns the final output?'],
    ['LlamaIndex', 'Connecting models to your documents and data (retrieval-augmented generation)', 'Load and parse documents, index into a vector store, retrieve relevant chunks, model answers', 'Answering questions over internal policies and contracts', 'Does retrieval respect document permissions? Can poisoned documents inject instructions?'],
    ['Semantic Kernel (Microsoft)', 'Plugging application functions, prompts and APIs into an AI service inside enterprise apps (.NET, Python, Java)', 'Functions, templates, API specs become plugins, kernel calls the AI service, plugins run', 'A finance app where the model can call a "get invoice" function but not "pay invoice"', 'Which plugins are exposed? Are high-risk functions blocked or behind approval?'],
  ],
  choose: [['Tool use and workflows', 'LangChain or LangGraph, Semantic Kernel'], ['Several agents collaborating', 'AutoGen, CrewAI'], ['Questions over your documents', 'LlamaIndex (or LangChain retrievers)'], ['Adding AI to an existing enterprise app', 'Semantic Kernel']],
  naming: 'Infographics often misspell these. "AutogenAI" usually means AutoGen, and "Semantic Kernal" is Semantic Kernel.',
};
