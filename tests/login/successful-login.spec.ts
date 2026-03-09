// spec: specs/aw-1-login.testplan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('User Login Functionality', () => {
  test('Successful Login', async ({ page }) => {
    // 1. Navigate to the login page (https://katalon-demo-cura.herokuapp.com/profile.php#login)
    await page.goto('https://katalon-demo-cura.herokuapp.com/profile.php#login');
    await expect(page.locator('input[name="username"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();

    // 2. Enter valid username: John Doe
    await page.fill('input[name="username"]', 'John Doe');
    await expect(page.locator('input[name="username"]')).toHaveValue('John Doe');

    // 3. Enter valid password: ThisIsNotAPassword
    await page.fill('input[name="password"]', 'ThisIsNotAPassword');
    // Password field is masked, so we only check it is not empty
    await expect(page.locator('input[name="password"]')).not.toHaveValue('');

    // 4. Click the Login button
    await page.click('button[type="submit"]');
    // expect: User is authenticated and redirected to the appointment page.
    await expect(page).toHaveURL(/.*appointment.*/);
    // expect: Appointment page heading is visible.
    await expect(page.getByRole('heading', { name: 'Make Appointment' })).toBeVisible();
  });
});