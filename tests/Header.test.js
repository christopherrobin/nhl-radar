import { test, expect } from '@playwright/test';

test('TopRibbon should load and display "NHL Radar text"', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#radar-header')).toContainText('NHL Radar');
});

test('Dark Mode can be enabled and disabled, is working as expected"', async ({ page }) => {
  await page.goto('/');
  const teamSelectionHeader = await page.locator('#teams-selection-header');

  // Test that the header font color is black
  const color = await teamSelectionHeader.evaluate((node) => window.getComputedStyle(node).color);
  expect(color).toBe('rgba(0, 0, 0, 0.87)');

  // Click the toggle button to enable dark mode
  await page.click('#toggle-theme');

  // Test that the header font color is white
  const color2 = await teamSelectionHeader.evaluate((node) => window.getComputedStyle(node).color);
  expect(color2).toBe('rgb(255, 255, 255)');

});
