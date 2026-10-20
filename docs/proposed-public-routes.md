# Proposed Public Routes

Per A8: "Put proposed public routes in docs/proposed-public-routes.md and ask me."

## Current Public Routes
- `/login` - Login page (sign in, request access, forgot password, admin)
- `/signup` - Part of login page (tab)
- `/forgot` - Part of login page (tab)

## Current Protected Routes (RequireAuth)
All framework pages, assessment pages, knowledge base, profile, admin, newsletter

## Proposed Public Routes (for review)

### 1. Homepage (`/`) - Currently Protected
**Proposal:** Make the homepage partially public
- Show the hero, module tabs, "What Can Go Wrong" panels publicly
- Keep the locked sections (By Region Framework Cards, Control Reuse Map) behind login
- Benefit: SEO, marketing, shows value before signup

### 2. Framework Landing Pages - Currently Protected
**Proposal:** Make framework overview pages public
- `/iso/27001/li` - Show header, progress ring, level badges, timeline, milestone view
- Keep the actual task content (controls, how-to, check) behind login
- Benefit: SEO, shows depth of content, allows evaluation

### 3. Search Page - Currently Not Accessible (requires auth)
**Proposal:** Make search results public for framework names
- Show framework names, descriptions, regions publicly
- Keep control-level search results behind login

### 4. Vendor Risk Management Tabs - Currently Protected
**Proposal:** Make vendor risk overview public
- `/?section=sectors` - Show sector overview
- `/?section=regional-laws` - Show regional law summary
- Keep detailed sub-processor, review frequency, incident brief behind login

### 4. Blog/Newsletter Content - Currently Not Accessible
**Proposal:** Make newsletter archive public
- `/newsletter/archive` - Public newsletter posts
- Keep editor behind admin auth

## Routes That Must Stay Protected
- `/admin` - Admin panel
- `/profile` - User profile
- `/knowledge` - Knowledge base (proprietary content)
- `/assessment` pages - Environment assessments
- Task-level content in framework pages (controls, how-to, check)
- User-specific progress data

## Decision Required
Please review the above proposals and confirm which routes should be made public. The auth system currently uses `RequireAuth` wrapper on all routes except `/login`, `/signup`, `/forgot`.

To implement public routes:
1. Remove `<Protected>` wrapper from specific routes in `App.jsx`
2. Update `RequireAuth` to allow public access to specific paths
3. Update components to show public vs. locked content appropriately

## Recommendation
Start with:
1. Homepage (`/`) - partial public
2. Framework landing pages (`/iso/27001/li`, etc.) - partial public
3. Vendor Risk overview tabs

This provides maximum marketing/SEO value while protecting the core IP (detailed controls, assessments, user progress).