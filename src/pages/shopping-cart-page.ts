import { Locator, Page } from "@playwright/test";
import { ShoppingCart } from "./helper/shopping-cart";

export class ShoppingCartPage {

    private readonly page: Page;
    private readonly removeButton: Locator;
    private readonly inventoryItemName: Locator;
    private readonly checkoutButton: Locator;
    readonly shoppingCart: ShoppingCart;

    constructor(page: Page) {
        this.page = page;
        this.removeButton = page.locator('[data-test="remove-sauce-labs-backpack"]');
        this.inventoryItemName = page.locator('[data-test="item-4-title-link"]');
        this.checkoutButton = page.locator('[data-test="checkout"]');
        this.shoppingCart = new ShoppingCart(page);
    }
    
    async clickRemoveButton() {
        await this.removeButton.click();
    }

    async clickCheckoutButton() {
        await this.checkoutButton.click();
    }

    async inventoryItem() {
        await this.page.waitForSelector('[data-test="shopping-cart-badge"]', {timeout: 1000})
        return await this.inventoryItemName.textContent();
    }
}