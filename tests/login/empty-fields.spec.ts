// spec: specs/aw-1-login.testplan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('User Login Functionality', () => {
  test('Empty Fields Validation', async ({ page }) => {
    // 1. Navigate to the login page
    await page.goto('https://katalon-demo-cura.herokuapp.com/profile.php#login');
    await expect(page.locator('input[name="username"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();

    // 2. Click the Login button without entering username and password
    await page.fill('input[name="username"]', '');
    await page.fill('input[name="password"]', '');
    await page.click('button[type="submit"]');
    // expect: Error message for empty fields is displayed (site shows generic error for empty fields)
    await expect(page.getByText('Login failed! Please ensure')).toBeVisible();
  });
});