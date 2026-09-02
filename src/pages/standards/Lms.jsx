import { Link } from 'react-router-dom';
import LearningFrameworkPage from "../../components/LearningFrameworkPage";

export default function Lms() {
  const FRAMEWORK = {
    id: 'lms',
    name: 'Compliance Training LMS',
    shortName: 'LMS',
    color: 'purple',
    weeks: [
      {
        week: 1,
        title: 'LMS Selection & Framework Mapping',
        color: 'purple',
        days: 'Days 1-7',
        description: 'Select LMS and map frameworks to training curricula',
        tasks: [
          'Complete Learning Module 1: LMS Selection & Strategy',
          'Evaluate LMS: TalentLMS, Docebo, Moodle, Cornerstone, SAP SuccessFactors',
          'Map frameworks to required training: ISO, SOC2, PCI, HIPAA, GDPR, etc.',
          'Define role-based training matrix: all-staff, privileged, developers, execs',
          'Define learning paths: onboarding, annual refresher, role-specific, advanced',
          'Evaluate features: SCORM/xAPI, mobile, assessments, certificates, reporting',
          'Pilot with 5-10 users across roles before full rollout'
        ]
      },
      {
        week: 2,
        title: 'Content Development & Course Creation',
        color: 'purple',
        days: 'Days 8-21',
        description: 'Create and upload compliance training content',
        tasks: [
          'Complete Learning Module 2: Content Development & Course Creation',
          'Source or create content: ISO 27001, SOC 2, PCI, HIPAA, GDPR, NIST',
          'Build courses: SCORM packages, videos, quizzes, case studies, simulations',
          'Create assessments: pre/post tests, scenario-based, practical exercises',
          'Set passing thresholds: 80% for compliance, 90% for privileged roles',
          'Create certificates: auto-issue, expiry dates, re-certification triggers',
          'Localization: translate for global workforce if needed'
        ]
      },
      {
        week: 3,
        title: 'Deployment, Assignment & Tracking',
        color: 'green',
        days: 'Days 22-35',
        description: 'Deploy LMS, assign training, and track completion',
        tasks: [
          'Complete Learning Module 3: Deployment & Tracking',
          'Integrate with HRIS/AD for auto-provisioning and deprovisioning',
          'Assign mandatory training: onboarding (Day 1), annual (anniversary)',
          'Configure automated reminders: 30/14/7/1 day before due, overdue escalation',
          'Set up manager dashboards: team completion, overdue alerts, reporting',
          'Configure SSO (SAML/OIDC) and mobile app access',
          'Run pilot with 10% of workforce, gather feedback, iterate'
        ]
      },
      {
        week: 4,
        title: 'Reporting, Audit Readiness & Continuous Improvement',
        color: 'orange',
        days: 'Days 35-45+',
        description: 'Audit-ready reporting, analytics, and continuous improvement',
        tasks: [
          'Complete Learning Module 4: Analytics, Audit & Improvement',
          'Build audit-ready reports: completion rates, scores, certificates, overdue',
          'Export evidence packages for auditors: completion logs, certificates, scores',
          'Configure automated compliance dashboards for leadership/board',
          'Integrate with GRC tools: AuditBoard, LogicGate, OneTrust, ServiceNow',
          'Analyze learning analytics: knowledge gaps, engagement, effectiveness',
          'Continuous improvement: content updates, new frameworks, feedback loops'
        ]
      }
    ],
    milestones: [
      { day: 21, label: 'Content Library Built', color: 'purple' },
      { day: 35, label: 'Full Deployment & Tracking', color: 'green' },
      { day: 45, label: 'Audit-Ready Reporting', color: 'orange' }
    ],
    excelUrl: '/checklists/LMS_Compliance_Training_Checklist.xlsx',
    referenceUrl: 'https://www.talentlms.com/compliance-training'
  };

  return (
    <LearningFrameworkPage framework={FRAMEWORK} />
  );
}
