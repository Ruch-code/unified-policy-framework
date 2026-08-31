import { Link } from 'react-router-dom';

export default function CippeEu() {
  const FRAMEWORK = {
    id: 'cippe-eu',
    name: 'CIPPE/EU - NIS2 Directive (EU)',
    shortName: 'CIPPE/EU',
    color: 'blue',
    weeks: [
      {
        week: 1,
        title: 'Scope Determination & Registration',
        color: 'blue',
        days: 'Days 1-14',
        description: 'Determine if entity is Essential/Important and register',
        tasks: [
          'Complete Learning Module 1: NIS2 Overview & Scope Determination',
          'Classify entity: Essential (Energy, Transport, Health, etc.) or Important',
          'Identify digital services: cloud, search, marketplace, social networking',
          'Register with Competent Authority (CA) and/or CSIRT per Art. 7',
          'Appoint cybersecurity officer/contact point per Member State law',
          'Map supply chain: ICT service providers, managed services, cloud',
          'Document entity size, sector, cross-border dependencies'
        ]
      },
      {
        week: 2,
        title: 'Risk Management & Baseline Measures',
        color: 'blue',
        days: 'Days 15-30',
        description: 'Implement risk management and baseline cybersecurity measures',
        tasks: [
          'Complete Learning Module 2: Risk Management & Baseline Measures',
          'Implement risk management per Art. 21: governance, assessment, treatment',
          'Baseline measures (Art. 21): policies, incident handling, supply chain',
          'Access control: identity mgmt, MFA, privileged access, segmentation',
          'Awareness & training: all staff, role-specific, regular updates',
          'Asset management: inventory, classification, lifecycle, disposal',
          'Physical & environmental security: facilities, equipment, media',
          'Encryption: data at rest, in transit, key management'
        ]
      },
      {
        week: 3,
        title: 'Incident Response, Reporting & Supply Chain',
        color: 'green',
        days: 'Days 30-45',
        description: 'Incident handling, 24h reporting, and supply chain security',
        tasks: [
          'Complete Learning Module 3: Incident Response & Supply Chain',
          'Incident handling: detection, analysis, containment, recovery, lessons',
          '24h early warning to CSIRT/CA (Art. 23), 72h full notification',
          'Supply chain security: ICT provider due diligence, contract clauses',
          'Vulnerability handling: coordinated disclosure, patch management',
          'Business continuity: backup, DR, crisis management, crisis comms',
          'Crisis management: escalation, stakeholder comms, regulatory liaison'
        ]
      },
      {
        week: 4,
        title: 'Audit, Supervision & Continuous Improvement',
        color: 'orange',
        days: 'Days 45-60+',
        description: 'Audits, supervision cooperation, and continuous improvement',
        tasks: [
          'Complete Learning Module 4: Audit, Supervision & Maturity',
          'Prepare for audits: by CA, CSIRT, or qualified auditors (Art. 26)',
          'Cooperate with supervision: info requests, on-site inspections, binding instructions',
          'Implement corrective actions from audits with timelines',
          'Participate in peer reviews, ENISA exercises, EU Cyber Crisis exercises',
          'Maturity assessment: NIS2 maturity model, ENISA self-assessment tools',
          'Board reporting: cyber risk posture, investment, NIS2 compliance status'
        ]
      }
    ],
    milestones: [
      { day: 30, label: 'Registration & Baseline Done', color: 'blue' },
      { day: 60, label: 'IR & Supply Chain Operational', color: 'green' },
      { day: 90, label: 'Audit Ready & Maturing', color: 'orange' }
    ],
    excelUrl: '/checklists/NIS2_Checklist.xlsx',
    referenceUrl: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32022L2555'
  };

  return (
    <LearningFrameworkPage framework={FRAMEWORK} />
  );
}
