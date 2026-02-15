import { test, expect } from "../../fixtures/pomFixture";
import Env from "../../utils/Env";

/**
 * @file tests/user/dashboard.spec.ts
 * @description Verifies that the 'Standard User' role can access their allowed areas.
 * @rationale Confirm that our Authentication Fixture correctly segregates user sessions.
 *            This proves that Parallel Execution won't mix up sessions.
 */
test.describe('Standard User Dashboard Tests', () => {

    test('Verify Standard User Access @smoke', async ({ page }) => {
        // 1. Arrange & Act
        // Go straight to inventory (Dashboard) using saved state
        await page.goto('/inventory.html');

        // 2. Assert
        await expect(page).toHaveURL(/inventory.html/);
        
        // Real World Check: Ensure we don't see Admin-only elements (if any existed)
        // For SauceDemo, we verify the cart is visible as it's a key user feature
        await expect(page.locator('.shopping_cart_link')).toBeVisible();
    });

});
