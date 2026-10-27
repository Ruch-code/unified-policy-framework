import { useState } from 'react';
import { Ban, AlertTriangle, Eye, CheckCircle2, CalendarDays, Users, Scale, Cpu, Info } from 'lucide-react';

/*
 * EU AI Act (Regulation (EU) 2024/1689) overview, reflecting the AI Act Digital Omnibus
 * that entered into force in July 2026. Dates as understood in October 2026; check the
 * Official Journal and AI Office guidance before relying on them. Not legal advice.
 */

const TIERS = [
  {
    id: 'prohibited', name: 'Prohibited', art: 'Art. 5', Icon: Ban,
    cls: 'border-rose-300 dark:border-rose-700', head: 'bg-rose-50 text-rose-900 dark:bg-rose-900/30 dark:text-rose-200',
    what: 'Banned outright because the risk to people is unacceptable.',
    items: ['Manipulative or subliminal techniques that cause significant harm', 'Exploiting vulnerabilities due to age, disability or social or economic situation', 'Social scoring leading to unjustified or disproportionate treatment', 'Predicting criminal offences based solely on profiling or personality traits', 'Untargeted scraping of facial images to build recognition databases', 'Emotion recognition in workplaces and education (except medical or safety reasons)', 'Biometric categorisation to infer sensitive traits such as race, religion or sexual orientation', 'Real-time remote biometric identification in public spaces for law enforcement, with narrow exceptions', 'Added by the omnibus: AI that generates non-consensual intimate imagery or child sexual abuse material'],
  },
  {
    id: 'high', name: 'High risk', art: 'Art. 6, Annex I and III', Icon: AlertTriangle,
    cls: 'border-amber-300 dark:border-amber-700', head: 'bg-amber-50 text-amber-900 dark:bg-amber-900/30 dark:text-amber-200',
    what: 'Allowed, but only with strict controls before and after it reaches the market.',
    items: ['Annex I: AI that is a safety component of regulated products (medical devices, toys, lifts, vehicles)', 'Annex III areas: biometrics, critical infrastructure, education, employment and HR, access to essential services (credit scoring, life and health insurance pricing, public benefits, emergency triage), law enforcement, migration and border control, justice and democratic processes', 'Art. 6(3): an Annex III system is not high risk if it does not pose a significant risk (for example a narrow procedural task). Profiling of people is always high risk. Document the assessment.'],
  },
  {
    id: 'transparency', name: 'Transparency risk', art: 'Art. 50', Icon: Eye,
    cls: 'border-sky-300 dark:border-sky-700', head: 'bg-sky-50 text-sky-900 dark:bg-sky-900/30 dark:text-sky-200',
    what: 'People must know when they deal with AI or AI-generated content.',
    items: ['Chatbots must tell users they are talking to an AI, unless obvious', 'Generative AI output must be machine-readable as AI-generated (watermarking or similar)', 'Deployers must disclose deepfakes and AI-generated text published on matters of public interest', 'Deployers must inform people exposed to emotion recognition or biometric categorisation'],
  },
  {
    id: 'minimal', name: 'Minimal risk', art: 'No specific obligations', Icon: CheckCircle2,
    cls: 'border-emerald-300 dark:border-emerald-700', head: 'bg-emerald-50 text-emerald-900 dark:bg-emerald-900/30 dark:text-emerald-200',
    what: 'Most AI systems: spam filters, recommendation engines, inventory forecasting.',
    items: ['No AI Act obligations beyond AI literacy', 'Voluntary codes of conduct encouraged', 'Other laws (GDPR, consumer, product safety) still apply'],
  },
];

const TIMELINE = [
  { d: '1 Aug 2024', t: 'AI Act enters into force.' },
  { d: '2 Feb 2025', t: 'Prohibited practices banned. AI literacy duty applies (softened by the omnibus to "support the development of AI literacy").' },
  { d: '2 Aug 2025', t: 'General-purpose AI (GPAI) model obligations, governance bodies and penalties apply.' },
  { d: '27 Jul 2026', t: 'AI Act Digital Omnibus enters into force, moving the high-risk deadlines below.' },
  { d: '2 Aug 2026', t: 'Article 50 transparency obligations apply. Commission enforcement powers over GPAI providers start.' },
  { d: '2 Dec 2026', t: 'End of grace period for watermarking generative AI systems already on the market before 2 Aug 2026. New ban on nudifier and CSAM-generating AI fully applies.' },
  { d: '2 Aug 2027', t: 'GPAI models placed on the market before 2 Aug 2025 must comply. National AI regulatory sandboxes deadline.' },
  { d: '2 Dec 2027', t: 'Annex III high-risk obligations apply (moved from 2 Aug 2026).', key: true },
  { d: '2 Aug 2028', t: 'Annex I high-risk obligations apply for AI in regulated products (moved from 2 Aug 2027).', key: true },
];

const ROLES = [
  { r: 'Provider', d: 'Develops an AI system or GPAI model, or has one developed, and places it on the market under its own name. Carries most obligations.', e: 'An HR tech company that builds and sells a CV screening tool.' },
  { r: 'Deployer', d: 'Uses an AI system under its authority in a professional context.', e: 'A bank that uses that CV screening tool to shortlist candidates.' },
  { r: 'Importer and distributor', d: 'Bring a non-EU provider\'s system into the EU market or make it available, and must check it is compliant.', e: 'A reseller offering a US AI product to EU customers.' },
  { r: 'Authorised representative', d: 'EU-based representative appointed by a non-EU provider of high-risk systems or GPAI models.', e: 'An EU entity acting for an Indian SaaS provider.' },
  { r: 'Becoming a provider', d: 'A deployer becomes a provider if it puts its name on a high-risk system, makes a substantial modification, or changes its purpose so it becomes high risk.', e: 'A company fine-tunes a general chatbot and markets it for credit decisions.' },
];

const HIGH_RISK_DUTIES = {
  provider: ['Risk management system across the lifecycle (Art. 9)', 'Data governance: relevant, representative training data, bias checks (Art. 10)', 'Technical documentation (Art. 11) and automatic logging (Art. 12)', 'Instructions for use for deployers (Art. 13)', 'Designed for effective human oversight (Art. 14)', 'Accuracy, robustness and cybersecurity (Art. 15)', 'Quality management system (Art. 17)', 'Conformity assessment, CE marking and EU database registration (Art. 43, 48, 49)', 'Post-market monitoring and serious incident reporting (Art. 72, 73)'],
  deployer: ['Use the system according to its instructions (Art. 26)', 'Assign trained, competent people for human oversight', 'Make sure input data is relevant and representative', 'Monitor operation and report risks or serious incidents to the provider', 'Keep automatically generated logs for at least six months', 'Inform workers and their representatives before using high-risk AI at work', 'Fundamental rights impact assessment for public bodies and certain private deployers such as credit scoring and life or health insurance pricing (Art. 27)'],
};

const GPAI = [
  'All GPAI providers (Art. 53): technical documentation, information for downstream providers, a copyright policy, and a public summary of training content',
  'GPAI models with systemic risk (Art. 55), presumed above 10^25 FLOPs of training compute: model evaluations and adversarial testing, systemic risk assessment and mitigation, serious incident reporting, cybersecurity',
  'The GPAI Code of Practice is the main way to show compliance',
  'Companies that only build on a GPAI model through an API are usually deployers or downstream providers, not GPAI providers',
];

const PENALTIES = [
  { v: 'Up to EUR 35 million or 7% of worldwide annual turnover', f: 'Prohibited practices' },
  { v: 'Up to EUR 15 million or 3%', f: 'Most other obligations, including high-risk and transparency duties, and GPAI providers' },
  { v: 'Up to EUR 7.5 million or 1%', f: 'Incorrect, incomplete or misleading information to authorities' },
];

const SCENARIOS = [
  {
    t: 'Indian HR SaaS selling CV screening to EU employers',
    steps: ['Applies even though the company is outside the EU: its system is placed on the EU market and its output is used in the EU.', 'Employment is an Annex III area and the tool profiles candidates, so it is high risk.', 'Role: provider. Needs an EU authorised representative.', 'By 2 Dec 2027: risk management, bias testing on training data, technical documentation, logging, human oversight design, QMS, conformity assessment, CE marking and EU database registration.', 'EU customers are deployers: they must use it as instructed, keep logs for six months and inform candidates and staff.', 'GDPR still applies in parallel: lawful basis, DPIA and Art. 22 safeguards for automated decisions.'],
  },
  {
    t: 'Customer support chatbot on a GPAI model',
    steps: ['Role: deployer of a system built on someone else\'s GPAI model; the model provider handles GPAI duties.', 'Transparency risk: users must be told they are chatting with AI (Art. 50), in force since 2 Aug 2026.', 'Not high risk, unless it starts deciding access to essential services.', 'Keep AI literacy training for staff who configure and supervise it.', 'Contract with the model provider: data use, no training on customer data, incident notification.'],
  },
  {
    t: 'Fintech using AI for credit scoring',
    steps: ['Creditworthiness assessment of individuals is an Annex III high-risk use (fraud detection is excluded).', 'If built in-house, the fintech is the provider; if bought, it is a deployer.', 'As a deployer it must carry out a fundamental rights impact assessment before use (Art. 27).', 'Human oversight: staff must be able to understand and override outputs.', 'Financial regulators may supervise these systems; align with existing model risk management.'],
  },
];

export default function EuAiActOverview() {
  const [tier, setTier] = useState('high');
  const [sc, setSc] = useState(0);
  const active = TIERS.find(t => t.id === tier);
  const li = x => <li key={x} className="flex gap-2"><span>-</span><span>{x}</span></li>;

  return (
    <div className="bg-white rounded-2xl border border-violet-200 dark:border-violet-800 p-6 mb-8" id="eu-ai-act-overview">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
        <span className="w-8 h-8 rounded-lg bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300 flex items-center justify-center"><Scale className="w-4 h-4" /></span>
        EU AI Act at a Glance
      </h2>
      <p className="text-sm text-gray-600 dark:text-slate-300 max-w-3xl mb-4">
        Regulation (EU) 2024/1689 regulates AI by risk level. It applies to providers and deployers inside the EU, and to those outside the EU whose AI systems are placed on the EU market or whose output is used in the EU. Dates below include the changes made by the AI Act Digital Omnibus, in force since 27 July 2026.
      </p>

      <h3 className="font-bold text-gray-900 dark:text-white mb-2">Four risk levels</h3>
      <div className="flex flex-wrap gap-2 mb-3" role="tablist" aria-label="Risk levels">
        {TIERS.map(t => (
          <button key={t.id} type="button" role="tab" aria-selected={tier === t.id} onClick={() => setTier(t.id)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${tier === t.id ? 'bg-violet-600 text-white border-violet-600' : 'bg-white text-gray-700 border-gray-200 hover:border-violet-300 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-600'}`}>
            <t.Icon className="w-3.5 h-3.5" /> {t.name}
          </button>
        ))}
      </div>
      <div className={`rounded-xl border-2 ${active.cls} overflow-hidden mb-6`} role="tabpanel">
        <div className={`px-4 py-2 ${active.head}`}>
          <p className="font-bold text-sm">{active.name} <span className="font-medium opacity-80">({active.art})</span></p>
          <p className="text-xs">{active.what}</p>
        </div>
        <ul className="p-4 space-y-1 text-sm text-gray-700 dark:text-slate-200">{active.items.map(li)}</ul>
      </div>

      <h3 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2"><CalendarDays className="w-4 h-4 text-violet-600 dark:text-violet-300" /> Timeline after the Digital Omnibus</h3>
      <ol className="relative border-l-2 border-violet-200 dark:border-violet-800 ml-2 space-y-3 mb-6">
        {TIMELINE.map(e => (
          <li key={e.d} className="relative pl-4">
            <span className={`absolute -left-[7px] mt-1.5 w-3 h-3 rounded-full ${e.key ? 'bg-amber-500' : 'bg-violet-500'}`} />
            <p className={`text-sm font-semibold ${e.key ? 'text-amber-700 dark:text-amber-300' : 'text-gray-900 dark:text-white'}`}>{e.d}</p>
            <p className="text-sm text-gray-700 dark:text-slate-200">{e.t}</p>
          </li>
        ))}
      </ol>

      <h3 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2"><Users className="w-4 h-4 text-violet-600 dark:text-violet-300" /> Who is who</h3>
      <div className="grid md:grid-cols-2 gap-2 mb-6">
        {ROLES.map(r => (
          <div key={r.r} className="rounded-lg p-3 border border-gray-200 dark:border-slate-700 text-sm">
            <p className="font-semibold text-gray-900 dark:text-white">{r.r}</p>
            <p className="text-gray-700 dark:text-slate-200">{r.d}</p>
            <p className="text-xs text-gray-500 dark:text-slate-400 mt-1"><span className="font-semibold">Example:</span> {r.e}</p>
          </div>
        ))}
      </div>

      <h3 className="font-bold text-gray-900 dark:text-white mb-2">High-risk obligations</h3>
      <div className="grid md:grid-cols-2 gap-3 mb-6">
        <div className="rounded-xl p-4 bg-amber-50 border border-amber-200 dark:bg-amber-900/30 dark:border-amber-800">
          <p className="text-xs font-bold uppercase tracking-wide text-amber-800 dark:text-amber-300 mb-2">Provider</p>
          <ul className="text-sm text-gray-700 dark:text-slate-200 space-y-1">{HIGH_RISK_DUTIES.provider.map(li)}</ul>
        </div>
        <div className="rounded-xl p-4 bg-blue-50 border border-blue-200 dark:bg-blue-900/30 dark:border-blue-800">
          <p className="text-xs font-bold uppercase tracking-wide text-blue-800 dark:text-blue-300 mb-2">Deployer</p>
          <ul className="text-sm text-gray-700 dark:text-slate-200 space-y-1">{HIGH_RISK_DUTIES.deployer.map(li)}</ul>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-3 mb-6">
        <div className="rounded-xl p-4 border border-gray-200 dark:border-slate-700">
          <p className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2"><Cpu className="w-4 h-4 text-violet-600 dark:text-violet-300" /> General-purpose AI models</p>
          <ul className="text-sm text-gray-700 dark:text-slate-200 space-y-1">{GPAI.map(li)}</ul>
        </div>
        <div className="rounded-xl p-4 border border-gray-200 dark:border-slate-700">
          <p className="font-bold text-gray-900 dark:text-white mb-2">Penalties (Art. 99 and 101)</p>
          <div className="space-y-2">
            {PENALTIES.map(p => (
              <div key={p.f} className="text-sm">
                <p className="font-semibold text-rose-700 dark:text-rose-300">{p.v}</p>
                <p className="text-gray-700 dark:text-slate-200">{p.f}</p>
              </div>
            ))}
            <p className="text-xs text-gray-500 dark:text-slate-400">Whichever is higher; lower caps apply to SMEs and start-ups.</p>
          </div>
        </div>
      </div>

      <h3 className="font-bold text-gray-900 dark:text-white mb-2">Scenarios, end to end</h3>
      <div className="flex flex-wrap gap-2 mb-3" role="tablist" aria-label="Scenarios">
        {SCENARIOS.map((s, i) => (
          <button key={s.t} type="button" role="tab" aria-selected={sc === i} onClick={() => setSc(i)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition text-left ${sc === i ? 'bg-violet-600 text-white border-violet-600' : 'bg-white text-gray-700 border-gray-200 hover:border-violet-300 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-600'}`}>
            {s.t}
          </button>
        ))}
      </div>
      <ol className="rounded-xl border border-gray-200 dark:border-slate-700 p-4 space-y-2" role="tabpanel">
        {SCENARIOS[sc].steps.map((st, i) => (
          <li key={st} className="flex gap-3 text-sm">
            <span className="w-6 h-6 shrink-0 rounded-full bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300 flex items-center justify-center text-xs font-bold">{i + 1}</span>
            <span className="text-gray-700 dark:text-slate-200">{st}</span>
          </li>
        ))}
      </ol>

      <p className="text-xs text-gray-500 dark:text-slate-400 mt-4 flex gap-1.5"><Info className="w-3.5 h-3.5 shrink-0 mt-0.5" /> Reflects the position as of October 2026, including the AI Act Digital Omnibus. Check the Official Journal and AI Office guidance for updates. Not legal advice.</p>
    </div>
  );
}
