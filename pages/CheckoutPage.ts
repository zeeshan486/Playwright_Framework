import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export default class CheckoutPage extends BasePage {
    private firstNameInput: Locator;
    private lastNameInput: Locator;
    private postalCodeInput: Locator;
    private continueButton: Locator;
    private finishButton: Locator;
    private completeHeader: Locator;
    private checkoutButton: Locator; // On cart page

    constructor(page: Page) {
        super(page);
        this.checkoutButton = page.locator('#checkout');
        this.firstNameInput = page.locator('#first-name');
        this.lastNameInput = page.locator('#last-name');
        this.postalCodeInput = page.locator('#postal-code');
        this.continueButton = page.locator('#continue');
        this.finishButton = page.locator('#finish');
        this.completeHeader = page.locator('.complete-header');
    }

    async proceedToCheckout() {
        // Assume we are on cart page usually, but if on inventory, we click cart icon first?
        // Let's assume we are on cart page or click cart icon first.
        // For simplicity, let's navigate to cart URL or click cart icon.
        // Better: click cart icon then checkout.
        await this.page.locator('.shopping_cart_link').click();
        await this.checkoutButton.click();
    }

    async submitPersonalDetails(firstName: string, lastName: string, zip: string) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postalCodeInput.fill(zip);
        await this.continueButton.click();
    }

    async finishCheckout() {
        await this.finishButton.click();
    }

    async verifyOrderSuccess() {
        await expect(this.completeHeader).toHaveText('Thank you for your order!');
    }
}
