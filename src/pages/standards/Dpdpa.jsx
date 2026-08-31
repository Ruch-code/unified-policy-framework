import { Link } from 'react-router-dom';

export default function Dpdpa() {
  const FRAMEWORK = {
    id: 'dpdpa',
    name: 'DPDPA 2023 (India)',
    shortName: 'DPDPA',
    color: 'orange',
    weeks: [
      {
        week: 1,
        title: 'Scope, Principles & Data Mapping',
        color: 'orange',
        days: 'Days 1-7',
        description: 'Understand DPDPA scope, principles, and map data flows',
        tasks: [
          'Complete Learning Module 1: DPDPA 2023 Overview',
          'Determine applicability: Data Fiduciary vs Data Processor',
          'Map all digital personal data flows (collection to disposal)',
          'Identify lawful basis for each processing activity',
          'Classify data: personal, sensitive, children\'s data',
          'Document data retention schedules and disposal procedures',
          'Identify cross-border data transfers and mechanisms'
        ]
      },
      {
        week: 2,
        title: 'Consent, Rights & Notice',
        color: 'orange',
        days: 'Days 8-14',
        description: 'Implement consent management and data principal rights',
        tasks: [
          'Complete Learning Module 2: Consent & Rights Framework',
          'Design consent mechanisms: free, informed, specific, unconditional',
          'Implement consent withdrawal mechanism (as easy as giving)',
          'Create clear privacy notices in plain language',
          'Implement Data Principal rights processes: access, correction, erasure',
          'Build grievance redressal mechanism with timelines',
          'Design consent records management and audit trail'
        ]
      },
      {
        week: 3,
        title: 'Security, Breach & DPO',
        color: 'green',
        days: 'Days 15-21',
        description: 'Implement security safeguards, breach notification, and DPO',
        tasks: [
          'Complete Learning Module 3: Security & Breach Management',
          'Implement reasonable security safeguards (technical & organizational)',
          'Design data breach detection and assessment process',
          'Implement 72-hour breach notification to DPB and affected persons',
          'Appoint Data Protection Officer (DPO) if required',
          'Conduct Data Protection Impact Assessments (DPIAs) for high-risk processing',
          'Implement data protection by design and by default'
        ]
      },
      {
        week: 4,
        title: 'Children\'s Data, Cross-border & Ongoing Compliance',
        color: 'orange',
        days: 'Days 22-30+',
        description: 'Special provisions, cross-border transfers, and ongoing compliance',
        tasks: [
          'Complete Learning Module 4: Special Provisions & Ongoing Compliance',
          'Children\'s data: verifiable parental consent, age gating, no profiling',
          'Cross-border transfers: adequacy, SCCs, or exemptions',
          'Significant Data Fiduciary obligations (if applicable): DPIA, auditor, DPO',
          'Implement data principal request portal and SLA tracking',
          'Vendor management: Data Processor contracts with DP clauses',
          'Ongoing: periodic audits, training, policy updates, DPB guidelines'
        ]
      }
    ],
    milestones: [
      { day: 30, label: 'Consent & Rights Operational', color: 'orange' },
      { day: 45, label: 'Security & DPO Operational', color: 'green' },
      { day: 60, label: 'Full Compliance Program Active', color: 'red' }
    ],
    excelUrl: '/checklists/DPDPA_Checklist.xlsx',
    referenceUrl: 'https://www.meity.gov.in'
  };

  return (
    <LearningFrameworkPage framework={FRAMEWORK} />
  );
}
