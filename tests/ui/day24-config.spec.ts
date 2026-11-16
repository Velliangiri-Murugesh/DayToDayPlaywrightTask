import {test,expect} from '@playwright/test'

test('envValidationRenamed',async({page})=>{

    await page.goto('/login');
    await expect(page.locator('#login')).toBeVisible();



})