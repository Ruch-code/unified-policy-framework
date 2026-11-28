// Eight Responsible AI frameworks and tools at a glance: what each is, how it is built, and when to use it.
const CARDS = [
  ['NIST AI RMF', 'Voluntary framework (NIST, US)', 'Four functions: Govern sits across everything, with Map (context and risks), Measure (test and track) and Manage (prioritise and act) around it.', 'A shared risk language across technology, risk and the business.', 'AI RMF 1.0 published January 2023; Generative AI Profile NIST AI 600-1 published July 2024.'],
  ['EU AI Act', 'Law: Regulation (EU) 2024/1689', 'Risk tiers: unacceptable (banned), high risk (strict duties), limited risk (transparency) and minimal risk (no new duties). Applies to providers and deployers.', 'Classifying every AI use case before you build or buy it.', 'The Digital Omnibus moved high-risk dates to 2 December 2027 (Annex III) and 2 August 2028 (AI in regulated products).'],
  ['ISO/IEC 42001', 'Certifiable standard (ISO/IEC)', 'An AI management system (AIMS) run as Plan-Do-Check-Act through clauses 4 to 10, with 38 Annex A controls.', 'Proving AI governance to clients, auditors and regulators.', 'Published December 2023; the first international AI management system standard.'],
  ['OWASP Top 10 for LLM Applications', 'Security list (OWASP)', 'The ten biggest security risks in LLM apps, from prompt injection (LLM01) to unbounded consumption (LLM10).', 'Threat-modelling every LLM app and agent before launch.', '2025 edition added System Prompt Leakage and Vector and Embedding Weaknesses.'],
  ['Model cards', 'Documentation practice (Mitchell et al.)', 'A short fact sheet for each model: details, intended use, factors, metrics, evaluation and training data, analyses, ethical considerations, caveats.', 'Telling users, auditors and regulators what a model is for and what it is not for.', 'Proposed in 2019 with nine standard sections.'],
  ['AI impact assessment', 'Guidance: ISO/IEC 42005:2025', 'Describe the system and context, identify affected people, assess benefits and harms, mitigate and decide, document, then monitor and re-assess on change.', 'High-stakes uses such as hiring, lending, health and public services.', 'The EU AI Act also requires a fundamental rights impact assessment from some deployers.'],
  ['Three Lines Model', 'Operating model (IIA)', 'Management (first line builds AI products; second line covers AI risk, compliance and privacy), internal audit (third line) gives independent assurance, and the governing body oversees.', 'Splitting AI ownership, oversight and assurance cleanly.', 'IIA updated the older three lines of defence model in July 2020.'],
  ['OECD AI Principles', 'Principles (OECD)', 'Five values: inclusive growth and well-being; human rights, fairness and privacy; transparency and explainability; robustness, security and safety; accountability.', 'Anchoring your AI policy, controls and board reporting in an international reference.', 'Adopted 2019, updated May 2024; the basis for the G20 AI Principles.'],
];

export default function AiFrameworksAtAGlance() {
  return (
    <details className="my-6 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5" id="ai-frameworks-glance">
      <summary className="cursor-pointer text-lg font-bold text-gray-900 dark:text-white">Responsible AI frameworks at a glance: what each is and when to use it</summary>
      <div className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {CARDS.map(([name, type, what, use, fact]) => (
          <div key={name} className="rounded-xl border border-violet-200 dark:border-violet-800 p-3 text-sm">
            <p className="font-bold text-violet-800 dark:text-violet-300">{name}</p>
            <p className="text-[11px] uppercase tracking-wide text-gray-500 dark:text-gray-400">{type}</p>
            <p className="mt-2 text-gray-700 dark:text-gray-300">{what}</p>
            <p className="mt-2 text-gray-700 dark:text-gray-300"><strong>Use it for:</strong> {use}</p>
            <p className="mt-1 text-gray-700 dark:text-gray-300"><strong>Key fact:</strong> {fact}</p>
          </div>
        ))}
      </div>
    </details>
  );
}
