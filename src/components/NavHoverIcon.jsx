import { useState } from 'react';

const FLAG_MAP = {
  'ISO 27001 LA': { type: 'nerdy', label: 'Global' },
  'ISO 27001 LI': { type: 'nerdy', label: 'Global' },
  'PCI-DSS': { type: 'nerdy', label: 'Global' },
  'SOC 2': { type: 'nerdy', label: 'Global' },
  'CIS': { type: 'nerdy', label: 'Global' },
  'HIPAA': { flag: '🇺🇸', anim: 'bounce', label: 'United States' },
  'HITRUST': { flag: '🇺🇸', anim: 'bounce', label: 'United States' },
  'NIST': { flag: '🇺🇸', anim: 'bounce', label: 'United States' },
  'GDPR': { flag: '🇪🇺', anim: 'pulse', label: 'European Union' },
  'CCPA': { flag: '🇺🇸', anim: 'bounce', label: 'United States' },
  'COPPA': { flag: '🇺🇸', anim: 'bounce', label: 'United States' },
  'DPDPA': { flag: '🇮🇳', anim: 'pulse', label: 'India' },
  'LGPD': { flag: '🇧🇷', anim: 'bounce', label: 'Brazil' },
  'PDPA': { flag: '🇸🇬', anim: 'bounce', label: 'Singapore' },
  'PIPL': { flag: '🇨🇳', anim: 'bounce', label: 'China' },
};

function NerdyGlobe() {
  return (
    <div className="nerdy-globe-wrap">
      {/* Brain */}
      <div className="nerdy-brain">
        <span className="brain-lobes">
          <span className="brain-left" />
          <span className="brain-right" />
        </span>
        <span className="brain-label">🧠</span>
      </div>
      {/* Globe body */}
      <div className="nerdy-globe-body">🌍</div>
      {/* Glasses */}
      <div className="nerdy-glasses">
        <span className="nerdy-lens" />
        <span className="nerdy-bridge" />
        <span className="nerdy-lens" />
      </div>
      {/* Eyes */}
      <div className="nerdy-eyes">
        <span className="nerdy-eye left"><span className="nerdy-pupil" /></span>
        <span className="nerdy-eye right"><span className="nerdy-pupil" /></span>
      </div>
      <div className="nerdy-label">Global Standard</div>
    </div>
  );
}

export default function NavHoverIcon({ name, children }) {
  const [hovered, setHovered] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const info = FLAG_MAP[name];

  const show = () => {
    setHovered(true);
    setLoaded(false);
    const t = setTimeout(() => setLoaded(true), 600);
    return () => clearTimeout(t);
  };
  const hide = () => { setHovered(false); setLoaded(false); };

  if (!info) return children;

  return (
    <span className="relative inline-flex" onMouseEnter={show} onMouseLeave={hide}>
      {children}
      {hovered && (
        <span className="absolute left-1/2 -translate-x-1/2 top-full mt-2 z-[60] pointer-events-none flex flex-col items-center">
          {/* Loading bar */}
          {!loaded && (
            <span className="nav-load-bar">
              <span className="nav-load-fill" />
            </span>
          )}
          {/* Icon */}
          {loaded && info.type === 'nerdy' && (
            <span className="nerdy-globe-float">
              <NerdyGlobe />
            </span>
          )}
          {loaded && info.flag && (
            <span className={`nav-flag-float flag-${info.anim}`}>
              <span className="nav-flag-emoji">{info.flag}</span>
              <span className="nav-flag-label">{info.label}</span>
            </span>
          )}
        </span>
      )}
    </span>
  );
}
