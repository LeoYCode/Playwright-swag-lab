import { test as baseTest } from '@playwright/test';
import { allure } from 'allure-playwright';
import { LoginPage } from '../pages/login-page';
import { InventoryPage } from '../pages/inventory-page';
import { ShoppingCartPage } from '../pages/shopping-cart-page';
import { isBstack } from '../browserstack/browserstack';
import BrowserstackService from '../browserstack/browserstack-service';
import BrowserStackLocal from 'browserstack-local';
import Env from '../utils/env';
import { CheckoutOverviewPage } from '../pages/checkout-overview-page';
import { CheckoutPageYourInformation } from '../pages/checkout-information-page';
import { CheckoutCompletePage } from '../pages/checkout-complete-page';

type Pages = {
    loginPage: LoginPage;
    inventoryPage: InventoryPage;
    shoppingCartPage: ShoppingCartPage;
    checkoutOverviewPage: CheckoutOverviewPage;
    checkoutInformationPage: CheckoutPageYourInformation;
    checkoutCompletePage: CheckoutCompletePage;
};

const bsLocal = new BrowserStackLocal.Local();

const BS_LOCAL_ARGS = {
    key: Env.BROWSERSTACK_ACCESS_KEY,
    forceLocal: 'true',
    force: 'true',
    verbose: true,
    onlyAutomate: true,
};

const browserstack = new BrowserstackService();

const startBrowser = async (playwright, testInfo) => {
    if (isBstack) {
        browserstack.setBstackBuildCaps(testInfo.project.name);
        return await browserstack.startBrowser(playwright);
    } else {
        return await playwright[testInfo.project.use.browserName].launch();
    }
};

const startPage = async (browser, testInfo) => {
    if (isBstack) {
        const page = await browser.newPage(testInfo.project.use);
        await browserstack.setSessionName(page, testInfo);
        const session = await browserstack.getSessionDetails(page);
        allure.link(session.public_url, 'BROWSERSTACK LINK FOR THE TEST');
        return page;
    } else {
        return await browser.newPage();
    }
};

const testPages = baseTest.extend<Pages>({
    browser: async ({ playwright }, use, testInfo) => {
        const browser = await startBrowser(playwright, testInfo);
        await use(browser);
        await browser.close();
    },
    page: async ({ browser }, use, testInfo) => {
        const page = await startPage(browser, testInfo);
        await use(page);
        await page.close();
    },
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    inventoryPage: async ({ page }, use) => {
        await use(new InventoryPage(page));
    },
    shoppingCartPage: async ({ page }, use) => {
        await use(new ShoppingCartPage(page));
    },
    checkoutOverviewPage: async ({ page }, use) => {
        await use(new CheckoutOverviewPage(page));
    },
    checkoutInformationPage: async ({ page }, use) => {
        await use(new CheckoutPageYourInformation(page));
    },
    checkoutCompletePage: async ({ page }, use) => {
        await use(new CheckoutCompletePage(page));
    },
});

export const test = testPages;
export const { expect } = testPages;
