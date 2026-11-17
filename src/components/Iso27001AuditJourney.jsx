import { FileText } from 'lucide-react';

const TEMPLATE = '/templates/ISO27001_Management_Review_Minutes.docx';
const CARD = 'rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800';
const P = 'text-sm text-gray-700 dark:text-gray-300';

const STEPS = [
  {
    id: 'management-review',
    title: 'Management review (clause 9.3)',
    when: 'Before Stage 1, then at planned intervals (most teams run it once or twice a year).',
    what: 'Top management reviews whether the ISMS is still suitable, adequate and effective. The auditor will ask for the minutes, so the meeting must cover every required input and record decisions.',
    points: [
      'Inputs (9.3.2): actions from the last review, changes in internal and external issues, changes in interested party needs, trends in nonconformities, monitoring results, audit results and objectives, feedback from interested parties, risk assessment results and risk treatment status, and improvement opportunities.',
      'Outputs (9.3.3): decisions on improvement and any changes needed to the ISMS, kept as documented information.',
      'Top management must attend. A review run only by the security team is a common finding.',
    ],
    example: 'A 25-person SaaS company holds a 60-minute review in June. The CTO chairs it. They note that patching within 14 days is at 88% against a 95% target, agree to automate patch reporting, accept one risk on a legacy VPN until migration, and log four actions with owners and dates. Those minutes are what the Stage 2 auditor samples.',
    template: true,
  },
  {
    id: 'stage-1',
    title: 'Stage 1 audit: documentation and readiness review',
    when: 'After the ISMS has run long enough to produce an internal audit and a management review.',
    what: 'The certification body checks that the ISMS is designed and documented, and that you are ready for Stage 2. It is mostly a document review and can be remote.',
    points: [
      'What they read: scope statement, information security policy, risk assessment and treatment methodology, risk register and treatment plan, Statement of Applicability, objectives, internal audit report and management review minutes.',
      'What you get: a Stage 1 report listing areas of concern that could become nonconformities at Stage 2.',
      'Typical gap between stages: a few weeks to three months, used to fix the concerns raised.',
    ],
    example: 'At Stage 1 the auditor notes that the Statement of Applicability excludes A.8.25 to A.8.29 (secure development) but the scope statement says the company builds its own product. That is raised as an area of concern. The team corrects the SoA before Stage 2 instead of taking a nonconformity.',
  },
  {
    id: 'stage-2',
    title: 'Stage 2 audit: implementation and effectiveness',
    when: 'Once Stage 1 concerns are addressed.',
    what: 'The auditor tests that controls actually operate as documented, through interviews, observation and sampling of records. This is where certification is decided.',
    points: [
      'How they test: pick samples (new joiners, leavers, changes, incidents, suppliers) and trace each one to evidence.',
      'Findings: a major nonconformity (a missing or failed requirement) must be closed before the certificate is issued. A minor nonconformity needs a corrective action plan. Opportunities for improvement are optional.',
      'Who is interviewed: top management, the ISMS owner, HR, IT and engineering staff, not only the security lead.',
    ],
    example: 'The auditor samples 5 of 18 leavers from the last six months. For one, access to the cloud console was removed 9 days after the last working day, against a 24-hour policy. That is a minor nonconformity against A.5.18 and A.6.5. The team submits root cause (HR ticket not raised) and a corrective action (automatic offboarding trigger).',
  },
  {
    id: 'external-audit',
    title: 'External audit cycle: surveillance and recertification',
    when: 'The certificate is valid for three years, with surveillance audits at least once a year.',
    what: 'External audits continue after certification. Surveillance audits are shorter and sample part of the ISMS. Recertification in year three is a full audit again.',
    points: [
      'Every surveillance audit covers internal audit, management review, corrective actions from the previous audit, changes to scope, and use of the certification mark.',
      'Tell the certification body about major changes (new office, new product, acquisition), because scope changes can need extra audit time.',
      'Prepare the same way each year: finish the internal audit and management review before the external auditor arrives.',
    ],
    example: 'In the first surveillance audit, the auditor opens last year\'s minor nonconformity on leaver access, samples 5 new leavers and finds all removed within 24 hours. The finding is closed. The auditor then samples supplier reviews, which were not covered in depth at Stage 2.',
  },
];

/** Certification audit journey for the Lead Implementer page: management review, Stage 1, Stage 2, external audit cycle. */
export default function Iso27001AuditJourney() {
  return (
    <section id="audit-journey" className="max-w-6xl mx-auto px-4 my-8 scroll-mt-24">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">From management review to certification</h2>
      <p className={`mt-1 mb-4 ${P}`}>What happens at each audit step, what the auditor looks at, and a worked example for each.</p>
      <div className="space-y-3">
        {STEPS.map((s, i) => (
          <details key={s.id} id={s.id} open={i === 0} className={`${CARD} scroll-mt-24`}>
            <summary className="cursor-pointer p-4 text-base font-semibold text-gray-900 dark:text-white">{i + 1}. {s.title}</summary>
            <div className="px-4 pb-4 space-y-3">
              <p className={P}><span className="font-semibold text-gray-900 dark:text-white">When: </span>{s.when}</p>
              <p className={P}>{s.what}</p>
              <ul className={`list-disc pl-5 space-y-1 ${P}`}>{s.points.map((p) => <li key={p}>{p}</li>)}</ul>
              <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Example</p>
                <p className={`mt-1 ${P}`}>{s.example}</p>
              </div>
              {s.template && (
                <a href={TEMPLATE} download className="inline-flex items-center gap-1.5 rounded-lg bg-blue-700 px-3.5 py-2 text-sm font-semibold text-white hover:bg-blue-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2" aria-label="Download management review minutes template (.docx)">
                  <FileText className="h-4 w-4" aria-hidden="true" /> Download management review minutes template (.docx)
                </a>
              )}
            </div>
          </details>
        ))}
      </div>
      <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">Guidance only. Timings and finding grades vary by certification body. Refer to ISO/IEC 27001:2022 and your certification body's rules.</p>
    </section>
  );
}
