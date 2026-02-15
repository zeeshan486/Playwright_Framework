import { test as setup, expect } from '@playwright/test';
import LoginPage from '../../pages/LoginPage';
import Env from '../../utils/Env';
import path from 'path';

const userFile = path.join(__dirname, '../../.auth/user.json');

setup('Authenticate as Standard User', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate(Env.BASE_URL);
    await loginPage.login(Env.STANDARD_USER, Env.STANDARD_PASSWORD);
    
    // SauceDemo specific verification
    await expect(page).toHaveURL(/inventory.html/);
    
    await page.context().storageState({ path: userFile });
    console.log('✅ User Auth Saved (SauceDemo)!');
});
