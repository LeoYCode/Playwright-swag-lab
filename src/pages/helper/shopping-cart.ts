import { Locator, Page } from "@playwright/test";

export class ShoppingCart {
    
    private readonly page: Page;
    private readonly shoppingCartLink: Locator;
    private readonly shoppingCartBadge: Locator;


    constructor(page: Page) {
        this.page = page
        this.shoppingCartBadge = page.locator('[data-test="shopping-cart-badge"]');
        this.shoppingCartLink = page.locator('[data-test="shopping-cart-link"]')
    }

    async numberOfItemsInShoppingBag() {
        return await this.shoppingCartBadge.textContent();
    }

    async clickShoppingCart() {
        await this.shoppingCartLink.click();
        await this.page.waitForSelector('[data-test="shopping-cart-badge"]')
    }
}