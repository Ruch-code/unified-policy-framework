// The 3-Level GRC Maturity Model: Documentation, Integration, Influence. Edit freely.

export const MATURITY_HERO = {
  eyebrow: 'GRC Maturity Model',
  title: 'From compliance to capital decisions',
  intro: 'Most organisations treat governance, risk and compliance as a cost of doing business: write the policies, pass the audit, move on. The organisations that pull ahead treat it differently. They use risk to decide where to invest, what to stop and which trade-offs leadership should make. This model describes three levels of GRC maturity and what it takes to move between them.',
};

// [level, name, one-line summary, focus, market reality]
export const LEVEL_SUMMARY = [
  ['Level 1', 'Documentation', 'The foundation', 'Writing policies, maintaining the risk register, preparing for audits.', 'Necessary, but the market is saturated with this capability.'],
  ['Level 2', 'Integration', 'The transition', 'Aligning controls to business processes, mapping risks to strategic objectives, quantifying operational and financial exposure.', 'Useful, but still largely reactive.'],
  ['Level 3', 'Influence', 'The destination', 'Shaping executive trade-offs, translating risk into investment logic, influencing where capital is deployed.', 'Scarce and highly valuable.'],
];

export const LEVELS = [
  {
    id: 'level-1',
    level: 'Level 1',
    name: 'Documentation',
    headline: 'Get the foundation right, then stop paying for it twice',
    overview: 'Every mature GRC programme starts here: a policy set that reflects how the company actually operates, a risk register with named owners, and evidence ready when an auditor or customer asks. Done well, Level 1 earns the certificate and the customer\'s trust. Done poorly, it becomes a yearly scramble that consumes the same people every audit cycle and tells leadership very little.',
    pains: [
      ['Audit fire drills', 'Evidence is gathered in the weeks before fieldwork, pulling engineers and managers away from their work every year.'],
      ['Shelfware policies', 'Policies are copied from templates, approved once and rarely read. Practice drifts away from what is written, and auditors find the gap.'],
      ['A static risk register', 'Risks are listed once a year, scored by feel and never connected to decisions. The register exists to satisfy a clause, not to manage anything.'],
      ['Framework sprawl', 'SOC 2, ISO 27001, HIPAA and customer questionnaires are handled as separate projects, so the same control is documented and tested several times.'],
      ['No line of sight for leadership', 'The board hears "we passed" or "we failed" and little else.'],
    ],
    services: [
      ['Readiness and certification', 'SOC 2, ISO/IEC 27001, ISO/IEC 42001, HIPAA and similar programmes delivered on a fixed plan, with a clear path from gap assessment to report.'],
      ['Policies people can follow', 'A right-sized policy set written to match how the business runs, with owners, review dates and a plain-language summary for staff.'],
      ['One control set, many frameworks', 'A unified control library mapped across frameworks so each control is designed, evidenced and tested once.'],
      ['Evidence that collects itself', 'Automated evidence collection and continuous monitoring, so audit preparation becomes a review rather than a project.'],
      ['A working risk register', 'Consistent scoring criteria, named owners and a review cadence, setting up the move to Level 2.'],
    ],
    next: 'The way forward: once the foundation runs on its own, the effort it used to consume can go into connecting controls and risks to the business itself.',
  },
  {
    id: 'level-2',
    level: 'Level 2',
    name: 'Integration',
    headline: 'Connect risk to how the business actually runs',
    overview: 'At Level 2, GRC stops being a parallel workstream and becomes part of how processes operate. Controls are designed around real workflows such as onboarding a customer, shipping code or paying a vendor. Risks are tied to the objectives they threaten, and exposure is expressed in operational and financial terms rather than red, amber and green. The programme becomes useful to the business, but it still mostly responds to decisions after they have been made.',
    pains: [
      ['Controls that slow people down', 'Controls bolted on after the fact create friction, workarounds and shadow processes.'],
      ['Heat maps without numbers', 'A risk scored "high" does not say whether it is a $50,000 problem or a $5 million problem, so it cannot be weighed against other priorities.'],
      ['Risk arrives late', 'The GRC team learns about a new product, vendor or market after the commitment is made, and can only point out what is now hard to fix.'],
      ['Siloed data', 'Risk, finance, engineering and operations each hold part of the picture, and nobody joins it up.'],
      ['Reporting that informs but does not change anything', 'Dashboards are produced and acknowledged, and decisions carry on unchanged.'],
    ],
    services: [
      ['Process-aligned control design', 'Controls embedded in the systems and workflows people already use, so compliance becomes a by-product of normal work.'],
      ['Risk-to-objective mapping', 'Each material risk is linked to the strategic objective, revenue line or customer commitment it threatens.'],
      ['Risk quantification', 'Operational and financial exposure modelled in ranges using recognised approaches such as FAIR, so risks can be compared in the same units as other business decisions.'],
      ['Key risk indicators', 'Leading indicators tied to thresholds and owners, so problems surface before they become incidents.'],
      ['Integrated reporting', 'One view across security, privacy, vendor, operational and AI risk, written for the people who make decisions.'],
    ],
    next: 'The way forward: once risk is expressed in business terms, it can be brought into decisions before they are made rather than after.',
  },
  {
    id: 'level-3',
    level: 'Level 3',
    name: 'Influence',
    headline: 'Use risk to decide where the next dollar goes',
    overview: 'At Level 3, GRC has a seat where trade-offs are made. Risk is framed as investment logic: what each option costs, what exposure it removes, what it enables and what the business is choosing to accept. The GRC function helps leadership decide which markets to enter, which products to accelerate, which controls are worth funding and which risks are worth taking. This capability is scarce because it needs fluency in both risk and the economics of the business.',
    pains: [
      ['Security and compliance seen only as cost', 'Budgets are defended line by line, without a clear link to revenue, deals or valuation.'],
      ['Risk appetite that lives only on paper', 'The board approves an appetite statement, but nobody can show how it shaped a decision.'],
      ['Trade-offs made without the full picture', 'Growth, speed and risk are argued separately, so the loudest voice wins rather than the best-reasoned case.'],
      ['Capital spread evenly instead of deliberately', 'Spending is allocated by last year\'s budget or the latest incident, not by where it reduces the most exposure or unlocks the most value.'],
      ['A GRC leader who reports but is not consulted', 'The function presents to the board but is not part of the room when strategy is set.'],
    ],
    services: [
      ['Decision-ready risk briefings', 'Board and executive briefings framed as options, costs, residual exposure and recommendations, not lists of findings.'],
      ['Risk-informed investment cases', 'Business cases for security, privacy and AI governance spending that show return in reduced exposure, enabled revenue and avoided cost.'],
      ['Operational risk appetite', 'Appetite statements turned into thresholds and decision rules that teams use for product, vendor, market and AI decisions.'],
      ['Strategic scenario analysis', 'Scenarios for market entry, acquisitions, new regulation and AI adoption, so leadership sees the risk profile of each path before committing.'],
      ['Advisory to leadership', 'Fractional or advisory support for executives and boards on risk trade-offs, capital allocation and governance of emerging technology.'],
    ],
    next: 'The result: risk becomes a reason to move with confidence, not only a reason to slow down.',
  },
];

// [dimension, level 1, level 2, level 3]
export const COMPARISON = [
  ['Primary question', 'Are we compliant?', 'Where are we exposed, and by how much?', 'What should we invest in, and what risk are we choosing to accept?'],
  ['Main audience', 'Auditors and customers', 'Operational leaders', 'Executives and the board'],
  ['Language used', 'Controls, clauses, findings', 'Processes, objectives, exposure in ranges', 'Options, returns, trade-offs, capital'],
  ['Timing', 'After the fact', 'Alongside operations', 'Before the decision'],
  ['Typical output', 'Policies, risk register, audit report', 'Integrated controls, quantified risk, KRIs', 'Investment cases, decision rules, board recommendations'],
  ['How value is measured', 'Certificate earned, audit passed', 'Losses avoided, friction reduced', 'Capital better allocated, growth enabled'],
];

export const JUMP = {
  title: 'The cognitive jump from Level 1 to Level 3',
  intro: 'Moving from documentation to influence is not about producing more documents or adding more controls. It is a change in how risk is thought about and talked about. Most programmes stall at Level 1 or Level 2 because the skills that make someone excellent at audits are not the same skills that win a strategic argument.',
  shifts: [
    ['From obligation to choice', 'Level 1 asks what we are required to do. Level 3 asks what we are choosing to do and what we are choosing to accept. Risk becomes something leadership decides on, not something done to them.'],
    ['From controls to outcomes', 'Auditors care whether a control operated. Executives care what it protects and what it costs. Each control should be explainable in terms of the revenue, customers or operations it keeps safe.'],
    ['From colours to currency', 'Red, amber and green cannot be weighed against a product launch or a hire. Ranges of financial exposure can. Quantification is the bridge.'],
    ['From reporting to recommending', 'A report describes the situation. A recommendation proposes what to do about it, including the option of doing nothing, and owns the reasoning.'],
    ['From after the fact to before the decision', 'Influence depends on timing. GRC has to be present when plans are drafted, not when they are signed.'],
    ['From the GRC team to the business', 'The most influential GRC leaders speak the language of finance, product and strategy, and earn their seat by helping others reach their goals safely.'],
  ],
  close: 'Few organisations make this jump on their own, because Level 1 work rarely leaves time to build Level 3 capability. Our approach is to make the foundation efficient enough to run itself, connect risk to the business in measurable terms, and then bring that thinking into the room where capital is deployed.',
  cta: 'Wherever your programme is today, the next step is the same: understand where you stand, and decide where you need to be.',
};
