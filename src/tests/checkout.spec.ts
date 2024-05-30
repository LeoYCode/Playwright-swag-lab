import {test, expect} from '../base/fixture';
import loginData from '../test-data/login-data.json';
import customerData from '../test-data/customer-data.json';
import Env from '../utils/env';

test.describe('Checkout', () => {
    test.beforeEach(async ({ page, loginPage }) => {
        await page.goto(Env.BASE_URL as string)
        const { username, password } = loginData.standardUser;
        await loginPage.enterLoginDetails(username, password)
        await loginPage.clickLoginButton();
    });

    test('Checkout item', async ({ inventoryPage, shoppingCartPage, checkoutInformationPage, 
                                checkoutOverviewPage, checkoutCompletePage}) => {
        const productName = await inventoryPage.inventoryItem();
        await inventoryPage.addProductOneToCart();
        await inventoryPage.shoppingCart.clickShoppingCart();
        expect(productName).toEqual(await shoppingCartPage.inventoryItem())
        await shoppingCartPage.clickCheckoutButton();
        
        const { firstName, lastName, zip } = customerData.customerOne;
        await checkoutInformationPage.fillCheckoutInformation({firstName, lastName, zip})
        expect(productName).toEqual(await shoppingCartPage.inventoryItem())
        await checkoutOverviewPage.clickFinishButton();
        expect(checkoutCompletePage.isCompleteHeaderDisplayed()).toEqual(true)
        expect(checkoutCompletePage.isFinishButtonDisplayed()).toEqual(true)
    });     
    test.afterEach(async ({page}) => {
        await page.close();
    });
});  