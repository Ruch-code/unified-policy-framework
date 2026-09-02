export const COUNTRY_TO_REGION = {
  // Americas - North
  US: 'North America', CA: 'North America', MX: 'North America',
  // Americas - Central & Caribbean
  GT: 'Latin America & Caribbean', BZ: 'Latin America & Caribbean', SV: 'Latin America & Caribbean',
  HN: 'Latin America & Caribbean', NI: 'Latin America & Caribbean', CR: 'Latin America & Caribbean', PA: 'Latin America & Caribbean',
  CU: 'Latin America & Caribbean', JM: 'Latin America & Caribbean', HT: 'Latin America & Caribbean', DO: 'Latin America & Caribbean',
  // Americas - South
  BR: 'South America', AR: 'South America', CL: 'South America', CO: 'South America', PE: 'South America',
  VE: 'South America', EC: 'South America', BO: 'South America', PY: 'South America', UY: 'South America', GY: 'South America', SR: 'South America',
  // Europe (EMEA - EU)
  DE: 'European Union', FR: 'European Union', IT: 'European Union', ES: 'European Union', PT: 'European Union',
  NL: 'European Union', BE: 'European Union', LU: 'European Union', IE: 'European Union', AT: 'European Union',
  FI: 'European Union', SE: 'European Union', DK: 'European Union', PL: 'European Union', CZ: 'European Union',
  SK: 'European Union', HU: 'European Union', RO: 'European Union', BG: 'European Union', HR: 'European Union',
  SI: 'European Union', EE: 'European Union', LV: 'European Union', LT: 'European Union', EL: 'European Union', CY: 'European Union',
  MT: 'European Union',
  // Europe - Non EU (EMEA)
  GB: 'United Kingdom', CH: 'EMEA - Europe', NO: 'EMEA - Europe', IS: 'EMEA - Europe', UA: 'EMEA - Europe',
  TR: 'EMEA - Europe', RS: 'EMEA - Europe', AL: 'EMEA - Europe', BA: 'EMEA - Europe', XK: 'EMEA - Europe', MD: 'EMEA - Europe', MK: 'EMEA - Europe', ME: 'EMEA - Europe', BY: 'EMEA - Europe',
  // Middle East & Africa (EMEA)
  AE: 'Middle East & Africa', SA: 'Middle East & Africa', IL: 'Middle East & Africa', QA: 'Middle East & Africa',
  KW: 'Middle East & Africa', OM: 'Middle East & Africa', BH: 'Middle East & Africa', JO: 'Middle East & Africa',
  LB: 'Middle East & Africa', EG: 'Middle East & Africa', MA: 'Middle East & Africa', DZ: 'Middle East & Africa',
  TN: 'Middle East & Africa', NG: 'Middle East & Africa', ZA: 'Middle East & Africa', KE: 'Middle East & Africa',
  GH: 'Middle East & Africa', ET: 'Middle East & Africa', TZ: 'Middle East & Africa', UG: 'Middle East & Africa', CI: 'Middle East & Africa', SN: 'Middle East & Africa', CM: 'Middle East & Africa', SD: 'Middle East & Africa', MZ: 'Middle East & Africa', ZM: 'Middle East & Africa', ZW: 'Middle East & Africa',
  // Asia - North
  RU: 'North Asia', MN: 'North Asia', KZ: 'Central Asia', UZ: 'Central Asia', KG: 'Central Asia', TJ: 'Central Asia', TM: 'Central Asia', AZ: 'Central Asia', AM: 'Central Asia', GE: 'Central Asia',
  // Asia - East
  CN: 'East Asia', JP: 'East Asia', KR: 'East Asia', KP: 'East Asia', TW: 'East Asia', HK: 'East Asia', MO: 'East Asia',
  // Asia - South
  IN: 'South Asia', PK: 'South Asia', BD: 'South Asia', NP: 'South Asia', LK: 'South Asia', BT: 'South Asia', AF: 'South Asia',
  // Asia - Southeast
  SG: 'South East Asia', MY: 'South East Asia', TH: 'South East Asia', VN: 'South East Asia', PH: 'South East Asia',
  ID: 'South East Asia', MM: 'South East Asia', KH: 'South East Asia', LA: 'South East Asia', BN: 'South East Asia',
  // Oceania
  AU: 'Oceania', NZ: 'Oceania', PG: 'Oceania', FJ: 'Oceania',
};

export const REGION_GROUPS = [
  {
    region: 'Americas',
    color: '#f97316',
    timezone: 'EST / CST / PST etc.',
    tzExample: 'New York (EST), São Paulo (BRT)',
    subCategories: ['North America', 'South America', 'Latin America & Caribbean'],
  },
  {
    region: 'EMEA',
    color: '#8b5cf6',
    timezone: 'CET / GMT / GST',
    tzExample: 'London (GMT), Paris (CET), Dubai (GST)',
    subCategories: ['European Union', 'United Kingdom', 'EMEA - Europe', 'Middle East & Africa'],
  },
  {
    region: 'Asia',
    color: '#ec4899',
    timezone: 'IST / SGT / JST / CST, etc.',
    tzExample: 'Mumbai (IST), Singapore (SGT), Tokyo (JST), Beijing (CST)',
    subCategories: ['North Asia', 'Central Asia', 'East Asia', 'South Asia', 'South East Asia'],
  },
  {
    region: 'Oceania',
    color: '#22c55e',
    timezone: 'AEST / NZST',
    tzExample: 'Sydney (AEST), Auckland (NZST)',
    subCategories: ['Oceania'],
  },
];

export const REGULATIONS = [
  {
    id: 'gdpr', name: 'GDPR', region: 'EMEA', subCategory: 'European Union',
    countries: ['DE', 'FR', 'IT', 'ES', 'NL', 'SE', 'PL', 'IE', 'AT', 'FI', 'PT'],
    flag: '🇪🇺', timezone: 'CET', lat: 50.1, lng: 9.4, color: '#6366f1', path: '/gdpr',
    blurb: 'EU data protection regulation — enforces ROPA, DPIA, DSARs, and 72h breach notification.',
  },
  {
    id: 'ccpa', name: 'CCPA / CPRA', region: 'Americas', subCategory: 'North America',
    countries: ['US'], flag: '🇺🇸', timezone: 'PT (California)', lat: 36.7, lng: -119.4, color: '#f59e0b', path: '/ccpa',
    blurb: 'California consumer privacy — Do Not Sell/Share, consumer rights, service provider agreements.',
  },
  {
    id: 'hipaa', name: 'HIPAA', region: 'Americas', subCategory: 'North America',
    countries: ['US'], flag: '🇺🇸', timezone: 'ET', lat: 38.9, lng: -98.0, color: '#14532d', path: '/hipaa',
    blurb: 'US healthcare — PHI safeguards, BAAs, Security & Privacy Rule, breach notification.',
  },
  {
    id: 'coppa', name: 'COPPA', region: 'Americas', subCategory: 'North America',
    countries: ['US'], flag: '🇺🇸', timezone: 'ET', lat: 38.5, lng: -77.0, color: '#0ea5e9', path: '/coppa',
    blurb: 'US children\'s online privacy — verifiable parental consent for under-13 data.',
  },
  {
    id: 'nist', name: 'NIST CSF 2.0', region: 'Americas', subCategory: 'North America',
    countries: ['US'], flag: '🇺🇸', timezone: 'ET', lat: 39.0, lng: -105.0, color: '#334155', path: '/nist',
    blurb: 'US cybersecurity framework — Govern, Identify, Protect, Detect, Respond, Recover.',
  },
  {
    id: 'lgpd', name: 'LGPD', region: 'Americas', subCategory: 'South America',
    countries: ['BR'], flag: '🇧🇷', timezone: 'BRT', lat: -14.2, lng: -51.9, color: '#16a34a', path: '/lgpd',
    blurb: 'Brazil\'s Lei Geral de Proteção de Dados — controller/operator duties, ANPD enforcement, DPO role.',
  },
  {
    id: 'dpdpa', name: 'DPDP Act', region: 'Asia', subCategory: 'South Asia',
    countries: ['IN'], flag: '🇮🇳', timezone: 'IST', lat: 23.0, lng: 79.0, color: '#ea580c', path: '/dpdpa',
    blurb: 'India\'s DPDP Act 2023 — consent architecture, Data Principal & Data Fiduciary duties, breach to DPDP Board.',
  },
  {
    id: 'pdpa', name: 'PDPA', region: 'Asia', subCategory: 'South East Asia',
    countries: ['SG'], flag: '🇸🇬', timezone: 'SGT', lat: 1.35, lng: 103.8, color: '#dc2626', path: '/pdpa',
    blurb: 'Singapore Personal Data Protection Act — consent, DNC registry, accountability, data protection officers.',
  },
  {
    id: 'pipl', name: 'PIPL', region: 'Asia', subCategory: 'East Asia',
    countries: ['CN'], flag: '🇨🇳', timezone: 'CST', lat: 35.8, lng: 104.0, color: '#be123c', path: '/pipl',
    blurb: 'China Personal Information Protection Law — separate consent, cross-border transfer assessment, personal info handlers.',
  },
  {
    id: 'cis', name: 'CIS Controls', region: 'EMEA', subCategory: 'United Kingdom',
    countries: ['GB'], flag: '🌐', timezone: 'GMT', lat: 54.0, lng: -2.0, color: '#64748b', path: '/cis',
    blurb: 'Center for Internet Security — 18 safeguards, Implementation Groups IG1/IG2/IG3, CIS Benchmarks.',
  },
];

export const COUNTRY_META = {
  US: { flag: '🇺🇸', timezone: 'EST', countryName: 'United States' },
  CA: { flag: '🇨🇦', timezone: 'EST', countryName: 'Canada' },
  MX: { flag: '🇲🇽', timezone: 'CST', countryName: 'Mexico' },
  BR: { flag: '🇧🇷', timezone: 'BRT', countryName: 'Brazil' },
  AR: { flag: '🇦🇷', timezone: 'ART', countryName: 'Argentina' },
  GB: { flag: '🇬🇧', timezone: 'GMT', countryName: 'United Kingdom' },
  DE: { flag: '🇩🇪', timezone: 'CET', countryName: 'Germany' },
  FR: { flag: '🇫🇷', timezone: 'CET', countryName: 'France' },
  IN: { flag: '🇮🇳', timezone: 'IST', countryName: 'India' },
  CN: { flag: '🇨🇳', timezone: 'CST', countryName: 'China' },
  JP: { flag: '🇯🇵', timezone: 'JST', countryName: 'Japan' },
  SG: { flag: '🇸🇬', timezone: 'SGT', countryName: 'Singapore' },
  AU: { flag: '🇦🇺', timezone: 'AEST', countryName: 'Australia' },
  RU: { flag: '🇷🇺', timezone: 'MSK', countryName: 'Russia' },
  AE: { flag: '🇦🇪', timezone: 'GST', countryName: 'UAE' },
};
