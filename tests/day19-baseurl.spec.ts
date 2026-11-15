import {test,expect} from '@playwright/test'

test('loginTest',async({page})=>{

    await page.goto('/login');
    await expect(page).toHaveURL(/\/login$/);
      await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();




});