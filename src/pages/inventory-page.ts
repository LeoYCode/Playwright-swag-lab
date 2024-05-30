import { Locator, Page } from "@playwright/test";
import { ShoppingCart } from "./helper/shopping-cart";

export class InventoryPage {

    private readonly page: Page;
    private readonly productOne: Locator;
    private readonly productTwo: Locator;
    private readonly removeButton: Locator;
    private readonly inventoryItemName: Locator;
    readonly shoppingCart: ShoppingCart;

    constructor(page: Page) {
        this.page = page;
        this.productOne = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
        this.productTwo = page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]');
        this.removeButton = page.locator('[data-test="remove-sauce-labs-backpack"] ');
        this.inventoryItemName = page.locator('[data-test="item-4-title-link"] [data-test="inventory-item-name"]');
        this.shoppingCart = new ShoppingCart(page);
    }

    async addProductOneToCart() {
        this.productOne.click();
    }

    async addProductTwoToCart() {
        this.productTwo.click();
    }

    async clickRemoveButton() {
        this.removeButton.click();
    }

    async inventoryItem() {
        return await this.inventoryItemName.textContent();
    }
}