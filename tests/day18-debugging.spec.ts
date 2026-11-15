import {test,expect} from '../fixtures/loginFixtures'
import { LoginPage  } from '../pages/LoginPage'

test('TraceTest',{tag:'@negative'},async({loginPage,page})=>{

    await loginPage.goto();
    await loginPage.login('tomsmith','password');
    await expect (page.getByLabel('Messages')).toContainText('Your username is invalid!');
    


})
