import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

// Read environment from command line, e.g. ENV=staging npx playwright test
// Default to .env if no ENV variable is set
const setupEnv = () => {
  const envName = process.env.ENV || ''; // e.g. 'staging'
  const envPath = envName ? `.env.${envName}` : '.env';
  
  dotenv.config({ path: path.resolve(__dirname, envPath) });
  console.log(`🌍 Loaded Environment: ${envName || 'Default'} (${envPath})`);
}
setupEnv();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [['html'], ['list']],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    baseURL: process.env.BASE_URL, 
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    // --- 1. SETUP PROJECTS ---
    // Only runs files matching the specific setup script
    {
      name: 'setup-admin',
      testMatch: 'auth-setup/admin.setup.ts',
    },
    {
      name: 'setup-user',
      testMatch: 'auth-setup/user.setup.ts',
    },

    // --- 2. TEST EXECUTION PROJECTS ---

    // Project A: Admin Tests
    // Project A: Admin Tests
    {
      name: 'Chromium Admin',
      use: {
        ...devices['Desktop Chrome'],
        storageState: '.auth/admin.json',
      },
      dependencies: ['setup-admin'],
      testMatch: 'admin/**/*.spec.ts',
    },

    // Project B: User Tests
    {
      name: 'Chromium User',
      use: {
        ...devices['Desktop Chrome'],
        storageState: '.auth/user.json',
      },
      dependencies: ['setup-user'],
      testMatch: 'user/**/*.spec.ts',
    },

    // Project C: General/Mixed Tests (Example)
    {
      name: 'Chromium General',
      use: { ...devices['Desktop Chrome'] },
      // Maybe depends on both if needed, or handles its own auth with test.use()
      // For now, let's just let it run all other specs
      testIgnore: ['tests/admin/**', 'tests/user/**'],
    },
  ],
});
