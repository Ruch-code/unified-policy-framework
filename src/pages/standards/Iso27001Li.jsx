import { Link } from 'react-router-dom';
import LearningFrameworkPage from "../../components/LearningFrameworkPage";

export default function Iso27001Li() {
  const FRAMEWORK = {
    id: 'iso27001-li',
    name: 'ISO/IEC 27001:2022 Lead Implementer (LI)',
    shortName: 'ISO 27001 LI',
    color: 'indigo',
    weeks: [
      {
        week: 1,
        title: 'Foundation & Standard Understanding',
        color: 'indigo',
        days: 'Days 1-7',
        description: 'Understand ISO 27001 requirements and implementation approach',
        tasks: [
          'Read ISO 27001:2022 Clauses 4-10 and Annex A controls',
          'Understand PDCA cycle and ISMS implementation methodology',
          'Complete Learning Module 1: ISO 27001 Implementation Fundamentals',
          'Study ISO 27001:2013 vs 2022 changes (Annex SL, risk-based thinking)',
          'Understand ISMS scope definition and organizational context',
          'Identify stakeholders and their information security requirements'
        ]
      },
      {
        week: 2,
        title: 'Risk Assessment & Treatment',
        color: 'purple',
        days: 'Days 8-14',
        description: 'Master risk assessment methodology and treatment planning',
        tasks: [
          'Complete Learning Module 2: Risk Assessment & Treatment',
          'Learn to establish risk assessment methodology and criteria',
          'Practice asset identification, valuation, and risk assessment',
          'Learn to select and justify risk treatment options',
          'Create Statement of Applicability (SoA) with justifications',
          'Define risk acceptance criteria and residual risk acceptance'
        ]
      },
      {
        week: 3,
        title: 'ISMS Implementation & Documentation',
        color: 'green',
        days: 'Days 15-21',
        description: 'Implement controls, policies, and processes',
        tasks: [
          'Complete Learning Module 3: ISMS Implementation',
          'Develop Information Security Policy and objectives',
          'Implement Annex A controls with procedures and work instructions',
          'Create document control system and record management',
          'Establish training, awareness, and competence programs',
          'Define measurement, monitoring, and metrics (KPIs/KRIs)'
        ]
      },
      {
        week: 4,
        title: 'Internal Audit, Review & Certification',
        color: 'orange',
        days: 'Days 22-30+',
        description: 'Internal audit, management review, and certification prep',
        tasks: [
          'Complete Learning Module 4: Internal Audit & Certification Prep',
          'Plan and conduct internal audit of ISMS',
          'Prepare for and conduct management review meeting',
          'Address non-conformities and implement corrective actions',
          'Prepare for Stage 1 and Stage 2 certification audits',
          'Understand surveillance audits and continual improvement'
        ]
      }
    ],
    milestones: [
      { day: 30, label: 'ISMS Implemented', color: 'indigo' },
      { day: 35, label: 'Internal Audit Done', color: 'purple' },
      { day: 45, label: 'Certification Ready', color: 'green' }
    ],
    excelUrl: '/checklists/ISO27001_LI_Checklist.xlsx',
    referenceUrl: 'https://www.iso.org/standard/27001'
  };

  return (
    <LearningFrameworkPage framework={FRAMEWORK} />
  );
}
