import { useState } from 'react';
import {
  GitBranch, Route, Building2, CloudCog, Code2, Users, ShieldCheck, FileSearch,
  CheckCircle, XCircle, ArrowRight, ArrowDown, Pointer, Minus, Plus, Info,
} from 'lucide-react';

const SCOPE_TREE = [
  {
    id: 'facility',
    icon: Building2,
    title: '1. Own facility vs remote / shared',
    question: 'Does the organization control its own office or facility — lease in its own name, managed entry, its own keys/badges?',
    hint: 'Decides A.7.1–7.4 (perimeter/entry/offices/monitoring), and feeds A.7.5–7.7.',
    branches: [
      {
        dir: 'yes',
        label: 'Yes — company controls the space',
        outcome: 'A.7.1–7.4 stay IN scope. Audit entry control, visitor handling, and monitoring as live controls, not exclusions.',
        checks: [
          'Badge / phone-entry system (logs available?)',
          'Visitor sign-in + escort policy (A.7.1)',
          'Office & room protection — who can walk in? (A.7.2, A.7.3)',
          'CCTV or monitoring where warranted (A.7.4)',
          'Clear-desk / clear-screen enforcement (A.7.7)',
        ],
        next: [
          {
            id: 'facility-y1',
            question: 'Is sensitive hardware hosted on-site — NAS, servers, backup appliances, hardware lab?',
            branches: [
              {
                dir: 'yes',
                label: 'Yes',
                outcome: 'A.7.5 (environmental), A.7.8 (equipment siting), A.7.10 (media), A.7.11 (utilities) stay in scope as physical controls.',
                checks: ['UPS/generator present and tested', 'Fire/water detection', 'Equipment physically locked down', 'Media handling + disposal process'],
              },
              {
                dir: 'no',
                label: 'No',
                outcome: 'A.7.5 and A.7.11 stay excludable (cloud provider covers facilities/utilities). Keep A.7.8 for endpoint devices and A.7.7 clear-screen.',
                checks: ['Cloud provider SLA cited in the SoA', 'Endpoint inventory via MDM'],
              },
            ],
          },
        ],
      },
      {
        dir: 'no',
        label: 'No — fully remote / co-working / landlord-controlled',
        outcome: 'A.7.1–7.4 and A.7.6 excluded — but you MUST name the compensating party (co-working landlord badging, CCTV operator). A bare “N/A” is not a defensible exclusion.',
        checks: [
          'Lease / co-working agreement states landlord-provided security',
          'CCTV operator + footage-retention named',
          'Exclusion written with a re-validate date',
        ],
        next: [
          {
            id: 'facility-n1',
            question: 'Is there ANY on-site equipment — office router, under-desk NAS, printed confidential documents?',
            branches: [
              {
                dir: 'yes',
                label: 'Yes',
                outcome: 'That equipment re-opens limited controls: A.7.10 (storage media), A.7.8 (device protection), and A.7.7 (clear-desk) for the shared space.',
                checks: ['On-prem device inventory', 'Physical access to the equipment', 'Printer / disposal of printed docs'],
              },
              {
                dir: 'no',
                label: 'No',
                outcome: 'Clean exclusion. Document the empty physical footprint in the asset register so the exclusion is provable.',
                checks: ['No facility assets listed in the asset register'],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'hosting',
    icon: CloudCog,
    title: '2. Where is production infrastructure hosted?',
    question: 'Is infrastructure fully cloud-hosted (AWS/GCP/Azure/Heroku), self-hosted (own data centers, colocation, on-prem), or hybrid?',
    hint: 'Drives A.7.8, A.7.11, A.7.12 and A.5.23 (cloud services). Check the client’s Streetsmart page if unsure, then confirm with the client.',
    branches: [
      {
        dir: 'yes',
        label: 'Cloud-hosted (majority of clients)',
        outcome: 'Defaults stand. A.7.8 / A.7.11 / A.7.12 excluded with provider SLA / multi-AZ citation. A.5.23 selected — check the cloud usage governance input.',
        checks: ['Provider SLA + ISO 27001/22301 attestations cited', 'Multi-region / multi-AZ design confirmed', 'A.5.23 column-F inputs updated'],
        next: [],
      },
      {
        dir: 'no',
        label: 'Self-hosted / colocated / on-prem',
        outcome: 'A.7.8, A.7.11, A.7.12 FLIP to Implemented and re-enter scope with Vanta test links. A.7.5 also likely re-enters for facilities protection.',
        checks: [
          'Data center / server room physical access control',
          'UPS + power redundancy, tested (A.7.11)',
          'Climate / water / fire detection (A.7.5)',
          'Cable-routing + physical protection (A.7.12)',
        ],
        next: [
          {
            id: 'hosting-n1',
            question: 'Does the organization also run on-prem networking at the office — router, switch, network closet?',
            branches: [
              {
                dir: 'yes',
                label: 'Yes',
                outcome: 'A.7.12 stays in scope for the office too. Verify physical access to the network room and documented cabling.',
                checks: ['Network closet access log', 'Cabling documentation'],
              },
              {
                dir: 'no',
                label: 'No',
                outcome: 'A.7.12 applies only to the hosting site; office has no network infrastructure to protect.',
                checks: ['Office network = ISP router only (document it)'],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'development',
    icon: Code2,
    title: '3. Does the organization develop software?',
    question: 'Does the organization write, maintain, or customize software at all — in-house team, outsourced shops, or nothing?',
    hint: 'Gates the whole Secure Development cluster A.8.25–8.30 and A.8.24 (crypto in dev/test).',
    branches: [
      {
        dir: 'yes',
        label: 'Yes — development happens',
        outcome: 'A.8.25–8.30 selected (SDLC, security testing, secure coding). Walk the pipeline, not just the policy.',
        checks: [
          'CI/CD security gates: SAST, dependency scanning, secrets scan',
          'Code review + branch protection',
          'Environment separation: prod vs staging vs dev',
          'Test data — anonymized, never real PII/PHI/PCI',
        ],
        next: [
          {
            id: 'dev-y1',
            question: 'Who writes the code — in-house, outsourced dev shops/freelancers, or mixed?',
            branches: [
              {
                dir: 'yes',
                label: 'Outsourced (fully or partially)',
                outcome: 'A.8.30 in the tightest configuration: security clauses + right-to-audit in the contract, their code through the same CI gates, and access revoked at engagement end.',
                checks: ['Vendor contract security requirements', 'Right-to-audit clause', 'Vendor access scoped + timed + revoked'],
              },
              {
                dir: 'no',
                label: 'In-house only',
                outcome: 'A.8.30 stays selected with “no external development” in column F — do NOT silently exclude it; a first contractor flips it back into the tight config.',
                checks: ['“No external development” stated in the SoA'],
              },
            ],
          },
        ],
      },
      {
        dir: 'no',
        label: 'No — no development of any kind',
        outcome: 'A.8.25–8.30 excludable with written rationale (“the organization does not develop software”). A.8.24 partial exclusion is also defensible.',
        checks: [
          'Rationale written, not a bare N/A',
          'A.8.24 limited to supplied tools only',
          'Re-validate exclusion before the first dev hire',
        ],
        next: [],
      },
    ],
  },
  {
    id: 'suppliers',
    icon: Users,
    title: '4. Do third parties touch systems or data?',
    question: 'Do contractors, vendors, or SaaS providers access your systems, host your data, or process information on your behalf?',
    hint: 'Gates supplier security A.5.19–5.23. Nearly every startup answers YES (IDP, hosting, email, payroll, analytics) — treat a NO with suspicion.',
    branches: [
      {
        dir: 'yes',
        label: 'Yes — suppliers in scope',
        outcome: 'A.5.19–5.23 selected. The question is maturity: inventory + agreements + review cadence.',
        checks: [
          'One-page vendor inventory with data-types touched',
          'DPA/BAA or contract security clauses in place',
          'Supplier risk criteria defined (A.5.19)',
          'Re-evaluation cadence, not just onboarding',
        ],
        next: [
          {
            id: 'sup-y1',
            question: 'Do any third parties HOST or PROCESS your data (cloud hosting, data processors, payroll/HR processors)?',
            branches: [
              {
                dir: 'yes',
                label: 'Yes',
                outcome: 'A.5.23 (cloud services) and A.5.20 (addressing security within supplier agreements) are the key inputs. Map each processor to the data they hold.',
                checks: ['Processor registre with data categories', 'Sub-processor flow documented', 'Right-to-audit / SOC2 reports requested'],
              },
              {
                dir: 'no',
                label: 'No',
                outcome: 'Suppliers are pure tooling (no data processing). Supplier controls stay lightweight but documented.',
                checks: ['Vendor list limited to tooling only'],
              },
            ],
          },
        ],
      },
      {
        dir: 'no',
        label: 'No — no third parties (rare)',
        outcome: 'A.5.19–5.23 excludable with rationale, but challenge this aggressively — SSO providers, email hosts, and hosting all count as suppliers.',
        checks: ['Confirm zero SaaS / zero processors (unlikely)', 'Exclusion drafted and owner-signed'],
        next: [],
      },
    ],
  },
  {
    id: 'sensitive-data',
    icon: ShieldCheck,
    title: '5. Do you process regulated or special-category data?',
    question: 'Does the organization process regulated or sensitive data — health (PHI), financial, cardholder (PCI), children’s data, or EU personal data?',
    hint: 'Gates A.5.34–5.36 (privacy controls) and adds legal/framework interplay beyond ISO 27001 alone.',
    branches: [
      {
        dir: 'yes',
        label: 'Yes — regulated data in scope',
        outcome: 'A.5.34, A.5.35, A.5.36 selected. Add the jurisdiction-specific controls on top: GDPR DPIA/DPO posture, PCI-DSS if cards, HIPAA/BAA if PHI, residency obligations.',
        checks: [
          'Data protection / privacy policy exists',
          'Breach notification runbook matches legal windows (72h GDPR, etc.)',
          'Retention + deletion schedule documented',
          'DPIA performed where required',
        ],
        next: [],
      },
      {
        dir: 'no',
        label: 'No — baseline data only',
        outcome: 'Privacy controls scoped to a baseline. Confirm no residency, notification, or special-category obligations before finalizing exclusions.',
        checks: ['Confirm no card data / health data / EU data processed', 'Baseline privacy controls still selected'],
        next: [],
      },
    ],
  },
];

function BranchBlock({ branch, colors, depth }) {
  const isYes = branch.dir === 'yes';
  const Accent = isYes ? CheckCircle : XCircle;
  return (
    <div className="relative">
      {depth > 0 && (
        <span className="absolute -left-4 top-0 bottom-0 w-px bg-slate-200 dark:bg-slate-700" aria-hidden="true" />
      )}
      <div className={`rounded-xl border ${isYes ? 'border-emerald-200 bg-emerald-50/60 dark:border-emerald-800/60 dark:bg-emerald-900/10' : 'border-rose-200 bg-rose-50/60 dark:border-rose-800/60 dark:bg-rose-900/10'}`}>
        <div className={`px-4 py-3 border-b ${isYes ? 'border-emerald-100 dark:border-emerald-800/40' : 'border-rose-100 dark:border-rose-800/40'}`}>
          <p className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wide ${isYes ? 'text-emerald-700 dark:text-emerald-300' : 'text-rose-700 dark:text-rose-300'}`}>
            <Accent className="w-4 h-4" />
            {isYes ? 'Yes →' : 'No →'} <span className="normal-case tracking-normal">{branch.label}</span>
          </p>
        </div>
        <div className="px-4 py-3 space-y-3">
          <p className="text-sm text-gray-700 dark:text-text-dark-secondary leading-relaxed">{branch.outcome}</p>
          {Array.isArray(branch.checks) && branch.checks.length > 0 && (
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wide text-gray-500 dark:text-text-dark-muted mb-1.5">Then walk these checks</p>
              <ul className="space-y-1">
                {branch.checks.map((c, i) => (
                  <li key={i} className="flex items-start gap-1.5 text-xs text-gray-600 dark:text-text-dark-secondary leading-relaxed">
                    <span className={`mt-0.5 shrink-0 ${isYes ? 'text-emerald-500' : 'text-rose-500'}`}>›</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {Array.isArray(branch.next) && branch.next.length > 0 && (
            <div className="space-y-3 pt-1">
              {branch.next.map(n => (
                <div key={n.id} className={`rounded-lg border border-slate-200 bg-white dark:bg-slate-900/60 px-4 py-3 ${isYes ? 'border-emerald-100' : 'border-rose-100'}`}>
                  <p className="flex items-start gap-2 text-sm font-semibold text-gray-800 dark:text-text-dark-primary leading-snug">
                    <Pointer className={`w-4 h-4 shrink-0 mt-0.5 ${isYes ? 'text-emerald-600' : 'text-rose-600'}`} />
                    {n.question}
                  </p>
                  <div className="mt-3 grid sm:grid-cols-2 gap-2">
                    {n.branches.map(b => (
                      <BranchBlock key={b.dir + n.id} branch={b} colors={colors} depth={depth + 1} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function PhaseStep({ step, title, tag, icon: Icon, checks }) {
  return (
    <li className="rounded-xl border border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800/40 p-4">
      <div className="flex items-center gap-2 flex-wrap">
        <span className="shrink-0 w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center">{step}</span>
        <span className="shrink-0 w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center">
          <Icon className="w-4 h-4" />
        </span>
        <h4 className="text-sm font-bold text-gray-900 dark:text-text-dark-primary">{title}</h4>
        <span className="ml-auto text-[10px] font-semibold uppercase tracking-wider text-gray-500 dark:text-text-dark-muted">{tag}</span>
      </div>
      <ul className="mt-3 space-y-1.5">
        {checks.map((c, i) => (
          <li key={i} className="flex items-start gap-1.5 text-xs text-gray-600 dark:text-text-dark-secondary leading-relaxed">
            <span className="mt-0.5 shrink-0 text-indigo-500 dark:text-indigo-400">›</span>
            <span>{c}</span>
          </li>
        ))}
      </ul>
    </li>
  );
}

function FlowArrow() {
  return (
    <li aria-hidden="true" className="flex justify-center py-0.5">
      <span className="w-7 h-7 rounded-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-400 dark:text-text-dark-muted flex items-center justify-center">
        <ArrowDown className="w-4 h-4" />
      </span>
    </li>
  );
}

export default function ScopeWalkthrough() {
  const [collapsed, setCollapsed] = useState(() => { const init = {}; SCOPE_TREE.forEach(n => { init[n.id] = true; }); return init; });
  const toggle = (id) => setCollapsed(prev => ({ ...prev, [id]: !prev[id] }));
  const anyCollapsed = Object.values(collapsed).some(Boolean);
  const collapseAll = () => { const next = {}; SCOPE_TREE.forEach(n => { next[n.id] = true; }); setCollapsed(next); };
  const expandAll = () => setCollapsed({});

  return (
    <section id="iso27001-scope" className="py-8">
      <div className="container mx-auto px-4">
        <div className="grc-card p-6">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-text-dark-primary flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center"><Route className="w-6 h-6" /></span>
              ISO 27001 — Scoping Walkthrough (Decision Tree)
            </h2>
            <p className="text-gray-600 dark:text-text-dark-secondary mt-3 max-w-3xl leading-relaxed">
              The Scoping walkthrough is where the SoA is actually shaped. Ask these questions in order during the client walkthrough —
              each branch directs which Annex A controls stay <em>in scope</em>, which become <em>exclusions with written rationale</em>,
              and which flip back in when the answer changes. <strong>Walk every branch to its leaf before finalizing column F.</strong>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 mb-8">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border border-emerald-200 text-emerald-700 dark:border-emerald-800 dark:text-emerald-300">
              <CheckCircle className="w-3.5 h-3.5" /> Green = YES branch
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border border-rose-200 text-rose-700 dark:border-rose-800 dark:text-rose-300">
              <XCircle className="w-3.5 h-3.5" /> Rose = NO branch
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border border-slate-200 text-gray-600 dark:border-slate-700 dark:text-text-dark-secondary">
              <ArrowRight className="w-3.5 h-3.5" /> Follow nested branches until the leaf
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border border-indigo-200 text-indigo-700 dark:border-indigo-800 dark:text-indigo-300">
              <Minus className="w-3.5 h-3.5" /> Minimize any question
            </span>
            <button
              onClick={anyCollapsed ? expandAll : collapseAll}
              className="ml-auto inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border border-slate-300 text-gray-700 dark:border-slate-600 dark:text-text-dark-secondary hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              {anyCollapsed ? <><Plus className="w-3.5 h-3.5" /> Expand all</> : <><Minus className="w-3.5 h-3.5" /> Minimize all</>}
            </button>
          </div>

          {/* What to expect + phased flow */}
          <div className="mb-8 max-w-3xl">
            <div className="rounded-xl border border-indigo-100 bg-indigo-50/50 dark:border-indigo-800/60 dark:bg-indigo-900/10 px-4 py-3 flex items-start gap-3 mb-5">
              <Info className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
              <p className="text-xs text-gray-700 dark:text-text-dark-secondary leading-relaxed">
                <strong className="text-gray-900 dark:text-text-dark-primary">What to expect:</strong> ~45 min, five questions.
                Each answer turns straight into SoA outcomes — in scope, excluded with rationale, or flipped when the answer changes.
                You leave with column F drafted, a decision summary, and evidence owners named.
              </p>
            </div>

            <ol className="space-y-0">
              <PhaseStep
                step={1}
                title="Pre-walkthrough"
                tag="Before the call"
                icon={Pointer}
                checks={[
                  'Book the real decision-maker — founder, CISO, or ops lead with the authority to answer.',
                  "Pull the client's knowledge base answers and pre-answer what you can.",
                  'Open the SoA (columns C–F) beside this tree; add placeholder rows for the domains you expect to go in or out.',
                ]}
              />
              <FlowArrow />
              <PhaseStep
                step={2}
                title="During the scoping call"
                tag="Live walkthrough"
                icon={Route}
                checks={[
                  'Ask Q1–Q5 in order; drive every branch to its leaf — "maybe" and "it depends" are not answers.',
                  'Record each answer, the branch it takes, and the evidence + owner for every branch.',
                  'Capture exclusions as written rationale + named compensating control, never bare "N/A".',
                  "Verify hosting & vendor answers against the client's knowledge base, then confirm orally.",
                  'Flag and re-walk any branch the client changes — new office, server, dev, or processor.',
                ]}
              />
              <FlowArrow />
              <PhaseStep
                step={3}
                title="After the call"
                tag="Wrap-up"
                icon={CheckCircle}
                checks={[
                  'Write column F from the recorded branches; mark each row in scope or excluded.',
                  'Send the client the decisions, exclusions, and assigned evidence owners.',
                  'List open evidence gaps — who fetches what, by when; book a short follow-up for anything unresolved.',
                ]}
              />
            </ol>
          </div>

          <ol className="space-y-8">
            {SCOPE_TREE.map((node, i) => {
              const NodeIcon = node.icon;
              const isCollapsed = !!collapsed[node.id];
              return (
                <li key={node.id}>
                  <div className={`rounded-xl border border-indigo-100 bg-indigo-50/50 dark:border-indigo-800/60 dark:bg-indigo-900/10 px-4 py-3 mb-4 flex items-start gap-3 ${isCollapsed ? '' : ''}`}>
                    <span className="shrink-0 w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center mt-0.5">
                      <NodeIcon className="w-4 h-4" />
                    </span>
                    <div className="flex-1 min-w-0">
                      <h3 className="grc-card-title font-bold text-navy-900 dark:text-text-dark-primary flex items-center gap-2 flex-wrap">
                        {node.title}
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-gray-500 dark:bg-slate-800 dark:text-text-dark-secondary uppercase tracking-wide">Q{i + 1}</span>
                      </h3>
                      <p className="text-sm font-semibold text-gray-800 dark:text-text-dark-primary mt-1">{node.question}</p>
                      <p className="text-xs text-gray-500 dark:text-text-dark-muted mt-1 flex items-center gap-1">
                        <GitBranch className="w-3.5 h-3.5" /> {node.hint}
                      </p>
                    </div>
                    <button
                      onClick={() => toggle(node.id)}
                      aria-expanded={!isCollapsed}
                      aria-label={isCollapsed ? `Expand ${node.title}` : `Minimize ${node.title}`}
                      className="shrink-0 inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border border-indigo-200 text-indigo-700 dark:border-indigo-800 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/40 transition mt-0.5"
                    >
                      {isCollapsed ? <><Plus className="w-3.5 h-3.5" /> Expand</> : <><Minus className="w-3.5 h-3.5" /> Minimize</>}
                    </button>
                  </div>
                  {!isCollapsed && (
                    <div className="grid sm:grid-cols-2 gap-3">
                      {node.branches.map(b => (
                        <BranchBlock key={b.dir} branch={b} colors={{}} depth={0} />
                      ))}
                    </div>
                  )}
                </li>
              );
            })}
          </ol>

          <div className="mt-8 rounded-lg border border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800/40 px-4 py-3">
            <p className="text-xs text-gray-600 dark:text-text-dark-secondary leading-relaxed flex items-start gap-2">
              <FileSearch className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
              <span>
                <strong>How to use this in the walkthrough:</strong> record each answer and the branch it takes. Whatever direction the
                branch goes, you still must capture evidence in the SoA — an exclusion is only as good as the written reason and the named
                compensating control. Re-run the tree whenever the client adds an office, a server, a dev, or a data processor. When in
                doubt about hosting or vendors, check the client’s Streetsmart page, then confirm with the client before finalizing.
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}