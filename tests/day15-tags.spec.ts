import { test, expect } from '../fixtures/loginFixtures';

test('loginPage',{tag:'@smoke'},async({loginPage,page})=>{

    await loginPage.goto();
    await loginPage.login('tomsmith','SuperSecretPassword!');
    await expect(page).toHaveURL('https://the-internet.herokuapp.com/secure');
    

});


test('InvalidLogin',{tag:'@regression'},async({loginPage,page})=>{

        await loginPage.goto();
        await loginPage.login('tomsmith','SuperSecretPassword');
            await expect(page.getByText('Your password is invalid!')).toBeVisible();
});

test('logout',{tag:'@smoke'},async({loginPage,page})=>{

    await loginPage.goto();
    await loginPage.login('tomsmith','SuperSecretPassword!');
    await expect(page).toHaveURL('https://the-internet.herokuapp.com/secure');
    await loginPage.logout();
    await expect(page).toHaveURL('https://the-internet.herokuapp.com/login');
    await expect(page.getByText('You logged out of the secure area!')).toBeVisible();
    

});
