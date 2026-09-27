import React from 'react';
import { Network, Shield, Server, Database, Lock, CheckCircle, ArrowDown, Cloud, Info, Globe, Activity, KeyRound } from 'lucide-react';

const TIERS = [
  {
    icon: Globe,
    title: 'Users / Internet',
    tone: 'border-slate-300 dark:border-slate-600',
    text: 'text-gray-900 dark:text-white',
    sub: 'text-gray-500 dark:text-slate-400',
    items: ['TLS 1.3 only (no TLS < 1.2)', 'Forward + reverse proxies / CDN in front', 'WAF rule sets before origin'],
  },
  {
    icon: Shield,
    title: 'DMZ — Edge / Load Balancer',
    tone: 'border-indigo-300 dark:border-indigo-700',
    text: 'text-indigo-900 dark:text-indigo-200',
    sub: 'text-gray-500 dark:text-slate-400',
    items: ['Cloud LB / API Gateway terminates TLS', 'Ingress 443 only; everything else denied', 'Cloud WAF + DDoS protection (Shield / Azure DDoS / Cloud Armor)'],
  },
  {
    icon: Server,
    title: 'Web Tier',
    tone: 'border-blue-300 dark:border-blue-700',
    text: 'text-blue-900 dark:text-blue-200',
    sub: 'text-gray-500 dark:text-slate-400',
    items: ['Stateless, autoscaling instance groups', 'No secrets on disk — inject at runtime (Vault / SSM / Key Vault)', 'Privileged ports exposed only to the app tier'],
  },
  {
    icon: Activity,
    title: 'App / API Tier',
    tone: 'border-purple-300 dark:border-purple-700',
    text: 'text-purple-900 dark:text-purple-200',
    sub: 'text-gray-500 dark:text-slate-400',
    items: ['Service-to-service mTLS (Istio / Linkerd / native)', 'Queues + workers; dead-lettering on failure', 'Read-only at-rest nav between app and data tiers'],
  },
  {
    icon: Database,
    title: 'Data Tier',
    tone: 'border-emerald-300 dark:border-emerald-700',
    text: 'text-emerald-900 dark:text-emerald-200',
    sub: 'text-gray-500 dark:text-slate-400',
    items: ['Fully managed data stores on private subnets', 'Encryption at rest (CMK) + at least LTS snapshots', 'Private endpoints / VPC peering only — no public DB endpoints'],
  },
];

const SEGMENTS = [
  {
    segment: 'Internet → DMZ',
    purpose: 'User traffic into the platform edge.',
    allowed: 'HTTPS (443). WAF-inspected.',
    denied: 'SSH, RDP, all internal ports, unsupported TLS.',
    controls: 'Ingress security-group/NSG/firewall allow-lists, WAF rule sets, TLS policy.',
  },
  {
    segment: 'DMZ → Web tier',
    purpose: 'Load-balanced origin traffic.',
    allowed: 'HTTP(S) on origin port from LB health checks + source ranges.',
    denied: 'Direct internet → web tier.',
    controls: 'Origin firewalled to LB SG only; separate security group per tier.',
  },
  {
    segment: 'Web → App tier',
    purpose: 'Internal API calls.',
    allowed: 'API port from web tier SG only.',
    denied: 'Any tier reaching DB ports directly.',
    controls: 'Network micro-segmentation, mTLS, service identities.',
  },
  {
    segment: 'App → Data tier',
    purpose: 'Read/write to managed stores.',
    allowed: 'DB/queue ports from app tier SG only.',
    denied: 'All other traffic; no public endpoints.',
    controls: 'Private subnets, VPC service endpoints, IAM role-based auth.',
  },
  {
    segment: 'Management / Admin',
    purpose: 'Break-glass, deploy, and ops access.',
    allowed: 'Bastion / PAW / session broker (SSM, Azure Bastion, IAP, Teleport).',
    denied: 'Direct SSH/RDP from user workstations to any tier.',
    controls: 'JIT elevation, session recording, hardware-bound MFA, IP allow-lists.',
  },
];

const PROVIDERS = [
  {
    name: 'AWS',
    icon: Cloud,
    tone: 'from-orange-500 to-amber-600',
    checks: [
      'CIS-hardened AMI baseline (Amazon Linux 2/2023, CIS benchmark) with immutable-image builds',
      'Amazon Inspector (deep + network reachability) scanning every EBS-backed instance; weekly cadence',
      'Systems Manager Patch Manager + maintenance windows; patching evidence retained for the audit period',
      'EBS encryption by default via customer-managed KMS keys; snapshots inherit encryption',
      'IMDSv2 enforced (no IMDSv1); EC2 instance roles instead of long-lived access keys',
      'SSM Session Manager / EC2 Instance Connect as the only remote-access path',
      'AWS Config rules flag config drift (open SGs, disabled encryption, public AMIs)',
    ],
  },
  {
    name: 'Azure',
    icon: Cloud,
    tone: 'from-sky-500 to-blue-600',
    checks: [
      'Azure Marketplace CIS VMs or custom hardened images; VM Image Builder for golden images',
      'Microsoft Defender for Servers (Plan 2) — vulnerability + just-in-time VM access',
      'Azure Automanage / Guest Configuration (Azure Policy) enforces patching + OS baseline state',
      'SSE with customer-managed keys + Azure Disk Encryption (BitLocker/DM-Crypt) for OS+data disks',
      'Managed identity (Entra ID) on every VM — no password/PMK in configuration',
      'NSGs + Application Security Groups per tier; Azure Firewall for egress filtering',
      'Azure Arc-enabled servers surface cloud-only posture checks on guest OS to central policy',
    ],
  },
  {
    name: 'Google Cloud',
    icon: Cloud,
    tone: 'from-red-500 to-rose-600',
    checks: [
      'CIS Google Compute hardened OS images + Organization Policy (guest attributes, OS Login)',
      'OS Config Manager enforces guest policies, patch compliance, and inventory across fleets',
      'Security Command Center (Premium) — findings for VMs, Config drift, and workload exposure',
      'Persistent Disk + Compute Engine encryption by default; CMEK keys with rotation',
      'OS Login instead of SSH keys; short-lived identities (GCE instance metadata)',
      'IAP (Identity-Aware Proxy) bastion-free admin access; VPC firewall rules log to Cloud Logging',
      'Cloud Asset Inventory + Cloud Audit Logs exported to a locked, append-only bucket',
    ],
  },
  {
    name: 'Alibaba Cloud',
    icon: Cloud,
    tone: 'from-amber-500 to-yellow-600',
    checks: [
      'CIS Alibaba Cloud Linux / Ubuntu hardened ECS images with baseline verification',
      'Security Center (Anti-Bot + vulnerability audit) discovers host CVEs over weekly agent scans',
      'ecs-agent patch management + automatic yes/no windows; emergency CVE patching procedure',
      'ECS disk encryption (cloud disk SSE) with BYOK keys; snapshot encryption enabled',
      'RAM instance roles instead of root AccessKey pairs on ECS',
      'ActionTrail management events + SLS (Log Service) collection for host/network audit',
      'Safety Group rewrites restricted; Config (Cloud Config) rules flag non-compliant ECS',
    ],
  },
];

export default function Soc2TechnicalSection() {
  return (
    <section id="soc2-technical" className="py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-text-dark-primary flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center"><Network className="w-6 h-6" /></span>
            SOC 2 Technical Controls — Architecture, Network Segregation & Cloud Host Hardening
          </h2>
          <p className="text-gray-600 dark:text-text-dark-secondary mt-3 max-w-3xl leading-relaxed">
            The physical and logical controls behind <strong>CC6.6</strong> (boundary protection), <strong>CC6.7</strong> (data-at-rest /
            in-transit protection), and <strong>CC7.x</strong> (system operations) — turned into a reference architecture, a
            network-segregation matrix, and per-provider host-hardening checklists you can evidence for the audit.
          </p>
        </div>

        {/* Architecture diagram */}
        <div className="grc-card p-5 md:p-6 mb-8">
          <h3 className="text-xl font-bold text-gray-900 dark:text-text-dark-primary mb-1 flex items-center gap-2">
            <Network className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            Reference Architecture — Segmented Tiers
          </h3>
          <p className="text-sm text-gray-500 dark:text-text-dark-muted mb-5 max-w-2xl">
            Each tier sits in its own security group / NSG / VPC firewall zone. Traffic flows top to bottom and is allow-listed between adjacent
            tiers only. Never trust a private subnet boundary alone — it is always paired with IAM, encryption, and monitoring.
          </p>

          <div className="flex flex-col items-stretch gap-1">
            {TIERS.map((tier, i) => (
              <div key={tier.title}>
                <div className={`rounded-xl border-2 ${tier.tone} bg-white dark:bg-slate-900/60 p-4`}>
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="w-9 h-9 rounded-lg bg-gray-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
                      <tier.icon className={`w-5 h-5 ${i === 4 ? 'text-emerald-600 dark:text-emerald-400' : 'text-indigo-600 dark:text-indigo-400'}`} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <h4 className={`font-bold ${tier.text}`}>{tier.title}</h4>
                      <ul className={`mt-1 text-xs space-y-0.5 ${tier.sub}`}>
                        {tier.items.map(it => (
                          <li key={it} className="flex items-start gap-1.5">
                            <span className="text-emerald-500 mt-0.5">•</span>
                            {it}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <span className="hidden md:inline-flex text-[11px] font-semibold uppercase tracking-wide text-gray-400 dark:text-slate-500">
                      {i === 0 ? 'External' : 'Private'}
                    </span>
                  </div>
                </div>
                {i < TIERS.length - 1 && (
                  <div className="flex justify-center py-1" aria-hidden="true">
                    <ArrowDown className="w-5 h-5 text-gray-400 dark:text-slate-500" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Network segregation matrix */}
        <div className="grc-card p-5 md:p-6 mb-8">
          <h3 className="text-xl font-bold text-gray-900 dark:text-text-dark-primary mb-1 flex items-center gap-2">
            <Lock className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            Network Segregation — Allowed / Denied Traffic Matrix
          </h3>
          <p className="text-sm text-gray-500 dark:text-text-dark-muted mb-5 max-w-2xl">
            Default-deny between segments. Document each rule as evidence for CC6.6 / ISO A.8.20–8.22 / NIST SC-7 / CIS 13.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[640px]">
              <thead>
                <tr className="border-b-2 border-emerald-200 dark:border-emerald-900/60">
                  <th className="py-2.5 pr-3 text-left text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-slate-400">Segment</th>
                  <th className="py-2.5 pr-3 text-left text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-slate-400">Purpose</th>
                  <th className="py-2.5 pr-3 text-left text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Allowed</th>
                  <th className="py-2.5 pr-3 text-left text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-400">Denied</th>
                  <th className="py-2.5 text-left text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-slate-400">Controls</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
                {SEGMENTS.map(row => (
                  <tr key={row.segment} className="align-top">
                    <td className="py-3 pr-3 font-semibold text-gray-800 dark:text-text-dark-primary whitespace-nowrap">{row.segment}</td>
                    <td className="py-3 pr-3 text-gray-600 dark:text-text-dark-muted">{row.purpose}</td>
                    <td className="py-3 pr-3 text-gray-700 dark:text-text-dark-secondary">{row.allowed}</td>
                    <td className="py-3 pr-3 text-gray-700 dark:text-text-dark-secondary">{row.denied}</td>
                    <td className="py-3 text-gray-600 dark:text-text-dark-muted">{row.controls}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Cloud host compliance checklists */}
        <div className="grc-card p-5 md:p-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-text-dark-primary mb-1 flex items-center gap-2">
            <KeyRound className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            Cloud Host Compliance Checklists
          </h3>
          <p className="text-sm text-gray-500 dark:text-text-dark-muted mb-5 max-w-2xl">
            Run the same five checks on every host — hardened image, vulnerability agent, patching evidence, encryption, and least-privilege
            identity — using each cloud's native tooling. Export scan/patch history monthly as your Type II evidence trail.
          </p>
          <div className="grid md:grid-cols-2 gap-5">
            {PROVIDERS.map(provider => (
              <div key={provider.name} className="rounded-xl border border-gray-200 dark:border-slate-700/60 bg-white dark:bg-slate-900/60 overflow-hidden">
                <div className={`px-4 py-3 bg-gradient-to-r ${provider.tone} flex items-center gap-2`}>
                  <provider.icon className="w-4 h-4 text-white" />
                  <h4 className="font-bold text-white text-sm">{provider.name} — host hardening</h4>
                </div>
                <ul className="p-4 space-y-2.5">
                  {provider.checks.map(check => (
                    <li key={check} className="flex items-start gap-2.5 text-sm text-gray-700 dark:text-text-dark-secondary">
                      <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" aria-hidden="true" />
                      {check}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-5 p-4 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-900/40 flex items-start gap-3">
            <Info className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
            <p className="text-sm text-gray-700 dark:text-text-dark-secondary leading-relaxed">
              <strong className="text-gray-900 dark:text-text-dark-primary">Auditor expectation:</strong> every in-scope host must show a
              hardened baseline, a vuln-scan history that predates the audit period, patching SLAs with evidence, encryption at rest, and no
              human passwords or standing keys on the box. Screen-record or dashboard-snapshot each provider's security console monthly.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}