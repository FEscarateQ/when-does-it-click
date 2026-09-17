# When Does It Click?

**Current Status:** Repository Bootstrap v0.1 — before first vertical slice

## Problem

Players often wonder whether a specific aspect of a game meaningfully changes later, or whether what they are experiencing now is already representative of the rest of the game.

When Does It Click? provides explicitly partial information about how currently covered aspects evolve. If something still is not clicking, the optional Concern Resolver uses the player's current progress and relevant context to show whether enough meaningful change remains ahead to justify reassessing that specific aspect.

## Architecture

Static-First Content-Driven Modular Monolith:

- **Editorial Source Model** → validation → **Build-Time Runtime Projection** → **Per-Game Runtime Model** → Astro static pages + React islands
- One codebase, one deployable, no backend/API/database/CMS
- Direct game entry via canonical routes (ENTRY-CONTEXT-01)
- React used only for interactive Concern Resolver island

See `docs/architecture/README.md` for details.

## Content Model Evolution

The first release is editorial-first: repository-versioned editorial content provides the initial useful coverage and curated quality baseline. Future Community Signals may complement editorial evidence, remain distinguishable from it, and potentially prompt editorial review, but they are not implemented in this release.

No backend, API, database, or user persistence exists yet because the product does not currently collect community submissions.

## Stack

- **TypeScript** (strict mode)
- **Astro** (static generation)
- **React** (islands only)
- **Zod** (validation)
- **Vitest** (unit tests)
- **Playwright** + **@axe-core/playwright** (E2E and accessibility)
- **ESLint** + **Prettier** (code quality)
- **Cloudflare Workers - Static Assets** (deployment target)

## Local Development

### Prerequisites

- Node.js 24.19.0 or higher (see `.nvmrc`)
- npm

### Setup

```bash
npm ci
```

### Commands

```bash
# Development server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Type check
npm run check

# Lint
npm run lint

# Format code
npm run format

# Check formatting
npm run format:check

# Run unit tests
npm run test

# Watch mode for unit tests
npm run test:watch

# Run E2E tests (builds first)
npm run test:e2e

# Run all validation checks (format, lint, check, test, e2e)
npm run validate
```

## Repository Structure

```
src/
  pages/          - Astro pages (static routes)
  components/     - UI components (Astro + React)
  styles/         - CSS
  domain/         - Framework-independent domain logic
  editorial/      - Repository-versioned editorial content
  runtime/        - Build-time projection and runtime models
tests/
  unit/           - Vitest unit tests
  e2e/            - Playwright E2E tests
docs/
  architecture/   - Architecture documentation
  adr/            - Architecture Decision Records
```

## Workflow

1. Create feature branch from `main`
2. Make changes
3. Run `npm run validate` locally
4. Create Pull Request
5. GitHub Actions runs validation
6. Merge to `main` → Cloudflare production deployment after Cloudflare Git/deployment integration is configured

## What's NOT Implemented Yet

This is the repository bootstrap only. Product features, game content, editorial schemas, domain logic, and the Concern Resolver are not yet implemented.

## License

Proprietary
