import {test,expect} from '@playwright/test'

test('keyBoardOperation',async({page})=>{

    await page.goto('https://the-internet.herokuapp.com/key_presses');
    const field=page.locator('#target');
    const result=page.locator('#result');
    const initialText=(await page.locator('#result').textContent())?.trim();
    console.log(initialText);
    await field.press('A');
    await expect(result).toHaveText('You entered: A');


});
test('keyWithoutFocus', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/key_presses');
    const result = page.locator('#result');

    const initialText = (await result.textContent())?.trim() ?? '';
    console.log(initialText);
    console.log('Before B:', JSON.stringify(initialText));
    // No click, so the test does not focus the input
    await page.keyboard.press('B');
    console.log('After B:', JSON.stringify(await result.textContent()));
    console.log(initialText);

    await expect(result).toHaveText('You entered: B');
    expect(initialText).not.toBe('You entered: B');
});

test('enterKey', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/key_presses');
    await page.locator('#target').click();

    await Promise.all([
        page.waitForURL(/key_presses\?/),
        page.keyboard.press('Enter'),
    ]);

    await expect(page).toHaveURL(/key_presses\?/);
    await expect(page.locator('#result')).toHaveText('');
});