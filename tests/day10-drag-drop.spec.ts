import {test,expect} from '@playwright/test'

test('dragNdropTest',async({page})=>{

    await page.goto('https://the-internet.herokuapp.com/drag_and_drop');

    const source=page.locator('#column-a');
    const target=page.locator('#column-b');
    await source.dragTo(target);
    await expect(page.locator('header').within(source)).toHaveText('B');
    await expect(page.locator('header').within(target)).toHaveText('A');


});