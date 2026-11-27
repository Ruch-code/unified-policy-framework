import LearningFrameworkPage from "../../components/LearningFrameworkPage.jsx";

// COBIT, ISACA's framework for governance and management of enterprise information and technology (I&T).
// COBIT 7 was released in late 2026 and succeeds COBIT 2019. Basic access to COBIT 7 is free from ISACA.
const FRAMEWORK = {
  id: 'cobit',
  name: 'COBIT (Governance and Management of Enterprise I&T)',
  shortName: 'COBIT',
  region: 'Global',
  flag: '',
  basePath: '/cobit',
  color: 'beige',
  weeks: [
    {
      week: 1,
      title: 'Understand COBIT',
      days: 'Days 1-10',
      description: 'Learn what COBIT covers, how it differs from security frameworks, and what changed in COBIT 7.',
      tasks: [
        {
          title: 'What COBIT is',
          control: 'An ISACA framework for governing and managing enterprise information and technology, so that I&T creates value, manages risk and uses resources well. It covers all of IT, not only security, and separates governance (the board sets direction and monitors) from management (executives plan, build, run and monitor).',
          how: 'Position COBIT as the umbrella over IT governance, with ISO 27001, NIST CSF and ITIL for detail in their own areas.',
          check: 'One-page explanation of how COBIT fits with your other frameworks.'
        },
        {
          title: 'Domains and objectives',
          control: 'COBIT has five domains and 40 governance and management objectives. In COBIT 2019 the domains are EDM (Evaluate, Direct and Monitor), APO (Align, Plan and Organise), BAI (Build, Acquire and Implement), DSS (Deliver, Service and Support) and MEA (Monitor, Evaluate and Assess).',
          how: 'List the objectives most relevant to you, for example EDM03 ensured risk optimisation, APO12 managed risk, APO13 managed security, BAI06 managed IT changes, DSS05 managed security services and MEA03 managed compliance with external requirements (COBIT 2019 naming).',
          check: 'Shortlist of objectives in scope with owners.'
        },
        {
          title: 'What changed in COBIT 7',
          control: 'ISACA released COBIT 7 in late 2026. Changes include expanded process activities, organisational structures shown by role, a three-step design workflow (previously four), two new design factors (organisational health context and information and data management strategies), AI risk scenarios and AI-aware implementation guidance, and a new assessment module at three levels (board, high-level and detailed).',
          how: 'If you used COBIT 2019, plan a transition: re-run the design tool, update objective mappings and refresh assessments. Basic access to COBIT 7 is free from ISACA; premium access adds the design tool and assessments.',
          check: 'Transition note listing what you will update and when.'
        }
      ]
    },
    {
      week: 2,
      title: 'Design your governance system',
      days: 'Days 11-20',
      description: 'Tailor COBIT to your organisation instead of adopting all 40 objectives equally.',
      tasks: [
        {
          title: 'Apply the design factors',
          control: 'Design factors such as enterprise strategy, goals, risk profile, IT-related issues, threat landscape, compliance requirements, role of IT, sourcing model, implementation methods and size shape which objectives matter most.',
          how: 'Score each design factor with leadership, then use the design guide or tool to get a priority and target level for each objective.',
          check: 'Completed design factor scoring and prioritised objectives.'
        },
        {
          title: 'Use the goals cascade',
          control: 'Stakeholder needs cascade into enterprise goals, then alignment goals, then the objectives that support them.',
          how: 'Link each priority objective to an enterprise goal so every IT investment and control has a business reason.',
          check: 'Goals cascade showing the link from enterprise goals to objectives.'
        },
        {
          title: 'Define the components',
          control: 'Each objective is delivered through components such as processes, organisational structures, policies, information, culture and behaviour, people and skills, and services and infrastructure.',
          how: 'For each priority objective, name the process owner, the committee or role accountable, the policy, the information it needs and the tools.',
          check: 'Component sheet per priority objective.'
        }
      ]
    },
    {
      week: 3,
      title: 'Assess and improve',
      days: 'Days 21-30',
      description: 'Measure capability and drive improvement.',
      tasks: [
        {
          title: 'Assess capability and performance',
          control: 'COBIT measures process capability on a 0 to 5 scale and uses a performance management approach to compare current and target levels.',
          how: 'Assess priority objectives, record evidence for each rating, and compare against the target levels from the design step.',
          check: 'Assessment report with current versus target levels.'
        },
        {
          title: 'Build the improvement roadmap',
          control: 'COBIT implementation follows a continuous improvement lifecycle: understand drivers, assess current state, define target, build and implement improvements, check results and keep going.',
          how: 'Turn the largest gaps into a funded roadmap, report to the board or IT steering committee, and reassess yearly.',
          check: 'Approved roadmap and steering committee minutes.'
        },
        {
          title: 'Use COBIT in audit',
          control: 'IT auditors use COBIT objectives as criteria for IT governance and ITGC reviews, and it is common in SOX ITGC programmes.',
          how: 'Map ITGC areas (access, change, operations, development) to COBIT objectives such as DSS05, BAI06, DSS01 and BAI03 (COBIT 2019 naming) so audit results feed governance reporting.',
          check: 'ITGC to COBIT mapping in the audit programme.'
        }
      ]
    }
  ],
  milestones: [
    { day: 10, label: 'Objectives in scope', color: 'blue' },
    { day: 20, label: 'Governance system designed', color: 'purple' },
    { day: 30, label: 'Assessment and roadmap', color: 'green' }
  ],
  referenceUrl: 'https://www.isaca.org/cobit'
};

export default function Cobit() {
  return <LearningFrameworkPage framework={FRAMEWORK} />;
}

export { FRAMEWORK };
