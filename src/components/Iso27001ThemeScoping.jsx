import { useState } from 'react';
import { Building2, Users, DoorClosed, Cpu, Info, CheckCircle2, MinusCircle, AlertTriangle } from 'lucide-react';

/*
 * ISO/IEC 27001:2022 scoping by Annex A theme (Organizational, People, Physical, Technological),
 * driven by three choices: work model, device model and company size.
 * Control numbers and titles follow ISO/IEC 27001:2022 Annex A.
 */

const WORK = [
  { id: 'remote', label: 'Fully remote', hint: 'No company office. People work from home or anywhere.' },
  { id: 'hybrid', label: 'Hybrid', hint: 'An office exists, people split time between office and home.' },
  { id: 'office', label: 'Office-based', hint: 'Most work happens in company-controlled premises.' },
];
const DEVICE = [
  { id: 'corporate', label: 'Corporate-provided', hint: 'Company buys, owns and manages every laptop and phone.' },
  { id: 'byod', label: 'BYOD', hint: 'People use their own devices for work.' },
  { id: 'mixed', label: 'Mixed', hint: 'Corporate laptops, personal phones (or a contractor BYOD pool).' },
];
const SIZE = [
  { id: 'small', label: 'Small (1 to 50)', hint: 'Startup, one entity, usually cloud only.' },
  { id: 'medium', label: 'Medium (51 to 500)', hint: 'Several teams, maybe 2+ offices, separate IT function.' },
  { id: 'large', label: 'Large (500+)', hint: 'Multiple entities or sites, phased scope, formal governance.' },
];

const STATUS = {
  in: { label: 'In scope', cls: 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800', Icon: CheckCircle2 },
  focus: { label: 'Key focus', cls: 'bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800', Icon: AlertTriangle },
  reduced: { label: 'Reduced / justify', cls: 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-700 dark:text-slate-200 dark:border-slate-600', Icon: MinusCircle },
};

function organizational(w, d, s) {
  const items = [
    { c: 'A.5.1, A.5.37', st: 'in', t: 'Policies and documented procedures', n: s === 'small' ? 'A short policy set (often 10 to 15 documents) is enough. Avoid copying an enterprise policy library you cannot operate.' : s === 'medium' ? 'Topic-specific policies per function, with named owners in IT, HR and engineering.' : 'Group policies must be formally adopted by each in-scope entity. Keep an adoption record per entity.' },
    { c: 'A.5.9, A.5.10', st: 'in', t: 'Asset inventory and acceptable use', n: d === 'byod' ? 'Inventory the data and accounts on personal devices, not the devices themselves. Acceptable use must say what is allowed on a personal device.' : d === 'mixed' ? 'Corporate laptops go in the asset register. Personal phones are recorded by enrolment in MDM or MAM, not by ownership.' : 'Every laptop and phone goes in the asset register with an owner, linked to your MDM.' },
    { c: 'A.5.15, A.5.18', st: 'in', t: 'Access control and access rights', n: s === 'large' ? 'Role-based access with periodic reviews per entity. Joiner, mover, leaver flows usually span HR systems in several regions.' : 'Central identity provider with SSO and quarterly access reviews covers most of this.' },
    { c: 'A.5.19, A.5.21, A.5.23', st: w === 'remote' ? 'focus' : 'in', t: 'Suppliers, ICT supply chain and cloud services', n: w === 'remote' ? 'Remote, cloud-first companies depend almost entirely on SaaS and cloud. The supplier register and cloud shared responsibility mapping carry much of the ISMS.' : 'Include facilities suppliers (landlord, cleaning, security guards) as well as IT and cloud suppliers.' },
    { c: 'A.5.24, A.5.29, A.5.30', st: 'in', t: 'Incidents and continuity', n: w === 'remote' ? 'Continuity is about loss of a cloud region, identity provider or key SaaS, not a building.' : w === 'hybrid' ? 'Plan for both: office unavailable (people work from home) and key cloud services unavailable.' : 'Office loss scenarios matter more. Test that people can work remotely if the site is closed.' },
    { c: 'A.5.31, A.5.34', st: 'in', t: 'Legal, regulatory and privacy', n: w === 'remote' ? 'Remote staff in other countries can bring local employment and data protection laws into scope. List each country where people work.' : 'List the jurisdictions of each office, entity and data location.' },
  ];
  return items;
}

function people(w, d, s) {
  return [
    { c: 'A.6.1, A.6.2, A.6.6', st: 'in', t: 'Screening, employment terms and NDAs', n: 'Always in scope. Cover employees and contractors. ' + (w === 'remote' ? 'For international remote hires, screening must follow each country\'s law, so document what is checked where.' : 'Keep screening proportionate to role risk and record it.') },
    { c: 'A.6.3', st: 'in', t: 'Awareness and training', n: (w !== 'office' ? 'Add remote working topics: home network, shoulder surfing in public places, phishing by chat and SMS. ' : '') + (d !== 'corporate' ? 'Train people on what the company can and cannot see on personal devices.' : 'Include secure handling of company devices when travelling.') },
    { c: 'A.6.4, A.6.5', st: 'in', t: 'Disciplinary process and leavers', n: d === 'corporate' ? 'Leaver process covers device return and account removal.' : 'Leaver process must selectively wipe company data from personal devices, since you cannot recover the device.' },
    { c: 'A.6.7', st: w === 'office' ? 'reduced' : 'focus', t: 'Remote working', n: w === 'office' ? 'Still applicable for occasional home working and travel, but lighter. A short remote working section in the policy is usually enough.' : w === 'hybrid' ? 'A core control. Define rules for home working, public spaces and travel, and which tasks must be done from the office (if any).' : 'One of the most important controls. Your remote working policy effectively replaces office physical security.' },
    { c: 'A.6.8', st: 'in', t: 'Event reporting', n: 'People need a simple way to report lost devices, suspicious messages and mistakes. ' + (w === 'remote' ? 'Use chat or a form, since there is no office to walk into.' : 'Make it work outside office hours too.') },
  ];
}

function physical(w, d, s) {
  const remote = w === 'remote';
  const office = w === 'office';
  return [
    { c: 'A.7.1, A.7.2, A.7.3, A.7.4', st: remote ? 'reduced' : 'in', t: 'Perimeters, entry, securing offices, monitoring', n: remote ? 'With no company office these are often marked not applicable. Justify it in the SoA (no premises under company control) and show that cloud providers cover their data centres through A.5.23 and their certifications.' : s === 'large' ? 'In scope for every site in the scope. The certification body will sample sites, so keep a complete site list with headcount.' : (w === 'hybrid' ? 'In scope for the office. In shared or co-working space, record what the landlord controls and what you control.' : 'Fully in scope: badges, visitor logs, CCTV or alarm as risk requires.') },
    { c: 'A.7.5, A.7.11, A.7.12', st: s === 'large' && office ? 'in' : 'reduced', t: 'Environmental threats, utilities, cabling', n: s === 'large' && office ? 'In scope where you run server rooms or on-premises equipment. Covers power, cooling, fire and cabling.' : 'If production is fully in the cloud, these mostly rely on the cloud provider. Keep what applies to an office comms cabinet, if any.' },
    { c: 'A.7.7', st: remote ? 'focus' : 'in', t: 'Clear desk and clear screen', n: remote ? 'Applies at home: screen lock, no printed customer data, care in shared homes and cafes.' : 'Applies in the office and at home for hybrid staff.' },
    { c: 'A.7.8, A.7.13', st: office ? 'in' : 'reduced', t: 'Equipment siting and maintenance', n: office ? 'Applies to office equipment such as printers, network kit and meeting room screens.' : 'Mostly limited to laptops. Maintenance is handled by vendor warranty and MDM health checks.' },
    { c: 'A.7.9', st: w === 'office' ? 'in' : 'focus', t: 'Security of assets off-premises', n: d === 'byod' ? 'Covers company data on personal devices outside the office. Rely on MAM containers, encryption and remote wipe of company data.' : 'Covers company laptops at home and while travelling: encryption, screen lock, no leaving devices in cars.' },
    { c: 'A.7.10, A.7.14', st: 'in', t: 'Storage media and secure disposal', n: d === 'corporate' ? 'Wipe and certify disposal of every returned or retired device.' : d === 'byod' ? 'You cannot dispose of a personal device. Show a selective wipe of company data at leaving and block USB storage where possible.' : 'Corporate laptops are wiped and certified. Personal phones get a selective wipe of company apps and data.' },
  ];
}

function technological(w, d, s) {
  return [
    { c: 'A.8.1', st: 'focus', t: 'User endpoint devices', n: d === 'corporate' ? 'Full device management (MDM): disk encryption, OS patching, screen lock, EDR, remote wipe. Strongest and simplest to evidence.' : d === 'byod' ? 'Use app-level management (MAM) or a work profile, conditional access that blocks unmanaged or outdated devices, and no local copies of sensitive data. Privacy limits apply, so state what the company cannot see.' : 'Two tiers: full MDM for corporate laptops, MAM or work profile for personal phones. Conditional access decides which tier can reach which data.' },
    { c: 'A.8.2, A.8.5', st: 'in', t: 'Privileged access and authentication', n: 'MFA for everyone, phishing-resistant MFA for admins. ' + (s === 'large' ? 'Use a PAM tool and just-in-time admin access.' : 'Keep the number of admins small and review them quarterly.') },
    { c: 'A.8.7, A.8.9', st: 'in', t: 'Malware protection and configuration', n: d === 'byod' ? 'You may not be able to install EDR on personal devices. Compensate with browser isolation or virtual desktops for sensitive work.' : 'Standard baseline configuration enforced by MDM, with EDR on all managed endpoints.' },
    { c: 'A.8.12', st: d === 'corporate' ? 'in' : 'focus', t: 'Data leakage prevention', n: d === 'corporate' ? 'DLP rules in email and cloud storage, USB control through MDM.' : 'The main control that makes BYOD acceptable: block copy and paste, download and print from company apps to personal space.' },
    { c: 'A.8.13, A.8.15, A.8.16', st: 'in', t: 'Backup, logging and monitoring', n: w === 'remote' ? 'Logs come from the identity provider, cloud, SaaS and endpoints rather than an office network.' : 'Include office network and firewall logs alongside cloud and identity logs.' },
    { c: 'A.8.20, A.8.21', st: w === 'remote' ? 'reduced' : 'in', t: 'Network security', n: w === 'remote' ? 'There is no corporate network to protect. Focus on zero trust access (identity and device checks) and cloud network controls. Home networks are not in your control, so do not claim them.' : w === 'hybrid' ? 'Office network and Wi-Fi in scope, plus remote access through zero trust or VPN.' : 'Office network segmentation, Wi-Fi security, firewalls and network monitoring are central.' },
    { c: 'A.8.24', st: 'in', t: 'Cryptography', n: 'Full disk encryption on laptops, encryption in transit and at rest in cloud services, key management owned by a named role.' },
    { c: 'A.8.25, A.8.28, A.8.31, A.8.32', st: 'in', t: 'Development and change (if you build software)', n: 'If you do not develop software, these can be excluded with written reasons. ' + (d !== 'corporate' ? 'If developers use personal devices, source code access needs extra care (managed browser, virtual desktop or no local clones).' : 'Developer laptops get the same MDM baseline as everyone else.') },
  ];
}

const THEMES = [
  { id: 'org', name: 'Organizational', ref: 'A.5 (37 controls)', Icon: Building2, ring: 'border-indigo-500', badge: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300', fn: organizational },
  { id: 'people', name: 'People', ref: 'A.6 (8 controls)', Icon: Users, ring: 'border-emerald-500', badge: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300', fn: people },
  { id: 'physical', name: 'Physical', ref: 'A.7 (14 controls)', Icon: DoorClosed, ring: 'border-amber-500', badge: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300', fn: physical },
  { id: 'tech', name: 'Technological', ref: 'A.8 (34 controls)', Icon: Cpu, ring: 'border-sky-500', badge: 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300', fn: technological },
];

const EXAMPLES = [
  { title: '20-person remote SaaS startup, BYOD', w: 'remote', d: 'byod', s: 'small', text: 'Scope: the whole company, one legal entity, production on AWS, all staff and contractors. Physical controls A.7.1 to A.7.4 marked not applicable (no premises), with AWS covering data centres through A.5.23. The ISMS weight sits on A.6.7 remote working, A.8.1 endpoints through MAM and conditional access, and A.8.12 DLP. Leavers get a selective wipe of company data.' },
  { title: '150-person hybrid fintech, corporate laptops, personal phones', w: 'hybrid', d: 'mixed', s: 'medium', text: 'Scope: the company and its single office, both products, shared corporate IT (identity, email, endpoints) explicitly included because the products depend on it. Office physical controls in scope. Two device tiers: MDM for laptops, work profile for phones. Regulatory requirements (A.5.31) are heavier because of financial data.' },
  { title: '1,200-person enterprise, office-based, corporate devices', w: 'office', d: 'corporate', s: 'large', text: 'Scope phased: start with one business unit and its two data centres, expand next year. Every in-scope site listed with headcount for certification body sampling. Group policies formally adopted by the in-scope entity. Interfaces to out-of-scope shared services controlled through agreements and A.8.22 network segregation.' },
];

function Picker({ label, options, value, onChange }) {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-wide text-gray-500 dark:text-slate-400 mb-2">{label}</p>
      <div className="flex flex-wrap gap-2" role="radiogroup" aria-label={label}>
        {options.map(o => (
          <button key={o.id} type="button" role="radio" aria-checked={value === o.id} title={o.hint}
            onClick={() => onChange(o.id)}
            className={`px-3 py-1.5 rounded-full text-sm font-semibold border transition ${value === o.id ? 'bg-violet-600 text-white border-violet-600' : 'bg-white text-gray-700 border-gray-200 hover:border-violet-300 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-600 dark:hover:border-violet-500'}`}>
            {o.label}
          </button>
        ))}
      </div>
      <p className="text-xs text-gray-500 dark:text-slate-400 mt-1.5">{options.find(o => o.id === value)?.hint}</p>
    </div>
  );
}

export default function Iso27001ThemeScoping() {
  const [w, setW] = useState('hybrid');
  const [d, setD] = useState('mixed');
  const [s, setS] = useState('small');
  const [active, setActive] = useState('org');
  const theme = THEMES.find(t => t.id === active);
  const items = theme.fn(w, d, s);

  return (
    <section className="container px-4 pb-10" id="iso27001-theme-scoping">
      <div className="bg-white rounded-2xl border border-violet-200 dark:border-violet-800 p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300 flex items-center justify-center"><Building2 className="w-4 h-4" /></span>
          Scoping by Annex A Theme: People, Physical, Technological, Organizational
        </h2>
        <p className="text-sm text-gray-600 dark:text-slate-300 max-w-3xl mb-4">
          Clause 4.3 sets the ISMS boundary. The way you work then decides how each Annex A theme applies inside that boundary, and what you can justify as not applicable in the Statement of Applicability (Clause 6.1.3 d). Pick your situation to see what changes.
        </p>
        <div className="rounded-xl p-3 mb-5 bg-blue-50 border border-blue-200 dark:bg-blue-900/30 dark:border-blue-800 flex gap-2">
          <Info className="w-4 h-4 mt-0.5 shrink-0 text-blue-700 dark:text-blue-300" />
          <p className="text-xs text-gray-700 dark:text-slate-200">
            Scope and applicability are different things. A remote company does not remove the Physical theme from its scope; it marks specific physical controls as not applicable with a reason, and moves the risk to controls such as A.6.7 Remote working and A.7.9 Security of assets off-premises.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 mb-6">
          <Picker label="Work model" options={WORK} value={w} onChange={setW} />
          <Picker label="Device model" options={DEVICE} value={d} onChange={setD} />
          <Picker label="Company size" options={SIZE} value={s} onChange={setS} />
        </div>

        <div className="flex flex-wrap gap-2 mb-4" role="tablist" aria-label="Annex A themes">
          {THEMES.map(t => (
            <button key={t.id} type="button" role="tab" aria-selected={active === t.id} onClick={() => setActive(t.id)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border transition ${active === t.id ? 'bg-slate-900 text-white border-slate-900 dark:bg-indigo-600 dark:border-indigo-600' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-600 dark:hover:bg-slate-700'}`}>
              <t.Icon className="w-4 h-4" /> {t.name}
              <span className="text-[10px] font-medium opacity-80">{t.ref}</span>
            </button>
          ))}
        </div>

        <div className="space-y-3" role="tabpanel">
          {items.map(it => {
            const st = STATUS[it.st];
            return (
              <div key={it.c} className={`rounded-xl border-l-4 ${theme.ring} border border-gray-200 dark:border-slate-700 p-4 bg-slate-50 dark:bg-slate-800/60`}>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${theme.badge}`}>{it.c}</span>
                  <h4 className="font-bold text-sm text-gray-900 dark:text-white">{it.t}</h4>
                  <span className={`ml-auto inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full border ${st.cls}`}>
                    <st.Icon className="w-3 h-3" /> {st.label}
                  </span>
                </div>
                <p className="text-sm text-gray-700 dark:text-slate-200">{it.n}</p>
              </div>
            );
          })}
        </div>

        <h3 className="font-bold text-gray-900 dark:text-white mt-8 mb-3">Worked examples</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {EXAMPLES.map(ex => (
            <div key={ex.title} className="rounded-xl border border-gray-200 dark:border-slate-700 p-4 bg-white dark:bg-slate-900">
              <p className="font-bold text-sm text-gray-900 dark:text-white mb-2">{ex.title}</p>
              <p className="text-sm text-gray-700 dark:text-slate-200 mb-3">{ex.text}</p>
              <button type="button" onClick={() => { setW(ex.w); setD(ex.d); setS(ex.s); setActive('org'); document.getElementById('iso27001-theme-scoping')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="text-xs font-semibold text-violet-700 dark:text-violet-300 hover:underline">
                Load this scenario above
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
