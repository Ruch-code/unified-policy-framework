// AI governance across the lifecycle, mapped to ISO/IEC 42001, NIST AI RMF and the EU AI Act. Edit freely.
// Row: [area, what good looks like, ISO/IEC 42001, NIST AI RMF, EU AI Act]

export const LC_INTRO = 'AI governance work falls into four stages: building the programme, understanding the law, governing development, and governing deployment and use. The same activities satisfy ISO/IEC 42001, the NIST AI RMF and the EU AI Act, so map each activity once and reuse the evidence.';

export const LC_STAGES = [
  {
    stage: 'Foundations of the programme',
    rows: [
      ['Why AI needs its own governance', 'Agree definitions and AI types; record the risks particular to AI (opacity, autonomy, speed and scale, data dependency, probabilistic outputs) and the responsible AI principles the organisation commits to.', 'C.4.1, A.2', 'GOVERN 1', 'Art. 3, Art. 4'],
      ['Roles, collaboration and training', 'Name owners for each AI system, run a cross-functional review group, and train staff on AI terms, strategy and their responsibilities as developer, deployer or user.', 'C.5.3, C.7.2, C.7.3, A.3.2', 'GOVERN 2, GOVERN 3', 'Art. 4, Art. 26'],
      ['Policies across the lifecycle', 'Cover use case assessment, risk management, ethics by design, data acquisition, development, testing, deployment, monitoring and incidents; update privacy, security, data and IP policies for AI; add AI terms to procurement, contracts and acceptable use.', 'C.5.2, A.2.2 to A.2.4, A.10.2 to A.10.4', 'GOVERN 1, GOVERN 6', 'Art. 9, Art. 17, Art. 25'],
    ],
  },
  {
    stage: 'Laws, standards and frameworks',
    rows: [
      ['Privacy law applied to AI', 'Check lawful basis, transparency, purpose limitation, minimisation, privacy by design, impact assessments, cross-border transfers, data subject rights and automated decision-making rules, including special category data such as biometrics.', 'A.5, A.7', 'GOVERN 1.1', 'Art. 10; GDPR Art. 22 and 35'],
      ['Other laws that reach AI', 'Assess intellectual property (training data rights), non-discrimination in employment, credit, housing and insurance, consumer protection against unfair or deceptive practices, and product liability.', 'C.4.1, C.4.2, A.5.4', 'GOVERN 1.1, MAP 5', 'Applies alongside the Act'],
      ['AI-specific law', 'Classify each system by risk tier, then apply the matching duties: risk management, data governance, technical documentation, record keeping, human oversight, transparency, quality management, general-purpose model duties and penalties. Duties differ for providers, deployers, importers and distributors.', 'C.4.2', 'GOVERN 1.1', 'Art. 5, 6, 8 to 16, 26, 50, 51 to 55, 99'],
      ['Industry standards', 'Use the OECD AI principles, the NIST AI RMF and Playbook, and the ISO AI standards (ISO/IEC 22989 terminology, 42001 management system, 42005 impact assessment) as the reference set.', 'Whole standard', 'Whole framework', 'Harmonised standards'],
    ],
  },
  {
    stage: 'Governing development',
    rows: [
      ['Design and build', 'Define the business context and use case; run the impact assessment; apply policy to purpose, requirements, architecture and model selection, human oversight, metrics and thresholds; manage risks with a severity matrix, mitigation hierarchy, stakeholder mapping and pre-deployment pilots; document the process.', 'A.5.2, A.6.1.2, A.6.2.2, A.6.2.3', 'MAP 1 to MAP 5', 'Art. 9, 11, 14'],
      ['Data, training and testing', 'Confirm lawful rights to collect and use data; assess quality, quantity, integrity and fitness for purpose; record lineage and provenance; test for performance, security, bias and interpretability; document results.', 'A.7.2 to A.7.6, A.6.2.4', 'MEASURE 2', 'Art. 10, 15'],
      ['Release, monitoring and maintenance', 'Assess readiness and create the model card; monitor and schedule updates and retraining; run audits, red teaming, threat modelling and security testing; work out why incidents happen (brittleness, poor data, drift); publish technical documentation, instructions for deployers and post-market monitoring plans.', 'A.6.2.5, A.6.2.6, A.6.2.8, A.8.2 to A.8.4', 'MEASURE 3, MANAGE 4', 'Art. 11 to 13, 17, 72, 73'],
    ],
  },
  {
    stage: 'Governing deployment and use',
    rows: [
      ['Deciding whether to deploy', 'Understand the use case context (business goals, performance needs, data, ethics, workforce readiness), the model type (classic or generative, proprietary or open, small or large, language or multimodal) and the deployment option (cloud, on-premise, edge; as is, fine-tuned, retrieval-augmented or agentic).', 'C.6.1, A.9.2 to A.9.4', 'MAP 1, MAP 2', 'Art. 26'],
      ['Assessing the system', 'Perform or review the impact assessment; review vendor and licence terms; understand the extra obligations and liability of deploying your own model.', 'A.5.2 to A.5.4, A.10.3', 'MAP 4, GOVERN 6', 'Art. 25, Art. 27'],
      ['Governing use', 'Apply policy to deployment (data governance, risk and issue management, user training); monitor and schedule maintenance; test periodically; record incidents and post-market monitoring; reduce secondary uses and downstream harm; plan external communication; be able to deactivate or localise a system for legal or performance reasons.', 'A.6.2.6, A.8.3, A.8.4, A.9', 'MANAGE 2.4, MANAGE 4, MEASURE 3', 'Art. 20, 26, 72, 73'],
    ],
  },
];

// Activities that appear in several stages. Do them once and reuse the output.
export const LC_SHARED = [
  ['Monitoring, testing and incidents', 'Development and deployment both require continuous monitoring with a maintenance and retraining schedule, periodic audits and red teaming, and an incident record.', 'One monitoring plan, one test calendar and one incident register per AI system (ISO/IEC 42001 A.6.2.6, A.8.4, A.9), used by the developer and the deployer.'],
  ['Impact assessment', 'Required when setting policy, when designing a system and before deploying one.', 'One impact assessment method (ISO/IEC 42001 A.5, guided by ISO/IEC 42005) that also feeds the EU AI Act fundamental rights impact assessment.'],
  ['Legal requirements', 'Privacy, IP, non-discrimination, consumer and AI-specific law are knowledge rather than controls.', 'Record them once in the legal requirements register under ISO/IEC 42001 C.4.1 and C.4.2, then link each requirement to the controls that meet it.'],
  ['Third parties', 'Vendor and licence terms appear in policy, development (data and models acquired) and deployment.', 'One AI supplier assessment (ISO/IEC 42001 A.10.3) reused for procurement, model sourcing and deployment.'],
];
