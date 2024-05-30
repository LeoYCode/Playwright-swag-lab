import { Locator, Page } from "@playwright/test";
import { ShoppingCart } from "./helper/shopping-cart";

export class CheckoutOverviewPage {

    private readonly page: Page;
    private readonly inventoryItemName: Locator;
    private readonly finishButton: Locator;
    readonly shoppingCart: ShoppingCart;

    constructor(page: Page) {
        this.page = page;
        this.inventoryItemName = page.locator('[data-test="item-4-title-link"]');
        this.finishButton = page.locator('[data-test="finish"]');
        this.shoppingCart = new ShoppingCart(page);
    }

    async inventoryItem() {
        return await this.inventoryItemName.textContent();
    }

    async clickFinishButton() {
        await this.finishButton.click();
    }
}