import React, { useState } from 'react';
import {
  BrainCircuit, Bot, Scale, MessageSquareText, Landmark, Info, ChevronRight, CheckCircle,
} from 'lucide-react';

const USE_CASES = [
  {
    title: 'AI Hiring & Candidate Screening',
    badge: 'Employment & Recruiting',
    icon: Bot,
    color: 'indigo',
    scenario:
      'A SaaS startup ships an AI screener that ranks CVs and recommends whether recruiters advance candidates. It consumes résumé text plus demographic-adjacent signals (education institution, employment gaps) and filters shortlists before a human recruiter ever looks at a candidate.',
    risks: [
      'EU AI Act: employment and recruitment is a high-risk category (Annex III) — a conformity assessment, risk & quality-management system, technical documentation, and evidence of human oversight are required before placing the system into EU service.',
      'GDPR Art. 22: if the screener effectively decides who advances, it is "solely automated" decision-making that significantly affects candidates — prohibited unless an exemption applies, and even then suitable safeguards (meaningful human review, right to contest, right to express a view) are mandatory.',
      'US rules: NYC Local Law 144 mandates an independent bias audit of automated employment decision tools; the Illinois AI-Video Interview Act requires disclosure and consent; the Colorado AI Act (in force from 2026) covers consequential employment decisions with deployer duties.',
      'Adverse-impact risk: proxies such as employment gaps or university tier can systematically disadvantage protected groups, opening exposure to EEO and anti-discrimination claims.',
    ],
    response: [
      'Inventory the screener in the AI system register and classify it as high-consequence under both the EU AI Act and US hiring laws.',
      'Run a pre-deployment bias audit (statistical parity, equalized odds, and the 4/5ths rule) on historical and benchmark data; document the methodology and dataset versions.',
      'Put a human recruiter in the loop: no candidate is auto-rejected, every adverse recommendation is reviewable, and candidates can request an explanation of the decision.',
      'Complete the Art. 22 analysis: if the decision is solely automated, add meaningful human review and grant rights to contest and obtain human intervention.',
      'Assemble the EU AI Act technical documentation and risk-management file so the conformity dossier is audit-ready before EU placement.',
    ],
    verify: [
      'Can a candidate challenge or appeal their screening result, and is there logged evidence of the mechanism working?',
      'Bias-audit report, human-in-the-loop threshold configuration, explanation requests, and the technical documentation are on file.',
      'What training/validation data is used, and does the feature set avoid prohibited characteristics?',
    ],
  },
  {
    title: 'AI Credit & Lending Decisions',
    badge: 'Financial Services',
    icon: Scale,
    color: 'emerald',
    scenario:
      'A fintech uses a machine-learning credit model with non-traditional data (spending patterns, device signals, social connections) to approve or decline loan requests in near real time across the EU, US, and India.',
    risks: [
      'GDPR Art. 22 and EDPB guidance: credit scoring that meaningfully affects an individual is very likely "solely automated" — it requires meaningful human review, an explanation of the logic involved, and an account of the envisaged consequences.',
      'ECOA / Regulation B (US): every adverse action must trigger a specific reasons notice; discretionary scoring models need adverse-action reason codes and, in practice, limited reconstitution of the model.',
      'EU AI Act: creditworthiness assessment is a high-risk category (Annex III) — conformity assessment, Art. 14 human oversight, and Art. 72 post-market monitoring apply.',
      'Model risk: training on biased historical lending patterns perpetuates redlining and disparate-impact outcomes; regulators each side of the Atlantic expect model-governance discipline (SR 11-07 style in the US).',
    ],
    response: [
      'Maintain a model-risk management plan covering development, independent validation, deployment, and monitoring — with validation completed before production.',
      'Run disparate-impact testing (demographic parity and equalized odds on approval rates across protected groups) and remove proxy features before launch.',
      'Implement meaningful human review with authority to reverse declines, and log every human override as evidence.',
      'Build adverse-action reason codes that map to the actual model drivers for Reg B disclosures and the GDPR Art. 22 explanation mechanism.',
      'Add post-deployment monitoring for drift and bias with thresholds that trigger revalidation of the conformity assessment.',
    ],
    verify: [
      'Validation sign-off, bias-test results, adverse-action reason-code mapping, and override logs are all inspectable.',
      'For a representative declined applicant: can the company state, in plain language, the deciding factors and the human appeal path?',
      'What is the post-market monitoring cadence, and what event re-runs the conformity assessment?',
    ],
  },
  {
    title: 'Customer-Facing Chatbot / Agentic Assistant',
    badge: 'Consumer Products',
    icon: MessageSquareText,
    color: 'amber',
    scenario:
      'A SaaS company ships a generative-AI assistant — an LLM grounded on its documentation with agentic tool use — that answers support questions, drafts responses, and executes simple account actions for customers and employees.',
    risks: [
      'EU AI Act Art. 50 transparency: users must be told they are interacting with AI, and synthetic content that could deceive must be marked as such.',
      'Hallucination risk: invented answers about policies, pricing, or account data create consumer-protection liability (FTC deceptive-practices and equivalent EU unfair-commercial-practices rules), even when a human reviews later.',
      'Prompt-injection and data exposure: the agent can be manipulated into triggering tools or surfacing PII from the knowledge base.',
      'Deepfake/voice risk escalates if the assistant can call customers or generate persona audio — impersonation and consent issues multiply both regulatory and brand risk.',
      'Privacy: personal data fed into the model for grounding creates a new processing activity that requires DPIA review, notice, and purpose checks.',
    ],
    response: [
      'Force a transparency banner and an activation acknowledgement whenever a user interacts with the AI (Art. 50).',
      'Ground the model on a validated, versioned knowledge base with retrieval confidence thresholds and an explicit refuse-to-answer behavior below the line.',
      'Sandbox agentic tool actions: allowlist permitted actions, require confirmation for account-level changes, and run prompt-injection red-team tests quarterly.',
      'Add output guardrails: PII redaction in generation, provenance labels (C2PA-style) on AI-generated media, and audit logging of every model response.',
      'Classify the assistant in the AI register with a documented risk owner and a human escalation path for unsafe outputs.',
    ],
    verify: [
      'Transparency banner present in the live UI, allowlist configuration, injection-test results, and refusal logs are inspectable.',
      'Can the agent complete an account action without confirmation, and does the customer know the reply was AI-generated?',
      'How is the grounding knowledge versioned, and how is stale or incorrect data recalled?',
    ],
  },
  {
    title: 'Vendor Base-Model Procurement',
    badge: 'Third-Party & Procurement',
    icon: BrainCircuit,
    color: 'cyan',
    scenario:
      'Engineering buys frontier models and AI APIs — foundation models, embeddings, code assistants — from several vendors with no procurement review. Each vendor receives prompts and training data, and model behavior can change upstream without notice.',
    risks: [
      'EU AI Act GPAI obligations (Arts. 51-56): general-purpose AI providers must document their models and publish a training-data summary; deployers still carry deployer-side duties, so the GPAI provider documentation feeds your own conformity reasoning.',
      'No DPA for prompt data: prompts frequently contain PII, pricing, and source code — a GDPR Art. 28 DPA with sub-processor list, purpose limits, and deletion clauses is mandatory, as are CCPA service-provider terms.',
      'Intellectual-property risk: outputs may reproduce copyrighted or proprietary training content, and AI-generated code can embed license-incompatible fragments — model/code SBOM becomes a genuine safety issue.',
      'Upstream drift: a vendor can swap a model with no notice, silently changing behavior that your validation previously approved.',
      'Indirect conformity: building a high-risk product on a GPAI whose documentation lapses can break your own conformity assessment.',
    ],
    response: [
      'Add AI to the vendor-risk framework and tier every AI vendor by data sensitivity, model criticality, and EU AI Act role (provider vs deployer).',
      'Contract for GPAI documentation and transparency reports from foundation-model providers; require model-card and training-data-summary access before production.',
      'Execute DPAs with sub-processor lists and purpose limits covering prompt data; add data-retention and deletion clauses.',
      'Ask for model documentation and license-clean outputs; add prompt-caching and fine-tuning data to the classified data inventory.',
      'Pin model versions, monitor upstream changes, and re-run validation when a vendor bumps a model or changes guardrails.',
    ],
    verify: [
      'AI vendor tiering matrix, executed DPAs, GPAI document requests, and model-version pinning configuration are inspectable.',
      'When a foundation-model vendor changes a referenced model, what triggers re-validation in the company?',
      'Which tools send customer PII to third-party LLMs today, and is each one covered by a DPA?',
    ],
  },
  {
    title: 'AML / Financial-Crime Transaction Monitoring',
    badge: 'Financial Crime',
    icon: Landmark,
    color: 'purple',
    scenario:
      'A payments company replaces rules-based AML screening with an ML classifier that flags suspicious transactions and controls alert volumes feeding the compliance investigation queue.',
    risks: [
      'Model risk per SR 11-07: AML models at banks and payment institutions are subject to formal model-risk management — development, independent validation, and execution governance are regulatory expectations.',
      'Bias and disparate impact: alert-tuning choices can over-flag legitimate low-income or minority customers (false positives) while under-performance misses true positives — dual harm plus discrimination and financial-crime exposure.',
      'Assistive models still shape outcomes: the model normally feeds human investigations, but the effective decision rests on how it guides the queue, so explainability and auditability are mandatory.',
      'EU AI Act: AI for evaluating or assessing risk in insurance and financial-crime screening (and biometrics) falls into high-risk categories in Annex III.',
      'Logging: evidence of why an alert fired must persist for regulators over the retention windows that apply.',
    ],
    response: [
      'Apply the SR 11-07 lifecycle: clear objectives, independent validation, documented assumptions, and a champion-challenger comparison against the previous rules baseline.',
      'Measure and mitigate disparate impact: monitor alert-rate parity across protected cohorts, document any justified variance, and set thresholds explicitly.',
      'Keep the human in the decision point: flag dispositions, a reason taxonomy, and override/junk/unable-to-act codes that feed back into model retraining.',
      'Persist model-input/output evidence per decision for audit and regulator review, aligned to the retention rules that apply.',
      'Prepare explainability artifacts (feature attributions, decision-rule summaries) so an investigator can articulate why a counterparty was flagged.',
    ],
    verify: [
      'Validation report, threshold-configuration history, disposition taxonomy, and audit-trail retention are inspectable.',
      'What was the last false-positive-rate drift, which cohort drove it, and who owns the retraining trigger?',
      'Is the human-override rate measured, and do overrides feed the model — is there a closed learning loop with a named accountable owner?',
    ],
  },
];

const COLORS = {
  indigo: { box: 'border-indigo-100 dark:border-indigo-800', header: 'bg-indigo-50 dark:bg-indigo-900/30', title: 'text-indigo-700 dark:text-indigo-300', chip: 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300 dark:border-indigo-800' },
  emerald: { box: 'border-emerald-100 dark:border-emerald-800', header: 'bg-emerald-50 dark:bg-emerald-900/30', title: 'text-emerald-700 dark:text-emerald-300', chip: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800' },
  amber: { box: 'border-amber-100 dark:border-amber-800', header: 'bg-amber-50 dark:bg-amber-900/30', title: 'text-amber-700 dark:text-amber-300', chip: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800' },
  cyan: { box: 'border-cyan-100 dark:border-cyan-800', header: 'bg-cyan-50 dark:bg-cyan-900/30', title: 'text-cyan-700 dark:text-cyan-300', chip: 'bg-cyan-50 text-cyan-700 border-cyan-200 dark:bg-cyan-900/30 dark:text-cyan-300 dark:border-cyan-800' },
  purple: { box: 'border-purple-100 dark:border-purple-800', header: 'bg-purple-50 dark:bg-purple-900/30', title: 'text-purple-700 dark:text-purple-300', chip: 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800' },
};

export default function AigpUseCases() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="aigp-use-cases" className="py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-text-dark-primary flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-violet-600 text-white flex items-center justify-center"><BrainCircuit className="w-6 h-6" /></span>
            IAPP AIGP in Practice — End-to-End Use Cases
          </h2>
          <p className="text-gray-600 dark:text-text-dark-secondary mt-3 max-w-3xl leading-relaxed">
            The AIGP (Artificial Intelligence Governance Professional) credential is IAPP's AI governance certification, accredited by
            ANAB and organized around six body-of-knowledge domains — <strong>AI fundamentals</strong>, <strong>legal/regulatory &amp;
            compliance</strong>, <strong>AI risk management &amp; governance</strong>, <strong>societal implications</strong>,{' '}
            <strong>communication &amp; collaboration</strong>, and <strong>embedding governance</strong>. Each use case below walks a
            real-world deployment end to end: the <span className="text-indigo-600 dark:text-indigo-300 font-semibold">risk exposure</span>,
            the <span className="text-emerald-600 dark:text-emerald-300 font-semibold">governance response</span> a certified professional
            drives, and the <span className="text-amber-600 dark:text-amber-300 font-semibold">verification</span> an auditor or customer
            asks for.
          </p>
        </div>

        <div className="grc-card p-5 mb-8 flex items-start gap-3">
          <Info className="w-5 h-5 text-violet-600 dark:text-violet-400 grc-card-icon shrink-0 mt-0.5" />
          <p className="text-sm text-gray-600 dark:text-text-dark-secondary leading-relaxed">
            <strong className="text-gray-800 dark:text-text-dark-primary">The AIGP exam:</strong> 100 scored questions in 3 hours, weighted
            ~30% legal/regulatory/compliance, ~25% AI risk management &amp; governance, ~15% societal implications, and the remainder across
            the fundamentals, collaboration, and embedding domains. Keep the credential current with 20 CPEs every two years (at least 8 in
            privacy). The controls in this playbook map to every one of those domains.
          </p>
        </div>

        {/* Use case cards */}
        <div className="space-y-4">
          {USE_CASES.map((uc, i) => {
            const c = COLORS[uc.color] || COLORS.indigo;
            const Icon = uc.icon;
            const open = openIndex === i;
            return (
              <div key={uc.title} className={`rounded-2xl border ${c.box} overflow-hidden transition-shadow hover:shadow-md`}>
                <button
                  onClick={() => setOpenIndex(open ? -1 : i)}
                  className="w-full flex items-start gap-3 p-5 text-left hover:bg-slate-50 dark:hover:bg-slate-800/40 transition"
                  aria-expanded={open}
                >
                  <span className={`shrink-0 w-10 h-10 rounded-xl ${c.header} ${c.title} flex items-center justify-center`}>
                    <Icon className="w-5 h-5" />
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center flex-wrap gap-2">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-text-dark-primary">{uc.title}</h3>
                      <span className={`inline-flex items-center text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full border ${c.chip}`}>{uc.badge}</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-text-dark-secondary mt-1 leading-relaxed">{uc.scenario}</p>
                  </div>
                  <ChevronRight className={`w-5 h-5 shrink-0 text-gray-400 mt-2 transition-transform ${open ? 'rotate-90' : ''}`} />
                </button>

                {open && (
                  <div className="px-5 pb-5 space-y-4">
                    <div className="rounded-xl bg-rose-50 border border-rose-100 p-4 dark:bg-rose-950/20 dark:border-rose-900/40">
                      <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-rose-700 dark:text-rose-300 mb-2">Why it's high-risk</p>
                      <ul className="space-y-1.5">
                        {uc.risks.map((r, ri) => (
                          <li key={ri} className="flex items-start gap-2 text-sm text-gray-700 dark:text-text-dark-secondary">
                            <span className="text-rose-500 dark:text-rose-400 mt-0.5">•</span>
                            <span>{r}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="rounded-xl bg-emerald-50 border border-emerald-100 p-4 dark:bg-emerald-950/20 dark:border-emerald-900/40">
                      <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-emerald-700 dark:text-emerald-300 mb-2">
                        Governance response — what an AIGP actually does
                      </p>
                      <ol className="space-y-1.5">
                        {uc.response.map((r, ri) => (
                          <li key={ri} className="flex items-start gap-2 text-sm text-gray-700 dark:text-text-dark-secondary">
                            <CheckCircle className="w-4 h-4 shrink-0 text-emerald-600 dark:text-emerald-400 mt-0.5" />
                            <span>{r}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                    <div className="rounded-xl bg-sky-50 border border-sky-100 p-4 dark:bg-sky-950/20 dark:border-sky-900/40">
                      <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-sky-700 dark:text-sky-300 mb-2">
                        Verification &amp; key questions
                      </p>
                      <ul className="space-y-1.5">
                        {uc.verify.map((q, qi) => (
                          <li key={qi} className="flex items-start gap-2 text-sm text-gray-700 dark:text-text-dark-secondary">
                            <span className="text-sky-500 dark:text-sky-400 mt-0.5">›</span>
                            <span>{q}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}