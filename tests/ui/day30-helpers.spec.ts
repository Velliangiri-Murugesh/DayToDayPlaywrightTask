import {test,expect} from '@playwright/test'
import {loginAs} from '../../utils/helpers'


test('validLogin',async({page})=>{

    await loginAs(page,'tomsmith','SuperSecretPassword!');
    await expect(page).toHaveURL('https://the-internet.herokuapp.com/secure');




})



test('inValidLogin',async({page})=>{

    await loginAs(page,'tomsmith','SuperSecretPassword');
    await expect(page).toHaveURL('https://the-internet.herokuapp.com/login');
    await expect(page.getByText('Your password is invalid!')).toBeVisible();




})


test('invalidUsernameShowsError',async({page})=>{

    await loginAs(page,'tomsmit1h','SuperSecretPassword');
    await expect(page).toHaveURL('https://the-internet.herokuapp.com/login');
    await expect(page.getByText('Your username is invalid!')).toBeVisible();




})