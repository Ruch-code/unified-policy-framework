import { Building2, Globe, Database, Users, Network, FileText, Shield, AlertTriangle } from 'lucide-react';

function ScopeDimensions({ isDark = false }) {
  return (
    <section className="py-8" id="scope-dimensions">
      <div className="container mx-auto px-4">
        <div className="grc-card p-6 mb-8">
          <h2 className="text-2xl font-bold text-navy-900 dark:text-text-dark-primary mb-4 flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
              <Building2 className="w-5 h-5" />
            </span>
            The Four Scope Dimensions
          </h2>
          <p className="text-navy-600 dark:text-text-dark-secondary mb-6 max-w-3xl">
            Scope is not just a list of systems. Think in four dimensions:
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="grc-card p-4 border-l-4 border-indigo-500">
              <h3 className="font-bold text-navy-900 dark:text-text-dark-primary mb-2 flex items-center gap-2">
                <span className="w-6 h-6 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                  <Building2 className="w-4 h-4" />
                </span>
                Organizational
              </h3>
              <p className="text-sm text-navy-600 dark:text-text-dark-secondary">
                Legal entities, business units, departments, people (employees, contractors)
              </p>
            </div>
            <div className="grc-card p-4 border-l-4 border-amber-500">
              <h3 className="font-bold text-navy-900 dark:text-text-dark-primary mb-2 flex items-center gap-2">
                <span className="w-6 h-6 rounded-xl bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                  <Globe className="w-4 h-4" />
                </span>
                Physical
              </h3>
              <p className="text-sm text-navy-600 dark:text-text-dark-secondary">
                Offices, co-working spaces, data centres, colocation, remote workers' home environments
              </p>
            </div>
            <div className="grc-card p-4 border-l-4 border-emerald-500">
              <h3 className="font-bold text-navy-900 dark:text-text-dark-primary mb-2 flex items-center gap-2">
                <span className="w-6 h-6 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <Database className="w-4 h-4" />
                </span>
                Technological
              </h3>
              <p className="text-sm text-navy-600 dark:text-text-dark-secondary">
                Production cloud accounts, applications, networks, endpoints, SaaS tools, code repositories, CI/CD
              </p>
            </div>
            <div className="grc-card p-4 border-l-4 border-rose-500">
              <h3 className="font-bold text-navy-900 dark:text-text-dark-primary mb-2 flex items-center gap-2">
                <span className="w-6 h-6 rounded-xl bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 flex items-center justify-center">
                  <Users className="w-4 h-4" />
                </span>
                Process & Information
              </h3>
              <p className="text-sm text-navy-600 dark:text-text-dark-secondary">
                Services delivered to customers, data types (PII, PHI, cardholder, IP), supporting processes (HR, finance)
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ScopeDimensions;