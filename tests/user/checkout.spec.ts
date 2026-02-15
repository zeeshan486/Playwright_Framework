import { test, expect } from "../../fixtures/pomFixture";
import Env from "../../utils/Env";

/**
 * @file tests/user/checkout.spec.ts
 * @description Validates the entire Critical User Journey: Add to Cart -> Checkout -> Purchase.
 * @rationale While unit tests check buttons works, E2E tests ensure the *business 
 *            process* (making money) works. This is the most valuable test type.
 *            We use `test.step` to make the report readable for non-technical stakeholders.
 */
test.describe('Checkout Workflow', () => {

    test.beforeEach(async ({ page, adminPage }) => {
        // Logged in as Standard User
        await page.goto('/inventory.html');
        await adminPage.resetCart();
    });

    test('Complete a Purchase Flow', async ({ adminPage, checkoutPage }) => {
        await test.step('1. Add Item to Cart', async () => {
            await adminPage.addItemToCart('Sauce Labs Backpack');
            await adminPage.verifyCartBadgeCount('1');
        });

        await test.step('2. Start Checkout', async () => {
            await checkoutPage.proceedToCheckout();
        });

        await test.step('3. Enter Information', async () => {
            // In real world, use realistic fake data or localized data
            await checkoutPage.submitPersonalDetails('John', 'Doe', '12345');
        });

        await test.step('4. Finish Order', async () => {
            await checkoutPage.finishCheckout();
        });

        await test.step('5. Verify Success', async () => {
            await checkoutPage.verifyOrderSuccess();
        });
    });

});
