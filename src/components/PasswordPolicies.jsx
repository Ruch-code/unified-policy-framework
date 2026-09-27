import React from 'react';
import { CheckCircle, AlertTriangle, Shield, Key, Zap, Cpu, Globe, Users, Database, Lock, SearchCheck, ClipboardList, ExternalLink, MessageSquareText } from 'lucide-react';

const passwordPolicyData = {
  entraId: {
    title: 'Microsoft Entra ID (Azure AD) Password Policies',
    description: 'Cloud-native identity platform with configurable password protection and smart lockout.',
    icon: Cpu,
    color: 'blue',
    policies: {
      default: {
        name: 'Default Policy (Cannot be disabled)',
        requirements: [
          'Minimum 8 characters, maximum 256 characters',
          'Complexity: 3 of 4 (uppercase, lowercase, numbers, symbols)',
          'Ban list: Global Microsoft banned passwords (updated continuously)',
          'Smart lockout: Threshold 10 failed attempts, lockout duration escalates',
        ],
        useCase: 'All tenants — baseline for any Azure/Microsoft 365 environment',
      },
      custom: {
        name: 'Custom Banned Password List (P1/P2)',
        requirements: [
          'Add up to 1000 custom banned passwords per tenant',
          'Case-insensitive, fuzzy matching (Levenshtein distance = 1)',
          'Applies on password change/reset, not on login',
        ],
        useCase: 'Organizations needing industry/brand-specific password blocking',
      },
      passwordProtection: {
        name: 'Azure AD Password Protection (On-prem)',
        requirements: [
          'DC agent + proxy service extends cloud banned list to on-prem AD',
          'Audit mode → Enforce mode transition',
          'Requires Windows Server 2012+ DCs, .NET 4.7+',
        ],
        useCase: 'Hybrid environments with on-prem AD sync via Entra Connect',
      },
      passwordless: {
        name: 'Passwordless Options (Recommended)',
        options: [
          'Windows Hello for Business (biometric/PIN, TPM-backed)',
          'FIDO2 security keys (YubiKey, Feitian, etc.)',
          'Microsoft Authenticator (phone sign-in with number matching)',
          'Certificate-based authentication (CBA)',
        ],
        useCase: 'High-security environments, phishing-resistant MFA mandate (NIST AAL3, FedRAMP High)',
      },
    },
    bestPractices: [
      'Enable custom banned list with org-specific terms (company name, products, seasons, local sports teams)',
      'Deploy Password Protection in Audit mode for 30 days before Enforce to measure impact',
      'Target passwordless for all admins first (Privileged Identity Management integration)',
      'Use Conditional Access to require phishing-resistant MFA for privileged roles',
      'Monitor "Password Protection" logs in Entra ID > Protection > Password protection',
    ],
  },
  alternatives: [
    {
      name: 'Okta',
      category: 'IDaaS / SSO',
      icon: Shield,
      color: 'purple',
      features: [
        'Custom password policies per group/app (min length, complexity, age, history, dictionary)',
        'Okta Expression Language for dynamic policy logic',
        'Breached credential detection (Have I Been Pwned integration)',
        'Progressive profiling + step-up authentication',
        'Passwordless: Okta FastPass (device-bound), WebAuthn/FIDO2, Email magic links, SMS',
        'Universal Directory — single source of truth across HR, AD, LDAP, apps',
      ],
      bestFor: 'Multi-cloud, heterogeneous app stacks, advanced lifecycle management',
      pricing: 'Per user/month; MFA/Adaptive included in most tiers',
    },
    {
      name: 'Ping Identity (PingOne)',
      category: 'IDaaS / SSO',
      icon: Globe,
      color: 'teal',
      features: [
        'Policy trees with branching logic (risk, device, location, user attributes)',
        'Passwordless: FIDO2, PingID mobile, QR code, email magic links',
        'DaVinci orchestration — no-code auth flows across apps',
        'Fine-grained authorization (ZTA) with policy decisions at runtime',
        'Excellent for banking/finance (FedRAMP, SOC 2, ISO certified)',
      ],
      bestFor: 'Regulated industries, complex auth journeys, zero-trust architecture',
      pricing: 'Enterprise licensing; contact sales',
    },
    {
      name: 'Auth0 (by Okta)',
      category: 'CIAM / Developer-first',
      icon: Key,
      color: 'orange',
      features: [
        'Tenant-level password policies (dictionary, breached credentials, complexity)',
        'Actions (code-based extensibility) for custom login/registration flows',
        'Passwordless: Email magic links, SMS OTP, WebAuthn, Passkeys (FIDO2)',
        'Organizations (B2B) — per-org login, SSO, MFA, branding',
        'Attack protection: brute force, breached credentials, bot detection',
      ],
      bestFor: 'Customer-facing apps, B2B SaaS, developer-centric teams',
      pricing: 'Free tier up to 7,500 MAU; B2B/Enterprise paid',
    },
    {
      name: 'AWS IAM Identity Center (SSO)',
      category: 'Cloud Provider SSO',
      icon: Database,
      color: 'amber',
      features: [
        'Delegated authentication to external IdP (Entra ID, Okta, Ping, AD FS, Google)',
        'No native password policy — relies on source IdP',
        'Permission sets with session duration, MFA context, tag-based access',
        'Cross-account AWS access with short-lived credentials (STS)',
        'Integrates with AWS Organizations, CloudTrail, Config',
      ],
      bestFor: 'AWS-heavy orgs, multi-account strategies, federated access',
      pricing: 'Free (standard); paid for advanced features (SCIM, etc.)',
    },
    {
      name: 'Google Cloud Identity / Workspace',
      category: 'Cloud Provider SSO',
      icon: Cpu,
      color: 'red',
      features: [
        'Password length (8-100), 2-step verification enforcement',
        'Context-aware access (device, location, IP, user group)',
        'Passwordless: Passkeys (FIDO2), Titan security keys, Google Prompt',
        'Mandatory 2SV for all users (enforceable via Admin Console)',
        'Sync with Entra ID / Okta / Ping via SAML/OIDC',
      ],
      bestFor: 'Google Workspace shops, ChromeOS fleets, Android Enterprise',
      pricing: 'Free (Cloud Identity Free); paid for Premium/Enterprise',
    },
    {
      name: 'Keycloak (Self-hosted)',
      category: 'Open Source / Self-hosted',
      icon: Lock,
      color: 'gray',
      features: [
        'Realm-level password policies (length, chars, hash algo, history, expiry, regex)',
        'Custom authenticators (SPI) for any logic',
        'Passwordless: WebAuthn/FIDO2, OTP, Kerberos, X.509',
        'Identity brokering (SAML/OIDC) to Entra ID, Okta, Google, GitHub, etc.',
        'Fine-grained admin console, SPI for everything',
      ],
      bestFor: 'Data sovereignty, air-gapped, cost-sensitive, full control',
      pricing: 'Free (open source); support via Red Hat SSO or vendors',
    },
    {
      name: 'CyberArk / BeyondTrust / Delinea',
      category: 'PAM (Privileged Access Management)',
      icon: Users,
      color: 'indigo',
      features: [
        'Vaulted credentials — no human knows privileged passwords',
        'Session recording, keystroke logging, just-in-time elevation',
        'Password rotation automation (daily/on-check-in/on-demand)',
        'MFA for vault access, break-glass procedures',
        'Integrates with Entra ID, Okta, Ping, AD for identity',
      ],
      bestFor: 'Privileged accounts (domain admins, root, DBAs, cloud keys), compliance (SOX, PCI, HIPAA)',
      pricing: 'Enterprise; per privileged account/session',
    },
  ],
  recommendations: [
    {
      scenario: 'Startup / SMB (Microsoft 365 + few SaaS apps)',
      primary: 'Entra ID (included in M365) + Custom Banned List (P1)',
      mfa: 'Authenticator app + Number Matching (phishing-resistant)',
      passwordless: 'Microsoft Authenticator phone sign-in for all',
      why: 'Low cost, integrated, covers 90% of needs; upgrade to P2 for Identity Protection',
    },
    {
      scenario: 'Mid-market / Multi-cloud (AWS + Azure + SaaS)',
      primary: 'Okta or Entra ID P2 as primary IdP',
      mfa: 'Phishing-resistant (FIDO2/WebAuthn) for admins; Push + Number Matching for users',
      passwordless: 'Okta FastPass / Windows Hello / FIDO2 keys for privileged',
      why: 'Universal Directory syncs HR→IdP→Apps; adaptive MFA reduces friction',
    },
    {
      scenario: 'Regulated Enterprise (Finance, Healthcare, Gov)',
      primary: 'Ping Identity or Entra ID P2 + PAM (CyberArk/BeyondTrust)',
      mfa: 'Mandatory FIDO2/WebAuthn for all privileged; conditional access per risk',
      passwordless: 'FIDO2 keys (YubiKey) for all admins; passkeys for end users',
      why: 'Policy orchestration (DaVinci), ZTA, audit trails, FedRAMP/PCI/HIPAA evidence',
    },
    {
      scenario: 'B2B SaaS / Customer Identity (CIAM)',
      primary: 'Auth0 or Entra External ID',
      mfa: 'Adaptive MFA (risk-based); passkeys for returning users',
      passwordless: 'Email magic links (low friction); Passkeys (FIDO2) for power users',
      why: 'Developer extensibility (Actions), org-level SSO, branding, scale',
    },
    {
      scenario: 'Data Sovereignty / Air-gapped / Cost-sensitive',
      primary: 'Keycloak (self-hosted) + AD/LDAP sync',
      mfa: 'WebAuthn/FIDO2 + TOTP (FreeOTP/Google Authenticator)',
      passwordless: 'WebAuthn/FIDO2 keys; Kerberos for internal apps',
      why: 'Full control, no SaaS dependency, extensible via SPI, zero license cost',
    },
    {
      scenario: 'AWS-Native Organization',
      primary: 'AWS IAM Identity Center + External IdP (Entra ID/Okta)',
      mfa: 'Enforced via source IdP; IAM Identity Center passes MFA context',
      passwordless: 'Delegated to source IdP (Entra passwordless, Okta FastPass)',
      why: 'Central AWS access, short-lived creds, no IAM users, SCIM provisioning',
    },
  ],
  frameworks: {
    nist: 'NIST 800-63B: No forced rotation; length ≥8 (64 max); check against breached corpus; MFA required (AAL2), phishing-resistant (AAL3)',
    pci: 'PCI-DSS v4.0 Req 8: No periodic rotation; change on compromise; MFA for all CDE access (8.4.2); phishing-resistant for remote admin',
    iso: 'ISO 27001 A.8.5: Risk-based; no mandated rotation; secret management (A.8.24); access review (A.8.2)',
    soc2: 'SOC 2 CC6.6: MFA for remote/privileged; CC6.1: provisioning/deprovisioning tied to HR',
    hipaa: '164.308(a)(4) + 164.312(a): Unique user ID, access authorization, audit controls; addressable encryption',
    cis: 'CIS v8 Safeguard 5.2 (unique passwords), 5.3 (disable dormant), 6.4 (MFA for external/privileged), 6.5 (MFA for admin)',
    fedramp: 'FedRAMP Moderate/High: NIST 800-53 IA-2, IA-5, AC-2, AC-3; phishing-resistant MFA for privileged (IA-2(1))',
    cjis: 'CJIS 5.6: Advanced auth (MFA) for remote; fingerprint background for personnel; encryption',
  },
};

const auditTechnique = {
  title: 'Policy vs. Intune Password Discrepancy',
  scenario: 'The Access Control Policy states a minimum password length of 8 characters, but the Intune device configuration for macOS and Windows shows a minimum of 4. The audit question — "which minimum actually governed during the observation period?" — has to be answered with evidence instead of assumptions.',
  source: {
    cloudOnly: 'Account passwords are governed by Entra\'s built-in policy, so the minimum is the fixed 8. The identity-layer minimum was genuinely 8 for the entire period; the lower Intune device minimum only governs local device (sign-in) passwords, not the account.',
    synced: 'The account password is actually set and enforced by the on-premises Default Domain Policy (Group Policy), and Entra only syncs the result. The real minimum-length rule lives in on-prem AD (Default Domain Policy → Computer Configuration → Windows Settings → Security Settings → Account Policies → Password Policy) — that tells you which minimum actually governed during the audit window.',
  },
  evidence: [
    {
      step: '1',
      title: 'Entra account password',
      icon: Cpu,
      tint: 'indigo',
      nav: 'entra.microsoft.com → Protection → Authentication methods → Password protection',
      items: [
        'Screenshot the lockout threshold, lockout duration, and banned-password list, with the system clock visible.',
        'Cloud-only accounts: Entra\'s minimum length is fixed at 8 and is not shown as a setting — evidence that with Microsoft\'s doc instead.',
      ],
      link: 'https://learn.microsoft.com/en-us/entra/identity/authentication/concept-sspr-policy',
    },
    {
      step: '2',
      title: 'Intune device password — this is where the “4” likely is',
      icon: Lock,
      tint: 'purple',
      nav: 'intune.microsoft.com → Devices → Configuration profiles (also check Compliance policies)',
      items: [
        'Open the Windows profile, then the macOS profile.',
        'Find Minimum password length under the password settings.',
        'Screenshot each with the profile\'s created/modified date visible.',
      ],
    },
    {
      step: '3',
      title: 'Password expiration',
      icon: Zap,
      tint: 'emerald',
      nav: 'admin.microsoft.com → Settings → Org settings → Security & privacy → Password expiration policy',
      items: [
        'Screenshot the policy value and the users/groups it applies to.',
        'Date-stamp the capture so the expiry policy maps to the audit window.',
      ],
    },
  ],
  responses: [
    {
      title: '1 — Accept the risk',
      scope: 'When the finding stands (effective minimum was 4 during the period)',
      icon: AlertTriangle,
      tint: 'amber',
      items: [
        'Log a documented risk assessment covering what the 4-char exposure actually touches, and who accepts it.',
        'List the compensating controls already in force (MFA, smart lockout, banned-password list, Conditional Access).',
        'Define a timeboxed remediation — align the Intune profiles to 8 — with a committed target date.',
        'Capture formal sign-off from the control owner / leadership in the risk register.',
        'Remeasure and re-screenshot the Intune profiles at the next quarterly review as closure evidence.',
      ],
    },
    {
      title: '2 — Push back on the finding',
      scope: 'When the governing minimum actually met the policy',
      icon: Shield,
      tint: 'emerald',
      items: [
        'Run Step 0 first: cloud-only vs synced decides which minimum really governed.',
        'Cloud-only: the identity-layer minimum was fixed at 8 all period; the 4 lives only in the local device layer — cite Microsoft\'s SSPR / password-policy doc.',
        'Synced: reference the on-prem Default Domain Policy evidence to show the enforcing rule actually met 8.',
        'Drive the Intune device profiles to 8 anyway to close the residual device-layer gap.',
        'Ask the auditor to re-scope the observation to the governing policy layer (account vs local device).',
      ],
    },
  ],
  pushback: {
    question: 'Can we keep the Windows device minimum password length at 4? Changing it to 8 might require changes on some client devices and create issues.',
    answer: [
      'Enforcing a minimum length of 8 on Windows devices in Intune does NOT force users to reset existing device passwords. The setting applies when a password is newly set or next changed, so current devices keep working with zero forced disruption.',
      'Roll out in waves to remove even that risk: start with a pilot ring (e.g., IT + 5% of devices), watch Intune compliance and sign-in logs for 1–2 weeks, then broad-deploy. Any genuine exceptions go through the standard exception tracker, not the configuration.',
      'Scope check: this is the device sign-in password only — Windows Hello PIN, BitLocker PIN, and Wi-Fi passphrases are separate settings and are untouched by the change.',
      'If the team insists on 4 anyway, do not leave it silently: route it through the Accept-the-risk path — documented rationale, compensating controls (MFA, smart lockout, banned-password list, Conditional Access), owner sign-off, and a re-evaluation date. Otherwise the same observation returns at the next audit.',
    ],
  },
};

const TINT = {
  indigo: { box: 'bg-indigo-50 dark:bg-indigo-900/30 border-indigo-100 dark:border-indigo-800', title: 'text-indigo-700 dark:text-indigo-300', text: 'text-indigo-800 dark:text-indigo-200' },
  purple: { box: 'bg-purple-50 dark:bg-purple-900/30 border-purple-100 dark:border-purple-800', title: 'text-purple-700 dark:text-purple-300', text: 'text-purple-800 dark:text-purple-200' },
  emerald: { box: 'bg-emerald-50 dark:bg-emerald-900/30 border-emerald-100 dark:border-emerald-800', title: 'text-emerald-700 dark:text-emerald-300', text: 'text-emerald-800 dark:text-emerald-200' },
  amber: { box: 'bg-amber-50 dark:bg-amber-900/30 border-amber-100 dark:border-amber-800', title: 'text-amber-700 dark:text-amber-300', text: 'text-amber-800 dark:text-amber-200' },
};

const darkChip = 'bg-surface-dark-200 border border-surface-dark-300 text-text-dark-primary';
const darkChipMuted = 'bg-surface-dark-200 border border-surface-dark-300 text-text-dark-secondary';

export default function PasswordPolicies({ isDark = false }) {
  return (
    <div className={`py-16 ${isDark ? 'bg-dark-bg' : 'bg-surface-50'}`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-navy-900 dark:text-text-dark-primary mb-4">
            Password Policies & Authentication Strategies
          </h2>
          <p className="text-lg text-navy-600 dark:text-text-dark-secondary max-w-3xl mx-auto">
            Comprehensive guide to Entra ID (Azure AD) password policies, SSO/MFA alternatives, and best-practice recommendations per use case — mapped to compliance frameworks.
          </p>
        </div>

        {/* Entra ID Deep Dive */}
        <section className="mb-16">
          <h3 className="text-2xl font-bold text-navy-900 dark:text-text-dark-primary mb-6 flex items-center gap-3">
            <Cpu className="w-6 h-6 text-indigo-600 dark:text-indigo-400" /> Microsoft Entra ID (Azure AD) Password Policies
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {Object.entries(passwordPolicyData.entraId.policies).map(([key, policy]) => (
              <div key={key} className={`grc-card ${isDark ? '' : ''} p-6`}>
                <h4 className="grc-card-title font-bold text-lg mb-3 flex items-center gap-2">
                  <Key className="w-5 h-5 text-indigo-600 dark:text-indigo-400 grc-card-icon" /> {policy.name}
                </h4>
                <ul className="space-y-2 text-sm text-navy-600 dark:text-text-dark-secondary grc-card-desc">
                  {policy.requirements?.map((req, i) => (
                    <li key={i} className="flex gap-2"><CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" /> {req}</li>
                  ))}
                  {policy.options?.map((opt, i) => (
                    <li key={i} className="flex gap-2"><CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" /> {opt}</li>
                  ))}
                </ul>
                <p className="mt-3 text-xs text-indigo-700 dark:text-indigo-400
                  bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-100 dark:border-indigo-800 rounded-lg px-3 py-2">
                  <span className="font-semibold">Best for:</span> {policy.useCase}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8
            bg-indigo-50 dark:bg-indigo-900/30
            border border-indigo-100 dark:border-indigo-800
            rounded-2xl p-6">
            <h4 className="font-bold text-indigo-700 dark:text-indigo-300 text-lg mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5" /> Entra ID Best Practices
            </h4>
            <ul className="space-y-2 text-sm text-indigo-700 dark:text-indigo-400">
              {passwordPolicyData.entraId.bestPractices.map((bp, i) => (
                <li key={i} className="flex gap-2"><CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" /> {bp}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* Audit Technique: Policy vs Intune Password Discrepancy */}
        <section className="mb-16">
          <h3 className="text-2xl font-bold text-navy-900 dark:text-text-dark-primary mb-6 flex items-center gap-3">
            <ClipboardList className="w-6 h-6 text-amber-600 dark:text-amber-400" /> Audit Technique — Password Config Discrepancy
          </h3>

          <p className="text-sm text-navy-600 dark:text-text-dark-secondary mb-5 max-w-3xl">
            Tool / technique for when the documented policy (minimum 8) doesn't match the device configuration in Intune for macOS and Windows (minimum 4) — decide what really governed, evidence it, then either accept the risk or push back.
          </p>

          <div className="mb-6 rounded-2xl p-5 bg-amber-50 dark:bg-amber-900/30 border border-amber-100 dark:border-amber-800">
            <p className="text-sm text-amber-800 dark:text-amber-300 leading-relaxed">
              <span className="font-bold">Scenario:</span> {auditTechnique.scenario}
            </p>
          </div>

          <div className="grc-card p-6 mb-6">
            <h4 className="grc-card-title font-bold text-lg mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-indigo-600 dark:text-indigo-400 grc-card-icon" /> Step 0 — What actually governs the account password?
            </h4>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className={`rounded-xl border p-4 ${TINT.indigo.box}`}>
                <p className={`font-bold mb-1 ${TINT.indigo.title}`}>Cloud-only in Entra ID</p>
                <p className={TINT.indigo.text}>{auditTechnique.source.cloudOnly}</p>
              </div>
              <div className={`rounded-xl border p-4 ${TINT.purple.box}`}>
                <p className={`font-bold mb-1 ${TINT.purple.title}`}>Synced from on-prem AD</p>
                <p className={TINT.purple.text}>{auditTechnique.source.synced}</p>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="font-bold text-navy-900 dark:text-text-dark-primary text-lg mb-4 flex items-center gap-2">
              <SearchCheck className="w-5 h-5 text-indigo-600 dark:text-indigo-400" /> Evidence to collect — with the system clock visible
            </h4>
            <div className="grid md:grid-cols-3 gap-4">
              {auditTechnique.evidence.map(ev => {
                const t = TINT[ev.tint] || TINT.indigo;
                return (
                  <div key={ev.step} className={`rounded-xl border p-4 ${t.box}`}>
                    <div className="flex items-center gap-2 mb-2">
                      <ev.icon className="w-4 h-4" />
                      <h5 className={`font-bold text-sm ${t.title}`}>{ev.step}. {ev.title}</h5>
                    </div>
                    <p className={`text-xs mb-2 ${t.text}`}><span className="font-semibold">Path:</span> {ev.nav}</p>
                    <ul className="space-y-1.5 text-xs">
                      {ev.items.map((it, i) => (
                        <li key={i} className={`flex gap-1.5 ${t.text}`}><CheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" /> <span>{it}</span></li>
                      ))}
                      {ev.link && (
                        <li className="mt-1.5">
                          <a href={ev.link} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-1 font-semibold underline ${t.title}`}>
                            <ExternalLink className="w-3 h-3" /> Microsoft doc — SSPR / password policy
                          </a>
                        </li>
                      )}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grc-card p-6">
            <h4 className="grc-card-title font-bold text-lg mb-4 flex items-center gap-2">
              <Lock className="w-5 h-5 text-indigo-600 dark:text-indigo-400 grc-card-icon" /> When the observation stands (minimum was 4, policy says 8) — two paths
            </h4>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              {auditTechnique.responses.map(r => {
                const t = TINT[r.tint] || TINT.amber;
                return (
                  <div key={r.title} className={`rounded-xl border p-4 ${t.box}`}>
                    <h5 className={`font-bold flex items-center gap-1.5 ${t.title}`}><r.icon className="w-4 h-4" /> {r.title}</h5>
                    <p className={`text-xs mt-0.5 mb-2 font-semibold ${t.text}`}>{r.scope}</p>
                    <ul className="space-y-1.5 text-xs">
                      {r.items.map((it, i) => (
                        <li key={i} className={`flex gap-1.5 ${t.text}`}><CheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" /> {it}</li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grc-card p-6 mt-6">
            <h4 className="grc-card-title font-bold text-lg mb-4 flex items-center gap-2">
              <MessageSquareText className="w-5 h-5 text-indigo-600 dark:text-indigo-400 grc-card-icon" /> Device-team pushback — “Can we keep Windows at 4?”
            </h4>
            <div className="mb-4 rounded-xl border p-4 bg-slate-50 dark:bg-surface-dark-200 border-slate-200 dark:border-surface-dark-300">
              <p className="text-sm text-slate-700 dark:text-text-dark-secondary italic">
                “{auditTechnique.pushback.question}”
              </p>
            </div>
            <ul className="space-y-2 text-sm text-navy-600 dark:text-text-dark-secondary grc-card-desc">
              {auditTechnique.pushback.answer.map((a, i) => (
                <li key={i} className="flex gap-2"><CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" /> {a}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* Alternatives */}
        <section className="mb-16">
          <h3 className="text-2xl font-bold text-navy-900 dark:text-text-dark-primary mb-6 flex items-center gap-3">
            <Shield className="w-6 h-6 text-indigo-600 dark:text-indigo-400" /> SSO / MFA / Passwordless Alternatives
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {passwordPolicyData.alternatives.map((alt) => (
              <div key={alt.name} className={`grc-card group p-6`}>
                <div className="flex items-center gap-3 mb-4">
                  <alt.icon className="grc-card-icon w-6 h-6" style={{ color: `var(--color-${alt.color}-600)` }} />
                  <div>
                    <h4 className="grc-card-title font-bold">{alt.name}</h4>
                    <span className="grc-card-desc text-xs">{alt.category}</span>
                  </div>
                </div>
                <ul className="space-y-1.5 text-sm text-navy-600 dark:text-text-dark-secondary grc-card-desc mb-4">
                  {alt.features.map((f, i) => (
                    <li key={i} className="flex gap-2"><CheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" /> {f}</li>
                  ))}
                </ul>
                <div className={`border-t ${isDark ? 'border-surface-dark-300' : 'border-surface-300'} pt-3 space-y-1 text-xs`}>
                  <p className="text-navy-500 dark:text-text-dark-secondary"><span className="font-semibold text-navy-700 dark:text-text-dark-secondary">Best for:</span> {alt.bestFor}</p>
                  <p className="text-navy-500 dark:text-text-dark-secondary"><span className="font-semibold text-navy-700 dark:text-text-dark-secondary">Pricing:</span> {alt.pricing}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Recommendations by Use Case */}
        <section className="mb-16">
          <h3 className="text-2xl font-bold text-navy-900 dark:text-text-dark-primary mb-6 flex items-center gap-3">
            <AlertTriangle className="w-6 h-6 text-amber-600 dark:text-amber-400" /> Recommendations by Use Case
          </h3>
          <div className="space-y-4">
            {passwordPolicyData.recommendations.map((rec, i) => (
              <div key={i} className={`grc-card p-6`}>
                <h4 className="grc-card-title font-bold text-lg mb-4">{rec.scenario}</h4>
                <div className="grid md:grid-cols-4 gap-4 text-sm">
                  <div className={`bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-100 dark:border-indigo-800 rounded-xl p-4`}>
                    <p className="font-semibold text-indigo-700 dark:text-indigo-400 mb-1">Primary IdP</p>
                    <p className="text-indigo-600 dark:text-indigo-400">{rec.primary}</p>
                  </div>
                  <div className={`bg-purple-50 dark:bg-purple-900/30 border border-purple-100 dark:border-purple-800 rounded-xl p-4`}>
                    <p className="font-semibold text-purple-700 dark:text-purple-400 mb-1">MFA Strategy</p>
                    <p className="text-purple-600 dark:text-purple-400">{rec.mfa}</p>
                  </div>
                  <div className={`bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-100 dark:border-emerald-800 rounded-xl p-4`}>
                    <p className="font-semibold text-emerald-700 dark:text-emerald-400 mb-1">Passwordless</p>
                    <p className="text-emerald-600 dark:text-emerald-400">{rec.passwordless}</p>
                  </div>
                  <div className={`bg-amber-50 dark:bg-amber-900/30 border border-amber-100 dark:border-amber-800 rounded-xl p-4`}>
                    <p className="font-semibold text-amber-700 dark:text-amber-400 mb-1">Why</p>
                    <p className="text-amber-600 dark:text-amber-400">{rec.why}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Framework Mapping */}
        <section>
          <h3 className="text-2xl font-bold text-navy-900 dark:text-text-dark-primary mb-6 flex items-center gap-3">
            <CheckCircle className="w-6 h-6 text-emerald-600 dark:text-emerald-400" /> Framework Requirements Quick Reference
          </h3>
          <div className="overflow-x-auto">
            <table className={`w-full rounded-2xl border overflow-hidden
              ${isDark ? 'bg-surface-dark-100 border-surface-dark-300' : 'bg-surface-100 border-surface-300'}`}>
              <thead className={`border-b ${isDark ? 'border-surface-dark-300' : 'border-surface-300'} ${isDark ? 'bg-surface-dark-200' : 'bg-surface-200'}`}>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-bold text-navy-600 dark:text-text-dark-muted uppercase tracking-wider">Framework</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-navy-600 dark:text-text-dark-muted uppercase tracking-wider">Password / Auth Requirement</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${isDark ? 'divide-surface-dark-300' : 'divide-surface-300'}`}>
                {Object.entries(passwordPolicyData.frameworks).map(([fw, req]) => (
                  <tr key={fw} className={`hover:bg-surface-200 dark:hover:bg-surface-dark-200`}>
                    <td className="px-4 py-3 font-semibold text-navy-900 dark:text-text-dark-primary text-sm">{fw.toUpperCase()}</td>
                    <td className="px-4 py-3 text-navy-600 dark:text-text-dark-secondary text-sm">{req}</td>
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