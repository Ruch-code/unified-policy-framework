import { Outlet, Link, useLocation } from 'react-router-dom';
import { Menu, X, Linkedin } from 'lucide-react';
import { useState } from 'react';
import VisitorCounter from './VisitorCounter';
import NavHoverIcon from './NavHoverIcon';

const STANDARDS = [
  { path: '/iso/27001/la', label: 'ISO 27001 LA' },
  { path: '/iso/27001/li', label: 'ISO 27001 LI' },
  { path: '/pci-dss', label: 'PCI-DSS' },
  { path: '/soc2', label: 'SOC 2' },
  { path: '/cis', label: 'CIS' },
  { path: '/hipaa', label: 'HIPAA' },
  { path: '/hitrust', label: 'HITRUST' },
  { path: '/nist', label: 'NIST' },
  { path: '/gdpr', label: 'GDPR' },
  { path: '/ccpa', label: 'CCPA' },
  { path: '/coppa', label: 'COPPA' },
  { path: '/dpdpa', label: 'DPDPA' },
  { path: '/lgpd', label: 'LGPD' },
  { path: '/pdpa', label: 'PDPA' },
  { path: '/pipl', label: 'PIPL' },
];

export default function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <button
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6 text-gray-700" /> : <Menu className="w-6 h-6 text-gray-700" />}
              </button>
              <Link to="/" className="text-xl md:text-2xl font-bold text-[#1e293b] tracking-tight">
                Unified Compliance
              </Link>
            </div>

            <nav className="hidden lg:flex items-center gap-1">
              {STANDARDS.map(s => (
                <NavHoverIcon key={s.path} name={s.label}>
                  <Link
                    to={s.path}
                    className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                      location.pathname === s.path
                        ? 'bg-[#1e293b] text-white'
                        : 'text-gray-600 hover:text-[#1e293b] hover:bg-gray-100'
                    }`}
                  >
                    {s.label}
                  </Link>
                </NavHoverIcon>
              ))}
            </nav>

            <a
              href="https://inspiring-ganache-fdd3be.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-2 bg-[#7c3aed] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#6d28d9] transition-colors"
            >
              ISO 42001 AI
              <span className="text-[10px] opacity-70">↗</span>
            </a>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white">
            <div className="container py-4 flex flex-col gap-1">
              {STANDARDS.map(s => (
                <NavHoverIcon key={s.path} name={s.label}>
                  <Link
                    to={s.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      location.pathname === s.path
                        ? 'bg-[#1e293b] text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {s.label}
                  </Link>
                </NavHoverIcon>
              ))}
              <div className="mt-2 pt-2 border-t border-gray-100">
                <a
                  href="https://inspiring-ganache-fdd3be.netlify.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2.5 rounded-lg text-sm font-medium text-[#7c3aed] hover:bg-[#f5f3ff] transition-colors"
                >
                  ISO 42001 AI Governance →
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="container text-center flex flex-col items-center gap-3">
          <p className="text-sm font-bold text-white">Made by Ruchi Kandpal</p>
          <a
            href="https://www.linkedin.com/in/ruchi-k/"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-gray-400 hover:text-[#0a66c2] transition-colors duration-300"
            aria-label="LinkedIn Profile"
          >
            <span className="relative flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 group-hover:bg-[#0a66c2]/20 transition-all duration-300 group-hover:scale-110 group-hover:rotate-[360deg] group-hover:shadow-[0_0_20px_rgba(10,102,194,0.4)]">
              <Linkedin className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
            </span>
            <span className="text-sm hidden sm:inline opacity-0 group-hover:opacity-100 transition-opacity duration-300">Let's connect</span>
          </a>
          <VisitorCounter />
        </div>
      </footer>
    </div>
  );
}
