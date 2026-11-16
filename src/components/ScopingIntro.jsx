import { Copy, FileText, Shield, Building2, Database, Globe, Network, Lock, Users, AlertTriangle, Lightbulb, CheckCircle, ChevronDown, ChevronRight } from 'lucide-react';

function ScopingIntro({ isDark = false }) {
  return (
    <section id="scoping-guide" className="py-8">
      <div className="container mx-auto px-4">
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

        </div>
      </div>
    </section>
  );
}

export default ScopingIntro;