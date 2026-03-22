# Security E2E Tests - Quick Start Guide

## Overview

This guide will help you get started with the comprehensive security-focused Playwright E2E tests for the Customer Management Angular application.

## Prerequisites

✅ Your project already has Playwright installed (`@playwright/test@^1.48.0`)

### What You Need

1. **Node.js** (v16+)
2. **npm** (v7+)
3. **Angular development server running** on `http://localhost:4200`
4. **Backend API server running** on `http://localhost:8083` (for data operations)

## Quickstart (2 minutes)

### Step 1: Start Your Servers

In separate terminal windows:

```bash
# Terminal 1: Start the Angular development server
npm start
# The app will be available at http://localhost:4200

# Terminal 2: Start your backend API (adjust command as needed)
# Example for Node.js/Express backend:
npm run start:server
# Or for Java:
mvn spring-boot:run
```

### Step 2: Run Security Tests

In a third terminal:

```bash
# Run all security tests
npm run test:security
```

Tests will run headlessly in Chromium, Firefox, and Webkit browsers by default.

---

## Common Commands

### View All Tests with UI
```bash
npm run test:security:ui
```
Opens the Playwright Inspector UI where you can:
- Watch tests execute
- Step through tests
- Inspect page state
- Modify and re-run tests

### Debug Single Test
```bash
npm run test:security:debug
```
Opens the debugger where you can step through tests line-by-line

### Run Specific Test Suites

```bash
# XSS Protection Tests Only
npm run test:security:xss

# Form Validation Tests Only
npm run test:security:validation

# Authentication Tests Only
npm run test:security:auth

# CSRF Tests Only
npm run test:security:csrf

# HTTP Security Headers Tests Only
npm run test:security:headers

# IDOR Vulnerability Tests Only
npm run test:security:idor
```

### Run Single Test
```bash
# Run a specific test by name
npx playwright test tests/security.spec.ts -g "should sanitize XSS payload in customer firstName"
```

### Generate and View HTML Report
```bash
# Run tests
npm run test:security

# View the report
npm run test:security:report
```

### Run on Single Browser
```bash
# Chromium only
npx playwright test tests/security.spec.ts --project=chromium

# Firefox only
npx playwright test tests/security.spec.ts --project=firefox

# WebKit only
npx playwright test tests/security.spec.ts --project=webkit
```

### Run Tests on Custom Server
```bash
BASE_URL=http://localhost:3000 npm run test:security
```

### Run Tests in Headed Mode (see browser)
```bash
npx playwright test tests/security.spec.ts --headed
```

### Run Tests in Slow Motion
```bash
npx playwright test tests/security.spec.ts --headed --slowmo=1000
```

---

## Understanding Test Results

### ✅ Tests Passing
Great! This means:
- **XSS tests passing**: Angular's built-in XSS protection is working
- **Form validation passing**: Validation rules are enforced
- **Header tests passing**: HTTP security headers are configured

### ⚠️ Tests Failing or Documenting Issues

Tests about the following will likely **not be fully passing** (documenting current state):

| Issue | Status | Impact |
|-------|--------|--------|
| **No Authentication Guards** | ❌ NOT IMPLEMENTED | High Risk - All routes public |
| **No CSRF Tokens** | ❌ NOT IMPLEMENTED | High Risk - State changes unprotected |
| **No Security Headers** | ❌ NOT IMPLEMENTED | Medium Risk - No X-Frame-Options, CSP, etc. |
| **No IDOR Protection** | ❌ NOT IMPLEMENTED | High Risk - Users can access any record |
| **Backend Validation** | ⚠️ UNKNOWN | Critical - Frontend validation only |

These are **expected failures** that document security gaps. They're not bugs in the tests!

---

## Test Coverage Summary

### ✅ What IS Protected
- **XSS Input Sanitization** - Angular DomSanitizer prevents script injection
- **Form Validation** - Required fields, email format validation enforced
- **Special Characters** - Properly handled and escaped
- **Unicode Support** - International characters work correctly

### ❌ What IS NOT Protected (Implement These)
- **Authentication/Authorization** - No login system implemented
- **CSRF Protection** - No tokens on state-changing operations
- **HTTPS Enforcement** - Using plain HTTP
- **Access Control** - No validation of who owns what data
- **Rate Limiting** - No protection against brute force
- **Backend Validation** - Only frontend validation exists
- **Security Headers** - Missing important HTTP headers

---

## Understanding the Test Files

### Main Test File
**`tests/security.spec.ts`** (800+ lines)
- Organized into 10 test suites
- Over 50 individual security tests
- Tests cover: XSS, validation, CSRF, headers, IDOR, etc.

### Utility Functions
**`tests/security-utils.ts`** (500+ lines)
- Reusable security testing functions
- XSS/SQL injection payload vectors
- Validators for email, phone, URLs, etc.
- Network monitoring helpers
- Security audit functions

### Documentation
**`tests/SECURITY_TESTS.md`** (500+ lines)
- Detailed breakdown of each test
- Current security status/gaps
- Remediation checklist
- Integration guide for CI/CD

---

## Troubleshooting

### Issue: Tests Timeout
```bash
# Increase timeout
npx playwright test tests/security.spec.ts --timeout=60000
```

### Issue: Port Already in Use
```bash
# Kill process on port 4200
# macOS/Linux:
lsof -ti:4200 | xargs kill -9

# Windows:
netstat -ano | findstr :4200
taskkill /PID <PID> /F
```

### Issue: Backend API Not Responding
- Verify backend is running on `http://localhost:8083`
- Check backend logs for errors
- Run: `curl http://localhost:8083/customers`
- If using `BASE_URL` env var, ensure it matches your setup

### Issue: Browser Not Found
```bash
# Install missing browser dependencies
npx playwright install

# If still issues, use standard Chromium
npx playwright test tests/security.spec.ts --project=chromium
```

### Issue: Tests See Old Data
```bash
# Clear browser cache and cookies
npx playwright test tests/security.spec.ts --clear-cache
```

---

## CI/CD Integration

### GitHub Actions Example

Add to `.github/workflows/security-tests.yml`:

```yaml
name: Security E2E Tests

on: [push, pull_request]

jobs:
  security-tests:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - run: npm ci
      
      - run: npm start &
      
      - run: npm run test:security
      
      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
```

### GitLab CI Example

Add to `.gitlab-ci.yml`:

```yaml
security-tests:
  image: mcr.microsoft.com/playwright:v1.48.0
  script:
    - npm ci
    - npm start &
    - npm run test:security
  artifacts:
    when: always
    paths:
      - playwright-report/
```

---

## Next Steps

1. **Review Test Results**: Check which tests pass/fail
2. **Read Detailed Docs**: See `tests/SECURITY_TESTS.md` for full coverage
3. **Fix Critical Issues**: Implement authentication, CSRF protection
4. **Add to CI/CD**: Integrate tests into your build pipeline
5. **Fix Backend Issues**: Add server-side validation
6. **Monitor Ongoing**: Run tests on every code change

---

## Security Improvement Roadmap

### Phase 1 (Critical) - Week 1
- [ ] Implement authentication service (JWT)
- [ ] Add route guards
- [ ] Add backend input validation

### Phase 2 (High Priority) - Week 2
- [ ] Add CSRF token generation/validation
- [ ] Implement rate limiting
- [ ] Add HTTPS enforcement

### Phase 3 (Important) - Week 3-4
- [ ] Add security headers
- [ ] Implement access control checks
- [ ] Add request/response logging

### Phase 4 (Ongoing)
- [ ] Penetration testing
- [ ] Security code review
- [ ] Dependency security audits
- [ ] Regular security training

---

## Resources

- [Playwright Documentation](https://playwright.dev)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Angular Security Guide](https://angular.io/guide/security)
- [PortSwigger Web Security Academy](https://portswigger.net/web-security)

---

## Support

### Questions or Issues?

1. Check `tests/SECURITY_TESTS.md` for detailed test descriptions
2. Review test error messages - they're very descriptive
3. Use `--debug` flag to step through failing tests
4. Check Playwright reports: `npm run test:security:report`

### Running Tests Manually

Try accessing pages directly during a test run:
```bash
# Terminal 1: Start app
npm start

# Terminal 2: Navigate manually while watching tests
# Visit http://localhost:4200/add-customer
# Try entering XSS payloads
# Verify errors don't execute

# Terminal 3: Run tests
npm run test:security:ui
```

---

**Happy testing! 🚀**
