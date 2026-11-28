import GrcAngle from './GrcAngle.jsx';

// COBIT vs ISO/IEC 27001 vs NIST CSF 2.0, laid out as cards so it reads on mobile without sideways scrolling.
const ROWS = ['Owner', 'Focus', 'Purpose', 'Applicability', 'Key structure'];
const FW = [
  ['COBIT', 'border-amber-300 dark:border-amber-800', [
    'ISACA',
    'Governance and management of enterprise information and technology (I&T)',
    'Aligns IT with business goals, balances benefits, risk and resources, and gives the board oversight',
    'Any organisation; voluntary, no certification of the organisation',
    'Governance objectives (Evaluate, Direct and Monitor) and management objectives (Align, Plan and Organise; Build, Acquire and Implement; Deliver, Service and Support; Monitor, Evaluate and Assess)',
  ]],
  ['ISO/IEC 27001', 'border-sky-300 dark:border-sky-800', [
    'ISO and IEC',
    'Information security management system (ISMS)',
    'Manages information security risk systematically and proves it through certification',
    'Any organisation, any country; certifiable by accredited bodies',
    'Clauses 4 to 10 (context, leadership, planning, support, operation, performance evaluation, improvement) plus 93 Annex A controls in four themes: organisational, people, physical, technological',
  ]],
  ['NIST CSF 2.0', 'border-emerald-300 dark:border-emerald-800', [
    'NIST (US National Institute of Standards and Technology)',
    'Cybersecurity risk outcomes',
    'Sets priorities and a common language for managing cybersecurity risk and reporting to leadership',
    'Any organisation, any size or sector; voluntary, no certification',
    'Six functions: Govern, Identify, Protect, Detect, Respond, Recover, with categories, subcategories, profiles and tiers',
  ]],
];

export default function FrameworkCompareCobitIsoNist() {
  return (
    <details id="cobit-iso-nist-compare" className="my-6 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 sm:p-5 scroll-mt-24">
      <summary className="cursor-pointer text-lg font-bold text-gray-900 dark:text-white">COBIT vs ISO 27001 vs NIST CSF 2.0</summary>
      <div className="mt-3 grid gap-3 lg:grid-cols-3">
        {FW.map(([name, border, vals]) => (
          <div key={name} className={`rounded-xl border-2 ${border} p-3`}>
            <p className="font-bold text-gray-900 dark:text-white">{name}</p>
            <dl className="mt-2 space-y-2 text-sm">
              {ROWS.map((r, i) => <div key={r}><dt className="font-semibold text-gray-900 dark:text-white">{r}</dt><dd className="text-gray-700 dark:text-gray-300">{vals[i]}</dd></div>)}
            </dl>
          </div>
        ))}
      </div>
      <p className="mt-3 text-sm text-gray-700 dark:text-gray-300">How they fit together: COBIT governs IT as a whole, ISO 27001 runs and certifies the security programme, and NIST CSF sets priorities and reports progress. Many organisations use all three.</p>
      <GrcAngle>Map once and reuse: a single control set can satisfy ISO 27001 Annex A, NIST CSF categories and COBIT DSS05 (managed security services), and also feed SOC 2 CC1 to CC9 evidence.</GrcAngle>
    </details>
  );
}
