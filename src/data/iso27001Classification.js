/**
 * Classification of existing content against ISO/IEC 27001:2022.
 *
 * Nothing is deleted. Every pre-existing GEN-* assessment item and every LI
 * learning task is retained with its original ID and gains an explicit
 * classification so a generic security practice can never be read as a
 * mandatory ISO requirement.
 *
 * Categories (see ISO_CATEGORIES in iso27001.js):
 *   clause          - an ISO clause requirement, with exact citation
 *   annexA          - maps to one or more Annex A reference controls
 *   practice        - recommended practice, NOT an ISO requirement
 *   otherFramework  - belongs to a different law/framework; keep separate
 *   unverified      - no precise authoritative basis found; needs review
 *
 * A single item may be BOTH an Annex A reference control and a recommended
 * practice — that is the common and honest case. `primary` is the category shown
 * as the badge; `also` carries the secondary framing.
 */

import { ANNEX_A_BY_ID } from './iso27001AnnexA.js';

const ANNEX = (...ids) => ids.filter(i => ANNEX_A_BY_ID[i]).map(i => ANNEX_A_BY_ID[i].title);

/**
 * GEN-* assessment items. IDs are stable and must not change — saved progress
 * is keyed on them.
 *
 * `contaminants` lists the non-ISO material currently embedded in the item that
 * must be visually separated so it can never read as an ISO requirement.
 */
export const GEN_ISO_CLASSIFICATION = {
  'GEN-01': {
    primary: 'annexA',
    also: ['practice'],
    annexA: ['A.8.5', 'A.5.16', 'A.5.17'],
    clause: [],
    basis: 'Supports Annex A reference controls A.8.5 (secure authentication), A.5.16 (identity management) and A.5.17 (authentication information). ISO/IEC 27001:2022 does NOT mandate MFA, does not require it for any specific population, and specifies no technology.',
    note: 'MFA is a strong and widely expected practice, but it is an organisation-defined control. Selecting it in the SoA is a risk-based decision, not an ISO rule.',
    practiceCaveat: 'The named products are examples, not ISO-endorsed tools.',
    contaminants: [],
  },
  'GEN-02': {
    primary: 'annexA',
    also: ['practice'],
    annexA: ['A.8.3', 'A.5.15', 'A.5.18'],
    clause: [],
    basis: 'Supports A.8.3 (information access restriction), A.5.15 (access control) and A.5.18 (access rights). The standard requires access to be restricted; it does not prescribe an RBAC model.',
    note: 'Least privilege is the intended outcome. RBAC is one common way to achieve it.',
    practiceCaveat: 'The named products are examples, not ISO-endorsed tools.',
    contaminants: [],
  },
  'GEN-03': {
    primary: 'annexA',
    also: ['practice'],
    annexA: ['A.8.2', 'A.5.17'],
    clause: [],
    basis: 'Supports A.8.2 (privileged access rights) and A.5.17 (authentication information). No static-credential prohibition exists in ISO/IEC 27001:2022.',
    note: 'Short-lived credentials are a strong practice for privileged access, not an ISO requirement.',
    practiceCaveat: 'The named products are examples, not ISO-endorsed tools.',
    contaminants: [],
  },
  'GEN-04': {
    primary: 'annexA',
    also: ['clause'],
    annexA: ['A.6.5', 'A.5.11', 'A.5.16'],
    clause: ['8.1'],
    basis: 'Supports A.6.5 (responsibilities after termination or change of employment), A.5.11 (return of assets) and A.5.16 (identity management). It supports the Clause 8.1 requirement to implement and control ISMS processes.',
    note: 'The standard requires the outcome — duties and responsibilities that remain valid, and controlled removal of access. It prescribes no ticketing tool or workflow.',
    practiceCaveat: 'Automation is recommended, not required.',
    contaminants: [],
  },
  'GEN-05': {
    primary: 'practice',
    also: ['annexA'],
    annexA: ['A.5.18', 'A.5.36', 'A.5.35'],
    clause: [],
    basis: 'Touches A.5.18 (access rights) and A.5.36 (compliance with policies), but a REVIEW CADENCE IS NOT SPECIFIED BY ISO/IEC 27001:2022.',
    note: '"Quarterly" is an organisation-defined interval. The SoA should state the interval chosen and the reason. Replacing it with a different cadence changes nothing about conformity.',
    practiceCaveat: 'The quarterly interval and the named products are examples. ISO prescribes no frequency.',
    contaminants: [],
    removeFromTitle: 'Quarterly access reviews documented',
    replaceTitle: 'Access reviews performed at an organisation-defined interval',
  },
  'GEN-06': {
    primary: 'annexA',
    also: ['clause'],
    annexA: ['A.8.31', 'A.8.22'],
    clause: ['8.1'],
    basis: 'Supports A.8.31 (separation of development, test and production environments) and A.8.22 (segregation of networks), implementing Clause 8.1 operational planning and control.',
    note: 'Environmental separation is a reference control. Account-per-environment is one way to satisfy it, not the only way.',
    practiceCaveat: 'The named cloud products are examples.',
    contaminants: [],
  },
  'GEN-07': {
    primary: 'annexA',
    also: ['clause'],
    annexA: ['A.8.32', 'A.8.4'],
    clause: ['8.1'],
    basis: 'Supports A.8.32 (change management) and A.8.4 (access to source code).',
    note: 'The standard requires changes to be planned, assessed, authorised, tested, implemented and recorded. It does not require a particular CI tool or a mandatory approval count.',
    practiceCaveat: 'Branch protection is a common control. Two-person approval is a typical organisation-defined choice.',
    contaminants: [],
  },
  'GEN-08': {
    primary: 'clause',
    also: ['annexA'],
    annexA: ['A.5.37', 'A.5.1'],
    clause: ['7.5.2', '8.1'],
    basis: 'Documented operating procedures are required: A.5.37 and the Clause 7.5.2 requirement to create and update documented information, plus Clause 8.1 for operational control.',
    note: 'This one genuinely IS an ISO requirement — the obligation to have documented procedures. The page count and formality are organisation-defined.',
    practiceCaveat: 'A "one-page" policy is an implementation choice, not an ISO constraint.',
    contaminants: [],
  },
  'GEN-09': {
    primary: 'annexA',
    also: ['clause'],
    annexA: ['A.8.15', 'A.8.16'],
    clause: ['9.1'],
    basis: 'Supports A.8.15 (logging) and A.8.16 (monitoring activities), and provides the data for the Clause 9.1 requirement to monitor, measure, analyse and evaluate.',
    note: 'Logging is a reference control. A specific SIEM product, log retention period, and "log everything" instruction are all organisation-defined.',
    practiceCaveat: 'Retention periods and the named products are examples, not ISO requirements.',
    contaminants: [],
  },
  'GEN-10': {
    primary: 'annexA',
    also: ['practice'],
    annexA: ['A.8.8', 'A.8.29'],
    clause: [],
    basis: 'Supports A.8.8 (management of technical vulnerabilities) and A.8.29 (security testing in development and acceptance).',
    note: 'The standard requires information about technical vulnerabilities to be obtained and exposure to be addressed. It does NOT prescribe a scan cadence, scan types, or remediation SLAs.',
    practiceCaveat: '"Quarterly ASV-equivalent" conflates ISO with PCI DSS. ASV scanning is a PCI DSS concept, not an ISO requirement, and no quarterly interval is required by ISO.',
    contaminants: ['quarterly ASV scan cadence (PCI DSS concept)'],
  },
  'GEN-11': {
    primary: 'annexA',
    also: ['practice'],
    annexA: ['A.8.24', 'A.5.14', 'A.7.10'],
    clause: [],
    basis: 'Supports A.8.24 (use of cryptography), A.5.14 (information transfer) and A.7.10 (storage media).',
    note: 'A.8.24 requires that rules for the effective use of cryptography, including key management, be defined and implemented. It does NOT mandate AES-256, TLS 1.2, or any specific algorithm or version.',
    practiceCaveat: 'Algorithm choice and protocol versions are organisation-defined decisions informed by risk and current practice.',
    contaminants: [],
  },
  'GEN-12': {
    primary: 'annexA',
    also: ['clause'],
    annexA: ['A.8.13', 'A.5.30', 'A.7.11'],
    clause: ['8.1'],
    basis: 'Supports A.8.13 (information backup) and A.5.30 (ICT readiness for business continuity). A.8.13 requires backups to be tested at planned intervals.',
    note: 'A TEST INTERVAL IS REQUIRED TO BE DEFINED, but ISO does not state a frequency. "Quarterly" and "one failover test per year" are organisation-defined.',
    practiceCaveat: 'RPO/RTO values and the test cadence are organisation-defined. The named products are examples.',
    contaminants: [],
  },
  'GEN-13': {
    primary: 'annexA',
    also: ['clause'],
    annexA: ['A.5.9'],
    clause: ['4.3', '6.1.2'],
    basis: 'A.5.9 requires an inventory of information and associated assets. It underpins Clause 4.3 scope and Clause 6.1.2 risk assessment, both of which need to know what exists.',
    note: 'The standard requires the inventory to exist, be maintained and identify owners. It does not require a specific CMDB tool.',
    practiceCaveat: 'The named tools are examples.',
    contaminants: [],
  },
  'GEN-14': {
    primary: 'annexA',
    also: ['otherFramework'],
    annexA: ['A.5.19', 'A.5.20', 'A.5.22', 'A.5.21'],
    clause: [],
    basis: 'A vendor/supplier risk register supports A.5.19 (information security in supplier relationships), A.5.20 (addressing information security within supplier agreements), A.5.21 (ICT supply chain) and A.5.22 (monitoring and review of supplier services).',
    note: 'This is a genuine ISO reference-control area. The register is a recommended practice; the security requirements in supplier agreements are what the standard actually requires.',
    practiceCaveat: 'The named tools (Whistic, Vanta) are examples.',
    contaminants: [
      'BAA / HIPAA business associate agreement tracking — HIPAA, not ISO',
      'DPA — GDPR/UK GDPR and similar, not ISO',
    ],
  },
  'GEN-15': {
    primary: 'annexA',
    also: ['clause'],
    annexA: ['A.8.25', 'A.8.26', 'A.8.27', 'A.8.28', 'A.8.29'],
    clause: ['8.1'],
    basis: 'A substantial ISO reference-control cluster: A.8.25 secure development life cycle, A.8.26 application security requirements, A.8.27 secure architecture principles, A.8.28 secure coding, A.8.29 security testing in development and acceptance.',
    note: 'A.8.28 notes that a suitable level of automated tooling and manual review supports secure coding — so tooling is expected, but no specific SAST product or threshold is required.',
    practiceCaveat: 'The named tools (CodeQL, SonarQube, gitleaks, OWASP Threat Dragon) are examples, not ISO-endorsed.',
    contaminants: [],
  },
  'GEN-16': {
    primary: 'annexA',
    also: ['otherFramework'],
    annexA: ['A.5.9', 'A.5.12', 'A.5.34'],
    clause: [],
    basis: 'Supports A.5.9 (inventory), A.5.12 (classification) and A.5.34 (privacy and protection of PII).',
    note: 'A.5.34 is a real reference control and does require meeting requirements concerning protection of PII — but the applicable requirements come from the relevant legislation and interested parties, not from ISO.',
    practiceCaveat: '',
    contaminants: [
      'HIPAA PHI handling and de-identification — HIPAA, not ISO',
      'PCI cardholder data scope — PCI DSS, not ISO',
    ],
  },
  'GEN-17': {
    primary: 'annexA',
    also: ['clause'],
    annexA: ['A.8.10', 'A.5.33', 'A.7.10'],
    clause: ['7.5.3'],
    basis: 'A.8.10 requires information to be deleted when no longer required, and A.5.33 requires records protection including retention and disposition. Clause 7.5.3 requires documented information to be retained and disposed of appropriately.',
    note: 'The obligation to delete and to define retention is a real reference-control expectation. The specific schedule, the deletion method and any legal-hold interaction are organisation-defined.',
    practiceCaveat: 'The named cloud lifecycle features are examples.',
    contaminants: ['GDPR erasure / right-to-be-forgotten framing — GDPR, not ISO'],
  },
  'GEN-18': {
    primary: 'otherFramework',
    also: ['annexA'],
    annexA: ['A.5.34', 'A.5.31'],
    clause: [],
    basis: 'Only the privacy-obligations aspect is adjacent to ISO, via A.5.34 (privacy and protection of PII) and A.5.31 (legal, statutory, regulatory and contractual requirements).',
    note: 'As written, this item is a GDPR/CCPA compliance workflow, NOT an ISO control. ISO requires you to identify applicable legal requirements (A.5.31) and meet privacy requirements for PII (A.5.34) — it does not require a consent banner, a cookie tool or a DSAR inbox.',
    practiceCaveat: '',
    contaminants: [
      'Privacy policy publication and consent — GDPR/UK GDPR/ePrivacy, not ISO',
      'Cookie/consent management platform (Cookiebot) — ePrivacy/GDPR, not ISO',
      'Data-subject access/erasure request workflow (DSAR) — GDPR/CCPA, not ISO',
    ],
  },
  'GEN-19': {
    primary: 'annexA',
    also: ['practice'],
    annexA: ['A.8.16', 'A.5.24', 'A.5.25'],
    clause: ['9.1'],
    basis: 'Supports A.8.16 (monitoring activities) and the incident management references A.5.24 (planning and preparation) and A.5.25 (assessment and decision on events).',
    note: 'On-call paging and detection tooling are organisation-defined. ISO requires that anomalies be monitored and that potential incidents be evaluated — it does not require a paging service.',
    practiceCaveat: 'The named paging/monitoring products are examples.',
    contaminants: [],
  },
  'GEN-20': {
    primary: 'annexA',
    also: ['otherFramework'],
    annexA: ['A.5.24', 'A.5.25', 'A.5.26', 'A.5.28', 'A.5.5'],
    clause: ['10.2'],
    basis: 'Incident response runbooks and evidence preservation support A.5.24 to A.5.26, A.5.28 (collection of evidence) and A.5.5 (contact with authorities).',
    note: 'The runbook structure is a genuine reference-control area. The NOTIFICATION DEADLINES ARE NOT ISO REQUIREMENTS — ISO requires that you identify which authorities to contact and when, based on your own legal obligations.',
    practiceCaveat: '',
    contaminants: [
      '72-hour GDPR breach notification — GDPR Art. 33, not ISO',
      '6-hour CERT-In reporting — Indian CERT-In directions, not ISO',
    ],
  },
  'GEN-21': {
    primary: 'annexA',
    also: ['clause'],
    annexA: ['A.5.29', 'A.5.30', 'A.8.13', 'A.8.14'],
    clause: ['8.1'],
    basis: 'A.5.29 (information security during disruption), A.5.30 (ICT readiness for business continuity), A.8.13 (backup) and A.8.14 (redundancy) all support continuity of the ISMS.',
    note: 'A BCP/DR plan and testing of that plan are genuine reference-control expectations. RTO/RPO values and the test cadence are organisation-defined — ISO states no interval.',
    practiceCaveat: '"One failover test per year" is an example cadence, not an ISO requirement.',
    contaminants: [],
  },
  'GEN-22': {
    primary: 'clause',
    also: ['annexA'],
    annexA: ['A.6.3', 'A.7.9', 'A.6.8'],
    clause: ['7.3'],
    basis: 'Unlike most of this list, part of GEN-22 IS a genuine requirement. Clause 7.3 obliges the organisation to make personnel aware of the information security policy, their contribution to ISMS objectives, the consequences of deviating from it, and how to report security events. A.6.3 adds awareness, education and training relevant to the job function, with effectiveness evaluated periodically.',
    note: 'The AWARENESS OBLIGATION is a requirement. The training PLATFORM and the CADENCE are not. "Annual (or quarterly)", KnowBe4, Hoxhunt and usecure are organisation-defined choices, and the title was corrected to stop the cadence reading as a mandate.',
    practiceCaveat: 'The named platforms and the annual/quarterly cadence are examples, not ISO requirements.',
    contaminants: [],
    replaceTitle: 'Security awareness training delivered at an organisation-defined cadence',
  },
};

export const GEN_CLASSIFIABLE_IDS = Object.keys(GEN_ISO_CLASSIFICATION);

/** Every item carrying non-ISO material, so the UI can quarantine it. */
export const GEN_CROSS_FRAMEWORK_IDS = Object.keys(GEN_ISO_CLASSIFICATION)
  .filter(id => (GEN_ISO_CLASSIFICATION[id].contaminants || []).length > 0);

export function getGenClassification(id) {
  return GEN_ISO_CLASSIFICATION[id] || null;
}

/**
 * True when the item is entirely or primarily not-ISO and must be visually
 * separated so it can never be read as an ISO requirement.
 */
export function isCrossFrameworkItem(id) {
  // Defensive: Array#filter hands the element, not the key, so a bare object
  // must not silently resolve to "not cross-framework".
  if (typeof id !== 'string') return false;
  const c = GEN_ISO_CLASSIFICATION[id];
  if (!c) return false;
  return c.primary === 'otherFramework' || (c.contaminants || []).length > 0;
}
