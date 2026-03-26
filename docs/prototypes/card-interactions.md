---
sidebar_position: 1
sidebar_label: Card Interactions
---

# Card Interactions

Interactive prototype for source card expand/collapse behavior.

## Prototype

Live file: `intuit-ai-cards-prototype.html` (available in the [repo assets folder](https://github.com/nicholashunter-coder/intuit-intelligence-design/tree/main/assets))

Open locally in a browser to interact.

## Behavior

The prototype demonstrates:

- **Card expand/collapse** — tap or click a source card to reveal full metadata
- **Mode toggle** — switch between presentation modes (top bar)
- **Mobile-first** — designed for touch targets and safe area insets
- **Intuit brand alignment** — uses Intuit blue (`#0077C5`), QuickBooks green (`#0D8040`), and system font stack

## Design Tokens Used

| Token | Value | Usage |
|-------|-------|-------|
| `--green` | `#0D8040` | Positive indicators |
| `--green-light` | `#E6F4ED` | Light positive background |
| `--intuit-blue` | `#0077C5` | Brand links and accents |
| `--card-radius` | `12px` | Card corner radius |
| `--gray-900` | `#111827` | Primary text |
| `--gray-500` | `#6B7280` | Secondary text |

## Open Questions

- Transition timing for expand/collapse — current is CSS-based, should we move to spring physics?
- Accessibility — keyboard navigation and screen reader behavior for collapsed cards
- Maximum number of cards visible before pagination or "show more"
