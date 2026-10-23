import { Copy, FileText, Shield, Building2, Database, Globe, Network, Lock, Users, AlertTriangle, Lightbulb, CheckCircle, ChevronDown, ChevronRight } from 'lucide-react';

function ScopingIntro({ isDark = false }) {
  return (
    <section id="scoping-guide" className="py-8">
      <div className="container mx-auto px-4">
        <div className="grc-card mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center">
              <Shield className="w-5 h-5" />
            </span>
            <h2 className="text-2xl font-bold text-navy-900 dark:text-text-dark-primary">ISO 27001:2022 ISMS Scoping, Step by Step</h2>
          </div>
          <p className="text-navy-600 dark:text-text-dark-secondary mb-6 max-w-3xl">
            The Scoping walkthrough is where the SoA is actually shaped. Understand what scoping means under Clause 4.3, 
            then walk the decision tree, then build the SoA. Each answer directs which Annex A controls stay 
            <em>in scope</em>, which become <em>exclusions with written rationale</em>, 
            and which flip back in when the answer changes.
          </p>
        </div>

        <div className="space-y-6">
          <div className="grc-card p-6">
            <h3 className="text-xl font-bold text-navy-900 dark:text-text-dark-primary mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </span>
              What Scoping Means in ISO 27001:2022
            </h3>
            <div className="space-y-4 text-navy-600 dark:text-text-dark-secondary">
              <p className="leading-relaxed">
                Clause 4.3 requires the organization to determine the boundaries and applicability of the ISMS, 
                considering (a) external and internal issues from 4.1, (b) requirements of interested parties from 4.2, 
                and (c) interfaces and dependencies between activities performed by the organization and those performed by other organizations.
              </p>
              <p className="leading-relaxed">
                The scope must be available as documented information. Scope decides what the risk assessment (6.1.2) covers, 
                which feeds the SoA (6.1.3 d). Wrong scope means a wrong SoA.
              </p>
              <p className="leading-relaxed">
                The certificate scope statement is what customers read. It must name the organization, 
                the services or products, locations, and reference the SoA version.
              </p>
              <div className="bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-100 dark:border-indigo-800 rounded-xl p-4">
                <h4 className="font-bold text-indigo-900 dark:text-indigo-300 mb-2">2022 Changes Worth Calling Out</h4>
                <ul className="space-y-1 text-sm text-indigo-700 dark:text-indigo-300 list-disc list-inside">
                  <li>Annex A restructured to 93 controls in 4 themes (A.5 Organizational 37, A.6 People 8, A.7 Physical 14, A.8 Technological 34)</li>
                  <li>Clause 4.2 c now asks which interested party requirements are addressed through the ISMS</li>
                  <li>Clause 6.3 Planning of changes</li>
                  <li>Clause 8.1 now explicitly covers externally provided processes, products or services</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="grc-card p-6">
            <h3 className="text-xl font-bold text-navy-900 dark:text-text-dark-primary mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
                <Building2 className="w-5 h-5" />
              </span>
              The Four Scope Dimensions
            </h3>
            <p className="text-navy-600 dark:text-text-dark-secondary mb-6 max-w-3xl">
              Scope is not just a list of systems. Think in four dimensions:
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="grc-card p-4 border-l-4 border-indigo-500">
                <h4 className="font-bold text-navy-900 dark:text-text-dark-primary mb-2 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                    <Building2 className="w-4 h-4" />
                  </span>
                  Organizational
                </h4>
                <p className="text-sm text-navy-600 dark:text-text-dark-secondary">
                  Legal entities, business units, departments, people (employees, contractors)
                </p>
              </div>
              <div className="grc-card p-4 border-l-4 border-amber-500">
                <h4 className="font-bold text-navy-900 dark:text-text-dark-primary mb-2 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-xl bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                    <Globe className="w-4 h-4" />
                  </span>
                  Physical
                </h4>
                <p className="text-sm text-navy-600 dark:text-text-dark-secondary">
                  Offices, co-working spaces, data centres, colocation, remote workers' home environments
                </p>
              </div>
              <div className="grc-card p-4 border-l-4 border-emerald-500">
                <h4 className="font-bold text-navy-900 dark:text-text-dark-primary mb-2 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                    <Database className="w-4 h-4" />
                  </span>
                  Technological
                </h4>
                <p className="text-sm text-navy-600 dark:text-text-dark-secondary">
                  Production cloud accounts, applications, networks, endpoints, SaaS tools, code repositories, CI/CD
                </p>
              </div>
              <div className="grc-card p-4 border-l-4 border-rose-500">
                <h4 className="font-bold text-navy-900 dark:text-text-dark-primary mb-2 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-xl bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 flex items-center justify-center">
                    <Users className="w-4 h-4" />
                  </span>
                  Process & Information
                </h4>
                <p className="text-sm text-navy-600 dark:text-text-dark-secondary">
                  Services delivered to customers, data types (PII, PHI, cardholder, IP), supporting processes (HR, finance)
                </p>
              </div>
            </div>
          </div>

          <div className="grc-card p-6">
            <h3 className="text-xl font-bold text-navy-900 dark:text-text-dark-primary mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-xl bg-amber-600 text-white flex items-center justify-center">
                <Network className="w-5 h-5" />
              </span>
              Interfaces and Dependencies (4.3 c)
            </h3>
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

          <div className="grc-card p-6">
            <h3 className="text-xl font-bold text-navy-900 dark:text-text-dark-primary mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-xl bg-rose-600 text-white flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </span>
              Structure of a Good ISMS Scope Document
            </h3>
            <p className="text-navy-600 dark:text-text-dark-secondary mb-4">
              Mirror the typical "ISMS Scope / Scope of the ISMS" policy layout used in compliance platforms:
            </p>
            <ol className="space-y-2 list-decimal list-inside text-sm text-navy-600 dark:text-text-dark-secondary">
              <li>Purpose</li>
              <li>Scope statement (one paragraph, certificate-ready)</li>
              <li>In-scope: organizational units, locations, products/services, systems and assets, data types</li>
              <li>Out-of-scope items, each with a written justification</li>
              <li>Interfaces and dependencies with external parties</li>
              <li>Context summary (internal and external issues) and interested parties with their requirements</li>
              <li>Roles: ISMS owner, approver (top management)</li>
              <li>Review frequency and triggers</li>
              <li>Version history and approval record</li>
            </ol>
          </div>

          <div className="grc-card p-6">
            <h3 className="text-xl font-bold text-navy-900 dark:text-text-dark-primary mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </span>
              Scope Statement Template
            </h3>
            <p className="text-navy-600 dark:text-text-dark-secondary mb-4">
              Copy and fill in. Include in all exports:
            </p>
            <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl p-4 font-mono text-sm whitespace-pre-wrap text-slate-700 dark:text-slate-300">
The Information Security Management System of [Legal entity name] applies to the [design, development, operation, support] of [product or service name], delivered from [locations or 'a remote-first workforce'] and hosted on [cloud provider and regions]. It covers [teams or functions], the supporting information assets, systems and processes, in accordance with the Statement of Applicability version [x.y] dated [date].
            </div>
            <p className="mt-4 text-sm text-navy-600 dark:text-text-dark-secondary">
              <strong>Example (Small Remote SaaS):</strong> The Information Security Management System of Acme Corp Ltd applies to the design, development, operation and support of Acme SaaS Platform, delivered from a remote-first workforce and hosted on AWS eu-west-1. It covers Engineering, Product, Operations and Security teams, the supporting information assets, systems and processes, in accordance with the Statement of Applicability version 1.0 dated 2024-01-15.
            </p>
            <p className="mt-4 text-sm text-navy-600 dark:text-text-dark-secondary">
              <strong>Example (Large Multi-site Enterprise):</strong> The Information Security Management System of GlobalCorp plc applies to the design, development, operation and support of GlobalPay Payment Gateway, delivered from London HQ (UK), Frankfurt DC (DE), Singapore DC (SG) and hosted on AWS eu-west-1, eu-central-1, ap-southeast-1. It covers Engineering, Product, Operations, Security, Finance and HR teams, the supporting information assets, systems and processes, in accordance with the Statement of Applicability version 2.3 dated 2024-06-01.
            </p>
          </div>

          <div className="grc-card p-6">
            <h3 className="text-xl font-bold text-navy-900 dark:text-text-dark-primary mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-xl bg-rose-600 text-white flex items-center justify-center">
                <AlertTriangle className="w-5 h-5" />
              </span>
              Exclusion Rationale Examples
            </h3>
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
      </div>
    </section>
  );
}

export default ScopingIntro;