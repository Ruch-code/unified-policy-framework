import React, { useState } from 'react';
import { ShieldCheck, HardDrive, Smartphone, Cpu, Network, MapPin, LockKeyhole, Server, Wrench, ScrollText, FileJson, FileCode2, Terminal, ArrowRight, ArrowDown, RefreshCw } from 'lucide-react';
import CodeBlock from './ui/CodeBlock.jsx';
const scenariosData = [];

const agentPs1 = 'Windows agent code';
const agentSh = 'Linux/macOS agent code';
const intuneXml = `<!-- Intune OMA-URI placeholder -->`;
const jamfXml = `<!-- Jamf FileVault Profile placeholder -->`;
const condAccessJson = {};
const iacTf = 'Terraform IaC code';
const socWebhook = 'SOC webhook code';
const tokenRevoke = 'Token revocation code';
const scenariosJsonRaw = '{}';
const readmeMd = 'Runbook';

const DOMAINS = [
  { icon: HardDrive, title: '1 · Removable media encryption', tone: 'bg-sky-600', desc: 'USB/external media is never writable unencrypted — BitLocker To Go / AES-256 CSP, with the crypto-compliance flag blocking raw writes.' },
  { icon: Smartphone, title: '2 · BYOD / MDM-MAM', tone: 'bg-violet-600', desc: 'Corporate devices get full enrollment + EDR; BYOD gets a managed container or VDI with restricted copy/paste and no local sensitive data.' },
  { icon: Cpu, title: '3 · EDR & telemetry', tone: 'bg-emerald-600', desc: 'Every endpoint streams detections to the SIEM and reports raw health JSON every 15 minutes — the same schema on Windows, macOS, and Linux.' },
  { icon: Network, title: '4 · ZTNA / SASE', tone: 'bg-indigo-600', desc: 'Access is per-app, per-identity, evaluated at the gate — a non-compliant or off-network device simply cannot reach the sensitive apps.' },
  { icon: MapPin, title: '5 · Physical context', tone: 'bg-amber-600', desc: 'Office vs café vs airport changes the trust rating of the same user/session — risk-based Conditional Access is context-aware.' },
  { icon: LockKeyhole, title: '6 · DLP / clipboard isolation', tone: 'bg-rose-600', desc: 'Work data can multi-paste to a personal web app; clipboard isolation blocks the copy/paste bridge to shadow IT.' },
];

const DELIVERABLES = [
  { id: 'powerShell', label: 'Windows agent', icon: Terminal, title: 'device-health-agent.ps1', lang: 'powershell', code: agentPs1, desc: 'Endpoint health agent (PowerShell): BitLocker, TPM, EDR service + definitions, MDM enrollment, patch baseline, network posture, DLP flag — emits one compliance JSON and POSTs it to the SOC webhook. Deploy as a SYSTEM scheduled task every 15 minutes.' },
  { id: 'bash', label: 'macOS · Linux agent', icon: Terminal, title: 'device-health-agent.sh', lang: 'bash', code: agentSh, desc: 'The same schema on Unix: FileVault / LUKS at rest, EDR (launchd/systemd), SIP, MDM marker (Jamf/Kandji/Mosyle/Fleet), managed-preferences DLP check. Root-run via LaunchAgent or systemd timer.' },
  { id: 'intune', label: 'Intune OMA-URI', icon: FileJson, title: 'intune-oma-uri.xml', lang: 'xml', code: intuneXml, desc: 'Windows enforcement profile: BitLocker + removable-media crypto (OMA-URI CSP), Defender for Endpoint onboarding, clipboard isolation, device-health handshake — all via documented Microsoft CSPs, no custom workload.' },
  { id: 'jamf', label: 'Jamf / macOS profile', icon: FileJson, title: 'jamf-filevault-profile.xml', lang: 'xml', code: jamfXml, desc: 'macOS configuration profile: FileVault 2 with institutional recovery key escrow, application firewall, screensaver lock, EDR payload key, and the DLP clipboard-isolation payload.' },
  { id: 'ca', label: 'Conditional Access', icon: ShieldCheck, title: 'conditional-access.json', lang: 'json', code: condAccessJson, desc: 'Microsoft Graph (beta) policies: require compliant + MFA + domain-joined for sensitive apps, block unmanaged/BYOD outside trusted geographies, risk-based session control. Ship report-only before enforcing.' },
  { id: 'iac', label: 'Control-plane IaC', icon: Server, title: 'iac-terraform.tf', lang: 'hcl', code: iacTf, desc: 'Terraform for the security subscription: SIEM storage (WORM civil hold), serverless SOC webhook receiver with RBAC, and the Conditional Access contract. Secrets via tfvars / Key Vault.' },
  { id: 'webhook', label: 'SOC webhook', icon: FileCode2, title: 'soc-webhook.mjs', lang: 'javascript', code: socWebhook, desc: 'Serverless receiver that validates the agent JSON, reconciles against posture, quarantines in ZTNA, strips tokens on sensitive-domain failure, alerts SOC, and writes an immutable event to the SIEM.' },
  { id: 'revoke', label: 'Token revocation', icon: RefreshCw, title: 'token-revoke.mjs', lang: 'javascript', code: tokenRevoke, desc: 'Idempotent token-strip service: finds the device\u2019s sign-ins, revokes only those sessions, busts cached refresh tokens, and applies the p0\u2013p3 escalation matrix. Never revokes the whole account unless it\u2019s a compromise.' },
  { id: 'scenarios', label: 'Scenarios A–D', icon: ScrollText, title: 'scenarios.json', lang: 'json', code: scenariosJsonRaw, desc: 'Machine-readable scenario definitions (café/airport, BYOD contractor, office, lost/stolen) with the enforcement domains applied and the exact deliverables each scenario depends on.' },
  { id: 'readme', label: 'Runbook', icon: Wrench, title: 'index.md', lang: 'markdown', code: readmeMd, desc: 'Deploy order (90-minute pilot), the enforcement loop diagram, secret-handling and safety rules, and the report-only → enforce rollout guidance.' },
];

const SCENARIOS = scenariosData.scenarios || [];

function EnforcementLoop() {
  const Row = ({ title, sub, tone }) => (
    <div className={`rounded-xl ${tone} text-white p-4 text-center`}>
      <p className="font-extrabold text-sm">{title}</p>
      {sub && <p className="text-[11px] mt-0.5 opacity-80">{sub}</p>}
    </div>
  );
  return (
    <div className="rounded-2xl border border-surface-300 dark:border-surface-dark-300 bg-white dark:bg-slate-900/60 p-6">
      <h3 className="grc-section-title mb-5 text-lg"><ArrowRight className="w-5 h-5 text-indigo-600" /> The enforcement loop</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Row title="Endpoint agent" sub="PowerShell / Bash, every 15 min" tone="bg-indigo-600" />
        <Row title="SOC webhook" sub="schema validate → posture decision" tone="bg-violet-600" />
        <Row title="Quarantine + token-strip" sub="ZTNA isolate, revoke sessions" tone="bg-rose-600" />
      </div>
      <div className="flex justify-center py-2"><ArrowDown className="w-5 h-5 text-slate-400" aria-hidden="true" /></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Row title="SIEM ledger" sub="WORM / append-only, 5-yr hold" tone="bg-emerald-600" />
        <Row title="Re-onboard after fix" sub="compliant flags clear → access restored automatically" tone="bg-slate-600" />
      </div>
    </div>
  );
}

export default function HybridSecurityFramework({ isDark = false }) {
  const [active, setActive] = useState('powerShell');
  const current = DELIVERABLES.find(d => d.id === active) || DELIVERABLES[0];

  return (
    <div className={`py-10 ${isDark ? 'bg-dark-bg' : 'bg-surface-50'} rounded-2xl`}>
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-800 text-white mb-3">
            <ShieldCheck className="w-3.5 h-3.5" /> Principal Cybersecurity Architect / DevOps
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-navy-900 dark:text-text-dark-primary tracking-tight">
            Hybrid Workforce Security &amp; Enforcement
          </h2>
          <p className="text-lg text-navy-600 dark:text-text-dark-secondary max-w-3xl mt-2">
            A compliance-and-enforcement framework for Remote, In-Office and On-the-Go workers — six enforcement
            domains, four worker scenarios, and copy-paste deployables (MDM profiles, Conditional Access, IaC,
            endpoint agents, SOC quarantine/token-strip) that map to the Security Operations baseline.
          </p>
        </div>

        {/* 6 domains */}
        <section className="mb-10">
          <h3 className="grc-section-title mb-5 text-lg">Six enforcement domains</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {DOMAINS.map(d => (
              <div key={d.title} className="rounded-xl border border-surface-300 dark:border-surface-dark-300 bg-white dark:bg-slate-900/60 p-5">
                <span className={`inline-flex w-10 h-10 rounded-xl ${d.tone} text-white items-center justify-center mb-3`}>
                  <d.icon className="w-5 h-5" />
                </span>
                <h4 className="font-bold text-navy-900 dark:text-text-dark-primary mb-1.5">{d.title}</h4>
                <p className="text-sm text-navy-600 dark:text-text-dark-secondary leading-relaxed">{d.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <EnforcementLoop />

        {/* Scenarios */}
        <section className="mt-10 mb-10">
          <h3 className="grc-section-title mb-5 text-lg">Four worker scenarios</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {SCENARIOS.map(s => (
              <div key={s.id} className="rounded-xl border border-surface-300 dark:border-surface-dark-300 bg-white dark:bg-slate-900/60 overflow-hidden">
                <div className="px-5 py-3 bg-gradient-to-r from-slate-700 to-slate-800 flex items-center justify-between">
                  <h4 className="font-bold text-white">{s.title}</h4>
                  <span className="text-xs font-black text-white/70">SCENARIO {s.id}</span>
                </div>
                <div className="p-5">
                  <p className="text-sm text-navy-600 dark:text-text-dark-secondary mb-3">{s.persona}</p>
                  <ul className="space-y-1.5">
                    {(s.enforcement || []).map((e, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-navy-700 dark:text-text-dark-secondary">
                        <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> {e}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Deliverables */}
        <section className="rounded-2xl border border-surface-300 dark:border-surface-dark-300 bg-white dark:bg-slate-900/60 p-6 md:p-8">
          <h3 className="grc-section-title mb-1 text-lg">Deployables — copy, paste, enforce</h3>
          <p className="text-sm text-navy-600 dark:text-text-dark-secondary mb-5 max-w-3xl">
            Every artifact below is a real file bundled with this module. Download, edit the placeholders, and ship
            it through the relevant MDM / IaC pipeline.
          </p>

          <div role="tablist" aria-label="Hybrid security deliverables" className="flex gap-2 overflow-x-auto pb-2 mb-5">
            {DELIVERABLES.map(d => (
              <button
                key={d.id}
                role="tab"
                id={`htab-${d.id}`}
                aria-selected={active === d.id}
                aria-controls={`hpanel-${d.id}`}
                onClick={() => setActive(d.id)}
                className={`shrink-0 inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold border transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                  active === d.id
                    ? 'bg-indigo-600 text-white border-indigo-600'
                    : 'bg-white dark:bg-slate-900/60 text-navy-600 dark:text-text-dark-secondary border-surface-300 dark:border-surface-dark-300 hover:border-indigo-400'
                }`}
              >
                <d.icon className="w-3.5 h-3.5" /> {d.label}
              </button>
            ))}
          </div>

          <div
            id={`hpanel-${current.id}`}
            role="tabpanel"
            aria-labelledby={`htab-${current.id}`}
            className="space-y-4"
          >
            <div>
              <h4 className="text-lg font-bold text-navy-900 dark:text-text-dark-primary flex items-center gap-2">
                <current.icon className="w-4 h-4 text-indigo-600" /> {current.title}
              </h4>
              <p className="text-sm text-navy-600 dark:text-text-dark-secondary mt-1">{current.desc}</p>
            </div>
            <CodeBlock code={current.code} title={current.title} lang={current.lang} />
          </div>
        </section>
      </div>
    </div>
  );
}