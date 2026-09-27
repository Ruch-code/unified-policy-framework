import React, { useState } from 'react';
import { UserCheck, Briefcase, GraduationCap, Server, Shield, AlertTriangle, CheckCircle, Lock, Key, Users, Building2, BadgeCheck, Fingerprint, ChevronDown } from 'lucide-react';

const accessRequirements = {
  fullTime: {
    title: 'Full-Time Employees (FTEs)',
    icon: Users,
    color: 'indigo',
    categories: [
      {
        name: 'Pre-Hire / Onboarding',
        icon: UserCheck,
        requirements: [
          'Signed offer letter and employment agreement with IP assignment, confidentiality, and non-compete clauses',
          'Background verification completed BEFORE first-day access (Checkr, HireRight, Sterling, First Advantage, or equivalent)',
          'Verification scope: Identity, employment history (7 years), education, criminal record (per jurisdiction), credit check (financial roles), sanctions/watchlists',
          'Drug screening (where legally permitted and role-appropriate)',
          'Right-to-work verification (I-9 US, equivalent globally)',
          'Signed Employee Handbook acknowledgment (includes Acceptable Use, Data Classification, Incident Reporting)',
          'Security awareness training completion (within 30 days of start; annual thereafter)',
          'NDA/Confidentiality agreement signed before any proprietary data access',
        ],
        frameworks: ['SOC 2 CC6.1', 'ISO 27001 A.7.1.1', 'PCI-DSS 12.7', 'HIPAA 164.308(a)(3)', 'NIST PR.AA-5', 'CIS 5.1', 'GDPR Art 32', 'DPDPA Sec 7/8'],
      },
      {
        name: 'Identity & Access Provisioning',
        icon: BadgeCheck,
        requirements: [
          'Unique user identity in IdP (Entra ID, Okta, Ping, Google) — no shared/generic accounts',
          'Role-based access control (RBAC) — access granted via groups/roles, not direct assignment',
          'Least privilege: default deny; explicit allow per job function',
          'Privileged Access Management (PAM) for admin/root/db/cloud keys — vaulted, session-recorded, JIT',
          'MFA enforced for ALL access (phishing-resistant FIDO2/WebAuthn for privileged; push+number matching for standard)',
          'Conditional Access: device compliance (MDM/Intune), location, risk score, IP reputation',
          'Automated provisioning via HR→IdP sync (Workday, BambooHR, Rippling → SCIM)',
          'Break-glass accounts: documented, time-limited, alerted, reviewed quarterly',
        ],
        frameworks: ['SOC 2 CC6.1-6.7', 'ISO A.8.1-8.5', 'PCI 7, 8', 'NIST PR.AA', 'CIS 5, 6', 'FedRAMP IA-2, AC-2', 'CJIS 5.6'],
      },
      {
        name: 'Ongoing Access Governance',
        icon: Shield,
        requirements: [
          'Quarterly access reviews (automated via IdP) — manager attestation + privilege report',
          'Semi-annual privileged access review (separate from standard) — CISO/IT Director sign-off',
          'Immediate revocation on role change/termination (HR→IdP auto-deprovision < 4 hours)',
          'Annual re-certification for high-risk roles (production, financial, legal, HR)',
          'Dormant account detection (>45 days inactive) → disable → delete after 90 days',
          'Annual background re-check for privileged/financial/legal roles (or per regulatory mandate)',
          'Continuous monitoring: SIEM alerts on privilege escalation, impossible travel, anomalous access',
        ],
        frameworks: ['SOC 2 CC6.1', 'ISO A.8.2', 'PCI 7.2, 8.2', 'NIST PR.AA-6', 'CIS 5.3', 'HIPAA 164.308(a)(4)'],
      },
      {
        name: 'Production Environment Access',
        icon: Server,
        requirements: [
          'Explicit approval: Change Advisory Board (CAB) or Production Access Board (manager + security + compliance)',
          'Time-bound access: maximum 8-hour windows (JIT via PAM/Entra PIM/AWS IAM Identity Center)',
          'MFA + device compliance + approved bastion/privileged access workstation (PAW) mandatory',
          'Full session recording (keystroke, video) — retained 1 year minimum',
          'No direct SSH/RDP — use SSM Session Manager, Azure Bastion, PAM proxy, or Teleport',
          'Read-only by default; write access requires separate change ticket + approval',
          'Secrets injected at runtime (Vault, AWS Secrets Manager, Azure Key Vault, CyberArk) — no hardcoded credentials',
          'Post-access review: automated log audit within 24h; anomaly → immediate investigation',
        ],
        frameworks: ['SOC 2 CC6.1, CC7.2', 'ISO A.8.2, A.8.3', 'PCI 7.2, 8.3, 10', 'NIST PR.AC-3', 'CIS 4.5, 6.4', 'FedRAMP AC-3, AC-17', 'HIPAA 164.312(a)'],
      },
      {
        name: 'Offboarding',
        icon: Lock,
        requirements: [
          'Automated trigger from HRIS termination date → IdP disable + revoke all tokens/sessions',
          'Immediate: VPN, SSO, email, GitHub, cloud consoles, VPN, databases, SaaS apps',
          'PAM: revoke vault access, rotate all credentials the user had access to',
          'Device: remote wipe (MDM), collect hardware, revoke certificates',
          'Access review within 24h: verify no orphaned accounts, shared credentials, or backdoors',
          'Exit interview includes security obligations reminder (IP, confidentiality, non-disparagement)',
          'Retain audit logs for departed user per retention policy (min 1 year; 6 years HIPAA/PCI)',
        ],
        frameworks: ['SOC 2 CC6.7', 'ISO A.7.3.1', 'PCI 8.1.4', 'NIST PR.IP-11', 'CIS 5.3', 'HIPAA 164.308(a)(4)'],
      },
    ],
  },
  contractors: {
    title: 'Contractors & Vendors',
    icon: Briefcase,
    color: 'violet',
    categories: [
      {
        name: 'Pre-Engagement',
        icon: Briefcase,
        requirements: [
          'Signed MSA/SOW with security addendum (data handling, breach notification, audit rights, return/destroy)',
          'Background check per client policy (typically: identity, criminal, employment, education, sanctions)',
          'NDA + Confidentiality agreement before any access',
          'Security awareness training acknowledgment (client-provided or contractor-provided evidence)',
          'Device compliance: contractor device must meet client MDM/EDR/encryption standards OR use client-provisioned VDI/DAAS',
          'Cyber insurance certificate (typically $1M+ cyber liability) — required for vendors with data access',
        ],
        frameworks: ['SOC 2 CC9.1', 'ISO A.5.19', 'PCI 12.8', 'HIPAA 164.504 (BAA)', 'GDPR Art 28', 'NIST ID.SC', 'FedRAMP SA-9'],
      },
      {
        name: 'Access Provisioning',
        icon: Key,
        requirements: [
          'Separate identity in IdP (contractor@domain.com) — no access to employee-only groups',
          'Time-bound access: auto-expiry at contract end date (max 1 year, renewable with re-review)',
          'Project-scoped RBAC: access only to systems/data required for SOW deliverables',
          'No production write access without explicit CAB approval + PAM session recording',
          'MFA mandatory (same standard as FTEs); phishing-resistant for any privileged access',
          'No local admin on contractor devices unless approved + monitored',
          'VPN/Zero Trust Network Access (ZTNA) with device posture check (Tailscale, Cloudflare Access, NetBird, Twingate)',
        ],
        frameworks: ['SOC 2 CC6.1, CC9.2', 'ISO A.8.1, A.5.20', 'PCI 7.1, 8.1', 'NIST PR.AA, ID.SC', 'CIS 5.1, 6.4'],
      },
      {
        name: 'Ongoing Governance',
        icon: Shield,
        requirements: [
          'Monthly access review (automated) — contractor manager + client sponsor attestation',
          'Quarterly re-verification: background check current, insurance current, device compliant',
          'Immediate revocation on contract end/termination (HRIS/vendor management system trigger)',
          'Incident reporting: contractor must report security incidents within 1 hour (per contract SLA)',
          'Annual penetration test / vulnerability scan of contractor environment (if hosting client data)',
          'Sub-contractor flow-down: contractor must impose same requirements on their subs',
        ],
        frameworks: ['SOC 2 CC9.2', 'ISO A.5.21', 'PCI 12.8.5', 'HIPAA 164.504', 'GDPR Art 28', 'NIST ID.SC'],
      },
      {
        name: 'Production Access (Contractors)',
        icon: Server,
        requirements: [
          'Exception-only: requires CISO + Legal + Compliance sign-off',
          'Maximum 4-hour JIT windows via PAM; session recorded; read-only default',
          'Dedicated contractor bastion/VDI — no direct network access to production',
          'All commands logged; automated anomaly detection (impossible commands, bulk data access)',
          'Post-session: automated log review + contractor manager attestation within 4 hours',
        ],
        frameworks: ['SOC 2 CC6.1, CC7.2', 'ISO A.8.3', 'PCI 8.3, 10', 'NIST PR.AC-3', 'FedRAMP AC-17'],
      },
    ],
  },
  interns: {
    title: 'Interns & Trainees',
    icon: GraduationCap,
    color: 'emerald',
    categories: [
      {
        name: 'Pre-Start',
        icon: GraduationCap,
        requirements: [
          'Signed internship agreement with IP assignment, confidentiality, and mentorship structure',
          'Background check: identity, education verification, criminal (basic), right-to-work/student visa',
          'University/bootcamp partnership agreement (if applicable) — defines scope, supervision, data access',
          'Security awareness training (abridged) + Acceptable Use Policy acknowledgment',
          'Device: client-provisioned laptop/VDI only — no BYOD for interns',
        ],
        frameworks: ['SOC 2 CC6.1', 'ISO A.7.1.1', 'NIST PR.AA-5', 'CIS 5.1'],
      },
      {
        name: 'Access Provisioning',
        icon: Key,
        requirements: [
          'Separate identity (intern@domain.com) — distinct from FTE/contractor groups',
          'Default: NO production access, NO privileged access, NO customer data access',
          'Access limited to: training environment, sandbox, documentation wiki, learning platforms',
          'Mentor-sponsored access: every access grant requires mentor approval + expiration date',
          'MFA mandatory (Authenticator app minimum; FIDO2 if available)',
          'Time-bound: auto-expiry at program end date (max 6 months, non-renewable without re-review)',
          'No VPN — use ZTNA/VDI with strict egress controls',
        ],
        frameworks: ['SOC 2 CC6.1', 'ISO A.8.1', 'NIST PR.AA', 'CIS 5.1, 6.4'],
      },
      {
        name: 'Ongoing Supervision',
        icon: Users,
        requirements: [
          'Daily mentor check-in (async or sync); weekly mentor access review',
          'All intern activity logged and reviewed weekly by mentor + security',
          'Zero tolerance for policy violations — immediate access revocation + program review',
          'No access to secrets, keys, certificates, or credential stores',
          'Code commits: signed, reviewed by mentor, scanned (SAST/SCA) before merge',
        ],
        frameworks: ['SOC 2 CC6.1, CC8.1', 'ISO A.8.2, A.12.1', 'NIST PR.IP-1'],
      },
      {
        name: 'Production Access (Interns)',
        icon: Server,
        requirements: [
          'NEVER — interns do not receive production access under any circumstance',
          'If business-critical exception: CISO + Legal + University Dean sign-off; 2-hour max; full recording; mentor co-pilot',
        ],
        frameworks: ['SOC 2 CC6.1', 'ISO A.8.1', 'PCI 7.1', 'HIPAA 164.308(a)(3)'],
      },
      {
        name: 'Offboarding',
        icon: Lock,
        requirements: [
          'Automated revocation on program end date (HRIS/ATS trigger)',
          'Mentor confirms: all code committed, docs updated, devices returned, accounts disabled',
          'Exit survey includes security awareness assessment',
          'Retain logs per standard retention; no special handling',
        ],
        frameworks: ['SOC 2 CC6.7', 'ISO A.7.3.1', 'NIST PR.IP-11'],
      },
    ],
  },
  productionAccess: {
    title: 'Production Access Personnel',
    icon: Server,
    color: 'red',
    note: 'Applies to ANY persona (FTE, contractor, vendor) granted production access — additive to their base requirements.',
    categories: [
      {
        name: 'Approval & Authorization',
        icon: Shield,
        requirements: [
          'Production Access Request Form: requestor, business justification, systems, duration, risk assessment',
          'Approvers: Direct Manager + Security Lead + Compliance (for regulated data) + Data Owner',
          'Ticket reference required (change request, incident, deployment) — no standing access',
          'Maximum duration: 8 hours (standard), 4 hours (contractor), 2 hours (emergency break-glass)',
          'Auto-expiry enforced by PAM/PIM — no manual revocation reliance',
        ],
        frameworks: ['SOC 2 CC6.1', 'ISO A.8.2, A.9.2', 'PCI 7.2, 8.3', 'NIST PR.AC-3, PR.IP-3', 'FedRAMP AC-3', 'HIPAA 164.308(a)(4)'],
      },
      {
        name: 'Technical Enforcement',
        icon: Lock,
        requirements: [
          'Zero Standing Privileges (ZSP) — all access is just-in-time, just-enough',
          'PAM / PIM / Entra PIM / AWS IAM Identity Center / Teleport / Boundary — session broker mandatory',
          'Bastion / PAW / VDI only — no direct SSH/RDP/DB client from user workstation',
          'Hardware-bound MFA (FIDO2 key) + device compliance (MDM/Intune/EDR healthy) + approved IP range',
          'Session recording: video + keystrokes + command audit trail (retained 1 year min; 6 years regulated)',
          'Secrets injection at runtime (HashiCorp Vault, AWS Secrets Manager, Azure Key Vault, CyberArk)',
          'No sudo/root without ticket + recording; command allow-lists where feasible',
          'Network micro-segmentation: access only to target host/port; no lateral movement',
        ],
        frameworks: ['SOC 2 CC6.1, CC7.2', 'ISO A.8.3, A.13.1', 'PCI 8.3, 10.2', 'NIST PR.AC-3, SC-7', 'CIS 4.5, 6.4', 'FedRAMP AC-17, SC-7'],
      },
      {
        name: 'Monitoring & Accountability',
        icon: AlertTriangle,
        requirements: [
          'Real-time SIEM alerts: privilege use, anomalous commands, data egress, geo-impossible, time anomalies',
          'Automated post-session review (within 24h): command analysis, data accessed, duration vs. ticket',
          'Monthly production access audit: all sessions reviewed by Security + Compliance',
          'Quarterly: production access pattern analysis → reduce scope, eliminate standing access',
          'Annual: red team / purple team exercise targeting production access paths',
        ],
        frameworks: ['SOC 2 CC7.2, CC7.3', 'ISO A.12.4', 'PCI 10.2, 10.6', 'NIST DE.CM, DE.AE', 'CIS 8.5, 8.11', 'FedRAMP SI-4'],
      },
      {
        name: 'Emergency / Break-Glass',
        icon: Key,
        requirements: [
          'Pre-approved break-glass accounts (max 2 per critical system) — credentials in sealed envelope / vault',
          'Activation: CISO + On-Call Manager dual approval (Slack/Teams + phone confirmation)',
          'Auto-alerts: Security, Compliance, CISO, Audit — immediate on activation',
          'Time-boxed: maximum 4 hours; auto-revoke; full session recording',
          'Post-incident: root cause analysis within 48h; break-glass review at next CAB',
          'Break-glass usage = automatic audit finding if not justified',
        ],
        frameworks: ['SOC 2 CC6.1', 'ISO A.9.2, A.16.1', 'PCI 8.3, 12.10', 'NIST PR.IP-3, RS.AN', 'FedRAMP AC-3, IR-4'],
      },
    ],
  },
};

// Dark mode framework badge - WCAG AA compliant
const frameworkBadgeDark = 'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-surface-dark-200 border border-surface-dark-300 text-text-dark-primary hover:border-indigo-400 hover:text-white transition-colors duration-200';
const frameworkBadgeLight = 'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-surface-200 border border-surface-300 text-navy-700 hover:bg-indigo-50 hover:border-indigo-400 hover:text-indigo-700 transition-colors duration-200';

const frameworkBadge = (isDark) => isDark ? frameworkBadgeDark : frameworkBadgeLight;

// Key enforcement term highlight
const enforcementTerm = (isDark) => `inline px-1.5 py-0.5 rounded text-xs font-semibold ${isDark ? 'bg-indigo-900/40 text-indigo-300' : 'bg-indigo-50 text-indigo-700'}`;

export default function AccessRequirements({ isDark = false }) {
  // Persona accordion state — collapsed by default, toggled per persona.
  const [openPersonas, setOpenPersonas] = useState({});
  const togglePersona = (key) => {
    setOpenPersonas((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const personas = [
    { key: 'fullTime', label: 'Full-Time Employees (FTEs)', icon: Users, color: 'indigo' },
    { key: 'contractors', label: 'Contractors & Vendors', icon: Briefcase, color: 'violet' },
    { key: 'interns', label: 'Interns & Trainees', icon: GraduationCap, color: 'emerald' },
    { key: 'productionAccess', label: 'Production Access Personnel', icon: Server, color: 'red' },
  ];

  return (
    <div className={`py-16 ${isDark ? 'bg-dark-bg' : 'bg-surface-50'}`}>
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-navy-900 dark:text-text-dark-primary mb-4 tracking-tight">
            Persona Access Governance
          </h2>
          <p className="text-lg text-navy-600 dark:text-text-dark-secondary max-w-3xl mx-auto">
            Role-based access requirements for FTEs, contractors, interns, and production personnel — mapped to SOC 2, ISO 27001, PCI-DSS, HIPAA, NIST, CIS, FedRAMP, GDPR, DPDPA, CJIS.
          </p>
        </div>

        {/* Persona Cards */}
        {personas.map(({ key, label, icon: Icon, color }) => {
          const persona = accessRequirements[key];
          const isOpen = !!openPersonas[key];
          return (
            <section key={key} className={`mb-6 rounded-2xl border overflow-hidden transition-colors
              ${isDark 
                ? 'bg-surface-dark-100 border-surface-dark-300' 
                : 'bg-surface-100 border-surface-300'}`}>
              {/* Persona Header — toggles the accordion */}
              <button
                type="button"
                onClick={() => togglePersona(key)}
                aria-expanded={isOpen}
                aria-controls={`${key}-content`}
                className={`w-full flex items-center justify-between gap-4 p-6 md:p-8 text-left transition-colors hover:bg-surface-200 dark:hover:bg-surface-dark-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-indigo-600 dark:text-indigo-400`} style={{ backgroundColor: 'rgba(99, 102, 241, 0.1)' }}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-navy-900 dark:text-text-dark-primary">{label}</h3>
                    {persona.note && (
                      <p className="text-sm text-navy-600 dark:text-text-dark-secondary mt-1">
                        {persona.note}
                      </p>
                    )}
                  </div>
                </div>
                <span className="inline-flex items-center gap-2 shrink-0 text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                  {isOpen ? 'Hide requirements' : 'View requirements'}
                  <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                </span>
              </button>

              {/* Collapsible Category Content — smooth grid-rows animation */}
              <div
                id={`${key}-content`}
                className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
              >
                <div className="overflow-hidden">
                  <div className="px-6 md:px-8 pb-8 border-t border-surface-300 dark:border-surface-dark-300">
                    {/* Category Sections */}
                    {persona.categories.map((cat, ci) => (
                      <div key={ci} className="mb-10 last:mb-0">
                        <h4 className="font-semibold text-lg text-navy-900 dark:text-text-dark-primary mb-5 flex items-center gap-2">
                          <cat.icon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                          {cat.name}
                        </h4>

                        {/* Requirements List */}
                        <ul className="space-y-3 mb-6" role="list">
                          {cat.requirements.map((req, ri) => (
                            <li key={ri} className="flex gap-3">
                              <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-emerald-500" aria-hidden="true" />
                              <span className={`text-base leading-relaxed ${isDark ? 'text-text-dark-secondary' : 'text-navy-700'}`}>
                                {req.split(' — ').map((part, idx) => (
                                  <React.Fragment key={idx}>
                                    {idx === 0 ? (
                                      <span className="font-medium text-navy-900 dark:text-text-dark-primary">{part}</span>
                                    ) : (
                                      <span className="text-navy-600 dark:text-text-dark-secondary">{' — ' + part}</span>
                                    )}
                                  </React.Fragment>
                                ))}
                              </span>
                            </li>
                          ))}
                        </ul>

                        {/* Framework Badges */}
                        <div className="flex flex-wrap gap-2" role="list" aria-label={`${cat.name} compliance frameworks`}>
                          {cat.frameworks.map((fw, fi) => (
                            <span key={fi} className={frameworkBadge(isDark)} role="listitem">
                              {fw}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          );
        })}

        {/* Quick Reference Matrix */}
        <section className={`rounded-2xl border overflow-hidden
          ${isDark ? 'bg-surface-dark-100 border-surface-dark-300' : 'bg-surface-100 border-surface-300'}`}>
          <div className={`p-6 border-b ${isDark ? 'border-surface-dark-300' : 'border-surface-300'}`}>
            <h3 className="text-xl font-bold text-navy-900 dark:text-text-dark-primary flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              Quick Reference Matrix
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full" role="table">
              <thead className={`bg-dark-bg dark:bg-dark-bg border-b ${isDark ? 'border-surface-dark-300' : 'border-surface-300'}`}>
                <tr>
                  <th className="px-5 py-4 text-left text-xs font-bold text-navy-600 dark:text-text-dark-muted uppercase tracking-wider w-56">Requirement</th>
                  <th className="px-5 py-4 text-left text-xs font-bold text-navy-600 dark:text-text-dark-muted uppercase tracking-wider">Full-Time Employees</th>
                  <th className="px-5 py-4 text-left text-xs font-bold text-navy-600 dark:text-text-dark-muted uppercase tracking-wider">Contractors & Vendors</th>
                  <th className="px-5 py-4 text-left text-xs font-bold text-navy-600 dark:text-text-dark-muted uppercase tracking-wider">Interns & Trainees</th>
                  <th className="px-5 py-4 text-left text-xs font-bold text-navy-600 dark:text-text-dark-muted uppercase tracking-wider">Production Access</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${isDark ? 'divide-surface-dark-300' : 'divide-surface-300'}`}>
                {[
                  { req: 'Background check pre-access', fte: '✓ Full', contractor: '✓ Per MSA', intern: '✓ Basic', prod: '✓ + Annual re-check' },
                  { req: 'Unique IdP identity', fte: '✓', contractor: '✓ (separate)', intern: '✓ (separate)', prod: '✓' },
                  { req: 'MFA (phishing-resistant)', fte: '✓ Privileged', contractor: '✓ Privileged', intern: '✓ Standard', prod: '✓ Mandatory (FIDO2)' },
                  { req: 'RBAC / Least privilege', fte: '✓', contractor: '✓ Project-scoped', intern: '✓ Sandbox only', prod: '✓ JIT + ZSP' },
                  { req: 'Automated provisioning', fte: '✓ HR→IdP', contractor: '✓ VMS→IdP', intern: '✓ ATS→IdP', prod: '✓ PAM/PIM' },
                  { req: 'Access review frequency', fte: 'Quarterly', contractor: 'Monthly', intern: 'Weekly (mentor)', prod: 'Per session + Monthly' },
                  { req: 'Production write access', fte: 'CAB + JIT (8h)', contractor: 'Exception only (4h)', intern: '✗ Never', prod: 'JIT + Recording' },
                  { req: 'Session recording', fte: 'Privileged only', contractor: 'All prod', intern: 'N/A', prod: '✓ Full (video+keys)' },
                  { req: 'Offboarding SLA', fte: '< 4 hours', contractor: 'Immediate', intern: 'Program end', prod: 'Immediate + key rotation' },
                  { req: 'Device compliance', fte: 'MDM/EDR', contractor: 'MDM/EDR or VDI', intern: 'Client VDI only', prod: 'PAW/Bastion only' },
                ].map((row, i) => (
                  <tr key={i} className={`transition-colors ${i % 2 === 0 ? (isDark ? 'bg-surface-dark-100' : 'bg-surface-100') : (isDark ? 'bg-dark-bg' : 'bg-surface-50')}`}>
                    <td className="px-5 py-4 text-sm font-medium text-navy-900 dark:text-text-dark-primary">{row.req}</td>
                    <td className="px-5 py-4 text-sm text-navy-700 dark:text-text-dark-secondary">{row.fte}</td>
                    <td className="px-5 py-4 text-sm text-navy-700 dark:text-text-dark-secondary">{row.contractor}</td>
                    <td className="px-5 py-4 text-sm text-navy-700 dark:text-text-dark-secondary">{row.intern}</td>
                    <td className="px-5 py-4 text-sm text-red-700 dark:text-red-400 font-medium">{row.prod}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}