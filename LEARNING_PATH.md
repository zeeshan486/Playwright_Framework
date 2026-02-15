
# Framework Architecture (The Goal)

Here is where we are heading. We will build each piece of this diagram one by one.

```mermaid
graph TD
    %% Nodes
    CI[CI/CD (GitHub Actions)] --> Runner[Playwright Test Runner]
    Config[Config (playwright.config.ts)] --> Runner
    Env[.env / Env.ts] --> Config
    
    Runner -->|Executes| Specs[Test Specs (*.spec.ts)]
    Data[Test Data (JSON/CSV)] -->|Feeds| Specs
    
    subgraph "The Framework Core"
        Specs -->|Requests| Fixtures[Custom Fixtures]
        Fixtures -->|Injects| POM[Page Objects]
        
        POM -->|Interacts| Browser[Browser / Web Application]
    end
    
    style CI fill:#f9f,stroke:#333,stroke-width:2px
    style Runner fill:#bbf,stroke:#333,stroke-width:2px
    style Fixtures fill:#dfd,stroke:#333,stroke-width:2px
    style POM fill:#dfd,stroke:#333,stroke-width:2px
```

## Step 1: Configuration & Environment (The Foundation)
**Interview Concept**: Environment Variables & `static` properties.
- [ ] Create `.env` file (done)
- [ ] Create `utils/Env.ts` (coming next)
