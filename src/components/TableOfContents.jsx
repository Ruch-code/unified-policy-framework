import React, { useEffect, useState, useRef } from 'react';
import { ChevronRight, FileText, Minus, Plus } from 'lucide-react';

interface ToCItem {
  id: string;
  label: string;
  level: number;
  element?: HTMLElement;
}

interface TableOfContentsProps {
  /** Container to observe for headings (defaults to main content area) */
  containerSelector?: string;
  /** Heading selectors to include in ToC */
  headingSelectors?: string[];
  /** Title for the ToC */
  title?: string;
  /** Whether ToC starts collapsed on mobile */
  defaultCollapsed?: boolean;
  /** Custom className */
  className?: string;
  /** Whether to show in dark mode */
  isDark?: boolean;
}

export default function TableOfContents({
  containerSelector = 'main, article, .content, [role="main"]',
  headingSelectors = ['h2', 'h3'],
  title = 'On this page',
  defaultCollapsed = false,
  className = '',
  isDark = false,
}: TableOfContentsProps) {
  const [items, setItems] = useState<ToCItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const tocRef = useRef<HTMLDivElement>(null);

  // Build ToC from headings
  useEffect(() => {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    const headings = Array.from(container.querySelectorAll(headingSelectors.join(','))) as HTMLElement[];
    const tocItems: ToCItem[] = headings
      .filter(h => h.id || (h.textContent && h.textContent.trim().length > 0))
      .map((h, index) => {
        // Generate ID if missing
        if (!h.id) {
          const text = h.textContent?.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || `section-${index}`;
          h.id = text;
        }
        return {
          id: h.id,
          label: h.textContent?.trim() || '',
          level: parseInt(h.tagName.charAt(1)),
          element: h,
        };
      });

    setItems(tocItems);
  }, [containerSelector, headingSelectors]);

  // Scroll spy - track active heading
  useEffect(() => {
    if (items.length === 0) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100; // Offset for header
      
      // Find the last heading that's above the scroll position
      let newActiveId = '';
      for (const item of items) {
        if (item.element) {
          const rect = item.element.getBoundingClientRect();
          const absoluteTop = rect.top + window.scrollY;
          if (absoluteTop <= scrollPosition) {
            newActiveId = item.id;
          } else {
            break;
          }
        }
      }
      
      if (newActiveId !== activeId) {
        setActiveId(newActiveId);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, [items, activeId]);

  // Smooth scroll to section
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Update URL without page reload
      history.pushState(null, '', `#${id}`);
      setActiveId(id);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!tocRef.current?.contains(document.activeElement)) return;
      
      const visibleItems = items.filter(i => i.level <= 3); // Limit depth for keyboard nav
      const currentIndex = visibleItems.findIndex(i => i.id === activeId);
      
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const next = visibleItems[Math.min(currentIndex + 1, visibleItems.length - 1)];
        if (next) scrollToSection(next.id);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const prev = visibleItems[Math.max(currentIndex - 1, 0)];
        if (prev) scrollToSection(prev.id);
      } else if (e.key === 'Home') {
        e.preventDefault();
        if (visibleItems[0]) scrollToSection(visibleItems[0].id);
      } else if (e.key === 'End') {
        e.preventDefault();
        if (visibleItems[visibleItems.length - 1]) scrollToSection(visibleItems[visibleItems.length - 1].id);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [items, activeId]);

  if (items.length === 0) return null;

  // Group items by top-level (h2) sections
  const topLevelItems = items.filter(i => i.level === 2);
  const hasChildren = (parentId: string) => items.some(i => i.level > 2 && i.id !== parentId);

  return (
    <aside
      ref={tocRef}
      className={`fixed lg:sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto transition-all duration-300
        ${isDark
          ? 'bg-surface-dark-100/95 backdrop-blur-sm border border-surface-dark-300 text-text-dark-primary'
          : 'bg-surface-100/95 backdrop-blur-sm border border-surface-300 text-navy-900'
        }
        rounded-xl shadow-xl p-4 w-72 ${className}`}
      role="navigation"
      aria-label="Table of contents"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-surface-300 dark:border-surface-dark-300">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          <h3 className="font-semibold text-sm">{title}</h3>
        </div>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 rounded hover:bg-surface-200 dark:hover:bg-surface-dark-200 transition-colors"
          aria-label={isCollapsed ? 'Expand table of contents' : 'Collapse table of contents'}
          aria-expanded={!isCollapsed}
        >
          {isCollapsed ? <Plus className="w-4 h-4" /> : <Minus className="w-4 h-4" />}
        </button>
      </div>

      {/* Content */}
      {!isCollapsed && (
        <nav className="space-y-2" role="list" aria-label="Page sections">
          {topLevelItems.map((item, index) => (
            <ToCItemLink
              key={item.id}
              item={item}
              items={items}
              activeId={activeId}
              onClick={scrollToSection}
              index={index}
              isDark={isDark}
            />
          ))}
        </nav>
      )}
    </aside>
  );
}

// Individual ToC item component with children
function ToCItemLink({
  item,
  items,
  activeId,
  onClick,
  index,
  isDark,
}: {
  item: ToCItem;
  items: ToCItem[];
  activeId: string;
  onClick: (id: string) => void;
  index: number;
  isDark: boolean;
}) {
  const isActive = activeId === item.id;
  const children = items.filter(i => i.level > item.level && i.level === item.level + 1);
  const [showChildren, setShowChildren] = useState(children.length > 0);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onClick(item.id);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick(item.id);
    } else if (e.key === 'ArrowRight' && children.length > 0) {
      e.preventDefault();
      setShowChildren(true);
    } else if (e.key === 'ArrowLeft' && children.length > 0) {
      e.preventDefault();
      setShowChildren(false);
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-left-2 duration-200" style={{ marginLeft: `${(item.level - 2) * 12}px`, animationDelay: `${index * 30}ms` }}>
      <button
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className={`w-full text-left px-2 py-1.5 rounded-lg text-sm font-medium transition-all duration-200
          ${isActive
            ? (isDark ? 'bg-indigo-600/20 text-indigo-300' : 'bg-indigo-50 text-indigo-700')
            : 'hover:bg-surface-200 dark:hover:bg-surface-dark-200'
          }
          focus:outline-none focus:ring-2 focus:ring-indigo-500/50`}
        role="listitem"
        aria-current={isActive ? 'page' : undefined}
        aria-expanded={children.length > 0 ? showChildren : undefined}
      >
        <div className="flex items-center gap-2">
          {children.length > 0 && (
            <button
              onClick={(e) => { e.stopPropagation(); setShowChildren(!showChildren); }}
              className="p-0.5 rounded flex-shrink-0 text-gray-400 dark:text-slate-500 hover:text-gray-600 dark:hover:text-slate-300"
              aria-label={showChildren ? `Collapse ${item.label}` : `Expand ${item.label}`}
            >
              <ChevronRight className={`w-3 h-3 transition-transform ${showChildren ? 'rotate-90' : ''}`} />
            </button>
          )}
          <span className="truncate flex-1">{item.label}</span>
          {isActive && (
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400 flex-shrink-0" aria-hidden="true" />
          )}
        </div>
      </button>

      {children.length > 0 && showChildren && (
        <div className="mt-1 ml-2 border-l border-surface-300 dark:border-surface-dark-300 pl-2 space-y-1 animate-in fade-in slide-in-from-top-2 duration-200">
          {children.map((child, childIndex) => (
            <ToCItemLink
              key={child.id}
              item={child}
              items={items}
              activeId={activeId}
              onClick={onClick}
              index={childIndex}
              isDark={isDark}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// Hook for scroll-to-section with offset
export function useScrollToSection() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100; // Account for fixed header
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      history.pushState(null, '', `#${id}`);
    }
  };

  return { scrollToSection };
}

// HOC to add ToC to any page component
export function withTableOfContents<P extends object>(
  Component: React.ComponentType<P>,
  tocProps?: Omit<TableOfContentsProps, 'isDark'>
) {
  return function WithToC(props: P & { isDark?: boolean }) {
    const isDark = props.isDark ?? false;
    return (
      <div className="flex">
        <div className="flex-1 lg:mr-8 min-w-0">
          <Component {...props} />
        </div>
        <div className="hidden lg:block w-72 shrink-0">
          <TableOfContents {...tocProps} isDark={isDark} />
        </div>
      </div>
    );
  };
}