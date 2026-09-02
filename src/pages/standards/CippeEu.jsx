import LearningFrameworkPage from "../../components/LearningFrameworkPage";

const FRAMEWORK = {
  id: 'cippe-eu',
  name: 'CIPPE/EU - Critical Infrastructure (EU)',
  region: 'European Union',
  flag: "🇪🇺",
  flagAnimation: "pulse",
  basePath: "/cippe/eu",
  color: 'purple',
  weeks: [
    {
      week: 1,
      title: 'Foundation: NIS2 Scope, CER Directive & Security Categories',
      days: 'Days 1-7',
      description: 'Understand NIS2 Directive scope, essential vs important entities, CER Directive, and the 10 security categories',
      tasks: [
        {
          title: 'Determine entity classification under NIS2 Directive',
          control: 'NIS2 Directive (EU) 2022/2555 Art. 3 defines essential entities and important entities across 18 sectors. Essential entities: large/medium in critical sectors (energy, transport, health, banking, etc.). Important entities: medium/small in important sectors (waste management, manufacturing, digital providers).',
          how: 'Classify your organisation: (1) Identify sector from NIS2 Annex I (essential) and Annex II (important), (2) Determine entity size per EU SME criteria (employees, turnover/balance sheet), (3) Map entity to competent authority and CSIRT — each Member State designates authorities, (4) For cloud service providers: qualify as essential entity if offering IaaS/PaaS/SaaS above thresholds, (5) Document classification and notification to competent authority per Art. 7. For multi-cloud, verify each cloud provider is classified — AWS, Azure, GCP are essential entities under NIS2; assess your compliance obligations accordingly.',
          check: 'Entity classification documented, sector identified from NIS2 Annex I/II, competent authority identified, CSIRT contact established, cloud provider NIS2 classification verified, classification reviewed annually.'
        },
        {
          title: 'Map the 10 core NIS2 security measures',
          control: 'NIS2 Art. 21(2) mandates 10 categories of security measures: (a) risk analysis, (b) incident handling, (c) business continuity, (d) supply chain security, (e) acquisition/development/decommissioning, (f) policies for assessment of NIS2 measures, (g) basic cyber hygiene and training, (h) policies on cryptography and encryption, (i) human resources and access control, (j) multi-factor authentication and secured communication',
          how: 'Build control mapping: (1) Create a spreadsheet mapping all 10 Art. 21(2) measures to specific controls in your environment, (2) For each measure, identify applicable tools and processes — e.g. (h) encryption: AWS KMS, Azure Key Vault, GCP Cloud KMS, Alibaba Cloud KMS with customer-managed keys, (3) Map to existing frameworks — NIST 800-53 controls, ISO 27001 Annex A, (4) Separate mapping per environment: production (all 10 measures fully implemented), staging (measures a-f implemented), development (basic measures a, g, i). Document current implementation status for each measure.',
          check: 'All 10 Art. 21(2) measures mapped to specific controls, implementation status documented per measure, multi-cloud controls identified, environment-specific requirements documented, mapping reviewed by DPO and CISO.'
        },
        {
          title: 'Understand CER Directive and critical entity resilience',
          control: 'CER Directive (EU) 2022/2557 covers critical entities resilience across 10 sectors: energy, transport, banking, financial market infrastructure, health, drinking water, waste water, digital infrastructure, public administration, space. Complements NIS2.',
          how: 'Map CER obligations: (1) Identify if entity falls under CER scope, (2) Understand CER requirements: risk assessments, backup governance, crisis management, mutual assistance, (3) Map CER requirements to NIS2 — significant overlap in security measures, (4) For multi-cloud: ensure cloud resilience per CER — AWS Availability Zones, Azure Availability Sets, GCP Regions for geographic redundancy, Alibaba multi-zone deployments. Separate resilience tiers: production (full CER resilience, RPO <1h), staging (backup + DR tested), development (backup only).',
          check: 'CER scope assessment completed, CER requirements mapped to NIS2 obligations, cloud resilience implemented per CER, backup governance documented, crisis management plan tested, resilience validated across all environments.'
        },
        {
          title: 'Establish governance and appoint NIS2 responsible persons',
          control: 'NIS2 Art. 5 requires management body to approve cybersecurity measures, oversee implementation, and be liable for non-compliance. Art. 6 requires cybersecurity risk-management measures at management level.',
          how: 'Implement NIS2 governance: (1) Board resolution approving NIS2 cybersecurity measures, (2) Appoint cybersecurity officer with direct reporting line to board, (3) Establish risk management oversight committee, (4) Document management liability — Art. 20 imposes personal liability on management for non-compliance, (5) For multi-cloud: appoint cloud security officers per provider — AWS security governance, Azure security governance, GCP security governance, Alibaba security governance. Define escalation paths per environment: production (immediate board notification), staging (CISO notification), development (team lead notification).',
          check: 'Board resolution documented, cybersecurity officer appointed, risk committee established, management liability acknowledged, cloud security officers assigned, governance structure documented, annual board cybersecurity review scheduled.'
        },
        {
          title: 'Register with competent authority and CSIRT',
          control: 'NIS2 Art. 7 requires essential and important entities to notify competent authorities of their EU operations. Essential entities: upon request. Important entities: upon request. Both must cooperate with authorities.',
          how: 'Complete registration: (1) Identify competent authority for your sector — each Member State designates authorities per NIS2 Art. 8, (2) Register entity with authority — provide entity details, sector, size, digital services offered, (3) Establish CSIRT communication channel — each Member State designates CSIRT, (4) For multi-cloud: register all cloud service provider relationships, (5) Document registration in compliance register. Coordinate cross-border: if operating in multiple Member States, comply with authority in each state where services are provided (Art. 22).',
          check: 'Registration completed with competent authority, CSIRT contact established, cross-border obligations documented, registration maintained and updated, compliance register updated with NIS2 registration details.'
        }
      ]
    },
    {
      week: 2,
      title: 'Implementer: NIS2 Security Measures, Supply Chain & Incident Reporting',
      days: 'Days 8-14',
      description: 'Implement the 10 NIS2 security measures, supply chain security, and incident reporting procedures',
      tasks: [
        {
          title: 'Implement risk analysis and incident handling measures',
          control: 'NIS2 Art. 21(2)(a) risk analysis and (b) incident handling — comprehensive risk assessment and incident response including detection, analysis, containment, recovery, lessons learned',
          how: 'Deploy risk and incident handling: (1) Risk analysis — use NIST 800-30 methodology, map risks to Art. 21 measures, (2) Incident handling — build detection pipeline: AWS GuardDuty + CloudTrail, Azure Sentinel + Activity Log, GCP Chronicle + Audit Log, Alibaba Threat Detection + ActionTrail, (3) Implement incident classification per NIS2 severity levels, (4) Build incident response playbook with clear escalation paths. Separate incident handling: production (immediate response, 15-minute triage), staging (coordinated response, 1-hour triage), development (standard response, 4-hour triage). Test all procedures quarterly.',
          check: 'Risk assessment completed per Art. 21, incident handling procedures documented, detection pipeline operational on all clouds, incident classification scheme implemented, IR playbook tested quarterly, lessons learned documented after each incident.'
        },
        {
          title: 'Implement supply chain security per Art. 21(2)(d)',
          control: 'NIS2 Art. 21(2)(d) requires security of supply chain — each entity must ensure the security of the supply chain and the security of the network and information systems directly related to the services provided by the entity.',
          how: 'Build supply chain security: (1) Inventory all ICT service providers — cloud (AWS, Azure, GCP, Alibaba), managed services, software vendors, (2) Tier vendors by criticality and NIS2 compliance status, (3) Require contractual security obligations — NIS2 Art. 21 measures, audit rights, incident notification, (4) Assess vendor security: SOC 2 Type II, ISO 27001, NIS2 compliance attestation, (5) For cloud providers: review shared responsibility models, verify cloud provider NIS2 compliance — AWS, Azure, GCP are essential entities. Implement SBOM requirements for software suppliers. Production: all Tier 1 vendors assessed, staging: Tier 1 and 2, development: Tier 1 only.',
          check: 'Supply chain register completed, vendor tiers assigned, contractual security clauses included, vendor assessments completed for Tier 1, SBOM collection initiated, cloud provider compliance verified, supply chain risk register maintained.'
        },
        {
          title: 'Configure 24-hour early warning and 72-hour notification',
          control: 'NIS2 Art. 23(3): early warning within 24 hours, notification within 72 hours, final report within 1 month. Essential entities must report significant incidents. Important entities report significant incidents upon authority request.',
          how: 'Build incident reporting workflow: (1) Define "significant incident" criteria per NIS2 Art. 23(3) — causes or is likely to cause severe operational disruption, financial loss, or harm to natural/legal persons, (2) Set up 24-hour early warning system: automated alert when incident exceeds severity threshold, (3) Build reporting templates: early warning (24h), incident notification (72h), final report (1 month), (4) Assign reporting responsibilities — who reports to CSIRT, who reports to competent authority, (5) For multi-cloud: ensure detection across all clouds triggers unified reporting. Test reporting procedure with tabletop exercise quarterly. Document all incidents and reporting timeline.',
          check: '24-hour early warning procedure documented and tested, 72-hour notification template prepared, 1-month final report template prepared, severity thresholds defined, reporting responsibilities assigned, quarterly tabletop exercise completed, all incidents logged with timeline.'
        },
        {
          title: 'Implement encryption, MFA, and access control measures',
          control: 'NIS2 Art. 21(2)(h) cryptography and encryption + (j) multi-factor authentication + (i) human resources and access control — must implement policies on encryption, MFA for critical systems, and access management',
          how: 'Deploy security controls: (1) Encryption — AWS KMS with CMKs, Azure Key Vault HSM, GCP Cloud KMS, Alibaba KMS — data at rest (AES-256) and in transit (TLS 1.3), (2) MFA — mandatory for all production and privileged access: AWS IAM MFA, Azure AD Conditional Access, GCP IAP, (3) Access control — least privilege per environment: production (MFA + PAM + device check), staging (MFA + PAM), development (MFA), (4) Key management — automated key rotation 90-day cycle, split-key ceremonies for production encryption keys. Implement zero-trust access — no implicit trust based on network location.',
          check: 'Encryption at rest and in transit for all data, MFA enforced for production and privileged access, least privilege implemented per environment, key rotation automated, zero-trust access policies deployed, access reviews conducted quarterly.'
        },
        {
          title: 'Establish business continuity and crisis management',
          control: 'NIS2 Art. 21(2)(c) business continuity and crisis management — backup governance, disaster recovery, crisis management procedures, crisis communications',
          how: 'Implement BC/CM: (1) Backup governance — AWS S3 Cross-Region Replication, Azure Site Recovery, GCP Multi-Region Storage, Alibaba CRR, (2) Test recovery: production RTO <4h RPO <1h, staging RTO <24h, development RTO <48h, (3) Crisis management plan: escalation matrix, stakeholder communication, media response, (4) Test crisis communication — internal (Teams/Slack), external (customers, regulators), CSIRT notification. For multi-cloud, implement cross-cloud DR: primary on AWS, DR on Azure, with automated failover. Quarterly tabletop exercises testing crisis management procedures.',
          check: 'Backup governance documented, recovery tested per environment, crisis management plan documented, communication templates prepared, cross-cloud DR tested, quarterly tabletop exercises completed, recovery objectives met.'
        }
      ]
    },
    {
      week: 3,
      title: 'Verifier: Compliance Auditing, Security Testing & Validation',
      days: 'Days 15-21',
      description: 'Assess NIS2 compliance, audit security measures, test incident response, and validate controls across environments',
      tasks: [
        {
          title: 'Conduct NIS2 compliance audit against Art. 21 measures',
          control: 'NIS2 Art. 21(2) all 10 security measures must be audited. Art. 26 allows Member States to require audits by qualified auditors or state authorities.',
          how: 'Perform compliance audit: (1) Audit all 10 Art. 21(2) measures against implementation, (2) Use NIS2 compliance checklist per sector, (3) Test controls in production first, then staging, then development, (4) For multi-cloud: audit each cloud provider independently — AWS compliance reports (SOC 2, ISO 27001), Azure Service Trust Portal, GCP Compliance Resource Center, Alibaba compliance documentation, (5) Document audit findings, gaps, and remediation plan. Use external auditor for independent validation if required by Member State.',
          check: 'All 10 Art. 21(2) measures audited, gaps documented with severity rating, remediation plan with timelines, multi-cloud compliance verified, external audit completed if required, audit findings reported to board, remediation tracked to closure.'
        },
        {
          title: 'Test incident response with NIS2 reporting validation',
          control: 'NIS2 Art. 23 reporting requirements must be tested — 24-hour early warning, 72-hour notification, 1-month final report. Testing validates detection-to-reporting workflow.',
          how: 'Run incident response test: (1) Simulate significant incident in staging environment, (2) Test detection pipeline — verify all cloud provider alerts (AWS GuardDuty, Azure Sentinel, GCP Chronicle, Alibaba Threat Detection) trigger within 15 minutes, (3) Test 24-hour early warning generation — draft and send simulated CSIRT notification, (4) Test 72-hour notification — compile incident details, affected systems, impact assessment, (5) Test 1-month final report — document root cause, remediation, lessons learned. Include cross-border notification if operating in multiple Member States (Art. 22). Document all timing and improve response speed.',
          check: 'Incident response test completed, 24-hour early warning generated and validated, 72-hour notification compiled, 1-month report template tested, cross-border notification tested, all cloud provider alerts validated, test results documented with improvement actions.'
        },
        {
          title: 'Validate supply chain security and third-party compliance',
          control: 'NIS2 Art. 21(2)(d) supply chain security + Art. 21(2)(e) acquisition/development/decommissioning security — third-party compliance must be validated',
          how: 'Audit supply chain: (1) Verify Tier 1 vendor NIS2 compliance — request NIS2 compliance attestations, (2) Review contractual security clauses — ensure NIS2 obligations flow down to suppliers, (3) Test supplier incident notification — can vendor notify you within 24 hours of a significant incident, (4) Validate SBOM completeness for critical software, (5) For cloud providers: verify each provider\'s NIS2 compliance — AWS, Azure, GCP are essential entities, review their compliance documentation. Audit production supply chain (all tiers), staging (Tier 1-2), development (Tier 1 only).',
          check: 'Tier 1 vendor attestations collected, contractual clauses verified, supplier notification tested, SBOMs validated, cloud provider compliance verified, supply chain audit documented, annual re-assessment scheduled.'
        },
        {
          title: 'Assess security measures effectiveness per ENISA guidance',
          control: 'ENISA provides NIS2 implementation guidance and assessment methodologies. Art. 26 allows use of certified auditors. ENISA supports cross-border cooperation and benchmarking.',
          how: 'Use ENISA guidance: (1) Reference ENISA NIS2 Implementation Guide for assessment methodology, (2) Benchmark against ENISA security measures baseline, (3) Assess each Art. 21(2) measure against ENISA maturity levels, (4) For multi-cloud: assess cloud security posture using ENISA cloud security guidelines, (5) Identify improvement opportunities using ENISA good practices. Compare posture across environments: production should achieve ENISA maturity Level 3 (repeatable), staging Level 2 (managed), development Level 1 (initial). Document assessment results and improvement roadmap.',
          check: 'ENISA guidance referenced in assessment, maturity levels documented per measure, cloud security assessed per ENISA guidelines, improvement roadmap documented, benchmarked against industry peers, annual ENISA-aligned assessment scheduled.'
        },
        {
          title: 'Validate encryption and access control implementation',
          control: 'NIS2 Art. 21(2)(h) + (i) + (j) — encryption, access control, and MFA must be validated through testing and audit',
          how: 'Validate security controls: (1) Encryption audit — verify TLS 1.3 on all endpoints, AES-256 at rest, key rotation working, no plaintext secrets in code or config, (2) MFA validation — attempt production access without MFA (should fail), test privileged access without PAM (should fail), (3) Access control audit — review all production access, verify least privilege, test role-based access, (4) For multi-cloud: validate encryption across AWS KMS, Azure Key Vault, GCP Cloud KMS, Alibaba KMS. Production: full validation, staging: spot checks, development: quarterly audit.',
          check: 'Encryption audit completed with no critical findings, MFA enforcement verified, access control audit completed, least privilege validated, key rotation working, secrets management audited, findings remediated within SLA.'
        }
      ]
    },
    {
      week: 4,
      title: 'Certified: Multi-Cloud Controls, ENISA Coordination & Certification',
      days: 'Days 22-28',
      description: 'Deploy multi-cloud NIS2 controls, establish cross-border coordination with ENISA, and achieve compliance certification',
      tasks: [
        {
          title: 'Implement multi-cloud NIS2 security controls',
          control: 'NIS2 applies to all digital service providers in EU. Multi-cloud implementations must meet NIS2 Art. 21 measures across all providers — AWS, Azure, GCP, Alibaba Cloud.',
          how: 'Deploy unified NIS2 controls: (1) AWS — implement Art. 21 measures via AWS Config Rules, Security Hub, GuardDuty, KMS with CMKs, IAM policies with MFA, (2) Azure — Defender for Cloud, Sentinel, Key Vault HSM, Conditional Access, Azure Policy, (3) GCP — Security Command Center, Chronicle, Cloud KMS, Identity-Aware Proxy, Org Policies, (4) Alibaba — Security Center, ActionTrail, KMS, RAM policies. Implement unified compliance scoring: production (all 10 Art. 21 measures fully implemented, ≥90% compliance), staging (measures a-f, 80% compliance), development (baseline measures, 70% compliance). Use CSPM for cross-cloud visibility.',
          check: 'NIS2 controls implemented on all four clouds, unified compliance dashboard operational, production compliance ≥90%, staging ≥80%, development ≥70%, CSPM deployed, automated compliance scoring configured.'
        },
        {
          title: 'Establish cross-border coordination and ENISA cooperation',
          control: 'NIS2 Art. 22 (cooperation between Member States), Art. 35-36 (ENISA role in support and cooperation), Art. 29 (CSIRT network), Art. 33 (cooperation groups)',
          how: 'Build cross-border capabilities: (1) Identify all Member States where you operate and register with competent authorities in each, (2) Establish CSIRT communication channels in each state, (3) Join CSIRT network cooperation — participate in Art. 29 CSIRT network activities, (4) Reference ENISA guidance for cross-border incident handling, (5) For multi-cloud: ensure cloud providers offer EU data residency options — AWS EU regions, Azure EU regions, GCP EU regions, Alibaba Cloud EU presence. Implement cross-border incident notification: if incident affects multiple Member States, coordinate notification through home-state authority (Art. 22).',
          check: 'Registration completed in all operating Member States, CSIRT channels established, cross-border notification procedure documented, ENISA guidance integrated, EU data residency implemented, annual cross-border exercise completed.'
        },
        {
          title: 'Integrate NIS2 with ISO 27001 and other frameworks',
          control: 'NIS2 compliance can leverage existing certifications: ISO 27001, SOC 2, TISAX. Art. 26 allows use of certification schemes. Cross-framework integration reduces duplicate control effort.',
          how: 'Build integrated framework: (1) Map NIS2 Art. 21(2) measures to ISO 27001 Annex A controls — significant overlap in risk management, access control, encryption, incident handling, (2) Map to SOC 2 Trust Service Criteria, (3) Use ISO 27001 ISMS as foundation for NIS2 compliance, (4) Implement shared evidence collection: ISO 27001 audit evidence supports NIS2 compliance, (5) For multi-cloud: use cloud provider ISO 27001 certifications as evidence of cloud NIS2 compliance. Produce unified compliance report covering NIS2, ISO 27001, and sector-specific requirements.',
          check: 'NIS2-ISO 27001 mapping complete, SOC 2 mapping complete, shared evidence collection configured, unified compliance report produced, audit-ready documentation prepared, annual integrated audit planned.'
        },
        {
          title: 'Implement continuous monitoring and improvement programme',
          control: 'NIS2 Art. 21(2)(f) policies for assessment — entities must regularly assess the effectiveness of their security measures. Art. 21(2)(g) basic cyber hygiene — ongoing training and awareness.',
          how: 'Build continuous programme: (1) Continuous monitoring — CSPM dashboards for real-time compliance scoring, automated alerts for control drift, (2) Monthly compliance reports per environment, (3) Quarterly assessment of Art. 21(2) measures against ENISA benchmarks, (4) Annual maturity assessment — track progress against NIS2 maturity model, (5) Training programme: quarterly phishing simulations, role-based training, board cybersecurity briefings. For multi-cloud: unified monitoring across AWS, Azure, GCP, Alibaba with cross-cloud correlation. Implement automated compliance remediation for common drift issues.',
          check: 'Continuous monitoring operational, monthly compliance reports produced, quarterly assessments completed, annual maturity assessment documented, training programme operational, automated remediation configured and tested.'
        },
        {
          title: 'Prepare for NIS2 supervisory measures and audits',
          control: 'NIS2 Art. 27 supervisory measures — competent authorities can conduct audits, request information, issue binding instructions. Art. 32 (harmonisation of administrative fines). Prepare for regulatory scrutiny.',
          how: 'Prepare for supervision: (1) Document all NIS2 compliance evidence in organised GRC platform, (2) Prepare audit response package: entity classification, governance structure, Art. 21(2) implementation evidence, incident reporting records, supply chain assessments, (3) Conduct internal pre-audit using NIS2 audit checklist, (4) Prepare management response — board-approved security measures, liability mitigation documentation, (5) For multi-cloud: compile cloud provider compliance documentation, shared responsibility documentation, cross-cloud security posture report. Production: audit-ready, staging: evidence complete, development: baseline documented.',
          check: 'Audit response package prepared, all evidence organised in GRC, internal pre-audit completed, management response documented, multi-cloud compliance documentation compiled, remediation of pre-audit findings completed, regulatory liaison contact established.'
        }
      ]
    }
  ],
  milestones: [
    { day: 7, label: 'NIS2 Scope & Classification', color: 'purple' },
    { day: 14, label: 'Security Measures Implemented', color: 'blue' },
    { day: 21, label: 'Audit & Validation Complete', color: 'green' }
  ],
  referenceUrl: 'https://digital-strategy.ec.europa.eu/en/policies/nis2-directive'
};

export default function CippeEu() {
  return <LearningFrameworkPage framework={FRAMEWORK} />;
}

export { FRAMEWORK };
