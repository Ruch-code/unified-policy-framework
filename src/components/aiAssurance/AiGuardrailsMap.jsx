import { useEffect } from 'react';
import { ArrowRight, ShieldCheck } from 'lucide-react';

// Where guardrails sit on an LLM or agent request path, by stage, with example tools.
const PATH = ['User prompt', 'Input guardrails', 'LLM or agent', 'Tool guardrails (for each tool call)', 'Output guardrails', 'Response'];
const STAGES = [
  ['Input: before the model', 'border-emerald-300 dark:border-emerald-800', [
    ['Prompt injection detection', 'Finds hidden instructions in prompts and in retrieved documents', 'Lakera Guard'],
    ['Jailbreak detection', 'Flags role-play, encoding and other tricks used to get around rules', 'Llama Prompt Guard'],
    ['PII redaction', 'Masks emails, phone numbers and IDs before the model sees them', 'Microsoft Presidio'],
    ['Topic and scope filter', 'Rejects off-topic or disallowed requests before processing', 'NeMo Guardrails'],
  ]],
  ['Tool: during actions', 'border-sky-300 dark:border-sky-800', [
    ['Least-privilege access', 'Narrowly scoped credentials and a strict allow-list of callable tools', 'OAuth scopes'],
    ['Argument validation', 'Checks every tool call against a schema before it runs', 'Pydantic'],
    ['Sandboxed execution', 'Runs generated code in isolated containers with limited network access', 'gVisor, Firecracker'],
    ['Human approval', 'Requires sign-off for payments, deletions and outbound emails', 'LangGraph interrupts'],
  ]],
  ['Output: before the user', 'border-amber-300 dark:border-amber-800', [
    ['Content moderation', 'Screens responses for hate, violence and self-harm content', 'Llama Guard'],
    ['Grounding check', 'Compares answers with retrieved sources to catch hallucinations', 'Amazon Bedrock Guardrails'],
    ['Leak prevention', 'Blocks API keys, secrets and personal data in replies', 'DLP and secret scanners'],
    ['Format validation', 'Enforces output schemas such as JSON so downstream systems do not break', 'Guardrails AI'],
  ]],
  ['Policy: across everything', 'border-violet-300 dark:border-violet-800', [
    ['Policy as code', 'One central rulebook enforced across every agent and model', 'Open Policy Agent'],
    ['Audit logging', 'Records every prompt, tool call and decision for review', 'Langfuse'],
    ['Red teaming', 'Regularly attacks your own system to find weak spots', 'garak, PyRIT'],
    ['Compliance mapping', 'Maps guardrails to regulations and AI risk frameworks', 'EU AI Act, NIST AI RMF, ISO 42001'],
  ]],
];

const CHOOSER = [
  ['Input content filter', 'Input', 'Public chat apps that accept open, untrusted input', ['User prompt', 'Classify for harm', 'Score against a threshold', 'Block or warn', 'Pass to the model']],
  ['Prompt injection detection', 'Input', 'The model reads web pages, emails, files or tool output', ['Prompt and documents', 'Scan for instruction overrides', 'Flag injections', 'Strip or quarantine', 'Pass safe context']],
  ['PII redaction', 'Input', 'Prompts, logs or answers may contain personal data', ['Text in', 'Detect entities', 'Mask or tokenise', 'Model sees masked text', 'Restore only where allowed']],
  ['Denied topics', 'Input', 'The assistant must stay in its lane, for example no legal or medical advice', ['User request', 'Match against policy', 'In scope?', 'Polite refusal', 'Offer an alternative']],
  ['Grounding check', 'Output', 'Answers must come only from your own documents (RAG)', ['Draft answer', 'Split into claims', 'Compare with sources', 'Score support', 'Cite or regenerate']],
  ['Schema validation', 'Output', 'Output feeds code, APIs, forms or databases', ['Model output', 'Parse', 'Validate against schema', 'Retry with the error', 'Typed result']],
  ['Output moderation', 'Output', 'Replies go straight to customers or the public', ['Model reply', 'Toxicity check', 'Rewrite or mask', 'Log the decision', 'Deliver']],
  ['Tool permissions', 'Action', 'Agents call APIs, run code or touch production data', ['Agent picks a tool', 'Check allow-list', 'Scope arguments', 'Least privilege', 'Execute and log']],
  ['Human approval gate', 'Action', 'Actions cannot be undone: payments, emails, deletions', ['Agent plans', 'Risk check', 'Pause and notify', 'Human approves', 'Resume or cancel']],
  ['Rate and cost limits', 'Platform', 'Public endpoints, runaway agent loops, unexpected bills', ['Request in', 'Identify caller', 'Check quota', 'Throttle or queue', 'Alert on spikes']],
];

export default function AiGuardrailsMap() {
  useEffect(() => {
    if (typeof window === 'undefined' || window.location.hash !== '#ai-guardrails-map') return undefined;
    const t = setTimeout(() => { const el = document.getElementById('ai-guardrails-map'); if (el) { el.open = true; el.scrollIntoView({ behavior: 'smooth' }); } }, 400);
    return () => clearTimeout(t);
  }, []);
  return (
    <details id="ai-guardrails-map" className="my-6 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 scroll-mt-24">
      <summary className="cursor-pointer text-lg font-bold text-gray-900 dark:text-white">AI guardrails: where they sit and how to choose them</summary>
      <ol className="mt-3 flex flex-col md:flex-row md:flex-wrap md:items-center gap-2" aria-label="Request path">
        {PATH.map((s, i) => (
          <li key={s} className="flex items-center gap-2 text-sm">
            <span className={`rounded-lg border px-2.5 py-1.5 ${s.includes('guardrails') ? 'border-emerald-400 bg-emerald-50 dark:bg-emerald-900/20' : 'border-gray-300 dark:border-gray-600'} text-gray-800 dark:text-gray-200`}>
              {s.includes('guardrails') && <ShieldCheck className="inline w-4 h-4 mr-1" aria-hidden="true" />}{s}
            </span>
            {i < PATH.length - 1 && <ArrowRight className="hidden md:block w-4 h-4 text-gray-400" aria-hidden="true" />}
          </li>
        ))}
      </ol>
      <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">The policy layer governs the whole path. Tools named are examples of each control type, not endorsements; the wider tool landscape is in the AI ecosystem map below.</p>
      <div className="mt-3 grid gap-3 md:grid-cols-2">
        {STAGES.map(([title, border, items]) => (
          <div key={title} className={`rounded-xl border-2 ${border} p-3`}>
            <p className="font-bold text-gray-900 dark:text-white mb-2">{title}</p>
            <ul className="space-y-2">
              {items.map(([c, d, tool]) => (
                <li key={c} className="text-sm">
                  <span className="font-semibold text-gray-900 dark:text-white">{c}:</span> <span className="text-gray-700 dark:text-gray-300">{d}</span>
                  <span className="ml-1 inline-block rounded bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 text-[11px] text-gray-600 dark:text-gray-300">e.g. {tool}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <h3 className="mt-5 mb-1 text-base font-semibold text-gray-900 dark:text-white">Choosing guardrails: when to use each and how it works</h3>
      <p className="text-sm text-gray-700 dark:text-gray-300">Layer them in order: input, output, action, then platform. Start with the ones whose trigger matches your system.</p>
      <div className="overflow-x-auto mt-2" tabIndex={0} role="region" aria-label="Choosing guardrails">
        <table className="w-full text-sm min-w-[900px]">
          <thead><tr>{['Guardrail', 'Layer', 'Use when', 'How it works'].map((h) => <th key={h} scope="col" className="p-2 text-left font-semibold text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-900">{h}</th>)}</tr></thead>
          <tbody>{CHOOSER.map((r) => <tr key={r[0]}>{r.map((c, j) => <td key={j} className={`p-2 align-top border-t border-gray-100 dark:border-gray-700 text-gray-700 dark:text-gray-300 ${j === 0 ? 'font-medium' : ''}`}>{j === 3 ? c.join(' → ') : c}</td>)}</tr>)}</tbody>
        </table>
      </div>

      <p className="mt-3 text-sm text-gray-700 dark:text-gray-300">Audit check: each guardrail has an owner, is tested against known attacks, logs its decisions, and fails safe (blocks rather than allows) when it cannot run.</p>
    </details>
  );
}
