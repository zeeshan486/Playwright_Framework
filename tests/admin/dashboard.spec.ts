import { test, expect } from "../../fixtures/pomFixture";
import Env from "../../utils/Env";

/**
 * @file tests/admin/dashboard.spec.ts
 * @description Verifies that the 'Admin' role can successfully access the specialized dashboard.
 * @rationale In a real-world app, Admins have access to features regular users don't.
 *            This test ensures our RBAC (Role Based Access Control) allows entry.
 */
test.describe('Admin Dashboard Tests', () => {

    /**
     * Test Case: Verify Dashboard Access
     * Flow: Login as Admin (via Global Setup) -> Navigate to Inventory -> Verify URL & Elements
     */
    test('Verify Dashboard Access', async ({ page }) => {
        // 1. Arrange & Act
        // Go straight to inventory (Dashboard)
        await page.goto('/inventory.html');

        // 2. Assert
        await expect(page).toHaveURL(/inventory.html/);
        await expect(page.locator('.app_logo')).toBeVisible();
    });

});
