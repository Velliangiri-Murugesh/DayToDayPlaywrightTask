import {test, expect} from '@playwright/test';
import path from 'path';

test.use({ storageState: path.join(__dirname, '../.auth/user.json') });

test('ReuseLogin', { tag: '@needs-session' }, async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/secure');
    await expect(page).toHaveURL('https://the-internet.herokuapp.com/secure');
    await expect(page.getByRole('link', { name: 'Logout' })).toBeVisible();
});