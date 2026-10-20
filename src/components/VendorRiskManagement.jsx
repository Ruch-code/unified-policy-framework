import React, { useState, Suspense, lazy, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

// Loaded on demand. The incident corpus is editorial copy that is meant to stay
// behind sign in, and a static import would fold all of it into the bundle that
// every anonymous visitor downloads. Lazy keeps it in its own chunk that is only
// ever requested once an authenticated user opens the tab.
const VendorIncidentBrief = lazy(() => import('./VendorIncidentBrief.jsx'));

import { 
  Building, Shield, Globe, AlertTriangle, 
  Users, Network, Scale, FileText, 
  RefreshCw, Clock, Search, Link2,
  ShieldCheck, AlertCircle, ChevronDown, ChevronUp,
  MapPin, Briefcase, BarChart2, Layers
} from 'lucide-react';

const VENDOR_RISK_SECTORS = {
  'Financial Services': {
    icon: Building,
    color: '#4f46e5',
    description: 'Banks, fintechs, payment processors, and insurers — strict regulatory oversight (Basel III, Dodd-Frank, SOX) demands vendor classification, continuous monitoring, and contractual flow-down of security obligations.',
    risks: ['Data breaches', 'Regulatory fines', 'Operational resilience', 'Concentration risk'],
    controls: ['Vendor tiering', 'SOC 2 Type II req', 'Right to audit', 'BCP testing', '4th party mapping'],
    regions: ['Global', 'Americas', 'EMEA', 'APAC'],
    regulations: ['Basel III', 'SOX', 'GLBA', 'FFIEC', 'PSD2', 'DORA'],
  },
  Healthcare: {
    icon: Shield,
    color: '#059669',
    description: 'Hospitals, health tech, pharma, and payers — HIPAA, HITECH, and 21st Century Cures Act require BAA enforcement, minimum necessary access, and breach notification within 60 days.',
    risks: ['PHI exposure', 'Ransomware', 'Regulatory penalties', 'Patient safety'],
    controls: ['BAA mandatory', 'Minimum necessary', 'Breach notification 60d', 'Subcontractor flow-down'],
    subProcessorReq: ['BAA flow-down required', 'Subcontractor approval', 'Audit rights extend'],
    regions: ['Americas', 'EMEA'],
    regulations: ['HIPAA', 'HITECH', '21st Century Cures Act', 'GDPR Art. 28'],
  },
  'Technology & SaaS': {
    icon: Globe,
    color: '#7c3aed',
    description: 'Cloud providers, SaaS platforms, AI/ML services, and dev tools — GDPR Art. 28, CCPA, and modern DPAs require DPA/SCC, sub-processor registries, and AI data usage restrictions.',
    risks: ['Data residency', 'AI training on customer data', 'Sub-processor sprawl', 'Encryption gaps'],
    controls: ['DPA/SCC mandatory', 'Subprocessor registry', 'AI data usage restrictions', 'Continuous monitoring'],
    subProcessorReq: ['Public subprocessor list', 'Objection rights', 'Equivalent protections', 'Annual disclosure'],
    regions: ['Global', 'EMEA', 'APAC'],
    regulations: ['GDPR Art. 28', 'CCPA', 'AI Act', 'Schrems II'],
  },
  'Critical Infrastructure': {
    icon: AlertTriangle,
    color: '#dc2626',
    description: 'Energy, transport, water, telecom — NERC CIP, TSA Pipeline, and IEC 62443 mandate vendor cyber hygiene, supply chain visibility, and incident reporting SLAs.',
    risks: ['OT/IT convergence', 'Nation-state threats', 'Supply chain disruption', 'Legacy systems'],
    controls: ['Vendor cyber hygiene standards', 'Supply chain visibility', 'Incident reporting SLAs', 'Patch management'],
    regions: ['Americas', 'EMEA', 'APAC'],
    regulations: ['NERC CIP', 'TSA Pipeline', 'IEC 62443', 'CISA Directives'],
  },
  'Retail & E-Commerce': {
    icon: Briefcase,
    color: '#f59e0b',
    description: 'Retailers, marketplaces, payment gateways — PCI DSS v4.0, PCI MPE, and tokenization requirements drive vendor validation for cardholder data environments.',
    risks: ['Card data theft', 'Magecart attacks', 'PCI non-compliance', 'Tokenization gaps'],
    controls: ['PCI DSS validation', 'Tokenization', 'Consent management', 'Data retention policies'],
    regions: ['Global'],
    regulations: ['PCI DSS v4.0', 'PCI MPE', 'PA-DSS'],
  },
  Manufacturing: {
    icon: Layers,
    color: '#8b5cf6',
    description: 'Industrial, automotive, aerospace, defense — NIST 800-171, CMMC, and ITAR require supply chain risk management, counterfeit detection, and export-controlled data protection.',
    risks: ['IP theft', 'Supply chain disruption', 'Counterfeit parts', 'Nth-tier visibility'],
    controls: ['CMMC assessment', 'ITAR compliance', 'Nth-tier mapping', 'Counterfeit detection'],
    regions: ['Americas', 'EMEA', 'APAC'],
    regulations: ['NIST 800-171', 'CMMC 2.0', 'ITAR', 'EAR', 'DFARS'],
  },
  Government: {
    icon: ShieldCheck,
    color: '#1d4ed8',
    description: 'Federal, state, local agencies and contractors — FedRAMP, FISMA, NIST 800-53, and CJIS require continuous monitoring, continuous authorization, and supply chain risk management (SCRM).',
    risks: ['FedRAMP non-compliance', 'Supply chain attacks', 'Data sovereignty', 'Personnel vetting'],
    controls: ['FedRAMP authorization', 'Continuous monitoring', 'SCRM program', 'CJIS compliance'],
    regions: ['Americas'],
    regulations: ['FedRAMP', 'FISMA', 'NIST 800-53', 'CJIS', 'CISA Directives'],
  },
};

const REGIONAL_LAWS = {
  'United States': {
    federal: ['SOX', 'GLBA', 'HIPAA', 'FERPA', 'FISMA', 'FedRAMP', 'PCI DSS', 'CISA'],
    states: [
      { name: 'California', laws: ['CCPA/CPRA', 'CalOPPA', 'CCPA Regulations', 'CPPA Enforcement'] },
      { name: 'New York', laws: ['SHIELD Act', 'DFS 500', 'NYPA'] },
      { name: 'Texas', laws: ['Texas Privacy Protection Act', 'Identity Theft Enforcement'] },
      { name: 'Virginia', laws: ['VCDPA', 'Consumer Data Protection Act'] },
      { name: 'Colorado', laws: ['CPA', 'Colorado Privacy Act'] },
      { name: 'Connecticut', laws: ['CTDPA'] },
      { name: 'Utah', laws: ['UCPA'] },
    ],
  },
  'European Union': {
    gdpr: 'GDPR (2016/679)',
    laws: ['ePrivacy Directive', 'NIS2', 'DORA', 'AI Act', 'Data Act', 'DSA/DMA'],
    countries: [
      { name: 'Germany', laws: ['BDSG', 'TTDSG'] },
      { name: 'France', laws: ['CNIL Guidelines', 'Loi Informatique et Libertés'] },
      { name: 'Netherlands', laws: ['UAVG', 'GDPR Implementation Act'] },
    ],
  },
  'United Kingdom': {
    laws: ['UK GDPR', 'Data Protection Act 2018', 'PECR', 'NIS Regulations'],
  },
  'Canada': {
    laws: ['PIPEDA', 'CPPA (Bill C-27)', 'Quebec Law 25', 'Alberta PIPA'],
  },
  'Australia': {
    laws: ['Privacy Act 1988', 'Notifiable Data Breaches Scheme', 'APRA CPS 234'],
  },
  'Singapore': {
    laws: ['PDPA', 'Cybersecurity Act', 'MAS TRM Guidelines'],
  },
  'Japan': {
    laws: ['APPI', 'CSL', 'FIEA'],
  },
  'Brazil': {
    laws: ['LGPD', 'BCB Resolutions'],
  },
};

const SUB_PROCESSOR_RISKS = {
  '4th/5th Party Blindness': {
    description: '60% of breaches originate from sub-processors you don\'t track — no visibility = no liability protection.',
    impact: 'Critical',
    controls: ['Tier 1 vendor sub-processor registry', 'Automated discovery', 'Contractual flow-down'],
  },
  'Contractual Gaps': {
    description: 'Missing flow-down clauses = no audit rights, no liability flow-down, no breach notification SLAs.',
    impact: 'High',
    controls: ['Standardized flow-down clauses', 'Audit rights', 'Liability allocation'],
  },
  'Concentration Risk': {
    description: 'Single cloud provider for critical services = single point of failure (SolarWinds, Kaseya).',
    impact: 'Critical',
    controls: ['Multi-cloud strategy', 'Exit planning', 'Portability testing'],
  },
  'Regulatory Non-Compliance': {
    description: 'DORA Art. 28, NIS2 Art. 21, GDPR Art. 28 require sub-processor governance — fines up to 2% revenue.',
    impact: 'High',
    controls: ['Regulatory mapping', 'Sub-processor compliance tracking', 'Automated alerts'],
  },
  'Incident Cascade': {
    description: 'Vendor breach without notification SLA = 72-hour GDPR window missed, mandatory notification fails.',
    impact: 'Critical',
    controls: ['Notification SLAs (4-24h)', 'Joint liability clauses', 'Insurance requirements'],
  },
};

// ========== NEW DATA STRUCTURES FOR PHASE 6 TABS ==========

// Lifecycle: 8-stage stepper
const LIFECYCLE_STAGES = [
  { 
    id: 1, 
    name: 'Intake', 
    icon: Building,
    purpose: 'Capture vendor request, categorize spend, identify data types, assign owner',
    owner: 'Procurement / Vendor Manager',
    inputs: ['Vendor request form', 'Spend estimate', 'Data types questionnaire'],
    outputs: ['Vendor record created', 'Inherent risk score assigned', 'Intake approval'],
    evidence: ['Intake form', 'Risk score worksheet', 'Approval email'],
    regulations: ['GDPR Art. 28', 'NIS2 Art. 28', 'DORA Art. 28'],
  },
  { 
    id: 2, 
    name: 'Inherent Risk Scoring', 
    icon: BarChart2,
    purpose: 'Assess vendor risk before contract using data sensitivity, system access, criticality',
    owner: 'Security / Risk Team',
    inputs: ['Vendor questionnaire', 'Data types', 'System access', 'Spend', 'Criticality'],
    outputs: ['Inherent risk tier (1-4)', 'Due diligence scope', 'Contract tier'],
    evidence: ['Risk scoring worksheet', 'Tier assignment', 'Scope memo'],
    regulations: ['GDPR Art. 28', 'NIS2 Art. 21', 'DORA Art. 28', 'PCI DSS 12.8'],
  },
  { 
    id: 3, 
    name: 'Due Diligence', 
    icon: Search,
    purpose: 'Collect evidence, assess controls, validate vendor security posture',
    owner: 'Security / Risk Team',
    inputs: ['SOC 2 Type II', 'ISO 27001', 'Pen test', 'SIG Lite', 'DPA', 'Insurance'],
    outputs: ['Due diligence report', 'Control gaps identified', 'Remediation plan'],
    evidence: ['SOC 2 report', 'Pen test summary', 'SIG Lite', 'DPA executed'],
    regulations: ['GDPR Art. 28', 'NIS2 Art. 28', 'DORA Art. 28', 'PCI DSS 12.10'],
  },
  { 
    id: 4, 
    name: 'Contracting', 
    icon: FileText,
    purpose: 'Execute contract with DPA/BAA, security addendum, breach SLAs, right to audit',
    owner: 'Legal / Procurement',
    inputs: ['Master Services Agreement', 'DPA/BAA', 'Security addendum', 'Right to audit clause'],
    outputs: ['Executed contract', 'DPA/BAA executed', 'Security addendum attached'],
    evidence: ['Executed MSA', 'DPA/BAA', 'Security addendum', 'Right to audit clause'],
    regulations: ['GDPR Art. 28', 'HIPAA BAA', 'PCI DSS 12.8', 'NIS2 Art. 28'],
  },
  { 
    id: 5, 
    name: 'Onboarding', 
    icon: Users,
    purpose: 'Provision access, configure monitoring, register sub-processors, train vendor',
    owner: 'IT / Security / Vendor Manager',
    inputs: ['Access request', 'Monitoring config', 'Sub-processor list', 'Training materials'],
    outputs: ['Access provisioned', 'Monitoring active', 'Sub-processors registered', 'Training completed'],
    evidence: ['Access logs', 'Monitoring dashboard', 'Sub-processor register', 'Training records'],
    regulations: ['GDPR Art. 28', 'NIS2 Art. 28', 'HIPAA BAA'],
  },
  { 
    id: 6, 
    name: 'Ongoing Monitoring', 
    icon: Shield,
    purpose: 'Continuous control monitoring, security ratings, breach alerts, performance tracking',
    owner: 'Security / Vendor Manager',
    inputs: ['Security ratings (SecurityScorecard/BitSight)', 'SIEM alerts', 'Vendor self-assessment', 'Sub-processor updates'],
    outputs: ['Monitoring dashboard', 'Risk score updates', 'Alerts generated', 'Sub-processor updates'],
    evidence: ['SecurityScorecard/BitSight reports', 'SIEM alerts', 'Self-assessment results'],
    regulations: ['GDPR Art. 28', 'NIS2 Art. 23', 'DORA Art. 11', 'PCI DSS 12.10'],
  },
  { 
    id: 7, 
    name: 'Issue Management', 
    icon: AlertTriangle,
    purpose: 'Track findings, remediation, risk acceptance, escalation, compensating controls',
    owner: 'Risk / Security / Vendor Manager',
    inputs: ['Findings from monitoring', 'Audit findings', 'Incidents', 'Vendor self-disclosure'],
    outputs: ['Issue register', 'Remediation plans', 'Risk acceptances', 'Compensating controls', 'Escalations'],
    evidence: ['Issue register', 'Remediation plans with owners/dates', 'Risk acceptance forms', 'Escalation logs'],
    regulations: ['GDPR Art. 28', 'NIS2 Art. 23', 'PCI DSS 12.10', 'DORA Art. 11'],
  },
  { 
    id: 8, 
    name: 'Offboarding', 
    icon: RefreshCw,
    purpose: 'Revoke access, return/destroy data, certify destruction, update records',
    owner: 'IT / Legal / Procurement',
    inputs: ['Termination notice', 'Data return/destruction request', 'Access revocation list'],
    outputs: ['Access revoked', 'Data returned/destroyed', 'Destruction certificate', 'Records updated'],
    evidence: ['Termination notice', 'Destruction certificate', 'Access revocation logs', 'Updated vendor register'],
    regulations: ['GDPR Art. 28', 'HIPAA BAA', 'PCI DSS 12.8', 'DORA Art. 28'],
  },
];

// Tiering Calculator: 6 questions
const TIERING_QUESTIONS = [
  { id: 1, text: 'What types of data does the vendor handle?', weight: 25, options: [
    { value: 1, label: 'No sensitive data', score: 1 },
    { value: 2, label: 'Internal/PII only', score: 2 },
    { value: 3, label: 'SPI/PHI/Financial/CJI', score: 4 },
    { value: 4, label: 'Critical infrastructure/OT', score: 5 },
  ]},
  { id: 2, text: 'What level of system access does the vendor have?', weight: 20, options: [
    { value: 1, label: 'No system access', score: 1 },
    { value: 2, label: 'Limited SaaS access', score: 2 },
    { value: 3, label: 'Admin/privileged access', score: 4 },
    { value: 4, label: 'Critical infrastructure/OT access', score: 5 },
  ]},
  { id: 3, text: 'How critical is the vendor to your operations?', weight: 20, options: [
    { value: 1, label: 'Easily replaceable', score: 1 },
    { value: 2, label: 'Replaceable with effort', score: 2 },
    { value: 3, label: 'Difficult to replace', score: 4 },
    { value: 4, label: 'Single source / irreplaceable', score: 5 },
  ]},
  { id: 4, text: 'Does a viable substitute exist?', weight: 15, options: [
    { value: 1, label: 'Multiple alternatives', score: 1 },
    { value: 2, label: 'Alternative with effort', score: 2 },
    { value: 3, label: 'No viable substitute', score: 4 },
    { value: 4, label: 'Single source monopoly', score: 5 },
  ]},
  { id: 5, text: 'Annual spend with vendor?', weight: 10, options: [
    { value: 1, label: 'Under $10K', score: 1 },
    { value: 2, label: '$10K - $100K', score: 2 },
    { value: 3, label: '$100K - $1M', score: 3 },
    { value: 4, label: '$1M+', score: 5 },
  ]},
  { id: 6, text: 'Does the vendor use AI on your data?', weight: 10, options: [
    { value: 1, label: 'No AI', score: 1 },
    { value: 2, label: 'AI for internal ops only', score: 2 },
    { value: 3, label: 'AI trained on your data', score: 4 },
    { value: 4, label: 'Vendor trains models on your data', score: 5 },
  ]},
];

// Tiering results
const TIERING_RESULTS = [
  { min: 6, max: 12, tier: 4, label: 'Tier 4: Commodity/Non-critical', frequency: 'Biennial or Contract-driven', evidence: ['Contract terms', 'Spend records'], cadence: 'Biennial', clauses: ['Standard terms', 'Data protection'] },
  { min: 13, max: 20, tier: 3, label: 'Tier 3: Low Risk', frequency: 'Annual Self-assessment', evidence: ['Self-assessment questionnaire', 'Contract review'], cadence: 'Annual', clauses: ['Standard DPA', 'Right to audit'] },
  { min: 21, max: 30, tier: 2, label: 'Tier 2: Medium Risk', frequency: 'Semi-annual + Annual Onsite', evidence: ['SOC 2 Type II', 'Annual self-assessment', 'Onsite visit report'], cadence: 'Semi-annual', clauses: ['DPA/BAA', 'Right to audit', 'Breach SLA 24h', 'Sub-processor approval'] },
  { min: 31, max: 36, tier: 1, label: 'Tier 1: Critical/High Risk', frequency: 'Continuous + Quarterly Deep Dive', evidence: ['SOC 2 Type II', 'ISO 27001 + SoA', 'Pen test', 'Continuous monitoring', 'Quarterly review'], cadence: 'Quarterly', clauses: ['DPA/BAA', 'Right to audit', 'Breach SLA 4-24h', 'Sub-processor approval', 'Right to audit onsite', 'Cyber insurance', 'Exit assistance'] },
];

// Due Diligence Evidence Matrix by Tier
const EVIDENCE_MATRIX = {
  1: { // Tier 1
    required: ['SOC 2 Type II', 'ISO 27001 + SoA', 'Pen test summary (last 12mo)', 'SIG Lite/CAIQ', 'BCP/DR test results', 'Cyber insurance cert', 'DPA/BAA executed', 'AI questionnaire (if applicable)'],
    recommended: ['ISO 22301', 'Pen test (last 6mo)', 'Continuous monitoring access', 'Sub-processor registry'],
  },
  2: { // Tier 2
    required: ['SOC 2 Type II', 'Pen test summary (last 12mo)', 'SIG Lite/CAIQ', 'BCP/DR summary', 'Cyber insurance cert', 'DPA/BAA executed', 'AI questionnaire (if applicable)'],
    recommended: ['ISO 27001', 'Pen test (last 6mo)', 'Sub-processor registry'],
  },
  3: { // Tier 3
    required: ['SOC 2 Type II or self-assessment', 'Pen test summary (last 12mo)', 'SIG Lite', 'DPA/BAA executed'],
    recommended: ['Cyber insurance', 'BCP/DR summary'],
  },
  4: { // Tier 4
    required: ['Contract review', 'Data processing terms'],
    recommended: ['Security questionnaire'],
  },
};

// SOC 2 Report Review Checklist
const SOC2_REVIEW_CHECKLIST = [
  { section: 'Scope & Period', items: ['System description accuracy', 'Period covered (Type I vs Type II)', 'Subservice orgs: carve-out vs inclusive', 'CSOCs included'] },
  { section: 'Opinion Type', items: ['Unqualified (clean)', 'Qualified (exceptions noted)', 'Adverse', 'Disclaimer'] },
  { section: 'Exceptions (if any)', items: ['Control deficiency description', 'Severity (design vs operating)', 'Compensating controls', 'Remediation status'] },
  { section: 'CUECs (Complementary User Entity Controls)', items: ['All CUECs identified', 'Your org\'s implementation status', 'Gaps documented', 'Remediation plan'] },
  { section: 'Subservice Organizations', items: ['Carve-out vs inclusive method', 'Subservice controls covered', 'Your monitoring of subservice orgs'] },
  { section: 'CSOCs (Complementary Subservice Org Controls)', items: ['Identified', 'Monitored', 'Gaps tracked'] },
  { section: 'Bridge Letter', items: ['Required if report > 12 months old', 'Period covered', 'No material changes attested'] },
];

// Contract Clause Library
const CLAUSE_LIBRARY = [
  { title: 'DPA (GDPR Art. 28)', category: 'Data Protection', source: 'https://eur-lex.europa.eu/eli/reg/2016/679/oj', clauses: [
    { name: 'Processing scope & purpose', text: 'Processor shall only process personal data on documented instructions from the controller...' },
    { name: 'Confidentiality', text: 'Processor shall ensure that persons authorised to process personal data have committed themselves to confidentiality...' },
    { name: 'Security measures', text: 'Taking into account the state of the art, the processor shall implement appropriate technical and organisational measures...' },
    { name: 'Sub-processor flow-down', text: 'The processor shall not engage another processor without prior written authorisation...' },
    { name: 'Data subject rights assistance', text: 'The processor shall assist the controller in fulfilling its obligations to respond to data subject requests...' },
    { name: 'Breach notification', text: 'The processor shall notify the controller without undue delay after becoming aware of a personal data breach...' },
    { name: 'Data return/destruction', text: 'After the end of the provision of processing services, the processor shall delete or return all personal data...' },
  ]},
  { title: 'BAA (HIPAA)', category: 'Healthcare', source: 'https://www.hhs.gov/hipaa/', clauses: [
    { name: 'Permitted uses/disclosures', text: 'Business Associate shall not use or disclose PHI other than as permitted or required by the Agreement or as Required by Law...' },
    { name: 'Safeguards', text: 'Business Associate shall implement administrative, physical, and technical safeguards that reasonably and appropriately protect the confidentiality, integrity, and availability of ePHI...' },
    { name: 'Breach notification', text: 'Business Associate shall notify Covered Entity of any breach of unsecured PHI without unreasonable delay...' },
    { name: 'Subcontractor flow-down', text: 'Business Associate shall ensure that any subcontractor agrees to the same restrictions and conditions...' },
    { name: 'Termination & return/destruction', text: 'Upon termination, Business Associate shall return or destroy all PHI received from Covered Entity...' },
  ]},
  { title: 'Right to Audit', category: 'Governance', clauses: [
    { name: 'On-site audit right', text: 'Controller/Customer shall have the right to audit Processor/Vendor\'s compliance with this Agreement...' },
    { name: 'Audit frequency & notice', text: 'Audits may be conducted annually upon 30 days written notice, or upon reasonable belief of material non-compliance...' },
    { name: 'Third-party auditor', text: 'Customer may engage a qualified third-party auditor at Customer\'s expense...' },
    { name: 'Audit scope', text: 'Audit may cover facilities, systems, processes, personnel, and documentation relevant to the services...' },
  ]},
  { title: 'Breach Notification SLA', category: 'Incident Response', clauses: [
    { name: 'Notification timeline', text: 'Vendor shall notify Customer of any security incident within 4 hours (critical) / 24 hours (high) / 72 hours (GDPR notifiable)...' },
    { name: 'Incident details', text: 'Notification shall include: nature of incident, categories of data affected, number of data subjects, likely consequences, measures taken...' },
    { name: 'Cooperation', text: 'Vendor shall cooperate with Customer in investigating, mitigating, and remediating the incident...' },
  ]},
  { title: 'Security Addendum', category: 'Security', clauses: [
    { name: 'Encryption standards', text: 'Vendor shall encrypt all Customer Data at rest using AES-256 or equivalent, and in transit using TLS 1.2+...' },
    { name: 'Access control', text: 'Vendor shall implement MFA for all access to Customer Data, least privilege, and quarterly access reviews...' },
    { name: 'Vulnerability management', text: 'Vendor shall patch critical vulnerabilities within 24 hours, high within 7 days, and maintain a vulnerability management program...' },
    { name: 'Logging & monitoring', text: 'Vendor shall maintain audit logs for all access to Customer Data for a minimum of 1 year...' },
  ]},
  { title: 'Sub-Processor Approval', category: 'Governance', clauses: [
    { name: 'Prior written authorization', text: 'Vendor shall not engage any sub-processor without Customer\'s prior written authorization...' },
    { name: 'Sub-processor register', text: 'Vendor shall maintain an up-to-date register of all sub-processors...' },
    { name: 'Flow-down obligations', text: 'Vendor shall ensure sub-processors are bound by equivalent data protection obligations...' },
    { name: 'Objection right', text: 'Customer may object to new sub-processor within 30 days of notification...' },
  ]},
  { title: 'Data Location / Residency', category: 'Data Sovereignty', clauses: [
    { name: 'Data residency', text: 'Customer Data shall be stored and processed only in the following jurisdictions: [List approved jurisdictions]...' },
    { name: 'Data transfer restriction', text: 'Vendor shall not transfer Customer Data outside approved jurisdictions without prior written consent...' },
  ]},
  { title: 'Exit & Data Return/Deletion', category: 'Offboarding', clauses: [
    { name: 'Data return', text: 'Upon termination, Vendor shall return all Customer Data in a standard, machine-readable format within 30 days...' },
    { name: 'Data destruction', text: 'Vendor shall securely destroy all copies of Customer Data and certify destruction in writing...' },
    { name: 'Transition assistance', text: 'Vendor shall provide reasonable transition assistance for 90 days post-termination...' },
  ]},
  { title: 'AI Data Usage Restriction', category: 'AI Governance', clauses: [
    { name: 'Training prohibition', text: 'Vendor shall not use Customer Data to train, fine-tune, or improve any AI/ML models without explicit written consent...' },
    { name: 'Model isolation', text: 'Vendor shall ensure Customer Data is not used to benefit other customers through shared models...' },
    { name: 'Output ownership', text: 'All outputs generated from Customer Data using Vendor\'s AI shall remain Customer\'s property...' },
  ]},
];

// Issue Management
const ISSUE_MANAGEMENT_STAGES = [
  { name: 'Finding Identification', description: 'Issue discovered via monitoring, audit, self-disclosure, or incident', owner: 'Security / Vendor Manager', evidence: ['Finding report', 'Source (monitoring/audit/incident)'] },
  { name: 'Risk Assessment', description: 'Assess severity, likelihood, impact, and urgency', owner: 'Risk Team', evidence: ['Risk assessment worksheet', 'Severity rating (Critical/High/Medium/Low)'] },
  { name: 'Remediation Planning', description: 'Define remediation steps, owner, deadline, and compensating controls', owner: 'Vendor / Risk Team', evidence: ['Remediation plan', 'Owner assigned', 'Deadline', 'Compensating controls documented'] },
  { name: 'Remediation Execution', description: 'Implement remediation steps per plan', owner: 'Vendor', evidence: ['Progress updates', 'Evidence of completion'] },
  { name: 'Verification & Closure', description: 'Verify remediation effectiveness, close issue or escalate', owner: 'Risk / Security', evidence: ['Verification evidence', 'Closure approval', 'Lessons learned'] },
  { name: 'Risk Acceptance', description: 'Formal acceptance of residual risk with executive sign-off', owner: 'CISO / Executive', evidence: ['Risk acceptance form', 'Executive sign-off', 'Compensating controls', 'Review date'] },
];

// AI Vendor Due Diligence
const AI_VENDOR_CHECKLIST = [
  { category: 'Training on Customer Data', items: [
    'Prohibits training on customer data without explicit consent',
    'Documents if/how customer data is used for model improvement',
    'Provides opt-out for model training',
    'Documents data separation guarantees',
  ]},
  { category: 'Model Provenance', items: [
    'Documents model lineage (base model, fine-tuning data)',
    'Provides model cards / transparency reports',
    'Discloses known limitations and biases',
    'Documents supply chain (open-source components, third-party models)',
  ]},
  { category: 'ISO 42001 Certification', items: [
    'Vendor holds ISO 42001 certification or is pursuing',
    'Provides scope of certification',
    'Shares audit findings summary',
  ]},
  { category: 'EU AI Act Role', items: [
    'Identifies role: Provider vs Deployer',
    'Documents high-risk AI system classification (Annex III)',
    'Provides conformity assessment evidence (if high-risk)',
    'Documents post-market monitoring plan',
  ]},
  { category: 'Output Logging & Monitoring', items: [
    'Logs prompts, outputs, and tool calls with retention rules',
    'Implements abuse detection and alerting',
    'Supports DSAR for AI-generated outputs',
    'Implements output filtering for PII/secrets/unsafe content',
  ]},
  { category: 'Security & Privacy', items: [
    'Prompt injection defences (Prompt Shields, Guardrails)',
    'Output filtering for PII/secrets/unsafe content',
    'Red teaming performed (PyRIT, garak, promptfoo)',
    'Membership inference / inversion testing',
    'Data minimization in tool/function calls',
  ]},
];

// Regional Laws additions
const REGIONAL_LAWS_ADDITIONS = {
  'India': {
    name: 'India',
    laws: [
      'RBI Master Direction on Outsourcing of IT Services (April 2023, effective Oct 2023)',
      'RBI Master Direction on IT Governance, Risk, Controls (Nov 2023, effective 1 Apr 2024)',
      'SEBI CSCRF (20 Aug 2024)',
      'DPDP Act 2023 & Rules 2025 (phased)',
      'CERT-In Directions (28 Apr 2022): 6hr reporting, 180-day logs, NTP sync',
    ],
  },
  'UAE': {
    name: 'UAE',
    laws: ['PDPL (Federal Decree-Law 45/2021)', 'DIFC Data Protection Law 2020', 'ADGM Data Protection Regulations 2021'],
  },
  'Saudi Arabia': {
    name: 'Saudi Arabia',
    laws: ['PDPL (Royal Decree M/19, 2021, effective 2023)', 'NCA Essential Cybersecurity Controls'],
  },
  'South Africa': {
    name: 'South Africa',
    laws: ['POPIA (Protection of Personal Information Act, effective 2021)', 'Information Regulator guidelines'],
  },
  'South Korea': {
    name: 'South Korea',
    laws: ['PIPA (Personal Information Protection Act)', 'PIPL amendments 2023', 'PIPC enforcement'],
  },
};

// Update existing REGIONAL_LAWS with TDPSA rename and new countries
const UPDATED_REGIONAL_LAWS = {
  'United States': {
    federal: ['SOX', 'GLBA', 'HIPAA', 'FERPA', 'FISMA', 'FedRAMP', 'PCI DSS', 'CISA'],
    states: [
      { name: 'California', laws: ['CCPA/CPRA', 'CalOPPA', 'CCPA Regulations', 'CPPA Enforcement'] },
      { name: 'New York', laws: ['SHIELD Act', 'DFS 500', 'NYPA'] },
      { name: 'Texas', laws: ['Texas Data Privacy and Security Act (TDPSA), effective 1 July 2024', 'Identity Theft Enforcement'] },
      { name: 'Virginia', laws: ['VCDPA', 'Consumer Data Protection Act'] },
      { name: 'Colorado', laws: ['CPA', 'Colorado Privacy Act'] },
      { name: 'Connecticut', laws: ['CTDPA'] },
      { name: 'Utah', laws: ['UCPA'] },
    ],
  },
  'European Union': {
    gdpr: 'GDPR (2016/679)',
    laws: ['ePrivacy Directive', 'NIS2', 'DORA', 'AI Act', 'Data Act', 'DSA/DMA'],
    countries: [
      { name: 'Germany', laws: ['BDSG', 'TTDSG'] },
      { name: 'France', laws: ['CNIL Guidelines', 'Loi Informatique et Libertés'] },
      { name: 'Netherlands', laws: ['UAVG', 'GDPR Implementation Act'] },
    ],
  },
  'United Kingdom': {
    laws: ['UK GDPR', 'Data Protection Act 2018', 'PECR', 'NIS Regulations'],
  },
  'Canada': {
    laws: ['PIPEDA', 'CPPA (Bill C-27)', 'Quebec Law 25', 'Alberta PIPA'],
  },
  'Australia': {
    laws: ['Privacy Act 1988', 'Notifiable Data Breaches Scheme', 'APRA CPS 234'],
  },
  'Singapore': {
    laws: ['PDPA', 'Cybersecurity Act', 'MAS TRM Guidelines'],
  },
  'Japan': {
    laws: ['APPI', 'CSL', 'FIEA'],
  },
  'Brazil': {
    laws: ['LGPD', 'BCB Resolutions'],
  },
  'India': {
    laws: [
      'DPDP Act 2023 & Rules 2025 (phased)',
      'RBI IT Outsourcing Master Direction (2023)',
      'SEBI CSCRF (20 Aug 2024)',
      'CERT-In Directions (28 Apr 2022): 6hr reporting, 180-day logs, NTP sync',
    ],
  },
  'UAE': {
    laws: ['PDPL (Federal Decree-Law 45/2021)', 'DIFC Data Protection Law 2020', 'ADGM Data Protection Regulations 2021'],
  },
  'Saudi Arabia': {
    laws: ['PDPL (Royal Decree M/19, 2021, effective 2023)', 'NCA Essential Cybersecurity Controls'],
  },
  'South Africa': {
    laws: ['POPIA (Protection of Personal Information Act, effective 2021)', 'Information Regulator guidelines'],
  },
  'South Korea': {
    laws: ['PIPA (Personal Information Protection Act)', 'PIPL amendments 2023', 'PIPC enforcement'],
  },
};

const REVIEW_FREQUENCY = [
  { tier: 'Tier 1: Critical/High Risk', frequency: 'Continuous + Quarterly Deep Dive', color: '#ef4444', triggers: ['SOC 2 changes', 'Breach notification', 'M&A', 'Regulatory action', 'Service changes'] },
  { tier: 'Tier 2: Medium Risk', frequency: 'Semi-annual + Annual Onsite', color: '#f59e0b', triggers: ['Contract renewal', 'Control failures', 'Regulatory changes', 'Sub-processor changes'] },
  { tier: 'Tier 3: Low Risk', frequency: 'Annual Self-assessment', color: '#eab308', triggers: ['Contract renewal', 'Major incidents', 'Regulatory updates'] },
  { tier: 'Tier 4: Commodity/Non-critical', frequency: 'Biennial or Contract-driven', color: '#10b981', triggers: ['Contract renewal only'] },
];

function getColorStyles(color) {
  const colors = {
    '#ef4444': { bg: 'bg-red-50', icon: 'text-red-600', dot: 'bg-red-500', trigger: 'bg-red-500' },
    '#f59e0b': { bg: 'bg-amber-50', icon: 'text-amber-600', dot: 'bg-amber-500', trigger: 'bg-amber-500' },
    '#eab308': { bg: 'bg-yellow-50', icon: 'text-yellow-600', dot: 'bg-yellow-500', trigger: 'bg-yellow-500' },
    '#10b981': { bg: 'bg-emerald-50', icon: 'text-emerald-600', dot: 'bg-emerald-500', trigger: 'bg-emerald-500' },
    '#4f46e5': { bg: 'bg-indigo-50', icon: 'text-indigo-600', dot: 'bg-indigo-500', trigger: 'bg-indigo-500' },
    '#8b5cf6': { bg: 'bg-violet-50', icon: 'text-violet-600', dot: 'bg-violet-500', trigger: 'bg-violet-500' },
    '#84cc16': { bg: 'bg-lime-50', icon: 'text-lime-600', dot: 'bg-lime-500', trigger: 'bg-lime-500' },
    '#dc2626': { bg: 'bg-red-50', icon: 'text-red-600', dot: 'bg-red-500', trigger: 'bg-red-500' },
    '#059669': { bg: 'bg-emerald-50', icon: 'text-emerald-600', dot: 'bg-emerald-500', trigger: 'bg-emerald-500' },
    '#7c3aed': { bg: 'bg-violet-50', icon: 'text-violet-600', dot: 'bg-violet-500', trigger: 'bg-violet-500' },
  };
  return colors[color] || colors['#4f46e5'];
}

export default function VendorRiskManagement({ isDark = false }) {
  const [activeTab, setActiveTab] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const section = params.get('section');
      const validTabs = ['Sectors', 'Regional Laws', 'Sub-Processors', 'Review Frequency', 'Incident Brief'];
      if (section) {
        const mapped = {
          'sub-processors': 'Sub-Processors',
          'review-frequency': 'Review Frequency',
          'incident-brief': 'Incident Brief',
          'regional-laws': 'Regional Laws',
          'sectors': 'Sectors'
        };
        if (mapped[section.toLowerCase()]) return mapped[section.toLowerCase()];
      }
      // Fallback to hash for backwards compatibility
      const hash = window.location.hash.slice(1);
      const validTabsHash = ['Sectors', 'Regional Laws', 'Sub-Processors', 'Review Frequency', 'Incident Brief'];
      if (validTabsHash.includes(hash)) return hash;
    }
    return 'Sectors';
  });
  const [expandedSector, setExpandedSector] = useState(null);
  const [expandedRegion, setExpandedRegion] = useState(null);
  const [expandedSubProcessor, setExpandedSubProcessor] = useState(null);
  const [expandedReview, setExpandedReview] = useState(null);

  const { user } = useAuth();
  const briefTab = 'Incident Brief';

  const tabToId = (tab) => {
    return tab.toLowerCase()
      .split(' ')
      .join('-')
      .split('')
      .filter(c => 'abcdefghijklmnopqrstuvwxyz0123456789-'.includes(c))
      .join('');
  };

  const tabs = [
    'Sectors',
    'Regional Laws',
    'Sub-Processors',
    'Review Frequency',
    ...(user ? [briefTab] : []),
  ];

  // Sync URL query params with active tab
  const [searchParams, setSearchParams] = useSearchParams();
  
  useEffect(() => {
    const sectionMap = {
      'Sectors': 'sectors',
      'Regional Laws': 'regional-laws',
      'Sub-Processors': 'sub-processors',
      'Review Frequency': 'review-frequency',
      'Incident Brief': 'incident-brief'
    };
    const section = sectionMap[activeTab];
    if (section) {
      setSearchParams({ section }, { replace: true });
    }
  }, [activeTab, setSearchParams]);

  // Handle query param changes from URL (e.g., deep links)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const section = params.get('section');
    const sectionMap = {
      'sectors': 'Sectors',
      'regional-laws': 'Regional Laws',
      'sub-processors': 'Sub-Processors',
      'review-frequency': 'Review Frequency',
      'incident-brief': 'Incident Brief'
    };
    if (section && sectionMap[section.toLowerCase()]) {
      setActiveTab(sectionMap[section.toLowerCase()]);
    }
  }, []);

  // Handle hash changes from URL (backwards compatibility)
  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash.slice(1);
      const validTabs = ['Sectors', 'Regional Laws', 'Sub-Processors', 'Review Frequency', 'Incident Brief'];
      if (validTabs.includes(hash)) {
        setActiveTab(hash);
      }
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  return (
    <section className={`py-24 ${isDark ? 'bg-dark-bg' : 'bg-surface-50'}`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-navy-900 dark:text-text-dark-primary mb-4">
            End-to-End Vendor Risk Management
          </h2>
          <p className="text-lg text-navy-600 dark:text-text-dark-secondary max-w-3xl mx-auto">
            Complete vendor risk lifecycle: sector compliance, regional law mapping, sub-processor governance, 
            nth-party visibility, and review frequency automation.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12" role="tablist" aria-label="Vendor risk modules">
          {tabs.map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              role="tab"
              aria-selected={activeTab === tab}
              aria-controls={`panel-${tab.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")}`}
              id={`vtab-${tab.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")}`}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300
                ${activeTab === tab
                  ? 'bg-indigo-600 text-white shadow-lg'
                  : `bg-surface-100 dark:bg-surface-dark-100 text-navy-700 dark:text-text-dark-secondary hover:bg-surface-200 dark:hover:bg-surface-dark-200 border border-surface-300 dark:border-surface-dark-300`
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Panels */}
        <div role="tabpanel" aria-label="Vendor risk module content">
          {activeTab === 'Sectors' && (
            <div id="panel-sectors" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" role="tabpanel" aria-labelledby="vtab-sectors">
              {Object.entries(VENDOR_RISK_SECTORS).map(([sector, data]) => {
                const c = getColorStyles(data.color);
                const Icon = data.icon;
                return (
                  <div key={sector} className={`group relative rounded-2xl border ${c.box} overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-indigo-300 dark:hover:border-indigo-600/50`}>
                    <div className={`absolute top-0 left-0 right-0 h-1 ${c.dot} transition-transform duration-300 group-hover:scale-x-100 origin-left`} style={{ transform: 'scaleX(0)' }} />
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`w-12 h-12 rounded-xl ${c.bg} flex items-center justify-center`}>
                          <Icon className={`${c.icon} w-6 h-6`} />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-navy-900 dark:text-text-dark-primary">{sector}</h3>
                          <p className="text-sm text-gray-600 dark:text-text-dark-secondary">{data.description}</p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <h4 className="font-semibold text-navy-900 dark:text-text-dark-primary mb-2">Key Risks</h4>
                          <ul className="space-y-1 text-sm text-gray-600 dark:text-text-dark-secondary">
                            {data.risks.map((risk, i) => (
                              <li key={i} className="flex items-center gap-2">
                                <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
                                {risk}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-navy-900 dark:text-text-dark-primary mb-2">Controls</h4>
                          <ul className="space-y-1 text-sm text-gray-600 dark:text-text-dark-secondary">
                            {data.controls.map((control, i) => (
                              <li key={i} className="flex items-center gap-2">
                                <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
                                {control}
                              </li>
                            ))}
                          </ul>
                        </div>
                        {data.subProcessorReq && (
                          <>
                          <div>
                            <h4 className="font-semibold text-navy-900 dark:text-text-dark-primary mb-2">Sub-Processor Requirements</h4>
                            <ul className="space-y-1 text-sm text-gray-600 dark:text-text-dark-secondary">
                              {data.subProcessorReq.map((req, i) => (
                                <li key={i} className="flex items-center gap-2">
                                  <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
                                  {req}
                                </li>
                              ))}
                            </ul>
                          </div>
                          </>
                        )}
                        <div>
                          <h4 className="font-semibold text-navy-900 dark:text-text-dark-primary mb-2">Regulations</h4>
                          <div className="flex flex-wrap gap-1">
                            {data.regulations.map((reg, i) => (
                              <span key={i} className={`px-2 py-0.5 text-xs rounded-full border ${c.box} ${c.title}`}>
                                {reg}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {activeTab === 'Regional Laws' && (
            <div id="panel-regional-laws" className="space-y-4" role="tabpanel" aria-labelledby="vtab-regional-laws">
              {Object.entries(REGIONAL_LAWS).map(([region, data]) => (
                <div key={region} className="rounded-2xl border border-surface-300 dark:border-surface-dark-300 bg-white dark:bg-surface-dark-100 overflow-hidden">
                  <div className="bg-navy-50 dark:bg-navy-900/30 px-6 py-4 border-b border-surface-300 dark:border-surface-dark-300">
                    <h3 className="text-xl font-bold text-navy-900 dark:text-text-dark-primary">{region}</h3>
                  </div>
                  <div className="p-6 space-y-4">
                    {data.federal && (
                      <div>
                        <h4 className="font-semibold text-navy-900 dark:text-text-dark-primary mb-2">Federal / National</h4>
                        <div className="flex flex-wrap gap-2">
                          {data.federal.map((law, i) => (
                            <span key={i} className="px-3 py-1 text-sm rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/30">
                              {law}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {data.gdpr && (
                      <div>
                        <h4 className="font-semibold text-navy-900 dark:text-text-dark-primary mb-2">EU GDPR</h4>
                        <span className="px-3 py-1 text-sm rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/30">
                          {data.gdpr}
                        </span>
                      </div>
                    )}
                    {data.laws && (
                      <div>
                        <h4 className="font-semibold text-navy-900 dark:text-text-dark-primary mb-2">Key Regulations</h4>
                        <div className="flex flex-wrap gap-2">
                          {data.laws.map((law, i) => (
                            <span key={i} className="px-3 py-1 text-sm rounded-full bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/30">
                              {law}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {data.countries && (
                      <div>
                        <h4 className="font-semibold text-navy-900 dark:text-text-dark-primary mb-2">Country-Specific</h4>
                        <div className="space-y-2">
                          {data.countries.map((country, i) => (
                            <div key={i} className="flex items-center gap-3 p-3 bg-surface-50 dark:bg-surface-dark-100 rounded-lg">
                              <span className="font-medium text-navy-900 dark:text-text-dark-primary">{country.name}:</span>
                              <div className="flex flex-wrap gap-1">
                                {country.laws.map((law, j) => (
                                  <span key={j} className="px-2 py-0.5 text-xs rounded bg-violet-50 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300">
                                    {law}
                                  </span>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {data.states && (
                      <div>
                        <h4 className="font-semibold text-navy-900 dark:text-text-dark-primary mb-2">State-Level</h4>
                        <div className="space-y-2">
                          {data.states.map((state, i) => (
                            <div key={i} className="flex items-center gap-3 p-3 bg-surface-50 dark:bg-surface-dark-100 rounded-lg">
                              <span className="font-medium text-navy-900 dark:text-text-dark-primary">{state.name}:</span>
                              <div className="flex flex-wrap gap-1">
                                {state.laws.map((law, j) => (
                                  <span key={j} className="px-2 py-0.5 text-xs rounded bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300">
                                    {law}
                                  </span>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {data.branches && (
                      <div>
                        <h4 className="font-semibold text-navy-900 dark:text-text-dark-primary mb-2">Branches</h4>
                        <div className="flex flex-wrap gap-2">
                          {data.branches.map((branch, i) => (
                            <span key={i} className="px-3 py-1 text-sm rounded-full bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800/30">
                              {branch}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'Sub-Processors' && (
            <div id="panel-sub-processors" className="space-y-4" role="tabpanel" aria-labelledby="vtab-sub-processors">
              {Object.entries(SUB_PROCESSOR_RISKS).map(([risk, data]) => {
                const c = getColorStyles(data.impact === 'Critical' ? '#ef4444' : '#f59e0b');
                return (
                  <details key={risk} className={`group rounded-2xl border ${c.box} overflow-hidden`}>
                    <summary className="p-4 flex items-center justify-between gap-4 cursor-pointer list-none hover:bg-slate-50 dark:hover:bg-slate-800/50">
                      <div className="flex items-center gap-3 min-w-0">
                        <span className={`shrink-0 w-2.5 h-2.5 rounded-full ${c.dot}`} />
                        <span className="font-semibold text-navy-900 dark:text-text-dark-primary leading-snug">{risk}</span>
                      </div>
                      <span className={`shrink-0 inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full border ${data.impact === 'Critical' ? 'bg-red-50 border-red-200 text-red-700 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800/30' : 'bg-amber-50 border-amber-200 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800/30'}`}>
                        {data.impact}
                      </span>
                    </summary>
                    <div className="px-4 pb-4 space-y-3">
                      <p className="text-gray-600 dark:text-text-dark-secondary">{data.description}</p>
                      <div>
                        <p className={`font-bold uppercase tracking-wide text-[10px] mb-1 ${c.title}`}>Controls</p>
                        <ul className="space-y-1">
                          {data.controls.map((ctrl, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-text-dark-secondary">
                              <span className={`shrink-0 w-4 h-4 rounded-full ${c.dot} ${c.title} text-[9px] font-bold flex items-center justify-center mt-0.5`}>{i + 1}</span>
                              <span>{ctrl}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </details>
                );
              })}
            </div>
          )}

          {activeTab === 'Review Frequency' && (
            <div id="panel-review-frequency" className="space-y-4" role="tabpanel" aria-labelledby="vtab-review-frequency">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {REVIEW_FREQUENCY.map((tier, i) => {
                  const c = getColorStyles(tier.color);
                  return (
                    <div key={tier.tier} className={`group rounded-2xl border ${c.box} p-6 transition-all duration-300 hover:shadow-xl hover:border-indigo-300 dark:hover:border-indigo-600/50`}>
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`w-10 h-10 rounded-xl ${c.bg} flex items-center justify-center`}>
                          <span className={`text-xl ${c.title}`}>{i + 1}</span>
                        </div>
                        <div>
                          <h4 className={`font-bold text-navy-900 dark:text-text-dark-primary ${c.title}`}>{tier.tier}</h4>
                          <p className="text-sm text-gray-600 dark:text-text-dark-secondary">{tier.frequency}</p>
                        </div>
                      </div>
                      <div className="space-y-2 text-sm text-gray-600 dark:text-text-dark-secondary">
                        <p className="font-medium text-navy-900 dark:text-text-dark-primary">Triggers:</p>
                        <ul className="space-y-1">
                          {tier.triggers.map((trigger, i) => (
                            <li key={i} className="flex items-center gap-2">
                              <span className={`w-2 h-2 rounded-full ${c.trigger}`} />
                              {trigger}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === briefTab && (
            <div id="panel-vendor-incident-brief" className="space-y-4" role="tabpanel" aria-labelledby="vtab-vendor-incident-brief">
              <Suspense fallback={
                <div className="py-16 text-center text-sm text-navy-500" data-testid="vendor-brief-loading">
                  Loading brief generator...
                </div>
              }>
                <VendorIncidentBrief isDark={isDark} />
              </Suspense>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

