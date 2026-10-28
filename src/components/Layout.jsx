import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { Menu, X, Linkedin, User as UserIcon, ShieldCheck, LogOut, BookOpenCheck, Sun, Moon, Search, ChevronDown, Globe, Building2, Shield, Users, Briefcase, Key, ClipboardCheck, Sparkles, ExternalLink } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import VisitorCounter from './VisitorCounter.jsx';
import NavHoverIcon from './NavHoverIcon.jsx';
import NewsletterPopup from './NewsletterPopup.jsx';
import InspectorCursor from './InspectorCursor.jsx';
import ChatWidget from './ChatWidget.jsx';
import DonateButton from './DonateButton.jsx';
import LinkedInStory from './LinkedInStory.jsx';
import SearchBar from './SearchBar.jsx';
import ErrorBoundary from './ErrorBoundary.jsx';
import { FEATURES } from '../config/features.js';

const STANDARDS = [
  { path: '/iso/27001/la', label: 'ISO 27001 LA' },
  { path: '/iso/27001/li', label: 'ISO 27001 LI' },
  { path: '/iso/42001', label: 'ISO 42001' },
  { path: '/iso/27090', label: 'ISO 27090' },
  { path: '/eu-ai-act', label: 'EU AI Act' },
  { path: '/iso/27017', label: 'ISO 27017' },
  { path: '/iso/27018', label: 'ISO 27018' },
  { path: '/iso/22301', label: 'ISO 22301' },
  { path: '/pci-dss', label: 'PCI-DSS' },
  { path: '/soc2', label: 'SOC 2' },
  { path: '/aigp', label: 'AIGP' },
  { path: '/cis', label: 'CIS' },
  { path: '/hipaa', label: 'HIPAA' },
  { path: '/hitrust', label: 'HITRUST' },
  { path: '/nist', label: 'NIST' },
  { path: '/fedramp', label: 'FedRAMP' },
  { path: '/gdpr', label: 'GDPR' },
  { path: '/ccpa', label: 'CCPA' },
  { path: '/coppa', label: 'COPPA' },
  { path: '/dpdpa', label: 'DPDPA' },
  { path: '/lgpd', label: 'LGPD' },
  { path: '/pdpa', label: 'PDPA' },
  { path: '/pipl', label: 'PIPL' },
  { path: '/cjis', label: 'CJIS' },
  { path: '/nis2', label: 'NIS2' },
  { path: '/dora', label: 'DORA' },
  { path: '/uk-gdpr', label: 'UK GDPR' },
  { path: '/cmmc', label: 'CMMC 2.0' },
  { path: '/whats-new', label: 'What\'s New' },
];

const MEGA_MENU_REGIONS = [
  {
    id: 'ai',
    label: 'Artificial Intelligence',
    icon: Sparkles,
    highlight: true,
    frameworks: [
      { path: '/eu-ai-act', label: 'EU AI Act', desc: 'Risk-based AI regulation (EU 2024/1689)' },
      { path: '/iso/42001', label: 'ISO 42001', desc: 'AI management system' },
      { path: '/iso/27090', label: 'ISO 27090', desc: 'Security threats to AI systems' },
      { path: '/aigp', label: 'IAPP AIGP', desc: 'AI Governance Professional certification' },
      { path: '/ai-governance', label: 'AI Governance', desc: 'ISO 42001, EU AI Act and NIST AI RMF together' },
      { path: '/?section=ai-vendors#vendor-risk', label: 'AI Vendor Assurance', desc: 'Assessing AI vendors and breach readiness' },
    ],
  },
  {
    id: 'global',
    label: 'Global / International',
    icon: Globe,
    frameworks: [
      { path: '/iso/27001/la', label: 'ISO 27001 LA', desc: 'ISMS Lead Auditor' },
      { path: '/iso/27001/li', label: 'ISO 27001 LI', desc: 'ISMS Lead Implementer' },
      { path: '/iso-22317', label: 'ISO 22317', desc: 'Business Impact Analysis (2021)' },
      { path: '/iso-31000', label: 'ISO 31000', desc: 'Enterprise Risk Management' },
      { path: '/iso-27701', label: 'ISO 27701', desc: 'Privacy Information Management (PIMS)' },
      { path: '/pci-dss', label: 'PCI-DSS', desc: 'Payment Card Data Security' },
      { path: '/soc2', label: 'SOC 2', desc: 'Trust Services Criteria' },
      { path: '/cis', label: 'CIS Controls v8', desc: 'CIS 18 Controls & IGs' },
      { path: '/hitrust', label: 'HITRUST CSF', desc: 'Healthcare Security Framework' },
    ],
  },
  {
    id: 'americas',
    label: 'Americas',
    icon: Globe,
    frameworks: [
      { path: '/fedramp', label: 'FedRAMP', desc: 'Federal Cloud Authorization (ATO, ConMon)' },
      { path: '/cjis', label: 'CJIS', desc: 'FBI Criminal Justice Information Services' },
      { path: '/nist', label: 'NIST CSF / 800-53', desc: 'Cybersecurity Framework & Controls' },
      { path: '/hipaa', label: 'HIPAA', desc: 'US Health Data Protection (PHI)' },
      { path: '/ccpa', label: 'CCPA / CPRA', desc: 'California Consumer Privacy' },
      { path: '/lgpd', label: 'LGPD', desc: 'Brazil General Data Protection Law' },
    ],
  },
  {
    id: 'emea',
    label: 'EMEA (Europe / Middle East / Africa)',
    icon: Building2,
    frameworks: [
      { path: '/gdpr', label: 'GDPR', desc: 'EU General Data Protection Regulation' },
      { path: '/cippe/eu', label: 'CIPPE/EU', desc: 'EU Privacy Professional Cert' },
      { path: '/iso/27001/la', label: 'ISO 27001 LA', desc: 'ISMS Lead Auditor (EU recognized)' },
      { path: '/iso/27001/li', label: 'ISO 27001 LI', desc: 'ISMS Lead Implementer (EU recognized)' },
      { path: '/soc2', label: 'SOC 2', desc: 'Trust Services (EU cloud vendors)' },
      { path: '/cis', label: 'CIS Controls', desc: 'CIS 18 Controls (EU adoption)' },
    ],
  },
  {
    id: 'apac',
    label: 'APAC (Asia-Pacific)',
    icon: Globe,
    frameworks: [
      { path: '/pdpa', label: 'PDPA', desc: 'Singapore Personal Data Protection Act' },
      { path: '/pipl', label: 'PIPL', desc: 'China Personal Information Protection Law' },
    ],
  },
  {
    id: 'india',
    label: 'India',
    icon: Globe,
    frameworks: [
      { path: '/dpdpa', label: 'DPDPA', desc: 'Digital Personal Data Protection Act, 2023' },
      { path: '/sebi', label: 'SEBI', desc: 'Securities and Exchange Board of India' },
      { path: '/rbi', label: 'RBI', desc: 'Reserve Bank of India cyber and IT directions' },
      { path: '/cert-in', label: 'CERT-In', desc: 'Incident reporting directions' },
      { path: '/cscrf', label: 'CSCRF', desc: 'Cyber Security and Cyber Resilience Framework' },
    ],
  },
];

export default function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [grcKbOpen, setGrcKbOpen] = useState(false);
  const [openRegions, setOpenRegions] = useState([]);
  const toggleRegion = id => setOpenRegions(o => (o.includes(id) ? o.filter(x => x !== id) : [...o, id]));
  const location = useLocation();
  const { user, logout } = useAuth();
  const [newsletterOpen, setNewsletterOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains('dark'));

  const NAV_LINK =
    'inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ' +
    'text-slate-700 hover:text-indigo-600 dark:hover:text-indigo-300 hover:bg-slate-100 dark:hover:bg-slate-800 ' +
    'dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800 ' +
    'focus:outline-none focus:ring-2 focus:ring-indigo-500/40';

  const toggleDark = () => {
    const next = !isDark;
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('compliance-dark', next ? '1' : '0');
    setIsDark(next);
  };
  useEffect(() => { try { if (localStorage.getItem('compliance-dark') === '1') { document.documentElement.classList.add('dark'); setIsDark(true); } } catch {} }, []);

  useEffect(() => {
    const key = 'newsletter_shown';
    if (localStorage.getItem(key)) return;
    const t = setTimeout(() => {
      setNewsletterOpen(true);
      localStorage.setItem(key, '1');
    }, 5000);
    return () => clearTimeout(t);
  }, []);

  // Click outside handlers
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    const handleClickOutside = (e) => {
      const menuContent = document.querySelector('[data-mobile-menu-content]');
      const menuButton = document.querySelector('[data-mobile-menu-trigger]');
      if (menuContent && !menuContent.contains(e.target) && menuButton && !menuButton.contains(e.target)) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      const trigger = document.querySelector('[data-grc-kb-trigger]');
      const dropdown = document.querySelector('[data-grc-kb-dropdown]');
      if (trigger && !trigger.contains(e.target) && dropdown && !dropdown.contains(e.target)) {
        setGrcKbOpen(false);
      }
    };
    if (grcKbOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [grcKbOpen]);

  // Mega Menu Region Component
  function MegaMenuRegion({ region }) {
    const [isOpen, setIsOpen] = useState(false);
    const triggerRef = useRef(null);
    const dropdownRef = useRef(null);

    useEffect(() => {
      const handleClickOutside = (e) => {
        if (triggerRef.current && !triggerRef.current.contains(e.target) &&
            dropdownRef.current && !dropdownRef.current.contains(e.target)) {
          setIsOpen(false);
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const Icon = region.icon;

    return (
      <div className="relative" ref={triggerRef}>
        <button
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
          onClick={(e) => { e.preventDefault(); setIsOpen(!isOpen); }}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors
            text-navy-700 dark:text-text-dark-secondary
            hover:bg-surface-200 dark:hover:bg-surface-dark-200
            hover:text-navy-900 dark:hover:text-text-dark-primary
            focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
          aria-haspopup="true"
          aria-expanded={isOpen}
        >
          <Icon className="w-4 h-4" /> {region.label}
          <ChevronDown className="w-3 h-3" />
        </button>

        {isOpen && (
          <div
            ref={dropdownRef}
            className="absolute top-full left-0 mt-2 z-[100] min-w-[280px] max-w-[360px] rounded-xl shadow-2xl shadow-slate-950/50 dark:shadow-slate-950/60 border animate-in fade-in slide-in-from-top-2 duration-200
              bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl
              border-slate-200 dark:border-slate-700/80"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
            role="menu"
          >
            <div className="p-3 border-b border-slate-200/80 dark:border-slate-700/80 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
              <h4 className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                <Icon className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                {region.label}
              </h4>
            </div>
            <div className="py-2 max-h-96 overflow-y-auto">
              {region.frameworks.map(fw => (
                <Link
                  key={fw.path}
                  to={fw.path}
                  onClick={() => setIsOpen(false)}
                  className="flex items-start gap-3 px-3 py-2.5 rounded-lg transition-colors
                    hover:bg-slate-100 dark:hover:bg-slate-800
                    text-slate-700 dark:text-slate-300
                    hover:text-slate-900 dark:hover:text-white"
                  role="menuitem"
                >
                  <div className="flex-1 min-w-0">
                    <span className="font-medium text-sm truncate text-slate-900 dark:text-white">{fw.label}</span>
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{fw.desc}</p>
                  </div>
                  <ChevronDown className="w-4 h-4 text-slate-400 dark:text-slate-500 flex-shrink-0" />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // OneLens SVG Logo component
  function OneLensLogo({ size = 32 }) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="flex-shrink-0"
      >
        <defs>
          <linearGradient id="lensGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7c3aed"/>
            <stop offset="100%" stopColor="#0ea5e9"/>
          </linearGradient>
        </defs>
        <circle cx="24" cy="24" r="22" stroke="url(#lensGradient)" strokeWidth="2.5" fill="none"/>
        <circle cx="24" cy="24" r="14" fill="url(#lensGradient)" opacity="0.15"/>
        <path d="M24 10 V14 M24 34 V38 M10 24 H14 M34 24 H38" stroke="url(#lensGradient)" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
        <circle cx="24" cy="24" r="3" fill="url(#lensGradient)"/>
        <g stroke="url(#lensGradient)" strokeWidth="0.8" opacity="0.3">
          <line x1="24" y1="14" x2="20" y2="18"/>
          <line x1="24" y1="14" x2="28" y2="18"/>
          <line x1="24" y1="34" x2="20" y2="30"/>
          <line x1="24" y1="34" x2="28" y2="30"/>
          <line x1="14" y1="24" x2="18" y2="20"/>
          <line x1="14" y1="24" x2="18" y2="28"/>
          <line x1="34" y1="24" x2="30" y2="20"/>
          <line x1="34" y1="24" x2="30" y2="28"/>
        </g>
      </svg>
    );
  }

  // GRC KB Dropdown Menu Component
  function GrcKbDropdown() {
    const triggerRef = useRef(null);
    const dropdownRef = useRef(null);

    useEffect(() => {
      if (!grcKbOpen) return;
      const handleClickOutside = (e) => {
        if (triggerRef.current && !triggerRef.current.contains(e.target) &&
            dropdownRef.current && !dropdownRef.current.contains(e.target)) {
          setGrcKbOpen(false);
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [grcKbOpen]);

    if (!grcKbOpen) return null;

    return (
      <div
        ref={dropdownRef}
        data-grc-kb-dropdown
        className="absolute right-0 top-full mt-2 z-[110] w-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 rounded-xl shadow-2xl shadow-slate-950/40 animate-in fade-in slide-in-from-top-2 duration-200"
        role="menu"
      >
        <div className="p-4">
          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            Centralized framework mapping, risk matrices, vendor governance, interview prep, and access controls - organized in discoverable modules.
          </p>
        </div>
        <div className="border-t border-slate-200 dark:border-slate-700/80">
          <Link
            to="/knowledge"
            onClick={() => setGrcKbOpen(false)}
            className="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
              hover:bg-slate-50 dark:hover:bg-slate-800
              text-slate-700 dark:text-slate-300
              hover:text-slate-900 dark:hover:text-white"
            role="menuitem"
          >
            <BookOpenCheck className="w-5 h-5 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
            <div className="flex-1 min-w-0 text-left">
              <span className="font-medium text-sm truncate text-slate-900 dark:text-white">Knowledge Base</span>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate">GRC KB - frameworks, controls, mappings</p>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400 dark:text-slate-500 flex-shrink-0" />
          </Link>
          <Link
            to="/"
            onClick={() => setGrcKbOpen(false)}
            className="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
              hover:bg-slate-50 dark:hover:bg-slate-800
              text-slate-700 dark:text-slate-300
              hover:text-slate-900 dark:hover:text-white"
            role="menuitem"
          >
            <Building2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
            <div className="flex-1 min-w-0 text-left">
              <span className="font-medium text-sm truncate text-slate-900 dark:text-white">Platform Overview</span>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate">Home - unified compliance dashboard</p>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400 dark:text-slate-500 flex-shrink-0" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-surface-50 dark:bg-dark-bg">
      {/* Responsive Header - Light mode: white with subtle border, Dark mode: dark slate */}
      <header className="sticky top-0 z-50 w-full bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
        <div className="container flex items-center justify-between h-16 px-4 gap-4">
          {/* Left section: Brand Section (Hamburger + OneLens Logo + Title) - non-shrinking */}
          <div className="flex items-center shrink-0">
            {/* Mobile menu button - always visible on mobile, hidden on lg+ */}
            <button
              data-mobile-menu-trigger
              className="flex lg:hidden shrink-0 p-2 rounded-lg transition-colors
                text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            
            {/* OneLens Brand - Logo + Title */}
            <Link
              to="/"
              className="flex-shrink-0 flex items-center gap-2 ml-3 text-base sm:text-lg font-semibold tracking-tight whitespace-nowrap truncate max-w-[180px] sm:max-w-none text-slate-900 dark:text-white cursor-pointer hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-950"
              aria-label="OneLens by Ruchi, go to homepage"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <OneLensLogo size={28} />
              <span className="hidden sm:inline">OneLens by Ruchi</span>
            </Link>
          </div>

          {/* Center: Search Bar - Fluid & Constrained */}
          <div className="flex-1 max-w-xs sm:max-w-md mx-2 sm:mx-4 min-w-0 hidden sm:block">
            <SearchBar isDark={isDark} />
          </div>

          {/* Right: Utility Controls - non-shrinking */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Theme Toggle - ALWAYS visible on header */}
            <button
              onClick={toggleDark}
              className="inline-flex items-center justify-center w-9 h-9 rounded-lg border transition-colors
                bg-white dark:bg-slate-800
                border-slate-200 dark:border-slate-700
                text-slate-700 dark:text-slate-300
                hover:bg-slate-50 dark:hover:bg-slate-800
                hover:text-slate-900 dark:hover:text-white
                focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Templates link - hidden on mobile (shown in the mobile menu instead) */}
            <Link to="/templates" className={'hidden md:inline-flex ' + NAV_LINK.replace('inline-flex ', '')}>
              Templates
            </Link>

            {/* ISO 42001 AI Link - hidden on mobile, shown on sm+ */}
            <a
              href="https://inspiring-ganache-fdd3be.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors
                bg-indigo-600 text-white hover:bg-indigo-700
                dark:bg-indigo-500 dark:hover:bg-indigo-600"
            >
              ISO 42001 AI
              <ExternalLink className="w-3.5 h-3.5 opacity-70" />
            </a>

            {/* Desktop Auth Actions - hidden on mobile */}
            <div className="hidden md:flex items-center gap-1.5">
              {!user ? (
                <Link to="/login" className={NAV_LINK}>
                  <UserIcon className="w-4 h-4" /> Login
                </Link>
              ) : (
                <>
                  {user.role === 'admin' && (
                    <Link to="/admin" className={NAV_LINK}>
                      <ShieldCheck className="w-4 h-4" /> Admin
                    </Link>
                  )}
                  {/* Merged GRC KB Dropdown */}
                  <div className="relative group" data-grc-kb-trigger>
                    <button
                      onClick={() => setGrcKbOpen(!grcKbOpen)}
                      className={NAV_LINK + ' pr-2.5'}
                      aria-haspopup="true"
                      aria-expanded={grcKbOpen}
                    >
                      <BookOpenCheck className="w-4 h-4" /> GRC KB
                      <ChevronDown className="w-3 h-3 ml-1" />
                    </button>
                    <GrcKbDropdown />
                  </div>
                  <Link to="/profile" className={NAV_LINK}>
                    <UserIcon className="w-4 h-4" /> <span className="max-w-[90px] truncate">{user.name || user.email}</span>
                  </Link>
                  <button onClick={logout} className={NAV_LINK + ' px-2.5'} aria-label="Log out">
                    <LogOut className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>

            {/* Mobile auth fallback - only shows on mobile when menu is open, not in header */}
          </div>
        </div>

        {/* Mobile Search Bar - appears below header on mobile when not in menu */}
        <div className="sm:hidden px-4 pb-4 border-b border-slate-200 dark:border-slate-800">
          <SearchBar isDark={isDark} />
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-[100] bg-white dark:bg-slate-950" data-mobile-menu-content>
          <div className="flex flex-col h-full">
            {/* Mobile Menu Header */}
            <div className="flex items-center justify-between h-16 px-4 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/95">
              <Link
                to="/"
                className="flex items-center gap-2"
                aria-label="OneLens by Ruchi, go to homepage"
                onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); setMobileMenuOpen(false); }}
              >
                <OneLensLogo size={24} />
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">OneLens by Ruchi</h2>
              </Link>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-white transition-colors"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            {/* Mobile Menu Content */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6">
              {/* GRC KB in Mobile Menu */}
              <div className="rounded-xl border border-indigo-200 dark:border-indigo-800/50 bg-indigo-50 dark:bg-indigo-900/20 p-4">
                <h3 className="font-semibold text-indigo-700 dark:text-indigo-300 mb-3 flex items-center gap-2">
                  <BookOpenCheck className="w-4 h-4" /> GRC KB
                </h3>
                <div className="space-y-2">
                  <Link
                    to="/knowledge"
                    onClick={() => { setMobileMenuOpen(false); setGrcKbOpen(false); }}
                    className="block px-3 py-2.5 text-sm text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-800/50 rounded-lg transition-colors"
                  >
                    Knowledge Base
                  </Link>
                  <Link
                    to="/templates"
                    onClick={() => { setMobileMenuOpen(false); setGrcKbOpen(false); }}
                    className="block px-3 py-2.5 text-sm text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-800/50 rounded-lg transition-colors"
                  >
                    Templates
                  </Link>
                  <Link
                    to="/"
                    onClick={() => { setMobileMenuOpen(false); setGrcKbOpen(false); }}
                    className="block px-3 py-2.5 text-sm text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-800/50 rounded-lg transition-colors"
                  >
                    Platform Overview
                  </Link>
                </div>
              </div>

              {/* Frameworks by Region */}
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-slate-400 mb-3">Frameworks by Region</h3>
                <div className="space-y-2">
                  {MEGA_MENU_REGIONS.map(region => (
                    <div key={region.id}>
                      <button
                        type="button"
                        onClick={() => toggleRegion(region.id)}
                        aria-expanded={openRegions.includes(region.id)}
                        aria-controls={`mobile-region-${region.id}`}
                        className={region.highlight
                          ? 'w-full px-4 py-3 flex items-center justify-between text-sm font-semibold rounded-lg transition-colors text-left text-white bg-gradient-to-r from-fuchsia-600 to-violet-600 hover:from-fuchsia-500 hover:to-violet-500 shadow-md shadow-fuchsia-500/20'
                          : 'w-full px-4 py-3 flex items-center justify-between text-sm font-medium text-gray-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-700/60 rounded-lg transition-colors text-left'}
                      >
                        <span className="flex items-center gap-2">
                          <region.icon className={region.highlight ? 'w-4 h-4 text-white' : 'w-4 h-4 text-indigo-600 dark:text-indigo-400'} />
                          {region.label}
                        </span>
                        <span className="flex items-center gap-2">
                          <span className={region.highlight ? 'text-xs text-white/80' : 'text-xs text-gray-400 dark:text-slate-500'}>{region.frameworks.length}</span>
                          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${region.highlight ? 'text-white' : 'text-gray-400 dark:text-slate-500'} ${openRegions.includes(region.id) ? 'rotate-180' : ''}`} />
                        </span>
                      </button>
                      {openRegions.includes(region.id) && (
                      <div id={`mobile-region-${region.id}`} className={region.highlight ? 'mt-1 px-2 py-2 space-y-1 rounded-lg border border-fuchsia-200 bg-fuchsia-50/60 dark:border-fuchsia-800/60 dark:bg-fuchsia-950/30' : 'px-4 pb-3 space-y-1'}>
                        {region.frameworks.map(fw => (
                          <Link
                            key={fw.path}
                            to={fw.path}
                            onClick={() => setMobileMenuOpen(false)}
                            className="block px-3 py-2 text-sm text-gray-700 dark:text-slate-300 hover:text-gray-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700/60 rounded-lg transition-colors"
                          >
                            <span className="font-medium truncate block text-gray-900 dark:text-white">{fw.label}</span>
                            <span className="text-xs text-gray-500 dark:text-slate-400 truncate block">{fw.desc}</span>
                          </Link>
                        ))}
                      </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Links */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-slate-400 mb-3">Quick Links</h3>
                <div className="space-y-2">
                  {!user ? (
                    <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg text-center transition-colors">
                      Sign In
                    </Link>
                  ) : (
                    <>
                      {user.role === 'admin' && (
                        <Link to="/admin" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-3 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:hover:bg-indigo-900/50 dark:text-indigo-300 font-medium rounded-lg text-center transition-colors border border-indigo-200 dark:border-indigo-800/30">
                          Admin Panel
                        </Link>
                      )}
                      <Link to="/knowledge" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-3 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:hover:bg-indigo-900/50 dark:text-indigo-300 font-medium rounded-lg text-center transition-colors border border-indigo-200 dark:border-indigo-800/30">
                        Knowledge Base
                      </Link>
                      <Link to="/" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-3 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:hover:bg-indigo-900/50 dark:text-indigo-300 font-medium rounded-lg text-center transition-colors border border-indigo-200 dark:border-indigo-800/30">
                        Platform Overview
                      </Link>
                      <Link to="/profile" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200 font-medium rounded-lg text-center transition-colors border border-slate-200 dark:border-slate-700">
                        Profile: {user.name || user.email}
                      </Link>
                      <button onClick={logout} className="block w-full px-4 py-3 bg-slate-100 hover:bg-slate-200 text-gray-500 hover:text-gray-900 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-400 dark:hover:text-white font-medium rounded-lg text-center transition-colors border border-slate-200 dark:border-slate-700">
                        Log Out
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* External Links */}
              <div className="pt-4 border-t border-slate-800">
                <a
                  href="https://inspiring-ganache-fdd3be.netlify.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 text-center text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors border border-indigo-200 dark:border-indigo-800/30"
                >
                  ISO 42001 AI Governance →
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      <main className="flex-1 pt-16 sm:pt-20">
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </main>

      <footer className="bg-gray-900 dark:bg-indigo-600 text-gray-400 py-8">
        <div className="container text-center flex flex-col items-center gap-3">
          <p className="text-sm font-bold text-white">Made by Ruchi Kandpal</p>
          <span className="text-sm text-gray-300"><LinkedInStory /></span>
          <DonateButton />
          <VisitorCounter />
        </div>
      </footer>

      <NewsletterPopup open={newsletterOpen} onClose={() => setNewsletterOpen(false)} />
      {!user && <InspectorCursor />}
      <ChatWidget />
    </div>
  );
}