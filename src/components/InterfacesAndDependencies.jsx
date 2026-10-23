import { Network, FileText, Shield, AlertTriangle, CheckCircle, ArrowRight, ChevronDown, ChevronRight } from 'lucide-react';

function InterfacesAndDependencies({ isDark = false }) {
  return (
    <section className="py-8" id="interfaces-dependencies">
      <div className="container mx-auto px-4">
        <div className="grc-card p-6">
          <h2 className="text-2xl font-bold text-navy-900 dark:text-text-dark-primary mb-4 flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-amber-600 text-white flex items-center justify-center">
              <Network className="w-5 h-5" />
            </span>
            Interfaces and Dependencies (4.3 c)
          </h2>
          <p className="text-navy-600 dark:text-text-dark-secondary mb-4">
            Anything crossing the boundary must be listed with the control that governs it:
          </p>
          <ul className="space-y-2 text-sm text-navy-600 dark:text-text-dark-secondary list-disc list-inside">
            <li>CSPs (shared responsibility, A.5.23)</li>
            <li>SaaS vendors (A.5.19 to A.5.22)</li>
            <li>Outsourced developers (A.8.30)</li>
            <li>Parent or sister companies</li>
            <li>Managed service providers</li>
            <li>Payroll and HR providers</li>
            <li>Customers' integrations and APIs</li>
          </ul>
        </div>

        <div className="grc-card p-6 mt-8">
          <h3 className="text-xl font-bold text-navy-900 dark:text-text-dark-primary mb-4 flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-amber-600 text-white flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </span>
            Interfaces and Dependencies Table Template
          </h3>
          <p className="text-navy-600 dark:text-text-dark-secondary mb-4">
            Create a table: external party, service provided, data types shared, governing control (e.g., A.5.23, A.5.19), contract/DPA reference. This is the A.4.3(c) output.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b-2 border-slate-200 dark:border-slate-700">
                  <th className="py-2.5 pr-3 text-left text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-slate-400">External Party</th>
                  <th className="py-2.5 pr-3 text-left text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-slate-400">Service Provided</th>
                  <th className="py-2.5 pr-3 text-left text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-slate-400">Data Types Shared</th>
                  <th className="py-2.5 pr-3 text-left text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Governing Control</th>
                  <th className="py-2.5 text-left text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-slate-400">Contract/DPA Ref</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="py-3 pr-3 font-semibold text-navy-900 dark:text-text-dark-primary">AWS</td>
                  <td className="py-3 pr-3 text-navy-700 dark:text-text-dark-secondary">Cloud hosting (EC2, RDS, S3)</td>
                  <td className="py-3 pr-3 text-navy-600 dark:text-text-dark-secondary">Customer data, logs, backups</td>
                  <td className="py-3 pr-3 text-emerald-700 dark:text-emerald-400 font-medium">A.5.23</td>
                  <td className="py-3 text-navy-600 dark:text-text-dark-secondary">AWS DPA + SOC 2 Type II</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="py-3 pr-3 font-semibold text-navy-900 dark:text-text-dark-primary">GitHub</td>
                  <td className="py-3 pr-3 text-navy-700 dark:text-text-dark-secondary">Source code hosting, CI/CD</td>
                  <td className="py-3 pr-3 text-navy-600 dark:text-text-dark-secondary">Source code, secrets (if any)</td>
                  <td className="py-3 pr-3 text-emerald-700 dark:text-emerald-400 font-medium">A.8.25, A.8.30</td>
                  <td className="py-3 text-navy-600 dark:text-text-dark-secondary">GitHub DPA + SOC 2</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="py-3 pr-3 font-semibold text-navy-900 dark:text-text-dark-primary">Slack</td>
                  <td className="py-3 pr-3 text-navy-700 dark:text-text-dark-secondary">Team communication</td>
                  <td className="py-3 pr-3 text-navy-600 dark:text-text-dark-secondary">Internal messages, file uploads</td>
                  <td className="py-3 pr-3 text-emerald-700 dark:text-emerald-400 font-medium">A.5.19, A.5.20</td>
                  <td className="py-3 text-navy-600 dark:text-text-dark-secondary">Slack DPA + SOC 2</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="py-3 pr-3 font-semibold text-navy-900 dark:text-text-dark-primary">AWS (sub-processor)</td>
                  <td className="py-3 pr-3 text-navy-700 dark:text-text-dark-secondary">Sub-processor for GitHub</td>
                  <td className="py-3 pr-3 text-navy-600 dark:text-text-dark-secondary">Source code, CI/CD logs</td>
                  <td className="py-3 pr-3 text-emerald-700 dark:text-emerald-400 font-medium">A.5.23 (via GitHub)</td>
                  <td className="py-3 text-navy-600 dark:text-text-dark-secondary">GitHub DPA (sub-processor list)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

export default InterfacesAndDependencies;