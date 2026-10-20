export const FOLLOWUP_TIPS = {
  'Vendor Risk': 'Be ready to walk through a real vendor assessment you did bring redacted artifacts.',
  'Control Mapping': 'Ask which frameworks they use tailor your mapping examples.',
  'DPIA': 'They may ask about specific anonymization techniques know k-anonymity vs differential privacy.',
  'DSAR': 'Mention ML model challenges they love this edge case.',
  'CI⁄CD': 'Ask about their current pipeline tailor to their stack.',
  'Secrets Management': 'Have a real incident story ready (redacted).',
  'Board Communication': 'Bring a sample risk heat map (redacted).',
  'Security Culture': 'Mention specific metrics you improved (DORA).',
  'default': 'Prepare a concrete example with metrics.'
};

export const RISK_WARNINGS = {
  'By Region': {
    title: 'What Can Go Wrong Without Regional Framework Controls',
    items: [
      'Regulatory Fines: GDPR fines up to 20M euros or 4 percent revenue CCPA 7500 per violation DPDPA 250 crore',
      'Market Access Loss: Non-compliance blocks market entry (EU, India, US federal contracts)',
      'Data Breach Liability: No safe harbor without documented controls increased breach costs 3-5x',
      'Audit Failures: Inability to demonstrate compliance during regulator audits or customer assessments',
      'Reputational Damage: Public enforcement actions erode customer trust and brand value'
    ]
  },
  'By Industry': {
    title: 'What Can Go Wrong Without Industry-Aligned Controls',
    items: [
      'Control Gaps: Duplicate or conflicting controls across frameworks create security blind spots',
      'Audit Fatigue: Duplicate audits per framework waste 40-60 percent more resources vs unified approach',
      'Inconsistent Evidence: Same control mapped differently across frameworks fails auditor scrutiny',
      'Vendor Sprawl: Different vendors for each framework increase supply chain risk 3x',
      'Missed Dependencies: Cross-framework control dependencies missed without unified mapping'
    ]
  },
  'AI Privacy': {
    title: 'What Can Go Wrong Without AI Privacy Controls',
    items: [
      'Model Memorization: LLMs regurgitate PII from training data GDPR Art 5(1)(c) violation class-action lawsuits',
      'RAG Leakage: Vector DBs expose PII via retrieval without access controls HIPAA CCPA violations',
      'Agent Autonomy: AI agents process PII without human oversight GDPR Art 22 automated decision violation',
      'Supply Chain Risk: Third-party model APIs train on your data no DPA cross-border transfer violations',
      'Regulatory Bans: AI Act prohibits high-risk AI without conformity assessment market ban in EU'
    ]
  },
  'Vendor Risk': {
    title: 'What Can Go Wrong Without Vendor Risk Controls',
    items: [
      '4th⁄5th Party Blindness: 60 percent of breaches originate from sub-processors you do not track no visibility equals no liability protection',
      'Contractual Gaps: Missing flow-down clauses equals no audit rights no liability flow-down no breach notification SLAs',
      'Concentration Risk: Single cloud provider for critical services equals single point of failure (SolarWinds Kaseya)',
      'Regulatory Non-Compliance: DORA Art 28 NIS2 Art 21 GDPR Art 28 require sub-processor governance fines up to 2 percent revenue',
      'Incident Cascade: Vendor breach without notification SLA equals 72-hour GDPR window missed mandatory notification fails'
    ]
  }
};
