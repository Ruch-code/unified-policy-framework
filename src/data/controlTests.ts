export type ControlTest = {
  id: string;
  name: string;
  category: string;
  frameworks: ("soc2" | "iso27001" | "hipaa" | "gdpr")[];
  description: string;
  whyItMatters: string;
  howToPass: string[];
  evidence: string[];
  commonFailures: string[];
  controlRefs?: { soc2?: string[]; iso27001?: string[]; hipaa?: string[]; gdpr?: string[] };
  tool?: string;
};

export type ControlTestCategory = {
  id: string;
  label: string;
  tests: ControlTest[];
};

export const controlTests: ControlTest[] = [
  // ========== ACCOUNT SECURITY ==========
  {
    id: "CT-ACTSEC-001",
    name: "Web Filtering Capabilities",
    category: "Account Security",
    frameworks: ["iso27001"],
    description: "Verifies the organization has web filtering to block malicious and inappropriate content.",
    whyItMatters: "Prevents drive-by downloads, phishing, and access to high-risk sites that could compromise credentials.",
    howToPass: [
      "Deploy DNS-based or proxy-based web filtering (e.g., Cisco Umbrella, Cloudflare Gateway).",
      "Configure block lists for malware, phishing, command-and-control, and high-risk categories.",
      "Enable SSL inspection for encrypted traffic analysis.",
      "Test filtering with known-bad domains and verify blocks are logged.",
      "Review and update block lists monthly."
    ],
    evidence: [
      "Web filtering policy configuration screenshots",
      "Sample block logs showing malicious domain rejections",
      "SSL inspection certificate deployment proof"
    ],
    commonFailures: [
      "Filtering only applied to on-premise networks, not remote users",
      "SSL inspection disabled, allowing encrypted threats through"
    ],
    controlRefs: { iso27001: ["A.8.22"] }
  },
  {
    id: "CT-ACTSEC-002",
    name: "MFA on Slack",
    category: "Account Security",
    frameworks: ["iso27001", "hipaa"],
    description: "Verifies multi-factor authentication is enforced for all Slack workspace members.",
    whyItMatters: "Slack often contains sensitive internal communications; MFA prevents account takeover via credential stuffing.",
    howToPass: [
      "Enable 'Require 2FA' in Slack workspace settings (Settings > Authentication).",
      "Configure SSO with your IdP (Okta, Entra ID, Google) and enforce MFA at the IdP level.",
      "Audit workspace members quarterly to confirm 2FA is active on all accounts.",
      "Remove any members who have not enabled 2FA after grace period.",
      "Document the MFA enforcement in your access control policy."
    ],
    evidence: [
      "Slack workspace 'Require 2FA' setting screenshot",
      "IdP MFA policy applied to Slack application",
      "Quarterly audit report of Slack member 2FA status"
    ],
    commonFailures: [
      "2FA enabled only for admins, not all members",
      "SSO configured but MFA not enforced at IdP level"
    ],
    controlRefs: { iso27001: ["A.8.5"], hipaa: ["164.312(d)"] },
    tool: "Slack"
  },
  {
    id: "CT-ACTSEC-003",
    name: "MFA on Google Workspace",
    category: "Account Security",
    frameworks: ["soc2", "iso27001", "hipaa", "gdpr"],
    description: "Verifies multi-factor authentication is enforced for all Google Workspace users.",
    whyItMatters: "Google Workspace holds email, Drive, and Calendar data; MFA is the primary defense against account compromise.",
    howToPass: [
      "In Google Admin Console, go to Security > 2-Step Verification and enforce it for all org units.",
      "Set enforcement to 'On' with a deployment schedule (e.g., 1 week grace period).",
      "Enable 'Allow users to trust the device' for usability, but require MFA on new devices.",
      "Monitor the 2SV enrollment report weekly until 100% compliance.",
      "Block legacy authentication protocols (IMAP, POP, SMTP) that bypass MFA."
    ],
    evidence: [
      "Google Admin Console 2SV enforcement settings screenshot",
      "2SV enrollment report showing 100% compliance",
      "Legacy protocols blocked confirmation"
    ],
    commonFailures: [
      "MFA enforced only for admins, not all users",
      "App passwords allowed, bypassing MFA for legacy clients"
    ],
    controlRefs: { soc2: ["CC6.1"], iso27001: ["A.8.5"], hipaa: ["164.312(d)"], gdpr: ["Art. 32"] },
    tool: "Google Workspace"
  },
  {
    id: "CT-ACTSEC-004",
    name: "Asana accounts deprovisioned when personnel leave",
    category: "Account Security",
    frameworks: ["soc2", "iso27001", "hipaa"],
    description: "Verifies Asana accounts are disabled or removed within SLA when personnel depart.",
    whyItMatters: "Orphaned Asana accounts retain access to project data and can be exploited by former employees.",
    howToPass: [
      "Integrate Asana with your IdP (Okta, Entra ID) for SCIM provisioning/deprovisioning.",
      "Configure offboarding workflow to disable Asana account within 4 hours of HR termination notice.",
      "Run monthly audit comparing Asana active users vs. current employee directory.",
      "Document the deprovisioning SLA in your access control policy.",
      "Test the workflow quarterly with a test termination."
    ],
    evidence: [
      "SCIM integration configuration screenshot",
      "Offboarding workflow showing Asana disable step",
      "Monthly audit report comparing Asana users vs employee directory"
    ],
    commonFailures: [
      "Manual deprovisioning only, leading to delays",
      "No audit process to catch missed deprovisioning"
    ],
    controlRefs: { soc2: ["CC6.1", "CC6.7"], iso27001: ["A.8.5"], hipaa: ["164.312(d)"] },
    tool: "Asana"
  },
  {
    id: "CT-ACTSEC-005",
    name: "Google Workspace accounts deprovisioned when personnel leave",
    category: "Account Security",
    frameworks: ["soc2", "iso27001", "hipaa"],
    description: "Verifies Google Workspace accounts are suspended or deleted within SLA when personnel depart.",
    whyItMatters: "Former employees with active Google accounts retain access to email, Drive, and internal systems.",
    howToPass: [
      "Use Google Cloud Directory Sync (GCDS) or IdP SCIM to sync employee status to Google Workspace.",
      "Configure offboarding to suspend account within 4 hours (suspend, don't delete, to preserve data for legal hold).",
      "Transfer Drive ownership to manager before deletion.",
      "Monthly audit: compare suspended accounts vs. HR termination list.",
      "Document SLA: suspend within 4 hours, delete after 30 days unless legal hold."
    ],
    evidence: [
      "GCDS/SCIM sync configuration screenshot",
      "Offboarding runbook with Google suspension step",
      "Monthly audit report of suspended vs terminated employees"
    ],
    commonFailures: [
      "Accounts deleted instead of suspended, losing data for e-discovery",
      "No monthly audit, so missed deprovisioning goes undetected"
    ],
    controlRefs: { soc2: ["CC6.1", "CC6.7"], iso27001: ["A.8.5"], hipaa: ["164.312(d)"] },
    tool: "Google Workspace"
  },
  {
    id: "CT-ACTSEC-006",
    name: "Slack accounts deprovisioned when personnel leave",
    category: "Account Security",
    frameworks: ["soc2", "iso27001", "hipaa"],
    description: "Verifies Slack accounts are deactivated within SLA when personnel depart.",
    whyItMatters: "Former employees with Slack access can read channels, DMs, and shared files containing sensitive data.",
    howToPass: [
      "Enable SCIM provisioning from IdP (Okta, Entra ID) to Slack.",
      "Configure offboarding workflow to deactivate Slack account within 4 hours of termination.",
      "Use Slack's 'Deactivate account' API via IdP lifecycle management.",
      "Monthly audit: compare Slack active users vs current employee directory.",
      "Export channel membership for deactivated users for audit trail."
    ],
    evidence: [
      "SCIM configuration in Slack workspace settings",
      "Offboarding workflow with Slack deactivation step",
      "Monthly audit report of Slack active users vs employee directory"
    ],
    commonFailures: [
      "Only workspace admins manually deactivated, causing delays",
      "Guest accounts not included in deprovisioning workflow"
    ],
    controlRefs: { soc2: ["CC6.1", "CC6.7"], iso27001: ["A.8.5"], hipaa: ["164.312(d)"] },
    tool: "Slack"
  },
  {
    id: "CT-ACTSEC-007",
    name: "Supabase accounts deprovisioned when personnel leave",
    category: "Account Security",
    frameworks: ["soc2", "iso27001", "hipaa"],
    description: "Verifies Supabase dashboard and project access are revoked within SLA when personnel depart.",
    whyItMatters: "Supabase provides direct database access; former employees with access can exfiltrate or corrupt production data.",
    howToPass: [
      "Remove departing user from Supabase organization via dashboard or API within 4 hours.",
      "Revoke all personal access tokens and SSH keys associated with the user.",
      "Rotate any shared Supabase service keys the user had access to.",
      "Audit organization members monthly against current employee list.",
      "Document Supabase offboarding in your access control runbook."
    ],
    evidence: [
      "Supabase organization members list screenshot (before/after offboarding)",
      "Offboarding runbook with Supabase removal step",
      "Monthly audit of Supabase org members vs employee directory"
    ],
    commonFailures: [
      "Only dashboard access removed, but personal access tokens still valid",
      "Service keys not rotated after admin departure"
    ],
    controlRefs: { soc2: ["CC6.1", "CC6.7"], iso27001: ["A.8.5"], hipaa: ["164.312(d)"] },
    tool: "Supabase"
  },
  {
    id: "CT-ACTSEC-008",
    name: "MFA on Supabase",
    category: "Account Security",
    frameworks: ["soc2", "iso27001", "hipaa", "gdpr"],
    description: "Verifies multi-factor authentication is enabled for all Supabase organization members.",
    whyItMatters: "Supabase provides direct database and API access; MFA prevents unauthorized infrastructure changes.",
    howToPass: [
      "Enable 'Require MFA' in Supabase Organization Settings > Security.",
      "Ensure all existing members enroll MFA within grace period (7 days).",
      "Configure SSO with your IdP (Okta, Entra ID, GitHub) and enforce MFA at IdP level.",
      "Audit organization members quarterly for MFA enrollment.",
      "Document MFA requirement in your infrastructure access policy."
    ],
    evidence: [
      "Supabase 'Require MFA' setting screenshot",
      "SSO configuration with IdP enforcing MFA",
      "Quarterly audit report of Supabase member MFA status"
    ],
    commonFailures: [
      "MFA enabled but not enforced (optional)",
      "SSO configured but MFA not required at IdP"
    ],
    controlRefs: { soc2: ["CC6.1"], iso27001: ["A.8.5"], hipaa: ["164.312(d)"], gdpr: ["Art. 32"] },
    tool: "Supabase"
  },
  {
    id: "CT-ACTSEC-009",
    name: "MFA on GitHub",
    category: "Account Security",
    frameworks: ["soc2", "iso27001", "hipaa", "gdpr"],
    description: "Verifies multi-factor authentication is enforced for all GitHub organization members.",
    whyItMatters: "GitHub holds source code and deployment keys; compromised accounts lead to supply chain attacks.",
    howToPass: [
      "In GitHub Org Settings > Security, enable 'Require two-factor authentication for all members'.",
      "Set a compliance deadline (e.g., 7 days) for existing members to enroll.",
      "Enable SAML SSO with your IdP (Okta, Entra ID) and enforce MFA at IdP level.",
      "Audit organization members monthly for 2FA enrollment via GitHub's security audit log.",
      "Enable 'Require 2FA for outside collaborators' if applicable."
    ],
    evidence: [
      "GitHub Org 'Require 2FA' setting screenshot",
      "SAML SSO configuration with IdP enforcing MFA",
      "Monthly 2FA compliance audit report from GitHub"
    ],
    commonFailures: [
      "2FA required for members but not outside collaborators",
      "SAML SSO configured but not enforced (allowing password login fallback)"
    ],
    controlRefs: { soc2: ["CC6.1"], iso27001: ["A.8.5"], hipaa: ["164.312(d)"], gdpr: ["Art. 32"] },
    tool: "GitHub"
  },
  {
    id: "CT-ACTSEC-010",
    name: "GitHub accounts deprovisioned when personnel leave",
    category: "Account Security",
    frameworks: ["soc2", "iso27001", "hipaa"],
    description: "Verifies GitHub organization membership is removed within SLA when personnel depart.",
    whyItMatters: "Former employees with GitHub access can push malicious code, access secrets, or delete repositories.",
    howToPass: [
      "Configure SAML SSO with your IdP (Okta, Entra ID) for automatic provisioning/deprovisioning.",
      "Configure offboarding workflow to remove GitHub org membership within 4 hours.",
      "Use GitHub's SCIM API via IdP to automate membership removal.",
      "Audit organization members and outside collaborators monthly vs current employee/contractor list.",
      "Transfer repository ownership from departing user to team before removal."
    ],
    evidence: [
      "SAML SSO and SCIM configuration in GitHub Org settings",
      "Offboarding workflow with GitHub removal step",
      "Monthly audit of GitHub org members vs employee directory"
    ],
    commonFailures: [
      "Only SAML SSO enabled, but SCIM not configured for auto-deprovisioning",
      "Personal repositories not transferred, causing loss of access to code"
    ],
    controlRefs: { soc2: ["CC6.1", "CC6.7"], iso27001: ["A.8.5"], hipaa: ["164.312(d)"] },
    tool: "GitHub"
  }
];

// Helper functions for policy tests
export function generatePolicyTestSteps(policyName: string): string[] {
  return [
    `Draft the ${policyName} from a recognized template (e.g., NIST, ISO, SANS).`,
    `Tailor the policy to your organization's size, industry, and risk profile.`,
    `Review with legal and security stakeholders; incorporate feedback.`,
    `Obtain formal management approval (signed by CISO or equivalent).`,
    `Publish to all staff via intranet, policy portal, or acknowledgment system.`,
    `Require employee acknowledgment within 30 days of publication.`,
    `Schedule annual review; assign owner and calendar reminder.`
  ];
}

export function generateToolDeprovisionSteps(toolName: string, toolUrl: string): string[] {
  return [
    `Integrate ${toolName} with your IdP (Okta, Entra ID) via SCIM or SAML for automated provisioning/deprovisioning.`,
    `Configure offboarding workflow to disable/remove ${toolName} account within 4 hours of HR termination notice.`,
    `Audit ${toolName} active users monthly against current employee/contractor directory.`,
    `Document the deprovisioning SLA (4 hours suspend, 30 days delete) in your access control policy.`,
    `Test the workflow quarterly with a simulated termination.`
  ];
}

export function generateToolMfaSteps(toolName: string): string[] {
  return [
    `Enable 'Require MFA' in ${toolName} organization/workspace settings.`,
    `Configure SSO with your IdP (Okta, Entra ID) and enforce MFA at the IdP level.`,
    `Set a compliance deadline (7 days) for existing users to enroll MFA.`,
    `Audit organization members quarterly for MFA enrollment status.`,
    `Document MFA requirement in your access control policy.`
  ];
}

export function generateToolDeprovisionStepsWithRotation(toolName: string): string[] {
  return [
    `Remove departing user from ${toolName} organization via dashboard or API within 4 hours.`,
    `Revoke all personal access tokens, SSH keys, and API keys associated with the user.`,
    `Rotate any shared service keys, API keys, or secrets the user had access to.`,
    `Audit organization members monthly against current employee list.`,
    `Document ${toolName} offboarding in your access control runbook.`
  ];
}