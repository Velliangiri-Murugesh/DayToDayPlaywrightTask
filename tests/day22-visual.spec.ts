import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('visualTest',{tag:'@visual'}, async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await page.getByLabel('Username').fill('tomsmith');
    await page.getByLabel('Password').fill('SuperSecrsetPassword!');
    await page.getByRole('button',{name:'Login'}).click();
    await expect(page).toHaveScreenshot('login.png', {
        animations: 'disabled',
        caret: 'hide',
    });
});