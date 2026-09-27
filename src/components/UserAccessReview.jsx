import React from 'react';
import { CheckCircle, AlertTriangle, Shield, Server, Database, Globe, Users, Key, Lock, Building2, Cpu, Smartphone, Layers, Network, HardDrive, Cloud } from 'lucide-react';

const uarData = {
  scope: {
    title: 'What Must Be Covered in User Access Reviews',
    description: 'User Access Reviews (UAR) must encompass ALL systems, applications, and user types where access to sensitive data or critical infrastructure exists. Not just "core systems" — everything in scope for compliance.',
    categories: [
      {
        name: 'Identity Providers & Directory Services',
        icon: Users,
        color: 'blue',
        systems: [
          'Entra ID (Azure AD) / Active Directory — all users, groups, roles, admin units',
          'Okta, Ping, Auth0, Google Workspace, Keycloak — full tenant review',
          'LDAP directories, RADIUS, TACACS+ — if used for auth',
          'Privileged Identity Management (PIM) — eligible vs. active assignments',
          'Break-glass / emergency accounts — separate review',
        ],
        frameworks: ['SOC 2 CC6.1', 'ISO A.8.2', 'PCI 7.2', 'NIST PR.AA-6', 'CIS 5.3', 'FedRAMP AC-2'],
      },
      {
        name: 'Cloud Infrastructure & Platforms',
        icon: Cloud,
        color: 'indigo',
        systems: [
          'AWS: IAM users/roles, IAM Identity Center, Organizations, STS, cross-account roles',
          'Azure: RBAC assignments, Entra ID PIM, Management Groups, Subscriptions',
          'GCP: IAM policies, Service Accounts, Workload Identity, Org policies',
          'Kubernetes: RBAC (ClusterRole/Role bindings), ServiceAccounts, admission controllers',
          'Terraform Cloud / Atlantis / Spacelift — state access, run permissions',
        ],
        frameworks: ['SOC 2 CC6.1', 'ISO A.8.2', 'PCI 7.2', 'NIST PR.AC-3', 'CIS 4.5', 'FedRAMP AC-3, AC-6'],
      },
      {
        name: 'Source Code & CI/CD',
        icon: Server,
        color: 'purple',
        systems: [
          'GitHub / GitLab / Bitbucket / Azure DevOps — org/repo permissions, branch protection, deploy keys',
          'CI/CD: GitHub Actions, GitLab CI, Jenkins, CircleCI, Buildkite — runner access, secrets, environments',
          'Package registries: npm, PyPI, Docker Hub, GHCR, ECR, Artifactory — publish/read tokens',
          'SAST/SCA tools: Semgrep, CodeQL, Snyk, Dependabot — triage permissions',
        ],
        frameworks: ['SOC 2 CC6.1, CC8.1', 'ISO A.8.2, A.12.1', 'PCI 6.3', 'NIST PR.IP-1', 'CIS 16', 'SLSA'],
      },
      {
        name: 'Data Stores & Databases',
        icon: Database,
        color: 'emerald',
        systems: [
          'RDS / Cloud SQL / Cosmos DB / DynamoDB / Atlas — IAM auth, DB users, roles, grants',
          'Data warehouses: Snowflake, BigQuery, Redshift, Databricks — roles, row-level security, shares',
          'Redis / ElastiCache / Memcached — ACLs, TLS, authentication',
          'Object storage: S3, GCS, Azure Blob — bucket policies, IAM, signed URLs, access points',
          'Backup/DR: AWS Backup, Azure Backup, Veeam, Rubrik — restore permissions',
        ],
        frameworks: ['SOC 2 CC6.1, CC7.2', 'ISO A.8.2, A.12.3', 'PCI 3, 7, 8', 'NIST PR.DS-1', 'CIS 3', 'HIPAA 164.312(a)'],
      },
      {
        name: 'SaaS Applications (Business-Critical)',
        icon: Globe,
        color: 'orange',
        systems: [
          'HRIS: Workday, BambooHR, Rippling, Deel — PII, compensation, SSN access',
          'CRM: Salesforce, HubSpot, Pipedrive — customer data, pipeline, contracts',
          'ERP/Finance: NetSuite, Sage, QuickBooks, Xero — GL, AP/AR, banking, tax',
          'Ticketing/ITSM: Jira, ServiceNow, Zendesk, Linear — incident data, customer comms',
          'Communication: Slack, Teams, Google Chat, Discord — channels, guest access, exports',
          'Documentation: Notion, Confluence, GitBook, SharePoint — wiki, specs, runbooks',
          'Analytics: Amplitude, Mixpanel, Segment, GA4 — event data, user IDs, PII',
        ],
        frameworks: ['SOC 2 CC6.1', 'ISO A.8.2', 'PCI 7.2', 'GDPR Art 32', 'HIPAA 164.312(a)', 'DPDPA Sec 10'],
      },
      {
        name: 'Security & Monitoring Tools',
        icon: Shield,
        color: 'red',
        systems: [
          'SIEM: Splunk, Datadog, Sumo Logic, Sentinel, Elastic — index access, detection rules, alerts',
          'EDR/XDR: CrowdStrike, SentinelOne, Defender, Cortex — policy management, quarantine',
          'Vuln Mgmt: Tenable, Qualys, Rapid7, Wiz, Orca — scan configs, credentialed scans',
          'PAM: CyberArk, BeyondTrust, Delinea, Teleport, Boundary — vault access, session policy',
          'Secrets: Vault, AWS Secrets Manager, Doppler, 1Password, Bitwarden — vault/collection access',
          'Certificate Mgmt: Venafi, Sectigo, Let\'s Encrypt (ACME), Smallstep — issuance/revocation',
        ],
        frameworks: ['SOC 2 CC7.2', 'ISO A.12.4', 'PCI 10, 11', 'NIST DE.CM', 'CIS 8', 'FedRAMP SI-4'],
      },
      {
        name: 'Network & Remote Access',
        icon: Network,
        color: 'teal',
        systems: [
          'VPN / ZTNA: Tailscale, Cloudflare Access, NetBird, Twingate, Prisma Access — device posture, ACLs',
          'Firewall: Palo Alto, Fortinet, Cisco, AWS Network Firewall — rule management, logs',
          'Load Balancers: ALB, NLB, Cloudflare, NGINX, Envoy — WAF rules, cert management',
          'DNS: Route 53, Cloudflare, Infoblox — zone management, record changes',
          'Wi-Fi / NAC: Cisco ISE, Aruba ClearPass, JumpCloud RADIUS — device auth, profiling',
        ],
        frameworks: ['SOC 2 CC6.1', 'ISO A.13.1', 'PCI 1, 8', 'NIST PR.AC-3', 'CIS 12, 13', 'FedRAMP SC-7'],
      },
      {
        name: 'Endpoints & Mobile',
        icon: Smartphone,
        color: 'rose',
        systems: [
          'MDM/UEM: Intune, Jamf, Kandji, VMware Workspace ONE — device compliance, app config',
          'EDR on endpoints — sensor health, policy enforcement',
          'Certificate-based auth (machine/user certs) — enrollment, renewal, revocation',
          'BYOD / COPE policies — containerization, data separation, selective wipe',
        ],
        frameworks: ['SOC 2 CC6.1', 'ISO A.8.1', 'PCI 8.1', 'NIST PR.AC-1', 'CIS 1, 4', 'FedRAMP CM-8'],
      },
    ],
  },
  userTypes: {
    title: 'User Types That Must Be Reviewed',
    categories: [
      {
        name: 'Human Users',
        icon: Users,
        types: [
          'Full-time employees (FTEs) — all departments, all roles',
          'Contractors / consultants / third-party staff — per MSA/SOW scope',
          'Interns / trainees / apprentices — sandbox only, mentor-sponsored',
          'Privileged users: Sysadmins, DBAs, Cloud Engineers, SecOps, DevOps, SREs',
          'Executive / Leadership — often over-provisioned; require explicit justification',
          'Finance / Legal / HR — access to regulated data (PII, PHI, PCI, financial)',
          'Support / Customer Success — customer data access (time-bound, ticket-linked)',
          'Auditors / Assessors — read-only, time-bound, monitored',
          'Service accounts used by humans (e.g., admin@, deploy@) — treat as human',
        ],
      },
      {
        name: 'Non-Human / Machine Identities',
        icon: Cpu,
        types: [
          'Service Accounts (AD, Entra, Okta, GCP, AWS IAM) — per application, not shared',
          'CI/CD Runners / Build Agents — GitHub Actions, GitLab Runners, Jenkins agents',
          'Kubernetes ServiceAccounts — workload identity, IRSA, Workload Identity Federation',
          'API Keys / Tokens / PATs — scoped, rotating, monitored, owner-tagged',
          'Serverless Functions: Lambda, Cloud Functions, Cloud Run — execution roles',
          'Database Users / Application Roles — per app, least privilege, no admin',
          'Third-party SaaS Integrations — OAuth clients, webhook endpoints, SCIM tokens',
          'Backup / DR Service Accounts — restore-only, time-limited',
          'Certificate/Key Auto-rotation Service Accounts — ACME, cert-manager, Vault agents',
        ],
      },
      {
        name: 'Special Categories (Require Separate Review)',
        icon: AlertTriangle,
        types: [
          'Break-glass / Emergency / Firecall accounts — quarterly + post-use',
          'Shared / Generic accounts (if any remain) — monthly + elimination plan',
          'Dormant / Inactive accounts (>45 days) — disable review',
          'Orphaned accounts (no owner, no manager) — immediate investigation',
          'Privileged Role Assignments (PIM eligible vs. active) — monthly attestation',
          'Cross-account / Cross-tenant roles — trust boundary validation',
          'Vendor / Sub-processor personnel with direct access — per contract terms',
        ],
      },
    ],
  },
  frequency: {
    title: 'Review Frequency by Framework & Risk Level',
    description: 'Minimum frequencies — organizations should adopt the MOST STRINGENT applicable requirement.',
    matrix: [
      { framework: 'SOC 2 (CC6.1)', standard: 'Periodic (typically quarterly)', privileged: 'Quarterly', highRisk: 'Quarterly', contractors: 'Monthly', production: 'Per session + Monthly audit', automated: 'Continuous (IdP reports + SIEM alerts)' },
      { framework: 'ISO 27001 (A.8.2)', standard: 'At planned intervals (risk-based)', privileged: 'Quarterly', highRisk: 'Quarterly', contractors: 'Quarterly', production: 'Per change + Quarterly', automated: 'Continuous monitoring (A.12.4)' },
      { framework: 'PCI-DSS v4.0 (Req 7.2, 8.2)', standard: 'At least quarterly', privileged: 'Quarterly', highRisk: 'Quarterly (CDE access)', contractors: 'Quarterly', production: 'Per session (Req 8.3) + Quarterly', automated: 'Daily automated privilege reports' },
      { framework: 'HIPAA (164.308(a)(4))', standard: 'Periodic (risk-based)', privileged: 'Quarterly', highRisk: 'Quarterly (PHI access)', contractors: 'Quarterly (BAA)', production: 'Per access + Quarterly', automated: 'Audit controls (164.312(b)) continuous' },
      { framework: 'NIST CSF 2.0 (PR.AA-6) / 800-53 (AC-2)', standard: 'Organization-defined (typically quarterly)', privileged: 'Monthly', highRisk: 'Monthly', contractors: 'Monthly', production: 'Per session (AC-3) + Monthly', automated: 'Continuous (DE.CM) + Automated (AC-2(12))' },
      { framework: 'CIS Controls v8 (Safeguard 5.3, 6.4)', standard: 'Quarterly (IG2/IG3)', privileged: 'Monthly', highRisk: 'Monthly', contractors: 'Monthly', production: 'Per session + Monthly', automated: 'Automated (5.3, 6.4) + Continuous' },
      { framework: 'FedRAMP (AC-2, AC-3)', standard: 'Quarterly (ConMon)', privileged: 'Monthly', highRisk: 'Monthly', contractors: 'Monthly (flow-down)', production: 'Per session (AC-17) + Monthly', automated: 'Continuous ConMon (CM-8, SI-4)' },
      { framework: 'CJIS (5.6)', standard: 'Annual (re-check)', privileged: 'Quarterly', highRisk: 'Quarterly', contractors: 'Annual (fingerprint)', production: 'Per session + Quarterly', automated: 'Continuous audit logging' },
      { framework: 'GDPR (Art 32) / DPDPA (Sec 10)', standard: 'Regular testing/evaluation', privileged: 'Quarterly', highRisk: 'Quarterly', contractors: 'Quarterly (Art 28)', production: 'Per access + Quarterly', automated: 'Continuous security measures' },
    ],
    riskTiers: [
      { tier: 'Tier 1: Standard Users', desc: 'Email, docs, Slack, HRIS, CRM (read)', frequency: 'Quarterly automated + annual manager attestation', examples: 'Marketing, Sales (non-admin), HR generalists, Finance analysts' },
      { tier: 'Tier 2: Elevated Access', desc: 'Admin consoles, DB read, deploy (non-prod), secrets read', frequency: 'Quarterly automated + quarterly manager attestation', examples: 'Developers, QA, Support Tier 2, Junior DevOps, Contractors' },
      { tier: 'Tier 3: Privileged / High-Risk', desc: 'Production write, DB admin, cloud admin, security admin, PAM, root', frequency: 'Monthly automated + monthly attestation + per-session logging', examples: 'Senior DevOps, DBAs, SecOps, Cloud Admins, CISO, Break-glass' },
      { tier: 'Tier 4: Critical / Regulated', desc: 'PHI, PCI, CJI, Federal, Encryption keys, Certificate authorities', frequency: 'Monthly automated + bi-weekly attestation + per-session recording + quarterly audit', examples: 'HIPAA Privacy Officer, PCI QSA, FedRAMP ATO team, Key Ceremony participants' },
    ],
  },
  bestPractices: {
    title: 'UAR Best Practices — Operationalize It',
    practices: [
      {
        name: 'Automate Evidence Collection',
        icon: Cpu,
        details: [
          'IdP (Entra/Okta/Ping) → export all role/group memberships via API/SCIM daily',
          'Cloud (AWS/Azure/GCP) → Cloud Asset Inventory + IAM Recommender + Access Analyzer',
          'SaaS → SCIM / SCIM 2.0 / APIs (Salesforce, GitHub, Slack, Jira, etc.)',
          'PAM → session metadata + command logs + credential checkouts',
          'Consolidate into single data lake (Snowflake/BigQuery/Redshift) for cross-system queries',
        ],
      },
      {
        name: 'Risk-Based Scoping (Not Everything Every Quarter)',
        icon: Shield,
        details: [
          'Tier 1 (standard): Automated quarterly — exception report only (no manual sign-off if clean)',
          'Tier 2 (elevated): Automated quarterly — manager attestation required',
          'Tier 3 (privileged): Monthly automated — manager + security attestation',
          'Tier 4 (critical): Monthly automated — bi-weekly attestation + quarterly deep-dive audit',
          'Contractors: Monthly automated — sponsor + vendor manager attestation',
        ],
      },
      {
        name: 'Review What Matters — Not Just "Who Has Access"',
        icon: AlertTriangle,
        details: [
          'Entitlement drift: current roles vs. job code / HR title / department',
          'Privilege creep: accumulated permissions over time (promotions, projects, incidents)',
          'Dormant privileges: granted >90 days ago, never used → auto-revoke candidate',
          'Segregation of Duties (SoD) violations: same user can deploy AND approve, create AND pay',
          'Orphaned access: no valid manager, no active ticket, no recent activity',
          'Cross-environment: dev access + prod access (should be mutually exclusive)',
        ],
      },
      {
        name: 'Remediation & Tracking',
        icon: Key,
        details: [
          'Every finding → Jira/GitHub/ServiceNow ticket with owner, SLA, evidence of closure',
          'SLA: Critical (SoD, prod write) = 48h; High = 5 days; Medium = 15 days; Low = 30 days',
          'Auto-revoke for dormant/clean exceptions after attestation window closes',
          'Escalation: unresolved → manager → director → CISO → audit committee',
          'Metrics: % reviewed on time, % revoked, % exceptions, mean time to remediate',
        ],
      },
      {
        name: 'Tooling Stack (Recommended)',
        icon: Layers,
        details: [
          'Identity Governance: Saviynt, SailPoint, Okta IGA, Entra ID Governance, Omada',
          'Cloud Permission Mgmt: Wiz, Orca, Ermetic, Sonrai, CloudKnox (Microsoft Permissions Mgmt)',
          'SaaS Access: Grip, Obsidian, DoControl, Valence, AppOmni',
          'PAM Session Review: CyberArk, BeyondTrust, Delinea, Teleport, Boundary',
          'Homegrown: IdP APIs + Cloud APIs + SaaS APIs → Data Lake → dbt/Metabase/PowerBI dashboards',
        ],
      },
      {
        name: 'Common Auditor Findings (And How to Preempt)',
        icon: CheckCircle,
        details: [
          'Finding: "No evidence of quarterly review" → Preempt: Automated IdP report + manager e-signature in ticket',
          'Finding: "Review only covers AD, not cloud/SaaS" → Preempt: Unified dashboard showing ALL systems',
          'Finding: "Privileged access not separately reviewed" → Preempt: Separate PIM/PAM review track',
          'Finding: "Contractors not reviewed" → Preempt: VMS→IdP sync + monthly sponsor attestation',
          'Finding: "No SoD analysis" → Preempt: Automated SoD rule engine (deploy≠approve, create≠pay)',
          'Finding: "Dormant accounts not disabled" → Preempt: 45-day inactivity → auto-disable workflow',
        ],
      },
    ],
  },
};

const darkChip = 'bg-surface-dark-200 border border-surface-dark-300 text-text-dark-primary';
const darkChipMuted = 'bg-surface-dark-200 border border-surface-dark-300 text-text-dark-secondary';

export default function UserAccessReview({ isDark = false }) {
  return (
    <div className={`py-16 ${isDark ? 'bg-dark-bg' : 'bg-surface-50'}`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-navy-900 dark:text-text-dark-primary mb-4">
            User Access Review — Coverage, Users & Frequency
          </h2>
          <p className="text-lg text-navy-600 dark:text-text-dark-secondary max-w-3xl mx-auto">
            What systems/applications must be reviewed, which user types, and the review frequency mandated by each framework — with risk-tiered operational guidance.
          </p>
        </div>

        {/* Scope */}
        <section className="mb-16">
          <h3 className="text-2xl font-bold text-navy-900 dark:text-text-dark-primary mb-6 flex items-center gap-3">
            <Server className="w-6 h-6 text-indigo-600 dark:text-indigo-400" /> Systems & Applications in Scope
          </h3>
          <p className="text-navy-600 dark:text-text-dark-secondary mb-6 max-w-4xl">
            {uarData.scope.description}
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {uarData.scope.categories.map((cat, i) => (
              <div key={i} className={`grc-card p-6`}>
                <div className="flex items-center gap-3 mb-4">
                  <cat.icon className="grc-card-icon w-6 h-6" style={{ color: `var(--color-${cat.color}-600)` }} />
                  <h4 className="grc-card-title font-bold">{cat.name}</h4>
                </div>
                <ul className="space-y-2 text-sm text-navy-600 dark:text-text-dark-secondary mb-4">
                  {cat.systems.map((sys, si) => (
                    <li key={si} className="flex gap-2"><CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" /> {sys}</li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-1.5">
                  {cat.frameworks.map((fw, fi) => (
                    <span key={fi} className={`px-2 py-0.5 text-xs font-medium rounded-full ${isDark ? darkChip : 'bg-surface-200 border border-surface-300 text-navy-700'}`}>
                      {fw}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* User Types */}
        <section className="mb-16">
          <h3 className="text-2xl font-bold text-navy-900 dark:text-text-dark-primary mb-6 flex items-center gap-3">
            <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" /> User Types That Must Be Reviewed
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {uarData.userTypes.categories.map((cat, i) => (
              <div key={i} className={`grc-card p-6`}>
                <div className="flex items-center gap-3 mb-4">
                  <cat.icon className="grc-card-icon w-6 h-6 text-purple-600 dark:text-purple-400" />
                  <h4 className="grc-card-title font-bold">{cat.name}</h4>
                </div>
                <ul className="space-y-2 text-sm text-navy-600 dark:text-text-dark-secondary">
                  {cat.types.map((type, ti) => (
                    <li key={ti} className="flex gap-2"><CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" /> {type}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Frequency Matrix */}
        <section className="mb-16">
          <h3 className="text-2xl font-bold text-navy-900 dark:text-text-dark-primary mb-4 flex items-center gap-3">
            <Shield className="w-6 h-6 text-emerald-600 dark:text-emerald-400" /> Review Frequency by Framework
          </h3>
          <p className="text-navy-600 dark:text-text-dark-secondary mb-6 max-w-4xl">{uarData.frequency.description}</p>
          <div className="overflow-x-auto mb-8">
            <table className={`w-full rounded-2xl border overflow-hidden text-xs
              ${isDark ? 'bg-surface-dark-100 border-surface-dark-300' : 'bg-surface-100 border-surface-300'}`}>
              <thead className={`bg-surface-200 dark:bg-surface-dark-200 border-b ${isDark ? 'border-surface-dark-300' : 'border-surface-300'} sticky top-0`}>
                <tr>
                  <th className="px-3 py-2 text-left font-bold text-navy-600 dark:text-text-dark-muted">Framework</th>
                  <th className="px-3 py-2 text-left font-bold text-navy-600 dark:text-text-dark-muted">Standard Users</th>
                  <th className="px-3 py-2 text-left font-bold text-navy-600 dark:text-text-dark-muted">Privileged</th>
                  <th className="px-3 py-2 text-left font-bold text-navy-600 dark:text-text-dark-muted">High-Risk</th>
                  <th className="px-3 py-2 text-left font-bold text-navy-600 dark:text-text-dark-muted">Contractors</th>
                  <th className="px-3 py-2 text-left font-bold text-navy-600 dark:text-text-dark-muted">Production</th>
                  <th className="px-3 py-2 text-left font-bold text-navy-600 dark:text-text-dark-muted">Automated</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${isDark ? 'divide-surface-dark-300' : 'divide-surface-300'}`}>
                {uarData.frequency.matrix.map((row, i) => (
                  <tr key={i} className={`hover:bg-surface-200 dark:hover:bg-surface-dark-200`}>
                    <td className="px-3 py-2 font-semibold text-navy-900 dark:text-text-dark-primary">{row.framework}</td>
                    <td className="px-3 py-2 text-navy-600 dark:text-text-dark-secondary">{row.standard}</td>
                    <td className="px-3 py-2 text-indigo-700 dark:text-indigo-400 font-medium">{row.privileged}</td>
                    <td className="px-3 py-2 text-purple-700 dark:text-purple-400 font-medium">{row.highRisk}</td>
                    <td className="px-3 py-2 text-amber-700 dark:text-amber-400 font-medium">{row.contractors}</td>
                    <td className="px-3 py-2 text-red-700 dark:text-red-400 font-medium">{row.production}</td>
                    <td className="px-3 py-2 text-emerald-700 dark:text-emerald-400">{row.automated}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Risk Tiers */}
          <h4 className="text-xl font-bold text-navy-900 dark:text-text-dark-primary mb-4">Risk-Tiered Operational Guidance</h4>
          <div className="grid md:grid-cols-2 gap-6">
            {uarData.frequency.riskTiers.map((tier, i) => (
              <div key={i} className={`grc-card p-6`}>
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                  <h5 className="grc-card-title font-bold">{tier.tier}</h5>
                </div>
                <p className="text-sm text-navy-600 dark:text-text-dark-secondary mb-3"><span className="font-semibold">Scope:</span> {tier.desc}</p>
                <p className={`text-sm font-semibold px-3 py-2 rounded-lg mb-3
                  ${isDark ? 'bg-indigo-900/30 text-indigo-400 border border-indigo-800' : 'bg-indigo-50 text-indigo-700 border border-indigo-100'}`}>
                  <span className="font-semibold">Frequency:</span> {tier.frequency}
                </p>
                <p className="text-xs text-navy-500 dark:text-text-dark-muted"><span className="font-semibold text-navy-600 dark:text-text-dark-muted">Examples:</span> {tier.examples}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Best Practices */}
        <section>
          <h3 className="text-2xl font-bold text-navy-900 dark:text-text-dark-primary mb-6 flex items-center gap-3">
            <CheckCircle className="w-6 h-6 text-emerald-600 dark:text-emerald-400" /> Operational Best Practices
          </h3>
          <div className="space-y-6">
            {uarData.bestPractices.practices.map((practice, i) => (
              <div key={i} className={`grc-card p-6`}>
                <div className="flex items-center gap-3 mb-4">
                  <practice.icon className="grc-card-icon w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                  <h4 className="grc-card-title font-bold text-lg">{practice.name}</h4>
                </div>
                <ul className="space-y-2 text-sm text-navy-600 dark:text-text-dark-secondary">
                  {practice.details.map((detail, di) => (
                    <li key={di} className="flex gap-2"><CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" /> {detail}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}