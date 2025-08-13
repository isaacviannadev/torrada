import { expect, test } from '@playwright/test';

test('spawn success and manual dismiss', async ({ page }) => {
  await page.goto('/');

  await page.waitForLoadState('networkidle');

  await page.locator('button:has-text("Success")').first().click();
  await expect(page.getByText('Saved!')).toBeVisible();

  await page.getByRole('button', { name: /close notification/i }).click();
  await expect(page.getByText('Saved!')).toHaveCount(0);
});

test('stacking and auto-dismiss', async ({ page }) => {
  await page.goto('/');

  await page.waitForLoadState('networkidle');

  await page.locator('button:has-text("Spawn x3")').first().click();

  await expect(page.locator('.t-item')).toHaveCount(3);

  await page.waitForTimeout(900);
  await expect(page.locator('.t-item')).toHaveCount(0);
});
