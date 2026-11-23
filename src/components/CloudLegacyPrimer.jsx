// Cloud infrastructure vs legacy systems: what they are, risks, controls and compensating controls.
const CARD = 'bg-white border border-gray-200 rounded-2xl p-6 mb-8 dark:bg-gray-800 dark:border-gray-700';
const P = 'text-sm text-gray-700 dark:text-gray-300';
const H = 'mt-5 mb-1 text-base font-semibold text-gray-900 dark:text-white';
const TH = 'p-2 text-left font-semibold text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-900';
const TD = 'p-2 align-top border-t border-gray-100 dark:border-gray-700 text-gray-700 dark:text-gray-300';

function Table({ head, rows }) {
  return (
    <div className="overflow-x-auto my-2" tabIndex={0} role="region" aria-label={head.join(', ')}>
      <table className="w-full text-sm" style={{ minWidth: 560 }}>
        <thead><tr>{head.map((h) => <th key={h} scope="col" className={TH}>{h}</th>)}</tr></thead>
        <tbody>{rows.map((r) => <tr key={r[0]}>{r.map((c, j) => <td key={j} className={`${TD} ${j === 0 ? 'font-medium' : ''}`}>{c}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}

export default function CloudLegacyPrimer() {
  return (
    <details className={CARD} id="cloud-vs-legacy">
      <summary className="cursor-pointer text-xl font-bold text-gray-900 dark:text-white">Cloud infrastructure and legacy systems: risks and controls</summary>
      <div className="mt-3">
        <p className={P}>Cloud infrastructure is the hosted technology a company uses to run systems without owning all the physical servers. Legacy systems are older systems the company still depends on, which are often harder to secure, integrate, monitor or update.</p>

        <h3 className={H}>Cloud infrastructure building blocks</h3>
        <Table head={['Area', 'What it means', 'Examples']} rows={[
          ['Cloud provider', 'The company hosting the infrastructure', 'AWS, Azure, Google Cloud'],
          ['Compute', 'Virtual machines or serverless services that run applications', 'AWS EC2, Azure VMs, Google Cloud Run, AWS Lambda'],
          ['Storage', 'Where files, backups, logs and application data are stored', 'AWS S3, Azure Blob Storage, Google Cloud Storage'],
          ['Databases', 'Managed systems that store structured application data', 'AWS RDS, Azure SQL, Google Cloud SQL, DynamoDB'],
          ['Networking', 'Private networks, firewalls, routing and internet access', 'AWS VPC, Azure Virtual Network, security groups'],
          ['Identity and access', 'Users, roles, permissions and authentication', 'Cloud IAM, Okta, Microsoft Entra ID, Google Workspace'],
          ['Containers', 'Lightweight packaged application environments', 'Kubernetes, AWS ECS, Google Kubernetes Engine'],
          ['Monitoring and logging', 'Tools that track activity, errors and security events', 'CloudWatch, Datadog, Azure Monitor, Splunk'],
          ['Backup and recovery', 'Copies of systems and data used after failure or attack', 'AWS Backup, Azure Recovery Services, snapshots'],
        ]} />

        <h3 className={H}>Main cloud risks and controls</h3>
        <Table head={['Risk', 'What can go wrong', 'Key controls']} rows={[
          ['Weak access control', 'Users or services have more access than needed', 'Least privilege, role-based access, MFA, access reviews'],
          ['Public exposure', 'Databases, storage buckets or admin panels are reachable from the internet', 'Network restrictions, private subnets, firewall rules, public access blocking'],
          ['Insecure storage', 'Sensitive data stored without protection', 'Encryption at rest and in transit, key management, data classification'],
          ['Poor logging', 'Security events happen but nobody can see them', 'Centralised logging, log retention, alerting, SIEM integration'],
          ['Unpatched systems', 'VMs or containers run outdated software', 'Patch management, vulnerability scanning, hardened images'],
          ['Misconfigured services', 'Default settings allow risky access or weak protection', 'Configuration baselines, CSPM tools, infrastructure reviews'],
          ['No backup plan', 'Data lost after deletion, ransomware or outage', 'Automated backups, restore testing, retention policies'],
          ['No disaster recovery', 'Critical systems stay down too long after failure', 'Defined RTO and RPO, failover testing'],
          ['Secrets exposure', 'API keys or passwords stored in code or plain text', 'Secrets manager, key rotation, secret scanning'],
          ['Weak change control', 'Infrastructure changes break systems or open gaps', 'Infrastructure as code, pull requests, approvals, change logs'],
        ]} />

        <h3 className={H}>Cloud controls by category</h3>
        <Table head={['Control category', 'What good looks like', 'Examples']} rows={[
          ['Identity', 'Only approved users and services can access cloud resources', 'MFA, SSO, IAM roles, privileged access management'],
          ['Network', 'Systems are segmented and internet exposure is limited', 'Private VPCs, security groups, VPN, zero trust access'],
          ['Data protection', 'Sensitive data is protected wherever it lives', 'Encryption, key management, tokenisation, DLP'],
          ['Logging', 'Activity is recorded and reviewed', 'CloudTrail, Azure Activity Logs, CloudWatch, SIEM alerts'],
          ['Vulnerability', 'Weaknesses are found and fixed', 'Container scanning, VM patching, remediation SLAs'],
          ['Backup', 'Data can be recovered', 'Daily backups, immutable backups, restore tests'],
          ['Configuration', 'Cloud settings follow security baselines', 'CIS Benchmarks, policy as code, CSPM alerts'],
          ['Change', 'Infrastructure changes are reviewed before release', 'Terraform pull requests, deployment approvals, rollback plans'],
          ['Incident response', 'The team can respond to cloud security incidents', 'Runbooks, escalation paths, forensic log retention'],
          ['Vendor', 'Third-party cloud services are assessed', 'SOC 2 report review, DPAs, sub-processor lists, vendor risk reviews'],
        ]} />

        <h3 className={H}>Practical example: a typical SaaS setup</h3>
        <Table head={['Component', 'Example setup', 'Controls expected']} rows={[
          ['Application hosting', 'AWS ECS containers', 'Private networking, image scanning, deployment approvals'],
          ['Database', 'AWS RDS PostgreSQL', 'Encryption, restricted access, automated backups'],
          ['File storage', 'AWS S3', 'Block public access, bucket policies, object encryption'],
          ['Identity', 'Okta and AWS IAM', 'MFA, SSO, least privilege roles'],
          ['Logging', 'CloudTrail and Datadog', 'Centralised logs, alerting, retention'],
          ['Secrets', 'AWS Secrets Manager', 'Rotation, restricted access, no secrets in source code'],
          ['Infrastructure changes', 'Terraform', 'Pull request review, approval, version control'],
        ]} />

        <h3 className={H}>Legacy systems</h3>
        <p className={P}>A legacy system is not automatically bad. It becomes risky when it is old, unsupported, poorly documented, hard to monitor or hard to secure.</p>
        <Table head={['Legacy system type', 'Example', 'Common issue']} rows={[
          ['Old operating system', 'Windows Server 2012, CentOS 7', 'No longer supported or hard to patch'],
          ['Old payroll system', 'On-premises payroll server from around 2012', 'Hard to patch, sensitive employee data, weak logging'],
          ['Old database', 'SQL Server 2008, Oracle 11g', 'Missing security updates, weak encryption'],
          ['Old ERP', 'SAP ECC before migration to S/4HANA, heavily customised older ERP', 'Complex dependencies and fragile integrations'],
          ['Old CRM', 'Self-hosted CRM or an outdated CRM integration', 'Weak access controls, poor logging'],
          ['Old file server', 'On-premises Windows shared drive', 'Excessive permissions, limited audit trails'],
          ['Old authentication', 'On-premises Active Directory without MFA', 'High risk of account compromise'],
          ['Old custom application', 'Internal app built years ago', 'No owner, no tests, hardcoded credentials'],
          ['Old reporting process', 'Access database or Excel macro process', 'Data integrity and access control issues'],
        ]} />

        <h3 className={H}>Main legacy risks and controls</h3>
        <Table head={['Risk', 'What can go wrong', 'Key controls']} rows={[
          ['Unsupported software', 'Vendor no longer provides security updates', 'Upgrade plan, compensating controls, isolation'],
          ['Weak authentication', 'No MFA or shared accounts', 'SSO where possible, MFA, named accounts'],
          ['Poor access control', 'Too many users have admin or broad access', 'Access reviews, least privilege, owner approval'],
          ['No logging', 'Activity cannot be investigated', 'Enable audit logs, forward to SIEM, retain logs'],
          ['Hardcoded credentials', 'Passwords built into scripts or apps', 'Secrets vault, credential rotation, code review'],
          ['Fragile integrations', 'Changes break downstream systems', 'Integration inventory, change testing, monitoring'],
          ['No backup testing', 'Backups exist but may not restore', 'Restore testing, backup retention, recovery runbooks'],
          ['Data quality issues', 'Old data is inaccurate or duplicated', 'Data ownership, clean-up plan, migration validation'],
          ['Security gaps', 'System cannot support modern controls', 'Network isolation, jump host, restricted admin access'],
          ['No clear owner', 'Nobody is accountable for the system', 'Assign a business owner and a technical owner'],
        ]} />

        <h3 className={H}>Compensating controls when a legacy system cannot be fixed quickly</h3>
        <Table head={['Control', 'Why it helps']} rows={[
          ['Network segmentation', 'Limits who can reach the system'],
          ['VPN or zero trust access', 'Blocks direct public access'],
          ['Jump host for admin access', 'Controls and logs privileged access'],
          ['MFA at the access layer', 'Adds protection when the application cannot support MFA'],
          ['Read-only access where possible', 'Reduces accidental or malicious changes'],
          ['Extra logging around the system', 'Improves investigation capability'],
          ['Frequent backups', 'Reduces impact from failure or ransomware'],
          ['Vulnerability scanning', 'Tracks known weaknesses'],
          ['Documented exception', 'Records why the risk exists and when it will be fixed'],
          ['Migration roadmap', 'Stops the exception becoming permanent'],
        ]} />

        <h3 className={H}>Cloud vs legacy: how the controls differ</h3>
        <Table head={['Topic', 'Cloud infrastructure', 'Legacy systems']} rows={[
          ['Access control', 'Usually managed through IAM, SSO and roles', 'Often local accounts or older directory systems'],
          ['Logging', 'Usually available through cloud-native services', 'May need manual setup or third-party tools'],
          ['Patching', 'Often automated or handled by the provider', 'Often manual and risky'],
          ['Encryption', 'Usually built in', 'May be limited or unsupported'],
          ['Scaling', 'Easy to scale up or down', 'Limited by hardware or old architecture'],
          ['Security monitoring', 'Easier to centralise', 'Often fragmented'],
          ['Change management', 'Can use infrastructure as code', 'Often manual changes and undocumented knowledge'],
          ['Recovery', 'Snapshots and managed backups are common', 'May depend on tapes, old images or manual steps'],
        ]} />

        <p className={`${P} mt-3 font-medium`}>In short: legacy systems are older systems the company still depends on; cloud infrastructure is the modern hosted environment where applications, data, identity and networks run. Cloud infrastructure needs strong identity, configuration, logging, encryption, backup and change controls. Legacy systems need the same, but often cannot support them cleanly, so the company needs isolation, monitoring, documented exceptions and a migration plan.</p>
        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">Product names are illustrative examples, not recommendations. Check vendor support dates before calling a specific version unsupported.</p>
      </div>
    </details>
  );
}
