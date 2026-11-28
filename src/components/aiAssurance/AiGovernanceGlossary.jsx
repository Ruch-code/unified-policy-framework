import { useEffect } from 'react';
import { BookOpen, Scale, Wrench, Activity } from 'lucide-react';

// AI governance glossary in four domains (exam-style grouping). AI, ML, neural networks and deep learning are in the map above.
const DOMAINS = [
  ['1. Foundations of AI governance', 'Shared vocabulary for AI and its risks.', BookOpen, 'border-violet-300 dark:border-violet-800', [
    ['Generative AI', 'AI that produces new content such as text, images, audio or code.'],
    ['Large language model (LLM)', 'A generative model trained on very large text collections to understand and produce language.'],
    ['Responsible AI', 'Building and using AI so it is ethical, fair, safe, transparent and accountable.'],
    ['AI ethics', 'The moral principles that guide how AI is designed, built and used.'],
    ['Algorithmic bias', 'Systematic, unfair differences in AI outcomes between groups, usually from data or design choices.'],
  ]],
  ['2. Laws, standards and frameworks', 'The legal and standards landscape for trustworthy AI.', Scale, 'border-sky-300 dark:border-sky-800', [
    ['EU AI Act', 'EU regulation that sets duties for AI by risk level, for providers and deployers.'],
    ['GDPR', 'EU law protecting personal data, including rules on automated decisions.'],
    ['NIST AI RMF', 'Voluntary US framework for managing AI risk through Govern, Map, Measure and Manage.'],
    ['ISO/IEC 42001', 'Certifiable standard for an AI management system (AIMS).'],
    ['ISO/IEC 23894', 'Guidance on AI risk management: identifying, assessing and treating AI risks.'],
    ['OECD AI Principles', 'International principles for trustworthy, human-centred AI.'],
    ['UNESCO Recommendation on the Ethics of AI', 'Global ethics recommendation covering human rights, inclusion and accountability.'],
    ['Intellectual property', 'Rights over data, models and outputs, including copyright and licensing.'],
  ]],
  ['3. Governing AI development', 'Governance across design, data, build and testing.', Wrench, 'border-amber-300 dark:border-amber-800', [
    ['AI lifecycle', 'All stages of an AI system, from idea and design to retirement.'],
    ['Data governance', 'Policies and processes for data quality, use, access and accountability.'],
    ['Data provenance', 'Where data came from and how it has changed over time.'],
    ['Data minimisation', 'Collecting and using only the data needed for a defined purpose.'],
    ['Privacy by design', 'Building privacy protection into a system from the start.'],
    ['Training, validation and test data', 'Separate data sets used to train a model, tune it and check its performance.'],
    ['Model validation', 'Checking that a model is fit for its purpose and meets its requirements.'],
    ['Bias mitigation', 'Ways to find, reduce and prevent unfair outcomes.'],
    ['Model card', 'Standard documentation of a model: purpose, data, performance and limits.'],
    ['Red teaming', 'Structured attempts to break a system to find vulnerabilities and harms.'],
    ['Adversarial attack', 'Deliberate manipulation of inputs to make an AI system fail or cause harm.'],
    ['Hallucination', 'Output that is wrong, misleading or made up but presented as fact.'],
    ['AI impact assessment', 'A structured review of an AI system\'s benefits, risks and wider effects on people.'],
  ]],
  ['4. Governing AI deployment and use', 'Oversight once AI is in use.', Activity, 'border-emerald-300 dark:border-emerald-800', [
    ['Third-party AI risk management', 'Identifying and managing risk from external AI providers.'],
    ['AI due diligence', 'Reviewing technical, legal, ethical and risk factors before adopting an AI system.'],
    ['AI inventory', 'A register of AI systems with purpose, owner, risk level and status.'],
    ['Human in the loop', 'A person takes part in key AI decisions to provide oversight and judgement.'],
    ['Model drift', 'A model\'s performance changes over time, for example because data or conditions change.'],
    ['Continuous monitoring', 'Ongoing checks of performance, risk and compliance during real use.'],
    ['AI incident management', 'Detecting, assessing, responding to and learning from AI incidents such as harm, bias or failure.'],
    ['AI audit', 'An independent or internal review of an AI system\'s governance, controls and compliance.'],
    ['AI literacy', 'The knowledge people need to use, judge and question AI responsibly. The EU AI Act requires providers and deployers to take measures for it.'],
    ['AI decommissioning', 'Planned, secure retirement of an AI system, including its data and access.'],
  ]],
];

export default function AiGovernanceGlossary() {
  useEffect(() => {
    if (typeof window === 'undefined' || window.location.hash !== '#ai-governance-glossary') return undefined;
    const t = setTimeout(() => { const el = document.getElementById('ai-governance-glossary'); if (el) { el.open = true; el.scrollIntoView({ behavior: 'smooth' }); } }, 400);
    return () => clearTimeout(t);
  }, []);
  return (
    <details id="ai-governance-glossary" className="my-6 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 scroll-mt-24">
      <summary className="cursor-pointer text-lg font-bold text-gray-900 dark:text-white">AI governance glossary: key terms in four domains</summary>
      <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">A quick reference, useful for AIGP preparation. AI, machine learning, neural networks and deep learning are explained in the map above.</p>
      <div className="mt-3 grid gap-4 lg:grid-cols-2">
        {DOMAINS.map(([title, sub, Icon, border, terms]) => (
          <div key={title} className={`rounded-xl border-2 ${border} p-3`}>
            <p className="flex items-center gap-2 font-bold text-gray-900 dark:text-white"><Icon className="w-5 h-5" aria-hidden="true" />{title}</p>
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">{sub}</p>
            <dl className="divide-y divide-gray-100 dark:divide-gray-700">
              {terms.map(([t, d]) => (
                <div key={t} className="grid grid-cols-3 gap-2 py-1.5 text-sm">
                  <dt className="font-medium text-gray-900 dark:text-white">{t}</dt>
                  <dd className="col-span-2 text-gray-700 dark:text-gray-300">{d}</dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>
    </details>
  );
}
