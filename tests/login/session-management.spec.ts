// spec: specs/aw-1-login.testplan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('User Login Functionality', () => {
  test('Session Management and Logout', async ({ page }) => {
    // 1. Log in with valid credentials
    await page.goto('https://katalon-demo-cura.herokuapp.com/profile.php#login');
    await page.fill('input[name="username"]', 'John Doe');
    await page.fill('input[name="password"]', 'ThisIsNotAPassword');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/.*appointment.*/);
    await expect(page.getByRole('heading', { name: 'Make Appointment' })).toBeVisible();

    // 2. Click the Logout button
    // The Logout link may be hidden in a menu, so ensure it is visible
    const logoutLink = page.getByRole('link', { name: 'Logout' });
    if (!(await logoutLink.isVisible())) {
      // Open the menu if needed (click the menu toggle)
      const menuToggle = page.locator('a[href="#"]');
      if (await menuToggle.isVisible()) {
        await menuToggle.first().click();
      }
    }
    await logoutLink.click();
    // expect: Session is terminated.
    // expect: User is redirected to the homepage.
    await expect(page).toHaveURL(/.*index.*/);
    await expect(page.getByRole('heading', { name: 'CURA Healthcare Service' })).toBeVisible();
  });
});