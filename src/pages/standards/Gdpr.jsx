import { Link } from 'react-router-dom';

export default function Gdpr() {
  const FRAMEWORK = {
    id: 'gdpr',
    name: 'GDPR (EU 2016/679)',
    shortName: 'GDPR',
    color: 'blue',
    weeks: [
      {
        week: 1,
        title: 'Scope, Principles & Data Mapping',
        color: 'blue',
        days: 'Days 1-7',
        description: 'Understand GDPR scope, principles, and map personal data',
        tasks: [
          'Complete Learning Module 1: GDPR Fundamentals & Scope',
          'Determine applicability: Controller vs Processor, territorial scope',
          'Map all personal data flows: collection → storage → processing → deletion',
          'Identify lawful basis for each processing activity (Art. 6)',
          'Classify data: personal, special category (Art. 9), children (Art. 8)',
          'Document retention schedules and automated decision-making (Art. 22)',
          'Identify international transfers and transfer mechanisms'
        ]
      },
      {
        week: 2,
        title: 'Data Subject Rights & Lawful Basis',
        color: 'blue',
        days: 'Days 8-14',
        description: 'Implement data subject rights and validate lawful basis',
        tasks: [
          'Complete Learning Module 2: Data Subject Rights & Lawful Basis',
          'Validate lawful basis for each processing activity (Art. 6/9)',
          'Implement consent management: granular, informed, withdrawable',
          'Build DSAR portal: access (Art. 15), rectification (16), erasure (17)',
          'Implement restriction (18), portability (20), objection (21)',
          'Design automated decision-making safeguards (Art. 22)',
          'Create Records of Processing Activities (ROPA) per Art. 30'
        ]
      },
      {
        week: 3,
        title: 'DPIA, DPO, Security & Breach',
        color: 'green',
        days: 'Days 15-28',
        description: 'DPIAs, DPO appointment, security measures, breach notification',
        tasks: [
          'Complete Learning Module 3: DPIA, DPO & Security',
          'Conduct DPIAs for high-risk processing (Art. 35) with DPO consultation',
          'Appoint DPO if required (Art. 37): public authority, large scale, special data',
          'Implement technical/organizational measures (Art. 32): encryption, pseudonymization',
          'Implement data protection by design (Art. 25) and by default',
          'Establish breach detection, assessment, and 72-hour notification (Art. 33/34)',
          'Implement processor contracts with Art. 28 clauses'
        ]
      },
      {
        week: 4,
        title: 'International Transfers, Accountability & Ongoing',
        color: 'orange',
        days: 'Days 22-30+',
        description: 'International transfers, accountability, and ongoing compliance',
        tasks: [
          'Complete Learning Module 4: Transfers, Accountability & Ongoing',
          'International transfers: adequacy, SCCs, BCRs, derogations (Art. 44-49)',
          'Maintain accountability: documentation, policies, training, audits',
          'Implement data protection by design (Art. 25) and by default',
          'Supervisory authority cooperation: lead SA, one-stop-shop (Art. 56)',
          'Codes of conduct (Art. 40) and certification mechanisms (Art. 42)',
          'Ongoing: periodic DPIAs, training, policy updates, EDPB guidelines'
        ]
      }
    ],
    milestones: [
      { day: 30, label: 'Rights & Lawful Basis Operational', color: 'blue' },
      { day: 45, label: 'DPIA, DPO & Security Operational', color: 'green' },
      { day: 60, label: 'Transfers & Accountability Mature', color: 'orange' }
    ],
    excelUrl: '/checklists/GDPR_Checklist.xlsx',
    referenceUrl: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32016R0679'
  };

  return (
    <LearningFrameworkPage framework={FRAMEWORK} />
  );
}
