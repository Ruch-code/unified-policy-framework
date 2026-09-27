import React, { useState } from 'react';
import {
  ClipboardList, GitBranch, CheckCircle, AlertTriangle,
  FileSignature, XCircle, MinusCircle, ListChecks, ScrollText, Landmark, Briefcase, Building2, Cpu,
  Server, Factory, CloudCog, ShieldCheck,
} from 'lucide-react';

const STEPS = [
  {
    step: 1,
    title: 'Scope your ISMS (Clause 4.3)',
    do: 'Decide what is in scope: the organizational units, locations, systems, data, and processes the ISMS covers. For a startup this is usually "everyone + the SaaS/cloud stack that touches production or customer data".',
    output: 'A written scope statement with in/out boundaries.',
  },
  {
    step: 2,
    title: 'Map context & interested parties (Clauses 4.1, 4.2)',
    do: 'List internal/external issues that affect security (funding stage, customers, investors, regulations) and the interested parties with requirements (customers, regulators, cloud providers, insurers).',
    output: 'A short context + stakeholder register feeding the risk criteria.',
  },
  {
    step: 3,
    title: 'Define risk criteria & build the asset/process inventory (Clause 6.1.2)',
    do: 'Set risk appetite, likelihood/impact scales, and acceptance thresholds. Inventory what you protect: applications, data types (PII, PHI, card data, IP), infrastructure, devices, SaaS tools, people, and critical processes.',
    output: 'Risk criteria + an asset/data inventory you can map controls to.',
  },
  {
    step: 4,
    title: 'Run the risk assessment (Clause 6.1.2)',
    do: 'Identify threats and vulnerabilities per asset/process, score likelihood × impact, and record risks in a register. Keep it lightweight for a startup: 15–30 risks is normal.',
    output: 'A live risk register with scores and owners.',
  },
  {
    step: 5,
    title: 'Select risk treatment → apply vs exclude (Clause 6.1.3)',
    do: 'For each risk decide: mitigate (typically by picking Annex A controls), transfer (insure, add DPA), avoid, or accept. Every risk given Annex A controls now becomes an SoA row.',
    output: 'A draft control selection (the raw material of the SoA).',
  },
  {
    step: 6,
    title: 'Write the Statement of Applicability (Clause 6.1.3 d)',
    do: 'Build the matrix of 93 Annex A controls. For each: is it applied (in scope) or excluded (justified)? Include implementation status, owner, related policy, and evidence location. No straight "not applicable" without a written reason — exclusion must be defensible to an auditor.',
    output: 'The SoA document — the heart of your audit evidence.',
  },
  {
    step: 7,
    title: 'Implement the controls & wire up evidence (Clauses 7, 8)',
    do: 'Stand up the resources, competence, awareness, communication, and documentation from Clause 7, then execute the operations in Clause 8. Point each SoA row at its policy + the screenshots/records that prove it.',
    output: 'Implemented controls with an evidence map.',
  },
  {
    step: 8,
    title: 'Monitor, audit & review — keep the SoA honest (Clauses 9, 10)',
    do: 'Run internal audits, management review, and monitoring. Re-run the risk assessment and refresh the SoA on any significant change: new scope, new supplier, new regulation, new product line, or audit findings.',
    output: 'A living SoA with a version history and review dates.',
  },
];

const SOA_FIELDS = [
  'Control reference (A.5.x / A.6.x / A.7.x / A.8.x)',
  'Control title',
  'In scope — applied / excluded',
  'Exclusion justification (business or technical reason)',
  'Implementation status (implemented / partially / planned)',
  'Control owner',
  'Reference documents (policy, procedure, standard)',
  'Evidence location (screenshots, logs, registers)',
  'Risk register link (which risk it mitigates)',
];

const THEMES = [
  {
    theme: 'Organizational — A.5 (37 controls)',
    icon: Landmark,
    intro: 'Governance, policy, risk, supplier and incident controls. For a startup, nearly all of A.5 applies — the question is depth, not existence.',
    color: 'indigo',
    families: [
      { ref: 'A.5.1', title: 'Policies for information security', sel: 'selected', just: 'Core starter policy set — auditors expect it from day one.', checks: ['Verify an Information Security Policy exists with a current review date and approved version/author.', 'Check scope statement in the policy matches the ISMS scope (Clause 4.3) and references risk-assessment outputs.', 'Confirm policy is distributed and acknowledged (HR onboarding log or training record).', 'Look for a documented review cadence (e.g., annual + management-review tie-in).'], questions: ['Who approves the policy set, and on what cadence?', 'If I ask for the current version and its revision history, can you show it?', 'How do new hires receive the policy — and how do you prove they read it?'] },
      { ref: 'A.5.2', title: 'Roles & responsibilities', sel: 'selected', just: 'A single accountable owner is the minimum for any scope.', checks: ['Confirm a named security owner is documented (name + role + budget/authority).', 'Check job descriptions, contracts, or a RACI that assign security duties.', 'Verify every person who touches data sees their security responsibility in writing.'], questions: ['Who is accountable tonight if a control fails — is it written down?', 'Show me the security RACI or role chart.', 'Is the security role in a contract/JD, or just verbal agreement?'] },
      { ref: 'A.5.3', title: 'Segregation of duties', sel: 'selected', just: 'Lightweight PR/branch rules; a 1-person team may briefly justify a single sign-off conflict.', checks: ['Walk the deploy path: can the writer, approver, and releaser be the same person?', 'Check access reviews for overlapping admin/approver roles (e.g., same person owns code + prod).', 'If a 1-person or 2-person team, confirm the conflict is documented as accepted risk with compensating control (branch protection, dual signatures).', 'Verify the SoA notes the limitation and a trigger to review when headcount grows.'], questions: ['Who approves a production change, and do they also merge or deploy it?', 'Can you show the last 3 deployments with the reviewer recorded?', 'When you hire a second engineer, what changes in this pathway?'] },
      { ref: 'A.5.4', title: 'Management responsibilities', sel: 'selected', just: 'Leadership support is an absolute, non-optional requirement.', checks: ['Check leadership actively enforces policy: board/QBR agenda items, signed security direction, budget line for security tools.', 'Confirm management allocated staff time + budget for security (a founder who only talks is not enough).', 'Look for documented management review of security status (Clause 9.3 linkage).'], questions: ['What did leadership actually do for security last quarter — with evidence?', 'Who signs off the security budget?', 'What security metric does management review on a regular cadence?'] },
      { ref: 'A.5.5', title: 'Contact with authorities', sel: 'selected', just: 'Breach-notification obligations (e.g. 72h GDPR, 6h CERT-In) bind startups too.', checks: ['Confirm a written list of relevant authorities + who notifies them (DPO/regulator/CERT contacts).', 'Check notification SLAs are documented (GDPR 72h, CERT-In 6h, sector regulators).', 'Verify the list is wired into the incident runbook and phone tree, not just a slide.'], questions: ['If an EU user is breached tonight, who do you notify within 72 hours?', 'Where is that authority list stored, and who has access?', 'Have you ever engaged a regulator — what was the outcome?'] },
      { ref: 'A.5.6', title: 'Contact with special interest groups', sel: 'optional', just: 'Join free OWASP/CIS groups for intel; no formal process required early on.', checks: ['If applied: confirm membership/participation in at least one group (OWASP, CIS, vendor community, CERT advisories).', 'Check whether group intel/advisories actually feed your risk or vuln process.', 'If excluded: document why and name the compensating feed (e.g., vendor advisories).'], questions: ['Which security groups or advisory feeds do you genuinely consume?', 'How does an advisory reach someone who can act on it?', 'Could you evidence participation if an auditor asked?'] },
      { ref: 'A.5.7', title: 'Threat intelligence', sel: 'optional', just: 'Vendor/cloud advisories cover most early-stage intel needs.', checks: ['If applied: confirm subscriptions (CISA, cloud provider advisories, vendor disclosures) exist.', 'Check who receives feeds and how they triage into patching/monitoring.', 'If excluded: justify by size/attractiveness and name the threat modeling relied on.'], questions: ['Which threat actor or campaign worries you for a startup of your size?', 'Where does that intel come from, and does it reach engineering?', 'What did the last 3 critical advisories change in your stack?'] },
      { ref: 'A.5.8', title: 'Security in project management', sel: 'selected', just: 'Security in the definition-of-ready prevents tech debt cheaply.', checks: ['Confirm security criteria exist in definition-of-ready/done (threat model, review, authn/z check).', 'Check at least one recent feature ticket includes security tasks, not just afterthought.', 'Verify a security gate is enforceable and not silently skippable.'], questions: ['What security check happens before a feature ships, and who holds the gate?', 'Show me an example ticket where security was called out explicitly.', 'What security debt are you knowingly carrying right now?'] },
      { ref: 'A.5.9', title: 'Asset inventory', sel: 'selected', just: 'Cannot protect what you don\'t know — includes cloud and shadow SaaS.', checks: ['Confirm an inventory exists covering systems, SaaS, data stores, code, people roles.', 'Cross-check against SSO app list + cloud account resources to catch shadow IT.', 'Check inventory has an owner per asset, data classification, and last-reconciled date.', 'Verify infra-as-code/CD has a register of services in scope.'], questions: ['List every SaaS tool your team added last month, incl. personal accounts holding work data.', 'If I compare your SSO apps to this inventory, what is the delta?', 'Who owns the asset register, and when was it last reconciled?'] },
      { ref: 'A.5.10', title: 'Acceptable use of assets', sel: 'selected', just: 'Needed once corporate devices and SaaS are issued.', checks: ['Confirm an AUP exists covering devices, email, SaaS, personal accounts, internet.', 'Check acknowledgement evidence (HR signatures or training logs) for all staff.', 'Verify policy is consistent with reality (MDM-managed devices, approved tooling).'], questions: ['What is allowed on a company laptop that is not allowed on a personal one?', 'How do I prove every employee acknowledged the AUP?', 'What happens when someone uses a personal account for work data?'] },
      { ref: 'A.5.11', title: 'Return of assets', sel: 'selected', just: 'Offboarding revocation is core; automate it.', checks: ['Confirm offboarding checklist covers device return + account revocation on every system.', 'Check IdP/MDM deprovisioning happens within a defined SLA of termination.', 'Sample the last offboarding: was access dead same-day?', 'Verify role-change (not just termination) also adjusts access.'], questions: ['Show me the last offboarding ticket — when was access actually revoked?', 'Which system could a former employee still log into tomorrow?', 'Who owns follow-through when the laptop comes back late?'] },
      { ref: 'A.5.12', title: 'Classification of information', sel: 'selected', just: 'Church of the 3-tier scheme; no sensitive data without it.', checks: ['Confirm a classification scheme is documented (e.g., Public / Internal / Confidential incl. PII+PHI).', 'Check example data types are mapped to tiers (customer PII → confidential).', 'Verify tier drives controls (confidential → encryption + restricted access) and that people can actually label.', 'Sample a real data store and confirm it is tagged correctly.'], questions: ['Classify "customer email list" and "roadmap deck" — are the answers consistent across the team?', 'Where is the scheme documented, and who decides edge cases?', 'How does classification change what controls apply to a given system?'] },
      { ref: 'A.5.13', title: 'Labelling of information', sel: 'optional', just: 'Classification policy + access controls can cover early stage; formal labelling deferred.', checks: ['If applied: confirm confidential items carry labels (email headers, doc markings, tool tagging).', 'If excluded: validate the compensating story (classification policy + access controls) is written in the SoA.', 'Check one sample of confidential email/docs to see whether readers would know sensitivity.', 'Confirm the trigger that would bring labelling in-scope (e.g., sharing data cross-org).'], questions: ['If confidential data circulates with no visible label, how does a reader know it’s confidential?', 'What labelling tooling would it take to change your mind?', 'Is that exclusion documented and accepted in the SoA?'] },
      { ref: 'A.5.14', title: 'Information transfer', sel: 'selected', just: 'TLS + controlled file share for any external data movement.', checks: ['Confirm encryption in transit (TLS 1.2+) for all external data movement (email, files, APIs).', 'Check how large files of customer data are shared (SFTP, link with expiry/auth) vs raw email attachments.', 'Verify no plaintext PII by default; DLP/egress visibility for key channels.', 'Sample one external transfer and trace it end-to-end.'], questions: ['How do you hand a 5GB file with customer data to a client?', 'Can anyone with the link open your shared folder, and does it expire?', 'What is the rule for emailing a spreadsheet of customer data?'] },
      { ref: 'A.5.15–5.18', title: 'Access control, identity, auth info, access rights', sel: 'selected', just: 'Full identity foundation: IdP, MFA, quarterly reviews, JIT prod access.', checks: ['Confirm a single IdP (Okta, Entra) with SCIM automated provisioning/deprovisioning.', 'Check MFA enforced org-wide on SSO + cloud, incl. break-glass.', 'Review the most recent access review (≤90 days) with documented decisions off any shared/blanket accounts.', 'Verify privileged/prod access is JIT (PIM/Teleport) and logged.'], questions: ['Who has admin on your billing account vs production, and why?', 'Show me this quarter’s access review — what was revoked?', 'Can a new hire be productive day one without anyone pasting passwords?'] },
      { ref: 'A.5.19–5.22', title: 'Suppliers & supply chain', sel: 'selected', just: 'One-page vendor inventory + DPA/BAA per data-touching vendor.', checks: ['Confirm a vendor inventory exists with data-touch tiering (customer data, infra, non-sensitive).', 'Check DPA/BAA/right-to-audit present for top-tier vendors touching PII/PHI/card data.', 'Verify vendor risk questionnaires exist for significant suppliers and sub-processor-change notices are monitored.', 'Confirm offboarding of a vendor revokes their access within SLA.'], questions: ['Which vendors touch customer or personal data — is that list complete?', 'Which of your vendors have a signed DPA or BAA?', 'What do you receive when a vendor changes its sub-processors, and who reviews it?'] },
      { ref: 'A.5.23', title: 'Cloud services', sel: 'selected', just: 'A startup runs on cloud — baseline, logging, and procurement checks are mandatory.', checks: ['Confirm a cloud security baseline: encryption, KMS, least-privilege IAM, logging on all environments.', 'Check cloud accounts are enrolled in a security dashboard/guardrails (landing zone, SCPs).', 'Verify shared-responsibility model and data residency are documented.', 'Check compliance posture tools (CSPM) are watching for misconfig.', 'Sample an account to confirm logging + MFA + no root-key standing use.'], questions: ['Which parts of the cloud shared-responsibility model are you on the hook for?', 'Is logging on for staging too, or only production?', 'Where does your data physically live, and can you prove it from config?', 'If a cloud key leaked today, what would the blast radius be?'] },
      { ref: 'A.5.24–5.28', title: 'Incident management', sel: 'selected', just: 'Runbook, quarterly tabletop, evidence preservation — non-negotiable.', checks: ['Confirm an incident response runbook: roles, on-call, contacts, preserve steps, notification SLAs, comms plan.', 'Check central log aggregation exists to support investigation.', 'Verify a tabletop occurred in the last quarter/year with lessons captured and actions tracked.', 'Confirm an evidence-preservation checklist (logs, screenshots, timestamps, chain of custody) is used.', 'Check incident register logs events, classifications, and closure with root cause.'], questions: ['Walk me through a phishing click at 4pm — who does what in the first hour?', 'What logs exist today that would help, and which are missing?', 'When did you last rehearse an incident, and what changed because of it?', 'Who decides a breach is notifiable, and how fast?'] },
      { ref: 'A.5.29–5.30', title: 'Disruption & ICT readiness (BCDR)', sel: 'selected', just: 'RTO/RPO + one restore test per quarter.', checks: ['Confirm a BCDR plan with defined RTO/RPO per system and role assignments.', 'Check backups are automated, encrypted, and isolated from production (ideally immutable).', 'Verify a restore test occurred in the last quarter with results documented.', 'Cross-check redundancy/failover expectations against customer SLAs and insurance.'], questions: ['If your primary cloud region dies for 24h, what exactly breaks?', 'What RTO/RPO are written down — and can you truly restore last night’s backup?', 'Show me the last restore test — was it successful, in full?', 'Which customer contract obligates uptime your architecture can’t meet?'] },
      { ref: 'A.5.31–5.34', title: 'Legal/statutory/contractual, IPR, records, PII', sel: 'selected', just: 'GDPR/DPDPA and DPAs bind startups that hold customer data.', checks: ['Confirm a legal obligations register (GDPR, DPDPA, PCI, sector laws, customer DPAs) with owner.', 'Check retention + deletion schedules per data type and automated enforcement where possible.', 'Verify IPR/trade-secret protections (access to source, NDAs, repos) and records-management are documented.', 'Confirm privacy impact (DPIA/PIA) covers PII flows like analytics or cross-border transfer.'], questions: ['Which regulator could fine you tomorrow, and for what?', 'What is the deletion SLA for a customer who asks to be forgotten?', 'Where are trade secrets actually protected — repo access, code review, NDAs?', 'Which sub-processors are named in your privacy notice vs actually used?'] },
      { ref: 'A.5.35–5.37', title: 'Independent review, compliance, documented procedures', sel: 'selected', just: 'Annual pen test/audit + documented runbooks are audit-readiness basics.', checks: ['Confirm an annual independent review (pen test, internal audit, or cert audit) happened or is scheduled.', 'Check documented operating procedures for key ops (patching, backup, on-call, access provisioning).', 'Verify a mechanism shows compliance with your own policies (control checks, recurring audits).', 'Confirm review findings feed the risk register and corrective actions.'], questions: ['When is your next independent test, and what is the scope?', 'Where is the runbook for the top 5 operations nobody writes down?', 'How do you demonstrate compliance with your own policies, not just write them?'] },
    ],
  },
  {
    theme: 'People — A.6 (8 controls)',
    icon: Briefcase,
    intro: 'Human-factor controls. All 8 apply to any startup with employees or contractors — the trick is keeping them lightweight.',
    color: 'purple',
    families: [
      { ref: 'A.6.1', title: 'Screening', sel: 'selected', just: 'Verify FTEs/contractors that touch data.', checks: ['Confirm identity/background checks are performed before granting access to sensitive systems or data.', 'Check screening is consent-compliant and recorded privacy-safely.', 'Verify contractors touching data are screened to the same bar as employees.', 'Check if any role is exempt and whether that is justified in SoA.'], questions: ['Do you verify identity/background before granting access, or after?', 'Which roles are exempt from screening, and why?', 'Can you show evidence of the last hire’s screening record?'] },
      { ref: 'A.6.2', title: 'Terms & conditions of employment', sel: 'selected', just: 'Standard security clause in the offer letter.', checks: ['Confirm employment contracts include security roles, obligations, and policy adherence.', 'Check contractor agreements include equivalent security clauses.', 'Verify signing happens before system access is provisioned.', 'Confirm contract references the security policy set.'], questions: ['When does a new hire sign the contract — before or after their accounts are live?', 'Do contractors get the same security terms as employees?', 'What does the contract say about following the security policy?'] },
      { ref: 'A.6.3', title: 'Awareness, education & training', sel: 'selected', just: 'Annual training + phishing simulation is table stakes now.', checks: ['Confirm onboarding security training exists and is logged per person.', 'Check awareness cadence (annual minimum) and phishing simulation program with completion rates.', 'Verify content covers phishing, incident reporting, data handling, remote work, AUP.', 'Check training gap → access linkage (untrained people should not hold privileged access).'], questions: ['What did the last phishing simulation score, and what did you do about failures?', 'How do I prove every employee completed onboarding security training?', 'Is awareness a video, or does it test behavior?'] },
      { ref: 'A.6.4', title: 'Disciplinary process', sel: 'selected', just: 'One handbook paragraph referencing consequences of policy breach.', checks: ['Confirm a documented disciplinary process exists for security policy breaches.', 'Verify it is referenced in the handbook/AUP and applies consistently (including founders).', 'Check at least one application exists, or a documented note that none was needed.', 'Confirm process covers contractors too.'], questions: ['What concretely happens if someone exfiltrates data with a company account?', 'Does the same consequence apply to the CEO as to an intern?', 'Where is that documented so an auditor can see it is a process, not a threat?'] },
      { ref: 'A.6.5', title: 'Responsibilities after termination / role change', sel: 'selected', just: 'Automated offboarding + separation-of-access checklist.', checks: ['Confirm offboarding revokes access from all systems (SSO + direct, vault, cloud) within SLA.', 'Check asset return + recovery of work data on personal devices is enforced.', 'Verify role changes trigger access re-certification, not just resignations.', 'Sample an offboarding: was every system touched?' ], questions: ['If someone is let go at 5pm, when are all accounts dead?', 'Which system is NOT behind SSO and needs a manual revocation step?', 'What happens when a departing engineer has customer data on a personal laptop?'] },
      { ref: 'A.6.6', title: 'Confidentiality / non-disclosure agreements', sel: 'selected', just: 'NDAs for staff and vendors are standard.', checks: ['Confirm NDA coverage for employees, contractors, and vendors touching sensitive data.', 'Check NDAs are enforceable in relevant jurisdictions and signed before access.', 'Verify mutual NDAs protect data the startup receives, not just what it gives.', 'Check NDA inventory tracking (who, when, expiry).'], questions: ['Which parties touching your roadmap or customer data have no NDA?', 'Where are signed NDAs stored, and who tracks them?', 'Is your NDA mutual, so it also protects customer data you receive?'] },
      { ref: 'A.6.7', title: 'Remote working', sel: 'selected', just: 'Distributed team: MDM + encryption + a short remote-work policy.', checks: ['Confirm a remote-work policy: encrypted devices, VPN/ZTA, clear screen, third-party locations.', 'Check MDM enforces disk encryption and remote wipe on company devices.', 'Verify travel guidance exists (no untrusted public Wi-Fi without VPN, device safety).', 'Confirm remote ticket response exists for lost/stolen devices.'], questions: ['What is different about working from a cafe vs the office, security-wise?', 'Can a stolen laptop be wiped, and is disk encryption on by default?', 'What rule covers screens visible to other people at home?'] },
      { ref: 'A.6.8', title: 'Information security event reporting', sel: 'selected', just: 'Low-friction #security channel + alias.', checks: ['Confirm a low-friction reporting channel exists (#security, alias, form) and is known to staff.', 'Check culture signals: no-blame messaging, and reported events get acknowledged + triaged.', 'Verify reports are logged and feedback returned to the reporter.', 'Test the path with a real scenario (phishing click) and time-to-response.'], questions: ['If you click a phishing link, where do you report it, and is it blame-free?', 'What happened last time someone reported a false alarm — were they thanked?', 'Who triages reports, and can you show last month’s count?'] },
    ],
  },
  {
    theme: 'Physical — A.7 (14 controls)',
    icon: Building2,
    intro: 'Mostly about facilities. For a cloud-first startup without a data center, a large slice of A.7 becomes justifiably EXCLUDED — but you must write and re-validate the justification.',
    color: 'amber',
    families: [
{ ref: 'A.7.1–7.4', title: 'Perimeters, entry, offices, monitoring', sel: 'excluded', just: 'Fully remote or landlord-controlled space → excluded; company-controlled office → in scope (badge/monitoring).', checks: ['Determine the facility model FIRST: fully remote / no on-site hosting, landlord-controlled co-working, or company-controlled office.', 'Fully remote or no on-site facility: move the controls OUT of scope — remove the justification for inclusion, flip Status to Excluded, and remove the Vanta test link in the Implementation column.', 'If excluded: document who provides the compensating control (co-working landlord badging, CCTV) — never a bare “not applicable”.', 'Company controls its own office security: keep in scope — check entry control (badge/lock), visitor policy, and monitoring (CCTV where warranted), and re-add the Vanta test link.', 'Cross-check the Streetsmart page (or confirm with the client) for on-prem vs cloud hosting before finalizing column F.'], questions: ['Who controls access to your workspace — you, the co-working landlord, or nobody?', 'Do you hold any on-site servers, racks, or network closets that change the verdict?', 'If you lease your own floor, what entry + monitoring controls exist today?', 'Is the exclusion written with a named compensating party and a re-validate date?'] },
      { ref: 'A.7.5', title: 'Protection against physical & environmental threats', sel: 'excluded', just: 'Cloud provider handles facilities and environmental protection.', checks: ['Confirm no on-prem servers/NAS/network racks anywhere (incl. someone\'s home lab).', 'If excluded: cite the cloud provider\'s environmental controls (ISO 27001/22301 or SLA) in the SoA.', 'If on-prem exists: check fire/water/power protections (smoke detectors, UPS, off-floor storage).'], questions: ['Do you run any server, NAS, or network rack at the office or at home?', 'Which cloud guarantee covers facilities uptime, and is that cited in the SoA?', 'What would trigger this control back into scope?'] },
      { ref: 'A.7.6', title: 'Working in secure areas', sel: 'excluded', just: 'No classified secure zones in the startup footprint.', checks: ['Confirm no restricted-zones exist (hardware lab, secrets room, production cage).', 'If excluded: write why it does not apply and confirm no such area is planned without review.', 'If a secure area exists (e.g., hardware lab): check access control + visitor escort + logs.'], questions: ['Do you keep any no-entry zones or anywhere visitors can\'t go unescorted?', 'What is the most sensitive thing you\'d physically protect, and where does it live?', 'Is the exclusion consistent with your asset inventory (no secret room listed)?'] },
      { ref: 'A.7.7', title: 'Clear desk and clear screen', sel: 'selected', just: 'Auto-lock + tidy desks in shared/office environments.', checks: ['Confirm policy exists + endpoints auto-lock ≤5 min (MDM enforce).', 'Walk the floor: note visible confidential info on desks/screens (or remote equivalent audit).', 'Verify enforcement, not just policy — check MDM config screenshots.', 'Confirm shared screens/privacy filters where needed.'], questions: ['What happens to confidential printouts at end of day?', 'How fast do screens auto-lock, and is that forced by MDM?', 'When you last walked the floor, what did you see?'] },
      { ref: 'A.7.8', title: 'Equipment siting and protection', sel: 'selected', just: 'Cloud-hosted infra → defaults correct; self-hosted data centers/servers → stay in scope as Implemented.', checks: ['All infrastructure hosted by a cloud provider (the large majority of clients): by default the inputs are accurate — confirm device inventory via MDM + reasonable physical control.', 'Self-hosted (own data centers, servers, networking): keep the control IN scope — remove the justification for exclusion, flip Status to Implemented, and add the Vanta test link in the Implementation column.', 'Check shared/loaner devices are secured and tracked.', 'Verify no unattended unlocked hardware holding sensitive data.', 'Check devices in the office are locked to desks where co-working/public.'], questions: ['Is your infrastructure fully cloud-hosted (AWS/GCP/Azure/Heroku), or do you run on-prem servers?', 'If self-hosted, where are machines physically sited and who can access them?', 'Does your Streetsmart page confirm the hosting model, or must we ask the client?'] },
      { ref: 'A.7.9', title: 'Security of assets off-premises', sel: 'selected', just: 'Laptops travel: disk encryption + locate/wipe + insurance.', checks: ['Confirm disk encryption + MDM locate/wipe enabled on all company devices.', 'Check insurance/commercial coverage for loss/theft of devices.', 'Verify travel policy (VPN, no unattended bags, airport handling) exists and is followed.', 'Check a lost-device drill: wipe + credential rotation actually works.'], questions: ['If a laptop is stolen at a conference, what does your team do in the first hour?', 'Are all laptops encrypted by default, including loaners?', 'Who is liable — company or employee — for an off-prem device loss?'] },
      { ref: 'A.7.10', title: 'Storage media', sel: 'selected', just: 'Encrypted media, wiped before reuse or disposal.', checks: ['Confirm encryption on any removable/backup media.', 'Check a wipe procedure exists and is executed before media leaves control.', 'Verify lost media is tracked in the incident register.', 'Check backups on removable media (if any) follow the same encryption + handling rules.'], questions: ['Are there USB drives or portable disks in the wild? Where, and are they encrypted?', 'What is the wipe procedure before recycling an old disk?', 'How do you destroy media that cannot be wiped?'] },
      { ref: 'A.7.11', title: 'Supporting utilities', sel: 'excluded', just: 'Cloud-hosted → managed by provider SLA; self-hosted infra → in scope (UPS/power).', checks: ['All infrastructure hosted by a cloud provider: by default the inputs are accurate — nothing depends on office power/internet, provider SLA covers it.', 'Self-hosted (own data centers, servers, networking devices): keep the control IN scope — remove the justification for exclusion, flip Status to Implemented, and add the Vanta test link for the utility protections (UPS, power redundancy, climate).', 'If excluded: cite provider SLAs/multi-AZ in the SoA.', 'Re-check whenever colocation or on-prem equipment is added.'], questions: ['Does anything you own depend on office power or office internet to function?', 'If you host on-prem, is there a UPS/generator, and is it tested?', 'What cloud redundancy covers services if a region has an outage?'] },
      { ref: 'A.7.12', title: 'Cabling security', sel: 'excluded', just: 'Cloud-hosted → no on-prem network rooms; self-hosted → in scope.', checks: ['All infrastructure hosted by a cloud provider: by default the inputs are accurate — no on-prem network closets, racks, or physical cabling to protect.', 'Self-hosted: keep the control IN scope — remove the justification for exclusion, flip Status to Implemented, and add the Vanta test link covering cable-routing/physical access protections.', 'If any on-prem networking exists (office router/switch): check basic physical access + documentation.', 'Write the exclusion and tie it to the (empty) on-prem inventory.'], questions: ['Do you have any on-prem network closets or racks?', 'If so, who can physically reach the cabling?', 'Is the exclusion consistent with the asset inventory?'] },
      { ref: 'A.7.13', title: 'Equipment maintenance', sel: 'selected', just: 'Minimal: MDM inventory + vendor warranty.', checks: ['Confirm MDM tracks age/warranty/battery/OS-version for hardware.', 'Check a replacement cadence exists for EOL devices (no unsupported OS in service).', 'Verify maintenance is logged when performed (repair, battery swap, screen).', 'Check loaner stock is current and patched before issue.'], questions: ['How old is the average company laptop, and when do you replace?', 'What happens to devices that stop receiving OS updates?', 'Who performs maintenance, and is it recorded?'] },
      { ref: 'A.7.14', title: 'Secure disposal or re-use of equipment', sel: 'selected', just: 'Crypto-erase before devices leave your control.', checks: ['Confirm crypto-erase/verified-wipe before ANY device leaves (sale, recycle, donation, re-purpose).', 'Check a disposal log: serial → wipe evidence → disposition.', 'Verify third-party disposers are vetted (if used) and wipe certificates retained.', 'Check BYO/re-purpose doesn’t skip the wipe step.'], questions: ['What is the last thing done to a laptop before you sell or donate it?', 'Can you show wipe evidence for the last 3 retired devices?', 'Do you use a certified disposal vendor, or in-house wipe?'] },
    ],
  },
  {
    theme: 'Technological — A.8 (34 controls)',
    icon: Cpu,
    intro: 'Technical controls. A startup that builds software applies most of A.8; pure SaaS consumers apply a strong subset.',
    color: 'emerald',
    families: [
      { ref: 'A.8.1', title: 'User endpoint devices', sel: 'selected', just: 'MDM + EDR + disk encryption on all devices.', checks: ['Confirm MDM enrollment covers laptops AND phones (or a clear BYOD policy).', 'Check disk encryption + EDR + patch compliance across the fleet (coverage report).', 'Verify lost/stolen devices can be remotely located/wiped.', 'Check exceptions (unmanaged devices) are counted and justified.'], questions: ['Are all employees’ devices enrolled in MDM, or can someone work on an unmanaged laptop?', 'What is your fleet EDR coverage percentage?', 'Can you wipe a stolen laptop, and do you know its last backup state?'] },
      { ref: 'A.8.2', title: 'Privileged access rights', sel: 'selected', just: 'JIT elevation + session logging for admins.', checks: ['Confirm a named privileged-access approach (PIM/Teleport/SSM JIT) with approval gating.', 'Check who holds standing admin vs JIT, and that sessions are recorded.', 'Verify break-glass accounts exist, are monitored, rotated, and logged.', 'Check an audit of last month’s privileged sessions for anomalies.'], questions: ['Who can run kubectl/prod cloud commands right now without approval?', 'Show me last month’s privileged-access log — any anomalies?', 'What are your break-glass accounts, and who watches them?'] },
      { ref: 'A.8.3', title: 'Restriction of access to information', sel: 'selected', just: 'RBAC + least privilege + quarterly reviews.', checks: ['Confirm RBAC roles per system with least privilege (not group-wide "all access").', 'Check the most recent access review covered data stores, cloud, code, SaaS.', 'Verify no shared/blanket accounts, no orphaned high-privilege roles.', 'Check sensitive data access is documented (data-store ACLs, column/row restrictions).'], questions: ['Who besides the two people you named can read the customer DB?', 'How did you verify every role in GitHub/Salesforce/cloud is still needed?', 'Are there shared logins left, and what is the plan to kill them?'] },
      { ref: 'A.8.4', title: 'Access to source code', sel: 'selected', just: 'Least-privilege git access, branch protection, secret scanning.', checks: ['Confirm repo access least-privilege with protected branches (no direct-to-main pushes).', 'Check secret scanning (pre-commit + CI) and rotation on any leaked secret.', 'Verify CI/CD secrets live in a vault/secrets manager, not the repo.', 'Check external contributors have scoped access and review.'], questions: ['Who can push straight to main bypassing review?', 'If a token leaked in a commit, how would you find out and how fast?', 'Where do CI secrets live — a vault or a YAML file?'] },
      { ref: 'A.8.5', title: 'Secure authentication', sel: 'selected', just: 'MFA/passwordless everywhere, incl. break-glass paths.', checks: ['Confirm MFA enforced org-wide (not just admins) and passwordless/FIDO2 for privileged.', 'Check SSO covers all apps holding data; find orphan password-only tools.', 'Verify legacy protocols can’t bypass MFA (IMAP/SMTP without MFA, API keys, service accounts).', 'Test the recovery path when a phone with MFA is lost.'], questions: ['Which apps can still be logged into with password only?', 'Can an API key or legacy mail protocol defeat MFA?', 'What happens when an employee loses their MFA device — recovery path?'] },
      { ref: 'A.8.6', title: 'Capacity management', sel: 'selected', just: 'Cloud budgets + usage alerts.', checks: ['Confirm cloud spend/usage budgets + alerts exist with owners.', 'Check capacity planning for loaded services (autoscaling, quotas, limits).', 'Verify alerts are actioned (not ignored) — review recent alert history.', 'Check load tests exist for critical paths.'], questions: ['What is your cloud budget, and could autoscaling blow it in a day?', 'Who gets the alert when CPU or cost spikes?', 'Which service degrades first under 10x traffic?'] },
      { ref: 'A.8.7', title: 'Protection against malware', sel: 'selected', just: 'Managed EDR (CrowdStrike/Defender/SentinelOne).', checks: ['Confirm EDR/AV on endpoints and servers with tamper protection enabled.', 'Check detections are reviewed/triaged (SIEM/SOC) and responses tracked.', 'Verify no unmanaged device class (automated exceptions listed).', 'Confirm EDR is current (daily heartbeats, no stale agents).'], questions: ['How many EDR alerts did you get last month, and what did you do with them?', 'Which machines have no protection, and why?', 'Is protection one tool org-wide, or scattered across devices?'] },
      { ref: 'A.8.8', title: 'Management of technical vulnerabilities', sel: 'selected', just: 'Scan + patch SLAs with remediation tickets.', checks: ['Confirm scanning of code (SAST/SCA), containers, and cloud (CSPM).', 'Check patch SLAs (critical ≤24-48h) with remediation tickets and owners.', 'Verify a recent critical CVE was fixed within SLA — evidence.', 'Check vuln backlog is triaged, not accumulating silently.'], questions: ['What is your critical-patch SLA, and what happened with the last critical CVE?', 'Where do vulnerabilities get logged — a dedicated backlog?', 'Do you scan dependencies in CI, or only built images?'] },
      { ref: 'A.8.9', title: 'Configuration management', sel: 'selected', just: 'IaC + CIS baselines give versioned, hardened config.', checks: ['Confirm infra is IaC (Terraform/CloudFormation/SST) and versioned.', 'Check OS/container baselines (CIS/STIG) applied at build.', 'Verify drift detection or immutable config (no sneaky console edits).', 'Check config changes go through review like code.'], questions: ['Is your infrastructure reproducible from code, or from someone’s memory?', 'What baseline do images and VMs ship with?', 'If I destroyed Dev today, could you rebuild it from code in a day?'] },
      { ref: 'A.8.10', title: 'Information deletion', sel: 'selected', just: 'Lifecycle + retention policies on cloud storage/DBs.', checks: ['Confirm a retention schedule exists per data type (legal + business).', 'Check S3/Blob lifecycle policies and DB archival jobs are configured (not just documented).', 'Verify erasure of PII (right-to-be-forgotten) is operationalized end-to-end.', 'Confirm deletion is logged/verifiable for audits.'], questions: ['What happens to customer data 90 days after a contract ends?', 'Show me an S3/Blob lifecycle policy — who defined those windows?', 'Walk me through a privacy erasure request end-to-end.'] },
      { ref: 'A.8.11', title: 'Data masking', sel: 'selected', just: 'No real PII/PHI/card data in dev/test.', checks: ['Confirm dev/test/analytics use synthetic or anonymized data, not prod copies.', 'Check masking/anonymization tooling or generation pipeline exists.', 'Sample one dev DB — are there real names, emails, card numbers, SSNs?', 'Verify analytics dashboards don’t expose raw sensitive fields.'], questions: ['Where does dev/test data come from — prod or synthetic?', 'If an intern loaded the dev DB today, what sensitive fields exist?', 'Which analytics tools see raw vs masked data?'] },
      { ref: 'A.8.12', title: 'Data leakage prevention', sel: 'optional', just: 'Cheap egress controls (TLS, restricted S3) apply now; full DLP deferred until data exposure grows.', checks: ['If applied: confirm cheap egress controls (TLS everywhere, restricted storage, blocked USB where needed).', 'If excluded: document why (small surface) and name the trigger that would add full DLP.', 'Check monitoring of key egress paths (storage downloads, failed uploads, email of PII).', 'Verify data classification feeds DLP decisions if tooling is adopted.'], questions: ['What paths — other than a browser — could customer data leave your environment?', 'Do you monitor large downloads or failed uploads from storage?', 'What event would make you adopt full DLP?'] },
      { ref: 'A.8.13', title: 'Information backup', sel: 'selected', just: 'Automated, encrypted backups + quarterly restore test.', checks: ['Confirm automated, encrypted backups with versioning for critical systems.', 'Check a restore test occurred in the last quarter with documented results.', 'Verify backups are isolated from production (separate account/immutable).', 'Check backup coverage includes config + IaC, not just databases.'], questions: ['Can you restore from last night’s backup right now, and prove it?', 'Is the backup encrypted and separated from the production account?', 'How old is your most recent successful restore test?'] },
      { ref: 'A.8.14', title: 'Redundancy of information processing facilities', sel: 'selected', just: 'Multi-AZ per SLO tier; document lower tiers.', checks: ['Confirm multi-AZ/multi-region where the SLO requires it; single-AZ services documented as lower tier.', 'Check failover test evidence for critical services (recent, documented).', 'Verify redundancy matches contractual uptime commitments.', 'Check runbooks exist for failover.'], questions: ['Which services survive a full region outage, and which don’t?', 'When did you last failover-test, and what broke?', 'Do any customer SLAs promise more than your architecture delivers?'] },
      { ref: 'A.8.15–8.17', title: 'Logging, monitoring, clock sync', sel: 'selected', just: 'Central logging + alerting + NTP across infra.', checks: ['Confirm central log aggregation for auth, data access, admin actions, infrastructure.', 'Check alerting rules exist for key events and are triaged (not noisy-noise ignored).', 'Verify logs are protected (append-only) and retained per requirements (e.g., ≥180 days).', 'Check NTP sync configured on all devices; timestamps consistent for investigations.'], questions: ['Which security-relevant events are you NOT logging today?', 'How long are logs kept, and who could tamper with them?', 'Name an alert that fires if an attacker lists S3 buckets — does it exist?'] },
      { ref: 'A.8.18', title: 'Privileged utility programs', sel: 'selected', just: 'JIT + audit logging for admin tools.', checks: ['Confirm JIT approval for admin tools (cloud CLI, kubectl, DB consoles, SSMS).', 'Check audit logging captures who ran what, when, against what.', 'Verify no shared admin accounts; sessions attributable to a person.', 'Test: can an admin delete logs of their own actions?'], questions: ['Who can open the DB console right now, and is the session recorded?', 'What stops an admin from erasing their own audit trail?', 'Are privileged sessions attributable to a person, not a team login?'] },
      { ref: 'A.8.19', title: 'Installation of software on operational systems', sel: 'selected', just: 'MDM allowlist on company devices.', checks: ['Confirm MDM restrictions/allowlist on company devices (no arbitrary installs).', 'Check a request+approval path exists for new tools (with security review).', 'Verify installs are logged/visible; any exempt machine is registered.', 'Check browser-extension policy on work browsers.'], questions: ['Can a developer install a credential-stealing browser extension on their work machine?', 'What is the process to request a new tool, and who approves it?', 'Are there machines exempt from restrictions — and why?'] },
      { ref: 'A.8.20–8.22', title: 'Network security, services, segregation', sel: 'selected', just: 'Segmented VPCs/accounts + firewall + secure services.', checks: ['Confirm environment segmentation (prod/non-prod VPCs or accounts) with IAM boundaries.', 'Check security groups/network ACLs are least-privilege and reviewed.', 'Verify no public exposure of databases; boundaries firewalled.', 'Check network services (DNS, proxy, WAF) configured securely.'], questions: ['Can code in staging reach the production database?', 'What ports are open to the internet, and which is the least justifiable?', 'Is anything still in the default VPC that shouldn’t be?'] },
      { ref: 'A.8.23', title: 'Web filtering', sel: 'optional', just: 'Cheap to add later; excluded while risk is low.', checks: ['If applied: confirm category blocking on managed devices (malware, phishing).', 'If excluded: document why (layer of EDR catches most) and the trigger to add.', 'Verify exceptions are logged and reviewed.', 'Check incidents wouldn’t have been caught by EDR alone.'], questions: ['Has a malware infection ever been traced to web browsing?', 'What categories would you block if you flipped this on this week?', 'Is web filtering absent for a reason, or just not done yet?'] },
      { ref: 'A.8.24', title: 'Use of cryptography', sel: 'selected', just: 'TLS 1.2+, KMS, encrypted volumes/DBs, key rotation.', checks: ['Confirm TLS 1.2+ everywhere; scan for weak ciphers/expired certs.', 'Check KMS with rotation policy and least-privilege key access.', 'Verify encrypted volumes/DBs (at rest) across environments.', 'Check cert/expiry automation (no manual cert ops).'], questions: ['Which endpoints still serve TLS 1.1 or have an expired cert?', 'Where are your encryption keys, and who can use them?', 'When did you last rotate, and what is your rotation SLA?'] },
      { ref: 'A.8.25–8.29', title: 'Secure development lifecycle', sel: 'selected', just: 'SAST/DAST/SCA gates in CI; threat modelling for key flows.', checks: ['Confirm security gates in CI (SAST, SCA, secret scan) that FAIL builds on critical issues.', 'Check threat modelling exists for key flows (auth, payments, data export, admin).', 'Verify DAST/pen tests before major releases with findings tracked to closure.', 'Check secure architecture decisions are recorded (ADRs).'], questions: ['Does a build with a critical vuln actually fail CI?', 'Which of your flows have been threat-modelled?', 'When a pen test finds issues, who tracks them to closure?'] },
      { ref: 'A.8.30', title: 'Outsourced development', sel: 'optional', just: 'Outsourced dev → in scope, add clauses; all in-house → explain in the SoA, don\'t silently exclude.', checks: ['Determine the model FIRST: any development outsourced to external agencies/freelancers vs fully in-house.', 'Outsourced: keep the control IN scope — adjust column-F inputs per cell instructions (security requirements + right-to-audit in contract, CI security gates, access revocation at engagement end).', 'Fully in-house: keep in scope but flip column F to reflect no external development — remove the justification for exclusion, note “no external development” as the status, and do NOT mark it excluded without written rationale.', 'Check their code enters your pipeline through review + the same CI security gates.', 'Verify their access to your systems is scoped, timed, and revoked at end.'], questions: ['Which external parties wrote code for you in the last year?', 'Does the contract bind them to security requirements and testing?', 'How does their code get into your repo — reviewed and scanned like in-house?', 'If everything is in-house, is that stated in the SoA?'] },
      { ref: 'A.8.31', title: 'Separation of development, test, and production', sel: 'selected', just: 'IAM boundaries between environments, no shared DBs.', checks: ['Confirm separate accounts/namespaces with IAM boundaries (prod cannot be reached from dev).', 'Check dev/test can’t write prod data (network + credential separation).', 'Verify no shared prod credentials in dev/test config.', 'Check staging data is not production data.'], questions: ['Can code in staging write to the production database?', 'Are environments IAM-isolated, or do they trust each other?', 'Do the same production secrets appear in dev config?'] },
      { ref: 'A.8.32', title: 'Change management', sel: 'selected', just: 'PR + approval + automated rollout + rollback.', checks: ['Confirm production changes require approval, are tested, and reversible.', 'Check rollout/rollback process is documented and used (feature flags, canary, or blue/green).', 'Verify change records exist (PRs, deploy logs) for recent releases.', 'Check emergency changes still go through review within a defined window.'], questions: ['Can a developer deploy to production with no approval?', 'Show me the rollout + rollback plan for your last feature.', 'What was your last rollback, and why did it work?'] },
      { ref: 'A.8.33', title: 'Test information', sel: 'selected', just: 'Synthetic datasets; never copy prod PII into test.', checks: ['Confirm a test-data policy: no real PII/PHI/card data in non-prod.', 'Check synthetic/anonymized data source exists and is used.', 'Sample test data: any real names, emails, cards, SSNs?', 'Verify test DBs are not prod copies or snapshots of prod.'], questions: ['Where does your test data come from?', 'Has anyone ever copy-pasted a prod customer record into QA?', 'What sensitive fields would I find in the QA DB if I looked?'] },
      { ref: 'A.8.34', title: 'Protection of systems during audit testing', sel: 'selected', just: 'Rules-of-engagement + controlled scope for pen tests.', checks: ['Confirm rules-of-engagement/scope exist for external pen tests (approved by leadership).', 'Check testing runs against staging/isolated scope where possible; prod under controlled windows.', 'Verify audit tooling/credentials are least-privilege and revoked after.', 'Check findings from audit testing are tracked to closure like any vuln.'], questions: ['What is in scope when a pentester arrives, and who signs it off?', 'Can they run scans against prod during business hours?', 'Are pen-test credentials least-privilege and revoked afterwards?'] },
    ],
  },
];

const COLORS = {
  indigo: { box: 'border-indigo-100 dark:border-indigo-800', header: 'bg-indigo-50 dark:bg-indigo-900/30', title: 'text-indigo-700 dark:text-indigo-300' },
  purple: { box: 'border-purple-100 dark:border-purple-800', header: 'bg-purple-50 dark:bg-purple-900/30', title: 'text-purple-700 dark:text-purple-300' },
  amber: { box: 'border-amber-100 dark:border-amber-800', header: 'bg-amber-50 dark:bg-amber-900/30', title: 'text-amber-700 dark:text-amber-300' },
  emerald: { box: 'border-emerald-100 dark:border-emerald-800', header: 'bg-emerald-50 dark:bg-emerald-900/30', title: 'text-emerald-700 dark:text-emerald-300' },
};

const SEL_META = {
  selected: { label: 'Selected', Icon: CheckCircle, cls: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-300 dark:border-emerald-800' },
  optional: { label: 'Optional', Icon: MinusCircle, cls: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-300 dark:border-amber-800' },
  excluded: { label: 'Excluded', Icon: XCircle, cls: 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-900/20 dark:text-rose-300 dark:border-rose-800' },
};

const SCENARIO_OVERRIDES = [
  {
    title: 'Fully remote / no on-site facility — A.7.1–7.4',
    Icon: Briefcase,
    apply: 'The startup has no office, no co-working lease, and nothing physically hosted on-site.',
    action: 'Move the four controls OUT of scope: remove the justification for inclusion, flip Status to Excluded, and remove the Vanta test links from the Implementation column.',
    note: 'Never write a bare “not applicable”. Name the compensating party (co-working landlord badging, CCTV) and who owns that control, then re-validate the exclusion at each review.',
  },
  {
    title: 'Company-controlled office — A.7.1–7.4',
    Icon: Factory,
    apply: 'The startup leases its own floor / office and manages entry itself.',
    action: 'Keep the controls IN scope: badge/lock entry, visitor policy, CCTV where warranted — and re-add the Vanta test links.',
    note: 'If anything sensitive is hosted on-site (NAS, backup, hardware lab), those physical controls become high priority, not default-excluded.',
  },
  {
    title: 'Self-hosted infrastructure — A.7.8, A.7.11, A.7.12',
    Icon: Server,
    apply: 'The startup runs its own data center, colocated servers, network racks, or on-prem equipment.',
    action: 'Keep the controls IN scope: remove the justification for exclusion, flip Status to Implemented, and add the Vanta test links covering equipment siting, UPS/power redundancy, climate, and cable-routing protection.',
    note: `The cloud-first defaults are only correct for cloud-hosted startups (the majority). If you're not sure which applies, check the client's Streetsmart page (on-prem vs AWS/GCP/Azure/Heroku) and confirm with the client before finalizing column F.`,
  },
  {
    title: 'Cloud-hosted infrastructure — A.7.8, A.7.11, A.7.12',
    Icon: CloudCog,
    apply: 'All infrastructure is hosted by a cloud provider (majority of clients).',
    action: 'Leave the inputs as-is — they are accurate by default. Verify the provider SLA/multi-AZ story is cited in the SoA for the exclusions.',
    note: 'Re-check whenever colocation or on-prem equipment gets added; the moment a single server lands in an office, these exclusions stop being true.',
  },
  {
    title: 'Outsourced development — A.8.30',
    Icon: ShieldCheck,
    apply: 'The startup uses external dev shops, agencies, or freelancers to write code.',
    action: 'Keep A.8.30 IN scope and adjust the column-F inputs: security requirements + right-to-audit in the contract, code reviewed + scanned through the same CI gates, and vendor access scoped, timed, and revoked at engagement end.',
    note: 'All development in-house? Leave the control selected and state “no external development” in the implementation column — do not silently exclude a control that could flip the moment the first contractor is hired.',
  },
];

const NO_DEV_HOST = {
  title: 'The company has no software development or data hosting',
  icon: ShieldCheck,
  lead: 'Legal-only, consulting-only, marketing, or pure-SaaS-buyer startups still need an SoA. They simply exclude a tighter cluster of controls — each with a written reason, not a bare “N/A”.',
  groups: [
    {
      refs: 'A.8.25–8.30',
      label: 'Secure development lifecycle cluster (SDLC, security testing & testing in development)',
      rationale: 'No in-house or outsourced development happens; shipped code is built entirely by third-party vendors. Write: “the organisation does not develop software.”',
    },
    {
      refs: 'A.5.23',
      label: 'Cloud services usage',
      rationale: 'Cloud services are still used — but as a buyer via vendor contracts, not as a provider managing a cloud estate. The excludable element is the internal usage-governance layer, not the SaaS subscriptions themselves.',
    },
    {
      refs: 'A.7.4',
      label: 'Physical security monitoring',
      rationale: 'No owned or controlled premises to monitor; the team is fully remote or the landlord operates any on-site monitoring.',
    },
    {
      refs: 'A.8.16',
      label: 'Monitoring activities (partial)',
      rationale: 'The sub-components that presuppose development (application-level monitoring, code/deployment observability) are excluded; office/endpoint monitoring stays selected.',
    },
    {
      refs: 'A.8.24',
      label: 'Use of cryptography (dev/test environments)',
      rationale: 'Cryptography is still applied in production SaaS contexts; the development-environment sub-scope is excluded because no environments are developed internally.',
    },
  ],
  considerations: [
    'Every exclusion still needs a written justification that names why it does not apply and who inherits the risk.',
    'Residual risk does not vanish: data still lives in third-party SaaS, contractors still touch it, and supply-chain failures hit the company even though nothing is built in-house.',
    'Vendor management never goes out of scope: A.5.19–5.23 (supplier security) and A.8.28–8.29 (secure coding for bought software) stay selected regardless.',
  ],
};

const SCENARIO_PLAYBOOK = [
  {
    scenario: 'Remote team, fully cloud-hosted',
    outcome: 'Physical controls (A.7.1–7.4, 7.5, 7.11, 7.12) excluded with compensating-party notes; virtually everything else selected.',
    tech: ['MDM + disk encryption + locate/wipe (A.8.12)', 'Cloud-native access control (A.5.15, A.8.2)', 'Vendor SaaS security posture', 'Endpoint EDR + auto-update'],
    nonTech: ['Remote-work policy + clear-screen', 'Acceptable-use + bring-your-own-device', 'Device loss/theft runbook', 'Co-working landlord compensating-control note'],
  },
  {
    scenario: 'Company office, cloud-hosted',
    outcome: 'Office physical controls kept in scope (A.7.1–7.4); data-center controls still excluded via provider.',
    tech: ['Badge/lock + CCTV where warranted', 'Visitor + clear-desk enforcement', 'Shared-office equipment locks', 'Cloud-native controls as above'],
    nonTech: ['Office security policy + visitor policy', 'Who escorts visitors in secure areas', 'Physical incident reporting line', 'Clean-desk audit cadence'],
  },
  {
    scenario: 'Self-hosted infrastructure',
    outcome: 'A.7.8, A.7.11, A.7.12 flip to Implemented with Vanta test links; A.7.5 back in scope for facilities protection.',
    tech: ['UPS + power redundancy tested', 'Climate/water detection', 'Cable-routing + physical access protection', 'Server-room access control + logs'],
    nonTech: ['Change of hosting = re-run the SoA', 'Colocation contract + right-to-audit', 'Maintenance windows logged', 'Environmental-threat register for the site'],
  },
  {
    scenario: 'Outsourced development',
    outcome: 'A.8.28–8.30 selected and tightened: contractual security + right-to-audit + CI gates for third-party code.',
    tech: ['Third-party code through same CI security gates', 'Scoped/timed vendor access, revoked at end', 'Dependency + supply-chain scanning', 'Test-environment separation'],
    nonTech: ['Vendor security requirements in contract', 'Right-to-audit clause used, not just held', 'NDA + data-handling addendum', 'Vendor offboarding runbook'],
  },
  {
    scenario: 'No development / no hosting',
    outcome: 'Tightly-scoped exclusions with written rationale (A.8.25–8.30, A.5.23, A.7.4, A.8.16 partial, A.8.24); supplier + vendor controls stay fully selected.',
    tech: ['SaaS-buyer due-diligence checklist', 'Third-party app inventory + reviews', 'Endpoint basics still enforced (no code is NOT “no IT”)', 'Backup of business data in vendor systems'],
    nonTech: ['Every exclusion written with a reason', 'Residual-risk + vendor-management notes in SoA', 'Contract-mapping: which vendor owns what control', 'Re-validate exclusions when they hire a dev'],
  },
];

export default function StatementOfApplicability() {
  const [refFilter, setRefFilter] = useState('all');

  const totalFamilies = THEMES.reduce((s, t) => s + t.families.length, 0);
  const counts = {
    selected: THEMES.reduce((s, t) => s + t.families.filter(f => f.sel === 'selected').length, 0),
    optional: THEMES.reduce((s, t) => s + t.families.filter(f => f.sel === 'optional').length, 0),
    excluded: THEMES.reduce((s, t) => s + t.families.filter(f => f.sel === 'excluded').length, 0),
  };

  const filterTabs = [
    { key: 'all', label: 'All', n: totalFamilies },
    { key: 'selected', label: 'Selected', n: counts.selected },
    { key: 'optional', label: 'Optional', n: counts.optional },
    { key: 'excluded', label: 'Excluded', n: counts.excluded },
  ];

  return (
    <section id="iso27001-soa" className="py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-text-dark-primary flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center"><ClipboardList className="w-6 h-6" /></span>
            ISO 27001:2022 — Statement of Applicability (SoA), End to End
          </h2>
          <p className="text-gray-600 dark:text-text-dark-secondary mt-3 max-w-3xl leading-relaxed">
            The SoA (required by <strong>Clause 6.1.3 d</strong>) is the bridge between your risk assessment and the 93 Annex A controls —
            it lists every control, states whether it's applied or excluded, gives a written justification for exclusions, and points to the
            evidence. The reference card below maps every Annex A control family to its SoA verdict, with step-by-step checks and questions to
            gauge each one against a real startup.
          </p>
        </div>

        {/* Annex A reference card — full detail */}
        <div className="grc-card p-6 mb-10">
          <h3 className="grc-card-title font-bold text-lg mb-1 flex items-center gap-2">
            <ScrollText className="w-5 h-5 text-indigo-600 dark:text-indigo-400 grc-card-icon" /> Annex A reference card — mapping each control family to the SoA
          </h3>
          <p className="text-sm text-gray-600 dark:text-text-dark-secondary mb-4 max-w-3xl">
            The default SoA verdict for a <strong>software startup</strong> per Annex A family. For <strong>every</strong> family, expand it to
            see the step-by-step checks (what to verify with the startup) and the questions to ask. “Selected” = applied and implemented (or
            planned); “Optional” = applied only if the trigger holds, otherwise excluded with justification; “Excluded” = write and re-validate
            why it does not apply.
          </p>
          <div className="flex flex-wrap gap-2 mb-5">
            {filterTabs.map(t => (
              <button
                key={t.key}
                onClick={() => setRefFilter(t.key)}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition ${
                  refFilter === t.key
                    ? 'bg-indigo-600 border-indigo-600 text-white'
                    : `bg-surface-100 dark:bg-surface-dark-100 border-surface-300 dark:border-surface-dark-300 text-gray-600 dark:text-text-dark-secondary hover:bg-surface-200 dark:hover:bg-surface-dark-200`
                }`}
              >
                {t.label} {t.n}
              </button>
            ))}
          </div>
          <div className="space-y-6">
            {THEMES.map(th => {
              const c = COLORS[th.color] || COLORS.indigo;
              const ThemeIcon = th.icon;
              const fams = th.families.filter(f => refFilter === 'all' || f.sel === refFilter);
              if (fams.length === 0) return null;
              return (
                <div key={th.theme}>
                  <div className="flex items-center gap-2 mb-3">
                    <ThemeIcon className={`w-4 h-4 ${c.title}`} />
                    <h4 className={`text-sm font-bold uppercase tracking-wide ${c.title}`}>{th.theme}</h4>
                  </div>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
                    {fams.map(f => {
                      const m = SEL_META[f.sel] || SEL_META.selected;
                      const MIcon = m.Icon;
                      return (
                        <details key={f.ref} className={`group rounded-lg border ${c.box} overflow-hidden`}>
                          <summary className="p-3 flex items-center justify-between gap-2 cursor-pointer list-none hover:bg-slate-50 dark:hover:bg-slate-800/50">
                            <div className="flex items-center gap-2 min-w-0">
                              <span className={`shrink-0 text-[11px] font-bold px-2 py-0.5 rounded-md border ${c.box} ${c.title}`}>{f.ref}</span>
                              <span className="text-sm font-semibold text-gray-800 dark:text-text-dark-primary leading-snug">{f.title}</span>
                            </div>
                            <span className={`shrink-0 inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full border ${m.cls}`}>
                              <MIcon className="w-3 h-3" /> {m.label}
                            </span>
                          </summary>
                          <div className="px-3 pb-3 space-y-3 text-xs">
                            <p className="text-gray-600 dark:text-text-dark-secondary">
                              <span className="font-bold text-gray-800 dark:text-text-dark-primary">SoA justification:</span> {f.just}
                            </p>
                            <div>
                              <p className={`font-bold uppercase tracking-wide text-[10px] mb-1 ${c.title}`}>Step-by-step — what we need to check</p>
                              <ol className="space-y-1">
                                {f.checks.map((chk, i) => (
                                  <li key={i} className="flex items-start gap-1.5 text-gray-600 dark:text-text-dark-secondary">
                                    <span className={`shrink-0 w-4 h-4 rounded-full ${c.header} ${c.title} text-[9px] font-bold flex items-center justify-center mt-0.5`}>{i + 1}</span>
                                    <span>{chk}</span>
                                  </li>
                                ))}
                              </ol>
                            </div>
                            <div>
                              <p className={`font-bold uppercase tracking-wide text-[10px] mb-1 ${c.title}`}>Questions to ask the startup</p>
                              <ul className="space-y-1">
                                {f.questions.map((q, i) => (
                                  <li key={i} className="flex items-start gap-1.5 text-gray-600 dark:text-text-dark-secondary">
                                    <span className="text-indigo-400 dark:text-indigo-300 mt-0.5">›</span>
                                    <span>{q}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </details>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Scenario overrides — physical / hosting / dev */}
        <div className="grc-card p-6 mb-10">
          <h3 className="grc-card-title font-bold text-lg mb-1 flex items-center gap-2">
            <GitBranch className="w-5 h-5 text-indigo-600 dark:text-indigo-400 grc-card-icon" /> Scenario overrides — when the default SoA verdict flips
          </h3>
          <p className="text-sm text-gray-600 dark:text-text-dark-secondary mb-4 max-w-3xl">
            The reference card assumes a cloud-first, remote-friendly software startup. Real clients differ. Use this guide to decide how the
            physical (A.7), support-infrastructure (A.7.8/11/12) and outsourced-development (A.8.30) controls land in column F — and what must
            change when they do.
          </p>
          <div className="space-y-6">
            {SCENARIO_OVERRIDES.map(ov => {
              const OIcon = ov.Icon;
              return (
                <div key={ov.title} className="flex gap-4">
                  <div className="shrink-0 w-10 h-10 rounded-xl bg-navy-800 dark:bg-indigo-600 text-white flex items-center justify-center">
                    <OIcon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="grc-card-title font-bold text-navy-900 dark:text-text-dark-primary">{ov.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-text-dark-secondary mt-1 leading-relaxed">
                      <span className="font-semibold text-gray-800 dark:text-text-dark-primary">When it applies:</span> {ov.apply}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-text-dark-secondary mt-1 leading-relaxed">
                      <span className="font-semibold text-gray-800 dark:text-text-dark-primary">What to change:</span> {ov.action}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-text-dark-muted mt-1.5">
                      <span className="font-semibold">Watch out:</span> {ov.note}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* No dev / no hosting SoA */}
        <div className="grc-card p-6 mb-10">
          <h3 className="grc-card-title font-bold text-lg mb-1 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-indigo-600 dark:text-indigo-400 grc-card-icon" /> {NO_DEV_HOST.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-text-dark-secondary mb-4 max-w-3xl">{NO_DEV_HOST.lead}</p>
          <div className="space-y-3">
            {NO_DEV_HOST.groups.map(g => (
              <div key={g.refs} className="rounded-lg border border-slate-200 dark:border-slate-700 px-4 py-3 bg-slate-50 dark:bg-slate-800/30">
                <div className="flex items-center gap-2">
                  <span className="shrink-0 text-[11px] font-bold px-2 py-0.5 rounded-md border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-300">{g.refs}</span>
                  <h5 className="text-sm font-bold text-gray-800 dark:text-text-dark-primary leading-snug">{g.label}</h5>
                </div>
                <p className="text-xs text-gray-600 dark:text-text-dark-secondary mt-1.5 leading-relaxed">
                  <span className="font-semibold">Rationale for exclusion:</span> {g.rationale}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-5 rounded-lg border border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-900/30 px-4 py-3">
            <p className="flex items-center gap-2 text-sm font-bold text-amber-800 dark:text-amber-300 mb-1.5">
              <AlertTriangle className="w-4 h-4" /> Important considerations for a no-dev / no-hosting SoA
            </p>
            <ul className="space-y-1.5">
              {NO_DEV_HOST.considerations.map(c => (
                <li key={c} className="flex items-start gap-1.5 text-xs text-amber-900/80 dark:text-amber-100/90 leading-relaxed">
                  <span className="text-amber-500 mt-0.5">›</span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Scenario playbook */}
        <div className="grc-card p-6 mb-10">
          <h3 className="grc-card-title font-bold text-lg mb-1 flex items-center gap-2">
            <ListChecks className="w-5 h-5 text-indigo-600 dark:text-indigo-400 grc-card-icon" /> Scenario playbook — outcomes &amp; what to check
          </h3>
          <p className="text-sm text-gray-600 dark:text-text-dark-secondary mb-4 max-w-3xl">
            One glance at the client's profile → expected SoA outcome, then the technical and non-technical checks that back it up.
          </p>
          <div className="space-y-5">
            {SCENARIO_PLAYBOOK.map(s => (
              <div key={s.scenario} className="rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
                <div className="px-4 py-3 bg-slate-50 dark:bg-slate-800/30 border-b border-slate-200 dark:border-slate-700">
                  <h4 className="font-bold text-gray-800 dark:text-text-dark-primary text-sm">{s.scenario}</h4>
                  <p className="text-xs text-gray-600 dark:text-text-dark-secondary mt-0.5 leading-relaxed">
                    <span className="font-semibold">Expected outcome:</span> {s.outcome}
                  </p>
                </div>
                <div className="grid sm:grid-cols-2 gap-px bg-slate-200 dark:bg-slate-700">
                  <div className="bg-white dark:bg-slate-900 p-4">
                    <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide text-indigo-600 dark:text-indigo-300 mb-2">
                      <Cpu className="w-3.5 h-3.5" /> Tech-side checks
                    </p>
                    <ul className="space-y-1">
                      {s.tech.map(t => (
                        <li key={t} className="flex items-start gap-1.5 text-xs text-gray-600 dark:text-text-dark-secondary leading-relaxed">
                          <span className="text-indigo-400 dark:text-indigo-300 mt-0.5">›</span>
                          <span>{t}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-white dark:bg-slate-900 p-4">
                    <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide text-amber-600 dark:text-amber-300 mb-2">
                      <ShieldCheck className="w-3.5 h-3.5" /> Non-tech checks (policy, process, documents)
                    </p>
                    <ul className="space-y-1">
                      {s.nonTech.map(t => (
                        <li key={t} className="flex items-start gap-1.5 text-xs text-gray-600 dark:text-text-dark-secondary leading-relaxed">
                          <span className="text-amber-500 mt-0.5">›</span>
                          <span>{t}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* What a row contains */}
        <div className="grc-card p-6 mb-10">
          <h3 className="grc-card-title font-bold text-lg mb-4 flex items-center gap-2">
            <ListChecks className="w-5 h-5 text-indigo-600 dark:text-indigo-400 grc-card-icon" /> What the SoA must capture, per control
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {SOA_FIELDS.map((f, i) => (
              <div key={f} className={`flex items-start gap-2 rounded-lg border px-3 py-2 text-sm ${COLORS.indigo.box}`}>
                <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700 dark:text-text-dark-secondary">{f}</span>
                {i === 8 && <span className="text-[10px] text-gray-400 dark:text-text-dark-muted ml-auto shrink-0">(trace)</span>}
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-gray-500 dark:text-text-dark-muted">
            An auditor will read the SoA line by line. Every “excluded” row needs a defensible reason — “we are cloud-only, so physical data-center controls are excluded” is defensible; “not applicable” alone is not.
          </p>
        </div>

        {/* 8-step process */}
        <div className="mb-10">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-text-dark-primary mb-6 flex items-center gap-3">
            <GitBranch className="w-6 h-6 text-indigo-600 dark:text-indigo-400" /> The 8-step build — from scope to a living SoA
          </h3>
          <div className="space-y-3">
            {STEPS.map(s => (
              <div key={s.step} className="grc-card p-5 flex gap-4">
                <div className="shrink-0 w-9 h-9 rounded-xl bg-navy-800 dark:bg-indigo-600 text-white font-bold flex items-center justify-center text-sm">
                  {s.step}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="grc-card-title font-bold text-navy-900 dark:text-text-dark-primary">{s.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-text-dark-secondary mt-1 leading-relaxed">
                    <span className="font-semibold text-gray-800 dark:text-text-dark-primary">Do:</span> {s.do}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-text-dark-muted mt-1.5">
                    <span className="font-semibold">Output:</span> {s.output}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom note */}
        <div className="mt-10 grc-card p-5 flex gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-gray-600 dark:text-text-dark-secondary leading-relaxed">
            <span className="font-bold text-gray-800 dark:text-text-dark-primary">Auditor reality-check:</span> the SoA is the first document an
            ISO 27001 auditor asks for. Exclusions must be <em>justified</em>, not just stated — if the startup excludes something, expect the auditor
            to test whether the reason is still true (e.g. “no card data” is challenged by the moment someone puts a card in an admin tool). Keep the
            SoA in lockstep with the risk register, and versions/review dates documented. <FileSignature className="inline w-4 h-4" />
          </p>
        </div>
      </div>
    </section>
  );
}