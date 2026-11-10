// When providers upload PHI to the platform: the HIPAA control that protects each step,
// how a breach could happen there, and how to handle a breach report that arrives by email. Edit freely.
// Flow row: [step, what happens, protecting control (highlighted), citation, how a breach could happen here]

export const UPLOAD_INTRO = 'Doctors and clinical staff upload patient records, images and notes to the platform. Each step of that journey has a Security Rule safeguard that protects it. The highlighted column is the control to point to when someone asks "what protects the PHI here?"';

export const UPLOAD_FLOW = [
  ['1. Sign in', 'The doctor signs in to the web or mobile app.', 'Person or entity authentication (MFA) and unique user identification', '164.312(d), 164.312(a)(2)(i)', 'Shared logins, phished passwords without MFA, or a session left open on a clinic computer.'],
  ['2. Upload in transit', 'The file travels from the doctor\'s device to the platform.', 'Transmission security: encryption in transit (TLS 1.2 or higher) and integrity controls', '164.312(e)(1), 164.312(e)(2)(i), 164.312(e)(2)(ii)', 'An old upload endpoint that still accepts unencrypted or weak connections; uploads sent by email instead of the portal.'],
  ['3. Stored on the platform', 'The file and its metadata are saved in the database and object storage.', 'Encryption and decryption at rest, with keys under a separate key-admin role', '164.312(a)(2)(iv)', 'A storage bucket made public, an unencrypted export copied elsewhere, or keys readable by too many people.'],
  ['4. Who can open it', 'Only the care team for that patient can view the record.', 'Access control and the minimum necessary standard (role-based access, tenant isolation)', '164.312(a)(1), 164.308(a)(4), 164.502(b)', 'Support or infrastructure staff with standing access, a tenant isolation bug, or insider snooping.'],
  ['5. Every access recorded', 'Each view, download and change is logged and reviewed.', 'Audit controls and information system activity review', '164.312(b), 164.308(a)(1)(ii)(D)', 'Logs that miss record-level reads, so snooping or misuse cannot be detected or ruled out.'],
  ['6. Not altered or lost', 'The record cannot be silently changed, and it can be restored.', 'Integrity controls and the contingency plan (backups, disaster recovery)', '164.312(c)(1), 164.308(a)(7)', 'Ransomware encrypting the datastore and the backups, or untested restores.'],
  ['7. Sessions end', 'An idle session closes on its own.', 'Automatic logoff', '164.312(a)(2)(iii)', 'An unlocked shared workstation in a clinic.'],
  ['8. Vendors that touch it', 'Hosting, storage, email and support tools that receive the PHI.', 'Business associate agreements', '164.308(b), 164.314(a)', 'A vendor without a BAA receiving PHI, for example an error-monitoring tool capturing upload payloads.'],
  ['9. Deleted when no longer needed', 'Files are deleted or returned when the customer leaves.', 'Device and media disposal and re-use; return or destroy PHI at BAA termination', '164.310(d)(2)(i), 164.504(e)(2)(ii)(J)', 'Old copies left in backups, test environments or a former employee\'s laptop.'],
];

// Breach report arrives by email. Row: [step, timing, what to do, who]
export const EMAIL_INTRO = 'Breach reports often arrive by email: a doctor says a patient\'s file was visible to the wrong clinic, a researcher reports an exposed bucket, or a vendor sends a security notice. How the first hour is handled decides whether the response is defensible.';

export const EMAIL_STEPS = [
  ['Do not forward the PHI', 'Immediately', 'Do not forward the email or its attachments widely, and do not reply with more PHI. Move it to the incident mailbox or ticket only.', 'Whoever receives it'],
  ['Acknowledge the sender', 'Within the same business day', 'Thank them, confirm it is being investigated, give a reference number, and ask them not to share the information further. Make no admission or conclusion yet.', 'Security or privacy official'],
  ['Open an incident', 'Within 1 hour', 'Create an incident ticket, record the discovery time (the 60-day clock starts at discovery), and assign an incident lead.', 'Incident lead'],
  ['Contain', 'Same day', 'Close the exposure: revoke the link, make the bucket private, suspend the account, rotate credentials.', 'Engineering or infrastructure'],
  ['Preserve evidence', 'Same day', 'Keep the original email, headers and access logs for the exposure window. Do not delete or edit them.', 'Security'],
  ['Investigate scope', 'Days 1 to 5', 'Work out which patients, which data fields, who could see it, and whether it was actually viewed or downloaded.', 'Incident lead with engineering'],
  ['Four-factor risk assessment', 'Days 3 to 10', 'Document: the nature and extent of the PHI, who received it, whether it was acquired or viewed, and how far the risk was mitigated. Decide breach or not breach, and record who decided.', 'Privacy official'],
  ['Notify the covered entity (if you are a business associate)', 'Without unreasonable delay, within the BAA deadline and no later than 60 days', 'Send the facts known so far, the affected individuals and the steps taken. Follow up as more is known.', 'Privacy official'],
  ['Individual, HHS and media notice (covered entity)', 'Within 60 days of discovery', 'Letters to individuals; HHS notice (immediately if 500 or more, or in the annual log if fewer); media notice if 500 or more residents of one state.', 'Covered entity, supported by the business associate'],
  ['Close and improve', 'After notification', 'Root cause, corrective actions, update the risk analysis, retrain, apply sanctions if needed. Keep all records for six years.', 'Security, privacy and HR'],
];

export const EMAIL_REPLY = 'Thank you for letting us know. We have opened an investigation under reference [IR number] and are treating this as a priority. Please do not forward or share the information further. We will update you by [date].';
