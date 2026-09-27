import React, { useState } from 'react';
import { Radar, FileClock, Siren, ShieldAlert, CheckCircle2, Activity, Database, Clock, FileSearch, GitBranch, Repeat, Search, ShieldCheck, Shield, Download } from 'lucide-react';
import PriorityBadge from './ui/PriorityBadge.jsx';
import CodeBlock from './ui/CodeBlock.jsx';

const SEV_LABELS = { Critical: 'P0', High: 'P1', Medium: 'P2', Low: 'P3' };

const VULN_WORKFLOW = [
  { step: '1', title: 'Continuous discovery', desc: 'Inventory every asset (cloud + endpoints). Unmanaged assets are attack footholds — scan for shadow IT.' },
  { step: '2', title: 'Scan & assess', desc: 'Agent + agentless scanning on a schedule; registry/container scanning in CI; Dependabot for dependencies.' },
  { step: '3', title: 'Prioritize', desc: 'CVSSv3 + EPSS exploit probability + exploitable-in-your-stack + reachability from the internet.' },
  { step: '4', title: 'Remediate to SLA', desc: 'Patch, or apply compensating controls (firewall rule, WAF, mitigation) within the severity SLA.' },
  { step: '5', title: 'Verify', desc: 'Re-scan to prove the fix; record before/after in your vuln register as audit evidence.' },
];

const PATCH_SLA = [
  { sev: 'Critical', window: '≤ 48 hours', action: 'Immediately patch; otherwise block/mitigate (egress cut, WAF block) within 24h while fixing.' },
  { sev: 'High', window: '≤ 7 days', action: 'Patch in next maintenance window; re-scan and document.' },
  { sev: 'Medium', window: '≤ 30 days', action: 'Batch into monthly patch cycle; track in the vuln register.' },
  { sev: 'Low', window: '≤ 90 days', action: 'Triage + accept with owner sign-off; include in next hardening pass.' },
];

const VULN_PROVIDERS = [
  {
    name: 'AWS',
    plan: [
      'Amazon Inspector (deep + network reachability) scans EC2/ECS — daily network, weekly agent-driven assessment',
      'Systems Manager Patch Manager + patch baselines with maintenance windows across accounts',
      'AWS Config rules + GuardDuty flag drift and born-secure posture gaps',
      'Amazon ECR scanning in CI so container images ship clean',
    ],
    evidence: 'Inspector findings history + SSM patch-compliance reports exported monthly',
  },
  {
    name: 'Azure',
    plan: [
      'Microsoft Defender for Servers (Plan 2) — integrated vulnerability assessment + just-in-time VM access',
      'Update Management / Update Center with Azure Policy Guest Configuration enforcing patch state',
      'Defender for Containers + ACR scanning on every pushed image',
      'Automanage applies the baseline so drift is corrected automatically',
    ],
    evidence: 'Defender recommendations export + Update Compliance reports',
  },
  {
    name: 'Google Cloud',
    plan: [
      'Security Command Center (Premium) aggregates VM, workload, and config findings',
      'OS Config Manager / VM Manager applies guest policies and reports patch compliance fleet-wide',
      'Container Analysis + Artifact Registry scan images; Binary Authorization gates production deploys',
      'Cloud Asset Inventory detects unmanaged instances and policy violations',
    ],
    evidence: 'SCC findings export to BigQuery + Cloud Logging snapshot history',
  },
  {
    name: 'GitHub Dependabot',
    plan: [
      '.github/dependabot.yml covering every package ecosystem (npm, pip, Go, Java) on a weekly cadence',
      'Dependabot alerts + auto-PR security updates merged by owners within SLA',
      'GitHub Advanced Security code scanning (CodeQL) for code-level vulns in CI',
    ],
    evidence: 'Alert history + merged-Dependabot-PRs log retained for the review period',
  },
];

const LOG_SOURCES = [
  'Cloud API & management logs (CloudTrail, Azure Activity Log, GCP Audit Logs, ActionTrail)',
  'VPC / NSG flow logs for network telemetry',
  'OS / host logs (authd, systemd, EDR telemetry)',
  'WAF, LB, API-gateway access logs',
  'Database audit logs + object-storage access logs',
  'SaaS app events (IdP sign-ins, ticketing, HR changes) forwarded via webhooks',
];

const RETENTION = [
  { tier: 'Hot', window: 'Live — ≤ 7 days', store: 'SIEM / log search (OpenSearch, Log Analytics, Cloud Logging)', detects: 'Real-time alerting, dashboards, correlation rules' },
  { tier: 'Warm', window: '7 – 30 days', store: 'Searchable log store with longer life', detects: 'Retrospective queries, forensics triage' },
  { tier: 'Cold / archive', window: '90 days – 1 year', store: 'Object storage lifecycle tier (S3-IA, Blob archive, Coldline)', detects: 'Policy/regulatory review, threat-hunting rests' },
  { tier: 'Regulated / legal hold', window: '1 – 6 years', store: 'Immutable / object-lock bucket (WORM), append-only', detects: 'Cert-In (180-day mandatory), PCI 1 year, regulated 6 years' },
];

const DETECTION = [
  { icon: Activity, title: 'Signature & rules', desc: 'Known-bad patterns: IOCs, IDS/IPS signatures, WAF rule sets, EDR behavioral detections.' },
  { icon: Radar, title: 'Baseline & anomaly', desc: 'Profile normal behavior per host/user; alert on deviations — impossible travel, unusual egress volume.' },
  { icon: Search, title: 'SIEM correlation', desc: 'Join cloud, network, and identity events across sources to find multi-step attacks.' },
  { icon: Shield, title: 'EDR / XDR & UEBA', desc: 'Endpoint + network + identity analytics to detect the kill chain earlier at the host level.' },
];

const IR_SEVERITIES = [
  { sev: 'P0', color: 'text-red-600 dark:text-red-400', bg: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-900/40', name: 'Critical', example: 'Active compromise, data exfiltration, privileged-credential breach, ransomware, production outage', respond: '15 min', contain: '1 hour', review: '24 hours' },
  { sev: 'P1', color: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-900/40', name: 'High', example: 'Unauthorized access, malware, DDoS, credential phishing at scale, sensitive-data exposure', respond: '30 min', contain: '4 hours', review: '48 hours' },
  { sev: 'P2', color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-900/40', name: 'Medium', example: 'Policy breach, single-user compromise, misconfiguration, non-regulated data exposure', respond: '2 hours', contain: '24 hours', review: '5 days' },
  { sev: 'P3', color: 'text-slate-500 dark:text-slate-400', bg: 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700', name: 'Low / Advisory', example: 'Low-impact events, user error, hunt results, telemetry dead zones', respond: '24 hours', contain: 'Documented', review: 'Weekly' },
];

const IR_FLOW = [
  { step: 'Detect & acknowledge', desc: 'Monitoring→alert→on-call ack. SLA clock starts at acknowledgement.' },
  { step: 'Classify & assign', desc: 'Severity from the matrix, incident commander + lead responder named, comms channels open.' },
  { step: 'Preserve evidence', desc: 'Freeze and image affected systems, protect logs, snapshot memory/volumes, keep a timeline.' },
  { step: 'Contain', desc: 'Isolate host, revoke/generate creds, cut egress, disable accounts, DNS-sink C2, block IPs — never destroy evidence.' },
  { step: 'Eradicate', desc: 'Remove persistence, patch root cause, rotate all potentially exposed secrets, re-image where needed.' },
  { step: 'Recover', desc: 'Restore from clean backup, verify integrity, monitor for recurrence, communicate status externally per SLA.' },
  { step: 'Post-incident review', desc: 'RCA (5-Whys) → CAPA with owners; update runbooks/controls; tabletop the loop back at ' + 'detection' + '.' },
];

function IrTriageGenerator() {
  const [sev, setSev] = useState('P0');
  const [summary, setSummary] = useState('Ransomware detected on a finance laptop with lateral movement into the datastore');
  const [vector, setVector] = useState('remote');
  const [data, setData] = useState('PII');

  const meta = IR_SEVERITIES.find(s => s.sev === sev) || IR_SEVERITIES[0];

  const ticket = {
    schema: 'grc.incident_ticket.v1',
    ticket: {
      id: `IR-${Date.now().toString(36).toUpperCase()}`,
      created_utc: new Date().toISOString(),
      severity: sev,
      severity_label: meta.name,
      slas: { respond_minutes: meta.respond, contain: meta.contain, review: meta.review },
      classification: { summary, vector, data_classification: data },
      priority: sev === 'P0' ? 'emergency' : sev === 'P1' ? 'high' : sev === 'P2' ? 'normal' : 'advisory',
      response_plan: [
        { step: 1, action: 'Acknowledge via on-call rotation (SLA clock starts now)' },
        { step: 2, action: 'Assign incident commander + lead responder; open comms channels' },
        { step: 3, action: 'Preserve & image affected systems; protect logs' },
        { step: 4, action: 'Contain: isolate host, rotate creds, cut egress, block IOCs' },
        { step: 5, action: `Root-cause via 5-Whys; write CAPA before closure (${meta.review})` },
      ],
      requires_notification: data !== 'none' || sev === 'P0' || sev === 'P1',
      requires_capa: sev === 'P0' || sev === 'P1',
    },
  };
  const json = JSON.stringify(ticket, null, 2);

  const download = () => {
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `incident-${sev.toLowerCase()}-ticket.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const btn = (active) => `px-3 py-1.5 rounded-lg text-xs font-bold border transition ${active ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white dark:bg-slate-900/60 text-gray-700 dark:text-text-dark-secondary border-surface-300 dark:border-surface-dark-300 hover:border-indigo-400'}`;

  return (
    <div className="mt-6 rounded-xl border border-surface-200 dark:border-surface-dark-200 bg-white dark:bg-slate-900/60 p-5">
      <h4 className="font-bold text-navy-900 dark:text-text-dark-primary mb-1 flex items-center gap-2">
        <Siren className="w-4 h-4 text-red-600 dark:text-red-400" /> IR ticket generator — triage JSON, copy &amp; paste into your SIEM webhook
      </h4>
      <p className="text-xs text-gray-600 dark:text-text-dark-secondary mb-4">Pick a severity and fill the summary — the ticket schema wires your SLA targets and response plan automatically.</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {IR_SEVERITIES.map(s => (
          <button key={s.sev} type="button" onClick={() => setSev(s.sev)} className={btn(sev === s.sev)} aria-pressed={sev === s.sev}>
            <PriorityBadge level={s.sev} /> · {s.respond} response
          </button>
        ))}
      </div>

      <div className="space-y-3 mb-4">
        <label className="block">
          <span className="text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wide block mb-1">Summary</span>
          <input
            type="text"
            value={summary}
            onChange={e => setSummary(e.target.value)}
            className="w-full input dark:bg-slate-900/80 dark:text-text-dark-primary"
            aria-label="Incident summary"
          />
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <span className="text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wide block mb-1">Attack vector</span>
            <div className="flex gap-2">
              {['remote', 'insider', 'physical', 'supply-chain'].map(v => (
                <button key={v} type="button" onClick={() => setVector(v)} className={btn(vector === v)} aria-pressed={vector === v}>{v}</button>
              ))}
            </div>
          </div>
          <div>
            <span className="text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wide block mb-1">Data involved</span>
            <div className="flex gap-2">
              {['none', 'PII', 'PHI', 'financial', 'proprietary'].map(d => (
                <button key={d} type="button" onClick={() => setData(d)} className={btn(data === d)} aria-pressed={data === d}>{d}</button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="relative">
        <button
          type="button"
          onClick={download}
          className="absolute top-3 right-3 z-10 inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
        >
          <Download className="w-3.5 h-3.5" /> .json
        </button>
        <CodeBlock code={json} title="incident-ticket.json" lang="json" />
      </div>
      <p className="mt-2 text-[11px] text-gray-500 dark:text-text-dark-muted">
        SLA targets derive from your severity matrix above — keep this schema stable so the SOC webhook validator accepts it.
      </p>
    </div>
  );
}

export default function SecurityOperations({ isDark = false }) {

  return (
    <div className={`py-10 ${isDark ? 'bg-dark-bg' : 'bg-surface-50'} rounded-2xl`}>
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-600 text-white mb-3">
            <ShieldAlert className="w-3.5 h-3.5" /> Security Operations
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-navy-900 dark:text-text-dark-primary tracking-tight">
            Vulnerability, Logging & Incident Response — Operations Playbook
          </h2>
          <p className="text-lg text-navy-600 dark:text-text-dark-secondary max-w-3xl mt-2">
            How this platform keeps AWS, Azure, GCP, and GitHub workloads patched, watched, and responded to — with
            provider-specific runbooks, retention SLAs, and P0–P3 incident targets.
          </p>
        </div>

        {/* ---- 1. Vulnerability Management ---- */}
        <section id="secops-vuln" className={`mb-12 rounded-2xl border overflow-hidden
          ${isDark ? 'bg-surface-dark-100 border-surface-dark-300' : 'bg-surface-100 border-surface-300'}`}>
          <div className="p-6 md:p-8">
            <h3 className="grc-section-title mb-2"><span className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center"><ShieldAlert className="w-5 h-5" /></span>
              Vulnerability Management
            </h3>
            <p className="text-navy-600 dark:text-text-dark-secondary mb-6 max-w-3xl">
              A repeatable closed loop — discover, scan, prioritize, remediate, verify — enforced per cloud provider and for the
              application's own supply chain.
            </p>

            {/* Workflow */}
            <div className="flex flex-col md:flex-row gap-3 mb-8">
              {VULN_WORKFLOW.map((w, i) => (
                <div key={w.step} className="flex-1 flex items-start gap-3 bg-white dark:bg-slate-900/60 border border-surface-200 dark:border-surface-dark-200 rounded-xl p-4">
                  <span className="w-7 h-7 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center shrink-0">{w.step}</span>
                  <div>
                    <h4 className="font-bold text-navy-900 dark:text-text-dark-primary text-sm">{w.title}</h4>
                    <p className="text-xs text-navy-600 dark:text-text-dark-secondary mt-1 leading-relaxed">{w.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Provider runbooks */}
            <div className="grid md:grid-cols-2 gap-5 mb-8">
              {VULN_PROVIDERS.map(p => (
                <div key={p.name} className="rounded-xl border border-surface-200 dark:border-surface-dark-200 bg-white dark:bg-slate-900/60 overflow-hidden">
                  <div className="px-4 py-3 bg-gradient-to-r from-indigo-600 to-violet-600 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-white" />
                    <h4 className="font-bold text-white text-sm">{p.name}</h4>
                  </div>
                  <ul className="p-4 space-y-2.5">
                    {p.plan.map(item => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-navy-700 dark:text-text-dark-secondary">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="px-4 py-3 bg-emerald-50 dark:bg-emerald-900/20 border-t border-surface-200 dark:border-surface-dark-200 text-xs text-emerald-800 dark:text-emerald-300">
                    <strong>Evidence:</strong> {p.evidence}
                  </div>
                </div>
              ))}
            </div>

            {/* Patch SLA table */}
            <h4 className="text-lg font-bold text-navy-900 dark:text-text-dark-primary mb-3">Patch SLA by severity</h4>
            <div className="grc-table-wrap">
              <table className="w-full text-sm min-w-[560px]">
                <thead>
                  <tr className="border-b-2 border-emerald-200 dark:border-emerald-900/60">
                    <th className="py-2.5 pr-3 text-left text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-slate-400">Severity</th>
                    <th className="py-2.5 pr-3 text-left text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-slate-400">Remediation window</th>
                    <th className="py-2.5 text-left text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-slate-400">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
                  {PATCH_SLA.map(row => (
                    <tr key={row.sev} className="align-top">
                      <td className="py-3 pr-3 whitespace-nowrap"><PriorityBadge level={SEV_LABELS[row.sev] || row.sev} /></td>
                      <td className="py-3 pr-3 font-semibold text-emerald-700 dark:text-emerald-300 whitespace-nowrap">{row.window}</td>
                      <td className="py-3 text-gray-600 dark:text-text-dark-muted">{row.action}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ---- 2. Logging, Monitoring & SIEM ---- */}
        <section id="secops-logging" className={`mb-12 rounded-2xl border overflow-hidden
          ${isDark ? 'bg-surface-dark-100 border-surface-dark-300' : 'bg-surface-100 border-surface-300'}`}>
          <div className="p-6 md:p-8">
            <h3 className="grc-section-title mb-2"><span className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center"><FileClock className="w-5 h-5" /></span>
              Logging, Monitoring & SIEM Retention
            </h3>
            <p className="text-navy-600 dark:text-text-dark-secondary mb-6 max-w-3xl">
              Centralize every security-relevant source into one searchable SIEM, tier the storage so hot data is queryable and cold data is
              cheap and immutable, and wire detection on top.
            </p>

            <div className="grid md:grid-cols-2 gap-5 mb-8">
              {/* Sources */}
              <div className="rounded-xl border border-surface-200 dark:border-surface-dark-200 bg-white dark:bg-slate-900/60 p-5">
                <h4 className="font-bold text-navy-900 dark:text-text-dark-primary mb-3 flex items-center gap-2">
                  <Database className="w-4 h-4 text-indigo-600 dark:text-indigo-400" /> Key log sources
                </h4>
                <ul className="space-y-2">
                  {LOG_SOURCES.map(s => (
                    <li key={s} className="flex items-start gap-2.5 text-sm text-navy-700 dark:text-text-dark-secondary">
                      <span className="text-indigo-400 mt-0.5">•</span>{s}
                    </li>
                  ))}
                </ul>
              </div>
              {/* Detection */}
              <div className="rounded-xl border border-surface-200 dark:border-surface-dark-200 bg-white dark:bg-slate-900/60 p-5">
                <h4 className="font-bold text-navy-900 dark:text-text-dark-primary mb-3 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-indigo-600 dark:text-indigo-400" /> Detection mechanisms
                </h4>
                <div className="space-y-3">
                  {DETECTION.map(d => (
                    <div key={d.title} className="flex items-start gap-3">
                      <d.icon className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" />
                      <div>
                        <h5 className="font-semibold text-sm text-navy-900 dark:text-text-dark-primary">{d.title}</h5>
                        <p className="text-xs text-navy-600 dark:text-text-dark-secondary">{d.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Retention matrix */}
            <h4 className="text-lg font-bold text-navy-900 dark:text-text-dark-primary mb-3">Hot vs cold retention tiers</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[640px]">
                <thead>
                  <tr className="border-b-2 border-indigo-200 dark:border-indigo-900/60">
                    <th className="py-2.5 pr-3 text-left text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-slate-400">Tier</th>
                    <th className="py-2.5 pr-3 text-left text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-slate-400">Window</th>
                    <th className="py-2.5 pr-3 text-left text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-slate-400">Where</th>
                    <th className="py-2.5 text-left text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-slate-400">Used for</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
                  {RETENTION.map(row => (
                    <tr key={row.tier} className="align-top">
                      <td className="py-3 pr-3 font-semibold text-gray-800 dark:text-text-dark-primary whitespace-nowrap">{row.tier}</td>
                      <td className="py-3 pr-3 font-semibold text-indigo-700 dark:text-indigo-300 whitespace-nowrap">{row.window}</td>
                      <td className="py-3 pr-3 text-gray-600 dark:text-text-dark-muted">{row.store}</td>
                      <td className="py-3 text-gray-600 dark:text-text-dark-muted">{row.detects}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-gray-500 dark:text-text-dark-muted">
              Regulated minimums to honor: <strong>CERT-In</strong> to the contrary notwithstanding, logs carrying user/network metadata are
              typically held 180 days, PCI-DSS 1 year, and other regulated data up to 6 years in immutable storage.
            </p>
          </div>
        </section>

        {/* ---- 3. Incident Response ---- */}
        <section id="secops-ir" className={`rounded-2xl border overflow-hidden
          ${isDark ? 'bg-surface-dark-100 border-surface-dark-300' : 'bg-surface-100 border-surface-300'}`}>
          <div className="p-6 md:p-8">
            <h3 className="grc-section-title mb-2"><span className="w-9 h-9 rounded-xl bg-red-600 text-white flex items-center justify-center"><Siren className="w-5 h-5" /></span>
              Incident Response — Classification, Triage, Containment & RCA
            </h3>
            <p className="text-navy-600 dark:text-text-dark-secondary mb-6 max-w-3xl">
              Classify by blast radius, act on the SLA clock, contain before you investigate, and close the loop with a 5-Whys root-cause
              analysis plus corrective and preventive actions.
            </p>

            {/* Severity SLA cards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {IR_SEVERITIES.map(s => (
                <div key={s.sev} className={`rounded-xl border p-4 ${s.bg}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-2xl font-black ${s.color}`}>{s.sev}</span>
                    <span className={`text-xs font-bold uppercase tracking-wide ${s.color}`}>{s.name}</span>
                  </div>
                  <p className="text-xs text-gray-700 dark:text-text-dark-secondary mb-3 leading-relaxed">{s.example}</p>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between"><span className="text-gray-500 dark:text-slate-400">Respond</span><strong className="text-gray-800 dark:text-white">{s.respond}</strong></div>
                    <div className="flex justify-between"><span className="text-gray-500 dark:text-slate-400">Contain</span><strong className="text-gray-800 dark:text-white">{s.contain}</strong></div>
                    <div className="flex justify-between"><span className="text-gray-500 dark:text-slate-400">Post-incident review</span><strong className="text-gray-800 dark:text-white">{s.review}</strong></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Playbook flow */}
            <h4 className="text-lg font-bold text-navy-900 dark:text-text-dark-primary mb-3">Triage → containment → recovery playbook</h4>
            <div className="space-y-2.5 mb-8">
              {IR_FLOW.map((f, i) => (
                <div key={f.step} className="flex items-start gap-3 bg-white dark:bg-slate-900/60 border border-surface-200 dark:border-surface-dark-200 rounded-xl p-3.5">
                  <span className="w-6 h-6 rounded-full bg-red-600 text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                  <div>
                    <h5 className="font-bold text-sm text-navy-900 dark:text-text-dark-primary">{f.step}</h5>
                    <p className="text-xs text-navy-600 dark:text-text-dark-secondary mt-0.5">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* RCA / 5-Whys / CAPA */}
            <div className="rounded-xl border border-surface-200 dark:border-surface-dark-200 bg-white dark:bg-slate-900/60 p-5">
              <h4 className="font-bold text-navy-900 dark:text-text-dark-primary mb-3 flex items-center gap-2">
                <FileSearch className="w-4 h-4 text-red-600 dark:text-red-400" /> RCA — 5-Whys → Corrective & Preventive Action (CAPA)
              </h4>
              <div className="grid md:grid-cols-3 gap-5">
                <div>
                  <h5 className="text-sm font-semibold text-gray-800 dark:text-white flex items-center gap-1.5 mb-2"><Clock className="w-4 h-4 text-indigo-500" /> Reconstruct</h5>
                  <p className="text-xs text-gray-600 dark:text-text-dark-secondary leading-relaxed">
                    Build the full incident timeline from preserved logs. Note exactly when control(s) failed vs. never existed, and what the
                    blast radius was.
                  </p>
                </div>
                <div>
                  <h5 className="text-sm font-semibold text-gray-800 dark:text-white flex items-center gap-1.5 mb-2"><GitBranch className="w-4 h-4 text-indigo-500" /> 5-Whys</h5>
                  <p className="text-xs text-gray-600 dark:text-text-dark-secondary leading-relaxed">
                    Ask "why" five times from the observed failure to the process/design root cause — not who did it, but what allowed it.
                    Stop when the answer is a control gap someone can fix.
                  </p>
                </div>
                <div>
                  <h5 className="text-sm font-semibold text-gray-800 dark:text-white flex items-center gap-1.5 mb-2"><Repeat className="w-4 h-4 text-indigo-500" /> CAPA</h5>
                  <p className="text-xs text-gray-600 dark:text-text-dark-secondary leading-relaxed">
                    <strong className="text-gray-800 dark:text-white">Corrective:</strong> fix the root cause. <strong className="text-gray-800 dark:text-white">Preventive:</strong> stop the whole
                    class from recurring. Each action gets an owner, due date, and a verification step (audit 30 days later).
                  </p>
                </div>
              </div>
              <div className="mt-4 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/40 text-xs text-gray-700 dark:text-text-dark-secondary">
                <strong className="text-red-700 dark:text-red-300">No-blame rule:</strong> RCA findings describe process and control failures, never
                individuals. Every P0/P1 incident gets a completed CAPA before it is closed — closure without CAPA is an automatic finding.
              </div>
            </div>

            <IrTriageGenerator />
          </div>
        </section>
      </div>
    </div>
  );
}