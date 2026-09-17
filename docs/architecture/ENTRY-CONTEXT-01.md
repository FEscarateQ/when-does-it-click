# ENTRY-CONTEXT-01: Direct Game Entry Requirement

## Invariant

A canonical direct game route (e.g., `/games/resident-evil-4`) **MUST** be able to render in initial Astro HTML:

1. **Product context** — What problem does this tool solve?
2. **Covered Evolution** — What aspects of this game are covered?
3. **Partial coverage disclosure** — Explicitly communicates that only the currently listed Ready aspects are covered.
4. **Concern Resolver entry point** — Interactive tool to get recommendations

Coverage is intentionally partial: absence means an aspect is not currently covered. Absence does not mean that aspect is stable or does not change, and unsupported dimensions/categories must not be enumerated merely to appear comprehensive.

## Why This Matters

Users arriving via:

- Search engine results
- Direct links
- Social media shares
- Bookmarks

...should get **immediate context and utility** without requiring:

- Navigation from home page
- React hydration to complete
- localStorage or prior client state
- Additional network requests

## Implementation Strategy

### Build Time

1. Editorial Source Model defines game coverage
2. Build-Time Runtime Projection computes:
   - Covered Evolution summary
   - Supported Queries list
   - Evidence availability
3. Per-Game Runtime Model embedded in static HTML

### Render Time

Astro page template includes in SSG output:

```astro
<GameHeader game={runtimeGame} />
<CoverageDisclosure evolution={game.coveredEvolution} />
<ConcernResolver game={runtimeGame} client:load />
```

The `<ConcernResolver>` React island enhances the page but is not required for initial context.

## Non-Requirements

This requirement does NOT mandate:

- Full game information in HTML
- No JavaScript at all
- Concern Resolver must work without hydration (it's an enhancement)

## Current Status

**Not yet implemented.** This is a design requirement documented during Repository Bootstrap v0.1.

Game routes, Editorial Source Model, Runtime Projection, and Concern Resolver are all future work.

## Validation

When implemented, verify:

1. Disable JavaScript in browser
2. Navigate directly to game route
3. Confirm visible in HTML:
   - Product context statement
   - Covered Evolution summary
   - Partial coverage disclosure
4. Enable JavaScript → Concern Resolver enhances the page

E2E test should verify this flow.
