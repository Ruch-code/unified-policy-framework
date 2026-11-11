/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors';

export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // ===== LIGHT MODE PALETTE =====
        navy: {
          50: '#f0f2f5',
          100: '#e0e4eb',
          200: '#c4cad8',
          300: '#9ca8c0',
          400: '#6d7fa0',
          500: '#4a5d82',
          600: '#34456a',
          700: '#263757',
          800: '#1e293b',
          900: '#0f172a',
          950: '#080f1e',
        },
        indigo: {
          50: '#f1f4f8', 100: '#e3e9f1', 200: '#c6d2e2', 300: '#9fb2cb', 400: '#7590b0', 500: '#557395',
          600: '#415d7d', 700: '#344c67', 800: '#2a3d53', 900: '#1f2e40', 950: '#141e2b',
        },
        surface: {
          50: '#f4f2ed',
          100: '#fcfbf8',
          200: '#f1f5f9',
          300: '#e2e8f0',
          400: '#cbd5e1',
          500: '#94a3b8',
          600: '#64748b',
          700: '#475569',
          800: '#1e293b',
          900: '#0f172a',
        },
        status: {
          success: { bg: '#ecfdf5', border: '#a7f3d0', text: '#065f46', icon: '#10b981' },
          warning: { bg: '#fefce8', border: '#fde047', text: '#713f12', icon: '#eab308' },
          danger: { bg: '#fef2f2', border: '#fecaca', text: '#991b1b', icon: '#ef4444' },
          info: { bg: '#eff6ff', border: '#bfdbfe', text: '#1e3a8a', icon: '#3b82f6' },
        },

        // ===== DARK MODE PALETTE - WCAG AA Compliant =====
        dark: {
          bg: '#0f172a',
          bgSecondary: '#090d16',
        },
        'surface-dark': {
          100: '#1e293b',
          200: '#334155',
          300: '#475569',
        },
        'indigo-dark': {
          400: '#9fb2cb',
          500: '#7590b0',
          600: '#557395',
        },
        // Restrained palette: purple, neon and extra hues map onto a small set of families.
        violet: {
          50: '#f1f4f8', 100: '#e3e9f1', 200: '#c6d2e2', 300: '#9fb2cb', 400: '#7590b0', 500: '#557395',
          600: '#415d7d', 700: '#344c67', 800: '#2a3d53', 900: '#1f2e40', 950: '#141e2b',
        },
        purple: {
          50: '#f1f4f8', 100: '#e3e9f1', 200: '#c6d2e2', 300: '#9fb2cb', 400: '#7590b0', 500: '#557395',
          600: '#415d7d', 700: '#344c67', 800: '#2a3d53', 900: '#1f2e40', 950: '#141e2b',
        },
        fuchsia: {
          50: '#f1f4f8', 100: '#e3e9f1', 200: '#c6d2e2', 300: '#9fb2cb', 400: '#7590b0', 500: '#557395',
          600: '#415d7d', 700: '#344c67', 800: '#2a3d53', 900: '#1f2e40', 950: '#141e2b',
        },
        pink: colors.rose,
        lime: colors.green,
        cyan: colors.teal,
        emerald: colors.green,
        yellow: colors.amber,
        sky: colors.blue,
        'text-dark': {
          primary: '#f8fafc',
          secondary: '#cbd5e1',
          muted: '#94a3b8',
          disabled: '#64748b',
        },
        'status-dark': {
          success: { bg: '#064e3b', border: '#065f46', text: '#6ee7b7', icon: '#34d399' },
          warning: { bg: '#78350f', border: '#92400e', text: '#fcd34d', icon: '#fbbf24' },
          danger: { bg: '#7f1d1d', border: '#991b1b', text: '#fecaca', icon: '#f87171' },
          info: { bg: '#1e3a8a', border: '#1e40af', text: '#93c5fd', icon: '#60a5fa' },
        },
        // Semantic alert tints for dark mode
        'alert-dark': {
          danger: { bg: '#2d1215', border: '#7f1d1d', text: '#fecdd3' },
          warning: { bg: '#2d2200', border: '#7f6800', text: '#fef08a' },
          info: { bg: '#10203a', border: '#1e40af', text: '#bfdbfe' },
          success: { bg: '#0a2a1a', border: '#065f46', text: '#a7f3d0' },
        },
      },
      borderRadius: {
        // Crisp corners everywhere; only pills and avatars stay round.
        'sm': '2px', DEFAULT: '3px', 'md': '3px', 'lg': '4px', 'xl': '4px', '2xl': '4px', '3xl': '4px',
        'std': '4px',
        'std-lg': '4px',
        'std-sm': '3px',
        'std-xl': '4px',
        'pill': '9999px',
      },
      boxShadow: {
        sm: 'none', DEFAULT: 'none', md: 'none', lg: 'none', xl: 'none', '2xl': 'none', inner: 'none',
        card: 'none', 'card-hover': 'none', 'card-dark': 'none', 'card-hover-dark': 'none',
        fab: 'none', 'fab-hover': 'none', 'fab-dark': 'none', 'fab-hover-dark': 'none',
        dropdown: 'none', 'dropdown-dark': 'none', modal: 'none', 'modal-dark': 'none',
        'ring-indigo': '0 0 0 2px rgba(85, 115, 149, 0.5)',
      },
      dropShadow: { sm: '0 0 #0000', DEFAULT: '0 0 #0000', md: '0 0 #0000', lg: '0 0 #0000', xl: '0 0 #0000', '2xl': '0 0 #0000' },
      transitionDuration: {
        'fast': '150ms',
        'normal': '200ms',
        'slow': '300ms',
      },
      fontFamily: {
        'sans': ['"IBM Plex Sans"', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        'serif': ['"IBM Plex Serif"', 'Georgia', 'serif'],
        'mono': ['"IBM Plex Mono"', 'Consolas', 'monospace'],
      },
      fontSize: {
        'display': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'h1': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'h2': ['2.25rem', { lineHeight: '1.25', letterSpacing: '-0.01em' }],
        'h3': ['1.875rem', { lineHeight: '1.3', letterSpacing: '0' }],
        'h4': ['1.5rem', { lineHeight: '1.35' }],
        'h5': ['1.25rem', { lineHeight: '1.4' }],
        'h6': ['1rem', { lineHeight: '1.45' }],
        'body-lg': ['1.125rem', { lineHeight: '1.6' }],
        'body': ['1rem', { lineHeight: '1.6' }],
        'body-sm': ['0.875rem', { lineHeight: '1.5' }],
        'caption': ['0.75rem', { lineHeight: '1.5' }],
      },
    },
  },
  plugins: [],
}