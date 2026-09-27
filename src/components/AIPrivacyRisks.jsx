import React, { useState } from 'react';
import { 
  Brain, Database, Zap, Shield, AlertTriangle, 
  Users, Globe, Lock, Eye, Network, 
  Cpu, HardDrive, Cloud, ArrowRightLeft,
  Scale, FileText, AlertCircle, Target
} from 'lucide-react';

const AI_PRIVACY_RISKS = {
  'Model Training': {
    icon: Brain,
    color: '#ef4444',
    risks: [
      { 
        title: 'Training Data Memorization',
        description: 'Models can memorize and regurgitate PII, trade secrets, or copyrighted content from training data.',
        regulations: ['GDPR Art. 5(1)(c)', 'CCPA §1798.100', 'AI Act Art. 50'],
        controls: ['Data deduplication', 'PII scrubbing', 'Differential privacy', 'Output filtering'],
        severity: 'Critical'
      },
      { 
        title: 'Data Provenance & Consent',
        description: 'Training datasets often lack proper consent trails for personal data processing.',
        regulations: ['GDPR Art. 6/7', 'LGPD Art. 7', 'PDPA §13'],
        controls: ['Data lineage tracking', 'Consent management', 'Legitimate interest assessments', 'Data protection impact assessments'],
        severity: 'High'
      },
      { 
        title: 'Model Inversion Attacks',
        description: 'Attackers can reconstruct training data from model outputs, exposing sensitive information.',
        regulations: ['GDPR Art. 32', 'NIST AI RMF', 'ISO 42001'],
        controls: ['Output perturbation', 'Rate limiting', 'Access controls', 'Monitoring for anomalous queries'],
        severity: 'High'
      },
    ]
  },
  'RAG (Retrieval-Augmented Generation)': {
    icon: Database,
    color: '#f59e0b',
    risks: [
      { 
        title: 'Knowledge Base PII Leakage',
        description: 'RAG systems can retrieve and expose personal data from vector databases without proper access controls.',
        regulations: ['GDPR Art. 25', 'CCPA §1798.150', 'HIPAA'],
        controls: ['Row-level security', 'PII redaction at ingestion', 'Access-controlled retrieval', 'Audit logging'],
        severity: 'Critical'
      },
      { 
        title: 'Cross-tenant Data Contamination',
        description: 'Multi-tenant RAG systems may leak data between customers through shared embeddings or retrieval.',
        regulations: ['GDPR Art. 28', 'SOC 2 CC6.1', 'ISO 27001 A.8'],
        controls: ['Tenant isolation', 'Separate vector indices', 'Encryption at rest', 'Zero-trust architecture'],
        severity: 'High'
      },
      { 
        title: 'Stale/Outdated Personal Data',
        description: 'RAG systems may serve outdated personal information violating accuracy and rectification rights.',
        regulations: ['GDPR Art. 5(1)(d)', 'CCPA §1798.105', 'LGPD Art. 18'],
        controls: ['Automated data refresh', 'TTL-based expiration', 'Right to be forgotten pipelines', 'Change data capture'],
        severity: 'Medium'
      },
    ]
  },
  'AI Agents': {
    icon: Zap,
    color: '#8b5cf6',
    risks: [
      { 
        title: 'Autonomous Data Processing',
        description: 'Agents can process personal data without human oversight, triggering Article 22 GDPR automated decision-making.',
        regulations: ['GDPR Art. 22', 'AI Act Art. 14', 'Colorado Privacy Act'],
        controls: ['Human-in-the-loop checkpoints', 'Decision logging', 'Appeal mechanisms', 'Impact assessments'],
        severity: 'Critical'
      },
      { 
        title: 'Tool/Function Calling PII Exposure',
        description: 'Agents calling external APIs may send PII to third parties without proper data processing agreements.',
        regulations: ['GDPR Art. 28', 'CCPA §1798.140', 'Schrems II'],
        controls: ['API allowlisting', 'Data minimization in calls', 'DPA verification', 'Egress monitoring'],
        severity: 'High'
      },
      { 
        title: 'Agent Memory & State Persistence',
        description: 'Long-running agents accumulate personal data in context windows, creating retention and deletion challenges.',
        regulations: ['GDPR Art. 5(1)(e)', 'CCPA §1798.105', 'AI Act Art. 10'],
        controls: ['Automatic context expiration', 'Selective memory wiping', 'Retention policies', 'User data export/delete'],
        severity: 'High'
      },
    ]
  },
  'Use Cases by Industry': {
    icon: Target,
    color: '#10b981',
    risks: [
      { 
        title: 'Healthcare: Clinical Decision Support',
        description: 'AI diagnosing patients processes PHI; requires HIPAA BAAs, minimum necessary standard, audit trails.',
        regulations: ['HIPAA', 'HITRUST', 'FDA AI/ML'],
        controls: ['De-identification', 'BAA with AI vendor', 'Clinical validation', 'Clinician override'],
        severity: 'Critical'
      },
      { 
        title: 'Financial: Credit Scoring & Fraud',
        description: 'Automated credit decisions trigger FCRA/ECOA adverse action notices; model bias testing required.',
        regulations: ['FCRA', 'ECOA', 'SR 11-7', 'NYDFS'],
        controls: ['Bias testing', 'Adverse action notices', 'Model governance', 'Fair lending monitoring'],
        severity: 'Critical'
      },
      { 
        title: 'HR: Recruiting & Employee Monitoring',
        description: 'AI screening resumes or monitoring productivity processes special category data; requires DPIA.',
        regulations: ['GDPR Art. 9', 'Illinois BIPA', 'NYC LL144', 'EEOC'],
        controls: ['DPIA', 'Bias audits', 'Transparency notices', 'Human review', 'Data minimization'],
        severity: 'High'
      },
      { 
        title: 'Marketing: Personalization & Profiling',
        description: 'Behavioral profiling for ads triggers GDPR profiling rules, CCPA sale/opt-out, ePrivacy consent.',
        regulations: ['GDPR Art. 21/22', 'ePrivacy', 'CCPA §1798.120', 'LGPD'],
        controls: ['Consent management', 'Opt-out mechanisms', 'Profiling restrictions', 'Legitimate interest balancing'],
        severity: 'High'
      },
      { 
        title: 'Legal: Contract Review & Discovery',
        description: 'AI reviewing privileged/confidential documents; requires attorney-client privilege preservation.',
        regulations: ['Attorney-client privilege', 'Work product doctrine', 'ABA Model Rules'],
        controls: ['On-prem deployment', 'Zero-retention APIs', 'Privilege screening', 'Attorney supervision'],
        severity: 'High'
      },
    ]
  }
};

const severityStyles = {
  Critical: { 
    light: 'bg-red-500/90 text-white', 
    dark: 'bg-alert-danger text-alert-danger border border-alert-danger' 
  },
  High: { 
    light: 'bg-orange-500/90 text-white', 
    dark: 'bg-alert-warning text-alert-warning border border-alert-warning' 
  },
  Medium: { 
    light: 'bg-yellow-500/90 text-gray-900', 
    dark: 'bg-alert-warning text-alert-warning border border-alert-warning' 
  },
};

export default function AIPrivacyRisks({ isDark = false }) {
  const [activeCategory, setActiveCategory] = useState('Model Training');
  
  const categories = Object.keys(AI_PRIVACY_RISKS);
  
  return (
    <section className={`py-24 ${isDark ? 'bg-dark-bg' : 'bg-surface-50'}`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-navy-900 dark:text-text-dark-primary mb-4">
            AI Privacy Risk Matrix
          </h2>
          <p className="text-lg text-navy-600 dark:text-text-dark-secondary max-w-3xl mx-auto">
            Comprehensive privacy risk mapping for AI systems across Model Training, RAG, Agents, and Industry Use Cases.
            Mapped to global regulations with actionable controls.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12" role="tablist" aria-label="AI risk categories">
          {categories.map((cat, i) => {
            const color = AI_PRIVACY_RISKS[cat].color;
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                role="tab"
                aria-selected={isActive}
                aria-controls={`ai-panel-${cat}`}
                id={`ai-tab-${cat}`}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300
                  ${isActive
                    ? 'text-white shadow-lg'
                    : `bg-surface-100 dark:bg-surface-dark-100 text-navy-700 dark:text-text-dark-secondary hover:bg-surface-200 dark:hover:bg-surface-dark-200 border border-surface-300 dark:border-surface-dark-300`
                  }`}
                style={{ 
                  background: isActive ? color : undefined,
                  borderColor: color
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Risk Cards */}
        <div id={`ai-panel-${activeCategory}`} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" role="tabpanel" aria-labelledby={`ai-tab-${activeCategory}`}>
          {AI_PRIVACY_RISKS[activeCategory].risks.map((risk, i) => {
            const catColor = AI_PRIVACY_RISKS[activeCategory].color;
            const sevStyle = severityStyles[risk.severity];
            
            return (
              <div
                key={i}
                className="grc-card relative hover:-translate-y-1"
              >
                {/* Severity Badge */}
                <div className="absolute top-4 right-4 z-10">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${isDark ? sevStyle.dark : sevStyle.light}`}>
                    {risk.severity}
                  </span>
                </div>

                <div className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${isDark ? 'bg-indigo-900/30' : catColor + '20'}`}>
                      {(() => {
                        const IconComponent = AI_PRIVACY_RISKS[activeCategory].icon;
                        return <IconComponent className="w-6 h-6" style={{ color: catColor }} />;
                      })()}
                    </div>
                    <div className="flex-1">
                      <h3 className="grc-card-title font-bold text-lg">{risk.title}</h3>
                      <p className="grc-card-desc text-sm mt-1">{risk.description}</p>
                    </div>
                  </div>

                  {/* Regulations */}
                  <div className="mb-4">
                    <h4 className="text-xs font-semibold text-navy-500 dark:text-text-dark-muted uppercase tracking-wider mb-2">Regulations Triggered</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {risk.regulations.map((reg, j) => (
                        <span key={j} className={`px-2 py-1 text-xs font-medium rounded-lg ${isDark ? darkChip : 'bg-indigo-50 text-indigo-600 border border-indigo-100'}`}>
                          {reg}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Controls */}
                  <div className={`border-t ${isDark ? 'border-surface-dark-300' : 'border-surface-300'} pt-4`}>
                    <h4 className="text-xs font-semibold text-navy-500 dark:text-text-dark-muted uppercase tracking-wider mb-2">Controls in Place</h4>
                    <div className="space-y-1.5">
                      {risk.controls.map((ctrl, j) => (
                        <div key={j} className="flex items-center gap-2 text-sm text-navy-600 dark:text-text-dark-secondary">
                          <span className="w-1.5 h-1.5 rounded-full" style={{ background: catColor }} />
                          <span>{ctrl}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}