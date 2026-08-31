import { Link } from 'react-router-dom';

export default function PciDss() {
  const FRAMEWORK = {
    id: 'pci-dss',
    name: 'PCI-DSS v4.0',
    shortName: 'PCI-DSS',
    color: 'red',
    weeks: [
      {
        week: 1,
        title: 'Scope, Scoping & Card Data Flow',
        color: 'red',
        days: 'Days 1-7',
        description: 'Define scope, map card data flows, and identify all system components',
        tasks: [
          'Complete Learning Module 1: PCI-DSS v4.0 Overview & Scoping',
          'Define Cardholder Data Environment (CDE) boundaries',
          'Map all card data flows (ingress, storage, processing, egress)',
          'Identify all system components in scope (servers, apps, network)',
          'Document out-of-scope systems with justification',
          'Create Card Data Flow Diagram (DFD) for all channels'
        ]
      },
      {
        week: 2,
        title: 'Requirements 1-3: Network & Card Data Protection',
        color: 'red',
        days: 'Days 8-14',
        description: 'Implement firewall, secure configurations, and protect stored data',
        tasks: [
          'Complete Learning Module 2: Network Security & Data Protection',
          'Implement firewall/config standards (Req 1): rules, reviews, DMZ',
          'Secure system components (Req 2): hardening, vendor defaults, services',
          'Protect stored cardholder data (Req 3): encryption, masking, retention',
          'Implement key management for encryption (Req 3.5-3.7)',
          'Document network diagrams and data flows per Req 1.1-1.2',
          'Configure secure protocols (TLS 1.2+) for all card data transmission'
        ]
      },
      {
        week: 3,
        title: 'Requirements 4-6: Encryption, Vulnerability & Secure Systems',
        color: 'green',
        days: 'Days 15-21',
        description: 'Encryption, vulnerability management, and secure development',
        tasks: [
          'Complete Learning Module 3: Encryption & Vulnerability Management',
          'Encrypt transmission over open/public networks (Req 4): TLS everywhere',
          'Deploy and maintain anti-malware (Req 5): all systems, updates, logs',
          'Develop secure systems/apps (Req 6): SDLC, code review, vuln testing',
          'Implement change management for all system components',
          'Deploy WAF or equivalent for public-facing web apps (Req 6.4.2)',
          'Perform quarterly ASV scans and annual penetration tests (Req 11)'
        ]
      },
      {
        week: 4,
        title: 'Requirements 7-12: Access, Monitoring, Policy & Service Providers',
        color: 'orange',
        days: 'Days 22-30+',
        description: 'Access control, monitoring, security policies, and service provider management',
        tasks: [
          'Complete Learning Module 4: Access Control, Monitoring & Compliance',
          'Implement access control (Req 7-8): least privilege, MFA, unique IDs',
          'Restrict physical access (Req 9): facilities, media, visitors',
          'Implement logging & monitoring (Req 10): audit trails, SIEM, alerts',
          'Test security systems regularly (Req 11): ASV, pen test, IDS/IPS',
          'Maintain information security policy (Req 12): roles, awareness, incident response',
          'Manage service providers (Req 12.8-12.10): agreements, monitoring, assessments',
          'Prepare SAQ/ROC and Attestation of Compliance (AoC)'
        ]
      }
    ],
    milestones: [
      { day: 30, label: 'Core Controls Implemented', color: 'red' },
      { day: 35, label: 'Compensating Controls', color: 'purple' },
      { day: 45, label: 'QSA Assessment Ready', color: 'green' }
    ],
    excelUrl: '/checklists/PCI_DSS_v4_Checklist.xlsx',
    referenceUrl: 'https://www.pcisecuritystandards.org'
  };

  return (
    <LearningFrameworkPage framework={FRAMEWORK} />
  );
}
