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

export default function AiGuardrailsMap() {
  useEffect(() => {
    if (typeof window === 'undefined' || window.location.hash !== '#ai-guardrails-map') return undefined;
    const t = setTimeout(() => { const el = document.getElementById('ai-guardrails-map'); if (el) { el.open = true; el.scrollIntoView({ behavior: 'smooth' }); } }, 400);
    return () => clearTimeout(t);
  }, []);
  return (
    <details id="ai-guardrails-map" className="my-6 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 scroll-mt-24">
      <summary className="cursor-pointer text-lg font-bold text-gray-900 dark:text-white">AI guardrails along the request path: input, tool, output and policy</summary>
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
      <p className="mt-3 text-sm text-gray-700 dark:text-gray-300">Audit check: each guardrail has an owner, is tested against known attacks, logs its decisions, and fails safe (blocks rather than allows) when it cannot run.</p>
    </details>
  );
}
