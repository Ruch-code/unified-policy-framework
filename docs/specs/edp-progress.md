# EDP (Endpoint & Data Protection) Implementation Progress

## Discovery Complete
- Framework: React/Vite + Tailwind + React Router v6
- xlsx (SheetJS) 0.18.5 installed
- Export utility: src/utils/exportCSV.jsx (CSV only)
- GRC KB page: /knowledge route (KnowledgeBase.jsx)
- xlsx library already installed
- Existing DLP/MDM/BYOD content in HybridSecurityFramework.jsx, StatementOfApplicability.jsx
- No 2013-style Annex A references found
- Existing exportCSV utility (CSV only)

## Plan
1. Create data model and types (iso27001Scoping.ts pattern) - DONE
2. Create ScopingGuide component for /iso/27001/la page
3. Add ScopingGuide to Iso27001La page before ScopeWalkthrough
3. Create EDP data model and types
4. Create EDP KB topic page at /knowledge/edp
5. Create export utilities (Excel, CSV, Markdown, PDF)
6. Add EDP KB topic to navigation
6. Register EDP topic in KB navigation
7. Build and verify

## Progress
- [x] Discovery complete
- [ ] Data model and types (edp-spec.md Step 2, 3)
- [ ] MDM controls (15 items, 3 batches)
- [ ] DLP controls (15 items, 3 batches)
- [ ] BYOD controls, models, comparison, roadmap, pushback, mapping
- [ ] KB topic page and navigation
- [ ] Downloads (Excel, CSV, Markdown, PDF)
- [ ] KB assistant intents
- [ ] Fixes, tests, final check