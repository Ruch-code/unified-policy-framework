import { Building2, Users, Briefcase, GraduationCap, Globe, Shield, Server, Database, Cloud, Network, Lock, CheckCircle, AlertTriangle, ChevronRight, ArrowRight, Zap, Cpu, Smartphone, Layers, Network as NetworkIcon, HardDrive, Cloud as CloudIcon, ClipboardCheck, ChevronDown, Menu, X } from 'lucide-react';

function SizeProfileTabs({ isDark = false, activeSize, onSizeChange }) {
  const sizes = [
    { id: 'small', label: 'Small (1-50)', icon: Users, color: 'blue' },
    { id: 'medium', label: 'Medium (51-500)', icon: Building2, color: 'amber' },
    { id: 'large', label: 'Large (500+)', icon: Globe, color: 'purple' },
  ];

  const profiles = {
    small: {
      description: 'Typical startup. Whole company and single product. One legal entity. Fully remote or one office. Production 100% cloud. Heavy SaaS use. Founder or CTO as ISMS owner. Compliance platform for evidence. Risk register 15-30 risks.',
      challenges: [
        'Excluding physical controls without naming who covers them',
        'Forgetting contractors and personal devices',
        'Scoping only the app and omitting HR, onboarding, vendor processes'
      ]
    },
    medium: {
      description: 'Multiple teams, possibly two or more offices or regions, maybe one subsidiary. Mix of cloud and some on-prem (office network, NAS, build servers). Dedicated security or GRC lead; separate IT function. Decide whether to scope all products or revenue-critical one first.',
      challenges: [
        'Shared corporate IT (identity, email, endpoints) left out of scope while in-scope products depend on it',
        'Inconsistent controls across offices'
      ]
    },
    large: {
      description: 'Scope often phased: start with business unit, product line or data centre, then expand. Multiple legal entities, jurisdictions, data centres, outsourced SOC or MSP. Formal governance: CISO, risk committee, internal audit. Certification body sampling of multiple sites.',
      challenges: [
        'Boundary drawn through shared infrastructure with no interface control',
        'Carve-outs that customers misread',
        'Group policies not adopted by the in-scope entity'
      ]
    }
  };

  return (
    <section className="py-8" id="size-profiles">
      <div className="container mx-auto px-4">
        <div className="grc-card p-6 mb-8">
          <h2 className="text-2xl font-bold text-navy-900 dark:text-text-dark-primary mb-4 flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-purple-600 text-white flex items-center justify-center">
              <Users className="w-5 h-5" />
            </span>
            Organization Size Profiles
          </h2>
          <p className="text-navy-600 dark:text-text-dark-secondary mb-6 max-w-3xl">
            Select your organization size to see tailored guidance. The checklist filters automatically.
          </p>

          <div className="flex flex-wrap gap-2 mb-6" role="tablist" aria-label="Organization size profiles">
            {sizes.map(size => (
              <button
                key={size.id}
                role="tab"
                aria-selected={activeSize === size.id}
                onClick={() => onSizeChange(size.id)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200
                  ${activeSize === size.id
                    ? `bg-${size.color}-600 text-white shadow-lg`
                    : isDark
                      ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      : 'bg-white text-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                aria-controls={`panel-${size.id}`}
              >
                <size.icon className="w-4 h-4" />
                {size.label}
              </button>
            ))}
          </div>

          <div role="tabpanel" id={`panel-${activeSize}`} aria-labelledby={`tab-${activeSize}`}>
            {profiles[activeSize] && (
              <>
                <p className="text-navy-600 dark:text-text-dark-secondary mb-6 max-w-3xl">{profiles[activeSize].description}</p>
                <h3 className="text-lg font-bold text-navy-900 dark:text-text-dark-primary mb-4">Common Pitfalls</h3>
                <ul className="space-y-2 list-disc list-inside text-sm text-navy-600 dark:text-text-dark-secondary">
                  {profiles[activeSize].challenges.map((challenge, i) => (
                    <li key={i}>{challenge}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default SizeProfileTabs;