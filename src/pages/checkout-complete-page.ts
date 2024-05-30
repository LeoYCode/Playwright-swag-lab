import { Locator, Page } from "@playwright/test";
import { ShoppingCart } from "./helper/shopping-cart";

export class CheckoutCompletePage {

    private readonly page: Page;
    private readonly completeHeader: Locator;
    private readonly backButton: Locator;
    readonly shoppingCart: ShoppingCart;

    constructor(page: Page) {
        this.page = page;
        this.completeHeader = page.locator('[data-test="complete-header"]');
        this.backButton = page.locator('[data-test="back-to-products"]');
        this.shoppingCart = new ShoppingCart(page);
    }

    async isCompleteHeaderDisplayed() {
        return await this.completeHeader.isVisible();
    }

    async isFinishButtonDisplayed() {
        return await this.backButton.isVisible();
    }
}