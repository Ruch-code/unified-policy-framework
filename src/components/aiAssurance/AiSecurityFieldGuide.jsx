import { useRef, useState } from 'react';
import { ShieldCheck } from 'lucide-react';

// "AI security field guide": lead-in to the security audit section below it.
// Test links point to the existing AIS test anchors (#ais-01 and so on) in AiSecurityAudit.
const LAYERS = [
  ['Data and prompts', 'What goes in: training data, retrieval content, prompts, evaluation sets.'],
  ['Model and logic', 'What makes decisions: weights, fine-tunes, policies, agents, orchestration.'],
  ['Operating environment', 'What it can reach: apps, APIs, users, plugins, storage, logs.'],
];

const LENSES = [
  { id: 'poisoning', name: 'Data poisoning', how: 'Bad data enters through collected data, prepared data (labelling, fine-tuning, embedding) or deployed knowledge (RAG). Attackers flip labels or plant backdoor triggers.', q: 'If the model changed tomorrow, could we prove which data changed it?', tests: ['AIS-08', 'AIS-07'] },
  { id: 'adversarial', name: 'Adversarial inputs', how: 'The input changes, the model does not, in white-box or black-box attacks. It is a security risk only where manipulated input, sensitive behaviour and a decision that matters overlap.', q: 'Where would one confusing input hurt us most, and what stops it becoming an incident?', tests: ['AIS-11', 'AIS-14'] },
  { id: 'injection', name: 'Prompt injection', how: 'The model cannot reliably tell content from instructions, and risk grows when reading, reasoning and acting share one loop. Treat outside content as input to validate, not authority to obey.', q: 'Which content sources can change model behaviour, and what can the model do afterwards?', tests: ['AIS-01', 'AIS-02', 'AIS-06'] },
  { id: 'extraction', name: 'Model extraction', how: 'Attackers clone behaviour just by querying; confidence scores and long explanations help them. Watch for high volume, reworded repeats and scripted edge-case probing.', q: 'Would we know if someone was learning our model faster than our product learns from them?', tests: ['AIS-10', 'AIS-12'] },
  { id: 'privacy', name: 'Privacy', how: 'Membership inference (was this person in training?), memorisation (reproducing text) and everyday leakage through outputs, logs and tools. Risk peaks where sensitive data, retention and broad access overlap.', q: 'Why are we holding this data at all?', tests: ['AIS-03'], extra: ['Processor privacy requirements', '#processor-privacy'] },
  { id: 'supply', name: 'AI supply chain', how: 'Trust is not a logo: most incidents come from reputable components with weak defaults or upstream changes. Keep an AI bill of materials with owners, approvals and a rollback path.', q: 'Can we list every model, dataset, library and connector in scope today, with versions and approvers?', tests: ['AIS-09', 'AIS-15'] },
  { id: 'production', name: 'Production', how: 'Launch starts the security job: identity and access, runtime control, observability. Keep a kill switch for tool use and log prompt, answer, tools used and model version.', q: 'If a live AI feature misbehaved today, what evidence would we have in the first 15 minutes?', tests: ['AIS-12', 'AIS-13'] },
  { id: 'governance', name: 'Governance', how: 'Policy, controls and evidence must overlap. Map five questions to records: what is in use (inventory), which risks matter (risk assessment), which controls apply (approvals), what proves they work (tests, logs) and how exceptions are handled (time-bound decisions).', q: 'Which AI workflow most needs clearer ownership, evidence or policy right now?', tests: [], extra: ['AI Governance Across the Lifecycle', '#ai-lifecycle-crosswalk'] },
];

export default function AiSecurityFieldGuide() {
  const [tab, setTab] = useState(0);
  const refs = useRef([]);
  const onKey = (e) => {
    const n = LENSES.length;
    const next = e.key === 'ArrowRight' ? (tab + 1) % n : e.key === 'ArrowLeft' ? (tab - 1 + n) % n : e.key === 'Home' ? 0 : e.key === 'End' ? n - 1 : null;
    if (next === null) return;
    e.preventDefault(); setTab(next); refs.current[next]?.focus();
  };
  const l = LENSES[tab];
  return (
    <section id="ai-security-field-guide" className="grc-section scroll-mt-24">
      <h2 className="grc-section-title mb-2"><ShieldCheck className="w-6 h-6 text-violet-600 dark:text-violet-300" /> AI security field guide: how each risk actually works</h2>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 max-w-3xl">AI security is lifecycle security, not just model security, so use these lenses to see the whole system before you test it.</p>

      <figure className="mb-6" aria-label="AI attack surface map">
        <div className="grid gap-3 md:grid-cols-3">
          {LAYERS.map(([t, d], i) => (
            <div key={t} className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4">
              <p className="text-[10px] font-bold uppercase tracking-wide text-violet-700 dark:text-violet-300">Layer {i + 1}</p>
              <h3 className="font-bold text-gray-900 dark:text-white">{t}</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">{d}</p>
            </div>
          ))}
        </div>
        <figcaption className="text-xs text-gray-600 dark:text-gray-400 mt-2">Real incidents usually cross more than one layer. A safe model can still sit inside an unsafe product.</figcaption>
      </figure>

      <div role="tablist" aria-label="AI risk lenses" className="flex flex-wrap gap-2 mb-4" onKeyDown={onKey}>
        {LENSES.map((x, i) => (
          <button key={x.id} ref={(el) => { refs.current[i] = el; }} id={`lens-tab-${x.id}`} role="tab" type="button" aria-selected={tab === i} aria-controls={`lens-panel-${x.id}`} tabIndex={tab === i ? 0 : -1} onClick={() => setTab(i)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${tab === i ? 'bg-violet-600 border-violet-600 text-white' : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:border-violet-400'}`}>{i + 1}. {x.name}</button>
        ))}
      </div>
      <div id={`lens-panel-${l.id}`} role="tabpanel" aria-labelledby={`lens-tab-${l.id}`} tabIndex={0} className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 space-y-3">
        <div><h3 className="text-sm font-bold text-gray-900 dark:text-white">How it works</h3><p className="text-sm text-gray-700 dark:text-gray-300">{l.how}</p></div>
        <div><h3 className="text-sm font-bold text-gray-900 dark:text-white">The question to ask</h3><p className="text-sm font-bold text-violet-700 dark:text-violet-300">{l.q}</p></div>
        <div><h3 className="text-sm font-bold text-gray-900 dark:text-white">Test it</h3>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            {l.tests.map((t, i) => <span key={t}>{i > 0 && ', '}<a className="font-mono text-violet-700 dark:text-violet-300 hover:underline" href={`#${t.toLowerCase()}`}>{t}</a></span>)}
            {l.extra && <>{l.tests.length > 0 && '; '}<a className="text-violet-700 dark:text-violet-300 hover:underline" href={l.extra[1]}>{l.extra[0]}</a></>}
          </p>
        </div>
      </div>
      <p className="text-sm text-gray-700 dark:text-gray-300 mt-4">Every lens you can't answer becomes a row in your threat model (<a className="text-violet-700 dark:text-violet-300 hover:underline" href="#audit-phase-2">audit phase 2</a>).</p>
    </section>
  );
}
