// spec: specs/aw-1-login.testplan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('User Login Functionality', () => {
  test('Invalid Username', async ({ page }) => {
    // 1. Navigate to the login page
    await page.goto('https://katalon-demo-cura.herokuapp.com/profile.php#login');
    await expect(page.locator('input[name="username"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();

    // 2. Enter invalid username: InvalidUser
    await page.fill('input[name="username"]', 'InvalidUser');
    await expect(page.locator('input[name="username"]')).toHaveValue('InvalidUser');

    // 3. Enter valid password: ThisIsNotAPassword
    await page.fill('input[name="password"]', 'ThisIsNotAPassword');
    await expect(page.locator('input[name="password"]')).not.toHaveValue('');

    // 4. Click the Login button
    await page.click('button[type="submit"]');
    // expect: Error message 'Login failed! Please ensure the username and password are valid.' is displayed.
    await expect(page.locator('.text-danger')).toHaveText(/Login failed! Please ensure the username and password are valid\./);
    // expect: User remains on the login page.
    await expect(page).toHaveURL(/.*login.*/);
  });
});