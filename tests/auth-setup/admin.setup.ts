import { test as setup, expect } from '@playwright/test';
import LoginPage from '../../pages/LoginPage';
import Env from '../../utils/Env';
import path from 'path';

const adminFile = path.join(__dirname, '../../.auth/admin.json');

setup('Authenticate as Admin', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate(Env.BASE_URL);
    await loginPage.login(Env.ADMIN_USER, Env.ADMIN_PASSWORD);
    
    // SauceDemo specific verification
    await expect(page).toHaveURL(/inventory.html/);
    
    await page.context().storageState({ path: adminFile });
    console.log('✅ Admin Auth Saved (SauceDemo)!');
});
