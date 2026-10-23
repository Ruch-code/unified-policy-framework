import { Copy, FileText, Shield, CheckCircle, Calendar, CalendarDays, Lock, UserCheck, Building2, Users, Briefcase, GraduationCap, ArrowRight, ChevronRight, AlertTriangle } from 'lucide-react';

function ScopeStatementTemplate({ isDark = false }) {
  return (
    <section className="py-8" id="scope-statement-template">
      <div className="container mx-auto px-4">
        <div className="grc-card p-6 mb-8">
          <h2 className="text-2xl font-bold text-navy-900 dark:text-text-dark-primary mb-4 flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </span>
            Scope Statement Template
          </h2>
          <p className="text-navy-600 dark:text-text-dark-secondary mb-4">
            Copy and fill in. Include in all exports:
          </p>
          <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl p-4 font-mono text-sm whitespace-pre-wrap text-slate-700 dark:text-slate-300">
The Information Security Management System of [Legal entity name] applies to the [design, development, operation, support] of [product or service name], delivered from [locations or 'a remote-first workforce'] and hosted on [cloud provider and regions]. It covers [teams or functions], the supporting information assets, systems and processes, in accordance with the Statement of Applicability version [x.y] dated [date].
          </div>
          <p className="mt-4 text-sm text-navy-600 dark:text-text-dark-secondary">
            <strong>Example (Small Remote SaaS):</strong> The Information Security Management System of Acme Corp Ltd applies to the design, development, operation, and support of Acme SaaS Platform, delivered from a remote-first workforce and hosted on AWS eu-west-1. It covers Engineering, Product, Operations and Security teams, the supporting information assets, systems and processes, in accordance with the Statement of Applicability version 1.0 dated 2024-01-15.
          </p>
          <p className="mt-4 text-sm text-navy-600 dark:text-text-dark-secondary">
            <strong>Example (Large Multi-site Enterprise):</strong> The Information Security Management System of GlobalCorp plc applies to the design, development, operation and support of GlobalPay Payment Gateway, delivered from London HQ (UK), Frankfurt DC (DE), Singapore DC (SG) and hosted on AWS eu-west-1, eu-central-1, ap-southeast-1. It covers Engineering, Product, Operations, Security, Finance and HR teams, the supporting information assets, systems and processes, in accordance with the Statement of Applicability version 2.3 dated 2024-06-01.
          </p>
          <div className="mt-6 p-4 rounded-xl border border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-900/30">
            <h3 className="font-bold text-indigo-700 dark:text-indigo-400 mb-2 flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Copy to Clipboard
            </h3>
            <button className="mt-2 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700 transition-colors">
              <Copy className="w-4 h-4" /> Copy Template
            </button>
          </div>
        </div>

        <div className="grc-card p-6">
          <h2 className="text-xl font-bold text-navy-900 dark:text-text-dark-primary mb-4 flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-rose-600 text-white flex items-center justify-center">
              <AlertTriangle className="w-5 h-5" />
            </span>
            Exclusion Rationale Examples
          </h2>
          <p className="text-navy-600 dark:text-text-dark-secondary mb-4">
            Bare "N/A" is never acceptable. Six examples:
          </p>
          <ul className="space-y-3 text-sm text-navy-600 dark:text-text-dark-secondary list-disc list-inside">
            <li><strong>A.7.1 to A.7.4 excluded:</strong> fully remote, no controlled premises; co-working landlord operates entry control and CCTV; re-validated at each management review.</li>
            <li><strong>A.7.11, A.7.12 excluded:</strong> all production hosted on AWS multi-AZ; utilities and cabling covered by provider SOC 2 and ISO 27001 reports reviewed annually under A.5.23.</li>
            <li><strong>A.8.30 retained even with in-house development only:</strong> implementation note "no external development currently"; never silently excluded.</li>
            <li><strong>Business unit carve-out (large enterprise):</strong> Retail division out of scope; interface controlled by network segregation (A.8.22) and a documented data-sharing agreement.</li>
            <li><strong>A.8.25-8.29 excluded:</strong> no software development; written rationale "no software development"; supplier controls A.5.19-5.23 retained.</li>
            <li><strong>A.7.11, A.7.12 excluded:</strong> all production hosted on AWS multi-AZ; utilities and cabling covered by provider SOC 2 and ISO 27001 reports reviewed annually under A.5.23.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default ScopeStatementTemplate;