import path from 'path';
import {test, expect} from '@playwright/test';


test('fileUploadValidation',async({page})=>{

    await page.goto('https://the-internet.herokuapp.com/upload');
    const filePath = path.join(__dirname, '../../test_data/test.txt');
    await page.locator('#file-upload').setInputFiles(filePath);
    await page.getByRole('button',{name:'Upload'}).click();
    await expect(page.locator('#uploaded-files')).toHaveText('test.txt');


});