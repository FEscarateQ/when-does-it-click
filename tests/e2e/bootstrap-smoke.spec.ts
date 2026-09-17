/**
 * Bootstrap E2E smoke test
 *
 * Purpose: Verify Astro static site generation and React island hydration.
 */

import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Bootstrap smoke', () => {
  test('home page loads with Astro-rendered content', async ({ page }) => {
    await page.goto('/');

    // Verify Astro-rendered static content
    await expect(page.locator('h1')).toHaveText('When Does It Click?');
    await expect(page.getByText(/Repository Bootstrap v0.1/)).toBeVisible();
  });

  test('React island hydrates and is interactive', async ({ page }) => {
    await page.goto('/');

    // Verify React component is present
    await expect(
      page.getByRole('heading', { name: 'React Hydration Probe' })
    ).toBeVisible();

    // Verify initial state
    await expect(page.getByText('Button clicks: 0')).toBeVisible();

    // Click button to prove hydration
    await page.getByRole('button', { name: 'Increment' }).click();

    // Verify state updated (proves React hydrated and is interactive)
    await expect(page.getByText('Button clicks: 1')).toBeVisible();

    // Click again
    await page.getByRole('button', { name: 'Increment' }).click();
    await expect(page.getByText('Button clicks: 2')).toBeVisible();
  });

  test('accessibility smoke check', async ({ page }) => {
    await page.goto('/');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    // Fail on serious and critical violations
    const seriousViolations = accessibilityScanResults.violations.filter(
      (v) => v.impact === 'serious' || v.impact === 'critical'
    );

    expect(seriousViolations).toHaveLength(0);
  });
});
