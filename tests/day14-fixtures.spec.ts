import { test, expect } from '../fixtures/loginFixtures';

test('loginPage',async({loginPage,page})=>{

    await loginPage.goto();
    await loginPage.login('tomsmith','SuperSecretPassword!');
    await expect(page).toHaveURL('https://the-internet.herokuapp.com/secure');
    await loginPage.logout();
    

})