import {LoginPage} from '../pages/LoginPage'
import {test,expect} from '@playwright/test'

test('validLogin',async({page})=>{

    const loginPage=new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('tomsmith','SuperSecretPassword!');
    await expect(page).toHaveURL('https://the-internet.herokuapp.com/secure');
    await expect(loginPage.flashMessages).toContainText('You logged into a secure area!');
    await loginPage.logout();
    
});

test('InvalidLogin',async({page})=>{

    const loginPage=new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('tomsmith','SuperSecretPassword');
    await expect(loginPage.flashMessages).toBeVisible();
});