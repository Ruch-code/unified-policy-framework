// GRC control framework for Google Cloud Run: guardrails, identity and CI/CD, network and data, logging,
// SOC 2 and ISO 27001 mapping, evidence checklist and a sandbox-to-production gate.
const P = 'text-sm text-gray-700 dark:text-gray-300';
const H = 'mt-5 mb-1 text-base font-semibold text-gray-900 dark:text-white';
const TH = 'p-2 text-left font-semibold text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-900';
const TD = 'p-2 align-top border-t border-gray-100 dark:border-gray-700 text-gray-700 dark:text-gray-300';

function Table({ head, rows }) {
  return (
    <div className="overflow-x-auto my-2" tabIndex={0} role="region" aria-label={head.join(', ')}>
      <table className="w-full text-sm" style={{ minWidth: head.length > 3 ? 900 : 640 }}>
        <thead><tr>{head.map((h) => <th key={h} scope="col" className={TH}>{h}</th>)}</tr></thead>
        <tbody>{rows.map((r) => <tr key={r[0]}>{r.map((c, j) => <td key={j} className={`${TD} ${j === 0 ? 'font-medium' : ''}`}>{c}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}

function Part({ id, title, children }) {
  return (
    <details id={id} className="rounded-xl border border-gray-200 dark:border-gray-700 p-4">
      <summary className="cursor-pointer font-semibold text-gray-900 dark:text-white">{title}</summary>
      <div className="mt-2">{children}</div>
    </details>
  );
}

export default function CloudRunGrc() {
  return (
    <details id="cloud-run-grc" className="my-6 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 scroll-mt-24">
      <summary className="cursor-pointer text-lg font-bold text-gray-900 dark:text-white">Google Cloud Run: GRC control framework, audit evidence and production gate</summary>
      <div className="mt-3 space-y-3">
        <p className={P}>For teams deploying services, jobs or worker pools on Cloud Run, starting from a new, empty Google Cloud project. Constraint and role names are Google Cloud names; check availability for your organisation and region, as some Cloud Run features (for example worker pools and domain mappings) have had preview or limited status.</p>

        <Part id="cloud-run-guardrails" title="1. Organisation guardrails (preventive)">
          <Table head={['Guardrail', 'How', 'Why']} rows={[
            ['Resource hierarchy', 'Organisation, then folders for prod and non-prod, then one project per environment', 'Separates blast radius and lets policies differ by environment'],
            ['Data residency', 'Org policy constraints/gcp.resourceLocations', 'Keeps workloads and data in approved regions'],
            ['Ingress', 'Org policy constraints/run.allowedIngress (for example internal and Cloud Load Balancing only)', 'Stops services being exposed directly to the internet by mistake'],
            ['Egress', 'Org policy constraints/run.allowedVPCEgress', 'Forces outbound traffic through the VPC where it can be controlled'],
            ['No public invokers', 'Org policy constraints/iam.allowedPolicyMemberDomains (domain-restricted sharing)', 'Blocks granting roles/run.invoker to allUsers on regulated projects'],
            ['No service account keys', 'Org policy constraints/iam.disableServiceAccountKeyCreation', 'Removes long-lived credentials; use Workload Identity Federation instead'],
            ['Image trust', 'Org policy constraints/run.allowedBinaryAuthorizationPolicies plus Binary Authorization', 'Only signed or attested images from approved registries can deploy'],
            ['Encryption', 'constraints/gcp.restrictNonCmekServices and restrictCmekCryptoKeyProjects where CMEK is required', 'Enforces customer-managed keys for regulated data'],
            ['Regulated workloads', 'Assured Workloads folders where a compliance regime needs them; confirm Cloud Run is in scope for that regime', 'Applies regime-specific controls and support boundaries'],
            ['Project creation', 'Project factory (Terraform) with APIs, logging and policies baked in', 'Every new project starts compliant'],
          ]} />
        </Part>

        <Part id="cloud-run-identity" title="2. Identity, access and CI/CD deployment controls">
          <Table head={['Control', 'Good practice']} rows={[
            ['Deploy through CI/CD only', 'Humans do not hold roles/run.admin in prod. A pipeline identity deploys after approval; engineers get read-only or roles/run.viewer.'],
            ['Separation of duties', 'Code author cannot approve their own pull request or release; the pipeline enforces it.'],
            ['Runtime identity', 'Each service runs as its own user-managed service account with least privilege, never the default compute service account.'],
            ['Who can attach identities', 'roles/iam.serviceAccountUser granted narrowly, since it lets someone deploy as that service account.'],
            ['No keys', 'CI/CD outside Google Cloud authenticates with Workload Identity Federation and short-lived tokens.'],
            ['Authenticated invocation', 'Require authentication (roles/run.invoker to named callers). Public access (allUsers) only for intentionally public endpoints, documented and approved.'],
            ['Supply chain', 'Images from Artifact Registry only, vulnerability scanning on push, build provenance and attestations, Binary Authorization enforcing them.'],
            ['Encryption', 'CMEK through Cloud KMS for services handling regulated data, with key rotation and separate key admins.'],
            ['Break-glass', 'Named emergency accounts, MFA, alerting on use and review after every use.'],
          ]} />
        </Part>

        <Part id="cloud-run-network" title="3. Network, ingress, egress and data protection">
          <Table head={['Area', 'Controls']} rows={[
            ['Ingress setting', 'Use "internal" or "internal and Cloud Load Balancing" rather than "all" for anything not meant to be public.'],
            ['Front door', 'External Application Load Balancer with Cloud Armor (WAF and DDoS) and, for staff apps, Identity-Aware Proxy.'],
            ['Default URL', 'Disable the default run.app URL where traffic should only arrive through the load balancer, so controls cannot be bypassed.'],
            ['Custom domains', 'Prefer domains on the load balancer over Cloud Run domain mappings for production.'],
            ['Egress', 'Direct VPC egress or a Serverless VPC Access connector, firewall rules, and Cloud NAT for a fixed outbound IP.'],
            ['Exfiltration', 'VPC Service Controls perimeter around Cloud Run, Artifact Registry, storage and data services.'],
            ['Secrets', 'Secret Manager references mounted as volumes or env vars; never plain secrets in env vars, labels, annotations, CLI arguments or images.'],
            ['Regulated data', 'Keep personal or card data out of logs, labels and revision metadata.'],
          ]} />
        </Part>

        <Part id="cloud-run-logging" title="4. Logging, monitoring and audit evidence">
          <Table head={['Control', 'Details']} rows={[
            ['Cloud Audit Logs', 'Admin Activity logs are always on (kept in the _Required bucket). Turn on Data Access logs where needed for sensitive services, mindful of volume.'],
            ['Central logging', 'Aggregated org-level log sink to a dedicated logging project and SIEM; log buckets with retention set and locked where immutability is needed.'],
            ['Posture and drift', 'Security Command Center findings and compliance views, plus alerts on IAM changes, public invoker grants and ingress changes.'],
            ['Revisions and rollback', 'Every deploy creates an immutable revision. Keep traffic splitting and a tested rollback procedure; record rollback tests.'],
            ['Service health', 'Cloud Monitoring uptime checks and SLO alerts for production services.'],
          ]} />
        </Part>

        <Part id="cloud-run-mapping" title="5. Mapping to SOC 2 and ISO/IEC 27001:2022">
          <Table head={['Control area', 'SOC 2 TSC', 'ISO 27001:2022 Annex A', 'What the auditor sees']} rows={[
            ['Least-privilege IAM and invoker auth', 'CC6.1, CC6.2, CC6.3', 'A.5.15, A.5.18, A.8.2, A.8.3', 'IAM bindings export, quarterly access review'],
            ['No service account keys, WIF', 'CC6.1', 'A.5.17, A.8.5', 'Org policy enforced, keys report empty'],
            ['CI/CD-only deploys, SoD', 'CC8.1', 'A.8.25, A.8.32, A.5.3', 'Pipeline config, sample releases with approvals'],
            ['Supply chain and Binary Authorization', 'CC8.1, CC7.1', 'A.5.21, A.8.28, A.8.8', 'Scan results, attestation records, policy'],
            ['CMEK and Secret Manager', 'CC6.1, CC6.7, C1.1', 'A.8.24, A.8.12', 'KMS key config and rotation, secret access logs'],
            ['Ingress, Cloud Armor, VPC-SC', 'CC6.6', 'A.8.20, A.8.22, A.8.23', 'Ingress settings, WAF policy, perimeter config'],
            ['Data residency', 'C1.1, P-series where personal data', 'A.5.31, A.5.34', 'Resource locations policy'],
            ['Audit logs, SIEM, SCC', 'CC7.2, CC7.3', 'A.8.15, A.8.16', 'Sink config, alert samples, finding triage'],
            ['Revisions, rollback, monitoring', 'A1.2, CC7.5, PI1.x where processing integrity is in scope', 'A.8.14, A.5.30, A.8.32', 'Rollback test, uptime and SLO reports'],
          ]} />
          <p className={P}>Mapping rows to one control ID each in your unified control set means one piece of evidence serves both audits.</p>
        </Part>

        <Part id="cloud-run-evidence" title="6. Audit evidence checklist">
          <Table head={['Domain', 'Artefact', 'Source in Google Cloud', 'Cadence', 'Pass when']} rows={[
            ['Guardrails', 'Effective org policies per prod folder', 'Organization Policy (gcloud org-policies describe, Policy Analyzer)', 'Quarterly and on change', 'All required constraints enforced, no unapproved exceptions'],
            ['IAM', 'IAM bindings for prod projects and services', 'IAM policy export, Policy Analyzer', 'Quarterly review', 'No humans with run.admin in prod; no allUsers except approved'],
            ['Service accounts', 'Runtime service accounts and key list', 'IAM service accounts page, keys report', 'Quarterly', 'One SA per service, no user-managed keys'],
            ['Deployments', 'Sample of prod releases', 'CI/CD logs, Cloud Audit Logs for run.services.replaceService', 'Per release, sampled for audit', 'Every prod deploy by pipeline identity with approval'],
            ['Supply chain', 'Image scan and attestation records', 'Artifact Registry, Binary Authorization', 'Per release', 'No critical unremediated vulnerabilities; attestation present'],
            ['Encryption', 'Key configuration and rotation', 'Cloud KMS', 'Quarterly', 'CMEK on in-scope services; rotation on schedule'],
            ['Secrets', 'Secret references and access logs', 'Secret Manager, Data Access logs', 'Quarterly', 'No plain secrets in service config'],
            ['Network', 'Ingress settings, load balancer, Cloud Armor, VPC-SC', 'Cloud Run service config, Network Services, VPC-SC', 'Quarterly and on change', 'Ingress restricted; perimeter includes in-scope services'],
            ['Logging', 'Log sink and retention settings, sample alerts', 'Cloud Logging, SIEM', 'Continuous, sampled quarterly', 'Sinks active, retention as policy, alerts triaged'],
            ['Posture', 'SCC findings and remediation', 'Security Command Center', 'Continuous, reviewed monthly', 'High findings remediated within SLA'],
            ['Resilience', 'Rollback test and monitoring', 'Revision history, Cloud Monitoring', 'Per major release or quarterly', 'Rollback works within target time'],
          ]} />
        </Part>

        <Part id="cloud-run-prod-gate" title="7. Sandbox to production: minimum gate">
          <p className={P}>A new project created for experiments (for example one auto-created for AI or developer tools) is not a production landing zone. Before any production workload or customer data, confirm:</p>
          <ol className={`list-decimal pl-5 space-y-1 ${P}`}>
            <li>Production runs in a dedicated project under a prod folder, separate from sandbox and test.</li>
            <li>Org policies above are enforced on the prod folder.</li>
            <li>No standing human admin in prod; break-glass accounts set up and alerted.</li>
            <li>Deploys only through CI/CD with approval and Workload Identity Federation; no service account keys.</li>
            <li>Each service has its own least-privilege runtime service account.</li>
            <li>Ingress restricted, authentication required, default URL disabled where the load balancer is the entry point.</li>
            <li>Images from Artifact Registry, scanned, and enforced by Binary Authorization.</li>
            <li>Secrets in Secret Manager; CMEK where regulated data is handled.</li>
            <li>Egress through the VPC, VPC Service Controls perimeter in place for sensitive data.</li>
            <li>Audit logs flowing to the central logging project and SIEM, with alerts on IAM and ingress changes.</li>
            <li>Monitoring, SLO alerts and a tested rollback procedure.</li>
            <li>Sign-off recorded by the platform owner and GRC, with any exceptions risk-accepted and dated.</li>
          </ol>
        </Part>
        <p className="text-xs text-gray-500 dark:text-gray-400">References: Google Cloud documentation for Cloud Run security, Organization Policy constraints, Binary Authorization, VPC Service Controls and Cloud Audit Logs. Check current feature status before relying on preview features.</p>
      </div>
    </details>
  );
}
