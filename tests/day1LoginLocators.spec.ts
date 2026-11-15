import {test,expect} from '@playwright/test';


test('validLogin',async({page})=>{

    await page.goto('https://the-internet.herokuapp.com/login');
    await page.getByLabel('Username').fill('tomsmith');
    await page.getByLabel('Password').fill('SuperSecretPassword!');
    await page.getByRole('button',{name:'Login'}).click();
    await expect(page).toHaveURL('https://the-internet.herokuapp.com/secure');
    await expect(page.getByLabel('Messages')).toContainText('You logged into a secure area!');
    await page.getByRole('link',{name:'Logout'}).click();
});

test('InvalidLogin',async({page})=>{

    await page.goto('https://the-internet.herokuapp.com/login');    
    await page.getByLabel('Username').fill('tomsmith');
    await page.getByLabel('Password').fill('SuperTasks!');
    await page.getByRole('button',{name:'Login'}).click();
    await expect(page.getByText('Your password is invalid!')).toBeVisible();
});