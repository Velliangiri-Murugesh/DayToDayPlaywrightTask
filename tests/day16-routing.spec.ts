import {test,request,expect} from '@playwright/test'

test.use({ ignoreHTTPSErrors: true });

test ('NetworkInterception',{tag:'@apiMock'},async({page})=>{

    await page.route('**/status_codes/404',async(route)=>{

        await route.fulfill({
            status:200,
            body:'<html><body><h3>Mocked page</h3></body></html>',
            contentType:'text/html',
        })
    })
    await page.goto('https://the-internet.herokuapp.com/status_codes');
    await page.getByRole('link',{name:'404'}).click();
    await expect(page.getByText('Mocked page')).toBeVisible();





});


test ('WithoutNetworkInterception',{tag:'@apiMock'},async({page})=>{

    await page.goto('https://the-internet.herokuapp.com/status_codes');
    await page.getByRole('link',{name:'404'}).click();
    await expect(page.getByText('This page returned a 404 status code.')).toBeVisible();




})
