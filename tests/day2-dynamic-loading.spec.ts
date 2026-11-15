import {test,expect} from '@playwright/test'

test('waitTest',async({page})=>{

    await page.goto('https://the-internet.herokuapp.com/dynamic_loading/2');
    await page.getByRole('button',{name:'Start'}).click();
    await page.locator('#finish').waitFor();
    await expect(page.locator('#finish')).toContainText('Hello World!');

});

test('hiddenBeforeStart',async({page})=>{

    await page.goto('https://the-internet.herokuapp.com/dynamic_loading/2');
    await expect(page.locator('#finish')).not.toBeVisible();
    await page.getByRole('button',{name:'Start'}).click();

});


test('negativeControl_notAttached',async({page})=>{

    await page.goto('https://the-internet.herokuapp.com/dynamic_loading/2');
    await expect(page.locator('#finish')).toBeAttached();
    await page.getByRole('button',{name:'Start'}).click();

});