// HIPAA requirement library for /hipaa. Names only, with no citation numbers.
export const OVERVIEW = ['HIPAA protects health information held by covered entities (health plans, health care clearinghouses and most health care providers) and by business associates that handle it for them.', 'The Security Rule covers electronic protected health information (ePHI). The Breach Notification Rule covers what happens after a breach. The Privacy Rule covers uses, disclosures and individual rights.', 'Choose a rule area, open a category, then use each requirement to plan, implement and test it.'];
export const ADDRESSABLE_NOTE = 'Addressable does not mean optional. Assess whether the safeguard is reasonable and appropriate. If it is, implement it. If not, document why and use an equivalent alternative where reasonable.';
export const LEGAL_NOTE = 'This content is guidance, not legal advice. Consult current HHS regulations and qualified counsel.';
export const CURRENCY_NOTES = ['Last checked: 5 November 2026.', 'The Security Rule update proposed in January 2025 is not final. Nothing on this page reflects it as a requirement.', 'The 2024 reproductive health care provisions were vacated by a federal court in 2025 and the appeal was dismissed. Those items are kept for reference and marked below.', 'Notices of privacy practices: changes for substance use disorder records had a compliance date of February 16, 2026. Confirm how they apply to you.'];
export const STATUS_CHANGED = 'Status changed, verify current law';

const CE = 'Covered entity', BA = 'Business associate', BOTH = 'Both';
const RULES = { S: 'Security Rule', B: 'Breach Notification Rule', U: 'Privacy Rule, uses and disclosures', I: 'Privacy Rule, individual rights and administration' };
const cat = (rule, category, appliesTo, evidence, templates, test, gaps, items) => ({ ruleArea: RULES[rule], category, appliesTo, evidence, templates, test, gaps, items });
const SEC = ['hipaa-compliance-policy'], PRIV = ['hipaa-privacy-policy'], BRE = ['hipaa-breach-report', 'breach-notifications', 'incident-register'];
// Item: [name, specification or '', summary, what good looks like, appliesTo override, status]
export const CATEGORIES = [
 cat('S', 'Administrative safeguards', BOTH, ['Risk analysis', 'Risk management plan', 'Sanction policy', 'Access and termination records', 'Training records', 'Incident logs', 'Contingency and BCDR test results', 'Evaluations', 'BAAs'], ['risk-management-policy', ...SEC, 'hipaa-training-record', 'incident-response-plan', 'bcdr-plan', 'baa-template'], 'Interview the responsible person and compare their account with the records.', ['The activity is documented but cannot be shown to operate.', 'Records do not cover all systems that hold ePHI.'], [
  ['Security management process', '', 'Prevent, detect, contain and correct security violations.', 'Risk, sanction and review activities work together as one program.'],
  ['Risk analysis', 'Required', 'Assess risks to ePHI accurately and thoroughly.', 'The analysis covers all ePHI, wherever it is held, and is kept current.'],
  ['Risk management', 'Required', 'Reduce risks to a reasonable and appropriate level.', 'Each identified risk has a measure, an owner and a date.'],
  ['Sanction policy', 'Required', 'Apply sanctions for workforce noncompliance.', 'Sanctions are defined and applied consistently.'],
  ['Information system activity review', 'Required', 'Regularly review logs, access reports and incidents.', 'Named people review activity on a schedule and act on findings.'],
  ['Assigned security responsibility', '', 'Name a security official.', 'One named official is accountable for the security program.'],
  ['Workforce security', '', 'Give the workforce appropriate access and prevent inappropriate access.', 'Access matches job duties from hire to exit.'],
  ['Authorization and/or supervision', 'Addressable', 'Authorize or supervise workforce who work with ePHI.', 'People working near ePHI are approved or supervised.'],
  ['Workforce clearance procedure', 'Addressable', 'Decide whether a person\'s access is appropriate.', 'Screening fits the role\'s level of access.'],
  ['Termination procedures', 'Addressable', 'End access when employment or engagement ends.', 'Access ends promptly at every exit, with proof.'],
  ['Information access management', '', 'Authorize ePHI access.', 'Access follows a documented approval process.'],
  ['Isolating health care clearinghouse functions', 'Required', 'Protect clearinghouse ePHI from the larger organization.', 'Clearinghouse ePHI is separated from other functions.', CE],
  ['Access authorization', 'Addressable', 'Grant access to ePHI through a defined process.', 'Each grant has a recorded approval.'],
  ['Access establishment and modification', 'Addressable', 'Set up, review and change access rights.', 'Role changes lead to timely access changes.'],
  ['Security awareness and training', '', 'Run a program for all workforce, including management.', 'Everyone, including leaders, is trained.'],
  ['Security reminders', 'Addressable', 'Give periodic security updates.', 'Staff get regular, relevant reminders.'],
  ['Protection from malicious software', 'Addressable', 'Guard against, detect and report malware.', 'Malware protection is in place and staff know how to report.'],
  ['Log-in monitoring', 'Addressable', 'Monitor log-in attempts and report discrepancies.', 'Failed log-ins are monitored and followed up.'],
  ['Password management', 'Addressable', 'Create, change and protect passwords.', 'Password rules are enforced and staff know them.'],
  ['Security incident procedures', '', 'Address security incidents.', 'A clear procedure exists and staff know how to use it.'],
  ['Response and reporting', 'Required', 'Identify, respond to, mitigate and document incidents.', 'Each incident has a record from detection to outcome.'],
  ['Contingency plan', '', 'Respond to emergencies that damage ePHI systems.', 'Plans exist for each critical ePHI system.'],
  ['Data backup plan', 'Required', 'Keep retrievable exact copies of ePHI.', 'Backups cover ePHI and restores work.'],
  ['Disaster recovery plan', 'Required', 'Restore lost data.', 'Recovery steps are written and usable by the team.'],
  ['Emergency mode operation plan', 'Required', 'Continue critical processes while protecting ePHI in an emergency.', 'Critical processes can continue securely during an emergency.'],
  ['Testing and revision procedures', 'Addressable', 'Test and revise contingency plans.', 'Tests happen periodically and lead to updates.'],
  ['Applications and data criticality analysis', 'Addressable', 'Rank applications and data by criticality.', 'Recovery priorities reflect a documented ranking.'],
  ['Evaluation', '', 'Evaluate technical and non-technical safeguards periodically.', 'Evaluations happen periodically and after major change.'],
  ['Business associate contracts and other arrangements', '', 'Obtain satisfactory assurances before ePHI handling.', 'Every party handling ePHI has assurances in place first.'],
  ['Business associates as subcontractors', '', 'Obtain assurances from subcontractors.', 'Subcontractors with ePHI have signed assurances.', BA],
  ['Written contract or other arrangement', 'Required', 'Document the assurances.', 'Signed agreements can be produced for each party.'],
  ['Applicability exceptions for business associate assurances', '', 'Recognize when assurances are not needed.', 'Any use of an exception is reasoned and recorded.', CE],
 ]),
 cat('S', 'Physical safeguards', BOTH, ['Facility security plan', 'Access logs', 'Visitor logs', 'Workstation standards', 'Asset inventory', 'Disposal certificates'], ['workstation-security-policy', 'disposal-certificate', 'removable-media'], 'For remote-first organizations, confirm how provider facilities and home workspaces are covered.', ['Reliance on a cloud provider is assumed and not documented.', 'Asset records do not match devices in use.'], [
  ['Facility access controls', '', 'Limit physical access to ePHI systems.', 'Only authorized people reach ePHI systems.'],
  ['Contingency operations', 'Addressable', 'Allow facility access to support recovery.', 'Recovery teams can reach what they need in an emergency.'],
  ['Facility security plan', 'Addressable', 'Protect facilities and equipment.', 'A plan protects sites and equipment from unauthorized access and theft.'],
  ['Access control and validation procedures', 'Addressable', 'Control and validate access, including visitors.', 'Visitors and staff are validated by role.'],
  ['Maintenance records', 'Addressable', 'Document security-related facility repairs.', 'Repairs to doors, locks and walls are recorded.'],
  ['Workstation use', '', 'Define proper workstation use.', 'Rules set out how and where ePHI may be used on workstations.'],
  ['Workstation security', '', 'Physically protect workstations.', 'Workstations with ePHI are protected from unauthorized users.'],
  ['Device and media controls', '', 'Control receipt, movement and removal of hardware and media.', 'Devices and media are tracked in and out.'],
  ['Disposal', 'Required', 'Dispose of ePHI and its media securely.', 'ePHI is unrecoverable after disposal, with proof.'],
  ['Media re-use', 'Required', 'Remove ePHI before re-use.', 'Media is cleaned before being used again.'],
  ['Accountability', 'Addressable', 'Record hardware and media movements.', 'Movements and responsible people are recorded.'],
  ['Data backup and storage', 'Addressable', 'Copy ePHI before moving equipment.', 'A retrievable copy exists before equipment moves.'],
 ]),
 cat('S', 'Technical safeguards', BOTH, ['IAM configuration', 'MFA settings', 'Session settings', 'Encryption settings', 'Audit logs', 'Integrity monitoring', 'TLS configuration'], ['access-control-policy', ...SEC], 'Export the live configuration for systems holding ePHI and compare it with policy.', ['Settings cover the main application but miss supporting systems.', 'Policy says one thing and configuration another.'], [
  ['Access control', '', 'Allow access only to authorized persons or software.', 'Technical controls limit ePHI to authorized users and software.'],
  ['Unique user identification', 'Required', 'Give each user a unique identifier.', 'Each action traces to one person.'],
  ['Emergency access procedure', 'Required', 'Obtain ePHI during an emergency.', 'Break-glass access works, and it is logged and reviewed.'],
  ['Automatic logoff', 'Addressable', 'End idle sessions.', 'Idle sessions end after a set time.'],
  ['Encryption and decryption', 'Addressable', 'Encrypt stored ePHI.', 'Stored ePHI is encrypted, or the alternative is documented.'],
  ['Audit controls', '', 'Record and examine ePHI system activity.', 'Systems with ePHI record activity that can be reviewed.'],
  ['Integrity', '', 'Protect ePHI from improper alteration or destruction.', 'Improper changes to ePHI are prevented or detected.'],
  ['Mechanism to authenticate ePHI', 'Addressable', 'Confirm ePHI has not been altered.', 'A mechanism shows that ePHI is unchanged.'],
  ['Person or entity authentication', '', 'Verify who is seeking access.', 'Identity is verified before access, typically with MFA.'],
  ['Transmission security', '', 'Guard ePHI in transit.', 'ePHI is protected across networks.'],
  ['Integrity controls', 'Addressable', 'Detect changes to ePHI in transit.', 'Changes in transit can be detected.'],
  ['Encryption', 'Addressable', 'Encrypt ePHI in transit where appropriate.', 'ePHI in transit is encrypted, or the alternative is documented.'],
 ]),
 cat('S', 'Organizational requirements', BOTH, ['BAAs', 'Subcontractor agreements', 'Plan documents'], ['baa-template', 'subcontractor-phi-check'], 'Sample agreements against the current vendor list.', ['Vendors handling ePHI have no signed agreement.', 'Agreements predate required content.'], [
  ['Business associate contracts', '', 'Put compliant contracts in place.', 'Each business associate has a compliant contract.'],
  ['Business associate contract required content', 'Required', 'Include required security terms.', 'Contracts cover safeguards, subcontractors and incident reporting.'],
  ['Other arrangements for government entities', 'Required', 'Use alternative arrangements where allowed.', 'Government arrangements meet the same objectives.', CE],
  ['Business associate contracts with subcontractors', 'Required', 'Apply the same terms to subcontractors.', 'Terms flow down to subcontractors.', BA],
  ['Group health plan requirements', '', 'Protect ePHI shared with plan sponsors.', 'Plan documents require sponsors to protect ePHI.', CE],
  ['Group health plan documents: implementation specifications', 'Required', 'Amend plan documents.', 'Plan documents contain the required provisions.', CE],
  ['Plan document: implement safeguards', 'Required', 'Sponsor agrees to safeguards.', 'The sponsor commits to safeguards for ePHI.', CE],
  ['Plan document: ensure adequate separation', 'Required', 'Separate plan functions from the sponsor.', 'Separation is supported by security measures.', CE],
  ['Plan document: bind agents to safeguards', 'Required', 'Agents agree to safeguards.', 'Agents receiving ePHI agree to protect it.', CE],
  ['Plan document: report security incidents', 'Required', 'Sponsor reports incidents to the plan.', 'The sponsor reports incidents it learns of.', CE],
 ]),
 cat('S', 'Policies, procedures and documentation requirements', BOTH, ['Policy set', 'Version history', 'Review records', 'Retention schedule'], SEC, 'Sample policies and confirm version, review date and retention.', ['Retention schedule is shorter than six years.', 'Policies are not updated after changes.'], [
  ['Policies and procedures', '', 'Adopt reasonable and appropriate policies.', 'Policies fit the organization and match practice.'],
  ['Written documentation', 'Required', 'Keep policies and required records in writing.', 'Policies and records exist in written or electronic form.'],
  ['Documentation of required actions, activities and assessments', 'Required', 'Record required actions.', 'Required actions leave a written record.'],
  ['Time limit', 'Required', 'Retain six years from creation or last effective date.', 'Records are kept for six years from the later date.'],
  ['Availability', 'Required', 'Make documents available to those who use them.', 'People can reach the procedures they need.'],
  ['Updates', 'Required', 'Review periodically and respond to change.', 'Documents are reviewed periodically and after changes.'],
 ]),
 ...[['Notification to individuals', CE, [['Notification to individuals', '', 'Notify without unreasonable delay and within 60 days of discovery, covering content, method, substitute notice and urgent situations.', 'Notices are timely, complete and sent by the right method.']]],
  ['Notification to the media', CE, [['Notification to the media', '', 'Notify media for a breach affecting more than 500 residents of a state or jurisdiction.', 'Media notice goes out on time when the threshold is passed.']]],
  ['Notification to the Secretary', CE, [['Notification to the Secretary', '', 'Report at the same time for 500 or more; keep an annual log for fewer than 500.', 'Large breaches are reported on time, and smaller ones are logged and submitted yearly.']]],
  ['Notification by a business associate', BA, [['General duty to notify the covered entity', '', 'Notify the covered entity after discovering a breach.', 'The notify path to each covered entity is known.'], ['When a breach is treated as discovered', '', 'Count from the first day it is known, or would have been with reasonable diligence.', 'The discovery date is recorded on this basis.'], ['Timeliness', '', 'Notify without unreasonable delay and within 60 days.', 'Notice is on time, or sooner if the BAA says so.'], ['Content: identify affected individuals', '', 'Identify each affected individual where possible.', 'The notice identifies affected people.'], ['Additional available information', '', 'Provide other information the covered entity needs.', 'Further facts are shared as they become known.']]],
  ['Law enforcement delay', BOTH, [['Law enforcement delay', '', 'Delay notice where a law enforcement statement justifies it.', 'The statement and the delay are documented.']]],
  ['Administrative requirements and burden of proof', BOTH, [['Administrative requirements and burden of proof', '', 'Apply training, sanctions, complaints and related duties, and keep proof that notices were made or that no breach occurred.', 'Every decision has proof, including a decision that no breach occurred.']]],
 ].map(([c, a, items]) => cat('B', c, a, ['Breach response plan', 'Four-factor risk assessments', 'Notification letters', 'Breach log', 'HHS submissions', 'BAA notice clauses', 'Training records'], BRE, 'Walk through a real or tabletop incident from discovery to closure.', ['The clock is counted from confirmation, not discovery.', 'Low-risk decisions have no written four-factor assessment.'], items)),
 cat('U', 'General rules', CE, ['PHI use and disclosure policy', 'Minimum necessary standards', 'De-identification method', 'BAAs'], PRIV, 'Sample uses and disclosures and match each to a permitted basis.', ['Staff cannot say which basis applies to a disclosure.', 'Policies are copied from another type of organization.'], [
  ['Covered entities: permitted uses and disclosures', '', 'Use or disclose PHI only as the rule allows.', 'Each routine use has a permitted basis.'],
  ['Covered entities: required disclosures', '', 'Disclose to individuals and HHS when required.', 'Required disclosures are recognized and made.'],
  ['Business associates: permitted uses and disclosures', '', 'Stay within the BAA and the law.', 'Uses stay within the BAA.', BA],
  ['Business associates: required disclosures', '', 'Disclose to HHS and as the BAA requires.', 'Required disclosures are made.', BA],
  ['Prohibited: use of genetic information for underwriting', '', 'Health plans may not use genetic information for underwriting.', 'Underwriting processes exclude genetic information.'],
  ['Prohibited: sale of protected health information', '', 'Do not sell PHI without authorization, unless an exception applies.', 'Paid arrangements involving PHI are reviewed.', BOTH],
  ['Prohibited use and disclosure relating to reproductive health care', '', 'Part of a 2024 rule vacated by a federal court in 2025.', 'Older policies and forms are reviewed with counsel.', BOTH, STATUS_CHANGED],
  ['Minimum necessary', '', 'Limit PHI to what the purpose needs.', 'Access and disclosures are limited by role and purpose.', BOTH],
  ['Uses and disclosures subject to an agreed restriction', '', 'Honor restrictions you agreed to.', 'Agreed restrictions are visible to staff.'],
  ['De-identified information', '', 'De-identified data falls outside the rule if properly done.', 'De-identified data meets a recognized method.', BOTH],
  ['Disclosures to business associates', '', 'Share PHI after satisfactory assurances.', 'No PHI flows before a BAA is signed.', BOTH],
  ['Deceased individuals', '', 'Protect PHI for 50 years after death.', 'Decedent records have the same protections.'],
  ['Personal representatives', '', 'Treat personal representatives as the individual.', 'Representatives are verified and recorded.'],
  ['Confidential communications', '', 'Honor reasonable requests by the applicable rule.', 'Alternative contact details are applied.'],
  ['Uses and disclosures consistent with the notice', '', 'Act consistently with your notice.', 'Practice matches the notice.'],
  ['Disclosures by whistleblowers and workforce crime victims', '', 'Recognize protected disclosures.', 'Protected disclosures are not treated as violations.'],
 ]),
 cat('U', 'Organizational requirements', CE, ['BAAs', 'Plan documents', 'Organizational designations'], ['baa-template', ...PRIV], 'Compare agreements with required terms.', ['BAA templates lack current terms.', 'Multiple-function organizations do not separate activities.'], [
  ['Business associate contracts: standard', '', 'Have contracts that meet the rule.', 'Contracts limit PHI use.', BOTH],
  ['Business associate contracts: implementation', '', 'Include required terms.', 'Contracts contain all required terms.', BOTH],
  ['Other arrangements, including government entities', '', 'Use allowed alternatives.', 'Alternatives are documented.'],
  ['Other requirements for contracts and arrangements', '', 'Cover permitted business associate uses.', 'Any extra permissions are stated.', BOTH],
  ['Requirements for business associates and subcontractors', '', 'Flow terms to subcontractors.', 'Subcontractors accept the same limits.', BA],
  ['Group health plans: standard', '', 'Limit disclosures to plan sponsors.', 'Sponsors get PHI only as allowed.'],
  ['Group health plans: implementation', '', 'Amend plan documents.', 'Plan documents contain the terms.'],
  ['Group health plans: uses and disclosures', '', 'Apply the permitted uses.', 'Disclosures follow the plan documents.'],
  ['Requirements for covered entities with multiple covered functions', '', 'Follow rules per function.', 'PHI is used only for the relevant function.'],
 ]),
 cat('U', 'Treatment, payment and health care operations', CE, ['PHI use and disclosure policy', 'Consent forms where used'], PRIV, 'Sample disclosures to confirm they fit these purposes.', ['Marketing is treated as operations.', 'Any consent process differs from policy.'], [
  ['Permitted uses and disclosures without authorization, and consent where chosen', '', 'Use PHI for these purposes without authorization, and use consent if you choose.', 'Staff know which activities fall here.'],
 ]),
 cat('U', 'Authorization required', CE, ['Authorization form', 'Revocation log', 'Marketing and sale reviews'], PRIV, 'Sample completed authorizations against the form elements.', ['Forms lack a core element.', 'Revocations are not applied to systems.'], [
  ['Authorizations generally', '', 'Get authorization unless the rule permits otherwise.', 'Staff know when authorization is needed.'], ['Psychotherapy notes', '', 'Most uses need authorization.', 'Notes are kept separately and protected.'], ['Marketing', '', 'Marketing generally needs authorization.', 'Campaigns are reviewed before launch.'], ['Sale of protected health information', '', 'Authorization must state the payment.', 'The form states the payment.'], ['Valid authorizations', '', 'Contain required elements.', 'Only complete forms are accepted.'], ['Defective authorizations', '', 'Do not rely on defective forms.', 'Expired or incomplete forms are rejected.'], ['Compound authorizations', '', 'Do not combine except where allowed.', 'Forms stay separate unless permitted.'], ['Prohibition on conditioning', '', 'Do not condition care on authorization, with limited exceptions.', 'Care is not tied to signing.'], ['Revocation', '', 'Individuals may revoke in writing.', 'Revocations stop further use.'], ['Documentation', '', 'Keep signed authorizations.', 'Signed forms are retained for six years.'], ['Core elements', '', 'State what, who, purpose, expiry and signature.', 'The form includes each core element.'], ['Required statements', '', 'State revocation, conditioning and redisclosure.', 'The statements appear on the form.'], ['Plain language', '', 'Write it plainly.', 'People can understand the form.'], ['Copy to the individual', '', 'Give a copy of the signed form.', 'Individuals receive a copy.'],
 ]),
 cat('U', 'Attestation required', BOTH, ['Older attestation forms', 'Counsel review record'], [], 'Confirm with counsel whether older wording should be removed.', ['Vacated wording stays in forms and procedures.', 'Staff still ask for attestations with no basis.'], [
  ['Attestation requirement', '', 'Part of a 2024 rule vacated by a federal court in 2025.', 'Forms are reviewed with counsel.', BOTH, STATUS_CHANGED],
 ]),
 cat('U', 'Opportunity to agree or object', CE, ['Disclosure procedure', 'Records of agreement or objection'], PRIV, 'Sample cases and confirm the individual had the chance to respond.', ['Objections are not recorded.', 'Staff assume family may always be told.'], [
  ['Use and disclosure for facility directories', '', 'Let individuals opt out of directories.', 'Patients can opt out.'], ['Involvement in care and notification purposes', '', 'Share with those involved, subject to the chance to object.', 'Staff use judgement and share only what is relevant.'],
 ]),
 cat('U', 'No authorization or opportunity to agree or object required', CE, ['Disclosure procedure', 'Verification records', 'Disclosure log'], PRIV, 'Sample disclosures for verification, the minimum necessary and logging.', ['Disclosures are not logged for accounting.', 'Requester authority is not verified.'], [
  ['Required by law', '', 'Disclose as law requires.', 'The legal basis is confirmed.'], ['Public health activities', '', 'Disclose to public health authorities.', 'Reports go to authorized bodies.'], ['Victims of abuse, neglect or domestic violence', '', 'Disclose under set conditions.', 'Conditions and notice duties are checked.'], ['Health oversight activities', '', 'Disclose to oversight agencies.', 'The agency authority is confirmed.'], ['Judicial and administrative proceedings', '', 'Disclose under orders or with assurances.', 'Subpoenas are reviewed before release.'], ['Law enforcement purposes', '', 'Disclose under specific conditions.', 'Requests go through a trained contact.'], ['Decedents: coroners, medical examiners and funeral directors', '', 'Disclose for their duties.', 'Disclosures fit the duty.'], ['Organ, eye or tissue donation', '', 'Disclose to procurement organizations.', 'Disclosures are limited to the purpose.'], ['Research purposes', '', 'Use a waiver or other allowed route.', 'A valid basis is on file.'], ['Serious threat to health or safety', '', 'Disclose to prevent a serious threat.', 'Good-faith reasoning is recorded.'], ['Specialized government functions', '', 'Disclose for listed functions.', 'Requests are checked with counsel.'], ["Workers' compensation", '', 'Disclose as those laws allow.', 'Disclosures fit state law.'],
 ]),
 cat('U', 'Other requirements', CE, ['De-identification method', 'Data use agreements', 'Verification procedure'], PRIV, 'Sample one case for each process used.', ['Data labelled de-identified still has identifiers.', 'Fundraising lacks an opt-out.'], [
  ['De-identification standard', '', 'Data must not reasonably identify anyone.', 'A method is chosen and recorded.', BOTH], ['De-identification implementation: Expert Determination and Safe Harbor', '', 'Use one of the two methods.', 'The expert report or identifier removal is on file.', BOTH], ['Re-identification codes', '', 'Control any code.', 'Codes do not derive from personal data.', BOTH], ['Minimum necessary requirements', '', 'Set role and request limits.', 'Role limits and review criteria exist.', BOTH], ['Limited data set and data use agreements', '', 'Use an agreement for limited data sets.', 'An agreement exists before sharing.', BOTH], ['Fundraising', '', 'Limit data and offer an opt-out.', 'Every communication has an opt-out.'], ['Underwriting', '', 'Limit use of PHI for underwriting.', 'Limits are applied if no policy results.'], ['Verification of identity and authority', '', 'Verify requesters.', 'Identity and authority are checked before release.', BOTH],
 ]),
 cat('I', 'Notice of privacy practices', CE, ['Current notice', 'Distribution records', 'Acknowledgments'], [], 'Compare the current notice with required content and actual practice.', ['The notice is out of date.', 'It is not posted or provided as required.'], [
  ['Right to notice', '', 'Individuals have a right to the notice.', 'People can easily get the notice.'], ['Content of the notice', '', 'Include required content, and check 2026 updates for substance use disorder records.', 'Content is complete and current.'], ['Provision of the notice', '', 'Provide it as required for your type of organization.', 'The notice is provided, posted and online where required.'], ['Joint notice by separate covered entities', '', 'Organized arrangements may share a notice.', 'Any joint notice meets the conditions.'], ['Documentation', '', 'Keep notices and acknowledgments.', 'Versions and acknowledgments are retained.'],
 ]),
 cat('I', 'Rights to request privacy protection', CE, ['Request log', 'Decision records'], PRIV, 'Sample requests and decisions.', ['Requests are not tracked.', 'Agreed restrictions do not reach systems.'], [
  ['Right to request restrictions', '', 'Individuals may ask, and some requests must be agreed.', 'Requests are decided and recorded.'], ['Confidential communications', '', 'Accommodate reasonable requests.', 'Alternative contact methods are used.'],
 ]),
 cat('I', 'Access of individuals', CE, ['Request log', 'Response timing', 'Fee method', 'Denial letters'], ['customer-access-request', ...PRIV], 'Sample requests and measure response time and fees.', ['Responses exceed the time limit.', 'Fees are not reasonable or cost-based.'], [
  ['Right of access', '', 'Individuals may see and get copies of their PHI.', 'People get their records in the form requested, if feasible.'], ['Requests and timely action', '', 'Act within 30 days, with one 30-day extension.', 'Requests are tracked to the deadline.'], ['Provision of access', '', 'Provide access in the requested form.', 'Format and fees follow the rule.'], ['Denial of access', '', 'Deny only on allowed grounds, in writing.', 'Denials state reasons and review rights.'], ['Documentation', '', 'Keep record sets and responsible titles.', 'Records are retained.'],
 ]),
 cat('I', 'Amendment', CE, ['Amendment requests', 'Decision records'], [], 'Sample requests from receipt to decision.', ['Accepted amendments do not reach recipients.', 'Denials lack dispute rights.'], [
  ['Right to amend, with acceptance, denial and documentation', '', 'Individuals may ask to amend, and you must act and record it.', 'Requests are handled on time and documented.'],
 ]),
 cat('I', 'Accounting of disclosures', CE, ['Disclosure log', 'Accounting responses'], [], 'Generate an accounting for a test individual.', ['Disclosures are not logged.', 'Business associate disclosures are missed.'], [
  ['Right to an accounting, content, timing and documentation', '', 'Provide an accounting of certain disclosures.', 'An accurate accounting can be produced on time.'],
 ]),
 cat('I', 'Administrative requirements', CE, ['Privacy officer designation', 'Training records', 'Complaint log', 'Sanction records', 'Policies'], [...PRIV, 'hipaa-training-record'], 'Interview the privacy officer and sample records.', ['Designations are out of date.', 'New staff are not trained in time.'], [
  ['Personnel designations', '', 'Name a privacy official and contact.', 'The official and contact are named.'], ['Training', '', 'Train workforce on privacy policies.', 'Training is timely and recorded.'], ['Safeguards', '', 'Protect PHI in all forms.', 'Paper and verbal PHI are protected too.'], ['Complaints', '', 'Provide a complaint process.', 'Complaints are logged and resolved.'], ['Sanctions', '', 'Apply sanctions.', 'Sanctions are applied and recorded.'], ['Mitigation', '', 'Reduce harm from violations.', 'Harm reduction steps are recorded.'], ['Refraining from intimidation or retaliation', '', 'Do not retaliate.', 'People can raise concerns safely.'], ['No waiver of rights', '', 'Do not require waivers.', 'Forms do not ask for a waiver.'], ['Policies and procedures', '', 'Maintain privacy policies.', 'Policies are current and followed.'], ['Documentation', '', 'Keep required records.', 'Records are kept for six years.'], ['Exceptions for certain group health plans', '', 'Limited duties apply to some fully insured plans.', 'Any exception is confirmed and recorded.'],
 ]),
];

const slugify = (s) => s.toLowerCase().replace(/[^a-z]+/g, '-').replace(/^-|-$/g, '');
const seen = new Set();
export const HIPAA_REQUIREMENTS = CATEGORIES.flatMap((c) => c.items.map(([name, spec, summary, whatGoodLooksLike, applies, status]) => {
  let slug = slugify(name);
  if (seen.has(slug)) slug = `${slugify(c.ruleArea.split(',').pop())}-${slugify(c.category)}-${slug}`;
  seen.add(slug);
  return { slug, name, ruleArea: c.ruleArea, category: c.category, appliesTo: applies || c.appliesTo, specification: c.ruleArea === 'Security Rule' ? (spec || 'Not applicable') : 'Not applicable', summary, whatGoodLooksLike, evidence: c.evidence, status: status || '',
    testSteps: [`Read the written procedure for ${name.charAt(0).toLowerCase()}${name.slice(1)}, and confirm it has an owner and is current.`, c.test, `Sample recent records and confirm this outcome: ${whatGoodLooksLike}`],
    commonGaps: c.gaps, templates: c.templates, relatedRequirements: c.items.filter((i) => i[0] !== name).slice(0, 3).map((i) => i[0]) };
}));
export const RULE_AREAS = Object.values(RULES);
