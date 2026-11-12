// Where AI helps in user access reviews. Edit freely.
export const UAR_AI_INTRO = 'AI fits well in the review step. Reviewing access is mostly pattern matching, and that is where it does well. The reviewer still makes the decision; AI narrows down what they need to look at.';

// [use, how AI helps, example flag, what the reviewer still does]
export const UAR_AI_USES = [
  ['Access that does not match the role or peer group', 'Compares each person\'s access with others in the same team and role, and flags the outliers.', 'A support agent holds admin rights that nobody else in the support team has.', 'Confirms with the manager whether there is a real business need, then approves or revokes.'],
  ['Dormant access', 'Reads last-login and last-used data to find accounts or permissions that have not been used in 60 to 90 days.', 'A finance user has not opened the payroll system in 85 days but still has edit rights.', 'Removes the access or records why it must stay, for example a quarterly task.'],
  ['Movers who kept their old access', 'Matches HR role-change dates against current permissions to find access left over from a previous role. This is where most of the risk sits in larger organisations.', 'An engineer moved to sales three months ago and still has production database access.', 'Revokes the old access and checks for segregation of duties conflicts with the new role.'],
  ['A short reason for each flag', 'Writes a plain one-line explanation next to every flagged item, so the reviewer can approve or revoke quickly instead of going line by line.', '"Only member of Marketing with billing admin; granted 14 months ago; last used 7 months ago."', 'Reads the reason, makes the decision and records it. The decision and sign-off stay with a named person.'],
];

// [safeguard, why it matters]
export const UAR_AI_SAFEGUARDS = [
  ['A person decides', 'AI flags and explains. Approval, revocation and sign-off stay with the manager or system owner, and the evidence shows who decided.'],
  ['Complete and accurate input', 'Flags are only as good as the user lists, role data and login data fed in. Check the population is complete before relying on the output.'],
  ['Unflagged does not mean reviewed', 'Reviewers still certify all access in scope. AI sets the order of attention; it does not shrink the population.'],
  ['Keep the audit trail', 'Store what was flagged, the reason given, the decision and the removal ticket, so an auditor can re-perform the review.'],
];

// How access reviews run in practice, and where the time goes.
export const UAR_PRACTICE_INTRO = 'How a review is run depends mostly on the size of the organisation and the tools it has. In all cases, collecting the evidence often takes as long as the review itself.';

// [organisation, how the review is run, where it slows down]
export const UAR_PRACTICE_BY_SIZE = [
  ['Larger organisations', 'An identity governance and administration (IGA) tool such as SailPoint or Saviynt runs formal access certification campaigns. Reviewers certify access inside the tool.', 'Role and entitlement data must be kept accurate, and applications that are not connected to the tool still need manual reviews.'],
  ['Small and mid-size companies', 'User lists are exported into spreadsheets, emailed to managers, and then chased for sign-off.', 'Follow-ups. A compliance platform helps track which reviews are due and done, but the review itself still depends on reminders.'],
];

// [evidence, where it usually lives, the problem]
export const UAR_EVIDENCE_TRAIL = [
  ['Reviewer decision and sign-off', 'A spreadsheet, email or compliance platform', 'Kept apart from the action taken on it.'],
  ['Access removal request', 'A ticket in the service desk', 'Not linked to the review line that triggered it.'],
  ['Proof that access was revoked', 'Screenshots from each system', 'Collected separately, system by system, after the fact.'],
  ['The full trace per flagged user', 'Assembled by hand', 'Everything has to be matched up so the auditor can follow each flagged user from review to removal.'],
];

// [what auditors check, what they want to see, what happens when it is missing]
export const UAR_COMPLETENESS = [
  ['Source of the user list', 'The list was pulled directly from the system, with the query or export screen, date and record count.', 'The population cannot be relied on, so the auditor asks for it to be re-pulled or tests more.'],
  ['Every user reviewed', 'Each account on the list has a decision: keep, change or remove.', 'Unreviewed accounts are raised as an exception.'],
  ['Timeliness', 'The review was completed within the period the policy sets, for example each quarter.', 'A late review is an exception, even if the access was appropriate.'],
  ['Follow-through', 'Access marked for removal was removed promptly, with a timestamp.', 'More back and forth during fieldwork to prove removal, or a finding.'],
];

export const UAR_ONE_PLACE = 'A tool that captures the decision, the revocation and the timestamp automatically, all in one place, removes most of this matching work. It saves the most time for companies that go through SOC 2 or ISO 27001 audits every year, because the same trail has to be produced again each cycle.';
