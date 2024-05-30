import {test, expect} from '../base/fixture';
import loginData from '../test-data/login-data.json'
import Env from '../utils/env';

test.describe('Login', () => {
    test.beforeEach(async ({ page, loginPage }) => {
        await page.goto(Env.BASE_URL as string)
        const { username, password } = loginData.lockedOutUser;
        await loginPage.enterLoginDetails(username, password)
        await loginPage.clickLoginButton();
    });

    test('Locked out user', async ({ loginPage }) => {
        expect(await loginPage.errorText()).toEqual("Epic sadface: Sorry, this user has been locked out.")
    });    
     
    test.afterEach(async ({page}) => {
        await page.close();
    });
});  