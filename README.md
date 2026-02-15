# 🎭 Enterprise Playwright Framework (SauceDemo)

This is a production-ready, scalable test automation framework built with Playwright. It features **Role-Based Access Control (RBAC)**, **Multi-Environment Support**, **Data-Driven Testing**, and a robust **CI/CD Pipeline** using GitHub Actions.

---

## 🚀 Features

-   **Page Object Model (POM)**: Modular, maintainable page fixtures (`pages/`, `fixtures/`).
-   **Multi-Environment Configuration**: seamless switching between `DEV`, `QA`, `STAGING`, and `PROD`.
-   **Role-Based Authentication**: Automates login state storage for `Admin` and `Standard User` roles.
-   **Data-Driven Tests**: `shop.spec.ts` iterates over JSON data (`tests/data/products.json`).
-   **Cross-Platform Scripts**: Windows/Mac/Linux supported via `cross-env`.
-   **CI/CD Integrated**: GitHub Actions workflow with **Environment Secrets** and manual dispatch.

---

## 🛠️ Local Setup (From Scratch)

### 1. Prerequisites
-   Node.js (v16 or higher)
-   Git

### 2. Clone & Install
```bash
git clone https://github.com/your-username/Playwright_Framework.git
cd Playwright_Framework
npm install
npx playwright install --with-deps
```

### 3. Configure Environments
Create a `.env` file in the root directory for your **local development** (Default: DEV).
*(Note: `.env` is git-ignored for security)*.

**`.env` Template:**
```ini
BASE_URL=https://www.saucedemo.com/
ADMIN_USER=standard_user
ADMIN_PASSWORD=secret_sauce
STANDARD_USER=visual_user
STANDARD_PASSWORD=secret_sauce
ENV=DEV
```

You can also create `.env.staging` for local staging tests:
```ini
# .env.staging
BASE_URL=https://www.saucedemo.com/
ADMIN_USER=problem_user
STANDARD_USER=performance_glitch_user
ENV=STAGING
```

---

## 🏃 Executing Tests

We use standard NPM scripts for consistency across OS (Windows/Mac/Linux).

| Environment | Command | Description |
| :--- | :--- | :--- |
| **Default (Dev)** | `npm test` | Runs all tests using `.env`. |
| **Staging** | `npm run test:staging` | Runs tests using `.env.staging` config. |
| **Prod (Smoke)** | `npm run test:smoke:prod` | Runs **ONLY** `@smoke` tagged tests against Prod. |
| **Debug Mode** | `npm run test:debug` | Opens the Playwright Inspector. |
| **Headed Mode** | `npm run test:headed` | Watches the browser execution visually. |

---

## ⚙️ CI/CD Setup (GitHub Actions)

This framework includes a **"Golden Template"** workflow in `.github/workflows/playwright.yml`. supporting GitHub Environments.

### Step 1: Create Environments
1.  Go to your **GitHub Repository**.
2.  Navigate to **Settings** > **Environments**.
3.  Create the following environments:
    *   `qa`
    *   `staging`
    *   `prod`

### Step 2: Add Secrets & Variables
For **EACH** environment (e.g., click on `qa`), add the following:

**Environment Variables** (Non-sensitive):
-   `BASE_URL`: `https://www.saucedemo.com/`

**Environment Secrets** (Sensitive):
-   `ADMIN_USER`: `standard_user`
-   `ADMIN_PASSWORD`: `secret_sauce`
-   `STANDARD_USER`: `visual_user`
-   `STANDARD_PASSWORD`: `secret_sauce`

*(Repeat this for Staging/Prod with their respective credentials)*.

### Step 3: Run the Pipeline
1.  Go to the **Actions** tab in GitHub.
2.  Select **Playwright Tests**.
3.  Click **Run workflow**.
4.  Select the **Target Environment** (e.g., `staging`) from the dropdown.
5.  Click **Run workflow**.

The pipeline will:
1.  Checkout code.
2.  Install Playwright.
3.  Load the **Secrets** for the selected environment (Staging).
4.  Execute tests.
5.  Upload the **HTML Report** as an artifact.

---

## 📊 Reporting

### Local Reporting
To view the report after a local run:
```bash
npm run report
```
*(Tests must be run with `--reporter=html` or `npm test` defaults)*.

### CI Artifacts
1.  On the GitHub Actions run page, scroll to the bottom.
2.  Under **Artifacts**, download `playwright-report`.
3.  Open `index.html` to view the full execution results, traces, and videos.

---

## 📁 Project Structure

```text
├── .github/workflows/   # CI/CD Pipeline
├── fixtures/            # Page Object Fixtures (pomFixture.ts)
├── pages/               # Page Object Classes (AdminPage, CheckoutPage...)
├── tests/
│   ├── admin/           # Admin Role Tests
│   ├── user/            # User Role Tests (Checkout, Shop)
│   ├── auth-setup/      # Global Setup (Login State Generation)
│   └── data/            # JSON Data for DDT (products.json)
├── utils/               # Environment Configuration (Env.ts)
├── .env                 # Local Secrets (Ignored)
└── playwright.config.ts # Main Config (Dynamic Env Loading)
```
