import { useState } from 'react';
import { Download, Server, ChevronDown, ChevronUp } from 'lucide-react';
import { downloadXlsx } from '../utils/xlsxExport.js';

const COMMON = ['Asset ID', 'Asset Name', 'Asset Type', 'Description', 'Business Owner', 'Technical Custodian', 'Department', 'Data Classification', 'Contains Personal Data (Y/N)', 'Criticality (High/Medium/Low)', 'In Audit Scope (Y/N)'];
const TAIL = ['Status (Active/Retired)', 'Date Added', 'Last Reviewed', 'Notes'];

const SHEETS = [
  {
    name: 'Hardware',
    extra: ['Make / Model', 'Serial Number', 'Assigned To', 'Location', 'OS & Version', 'MDM Enrolled (Y/N)', 'Disk Encryption (Y/N)', 'EDR Installed (Y/N)', 'Purchase Date', 'End of Life Date', 'Disposal Method & Certificate'],
    sample: ['HW-001', 'MacBook Pro 14', 'Laptop', 'Engineering laptop', 'Head of Engineering', 'IT Admin', 'Engineering', 'Confidential', 'Y', 'High', 'Y', 'Apple M3 Pro', 'C02XXXXXXX', 'User A', 'Remote - India', 'macOS 15.1', 'Y', 'Y (FileVault)', 'Y', '2025-04-10', '2029-04-10', '', 'Active', '2025-04-10', '2026-10-01', ''],
  },
  {
    name: 'Software & SaaS',
    extra: ['Vendor', 'Version / Plan', 'SSO Enforced (Y/N)', 'MFA Enforced (Y/N)', 'Number of Users', 'Admin Accounts', 'Data Stored', 'Hosting Region', 'Vendor Risk Rating', 'SOC 2 / ISO Report on File (Y/N)', 'Contract Renewal Date'],
    sample: ['SW-001', 'Google Workspace', 'SaaS', 'Email, docs, identity', 'COO', 'IT Admin', 'All', 'Confidential', 'Y', 'High', 'Y', 'Google', 'Business Plus', 'Y', 'Y', '45', '2', 'Email, documents', 'US / EU', 'Low', 'Y', '2027-01-31', 'Active', '2024-02-01', '2026-10-01', ''],
  },
  {
    name: 'Cloud & Infrastructure',
    extra: ['Provider', 'Account / Project ID', 'Region', 'Environment (Prod/Staging/Dev)', 'Resource Type', 'Public Exposure (Y/N)', 'Encryption at Rest (Y/N)', 'Backups Enabled (Y/N)', 'Logging Enabled (Y/N)', 'IaC Managed (Y/N)', 'Tags'],
    sample: ['CL-001', 'prod-api-cluster', 'Compute', 'Production API on Kubernetes', 'CTO', 'DevOps Lead', 'Engineering', 'Confidential', 'Y', 'High', 'Y', 'AWS', '1234-5678-9012', 'ap-south-1', 'Prod', 'EKS cluster', 'N', 'Y', 'Y', 'Y', 'Y', 'env=prod, owner=platform', 'Active', '2025-01-15', '2026-10-01', ''],
  },
  {
    name: 'Data Stores',
    extra: ['Storage Location', 'Data Categories', 'Approx. Records', 'Encryption at Rest (Y/N)', 'Encryption in Transit (Y/N)', 'Access Restricted To', 'Retention Period', 'Backup Frequency', 'Cross-Border Transfer (Y/N)', 'Lawful Basis / Purpose', 'Linked Systems'],
    sample: ['DS-001', 'customers-db', 'Database', 'Primary customer database', 'Head of Product', 'DBA', 'Engineering', 'Restricted', 'Y', 'High', 'Y', 'AWS RDS ap-south-1', 'Names, emails, billing', '120,000', 'Y', 'Y', 'Backend service, 3 DBAs', '7 years after closure', 'Daily', 'N', 'Contract', 'CL-001, SW-004', 'Active', '2025-01-15', '2026-10-01', ''],
  },
  {
    name: 'Code & Repositories',
    extra: ['Platform', 'Repository URL', 'Visibility (Private/Public)', 'Branch Protection (Y/N)', 'Secret Scanning (Y/N)', 'Dependency Scanning (Y/N)', 'Deploys To', 'Number of Contributors', 'Admin Users', 'CI/CD Pipeline', 'Last Access Review'],
    sample: ['CR-001', 'backend-api', 'Source code', 'Core API service', 'CTO', 'Tech Lead', 'Engineering', 'Confidential', 'N', 'High', 'Y', 'GitHub', 'github.com/org/backend-api', 'Private', 'Y', 'Y', 'Y', 'CL-001', '12', '2', 'GitHub Actions', '2026-09-15', 'Active', '2024-06-01', '2026-10-01', ''],
  },
  {
    name: 'AI Systems',
    extra: ['Provider / Model', 'Use Case', 'Internal or Third-Party', 'Risk Tier', 'Training Data Source', 'Customer Data Used (Y/N)', 'Human Oversight', 'Impact Assessment Done (Y/N)', 'Monitoring in Place (Y/N)', 'Regulatory Category (e.g. EU AI Act)', 'Model Version'],
    sample: ['AI-001', 'Support reply assistant', 'AI system', 'Drafts replies to support tickets', 'Head of Support', 'ML Engineer', 'Support', 'Confidential', 'Y', 'Medium', 'Y', 'OpenAI GPT-4o via API', 'Draft customer replies', 'Third-party', 'Limited', 'Vendor pre-trained', 'Y (prompts only)', 'Agent approves every reply', 'Y', 'Y', 'Limited risk (Art. 50)', '2024-08-06', 'Active', '2025-03-01', '2026-10-01', ''],
  },
];

const KEY_ROWS = [
  ['Restricted', 'Most sensitive. Breach causes severe harm.', 'Customer PII, payment data, secrets, health data', 'Named individuals only, MFA, encryption, logging'],
  ['Confidential', 'Internal business data, harmful if disclosed.', 'Source code, contracts, financials, internal docs', 'Employees with business need, encryption'],
  ['Internal', 'Low harm if disclosed, not for public.', 'Org charts, internal wiki, policies', 'All employees and approved contractors'],
  ['Public', 'Approved for public release.', 'Marketing site, published docs', 'No restriction'],
];

const MAP_ROWS = [
  ['ISO/IEC 27001:2022', 'A.5.9 Inventory of information and other associated assets; A.5.10 Acceptable use; A.5.11 Return of assets; A.5.12 Classification of information', 'Inventory with owners, classification and return on leaving'],
  ['SOC 2 (TSC 2017)', 'CC6.1 Logical access (identify and manage assets); CC3.2 Risk identification', 'Complete system inventory supports scope and risk assessment'],
  ['NIST CSF 2.0', 'ID.AM-01 to ID.AM-08 Asset Management', 'Hardware, software, services, data and their lifecycle'],
  ['CIS Controls v8.1', 'Control 1 Inventory of enterprise assets; Control 2 Inventory of software assets', 'Active discovery and reconciliation'],
  ['HIPAA Security Rule', '164.310(d)(1) Device and media controls; 164.308(a)(1) Risk analysis', 'Track devices and media holding ePHI'],
  ['GDPR / DPDPA', 'GDPR Art. 30 Records of processing; DPDPA data inventory for notice and erasure', 'Data Stores sheet doubles as a processing record input'],
  ['ISO/IEC 42001:2023', 'A.4.2 to A.4.6 Resource documentation; A.5 Impact assessment', 'AI Systems sheet records AI resources and risk tier'],
];

function buildSheets() {
  const instructions = {
    name: 'Instructions',
    title: 'Asset Inventory Template',
    notes: [
      'Purpose: one register of every asset that stores, processes or transmits company or customer data. Auditors use it to confirm scope and check that controls cover every asset.',
      'How to use: fill one row per asset in each sheet. Delete the sample row (row starting with an example ID) before sharing. Keep IDs unique and never reuse a retired ID.',
      'Ownership: every asset needs a Business Owner (accountable) and a Technical Custodian (operates it). Review the whole register at least quarterly and when people join or leave.',
      'Reconcile: compare against MDM device lists, SSO app lists, cloud account resources and your code platform at each review, and record the date in Last Reviewed.',
      'Prepared by OneLens by Ruchi Kandpal. Adapt freely to your organisation.',
    ],
    headers: ['Sheet', 'What goes here', 'Common source to reconcile against'],
    rows: [
      ['Hardware', 'Laptops, phones, servers, network devices, removable media', 'MDM (Jamf, Intune, Kandji), purchase records'],
      ['Software & SaaS', 'Every SaaS tool and licensed software, including free tools holding work data', 'SSO app list, expense reports, browser extension audits'],
      ['Cloud & Infrastructure', 'Cloud accounts, clusters, VMs, functions, networks, storage buckets', 'AWS Config, Azure Resource Graph, GCP Asset Inventory'],
      ['Data Stores', 'Databases, buckets, data warehouses, file shares holding sensitive data', 'Cloud console, data catalog, DPIA records'],
      ['Code & Repositories', 'Source repositories and CI/CD pipelines', 'GitHub, GitLab, Bitbucket organisation settings'],
      ['AI Systems', 'AI models and AI-powered features you build or buy', 'Engineering roadmap, vendor list, AI use policy register'],
      ['Classification Key', 'Definitions for the Data Classification column', 'Your Data Classification Policy'],
      ['Framework Mapping', 'Which audit requirements this inventory supports', '-'],
    ],
  };
  const data = SHEETS.map((s) => ({
    name: s.name,
    title: `${s.name} Inventory`,
    notes: ['Example row shown in row 1 of the table. Replace it with your own assets.'],
    headers: [...COMMON, ...s.extra, ...TAIL],
    rows: [s.sample, ...Array.from({ length: 25 }, () => [])],
  }));
  return [
    instructions,
    ...data,
    { name: 'Classification Key', title: 'Data Classification Key', headers: ['Level', 'Definition', 'Examples', 'Minimum handling'], rows: KEY_ROWS },
    { name: 'Framework Mapping', title: 'Framework Mapping', headers: ['Framework', 'Requirement', 'How this inventory helps'], rows: MAP_ROWS },
  ];
}

export default function AssetInventoryTemplate() {
  const [open, setOpen] = useState(false);
  const download = () => downloadXlsx(buildSheets(), 'asset-inventory-template');

  return (
    <section id="asset-inventory" className="scroll-mt-24 rounded-2xl border border-emerald-300 dark:border-emerald-900/50 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-teal-950/40 p-6 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
        <span className="inline-flex w-12 h-12 rounded-xl bg-emerald-600 text-white items-center justify-center shrink-0">
          <Server className="w-6 h-6" />
        </span>
        <div className="flex-1">
          <h2 className="text-lg font-extrabold text-navy-900 dark:text-text-dark-primary">Asset Inventory Template</h2>
          <p className="text-sm text-navy-600 dark:text-text-dark-secondary mt-0.5 max-w-2xl">
            Audit-ready Excel register with sheets for hardware, SaaS, cloud, data stores, code repositories and AI systems, plus a classification key and mapping to ISO 27001 A.5.9, SOC 2, NIST CSF, CIS, HIPAA, GDPR, DPDPA and ISO 42001.
          </p>
        </div>
        <div className="flex gap-2 shrink-0">
          <button onClick={() => setOpen((v) => !v)} className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-lg border border-emerald-600 text-emerald-700 dark:text-emerald-300 text-sm font-semibold hover:bg-emerald-100 dark:hover:bg-emerald-900/30 transition-colors" aria-expanded={open}>
            {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />} What's inside
          </button>
          <button onClick={download} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-600 text-white text-sm font-bold hover:bg-emerald-700 transition-colors">
            <Download className="w-4 h-4" /> Download .xlsx
          </button>
        </div>
      </div>

      {open && (
        <div className="mt-6 grid md:grid-cols-2 gap-4">
          {SHEETS.map((s) => (
            <div key={s.name} className="rounded-xl bg-white/80 dark:bg-gray-900/60 border border-emerald-200 dark:border-emerald-900/40 p-4">
              <h3 className="font-bold text-sm text-navy-900 dark:text-text-dark-primary">{s.name}</h3>
              <p className="text-xs text-navy-600 dark:text-text-dark-secondary mt-1">
                Common fields (ID, owner, custodian, classification, personal data, criticality, scope, status, review dates) plus: {s.extra.join(', ')}.
              </p>
            </div>
          ))}
          <div className="rounded-xl bg-white/80 dark:bg-gray-900/60 border border-emerald-200 dark:border-emerald-900/40 p-4 md:col-span-2">
            <h3 className="font-bold text-sm text-navy-900 dark:text-text-dark-primary">Also included</h3>
            <p className="text-xs text-navy-600 dark:text-text-dark-secondary mt-1">
              Instructions sheet with reconciliation sources, a four-level data classification key, and a framework mapping sheet. Each sheet has a worked example row, frozen headers and filters.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
