# Sources

Design documentation for web source treatments in Intuit Intelligence experiences.

This repo covers how we display, attribute, and interact with external sources surfaced by AI — from inline citations to expanded card views.

---

## Structure

```
sources/
├── design/
│   ├── explorations/     # Design options and visual weight studies
│   ├── components/       # Spec'd components (inline chips, cards, metadata)
│   └── tokens/           # Design tokens (colors, spacing, type)
├── prototypes/           # Interactive HTML/CSS prototypes
├── research/             # Source metadata logic, favicon resolution, etc.
├── assets/               # Exported SVGs, screenshots, Figma links
└── faq/                  # Common questions and canonical answers
```

## Quick Links

| Area | Description |
|------|-------------|
| [Inline Source Treatments](design/explorations/inline-treatments.md) | Visual weight options for in-line citations |
| [Source Metadata](research/source-metadata.md) | How we resolve domains, favicons, and company names |
| [Card Interactions](prototypes/card-interactions.md) | Interactive prototype for source card expand/collapse |
| [FAQ](faq/README.md) | Frequently asked questions |

## Contributing

1. Create a branch from `main`
2. Add or update docs in the relevant folder
3. Open a PR with a clear description of what changed and why
4. Tag the design team for review

## Status

| Milestone | Status |
|-----------|--------|
| Inline treatment exploration | In progress |
| Source metadata resolution | In progress |
| Card interaction prototype | In progress |
| Design tokens | Not started |
| Figma sync | Not started |
| Slack bot integration | Planned |
