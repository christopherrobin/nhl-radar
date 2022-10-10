// TODO: More thorough testing, like unit-testing, to be done in tandem with e2e testing (e.g. Jest)
import { test, expect } from '@playwright/test';

test('Team name is displayed', async ({ page }) => {
  await page.goto('/team/16');
  await expect(page.locator('#team-name')).toContainText('Chicago Blackhawks');
});

test('View Profile links are displayed in player grid', async ({ page }) => {
  await page.goto('/team/16');
  const count = await page.locator('.profile-link').count();
  expect(count).toBeGreaterThan(1);
});

test('View Profile links are directing users to player page', async ({ page }) => {
  await page.goto('/team/16');
  // Let's hope Patrick Kane never gets traded or retires
  await page
    .getByRole('row', { name: '88 Patrick Kane Forward RW View Profile' })
    .getByRole('button', { name: 'View Profile' }).click();
  await expect(page).toHaveURL('http://localhost:3000/player/8474141');
});
