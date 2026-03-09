// spec: specs/aw-1-login.testplan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('User Login Functionality', () => {
  test('Invalid Password', async ({ page }) => {
    // 1. Navigate to the login page
    await page.goto('https://katalon-demo-cura.herokuapp.com/profile.php#login');
    await expect(page.locator('input[name="username"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();

    // 2. Enter valid username: John Doe
    await page.fill('input[name="username"]', 'John Doe');
    await expect(page.locator('input[name="username"]')).toHaveValue('John Doe');

    // 3. Enter invalid password: WrongPassword
    await page.fill('input[name="password"]', 'WrongPassword');
    await expect(page.locator('input[name="password"]')).not.toHaveValue('');

    // 4. Click the Login button
    await page.click('button[type="submit"]');
    // expect: Error message 'Login failed! Please ensure the username and password are valid.' is displayed.
    await expect(page.locator('.text-danger')).toHaveText(/Login failed! Please ensure the username and password are valid\./);
    // expect: User remains on the login page.
    await expect(page).toHaveURL(/.*login.*/);
  });
});