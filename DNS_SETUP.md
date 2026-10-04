# DNS & Netlify Configuration for Unified Compliance Framework

## 1. Custom Domain Setup

### DNS Records (at your DNS provider)
| Type | Name | Value | TTL |
|------|------|-------|-----|
| CNAME | compliance | spectacular-genie-bda511.netlify.app | 3600 |
| CNAME | app | spectacular-genie-bda511.netlify.app | 3600 |
| CNAME | www | spectacular-genie-bda511.netlify.app | 3600 |
| A | @ | 75.2.60.5 (Netlify Load Balancer) | 3600 |

**Or use Netlify DNS (recommended):**
1. Add domain in Netlify → Domain management → Add custom domain
2. Update nameservers at registrar to Netlify's:
   - dns1.p01.nsone.net
   - dns2.p01.nsone.net
   - dns3.p01.nsone.net
   - dns4.p01.nsone.net

### Netlify Domain Setup
1. Go to Netlify → Site settings → Domain management
2. Add custom domain: `compliance.yourdomain.com`
3. Enable "Force HTTPS" and "HSTS"
4. Wait for Let's Encrypt certificate provisioning (automatic)

---

## 2. Netlify Configuration Files

### netlify.toml (in project root)
```toml
[build]
  command = "npm run build"
  publish = "dist"
  functions = "netlify/functions"

[build.environment]
  NODE_VERSION = "20"
  NODE_OPTIONS = "--max-old-space-size=4096"
  SECRETS_SCAN_OMIT_KEYS = "ADMIN_EMAIL,ADMIN_PASSWORD,MONGODB_URI,JWT_SECRET,DEFAULT_USER_PASSWORD,GEMINI_API_KEY"

# SPA routing - all routes serve index.html for client-side routing
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

# Legacy hash-based URLs redirect to clean query params
[[redirects]]
  from = "/#vendor-risk#Sub-Processors"
  to = "/#/vendor-risk?section=sub-processors"
  status = 301
  conditions = {Query = ""}

[[redirects]]
  from = "/#vendor-risk#Review Frequency"
  to = "/#/vendor-risk?section=review-frequency"
  status = 301

[[redirects]]
  from = "/#vendor-risk#Review-Frequency"
  to = "/#/vendor-risk?section=review-frequency"
  status = 301

# Force HTTPS
[[headers]]
  for = "/*"
  [headers.values]
    Strict-Transport-Security = "max-age=31536000; includeSubDomains; preload"

# Security Headers
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Permissions-Policy = "camera=(), microphone=(), geolocation=(), payment=()"
    Content-Security-Policy = "default-src 'self' 'unsafe-inline' 'unsafe-eval' https: data: blob:; script-src 'self' 'unsafe-inline' 'unsafe-eval' https:; style-src 'self' 'unsafe-inline' https:; img-src 'self' data: https:; font-src 'self' https: data:; connect-src 'self' https: wss:; frame-ancestors 'none'; base-uri 'self'; form-action 'self'"

# Cache static assets
[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

# No cache for HTML
[[headers]]
  for = "/index.html"
  [headers.values]
    Cache-Control = "no-cache, no-store, must-revalidate"
```

### public/_redirects
```
/* /index.html 200
```

### public/_headers
```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()
  Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
  Content-Security-Policy: default-src 'self' 'unsafe-inline' 'unsafe-eval' https: data: blob:; script-src 'self' 'unsafe-inline' 'unsafe-eval' https:; style-src 'self' 'unsafe-inline' https:; img-src 'self' data: https:; font-src 'self' https: data:; connect-src 'self' https: wss:; frame-ancestors 'none'; base-uri 'self'; form-action 'self'

/assets/*
  Cache-Control: public, max-age=31536000, immutable

/index.html
  Cache-Control: no-cache, no-store, must-revalidate
```

---

## 3. URL Structure Changes

### Before (Invalid)
```
/#vendor-risk#Sub-Processors
/#vendor-risk#Review Frequency
/#vendor-risk#Review-Frequency
```

### After (Valid)
```
/#/vendor-risk?section=sub-processors
/#/vendor-risk?section=review-frequency
/#/vendor-risk?section=incident-brief
/#/vendor-risk?section=regional-laws
/#/vendor-risk?section=sectors
```

### Legacy Redirects (Auto-handled by Netlify)
- `/#vendor-risk#Sub-Processors` → `/#/vendor-risk?section=sub-processors` (301)
- `/#vendor-risk#Review Frequency` → `/#/vendor-risk?section=review-frequency` (301)

---

## 4. Client-Side Routing Updates

The `VendorRiskManagement` component now:
- Uses `useSearchParams` from `react-router-dom` for sub-tab navigation
- Reads `?section=` query parameter for deep linking
- Maintains backwards compatibility with old hash-based URLs
- Updates URL query params instead of hash fragments

### Supported Query Parameters
| Tab | Query Param |
|-----|-------------|
| Sectors | `?section=sectors` |
| Regional Laws | `?section=regional-laws` |
| Sub-Processors | `?section=sub-processors` |
| Review Frequency | `?section=review-frequency` |
| Incident Brief | `?section=incident-brief` |

### Deep Link Examples
```
https://compliance.yourdomain.com/#/vendor-risk?section=sub-processors
https://compliance.yourdomain.com/#/vendor-risk?section=review-frequency
```

---

## 5. Deployment Checklist

- [ ] Add custom domain in Netlify
- [ ] Configure DNS records
- [ ] Wait for SSL certificate
- [ ] Verify `netlify.toml` in repo root
- [ ] Verify `public/_redirects` exists
- [ ] Verify `public/_headers` exists
- [ ] Push changes to main branch
- [ ] Verify Netlify build succeeds
- [ ] Test custom domain loads
- [ ] Test HTTPS redirect
- [ ] Test security headers (check with `curl -I`)
- [ ] Test legacy redirects work
- [ ] Test deep links work

---

## 6. Security Headers Verification

```bash
# Test headers
curl -I https://compliance.yourdomain.com/

# Expected headers:
# Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
# X-Frame-Options: DENY
# X-Content-Type-Options: nosniff
# Referrer-Policy: strict-origin-when-cross-origin
# Content-Security-Policy: default-src 'self' ...
```
