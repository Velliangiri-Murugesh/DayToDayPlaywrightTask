import {test,expect} from '@playwright/test'

  test.beforeEach(async({page})=>{

  await page.goto('https://the-internet.herokuapp.com/login');
    
     });

test.describe('LoginValidation',()=>{


     test('validLoginRedirectsToSecure',async({page})=>{
        await page.getByLabel('Username').fill('tomsmith');
        await page.getByLabel('Password').fill('SuperSecretPassword!');
        await page.getByRole('button',{name:'Login'}).click();
        await expect(page).toHaveURL('https://the-internet.herokuapp.com/secure');
     });

       test('invalidPasswordShowsError',async({page})=>{
       await page.getByLabel('Username').fill('tomsmith');
       await page.getByLabel('Password').fill('SuperTasks!');
       await page.getByRole('button',{name:'Login'}).click();
       await expect(page.getByText('Your password is invalid!')).toBeVisible();
     });

       test('logoutReturnsToLogin',async({page})=>{
      await page.getByLabel('Username').fill('tomsmith');
        await page.getByLabel('Password').fill('SuperSecretPassword!');
        await page.getByRole('button',{name:'Login'}).click();
        await expect(page).toHaveURL('https://the-internet.herokuapp.com/secure');
        await expect(page.getByText('You logged into a secure area!')).toBeVisible();
        await page.getByRole('link',{name:'Logout'}).click();
        await expect(page).toHaveURL('https://the-internet.herokuapp.com/login');
        await expect(page.getByText('You logged out of the secure area!')).toBeVisible();

     });












});