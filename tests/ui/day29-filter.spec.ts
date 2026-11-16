import {test,expect} from '@playwright/test'

test('filterValidate',async({page})=>{

    await page.goto('https://the-internet.herokuapp.com/tables');
    //Table1 and table 2 has the same value ex: John smith . However the test will focus on #table1
    const table=page.locator('#table1 tbody tr');
    const lastName=table.filter({hasText:"Smith"});
    await expect(lastName).toHaveCount(1);
    await expect(lastName).toBeVisible();
    await expect(lastName).toContainText('John');


    
    
    


})