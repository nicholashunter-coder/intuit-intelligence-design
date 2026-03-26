---
sidebar_position: 1
sidebar_label: FAQ
---

# FAQ

Common questions about the Sources design system. This list is maintained based on real questions from Slack and team syncs.

> **Goal:** Every question asked more than once should have a canonical answer here. If you get a question that isn't covered, [add it](#contributing-a-new-entry).

---

### What is the Sources project?

Sources defines how Intuit Intelligence experiences display, attribute, and link to external web content that AI surfaces in its responses. It covers everything from inline citation styling to expanded source cards.

### Where are the Figma files?

_Link to Figma file(s) here once available._

### Why do some sources show a favicon and others don't?

We attempt to resolve favicons via the page itself first, then fall back to Google's favicon API (`google.com/s2/favicons`). Some sites block direct page fetches (403/404), which means we can't extract a native favicon. In those cases the Google API fallback usually works, but quality and freshness vary. See [Source Metadata](../research/source-metadata) for the full resolution strategy.

### What's the difference between the inline treatment options?

We explored five levels of visual weight — from a simple superscript number up to a full chip with favicon and domain. The tradeoff is attribution visibility vs. reading flow disruption. See [Inline Source Treatments](../design/inline-treatments) for the full comparison.

### How do I run the card interaction prototype?

Open `prototypes/intuit-ai-cards-prototype.html` in a browser. It's a self-contained HTML file — no build step needed.

### What tokens/colors does Sources use?

See the token table in [Card Interactions](../prototypes/card-interactions#design-tokens-used). Formal design tokens are on the roadmap.

### How do I contribute to this repo?

Open a PR on the [GitHub repo](https://github.com/nicholashunter-coder/intuit-intelligence-design) with your changes.

---

## Contributing a New Entry

1. Check if the question is already answered above
2. Add a new `### Question` heading in this file
3. Write a concise answer with links to relevant docs
4. Open a PR
