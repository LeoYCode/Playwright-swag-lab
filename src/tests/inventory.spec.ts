import {test, expect} from '../base/fixture';
import loginData from '../test-data/login-data.json'
import Env from '../utils/env';

test.describe('Inventory', () => {
    test.beforeEach(async ({ page, loginPage }) => {
        await page.goto(Env.BASE_URL as string)
        const { username, password } = loginData.standardUser;
        await loginPage.enterLoginDetails(username, password)
        await loginPage.clickLoginButton();
    });

    test('Shopping cart badge', async ({ inventoryPage }) => {
        await inventoryPage.addProductOneToCart();
        const textContent = await inventoryPage.shoppingCart.numberOfItemsInShoppingBag();
        expect(Number(textContent)).toBe(1)
    });     
    test.afterEach(async ({page}) => {
        await page.close();
    });
});  