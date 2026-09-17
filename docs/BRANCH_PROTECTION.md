# Branch Protection Configuration

## Required GitHub Settings

The `main` branch must be configured with the following protection rules:

### Manual Configuration Required

These settings must be configured manually in GitHub:

1. Go to: `Settings` → `Branches` → `Branch protection rules`
2. Add rule for pattern: `main`
3. Enable:
   - ✅ **Require a pull request before merging**
   - ✅ **Require status checks to pass before merging**
     - Add required check: `validate` (from GitHub Actions)
   - ✅ **Do not allow bypassing the above settings** (intentional quality-gate choice)
   - ✅ **Do not allow force pushes**
   - ✅ **Do not allow deletions**

### NOT Required for Solo Project

- ❌ Require approvals (this is a solo project)
- ❌ Require review from Code Owners
- ❌ Require deployment to succeed before merging

## Target Production Flow

Once Cloudflare Git/deployment integration is configured, the intended production flow is:

```
feature branch
  ↓
Pull Request
  ↓
GitHub Actions `validate` (REQUIRED - must pass)
  ↓
Merge to main
  ↓
Cloudflare production deployment
```

Cloudflare deployment integration is not currently connected or active.

## What `validate` Checks

The required status check runs:

1. `format:check` — Code formatting validation
2. `lint` — ESLint checks
3. `check` — TypeScript and Astro type checking
4. `test` — Vitest unit tests
5. `test:e2e` — Playwright E2E tests

All must pass for the PR to be mergeable.

## Current Status

⚠️ Branch protection must be configured manually via GitHub web UI.
This bootstrap process cannot configure it automatically without additional permissions.
