import {test, expect} from '@playwright/test';

test.use({ storageState: 'D:/practiceTasks/.auth/user.json' });

test('ReuseLogin',async({page})=>{

    await page.goto('https://the-internet.herokuapp.com/secure');
    await expect(page).toHaveURL('https://the-internet.herokuapp.com/secure');
    await expect(page.getByRole('link', { name: 'Logout' })).toBeVisible();


});
