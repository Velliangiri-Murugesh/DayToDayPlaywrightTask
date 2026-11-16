import {test,expect} from '@playwright/test'
import path from 'path';
import fs from 'fs'



// test('downloadValidation',async({page})=>{

//     await page.goto('https://the-internet.herokuapp.com/download');
    
//     const [downloadPromise]=await Promise.all([
//           page.waitForEvent('download'),     
        
//         await page.getByRole('link',{name:'1102__________.png'}).click(),
//     ]);

//     const downloadPath=path.join(__dirname,'../../downloads',downloadPromise.suggestedFilename());
//    await downloadPromise.saveAs(downloadPath);



// })

test('filedownloadValidation',async({page,request})=>{
  await page.goto('https://the-internet.herokuapp.com/download');

    const link = page.getByRole('link', { name: '1102__________.png' });

    const downloadPromise = page.waitForEvent('download');
    await link.click();
    const download = await downloadPromise;

    const suggestedName = download.suggestedFilename();
    expect(suggestedName).toBe('1102__________.png');

    const downloadPath = path.join(__dirname, '../../downloads', suggestedName);
    await download.saveAs(downloadPath);
    expect(fs.statSync(downloadPath).size).toBeGreaterThan(0);
try{
    const original = await request.get(download.url(), { ignoreHTTPSErrors: true });
    const downloaded = fs.readFileSync(downloadPath);
    expect(downloaded.equals(await original.body())).toBe(true);
}

    finally {
    // Runs whether the assertions pass or fail
    if (fs.existsSync(downloadPath)) {
      fs.unlinkSync(downloadPath);
    }
}
})