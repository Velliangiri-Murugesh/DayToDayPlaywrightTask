import {test,expect} from '@playwright/test';

test('cheboxValidation',async({page})=>{

    await page.goto('https://the-internet.herokuapp.com/checkboxes');
    await page.locator("#checkboxes input").nth(0).check();
    await expect(page.locator("#checkboxes input").nth(0)).toBeChecked();
    await page.locator("#checkboxes input").nth(1).uncheck();
    await expect(page.locator("#checkboxes input").nth(1)).not.toBeChecked();

});


test('dropDownvalidation',async({page})=>{

    await page.goto('https://the-internet.herokuapp.com/dropdown');
    await expect(( page.getByRole('combobox'))).toHaveValue('');
    await page.getByRole('combobox').selectOption('Option 2');
    await expect(( page.getByRole('combobox'))).toHaveValue('2');
    


})