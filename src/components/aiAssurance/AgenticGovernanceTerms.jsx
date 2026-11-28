import { Scale, Fingerprint, Key, Workflow, Shield, UserCheck, DollarSign, Ban, FileText, Eye, CheckCircle2, ShieldAlert, ArrowRight } from 'lucide-react';

// Twelve agentic AI governance terms grouped by when they apply: before the agent runs, during every action, and after.
const PHASES = [
  ['Before', 'the agent runs', 'bg-blue-600', 'border-blue-300 dark:border-blue-800', [
    [Scale, 'Risk tiering', 'Rate each agent by the harm it could cause; higher tiers get tighter controls.'],
    [Fingerprint, 'Agent identity', 'Give every agent its own identity and credentials instead of a shared account.'],
    [Key, 'Least privilege', 'Grant only the tools, data and permissions the task needs.'],
    [Workflow, 'Policy as code', 'Write rules on what the agent may access, do or spend, and enforce them automatically.'],
  ]],
  ['During', 'every action', 'bg-amber-500', 'border-amber-300 dark:border-amber-800', [
    [Shield, 'Guardrails', 'Screen inputs and outputs to block unsafe actions and data leaks.'],
    [UserCheck, 'Human in the loop', 'A person approves high-impact actions before they run.'],
    [DollarSign, 'Budget limits', 'Hard caps on tokens, cost, steps and tool calls per task.'],
    [Ban, 'Kill switch', 'A tested way to halt the agent at once if it misbehaves.'],
  ]],
  ['After', 'and continuously', 'bg-emerald-600', 'border-emerald-300 dark:border-emerald-800', [
    [FileText, 'Audit trail', 'A tamper-evident log of prompts, decisions and tool calls.'],
    [Eye, 'Observability', 'Traces and metrics that explain what the agent did and why.'],
    [CheckCircle2, 'Continuous evaluation', 'Regular tests on real cases for quality, safety and drift.'],
    [ShieldAlert, 'Red teaming', 'Attack your own agent first: prompt injection, data theft and misuse.'],
  ]],
];

export default function AgenticGovernanceTerms() {
  let n = 0;
  return (
    <details className="my-6 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5" id="agentic-governance-terms">
      <summary className="cursor-pointer text-lg font-bold text-gray-900 dark:text-white">12 agentic AI governance terms: before, during and after</summary>
      <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-xs font-bold text-white">
        {PHASES.map(([p, s, bg], i) => <span key={p} className="flex items-center gap-2"><span className={`rounded-full px-3 py-1 ${bg}`}>{p}: {s}</span>{i < 2 && <ArrowRight className="w-4 h-4 text-gray-400" aria-hidden="true" />}</span>)}
      </div>
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        {PHASES.map(([p, s, bg, border, items]) => (
          <div key={p} className="space-y-2">
            {items.map(([Icon, t, d]) => { n += 1; return (
              <div key={t} className={`rounded-xl border ${border} p-3`}>
                <div className="flex items-center justify-between">
                  <span className={`inline-flex items-center justify-center w-8 h-8 rounded-lg text-white ${bg}`}><Icon className="w-4 h-4" aria-hidden="true" /></span>
                  <span className="text-xs font-mono text-gray-400">{String(n).padStart(2, '0')}</span>
                </div>
                <p className="mt-2 font-bold text-gray-900 dark:text-white">{t}</p>
                <p className="text-sm text-gray-700 dark:text-gray-300">{d}</p>
              </div>
            ); })}
          </div>
        ))}
      </div>
      <p className="mt-3 text-sm text-gray-700 dark:text-gray-300">Autonomy levels, approval design and testing for each of these are covered in the autonomous agent controls section below.</p>
    </details>
  );
}
