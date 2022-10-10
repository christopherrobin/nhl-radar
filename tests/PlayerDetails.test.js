import { test, expect } from '@playwright/test';

test('Player name is displayed', async ({ page }) => {
  await page.goto('/player/8470621'); // Corey Perry
  await expect(page.locator('#player-details-name')).toContainText('Corey Perry');
});

test('Team Link returns user to team page', async ({ page }) => {
  await page.goto('/player/8470621');
  await page.click('#player-details-team-link');
  await expect(page).toHaveURL('http://localhost:3000/team/14'); // Tampa Bay Lightning
});

test('"Not Captain" Chip Component renders correctly', async ({ page }) => {
  await page.goto('/player/8474141'); // Patrick Kane
  const captainChip = page.locator('.player-details-captain');
  await expect(captainChip).toContainText('Not Captain');
});

test('"Alternative Captain" Chip Component renders correctly', async ({ page }) => {
  await page.goto('/player/8474141'); // Patrick Kane
  const captainChip = page.locator('.player-details-alt-captain');
  await expect(captainChip).toContainText('Alternate Captain');
});
