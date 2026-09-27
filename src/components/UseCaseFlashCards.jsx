import React, { useEffect, useRef, useState } from 'react';
import { Shield, Building, Users, TrendingUp, Grid, Folder, Zap, Globe, ShieldCheck, UsersRound, Monitor, Microscope, Heart, Server, Package, Award, BookOpen, Palette, Layout, Settings, Phone, Mail, AlertTriangle, CheckCircle } from 'lucide-react';

const INDUSTRY_USE_CASES = {
  'Financial Services': [
    { id: 1, title: 'Payment Security', description: 'PCI-DSS compliance for payment processing, fraud monitoring, and secure transaction handling across multiple channels.', badges: ['PCI-DSS', 'SOC 2', 'ISO 27001'] },
    { id: 2, title: 'Fraud Prevention', description: 'Real-time transaction monitoring, anomaly detection, and risk scoring to prevent financial fraud and unauthorized access.', badges: ['NIST CSF', 'ISO 27001', 'CIS Controls'] },
    { id: 3, title: 'Vendor Risk', description: 'Third-party risk assessment and continuous monitoring of financial partners, ensuring supply chain security compliance.', badges: ['SOC 2', 'ISO 27001', 'GDPR'] },
  ],
  'Healthcare': [
    { id: 1, title: 'PHI Protection', description: 'Health Insurance Portability and Accountability Act compliance for protected health information handling, breach notification, and encryption.', badges: ['HIPAA', 'HITRUST', 'NIST CSF'] },
    { id: 2, title: 'Data Encryption', description: 'End-to-end encryption of patient records, secure data transmission, and key management across cloud and on-premises systems.', badges: ['HIPAA', 'GDPR', 'ISO 27001'] },
    { id: 3, title: 'Breach Response', description: 'Incident response playbooks, notification procedures, and forensic analysis for healthcare data breaches under HIPAA regulations.', badges: ['HIPAA', 'GDPR', 'CCPA'] },
  ],
  'Technology / SaaS': [
    { id: 1, title: 'Trust & SOC 2', description: 'SOC 2 Type II compliance report for trust services, demonstrating security controls for customer data protection.', badges: ['SOC 2', 'ISO 27001', 'CCPA'] },
    { id: 2, title: 'Privacy by Design', description: 'Data protection impact assessments, ROPA records, and privacy by design principles for GDPR and CCPA compliance.', badges: ['GDPR', 'CCPA/CPRA', 'ISO 27701'] },
    { id: 3, title: 'CI/CD Security', description: 'Secure software development lifecycle, static code analysis, and container security for automated deployment pipelines.', badges: ['NIST CSF', 'CIS Controls', 'ISO 27001'] },
  ],
  'E-commerce / Retail': [
    { id: 1, title: 'Customer Data Protection', description: 'CCPA/CPRA compliance for California consumer privacy rights, data minimization, and consent management.', badges: ['CCPA/CPRA', 'GDPR', 'PCI-DSS'] },
    { id: 2, title: 'Payment Processing', description: 'PCI-DSS compliance for e-commerce payment card data, secure checkout, and tokenization.', badges: ['PCI-DSS', 'SOC 2', 'ISO 27001'] },
    { id: 3, title: 'Age Verification', description: 'COPPA compliance for children\'s privacy, age verification mechanisms, and parental consent management.', badges: ['COPPA', 'CCPA/CPRA', 'LGPD'] },
  ],
  'Financial Services (Cloud/Infra)': [
    { id: 1, title: 'Cloud Security', description: 'Multi-cloud security controls for AWS, Azure, GCP covering logging, encryption keys, and IaC security scanning.', badges: ['ISO 27001', 'NIST CSF', 'CIS Controls'] },
    { id: 2, title: 'Availability & Compliance', description: 'CERT-In compliance for Indian cloud operations, 180-day retention, incident reporting, and SIM security.', badges: ['CERT-In', 'ISO 27001', 'NIST CSF'] },
    { id: 3, title: 'Incident Response', description: '6-hour incident reporting framework, traffic logging, and SIM security monitoring for telecom data centers.', badges: ['CERT-In', 'ISO 27001', 'NIST CSF'] },
  ],
};

const COMPANY_SIZE_FLASH = {
  'Startup (1-10)': [
    { id: 1, title: 'Foundational Security', description: 'Establish basic security controls, password policies, and simple access management from day one.', color: 'bg-blue-500/20 text-blue-400' },
    { id: 2, title: 'Compliance Lite', description: 'Lightweight compliance setup for investor due diligence, focusing on SOC 2 fundamentals and basic policies.', color: 'bg-green-500/20 text-green-400' },
  ],
  'SMB (11-100)': [
    { id: 1, title: 'Framework Adoption', description: 'Adopt one primary framework (SOC 2 or ISO 27001) and gradually add others as the company grows.', color: 'bg-indigo-500/20 text-indigo-300' },
    { id: 2, title: 'Vendor Management', description: 'Implement third-party risk assessments and ensure all SaaS vendors meet security requirements.', color: 'bg-purple-500/20 text-purple-300' },
  ],
  'Enterprise (100+)': [
    { id: 1, title: 'Multi-Framework', description: 'Maintain multiple frameworks simultaneously (ISO 27001 + SOC 2 + industry-specific) with dedicated compliance teams.', color: 'bg-red-500/20 text-red-300' },
    { id: 2, title: 'Automated GRC', description: 'Governance, Risk, and Compliance platform automation with continuous monitoring and AI-assisted policy management.', color: 'bg-orange-500/20 text-orange-300' },
  ],
};

export default function UseCaseFlashCards({ isDark = false }) {
  const [industryCards, setIndustryCards] = useState([]);
  const [sizeCards, setSizeCards] = useState([]);
  const canvasRef = useRef(null);

  useEffect(() => {
    // Build industry cards from data
    const cards = Object.entries(INDUSTRY_USE_CASES).map(([industry, uses]) => ({
      industry,
      uses,
      color: isDark ? '#1e293b' : '#f1f5f9',
    }));
    setIndustryCards(cards);

    // Build company size cards
    const sizeData = Object.entries(COMPANY_SIZE_FLASH).map(([size, flash]) => ({
      size,
      flash,
      color: isDark ? '#1e293b' : '#f8fafc',
    }));
    setSizeCards(sizeData);

    // Canvas resize
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight * 0.3;
    }
    window.addEventListener('resize', () => {
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight * 0.3;
      }
    });
  }, [isDark]);

  return (
    <div className="relative py-24 md:py-32">
      {/* Industry Use Cases Section */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#1e293b] mb-4">
            Industry Use Cases
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Real-world GRC scenarios across industries, tailored for your company size and compliance maturity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Industry Cards */}
          {industryCards.map((card, i) => (
            <div
              key={i}
              className={`group rounded-2xl border overflow-hidden shadow-lg transition-all duration-500 ${
                isDark ? 'bg-slate-900 border-slate-700' : 'bg-white border-gray-200'
              } hover:${isDark ? 'border-indigo-500' : 'hover:border-[#7c3aed]'} ${isDark ? 'hover:bg-slate-800' : 'hover:bg-gray-100'}`}
            >
              <div className="p-6 flex flex-col min-h-[300px]">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: isDark ? '#1e293b' : '#f8fafc' }}>
                    <Globe className={isDark ? 'text-indigo-400' : 'text-indigo-600'} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg {isDark ? 'text-white' : 'text-gray-900'}">{card.industry}</h3>
                    <p className="text-sm {isDark ? 'text-slate-300' : 'text-gray-500'} flex-1 truncate-line-clamp-2">
                      {card.uses[0]?.description || ''}
                    </p>
                  </div>
                </div>
                <div className="mt-auto flex items-center gap-2">
                  {card.uses.slice(0, 3).map(use => (
                    <span
                      key={use.id}
                      className={`inline-flex items-center rounded-full text-xs font-medium ${isDark ? 'bg-slate-700/50' : 'bg-gray-100/50'} ${use.badges?.map(b => `text-${b.toLowerCase()}-400`).join(' ')}`}
                    >
                      {use.badges?.[0] ? (
                        <span className="w-2.5 h-2.5 rounded-full mr-1" style={{ backgroundColor: use.badges[0].toLowerCase() === 'soc2' ? '#059669' : use.badges[0].toLowerCase() === 'iso' ? '#1d4ed8' : use.badges[0].toLowerCase() === 'pci' ? '#dc2626' : use.badges[0].toLowerCase() === 'hipaa' ? '#dc27c7' : '#7f6b3f' }} />
                      ) : null}
                      {use.badges?.[0] && use.badges[0].substring(0, 3)}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {/* Company Size Flash Cards */}
          {sizeCards.map((card, i) => (
            <div
              key={i + industryCards.length}
              className={`group rounded-2xl border overflow-hidden shadow-lg transition-all duration-500 ${
                isDark ? 'bg-slate-900 border-slate-700' : 'bg-white border-gray-200'
              } hover:${isDark ? 'border-indigo-500' : 'hover:border-[#7c3aed]'} ${isDark ? 'hover:bg-slate-800' : 'hover:bg-gray-100'}`}
            >
              <div className="p-6 flex flex-col min-h-[280px]">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: isDark ? '#1e293b' : '#f8fafc' }}>
                    <TrendingUp className={isDark ? 'text-amber-400' : 'text-amber-600'} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg {isDark ? 'text-white' : 'text-gray-900'}">{card.size}</h3>
                    <p className="text-sm {isDark ? 'text-slate-300' : 'text-gray-500'} flex-1 truncate-line-clamp-2">
                      {card.flash[0]?.description || ''}
                    </p>
                  </div>
                </div>
                <div className="mt-auto flex items-center gap-2">
                  {card.flash.slice(0, 2).map(use => (
                    <span
                      key={use.id}
                      className={`inline-flex items-center rounded-full text-xs font-medium ${isDark ? 'bg-slate-700/50' : 'bg-gray-100/50'} ${use.color}`}
                    >
                      <span dangerouslySetInnerHTML={{ __html: use.color.replace('bg-', '').replace('/20', '') }} />
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3D Canvas */}
      <div className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none">
        <canvas ref={canvasRef} className="absolute inset-0" />
      </div>
    </div>
  );
}
