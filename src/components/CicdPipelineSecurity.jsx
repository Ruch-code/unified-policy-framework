import { useState } from 'react';
import { GitBranch, Hammer, FlaskConical, Package, Rocket, Activity, Settings2, Bot, ChevronDown, ClipboardCheck, Wrench, Target } from 'lucide-react';

/*
 * End-to-end CI/CD pipeline security: what each check is, how auditors test it,
 * typical tools, framework mapping, and what changes when AI writes or ships code.
 * Tool names are examples only, not endorsements.
 */

const STAGES = [
  {
    id: 'source', name: 'Source & code review', Icon: GitBranch,
    goal: 'No change reaches the main branch without review by someone other than the author.',
    checks: [
      { what: 'Branch protection on main and release branches', detail: 'Direct pushes blocked, required pull request, required status checks, no force-push, rules also apply to admins.' },
      { what: 'Peer review and code owners', detail: 'At least one approval from someone who is not the author; code owners required for sensitive paths such as auth, payments and infrastructure.' },
      { what: 'Separation of duties', detail: 'The author cannot approve or merge their own change into production.' },
      { what: 'Commit identity', detail: 'Commits tied to company SSO accounts; signed commits for high-assurance repositories.' },
    ],
    test: ['ToD: inspect branch protection settings for every in-scope repository, including the "apply to administrators" option.', 'OE: sample merged pull requests from the period and confirm a non-author approval exists before merge.', 'OE: search for direct pushes or admin bypasses to main during the period and ask for justification.'],
    tools: ['GitHub branch rules and CODEOWNERS', 'GitLab protected branches and approval rules', 'Bitbucket branch permissions', 'Azure Repos branch policies'],
    map: 'SOC 2 CC8.1 | ISO 27001 A.8.32, A.8.4 | PCI DSS 6.5',
  },
  {
    id: 'build', name: 'Build & static checks', Icon: Hammer,
    goal: 'Known-bad code, secrets and vulnerable dependencies are caught before merge.',
    checks: [
      { what: 'SAST (static application security testing)', detail: 'Scans source for injection, unsafe functions and insecure patterns on every pull request.' },
      { what: 'SCA (dependency scanning)', detail: 'Flags open-source libraries with known vulnerabilities or disallowed licences.' },
      { what: 'Secret scanning', detail: 'Blocks API keys, tokens and passwords from being committed; push protection preferred over after-the-fact alerts.' },
      { what: 'IaC scanning', detail: 'Checks Terraform, CloudFormation, Kubernetes manifests for public buckets, open ports and missing encryption.' },
      { what: 'Container image scanning', detail: 'Scans base images and layers for vulnerable packages before images are pushed.' },
    ],
    test: ['ToD: confirm the scans are required status checks, not optional jobs that can fail silently.', 'OE: sample pull requests and show the scan ran and passed, or that findings were triaged.', 'OE: compare open high or critical findings against the remediation SLA.'],
    tools: ['SAST: CodeQL, Semgrep, SonarQube', 'SCA: Dependabot, Snyk, Renovate, OWASP Dependency-Check', 'Secrets: GitHub secret scanning, gitleaks, TruffleHog', 'IaC: Checkov, tfsec, KICS', 'Containers: Trivy, Grype'],
    map: 'SOC 2 CC7.1, CC8.1 | ISO 27001 A.8.28, A.8.8, A.8.9 | PCI DSS 6.2, 6.3',
  },
  {
    id: 'test', name: 'Testing', Icon: FlaskConical,
    goal: 'Changes are functionally and security tested before they reach production.',
    checks: [
      { what: 'Automated unit and integration tests', detail: 'Required to pass before merge; skipped tests are visible and explained.' },
      { what: 'DAST (dynamic testing)', detail: 'Scans a running staging build for issues static tools miss, such as auth and header problems.' },
      { what: 'Staging that mirrors production', detail: 'Separate environment and credentials; no production personal data unless masked.' },
      { what: 'Release QA sign-off', detail: 'For larger releases, a recorded manual or exploratory test before deploy.' },
    ],
    test: ['ToD: show testing requirements in the change management procedure.', 'OE: sample changes and show test runs; auditors often ask about skipped or disabled tests.', 'ToD: show staging and production are separated (accounts, networks, data).'],
    tools: ['Test runners in GitHub Actions, GitLab CI, Jenkins, CircleCI, Azure Pipelines', 'DAST: OWASP ZAP, Burp Suite Enterprise', 'Data masking tools for test data'],
    map: 'SOC 2 CC8.1 | ISO 27001 A.8.29, A.8.31, A.8.33 | PCI DSS 6.2.4, 6.5.3',
  },
  {
    id: 'artifact', name: 'Artifacts & supply chain', Icon: Package,
    goal: 'What is deployed is exactly what was built and tested, from known components.',
    checks: [
      { what: 'Immutable, versioned artifacts', detail: 'Build once, promote the same artifact through environments; never rebuild for production.' },
      { what: 'Artifact signing and provenance', detail: 'Sign images and packages; record build provenance so tampering can be detected.' },
      { what: 'SBOM (software bill of materials)', detail: 'A list of components in each release, used for vulnerability response and customer requests.' },
      { what: 'Pinned dependencies and trusted registries', detail: 'Lock files, private registry mirrors, no pulling unpinned images from public sources at deploy time.' },
    ],
    test: ['ToD: show the signing and verification step in pipeline configuration.', 'OE: pick a production release and trace it back to its build, commit and approval.', 'ToD: produce the SBOM for a sampled release.'],
    tools: ['Signing: Sigstore cosign, Notation', 'Provenance: SLSA framework, in-toto', 'SBOM: Syft, CycloneDX tools', 'Registries: Artifactory, Nexus, cloud container registries'],
    map: 'SOC 2 CC8.1, CC9.2 | ISO 27001 A.5.21, A.8.19, A.8.32 | PCI DSS 6.3.2',
  },
  {
    id: 'deploy', name: 'Deployment', Icon: Rocket,
    goal: 'Only approved changes reach production, through the pipeline, with a record and a way back.',
    checks: [
      { what: 'Production deploy approval', detail: 'Protected environments with required reviewers, or deploy only from approved, merged commits.' },
      { what: 'No manual production changes', detail: 'Console or SSH changes are restricted; break-glass access is logged and reviewed.' },
      { what: 'Short-lived deploy credentials', detail: 'OIDC federation from the pipeline to the cloud instead of long-lived keys stored as secrets.' },
      { what: 'Emergency change (hotfix) path', detail: 'Named emergency approver, minimum test set, retrospective approval within a fixed window.' },
      { what: 'Rollback and progressive delivery', detail: 'Canary or blue-green releases and a tested rollback procedure.' },
    ],
    test: ['ToD: inspect environment protection rules and who can approve production deploys.', 'OE: reconcile the list of production deployments against approved changes for the period.', 'OE: sample hotfixes and check for the emergency record and retrospective approval.', 'OE: review cloud audit logs for changes made outside the pipeline.'],
    tools: ['Environments and approvals in GitHub Actions, GitLab, Azure DevOps', 'GitOps: Argo CD, Flux', 'Cloud OIDC roles (AWS, Azure, Google Cloud)', 'Feature flags: LaunchDarkly, Unleash'],
    map: 'SOC 2 CC8.1, CC6.1 | ISO 27001 A.8.32, A.8.2, A.8.31 | PCI DSS 6.5',
  },
  {
    id: 'monitor', name: 'Post-deploy monitoring', Icon: Activity,
    goal: 'Bad changes are detected quickly and linked back to the change that caused them.',
    checks: [
      { what: 'Deployment markers in monitoring', detail: 'Each deploy is visible on dashboards so incidents can be tied to a change.' },
      { what: 'Change failure tracking', detail: 'Failed changes and rollbacks are recorded and reviewed.' },
      { what: 'Release notes or customer communication', detail: 'Material changes communicated to customers where commitments require it.' },
    ],
    test: ['OE: for incidents in the period, show the related change and its root cause analysis.', 'OE: sample release notes or change communications.'],
    tools: ['Datadog, Grafana, New Relic, cloud-native monitoring', 'Incident tools: PagerDuty, Opsgenie'],
    map: 'SOC 2 CC7.2, CC7.3, CC2.3 | ISO 27001 A.8.16, A.5.26',
  },
  {
    id: 'pipeline', name: 'Securing the pipeline itself', Icon: Settings2,
    goal: 'The pipeline cannot be used to bypass the controls above.',
    checks: [
      { what: 'Pipeline configuration is change-controlled', detail: 'Workflow files are protected by code owners; changes to them need review like any code.' },
      { what: 'Least-privilege pipeline tokens', detail: 'Read-only default token permissions; third-party actions pinned to a commit hash.' },
      { what: 'Hardened runners', detail: 'Ephemeral runners for untrusted code; self-hosted runners isolated from production.' },
      { what: 'Pipeline audit logs', detail: 'Who changed settings, secrets or protections, retained and reviewed.' },
    ],
    test: ['ToD: review who can change branch protection, environments and pipeline secrets.', 'OE: review audit logs for changes to protections during the period.'],
    tools: ['OpenSSF Scorecard', 'StepSecurity Harden-Runner', 'Platform audit logs'],
    map: 'SOC 2 CC6.1, CC8.1 | ISO 27001 A.8.2, A.8.4, A.8.15',
  },
];

const AI_POINTS = [
  { t: 'AI-written code is still a change', d: 'Code suggested by an assistant or written by an agent goes through the same pull request, scans, tests and approvals as human code. Auditors will not accept "the AI wrote it" as a reason for a lighter path.' },
  { t: 'A human must approve, and cannot be replaced by the AI', d: 'An AI reviewer can help, but a named human approval is still required. If an agent opens the pull request, the person who triggered it should not be the only approver; treat them as the author.' },
  { t: 'Label AI-authored changes', d: 'Use a bot account, label or commit trailer so AI-generated changes can be filtered and sampled. Auditors increasingly ask for a population of agent-authored pull requests.' },
  { t: 'Scope agent permissions tightly', d: 'Agents get their own identity with access to specific repositories, no admin rights, no ability to change branch protection, and no production deploy rights.' },
  { t: 'Watch for prompt injection through the repo', d: 'Issues, comments, docs and dependencies can contain instructions that steer an agent. Restrict what agents can read and act on, and keep human review of their output.' },
  { t: 'Scan harder, not softer', d: 'AI code can include outdated or insecure patterns, hallucinated packages (a typosquatting risk) and copied code with licence obligations. SAST, SCA and licence checks are mandatory gates.' },
  { t: 'Prompts, models and configs are changes too', d: 'For AI features, a new system prompt, model version or retrieval source changes behaviour. Version them in the repo and run evaluation tests (accuracy, safety, prompt injection) as a pipeline gate.' },
  { t: 'Keep AI use within policy', d: 'Approved assistants only, enterprise terms that exclude training on your code, and no secrets or customer data pasted into prompts. Link to ISO 42001 and ISO 27090 where you use them.' },
];

const AUDIT_EVIDENCE = [
  'Change management procedure covering standard, normal and emergency changes',
  'Branch protection and environment protection settings for each in-scope repository (dated)',
  'Population of merged pull requests and production deploys for the period',
  'For sampled changes: approval by a non-author, passing checks, test results, deploy record',
  'Scan results and the triage record for findings above your threshold',
  'Hotfix records with retrospective approval',
  'List of agent or bot accounts, their permissions, and a sample of their pull requests with human approval',
];

export default function CicdPipelineSecurity() {
  const [open, setOpen] = useState('source');
  return (
    <div className="space-y-5">
      <div className="bg-white border border-indigo-200 dark:border-indigo-800 rounded-2xl p-5">
        <h4 className="font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-1">
          <span className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300 flex items-center justify-center"><GitBranch className="w-4 h-4" /></span>
          CI/CD Pipeline Security, End to End
        </h4>
        <p className="text-sm text-gray-600 dark:text-slate-300 max-w-3xl">
          Every change takes the same path: source, build, test, artifact, deploy, monitor. Each stage has checks that should run automatically, and auditors test both the design (are the checks required?) and operation (did they run for the changes in the period?). Open a stage to see what it is, how it is tested, and typical tools.
        </p>
        <div className="flex flex-wrap items-center gap-1.5 mt-4" aria-label="Pipeline stages">
          {STAGES.map((s, i) => (
            <div key={s.id} className="flex items-center gap-1.5">
              <button type="button" onClick={() => setOpen(s.id)} aria-pressed={open === s.id}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${open === s.id ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-700 border-gray-200 hover:border-indigo-300 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-600'}`}>
                <s.Icon className="w-3.5 h-3.5" /> {s.name}
              </button>
              {i < STAGES.length - 1 && <span className="text-gray-400 dark:text-slate-500 text-xs">-&gt;</span>}
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {STAGES.map(s => {
          const isOpen = open === s.id;
          return (
            <div key={s.id} className="bg-white rounded-2xl border border-gray-200 dark:border-slate-700 overflow-hidden">
              <button type="button" onClick={() => setOpen(isOpen ? null : s.id)} aria-expanded={isOpen}
                className="w-full flex items-center gap-3 p-4 text-left">
                <span className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-200 flex items-center justify-center shrink-0"><s.Icon className="w-4 h-4" /></span>
                <span className="flex-1">
                  <span className="block font-bold text-sm text-gray-900 dark:text-white">{s.name}</span>
                  <span className="block text-xs text-gray-600 dark:text-slate-300">{s.goal}</span>
                </span>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
              </button>
              {isOpen && (
                <div className="px-4 pb-4 grid lg:grid-cols-3 gap-3">
                  <div className="lg:col-span-3 rounded-lg p-3 bg-slate-50 border border-slate-200 dark:bg-slate-800/60 dark:border-slate-700">
                    <p className="text-[11px] font-bold uppercase tracking-wide text-slate-600 dark:text-slate-300 mb-2 flex items-center gap-1.5"><Target className="w-3.5 h-3.5" /> What the checks are</p>
                    <div className="grid md:grid-cols-2 gap-2">
                      {s.checks.map(c => (
                        <div key={c.what} className="text-sm">
                          <p className="font-semibold text-gray-900 dark:text-white">{c.what}</p>
                          <p className="text-gray-600 dark:text-slate-300">{c.detail}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="lg:col-span-2 rounded-lg p-3 bg-emerald-50 border border-emerald-200 dark:bg-emerald-900/30 dark:border-emerald-800">
                    <p className="text-[11px] font-bold uppercase tracking-wide text-emerald-800 dark:text-emerald-300 mb-1 flex items-center gap-1.5"><ClipboardCheck className="w-3.5 h-3.5" /> How auditors test it</p>
                    <ul className="text-sm text-gray-700 dark:text-slate-200 space-y-1">{s.test.map(t => <li key={t} className="flex gap-2"><span>-</span>{t}</li>)}</ul>
                  </div>
                  <div className="rounded-lg p-3 bg-blue-50 border border-blue-200 dark:bg-blue-900/30 dark:border-blue-800">
                    <p className="text-[11px] font-bold uppercase tracking-wide text-blue-800 dark:text-blue-300 mb-1 flex items-center gap-1.5"><Wrench className="w-3.5 h-3.5" /> Typical tools</p>
                    <ul className="text-sm text-gray-700 dark:text-slate-200 space-y-1">{s.tools.map(t => <li key={t} className="flex gap-2"><span>-</span>{t}</li>)}</ul>
                  </div>
                  <p className="lg:col-span-3 text-xs text-gray-500 dark:text-slate-400"><span className="font-semibold">Maps to:</span> {s.map}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-2xl border border-violet-200 dark:border-violet-800 p-5">
        <h4 className="font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-1">
          <span className="w-8 h-8 rounded-lg bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300 flex items-center justify-center"><Bot className="w-4 h-4" /></span>
          When AI writes or ships the change
        </h4>
        <p className="text-sm text-gray-600 dark:text-slate-300 mb-4 max-w-3xl">Coding assistants and agents speed up changes but do not change what auditors expect. The pipeline above is the control; these points keep AI-assisted changes inside it.</p>
        <div className="grid md:grid-cols-2 gap-3">
          {AI_POINTS.map(p => (
            <div key={p.t} className="rounded-lg p-3 bg-violet-50 border border-violet-200 dark:bg-violet-900/30 dark:border-violet-800">
              <p className="font-semibold text-sm text-violet-900 dark:text-violet-200">{p.t}</p>
              <p className="text-sm text-gray-700 dark:text-slate-200 mt-1">{p.d}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 dark:border-slate-700 p-5">
        <h4 className="font-bold text-gray-900 dark:text-white mb-2">Audit evidence checklist</h4>
        <ul className="text-sm text-gray-700 dark:text-slate-200 space-y-1.5">
          {AUDIT_EVIDENCE.map(e => <li key={e} className="flex gap-2"><span className="text-indigo-600 dark:text-indigo-300">-</span>{e}</li>)}
        </ul>
        <p className="text-xs text-gray-500 dark:text-slate-400 mt-3">Tool names are common examples, not recommendations. Equivalent tools meet the same control.</p>
      </div>
    </div>
  );
}
