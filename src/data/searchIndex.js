import { FRAMEWORKS } from './registry.js';
import { GENERIC_ASSESSMENT, PRIVACY_ASSESSMENT_EXTRA } from './assessments.js';

export const SEARCH_CATEGORIES = [
  'Frameworks & Standards',
  'Policy & Control Modules',
  'Persona Requirements',
  'Control Domains & Mappings',
];

export const SUGGESTIONS = [
  'Passwords',
  'Contractors',
  'Azure',
  'Vendor Risk',
  'ISO 42001',
  'Background Checks',
  'MFA',
  'Network Security',
  'Incident Response',
  'Access Reviews',
  'Data Privacy',
  'Backup & Recovery',
];

// ---------- text helpers ----------
const norm = (s = '') =>
  String(s)
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();

function tokenize(...inputs) {
  const set = new Set();
  for (const val of inputs) {
    for (const t of String(val || '').split(/[^a-z0-9+#.()\-]+/i)) {
      const w = norm(t);
      if (w.length > 1) set.add(w);
    }
  }
  return [...set];
}

// ---------- alias / synonym dictionary ----------
const ALIASES = {
  azure: ['azure', 'azure ad', 'aad', 'entra', 'entra id', 'windows'],
  aws: ['aws', 'amazon', 'cloudtrail'],
  gcp: ['gcp', 'google cloud', 'google'],
  cloud: ['cloud', 'multi-cloud', 'saas', 'iaas', 'paas', 'aws', 'azure', 'gcp', 'alibaba'],
  password: ['password', 'passwords', 'passphrase', 'credential', 'credentials'],
  passwords: ['password', 'passwords', 'passphrase', 'credential', 'credentials'],
  mfa: ['mfa', '2fa', 'two-factor', 'otp', 'totp', 'authenticator', 'multi-factor'],
  sso: ['sso', 'single sign-on', 'idp', 'identity provider', 'okta', 'federated'],
  yubikey: ['yubikey', 'fido2', 'webauthn', 'security key', 'phishing-resistant mfa'],
  contractor: ['contractor', 'contractors', 'consultant', 'third-party', 'vendors'],
  contractors: ['contractor', 'contractors', 'consultant', 'third-party'],
  intern: ['intern', 'interns', 'trainee', 'trainees', 'student', 'internship'],
  fte: ['fte', 'ftes', 'full-time', 'employee', 'employees'],
  vendor: ['vendor', 'vendors', 'supplier', 'third-party', 'sub-processor', 'procurement'],
  dpa: ['dpa', 'data processing agreement', 'baa', 'scc', 'sccs', 'schrems'],
  'background check': ['background check', 'background checks', 'background verification', 'screening', 'pre-employment'],
  background: ['background check', 'background checks', 'background verification', 'screening', 'due diligence'],
  uar: ['uar', 'user access review', 'access review', 'recertification', 'attestation'],
  iam: ['iam', 'identity', 'access', 'rbac', 'scim', 'provisioning', 'entitlement'],
  firewall: ['firewall', 'firewalls', 'security group', 'security groups', 'nacl', 'egress', 'ingress', 'waf'],
  network: ['network', 'networks', 'segmentation', 'vpc', 'vnet', 'subnet', 'dmz', 'zero trust', 'ztna'],
  backup: ['backup', 'backups', 'restore', 'recovery', 'disaster recovery', 'bcp', 'business continuity', 'rto', 'rpo'],
  logging: ['logging', 'log', 'logs', 'monitoring', 'siem', 'audit trail', 'observability', 'telemetry'],
  monitoring: ['monitoring', 'logging', 'siem', 'observability', 'alerting'],
  'incident response': ['incident response', 'incident', 'ir', 'breach', 'notification', 'forensics', 'tabletop', 'containment'],
  incident: ['incident', 'incident response', 'breach', 'notification', 'forensics'],
  encryption: ['encryption', 'encrypt', 'cipher', 'kms', 'key management', 'tls', 'at rest', 'in transit', 'aes'],
  database: ['database', 'databases', 'db', 'data store', 'data stores', 'rds', 'cassandra'],
  vpn: ['vpn', 'remote access', 'vpc', 'subnet', 'segmentation', 'tailscale'],
  passwordless: ['passwordless', 'passkeys', 'fido2', 'webauthn', 'windows hello'],
  jit: ['jit', 'just-in-time', 'just in time', 'privileged access', 'elevation'],
  soc2: ['soc 2', 'soc2', 'trust services'],
  'user access review': ['uar', 'user access review', 'access review', 'recertification', 'attestation'],
  'access review': ['access review', 'access reviews', 'uar', 'recertification', 'attestation'],
  'data privacy': ['data privacy', 'privacy', 'gdpr', 'dpdpa', 'consent'],
  'vendor risk': ['vendor risk', 'vendor risk management', 'third-party risk', 'vrm'],
  'iso 42001': ['iso 42001', '42001', 'ai governance', 'ai management system'],
  'patch': ['patch', 'patching', 'remediation window', 'vulnerability', 'cve'],
  'patch sla': ['patch', 'patching', 'remediation window', 'sla', 'severity'],
  'severity': ['severity', 'p0', 'p1', 'p2', 'p3', 'critical', 'high', 'medium', 'low'],
  'p0': ['p0', 'sev 0', 'critical', 'emergency', '15 min', '60 minutes', 'highest'],
  'p1': ['p1', 'sev 1', 'high', '96h', '24h'],
  'siem': ['siem', 'log aggregation', 'correlation', 'security operations center', 'retention'],
  retention: ['retention', 'log retention', 'hot', 'warm', 'cold', '181 days', '180 days', 'cert-in'],
  byod: ['byod', 'bring your own device', 'mdm', 'mam', 'device compliance'],
  hybrid: ['hybrid', 'remote', 'on-the-go', 'workforce', 'field', 'on site'],
};

// ---------- hard-coded result boosts for the most common queries ----------
const SEARCH_BOOST = {
  azure: ['password-policies', 'fedramp', 'soc2', 'iso-27001-la', 'nist'],
  aws: ['fedramp', 'soc2', 'iso-27001-la', 'nist', 'vendor-risk'],
  gcp: ['fedramp', 'soc2', 'iso-27001-la', 'nist'],
  password: ['password-policies', 'domain-access'],
  passwords: ['password-policies', 'domain-access', 'domain-passwords'],
  mfa: ['password-policies', 'domain-access', 'domain-passwords', 'access-governance'],
  sso: ['password-policies', 'domain-identity', 'domain-access'],
  yubikey: ['password-policies', 'domain-passwords'],
  contractor: ['persona-contractor', 'access-governance', 'vendor-risk'],
  contractors: ['persona-contractor', 'access-governance', 'vendor-risk'],
  intern: ['persona-intern'],
  interns: ['persona-intern'],
  fte: ['persona-fte'],
  'full-time': ['persona-fte'],
  vendor: ['vendor-risk', 'persona-contractor', 'domain-vendor'],
  vendors: ['vendor-risk', 'persona-contractor', 'domain-vendor'],
  dpa: ['vendor-risk'],
  'background check': ['persona-fte', 'persona-contractor', 'access-governance'],
  'background checks': ['persona-fte', 'persona-contractor', 'access-governance'],
  background: ['persona-fte', 'persona-contractor', 'access-governance'],
  uar: ['user-access-review', 'domain-access'],
  'user access review': ['user-access-review', 'domain-access'],
  'access review': ['user-access-review', 'domain-access'],
  firewall: ['domain-firewall', 'domain-network'],
  network: ['domain-network', 'domain-firewall'],
  backup: ['domain-backup'],
  logging: ['domain-logging', 'domain-monitoring'],
  monitoring: ['domain-monitoring', 'domain-logging'],
  'incident response': ['domain-incident'],
  incident: ['domain-incident'],
  encryption: ['domain-encryption'],
  database: ['domain-database'],
  database_: ['domain-database'],
  'change management': ['domain-change'],
  'data privacy': ['domain-privacy', 'ai-privacy', 'domain-encryption'],
  'vendor risk': ['vendor-risk', 'domain-vendor'],
  'iso 42001': ['iso-42001'],
  'ai governance': ['iso-42001', 'ai-privacy'],
  patch: ['secops-vuln', 'hybrid-security'],
  'patch sla': ['secops-vuln'],
  severity: ['secops-vuln', 'secops-ir'],
  p0: ['secops-ir', 'secops-vuln'],
  p1: ['secops-ir', 'secops-vuln'],
  siem: ['secops-logging', 'hybrid-security'],
  retention: ['secops-logging'],
  byod: ['hybrid-security', 'domain-access'],
  hybrid: ['hybrid-security', 'secops-vuln'],
};

// ---------- region synonyms used as hidden tags ----------
const REGION_TAGS = {
  'Global': ['global', 'worldwide'],
  'United States': ['united states', 'usa', 'us', 'america', 'federal'],
  'United States (Federal)': ['united states', 'usa', 'us', 'america', 'federal', 'government agency'],
  'European Union': ['european union', 'eu', 'europe', 'eea', 'european'],
  'India': ['india', 'indian', 'asia'],
  'China': ['china', 'chinese', 'asia'],
  'Singapore': ['singapore', 'asia'],
  'Brazil': ['brazil', 'south america', 'portuguese'],
};

// ---------- extra hidden keyword/tag sets per framework (beyond task text) ----------
const FRAMEWORK_KEYWORDS = {
  'iso-27001-la': ['isms', 'iso 27001', '27001', 'information security management system', 'lead auditor', 'audit', 'certification', 'security controls', 'encryption', 'access control', 'incident response', 'business continuity', 'risk management', 'vendor management', 'statement of applicability', 'annex', 'internal audit'],
  'iso27001-li': ['isms', 'iso 27001', '27001', 'information security management system', 'lead implementer', 'implementation', 'security controls', 'risk assessment', 'encryption', 'access control', 'statement of applicability', 'soa'],
  iso31000: ['risk management', 'enterprise risk', 'risk register', 'risk assessment', 'risk appetite', 'grc', 'iso 31000', 'treasure map risk'],
  iso27701: ['privacy', 'pims', 'privacy information management', 'personal data', 'data protection', 'dsar', 'gdpr', 'consent', 'privacy notice', 'controller', 'processor', 'data privacy', 'privacy policy'],
  'pci-dss-v4': ['pci', 'pci dss', 'payment cards', 'cardholder data', 'credit card', 'card data environment', 'cde', 'pan', 'tokenization', 'qsa', 'srip', 'encryption', 'segmentation', 'scoping'],
  soc2: ['soc 2', 'trust services', 'tsc', 'aicpa', 'cloud security', 'encryption', 'access control', 'availability', 'confidentiality', 'integrity', 'privacy', 'security controls', 'vendor management', 'cc6', 'cc7'],
  hipaa: ['hipaa', 'health', 'healthcare', 'medical', 'phi', 'ephi', 'protected health information', 'patient data', 'ehr', 'baa', 'business associate', 'encryption', 'breach notification', 'privacy', 'security rule', 'hippa'],
  nist: ['nist', 'csf', 'cybersecurity framework', 'cf', 'identify', 'protect', 'detect', 'respond', 'recover', 'encryption', 'access control', 'risk management', 'nist csf 2.0'],
  'cippe-us': ['critical infrastructure', 'united states', 'usa', 'federal', 'homeland security', 'cyber security', 'essential industries', 'cip'],
  hitrust: ['hitrust', 'healthcare', 'health information trust', 'phi', 'certification', 'shared responsibility', 'maturity', 'hipaa'],
  coppa: ['coppa', 'children', 'kids', 'minors', 'child privacy', 'parental consent', 'verification', 'ver', 'online', 'website', 'mobile apps', 'ftc', 'safe harbor'],
  'ccpa-cpra': ['ccpa', 'cpra', 'california', 'consumer privacy', 'calpriv', 'opt out', 'do not sell', 'dsar', 'sensitive personal information', 'spi', 'access request', 'deletion request'],
  gdpr: ['gdpr', 'general data protection regulation', 'european union', 'eu', 'eea', 'privacy', 'data protection', 'personal data', 'consent', 'dsar', 'erasure', 'right to be forgotten', 'breach notification', '72 hour', 'data subject', 'controller', 'processor', 'dpia', 'ropa'],
  'cippe-eu': ['critical infrastructure', 'european union', 'eu', 'nis2', 'essential entity', 'cyber security', 'essential services'],
  dpdpa: ['dpdpa', 'dpdp act', 'india', 'digital personal data protection act', 'personal data', 'consent', 'data fiduciary', 'data principal', 'data protection board', 'breach notification', 'children consent'],
  sebi: ['sebi', 'securities', 'stock market', 'capital markets', 'india', 'trading', 'exchange', 'cyber security', 'brokers', 'risk management'],
  rbi: ['rbi', 'reserve bank', 'banking', 'banks', 'financial', 'india', 'payment systems', 'cyber security', 'fintech'],
  cscrf: ['cscrf', 'india cyber security', 'cyber security framework', 'csirt', 'incident', 'cert', 'cyber crisis management', 'availability', 'forensic'],
  'cert-in': ['cert in', 'cert-in', 'india', 'incident response', 'cyber security', 'mandatory directives', '6 hour reporting', '180 day logs', 'vpn logs', 'csirt', 'coordination'],
  lgpd: ['lgpd', 'lei geral', 'brazil', 'anpd', 'data protection', 'privacy', 'personal data', 'consent', 'portuguese'],
  pdpa: ['pdpa', 'singapore', 'personal data protection act', 'privacy', 'consent', 'data protection officer', 'pdpc', 'personal data', 'dpo'],
  pipl: ['pipl', 'china', 'chinese', 'personal information protection law', 'personal information', 'privacy', 'data protection', 'cross-border', 'security assessment', 'cac', 'sensitive personal information', 'consent', 'privacy policy'],
  cis: ['cis', 'cis controls', 'center for internet security', 'v8', 'cyber hygiene', 'implementation groups', 'ig1', 'ig2', 'ig3', 'essential security', 'saf', '18 controls', 'baseline'],
  fedramp: ['fedramp', 'federal risk', 'authorization', 'fisma', 'us federal', 'government', 'government cloud', 'agency', 'cloud service provider', 'csp', 'jab', 'security assessment'],
  'iso-22317': ['iso 22317', 'bia', 'business impact analysis', 'business continuity', 'mtp', 'mtd', 'mpr', 'rto', 'recovery', 'criticality', 'dependency'],
  aigp: ['aigp', 'iapp', 'ai', 'artificial intelligence', 'ai governance', 'ai act', 'model governance', 'model risk', 'bias', 'responsible ai', 'algorithm', 'automated decision', 'governance professional', 'certification'],
};

// ---------- framework entries ----------
function frameworkEntries() {
  return Object.values(FRAMEWORKS)
    .filter(fw => fw && fw.id)
    .map(fw => {
      const rawWeeks = fw.weeksData || fw.weeks || fw.modules || [];
      const weeks = Array.isArray(rawWeeks) ? rawWeeks : [];
      const allTasks = weeks.flatMap(w => {
        if (Array.isArray(w.days) && w.days.length > 0) {
          return w.days.flatMap(d => {
            if (Array.isArray(d.tasks)) return d.tasks;
            return [{ title: d.title, control: d.control, how: d.how, check: d.check }];
          });
        }
        if (Array.isArray(w.tasks)) return w.tasks;
        return [];
      });
      const weekFocus =
        weeks.find(w => w.title)?.title?.split('—')[1]?.trim() ||
        weeks[0]?.title?.split('—')[1]?.trim() ||
        '';
      const weekCount = weeks.length || fw.weeks || 4;
      const tags = [
        ...(REGION_TAGS[fw.region] || []),
        ...(FRAMEWORK_KEYWORDS[fw.id] || []),
        ...(fw.tagline ? [fw.tagline] : []),
      ];
      const keywords = tokenize(
        fw.name,
        fw.region,
        fw.tagline,
        fw.basePath,
        ...(fw.startupGaps || []).flatMap(g => [g.itgc, g.gap, g.policy] || []),
        ...weeks.flatMap(w => [w.title, w.description]),
        ...allTasks.flatMap(t => [
          String(t?.title || t || ''),
          String(t?.control || ''),
          String(t?.how || ''),
          String(t?.check || ''),
          ...(Array.isArray(t?.tasks) ? t.tasks : []).flatMap(tt => [String(tt?.title || tt || ''), String(tt?.control || '')]),
        ]),
        ...tags,
      );
      return {
        id: fw.id,
        category: 'Frameworks & Standards',
        label: fw.name,
        desc: `${fw.region || 'Global'} · ${weekCount}-week playbook${weekFocus ? ` · ${weekFocus}` : ''}`,
        region: fw.region || 'Global',
        tags,
        keywords,
        bodyText: keywords.join(' '),
        path: fw.basePath || `/${fw.id}`,
        mode: 'route',
        anchorId: null,
      };
    });
}

// ---------- module entries ----------
const moduleEntries = [
  {
    id: 'password-policies',
    category: 'Policy & Control Modules',
    label: 'Password Policies & Authentication Strategies',
    desc: 'Entra ID (Azure AD) password policies, custom banned lists, passwordless FIDO2/passkeys, SSO & MFA alternatives (Okta, Ping, Auth0, AWS, Google, Keycloak, PAM) — framework-mapped best practices.',
    keywords: [
      'password', 'passwords', 'passwordless', 'mfa', 'sso', 'entra', 'azure ad', 'aad',
      'banned password list', 'smart lockout', 'complexity', 'fido2', 'passkeys', 'yubikey',
      'webauthn', 'okta', 'ping', 'auth0', 'keycloak', 'cyberark', 'beyondtrust', 'delinea',
      'pam', 'nist 800-63b', 'pci', 'rotation', 'conditional access', 'pim', 'windows hello',
      'certificate-based auth', 'phishing-resistant', 'titan',
    ],
    path: '/',
    anchorId: 'password-policies',
    mode: 'hash',
  },
  {
    id: 'ai-privacy',
    category: 'Policy & Control Modules',
    label: 'AI Privacy Risk Matrix',
    desc: '11 critical privacy risks across Model Training, RAG Systems, AI Agents, and Industry Use Cases — mapped to GDPR, AI Act, HIPAA, CCPA with actionable controls.',
    keywords: [
      'ai', 'llm', 'model training', 'memorization', 'differential privacy', 'dpia', 'rag',
      'vector database', 'retrieval', 'tenant isolation', 'row-level security', 'ai agents',
      'tool calling', 'automated decision', 'gdpr', 'ai act', 'hipaa', 'ccpa', 'model inversion',
      'data provenance', 'consent', 'right-to-be-forgotten', 'profiling', 'bipa', 'fcra', 'nist ai rmf',
    ],
    path: '/',
    anchorId: 'ai-privacy',
    mode: 'hash',
  },
  {
    id: 'vendor-risk',
    category: 'Policy & Control Modules',
    label: 'End-to-End Vendor Risk Management',
    desc: 'Vendor risk lifecycle across 6 sectors, 13 jurisdictions, sub-processor governance, nth-party visibility, and 4-tier review frequency automation.',
    keywords: [
      'vendor', 'vendors', 'third-party', 'sub-processor', 'nth-party', '4th party', 'dpa', 'scc',
      'schrems', 'flow-down', 'due diligence', 'right-to-audit', 'sectors', 'review frequency',
      'tiering', 'dora', 'nis2', 'glba', 'sox', 'nydfs', 'ffiec', 'hitrust', 'cmmc', 'sbom',
      'nist 800-161', 'incident notification', 'data localization',
    ],
    path: '/',
    anchorId: 'vendor-risk',
    mode: 'hash',
  },
  {
    id: 'interview-prep',
    category: 'Policy & Control Modules',
    label: 'Interview Preparation Hub',
    desc: 'Role-specific interview questions with conversational answers for GRC, Privacy, Security, and Risk roles.',
    keywords: [
      'interview', 'interviews', 'job', 'career', 'grc analyst', 'privacy engineer',
      'security engineer', 'ciso', 'compliance manager', 'questions', 'answers', 'mock', 'practice',
    ],
    path: '/',
    anchorId: 'interview-prep',
    mode: 'hash',
  },
  {
    id: 'access-governance',
    category: 'Policy & Control Modules',
    label: 'Persona & Access Governance',
    desc: 'FTE, Contractor, Intern, Production access: background checks, provisioning, governance, offboarding, JIT, session recording — mapped to SOC 2, ISO 27001, PCI, HIPAA, NIST, CIS, FedRAMP, GDPR, DPDPA, CJIS.',
    keywords: [
      'access', 'identity', 'iam', 'rbac', 'least privilege', 'provisioning', 'scim', 'jit',
      'background check', 'background verification', 'onboarding', 'offboarding', 'revocation',
      'break-glass', 'pam', 'soc2 cc6', 'iso a.7.1.1', 'pci 12.7', 'mdm', 'conditional access',
      'privileged access', 'saas', 'production',
    ],
    path: '/',
    anchorId: 'access-governance',
    mode: 'hash',
  },
  {
    id: 'user-access-review',
    category: 'Policy & Control Modules',
    label: 'User Access Review — Coverage, Users & Frequency',
    desc: 'Systems/apps in scope, user types (human + machine identities), and review frequency per framework with risk-tiered operational guidance.',
    keywords: [
      'uar', 'user access review', 'access review', 'recertification', 'attestation', 'coverage',
      'frequency', 'service accounts', 'machine identities', 'api keys', 'ci/cd runners',
      'dormant', 'orphaned', 'privileged', 'quarterly', 'semiannual', 'sailpoint', 'saviynt',
      'okta iga', 'drift', 'privilege creep', 'jira', 'linear', 'servicenow', 'zendesk',
      'ticketing', 'itsm', 'datadog', 'pagerduty',
    ],
    path: '/',
    anchorId: 'access-governance',
    mode: 'hash',
  },
  {
    id: 'iso-42001',
    category: 'Policy & Control Modules',
    label: 'ISO 42001 — AI Management Systems',
    desc: 'Dedicated AI governance framework: AI risk management, AI policies, AI system monitoring (opens the external AI Governance app).',
    keywords: ['iso 42001', '42001', 'ai governance', 'ai management system', 'aism', 'ai risk', 'ai policy'],
    path: 'https://inspiring-ganache-fdd3be.netlify.app/',
    mode: 'external',
    anchorId: null,
  },
  {
    id: 'iso-42001-kb',
    category: 'Policy & Control Modules',
    label: 'ISO 42001 — AI Management Systems (Knowledge Base)',
    desc: 'AIMS breakdown in the GRC Knowledge Base: AI policy, AI risk assessment, Annex B bias/robustness/incident controls, audit rebuttals, vendor AI clauses and the readiness timeline.',
    keywords: ['iso 42001 kb', '42001 annex b', 'ai management system controls', 'ai risk register', 'bias assessment', 'ai incident reporting', 'ai transparency', 'aism', 'ai audit', 'ai policy', 'human oversight', 'foundation model'],
    path: '/knowledge?fw=iso42001',
    mode: 'route',
    anchorId: null,
  },
  {
    id: 'secops-vuln',
    category: 'Policy & Control Modules',
    label: 'Security Operations — Vulnerability Management & Patch SLAs',
    desc: 'Closed-loop vulnerability program per cloud provider with severity SLAs: Critical ≤48h, High ≤96h, Medium ≤30 days, Low ≤90 days — plus supply-chain scanning.',
    keywords: [
      'vuln', 'vulnerability', 'vulnerability management', 'patch', 'patching', 'p0', 'p1', 'cve',
      'sla', 'remediation window', 'critical 48h', 'high 96h', 'medium 30 days', 'low 90 days',
      'qualys', 'tenable', 'defender for cloud', 'security hub', 'github dependabot', 'veracode',
      'supply chain', 'sbom', 'reproducibility', 'aws', 'azure', 'gcp', 'cert-in',
    ],
    path: '/',
    anchorId: 'secops-vuln',
    mode: 'hash',
  },
  {
    id: 'secops-logging',
    category: 'Policy & Control Modules',
    label: 'Security Operations — Logging, Monitoring & SIEM Retention',
    desc: 'Every security-relevant source piped into one SIEM with tiered storage: audit, firewall, endpoint, cloud trails; 180-day hot/queryable baseline, 1-year warm, 7-year cold archive.',
    keywords: [
      'logging', 'monitoring', 'siem', 'log retention', 'splunk', 'cloudtrail', 'audit log',
      '171', '180 days', 'hot storage', 'warm', 'cold archive', '7 years', 'pagerduty',
      'datadog', 'alerts', 'detection', 'cert-in', 'rbi', 'euclid',
    ],
    path: '/',
    anchorId: 'secops-logging',
    mode: 'hash',
  },
  {
    id: 'secops-ir',
    category: 'Policy & Control Modules',
    label: 'Security Operations — Incident Response P0–P3 Triage, Containment & RCA',
    desc: 'Severity-based incident playbook: P0 minutes-level containment, 5-Whys root-cause analysis, corrective & preventive actions, breach notification duties.',
    keywords: [
      'incident response', 'ir', 'p0', 'p1', 'p2', 'p3', 'triage', 'sev0', 'sev1',
      'containment', 'rca', 'root cause', '5 whys', 'corrective', 'preventive', 'retrospective',
      'simulation', 'tabletop', 'golden hour', 'forensics', 'communication plan',
    ],
    path: '/',
    anchorId: 'secops-ir',
    mode: 'hash',
  },
  {
    id: 'ai-governance',
    category: 'Policy & Control Modules',
    label: 'AI Governance & Emerging Tech — ISO 42001, EU AI Act, NIST AI RMF',
    desc: 'One governance module across three frameworks: AI inventory + risk-tier classification, EU AI Act phased obligations, NIST AI RMF Govern–Map–Measure–Manage rhythm, ISO 42001 AIMS, model cards, GPAI and AI-agent coverage.',
    keywords: [
      'ai governance', 'ai inventory', 'eu ai act', 'iso 42001', 'nist ai rmf', 'rmf',
      'annex iii', 'high-risk', 'gpa', 'prohibited', 'systemic risk', 'watermark',
      'model card', 'technical documentation', 'ai agent', 'emerging tech', 'foundation model',
      'genai', 'generative', 'conformity', 'ce marking', 'post-market monitoring', 'art 72', 'art 73',
      'agentic', 'llm', 'prompt injection', 'drift',
    ],
    path: '/ai-governance',
    mode: 'route',
    anchorId: null,
  },
];

// ---------- persona entries ----------
const personaEntries = [
  {
    id: 'persona-fte',
    category: 'Persona Requirements',
    label: 'Persona Requirements — Full-Time Employees (FTEs)',
    desc: 'Background verification before access (7-year history, I-9/right-to-work), HR-driven SCIM provisioning, quarterly access reviews, 4-hour offboarding SLA.',
    keywords: [
      'fte', 'ftes', 'full-time', 'employee', 'employees', 'background check', 'hire',
      'onboarding', 'provisioning', 'i-9', 'right-to-work', 'soc2 cc6.1', 'iso a.7.1.1',
      'pci 12.7', 'offboarding', 'revocation', 'equal employment',
    ],
    path: '/',
    anchorId: 'access-governance',
    mode: 'hash',
  },
  {
    id: 'persona-contractor',
    category: 'Persona Requirements',
    label: 'Persona Requirements — Contractors & Vendors',
    desc: 'Pre-engagement security screening, time-boxed & least-privilege access, sub-contractor flow-down, and JIT-controlled production access.',
    keywords: [
      'contractor', 'contractors', 'vendor', 'vendors', 'consultant', 'third-party',
      'sub-contractor', 'screening', 'time-boxed', 'provisioning', 'soc2', 'iso', 'pci',
      'hipaa', 'background check', 'access review',
    ],
    path: '/',
    anchorId: 'access-governance',
    mode: 'hash',
  },
  {
    id: 'persona-intern',
    category: 'Persona Requirements',
    label: 'Persona Requirements — Interns & Trainees',
    desc: 'Supervised access only, NO production or privileged access, tighter provisioning and shorter review cycles.',
    keywords: [
      'intern', 'interns', 'trainee', 'trainees', 'student', 'internship', 'supervised',
      'no production access', 'no privileged', 'review', 'college',
    ],
    path: '/',
    anchorId: 'access-governance',
    mode: 'hash',
  },
  {
    id: 'persona-production',
    category: 'Persona Requirements',
    label: 'Persona Requirements — Production Access Personnel',
    desc: 'CAB approval, 8-hour JIT windows, PAW, session recording (SSM/Azure Bastion/Teleport), secrets injection (Vault), break-glass with logging.',
    keywords: [
      'production', 'prod', 'jit', 'break-glass', 'cab', 'change approval', 'session recording',
      'bastion', 'teleport', 'ssm', 'paw', 'workstation', 'secrets', 'vault', 'zsp', 'privileged',
    ],
    path: '/',
    anchorId: 'access-governance',
    mode: 'hash',
  },
];

// ---------- control domains (segregated framework controls) ----------
const CONTROL_DOMAINS = [
  {
    id: 'domain-network',
    category: 'Control Domains & Mappings',
    label: 'Network Security & Segmentation',
    desc: 'Mapped: SOC 2 CC6.6 · ISO 27001 A.8.20–A.8.22 · NIST SC-7 · CIS 12/13/14 · FedRAMP SC-7 · PCI 1.x · HIPAA §164.312. VPC/VNet/subnet segregation, DMZ, zero-trust, ZTNA, VPN.',
    keywords: [
      'network', 'networks', 'segmentation', 'vpc', 'vnet', 'subnet', 'dmz', 'zero trust',
      'ztna', 'vpn', 'remote access', 'tunneled', 'zones', 'boundary', 'dmz',
    ],
    frameworks: ['soc2', 'iso-27001-la', 'iso-27001-li', 'nist', 'cis', 'fedramp', 'pci-dss-v4', 'hipaa'],
    path: '/',
    anchorId: 'access-governance',
    mode: 'hash',
  },
  {
    id: 'domain-firewall',
    category: 'Control Domains & Mappings',
    label: 'Firewall & Perimeter Defense',
    desc: 'Mapped: SOC 2 CC6.6 · ISO 27001 A.8.20/8.21 · NIST SC-7 · CIS 13 & 4.5 · FedRAMP SC-7 · PCI 1.x. Security groups, NACLs, WAF, IDS/IPS, egress/ingress rules.',
    keywords: [
      'firewall', 'firewalls', 'security group', 'security groups', 'nacl', 'waf', 'ids',
      'ips', 'intrusion', 'egress', 'ingress', 'perimeter', 'access control list',
    ],
    frameworks: ['soc2', 'iso-27001-la', 'iso-27001-li', 'nist', 'cis', 'fedramp', 'pci-dss-v4'],
    path: '/',
    anchorId: 'access-governance',
    mode: 'hash',
  },
  {
    id: 'domain-access',
    category: 'Control Domains & Mappings',
    label: 'Access Control & IAM',
    desc: 'Mapped: SOC 2 CC6.1–6.5 · ISO A.5.15–5.18 / A.8.2 · NIST AC-1..AC-25 · CIS 5 & 6 · FedRAMP AC/IA · PCI 7.x/8.x · HIPAA §164.312(a). RBAC, least privilege, provisioning, reviews, MFA.',
    keywords: [
      'access control', 'iam', 'identity', 'rbac', 'least privilege', 'provisioning', 'scim',
      'authentication', 'authorization', 'mfa', 'privileged access', 'reviews',
    ],
    frameworks: ['soc2', 'iso-27001-la', 'iso-27001-li', 'nist', 'cis', 'fedramp', 'pci-dss-v4', 'hipaa'],
    path: '/',
    anchorId: 'access-governance',
    mode: 'hash',
  },
  {
    id: 'domain-passwords',
    category: 'Control Domains & Mappings',
    label: 'Passwords & Authentication',
    desc: 'Mapped: NIST 800-63B · PCI 8.x · ISO A.8.5/8.24 · SOC 2 CC6.1 · CIS 5.2/5.3/6.4 · FedRAMP IA-5 · CJIS 5.6. Complexity, banned lists, MFA/FIDO2, passwordless, rotation policy.',
    keywords: [
      'password', 'passwords', 'passphrase', 'mfa', '2fa', 'fido2', 'passkeys', 'yubikey',
      'complexity', 'banned list', 'rotation', 'authentication', 'credential',
    ],
    frameworks: ['soc2', 'iso-27001-la', 'iso-27001-li', 'nist', 'cis', 'fedramp', 'pci-dss-v4', 'hipaa', 'cjis'],
    path: '/',
    anchorId: 'password-policies',
    mode: 'hash',
  },
  {
    id: 'domain-backup',
    category: 'Control Domains & Mappings',
    label: 'Backup & Recovery',
    desc: 'Mapped: ISO A.8.13 · SOC 2 CC6.5/CC7.2 · NIST CP-9/SC-5 · CIS 11 · HIPAA §164.308(a)(7) · PCI 9.5/10.x · FedRAMP CP-9. RTO/RPO, offsite copies, restore testing.',
    keywords: [
      'backup', 'backups', 'restore', 'recovery', 'rto', 'rpo', 'offsite', 'snapshot',
      'disaster recovery', 'bcp', 'business continuity', 'failover',
    ],
    frameworks: ['soc2', 'iso-27001-la', 'iso-27001-li', 'nist', 'cis', 'fedramp', 'pci-dss-v4', 'hipaa'],
    path: '/',
    anchorId: 'access-governance',
    mode: 'hash',
  },
  {
    id: 'domain-change',
    category: 'Control Domains & Mappings',
    label: 'Change Management',
    desc: 'Mapped: ISO A.8.32 · SOC 2 CC8.1 · NIST CM-3/SA-10 · CIS 4 · PCI 6.4 · FedRAMP CM-3 · HIPAA §164.308(a)(4). Change approval, dev/test/prod separation, audit trails, emergency change.',
    keywords: [
      'change management', 'change control', 'cab', 'approval', 'deployment', 'release',
      'emergency change', 'sdic', 'segregation', 'dev', 'test', 'prod',
    ],
    frameworks: ['soc2', 'iso-27001-la', 'iso-27001-li', 'nist', 'cis', 'fedramp', 'pci-dss-v4', 'hipaa'],
    path: '/',
    anchorId: 'access-governance',
    mode: 'hash',
  },
  {
    id: 'domain-database',
    category: 'Control Domains & Mappings',
    label: 'Database & Data Storage',
    desc: 'Mapped: SOC 2 CC6.6/CC7.2 · ISO A.8.24/8.25 · NIST SC-28/CM-6 · CIS 3 & 18 · PCI 2.x/3.x · HIPAA §164.312. Encryption, masking, separation, patching, monitoring.',
    keywords: [
      'database', 'databases', 'db', 'data store', 'rds', 'storage', 'masking', 'redaction',
      'separation', 'patching', 'encryption', 'snapshot',
    ],
    frameworks: ['soc2', 'iso-27001-la', 'iso-27001-li', 'nist', 'cis', 'fedramp', 'pci-dss-v4', 'hipaa'],
    path: '/',
    anchorId: 'access-governance',
    mode: 'hash',
  },
  {
    id: 'domain-logging',
    category: 'Control Domains & Mappings',
    label: 'Logging & Monitoring',
    desc: 'Mapped: ISO A.8.15/8.16 · SOC 2 CC7.1–7.3 · NIST AU-1..AU-12 / SI-4 · CIS 8 · PCI 10.x · FedRAMP AU · CERT-In 6-hr/180-day. SIEM, alerting, anomaly detection, retention.',
    keywords: [
      'logging', 'logs', 'monitoring', 'siem', 'audit trail', 'alerting', 'anomaly detection',
      'observability', 'retention', 'telemetry', 'correlation',
    ],
    frameworks: ['soc2', 'iso-27001-la', 'iso-27001-li', 'nist', 'cis', 'fedramp', 'pci-dss-v4', 'hipaa', 'cert-in', 'cscrf'],
    path: '/',
    anchorId: 'access-governance',
    mode: 'hash',
  },
  {
    id: 'domain-incident',
    category: 'Control Domains & Mappings',
    label: 'Incident Response',
    desc: 'Mapped: ISO A.5.24–5.28 · SOC 2 CC7.3–7.5 · NIST IR-1..IR-9 · CIS 17 · PCI 12.10 · GDPR Art 33/34 (72-hr) · DPDPA Sec 8 · FedRAMP IR. Detection, containment, notification, forensics, tabletop.',
    keywords: [
      'incident response', 'incident', 'ir', 'breach', 'containment', 'notification',
      'forensics', 'tabletop', 'escalation', 'playbook', 'remediation',
    ],
    frameworks: ['soc2', 'iso-27001-la', 'iso-27001-li', 'nist', 'cis', 'fedramp', 'pci-dss-v4', 'hipaa', 'gdpr', 'dpdpa'],
    path: '/',
    anchorId: 'access-governance',
    mode: 'hash',
  },
  {
    id: 'domain-encryption',
    category: 'Control Domains & Mappings',
    label: 'Encryption & Key Management',
    desc: 'Mapped: ISO A.8.24 · SOC 2 CC6.6/CC6.7 · NIST SC-28/CM-6 · CIS 2.5/3.6 · PCI 3.x/4.x · HIPAA §164.312(a)(2)(iv) · FedRAMP SC-28/IA-7. At rest, in transit, KMS, key rotation, TLS.',
    keywords: [
      'encryption', 'encrypt', 'cipher', 'kms', 'key management', 'key rotation', 'tls',
      'at rest', 'in transit', 'aes', 'certificate',
    ],
    frameworks: ['soc2', 'iso-27001-la', 'iso-27001-li', 'nist', 'cis', 'fedramp', 'pci-dss-v4', 'hipaa'],
    path: '/',
    anchorId: 'access-governance',
    mode: 'hash',
  },
  {
    id: 'domain-identity',
    category: 'Control Domains & Mappings',
    label: 'Identity & SSO',
    desc: 'Mapped: SOC 2 CC6.1 · ISO A.5.15–5.16 · NIST IA-2/IA-5 · CIS 5 · FedRAMP IA · PCI 8.x · CJIS 5.6. IdP consolidation, SSO/MFA, SCIM provisioning, directory services (Entra ID, Okta, Ping, Google).',
    keywords: [
      'identity', 'sso', 'idp', 'single sign-on', 'directory', 'entra id', 'okta', 'ping',
      'google workspace', 'keycloak', 'scim', 'federated',
    ],
    frameworks: ['soc2', 'iso-27001-la', 'iso-27001-li', 'nist', 'cis', 'fedramp', 'pci-dss-v4', 'hipaa'],
    path: '/',
    anchorId: 'password-policies',
    mode: 'hash',
  },
  {
    id: 'domain-vulnerability',
    category: 'Control Domains & Mappings',
    label: 'Vulnerability Management',
    desc: 'Mapped: ISO A.8.8/8.10 · SOC 2 CC7.4/CC8.1 · NIST RA-5 · CIS 7 · PCI 6.2/11.3 · FedRAMP RA-5 · HIPAA. Scanning cadence, patching SLAs, prioritization, pen-testing.',
    keywords: [
      'vulnerability', 'vulnerability management', 'patching', 'patch', 'scanning', 'cve',
      'penetration', 'pentest', 'risk assessment', 'prioritization',
    ],
    frameworks: ['soc2', 'iso-27001-la', 'iso-27001-li', 'nist', 'cis', 'fedramp', 'pci-dss-v4', 'hipaa'],
    path: '/',
    anchorId: 'access-governance',
    mode: 'hash',
  },
  {
    id: 'domain-endpoint',
    category: 'Control Domains & Mappings',
    label: 'Endpoint & Device Security',
    desc: 'Mapped: ISO A.8.19 · NIST CM-6/AC-19 · CIS 9 & 10 · HIPAA §164.310 · FedRAMP MP-2 · SOC 2 CC6.6. MDM, EDR/antivirus, disk encryption, BYOD vs corporate, containerization.',
    keywords: [
      'endpoint', 'device', 'mdm', 'edr', 'antivirus', 'desktop', 'laptop', 'mobile',
      'byod', 'corporate', 'disk encryption', 'jailbreak',
    ],
    frameworks: ['soc2', 'iso-27001-la', 'iso-27001-li', 'nist', 'cis', 'fedramp', 'hipaa'],
    path: '/',
    anchorId: 'access-governance',
    mode: 'hash',
  },
  {
    id: 'domain-continuity',
    category: 'Control Domains & Mappings',
    label: 'Business Continuity & Disaster Recovery',
    desc: 'Mapped: ISO A.5.29–5.30 · SOC 2 A1.1–A1.3 · NIST CP-1..CP-13 · CIS 11 · HIPAA §164.308(a)(7) · FedRAMP CP. BIA, RTO/RPO, DR testing, availability commitments.',
    keywords: [
      'bcm', 'bcp', 'business continuity', 'disaster recovery', 'dr', 'bia', 'rto', 'rpo',
      'availability', 'failover', 'tabletop', 'redundancy',
    ],
    frameworks: ['soc2', 'iso-27001-la', 'iso-27001-li', 'nist', 'cis', 'fedramp', 'hipaa'],
    path: '/',
    anchorId: 'access-governance',
    mode: 'hash',
  },
  {
    id: 'domain-vendor',
    category: 'Control Domains & Mappings',
    label: 'Vendor & Third-Party Risk',
    desc: 'Mapped: ISO A.5.19–5.22 · SOC 2 CC6.1/CC9.2 · NIST SA-9/SSRF · CIS 15 · GDPR Art 28 · DORA/NIS2 · FedRAMP SA-9. Due diligence, DPAs, sub-processors, tiers, monitoring.',
    keywords: [
      'vendor', 'vendors', 'third-party', 'supplier', 'sub-processor', 'dpa', 'due diligence',
      'tiering', 'concentration risk', 'ssf', 'supply chain',
    ],
    frameworks: ['soc2', 'iso-27001-la', 'iso-27001-li', 'nist', 'cis', 'fedramp', 'gdpr', 'pci-dss-v4'],
    path: '/',
    anchorId: 'vendor-risk',
    mode: 'hash',
  },
  {
    id: 'domain-privacy',
    category: 'Control Domains & Mappings',
    label: 'Data Privacy & Protection',
    desc: 'Mapped: GDPR · CCPA/CPRA · DPDPA · LGPD · PIPL · PDPA · ISO 27701 · SOC 2 P1. Data flows, ROPA, DSARs, consent, DPIA, cross-border transfers, retention.',
    keywords: [
      'privacy', 'data protection', 'gdpr', 'ccpa', 'dpdpa', 'consent', 'dsar', 'right to be forgotten',
      'dpi', 'roba', 'cross-border', 'data residency', 'retention', 'lgpd', 'pipl', 'pdpa',
    ],
    frameworks: ['gdpr', 'ccpa-cpra', 'dpdpa', 'lgpd', 'pdpa', 'pipl', 'iso27701', 'soc2', 'hipaa'],
    path: '/',
    anchorId: 'ai-privacy',
    mode: 'hash',
  },
  {
    id: 'domain-asset',
    category: 'Control Domains & Mappings',
    label: 'Asset & Inventory Management',
    desc: 'Mapped: ISO A.5.9–5.11 · NIST CM-8 · CIS 1 · SOC 2 CC6.6 · FedRAMP CM-8. Asset register, classification, unmanaged-asset discovery, lifecycle.',
    keywords: [
      'asset', 'inventory', 'asset register', 'classification', 'shadow it', 'discovery',
      'cmdb', 'hardware', 'software',
    ],
    frameworks: ['soc2', 'iso-27001-la', 'iso-27001-li', 'nist', 'cis', 'fedramp'],
    path: '/',
    anchorId: 'access-governance',
    mode: 'hash',
  },
];

// ---------- ITGC environment-assessment controls (Title, Scenario, Tools, Category) ----------
// Every control is indexed across its full rendered text so searches like "linear"
// match the Tools list ("Jira/Linear workflow") even though it isn't in the title.
const ASSESSMENT_PATH = '/iso-22317/assess';

function assessmentEntries() {
  return [...GENERIC_ASSESSMENT, ...PRIVACY_ASSESSMENT_EXTRA].map(a => {
    const haystack = [
      a.id, a.control, a.category, a.itgc, a.tool, a.scenario,
      a.toolInfo, a.external, a.frequency, a.owner, a.privacyCombo, a.evidence,
    ];
    const keywords = tokenize(...haystack.filter(Boolean));
    return {
      id: `assessment-${a.id}`,
      category: 'Policy & Control Modules',
      label: `${a.id} — ${a.control}`,
      desc: `${a.category} · ${a.itgc}${a.tool ? ` · Tools: ${a.tool}` : ''}${a.scenario ? ` · ${a.scenario}` : ''}`,
      keywords,
      bodyText: keywords.join(' '),
      path: ASSESSMENT_PATH,
      mode: 'route',
      anchorId: null,
    };
  });
}

const SEARCH_ENTRIES = [
  ...frameworkEntries(),
  ...moduleEntries,
  ...personaEntries,
  ...CONTROL_DOMAINS,
  ...assessmentEntries(),
];

// ---------- pre-normalized index (built once) ----------
function withNorm(e) {
  const n = (s) => norm(s);
  const tags = [...new Set((e.tags || []).map(n).filter(Boolean))];
  const keywords = [...new Set((e.keywords || []).map(n).filter(Boolean))];
  return {
    ...e,
    nlabel: n(e.label),
    ndesc: n(e.desc),
    nregion: n(e.region || ''),
    ntags: tags,
    nkeywords: keywords,
    nbody: n([e.label, e.desc, e.region, e.bodyText, ...(e.tags || []), ...(e.keywords || [])].filter(Boolean).join(' ')),
  };
}

const INDEXED = SEARCH_ENTRIES.map(withNorm);

function hasSubstring(set, term) {
  for (const v of set) if (v.includes(term)) return true;
  return false;
}

function scoreTerm(item, term) {
  let s = 0;
  const L = item.nlabel;
  const R = item.nregion;
  if (L === term) s += 130;
  else if (L.includes(term)) s += 60;
  if (R && (R === term || R.includes(term))) s += 40;
  if (item.ntags.includes(term)) s += 50;
  else if (hasSubstring(item.ntags, term)) s += 24;
  if (item.nkeywords.includes(term)) s += 32;
  else if (hasSubstring(item.nkeywords, term)) s += 14;
  if (item.ndesc.includes(term)) s += 10;
  if (item.nbody.includes(term)) s += 3;
  return s;
}

// ---------- search engine ----------
function catRank(item) {
  const i = SEARCH_CATEGORIES.indexOf(item.category);
  return i === -1 ? SEARCH_CATEGORIES.length : i;
}

// Noise tokens that add no retrieval value in sentence-style queries.
const STOPWORDS = new Set([
  'how', 'what', 'when', 'which', 'who', 'why', 'the', 'and', 'for', 'are',
  'you', 'your', 'our', 'i', 'a', 'an', 'is', 'it', 'to', 'of', 'in', 'on',
  'do', 'does', 'did', 'set', 'up', 'setup', 'get', 'can', 'with', 'my',
  'me', 'not', 'have', 'has', 'be', 'we', 'please', 'list', 'show', 'give',
  'tell', 'about', 'like', 'want', 'need', 'all',
]);

// Classic Levenshtein edit distance between two lowercase strings.
function levenshtein(a, b) {
  if (a === b) return 0;
  const la = a.length, lb = b.length;
  if (la === 0) return lb;
  if (lb === 0) return la;
  let prev = new Array(lb + 1);
  let curr = new Array(lb + 1);
  for (let j = 0; j <= lb; j++) prev[j] = j;
  for (let i = 1; i <= la; i++) {
    curr[0] = i;
    const ac = a.charCodeAt(i - 1);
    for (let j = 1; j <= lb; j++) {
      const cost = ac === b.charCodeAt(j - 1) ? 0 : 1;
      curr[j] = Math.min(prev[j] + 1, curr[j - 1] + 1, prev[j - 1] + cost);
    }
    const tmp = prev; prev = curr; curr = tmp;
  }
  return prev[lb];
}

// Best fuzzy match of `term` against a list of normalized words, weighted.
function fuzzyIn(term, list, weight) {
  const tlen = term.length;
  if (tlen < 4) return 0;
  let best = 0;
  for (const k of list) {
    if (k === term) continue;
    const klen = k.length;
    if (klen < 4) continue;
    if (Math.abs(klen - tlen) > Math.max(2, Math.floor(tlen / 3))) continue;
    const threshold = Math.max(1, Math.floor(Math.max(tlen, klen) / 4));
    const dist = levenshtein(term, k);
    if (dist <= threshold) {
      const sim = 1 - dist / Math.max(tlen, klen);
      const sc = sim * weight;
      if (sc > best) best = sc;
    }
  }
  return best;
}

// Fuzzy fallback score for an item given the token expansion set.
function fuzzyScore(item, terms) {
  let best = 0;
  for (const term of terms) {
    if (!term || term.length < 4) continue;
    const tlen = term.length;
    if (item.nlabel && item.nlabel.length >= 4 &&
        Math.abs(item.nlabel.length - tlen) <= Math.max(2, Math.floor(tlen / 3))) {
      const threshold = Math.max(1, Math.floor(Math.max(tlen, item.nlabel.length) / 4));
      const dist = levenshtein(term, item.nlabel);
      if (dist <= threshold) {
        const sim = 1 - dist / Math.max(tlen, item.nlabel.length);
        best = Math.max(best, sim * 40);
      }
    }
    best = Math.max(best, fuzzyIn(term, item.ntags, 18));
    best = Math.max(best, fuzzyIn(term, item.nkeywords, 12));
  }
  return Math.round(best);
}

export function searchCompliance(rawQuery, { limit = 12 } = {}) {
  const q = norm(rawQuery);
  if (!q) {
    return { query: '', items: [], grouped: {}, count: 0, expansions: [], hits: [] };
  }

  let tokens = q.split(/\s+/).filter(t => t.length > 1 || /\d/.test(t));
  tokens = tokens.filter(t => !STOPWORDS.has(t));
  const expansions = new Set();
  const hits = new Set();

  // Per-token match term sets (token + singular + alias expansions).
  const sets = tokens.map(tok => {
    const set = new Set([tok]);
    const add = (s) => { if (s && s.length > 0) set.add(s); };
    if (tok.length > 3 && tok.endsWith('s')) add(tok.slice(0, -1));
    if (ALIASES[tok]) ALIASES[tok].forEach(a => add(norm(a)));
    return [...set];
  });

  // Multi-word alias keys contained in the query expand every token's set.
  for (const key of Object.keys(ALIASES)) {
    const nk = norm(key);
    if (nk && q.includes(nk)) {
      if (nk.length > 1) expansions.add(nk);
      ALIASES[key].forEach(a => {
        const at = norm(a);
        if (at && at.length > 1) {
          expansions.add(at);
          sets.forEach(set => set.push(at));
        }
      });
    }
  }
  for (const key of Object.keys(SEARCH_BOOST)) {
    if (q.includes(norm(key))) SEARCH_BOOST[key].forEach(id => hits.add(id));
  }
  tokens.forEach(tok => { expansions.add(tok); });

  // Per-token global best across the whole index. Orphan tokens (matched by
  // nobody, even fuzzy) are dropped so sentence-style queries and typos on a
  // single word no longer zero out otherwise-good results.
  const active = [];
  for (const set of sets) {
    let globalBest = 0;
    for (const item of INDEXED) {
      let best = 0;
      for (const term of set) best = Math.max(best, scoreTerm(item, term));
      if (best > 0) { globalBest = Math.max(globalBest, best); continue; }
      const fz = fuzzyScore(item, set);
      if (fz > 0) { globalBest = Math.max(globalBest, fz); continue; }
    }
    if (globalBest > 0) active.push(set);
  }

  if (active.length === 0) {
    return { query: q, items: [], grouped: {}, count: 0, expansions: [...expansions], hits: [...hits] };
  }

  const results = [];
  for (const item of INDEXED) {
    let total = 0;
    const matchedPositions = [];
    let miss = false;
    for (const set of active) {
      // Header-weighted exact match first (label 130/60, region 40, tags 50, keywords 32).
      let exactBest = 0, exactTerm = null;
      for (const term of set) {
        const sc = scoreTerm(item, term);
        if (sc > exactBest) { exactBest = sc; exactTerm = term; }
      }
      let score = exactBest;
      if (score <= 0) score = fuzzyScore(item, set);
      if (score <= 0) { miss = true; break; }
      total += score;

      // Track real substring positions for the phrase/proximity bonus.
      if (exactTerm && item.nbody.includes(exactTerm)) {
        matchedPositions.push({ index: item.nbody.indexOf(exactTerm), len: exactTerm.length });
      }
    }
    if (miss) continue;

    // Phrase bonus for the full query.
    if (q.length >= 3) {
      if (item.nlabel.includes(q)) total += 40;
      else if (item.nbody.includes(q)) total += 22;
    }

    // Proximity bonus — matched terms clustered together in the body.
    const positions = matchedPositions.slice().sort((a, b) => a.index - b.index);
    if (positions.length >= 2) {
      const span = positions[positions.length - 1].index + positions[positions.length - 1].len - positions[0].index;
      const charBudget = Math.max(48, q.length * 3);
      if (span <= charBudget) total += 14;
    }

    if (hits.has(item.id)) total += 70;
    if (total > 0) results.push({ item, score: total });
  }

  results.sort(
    (a, b) => (b.score - a.score) || (catRank(a.item) - catRank(b.item)) || (a.item.label.length - b.item.label.length),
  );

  const items = results.slice(0, limit).map(r => r.item);
  const grouped = {};
  for (const c of SEARCH_CATEGORIES) grouped[c] = [];
  items.forEach(it => { (grouped[it.category] = grouped[it.category] || []).push(it); });
  Object.keys(grouped).forEach(k => { if (!grouped[k].length) delete grouped[k]; });

  return { query: q, items, grouped, count: results.length, expansions: [...expansions], hits: [...hits] };
}

export { ALIASES, SEARCH_ENTRIES, CONTROL_DOMAINS };