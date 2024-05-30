import {Locator, Page} from '@playwright/test';

export class LoginPage {
    private readonly page: Page;

    private readonly usernameField: Locator;

    private readonly passwordField: Locator;

    private readonly loginButton: Locator;

    private readonly errorMessage: Locator;
    
    constructor(page: Page) {
        this.page = page;
        this.usernameField = page.locator('[data-test="username"]');
        this.passwordField = page.locator('[data-test="password"]');
        this.loginButton = page.locator('[data-test="login-button"]');
        this.errorMessage = page.locator('[data-test="error"]');
    }

    async enterUsername(username: string) {
        try {
            await this.usernameField.fill(username);
        } catch (error) {
            console.error('Failed to enter username:', error);
            throw error;
        }
    } 

    async enterPassword(password: string) {
        try {
            await this.passwordField.fill(password);
        } catch (error) {
            console.error('Failed to enter password:', error);
            throw error;
        }
    }

    async enterLoginDetails(username: string, password: string) {
        await this.enterUsername(username);
        await this.enterPassword(password);
    }

    async errorText() {
        return await this.errorMessage.innerText()
    }

    async clickLoginButton() {
        await this.loginButton.click();
    }
}
