# Testing Guidelines: TODO App

All new features must include appropriate tests. Tests must be isolated, independent, maintainable, and follow the best practices defined below.

---

## Unit Tests

- **Framework**: Jest
- Test individual functions and React components in isolation
- **File naming convention**: `*.test.js` or `*.test.ts`
- Name test files to match the file being tested (e.g., `app.test.js` for `app.js`)

### Directory Structure

| Scope    | Location                                  |
|----------|-------------------------------------------|
| Backend  | `packages/backend/__tests__/`             |
| Frontend | `packages/frontend/src/__tests__/`        |

---

## Integration Tests

- **Framework**: Jest + Supertest
- Test backend API endpoints with real HTTP requests
- **File naming convention**: `*.test.js` or `*.test.ts`
- Name files based on what they test (e.g., `todos-api.test.js` for TODO API endpoints)

### Directory Structure

| Scope    | Location                                          |
|----------|---------------------------------------------------|
| Backend  | `packages/backend/__tests__/integration/`         |

---

## End-to-End (E2E) Tests

- **Framework**: Playwright (required — do not use other E2E frameworks)
- Test complete UI workflows through browser automation
- **File naming convention**: `*.spec.js` or `*.spec.ts`
- Name files based on the user journey they test (e.g., `todo-workflow.spec.js`)

### Directory Structure

| Scope | Location     |
|-------|--------------|
| E2E   | `tests/e2e/` |

### Playwright Rules

- Use **one browser only**
- Use the **Page Object Model (POM)** pattern for maintainability
- Limit E2E tests to **5–8 critical user journeys** — focus on happy paths and key edge cases, not exhaustive coverage

---

## General Rules

### Isolation & Independence
- Every test must be fully isolated and independent
- Each test must set up its own data and must not rely on other tests

### Setup & Teardown
- Setup and teardown hooks are required (e.g., `beforeEach`, `afterEach`, `beforeAll`, `afterAll`)
- Tests must pass reliably across multiple runs

### Port Configuration
- Always use environment variables with sensible defaults:
  - **Backend**: `const PORT = process.env.PORT || 3030;`
  - **Frontend**: React's default port is `3000`, overridable via the `PORT` environment variable
- This allows CI/CD workflows to dynamically detect ports
