import { Link } from 'react-router-dom';

export default function CippeUs() {
  const FRAMEWORK = {
    id: 'cippe-us',
    name: 'CIPPE/US - Critical Infrastructure Protection (US)',
    shortName: 'CIPPE/US',
    color: 'blue',
    weeks: [
      {
        week: 1,
        title: 'Sector Identification & Risk Assessment',
        color: 'blue',
        days: 'Days 1-14',
        description: 'Identify critical infrastructure sector and assess risks',
        tasks: [
          'Complete Learning Module 1: CIPPE/US Overview & Sector Identification',
          'Identify applicable critical infrastructure sector (Energy, Water, Transport, etc.)',
          'Map all critical assets, systems, and interdependencies',
          'Conduct sector-specific risk assessment per NIST 800-53/82',
          'Identify threats: cyber, physical, natural, insider, supply chain',
          'Document risk assessment methodology and risk register',
          'Prioritize critical assets based on consequence of failure'
        ]
      },
      {
        week: 2,
        title: 'Protective Measures & Cyber Hygiene',
        color: 'blue',
        days: 'Days 15-30',
        description: 'Implement protective measures per NIST CSF and sector guidance',
        tasks: [
          'Complete Learning Module 2: Protective Measures & Cyber Hygiene',
          'Implement access control: least privilege, MFA, privileged access mgmt',
          'Network segmentation: IT/OT separation, DMZs, unidirectional gateways',
          'Deploy intrusion detection: IT (IDS/IPS) and OT (anomaly detection)',
          'Implement vulnerability management: scanning, patching, compensation',
          'Secure remote access: VPN, jump hosts, privileged access workstations',
          'Supply chain risk management: vendor assessment, SBOM, SLAs'
        ]
      },
      {
        week: 3,
        title: 'Detection, Response & Resilience',
        color: 'green',
        days: 'Days 30-45',
        description: 'Detection capabilities, incident response, and resilience',
        tasks: [
          'Complete Learning Module 3: Detection, Response & Resilience',
          'Deploy OT monitoring: historians, PLC integrity, protocol analysis',
          'Establish SOC or integrate with enterprise SOC for OT visibility',
          'Develop sector-specific IR plan: playbooks for ransomware, sabotage',
          'Conduct tabletop exercises with IT, OT, legal, comms, leadership',
          'Implement backup and recovery: offline backups, restore testing, RTO/RPO',
          'Coordinate with CISA: ISAC/ISAO participation, threat intel sharing'
        ]
      },
      {
        week: 4,
        title: 'Compliance, Reporting & Continuous Improvement',
        color: 'orange',
        days: 'Days 45-60+',
        description: 'Compliance reporting, metrics, and continuous improvement',
        tasks: [
          'Complete Learning Module 4: Compliance, Reporting & Maturity',
          'Sector-specific reporting: DOE OE-417, TSA pipeline, EPA, etc.',
          'Metrics program: MTTD, MTTR, vulnerability age, patch compliance',
          'Annual self-assessment: NIST CSF tiers, CISA CRR, sector baselines',
          'Participate in CISA exercises: Cyber Storm, sector-specific exercises',
          'Continuous improvement: lessons learned, threat intel integration',
          'Board/executive reporting: risk posture, investment priorities'
        ]
      }
    ],
    milestones: [
      { day: 30, label: 'Protective Measures Baseline', color: 'blue' },
      { day: 60, label: 'Detection & Response Operational', color: 'green' },
      { day: 90, label: 'Resilience & Reporting Mature', color: 'orange' }
    ],
    excelUrl: '/checklists/CIPPE_US_Checklist.xlsx',
    referenceUrl: 'https://www.cisa.gov/critical-infrastructure-protection'
  };

  return (
    <LearningFrameworkPage framework={FRAMEWORK} />
  );
}
