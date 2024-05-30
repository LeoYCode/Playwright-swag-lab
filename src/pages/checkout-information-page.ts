import { Locator, Page } from "@playwright/test";
import { ShoppingCart } from "./helper/shopping-cart";

export class CheckoutPageYourInformation {

    private readonly page: Page;
    private readonly firstName: Locator;
    private readonly lastName: Locator;
    private readonly zip: Locator;
    private readonly continueButton: Locator;
    readonly shoppingCart: ShoppingCart;

    constructor(page: Page) {
        this.page = page;
        this.firstName = page.locator('[data-test="firstName"]');
        this.lastName = page.locator('[data-test="lastName"]');
        this.zip = page.locator('[data-test="postalCode"]');
        this.continueButton = page.locator('[data-test="continue"]');
        this.shoppingCart = new ShoppingCart(page);
    }

    async fillFirstName(firstName: string) {
        await this.firstName.click();
        await this.firstName.fill(firstName);
    }

    async fillLastName(lastName: string) {
        await this.lastName.click();
        await this.lastName.fill(lastName);
    }

    async fillZip(zip: string) {
        await this.zip.click();
        await this.zip.fill(zip);
    }

    async clickContinueButton() {
        await this.continueButton.click();
    }

    async fillCheckoutInformation({ firstName, lastName, zip }) {
        await this.fillFirstName(firstName);
        await this.fillLastName(lastName);
        await this.fillZip(zip);
        await this.clickContinueButton();
    }
}