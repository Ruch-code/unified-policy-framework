// Converts docs/source/onelens-evidence-templates.md into src/data/templates.json.
// The markdown is a build-time data source only; it is never served to users.
import fs from 'node:fs';
const md = fs.readFileSync(new URL('../docs/source/onelens-evidence-templates.md', import.meta.url), 'utf8');
const ALL = ['SOC2', 'ISO27001', 'HIPAA', 'GDPR'];

// Policies and customer-facing documents have no key-field column in the source,
// so they get a written purpose and standard document sections.
const DOC_PURPOSE = {
  'infosec-aup-policy': 'Sets the overall security commitment and the acceptable use rules for systems, data and devices.',
  'access-control-policy': 'Defines how access is requested, approved, provisioned, reviewed and removed.',
  'asset-management-policy': 'Defines how information assets are identified, owned, classified and handled through their life cycle.',
  'bcdr-plan': 'Describes how critical services are kept running or restored after a disruption, with recovery objectives and roles.',
  'code-of-conduct': 'Sets expected behaviour, integrity and ethics standards for all personnel.',
  'cryptography-policy': 'Defines approved encryption standards and how keys are generated, stored, rotated and retired.',
  'data-management-policy': 'Defines data classification, handling, retention periods and secure disposal.',
  'hr-security-policy': 'Covers security across the employment life cycle: screening, terms, training, discipline and exit.',
  'incident-response-plan': 'Defines how security incidents are detected, triaged, contained, recovered and reviewed, with HIPAA and GDPR breach notification addenda.',
  'operations-security-policy': 'Covers operating procedures, change, capacity, malware protection, backup, logging and vulnerability management.',
  'physical-security-policy': 'Defines physical access, secure areas, visitor handling and equipment protection.',
  'risk-management-policy': 'Sets how information security risks are identified, assessed, treated, accepted and reviewed.',
  'secure-development-policy': 'Defines security requirements across design, coding, testing, review and release.',
  'vendor-management-policy': 'Defines how third parties are selected, assessed, contracted, monitored and offboarded.',
  'workstation-security-policy': 'Defines safeguards for workstations that access protected health information.',
  'hipaa-compliance-policy': 'Sets how the organisation meets the HIPAA Security, Privacy and Breach Notification Rules.',
  'hipaa-privacy-policy': 'Defines permitted uses and disclosures of PHI and individual rights under the Privacy Rule.',
  'gdpr-compliance-policy': 'Sets how the organisation meets GDPR principles, lawful bases, rights and accountability duties.',
  'internal-privacy-policy': 'Explains to personnel how their own personal data is processed and protected.',
  'privacy-compliance-policy': 'Defines the privacy programme, roles, monitoring and how privacy requirements are met.',
  'termination-security-policy': 'Defines security steps when employment or a contract ends, including access removal and asset return.',
  'secure-engineering-principles': 'Records the engineering principles applied when designing and building secure systems.',
  'data-masking-standard': 'Defines when and how data is masked or pseudonymised, and who can reverse it.',
  'privacy-notice': 'Public notice explaining what personal data is collected, why, how long it is kept and individual rights.',
  'terms-of-service': 'Public terms governing use of the service, including security and data commitments.',
  'security-page': 'Public page describing security practices, certifications and how to report a vulnerability.',
  'support-page': 'Public page describing support channels, hours and response targets.',
  'product-docs': 'Outline for product documentation, covering setup, features, security settings and change history.',
  'soc2-system-description': 'Section III of a SOC 2 report: services, boundaries, components, commitments and control environment.',
};
const POLICY_SECTIONS = ['Purpose and scope', 'Roles and responsibilities', 'Policy statements', 'Exceptions', 'Enforcement', 'Review and approval'];
const TRUST_SECTIONS = {
  'privacy-notice': ['Who we are', 'Data we collect', 'Why we use it and lawful basis', 'Sharing and transfers', 'Retention', 'Your rights', 'Contact'],
  'terms-of-service': ['Scope of service', 'Acceptable use', 'Security commitments', 'Data handling', 'Availability', 'Liability', 'Changes to terms'],
  'security-page': ['Security programme', 'Certifications and reports', 'Data protection', 'Access control', 'Incident response', 'Vulnerability reporting'],
  'support-page': ['Support channels', 'Hours of coverage', 'Severity levels', 'Response targets', 'Escalation'],
  'product-docs': ['Getting started', 'Features', 'Security settings', 'Integrations', 'Release notes', 'Support'],
  'soc2-system-description': ['Services provided', 'Principal service commitments and system requirements', 'System components', 'System boundaries', 'Control environment', 'Complementary user entity controls', 'Subservice organisations'],
};
const RECORD_RE = /\b(Log|Record|Evidence|Tracker|Register|List|Certificate|Checklist|Sample|Summary|Calendar|Form|Review|Report|Request|Ticket)\b/;
const NOT_RECORD_RE = /\b(Plan|Agenda|Procedure|Policy|Template|Questionnaire and Summary)\b/;
const joinAnd = a => a.length < 2 ? a.join('') : a.slice(0, -1).join(', ') + ' and ' + a[a.length - 1];

const categories = [];
let cur = null;
for (const line of md.split('\n')) {
  const h = line.match(/^## (\d+)\. (.+)$/);
  if (h) { cur = { id: h[2].toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-$/, ''), name: h[2].trim(), templates: [] }; categories.push(cur); continue; }
  if (!cur || !/^\| \d+ \|/.test(line)) continue;
  const cells = line.split('|').slice(1, -1).map(s => s.trim());
  let [num, name, keys, fw, slug] = cells.length === 5 ? cells : [cells[0], cells[1], null, cells[2], cells[3]];
  name = name.replace(/\s*[–—]\s*/g, ': ');
  const frameworks = fw === 'All' ? ALL : fw.split(',').map(s => s.trim());
  const isRecord = RECORD_RE.test(name) && !NOT_RECORD_RE.test(name);
  let purpose, fields;
  if (keys) {
    fields = keys.split(/,(?![^()]*\))/).map(s => s.trim()).filter(Boolean).map(s => s[0].toUpperCase() + s.slice(1));
    const lc = joinAnd(fields.map(f => /^[A-Z]{2,}|^[A-Z][a-z]*[A-Z]/.test(f) ? f : f[0].toLowerCase() + f.slice(1)));
    purpose = (isRecord ? 'Captures ' : 'Covers ') + lc + '.';
  } else {
    purpose = DOC_PURPOSE[slug];
    fields = TRUST_SECTIONS[slug] || POLICY_SECTIONS;
    if (!purpose) throw new Error('No purpose for ' + slug);
  }
  cur.templates.push({ num: Number(num), slug, name, purpose, fields, frameworks, type: isRecord ? 'record' : 'document' });
}
const total = categories.reduce((n, c) => n + c.templates.length, 0);
const out = JSON.stringify({ categories }, null, 2);
if (/[—–]/.test(out)) throw new Error('dash found');
fs.writeFileSync(new URL('../src/data/templates.json', import.meta.url), out + '\n');
console.log(categories.length, 'categories', total, 'templates', categories.map(c => c.templates.filter(t => t.type === 'record').length).join(','));
