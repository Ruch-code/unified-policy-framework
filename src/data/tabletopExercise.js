// Incident response and disaster recovery tabletop exercise: a generic template with a worked scenario.
// Generalised from a real exercise. No company, product, people or dates.

export const TTX_INTRO = 'A tabletop exercise is a discussion-based session where the team talks through its response to a made-up emergency. Running incident response and disaster recovery together tests the handover from containing an incident to restoring service. Auditors accept the written report as evidence that both plans were tested. Use this as a template: keep the structure, swap in your own scenario and roles.';

// [item, what to record]
export const TTX_SETUP = [
  ['Format', 'Remote or in-person discussion, usually 60 to 90 minutes, led by a facilitator.'],
  ['Participants', 'Technical lead (incident commander), an executive, the person who talks to customers, and engineering. Record names, roles and the date in your own report.'],
  ['Plans tested', 'Incident Response Plan and Business Continuity and Disaster Recovery Plan.'],
  ['Objectives', 'Check the team can detect, contain and recover; confirm written procedures match what people would really do; test customer communication and escalation; find gaps and agree fixes.'],
  ['Output', 'A dated report with scenario, questions, responses, findings, recommendations and owners.'],
];

export const TTX_SCENARIO_INTRO = 'Worked scenario: a database change corrupts customer data. The company runs a cloud-hosted platform that processes customer documents and delivers structured data to customer systems through an API, under service levels for turnaround and accuracy. Some of the data is regulated personal data.';

// [time, what happens]
export const TTX_TIMELINE = [
  ['Start', 'A large customer emails support: data received that morning contains errors. Fields are swapped, amounts are wrong, and some records contain fragments of other records.'],
  ['+30 minutes', 'Operations finds that a database migration script ran overnight to improve performance. It appears to have corrupted the tables that link extracted data to the right record.'],
  ['+75 minutes', 'Analysis shows several thousand records processed overnight are affected and have already been delivered to the customer. The application itself is running. The backup from before the migration is clean, but restoring it loses the morning\'s legitimate work. Two smaller customers may be affected and have not noticed yet.'],
  ['+105 minutes', 'The customer calls the chief executive, worried about regulatory exposure, wrong decisions already made on bad data, and the effort to reprocess.'],
];

// [impact, description]
export const TTX_IMPACT = [
  ['Service', 'Processing has to be paused until data integrity is confirmed.'],
  ['Customer operations', 'Customers face disruption and may have acted on incorrect data.'],
  ['Data integrity and privacy', 'Unknown extent of corruption; records mixed between entries may be a privacy incident.'],
  ['Financial and contractual', 'Service-level penalties, remediation cost and possible liability.'],
  ['Compliance', 'Change management and data integrity controls did not work as intended.'],
];

// [question, model response for a small company]
export const TTX_IR_QA = [
  ['How would a customer or user report this?', 'Through the support desk, the support email or a direct call. Here the customer emailed first, then escalated by phone to an executive once the severity was clear.'],
  ['How is an incident detected?', 'Infrastructure monitoring covers system health, but data quality is only checked after processing. This incident was found by a customer, not by monitoring. That is a gap.'],
  ['Do we have the tools to respond?', 'Backups and restore capability exist. A written playbook for data corruption does not; the knowledge sits with one person.'],
  ['Who can activate the Incident Response Plan?', 'The technical lead declares the incident, with the chief executive as backup. First action: pause processing to stop further corruption.'],
  ['Who must be told, and how?', 'Technical lead (incident commander), chief executive (customer relationship), operations lead (customer communications), engineers and support. In a small team this happens by phone and chat; it still needs to be written down.'],
  ['What are the roles?', 'Incident commander: investigation, root cause, recovery. Executive: decisions, senior customer contact, business impact. Operations lead: customer liaison and updates. Engineering: restore, test, validate.'],
  ['Can we meet the times in the plan?', 'Acknowledge the customer within one hour. Pause immediately, scope within two to three hours, choose the recovery approach, and aim to resume clean operations within 24 hours. Helping customers fix data they already used will take longer.'],
  ['Are there legal or compliance implications?', 'Yes. Corrupted or mixed personal data needs a breach assessment under applicable privacy law. Contract accuracy commitments may trigger penalties. Change management control failures will be raised at audit.'],
  ['Do customers or authorities need to be notified?', 'Affected customers: yes, at once, with regular updates. Law enforcement: only if there are signs of malicious activity. Regulators: depends on the breach assessment.'],
  ['Can the data be restored?', 'Yes, from the clean pre-migration backup, at the cost of the morning\'s work. Options are an in-place repair if the damage is limited, or a restore followed by reprocessing. Either way, give customers a definite list of unreliable records.'],
  ['How do we stop this happening again?', 'Test every database change in staging, require approval before production, run automated integrity checks after migrations, monitor data quality, and document rollback steps.'],
  ['Is there cyber insurance, and a notification deadline?', 'Often nobody in the room knows. Confirm cover and the insurer\'s notification deadline, and write both into the plan.'],
];

export const TTX_DR_QA = [
  ['Who can activate the disaster recovery plan?', 'The technical lead recommends it and the chief executive approves. Trigger: a failure affecting availability or data integrity that normal incident response cannot fix.'],
  ['What staffing is needed?', 'Recovery lead, technical remediation, internal communications, external communications, and someone recording the timeline and actions.'],
  ['How is activation communicated?', 'Direct calls and chat messages. Formal notification steps and templates should be written down.'],
  ['What if key people are unavailable?', 'This is usually the biggest risk in a small company. If the technical lead is away, nobody else has the same depth on the cloud platform and the database. Cross-train and document.'],
  ['Are recovery procedures documented and accurate?', 'Often not. Needed: backup and restore runbook, integrity validation steps, pause and restart steps, customer notification templates, post-recovery checklist, and how to collect evidence.'],
];

// [step, action]
export const TTX_RECOVERY = [
  ['1. Contain', 'Pause all processing jobs to stop further corruption.'],
  ['2. Scope', 'Analyse the database to identify every affected record.'],
  ['3. Notify', 'Give affected customers the list of unreliable records within two to three hours.'],
  ['4. Decide', 'Repair in place if the damage is limited to specific tables; otherwise restore the clean backup and reprocess legitimate work.'],
  ['5. Validate', 'Test data integrity on a small sample before restoring full service.'],
  ['6. Restart', 'Resume processing gradually with closer monitoring.'],
  ['7. Support', 'Help customers find and reprocess the data they already used.'],
];

// [target, time]
export const TTX_TARGETS = [
  ['First customer acknowledgement', 'Within 1 hour of confirming the incident'],
  ['Scope and list of affected records', '2 to 3 hours'],
  ['Recovery (repair or restore)', '4 to 8 hours'],
  ['Service restored with validated data', 'Within 24 hours'],
  ['Customer remediation', 'Longer; agreed with each customer'],
];

// [observation, recommendation]
export const TTX_FINDINGS = [
  ['No formal incident response and recovery playbooks, although the team has the skills.', 'Write runbooks with step-by-step procedures, decision points, communication templates and role assignments. Start with database backup and restore, integrity validation and customer notification.'],
  ['One person is the only expert on the platform and the cloud environment.', 'Cross-train other engineers and document procedures well enough that someone else can run a recovery. Consider paid support from the cloud provider for complex cases.'],
  ['Detection relies on customers reporting problems.', 'Add automated data integrity checks before delivery, alerts on database errors and processing failures, and thresholds that trigger an investigation.'],
  ['No templates or escalation matrix for customer communication.', 'Prepare templates for the first acknowledgement, investigation updates, resolution and post-incident review. Define when operations and when the chief executive contacts customers.'],
  ['No set way of documenting incidents as audit evidence.', 'Use an incident record template: timeline, actions, people involved, customer notifications, root cause and corrective actions. Name who maintains the incident log.'],
  ['A small team has limited capacity for a long incident.', 'Document how to bring in outside help, with contacts and who can authorise it.'],
];

// What to keep as audit evidence
export const TTX_EVIDENCE = [
  'The dated exercise report with attendees and roles',
  'The scenario and the questions discussed',
  'Findings, recommendations, owners and due dates',
  'Tickets showing the actions were completed',
  'Updated plans where the exercise changed them',
];
