import LearningFrameworkPage from "../../components/LearningFrameworkPage.jsx";

const FRAMEWORK = {
  id: "iso-27017",
  name: "ISO/IEC 27017:2015 Cloud Security Controls",
  color: "cyan",
  region: "Global",
  flag: "☁️",
  flagAnimation: "float",
  basePath: "/iso/27017",
  referenceUrl: "https://www.iso.org/standard/43757",
  weeks: [
    {
      week: 1,
      title: "L1 Foundation: Cloud Security Context & Shared Responsibility",
      days: "Days 1-7",
      description:
        "Establish cloud security governance foundations, understand shared responsibility models, and define scope for cloud-specific controls.",
      tasks: [
        {
          title: "Define Cloud Security Scope & Shared Responsibility",
          control: "ISO/IEC 27017 Clause 4.3 - Scope & Shared Responsibility Model",
          how: "Document cloud deployment models in use (IaaS, PaaS, SaaS) and service models. Map shared responsibility for each: CSP responsibilities vs. customer responsibilities. Define scope boundaries for cloud assets: virtual networks, identity systems, data stores, workloads, management planes. Produce a formal cloud scope statement approved by cloud governance board.",
          check: "Cloud scope statement defines all cloud services in scope, shared responsibility matrix documented per service model, and approved by cloud governance."
        },
        {
          title: "Analyze Cloud-Specific Threat Landscape",
          control: "ISO/IEC 27017 Clause 6.1.2 - Cloud Risk Assessment",
          how: "Assess cloud-specific threats: hypervisor escape, container breakout, control plane compromise, credential theft, data exfiltration via cloud APIs, misconfiguration, supply chain (marketplace images), insider threat at CSP, cross-tenant attacks. Use MITRE ATT&CK for Cloud matrix. Document risk register with cloud-specific scenarios.",
          check: "Cloud risk register covers all deployment models, MITRE ATT&CK for Cloud techniques mapped, risk owners assigned, and register reviewed monthly."
        },
        {
          title: "Establish Cloud Governance & Policy Framework",
          control: "ISO/IEC 27017 Clause 5.2 - Cloud Security Policy",
          how: "Create cloud security policy hierarchy: Cloud Security Policy (approved by CISO), topic-specific policies (Cloud Identity & Access, Cloud Network Security, Cloud Data Protection, Cloud Workload Security, Cloud Incident Response, CSP Management). Address: cloud tagging standards, environment separation (dev/stage/prod), IaC security, CSP contract governance.",
          check: "Cloud Security Policy approved, topic-specific policies cover all cloud domains, policies enforced via policy-as-code (OPA, Cloud Custodian), and compliance monitored continuously."
        },
        {
          title: "Map CSP Contracts & Compliance Requirements",
          control: "ISO/IEC 27017 Clause 15.1.2 - CSP Contractual Agreements",
          how: "Review all CSP contracts for: data processing terms, security SLAs, incident notification timelines, right to audit, data portability, exit assistance, sub-processor management, compliance certifications (SOC 2, ISO 27001, FedRAMP). Create CSP register with contract terms, expiration, renewal triggers, and compliance evidence.",
          check: "CSP register complete with all contracts, security terms documented, audit rights verified, and renewal calendar maintained."
        }
      ]
    },
    {
      week: 2,
      title: "L2 Implementer: Cloud Control Implementation",
      days: "Days 8-14",
      description:
        "Implement cloud-specific controls for identity, network, data, workloads, and operations across multi-cloud environments.",
      tasks: [
        {
          title: "Implement Cloud Identity & Access Management",
          control: "ISO/IEC 27017 Clause 9.2.1 - Cloud Identity Management",
          how: "Implement cloud IAM: centralized identity provider (Entra ID, Okta, Ping) with SCIM provisioning, conditional access policies, PIM/PAM for privileged cloud roles, workload identities (managed identities, service principals), cross-account roles with least privilege, permission boundaries, access analyzer for unused permissions. Enforce MFA for all human and service identities.",
          check: "Central IdP integrated with all CSPs, conditional access enforced, PIM for all admin roles, workload identities used (no static keys), and access reviews quarterly."
        },
        {
          title: "Implement Cloud Network Security Controls",
          control: "ISO/IEC 27017 Clause 13.1.1 - Cloud Network Controls",
          how: "Implement cloud network segmentation: VPC/VNet design with multiple tiers, private subnets for data/workloads, NAT gateways for egress, transit gateway/hub-spoke for multi-VPC, security groups as default deny, NACLs for subnet-level, VPC endpoints for private service access, DDoS protection (AWS Shield, Azure DDoS), network firewalls (AWS Network Firewall, Azure Firewall), traffic mirroring for IDS.",
          check: "Network segmentation implemented per environment, default deny security groups, private connectivity for all PaaS services, DDoS protection enabled, and network flow logs analyzed."
        },
        {
          title: "Implement Cloud Data Protection & Encryption",
          control: "ISO/IEC 27017 Clause 10.1.1 - Cloud Data Protection",
          how: "Implement cloud data protection: encryption at rest (CSP-managed KMS + customer-managed keys/CMK), encryption in transit (TLS 1.2+ enforced via policies), key management (automatic rotation, key policies, cross-region replication), data classification tagging, DLP policies for cloud storage (S3, Blob, GCS), database encryption (TDE, Always Encrypted), backup encryption, snapshot encryption.",
          check: "All cloud storage encrypted with CMK, key rotation automated, DLP policies active with alerting, data classification tags applied, and backup/snapshot encryption verified."
        },
        {
          title: "Implement Cloud Workload & Container Security",
          control: "ISO/IEC 27017 Clause 12.1.1 - Cloud Workload Protection",
          how: "Implement workload security: CSPM (Wiz, Prisma Cloud, Defender for Cloud) for misconfiguration detection, CWPP for runtime protection, container image scanning (Trivy, Snyk, Aqua) in CI/CD, admission controllers (OPA Gatekeeper, Kyverno), runtime security (Falco, Sysdig), immutable infrastructure (no SSH, deploy via IaC), vulnerability management with SLAs, drift detection.",
          check: "CSPM/CWPP deployed across all cloud accounts, image scanning in all pipelines, admission controllers enforcing policies, runtime alerts tuned, and vulnerability SLAs met."
        }
      ]
    },
    {
      week: 3,
      title: "L3 Operations: Cloud Monitoring, Incident Response & CSP Management",
      days: "Days 15-21",
      description:
        "Operationalize cloud security monitoring, incident response for cloud environments, and ongoing CSP governance.",
      tasks: [
        {
          title: "Implement Cloud Security Monitoring & Detection",
          control: "ISO/IEC 27017 Clause 12.4.1 - Cloud Event Logging & Monitoring",
          how: "Enable cloud audit logs: CloudTrail (AWS), Activity Log (Azure), Cloud Audit Logs (GCP) for all regions/services. Centralize logs to SIEM (Sentinel, Splunk, Datadog). Implement detection rules for: suspicious API calls, privilege escalation, data exfiltration, crypto mining, container escapes, IaC changes. Enable CSP-native threat detection (GuardDuty, Defender for Cloud, Security Command Center).",
          check: "All cloud audit logs centralized, detection rules deployed with <5% false positive rate, CSP-native threat detection enabled, and mean time to detect < 1 hour for critical alerts."
        },
        {
          title: "Establish Cloud Incident Response Playbooks",
          control: "ISO/IEC 27017 Clause 16.1.1 - Cloud Incident Management",
          how: "Create cloud-specific IR playbooks: compromised credentials (revoke, rotate, investigate), compromised workload (isolate, snapshot, analyze), data exfiltration (contain, assess, notify), CSP security event (engage CSP, verify scope), supply chain compromise (assess blast radius). Test via cloud purple team exercises. Integrate with CSP incident notification APIs.",
          check: "Cloud IR playbooks documented and tested quarterly, purple team exercises completed, CSP notification integration tested, and MTTR < 4 hours for critical cloud incidents."
        },
        {
          title: "Implement CSP Ongoing Governance & Review",
          control: "ISO/IEC 27017 Clause 15.2.1 - CSP Monitoring & Review",
          how: "Establish ongoing CSP governance: quarterly CSP security posture reviews (SOC 2, certifications, penetration tests), CSP incident notification monitoring, sub-processor change tracking, contract compliance verification, CSP feature adoption risk assessment, exit readiness assessment (data portability, egress costs, migration complexity).",
          check: "Quarterly CSP reviews completed, sub-processor changes tracked, exit readiness assessed annually, and CSP risk register updated."
        },
        {
          title: "Implement Cloud Compliance Automation & Reporting",
          control: "ISO/IEC 27017 Clause 9.1.1 - Cloud Access Control & Compliance",
          how: "Automate compliance: policy-as-code (OPA, Terraform Sentinel, Cloud Custodian) for continuous compliance, compliance dashboards (CIS Benchmarks, PCI DSS, NIST, ISO 27001 mappings), automated evidence collection for audits, drift detection with auto-remediation, compliance scoring per account/subscription/project, executive compliance reporting.",
          check: "Policy-as-code covers 100% of critical controls, compliance dashboards real-time, evidence collection automated for audits, and executive reports generated monthly."
        }
      ]
    },
    {
      week: 4,
      title: "L4 Maturity: Cloud Security Optimization & Advanced Threat Protection",
      days: "Days 22-28",
      description:
        "Advance cloud security maturity with advanced threat protection, zero trust, and continuous optimization.",
      tasks: [
        {
          title: "Implement Zero Trust Architecture for Cloud",
          control: "ISO/IEC 27017 & NIST 800-207 - Zero Trust for Cloud",
          how: "Implement zero trust: verify explicitly (identity, device, location), least privilege access (just-in-time, just-enough), assume breach (micro-segmentation, encryption everywhere). Deploy: identity-aware proxies (BeyondCorp, Entra Private Access), device trust (MDM compliance), workload identity federation (SPIFFE/SPIRE), service mesh (Istio, Linkerd) for mTLS, continuous authorization (OPA).",
          check: "Zero trust architecture deployed for critical cloud workloads, all access verified explicitly, micro-segmentation enforced, and continuous authorization operational."
        },
        {
          title: "Advanced Threat Protection & Threat Hunting",
          control: "ISO/IEC 27017 Clause 12.2.1 - Cloud Malware Protection",
          how: "Deploy advanced threat protection: cloud-native EDR/XDR (Defender for Endpoint, CrowdStrike Falcon, SentinelOne), threat hunting program (hypothesis-driven, MITRE ATT&CK for Cloud), deception technology (canaries, honeypots in cloud), UEBA for cloud identities, automated response (SOAR playbooks for containment).",
          check: "EDR/XDR on 100% of cloud workloads, monthly threat hunts completed, deception deployed in all environments, UEBA tuned, and SOAR playbooks for top 10 scenarios."
        },
        {
          title: "Cloud Security Posture Optimization & Cost Governance",
          control: "ISO/IEC 27017 - Continuous Improvement",
          how: "Optimize posture: CSPM rule tuning to reduce noise, compliance drift remediation automation, security debt tracking and prioritization, cloud security cost optimization (rightsizing security tools, reserved instances for security workloads), security chaos engineering (Gremlin, Chaos Mesh) for resilience testing.",
          check: "CSPM noise reduced >50%, security debt backlog prioritized and tracked, security tool costs optimized, and quarterly chaos engineering experiments conducted."
        },
        {
          title: "Cloud Security Maturity Assessment & Roadmap",
          control: "Organizational Cloud Security Maturity",
          how: "Assess cloud security maturity using CSA CCM, NIST CSF, or custom model across: identity, network, data, workload, operations, governance. Score 1-5 per domain. Create 12-month roadmap with quarterly milestones. Executive sponsorship and budget allocation.",
          check: "Maturity assessment baseline established, roadmap with quarterly milestones approved, budget allocated, and progress tracked monthly."
        }
      ]
    }
  ],
};

export default function Iso27017Page() {
  return (
    <>
      <LearningFrameworkPage framework={FRAMEWORK} />
    </>
  );
}

export { FRAMEWORK };