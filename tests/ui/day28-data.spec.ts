import {test,expect} from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { LoginPage } from '../../pages/LoginPage';

type User = {
  name: string;
  username: string;
  password: string;
  expectedUrl: string;
  expectedMessage: string;
};

const users:User[]=JSON.parse(fs.readFileSync(path.join(__dirname,'../../test_data/user.json'), 'utf-8'));

for (const user of users){

    test.describe('Login validation from JSON data', () => {

    test(`ValidateLogin as ${user.name}`, { tag: '@ui' }, async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.goto();
      await loginPage.login(user.username, user.password);
      await expect(page).toHaveURL(new RegExp(`${user.expectedUrl}$`));
      await expect(page.getByText(user.expectedMessage)).toBeVisible();
    });

})
}