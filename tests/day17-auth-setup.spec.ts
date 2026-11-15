import {test,expect} from '@playwright/test'
import { LoginPage } from '../pages/LoginPage';
import path from 'path';

const dir=path.join(__dirname,'../.auth/user.json')
test('storageStateTest',{tag:'@negative'},async({page})=>{

    const loginPage=new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('tomsmith','SuperSecretPassword!');
    await expect(page).toHaveURL('https://the-internet.herokuapp.com/secure');
    await page.context().storageState({path:dir});

});