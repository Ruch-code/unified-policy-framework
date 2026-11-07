// Helpers over controlDomains.json. All editable data (domains, colours, catalogue, safeguard rules) lives in the JSON.
import DATA from './controlDomains.json';

export const HELP_TEXT = DATA.helpText;
export const DOMAINS = DATA.domains;
export const CONTROLS = DATA.controls;
export const DOMAIN_BY_CODE = Object.fromEntries(DOMAINS.map((d) => [d.code, d]));
export const CONTROL_BY_ID = Object.fromEntries(CONTROLS.map((c) => [c.id, c]));
export const FRAMEWORK_ORDER = ['SOC 2', 'HIPAA', 'ISO 27001', 'ISO 42001', 'Cross-framework'];

export const domainCount = (code) => CONTROLS.filter((c) => c.domain === code).length;
/** Domains shown in filters and pickers: hide catalogue domains with no controls (EMB, WEB). */
export const VISIBLE_DOMAINS = DOMAINS.filter((d) => !d.hiddenWhenEmpty || domainCount(d.code) > 0);

/** CSS custom properties for every domain, light and dark. Injected once by DomainTokens. */
export function domainTokenCss() {
  const block = (theme) => DOMAINS.map((d) => {
    const c = d.colors[theme];
    return `--dom-${d.code}-bg:${c.bg};--dom-${d.code}-fg:${c.fg};--dom-${d.code}-bd:${c.border};`;
  }).join('');
  const dark = block('dark');
  // The site switches themes with a "dark" class on <html>, so follow that rather than the OS setting.
  return `:root{${block('light')}}:root.dark,:root[data-theme="dark"]{${dark}}`;
}

/** HIPAA safeguard category from a 45 CFR citation such as "164.312(a)(2)(iii)". */
export function hipaaSafeguard(citation) {
  const m = String(citation || '').match(/164\.(\d{3})/);
  if (!m) return null;
  const sec = `164.${m[1]}`;
  const n = Number(m[1]);
  for (const r of DATA.hipaaSafeguards) {
    if (r.match && r.match === sec) return r.category;
    if (r.range && n >= r.range[0] && n <= r.range[1]) return r.category;
  }
  return null;
}

// ---------- Matching site cards to catalogue controls ----------

const norm = (s) => String(s || '').replace(/\s+/g, '');

/** Pull ISO clause and Annex A references out of free text. Returns catalogue citation prefixes. */
function isoRefs(text) {
  const refs = [];
  const t = String(text || '');
  for (const m of t.matchAll(/\bA\.?\s?(\d{1,2}\.\d{1,2}(?:\.\d{1,2})?)\b/g)) refs.push(`A.${m[1]}`);
  for (const m of t.matchAll(/\bClauses?\s+((?:\d{1,2}(?:\.\d{1,2}){0,3}[a-z]?)(?:\s*(?:,|and|&)\s*\d{1,2}(?:\.\d{1,2}){0,3}[a-z]?)*)/gi)) {
    for (const n of m[1].split(/\s*(?:,|and|&)\s*/i)) refs.push(`C.${n.replace(/[a-z]$/i, '')}`);
  }
  return refs;
}

function hipaaRefs(text) {
  return [...String(text || '').matchAll(/164\.\d{3}(?:\([a-z0-9]+\))*/gi)].map((m) => m[0]);
}

function soc2Refs(text) {
  return [...String(text || '').matchAll(/\b(CC\d\.\d{1,2}|A1\.\d|C1\.\d|PI1\.\d|P\d\.\d)\b/g)].map((m) => m[1]);
}

const startsAt = (cit, ref) => cit === ref || cit.startsWith(`${ref}.`) || cit.startsWith(`${ref}(`);

/** Catalogue controls for one framework whose citation matches any reference. HIPAA also matches parents. */
export function controlsForRefs(framework, refs) {
  const out = new Map();
  const pool = CONTROLS.filter((c) => c.framework === framework);
  for (const raw of refs) {
    const ref = norm(raw);
    let hits = pool.filter((c) => startsAt(norm(c.citation), ref));
    if (!hits.length && framework === 'HIPAA') {
      // Walk up the paragraph tree: 164.308(a)(1)(ii)(A) -> 164.308(a)(1)(ii) -> ...
      let r = ref;
      while (!hits.length && /\)$/.test(r)) { r = r.replace(/\([^()]*\)$/, ''); hits = pool.filter((c) => norm(c.citation) === r); }
    }
    hits.forEach((c) => out.set(c.id, c));
  }
  return [...out.values()];
}

// Keyword fallback for cards with no catalogue citation. Results are marked "guessed".
const GUESS = [
  [/certif|17021|audit|nonconform|corrective/i, 'CPL'],
  [/risk/i, 'RSK'],
  [/incident|breach/i, 'IRO'],
  [/vendor|supplier|third.party|business associate|baa\b/i, 'TPM'],
  [/access|identity|authenticat|mfa|password/i, 'IAC'],
  [/encrypt|crypto|key management/i, 'CRY'],
  [/train|awareness/i, 'SAT'],
  [/backup|continuity|disaster|contingen/i, 'BCD'],
  [/log|monitor/i, 'MON'],
  [/vulnerab|patch|pen(etration)? test/i, 'VPM'],
  [/change|release|deploy/i, 'CHG'],
  [/asset|inventory/i, 'AST'],
  [/privacy|personal data|consent|phi\b/i, 'PRI'],
  [/network|firewall/i, 'NET'],
  [/physical|facility/i, 'PES'],
  [/develop|sdlc|code/i, 'TDA'],
  [/data|classif|retention/i, 'DCH'],
  [/polic|governance|management review|leadership|scope|annex a|best practice/i, 'GOV'],
];

/**
 * Domains for a task card. Returns { domains: [{code, controls}], guessed, safeguards }.
 * framework: 'ISO 27001' | 'ISO 42001' | 'HIPAA' | 'SOC 2' | null (null = keyword guess only).
 */
export function resolveTaskDomains(task, framework) {
  if (!task || typeof task !== 'object') return { domains: [], guessed: false, safeguards: [] };
  if (Array.isArray(task.domainOverride)) return { domains: task.domainOverride.map((code) => ({ code, controls: [] })), guessed: false, safeguards: [] };
  const text = [task.control, task.title, task.alsoMapsTo, task.citation && (task.citation.ref || task.citation.section || (task.citation.sections || []).join(' '))].filter(Boolean).join(' ');
  let refs = [];
  if (framework === 'ISO 27001' || framework === 'ISO 42001') refs = isoRefs(text);
  else if (framework === 'HIPAA') refs = hipaaRefs(text);
  else if (framework === 'SOC 2') refs = soc2Refs(text);
  const controls = framework ? controlsForRefs(framework, refs) : [];
  const safeguards = framework === 'HIPAA' ? [...new Set(refs.map(hipaaSafeguard).filter(Boolean))] : [];
  if (controls.length) {
    const by = new Map();
    controls.forEach((c) => { if (!by.has(c.domain)) by.set(c.domain, []); by.get(c.domain).push(c); });
    const domains = [...by.entries()].map(([code, cs]) => ({ code, controls: cs })).sort((a, b) => b.controls.length - a.controls.length);
    return { domains, guessed: false, safeguards };
  }
  const hay = `${task.title || ''} ${task.control || ''}`;
  const g = GUESS.find(([re]) => re.test(hay));
  return { domains: g ? [{ code: g[1], controls: [] }] : [], guessed: !!g, safeguards };
}
