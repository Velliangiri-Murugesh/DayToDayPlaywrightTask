import {test,expect} from '@playwright/test';

test('alertTest', async ({ page }) => {
    let dialogType: string | undefined;
    let dialogMessage: string | undefined;

    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');

    page.once('dialog', async (dialog) => {
        dialogType = dialog.type();
        dialogMessage = dialog.message();
        await dialog.accept();
    });

    await page.getByRole('button', { name: 'Click for JS Alert' }).click();

    expect(dialogType).toBe('alert');
    expect(dialogMessage).toBe('I am a JS Alert');
    await expect(page.locator('#result')).toContainText('You successfully clicked an alert');
});

test('confirmDismissTest', async ({ page }) => {
    let dialogType: string | undefined;
    let dialogMessage: string | undefined;

    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');

    page.once('dialog', async (dialog) => {
        dialogType = dialog.type();
        dialogMessage = dialog.message();
        await dialog.dismiss();
    });

    await page.getByRole('button', { name: 'Click for JS Confirm' }).click();

    expect(dialogType).toBe('confirm');
    expect(dialogMessage).toBe('I am a JS Confirm');
    await expect(page.locator('#result')).toContainText('You clicked: Cancel');
});

test('confirmAcceptTest', async ({ page }) => {
    let dialogType: string | undefined;

    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');

    page.once('dialog', async (dialog) => {
        dialogType = dialog.type();
        await dialog.accept();
    });

    await page.getByRole('button', { name: 'Click for JS Confirm' }).click();

    expect(dialogType).toBe('confirm');
    await expect(page.locator('#result')).toContainText('You clicked: Ok');
});

test('promptTest', async ({ page }) => {
    let dialogType: string | undefined;
    let dialogMessage: string | undefined;

    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');

    page.once('dialog', async (dialog) => {
        dialogType = dialog.type();
        dialogMessage = dialog.message();
        await dialog.accept('Playwright');
    });

    await page.getByRole('button', { name: 'Click for JS Prompt' }).click();

    expect(dialogType).toBe('prompt');
    expect(dialogMessage).toBe('I am a JS prompt');
    await expect(page.locator('#result')).toContainText('You entered: Playwright');
});