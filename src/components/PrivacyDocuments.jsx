import { useState, useEffect } from 'react';
import { Cookie, FileSearch, Database, FileText, ShieldCheck, Wrench, AlertTriangle, Lightbulb, ListChecks, ExternalLink, ChevronRight, CheckCircle2 } from 'lucide-react';

const PRIVACY_DOC_IDS = ['gdpr', 'dpdpa', 'ccpa-cpra', 'coppa', 'lgpd', 'pdpa', 'pipl', 'iso27701', 'hipaa', 'hitrust', 'cippe-eu', 'cippe-us'];

const CHECKLIST_KEY_PREFIX = 'compliance-privacy-docs-';

const PACK_ITEMS = [
  'Privacy Notice / Policy published and linked in the site footer (covers the data you actually collect)',
  'Cookie Policy page published with a real cookie table (not a generator stub)',
  'Cookie banner: non-essential scripts blocked before consent + granular accept / reject / customize',
  '"Do Not Sell or Share My Personal Information" link where CCPA/CPRA applies, honoring the global opt-out signal (GPC)',
  'DSAR inbox (e.g., privacy@) + triage checklist + a tracker for response deadlines',
  'Consent record per visitor: timestamp, banner version, granular choices (kept by your CMP)',
  'DPIA trigger screen documented — including dated "not required" decisions',
  'DPIA written and signed off for every high-risk process; supervisor consultation (Art. 36-style) where residual risk stays high',
  'ROPA current this quarter: every processing activity, lawful basis, recipients, transfers, retention',
  'Data retention schedule + deletion jobs actually running',
  'Breach notification runbook + register (72h GDPR / per-law timelines)',
  'Vendor DPA / BAA stack attached to your processing inventory',
];

const PRIVACY_DOC_NOTES = {
  gdpr: {
    cookie: "Consent for non-essential cookies comes from the ePrivacy Directive (2002/58/EC) applied via national Art. 5(3) laws; GDPR Art. 7 and Art. 13 cover consent quality and transparency. Analytics/marketing cookies need prior, informed, freely-given consent; strictly-necessary cookies (auth, security, load-balancing) are exempt. Post Planet49/IAB rulings, consent by scrolling or continuing is invalid — you must block non-essential tags until a choice is made.",
    dpia: "Art. 35 GDPR makes a DPIA mandatory when processing is 'likely to result in a high risk to individuals' (profiling, large-scale, special categories, systematic monitoring) per the EDPB's 9 criteria. If residual risk stays high, Art. 36 requires you to consult your supervisory authority before starting — and the CEO/board must sign the DPIA off.",
    ropa: "Art. 30(1) GDPR requires a written ROPA for every controller and Art. 30(2) for every processor — no size exemption. Regulators (Art. 58 requests) and B2B customers pull it as the first evidence artifact.",
    docs: ['Privacy Notice (Art. 13/14)', 'Cookie Policy (ePrivacy + Art. 13)', 'DPIA set (Art. 35/36)', 'ROPA (Art. 30)', 'DSAR procedure (Art. 15-22)', 'Data Protection Officer where required (Art. 37)', 'International transfer & SCC register (Art. 44-49)'],
  },
  dpdpa: {
    cookie: "The DPDPA 2023 never says 'cookie', but cookies that collect digital personal data (IP, device ID, email via pixels) are in scope: s.5 requires a consent notice (purpose, categories, use, right to withdraw) and genuine consent (ss.6-7), and s.6(1) a notice before non-consent processing. A cookie banner + policy is the practical way to satisfy consent-notice duties for site traffic — treat every tracker as handling digital personal data.",
    dpia: "The statute requires 'reasonable security safeguards' (s.8(6)); the draft DPDP Rules (2025) add a formal data protection impact assessment for high-risk processing. Building DPIAs now pre-empts the Rules and directly evidences the safeguard duty you already owe.",
    ropa: "DPDPA doesn't mandate a register by that name, but s.8 accountability and the draft Rules' documentation duties expect a structured record of processing. A ROPA is the cheapest evidence base when the Data Protection Board or a customer asks how you protect digital personal data.",
    docs: ['Privacy Notice (s.6(1))', 'Consent notice template (s.5)', 'Cookie Policy & banner', 'Safeguard assessment / DPIA (s.8(6))', 'Processing register', 'Breach notification procedure (s.8(5))', 'Children-data consent flows (s.9)'],
  },
  'ccpa-cpra': {
    cookie: "CCPA/CPRA is opt-out, not opt-in: you need a 'Do Not Sell or Share My Personal Information' link on the homepage and a privacy policy that lists the categories of personal information collected, sold, and shared (Civ. Code §1798.130). Advertising/analytics cookies that fire bidder/user IDs count as 'selling' or 'sharing' — so the banner must expose an opt-out toggle and honor the Global Privacy Control signal.",
    dpia: "No 'DPIA' by name. The CPRA regulations instead require periodic risk assessments for high-impact/automated-decision processing plus cybersecurity audits. A GDPR-style DPIA you already wrote is the easiest evidence pack for both — reuse it.",
    ropa: "No 'ROPA' by name; your privacy policy's category table (data inventory by categories collected/sold/shared/retained) is the de-facto register. Keep a master inventory so regenerating that table stays trivially accurate.",
    docs: ['Privacy Policy category table (§1798.130)', 'Cookie Policy + banner', '"Do Not Sell or Share" link + GPC', 'Right-to-know / delete / correct workflow', 'Opt-out records for sale/sharing', 'Risk assessment & cyber audit pack for CPRA regs'],
  },
  coppa: {
    cookie: "COPPA (16 CFR Part 312) covers sites directed at children under 13: any persistent identifier (cookies, pixels, device IDs) that promotes or links a profile of a child counts as 'personal information' (§312.2). You need a direct notice to parents, a privacy notice, and verifiable parental consent before collecting via persistent identifiers (§312.5). Never place ad/marketing pixels on child-directed pages, and the 2025 Rule updates now pull in data merely 'associated with' an individual — review every third-party script.",
    dpia: "COPPA has no DPIA, but enforcement and the 2025 Rule expect you to assess each vendor integration (ad networks, analytics, chat) for whether it embeds identifiers advertently. That review is effectively a mini-DPIA per third party — document it.",
    ropa: "Not a COPPA term. Instead, keep a register of every third-party script/plugin on child-directed pages, what identifiers it touches, and the vendor's COPPA / safe-harbor status — this is the first thing an FTC investigation requests.",
    docs: ['Privacy notice to parents (§312.4(d))', 'Direct notice on the site', 'Verifiable parental consent flow (§312.5)', 'Vendor integration register', 'Online Privacy Protection Act (COPPA) review log'],
  },
  lgpd: {
    cookie: "LGPD hooks: consent (Art. 7) and transparency (Art. 6 VI). ANPD's cookie guidance treats non-essential cookies as needing consent, with the banner separating essential vs analytics vs advertising, making 'Rejeitar' (reject) prominent, and keeping withdrawal as easy as consent.",
    dpia: "Art. 38 LGPD: ANPD determines when a DPIA (Relatório de Impacto à Proteção de Dados, RIPD) is required — tied to high-risk and sensitive-data processing and new technology. Under the ANPD sanctioning regulation, high-impact processing that risks serious harm to data subjects carries heavier penalties.",
    ropa: "Operationally expected under LGPD's accountability principle (Art. 6 II and Art. 41 governance duties): keep a ROPA-style register as the evidence layer ANPD audits request — ANPD's rules on RIPD and record-keeping assume one exists.",
    docs: ['Privacy Notice (LGPD transparency)', 'Cookie Policy & banner per ANPD guidance', 'RIPD / DPIA (Art. 38)', 'Records of processing (ROPA)', 'DPO / encarregado designation', 'Incident + ANPD notification register'],
  },
  pdpa: {
    cookie: "PDPC guidance treats cookies that collect personal data like any other collection: notice (s.20) and consent (s.13) apply, with implied-consent leeway only where there is practical de-identification. A cookie notice/banner is the standard on Singapore sites; keep the 'strictly necessary' carveout small.",
    dpia: "The PDPA has no statutory DPIA, but PDPC publishes a 'Data Protection Impact Assessment' guide and expects one for new projects touching personal data — reinforced by the 2021 amendments (mandatory data breach notification s.26, designated DPO s.11A). Treat it as good-practice-you-actually-do.",
    ropa: "Not statutory, but the PDPC expects organisations to maintain records that support the Data Protection Obligations (s.24) and the 2021 data-breach documentation duties. A ROPA + inventory is the working evidence for your Personal Data Protection Policy.",
    docs: ['Privacy Notice / PCPM (s.20)', 'Cookie Policy & banner', 'DPIA where new tech/data (PDPC guide)', 'DPO nomination notice (s.11A)', 'Data breach assessment & notification log (s.26)', 'Retention limitation register (s.25)'],
  },
  pipl: {
    cookie: "PIPL covers cookies that collect personal information: mainland practice is a first-visit cookie notice, and Art. 14 requires separate consent for sensitive personal information (some cookies carry precise location/device IDs). Lawful bases in Art. 13 and CAC/TC260 guidance on SDKs and app-processing rules apply to trackers; the banner must be a real opt-in/opt-out modal, not a passive notice.",
    dpia: "Arts. 55-56 PIPL require a personal information impact assessment for specific processing: sensitive PI, automated decision-making that affects individuals, entrustment or provision of PI to others, cross-border transfer, and disclosure. Keep the assessment records for at least 3 years (Art. 56).",
    ropa: "Not a named artifact; instead Art. 56's assessment obligation plus Art. 51 documentation duties mean you must keep a working map of processing activities, lawful bases, transfers (incl. the CAC security-assessment or SCC path), and recipients — a ROPA is the natural way to hold it.",
    docs: ['Privacy Notice (Art. 17)', 'Cookie Policy & opt-in banner', 'Separate consent flow (Art. 14)', 'PIPIA / impact assessments (Arts. 55-56)', 'Cross-border transfer records (Arts. 38-40)', 'Sensitive PI register (Art. 28)'],
  },
  iso27701: {
    cookie: "27701 doesn't dictate banners, but its GDPR-conformity annexes expect cookie-consent and transparency controls to be designed into the PIMS. For any ISO 27701 scope that covers GDPR-relevant sites, adopt the cookie policy as a designed control in your documentation set (it also strengthens a future IAPP/SOC2-privacy claim).",
    dpia: "27701's 'privacy risk assessment' and Appendix-D PII-transfer impact controls deliberately mirror the GDPR DPIA: the pack you produce for Art. 35 doubles as PIMS conformance evidence during the external audit.",
    ropa: "The Annex to ISO/IEC 27701 (GDPR mapping) treats the record of processing activities as a designed control. A maintained ROPA is the backbone your Statement of Applicability cites — skip it and the certification body asks immediately.",
    docs: ['Privacy Notice', 'Cookie Policy & consent controls', 'Privacy risk / impact assessments map', 'ROPA as designed control', 'DPO & roles documentation', 'PII transfer controls (Appendix D)'],
  },
  hipaa: {
    cookie: "HIPAA has no 'cookie rule', but HHS OCR's Online Tracking Technologies bulletin (Dec 2022, reaffirmed Feb 2023) warns that analytics/marketing pixels on authenticated pages — or pages about conditions, medications, and care — can disclose PHI, and a banner does NOT cure a disclosure. Keep tracking tags off patient-related pages, sign a BAA if a vendor sees any PHI, and treat the Notice of Privacy Practices (NPP, 45 CFR §164.520) as your required transparency document.",
    dpia: "The analog is the HIPAA Security Rule risk analysis (45 CFR §164.308(a)(1)(ii)) plus BAA management (§164.504(e)). Use the DPIA structure (assets → threats → likelihood × impact → measures) to run the Security Risk Assessment OCR demands on breach investigations.",
    ropa: "No ROPA by name; the close analogs are the register of PSI disclosures that would require authorization (§164.508 box), the BAA inventory, and a data-flow diagram of every system crossing PHI. That register is what HIPAA audits and complaint investigations pull first.",
    docs: ['Notice of Privacy Practices (NPP)', 'Security Risk Assessment (SRA)', 'BAA inventory (§164.504)', 'Tracking-technology review log', 'Breach notification register (§164.408)', 'Minimum necessary documentation'],
  },
  hitrust: {
    cookie: "HITRUST's privacy and tracking-control requirements inherit HIPAA's stance: third-party pixels on patient-facing pages are the top red flag in any HITRUST assessment. If you use marketing cookies, map them under HITRUST's tracking/consent requirements per your CSF, and keep a BAA for any vendor that could observe PHI.",
    dpia: "HITRUST's risk-management framework expects a documented risk analysis that scales with processing — run it with DPIA-style rigor (threats, likelihood × severity, controls) so the same artifact satisfies the CSF's risk requirements and any GDPR-style obligations in scope.",
    ropa: "Build the data inventory + recipient/transfer register and keep it mapped to HITRUST CSF requirements (privacy privacy controls, controlling access, network risk) so assessment evidence is a 'show the register', not a scramble.",
    docs: ['Notice of Privacy Practices (NPP)', 'Security Risk Assessment (SRA)', 'Cookie/tracking control mapping', 'BAA inventory', 'PHI data-flow register', 'Breach response evidence'],
  },
  'cippe-eu': {
    cookie: "CIPP/E is the IAPP certification grounded in GDPR/ePrivacy: assessed candidates must know that cookie consent is consent-in-action (GDPR Art. 7 + ePrivacy Art. 5(3)), that blocking-before-consent is required, and that Europe is the same standard every DPO certificate assumes. Use it as your EU cookie/DPIA/ROPA rulebook.",
    dpia: "Art. 35/36 GDPR analyzed end-to-end (WP248 triggers, Art. 35(7) content, supervisor consultation) is core CIPP/E body of knowledge — the DPIA steps below are literally the exam outline.",
    ropa: "Art. 30's controller + processor records (and agents/representatives on Art. 27) are exam-definitional for CIPP/E; the register is also what your certification practice must produce for clients.",
    docs: ['Cookie Policy (ePrivacy + Art. 13)', 'DPIA set (Art. 35/36)', 'ROPA (Art. 30)', 'DSAR procedure', 'Transfer & SCC register', 'DPO appointment record'],
  },
  'cippe-us': {
    cookie: "CIPP/US covers US privacy law: the CCPA-based opt-out model (GPC, Do Not Sell or Share), state privacy statutes, and FTC enforcement on unfair tracking practices. For US-certification purposes, write the cookie policy as an opt-out notice with category tables, not a GDPR-style consent doctrine.",
    dpia: "US federal and state frameworks replace 'DPIA' with risk-assessment duties (CPRA regs, and FTC-consent orders effective orders). The DPIA methodology still applies — CIPP/US candidates must be able to run a structured impact assessment and argue the opt-out alternative.",
    ropa: "US laws want you to maintain and be able to produce data inventories and category tables on demand (CPRA regs, COPPA register, HIPAA disclosure register) — keep the master inventory the ROPA model produces.",
    docs: ['Privacy Policy with category tables', 'Cookie Policy + opt-out banner', 'Do Not Sell or Share + GPC', 'Risk assessment pack', 'COPPA/state-law registers as applicable', 'FTC-practice evidence trail'],
  },
};

const FALLBACK_NOTE = {
  cookie: "Cookie policy requirements come from wherever you host: EU/EEA require prior consent for non-essential cookies (ePrivacy + GDPR Art. 7), US states require opt-out where cookies 'sell/share' data, and India/Brazil/Singapore/China all expect a consent or notice banner before tracking scripts run. The cookie table must match your actual tags.",
  dpia: "High-risk processing — profiling, sensitive data, children's data, new tech, large scale, cross-border transfers — routinely triggers a documented impact assessment or the law's equivalent (GDPR Art. 35, DPDPA draft Rules, LGPD Art. 38, PIPL Arts. 55-56). When in doubt, write the one-pager: profiled direction is what all regulators share.",
  ropa: "A structured record of processing activities is the cheapest proof of accountability under every modern privacy law, even where the statute doesn't use the word. Keep it current and it answers regulators, DSARs, breach scoping, and customer questionnaires all at once.",
  docs: ['Privacy Notice', 'Cookie Policy & consent records', 'DPIA / impact assessment pack', 'Processing register (ROPA)', 'DSAR workflow', 'Breach notification register'],
};

const TAGLINES = {
  cookie: 'Tell visitors what tracks them, why, and let them say no before anything non-essential fires.',
  dpia: 'The structured risk assessment you must run before high-risk processing starts.',
  ropa: 'The living register of every processing activity, purpose, recipient, transfer and retention.',
};

const PILLARS = {
  cookie: {
    key: 'cookie',
    label: 'Cookie Policy & Consent',
    icon: Cookie,
    tagline: TAGLINES.cookie,
    steps: [
      {
        t: 'Inventory everything that touches the browser',
        d: "Run a cookie scan — the CMPs in Duda's App Store auto-scan; standalone scanners (Cookiebot, Osano) have free tiers; or open DevTools → Application → Storage → Cookies and the Network tab across 5-10 key pages. Capture: cookie/script name, first- or third-party, purpose bucket (essential, preferences, analytics, marketing), lifetime, domain, and what personal data it carries (email, IP, device ID, page views, heart rate of clicks). Don't forget embedded YouTube/Maps, chat widgets, and pixels — they all count. This list is your policy's cookie table.",
      },
      {
        t: 'Categorize essential vs non-essential',
        d: "Strictly necessary = required for the site to function (auth, security, session/load-balancing, basket). EU law exempts these from consent. Everything else — analytics, A/B tests, marketing, social, personalization — needs consent or a lawful alternative. When unsure, treat it as non-essential; the cost of over-blocking is a slightly grayer dashboard, the cost of under-blocking is an ePrivacy fine.",
      },
      {
        t: 'Choose how you collect consent — three routes',
        d: "(1) No-code, inside Duda: Settings → Privacy Settings → privacy page template (customizable), the 'Activate cookie notification' toggle for the built-in banner (custom text + links), and 'Enable cookie tracking on this site' to stop platform analytics and any injected pixels. (2) A real CMP from the Duda App Store (recommended for GDPR/CCPA volume): App Store → Privacy and Compliance → install Termly, Springtime CMP, or Usercentrics. With Usercentrics: run the built-in scanner (auto-detects and categorizes your scripts) → 'Generate Cookie Policy' → 'Add to Website' → toggle the Consent Banner → turn on Google Consent Mode → Save & Republish. These tools block cookies before consent, version the banner, record consent proof — the built-in notification alone doesn't. (3) Contract/integrations route for WordPress, Webflow, or a custom build: drop the Cookiebot / Usercentrics / OneTrust / Osano / Iubenda / Axeptio / Termly snippet in and wire Google Consent Mode via GTM template.",
      },
      {
        t: 'Write the cookie policy page',
        d: "Sections that hold up in an audit: who controls the data (controller identity + DPO/contact), what cookies are, the cookie table (name, provider, purpose, duration, country, opt-out link), the categories you use and their legal basis (consent vs strict necessity vs legitimate interests where the law allows), how withdrawal works (banner settings, browser controls, GPC on CCPA), how to reach you, and version + last-updated date. Duda's generated privacy page is a starting skeleton — replace the generic cookie blurb with your real table.",
      },
      {
        t: 'Configure the banner properly, not on defaults',
        d: "Granular choices, not a blanket Accept. Pre-consent blocking: non-essential scripts must NOT run before a choice — a notice without blocking is the single most common enforcement failure. Make 'Reject' and 'Only essential' as easy as 'Accept'. Withdrawal must be as easy as consent (a re-openable banner/footer link). Per-region display: EU browser signals → GDPR modal; CA/CO/CT/UT traffic → CCPA 'Do Not Sell or Share' + GPC. Forward consent to GA4 via Consent Mode so cookieless pings respect preferences.",
      },
      {
        t: 'Record and prove consent',
        d: "Store per visitor: timestamp, banner version, granular choices, and an identifier. Your CMP logs this automatically; the 'I can prove what this user chose' log is what regulators and B2B security reviews actually ask for. Keep the banner version number so a policy change is traceable to which consent applies.",
      },
      {
        t: "Keep it true — rescan on every change",
        d: "Re-scan before each marketing change and quarterly. Add a policy entry when you add Hotjar/Meta/GA4; remove dead trackers; bump the version, and if the change is substantive, get fresh consent. Re-check Duda's 'Enable cookie tracking' switch for sites where you don't want residual platform analytics sending EU traffic anywhere.",
      },
    ],
    tools: [
      {
        group: 'Website-builder path (Duda & friends)',
        items: [
          { name: 'Duda built-in', note: 'Settings → Privacy Settings: cookie-notification toggle, privacy-page template, disable tracking cookies, GDPR-friendly contact forms.' },
          { name: 'Duda App Store CMPs', note: 'App Store → Privacy and Compliance: Termly, Springtime CMP, Usercentrics (free tier, Consent Mode, scanner + auto-generated cookie policy).' },
          { name: 'Google Analytics consent wiring', note: "Set up the Usercentrics app from Duda, enable 'Google Consent Mode' in Consent Settings, save and republish." },
          { name: 'Wix / Squarespace', note: 'Built-in cookie banners; Wix also ships a policy generator. Fine for single-page sites with no marketing pixels.' },
          { name: 'WordPress / Webflow / custom', note: 'CookieYes, Complianz, Termly plug-ins on WP; embed snippets + GTM Consent Mode anywhere.' },
          { name: 'Shopify', note: 'Consent management apps in the store for EU/UK traffic; category table updates automatically.' },
        ],
      },
      {
        group: 'Dedicated consent platforms (CMPs)',
        items: [
          { name: 'Cookiebot / Usercentrics', note: 'Scanner, auto-categorization, free tier to ~100 pages/domains, Consent Mode integration.' },
          { name: 'Osano', note: 'Consent + cookie scans + privacy-policy generator, strong for US/CCPA workflows.' },
          { name: 'OneTrust', note: 'Enterprise-grade consent + policy life-cycle; overkill until you have serious volume but the market benchmark.' },
          { name: 'Iubenda / Termly / Axeptio', note: 'Cheap generators + banner; Iubenda has solid generator quality, Axeptio strong EU UX.' },
          { name: 'Google CMP Partner Program', note: 'Certified list of CMPs that wire correctly into Consent Mode / AdSense / Ad Manager.' },
        ],
      },
    ],
    mistakes: [
      'A banner with no pre-consent blocking — non-essential tags still fire before the visitor chooses.',
      '"Consent by scrolling / continuing to browse" — dead since the Planet49 and IAB rulings; needs an explicit act.',
      'A cookie wall with no non-advertising alternative and a hard "Reject" buried in a second layer.',
      'Parking analytics/marketing cookies under "strictly necessary" to dodge the banner.',
      'Cookie table that lists a generator\u2019s template cookies but omits your real GA4/Meta/Hotjar tags (and vice versa).',
      'No withdrawal path: consent is only valid if refusal/withdrawal is as easy as acceptance (Art. 7(3)).',
      'Ignoring GPC / opt-out signals for CCPA traffic while only catering to EU-style opt-in.',
      'Never re-scanning — every new pixel changes the policy, and stale policies are how enforcement opens the door.',
    ],
    lean: "Start with Duda's built-in cookie notification + disable site tracking; add the free Usercentrics app once you have analytics or marketing pixels — that buys real consent, Consent Mode, and consent logging for €0. You only need a full enterprise CMP (OneTrust/osano) when you run dozens of tags at high EU volume or a customer audit demands it.",
    links: [
      { label: 'Duda — GDPR compliance tools', url: 'https://support.duda.co/hc/en-us/articles/26519478203287-What-GDPR-Compliance-Tools-Does-Duda-Offer' },
      { label: 'Duda — Privacy Settings', url: 'https://support.duda.co/hc/en-us/articles/26519925521431-Privacy-Settings' },
      { label: 'Set up consent in Duda (Google)', url: 'https://support.google.com/analytics/answer/14563388' },
      { label: 'CNIL — cookies guideline', url: 'https://www.cnil.fr/en/cookies-and-other-tracking-devices-cnil-publishes-new-guidelines' },
    ],
  },
  dpia: {
    key: 'dpia',
    label: 'DPIA — Impact Assessment',
    icon: FileSearch,
    tagline: TAGLINES.dpia,
    steps: [
      {
        t: 'Run the trigger screen and write it down',
        d: "GDPR: EDPB WP248's 9 criteria (evaluation/scoring, automated decisions with legal effect, systematic monitoring, sensitive/special categories, data matching, large-scale, datasets, innovative tech, exclusion/denial of service). ICO/CNIL publish the same threshold tests; LGPD, PIPL, and the draft DPDP Rules list their own triggers (high risk, sensitive data, automated decisions, cross-border transfers). If you conclude no DPIA is needed, write a dated one-liner and keep it — regulators accept a documented screening decision. Real startup triggers: cookie pixels on a health site, SDKs handling precise location, or sending employee rarely-on-approved basis data abroad.",
      },
      {
        t: 'Describe the processing systematically — Art. 35(7)(a)',
        d: "A data-flow diagram or table: what data, from whom, at which moment, where it's stored (region + cloud), who receives it (processors and recipients in third countries), how long it's kept, who can access it, and the lawful basis. Seed it from the ROPA row for that activity — the two documents are siblings, not separate universes.",
      },
      {
        t: 'Record consultation — Art. 35(9)',
        d: "Evidence you asked DPO/engineering/security/legal (and, where required, listened). No DPO? Record who performs the accountability role and consult them formally. Consultation shows the DPIA wasn't a rubber stamp and is a nine-line ask when enforcement calls.",
      },
      {
        t: 'Necessity & proportionality — Art. 35(7)(b)',
        d: "Purpose → lawful basis → what you collect is the minimum for that purpose. Write what would break if you dropped half the fields; document why less-invasive alternatives (on-device processing, hashing, consent-based telemetry, aggregate-only analytics) aren't sufficient. Align with data-minimization and storage-limitation so the answer to 'why this much' is an argument, not a shrug.",
      },
      {
        t: 'Assess risks to individuals — Art. 35(7)(c)',
        d: "Model threats per data flow: re-identification (even pseudonymized), unlawful access/exfiltration, loss or destruction, misuse or abuse, excessive retention leaking over time, profiling/exclusion outcomes. Rate each likelihood × severity (low / medium / high). Feed your breach register and prior incidents into the likelihood — honest probability beats optimistic vibes in every audit.",
      },
      {
        t: 'Choose measures and map them — Art. 35(7)(d)',
        d: "Risk → measure, explicitly: pseudonymization (hashed/cached IDs usable but not reversible at rest), encryption at rest/in transit, access control + MFA, retention & deletion jobs, DPAs/SCCs with every recipient, transfer impact assessments, staff training, the breach runbook, and a way to prove control health (logs, dashboards). Blanket 'we have encryption' without mapping it to a specific risk is exactly what examiners mark down.",
      },
      {
        t: 'Rate residual risk, then sign — or consult',
        d: "Low/medium → owner + management sign the versioned doc. High residual risk → GDPR Art. 36 (and equivalents) requires you to consult the supervisory authority BEFORE starting: hand them the same package plus your residual-risk rationale and their feedback record. Never 'start now, submit later' — retro-consultation is itself a violation.",
      },
      {
        t: 'Keep it alive',
        d: "Review annually and on any material change: new data type, new vendor, scope expansion, known incident, new regulation. Keep version history + sign-off trail — enforcement and B2B security questionnaires treat 'show the DPIA history' as proof the program is real.",
      },
    ],
    tools: [
      {
        group: 'Regulator templates (free, the gold standard)',
        items: [
          { name: 'ICO DPIA worksheets', note: 'The de-facto template: screening questions, 35(7) sections, sign-off — download and fill.' },
          { name: 'CNIL PIA software + knowledge base', note: 'Free offline tool that structures the whole flow and generates the report; also has the PIA walkthrough guide.' },
          { name: 'EDPB WP248', note: 'The 9 criteria + worked examples for deciding "when is a DPIA required".' },
          { name: 'DPC (Ireland) / state DPA templates', note: 'Harmonized with WP248; useful when your lead authority is one of these.' },
        ],
      },
      {
        group: 'SaaS & workflows',
        items: [
          { name: 'OneTrust DPIA module', note: 'Automates screening, workflows, sign-off, and Art. 36 consultation records.' },
          { name: 'TrustArc / Tugboat Logic', note: 'Template libraries + workflow for assessments; strong for SOC-style evidence trails.' },
          { name: 'Vanta / Drata DPIA workflows', note: 'Compliance platforms with built-in assessment templates if you already run their stack.' },
          { name: 'Notion / Airtable + CNIL tool', note: 'Totally fine: track screen results in a table, run CNIL PIA offline, store sign-offs linked to your ROPA.' },
        ],
      },
    ],
    mistakes: [
      'Skipping the screening step and forgetting to document the "not required" decision.',
      'Copying a template with someone else\u2019s data flows — the audit is answered by your reality, and any gap is a red flag.',
      'Scoping too wide (a 40-flow DPIA you abandon) or too narrow (a one-liner hiding the real risk).',
      'No consultation record — it\u2019s a required Art. 35(9) step, not a nice-to-have.',
      'Ignoring high residual risk instead of doing the Art. 36 consultation before processing.',
      'A one-and-done PDF: no versioning, no review trigger, no sign-off trail.',
      "Treating the DPIA as evidence you're 'safe' instead of the analysis that decides whether you should process at all.",
    ],
    lean: "Use the free CNIL PIA tool or ICO worksheet, seed it from the ROPA row, and spend one afternoon per high-risk flow. Sign off in Notion with a version history. Only bring in OneTrust/Vanta DPIA automation when a customer audit explicitly requires a named tool.",
    links: [
      { label: 'ICO — DPIA worksheets', url: 'https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/data-protection-impact-assessments-dpias/data-protection-impact-assessments-dpias/' },
      { label: 'CNIL — PIA software', url: 'https://www.cnil.fr/en/pia-software-database' },
      { label: 'EDPB — WP248 DPIA guidelines', url: 'https://www.edpb.europa.eu/our-work-tools/our-documents/guidelines/guidelines-data-protection-impact-assessment-dpia-and_en' },
    ],
  },
  ropa: {
    key: 'ropa',
    label: 'ROPA — Processing Register',
    icon: Database,
    tagline: TAGLINES.ropa,
    steps: [
      {
        t: 'Scope the register (controller AND processor sides)',
        d: "Every system or process that touches personal data: CRM/marketing (HubSpot, Klaviyo, Mailchimp), support (Zendesk, Intercom), analytics (GA4, Mixpanel), product telemetry, HR (payroll, BGV, expense tools), server/app logs, backups, dev and test copies, cloud storage, form submissions (including Duda contact forms storing visitor data), and the cookie/tracking stack. Your vendor inventory and cloud asset inventory are the seed list. If you act as a processor for any client, that process gets its own record per Art. 30(2).",
      },
      {
        t: 'Pick your tool',
        d: "Start free: the ICO ROPA template (spreadsheet with the exact columns), or Airtable/Sheets/Notion. Level up: OneTrust, Ploito, Prediq, Seers, Securiti. For automated discovery, DSPM tools (BigID, Cyera, Securiti) auto-inventory stores and label data, while cloud-native tools (AWS Config, Azure Resource Graph, GCP Asset Inventory) find every bucket/database that could hold PII. Automation finds the flow you forgot; the template holds the fields.",
      },
      {
        t: 'Run interviews + discovery desk-by-desk',
        d: "One owner per activity. If you can't interview everyone, seed from the SaaS list and fill the obvious flows yourself: email attachments and exports, Jira/Excel dumps of customer data, support chats, form entries, and 'temporary' CSVs shared internally. These undeclared flows are where a ROPA fails its only real test.",
      },
      {
        t: 'Fill every row with the Art. 30 fields',
        d: "Controller/processor identity + DPO contact; purpose(s); categories of data subjects; categories of personal data (flag special categories); categories of recipients (and DPA status); transfers outside the country + safeguard used (SCCs, adequacy, BCRs); retention limits per data type; and a description of security measures. For the processor record, add the controller you act for and the process you operate.",
      },
      {
        t: 'Wire the maintenance loop',
        d: "New vendor, new feature, or new market = a new row (gate it into procurement approval so 'add to ROPA' is a checkbox, not a resolution). Review quarterly with owners; keep a change log / version history; assign an owner per row so nothing goes stale. Stale rows are worse than missing rows — they lie in an audit.",
      },
      {
        t: 'Make it a working artifact, not a corpse',
        d: "Use the ROPA to answer: regulators (Art. 58 information requests), DSAR search scoping, breach impact (what was in that database?), CISO/customer questionnaires, and annual reviews. It also feeds the DPIA trigger screen — one current register buys you five workflows. Upgrade to OneTrust/Ploito only when you exceed ~50 activities or a customer mandates a specific tool.",
      },
    ],
    tools: [
      {
        group: 'Templates (free)',
        items: [
          { name: 'ICO ROPA template', note: 'Official spreadsheet with Art. 30 controller+processor sheets — the fastest compliant start.' },
          { name: 'Sheet / Airtable / Notion', note: 'Column-per-field approach; easy sharing and a change log if you enable history.' },
        ],
      },
      {
        group: 'Software',
        items: [
          { name: 'OneTrust Data Mapping', note: 'Enterprise register with automatic gap reports; overkill early, the benchmark later.' },
          { name: 'Ploito / Prediq / Seers', note: 'Affordable dedicated ROPA tools that structure storage, transfers and reviews.' },
          { name: 'BigID / Cyera / Securiti (DSPM)', note: 'Auto-discover stores and classify PII across clouds — closes the shadow-IT hole in the register.' },
          { name: 'Cloud-native asset inventory', note: 'AWS Config, Azure Resource Graph, GCP Asset Inventory — prove every store is in the register.' },
        ],
      },
    ],
    mistakes: [
      'A register that\u2019s a completed PDF nobody updates — dead weight that fails the first real request.',
      'Missing the transfers column (country + safeguard). That\u2019s the row enforcers read first.',
      'No retention values per data type — a ROPA without deletion answers nothing.',
      'Forgetting the processor-side record for client data you handle.',
      'New vendors onboarded without a ROPA row (shadow IT silently expands the register\u2019s gap).',
      'Per-team orphan spreadsheets that never reconcile with the master view.',
      'No owner per row, so no one notices the stale entries until an audit does.',
    ],
    lean: "One shared sheet, 15-20 rows seeded from your vendor inventory, one owner, and a 30-minute quarterly refresh. Add automated DSPM discovery once you have >50 flows or multi-cloud sprawl; move to OneTrust/Ploito only when a customer insists.",
    links: [
      { label: 'ICO — records of processing activities', url: 'https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/accountability-and-governance/guide-to-accountability-and-governance/records-of-processing-activities/' },
    ],
  },
};

const DEFAULT_DOC_IDS = ['Privacy Notice', 'Cookie Policy & consent records', 'DPIA / impact assessment pack', 'Processing register (ROPA)', 'DSAR workflow', 'Breach notification register'];

function PillarTabs({ active, onChange, hex }) {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {Object.values(PILLARS).map((p) => {
        const Icon = p.icon;
        const isActive = active === p.key;
        return (
          <button
            key={p.key}
            onClick={() => onChange(p.key)}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition ${isActive ? 'text-white shadow-sm' : 'text-gray-600 bg-gray-50 border border-gray-200 hover:bg-gray-100'}`}
            style={isActive ? { background: hex } : undefined}
          >
            <Icon className="w-4 h-4" />
            {p.label}
          </button>
        );
      })}
      <button
        onClick={() => onChange('pack')}
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition ${active === 'pack' ? 'text-white shadow-sm' : 'text-gray-600 bg-gray-50 border border-gray-200 hover:bg-gray-100'}`}
        style={active === 'pack' ? { background: hex } : undefined}
      >
        <ListChecks className="w-4 h-4" />
        Document pack
      </button>
    </div>
  );
}

function LegalHook({ text }) {
  return (
    <div className="rounded-xl bg-amber-50 border border-amber-100 p-4 mb-5">
      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-700 uppercase tracking-wide"><ShieldCheck className="w-3.5 h-3.5" /> Why it matters for this framework</span>
      <p className="text-sm text-gray-700 mt-1.5 leading-relaxed">{text}</p>
    </div>
  );
}

function Steps({ steps }) {
  return (
    <div className="space-y-3">
      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1"><FileSearch className="w-3.5 h-3.5" /> How to do it, in depth</span>
      {steps.map((s, i) => (
        <div key={i} className="rounded-xl border border-gray-100 bg-white p-4">
          <p className="font-semibold text-gray-900 text-sm flex items-start gap-2">
            <span className="w-6 h-6 rounded-full bg-slate-800 text-white text-xs flex items-center justify-center font-bold shrink-0 mt-0.5">{i + 1}</span>
            {s.t}
          </p>
          <p className="text-sm text-gray-600 mt-1.5 ml-8 leading-relaxed">{s.d}</p>
        </div>
      ))}
    </div>
  );
}

function ToolsGrid({ tools }) {
  return (
    <div className="mt-6">
      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3"><Wrench className="w-3.5 h-3.5" /> Tools that make it real</span>
      <div className="space-y-4">
        {tools.map((g) => (
          <div key={g.group}>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">{g.group}</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {g.items.map((item) => (
                <div key={item.name} className="rounded-xl border border-gray-100 bg-gray-50 p-3">
                  <p className="text-sm font-semibold text-gray-800">{item.name}</p>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">{item.note}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Mistakes({ mistakes }) {
  return (
    <div className="mt-6">
      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-500 uppercase tracking-wide mb-3"><AlertTriangle className="w-3.5 h-3.5" /> Common mistakes to avoid</span>
      <ul className="space-y-2">
        {mistakes.map((m, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-gray-700 rounded-lg bg-red-50 border border-red-100 p-3">
            <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <span className="leading-relaxed">{m}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function LeanPath({ text }) {
  return (
    <div className="mt-6 rounded-xl bg-green-50 border border-green-100 p-4">
      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-green-700 uppercase tracking-wide"><Lightbulb className="w-3.5 h-3.5" /> The lean way</span>
      <p className="text-sm text-gray-700 mt-1.5 leading-relaxed">{text}</p>
    </div>
  );
}

function DocLinks({ links }) {
  if (!links || links.length === 0) return null;
  return (
    <div className="mt-6 flex flex-wrap gap-2">
      {links.map((l) => (
        <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-medium text-[#7c3aed] hover:text-[#5b21b6] underline underline-offset-2">
          <ExternalLink className="w-3.5 h-3.5" />
          {l.label}
        </a>
      ))}
    </div>
  );
}

function DocPack({ docIds, colors }) {
  const storageKey = `${CHECKLIST_KEY_PREFIX}${colors && colors.hex ? colors.hex : 'default'}`;
  const [checked, setChecked] = useState({});

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) setChecked(JSON.parse(saved));
    } catch (e) { console.error('Failed to parse privacy docs checklist:', e); }
  }, [storageKey]);

  const toggle = (i) => {
    setChecked((prev) => {
      const next = { ...prev };
      if (next[i]) delete next[i]; else next[i] = true;
      try { localStorage.setItem(storageKey, JSON.stringify(next)); } catch (e) { console.error('Failed to save privacy docs:', e); }
      return next;
    });
  };

  const doneCount = Object.values(checked).filter(Boolean).length;
  const pct = Math.round((doneCount / docIds.length) * 100);

  return (
    <div>
      <LegalHook text="This framework also relies on a wider document set. Most are cheap to produce from the artifacts above (cookie policy → privacy notice; DPIA/ROPA → breach and DSAR routines). Tick them off as you ship each one — progress is saved in your browser so it doubles as a working punch-list." />
      <div className="flex items-center justify-between mb-4">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wide"><ListChecks className="w-3.5 h-3.5" /> Supporting documents & procedures</span>
        <span className="text-xs font-semibold text-gray-500">{doneCount}/{docIds.length} ({pct}%)</span>
      </div>
      <div className="grid sm:grid-cols-2 gap-2">
        {docIds.map((d, i) => (
          <button
            key={i}
            onClick={() => toggle(i)}
            className={`flex items-start gap-3 rounded-xl border p-3 text-left transition ${checked[i] ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200 hover:border-gray-300'}`}
          >
            {checked[i] ? (
              <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
            ) : (
              <span className="w-5 h-5 rounded-full border-2 border-gray-300 shrink-0 mt-0.5" />
            )}
            <span className={`text-sm ${checked[i] ? 'text-gray-500 line-through' : 'text-gray-800'}`}>{d}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default function PrivacyDocuments({ framework, colors }) {
  const [tab, setTab] = useState('cookie');
  if (!PRIVACY_DOC_IDS.includes(framework.id)) return null;

  const notes = PRIVACY_DOC_NOTES[framework.id] || FALLBACK_NOTE;
  const c = colors || { border: 'border-gray-200', bg: 'bg-slate-800', hex: '#334155' };
  const pillar = PILLARS[tab];
  const Icon = pillar ? pillar.icon : ListChecks;
  const docIds = Array.isArray(notes.docs) && notes.docs.length ? notes.docs : DEFAULT_DOC_IDS;

  return (
    <div className={`bg-white rounded-2xl border ${c.border} p-6 mb-8`} id="privacy-documents">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
        <div className="flex items-center gap-3">
          <span className={`w-11 h-11 rounded-xl flex items-center justify-center ${c.bg} text-white shrink-0`}>
            <FileText className="w-6 h-6" />
          </span>
          <div>
            <h2 className="text-xl font-bold text-gray-900 leading-tight">Privacy Policies & Documents</h2>
            <p className="text-sm text-gray-500 mt-0.5">
              The three documents every privacy program is judged on — cookie policy & consent, DPIA, and ROPA — explained in depth with the tools (including website builders like Duda) that make them realistic for a startup.
            </p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border shrink-0 self-start sm:self-center bg-green-50 text-green-700 border-green-200">
          <CheckCircle2 className="w-3.5 h-3.5" />
          Applicable to {framework.name}
        </span>
      </div>

      <PillarTabs active={tab} onChange={setTab} hex={c.hex} />

      {tab === 'pack' ? (
        <DocPack docIds={docIds} colors={colors} />
      ) : (
        <div>
          <LegalHook text={notes[tab]} />
          <p className="text-sm text-gray-600 mb-5 leading-relaxed">{pillar.tagline}</p>
          <Steps steps={pillar.steps} />
          <ToolsGrid tools={pillar.tools} />
          <Mistakes mistakes={pillar.mistakes} />
          <LeanPath text={pillar.lean} />
          <DocLinks links={pillar.links} />
        </div>
      )}

      <div className="mt-8 pt-4 border-t border-gray-100 text-xs text-gray-400">
        Guidance is educational and framework-aware, not legal advice — have a qualified lawyer review the final documents for your specific processing.
      </div>
    </div>
  );
}