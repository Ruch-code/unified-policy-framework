import React, { useState, useRef, useEffect } from 'react';
import { Search, X, ChevronRight, Sparkles, ExternalLink } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  searchCompliance,
  SEARCH_CATEGORIES,
  SUGGESTIONS,
} from '../data/searchIndex.js';

const esc = (s = '') => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/**
 * Display-only label shortening.
 *
 * The dropdown already renders a category heading above each group, so a label
 * that repeats its category is spending scarce horizontal space on a word the
 * user has already read. Explicit entries handle the labels that are long for
 * their own reasons.
 *
 * IMPORTANT: this only affects the text shown. `item.label` is left untouched
 * so search matching, navigation, and the hover tooltip all still use the full
 * original string.
 */
const SHORT_LABELS = {
  // Requested explicitly
  'Administrator': 'Admin',
  'Unified Compliance & GRC Platform': 'GRC Platform',
  // Longest labels actually present in the search index
  'Security Operations — Incident Response P0–P3 Triage, Containment & RCA':
    'Incident Response Triage & RCA',
  'Security Operations — Vulnerability Management & Patch SLAs':
    'Vulnerability Mgmt & Patch SLAs',
  'Security Operations — Logging, Monitoring & SIEM Retention':
    'Logging, Monitoring & SIEM',
  'AI Governance & Emerging Tech — ISO 42001, EU AI Act, NIST AI RMF':
    'AI Governance & Emerging Tech',
  'ISO 42001 — AI Management Systems (Knowledge Base)':
    'ISO 42001 — AI Mgmt Systems',
  'ISO 42001 — AI Management Systems': 'ISO 42001 — AI Mgmt Systems',
  'User Access Review — Coverage, Users & Frequency': 'User Access Review',
  'Password Policies & Authentication Strategies': 'Password & Authentication',
  'ISO/IEC 27001:2022 Lead Auditor Playbook': 'ISO 27001 — Lead Auditor',
  'ISO/IEC 27001:2022 ISMS Implementation': 'ISO 27001 — ISMS Implementation',
};

/** Categories whose name is already rendered as the group heading. */
const REDUNDANT_PREFIXES = [
  'Persona Requirements — ',
  'Control Domains & Mappings — ',
  'Policy & Control Modules — ',
];

function shortenLabel(label = '') {
  if (SHORT_LABELS[label]) return SHORT_LABELS[label];
  for (const prefix of REDUNDANT_PREFIXES) {
    if (label.startsWith(prefix)) return label.slice(prefix.length);
  }
  return label;
}

/** True when the visible text differs from the real label, so a tooltip is useful. */
const isShortened = (label = '') => shortenLabel(label) !== label;

function Highlight({ text = '', terms = [] }) {
  const list = [...new Set(terms.map(t => String(t).toLowerCase()).filter(t => t && t.length > 1))];
  list.sort((a, b) => b.length - a.length);
  if (!text || !list.length) return <>{text}</>;
  const re = new RegExp(`(${list.map(esc).join('|')})`, 'gi');
  const parts = String(text).split(re);
  return (
    <>
      {parts.map((p, i) =>
        p && list.includes(String(p).toLowerCase()) ? (
          <span key={i} className="search-hl">{p}</span>
        ) : (
          <span key={i}>{p}</span>
        ),
      )}
    </>
  );
}

function getIcon(category) {
  switch (category) {
    case 'Frameworks & Standards': return '🏛️';
    case 'Policy & Control Modules': return '📘';
    case 'Persona Requirements': return '👤';
    case 'Control Domains & Mappings': return '🧩';
    default: return '🔍';
  }
}

export default function SearchBar({ isDark = false }) {
  const [query, setQuery] = useState('');
  const [searchQ, setSearchQ] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);
  const mobileOverlayRef = useRef(null);
  const wrapperRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;

  // Debounce the live search so heavy queries (900+ entries) don't re-run per keystroke.
  useEffect(() => {
    if (!query) {
      setSearchQ('');
      return;
    }
    const t = setTimeout(() => setSearchQ(query), 120);
    return () => clearTimeout(t);
  }, [query]);

  const result = searchQ ? searchCompliance(searchQ) : null;
  const flatItems = result?.items || [];
  const grouped = result?.grouped || {};
  const expansions = result?.expansions || [];

  const closeAll = (clear = true) => {
    setIsOpen(false);
    setIsMobileOpen(false);
    if (clear) setQuery('');
    setSelectedIndex(-1);
  };

  // Click outside / Escape
  useEffect(() => {
    const handleClickOutside = (e) => {
      const isInsideDropdown = dropdownRef.current?.contains(e.target);
      const isInsideMobile = mobileOverlayRef.current?.contains(e.target);
      const isInput = inputRef.current?.contains(e.target);
      const isMobileTrigger = e.target.closest?.('[data-search-mobile-trigger]');
      if (!isInsideDropdown && !isInsideMobile && !isInput && !isMobileTrigger) {
        closeAll();
      }
    };
    const handleKeyDown = (e) => {
      if (!isOpen && !isMobileOpen) return;
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => Math.min(prev + 1, flatItems.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => Math.max(prev - 1, -1));
      } else if (e.key === 'Enter') {
        if (selectedIndex >= 0 && flatItems[selectedIndex]) {
          e.preventDefault();
          handleSelect(flatItems[selectedIndex]);
        } else if (flatItems.length === 1) {
          e.preventDefault();
          handleSelect(flatItems[0]);
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        closeAll();
        inputRef.current?.blur();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, isMobileOpen, flatItems, selectedIndex]);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setIsOpen(!!value);
    setIsMobileOpen(!!value);
    setSelectedIndex(-1);
  };

  const handleFocus = () => {
    if (query) {
      setIsOpen(true);
      setIsMobileOpen(true);
    }
  };

  const handleSelect = (item) => {
    closeAll();
    if (!item) return;
    if (item.mode === 'external') {
      window.open(item.path, '_blank', 'noopener,noreferrer');
      return;
    }
    if (item.mode === 'hash' && item.anchorId) {
      handleHashNavigate(item.anchorId);
      return;
    }
    navigate(item.path);
  };

  // Deep-link to a Home tab panel with smooth scroll + focus flash
  const handleHashNavigate = (anchorId) => {
    closeAll();
    const scroll = () => {
      window.dispatchEvent(
        new CustomEvent('compliance:scroll-to-section', { detail: { id: anchorId } }),
      );
    };
    if (window.location.pathname !== '/') {
      navigate('/#' + anchorId);
      setTimeout(scroll, 120);
    } else {
      window.location.hash = anchorId;
      setTimeout(scroll, 80);
    }
  };

  const handleSuggestion = (s) => {
    setQuery(s);
    setIsOpen(true);
    setIsMobileOpen(true);
    setSelectedIndex(-1);
    setTimeout(() => inputRef.current?.focus(), 30);
  };

  const handleMobileSearchToggle = () => {
    if (isMobileOpen) {
      closeAll(false);
    } else {
      setIsMobileOpen(true);
      setIsOpen(true);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  };

  const inputStyles = `
    flex-1 w-full min-w-0 pl-9 pr-9 py-1.5 rounded-xl text-sm
    transition-all duration-200 ease-in-out truncate
    ${isDark
      ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:bg-slate-800 focus:outline-none'
      : 'bg-slate-100 border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:bg-white focus:outline-none'
    }
  `;

  // The header is a flex row whose right-hand auth cluster competes for space, so
  // the search column can collapse to ~190px. A dropdown at that width clips
  // labels to a few characters. The min-w keeps the panel at a readable size
  // without pushing the header around — absolute positioning means it can
  // overhang the input, which is what a wide result list wants.
  //
  // The 26rem step is deliberately gated to lg+. The panel is anchored to the
  // input, which sits ~256px from the left edge, so anything wider than ~24rem
  // would overhang the viewport between sm (640px) and lg (1024px). 22rem fits
  // at every width the desktop bar is visible.
  const dropdownStyles = `
    absolute top-full left-0 right-0 mt-2 z-[100] w-full min-w-[22rem] lg:min-w-[26rem] max-w-[calc(100vw-2rem)] max-h-[28rem] overflow-y-auto overflow-x-hidden
    rounded-2xl shadow-2xl shadow-slate-950/50 dark:shadow-slate-950/60 border animate-in fade-in slide-in-from-top-2 duration-200 p-2
    ${isDark
      ? 'bg-slate-900 border-slate-700'
      : 'bg-white border-slate-200'
    }
  `;

  const mobileOverlayStyles = `
    fixed inset-0 z-[90]
    ${isDark ? 'bg-slate-950/95 backdrop-blur-xl' : 'bg-white/95 backdrop-blur-xl'}
    animate-in fade-in duration-200
  `;

  function renderSectionLabel(category) {
    return (
      <div className={`px-3 pb-1 pt-3 text-[11px] font-semibold uppercase tracking-wider flex items-center gap-1.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
        <span aria-hidden="true">{getIcon(category)}</span>
        {category}
      </div>
    );
  }

  function renderItem(item, compact = false) {
    const globalIndex = flatItems.indexOf(item);
    const isSelected = selectedIndex === globalIndex;
    const isCurrent = location.pathname === item.path;
    const display = shortenLabel(item.label);
    const full = item.label;
    return (
      <button
        key={item.id || item.path}
        type="button"
        onClick={() => handleSelect(item)}
        onMouseEnter={() => setSelectedIndex(globalIndex)}
        className={`group flex items-center gap-3 w-full min-w-0 text-left px-3 transition-colors rounded-xl
          ${compact ? 'py-2.5' : 'py-3'}
          ${isSelected
            ? (isDark ? 'bg-indigo-600/20 text-white' : 'bg-indigo-50 text-indigo-900')
            : (isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-100')}`}
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 min-w-0">
            {/*
              min-w-0 is what actually makes truncation work: a flex item
              defaults to min-width:auto and refuses to shrink below its text,
              so `truncate` never engages and the label pushes the badges and
              the chevron out of bounds. block keeps the ellipsis on one line.
            */}
            <span
              className={`block min-w-0 flex-1 font-medium truncate text-slate-900 dark:text-slate-100 group-hover:text-slate-900 dark:group-hover:text-white ${compact ? 'text-sm' : 'text-base'}`}
              title={isShortened(full) ? full : undefined}
            >
              <Highlight text={display} terms={expansions} />
            </span>
            {isCurrent && (
              <span className="text-xs text-indigo-500 dark:text-indigo-300 font-medium shrink-0">Current</span>
            )}
            {item.mode === 'external' && (
              <ExternalLink className={`w-3.5 h-3.5 shrink-0 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
            )}
          </div>
          <p
            className={`truncate min-w-0 text-slate-500 dark:text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200 ${compact ? 'text-xs mt-0.5' : 'text-sm mt-0.5'}`}
            title={item.desc}
          >
            <Highlight text={item.desc} terms={expansions} />
          </p>
        </div>
        <ChevronRight className={`w-4 h-4 flex-shrink-0 group-hover:text-indigo-600 dark:group-hover:text-indigo-300 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
      </button>
    );
  }

  function renderResults(compact = false) {
    if (!query) {
      return (
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <span className={`inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              <Sparkles className="w-3.5 h-3.5" /> Suggested Searches
            </span>
            {!compact && <kbd className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700">Esc</kbd>}
          </div>
          <div className="flex flex-wrap gap-2">
            {SUGGESTIONS.map(s => (
              <button
                key={s}
                type="button"
                onClick={() => handleSuggestion(s)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors border
                  ${isDark
                    ? 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700 hover:text-white hover:border-indigo-500/60'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-300'}`}
              >
                {s}
              </button>
            ))}
          </div>
          <p className={`mt-4 text-xs ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
            Search frameworks, policies, personas, cloud providers, and control domains — e.g. “azure”, “contractors”, “background checks”.
          </p>
        </div>
      );
    }

    if (query && !result) {
      return (
        <div className="p-4">
          <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Searching…</p>
        </div>
      );
    }

    if (result && result.count === 0) {
      return (
        <div className="p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${isDark ? 'bg-slate-800' : 'bg-slate-100'}`}>
              <Search className={`w-4 h-4 ${isDark ? 'text-slate-400' : 'text-slate-500'}`} />
            </div>
            <div>
              <p className={`font-medium ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                No matches for “{query}”
              </p>
              <p className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                Try one of these instead
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {SUGGESTIONS.map(s => (
              <button
                key={s}
                type="button"
                onClick={() => handleSuggestion(s)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors border
                  ${isDark
                    ? 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700 hover:text-white hover:border-indigo-500/60'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-300'}`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div>
        {SEARCH_CATEGORIES.map(category => {
          const items = grouped[category];
          if (!items?.length) return null;
          return (
            <div key={category}>
              {renderSectionLabel(category)}
              <div className="space-y-0.5">
                {items.map(item => renderItem(item, compact))}
              </div>
            </div>
          );
        })}
        <div className={`px-3 pt-2 pb-1 text-[11px] ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
          {result.count} result{result.count !== 1 ? 's' : ''} · <span className="opacity-80">↑↓ to navigate, Enter to open</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <div ref={wrapperRef} className="relative flex items-center w-full max-w-md md:max-w-lg lg:max-w-xl" role="search">
        <div className="relative w-full flex items-center">
          <Search
            className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 flex-shrink-0 pointer-events-none ${isDark ? 'text-slate-500' : 'text-slate-500'}`}
            aria-hidden="true"
          />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={handleChange}
            onFocus={handleFocus}
            placeholder="Search frameworks, policies, keywords…"
            className={inputStyles}
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
            aria-label="Search compliance frameworks and regulations"
            aria-expanded={isOpen || isMobileOpen}
            aria-controls="search-results"
            aria-autocomplete="list"
          />
          {query && (
            <button
              onClick={(e) => { e.preventDefault(); closeAll(); inputRef.current?.focus(); }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-lg transition-colors"
              aria-label="Clear search query"
              type="button"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          {!isMobile && query && result && result.count > 0 && (
            <span className={`hidden lg:block absolute right-9 top-1/2 -translate-y-1/2 text-xs font-medium px-2 py-0.5 rounded-full ${isDark ? 'bg-slate-800 text-indigo-300' : 'bg-indigo-50 text-indigo-600'}`}>
              {result.count}
            </span>
          )}
        </div>

        {!isMobile && (isOpen || isMobileOpen) && (
          <div id="search-results" ref={dropdownRef} className={dropdownStyles} role="listbox" aria-label="Search results">
            {renderResults()}
          </div>
        )}
      </div>

      {isMobile && (
        <button
          data-search-mobile-trigger
          onClick={handleMobileSearchToggle}
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200
            ${isDark
              ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }
            ${isMobileOpen && 'bg-indigo-600 text-white shadow-[0_4px_14px_rgba(79,70,229,0.35)]'}"
          aria-label={isMobileOpen ? 'Close search' : 'Open search'}
          aria-expanded={isMobileOpen}
          aria-controls="mobile-search-overlay"
          type="button"
        >
          <Search className="w-5 h-5" />
        </button>
      )}

      {isMobile && isMobileOpen && (
        <div id="mobile-search-overlay" ref={mobileOverlayRef} className={mobileOverlayStyles} role="dialog" aria-modal="true" aria-label="Search frameworks">
          <div className="relative h-full flex flex-col">
            <div className="p-4 md:p-6 border-b border-slate-200/80 dark:border-slate-700/80 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl">
              <div className="relative max-w-2xl mx-auto">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  ref={inputRef}
                  type="search"
                  value={query}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  placeholder="Search frameworks, policies, keywords…"
                  className={`
                    w-full pl-12 pr-12 py-3.5 rounded-xl text-base
                    transition-all duration-200 ease-in-out truncate
                    ${isDark
                      ? 'bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20 focus:outline-none'
                      : 'bg-slate-100 border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:bg-white focus:outline-none'
                    }
                  `}
                  autoComplete="off"
                  autoCapitalize="off"
                  autoCorrect="off"
                  spellCheck={false}
                  aria-label="Search compliance frameworks and regulations"
                  aria-autocomplete="list"
                  aria-controls="mobile-search-results"
                />
                {query && (
                  <button
                    onClick={() => closeAll()}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 dark:hover:text-slate-100 p-1.5 rounded-lg transition-colors"
                    aria-label="Clear search query"
                    type="button"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>

            <div id="mobile-search-results" className="flex-1 overflow-y-auto p-3 md:p-6" role="listbox" aria-label="Search results">
              {renderResults(true)}
            </div>
          </div>
        </div>
      )}
    </>
  );
}