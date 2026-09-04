// GRC Knowledge Base — policies, controls, audit observations, GRC rebuttals,
// contract clauses, cross-framework discrepancies, and a vendor clause builder.
// Authored to be practically accurate for GRC / security teams.

export const FRAMEWORK_KB = {
  soc2: {
    id: 'soc2',
    name: 'SOC 2',
    color: '#6366f1',
    desc: 'Trust Services Criteria (TSC) — an attestation report clients and buyers rely on for service organisations.',
    policies: [
      { area: 'Access Management', controls: ['CC6.1–6.3 — user provisioning, least privilege, periodic access reviews', 'CC6.6 — authentication (incl. MFA)', 'CC6.7 — timely deprovisioning'], note: 'Type II needs evidence of reviews across the entire period, not a single snapshot.' },
      { area: 'Change Management', controls: ['CC8.1 — change types, approval, testing, back-out', 'CC8.1 — emergency changes & segregation of duties'], note: 'Emergency changes bypassing approval are a top finding unless documented.' },
      { area: 'Incident Response & Monitoring', controls: ['CC7.2–7.4 — monitoring, incident response, resolution & communication', 'CC7.3 — evaluation of anomalous activity'], note: 'Customer notification obligations must be described in the system description.' },
      { area: 'Vendor / Third-Party', controls: ['CC9.1–9.2 — risk identification & supplier monitoring', 'CC9.2 — subservice organisation criteria (exclusions if "carve-out")'], note: 'Subservice monitors need SOC 2 (or equivalent) evidence, else address as complementary.' },
      { area: 'Risk Assessment & Governance', controls: ['CC3.1–3.4 — risk identification, assessment, response', 'CC2.x — governance structure & policies'], note: 'Auditors want to see risks tied to the system, not a generic register.' },
      { area: 'Availability / Continuity (if claimed)', controls: ['A1.1, A1.2 — capacity, backup, restore', 'A1.3 — recovery time objectives'], note: 'Only applicable if you assert availability in the system description — do not assert what you do not meet.' },
    ],
    observations: [
      { finding: 'Access reviews not evidenced or incomplete', why: 'Reviews exist but lack sign-off, date, or evidence across the full period; reviewers include data owners rather than all roles.' },
      { finding: 'Stale system description (§3)', why: 'Description does not match the actual system — components, subservices, customers, or periods differ from what was asserted.' },
      { finding: 'Subservice organisation monitoring absent', why: 'Carve-out service (e.g. AWS) selected but no review of their SOC 2 / exceptions, or inclusive method without control mapping.' },
      { finding: 'Emergency changes bypass review', why: 'No pre-approval, back-out, or post-change review for emergency changes.' },
      { finding: 'Backups not tested / restore failures', why: 'Backups configured but no successful restore within the attestation period, or restore tests exclude the stated RTO.' },
    ],
    rebuttals: [
      { finding: 'Access reviews not evidenced', pushback: 'Prove completeness: show the full review queue (not a sample), reviewer sign-off, and an automated exception report showing "nothing slipped through" — completeness often beats volume.', evidence: 'IAM review tickets, quarterly reports, exception logs, system-generated owner lists.' },
      { finding: 'Scope / assertion mismatch', pushback: 'Challenge the control environment boundary. CAS 805-type limitation: controls are evaluated only within the described scope — ask the auditor to isolate exclusions (carve-out) and complementary user entity controls.', evidence: 'Signed system description, control mapping matrix.' },
      { finding: 'Subservice not monitored', pushback: 'If using a carve-out, the auditor evaluates complementary subservice controls (CUEC) at the user entity; ask them to accept the subservice SOC 2 report and restrict findings to your controls.', evidence: 'Subservice SOC 2 Type II, exceptions addendum.' },
      { finding: 'Compensating concern raised', pushback: 'When a criterion cannot be fully met, request acknowledgement of compensating controls — documented, monitored, and equally effective (TSC CC6/CSP guidance).', evidence: 'Compensating control declaration signed by control owners.' },
    ],
    clauses: [
      { title: 'Provide SOC 2 report', text: 'Vendor shall provide its most recent SOC 2 Type II report (and any exceptions) annually, within 15 days of issuance, and promptly upon Client request.', required: true },
      { title: 'Subservice evidence', text: 'Vendor shall maintain and share SOC 2 (or equivalent) reports for all subservice organisations used to deliver the services, and notify Client of material subservice changes.', required: true },
      { title: 'Audit & assessment rights', text: 'Client may perform, or engage an auditor for, a security assessment of the services with 30 days notice, subject to confidentiality and impartiality.', required: true },
      { title: 'Availability commitment', text: 'If availability is claimed, Vendor shall meet the stated uptime and recovery objectives and report availability metrics monthly.', required: false },
    ],
    discrepancies: [
      'SOC 2 has no mandated retention period for logs — fits beside PCI 12-month and HIPAA 6-year rules.',
      'SOC 2 does not require role-based user rotation like PCI 8.x; access-review evidence is the focus.',
    ],
  },
  iso27001: {
    id: 'iso27001',
    name: 'ISO 27001',
    color: '#10b981',
    desc: 'The international ISMS certification — 93 Annex A controls in the 2022 edition, risk-based and auditable.',
    policies: [
      { area: 'ISMS Policy & Leadership', controls: ['A.5.1 – A.5.3 — policies, roles, responsibilities', 'A.5.2 — information security direction'], note: 'Policy must be approved by top management with evidence (signature/minutes).' },
      { area: 'Risk Management', controls: ['A.5.4 – A.5.7 — risk assessment, treatment, statements of applicability (SoA)'], note: 'SoA must reflect actual decisions — an "all included" SoA is a common weakness.' },
      { area: 'Access Control', controls: ['A.8.1 – A.8.5 — access rules, privileged access, authentication, secrets'] },
      { area: 'Supplier Security', controls: ['A.5.19 – A.5.21 — agreements, assessments, monitoring'] },
      { area: 'Incident Management', controls: ['A.5.24 – A.5.28 — responsibilities, reporting, response (also A.8.23 web filtering)'] },
      { area: 'Business Continuity', controls: ['A.5.29 – A.5.30 — ICT readiness for continuity, and documentation'] },
      { area: 'Monitoring & Logging', controls: ['A.8.15 – A.8.16 — logging, monitoring', 'A.8.17 – A.8.18 — clock sync, protection'] },
      { area: 'HR & Training', controls: ['A.6.3 — awareness, education, training; confidentiality (A.5.11)'] },
    ],
    observations: [
      { finding: 'SoA not accurate', why: 'Statement of Applicability lists controls not implemented, or omits exclusions without justification.' },
      { finding: 'Risk assessment not asset/process complete', why: 'Risk register omits key assets, data flows, or outsourced processes; likelihood/impact unsupported.' },
      { finding: 'Management review not evidenced', why: 'No minutes, attendance, or action follow-ups from periodic management review.' },
      { finding: 'Internal audit not independent', why: 'Auditors audited their own area, or no audit programme/TOR with full coverage.' },
      { finding: 'Supplier assessments absent or stale', why: 'A.5.19/A.8 supplier review missing, not refreshed, or evidence undiscoverable.' },
    ],
    rebuttals: [
      { finding: 'Control claimed but not in SoA', pushback: 'The SoA is the documented, risk-based basis. A control not in scope can be justified via exclusion criteria (A.5.7); request the auditor challenge the risk decision, not apply a blanket expectation.', evidence: 'SoA + risk treatment plan with justifications.' },
      { finding: 'Risk assessment scope', pushback: 'Ask for the specific asset/criteria the auditor believes is missing, then demonstrate it is covered by an inherited/out-of-scope decision (e.g. cloud in provider scope), documented in the risk register.', evidence: 'Risk register, scope statement.' },
      { finding: 'Management review', pushback: 'Present the review schedule, minutes, attendance, and the closed-loop actions from prior reviews; use this to show top-management commitment aligns with clause 9.3.', evidence: 'Minutes, attendance list, action tracker.' },
      { finding: 'Internal audit independence', pushback: 'Surface the internal audit programme, TOR, and independence attestations; request the auditor focus on the programme rather than individual sampling.', evidence: 'Audit programme, TOR, independence declarations.' },
    ],
    clauses: [
      { title: 'Certificate & surveillance', text: 'Vendor shall maintain its ISO 27001 certificate and complete annual surveillance audits, providing the certificate and scope statement on request.', required: true },
      { title: 'Scope change notice', text: 'Vendor shall notify Client within 30 days of any material change to its ISMS scope or certificate status (including withdrawal or suspension).', required: true },
      { title: 'Information security requirements', text: 'Vendor shall implement information security per its ISMS and flow down these obligations to sub-suppliers used to provide the services.', required: false },
    ],
    discrepancies: [
      'ISO 27001 wants evidence of training and audit results; like HIPAA, no fixed log-retention clock (so a retained archive aligns both).',
      'Enforcing 90-day password rotation is now discouraged by A.8.5 / NIST guidance — an ISO auditor should not require rotation.',
    ],
  },
  pci: {
    id: 'pci',
    name: 'PCI-DSS',
    color: '#ef4444',
    desc: 'Payment card industry data security standard (v4.0) — mandatory if you store, process, or transmit cardholder data.',
    policies: [
      { area: 'Access Control', controls: ['Req 7 — least privilege', 'Req 8 — user ID, MFA for remote/non-console admin, no shared ID without accountability'] },
      { area: 'Encryption & Data', controls: ['Req 3 — protect stored account data, PAN masking, no crypto weaknesses', 'Req 4 — strong cryptography in transit (TLS 1.2+)'] },
      { area: 'Networking & Config', controls: ['Req 1 — firewall & segmentation', 'Req 2 — no vendor defaults'] },
      { area: 'Logging & Monitoring', controls: ['Req 10 — audit logs (12 months with 90 days immediately accessible)'] },
      { area: 'Vulnerability Mgmt', controls: ['Req 5 — malware protection', 'Req 6 — secure development & patch mgmt', 'Req 11 — ASV quarterly scans, pen tests, segmentation tests'] },
      { area: 'Security Program', controls: ['Req 12 — governance, policy, risk, service-provider monitoring (12.8), incident response (12.10)'] },
    ],
    observations: [
      { finding: 'Logs not retained 12 months / 90 days retrievable', why: 'Req 10.5.1 — audit trails must be retained at least 12 months with 90 days immediately available for forensic need.' },
      { finding: 'MFA gaps', why: 'Req 8.4.x — MFA missing for remote access, non-console admin, or service accounts (v4 tightened these).' },
      { finding: 'Failed quarterly ASV scans / no retest', why: 'Req 11.3.2 — scans must pass every quarter with no failing scan after changes.' },
      { finding: 'PAN stored beyond need / not masked', why: 'Req 3.3/3.4 — storage minimisation and masking not documented or enforced.' },
      { finding: 'Network diagrams / segmentation not validated', why: 'Req 1.1.6/1.3 — diagrams stale, scope reduction asserted without a segmentation test (Req 11.4.7).' },
      { finding: 'Service provider (you) monitoring absent', why: 'Req 12.8 — no documented process to monitor your own service-provider relationships, or failing to provide/obtain reports.' },
    ],
    rebuttals: [
      { finding: 'Failed ASV scan', pushback: '− ask the ASV to revalidate; challenge "false positives" formally via the scan vendor and retest. Accept only after the ASV signs off — an unvalidated failure stays a finding.', evidence: 'Retest report, ASV exception/validation correspondence.' },
      { finding: 'Log retention gap', pushback: 'Demonstrate equivalent capability: if online 90 days is disruptive, implement an alternative retrieval SLA documented in policy — then argue the intent (forensic availability) is met.', evidence: 'Retention matrix, retrieval SLA, archived log restore test.' },
      { finding: 'Segmentation assertion', pushback: 'Run & document the segmentation test (Req 11.4.7) and show in-scope traffic only — this usually clears the scope-reduction challenge.', evidence: 'Segmentation test, network diagrams.' },
      { finding: 'MFA for service accounts', pushback: 'Where impossible, present compensating controls via the PCI-DSS CSF (compensating control template) — documented, reviewed annually, independently assessed.', evidence: 'CSF compensating controls declaration.' },
    ],
    clauses: [
      { title: 'Maintain compliance & AOC', text: 'Vendor shall maintain PCI-DSS compliance at its level, provide its Attestation of Compliance (AOC) and ROC summary annually and upon request, and notify Client of any loss or revocation of compliance status.', required: true },
      { title: 'Req 12.8 support', text: 'Vendor shall, upon Client request, provide evidence of its annual assessment and the report availability required under PCI-DSS Req 12.8.', required: true },
      { title: 'Cardholder data scope', text: 'Vendor shall only process cardholder data as needed, and shall not store PAN except as contractually required, in accordance with Req 3.', required: false },
    ],
    discrepancies: [
      'PCI wants 12-month log retention — 365 days — which outlives GDPR minimization logic; archive and mask rather than delete.',
      'PCI v4 removed mandatory periodic user password rotation (8.3.2) — aligns with NIST 800-63B; challenge auditors who still demand 90-day rotation.',
    ],
  },
  hipaa: {
    id: 'hipaa',
    name: 'HIPAA',
    color: '#0ea5e9',
    desc: 'US federal law for PHI — Security Rule (administrative, physical, technical safeguards) and Privacy Rule.',
    policies: [
      { area: 'Security Management Process', controls: ['45 CFR 164.308(a)(1) — risk analysis, risk management, policies & sanctions'], note: 'Risk analysis has no magic interval but must be kept current; many chose annual.' },
      { area: 'Workforce & Training', controls: ['164.308(a)(2) – (5) — workforce security, training, awareness'] },
      { area: 'Contingency Plan', controls: ['164.308(a)(7) — backup, disaster recovery, emergency mode operation, testing'] },
      { area: 'Access & Audit', controls: ['164.312(a) – (b) — access controls, audit controls'] },
      { area: 'Physical & Transmission', controls: ['164.310(a)–(d) — facility access, workstation/device media', '164.312(e) — transmission safeguards'] },
      { area: 'Breach & BAAs', controls: ['164.410 — breach notification', '164.504 — Business Associate agreements with every BA'], note: 'BAAs are required even where the BA "only passes through" data.' },
    ],
    observations: [
      { finding: 'Risk analysis not current', why: 'Performed once years ago; not refreshed when systems, vendors, or processes changed (implementation specification: keep risk analysis current).' },
      { finding: 'BAA missing with subcontractor', why: 'BA engaged an IT vendor but no BAA of flow-down — 164.504 requires BAAs and downstream BAAs.' },
      { finding: 'Encryption "addressable" unaddressed', why: 'Encryption of data at rest/in transit is addressable — an unanswered "not implemented + rationale" fails the requirement.' },
      { finding: 'Training not documented / not credentialed', why: 'Security awareness conducted but no attendance records or role-based content tracked.' },
      { finding: 'Breach notification timeliness', why: 'No practice of determining "risk of harm" and notifying without unreasonable delay (max 60 days).' },
    ],
    rebuttals: [
      { finding: 'Addressable control not implemented', pushback: 'Addressable ≠ mandatory. Document the decision: equivalent alternative measures, infeasibility analysis, and residual risk acceptance (164.306(d)). Auditors accept a well-reasoned rationale.', evidence: 'Safeguard decision register, risk analysis.' },
      { finding: 'Risk analysis methodology', pushback: 'Ground it in NIST SP 800-30 methodology; if the auditor wants a specific quantitative threshold, ask them to reference the standard — HIPAA has no mandated RPO/RT or scoring model.', evidence: 'Risk analysis report using 800-30, risk register.' },
      { finding: 'Breach notification', pushback: 'Demonstrate the four-factor risk-of-harm assessment documented per notification; that is what determines "notification without unreasonable delay", not an arbitrary calendar.', evidence: 'Breach logs, risk-of-harm determinations.' },
    ],
    clauses: [
      { title: 'BAA', text: 'Parties shall execute a Business Associate Agreement under 45 CFR 164.504 covering use/disclosure of PHI, safeguards, breach handling, and termination.', required: true },
      { title: 'Flow-down to subcontractors', text: 'Vendor shall ensure each subcontractor that receives PHI signs a downstream BAA before access, and Vendor remains responsible for their compliance.', required: true },
      { title: 'Breach notification', text: 'Vendor shall notify Client without unreasonable delay (and not more than 60 days) of any breach of unsecured PHI, with the HHS breach notice elements.', required: true },
      { title: 'Return / destruction', text: 'Upon termination, Vendor shall return or destroy all PHI, and certify destruction in writing.', required: false },
    ],
    discrepancies: [
      'HIPAA retains records 6 years (164.316(b)(2)); PCI wants 12 months of logs — an archive policy that keeps 6 years satisfies both.',
      'HIPAA "addressable" encryption sits beside PCI "required" encryption — apply PCI-required crypto to cardholder flows and document HIPAA rationale for the rest.',
    ],
  },
  nist: {
    id: 'nist',
    name: 'NIST CSF 2.0',
    color: '#06b6d4',
    desc: 'Outcome-focused cybersecurity framework (Govern, Identify, Protect, Detect, Respond, Recover) — voluntary but widely used.',
    policies: [
      { area: 'Governance', controls: ['GV.RM — risk management strategy & appetite', 'GV.RR — policies, roles, responsibilities'] },
      { area: 'Risk & Asset Mgmt', controls: ['ID.AM — asset inventory', 'ID.RA — risk assessment', 'ID.SC — supply chain'] },
      { area: 'Protection', controls: ['PR.AA — identity & access (MFA)', 'PR.DS — data security & encryption', 'PR.PT — protective technology'] },
      { area: 'Detection & Response', controls: ['DE.CM — continuous monitoring', 'DE.AE — anomalies', 'RS — incident response, comms'] },
      { area: 'Recovery', controls: ['RC.RP — recovery plans, testing', 'RC.CO — communications'] },
    ],
    observations: [
      { finding: 'No current/target profile', why: 'Organisation has not defined a Current Profile vs Target Profile, so maturity can\u2019t be measured.' },
      { finding: 'Implementation tier unjustified', why: 'Tier 1 chosen but business impact analysis and risk appetite don\u2019t support it — or no rationale at all.' },
      { finding: 'No supply chain risk (ID.SC)', why: 'No assessment of suppliers\u2019 cybersecurity, despite ID.SC — a common gap.' },
      { finding: 'Recovery plans not tested', why: 'RC.RP documentation exists but no TTX/tabletop or restoration drill coupled to RTOs.' },
      { finding: 'Asset inventory incomplete', why: 'ID.AM lists only servers; endpoints, cloud assets, SaaS, and accounts missing.' },
    ],
    rebuttals: [
      { finding: 'Tier challenged', pushback: 'CSF Tiers are qualitative and self-selected for the target state; show the risk-appetite statement and prioritisation that justifies the tier. There is no prescribed tier nor mandated artefacts.', evidence: 'Risk appetite, prioritised action plan.' },
      { finding: 'Supply chain shortfall', pushback: 'Demonstrate that ID.SC is addressed via contractual flow-down (SOC/ISO evidence from suppliers) rather than a standalone program.', evidence: 'Supplier assessments, contract clauses.' },
      { finding: 'No testing of recovery', pushback: 'If no formal test yet, show the planned TTX calendar and the RTO/RPO baseline you will validate — commit to the schedule rather than a one-time backfill.', evidence: 'Recovery plan, TTX schedule, RTO/RPO metrics.' },
    ],
    clauses: [
      { title: 'Baseline alignment', text: 'Vendor shall maintain a cybersecurity program aligned to NIST CSF 2.0 with a modest maturity target (e.g. Tier 2) and report posture metrics annually.', required: false },
      { title: 'Supply chain flow-down', text: 'Vendor shall require its sub-providers to maintain equivalent safeguards and provide evidence on request (e.g. ISO 27001 / SOC 2 / CSF profiles).', required: false },
    ],
    discrepancies: [
      'CSF is outcome-based with no explicit log-retention or rotation clocks — map to PCI/HIPAA specifics and document the mapping.',
      'CSF PR.AA recommends phishing-resistant MFA for privileged users (higher than SOC 2 "MFA" baseline) — set the bar at the stricter one.',
    ],
  },
  gdpr: {
    id: 'gdpr',
    name: 'GDPR',
    color: '#8b5cf6',
    desc: 'EU regulation for personal data — lawful basis, rights, DPAs, transfer rules, breach notification.',
    policies: [
      { area: 'Records of Processing (ROPA)', controls: ['Art 30 — maintain and update records of processing activities'] },
      { area: 'DPIA', controls: ['Art 35 — prior DPIA for high-risk processing'] },
      { area: 'Breach Management', controls: ['Art 33/34 — notify DPA ≤72h, data subjects when high risk'] },
      { area: 'Data Subject Rights', controls: ['Art 15–22 — access, rectification, erasure, portability, objection'] },
      { area: 'Processor Contracts', controls: ['Art 28 — mandatory DPA content, processor instructions, sub- processor control'] },
      { area: 'Transfers', controls: ['Art 44–49 + SCCs — lawful transfer mechanisms, TIA for third countries'] },
      { area: 'Consent & Notices', controls: ['Art 7 — demonstrable consent', 'Art 13/14 — granular notices'] },
    ],
    observations: [
      { finding: 'ROPA incomplete or missing', why: 'No Art 30 records, or they omit purposes, recipients, retention, and cross-border transfers.' },
      { finding: 'Consent not demonstrable', why: 'Pre-ticked boxes, no auditable timestamp, or bundled consent for multiple purposes.' },
      { finding: 'No DPIA for high-risk', why: 'High-risk processing (tracking, large-scale special categories, systematic monitoring) without a documented Art 35 assessment or exemption rationale.' },
      { finding: 'Transfers without safeguards', why: 'Data flows to third countries without SCCs / adequacy or a documented transfer impact assessment.' },
      { finding: 'DPO / roles not addressed', why: 'No DPO where required (Art 37) or DPO has no documented independence/contact point.' },
    ],
    rebuttals: [
      { finding: 'Consent challenged', pushback: 'If consent is not the right basis, present the lawful basis analysis (Art 6(1)(f) legitimate interest with a documented balancing test) — GDPR does not mandate consent for everything.', evidence: 'Balancing test, lawful-basis register.' },
      { finding: 'No DPIA', pushback: 'Show the Art 35(1) screening that concluded processing is not "high risk"; a documented negative DPIA decision with rationale is defensible.', evidence: 'DPIA screening/decision record.' },
      { finding: 'Transfer gap', pushback: 'If SCCs are in place, pair them with a transfer impact assessment and supplementary measures; the "Schrems II" expectation is a demonstrated TIA, not a prohibition.', evidence: 'SCCs, TIA, supplementary measures.' },
    ],
    clauses: [
      { title: 'DPA (Art 28)', text: 'Parties shall enter a data processing agreement containing all Article 28 mandatory elements, including processor instructions, confidentiality, assistance, and audit rights.', required: true },
      { title: 'Sub-processors', text: 'Vendor shall provide a current list of sub-processors, obtain required authorisation before changes, and flow down equivalent obligations.', required: true },
      { title: 'Breach assistance', text: 'Vendor shall assist Client with breach notification (DPA ≤72h, data subjects) and provide the Article 33(3) information without undue delay.', required: true },
      { title: 'Transfers', text: 'Where transfers occur, Vendor shall deploy applicable SCCs and perform/maintain a transfer impact assessment on request.', required: false },
    ],
    discrepancies: [
      'GDPR Art 5(e) minimization conflicts with PCI 12-month logs — retain what is needed, minimise the rest, and document the retention matrix.',
      'GDPR has no password-rotation rule; NIST/ISO guidance (no forced rotation) applies — auditors asking for rotation need a standards citation.',
    ],
  },
  cis: {
    id: 'cis',
    name: 'CIS Controls',
    color: '#0d9488',
    desc: '18 prioritized technical controls with Implementation Groups (IG1/IG2/IG3) — the fastest high-impact baseline.',
    policies: [
      { area: 'Inventory', controls: ['Safeguard 1 – Invent HR-approved devices', 'Safeguard 2 – Invent authorized software'] },
      { area: 'Data Protection', controls: ['Safeguard 3 – Data management (encryption, classification, retention)'] },
      { area: 'Access Control', controls: ['Safeguard 6 – MFA, least privilege, access reviews'] },
      { area: 'Vulnerability & Patch', controls: ['Safeguard 7 – Continuous vuln management, remediate known-exploited'] },
      { area: 'Audit Logs', controls: ['Safeguard 8 – Collect, protect, and review audit logs'] },
      { area: 'Network & Endpoint', controls: ['Safeguards 9–13, 16 – email/web/network/endpoint protections, app software security'] },
      { area: 'Incident & Recovery', controls: ['Safeguard 17 – Incident response and recovery plans, tested'] },
      { area: 'Config & Change', controls: ['Safeguard 4 – Secure configuration', 'Safeguard 5 – Account mgmt, disable unnecessary'] },
    ],
    observations: [
      { finding: 'Asset inventory incomplete', why: 'Safeguards 1–2 — unmanaged endpoints, cloud, and BYOD missing from inventory.' },
      { finding: 'Known-exploited vulnerabilities unpatched', why: 'Safeguard 7 — CVEs in CISA KEV catalog not remediated on schedule (IG2: prioritize).' },
      { finding: 'No centralized log collection', why: 'Safeguard 8 — logs scattered, no correlation, retention unspecified.' },
      { finding: 'MFA not enforced', why: 'Safeguard 6 — MFA missing for privileged or externally exposed accounts.' },
      { finding: 'Response plans untested', why: 'Safeguard 17 — plans written, never tabletop-tested, recovery objectives absent.' },
    ],
    rebuttals: [
      { finding: 'Control beyond your IG', pushback: 'CIS scopes via Implementation Groups — ask the assessor to confirm your IG (typically IG1/IG2 for SMBs) and only assess in-scope safeguards.', evidence: 'IG selection documented.' },
      { finding: 'Patch latency on KEV', pushback: 'Show the KEV-relevant patch SLA and any compensating protection (WAF, EDR, segmentation) for hosts with scheduled remediation.', evidence: 'Patch SLA, vuln dashboard, compensating controls.' },
    ],
    clauses: [
      { title: 'CIS baseline', text: 'Vendor shall implement CIS Controls aligned to at least IG2 for the services, enforce MFA on all externally exposed accounts, and remediate known-exploited vulnerabilities per a 15-day SLA.', required: false },
      { title: 'Log access', text: 'Vendor shall retain audit logs for 12 months (90 days immediately accessible) and provide them to Client on request for investigation.', required: false },
    ],
    discrepancies: [
      'CIS Safeguard 8 (12-month logs) aligns with PCI; for non-PCI data reduce to 6–12 months and document the decision.',
      'CIS IG1 demands MFA for externally exposed + privileged users — the practical floor under SOC 2 / ISO.',
    ],
  },
  hitrust: {
    id: 'hitrust',
    name: 'HITRUST CSF',
    color: '#b45309',
    desc: 'Certifiable, harmonized framework (HIPAA + NIST + ISO + PCI + state laws) with maturity scoring (e1/i1/r2).',
    policies: [
      { area: 'Maturity & Scoring', controls: ['e1 (essentials) → i1 (implemented) → r2 (risk) — 4-level maturity per control'], note: 'Assessors score policy/procedure/implemented/measured/managed per control.' },
      { area: 'Certification Scheme', controls: ['Two-factor assessment, independent assessor, quality assurance review'] },
    ],
    observations: [
      { finding: 'Maturity level inflated', why: 'Control scores claimed higher than evidence supports (e.g. "managed" without management review evidence).' },
      { finding: 'Policy → procedure gaps', why: 'Policy exists but no procedure/implementation evidence (maturity 1 vs 2).' },
      { finding: 'Third-party & PHI controls not mapped', why: 'HIPAA/PCI requirements folded in but mapping to CSF control references incomplete.' },
    ],
    rebuttals: [
      { finding: 'Maturity score disputed', pushback: 'Request the specific evidence the assessor believes is missing; HITRUST scoring is evidence-based and the QA process allows challenge of control scores with documentation.', evidence: 'Control evidence pack, QA rebuttal.' },
    ],
    clauses: [
      { title: 'HITRUST certification', text: 'If Vendor claims HITRUST, Vendor shall maintain its certification (e1/i1/r2 as applicable) and provide its certification report annually.', required: false },
    ],
    discrepancies: [
      'HITRUST r2 embeds PCI log retention and HIPAA 6-year retention simultaneously — the archive must satisfy both.',
      'Maturity scoring adds a "measured/managed" bar that plain SOC 2 does not — set internal metrics before engaging r2 assessment.',
    ],
  },
  dpdpa: {
    id: 'dpdpa',
    name: 'DPDPA (India)',
    color: '#f59e0b',
    desc: 'India\u2019s Digital Personal Data Protection Act, 2023 — consent-first, obligations for Data Fiduciaries and Processors.',
    policies: [
      { area: 'Legal Basis & Consent', controls: ['Consent (with notice), or specified "legitimate use" grounds (employment, legal, public function, health emergencies)'] },
      { area: 'Breach & Cert-In', controls: ['Notify DPDPA Board \u201cwithout delay\u201d; note CERT-In directions require reporting serious incidents to cert-in.org.in (often 6 hours)'] },
      { area: 'Rights', controls: ['Access, correction, erasure, grievance redressal; children\u2019s data consent & verifiable parental consent'] },
      { area: 'Cross-Border', controls: ['Notify specified countries/territories (currently only ones the central government notifies)'] },
      { area: 'Processors', controls: ['DPA between Data Fiduciary and Data Processor with obligations (lawful background, no retention beyond purpose)'] },
    ],
    observations: [
      { finding: 'No notice / consent records', why: 'Notice with purpose and withdrawal right not provided; no auditable consent logs.' },
      { finding: 'Breach notification not planned', why: 'No incident process mapped to DPDPA "without delay" and CERT-In reporting requirements.' },
      { finding: 'Processor obligations not contracted', why: 'No updated DPA covering DPDPA obligations; legacy ISO/GDPR templates partially cover this.' },
      { finding: 'Children\u2019s data processed without parental consent', why: 'Interactive services for children or high-traffic platforms without verifiable parental consent mechanisms.' },
    ],
    rebuttals: [
      { finding: 'Consent deployment timing', pushback: 'The Act allows a transition window; present the phased consent-migration plan and existing lawful basis for existing data.', evidence: 'Migration plan, lawful use analysis.' },
    ],
    clauses: [
      { title: 'DPDPA obligations', text: 'Vendor shall process personal data only per documented instructions of Client as Data Fiduciary, maintain consent notices and withdrawal mechanisms, and assist in breach notifications to the DPDPA Board.', required: true },
      { title: 'CERT-In incident reporting', text: 'Vendor shall report security incidents to Client within 6 hours (per CERT-In directions) so Client can meet its statutory reporting timelines.', required: true },
    ],
    discrepancies: [
      'DPDPA "without delay" vs GDPR 72h vs HIPAA 60 days vs CERT-In 6-hour — the contract should define the most stringent and cascade it.',
    ],
  },
};

// Central policy areas → which frameworks + control references + the honest tension.
export const UNIFIED_POLICY_MAP = [
  {
    area: 'Access Management',
    map: { 'SOC 2': 'CC6.1–6.7', 'ISO 27001': 'A.8.1–8.5', 'PCI-DSS': 'Req 7 & 8', HIPAA: '164.312(a)', 'NIST CSF': 'PR.AA', CIS: 'Safeguard 6' },
    discrepancy: 'PCI/NIST/CIS demand MFA broadly; ISO treats it as risk-based (A.8.5). Reconcile by implementing MFA everywhere sensitive + privileged and documenting the risk decision for the rest.',
  },
  {
    area: 'Evidence & Audit Logs',
    map: { 'SOC 2': 'CC7.3', 'ISO 27001': 'A.8.15–8.16', 'PCI-DSS': 'Req 10', HIPAA: '164.312(b)', CIS: 'Safeguard 8' },
    discrepancy: 'Retention clocks differ — PCI 12 months/90-day online, HIPAA 6 years, GDPR minimization. Build one retention matrix: online 90d, archive 12mo, HIPAA-attested archive 6yr, minimize/mask the rest.',
  },
  {
    area: 'Encryption & Key Management',
    map: { 'SOC 2': 'CC6.7', 'ISO 27001': 'A.8.24–8.25', 'PCI-DSS': 'Req 3 & 4', HIPAA: '164.312(e) / 164.306(d)', 'NIST CSF': 'PR.DS', CIS: 'Safeguard 3' },
    discrepancy: 'PCI/GDPR-implementing crypto is effectively required; HIPAA is "addressable". Use PCI-grade crypto for cardholder flows; document HIPAA rationale for the rest. Watch crypto agility (post-quantum prep).',
  },
  {
    area: 'Incident Response & Notification',
    map: { 'SOC 2': 'CC7.2–7.4', 'ISO 27001': 'A.5.24–5.28', 'PCI-DSS': 'Req 12.10', HIPAA: '164.410', 'NIST CSF': 'RS', GDPR: 'Art 33–34', DPDPA: 'notice', 'CERT-In': '6-hour rule' },
    discrepancy: 'Notification timelines conflict: CERT-In 6h, GDPR 72h, HIPAA ≤60d. Contract the most stringent and time-box internal triage to survive the tightest SLA.',
  },
  {
    area: 'Vendor / Third-Party & Sub-processors',
    map: { 'SOC 2': 'CC9.1–9.2', 'ISO 27001': 'A.5.19–5.21', 'PCI-DSS': 'Req 12.8', HIPAA: '164.504 (BAA)', 'NIST CSF': 'ID.SC', GDPR: 'Art 28', CIS: 'Safeguard 3' },
    discrepancy: 'HIPAA needs BAA + downstream BAAs; GDPR needs Art 28 DPA + sub-processor list; PCI wants 12.8 evidence; SOC 2 wants carve-out monitoring. One vendor mgmt program with per-regulation addenda is the answer.',
  },
  {
    area: 'Data Retention & Destruction',
    map: { 'SOC 2': 'CC6/A1.3', 'ISO 27001': 'A.8.10', 'PCI-DSS': 'Req 3.1–3.2', HIPAA: '164.316(b)(2)', GDPR: 'Art 5(e)', DPDPA: 'purpose limitation' },
    discrepancy: 'GDPR minimization vs PCI 12-month logs vs HIPAA 6-year records is the classic conflict; a single retention schedule with masking/redaction bridges it.',
  },
  {
    area: 'Vulnerability & Patch Management',
    map: { 'ISO 27001': 'A.8.8', 'PCI-DSS': 'Req 6.3/11', CIS: 'Safeguard 7', 'NIST CSF': 'ID.RA / PR.IP' },
    discrepancy: 'CIS demands KEV-first patching with SLAs; PCI scans quarterly with retest on failure; ISO is risk-based. Use CIS schedules, evidence PCI scans, and map into ISO risk treatment.',
  },
  {
    area: 'Business Continuity & Recovery',
    map: { 'SOC 2': 'A1.1–A1.3', 'ISO 27001': 'A.5.29–5.30', HIPAA: '164.308(a)(7)', 'NIST CSF': 'RC', CIS: 'Safeguard 17' },
    discrepancy: 'SOC 2 only requires availability if asserted; HIPAA mandates a contingency plan & testing; NIST RC wants TTX. If you claim availability, adopt HIPAA/NIST rigor and test to RTOs.',
  },
  {
    area: 'Password & Authentication Policy',
    map: { 'ISO 27001': 'A.8.5', 'PCI-DSS': 'Req 8', 'NIST CSF': 'PR.AA', CIS: 'Safeguard 6', 'SOC 2': 'CC6.6' },
    discrepancy: 'NIST 800-63B and PCI v4 long ago removed forced periodic rotation; if your auditor still demands 90-day rotation, push back with the current standard text.',
  },
];

// Cross-framework conflict "radar".
export const DISCREPANCY_MATRIX = [
  {
    topic: 'Audit / access log retention',
    conflict: 'PCI-DSS 10.5.1 (12 mo, 90-day online) vs GDPR 5(e) minimization vs HIPAA 164.316(b)(2) (6 yr) vs ISO A.8.15 (no clock).',
    reconcile: 'Single retention matrix: 90 days online, 12-month archive for PCI, extend to 6 years where HIPAA/ePHI is in scope, mask/redact the rest per GDPR. Document in a Schedule.',
  },
  {
    topic: 'Password rotation',
    conflict: 'Legacy auditor expectation of 90-day rotation vs NIST 800-63B & PCI v4.0 (no forced rotation; change only on compromise/risk).',
    reconcile: 'Cite current standard text, enforce length + blocklist + MFA, rotate privileged/emergency accounts, and refuse the legacy ask with the citation.',
  },
  {
    topic: 'MFA – how strong?',
    conflict: 'SOC 2 = "MFA when appropriate"; NIST/CIS = phishing-resistant MFA for privileged; PCI = MFA for remote/non-console admin.',
    reconcile: 'Floor = PCI/NIST for privileged + externally exposed; document the risk decision for the remainder.',
  },
  {
    topic: 'Encryption – required vs addressable',
    conflict: 'PCI/GDPR-effective = practically required; HIPAA = addressable; ISO = risk-based (A.8.24).',
    reconcile: 'Encrypt cardholder + high-risk personal data with current crypto; document HIPAA "addressable" rationale and residual risk for the rest.',
  },
  {
    topic: 'Incident notification windows',
    conflict: 'CERT-In 6h vs GDPR 72h vs HIPAA ≤60d vs PCI 12.10.1 (still "as soon as possible").',
    reconcile: 'Contract the most stringent; pre-build notification playbooks per regulator so a single incident triggers all wires in the tightest SLA.',
  },
  {
    topic: 'Business continuity scope',
    conflict: 'SOC 2 only when asserted; HIPAA mandates contingency + testing; NIST RC wants TTX; ISO A.5.30 wants ICT readiness.',
    reconcile: 'If you claim availability anywhere, adopt the stricter discipline: documented BCP, tested restoration to RTO/RPO, annual TTX.',
  },
  {
    topic: 'Vendor oversight model',
    conflict: 'SOC 2 carve-out vs inclusive; HIPAA BAA flow-down; GDPR sub-processor consent; PCI 12.8 evidence.',
    reconcile: 'One vendor program, three artifacts: security assessment (SOC/ISO), privacy addenda (BAA/DPA), and compliance evidence (PCI 12.8).',
  },
  {
    topic: 'Password storage & secrets',
    conflict: 'ISO A.8.5.4 (secrets cryptography) vs SSR/PCI (no hardcoded secrets); SOC 2 CC6.1 (credentials); CIS 16/5.',
    reconcile: 'Implement a vault + rotation of secrets across frameworks; a single capability evidences many controls.',
  },
];

// Vendor contract clause builder — base always applies; conditional per framework.
export const VENDOR_CLAUSE_BASE = [
  { title: 'Compliance obligations', text: 'Vendor represents that it complies with all applicable privacy, security and data-protection laws for the Services, and maintains a documented information security program (aligned to a recognised framework) covering people, process and technology.' },
  { title: 'Evidence & certificate maintenance', text: 'Vendor shall maintain its certifications/attestations (e.g. annual SOC 2 Type II, ISO 27001 with surveillance, PCI-DSS AOC, HITRUST certification) current at all times and provide them to Client on request and whenever issued.' },
  { title: 'Audit & assessment rights', text: 'Client (or an independent assessor on Client\u2019s behalf) may, on reasonable written notice (generally 30 days) and under NDA, perform a security/compliance assessment of the services or rely on the Vendor\u2019s most recent independent attestation in lieu.' },
  { title: 'Security incident response', text: 'Vendor shall maintain an incident response plan, notify Client promptly of any security incident affecting Client data (aligned to the most stringent applicable regulatory window), and provide a root-cause analysis and remediation plan without undue delay.' },
  { title: 'Retention & deletion', text: 'Vendor shall retain Client data only as long as required under the services or law, apply the documented retention schedule, and on termination securely delete or return all Client data and certify it in writing.' },
  { title: 'Sub-contracting & flow-down', text: 'Vendor shall flow down these obligations to all subcontractors and sub-processors used to deliver the Services, and shall remain responsible for their compliance.' },
  { title: 'Change notice', text: 'Vendor shall notify Client of any material change to its security posture, certifications, sub-processors, or data processing locations at least 30 days in advance where feasible.' },
  { title: 'Liability & indemnity', text: 'Vendor shall indemnify Client for losses caused by Vendor\u2019s breach of these security obligations or applicable law, subject to agreed liability caps; security events are carved out from the general cap where required.' },
  { title: 'Cyber insurance', text: 'Vendor shall maintain cyber liability insurance with limits of not less than [US$X] covering data breaches and notify carriers of the services.' },
];

export const VENDOR_CLAUSE_CONDITIONAL = {
  soc2: { label: 'SOC 2', clause: 'Vendor shall provide its most recent SOC 2 Type II report (scoped to the services, including exceptions) annually and in response to any exception, and evidence that its applicable subservice organisations are monitored. Where availability/confidentiality are asserted, Vendor shall meet the stated SLA metrics.' },
  iso27001: { label: 'ISO 27001', clause: 'Vendor shall maintain ISO 27001 certification and complete annual surveillance audits, providing the certificate, scope statement and Statement of Applicability (on NDA) to Client annually or on request.' },
  pci: { label: 'PCI-DSS', clause: 'Where cardholder data is processed, Vendor shall maintain PCI-DSS compliance at its level, provide its current AOC/ROC summary and any compensating controls declaration, and support Client\u2019s obligations under PCI Req 12.8.' },
  hipaa: { label: 'HIPAA / BAA', clause: 'Where PHI is involved, the parties shall execute a Business Associate Agreement under 45 CFR 164.504 with downstream BAAs for all subcontractors, breach notification (≤60 days or as required by HHS), and return/destruction of PHI on termination.' },
  gdpr: { label: 'GDPR', clause: 'Where personal data of EU/EEA/UK data subjects is processed, the parties shall enter an Article 28 DPA covering instructions, confidentiality, assistance, audit rights, sub-processor authorisation, and applicable SCCs with a transfer impact assessment for any third-country transfers.' },
  dpdpa: { label: 'DPDPA (India)', clause: 'Where personal data of Indian data principals is processed, the parties shall observe DPDPA obligations: notice and consent records, purpose limitation, grievance redress, breach notification without delay, and compliance with CERT-In incident reporting timelines.' },
  nist: { label: 'NIST CSF', clause: 'Vendor shall maintain a cybersecurity programme aligned to NIST CSF 2.0 at a documented maturity tier and report posture metrics to Client annually.' },
  cis: { label: 'CIS Controls', clause: 'Vendor shall implement CIS Controls v8 at least to Implementation Group [1|2], enforce MFA on all externally exposed and privileged accounts, and remediate known-exploited vulnerabilities within 15 days.' },
  hitrust: { label: 'HITRUST', clause: 'If Vendor claims HITRUST certification, it shall maintain the applicable certification (e1/i1/r2), provide its certification report annually, and notify Client of any adverse QA outcome.' },
};

// General GRC response "battle card" — how to challenge any finding professionally.
export const GRC_RESPONSE_PLAYBOOK = [
  { title: 'Scope & attestation boundary', body: 'Confirm the finding sits inside the agreed scope/attestation boundary. If it is outside (out-of-scope asset, carved-out subservice, CUEC), request it be withdrawn with a scope note.' },
  { title: 'Cite the precise requirement', body: 'Ask for the exact control/clause (TSC criterion, Annex A control, PCI requirement + subrequirement, CFR citation). A vague finding often dissolves when pinned to text.' },
  { title: 'Design vs operating effectiveness', body: 'Argue the issue is evidence of operating effectiveness, not a control gap — show the control exists, meets its intent, and provide the operating evidence (logs, reviews, tests).' },
  { title: 'Compensating or equivalent controls', body: 'Where a control can\u2019t be implemented exactly, present documented compensating controls (PCI CSF, ISO A.8 equivalent) — equally effective, reviewed, and independently assessed.' },
  { title: 'Risk-based proportionality', body: 'For ISO/NIST/HIPAA-addressable items, rely on documented risk treatment: the risk decision, accepted residual risk, and a remediation owner/date. That is defensible, not evasion.' },
  { title: 'Evidence quality & timing', body: 'Challenge stale or mis-sampled evidence; request the auditor re-evaluate with the correct period, tooling, or sample. Precision on the period usually upgrades the result.' },
  { title: 'Prior remediation & CAP', body: 'Show corrective actions already in flight (with dates and evidence) and request the finding be categorised as OFI/CAP-in-progress rather than an NC.' },
  { title: 'Materiality & risk rating', body: 'Challenge the severity rating against the actual exposure. A low-risk, single-occurrence issue rarely warrants a "failed" classification; request the rating rationale in writing.' },
];

export const ASSISTANT_SUGGESTIONS = [
  'What policies tie to SOC 2 and its controls?',
  'Common audit observations in PCI-DSS',
  'How to push back on a password rotation finding',
  'Contract clauses when engaging a vendor',
  'Where do HIPAA and GDPR conflict?',
  'ISO 27001 vs NIST CSF overlaps',
  'What to include in a BAA with a subcontractor',
  'Audit log retention requirements across frameworks',
  'Vendor clause for cardholder data (PCI)',
  'How to respond to an access-review finding',
];