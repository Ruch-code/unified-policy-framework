# Baseline Documentation

Generated: 2026-10-20

## Build Status
- ✅ Build passes (`npm run build`)
- ✅ Tests pass (`npm test` - 57 tests)
- ⚠️ Build warnings: Duplicate key warnings in VendorRiskManagement.jsx (fixed), chunk size > 500kB

## Routes

### Public Routes
- `/` - Home page (protected by RequireAuth, redirects to /login if not authenticated)
- `/login` - Login/Signup/Forgot password page
- `/signup` - Part of login page (tab)
- `/forgot` - Part of login page (tab)

### Protected Routes (require authentication)
- `/iso/27001/la` - ISO 27001 Lead Auditor
- `/iso/27001/li` - ISO 27001 Lead Implementer
- `/iso-31000` - ISO 31000 Risk Management
- `/iso-27701` - ISO 27701 PIMS
- `/pci-dss` - PCI DSS
- `/soc2` - SOC 2
- `/hipaa` - HIPAA
- `/nist` - NIST CSF / 800-53
- `/cippe/us` - CIPP/US
- `/hitrust` - HITRUST CSF
- `/coppa` - COPPA
- `/ccpa` - CCPA/CPRA
- `/gdpr` - GDPR
- `/cippe/eu` - CIPP/EU
- `/dpdpa` - DPDPA
- `/sebi` - SEBI
- `/rbi` - RBI
- `/cscrf` - CSCRF
- `/cert-in` - CERT-In
- `/lgpd` - LGPD
- `/pdpa` - PDPA
- `/pipl` - PIPL
- `/cis` - CIS Controls
- `/aigp` - AIGP
- `/ai-governance` - AI Governance
- `/iso/27090` - ISO 27090 AI Security
- `/iso-22317` - ISO 22317 BIA
- `/fedramp` - FedRAMP
- `/cjis` - CJIS Security Policy (NEW)

### Admin Routes (require admin role)
- `/admin` - Admin panel
- `/newsletter` - Newsletter editor

### Other Protected Routes
- `/knowledge` - Knowledge base
- `/profile` - User profile
- `/*` (catch-all) - Assessment pages for frameworks

## Data Schemas

### Framework Object (src/data/registry.js)
```javascript
{
  id: string,              // unique identifier (e.g., "iso27001-li")
  name: string,            // display name
  color: string,           // theme color (navy, purple, green, etc.)
  region: string,          // geographic region
  flag: string,            // emoji flag
  flagAnimation: string,   // animation class (float, pulse, bounce)
  basePath: string,        // URL base path (e.g., "/iso/27001/li")
  referenceUrl: string,    // official standard URL
  weeks: Week[],           // learning framework weeks
  weeksData: Week[],       // alternative weeks format
  milestones: Milestone[], // progress milestones
  startupGaps: Gap[],      // startup-specific gaps
  privacyStartupNotes: string,
  assessment: Control[],   // custom assessment controls (optional)
  commonFindings: Finding[],
  extraSections: ReactNode[]
}
```

### Week Object
```javascript
{
  week: number,
  title: string,
  days: string,
  description: string,
  tasks: Task[]
}
```

### Task Object
```javascript
{
  title: string,
  control: string,
  how: string,
  check: string,
  hours: number,
  citation: Citation,      // for HIPAA/ISO
  links: Link[]
}
```

### Assessment Control (src/data/assessments.js)
```javascript
{
  id: string,              // e.g., "GEN-01", "AIS-01", "HIPAA-01"
  itgc: string,            // ITGC domain
  category: string,        // "IT" | "Non-IT" | "Hybrid"
  control: string,         // control description
  tool: string,            // recommended tools
  scenario: string,        // use case scenario
  hours: number,           // effort estimate
  cfr: string,             // HIPAA CFR reference
  roles: string[],         // HIPAA role applicability
  layer: string            // "baseline" | "hipaa"
}
```

## Shared Components
- `Layout` - Main layout with header, mega menu, mobile drawer
- `LearningFrameworkPage` - Playbook page renderer
- `AssessmentPage` - Environment assessment checklist
- `RequireAuth` - Protected route wrapper
- `ErrorBoundary` - Error boundary for graceful failures
- `SearchBar` - Global search
- `GlobeExplorer` - Interactive globe
- `VendorRiskManagement` - Vendor risk tabs
- `AIPrivacyRisks` - AI privacy risk matrix
- `InterviewPrep` - Interview preparation
- `PasswordPolicies` - Password policy module
- `AccessRequirements` - Access governance
- `UserAccessReview` - UAR module
- `SecurityOperations` - Security operations
- `HybridSecurityFramework` - Hybrid framework
- `RegionControlMap` - Control reuse map
- `CertAdvisor` - Certification advisor
- `ChatWidget` - Chat widget
- `VisitorCounter` - Visitor counter
- `InspectorCursor` - Green cursor effect

## Styling System
- Tailwind CSS with custom color palette
- Dark mode via `dark:` prefix and `document.documentElement.classList.toggle('dark')`
- Custom CSS variables for theme-aware colors (surface, surface-dark, etc.)
- Color palette in `src/components/VendorRiskManagement.jsx` (color mapping)

## Theme Mechanism
- localStorage key: `compliance-dark` ('1' or '0')
- Default: OS `prefers-color-scheme`
- Toggled via header button in Layout.jsx
- Persisted in localStorage with try/catch

## Auth/Session Handling
- JWT tokens stored in localStorage key: `compliance_token`
- Netlify Functions for auth: `/api/auth/login`, `/api/auth/me`, `/api/auth/register`, `/api/auth/password`, `/api/auth/reset-request`, `/api/auth/reset-confirm`
- AuthContext provides: `user`, `loading`, `login`, `logout`, `changePassword`, `api`
- RequireAuth component protects routes, shows loader while `loading`, redirects to `/login` with `state.from` for post-login redirect
- Login page handles `location.state.from` for redirect after login

## localStorage Keys
- `compliance_token` - JWT token
- `compliance-dark` - Dark mode preference ('1' or '0')
- `compliance-learning-{frameworkId}` - Learning progress
- `assessment-{frameworkId}` - Assessment progress
- `compliance-soa-{frameworkId}` - Statement of Applicability
- `newsletter_shown` - Newsletter popup shown flag
- `hipaa-role` - HIPAA role selection

## Netlify Functions
- `auth-login.mjs` - User login
- `auth-me.mjs` - Get current user (token validation)
- `auth-register.mjs` - User registration
- `auth-password.mjs` - Password change
- `auth-reset-request.mjs` - Password reset request
- `auth-reset-confirm.mjs` - Password reset confirm
- `admin-*.mjs` - Admin functions
- `gemini.mjs` - AI chat
- `market.mjs` - Market data
- `newsletter-*.mjs` - Newsletter functions
- `visitor-count.mjs` - Visitor counter

## Redirects (netlify.toml)
- `/*` → `/index.html` (SPA fallback)
- `/api/*` → `/.netlify/functions/:splat` (API to Functions)

## Known Issues (Pre-Fix)
1. AI Privacy Risk Matrix: `darkChip` undefined reference
2. ISO 27001 LI: "Cannot read properties of undefined (reading 'week')"
3. CJIS page: "Framework not found" (no CJIS framework)
4. Session lost on reload: Auth persistence issue
5. VendorRiskManagement: Duplicate key warnings in color object
6. No API redirect for Netlify Functions (`/api/*`)

## Fixes Applied (Phase 0)
1. ✅ AI Privacy Risk Matrix: Fixed `darkChip` undefined
2. ✅ ISO 27001 LI: Added filter for undefined elements in normalizeFramework
3. ✅ CJIS page: Created CJIS framework with 4-week playbook
4. ✅ Auth persistence: Added `/api/*` redirect to Netlify Functions
5. ✅ ErrorBoundary: Already exists, used in Home.jsx
6. ✅ VendorRiskManagement: Fixed duplicate keys in color object
7. ✅ FEATURES flags: Created `src/constants/features.js` with `newNav` and `newHero`

## Next Steps (Phase 1+)
- Theme/contrast audit and fixes
- Layout fixes (overflow, header unification)
- Branding: "OneLens by Ruchi"
- Hero banner with animated control fan-out
- Content corrections per Section C
- Vendor Risk Management expansion
- New framework pages
- UI/UX improvements