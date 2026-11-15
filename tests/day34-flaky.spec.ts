// import { test, expect } from '@playwright/test';
// import { LoginPage } from '../pages/LoginPage';

// test('flakyLogin', async ({ page }, testInfo) => {
//     const loginPage = new LoginPage(page);
//     await loginPage.goto();
//     await loginPage.login('tomsmith', 'SuperSecretPassword!');
//     await expect(page).toHaveURL('https://the-internet.herokuapp.com/secure');

//     // Deliberate flake: fail on the first attempt of even-numbered repeats.
//     // The retry (testInfo.retry === 1) passes, so the test is reported as flaky.
//     if (testInfo.retry === 0 && testInfo.repeatEachIndex % 2 === 1) {
//         throw new Error(`Deliberate flake: repeat ${testInfo.repeatEachIndex}, attempt ${testInfo.retry}`);
//     }
// });