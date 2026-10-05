# AICPA SOC 2 System Description Template — Complete Reference (Bullet Points)

> **Use this bullet-point template** — copy into your document editor, fill in each section, attach diagrams as appendices. Follows the AICPA SOC 2 Guide structure exactly.

---

## Section 1: System Overview

### 1.1 Organization Background
- Organization legal name:
- DBA/trade name (if different):
- Headquarters address:
- Year founded:
- Ownership structure (public/private/parent company):
- Industry/NAICS code:
- Number of employees:

### 1.2 Services Provided
- Primary service offerings:
- Service delivery model (SaaS / PaaS / IaaS / Managed Services):
- Geographic markets served:
- Key customers/segments:

### 1.3 System Purpose & Scope
- System name/identifier:
- System purpose:
- Boundaries (what's IN scope):
- What's OUT of scope (and why):
- Trust Services Criteria applicability:
  - ☐ Security (Common Criteria — REQUIRED)
  - ☐ Availability
  - ☐ Processing Integrity
  - ☐ Confidentiality
  - ☐ Privacy

### 1.4 Principal Service Commitments & System Requirements
- Contractual commitments to customers (SLAs, uptime, response times):
- Regulatory/legal requirements (GDPR, HIPAA, PCI-DSS, etc.):
- Industry standards adopted (ISO 27001, NIST CSF, etc.):
- Internal policies driving system requirements:

---

## Section 2: System Components

### 2.1 Infrastructure
- Cloud provider(s): AWS / Azure / GCP / Alibaba / On-prem
- Regions/AZs used:
- VPC/VNet architecture:
- Compute (EC2 / VMs / Containers / Serverless):
- Databases (RDS / Azure SQL / Cloud SQL / DynamoDB / CosmosDB):
- Storage (S3 / Blob / GCS / Block storage):
- Network (Load balancers, CDN, DNS, VPN / Direct Connect):
- Security services (WAF, Shield, GuardDuty, Security Center, etc.):

### 2.2 Software
- Application stack (languages, frameworks, versions):
- Key third-party libraries / SaaS dependencies:
- CI/CD pipeline (GitHub Actions / GitLab CI / Azure DevOps / CodePipeline):
- Infrastructure as Code (Terraform / CloudFormation / CDK / Pulumi):
- Monitoring / Observability stack:

### 2.3 People
- Organizational chart (roles relevant to system):
- Key personnel (Security Officer, CTO, DPO, System Owners):
- Background check requirements:
- Security training program:
- Onboarding / offboarding procedures:

### 2.4 Procedures
- Change management process:
- Incident response procedures:
- Access provisioning / deprovisioning:
- Backup & recovery procedures:
- Vulnerability management:
- Capacity planning:

### 2.5 Data
- Data classification schema (Public / Internal / Confidential / Restricted):
- Data flow diagrams (ingress / egress / internal):
- Data retention schedules:
- Encryption (at rest: AES-256, in transit: TLS 1.3):
- Key management (KMS / HSM, rotation, access):
- Data backup & recovery:

---

## Section 3: System Boundaries & Interfaces

### 3.1 System Boundary Diagram
- [Attach network diagram showing trust zones, DMZ, app tier, data tier]
- In-scope components (list):
- Out-of-scope components (list with justification):

### 3.2 System Interfaces
- Customer-facing APIs (endpoints, auth, rate limits):
- Internal service-to-service APIs (mTLS, auth):
- Third-party integrations (vendor, name, data exchanged, auth):
- Data imports/exports (scheduled, ad-hoc, format, encryption):
- Human interfaces (admin console, user portal, support tools):

---

## Section 4: Complementary User Entity Controls (CUECs)

### 4.1 CUEC Identification
- For each Trust Services Criterion, identify controls the USER ENTITY must implement:

**Example CUECs:**
- Security: Customer must enforce MFA for their users accessing the system
- Security: Customer must review access quarterly
- Availability: Customer must define their RTO/RPO requirements
- Confidentiality: Customer must classify their data before upload
- Privacy: Customer must obtain consent from data subjects
- Processing Integrity: Customer must validate input data before submission

### 4.2 CUEC Communication
- Where CUECs are communicated to customers (contract, portal, docs):
- How changes to CUECs are notified:

---

## Section 5: Complementary Subservice Organization Controls (CSOCs)

### 5.1 Subservice Organizations
- Subservice org 1 (e.g., AWS): Controls inherited (physical security, network, hypervisor)
- Subservice org 2 (e.g., Stripe): Payment processing controls
- Subservice org 3 (e.g., SendGrid): Email delivery controls
- Subservice org 4 (e.g., Auth0): Identity management controls

### 5.2 CSOC Monitoring
- How you monitor subservice org compliance (SOC 2 reports reviewed annually):
- Carve-out vs. inclusive method for each subservice org:

---

## Section 6: Control Environment

### 6.1 Organization & Governance
- Tone at the top / management philosophy:
- Board / Audit committee oversight:
- Organizational structure for security/privacy:

### 6.2 Risk Assessment Process
- Risk assessment methodology (annual, triggers):
- Risk appetite / tolerance:
- Risk register location:

### 6.3 Monitoring Activities
- Ongoing monitoring (SIEM, dashboards, reviews):
- Separate evaluations (internal audit, pen testing):
- Deficiency remediation tracking:

### 6.4 Information & Communication
- Policy repository & version control:
- Security awareness training program:
- Whistleblower / ethics hotline:

---

## Section 7: Appendices
- 7.1 System Boundary Diagram (attach)
- 7.2 Data Flow Diagram (attach)
- 7.3 Network Architecture Diagram (attach)
- 7.4 Subservice Organization List & Carve-out / Inclusive Method
- 7.5 CUEC List (complete)
- 7.6 Key Management Inventory
- 7.7 Glossary of Terms

---

## ✅ Instructions for Completion
1. Copy this template to your document editor
2. Complete ALL sections — auditors will verify each
3. Attach diagrams as Appendix items (not inline)
4. Have Security Lead and CTO review before auditor delivery
5. Update annually or after material system changes
6. Keep version history with change log

---

*Template follows the AICPA SOC 2 Guide structure exactly. All sections are required for a complete System Description.*
