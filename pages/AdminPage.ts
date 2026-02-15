import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export default class AdminPage extends BasePage {
    // In SauceDemo, the "Dashboard" is the Inventory Page
    private inventoryHeader: Locator;
    private cartIcon: Locator;
    
    constructor(page: Page) {
        super(page);
        this.inventoryHeader = page.locator('.app_logo'); 
        this.cartIcon = page.locator('.shopping_cart_link');
    }

    async verifyDashboard() {
        // Assert we are on the inventory page
        await expect(this.page).toHaveURL(/inventory.html/);
        await expect(this.inventoryHeader).toBeVisible();
        await expect(this.cartIcon).toBeVisible();
    }

    /**
     * Adds an item to the cart by product name.
     * Use { hasText: ... } to scope the locator to the correct product card.
     */
    async addItemToCart(productName: string) {
        // Example: Finds the card containing "Sauce Labs Backpack", then finds the button inside it.
        const productCard = this.page.locator('.inventory_item', { hasText: productName });
        const addButton = productCard.locator('button');
        await addButton.click();
    }

    /**
     * Verifies the cart badge shows the expected number of items.
     */
    async verifyCartBadgeCount(count: string) {
        const badge = this.cartIcon.locator('.shopping_cart_badge');
        await expect(badge).toHaveText(count);
    }

    /**
     * Resets the application state (clears cart)
     * This encapsulates the 'dirty' localStorage logic away from the test.
     */
    async resetCart() {
        await this.page.evaluate(() => {
            window.localStorage.removeItem('cart-contents');
            window.localStorage.clear();
        });
        await this.page.reload();
    }
}
