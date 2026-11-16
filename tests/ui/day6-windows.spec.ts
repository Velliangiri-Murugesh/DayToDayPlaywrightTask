import {test,expect} from '@playwright/test';

test('windowTest',async({page})=>{


    
    const context=page.context();

   await page.goto('https://the-internet.herokuapp.com/windows');
   const newPagePromise=context.waitForEvent('page');
   await page.getByRole('link',{name:'Click Here'}).click();
   const newPage = await newPagePromise;
   await newPage.waitForLoadState('load');
   await expect (newPage.getByRole('heading',{name:'New Window'})).toBeVisible();
   await expect (page.getByRole('heading',{name:'Opening a new window'})).toBeVisible();


});