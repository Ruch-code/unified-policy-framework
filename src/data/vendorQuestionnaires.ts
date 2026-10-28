// Vendor security questionnaires: a core set every vendor answers, plus sector
// and topic add-ons. Generic content; adapt before sending.

export interface VQ {
  id: string;
  domain: string;
  question: string;
  evidence: string;
  mapping: string;
  lite?: boolean; // included in the Lite (lower-tier) version
}

export const CORE: VQ[] = [
  { id: 'GOV-01', domain: 'Governance', question: 'Do you have an information security program with a named owner who reports to senior management?', evidence: 'Org chart, security charter or policy naming the owner', mapping: 'ISO 27001 5.3; SOC 2 CC1.3; NIST CSF GV.RR', lite: true },
  { id: 'GOV-02', domain: 'Governance', question: 'Are security policies approved by management, published to staff and reviewed at least annually?', evidence: 'Policy list with approval and review dates', mapping: 'ISO 27001 5.2, A.5.1; SOC 2 CC5.3', lite: true },
  { id: 'GOV-03', domain: 'Governance', question: 'Which independent certifications or attestations do you hold (SOC 2 Type II, ISO 27001, PCI DSS, HITRUST, other)? Please share the latest reports.', evidence: 'SOC 2 report, ISO certificate and SoA, AOC', mapping: 'SOC 2 CC2.3; ISO 27001 A.5.36', lite: true },
  { id: 'GOV-04', domain: 'Governance', question: 'Do you perform a risk assessment at least annually and when significant changes occur?', evidence: 'Risk assessment summary or register extract', mapping: 'ISO 27001 6.1.2, 8.2; SOC 2 CC3.2' },
  { id: 'HR-01', domain: 'People', question: 'Are background checks performed on staff and contractors with access to customer data, where legally permitted?', evidence: 'Screening policy, sample confirmation', mapping: 'ISO 27001 A.6.1; SOC 2 CC1.4' },
  { id: 'HR-02', domain: 'People', question: 'Do all staff complete security awareness training at hire and at least annually?', evidence: 'Training completion report', mapping: 'ISO 27001 A.6.3; SOC 2 CC2.2', lite: true },
  { id: 'HR-03', domain: 'People', question: 'Do staff and contractors sign confidentiality agreements before receiving access?', evidence: 'NDA template, signed sample', mapping: 'ISO 27001 A.6.6; SOC 2 CC1.1' },
  { id: 'AC-01', domain: 'Access control', question: 'Is multi-factor authentication enforced for all staff, remote access and administrative access?', evidence: 'IdP MFA policy screenshot', mapping: 'ISO 27001 A.8.5; SOC 2 CC6.1; PCI DSS 8.4', lite: true },
  { id: 'AC-02', domain: 'Access control', question: 'Is access granted on least privilege and reviewed at least quarterly for privileged accounts?', evidence: 'Access review sign-off, role matrix', mapping: 'ISO 27001 A.5.15, A.5.18, A.8.2; SOC 2 CC6.2, CC6.3' },
  { id: 'AC-03', domain: 'Access control', question: 'Is access removed within 24 hours of termination?', evidence: 'Offboarding procedure, leaver sample', mapping: 'ISO 27001 A.5.18; SOC 2 CC6.2', lite: true },
  { id: 'AC-04', domain: 'Access control', question: 'Do you support SSO (SAML or OIDC) and MFA for customer users of your service?', evidence: 'Product documentation', mapping: 'SOC 2 CC6.1' },
  { id: 'DP-01', domain: 'Data protection', question: 'Is customer data encrypted in transit (TLS 1.2 or higher) and at rest (AES-256 or equivalent)?', evidence: 'Architecture document, encryption configuration', mapping: 'ISO 27001 A.8.24; SOC 2 CC6.1, CC6.7', lite: true },
  { id: 'DP-02', domain: 'Data protection', question: 'Who manages encryption keys, and do you support customer-managed keys?', evidence: 'Key management description', mapping: 'ISO 27001 A.8.24' },
  { id: 'DP-03', domain: 'Data protection', question: 'How is customer data logically segregated from other customers?', evidence: 'Tenancy architecture description', mapping: 'ISO 27001 A.8.22; SOC 2 CC6.1' },
  { id: 'DP-04', domain: 'Data protection', question: 'Where (countries and regions) is customer data stored, processed and accessed from, including by support staff?', evidence: 'Data location statement, subprocessor list', mapping: 'GDPR Art. 44 to 49; DPDP Sec. 16', lite: true },
  { id: 'DP-05', domain: 'Data protection', question: 'How long is customer data retained, and how is it deleted at contract end? Do you provide deletion certificates?', evidence: 'Retention policy, sample certificate', mapping: 'ISO 27001 A.8.10; GDPR Art. 28(3)(g)', lite: true },
  { id: 'DP-06', domain: 'Data protection', question: 'Is production customer data ever used in development or test environments?', evidence: 'SDLC or data handling policy', mapping: 'ISO 27001 A.8.33' },
  { id: 'TP-01', domain: 'Third parties', question: 'Please list all subprocessors that store or access customer data, with location and purpose.', evidence: 'Subprocessor list', mapping: 'GDPR Art. 28(2); SOC 2 CC9.2', lite: true },
  { id: 'TP-02', domain: 'Third parties', question: 'How do you assess and monitor your own critical suppliers, and do you give customers advance notice of new subprocessors?', evidence: 'Vendor management policy, notice process', mapping: 'ISO 27001 A.5.19 to A.5.22; SOC 2 CC9.2' },
  { id: 'IR-01', domain: 'Incident response', question: 'Do you have a documented incident response plan that is tested at least annually?', evidence: 'IR plan, tabletop report', mapping: 'ISO 27001 A.5.24 to A.5.27; SOC 2 CC7.3, CC7.4', lite: true },
  { id: 'IR-02', domain: 'Incident response', question: 'Within how many hours will you notify us of a security incident affecting our data?', evidence: 'Contract clause or policy statement', mapping: 'GDPR Art. 33; DPDP Sec. 8(6); SOC 2 CC7.4', lite: true },
  { id: 'IR-03', domain: 'Incident response', question: 'Have you had a security incident or data breach in the last 36 months? If so, describe the root cause and remediation.', evidence: 'Incident summary or post-incident report', mapping: 'SOC 2 CC7.5', lite: true },
  { id: 'VM-01', domain: 'Vulnerability management', question: 'How often do you scan for vulnerabilities, and what are your remediation timelines by severity?', evidence: 'Vulnerability policy with SLAs, recent scan summary', mapping: 'ISO 27001 A.8.8; SOC 2 CC7.1' },
  { id: 'VM-02', domain: 'Vulnerability management', question: 'Is an independent penetration test performed at least annually? Please share the summary and remediation status.', evidence: 'Pen test executive summary, retest letter', mapping: 'ISO 27001 A.8.8; SOC 2 CC4.1', lite: true },
  { id: 'SD-01', domain: 'Secure development', question: 'Are code changes peer reviewed and tested, with automated security scanning (SAST, SCA, secrets) in the pipeline?', evidence: 'SDLC policy, pipeline configuration', mapping: 'ISO 27001 A.8.25 to A.8.29; SOC 2 CC8.1' },
  { id: 'SD-02', domain: 'Secure development', question: 'Are development, test and production environments separated, with restricted production deployment rights?', evidence: 'Environment diagram, deployment permissions', mapping: 'ISO 27001 A.8.31; SOC 2 CC8.1' },
  { id: 'LM-01', domain: 'Logging and monitoring', question: 'Are security events logged centrally, retained for at least 12 months, and monitored with alerting?', evidence: 'Logging and retention settings, alert examples', mapping: 'ISO 27001 A.8.15, A.8.16; SOC 2 CC7.2' },
  { id: 'BC-01', domain: 'Business continuity', question: 'What are your RTO and RPO for the service, and when was disaster recovery last tested? What were the achieved results?', evidence: 'BC/DR plan, last test report', mapping: 'ISO 27001 A.5.29, A.5.30; SOC 2 A1.2, A1.3', lite: true },
  { id: 'BC-02', domain: 'Business continuity', question: 'Are backups encrypted, stored separately, and restore-tested at least quarterly?', evidence: 'Backup configuration, restore test record', mapping: 'ISO 27001 A.8.13; SOC 2 A1.2' },
  { id: 'EP-01', domain: 'Endpoint security', question: 'Are company devices managed (MDM), encrypted and protected with EDR or anti-malware?', evidence: 'MDM compliance report', mapping: 'ISO 27001 A.8.1, A.8.7; SOC 2 CC6.8' },
  { id: 'PR-01', domain: 'Privacy', question: 'Will you sign our data processing agreement, and how do you support data subject requests?', evidence: 'DPA, DSR procedure', mapping: 'GDPR Art. 28; DPDP Sec. 8', lite: true },
  { id: 'IN-01', domain: 'Insurance', question: 'Do you hold cyber liability insurance? Please state the coverage limit.', evidence: 'Certificate of insurance', mapping: 'Contractual', lite: true },
];

export interface AddOn { id: string; name: string; description: string; questions: VQ[] }

export const SECTOR_ADDONS: AddOn[] = [
  { id: 'financial', name: 'Financial Services', description: 'Banks, NBFCs, payments, insurance, investment firms', questions: [
    { id: 'FS-01', domain: 'Financial Services', question: 'Do you store, process or transmit payment card data? If so, provide your PCI DSS v4.0 Attestation of Compliance and responsibility matrix.', evidence: 'AOC, responsibility matrix', mapping: 'PCI DSS Req. 12.8, 12.9' },
    { id: 'FS-02', domain: 'Financial Services', question: 'Will you grant our regulators (for example RBI, SEBI, OCC, ECB) the right to access, audit and inspect your premises, systems and records?', evidence: 'Contract clause', mapping: 'RBI IT Outsourcing Directions 2023; DORA Art. 30; US Interagency Guidance 2023' },
    { id: 'FS-03', domain: 'Financial Services', question: 'Is the service a critical or important function for us? Describe your exit and transition assistance plan.', evidence: 'Exit plan', mapping: 'DORA Art. 28(8), Art. 30; EBA Outsourcing Guidelines' },
    { id: 'FS-04', domain: 'Financial Services', question: 'Do you provide SOC 1 Type II coverage for controls relevant to our financial reporting?', evidence: 'SOC 1 Type II report', mapping: 'SOX 404; SSAE 18' },
    { id: 'FS-05', domain: 'Financial Services', question: 'Can you meet our regulatory incident reporting timelines (for example CERT-In 6 hours, DORA major ICT incident reporting)?', evidence: 'IR plan with timelines', mapping: 'CERT-In Directions 2022; DORA Art. 19' },
    { id: 'FS-06', domain: 'Financial Services', question: 'Is any data or processing located outside the country? Confirm compliance with data localisation requirements (for example RBI payment data storage).', evidence: 'Data location statement', mapping: 'RBI Storage of Payment System Data 2018' },
    { id: 'FS-07', domain: 'Financial Services', question: 'Do you screen staff, owners and subcontractors against sanctions and AML watchlists?', evidence: 'Screening procedure', mapping: 'AML / KYC obligations' },
    { id: 'FS-08', domain: 'Financial Services', question: 'Do you use subcontractors for any part of a critical function? List them and confirm flow-down of our terms.', evidence: 'Subcontractor register', mapping: 'DORA Art. 30(2)(a); RBI Directions' },
  ] },
  { id: 'healthcare', name: 'Healthcare', description: 'Providers, payers, health tech, life sciences', questions: [
    { id: 'HC-01', domain: 'Healthcare', question: 'Will you create, receive, maintain or transmit protected health information (PHI)? If so, will you sign our Business Associate Agreement?', evidence: 'Signed BAA', mapping: 'HIPAA 164.502(e), 164.504(e)' },
    { id: 'HC-02', domain: 'Healthcare', question: 'Have you completed a HIPAA Security Rule risk analysis in the last 12 months?', evidence: 'Risk analysis summary', mapping: 'HIPAA 164.308(a)(1)(ii)(A)' },
    { id: 'HC-03', domain: 'Healthcare', question: 'Do you hold HITRUST CSF certification or an equivalent assessment covering PHI?', evidence: 'HITRUST letter or report', mapping: 'HITRUST CSF' },
    { id: 'HC-04', domain: 'Healthcare', question: 'Are access to PHI and system activity logged and reviewed regularly?', evidence: 'Audit log configuration, review record', mapping: 'HIPAA 164.312(b), 164.308(a)(1)(ii)(D)' },
    { id: 'HC-05', domain: 'Healthcare', question: 'Within how many days will you report a breach of unsecured PHI to us?', evidence: 'BAA clause', mapping: 'HIPAA 164.410' },
    { id: 'HC-06', domain: 'Healthcare', question: 'Do your subcontractors that handle PHI sign BAAs with you?', evidence: 'Subcontractor BAA list', mapping: 'HIPAA 164.502(e)(1)(ii)' },
    { id: 'HC-07', domain: 'Healthcare', question: 'If you are a medical device or software-as-a-medical-device vendor, how do you manage cybersecurity across the product lifecycle (SBOM, patching, vulnerability disclosure)?', evidence: 'SBOM, coordinated disclosure policy', mapping: 'FDA premarket cybersecurity guidance' },
  ] },
  { id: 'saas', name: 'Technology & SaaS', description: 'Cloud, SaaS, platforms, developer tools', questions: [
    { id: 'TS-01', domain: 'Technology & SaaS', question: 'Which cloud providers and regions host the service, and is the hosting provider carved out of your SOC 2?', evidence: 'SOC 2 section 3, subservice list', mapping: 'SOC 2 CC9.2; ISO 27001 A.5.23' },
    { id: 'TS-02', domain: 'Technology & SaaS', question: 'Do you publish a CAIQ or CSA STAR entry?', evidence: 'CAIQ, STAR link', mapping: 'CSA CCM v4' },
    { id: 'TS-03', domain: 'Technology & SaaS', question: 'Do customers get audit logs of user and admin activity within the product, and for how long?', evidence: 'Product documentation', mapping: 'ISO 27001 A.8.15' },
    { id: 'TS-04', domain: 'Technology & SaaS', question: 'What uptime SLA do you commit to, and where is status and incident history published?', evidence: 'SLA, status page', mapping: 'SOC 2 A1.1' },
    { id: 'TS-05', domain: 'Technology & SaaS', question: 'How are API keys, OAuth tokens and integrations secured and scoped?', evidence: 'API security documentation', mapping: 'OWASP API Security Top 10' },
    { id: 'TS-06', domain: 'Technology & SaaS', question: 'Can you provide a software bill of materials (SBOM) for the product?', evidence: 'SBOM (SPDX or CycloneDX)', mapping: 'NIST SP 800-218; EO 14028 guidance' },
  ] },
  { id: 'critical', name: 'Critical Infrastructure', description: 'Energy, utilities, telecom, transport, OT', questions: [
    { id: 'CI-01', domain: 'Critical Infrastructure', question: 'Will you have remote or on-site access to OT or industrial control systems? Describe how that access is controlled and monitored.', evidence: 'Remote access procedure, jump host design', mapping: 'IEC 62443-2-4; NERC CIP-005' },
    { id: 'CI-02', domain: 'Critical Infrastructure', question: 'Do your products or services comply with IEC 62443 or equivalent OT security standards?', evidence: 'Certification or assessment', mapping: 'IEC 62443' },
    { id: 'CI-03', domain: 'Critical Infrastructure', question: 'How do you verify the integrity of firmware and software updates delivered to us?', evidence: 'Code signing and update process', mapping: 'NIST SP 800-161; NERC CIP-013' },
    { id: 'CI-04', domain: 'Critical Infrastructure', question: 'Can you meet NIS2 or national incident reporting obligations (early warning within 24 hours)?', evidence: 'IR plan with timelines', mapping: 'NIS2 Art. 23' },
    { id: 'CI-05', domain: 'Critical Infrastructure', question: 'Are any components, staff or support functions located in high-risk jurisdictions?', evidence: 'Supply chain and location statement', mapping: 'NIS2 Art. 21(2)(d); NIST SP 800-161' },
  ] },
  { id: 'retail', name: 'Retail & E-Commerce', description: 'Retail, marketplaces, consumer apps', questions: [
    { id: 'RE-01', domain: 'Retail & E-Commerce', question: 'Do you handle cardholder data or payment pages for us? Provide your PCI DSS AOC and confirm scripts on payment pages are inventoried and authorised.', evidence: 'AOC, script inventory', mapping: 'PCI DSS Req. 6.4.3, 11.6.1, 12.8' },
    { id: 'RE-02', domain: 'Retail & E-Commerce', question: 'Do you collect consumer personal data, cookies or tracking on our behalf? How is consent captured and honoured?', evidence: 'Consent management description', mapping: 'GDPR Art. 6, 7; ePrivacy; CCPA/CPRA; DPDP Sec. 6' },
    { id: 'RE-03', domain: 'Retail & E-Commerce', question: 'Do you sell or share consumer personal data with third parties?', evidence: 'Privacy notice, data sharing statement', mapping: 'CCPA/CPRA 1798.120' },
    { id: 'RE-04', domain: 'Retail & E-Commerce', question: 'What fraud prevention and bot protection controls protect checkout and accounts?', evidence: 'Control description', mapping: 'PCI DSS 6.4; OWASP Automated Threats' },
    { id: 'RE-05', domain: 'Retail & E-Commerce', question: 'Can the service handle peak season load? Share capacity testing results.', evidence: 'Load test report', mapping: 'SOC 2 A1.1' },
  ] },
  { id: 'manufacturing', name: 'Manufacturing', description: 'Manufacturing, supply chain, logistics', questions: [
    { id: 'MF-01', domain: 'Manufacturing', question: 'Will you connect to our plant networks, MES or OT systems? How is the connection segmented and monitored?', evidence: 'Network diagram, access procedure', mapping: 'IEC 62443-3-3' },
    { id: 'MF-02', domain: 'Manufacturing', question: 'How do you protect our designs, specifications and other intellectual property you receive?', evidence: 'IP protection controls, NDA', mapping: 'ISO 27001 A.5.12, A.5.32' },
    { id: 'MF-03', domain: 'Manufacturing', question: 'Do you hold TISAX or an equivalent assessment (for automotive supply chains)?', evidence: 'TISAX label or report', mapping: 'VDA ISA / TISAX' },
    { id: 'MF-04', domain: 'Manufacturing', question: 'What is your business continuity plan for supply disruption, and do you have alternate sources for critical components?', evidence: 'BCP, supplier diversification plan', mapping: 'ISO 22301; ISO 28000' },
  ] },
  { id: 'government', name: 'Government & Public Sector', description: 'Public sector, defence, contractors to government', questions: [
    { id: 'GV-01', domain: 'Government', question: 'Does the service hold FedRAMP, StateRAMP, or an equivalent national cloud authorisation (for example MeitY empanelment in India)?', evidence: 'Authorisation letter', mapping: 'FedRAMP; MeitY Cloud Empanelment' },
    { id: 'GV-02', domain: 'Government', question: 'Will you handle Controlled Unclassified Information or Criminal Justice Information? Confirm CMMC level or CJIS compliance.', evidence: 'CMMC status, CJIS addendum', mapping: 'NIST SP 800-171; CMMC 2.0; CJIS Security Policy' },
    { id: 'GV-03', domain: 'Government', question: 'Are data and support staff restricted to in-country locations and screened citizens where required?', evidence: 'Location and personnel statement', mapping: 'FedRAMP; CJIS 5.12' },
    { id: 'GV-04', domain: 'Government', question: 'Do you comply with secure software development attestation requirements?', evidence: 'Secure software development attestation', mapping: 'NIST SP 800-218 (SSDF); OMB M-22-18' },
  ] },
];

export const TOPIC_ADDONS: AddOn[] = [
  { id: 'ai', name: 'AI and ML', description: 'Vendors that use or provide AI on your data', questions: [
    { id: 'AI-01', domain: 'AI', question: 'Does the service use AI or ML on our data? Describe the use cases and models (own or third-party).', evidence: 'AI use description, model providers', mapping: 'ISO 42001 A.10; NIST AI RMF GOVERN 6' },
    { id: 'AI-02', domain: 'AI', question: 'Is our data, including prompts and outputs, used to train or improve models? Can this be contractually excluded?', evidence: 'Data use terms', mapping: 'GDPR Art. 5(1)(b); ISO 42001 A.7' },
    { id: 'AI-03', domain: 'AI', question: 'How long are prompts, outputs and logs retained, and where?', evidence: 'Retention terms', mapping: 'GDPR Art. 5(1)(e)' },
    { id: 'AI-04', domain: 'AI', question: 'How do you test for accuracy, bias, prompt injection and data leakage? Share recent results.', evidence: 'Evaluation and red-team results', mapping: 'ISO 42001 A.6.2.4; NIST AI RMF MEASURE; OWASP LLM Top 10' },
    { id: 'AI-05', domain: 'AI', question: 'Will you notify us before material model changes?', evidence: 'Change notification terms', mapping: 'ISO 42001 A.8.5' },
    { id: 'AI-06', domain: 'AI', question: 'Do you hold ISO/IEC 42001 certification, and what is your role under the EU AI Act (provider or deployer)?', evidence: 'Certificate, EU AI Act statement', mapping: 'ISO 42001; EU AI Act Art. 16, 26' },
  ] },
  { id: 'privacy-heavy', name: 'Personal data processor', description: 'Vendors processing significant personal data', questions: [
    { id: 'PP-01', domain: 'Privacy', question: 'What transfer mechanism covers personal data leaving the EEA, UK or India (adequacy, Data Privacy Framework, SCCs, IDTA)?', evidence: 'Transfer mechanism, transfer impact assessment', mapping: 'GDPR Art. 44 to 49; DPDP Sec. 16' },
    { id: 'PP-02', domain: 'Privacy', question: 'Do you maintain a record of processing activities for our data?', evidence: 'ROPA extract', mapping: 'GDPR Art. 30(2)' },
    { id: 'PP-03', domain: 'Privacy', question: 'Have you appointed a Data Protection Officer or privacy lead? Provide contact details.', evidence: 'DPO contact', mapping: 'GDPR Art. 37; DPDP Sec. 10' },
    { id: 'PP-04', domain: 'Privacy', question: 'Will you assist with DPIAs and regulator inquiries concerning our data?', evidence: 'DPA clause', mapping: 'GDPR Art. 28(3)(f), Art. 35' },
  ] },
];
