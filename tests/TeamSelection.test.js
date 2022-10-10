import { test, expect } from '@playwright/test';

test('"Teams" H2 initializes correctly', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#teams-selection-header')).toContainText('Teams');
});

test('"Teams" sub-header initializes correctly', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#teams-selection-sub-header')).toContainText('Select a team to view their details.');
});

test('32 NHL teams have loaded and rendered', async ({ page }) => {
  await page.goto('/');
  const count = await page.locator('.team-selection-card').count();
  expect(count).toBe(32);
});
