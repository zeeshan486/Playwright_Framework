import { test, expect } from "../../fixtures/pomFixture";
import products from '../data/products.json';
import Env from "../../utils/Env";

/**
 * @file tests/user/shop.spec.ts
 * @description Validates adding items to the cart using a Data-Driven Testing (DDT) approach.
 * @rationale Instead of hardcoding 10 tests, we iterate over a JSON file (`products.json`).
 *            This allows us to scale test coverage by simply adding data, not code.
 *            This is a "Pro" architectural pattern.
 */
test.describe('Shopping Tests (Data Driven)', () => {

    test.beforeEach(async ({ page, adminPage }) => {
        // All these tests assume standard user is logged in
        await page.goto('/inventory.html');
        await adminPage.resetCart();
    });

    products.forEach((product) => {
        
        test(`Add ${product.name} to Cart`, async ({ adminPage }) => {
            // Note: We are using 'adminPage' fixture which maps to AdminPage class
            // Ideally we should rename 'AdminPage' to 'InventoryPage' to indicate it's shared,
            // but for now, we use the existing fixture.
            
            // 1. Verify we are on the dashboard
            await adminPage.verifyDashboard();

            // 2. Add the specific product
            await adminPage.addItemToCart(product.name);

            // 3. Verify Cart Badge updates to '1' (assuming empty start)
            await adminPage.verifyCartBadgeCount('1');
        });

    });

});
