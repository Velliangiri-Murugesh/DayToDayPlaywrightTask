import {test,expect} from '@playwright/test'
import { LoginPage } from '../../pages/LoginPage'


test('SoftAssertion',async({page})=>{

    const loginPage=new LoginPage(page);
    
    await test.step('Form elements',async()=>{
    await loginPage.goto();
    // await expect.soft(page.getByText('Wronghere')).toBeVisible();
    await expect.soft(loginPage.usernameInput).toBeVisible();
    await expect.soft(loginPage.passwordInput).toBeVisible();
    


    })

    await test.step('Button and heading',async()=>{

        await expect.soft(loginPage.signInbutton).toBeVisible();
        await expect.soft(page.getByRole('heading',{name:'Login Page'})).toBeVisible();
        




    })
    






})