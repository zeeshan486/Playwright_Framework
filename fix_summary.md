### Issue
The error "Module '"../pages/AdminPage"' has no exported member 'AdminPage'" occurred because `AdminPage` was exported as a `default` export in `pages/AdminPage.ts`, but imported as a named export in `fixtures/pomFixture.ts`.

### Solution
Updated `fixtures/pomFixture.ts` to import `AdminPage` as a default import.

**Before:**
```typescript
import { AdminPage } from "../pages/AdminPage";
```

**After:**
```typescript
import AdminPage from "../pages/AdminPage";
```

This ensures the import matches the export style of the module.
Verified by running `npx playwright test tests/admin/dashboard.spec.ts`.
