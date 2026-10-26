// EDP (Endpoint & Data Protection) Types
// Single source of truth for all EDP data

export type OrgSize = 'small' | 'medium' | 'large';
export type Ecosystem = 'google' | 'microsoft';
export type Domain = 'mdm' | 'dlp' | 'byod' | 'edp';

export interface ToolGuidance {
  product: string;
  licence: string; // "typically requires X licence" phrasing
  configPath: string;
  steps: string[]; // 3-5 steps
}

export interface Control {
  id: string;              // e.g. "EDP-MDM-001"
  domain: Domain;
  title: string;
  objective: string;
  appliesTo: OrgSize[];
  priority: 'critical' | 'high' | 'medium' | 'low';
  google?: ToolGuidance;
  microsoft?: ToolGuidance;
  thirdParty?: string[];
  evidence: string;
  auditorTest: string;
  pitfall: string;
  mappings: {
    iso27001?: string[];
    soc2?: string[];
    hipaa?: string[];
    gdpr?: string[];
  };
}

export interface SizeProfile {
  size: OrgSize;
  label: string;
  description: string;
  people: string;
  typicalScenario: string;
  challenges: string[];
}

export interface Scenario {
  id: string;
  label: string;
  description: string;
  applicableDomains: Domain[];
  soaImpact: string;
}

export interface BYODModel {
  id: string;
  name: string;
  description: string;
  pros: string[];
  cons: string[];
  privacyImpact: string;
  suitableSizes: OrgSize[];
}

export interface EcosystemComparisonRow {
  capability: string;
  google: string;
  microsoft: string;
  notes?: string;
}

export interface ThirdPartyTool {
  name: string;
  category: string;
  description: string;
  typicalUseCase: string;
}

export interface RoadmapPhase {
  id: string;
  label: string;
  timeframe: string;
  tasks: string[];
  applicableSizes: OrgSize[];
}

export interface PushbackItem {
  itgc: string;
  gap: string;
  pushback: string;
  reality: string;
  policy: string;
  compensating: string[];
  leantip: string;
}

export interface FrameworkMapping {
  controlId: string;
  iso27001?: string[];
  soc2?: string[];
  hipaa?: string[];
  gdpr?: string[];
}

export interface GlossaryEntry {
  term: string;
  definition: string;
}

export const LICENSING_NOTE = "Licensing guidance uses 'typically requires' phrasing. Actual licence requirements depend on contract terms, tenant size, and regional SKU availability. Verify with your reseller or vendor portal before purchasing.";

// Size profiles exactly as specified in spec
export const sizeProfiles: SizeProfile[] = [
  {
    size: 'small',
    label: 'Small (1-50 people)',
    description: 'Typical startup. Whole company and single product. One legal entity. Fully remote or one office. Production 100% cloud. Heavy SaaS use. Founder or CTO as ISMS owner. Compliance platform for evidence. Risk register 15-30 risks.',
    people: '1-50',
    typicalScenario: 'Remote-first SaaS startup, single product, cloud-only',
    challenges: [
      'Excluding physical controls without naming who covers them',
      'Forgetting contractors and personal devices',
      'Scoping only "the app" and omitting HR, onboarding, vendor processes'
    ]
  },
  {
    size: 'medium',
    label: 'Medium (51-500 people)',
    description: 'Multiple teams, possibly two or more offices or regions, maybe one subsidiary. Mix of cloud and some on-prem (office network, NAS, build servers). Dedicated security or GRC lead; separate IT function. Decide whether to scope all products or revenue-critical one first.',
    people: '51-500',
    typicalScenario: 'Growing company, multiple teams, mixed cloud/on-prem',
    challenges: [
      'Shared corporate IT (identity, email, endpoints) left out of scope while in-scope products depend on it',
      'Inconsistent controls across offices'
    ]
  },
  {
    size: 'large',
    label: 'Large (500+ people)',
    description: 'Scope often phased: start with business unit, product line or data centre, then expand. Multiple legal entities, jurisdictions, data centres, outsourced SOC or MSP. Formal governance: CISO, risk committee, internal audit. Certification body sampling of multiple sites.',
    people: '500+',
    typicalScenario: 'Multi-entity, multi-site, multi-jurisdiction enterprise',
    challenges: [
      'Boundary drawn through shared infrastructure with no interface control',
      'Carve-outs that customers misread',
      'Group policies not adopted by the in-scope entity'
    ]
  }
];

// Scenarios exactly as specified
export const scenarios: Scenario[] = [
  { id: 'remote-cloud', label: 'Fully remote, cloud-hosted', description: 'All workforce remote; production entirely on public cloud.', applicableDomains: ['mdm', 'dlp', 'byod'], soaImpact: 'A.7.1-7.4 excluded with compensating party; A.7.5, A.7.11, A.7.12 excluded via cloud provider SLA; BYOD model required' },
  { id: 'office-cloud', label: 'Company-controlled office, cloud-hosted', description: 'Company leases office; production on cloud.', applicableDomains: ['mdm', 'dlp', 'byod'], soaImpact: 'A.7.1-7.4 in scope; A.7.5, 7.11, 7.12 excluded via cloud SLA; A.7.7, A.7.8 in scope' },
  { id: 'coworking', label: 'Co-working / shared office', description: 'Shared office space with landlord-managed physical security.', applicableDomains: ['mdm', 'dlp', 'byod'], soaImpact: 'A.7.1-7.4 excluded with landlord as compensating party; A.7.7, A.7.8, A.7.10 in scope for shared space' },
  { id: 'self-hosted', label: 'Self-hosted or colocation infrastructure', description: 'Own data centres, colocation, or on-prem servers.', applicableDomains: ['mdm', 'dlp', 'byod'], soaImpact: 'A.7.5, A.7.8, A.7.11, A.7.12 in scope; A.7.1-7.4 in scope; UPS, climate, cabling required' },
  { id: 'hybrid', label: 'Hybrid cloud and on-prem', description: 'Mix of cloud and on-prem infrastructure.', applicableDomains: ['mdm', 'dlp', 'byod'], soaImpact: 'All physical controls (A.7.x) in scope; shared responsibility mapping required (A.5.23)' },
  { id: 'outsourced-dev', label: 'Outsourced or offshore development', description: 'External agencies or freelancers write code.', applicableDomains: ['mdm', 'dlp', 'byod'], soaImpact: 'A.8.30 in scope with contract security clauses, right-to-audit, CI gates, access revocation' },
  { id: 'no-dev', label: 'No software development / no data hosting', description: 'Pure SaaS buyer, consulting, legal - no code or data hosting.', applicableDomains: ['mdm', 'dlp', 'byod'], soaImpact: 'A.8.25-8.29 cluster excluded with written reasons; A.8.24 partial exclusion; supplier controls A.5.19-5.23 retained' },
  { id: 'regulated', label: 'Regulated data (PHI/HIPAA, PCI, children, EU/UK personal, India DPDP)', description: 'Processing regulated or special-category data.', applicableDomains: ['mdm', 'dlp', 'byod'], soaImpact: 'A.5.31-5.36 strengthened; add jurisdiction controls (HIPAA BAA, PCI DSS, GDPR DPIA/DPO, DPDP obligations)' },
  { id: 'ai-ml', label: 'AI/ML products or LLM use on customer data', description: 'AI/ML models trained on or processing customer data.', applicableDomains: ['mdm', 'dlp', 'byod'], soaImpact: 'Data provenance, model/vendor in supplier register; note ISO 42001 interplay' },
  { id: 'multi-entity', label: 'Multi-entity / subsidiaries / parent group shared services', description: 'Parent group with shared IT, HR, finance services.', applicableDomains: ['mdm', 'dlp', 'byod'], soaImpact: 'Group policy adoption record per entity; intra-group agreements as interfaces (A.5.19-5.23)' },
  { id: 'multi-site', label: 'Multi-site / multi-country', description: 'Offices or data centres in multiple countries.', applicableDomains: ['mdm', 'dlp', 'byod'], soaImpact: 'Complete site list with headcount for certification body sampling; data residency per jurisdiction' },
  { id: 'msp', label: 'Managed service provider or outsourced SOC', description: 'Outsourced security operations or managed SOC.', applicableDomains: ['mdm', 'dlp', 'byod'], soaImpact: 'A.5.19-5.23 for MSP; A.5.23 for cloud SOC; right-to-audit clauses required' },
  { id: 'ma', label: 'Mergers and acquisitions or newly acquired company', description: 'Integration or carve-out of newly acquired entity.', applicableDomains: ['mdm', 'dlp', 'byod'], soaImpact: 'Decide integrate now or carve out with dated plan; scope change triggers (6.3)' },
  { id: 'partial', label: 'Partial scope (single product, business unit or data centre)', description: 'Only one product, BU, or DC in scope.', applicableDomains: ['mdm', 'dlp', 'byod'], soaImpact: 'Document why other areas excluded; interfaces controlled via A.8.22, A.5.23' },
  { id: 'byod-workforce', label: 'BYOD workforce', description: 'Employees use personal devices for work.', applicableDomains: ['byod', 'mdm', 'dlp'], soaImpact: 'A.6.7, A.7.9, A.8.1 with MDM/MAM containerization; A.8.12 DLP for egress' },
  { id: 'hosted-vs-onprem', label: 'Customer-facing hosted platform vs on-prem installed product', description: 'SaaS platform vs on-prem product delivered to customers.', applicableDomains: ['mdm', 'dlp', 'byod'], soaImpact: 'Hosted: A.7.5, 7.11, 7.12 excluded; On-prem: A.7.5, 7.8, 7.11, 7.12 in scope; A.8.31 separation critical' }
];

// Glossary
export const glossary: GlossaryEntry[] = [
  { term: 'MDM', definition: 'Mobile Device Management - software to enroll, configure, and secure mobile devices and laptops.' },
  { term: 'MAM', definition: 'Mobile Application Management - manages specific apps and their data without full device enrollment.' },
  { term: 'BYOD', definition: 'Bring Your Own Device - employees use personal devices for work.' },
  { term: 'COPE', definition: 'Corporate-Owned, Personally Enabled - company buys device, allows personal use in container.' },
  { term: 'MDM/UEM', definition: 'Unified Endpoint Management - MDM extended to laptops, desktops, IoT.' },
  { term: 'DLP', definition: 'Data Loss Prevention - technology to detect and prevent sensitive data exfiltration.' },
  { term: 'CASB', definition: 'Cloud Access Security Broker - mediates access to cloud apps, enforces DLP, detects shadow IT.' },
  { term: 'SCIM', definition: 'System for Cross-domain Identity Management - standard for automated user provisioning/deprovisioning.' },
  { term: 'OMA-URI', definition: 'Open Mobile Alliance Uniform Resource Identifier - Microsoft CSP configuration path for Intune.' },
  { term: 'CSP', definition: 'Configuration Service Provider - Windows configuration interface used by Intune OMA-URI.' },
  { term: 'JIT', definition: 'Just-In-Time - temporary privilege elevation with approval and logging.' },
  { term: 'PIM', definition: 'Privileged Identity Management - Azure AD feature for time-bound admin roles.' },
  { term: 'ZTNA', definition: 'Zero Trust Network Access - per-request verification replacing VPN.' },
  { term: 'SASE', definition: 'Secure Access Service Edge - cloud-delivered network security (ZTNA, SWG, CASB, FWaaS).' },
  { term: 'DPIA', definition: 'Data Protection Impact Assessment - GDPR Art. 35 assessment for high-risk processing.' },
  { term: 'ROPA', definition: 'Record of Processing Activities - GDPR Art. 30 register of all processing operations.' },
  { term: 'DPIA', definition: 'Data Protection Impact Assessment - GDPR Art. 35 assessment for high-risk processing.' }
];

// MDM Controls (15 controls)
export const mdmControls = [
  {
    id: 'EDP-MDM-001',
    domain: 'mdm',
    title: 'MDM Enrollment for All Corporate Devices',
    objective: 'Every company-owned laptop, phone, and tablet is enrolled in MDM before accessing corporate resources.',
    appliesTo: ['small', 'medium', 'large'],
    priority: 'critical',
    google: {
      product: 'Google Endpoint Management',
      licence: 'typically requires Google Workspace Business Plus or Enterprise',
      configPath: 'Admin console > Devices > Mobile & endpoints > Settings > Enrollment',
      steps: [
        'Enable Android and iOS enrollment in Admin console',
        'Configure enrollment restrictions (allow corporate-owned only)',
        'Set up zero-touch enrollment for Android (IMEI/serial upload)',
        'Configure Apple Business Manager integration for iOS zero-touch',
        'Test enrollment with a pilot device before broad rollout'
      ]
    },
    microsoft: {
      product: 'Microsoft Intune',
      licence: 'typically requires Intune Plan 1 (included in Microsoft 365 E3/E5) or Intune Suite',
      configPath: 'Intune admin center > Devices > Enroll devices > Enrollment restrictions',
      steps: [
        'Set MDM user scope to All or selected groups',
        'Configure enrollment restrictions: platform, OS version, device limit',
        'Set up Apple Business Manager / Apple School Manager token for iOS',
        'Configure Android Enterprise zero-touch or Samsung Knox Mobile Enrollment',
        'Enable Windows Autopilot for Windows device enrollment'
      ]
    },
    evidence: 'Enrollment dashboard showing 100% of corporate devices enrolled; enrollment logs with timestamps',
    auditorTest: 'Select 5 corporate devices at random; verify each appears in MDM console with compliance status green.',
    pitfall: 'Personal devices enrolled instead of corporate; no enrollment restriction policy.',
    mappings: { iso27001: ['A.8.1'], soc2: ['CC6.1'], hipaa: ['164.312(a)(2)(iv)'], gdpr: ['Art. 32'] }
  },
  {
    id: 'EDP-MDM-002',
    domain: 'mdm',
    title: 'Disk Encryption Enforced on All Endpoints',
    objective: 'Full-disk encryption active on every enrolled device with keys managed in MDM.',
    appliesTo: ['small', 'medium', 'large'],
    priority: 'critical',
    google: {
      product: 'Google Endpoint Management',
      licence: 'typically requires Google Workspace Business Plus or Enterprise',
      configPath: 'Admin console > Devices > Mobile & endpoints > Settings > Disk encryption',
      steps: [
        'Enable "Require disk encryption" for Android and iOS',
        'Enable FileVault for macOS via configuration profile',
        'Enable BitLocker for Windows via Windows configuration profile',
        'Set escrow of recovery keys to MDM console',
        'Verify encryption status reports show 100% compliant'
      ]
    },
    microsoft: {
      product: 'Microsoft Intune',
      licence: 'typically requires Intune Plan 1 or Intune Suite',
      configPath: 'Endpoint Manager > Devices > Configuration profiles > Create profile > Disk encryption',
      steps: [
        'Create BitLocker profile for Windows (require TPM, encryption method XTS-AES-256)',
        'Create FileVault profile for macOS (enable at next login, escrow key to Intune)',
        'Assign profiles to all device groups',
        'Monitor encryption compliance in Device compliance dashboard',
        'Remediate non-compliant devices via compliance policy actions'
      ]
    },
    evidence: 'Encryption compliance report showing 100% encrypted; recovery key escrow logs',
    auditorTest: 'Request decryption of a random device; verify encryption active and recovery key retrievable from MDM.',
    pitfall: 'Encryption policy applied but not enforced (monitor-only mode); recovery keys not escrowed.',
    mappings: { iso27001: ['A.8.1', 'A.8.24'], soc2: ['CC6.1', 'CC6.7'], hipaa: ['164.312(a)(2)(iv)'], gdpr: ['Art. 32'] }
  },
  {
    id: 'EDP-MDM-003',
    domain: 'mdm',
    title: 'EDR Deployed and Reporting to Central Console',
    objective: 'Endpoint detection and response agent installed on all endpoints with alerts forwarded to SIEM.',
    appliesTo: ['small', 'medium', 'large'],
    priority: 'critical',
    google: {
      product: 'Google Endpoint Management + Chronicle or third-party EDR',
      licence: 'typically requires Google Workspace Enterprise Plus or third-party EDR licence',
      configPath: 'Admin console > Security > Endpoint management > EDR integration',
      steps: [
        'Deploy EDR agent via MDM app deployment (CrowdStrike, SentinelOne, Defender for Endpoint)',
        'Configure real-time monitoring and alerting rules',
        'Forward alerts to Chronicle SIEM or Splunk via API',
        'Define critical/high severity alert routing to on-call',
        'Run quarterly EDR coverage audit'
      ]
    },
    microsoft: {
      product: 'Microsoft Defender for Endpoint (Plan 2)',
      licence: 'typically requires Microsoft 365 E5 or Defender for Endpoint P2 licence',
      configPath: 'Microsoft 365 Defender portal > Settings > Endpoints > Onboarding',
      steps: [
        'Onboard devices via Intune configuration profile (Defender for Endpoint)',
        'Configure attack surface reduction (ASR) rules in block mode',
        'Enable automated investigation and remediation (AIR)',
        'Connect Defender for Endpoint to Microsoft Sentinel',
        'Run monthly coverage and health reports'
      ]
    },
    evidence: 'EDR console showing 100% endpoint coverage; alert history with response times',
    auditorTest: 'Simulate a test alert (EICAR or atomic red team); verify alert fires and reaches SIEM.',
    pitfall: 'EDR agent deployed but not communicating; tamper protection disabled.',
    mappings: { iso27001: ['A.8.7'], soc2: ['CC7.2'], hipaa: ['164.312(b)'], gdpr: ['Art. 32'] }
  },
  {
    id: 'EDP-MDM-004',
    domain: 'mdm',
    title: 'Patch Management with Defined SLAs',
    objective: 'OS and application patches applied within defined SLAs based on severity.',
    appliesTo: ['small', 'medium', 'large'],
    priority: 'high',
    google: {
      product: 'Google Endpoint Management + ChromeOS/Play/OS updates',
      licence: 'typically requires Google Workspace Business Plus or Enterprise',
      configPath: 'Admin console > Devices > ChromeOS/Windows/OS updates',
      steps: [
        'Configure ChromeOS auto-update policy (restart after update, 80% rollout)',
        'Configure Windows Update for Business via Intune or GEM (defer feature 30 days, quality 7 days)',
        'Set Android/ChromeOS security patch minimum version',
        'Monitor update compliance in device reports',
        'Escalate devices >30 days behind to IT'
      ]
    },
    microsoft: {
      product: 'Intune + Windows Update for Business + Defender Vulnerability Management',
      licence: 'typically requires Intune Plan 1; Defender Vulnerability Management requires Defender for Endpoint P2',
      configPath: 'Endpoint Manager > Devices > Software updates > Windows 10/11 update rings',
      steps: [
        'Create update ring: feature updates defer 30 days, quality updates defer 7 days',
        'Configure driver updates: allow only approved drivers',
        'Set maintenance windows (e.g., 2 AM - 5 AM local time)',
        'Enable Defender Vulnerability Management for third-party app patching',
        'Report on patch compliance: critical <= 48h, high <= 7d, medium <= 30d'
      ]
    },
    evidence: 'Patch compliance report: critical <=48h, high <=7d, medium <=30d; exception log with risk acceptance',
    auditorTest: 'Check last critical CVE (e.g., CVE-2024-xxxx); verify patch applied within SLA across fleet.',
    pitfall: 'No maintenance window defined; updates applied during business hours causing disruption.',
    mappings: { iso27001: ['A.8.8'], soc2: ['CC7.1'], hipaa: ['164.308(a)(5)'], gdpr: ['Art. 32'] }
  },
  {
    id: 'EDP-MDM-005',
    domain: 'mdm',
    title: 'Application Allowlisting and Blocklisting',
    objective: 'Only approved applications can be installed; known malicious or risky apps blocked.',
    appliesTo: ['small', 'medium', 'large'],
    priority: 'high',
    google: {
      product: 'Google Endpoint Management + Chrome Web Store policies',
      licence: 'typically requires Google Workspace Business Plus or Enterprise',
      configPath: 'Admin console > Devices > Chrome > Apps & extensions > Allow/blocklist',
      steps: [
        'Create allowlist of approved Chrome extensions and Android apps',
        'Block known malicious extensions (cryptominers, credential stealers)',
        'Force-install required security extensions (e.g., password manager)',
        'Configure Play Store approval workflow for Android apps',
        'Review and update lists quarterly'
      ]
    },
    microsoft: {
      product: 'Intune + Microsoft Defender for Endpoint + AppLocker/WDAC',
      licence: 'typically requires Intune Plan 1; WDAC requires Windows Enterprise',
      configPath: 'Endpoint Manager > Apps > App configuration policies > App protection policies',
      steps: [
        'Create AppLocker/WDAC rules: allow only signed apps from trusted publishers',
        'Deploy via Intune configuration profile (OMA-URI for WDAC)',
        'Configure Intune app protection policies: require PIN, block jailbroken/rooted',
        'Block known vulnerable apps (e.g., old Java, Flash, unpatched browsers)',
        'Monitor blocked app attempts in Defender for Endpoint'
      ]
    },
    evidence: 'Allowlist/blocklist configuration export; blocked installation attempts log',
    auditorTest: 'Attempt to install a blocked application; verify installation fails and event logged.',
    pitfall: 'Allowlist too permissive (e.g., all Microsoft Store apps); no quarterly review.',
    mappings: { iso27001: ['A.8.19'], soc2: ['CC6.1', 'CC6.7'], hipaa: ['164.312(a)'], gdpr: ['Art. 32'] }
  },
  {
    id: 'EDP-MDM-006',
    domain: 'mdm',
    title: 'Conditional Access with Device Compliance',
    objective: 'Access to corporate resources granted only from compliant, managed devices.',
    appliesTo: ['small', 'medium', 'large'],
    priority: 'critical',
    google: {
      product: 'Google Workspace Context-Aware Access',
      licence: 'typically requires Google Workspace Enterprise Plus',
      configPath: 'Admin console > Security > Context-Aware Access > Access levels',
      steps: [
        'Create access level: "Corporate devices only" with device policy compliance required',
        'Define device policy: encryption, screen lock, OS version, MDM enrollment',
        'Apply access level to Google Workspace apps (Gmail, Drive, etc.)',
        'Test with compliant and non-compliant devices',
        'Monitor access denials in security investigation tool'
      ]
    },
    microsoft: {
      product: 'Microsoft Entra ID Conditional Access + Intune Compliance',
      licence: 'typically requires Entra ID P2 (included in Microsoft 365 E5) or Entra ID P1 + Intune',
      configPath: 'Entra admin center > Protection > Conditional Access > New policy',
      steps: [
        'Create compliance policy in Intune: encryption, PIN, OS version, jailbreak detection',
        'Create Conditional Access policy: grant access only if device compliant',
        'Target all cloud apps or specific apps (Office 365, Azure, custom)',
        'Exclude break-glass accounts; require MFA for all',
        'Enable "Report-only" mode first, then enforce after validation'
      ]
    },
    evidence: 'Conditional Access policy configuration export; sign-in logs showing compliant device grant/deny',
    auditorTest: 'Attempt access from non-compliant device; verify access denied and user redirected to enroll.',
    pitfall: 'Policy applied in report-only mode indefinitely; break-glass accounts not excluded.',
    mappings: { iso27001: ['A.8.2', 'A.8.3'], soc2: ['CC6.1', 'CC6.7'], hipaa: ['164.312(a)(1)'], gdpr: ['Art. 32'] }
  },
  {
    id: 'EDP-MDM-007',
    domain: 'mdm',
    title: 'Remote Wipe and Lock Capability Verified',
    objective: 'Lost or stolen devices can be remotely wiped or locked within 15 minutes of report.',
    appliesTo: ['small', 'medium', 'large'],
    priority: 'critical',
    google: {
      product: 'Google Endpoint Management',
      licence: 'typically requires Google Workspace Business Plus or Enterprise',
      configPath: 'Admin console > Devices > Mobile devices > Select device > Remote actions',
      steps: [
        'Verify remote wipe and remote lock actions available for all platforms',
        'Configure automatic wipe after 10 failed unlock attempts',
        'Test remote wipe on a test device; verify completion within 15 minutes',
        'Configure wipe confirmation email to user and IT',
        'Document wipe procedure in incident runbook'
      ]
    },
    microsoft: {
      product: 'Microsoft Intune',
      licence: 'typically requires Intune Plan 1',
      configPath: 'Endpoint Manager > Devices > Select device > Wipe or Retire',
      steps: [
        'Verify "Wipe" (full factory reset) and "Retire" (remove corporate data only) actions work',
        'Configure automatic wipe after 10 failed sign-in attempts',
        'Test remote wipe on test device; verify completion <15 minutes',
        'Configure wipe notification to user and IT via email/webhook',
        'Document wipe procedure in offboarding and incident runbooks'
      ]
    },
    evidence: 'Remote wipe test logs with timestamps; device inventory showing wiped devices',
    auditorTest: 'Initiate remote wipe on test device; verify data inaccessible and device reset within 15 minutes.',
    pitfall: 'Remote wipe only removes corporate data (Retire) not full wipe; devices not reporting location.',
    mappings: { iso27001: ['A.8.1', 'A.8.12'], soc2: ['CC6.7'], hipaa: ['164.312(a)(2)(iv)'], gdpr: ['Art. 32', 'Art. 17'] }
  },
  {
    id: 'EDP-MDM-008',
    domain: 'mdm',
    title: 'Device Compliance Reporting and Dashboards',
    objective: 'Real-time visibility into fleet compliance posture with automated alerting on drift.',
    appliesTo: ['small', 'medium', 'large'],
    priority: 'high',
    google: {
      product: 'Google Endpoint Management + Looker/BigQuery or third-party BI',
      licence: 'typically requires Google Workspace Enterprise Plus for advanced reporting',
      configPath: 'Admin console > Reports > Device compliance',
      steps: [
        'Configure scheduled compliance reports (daily/weekly) to BigQuery',
        'Build Looker dashboard: enrollment %, encryption %, patch %, encryption %, EDR %, compliance score',
        'Set alerts: compliance score drops below 95%, >5 devices non-compliant >24h',
        'Share dashboard with CISO and IT leadership',
        'Quarterly review of dashboard metrics with IT leadership'
      ]
    },
    microsoft: {
      product: 'Intune + Power BI or Microsoft Graph API',
      licence: 'typically requires Intune Plan 1; Power BI Pro for dashboards',
      configPath: 'Endpoint Manager > Reports > Device compliance > Export to Power BI',
      steps: [
        'Connect Intune Data Warehouse to Power BI',
        'Build dashboard: enrollment rate, compliance trends, top non-compliant devices, OS version distribution',
        'Set data-driven alerts: non-compliant device count > threshold',
        'Embed dashboard in Teams/SharePoint for leadership visibility',
        'Automate monthly compliance report to CISO'
      ]
    },
    evidence: 'Compliance dashboard screenshots; scheduled report emails; alert history',
    auditorTest: 'Verify dashboard shows current compliance data; trigger test alert and verify delivery.',
    pitfall: 'Dashboard shows stale data (not refreshed); alerts not configured or routed to spam.',
    mappings: { iso27001: ['A.8.1', 'A.8.2'], soc2: ['CC7.2'], hipaa: ['164.308(a)(1)'], gdpr: ['Art. 32'] }
  },
  {
    id: 'EDP-MDM-009',
    domain: 'mdm',
    title: 'BYOD Containerization with MAM',
    objective: 'Personal devices accessing corporate data use app-level containerization with selective wipe.',
    appliesTo: ['small', 'medium', 'large'],
    priority: 'high',
    google: {
      product: 'Google Workspace + Android Enterprise Work Profile / iOS User Enrollment',
      licence: 'typically requires Google Workspace Business Plus or Enterprise',
      configPath: 'Admin console > Devices > Mobile & endpoints > Work profile / User enrollment',
      steps: [
        'Enable Android Work Profile for BYOD Android devices',
        'Enable iOS User Enrollment for BYOD iOS (requires Managed Apple ID)',
        'Configure app allowlist for work profile: only approved apps installable',
        'Configure cross-profile copy/paste restrictions (block or allow per policy)',
        'Test selective wipe: remove work profile only, personal data untouched'
      ]
    },
    microsoft: {
      product: 'Intune App Protection Policies (MAM) + Android Work Profile / iOS User Enrollment',
      licence: 'typically requires Intune Plan 1; App Protection Policies included',
      configPath: 'Endpoint Manager > Apps > App protection policies > Create policy',
      steps: [
        'Create App Protection Policy: require PIN, block save-as, restrict cut/copy/paste, require encryption',
        'Target policy to specific apps (Outlook, Teams, OneDrive, custom LOB apps)',
        'Configure conditional launch: require PIN after 5 min inactivity, block on jailbroken/rooted',
        'Deploy Android Work Profile via Intune enrollment profile; iOS User Enrollment via Apple Business Manager',
        'Test selective wipe: remove corporate apps/data only, personal photos/apps preserved'
      ]
    },
    evidence: 'MAM policy configuration export; test device showing work/personal separation; selective wipe test log',
    auditorTest: 'On test BYOD device, verify corporate apps in container; initiate selective wipe; verify personal photos remain.',
    pitfall: 'MAM policy applied but not targeting correct apps; personal data accidentally wiped.',
    mappings: { iso27001: ['A.8.1', 'A.6.7'], soc2: ['CC6.1', 'CC6.7'], hipaa: ['164.312(a)(1)'], gdpr: ['Art. 32', 'Art. 25'] }
  },
  {
    id: 'EDP-MDM-010',
    domain: 'mdm',
    title: 'Break-Glass / Emergency Access Accounts',
    objective: 'Emergency admin accounts exist for MDM/IdP access when primary systems fail, with strict controls.',
    appliesTo: ['small', 'medium', 'large'],
    priority: 'high',
    google: {
      product: 'Google Workspace Super Admin + Recovery Options',
      licence: 'typically requires Google Workspace Business Plus or Enterprise',
      configPath: 'Admin console > Security > Authentication > Recovery options',
      steps: [
        'Create 2-3 break-glass super admin accounts with complex passwords stored in password manager',
        'Exclude break-glass accounts from Conditional Access / Context-Aware Access policies',
        'Configure alert on any break-glass account sign-in (immediate alert to CISO)',
        'Store credentials in sealed envelope in physical safe OR password manager with break-glass access',
        'Quarterly test: sign in with break-glass account, verify access, rotate password'
      ]
    },
    microsoft: {
      product: 'Entra ID Emergency Access Accounts',
      licence: 'typically requires Entra ID P1 or P2',
      configPath: 'Entra admin center > Identity > Users > Emergency access accounts',
      steps: [
        'Create 2 cloud-only emergency access accounts (break-glass) with phishing-resistant MFA (FIDO2)',
        'Exclude from all Conditional Access policies (MFA, device compliance, location)',
        'Configure sign-in risk policy exclusion for these accounts',
        'Set up alert on any sign-in (email to CISO, Security team)',
        'Store FIDO2 keys in physical safe; document break-glass procedure in runbook'
      ]
    },
    evidence: 'Break-glass account list with last sign-in dates; alert configuration screenshots; quarterly test logs',
    auditorTest: 'Request demonstration of break-glass account access; verify alert fired and procedure documented.',
    pitfall: 'Break-glass accounts included in CA policies (locking out emergency access); MFA not phishing-resistant.',
    mappings: { iso27001: ['A.5.18', 'A.8.2'], soc2: ['CC6.1'], hipaa: ['164.312(a)'], gdpr: ['Art. 32'] }
}
];

// DLP Controls (15 controls)
export const dlpControls = [
  {
    id: 'EDP-DLP-001',
    domain: 'dlp',
    title: 'Email DLP with Predefined Rules',
    objective: 'Automatically detect and block sensitive data (PII, PHI, PCI, credentials) in outbound email.',
    appliesTo: ['small', 'medium', 'large'],
    priority: 'critical',
    google: {
      product: 'Google Workspace Data Loss Prevention',
      licence: 'typically requires Google Workspace Enterprise Plus',
      configPath: 'Admin console > Security > Data protection > Rules',
      steps: [
        'Create DLP rule: detect credit card numbers, SSN, bank accounts, API keys, PHI patterns',
        'Set action: Block, quarantine, or warn with user justification',
        'Configure notification to sender and DLP admin',
        'Test with sample emails containing test PII/PCI data',
        'Review false positives weekly; tune rules quarterly'
      ]
    },
    microsoft: {
      product: 'Microsoft Purview DLP (Exchange, Teams, SharePoint)',
      licence: 'typically requires Microsoft 365 E5 or E5 Compliance/Governance add-on',
      configPath: 'Microsoft Purview compliance portal > Data loss prevention > Policies > Create policy',
      steps: [
        'Create DLP policy: choose template (Financial, Medical, PII) or custom',
        'Select locations: Exchange email, Teams chat/channel, SharePoint, OneDrive',
        'Define sensitive info types: built-in (credit card, SSN) or custom regex/keyword',
        'Set actions: Block with override, block without override, notify user, restrict sharing',
        'Enable policy tips in Outlook/Teams; review alerts in Purview alerts dashboard'
      ]
    },
    evidence: 'DLP policy configuration export; incident reports showing blocked/quarantined emails with matched content',
    auditorTest: 'Send test email with dummy credit card number; verify blocked/quarantined and alert generated.',
    pitfall: 'Rules too broad (blocking legitimate business email); no quarterly false-positive review.',
    mappings: { iso27001: ['A.8.12'], soc2: ['CC6.7', 'CC7.2'], hipaa: ['164.312(d)'], gdpr: ['Art. 32', 'Art. 25'] }
  },
  {
    id: 'EDP-DLP-002',
    domain: 'dlp',
    title: 'Cloud Storage DLP (Drive, OneDrive, SharePoint, Box, Dropbox)',
    objective: 'Detect and prevent sensitive data at rest and in motion within cloud storage.',
    appliesTo: ['small', 'medium', 'large'],
    priority: 'critical',
    google: {
      product: 'Google Workspace DLP for Drive',
      licence: 'typically requires Google Workspace Enterprise Plus',
      configPath: 'Admin console > Security > Data protection > Drive DLP rules',
      steps: [
        'Create Drive DLP rule: scan for PII, PHI, PCI, credentials, source code',
        'Action: Warn user, block upload/download, or restrict sharing to domain',
        'Configure alerts to DLP admin on rule match',
        'Enable Drive audit logs; export to BigQuery for analysis',
        'Schedule quarterly scan of existing files for retroactive detection'
      ]
    },
    microsoft: {
      product: 'Microsoft Purview DLP for SharePoint, OneDrive, Teams',
      licence: 'typically requires Microsoft 365 E5 or E5 Compliance add-on',
      configPath: 'Purview portal > Data loss prevention > Policies > Create policy > Custom > SharePoint/OneDrive/Teams',
      steps: [
        'Create policy: select SharePoint sites, OneDrive accounts, Teams',
        'Define sensitive info types: built-in (PII, Financial, Medical) or custom',
        'Action: Block access, restrict sharing, or notify user with policy tip',
        'Configure auto-labeling for sensitivity labels based on DLP match',
        'Review DLP alerts in Purview; tune rules monthly'
      ]
    },
    evidence: 'DLP policy config export; alert history with matched content samples; file-level scan reports',
    auditorTest: 'Upload test file with dummy SSN to SharePoint/Drive; verify detection and action within 5 minutes.',
    pitfall: 'DLP not scanning encrypted files; rules only on new uploads, not existing files.',
    mappings: { iso27001: ['A.8.12', 'A.8.13'], soc2: ['CC6.7', 'CC7.2'], hipaa: ['164.312(d)'], gdpr: ['Art. 32', 'Art. 25'] }
  },
  {
    id: 'EDP-DLP-003',
    domain: 'dlp',
    title: 'Endpoint DLP (Clipboard, Print, USB, Network Share)',
    objective: 'Prevent sensitive data exfiltration via clipboard, printing, USB, or network shares on endpoints.',
    appliesTo: ['small', 'medium', 'large'],
    priority: 'high',
    google: {
      product: 'Google Endpoint Management + Chrome Enterprise DLP',
      licence: 'typically requires Google Workspace Enterprise Plus + Chrome Enterprise Upgrade',
      configPath: 'Admin console > Devices > Chrome > Data protection > Data loss prevention',
      steps: [
        'Enable Chrome DLP: restrict copy/paste, print, download, USB for sensitive content',
        'Define sensitive data patterns (regex for PII, PCI, credentials)',
        'Configure USB storage: block or read-only for unmanaged devices',
        'Deploy via Chrome Enterprise policy to enrolled browsers',
        'Review DLP incidents in Chrome Enterprise reporting'
      ]
    },
    microsoft: {
      product: 'Microsoft Purview Endpoint DLP',
      licence: 'typically requires Microsoft 365 E5 or E5 Compliance + Windows 10/11 Enterprise',
      configPath: 'Purview portal > Data loss prevention > Endpoint DLP > Settings > Onboard devices',
      steps: [
        'Onboard Windows 10/11 devices via Intune/Group Policy/MECM',
        'Configure Endpoint DLP settings: clipboard, print, USB, network share, Bluetooth restrictions',
        'Define sensitive info types; set actions: block, audit, warn with override',
        'Configure file path exclusions (e.g., allow print to PDF printer)',
        'Validate with test copy/paste of sensitive data; verify event in Purview alerts'
      ]
    },
    evidence: 'Endpoint DLP onboarding report; DLP event logs showing blocked clipboard/print/USB events',
    auditorTest: 'On managed device, copy dummy credit card to clipboard; verify blocked and event logged.',
    pitfall: 'Devices not onboarded (macOS/Linux gaps); exclusions too broad (entire C:\\ allowed).',
    mappings: { iso27001: ['A.8.12', 'A.8.13'], soc2: ['CC6.7'], hipaa: ['164.312(d)'], gdpr: ['Art. 32'] }
  },
  {
    id: 'EDP-DLP-004',
    domain: 'dlp',
    title: 'Teams/Slack/Webex DLP for Chat and File Sharing',
    objective: 'Prevent sensitive data leakage in collaboration tools (Teams, Slack, Webex, Zoom chat).',
    appliesTo: ['small', 'medium', 'large'],
    priority: 'high',
    google: {
      product: 'Google Workspace DLP for Chat (beta) + third-party CASB (Netskope, Zscaler)',
      licence: 'typically requires Google Workspace Enterprise Plus + CASB licence',
      configPath: 'Admin console > Security > Data protection > Chat DLP (beta) or CASB policy',
      steps: [
        'Enable Chat DLP for Google Chat: detect PII, PHI, credentials in messages/files',
        'Configure CASB API connector for Slack/Teams/Webex: scan messages and files',
        'Define DLP policies per app: block message, delete file, notify user/admin',
        'Configure retention: DLP-matched messages retained for investigation',
        'Review CASB dashboard weekly; tune false positives'
      ]
    },
    microsoft: {
      product: 'Microsoft Purview DLP for Teams + Defender for Cloud Apps',
      licence: 'typically requires Microsoft 365 E5 + Defender for Cloud Apps',
      configPath: 'Purview > DLP > Policies > Teams chat and channel messages; Defender for Cloud Apps > Policies > File policy',
      steps: [
        'Create DLP policy for Teams chat/channel messages: detect PII, financial, health data',
        'Action: Block message, notify sender, alert admin, allow override with justification',
        'Configure Defender for Cloud Apps file policy: scan Slack/Teams/Zoom/Zoom files via API',
        'Set governance actions: quarantine, delete, notify user, apply sensitivity label',
        'Review alerts daily; adjust severity thresholds weekly'
      ]
    },
    evidence: 'DLP policy for Teams config; Cloud Apps file policy config; alert samples with matched content',
    auditorTest: 'Post test message with dummy SSN in Teams/Slack; verify blocked and alert generated.',
    pitfall: 'Teams DLP only covers chat/channel messages, not meeting recordings or whiteboard.',
    mappings: { iso27001: ['A.8.12', 'A.8.13'], soc2: ['CC6.7', 'CC7.2'], hipaa: ['164.312(d)'], gdpr: ['Art. 32'] }
  },
  {
    id: 'EDP-DLP-005',
    domain: 'dlp',
    title: 'Source Code and Secrets DLP (GitHub, GitLab, Bitbucket, CI/CD)',
    objective: 'Prevent secrets, API keys, and sensitive code from being committed to repositories.',
    appliesTo: ['small', 'medium', 'large'],
    priority: 'critical',
    google: {
      product: 'Google Cloud Secret Manager + GitHub Advanced Security / GitLab Secret Detection',
      licence: 'typically requires GitHub Advanced Security or GitLab Ultimate; Secret Manager included in GCP',
      configPath: 'GitHub/GitLab repo settings > Security & analysis > Secret scanning / Push protection',
      steps: [
        'Enable GitHub secret scanning and push protection on all org repos',
        'Configure custom patterns for internal API keys, database URLs, internal tokens',
        'Enable GitLab secret detection in CI/CD pipeline',
        'Configure Google Cloud Secret Manager for secret storage; ban hardcoded secrets',
        'Integrate TruffleHog or Gitleaks in CI as additional gate'
      ]
    },
    microsoft: {
      product: 'GitHub Advanced Security + Microsoft Defender for DevOps / Azure DevOps',
      licence: 'typically requires GitHub Advanced Security licence; Defender for DevOps in Defender for Cloud',
      configPath: 'GitHub org settings > Security > Secret scanning / Push protection; Azure DevOps > Project settings > Repositories > Secret scanning',
      steps: [
        'Enable GitHub secret scanning and push protection on all repositories',
        'Define custom patterns for internal secrets (e.g., INTERNAL_API_KEY_[A-Z0-9]{32})',
        'Enable Dependabot alerts and auto-remediation for vulnerable dependencies',
        'Configure Azure DevOps pipeline secret scanning (CredScan) in build pipelines',
        'Store secrets in Azure Key Vault; reference via variable groups, never in code'
      ]
    },
    evidence: 'Secret scanning config screenshots; push protection blocks log; secret remediation tickets',
    auditorTest: 'Attempt to push commit with dummy AWS key; verify push blocked and alert raised.',
    pitfall: 'Push protection not enabled (only alerting); custom patterns not covering internal token formats.',
    mappings: { iso27001: ['A.8.12', 'A.8.24'], soc2: ['CC6.7', 'CC7.2'], hipaa: ['164.312(d)'], gdpr: ['Art. 32'] }
  }
]

// BYOD Controls (15 controls)
export const byodControls = [
  {
    id: 'EDP-BYOD-001',
    domain: 'byod',
    title: 'BYOD Policy Documented and Acknowledged',
    objective: 'Formal BYOD policy exists, communicated to all staff, with signed acknowledgment.',
    appliesTo: ['small', 'medium', 'large'],
    priority: 'critical',
    google: {
      product: 'Google Workspace + Android Work Profile / iOS User Enrollment',
      licence: 'typically requires Google Workspace Business Plus or Enterprise',
      configPath: 'Admin console > Devices > Mobile & endpoints > Work profile / User enrollment',
      steps: [
        'Draft BYOD policy: allowed devices, containerization, data ownership, wipe terms',
        'Require signed acknowledgment during onboarding and annually',
        'Publish policy in employee handbook and intranet',
        'Annual review and re-acknowledgment',
        'Track acknowledgment status in HRIS'
      ]
    },
    microsoft: {
      product: 'Intune App Protection Policies + Android Work Profile / iOS User Enrollment',
      licence: 'typically requires Intune Plan 1',
      configPath: 'Endpoint Manager > Apps > App protection policies',
      steps: [
        'Create App Protection Policy: require PIN, encrypt data, block save-as, restrict copy/paste',
        'Target policy to Outlook, Teams, OneDrive, SharePoint, custom LOB apps',
        'Configure conditional launch: block on jailbroken/rooted, require PIN after 5 min inactivity',
        'Deploy Android Work Profile via enrollment profile; iOS User Enrollment via Apple Business Manager',
        'Communicate policy: personal data stays personal, corporate data wiped on exit'
      ]
    },
    evidence: 'BYOD policy document with version history; signed acknowledgment records in HRIS',
    auditorTest: 'Request list of BYOD users; verify each has signed acknowledgment within last 12 months.',
    pitfall: 'Policy exists but no acknowledgment tracking; policy not updated for new OS versions.',
    mappings: { iso27001: ['A.6.7', 'A.8.1'], soc2: ['CC6.1'], hipaa: ['164.312(a)(1)'], gdpr: ['Art. 32', 'Art. 25'] }
  },
  {
    id: 'EDP-BYOD-002',
    domain: 'byod',
    title: 'Containerization: Work Profile / User Enrollment Enforced',
    objective: 'BYOD devices use OS-level containerization separating work and personal data.',
    appliesTo: ['small', 'medium', 'large'],
    priority: 'critical',
    google: {
      product: 'Android Work Profile / iOS User Enrollment',
      licence: 'typically requires Google Workspace Business Plus or Enterprise',
      configPath: 'Admin console > Devices > Mobile & endpoints > Work profile / User enrollment',
      steps: [
        'Enforce Android Work Profile for all BYOD Android devices',
        'Enforce iOS User Enrollment for BYOD iOS (requires Managed Apple ID via Apple Business Manager)',
        'Configure work profile app allowlist: only approved apps installable in work container',
        'Configure cross-profile copy/paste: block or allow per policy',
        'Test selective wipe: remove work profile only, personal data untouched'
      ]
    },
    microsoft: {
      product: 'Intune App Protection Policies + Android Work Profile / iOS User Enrollment',
      licence: 'typically requires Intune Plan 1',
      configPath: 'Endpoint Manager > Apps > App protection policies',
      steps: [
        'Create App Protection Policy: require PIN, encrypt data, block save-as, restrict copy/paste',
        'Target policy to Outlook, Teams, OneDrive, SharePoint, custom LOB apps',
        'Configure conditional launch: block on jailbroken/rooted, require PIN after 5 min inactivity',
        'Deploy Android Work Profile via Intune enrollment profile; iOS User Enrollment via Apple Business Manager',
        'Test selective wipe: remove corporate apps/data only, personal photos/apps preserved'
      ]
    },
    evidence: 'MAM policy configuration export; test device showing work/personal separation; selective wipe test log',
    auditorTest: 'On test BYOD device, verify corporate apps in container; initiate selective wipe; verify personal photos remain.',
    pitfall: 'MAM policy applied but not targeting correct apps; personal data accidentally wiped.',
    mappings: { iso27001: ['A.8.1', 'A.6.7'], soc2: ['CC6.1', 'CC6.7'], hipaa: ['164.312(a)(1)'], gdpr: ['Art. 32', 'Art. 25'] }
  },
  {
    id: 'EDP-BYOD-003',
    domain: 'byod',
    title: 'Selective Wipe Verified on Offboarding',
    objective: 'Corporate data removed from personal device within SLA on employee departure.',
    appliesTo: ['small', 'medium', 'large'],
    priority: 'critical',
    google: {
      product: 'Google Endpoint Management',
      licence: 'typically requires Google Workspace Business Plus or Enterprise',
      configPath: 'Admin console > Devices > Mobile devices > Select device > Remove work profile',
      steps: [
        'Integrate HR offboarding trigger with MDM API (or manual process with SLA)',
        'On termination: initiate selective wipe (remove work profile / managed apps only)',
        'Verify completion within 4 hours; log timestamp and result',
        'Verify personal data (photos, contacts, personal apps) unaffected',
        'Document in offboarding checklist; retain wipe log for audit'
      ]
    },
    microsoft: {
      product: 'Microsoft Intune',
      licence: 'typically requires Intune Plan 1',
      configPath: 'Endpoint Manager > Devices > Select device > Retire (selective wipe)',
      steps: [
        'Integrate HRIS offboarding trigger with Intune Graph API for automated selective wipe',
        'Configure Retire action: removes managed apps, data, and profiles only',
        'Verify wipe completion within 4 hours via Intune device status',
        'Confirm personal data (photos, personal apps, contacts) preserved',
        'Retain wipe confirmation logs for audit'
      ]
    },
    evidence: 'Selective wipe logs with timestamps; HR offboarding records matching wipe timestamps',
    auditorTest: 'Request offboarding records for last 5 departures; verify selective wipe executed within SLA.',
    pitfall: 'Full device wipe instead of selective; personal data lost causing legal exposure.',
    mappings: { iso27001: ['A.6.7', 'A.8.1', 'A.8.12'], soc2: ['CC6.7'], hipaa: ['164.312(a)(2)(iv)'], gdpr: ['Art. 32', 'Art. 17'] }
  },
  {
    id: 'EDP-BYOD-004',
    domain: 'byod',
    title: 'MAM Policies for Corporate Apps (Outlook, Teams, OneDrive, SharePoint)',
    objective: 'App-level controls enforce PIN, encryption, copy/paste restrictions, and conditional launch.',
    appliesTo: ['small', 'medium', 'large'],
    priority: 'high',
    google: {
      product: 'Google Workspace + Android Work Profile / iOS User Enrollment',
      licence: 'typically requires Google Workspace Business Plus or Enterprise',
      configPath: 'Admin console > Security > Data protection > App management',
      steps: [
        'Configure app management for Outlook, Teams, Drive, Docs, Sheets, Slides',
        'Require work profile passcode; set timeout (5 min); block screenshots in work apps',
        'Restrict copy/paste between work and personal apps; block "Open in" to personal apps',
        'Enforce app-level encryption; require Google Workspace account for work apps',
        'Test: open Outlook in work profile; verify PIN prompt; attempt copy to personal notes; verify blocked'
      ]
    },
    microsoft: {
      product: 'Intune App Protection Policies (MAM)',
      licence: 'typically requires Intune Plan 1 (included in M365 E3/E5)',
      configPath: 'Endpoint Manager > Apps > App protection policies > Create policy',
      steps: [
        'Create policy for iOS/iPadOS and Android: require PIN, block save-as, restrict cut/copy/paste',
        'Target apps: Outlook, Teams, OneDrive, SharePoint, Edge, OneNote, custom LOB apps',
        'Conditional launch: require PIN after 5 min inactivity; block on jailbroken/rooted',
        'Data relocation: block "Open in" to unmanaged apps; restrict backup to iCloud/Google Backup',
        'Deploy to user groups; monitor compliance in Intune app protection status report'
      ]
    },
    evidence: 'MAM policy configuration export; Intune app protection status report; test device verification',
    auditorTest: 'Open Outlook on test BYOD device; verify PIN prompt; attempt copy to personal Notes; verify blocked.',
    pitfall: 'Policy created but not deployed to all relevant apps; conditional launch not configured.',
    mappings: { iso27001: ['A.8.1', 'A.6.7'], soc2: ['CC6.1', 'CC6.7'], hipaa: ['164.312(a)(1)'], gdpr: ['Art. 32', 'Art. 25'] }
  },
  {
    id: 'EDP-BYOD-005',
    domain: 'byod',
    title: 'Conditional Access for BYOD Devices',
    objective: 'BYOD devices granted access only when compliant with MAM/MDM policies.',
    appliesTo: ['small', 'medium', 'large'],
    priority: 'high',
    google: {
      product: 'Google Workspace Context-Aware Access',
      licence: 'typically requires Google Workspace Enterprise Plus',
      configPath: 'Admin console > Security > Context-Aware Access > Access levels',
      steps: [
        'Create access level: "BYOD compliant" requiring work profile / user enrollment',
        'Apply to Google Workspace apps (Gmail, Drive, Calendar, Meet)',
        'Test access from enrolled vs non-enrolled device',
        'Monitor access denials in Security investigation tool'
      ]
    },
    microsoft: {
      product: 'Entra ID Conditional Access + Intune App Protection Policy compliance',
      licence: 'typically requires Entra ID P2 + Intune Plan 1',
      configPath: 'Entra admin center > Protection > Conditional Access > New policy',
      steps: [
        'Create CA policy: require approved client app (MAM) or device compliance',
        'Target: All cloud apps or specific (Exchange, SharePoint, Teams)',
        'Grant: Require approved client app OR compliant device',
        'Exclude break-glass accounts; enable report-only first'
      ]
    },
    evidence: 'CA policy config; sign-in logs showing grant/deny based on MAM compliance',
    auditorTest: 'Access corporate resource from BYOD without MAM enrollment; verify access denied.',
    pitfall: 'CA policy excludes BYOD users; MAM compliance not checked in CA condition.',
    mappings: { iso27001: ['A.8.2', 'A.8.3'], soc2: ['CC6.1', 'CC6.7'], hipaa: ['164.312(a)(1)'], gdpr: ['Art. 32'] }
  }
]

// BYOD Models (4 models)
export const byodModels = [
  {
    id: 'byod-model-1',
    name: 'Full MDM Enrollment (COPE)',
    description: 'Corporate-owned device with full MDM enrollment. Maximum control, highest security.',
    pros: ['Full device control', 'All MDM policies apply', 'Strongest security posture', 'Simplest compliance evidence'],
    cons: ['Higher cost (device procurement)', 'Employee may resent lack of personal use freedom', 'Procurement/logistics overhead'],
    privacyImpact: 'Low - device is corporate property; personal use typically restricted or monitored.',
    suitableSizes: ['medium', 'large']
  },
  {
    id: 'byod-model-2',
    name: 'Work Profile / User Enrollment (BYOD with Containerization)',
    description: 'Personal device with OS-level work container. Corporate apps/data isolated in work profile.',
    pros: ['Lower hardware cost', 'Employee uses preferred device', 'Personal data privacy preserved', 'Selective wipe protects personal data'],
    cons: ['Limited control vs full MDM', 'Not all apps support work profile', 'User can remove work profile (data loss risk)', 'Platform differences (Android Work Profile vs iOS User Enrollment)'],
    privacyImpact: 'High - personal data remains in personal container; corporate wipe only affects work profile.',
    suitableSizes: ['small', 'medium', 'large']
  },
  {
    id: 'byod-model-3',
    name: 'MAM Only (App Protection Policies Only)',
    description: 'No OS-level enrollment. App Protection Policies (Intune MAM / Google App Management) protect corporate apps only.',
    pros: ['Lowest friction for users', 'No device enrollment required', 'Fast onboarding', 'Works on any device'],
    cons: ['Least control (no device encryption enforcement, no device wipe)', 'Cannot enforce OS-level policies (encryption, screen lock)', 'Limited to apps that support MAM SDK', 'No device health attestation'],
    privacyImpact: 'Highest - no device visibility; only app-level data protected.',
    suitableSizes: ['small', 'medium']
  },
  {
    id: 'byod-model-4',
    name: 'VDI / DaaS / Secure Browser (No Local Data)',
    description: 'No corporate data on endpoint. All work occurs in virtual desktop or secure browser streaming.',
    pros: ['Zero data on endpoint', 'Strongest data loss prevention', 'Device agnostic (any browser)', 'Ideal for contractors/high-risk users'],
    cons: ['Requires reliable high-speed internet', 'Latency can impact UX', 'Higher infrastructure cost', 'Offline work not possible'],
    privacyImpact: 'Highest - zero corporate data on device; only pixels streamed.',
    suitableSizes: ['medium', 'large']
  }
];

// Ecosystem Comparison (Google vs Microsoft)
export const ecosystemComparison = [
  { capability: 'MDM Enrollment', google: 'Zero-touch (Android), Apple Business Manager (iOS)', microsoft: 'Autopilot (Windows), Apple Business Manager (iOS), Android Enterprise', notes: 'Both support zero-touch; Microsoft has deeper Windows integration' },
  { capability: 'Disk Encryption', google: 'FileVault (macOS), BitLocker (Windows) via config profiles', microsoft: 'BitLocker (Windows), FileVault (macOS) via Intune profiles', notes: 'Both support escrow to console' },
  { capability: 'EDR Integration', google: 'Chronicle + 3rd party (CrowdStrike, SentinelOne)', microsoft: 'Defender for Endpoint P2 (native), Sentinel integration', notes: 'Microsoft has tighter native integration; Google relies on partners' },
  { capability: 'Patch Management', google: 'ChromeOS auto-update, Windows Update via GEM/Intune', microsoft: 'Windows Update for Business + Intune rings + Defender Vuln Mgmt', notes: 'Microsoft more mature for Windows patching' },
  { capability: 'App Allowlisting', google: 'Chrome extension allowlist, Play Store approval', microsoft: 'AppLocker/WDAC + Intune app protection', notes: 'Microsoft has deeper OS-level control (AppLocker/WDAC)' },
  { capability: 'Conditional Access', google: 'Context-Aware Access (Enterprise Plus)', microsoft: 'Entra ID Conditional Access (P1/P2)', notes: 'Microsoft more granular; Google simpler but less flexible' },
  { capability: 'MAM / App Protection', google: 'Android Work Profile, iOS User Enrollment, App Management', microsoft: 'Intune App Protection Policies (MAM) + Work Profile/User Enrollment', notes: 'Microsoft MAM more mature; Google improving with App Management' },
  { capability: 'DLP', google: 'Workspace DLP (Drive, Gmail, Chat beta)', microsoft: 'Purview DLP (Exchange, Teams, SharePoint, OneDrive, Endpoint, Teams)', notes: 'Microsoft more comprehensive coverage' },
  { capability: 'Secrets Detection', google: 'Secret Manager + GitHub/GitLab integration', microsoft: 'GitHub Advanced Security + Defender for DevOps / Azure DevOps', notes: 'Both strong; GitHub Advanced Security very mature' },
  { capability: 'Reporting/BI', google: 'BigQuery + Looker / Security investigation tool', microsoft: 'Power BI + Intune Data Warehouse / Graph API', notes: 'Microsoft Power BI more accessible; Google requires BigQuery/Looker skills' },
  { capability: 'Break-Glass Accounts', google: 'Super admin recovery + Context-Aware Access exclusion', microsoft: 'Entra ID Emergency Access Accounts (cloud-only, FIDO2)', notes: 'Microsoft has dedicated feature; Google uses workaround' }
];

// Third Party Tools (Neutral, no rankings)
export const thirdPartyTools = [
  { name: 'CrowdStrike Falcon', category: 'EDR', description: 'Cloud-native EDR with threat intelligence', typicalUseCase: 'Primary EDR for Mac/Windows/Linux fleets' },
  { name: 'SentinelOne Singularity', category: 'EDR/XDR', description: 'Autonomous EDR with automated rollback', typicalUseCase: 'High-security environments needing automated remediation' },
  { name: 'Microsoft Defender for Endpoint', category: 'EDR', description: 'Native Windows EDR with ATT&CK mapping', typicalUseCase: 'Microsoft 365 E5 shops wanting native integration' },
  { name: 'Jamf Pro', category: 'MDM (macOS/iOS)', description: 'Apple-focused MDM with deep macOS/iOS management', typicalUseCase: 'Mac-heavy fleets needing DEP, VPP, and macOS-specific controls' },
  { name: 'Kandji', category: 'MDM (macOS/iOS)', description: 'Modern Mac-first MDM with compliance templates', typicalUseCase: 'Mac-first startups wanting modern UX and automation' },
  { name: 'Mosyle', category: 'MDM (Apple)', description: 'Apple-only MDM with strong education/enterprise focus', typicalUseCase: 'Apple-only fleets wanting simplicity' },
  { name: 'VMware Workspace ONE', category: 'UEM', description: 'Unified endpoint management across all platforms', typicalUseCase: 'Multi-platform enterprises needing single console' },
  { name: 'Netskope', category: 'CASB / SSE', description: 'Cloud-native CASB with inline DLP and threat protection', typicalUseCase: 'Organizations needing cloud app visibility and control' },
  { name: 'Zscaler', category: 'SSE / ZTNA', description: 'Cloud proxy with ZTNA, SWG, CASB, DLP', typicalUseCase: 'Zero-trust network access replacement for VPN' },
  { name: '1Password / Bitwarden', category: 'Password Manager', description: 'Enterprise password manager with sharing and SSO', typicalUseCase: 'Credential hygiene across all sizes' },
  { name: 'Tailscale / NetBird', category: 'Mesh VPN / ZTNA', description: 'WireGuard-based mesh for secure device-to-device access', typicalUseCase: 'Remote access without traditional VPN' },
  { name: 'TruffleHog / Gitleaks', category: 'Secrets Scanning', description: 'Open-source secret scanning for repos and CI/CD', typicalUseCase: 'Supplement to GitHub/GitLab secret scanning' },
  { name: 'Terraform / OpenTofu', category: 'IaC', description: 'Infrastructure as code for cloud/security config', typicalUseCase: 'Provision MDM/CA/Intune config as code' }
];

// Roadmaps (Small 30/60/90, Medium 2 quarters, Large 12 months)
export const roadmaps = [
  {
    id: 'roadmap-small',
    label: 'Small (1-50) - 30/60/90 Day Plan',
    timeframe: '90 days',
    applicableSizes: ['small'],
    tasks: [
      'Days 1-30: Enroll all devices in MDM; enforce encryption + MFA; deploy EDR; enable email/storage DLP; draft BYOD policy',
      'Days 31-60: Deploy MAM for BYOD; conditional access for cloud apps; patch management SLAs; secrets scanning in CI/CD',
      'Days 61-90: Conditional access enforcement; break-glass accounts; compliance dashboard; quarterly access review; first tabletop exercise'
    ]
  },
  {
    id: 'roadmap-medium',
    label: 'Medium (51-500) - Two-Quarter Plan',
    timeframe: '6 months (2 quarters)',
    applicableSizes: ['medium'],
    tasks: [
      'Q1: MDM/EDR/MAM full deployment; conditional access enforcement; patch SLAs; vendor risk register; secrets scanning',
      'Q2: Conditional access enforcement; break-glass accounts; compliance dashboard; quarterly access review; tabletop exercise; vendor assessments'
    ]
  },
  {
    id: 'roadmap-large',
    label: 'Large (500+) - 12-Month Plan',
    timeframe: '12 months',
    applicableSizes: ['large'],
    tasks: [
      'Months 1-3: Multi-entity scope definition; landing zone; centralized logging; break-glass; vendor register',
      'Months 4-6: Phased MDM/EDR rollout per entity; conditional access per BU; patch automation; vendor assessments',
      'Months 7-9: Multi-site certification scope; break-glass testing; compliance dashboard; vendor re-assessments',
      'Months 10-12: Surveillance audit prep; break-glass drill; roadmap review; next-year planning'
    ]
  }
];

// Pushbacks (ITGC domain format)
export const pushbacks = [
  {
    itgc: 'Access Management',
    gap: 'No BYOD policy or containerization',
    pushback: '"Employees use personal phones for work; we cannot control them."',
    reality: 'Unmanaged personal devices accessing corporate data are a leading breach vector. MAM/containerization provides control without owning the device.',
    policy: 'BYOD Policy, App Protection Policy, Conditional Access Policy',
    compensating: [
      'MAM policies protect data in approved apps',
      'Conditional access blocks unenrolled devices',
      'Selective wipe on offboarding'
    ],
    leantip: 'Start with MAM for Outlook/Teams/OneDrive; it is free with M365 E3 and requires no device enrollment.'
  },
  {
    itgc: 'Access Management',
    gap: 'No conditional access or device compliance checks',
    pushback: '"Conditional access blocks legitimate users; too complex to maintain."',
    reality: 'Without conditional access, stolen credentials = full access. Modern CA with device compliance is standard and low-friction with proper exclusion groups.',
    policy: 'Conditional Access Policy, Device Compliance Policy',
    compensating: [
      'Report-only mode for 30 days before enforcement',
      'Break-glass accounts excluded',
      'Phishing-resistant MFA (FIDO2) reduces reliance on device state'
    ],
    leantip: 'Start with report-only mode on one app (e.g., GitHub); monitor false positives for two weeks before expanding.'
  },
  {
    itgc: 'IT Operations',
    gap: 'No disk encryption enforcement or verification',
    pushback: '"Encryption slows down devices; users will complain."',
    reality: 'Modern hardware encryption (BitLocker, FileVault) has negligible performance impact. Unencrypted lost laptop = reportable breach.',
    policy: 'Disk Encryption Policy, Endpoint Protection Policy',
    compensating: [
      'Enable via MDM with escrow; user-transparent',
      'Monitor compliance dashboard; remediate non-compliant in 24h',
      'Escrow recovery keys in MDM; test quarterly'
    ],
    leantip: 'Enable encryption via MDM in monitor mode for 2 weeks; verify zero performance tickets before enforcing.'
  },
  {
    itgc: 'Access Management',
    gap: 'No MFA or weak MFA (SMS/OTP only)',
    pushback: '"MFA is annoying; SMS is good enough."',
    reality: 'SMS/OTP is phishable. Phishing-resistant MFA (FIDO2, WebAuthn, Windows Hello, Passkeys) is the only defense against credential theft.',
    policy: 'Authentication Policy, MFA Policy',
    compensating: [
      'Enforce FIDO2/WebAuthn for all admins and privileged users',
      'Phase in for all users over 90 days with support comms',
      'Provide hardware keys (YubiKey) for users without compatible devices'
    ],
    leantip: 'Start with admins only; use Conditional Access to require phishing-resistant MFA for privileged roles.'
  },
  {
    itgc: 'Data Privacy / Governance',
    gap: 'No DLP or egress controls',
    pushback: '"DLP blocks legitimate work; too many false positives."',
    reality: 'Modern DLP with ML-based classifiers and policy tips has low false positive rates. Start with audit mode, tune, then block.',
    policy: 'DLP Policy, Data Classification Policy, Egress Control Policy',
    compensating: [
      'Start in audit mode for 30 days; review every alert',
      'Tune rules: exclude internal domains, known-safe file types',
      'Deploy policy tips (warn user) before blocking'
    ],
    leantip: 'Start with email DLP for PCI/PII; it has highest ROI and lowest false positive rate.'
  }
];

// Framework Mapping
export const frameworkMapping = [
  { controlId: 'EDP-MDM-001', iso27001: ['A.8.1'], soc2: ['CC6.1'], hipaa: ['164.312(a)(2)(iv)'], gdpr: ['Art. 32'] },
  { controlId: 'EDP-MDM-002', iso27001: ['A.8.1', 'A.8.24'], soc2: ['CC6.1', 'CC6.7'], hipaa: ['164.312(a)(2)(iv)'], gdpr: ['Art. 32'] },
  { controlId: 'EDP-MDM-003', iso27001: ['A.8.7'], soc2: ['CC7.2'], hipaa: ['164.312(b)'], gdpr: ['Art. 32'] },
  { controlId: 'EDP-MDM-004', iso27001: ['A.8.8'], soc2: ['CC7.1'], hipaa: ['164.308(a)(5)'], gdpr: ['Art. 32'] },
  { controlId: 'EDP-MDM-005', iso27001: ['A.8.19'], soc2: ['CC6.1', 'CC6.7'], hipaa: ['164.312(a)'], gdpr: ['Art. 32'] },
  { controlId: 'EDP-MDM-006', iso27001: ['A.8.2', 'A.8.3'], soc2: ['CC6.1', 'CC6.7'], hipaa: ['164.312(a)(1)'], gdpr: ['Art. 32'] },
  { controlId: 'EDP-MDM-007', iso27001: ['A.8.1', 'A.8.12'], soc2: ['CC6.7'], hipaa: ['164.312(a)(2)(iv)'], gdpr: ['Art. 32', 'Art. 17'] },
  { controlId: 'EDP-MDM-008', iso27001: ['A.8.1', 'A.8.2'], soc2: ['CC7.2'], hipaa: ['164.308(a)(1)'], gdpr: ['Art. 32'] },
  { controlId: 'EDP-MDM-009', iso27001: ['A.8.1', 'A.6.7'], soc2: ['CC6.1', 'CC6.7'], hipaa: ['164.312(a)(1)'], gdpr: ['Art. 32', 'Art. 25'] },
  { controlId: 'EDP-MDM-010', iso27001: ['A.5.18', 'A.8.2'], soc2: ['CC6.1'], hipaa: ['164.312(a)'], gdpr: ['Art. 32'] },
  { controlId: 'EDP-DLP-001', iso27001: ['A.8.12'], soc2: ['CC6.7', 'CC7.2'], hipaa: ['164.312(d)'], gdpr: ['Art. 32', 'Art. 25'] },
  { controlId: 'EDP-DLP-002', iso27001: ['A.8.12', 'A.8.13'], soc2: ['CC6.7', 'CC7.2'], hipaa: ['164.312(d)'], gdpr: ['Art. 32', 'Art. 25'] },
  { controlId: 'EDP-DLP-003', iso27001: ['A.8.12', 'A.8.13'], soc2: ['CC6.7'], hipaa: ['164.312(d)'], gdpr: ['Art. 32'] },
  { controlId: 'EDP-DLP-004', iso27001: ['A.8.12', 'A.8.13'], soc2: ['CC6.7', 'CC7.2'], hipaa: ['164.312(d)'], gdpr: ['Art. 32'] },
  { controlId: 'EDP-DLP-005', iso27001: ['A.8.12', 'A.8.24'], soc2: ['CC6.7', 'CC7.2'], hipaa: ['164.312(d)'], gdpr: ['Art. 32'] },
  { controlId: 'EDP-BYOD-001', iso27001: ['A.6.7', 'A.8.1'], soc2: ['CC6.1'], hipaa: ['164.312(a)(1)'], gdpr: ['Art. 32', 'Art. 25'] },
  { controlId: 'EDP-BYOD-002', iso27001: ['A.8.1', 'A.6.7'], soc2: ['CC6.1', 'CC6.7'], hipaa: ['164.312(a)(1)'], gdpr: ['Art. 32', 'Art. 25'] },
  { controlId: 'EDP-BYOD-003', iso27001: ['A.6.7', 'A.8.1', 'A.8.12'], soc2: ['CC6.7'], hipaa: ['164.312(a)(2)(iv)'], gdpr: ['Art. 32', 'Art. 17'] },
  { controlId: 'EDP-BYOD-004', iso27001: ['A.8.1', 'A.6.7'], soc2: ['CC6.1', 'CC6.7'], hipaa: ['164.312(a)(1)'], gdpr: ['Art. 32', 'Art. 25'] },
  { controlId: 'EDP-BYOD-005', iso27001: ['A.8.2', 'A.8.3'], soc2: ['CC6.1', 'CC6.7'], hipaa: ['164.312(a)(1)'], gdpr: ['Art. 32'] }
];