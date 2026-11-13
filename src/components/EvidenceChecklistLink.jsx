import { Link } from 'react-router-dom';

// Points a framework playbook at the shared audit evidence checklist.
export default function EvidenceChecklistLink({ framework }) {
  return (
    <div className="max-w-6xl mx-auto px-4 my-8">
      <div className="rounded border border-gray-200 dark:border-slate-700 bg-white dark:bg-[#1e293b] p-4 text-sm">
        <p className="font-semibold text-gray-900 dark:text-white">Audit evidence checklist</p>
        <p className="mt-1 text-gray-700 dark:text-slate-300">See what auditors usually ask for under {framework}, side by side with SOC 2, ISO 27001, HIPAA and GDPR, and a typical readiness plan. <Link to="/knowledge?topic=evidence-checklist" className="underline">Open the checklist</Link></p>
      </div>
    </div>
  );
}
