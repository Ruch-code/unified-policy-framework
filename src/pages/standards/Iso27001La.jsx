import { Link } from 'react-router-dom';

export default function Iso27001La() {
  const FRAMEWORK = {
    id: 'iso27001-la',
    name: 'ISO/IEC 27001:2022 Lead Auditor (LA)',
    shortName: 'ISO 27001 LA',
    color: 'blue',
    weeks: [
      {
        week: 1,
        title: 'Foundation & Standard Understanding',
        color: 'blue',
        days: 'Days 1-7',
        description: 'Understand the standard structure and audit principles',
        tasks: [
          'Read ISO 27001:2022 Clauses 4-10 and Annex A controls',
          'Understand ISO 19011 audit principles and ISO 17021 requirements',
          'Complete Learning Module 1: ISO 27001 Fundamentals',
          'Review ISO 27001:2013 vs 2022 changes (Annex SL, risk-based thinking)',
          'Study audit terminology: criteria, evidence, findings, non-conformities',
          'Identify audit types: internal, external, surveillance, recertification'
        ]
      },
      {
        week: 2,
        title: 'Audit Planning & Preparation',
        color: 'purple',
        days: 'Days 8-14',
        description: 'Master audit planning and preparation techniques',
        tasks: [
          'Complete Learning Module 2: Audit Planning & Preparation',
          'Learn to define audit scope, criteria, and objectives',
          'Practice creating audit plans and checklists',
          'Study document review techniques (Stage 1 audit)',
          'Learn risk-based audit approach and sampling methods',
          'Practice writing audit plans and communicating with auditees'
        ]
      },
      {
        week: 3,
        title: 'Conducting the Audit (On-site)',
        color: 'green',
        days: 'Days 15-21',
        description: 'Master on-site audit execution and evidence gathering',
        tasks: [
          'Complete Learning Module 3: On-site Audit Execution',
          'Practice opening and closing meetings',
          'Master interviewing techniques and evidence collection',
          'Practice writing audit findings (non-conformities, OFIs, positives)',
          'Learn to evaluate audit evidence against criteria',
          'Practice daily team meetings and audit log maintenance'
        ]
      },
      {
        week: 4,
        title: 'Reporting, Follow-up & Certification',
        color: 'orange',
        days: 'Days 22-30+',
        description: 'Reporting, corrective action, and certification process',
        tasks: [
          'Complete Learning Module 4: Reporting & Certification',
          'Practice writing audit reports (executive summary, findings, conclusion)',
          'Learn to evaluate corrective action plans (root cause, corrective action)',
          'Understand certification decision process and surveillance audits',
          'Practice writing non-conformity reports with root cause analysis',
          'Understand IRCA/PECB exam requirements and application process'
        ]
      }
    ],
    milestones: [
      { day: 30, label: 'Ready for Mock Audit', color: 'blue' },
      { day: 35, label: 'Mock Audit Complete', color: 'purple' },
      { day: 45, label: 'Exam Ready / Apply', color: 'green' }
    ],
    excelUrl: '/checklists/ISO27001_LA_Checklist.xlsx',
    referenceUrl: 'https://www.iso.org/standard/27001'
  };

  return (
    <LearningFrameworkPage framework={FRAMEWORK} />
  );
}
