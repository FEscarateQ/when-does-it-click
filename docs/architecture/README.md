# Architecture

## Overview

**When Does It Click?** uses a **Static-First Content-Driven Modular Monolith** architecture.

## Core Principles

### Static-First

- All game pages pre-rendered at build time
- No server-side rendering
- No API backend
- No database or persistence layer in MVP

### Content-Driven

The canonical data flow:

```
Editorial Source Model (TypeScript modules)
  ↓ [validation - Zod]
Build-Time Runtime Projection (pure TypeScript)
  ↓
Per-Game Runtime Model (optimized data structures)
  ↓
Astro Static Generation
  ↓
Static HTML + React Islands
```

### Modular Monolith

- One codebase
- One deployable artifact
- Clear internal boundaries:
  - `domain/` — framework-independent domain logic
  - `editorial/` — repository-versioned editorial content
  - `runtime/` — build-time projection and runtime models
  - `pages/` — Astro static routes
  - `components/` — UI components (Astro + React islands)

### Direct Game Entry (ENTRY-CONTEXT-01)

A canonical game route (e.g., `/games/resident-evil-4`) must render in initial Astro HTML:

- Product context
- Game's Covered Evolution
- Partial coverage disclosure
- Entry point to interactive Concern Resolver

This must NOT require:

- Navigation from home
- React hydration to complete
- localStorage or prior client state

Users arriving via search/link get immediate context.

## Technology Stack

| Layer       | Technology                         | Purpose                           |
| ----------- | ---------------------------------- | --------------------------------- |
| Build       | Astro                              | Static site generation            |
| Interactive | React                              | Islands for Concern Resolver only |
| Language    | TypeScript (strict)                | Type safety                       |
| Validation  | Zod                                | Editorial schema validation       |
| Testing     | Vitest + Playwright                | Unit + E2E                        |
| Quality     | ESLint + Prettier                  | Code consistency                  |
| Deployment  | Cloudflare Workers - Static Assets | Edge delivery                     |

## Data Model

### Editorial Source Model

- Game manifests (TypeScript)
- Supported Queries
- Evidence dossiers
- All version-controlled in `src/editorial/`

### Runtime Model

- Computed at build time
- Optimized per-game structures
- Embedded in static pages
- No runtime data fetching

## Interaction Model

- **Static content:** Astro renders everything
- **Interactive concern resolution:** Single React island
- **No global state management:** Each game page is self-contained
- **No client-side routing:** Astro handles all navigation

## Non-Goals (MVP)

- User accounts or authentication
- Persistent user progress
- Backend API
- Database or ORM
- CMS for editorial content
- Server-side rendering
- Real-time features

## Future Evolution Boundary

The current MVP flow is:

```
Editorial Source Model
  ↓
Build-Time Runtime Projection
  ↓
Static product experience
```

Editorial content remains repository-versioned, curated, and the initial coverage source and quality baseline. Future Community Signals may complement editorial evidence, remain distinguishable from it, and eventually inform editorial review; no contribution, storage, moderation, aggregation, authentication, runtime-fetch, or AI/ML architecture has been selected.

When Community Observations are accepted and retained, re-evaluate backend and persistence architecture. Do not add backend or persistence merely because Community Signals are part of the long-term product direction; introduce them only when the product is ready to collect and retain user observations.

Static-first remains the default for editorial and game pages even if community functionality is introduced later, unless a future requirement demonstrates otherwise.

## Future Considerations

Not yet decided or implemented:

- Localization strategy
- Analytics integration
- Error monitoring (Sentry)
- Content moderation workflow
- Editorial tooling
