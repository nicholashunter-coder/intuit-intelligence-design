---
sidebar_position: 1
sidebar_label: Source Metadata
---

# Source Metadata

How we resolve and display metadata for external web sources.

## What We Resolve

For each source URL, we attempt to extract:

| Field | Description | Fallback |
|-------|-------------|----------|
| `company_name` | Human-readable publisher name | Domain name |
| `domain` | Root domain (e.g., `nerdwallet.com`) | Parsed from URL |
| `title` | Page title from `<title>` tag | None |
| `favicon` | Site icon for visual recognition | Google favicon API |

## Resolution Strategy

1. **Known lookup** — Check against a curated map of known domains to company names (e.g., `irs.gov` → "IRS", `forbes.com` → "Forbes")
2. **Page fetch** — Attempt to fetch the page and extract `<title>` and favicon from HTML
3. **Google Favicon API** — Fallback for favicons: `https://www.google.com/s2/favicons?sz=32&domain={domain}`

## Known Issues

From testing (`source-metadata-test/results.json`):

- Several high-profile sites return 404/403 on direct fetch (NerdWallet, Forbes, BusinessNewsDaily)
- Page titles can be inconsistent or overly long — need truncation rules
- Some subdomains resolve differently than root domains (e.g., `quickbooks.intuit.com` vs `intuit.com`)

## Design Implications

- Always have a fallback display (domain string) when metadata resolution fails
- Favicon quality varies — consider a generic "source" icon as fallback
- Company name from known lookup is more reliable than page-title extraction
