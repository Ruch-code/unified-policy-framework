// ISO/IEC 27001:2022 Lead Auditor playbook: A.5 Organizational Controls.
// Sample batch: A.5.1 to A.5.3. Remaining controls to follow after review.
// soa.verdict matches the advisory default on this page's Annex A reference card.

export default {
  id: 'A.5',
  name: 'Organizational Controls',
  type: 'annex',
  items: [
    {
      id: 'A.5.1',
      title: 'Audit the information security policy and topic-specific policies',
      hours: 1,
      control: 'The organization needs a top-level information security policy approved by management, supported by topic-specific policies. Both must be shared with staff and relevant parties, acknowledged, and reviewed on a schedule or when something significant changes.',
      how: 'Keep a short top-level policy signed off by the CEO, plus topic policies for areas such as access, acceptable use, cryptography, supplier, incident and secure development. Publish them in the company wiki or HR system, collect acknowledgements at onboarding and yearly through the HR or training tool, and record an annual review even when nothing changes.',
      check: [
        'Obtain the policy set and confirm each policy has an owner, version, approver and a review date within the defined interval.',
        'Confirm the top-level policy is approved by top management and contains commitments to meet requirements and to continually improve (link to 5.2).',
        'Sample 10 per cent of staff, at least 5 and at most 25, mixing new hires and long-standing staff, and check for a signed acknowledgement of the current version.',
        'Check that a significant change, such as a new product line or regulation, triggered a review.',
        'Interview a staff member: "Where would you find the security policy, and what does it expect of you?"',
        'Interview the policy owner: "When did you last change a policy, and how did you tell people?"',
      ],
      nonconformity: {
        grade: 'Minor',
        statement: 'A.5.1 requires policies to be reviewed at planned intervals and acknowledged by relevant personnel. The acceptable use policy was last reviewed 20 months ago against a 12-month cycle, and 3 of 15 sampled staff have no acknowledgement of the current version.',
      },
      evidence: [
        { type: 'record', text: 'Approved information security policy with version history and approver' },
        { type: 'record', text: 'Policy register listing each topic policy, owner and next review date' },
        { type: 'system', text: 'Acknowledgement report exported from the HR or training tool, with timestamp' },
      ],
      soa: { verdict: 'Selected' },
      templates: ['infosec-aup-policy', 'code-of-conduct'],
      toBuild: [],
      related: ['5.2', '7.3', '7.5.2', 'A.5.36'],
      soc2: 'CC2.2, CC5.3',
    },
    {
      id: 'A.5.2',
      title: 'Audit how security roles and responsibilities are defined and assigned',
      hours: 1,
      control: 'Security roles and responsibilities have to be defined and given to named people, in line with what the organization actually needs. Everyone should know who owns the ISMS, who owns each risk and asset, and who can make security decisions.',
      how: 'Write a roles policy or RACI naming the ISMS owner, security lead, risk owners, asset owners and incident lead, with deputies for small teams. Add security duties to job descriptions for key roles. Review it whenever someone joins, leaves or changes role, because in a startup one departure can leave a role empty.',
      check: [
        'Obtain the roles policy or RACI and confirm each role is assigned to a current employee, with a deputy for critical roles.',
        'Compare named role holders with the HR system to find leavers who still hold roles.',
        'Sample 3 risk owners and 3 asset owners from the registers and confirm they appear in the roles document.',
        'Interview a named risk owner: "Which risks do you own, and what decisions have you made about them this year?"',
        'Interview an engineer: "Who do you go to for a security decision, and who can approve an exception?"',
      ],
      nonconformity: {
        grade: 'Minor',
        statement: 'A.5.2 requires security roles to be defined and allocated. The roles policy names a security lead who left the organization four months ago, and no replacement or deputy has been assigned.',
      },
      evidence: [
        { type: 'record', text: 'Information security roles and responsibilities policy or RACI with named holders' },
        { type: 'record', text: 'Job descriptions for key security roles' },
        { type: 'system', text: 'HR system export of current employees for comparison, with timestamp' },
      ],
      soa: { verdict: 'Selected' },
      templates: ['infosec-roles-policy'],
      toBuild: [],
      related: ['5.3', 'A.5.3', 'A.5.4', 'A.5.9'],
      soc2: 'CC1.3',
    },
    {
      id: 'A.5.3',
      title: 'Audit segregation of conflicting duties',
      hours: 1,
      control: 'Duties that conflict, such as requesting and approving access or writing and deploying code, should be split between different people. Where a small team cannot do that, the risk has to be recognised and covered by compensating controls.',
      how: 'Use branch protection so no one merges their own pull request into the production branch, require approval for production access requests from someone other than the requester, and keep finance approvals separate from payment execution. In a team of two or three, use compensating controls such as after-the-fact review of deploy logs and admin actions, and record the accepted risk.',
      check: [
        'Ask for the list of conflicting duties the organization identified and the control for each.',
        'Inspect branch protection settings on production repositories, including whether administrators can bypass them.',
        'Sample 25 merged pull requests to the production branch from the period, or all if fewer, and confirm the approver differs from the author.',
        'Sample access requests and confirm the approver is not the person receiving access.',
        'Where separation is not possible, inspect the compensating review and its records.',
        'Interview the engineering lead: "Can anyone deploy to production alone? Show me what stops it."',
      ],
      nonconformity: {
        grade: 'Minor',
        statement: 'A.5.3 requires conflicting duties to be segregated. Branch protection allows administrators to bypass review, and 4 of 25 sampled production merges were approved by their own author, with no compensating review recorded.',
      },
      evidence: [
        { type: 'system', text: 'Branch protection settings screenshot for production repositories, showing admin enforcement and timestamp' },
        { type: 'system', text: 'Exported sample of merged pull requests with author and approver' },
        { type: 'record', text: 'Segregation of duties matrix with compensating controls and risk acceptance' },
      ],
      soa: { verdict: 'Selected' },
      templates: ['infosec-roles-policy'],
      toBuild: ['Segregation of Duties Matrix'],
      related: ['A.5.2', 'A.5.15', 'A.8.2', 'A.8.32'],
      soc2: 'CC5.1, CC8.1',
    },
  ],
};
