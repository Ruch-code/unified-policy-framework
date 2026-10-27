// Secret scanning outside source code: cloud providers and other places secrets hide.
// Tool names are common examples, not endorsements; check feature availability for your plan or tier.

export const SECRET_ENVIRONMENTS = [
  {
    id: 'aws', name: 'AWS', icon: 'Cloud',
    hide: ['Lambda and ECS environment variables', 'EC2 user data and launch templates', 'S3 buckets (backups, exports, .env files)', 'CodeBuild project variables', 'Long-lived IAM access keys on laptops and servers'],
    scan: [
      'Amazon Macie: discovers credentials and private keys in S3 objects',
      'Amazon Inspector: Lambda code scanning flags hard-coded secrets in function code',
      'Security Hub controls such as ECS.8 (secrets passed as container environment variables) and CodeBuild.2 (clear text credentials in project variables)',
      'IAM credential report: finds old or unused access keys to rotate or remove',
      'GuardDuty and CloudTrail: detect a leaked key being used from an unusual place',
    ],
    oss: 'TruffleHog (S3 source), Prowler',
    prevent: ['Store secrets in Secrets Manager or Parameter Store (SecureString) and reference them, never paste values', 'Use IAM roles and IAM Identity Center instead of long-lived access keys', 'AWS scans public GitHub for its keys and attaches a quarantine policy; treat that alert as a confirmed incident'],
  },
  {
    id: 'azure', name: 'Microsoft Azure', icon: 'Cloud',
    hide: ['App Service and Function app settings', 'VM disks and scripts', 'ARM, Bicep and pipeline variables', 'Storage account connection strings', 'Azure DevOps repos and pipelines'],
    scan: [
      'Microsoft Defender for Cloud: agentless secrets scanning on VMs and cloud deployments (Defender CSPM plan)',
      'GitHub Advanced Security for Azure DevOps: secret scanning and push protection on repos',
      'Microsoft Purview: credential sensitive information types in SharePoint, OneDrive, Teams and email',
      'Entra ID sign-in logs: flag service principal secrets used from unexpected locations',
    ],
    oss: 'TruffleHog, Gitleaks on exported pipelines',
    prevent: ['Store secrets in Key Vault and use Key Vault references in app settings', 'Use managed identities instead of client secrets', 'Prefer certificates or workload identity federation over long-lived service principal secrets'],
  },
  {
    id: 'gcp', name: 'Google Cloud', icon: 'Cloud',
    hide: ['Cloud Run and Cloud Functions environment variables', 'Service account JSON key files', 'Cloud Storage buckets', 'Compute Engine metadata and startup scripts'],
    scan: [
      'Sensitive Data Protection (formerly Cloud DLP): credential infoTypes for Cloud Storage, BigQuery and Datastore',
      'Security Command Center: flags risky configurations, including secrets in environment variables (tier dependent)',
      'Org policy for exposed service account keys: Google can disable keys it finds published publicly',
      'Cloud Audit Logs: detect use of a key from unexpected networks',
    ],
    oss: 'TruffleHog (GCS source)',
    prevent: ['Store secrets in Secret Manager and mount or reference them', 'Block service account key creation with the iam.disableServiceAccountKeyCreation org policy; use workload identity instead', 'Rotate any key that has ever left the project'],
  },
  {
    id: 'k8s', name: 'Kubernetes', icon: 'Layers',
    hide: ['Kubernetes Secrets (base64 encoded, not encrypted by default)', 'Helm values files and ConfigMaps', 'Pod specs with plain environment variables', 'etcd backups'],
    scan: ['Trivy (k8s mode): finds secrets and misconfigurations across the cluster', 'Kubescape and Checkov: scan manifests and Helm charts before deploy', 'Admission policies (Kyverno, OPA Gatekeeper): block plain-text secrets at deploy time'],
    oss: 'Trivy, Kubescape, Checkov',
    prevent: ['Enable encryption at rest for Secrets with a KMS provider', 'Sync from a secrets manager with External Secrets Operator or the Secrets Store CSI driver', 'Restrict who can read Secrets with RBAC'],
  },
  {
    id: 'containers', name: 'Container images and registries', icon: 'Box',
    hide: ['Image layers (a file deleted in a later layer is still in an earlier one)', 'Build arguments and Dockerfile ENV lines', 'Public images pushed by mistake'],
    scan: ['Trivy image scanning with the secret scanner enabled', 'TruffleHog Docker source', 'Registry scanning on push in your CI pipeline'],
    oss: 'Trivy, TruffleHog',
    prevent: ['Use BuildKit secret mounts instead of build arguments', 'Multi-stage builds so build-time files never reach the final image', 'Keep registries private by default and alert on public repositories'],
  },
  {
    id: 'iac', name: 'Infrastructure as Code and state files', icon: 'FileText',
    hide: ['Hard-coded values in Terraform, CloudFormation and Bicep', 'Terraform state files, which store secrets in plain text', 'Variable files committed by mistake'],
    scan: ['Checkov, KICS and Trivy config: flag hard-coded secrets in IaC', 'Secret scanners in CI on every pull request', 'Review who can read state buckets'],
    oss: 'Checkov, KICS, Trivy',
    prevent: ['Store state in an encrypted remote backend with tight access', 'Pass secrets from a secrets manager at apply time; mark variables as sensitive', 'Never commit .tfvars files that contain secrets'],
  },
  {
    id: 'cicd', name: 'CI/CD logs and settings', icon: 'Server',
    hide: ['Build logs where a command prints a secret', 'Derived or encoded secrets that bypass log masking', 'Plain-text pipeline variables', 'Long-lived cloud keys stored as pipeline secrets'],
    scan: ['Scan build logs and artifacts with TruffleHog or ggshield', 'Platform secret scanning on repositories and pipeline files', 'Audit who can view and edit pipeline secrets'],
    oss: 'TruffleHog, Gitleaks',
    prevent: ['Use OIDC federation from the pipeline to the cloud instead of stored keys', 'Avoid set -x and debug output in steps that handle secrets', 'Limit secret access to protected branches and environments'],
  },
  {
    id: 'collab', name: 'Collaboration tools', icon: 'Users',
    hide: ['Slack and Teams messages', 'Jira tickets and Confluence pages', 'Notion and Google Docs', 'Shared Postman workspaces and collections'],
    scan: ['Microsoft Purview DLP for Teams, SharePoint and OneDrive', 'Commercial scanners with Slack, Jira, Confluence and Drive connectors (for example GitGuardian, Nightfall)', 'TruffleHog sources for Postman and other platforms'],
    oss: 'TruffleHog',
    prevent: ['Share secrets only through a password manager or one-time secret link', 'Keep Postman workspaces private and review public ones', 'Train teams that a pasted key is a leaked key'],
  },
  {
    id: 'endpoints', name: 'Developer laptops and endpoints', icon: 'HardDrive',
    hide: ['.env files and local config', '~/.aws/credentials, kubeconfig and SSH keys', 'Shell history', 'Browser-saved passwords'],
    scan: ['Run TruffleHog or Gitleaks in filesystem mode on developer machines (with consent and policy)', 'EDR and MDM to detect credential theft and enforce disk encryption'],
    oss: 'TruffleHog, Gitleaks',
    prevent: ['Short-lived credentials through SSO-based CLI login', 'A company password manager for every shared secret', 'Full-disk encryption and remote wipe on all devices'],
  },
  {
    id: 'ai', name: 'AI tools and prompts', icon: 'Cpu',
    hide: ['Secrets pasted into chat assistants', 'Code context sent to coding assistants', 'Prompt and response logs stored by vendors'],
    scan: ['Browser or endpoint DLP that inspects AI prompts', 'Microsoft Purview DSPM for AI or similar tools for enterprise AI use', 'Secret scanning on prompt logs you store'],
    oss: 'Redaction middleware in your own AI gateway',
    prevent: ['Approved enterprise AI tools only, with no training on your data', 'Exclude .env and secret files from coding assistant context', 'Redact secrets before prompts leave your network'],
  },
  {
    id: 'public', name: 'Public internet', icon: 'Globe',
    hide: ['Public GitHub repos and gists of staff', 'Public packages (npm, PyPI) with bundled .env files', 'Paste sites and leaked datasets'],
    scan: ['GitHub secret scanning partner program: providers are told when their tokens appear publicly', 'Public monitoring services for your organisation and staff (for example GitGuardian Public Monitoring)', 'Package contents checks before publishing'],
    oss: 'TruffleHog against your public org',
    prevent: ['Treat any public exposure as compromised: rotate first, investigate second', 'Check package contents with a dry run before publishing', 'Policy that work code is never pushed to personal accounts'],
  },
];

export const CLOUD_RUNBOOK = [
  { step: 'Inventory', text: 'List where secrets live today: each cloud account, secrets manager, CI/CD platform and SaaS tool.' },
  { step: 'Centralise', text: 'Move secrets into a managed store (Secrets Manager, Key Vault, Secret Manager, Vault) and reference them from workloads.' },
  { step: 'Scan', text: 'Turn on native cloud scanning, add open-source scanners for images, IaC and storage, and schedule full scans.' },
  { step: 'Detect use', text: 'Alert when credentials are used from new locations (GuardDuty, Defender for Cloud, Security Command Center, audit logs).' },
  { step: 'Rotate', text: 'Rotate exposed secrets immediately, then automate rotation for everything else on a schedule.' },
  { step: 'Remove the need', text: 'Replace long-lived keys with roles, managed identities, workload identity and OIDC so there is less to leak.' },
];
