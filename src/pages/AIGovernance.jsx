import React from 'react';
import { Link } from 'react-router-dom';
import { BrainCircuit, Scale, ShieldCheck, Workflow, FileText, Cpu, Sparkles, ArrowRight, AlertTriangle, CheckCircle2 } from 'lucide-react';

const PILLARS = [
  {
    id: 'iso42001',
    title: 'ISO/IEC 42001:2023',
    sub: 'AI Management System (AIMS)',
    accent: 'from-violet-600 to-purple-600',
    desc: 'The certifiable management-system backbone: AI policy, AI risk assessment, impact assessment, and lifecycle controls mapped to Annex A. Clause 10 turns findings into corrective action.',
    links: [
      { label: 'ISO 42001 deep-dive (KB)', to: '/knowledge?fw=iso42001' },
      { label: 'AIGP standard page', to: '/aigp' },
    ],
    tags: ['AIMS', 'Annex A', 'AI policy', 'impact assessment', 'audit-ready'],
  },
  {
    id: 'eu-ai-act',
    title: 'EU AI Act',
    sub: 'Reg. (EU) 2024/1689',
    accent: 'from-blue-600 to-indigo-600',
    desc: 'Risk-tiered obligations: prohibited practices (Art. 5), high-risk conformity (Arts. 6–49), transparency (Art. 50), GPAI (Arts. 51–56), post-market monitoring (Art. 72) and incident reporting (Art. 73). Extraterritorial reach.',
    links: [
      { label: 'AIGP standard page', to: '/aigp' },
      { label: 'EU AI Act phases & walkthrough', to: '/knowledge?fw=iso42001' },
    ],
    tags: ['risk tiers', 'high-risk', 'GPAI', 'conformity', 'CE marking'],
  },
  {
    id: 'nist-ai-rmf',
    title: 'NIST AI RMF 1.0',
    sub: 'Govern · Map · Measure · Manage',
    accent: 'from-emerald-600 to-teal-600',
    desc: 'The voluntary, risk-based operating system for trustworthy AI. Govern sets the function, Map the context, Measure the metrics (bias, security, robustness), Manage the treatment. Profiles tailor it to your risk appetite.',
    links: [
      { label: 'AIGP standard page', to: '/aigp' },
      { label: 'NIST page', to: '/nist' },
    ],
    tags: ['4 functions', 'profiles', 'playbook', 'trustworthy AI', 'US federal'],
  },
];

const TIMELINE = [
  { by: '2 Aug 2025', what: 'Prohibited AI practices apply (Art. 5) — social scoring, manipulative techniques, real-time remote biometric ID by law enforcement (exceptions).' },
  { by: '2 Aug 2026', what: 'Most GPAI obligations + governance duties (Arts. 51–56); high-risk transparency (Art. 50). Penalties for prohibited practices available.' },
  { by: '2 Aug 2027', what: 'High-risk systems (Annex III) conformity, CE marking, EU database registration.' },
  { by: '2 Aug 2030', what: 'High-risk Annex I products governed by product legislation.' },
];

const EMERGING = [
  { icon: Cpu, title: 'Proprietary vs open-weight GPAI', desc: 'Systemic-risk models (10^25 FLOPs, threshold set via delegated act) owe tougher duties — transparency reports, red teaming, systemic-risk mitigation.' },
  { icon: Workflow, title: 'AI agents & delegation chains', desc: 'Agent-to-agent and agent-to-service delegation creates unmonitored third-party decision spillover — map every hop, extend the vendor-risk questionnaire to tool-use grants, and gate autonomous actions by blast radius.' },
  { icon: Sparkles, title: 'Generated content provenance', desc: 'Watermarking (Art. 50(2)) and C2PA-style provenance for synthetic media; label synthetic content in user-facing flows to satisfy transparency duties.' },
  { icon: FileText, title: 'Model cards & technical documentation', desc: 'Art. 53 model documentation and Annex IV technical documentation become the audit-ready skeleton — reuse them as your internal model registry standard.' },
];

const CONTROL_MAP = [
  { system: 'Customer chatbot (RAG on support docs)', eu: 'Limited-risk — Art. 50 transparency (label as AI)', nist: 'Govern: policy + inventory; Map: conversational trust', iso: 'A.5.2 AI risk source; A.6.2 documentation; A.9 incident-handling' },
  { system: 'Resume screening / candidate scoring', eu: 'High-risk (Annex III) — conformity, Art. 14 oversight, Art. 22/79 DPAs', nist: 'Measure: bias + valid & reliable', iso: 'A.5.3 AI impact assessment; A.8 privacy; A.10 human oversight' },
  { system: 'Fraud / content-moderation classifier', eu: 'High-risk if used for deciding access — conformity + registration', nist: 'Manage: treat, monitor, document', iso: 'A.5.4 data for AI; A.6.4 change management' },
  { system: 'LLM code assistant (human reviews output)', eu: 'Minimal-risk overlay + Art. 50 label if interacting', nist: 'Govern + Measure reuse; incident loop', iso: 'A.7 model-by-model lifecycle' },
];

const EMERGING_RHYTHM = [
  { step: '1', title: 'Intake & classify', desc: 'Every new model/AI feature registers in the AI inventory and gets classified (EU risk tier, NIST functions, ISO AIMS scope) before it can touch production traffic.' },
  { step: '2', title: 'Assess & measure', desc: 'Run the AI impact assessment (ISO 42001 A.5.3) and the NIST Measure pass — bias, robustness, security, drift baseline — with the results stored beside the model card.' },
  { step: '3', title: 'Operate & monitor', desc: 'Post-market monitoring (Art. 72): drift, hallucination rate, misuse. Serious-AI-incident reporting (Art. 73) on the clock, mirroring your P0/P1 IR SLAs.' },
  { step: '4', title: 'Review & improve', desc: 'Quarterly AI governance review: incidents, audit findings, regulatory-change watch, model additions/retirements. Close the loop into Clause 10 corrective action.' },
];

export default function AIGovernance({ isDark = false }) {
  return (
    <div className={`min-h-screen ${isDark ? 'bg-dark-bg' : 'bg-surface-50'} py-8`}>
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Hero */}
        <div className="mb-8">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-violet-600 text-white mb-3">
            <BrainCircuit className="w-3.5 h-3.5" /> AI Governance & Emerging Tech
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-navy-900 dark:text-text-dark-primary mb-3">
            One module, three frameworks — ISO 42001, EU AI Act, NIST AI RMF
          </h1>
          <p className="text-lg text-navy-600 dark:text-text-dark-secondary max-w-3xl">
            Regulators now grade AI governance the way auditors grade security controls. This module gives you the
            single operating rhythm that satisfies all three tracks at once — so a model release is governed, not just deployed.
          </p>
        </div>

        {/* Framework pillars */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          {PILLARS.map(p => (
            <div key={p.id} className="group flex flex-col rounded-2xl border border-surface-300 dark:border-surface-dark-300 bg-white dark:bg-slate-900/60 overflow-hidden">
              <div className={`px-5 py-4 bg-gradient-to-r ${p.accent} flex items-center justify-between`}>
                <h2 className="text-lg font-extrabold text-white">{p.title}</h2>
                <ShieldCheck className="w-5 h-5 text-white/80" aria-hidden="true" />
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <p className="text-xs font-bold uppercase tracking-wider text-violet-600 dark:text-violet-300 mb-2">{p.sub}</p>
                <p className="text-sm text-gray-700 dark:text-text-dark-secondary leading-relaxed mb-4">{p.desc}</p>
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {p.tags.map(t => (
                    <span key={t} className="px-2 py-0.5 rounded-md bg-violet-50 dark:bg-violet-900/30 text-[11px] font-semibold text-violet-800 dark:text-violet-200">{t}</span>
                  ))}
                </div>
                <div className="mt-auto space-y-2">
                  {p.links.map(l => (
                    <Link key={l.to + l.label} to={l.to}
                      className="flex items-center gap-2 text-sm font-semibold text-violet-700 dark:text-violet-300 hover:text-violet-900 dark:hover:text-violet-100 group/l">
                      <ArrowRight className="w-4 h-4 transition group-hover/l:translate-x-0.5" /> {l.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Compliance timeline */}
        <section className="rounded-2xl border border-surface-300 dark:border-surface-dark-300 bg-white dark:bg-slate-900/60 p-6 md:p-8 mb-10">
          <h2 className="grc-section-title mb-2"><Scale className="w-6 h-6 text-blue-600" /> EU AI Act — phased obligations clock</h2>
          <p className="text-sm text-gray-600 dark:text-text-dark-secondary mb-6 max-w-3xl">
            The grace periods are the real deadline driver behind every other task in this module. Alignment with ISO 42001 + NIST AI RMF
            today means each phase below is already evidenced.
          </p>
          <div className="space-y-3">
            {TIMELINE.map(t => (
              <div key={t.by} className="flex items-start gap-4 rounded-xl border border-surface-200 dark:border-surface-dark-200 p-3.5">
                <span className="shrink-0 w-32 text-xs font-bold text-blue-700 dark:text-blue-300 uppercase pt-0.5">{t.by}</span>
                <p className="text-sm text-gray-700 dark:text-text-dark-secondary">{t.what}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Control mapping */}
        <section className="rounded-2xl border border-surface-300 dark:border-surface-dark-300 bg-white dark:bg-slate-900/60 p-6 md:p-8 mb-10">
          <h2 className="grc-section-title mb-2"><ShieldCheck className="w-6 h-6 text-emerald-600" /> Classify a system across all three frameworks</h2>
          <p className="text-sm text-gray-600 dark:text-text-dark-secondary mb-5 max-w-3xl">
            The same AI system classifies differently per track — this is the table to keep next to your AI inventory.
          </p>
          <div className="grc-table-wrap">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-violet-200 dark:border-violet-900/60">
                  <th className="py-2.5 pr-3 text-left text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-slate-400">AI system</th>
                  <th className="py-2.5 pr-3 text-left text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-slate-400">EU AI Act</th>
                  <th className="py-2.5 pr-3 text-left text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-slate-400">NIST AI RMF</th>
                  <th className="py-2.5 text-left text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-slate-400">ISO 42001</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
                {CONTROL_MAP.map(r => (
                  <tr key={r.system} className="align-top">
                    <td className="py-3 pr-3 font-semibold text-gray-800 dark:text-text-dark-primary whitespace-nowrap">{r.system}</td>
                    <td className="py-3 pr-3 text-gray-600 dark:text-text-dark-secondary">{r.eu}</td>
                    <td className="py-3 pr-3 text-gray-600 dark:text-text-dark-secondary">{r.nist}</td>
                    <td className="py-3 text-gray-600 dark:text-text-dark-secondary">{r.iso}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Emerging tech */}
        <section className="rounded-2xl border border-surface-300 dark:border-surface-dark-300 bg-white dark:bg-slate-900/60 p-6 md:p-8 mb-10">
          <h2 className="grc-section-title mb-2"><Sparkles className="w-6 h-6 text-amber-600" /> Emerging tech coverage</h2>
          <p className="text-sm text-gray-600 dark:text-text-dark-secondary mb-6 max-w-3xl">
            The module keeps pace with generative AI, agents, and foundation models so a governance plan from last year is not a
            governance plan this year.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {EMERGING.map(e => (
              <div key={e.title} className="rounded-xl border border-surface-200 dark:border-surface-dark-200 bg-surface-50 dark:bg-slate-900/80 p-4">
                <span className="inline-flex w-9 h-9 rounded-lg bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 items-center justify-center mb-2">
                  <e.icon className="w-5 h-5" />
                </span>
                <h3 className="font-bold text-sm text-gray-900 dark:text-text-dark-primary mb-1">{e.title}</h3>
                <p className="text-xs text-gray-600 dark:text-text-dark-secondary leading-relaxed">{e.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Operating rhythm */}
        <section className="rounded-2xl border border-surface-300 dark:border-surface-dark-300 bg-white dark:bg-slate-900/60 p-6 md:p-8">
          <h2 className="grc-section-title mb-2"><Workflow className="w-6 h-6 text-indigo-600" /> The model-release operating rhythm</h2>
          <p className="text-sm text-gray-600 dark:text-text-dark-secondary mb-6 max-w-3xl">
            A model release is governed the same way a code release is — except the "deploy" gate includes an AI risk judgment.
          </p>
          <div className="grid md:grid-cols-4 gap-4 mb-6">
            {EMERGING_RHYTHM.map(r => (
              <div key={r.step} className="flex items-start gap-3 rounded-xl border border-surface-200 dark:border-surface-dark-200 bg-surface-50 dark:bg-slate-900/80 p-4">
                <span className="w-7 h-7 rounded-full bg-violet-600 text-white text-xs font-bold flex items-center justify-center shrink-0">{r.step}</span>
                <div>
                  <h3 className="font-bold text-sm text-gray-900 dark:text-text-dark-primary">{r.title}</h3>
                  <p className="text-xs text-gray-600 dark:text-text-dark-secondary mt-1 leading-relaxed">{r.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-amber-200 dark:border-amber-900/40 bg-amber-50 dark:bg-amber-900/20 p-4 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-700 dark:text-amber-300 shrink-0 mt-0.5" />
            <p className="text-sm text-gray-800 dark:text-text-dark-secondary">
              <strong className="text-amber-800 dark:text-amber-300">Start here:</strong> if you only do one thing this quarter, stand up the AI inventory and
              classify every system against the <strong>EU AI Act risk tiers</strong>. Everything else — NIST functions, ISO 42001 annex controls, model cards — hangs off that list.
            </p>
          </div>

          <div className="mt-5 flex items-start gap-2 text-xs text-gray-500 dark:text-text-dark-muted">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            Content cross-links deep-dives rather than duplicating them: the AIGP certification path, ISO 42001 knowledge base, and NIST CSF page remain the authoritative sources.
          </div>
        </section>
      </div>
    </div>
  );
}