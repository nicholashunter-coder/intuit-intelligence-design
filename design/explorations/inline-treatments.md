# Inline Source Treatments

Visual weight exploration for how citations appear inline within AI-generated responses.

## Problem

When AI surfaces information from external sources, users need to understand where information came from — but citation styling shouldn't overwhelm the content itself. We need to find the right balance of **attribution visibility** vs. **reading flow**.

## Options Explored

We evaluated treatments across a spectrum of visual weight:

| Option | Treatment | Visual Weight |
|--------|-----------|---------------|
| 1 | Superscript number only (e.g., `¹`) | Lightest |
| 2 | Superscript number + domain on hover | Light |
| 3 | Inline linked domain text | Medium |
| 4 | Inline chip with favicon + company name | Medium-heavy |
| 5 | Inline chip with favicon + full domain | Heaviest |

## Design Asset

Full comparison SVG: [`assets/web-sources-inline-options.svg`](../../assets/web-sources-inline-options.svg)

## Current Direction

TBD — pending team review and user research input.

## Open Questions

- How many sources per paragraph is the threshold before we collapse into a "N sources" chip?
- Should hover states reveal metadata or should it be click-to-expand?
- Mobile treatment — do chips work at small breakpoints or do we fall back to superscripts?
