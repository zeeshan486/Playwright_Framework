# Playwright E2E Framework

This is a robust, industry-standard Playwright framework using the Page Object Model (POM) design pattern. It supports multiple environments, role-based testing, and secure credential management.

## Project Structure

- `pages/`: Page Object Models (POM) - Locators and methods for each page.
- `fixtures/`: Custom fixtures to inject Page Objects directly into tests.
- `utils/`: Helper utilities (e.g., Environment configuration).
- `tests/`: Test specifications.
- `.env`: Local environment variables (Git-ignored).
- `playwright.config.ts`: Main configuration file.
- `.github/workflows/`: CI/CD pipeline configuration.

## Setup

1.  **Install Dependencies**:
    ```bash
    npm install
    npx playwright install
    ```

2.  **Configure Environment**:
    - Create a `.env` file in the root directory (copy the format from `.env.example` if available, or use the template below):
    ```env
    BASE_URL=https://opensource-demo.orangehrmlive.com/web/index.php/auth/login
    ADMIN_USER=Admin
    ADMIN_PASSWORD=admin123
    STANDARD_USER=user
    STANDARD_PASSWORD=user123
    ENV=DEV
    ```

## Running Tests

- **Run all tests**:
  ```bash
  npx playwright test
  ```

- **Run in headed mode** (visible browser):
  ```bash
  npx playwright test --headed
  ```

- **Run a specific test file**:
  ```bash
  npx playwright test tests/login.spec.ts
  ```

## Credential Management

- **Local Development**:
  - We use `.env` to store sensitive credentials.
  - This file is listed in `.gitignore` so it is **NEVER** committed to the repository.

- **CI/CD (GitHub Actions)**:
  - We use **GitHub Secrets** to inject credentials into the CI pipeline.
  - Go to your GitHub Repo -> Settings -> Secrets and variables -> Actions.
  - Add repository secrets matching the `.env` keys (`ADMIN_USER`, `ADMIN_PASSWORD`, etc.).
  - The workflow file (`.github/workflows/playwright.yml`) maps these secrets to environment variables.

## Environments (Prod, Staging, Dev)

- You can switch environments by changing the `BASE_URL` in your `.env` file locally.
- In CI/CD, you can have different workflows or inputs to select the environment, or simply set the default secrets to point to your Staging environment.
