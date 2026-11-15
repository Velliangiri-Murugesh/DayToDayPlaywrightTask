import {test,expect} from '@playwright/test';

test('validateFrames',async({page})=>{

await page.goto('https://the-internet.herokuapp.com/iframe');
await page.frameLocator('iframe').getByText('Your content goes here.').fill('Hello from Playwright');
await expect(page.frameLocator('iframe').locator('p')).toContainText('Hello from Playwright');


});


test('frameReach',async({page})=>{

await page.goto('https://the-internet.herokuapp.com/iframe');
 await expect(page.frameLocator('iframe').locator('p')).toContainText('Your content goes here.');

});


test('multiSelectValidation',async({page})=>{

    await page.goto('https://the-internet.herokuapp.com/multiple_dropdown');

    await page.locator('#multiple-dropdown').selectOption(['1','3','4']);
    await expect(page.locator('#multiple-dropdown')).toHaveValues(['1','3','4']);

});