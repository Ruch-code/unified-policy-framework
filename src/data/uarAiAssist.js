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
