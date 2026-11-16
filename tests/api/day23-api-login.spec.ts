import {test,expect} from '@playwright/test'

test ('apiLogin',async({request,browser})=>{


    const response=await request.post('https://the-internet.herokuapp.com/authenticate',{

        ignoreHTTPSErrors:true,


        form:{
            username:"tomsmith",
            password:"SuperSecretPassword!",
        }

    })

    expect(response.ok()).toBeTruthy();
   expect(response.url()).toContain('/secure')  
 const state = await request.storageState();
 
const sessionCookie = state.cookies.find(c => c.name === 'rack.session');
if (!sessionCookie) throw new Error('rack.session cookie not found');

const context = await browser.newContext();
await context.addCookies([sessionCookie]);
const page = await context.newPage();
await page.goto('https://the-internet.herokuapp.com/secure');
 await expect(page.getByRole('link', { name: 'Logout' })).toBeVisible();
await context.close();

    

})


test('apiInvalidLogin', async ({ request, browser }) => {
    const response = await request.post('https://the-internet.herokuapp.com/authenticate', {
        ignoreHTTPSErrors: true,
        form: { username: 'tomsmith', password: 'wrongpassword!' },
    });
    expect(response.url()).toContain('/login');

    const state = await request.storageState();
    const sessionCookie = state.cookies.find(c => c.name === 'rack.session');

    const context = await browser.newContext();
    if (sessionCookie) await context.addCookies([sessionCookie]);
    const page = await context.newPage();
    await page.goto('https://the-internet.herokuapp.com/secure');

    await expect(page).toHaveURL(/\/login$/);
    await expect(page.getByRole('link', { name: 'Logout' })).toBeHidden();
    await context.close();
});