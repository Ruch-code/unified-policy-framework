import LearningFrameworkPage from "../../components/LearningFrameworkPage.jsx";

// ISF Standard of Good Practice for Information Security (SoGP), Information Security Forum.
// 2024 edition is the latest public edition; a 2026 refresh is being released to ISF members first.
// The Standard is free to ISF members and sold to non-members, so this page summarises how to use it rather than reproducing it.
const FRAMEWORK = {
  id: 'isf-sogp',
  name: 'ISF Standard of Good Practice for Information Security (SoGP)',
  shortName: 'ISF SoGP',
  region: 'Global',
  flag: '',
  basePath: '/isf-sogp',
  color: 'beige',
  weeks: [
    {
      week: 1,
      title: 'Understand the Standard and set scope',
      days: 'Days 1-10',
      description: 'Learn how the SoGP is built and decide how you will use it alongside ISO 27001 and NIST CSF.',
      tasks: [
        {
          title: 'What the SoGP is',
          control: 'A comprehensive, business-focused catalogue of information security good practice, maintained by the Information Security Forum (ISF) from its members\' experience. The 2024 edition is the latest public edition; a 2026 refresh is rolling out to members first. It is free to ISF members and can be bought by non-members.',
          how: 'Get access through your organisation\'s ISF membership or buy a copy. Read the introduction on structure and how specifications are numbered.',
          check: 'Licensed copy available to the security team; edition recorded.'
        },
        {
          title: 'How it is structured',
          control: 'The Standard has historically been organised into broad aspects (security management, critical business applications, computer installations, networks, systems development and the end user environment), split into areas and sections with numbered specifications. Recent editions are published in a modular format.',
          how: 'Map the areas to your own environment and pick the ones in scope. Note that the SoGP is good practice, not a certifiable standard.',
          check: 'Scope statement listing areas in scope and out of scope with reasons.'
        },
        {
          title: 'How it relates to other frameworks',
          control: 'The SoGP aligns with ISO/IEC 27001 and covers ISO/IEC 27002 control topics in more depth, and the ISF publishes alignment to NIST CSF, PCI DSS and other standards and laws.',
          how: 'Use ISO 27001 for the certifiable management system, NIST CSF for outcomes and board reporting, and the SoGP for detailed "how to" practice. Map them once in your control library.',
          check: 'Control library with SoGP references next to ISO 27001 and CSF references.'
        }
      ]
    },
    {
      week: 2,
      title: 'Assess against the Standard',
      days: 'Days 11-20',
      description: 'Benchmark current practice and find gaps.',
      tasks: [
        {
          title: 'Run a gap assessment',
          control: 'Compare current practice to the SoGP specifications in scope and rate each one.',
          how: 'Interview control owners, review evidence, and rate each specification (for example not in place, partial, in place). ISF members can use ISF benchmarking and assessment tools.',
          check: 'Completed assessment with ratings and evidence references.'
        },
        {
          title: 'Prioritise by business risk',
          control: 'Not every specification matters equally for every organisation.',
          how: 'Use your risk assessment and critical business applications to rank gaps; focus first on gaps that affect critical services or regulated data.',
          check: 'Prioritised gap list with owners.'
        }
      ]
    },
    {
      week: 3,
      title: 'Improve and keep current',
      days: 'Days 21-30',
      description: 'Turn gaps into a plan and keep alignment as the Standard is updated.',
      tasks: [
        {
          title: 'Build the improvement plan',
          control: 'Gaps become funded actions with owners and dates.',
          how: 'Group actions into a roadmap, link each to policies and controls, and report progress to the security steering group.',
          check: 'Approved roadmap and progress reports.'
        },
        {
          title: 'Use it for policies and standards',
          control: 'The SoGP is designed to inform security policies, standards and procedures and to supplement other control frameworks.',
          how: 'Use SoGP topics as a checklist when writing or reviewing policies and technical standards, paraphrasing rather than copying the licensed text.',
          check: 'Policy review records showing SoGP was considered.'
        },
        {
          title: 'Track new editions',
          control: 'The ISF updates the Standard regularly, now including incremental updates between major editions.',
          how: 'Assign an owner to review each new edition and update mappings, especially for new topics such as AI, cyber resilience and Zero Trust.',
          check: 'Mapping update log by edition.'
        }
      ]
    }
  ],
  milestones: [
    { day: 10, label: 'Scope and mappings', color: 'blue' },
    { day: 20, label: 'Gap assessment', color: 'purple' },
    { day: 30, label: 'Improvement roadmap', color: 'green' }
  ],
  referenceUrl: 'https://www.securityforum.org/'
};

export default function IsfSogp() {
  return <LearningFrameworkPage framework={FRAMEWORK} />;
}

export { FRAMEWORK };
