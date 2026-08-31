import { Link } from 'react-router-dom';

export default function Soc2() {
  const FRAMEWORK = {
    id: 'soc2',
    name: 'SOC 2 Type 2',
    shortName: 'SOC 2',
    color: 'teal',
    weeks: [
      {
        week: 1,
        title: 'Readiness & Scope Definition',
        color: 'teal',
        days: 'Days 1-7',
        description: 'Define scope, select TSC, and perform readiness assessment',
        tasks: [
          'Complete Learning Module 1: SOC 2 Fundamentals & Scoping',
          'Select applicable TSC: Security (mandatory) + Availability/Confidentiality/PI/Privacy',
          'Define system boundary: services, data, infrastructure, people, processes',
          'Identify subservice organizations and their roles',
          'Perform readiness assessment: gap analysis against TSC',
          'Engage CPA firm for readiness assessment or formal audit',
          'Define audit period (typically 6-12 months for Type 2)'
        ]
      },
      {
        week: 2,
        title: 'Control Design & Implementation (CC1-CC9)',
        color: 'teal',
        days: 'Days 8-21',
        description: 'Design and implement Common Criteria controls (CC1-CC9)',
        tasks: [
          'CC1: Control Environment - governance, org structure, competence',
          'CC2: Communication & Information - policies, commitments, roles',
          'CC3: Risk Assessment - risk identification, analysis, mitigation',
          'CC4: Monitoring Activities - ongoing eval, separate evaluations',
          'CC5: Control Activities - selection, development, technology controls',
          'CC6: Logical/Physical Access - auth, authorization, encryption',
          'CC7: System Operations - vulnerability mgmt, incident response',
          'CC8: Change Management - SDLC, testing, deployment, authorization',
          'CC9: Risk Mitigation - business continuity, vendor mgmt'
        ]
      },
      {
        week: 3,
        title: 'Additional TSC & Evidence Collection',
        color: 'green',
        days: 'Days 22-42',
        description: 'Implement additional TSC criteria and gather evidence',
        tasks: [
          'Availability (A1): capacity planning, environmental protections, DR/BCP',
          'Confidentiality (C1): data classification, handling, disposal, NDAs',
          'Processing Integrity (PI1): completeness, accuracy, timeliness, authorization',
          'Privacy (P1-P8): notice, choice, collection, use, access, disclosure, quality',
          'Collect evidence: policies, procedures, logs, configs, tickets, reports',
          'Automate evidence collection where possible (scripts, API integrations)',
          'Create evidence matrix mapping controls to evidence artifacts'
        ]
      },
      {
        week: 4,
        title: 'Audit Execution & Report',
        color: 'orange',
        days: 'Days 43-60+',
        description: 'CPA audit execution, findings remediation, and report issuance',
        tasks: [
          'Engage CPA firm for SOC 2 Type 2 audit',
          'Provide evidence package and management assertion',
          'Facilitate CPA testing: inquiry, observation, inspection, re-performance',
          'Remediate exceptions/deficiencies during fieldwork',
          'Review draft SOC 2 report and management representation letter',
          'Obtain final SOC 2 Type 2 report with auditor opinion',
          'Distribute report to stakeholders under NDA'
        ]
      }
    ],
    milestones: [
      { day: 30, label: 'Controls Designed & Implemented', color: 'teal' },
      { day: 45, label: 'Evidence Package Ready', color: 'green' },
      { day: 60, label: 'Audit Complete / Report Issued', color: 'orange' }
    ],
    excelUrl: '/checklists/SOC2_Type2_Checklist.xlsx',
    referenceUrl: 'https://www.aicpa.org/interestareas/frc/assuranceadvisoryservices/soc.html'
  };

  return (
    <LearningFrameworkPage framework={FRAMEWORK} />
  );
}
