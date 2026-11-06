import { card } from './card.js';

export default {
  id: 'C.10', name: 'Improvement', type: 'clause',
  items: [
    card('10.1', 'Audit continual improvement of the ISMS', 2,
      'The organization must keep improving how suitable, adequate and effective its ISMS is. Improvement should be visible over time, not only in reaction to audit findings.',
      'Keep an improvement log fed by incidents, metrics, audits, staff ideas and customer feedback. Each entry gets an owner, a date and a note on the result, such as faster patching or a simpler access process.',
      [
        'Ask for examples of improvements in the period and their source.',
        'Compare metrics across periods to see whether performance actually improved.',
        'Check that improvements came from several sources, not only audit findings.',
        'Interview: "What is better about your ISMS than a year ago, and how can you show it?"',
        "Interview a staff member: \"If you had an idea to improve security, where would you raise it?\"",
      ],
      ['Minor', 'Clause 10.1 requires continual improvement of the ISMS. No improvement actions are recorded outside audit findings, and key metrics show no change over three periods.'],
      ['R: Improvement log with sources and outcomes', 'S: Metric trends across periods'],
      { templates: ['corrective-action-log'], related: ['9.1', '9.3.3', '10.2'], soc2: 'CC4.2' }),
    card('10.2', 'Audit nonconformity handling and corrective action', 2,
      'When a nonconformity happens, the organization must react to control and correct it, find the root cause, decide whether similar problems exist elsewhere, act to stop it happening again, check the action worked and update the ISMS if needed. It must keep records of each step.',
      'Log nonconformities from audits, incidents and monitoring in one tracker. For each one, record the immediate correction, the root cause, the corrective action, the owner and due date, and an effectiveness check a few weeks later before closing.',
      [
        'Obtain the nonconformity log and sample 5 closed items.',
        'Check each has a correction, root cause, corrective action and effectiveness review.',
        'Check whether the organization looked for the same problem elsewhere.',
        'Test effectiveness: look for repeat findings on the same issue.',
        'Interview the action owner: "How did you confirm this fix worked?"',
        "Interview the ISMS owner: \"How do you decide whether a problem is a nonconformity?\"",
      ],
      ['Minor', 'Clause 10.2 requires the effectiveness of corrective actions to be reviewed. 4 of 5 sampled nonconformities were closed on the day the action was taken, with no effectiveness review, and the access review finding recurred.'],
      ['R: Nonconformity and corrective action log', 'R: Root cause records and effectiveness reviews'],
      { templates: ['corrective-action-log'], related: ['9.2.1', '9.3.2', '10.1'], soc2: 'CC4.2, CC7.5' }),
  ],
};
