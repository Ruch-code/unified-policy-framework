// SOC 2 to HIPAA crosswalk for /hipaa. One entry per row; edit freely.
// Reference environment: a ~10-person healthtech business associate, fully cloud-hosted on a major
// IaaS provider, SSO via a cloud IdP, code in a hosted Git service, background checks via a
// third-party screening vendor.
//
// Fields
//   id, title, group ('full' | 'partial' | 'soc2' | 'hipaa' | 'carveout'), hours
//   soc2: criteria list; cfr: 45 CFR citations; mandate: 'Required' | 'Addressable' | 'Mixed' | 'Not a HIPAA requirement'
//   appliesTo: 'CE' | 'CE + BA' | 'BA' | 'BA sub' (combinations allowed)
//   table: { control, auditorTest, gap } -> the crosswalk table columns
//   card:  { control, how, check: [steps], interview: [questions], exception, evidence: [[type, item]] }
//   templates: existing template slugs; toBuild: template names not yet on the site
// Evidence type: 'S' = system-generated, 'R' = document or record.

export const OVERLAP_LABELS = { full: 'Overlaps fully', partial: 'Overlaps partly', soc2: 'SOC 2 only', hipaa: 'HIPAA only', carveout: 'Carve-out and complementary controls' };

export const CROSSWALK_INTRO = 'SOC 2 and HIPAA overlap, but they are not the same thing. A clean SOC 2 report does not make an organisation HIPAA compliant, and HIPAA has no certification of its own. Use SOC 2 evidence to support your HIPAA position, then close the gaps that only HIPAA asks for.';

export const RESULT_WORDING = [
  ['No exceptions noted', 'The auditor tested the control and it operated as described for every item sampled.'],
  ['Not tested. Control activity did not occur during the audit window', 'There was nothing to sample, for example no incidents or no media disposals. The control still needs an approved policy and evidence that nothing happened, such as an empty register or a system query showing zero records.'],
];

export const SAMPLING_NOTE = 'Auditors obtain a system-generated population list first to prove completeness, check that the report is complete and accurate, then select a sample by professional judgement. When the population is small, they test all of it.';

export const CROSSWALK = [
  {
    id: 'xw-01', title: 'Background checks for workforce with ePHI access', group: 'full', hours: 2,
    soc2: ['CC1.1', 'CC1.4'], cfr: ['164.308(a)(3)(ii)(B)'], mandate: 'Addressable', appliesTo: 'CE + BA',
    table: {
      control: 'New hires complete a background check before or at the start of employment.',
      auditorTest: 'Inspected the HR security policy and the background check report for sampled new hires.',
      gap: 'Write down the screening criteria for roles that will have access to ePHI.',
    },
    card: {
      control: 'Everyone who joins is screened before they receive access to systems. The depth of screening matches the sensitivity of the role, and roles that touch ePHI get the fullest check the law allows.',
      how: 'Trigger the screening vendor from the HR system when an offer is accepted. Hold account creation in the cloud IdP until HR marks the check as cleared. Keep a one-page criteria table in the HR security policy that maps each role to the checks it requires and states which roles have ePHI access.',
      check: [
        'Inquiry: ask HR how screening is triggered and who confirms clearance before access is granted.',
        'Inspection: export the list of hires in the period from the HR system and confirm it is complete against payroll.',
        'Inspection: select a sample (or all hires, if fewer than about ten) and match each to a dated screening result.',
        'Inspection: compare each IdP account creation date with the screening completion date.',
      ],
      interview: [
        'Which roles have access to ePHI, and does their screening differ from other roles?',
        'What happens if a check is still pending on the start date?',
      ],
      exception: 'For 1 of 5 new hires sampled, the background check was completed 12 days after system access was granted.',
      evidence: [
        ['S', 'HR system export of hires in the period, with start dates'],
        ['S', 'Screening vendor completion report for each sampled hire'],
        ['S', 'IdP account creation log for the same hires'],
        ['R', 'HR security policy section listing screening criteria by role'],
      ],
    },
    templates: ['hr-security-policy'], toBuild: [],
  },
  {
    id: 'xw-07', title: 'Enterprise-wide risk analysis and risk management', group: 'full', hours: 2,
    soc2: ['CC3.1', 'CC3.2', 'CC3.3', 'CC3.4', 'CC5.1', 'CC5.3', 'CC7.1', 'CC9.1'], cfr: ['164.308(a)(1)(ii)(A)', '164.308(a)(1)(ii)(B)'], mandate: 'Required', appliesTo: 'CE + BA',
    table: {
      control: 'A risk program identifies, scores and treats threats. A risk assessment runs at least annually and covers environmental, regulatory and technology change and fraud, against stated objectives.',
      auditorTest: 'Inspected the risk management policy, the risk register and the dated annual risk assessment.',
      gap: 'Scope the risk analysis to all ePHI, wherever it is created, received, kept or sent, across the whole organisation.',
    },
    card: {
      control: 'The organisation knows where its ePHI lives and what could harm it. Risks are scored on likelihood and impact, given an owner and a treatment, and revisited at least once a year or when something material changes.',
      how: 'Start from the asset inventory and a data flow map that marks every system holding ePHI, including the IaaS account, backups, logs, the ticketing tool and email. Score risks in a single register with owners and due dates. Hold an annual review meeting and record its minutes, plus a quick reassessment whenever a new vendor or system is added.',
      check: [
        'Inquiry: ask the Security Official how the ePHI inventory and data flows feed the assessment.',
        'Inspection: read the risk methodology and confirm it defines scoring, appetite and review frequency.',
        'Inspection: inspect the dated risk assessment and confirm it covers fraud, regulatory change and technology change.',
        'Re-performance: pick three ePHI systems from the inventory and confirm each appears in the register with a scored risk.',
      ],
      interview: [
        'Where does ePHI leave your production environment, for example in support tickets, logs or exports?',
        'When did a change last trigger an update to the register outside the annual cycle?',
      ],
      exception: 'The risk assessment did not include the support ticketing system, which receives ePHI in customer attachments.',
      evidence: [
        ['R', 'Approved risk assessment and treatment methodology'],
        ['R', 'Dated risk assessment report with scope statement naming ePHI systems'],
        ['S', 'Risk register export showing owners, scores and treatment status'],
        ['R', 'ePHI data flow diagram, version dated within the period'],
      ],
    },
    templates: ['risk-methodology', 'risk-management-policy', 'asset-management-policy'], toBuild: ['ePHI Data Flow Map'],
  },
  {
    id: 'xw-09', title: 'Vendor management covering ePHI vendors', group: 'full', hours: 2,
    soc2: ['CC3.2', 'CC4.1', 'CC4.2', 'CC5.3', 'CC9.2'], cfr: ['164.308(b)(1)', '164.314(a)', '164.502(e)'], mandate: 'Required', appliesTo: 'BA, BA sub',
    table: {
      control: 'An inventory of critical vendors is kept, security and privacy requirements are set for them, and critical vendors are reviewed every year.',
      auditorTest: 'Inspected the vendor management policy, the vendor inventory and annual review records for sampled critical vendors.',
      gap: 'Hold a signed BAA with every vendor that creates, receives, maintains or transmits ePHI, including the cloud host, and flow the terms down to subcontractors.',
    },
    card: {
      control: 'Every third party is recorded with its risk tier and whether it touches ePHI. Critical vendors are reviewed before onboarding and annually, and any vendor handling ePHI is under a BAA before data is shared.',
      how: 'Keep the vendor inventory in one sheet or GRC tool with an ePHI flag and a BAA status column. Collect each critical vendor\'s attestation report or questionnaire once a year and record the review outcome. Block procurement of any ePHI vendor until the BAA is countersigned.',
      check: [
        'Inquiry: ask who decides whether a vendor is critical and whether it handles ePHI.',
        'Inspection: obtain the vendor inventory and compare it to accounts payable to confirm completeness.',
        'Inspection: for sampled critical vendors, inspect the annual review and the attestation report reviewed.',
        'Inspection: for every vendor flagged as handling ePHI, inspect the signed BAA.',
      ],
      interview: [
        'Which vendors can see ePHI, including support, logging and email tools?',
        'How do you confirm a vendor\'s subcontractors are bound by equivalent terms?',
      ],
      exception: 'The annual review for 1 of 4 critical vendors sampled was not performed during the period.',
      evidence: [
        ['S', 'Vendor inventory export with risk tier, ePHI flag and BAA status'],
        ['S', 'Accounts payable vendor list used for completeness'],
        ['R', 'Annual review record and attestation report for each sampled vendor'],
        ['R', 'Signed BAA for each ePHI vendor'],
      ],
    },
    templates: ['vendor-management-policy', 'vendor-security-review', 'baa-template'], toBuild: [],
  },
  {
    id: 'xw-19', title: 'Termination and timely access removal', group: 'full', hours: 2,
    soc2: ['CC1.4', 'CC6.2', 'CC6.3', 'CC6.5'], cfr: ['164.308(a)(3)(ii)(C)'], mandate: 'Addressable', appliesTo: 'CE + BA',
    table: {
      control: 'A termination checklist is completed for every leaver, and access is revoked within the policy SLA (24 business hours in the reference environment).',
      auditorTest: 'Sampled terminated employees and compared termination dates with access removal dates.',
      gap: 'Make sure the checklist covers every system that holds ePHI, not only the IdP.',
    },
    card: {
      control: 'When someone leaves, all of their access ends promptly and company equipment is returned. The time allowed is set in policy and tracked for every leaver.',
      how: 'Start offboarding from the HR system so it opens a ticket automatically. Suspend the user in the cloud IdP first, then remove direct accounts in the IaaS console, Git host and any tool not behind SSO. The ticket records each step with a timestamp and the device wipe from MDM.',
      check: [
        'Inquiry: ask HR and IT how they learn of a termination and who closes the ticket.',
        'Inspection: export terminations in the period from the HR system; confirm completeness against payroll.',
        'Inspection: for sampled leavers (or all, if few), compare the termination date with the IdP deactivation timestamp.',
        'Inspection: inspect the completed checklist for each sampled leaver, including systems outside SSO.',
      ],
      interview: [
        'Which systems with ePHI are not behind SSO, and how are those accounts removed?',
        'How do you handle an immediate, unplanned termination?',
      ],
      exception: 'For 1 of 3 terminated employees sampled, the Git host account was removed 6 business days after the termination date.',
      evidence: [
        ['S', 'HR system export of terminations in the period'],
        ['S', 'IdP audit log showing deactivation timestamps'],
        ['R', 'Completed termination checklist per sampled leaver'],
        ['S', 'MDM record of device wipe or return'],
      ],
    },
    templates: ['termination-checklist', 'termination-security-policy'], toBuild: [],
  },
  {
    id: 'xw-25', title: 'Encryption at rest for ePHI datastores', group: 'full', hours: 2,
    soc2: ['CC6.1'], cfr: ['164.312(a)(2)(iv)'], mandate: 'Addressable', appliesTo: 'CE + BA',
    table: {
      control: 'Datastores holding sensitive data are encrypted at rest.',
      auditorTest: 'Inspected encryption settings for production databases and storage.',
      gap: 'Record the addressable decision. Encryption that meets HHS guidance also gives the breach safe harbour.',
    },
    card: {
      control: 'Every place ePHI is stored at rest is encrypted with keys managed under the cryptography policy. The decision to encrypt is documented as the response to the addressable specification.',
      how: 'Enable default encryption on the IaaS account for databases, block storage, object storage and snapshots, using the provider key service with restricted key administration. Add a cloud configuration rule that alerts on any unencrypted resource. Record the decision in the addressable specifications log.',
      check: [
        'Inquiry: ask the engineering lead which datastores hold ePHI and how encryption is enforced.',
        'Inspection: obtain the list of production datastores from the IaaS console and compare it with the asset inventory.',
        'Inspection: inspect the encryption setting for each datastore (small population, so all are tested).',
        'Observation: watch the configuration rule report showing no unencrypted resources.',
      ],
      interview: [
        'Are backups and snapshots encrypted with the same keys as the source?',
        'Who can administer or delete the encryption keys?',
      ],
      exception: 'One storage bucket holding customer exports was not encrypted at rest.',
      evidence: [
        ['S', 'Console screenshot per datastore showing encryption enabled, with system name and timestamp'],
        ['S', 'Configuration rule compliance report'],
        ['R', 'Cryptography policy'],
        ['R', 'Addressable specifications decision log entry'],
      ],
    },
    templates: ['encryption-at-rest', 'cryptography-policy'], toBuild: ['Addressable Specifications Decision Log'],
  },
  {
    id: 'xw-h01', title: 'Business Associate Agreements with every ePHI vendor', group: 'hipaa', hours: 3,
    soc2: [], cfr: ['164.308(b)', '164.314(a)', '164.504(e)'], mandate: 'Required', appliesTo: 'BA, BA sub',
    table: {
      control: 'A BAA is signed with every vendor and subcontractor that creates, receives, maintains or transmits ePHI.',
      auditorTest: 'Not covered by a Security-only SOC 2.',
      gap: 'Whole requirement. Inventory ePHI vendors, sign BAAs, and flow terms down to subcontractors.',
    },
    card: {
      control: 'No ePHI goes to a third party without a BAA in place first. The agreement contains the provisions HIPAA requires, and the same duties pass down to any subcontractor that handles the data.',
      how: 'Filter the vendor inventory for the ePHI flag and attach a countersigned BAA to each. Accept the cloud host\'s standard BAA through its console and record the acceptance date. Check each BAA against a provisions checklist: permitted uses, safeguards, breach reporting, subcontractor flow-down, access and amendment support, HHS access to records, and return or destruction at termination.',
      check: [
        'Inquiry: ask how the team decides whether a new tool will receive ePHI.',
        'Inspection: obtain the vendor inventory and compare it to the ePHI data flow map for completeness.',
        'Inspection: for every ePHI vendor (full population), inspect the signed BAA and its effective date.',
        'Re-performance: test two BAAs against the required provisions checklist.',
      ],
      interview: [
        'When was the most recent ePHI vendor added, and when was its BAA signed?',
        'What notice period does each BAA give you to report a breach, and is it shorter than 60 days?',
      ],
      exception: 'The error monitoring vendor receives request payloads containing ePHI and no BAA was in place.',
      evidence: [
        ['S', 'Vendor inventory export filtered to ePHI vendors'],
        ['R', 'Signed BAA for each ePHI vendor, with effective date'],
        ['S', 'Cloud host console record of BAA acceptance'],
        ['R', 'Completed BAA provisions checklist per agreement'],
      ],
    },
    templates: ['baa-template', 'vendor-management-policy'], toBuild: ['BAA Provisions Checklist'],
  },
];
