import {expect, test} from '../base/fixture';
import loginData from '../test-data/login-data.json'
import Env from '../utils/env';

test.describe('Shopping Cart', () => {
    test.beforeEach(async ({ page, loginPage }) => {
        await page.goto(Env.BASE_URL as string)
        const { username, password } = loginData.standardUser;
        await loginPage.enterLoginDetails(username, password)
        await loginPage.clickLoginButton();
    });
    
    test('Cart item name displayed', async ({ inventoryPage, shoppingCartPage}) => {
        const productName = await inventoryPage.inventoryItem();
        await inventoryPage.addProductOneToCart();
        await inventoryPage.shoppingCart.clickShoppingCart();
        const cartProductName = await shoppingCartPage.inventoryItem()
        expect(productName).toEqual(cartProductName)
    });  

    test.afterEach(async ({page}) => {
        await page.close();
    });
});