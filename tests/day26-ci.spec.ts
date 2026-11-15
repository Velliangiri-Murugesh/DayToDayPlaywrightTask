import {test,expect} from '@playwright/test'

test('CIEnvValidations',async({page})=>{

    await page.goto('/login');
    await expect(page.locator('#login')).toBeVisible();



})  