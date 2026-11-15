import {test,expect} from '@playwright/test'

test('mouseOverTest',async({page})=>{

    await page.goto('https://the-internet.herokuapp.com/hovers');
    const avatar=page.locator('.figure img');
    const name=page.locator('.figure h5');
    const no_of_avatar= await avatar.count();
        for (let i=0;i<no_of_avatar;i++){
        

        await avatar.nth(i).hover();
        await expect(name.nth(i),`Moved the cursor to user ${i}`).toBeVisible();
        await expect(name.nth(i)).toHaveText(`name: user${i + 1}`);
        await page.getByRole('link',{name:'View profile'}).click();
        await expect(page,`User is appended with /user/${i+1}`).toHaveURL(`https://the-internet.herokuapp.com/users/${i+1}`);
        await page.goBack();



    }

})