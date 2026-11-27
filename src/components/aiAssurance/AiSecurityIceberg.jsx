// AI security iceberg: the visible basics versus the full programme, as a map to the detailed sections on this page.
const P = 'text-sm leading-relaxed text-gray-700 dark:text-gray-300';
const H = 'mt-5 mb-1 text-base font-semibold text-gray-900 dark:text-white';
const TH = 'p-2 text-left font-semibold text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-900 align-bottom';
const TD = 'p-2 align-top border-t border-gray-100 dark:border-gray-700 text-gray-700 dark:text-gray-300';

const S = {
  harness: ['agent-harness-layers', 'Harness engineering'],
  shadow: ['shadow-ai', 'Shadow AI'],
  arch: ['ai-architecture-risks', 'Risks by architecture'],
  audit: ['ai-security-audit', 'AI security audit'],
  rag: ['secure-rag-pipeline', 'Securing a RAG pipeline'],
  rai: ['rai-crosswalk', 'Responsible AI crosswalk'],
  life: ['ai-lifecycle-crosswalk', 'AI governance across the lifecycle'],
  priv: ['processor-privacy', 'Privacy for processors'],
  field: ['ai-security-field-guide', 'AI security field guide'],
  auto: ['agent-autonomy-controls', 'Controlling autonomous agents'],
  aims: ['aims-roadmap', 'ISO 42001 roadmap'],
  sess: ['ai-session-offboarding', 'Session management and offboarding'],
};

const ABOVE = [
  ['Model access control', 'Who can use which AI models and features', [S.harness]],
  ['Prompt safety', 'Stopping prompt injection and misuse', [S.arch]],
  ['AI usage policy', 'Acceptable and responsible use rules', [S.shadow]],
  ['Data protection', 'Keeping sensitive data out of AI tools', [S.shadow, S.rag]],
  ['Model testing', 'Basic checks for bias, safety and harmful output', [S.audit]],
  ['Vendor and tool review', 'A security check before approving AI tools and APIs', [S.shadow]],
  ['User awareness', 'Teaching staff safe AI use', [S.shadow]],
  ['Generative AI guardrails', 'Basic input and output filters', [S.harness]],
];

const BELOW = [
  ['AI asset discovery', 'Inventory of models, apps, agents and the data they use', [S.shadow, S.aims]],
  ['AI risk assessment', 'Assess injection, leakage, bias and misuse risk and their impact', [S.rai]],
  ['Threat modelling for AI', 'Map attack paths across models, data, tools and agents', [S.arch, S.auto]],
  ['Secure AI SDLC', 'Security built into how AI is designed, tested and deployed', [S.life]],
  ['Data security and privacy', 'Govern training and retrieval data, personal data and residency (for example DPDP)', [S.priv]],
  ['Model security', 'Protect models from theft, tampering and poisoning', [S.field]],
  ['LLM and agent security', 'Secure LLMs, plugins, tools and agent workflows', [S.auto, S.harness]],
  ['AI supply chain security', 'Assess third-party models, datasets, APIs and libraries', [S.field]],
  ['Red teaming for AI', 'Test for jailbreaks, prompt attacks and unsafe output', [S.audit]],
  ['Runtime monitoring', 'Detect abuse, anomalies and policy breaches in production', [S.harness]],
  ['Guardrails and safe output', 'Enforce content, safety and business rules on output', [S.harness]],
  ['Access and privilege control', 'Least privilege and context-aware access for users and agents', [S.auto]],
  ['Observability and explainability', 'Trace model behaviour, quality, drift and decisions', [S.harness]],
  ['AI incident response', 'Contain, investigate and recover from AI incidents', [S.auto, S.sess]],
  ['Compliance and governance', 'Meet AI regulation, ethics, privacy and ISO/IEC 42001', [S.aims, S.rai]],
  ['AI data governance', 'Control how data is collected, used, kept and traced', [S.rag, S.priv]],
  ['AI infrastructure security', 'Secure compute, containers, vector databases and model hosting', [S.rag]],
  ['Business and usage monitoring', 'Track usage, cost and shadow AI across the organisation', [S.shadow]],
  ['Third-party and SaaS AI risk', 'Assess and monitor external AI services continuously', [S.shadow, S.rai]],
  ['Strategy and AI governance', 'Governance body, policy, metrics and board reporting', [S.aims]],
];

function Table({ rows, label }) {
  return (
    <div className="overflow-x-auto my-2" tabIndex={0} role="region" aria-label={label}>
      <table className="w-full text-sm" style={{ minWidth: 760 }}>
        <thead><tr>{['#', 'Area', 'What it covers', 'Where to read more on this page'].map((h) => <th key={h} scope="col" className={TH}>{h}</th>)}</tr></thead>
        <tbody>{rows.map(([a, w, links], i) => (
          <tr key={a}>
            <td className={TD}>{i + 1}</td>
            <td className={`${TD} font-semibold text-gray-900 dark:text-white`}>{a}</td>
            <td className={TD}>{w}</td>
            <td className={TD}>{links.map(([id, l], k) => <span key={id}>{k ? ', ' : ''}<a className="ui-link" href={`#${id}`}>{l}</a></span>)}</td>
          </tr>
        ))}</tbody>
      </table>
    </div>
  );
}

export default function AiSecurityIceberg() {
  return (
    <details className="my-6 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5" id="ai-security-iceberg">
      <summary className="cursor-pointer text-lg font-bold text-gray-900 dark:text-white">The AI security iceberg: the basics people see, and the full programme underneath</summary>
      <div className="mt-3">
        <p className={P}>Many teams think AI security means a usage policy, a prompt filter and a vendor check. Those are the tip of the iceberg. A working programme also covers inventory, threat modelling, secure development, supply chain, red teaming, monitoring, incident response and governance. Use this as a map: each row points to the section on this page that covers it in detail.</p>
        <h3 className={H}>Above the waterline: what most people think AI security is</h3>
        <Table rows={ABOVE} label="AI security basics" />
        <h3 className={H}>Below the waterline: what AI security actually involves</h3>
        <Table rows={BELOW} label="Full AI security programme" />
        <p className={`${P} mt-2`}><strong>Interview line:</strong> &quot;Policy and filters are where AI security starts, not where it ends. I start with an inventory and risk assessment, threat-model each system, build security into the AI lifecycle, test it with red teaming, monitor it in production, and report to an AI governance body aligned to ISO/IEC 42001.&quot;</p>
      </div>
    </details>
  );
}
