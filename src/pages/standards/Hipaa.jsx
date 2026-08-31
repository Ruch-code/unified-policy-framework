import { Link } from 'react-router-dom';

export default function Hipaa() {
  const FRAMEWORK = {
    id: 'hipaa',
    name: 'HIPAA Compliance',
    shortName: 'HIPAA',
    color: 'indigo',
    weeks: [
      {
        week: 1,
        title: 'Scope, Roles & Risk Analysis',
        color: 'indigo',
        days: 'Days 1-7',
        description: 'Define scope, assign roles, and conduct risk analysis',
        tasks: [
          'Complete Learning Module 1: HIPAA Fundamentals & Applicability',
          'Determine Covered Entity vs Business Associate status',
          'Assign Privacy Officer and Security Officer (required)',
          'Identify all PHI/ePHI systems, flows, and repositories',
          'Conduct comprehensive risk analysis (§164.308(a)(1))',
          'Document risk analysis methodology, findings, and risk ratings',
          'Identify and document all Business Associates and BAAs needed'
        ]
      },
      {
        week: 2,
        title: 'Privacy Rule Implementation',
        color: 'purple',
        days: 'Days 8-14',
        description: 'Implement Privacy Rule requirements and patient rights',
        tasks: [
          'Complete Learning Module 2: Privacy Rule Implementation',
          'Develop Notice of Privacy Practices (NPP) and distribution process',
          'Implement patient rights: access, amendment, accounting, restrictions',
          'Develop minimum necessary policies and workforce training',
          'Implement uses/disclosures policies: TPO, authorization, required by law',
          'Establish complaint process and breach notification procedures',
          'Review and update Business Associate Agreements (BAAs)'
        ]
      },
      {
        week: 3,
        title: 'Security Rule: Administrative & Physical Safeguards',
        color: 'green',
        days: 'Days 15-28',
        description: 'Implement administrative and physical safeguards',
        tasks: [
          'Complete Learning Module 3: Security Rule - Admin & Physical',
          'Administrative (§164.308): policies, workforce security, access mgmt',
          '  - Security awareness training, sanction policy, termination procedures',
          '  - Information access management, security incident procedures',
          'Physical (§164.310): facility access, workstation/device security',
          '  - Facility access controls, workstation use, device/media controls',
          'Develop contingency plan: data backup, DR, emergency mode operations',
          'Implement evaluation process: periodic technical/non-technical eval'
        ]
      },
      {
        week: 4,
        title: 'Technical Safeguards, Breach Response & Ongoing Compliance',
        color: 'orange',
        days: 'Days 22-30+',
        description: 'Technical safeguards, breach response, and ongoing compliance',
        tasks: [
          'Complete Learning Module 4: Technical Safeguards & Breach Response',
          'Technical Safeguards (§164.312): access control, audit controls, integrity',
          '  - Unique user ID, emergency access, auto logoff, encryption/decryption',
          '  - Audit controls: audit logs, review process, log integrity',
          '  - Integrity: PHI integrity mechanisms, encryption at rest/transit',
          '  - Person/entity authentication, transmission security (TLS, VPN)',
          'Breach Notification: risk assessment, 60-day notification, media notice',
          'Ongoing: periodic risk analysis, training, policy updates, BAAs review'
        ]
      }
    ],
    milestones: [
      { day: 30, label: 'Policies & Safeguards Implemented', color: 'indigo' },
      { day: 45, label: 'Risk Analysis Complete', color: 'purple' },
      { day: 60, label: 'Ongoing Compliance Program Active', color: 'green' }
    ],
    excelUrl: '/checklists/HIPAA_Checklist.xlsx',
    referenceUrl: 'https://www.hhs.gov/hipaa'
  };

  return (
    <LearningFrameworkPage framework={FRAMEWORK} />
  );
}
