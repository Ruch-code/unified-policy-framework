// AI risk register: ten common AI risks with controls, owners and ratings. Edit freely.
// Ratings are illustrative; calibrate them to your own organisation, system and risk appetite.

export const ARR_INTRO = 'An AI risk register records who is accountable for each AI risk, how it is treated, and the evidence that the treatment works, across design, deployment, use and monitoring. It draws on ISO/IEC 42001 (AI management system), ISO/IEC 23894 (AI risk management), ISO/IEC 42005 (AI system impact assessment), the NIST AI Risk Management Framework and the OWASP Top 10 for LLM and generative AI applications.';
export const ARR_LIFECYCLE = ['Govern', 'Identify', 'Assess', 'Treat', 'Monitor', 'Review'];

// [id, risk, what can go wrong, key controls, owner, inherent, residual, response]
export const ARR_RISKS = [
  ['AI-R01', 'Harm to people and unfair outcomes', 'Decisions or outputs disadvantage individuals or groups, for example a screening model that rejects one group more often.', 'Impact assessment before release; bias and subgroup performance testing', 'AI governance', 'High', 'Medium', 'Mitigate'],
  ['AI-R02', 'Prompt and context injection', 'Instructions hidden in user input, documents or web pages make the model ignore its rules or leak data.', 'Clear trust boundaries between instructions and data; validation of inputs and tool calls', 'AI security', 'Critical', 'Medium', 'Mitigate'],
  ['AI-R03', 'Sensitive information exposure', 'The model reveals personal data, secrets or confidential content from training data, context or other users.', 'Data minimisation in prompts and training; filtering of outputs', 'Privacy', 'High', 'Low', 'Mitigate'],
  ['AI-R04', 'Excessive agency and tool misuse', 'An agent takes actions beyond what was intended, such as sending emails, changing records or spending money.', 'Least privilege for tools and credentials; human approval for high-impact actions', 'AI product', 'Critical', 'Medium', 'Mitigate'],
  ['AI-R05', 'Data, model and memory poisoning', 'Tampered training data, fine-tuning data or stored memory changes model behaviour.', 'Provenance checks on data and models; integrity validation before use', 'ML engineering', 'High', 'Medium', 'Mitigate'],
  ['AI-R06', 'AI supply chain compromise', 'A third-party model, library, dataset or AI vendor is vulnerable or malicious.', 'Inventory of AI components (AI bill of materials); vendor assurance reviews', 'Third-party risk', 'High', 'Medium', 'Mitigate'],
  ['AI-R07', 'Vector and embedding weaknesses', 'Retrieval returns content the user should not see, or poisoned documents enter the knowledge base.', 'Isolation of retrieval by tenant and permission; access control on the vector store', 'AI security', 'High', 'Medium', 'Mitigate'],
  ['AI-R08', 'Misinformation and decision error', 'Confident but wrong answers are relied on for decisions.', 'Evaluation against grounded reference answers; human verification for material decisions', 'Model risk', 'High', 'Medium', 'Mitigate'],
  ['AI-R09', 'Unbounded consumption', 'Uncontrolled usage drives cost spikes or service outages, including deliberate abuse.', 'Usage and rate limits; cost and rate monitoring with alerts', 'AI platform', 'Medium', 'Low', 'Mitigate'],
  ['AI-R10', 'Improper output handling', 'Model output is passed to other systems without checks, enabling code execution or injection downstream.', 'Validation and encoding of output; safe execution of anything downstream', 'Application security', 'High', 'Low', 'Mitigate'],
];

// What every register entry should record.
export const ARR_FIELDS = [
  'Risk ID and AI system', 'Use case and lifecycle stage', 'Risk event and cause', 'Affected stakeholders', 'Risk owner',
  'Inherent rating', 'Controls and evidence', 'Residual rating', 'Treatment decision', 'Due date and status',
  'Review frequency', 'Regulatory and framework mapping', 'Who can accept the risk', 'Linked incidents and changes',
];

// Rating matrix: impact rows (high to low) by likelihood columns (rare to almost certain).
export const ARR_LIKELIHOOD = ['Rare (1)', 'Unlikely (2)', 'Possible (3)', 'Likely (4)', 'Almost certain (5)'];
export const ARR_MATRIX = [
  ['Severe (5)', ['Medium', 'High', 'High', 'Critical', 'Critical']],
  ['Major (4)', ['Medium', 'Medium', 'High', 'High', 'Critical']],
  ['Moderate (3)', ['Low', 'Medium', 'Medium', 'High', 'High']],
  ['Minor (2)', ['Low', 'Low', 'Medium', 'Medium', 'High']],
  ['Negligible (1)', ['Low', 'Low', 'Low', 'Medium', 'Medium']],
];

// [step, what happens]
export const ARR_WORKFLOW = [
  ['Capture', 'Record the risk when a new AI use case, model, vendor or major change is proposed.'],
  ['Analyse', 'Describe the cause and impact, the people affected, and rate inherent likelihood and impact.'],
  ['Decide', 'Choose the response: mitigate, avoid, transfer or accept, with a named owner.'],
  ['Control', 'Implement the controls and link the evidence that they operate.'],
  ['Verify', 'Test that controls work, rate residual risk, and have it accepted by someone with the authority to do so.'],
  ['Reassess', 'Review on the set schedule and after incidents, model updates or changes in use.'],
];

// Questions to ask when checking the register.
export const ARR_ASSURANCE = [
  'Is the impact assessment current?',
  'Is human oversight defined for each system?',
  'Can models, data and tools be traced to their source?',
  'Do AI systems and agents have least-privilege permissions?',
  'Are evaluations and test results evidenced?',
  'Has red teaming been done where the risk warrants it?',
  'Are AI incidents linked to the risks they relate to?',
  'Has residual risk been formally accepted?',
  'Are legal and contractual obligations mapped?',
  'Are material changes triggering reassessment?',
];

export const ARR_NOTE = 'Ratings shown are illustrative. Calibrate likelihood and impact to your organisation, the AI system and its context of use.';
