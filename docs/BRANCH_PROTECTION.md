# Main Branch Ruleset

## Active GitHub Configuration

The repository uses the active GitHub branch ruleset named **Protect main**.

- **Navigation:** `Settings` → `Rules` → `Rulesets`
- **Target:** Default branch (`main`)
- **Bypass list:** Empty

## Enabled Protections

- ✅ **Require a pull request before merging**
  - Required approvals: **0** (intentional for this solo repository)
  - Code Owner review: not required
  - Latest-push approval: not required
  - Conversation resolution: not required
- ✅ **Require status checks to pass**
  - Required check: `validate` from GitHub Actions
  - Branches are **not** required to be up to date before merging
  - `Do not require status checks on creation`: disabled
- ✅ **Block force pushes**
- ✅ **Block branch deletion**

The ruleset does not restrict branch creation or ordinary updates, require linear history or signed commits, require deployments, use a merge queue, or require code scanning or code-quality checks.

## Rationale

- Pull requests preserve reviewable change history before changes reach `main`.
- GitHub Actions independently verifies the required `validate` check.
- Approval requirements are intentionally omitted because this is a solo repository.
- Force-push and deletion protection prevent accidental destruction of branch history.

## Production Flow

### Current

```
feature branch
  ↓
Pull Request
  ↓
GitHub Actions `validate`
  ↓
merge to protected main
```

### Future after Cloudflare integration

```
merge to main
  ↓
Cloudflare production deployment
```

Cloudflare Git/deployment integration is not currently connected or active.

## What `validate` Checks

The required GitHub Actions check runs:

1. `format:check` — Code formatting validation
2. `lint` — ESLint checks
3. `check` — TypeScript and Astro type checking
4. `test` — Vitest unit tests
5. `test:e2e` — Playwright E2E tests
