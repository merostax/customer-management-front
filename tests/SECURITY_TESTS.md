# Security-Focused E2E Tests Documentation

## Overview

This document describes the comprehensive security-focused Playwright E2E tests for the Customer Management Angular application. These tests focus on detecting and preventing common web application vulnerabilities.

## Test Coverage

### 1. XSS (Cross-Site Scripting) Protection
**File:** `tests/security.spec.ts` - "XSS (Cross-Site Scripting) Protection" suite

Tests that verify the application properly sanitizes user inputs to prevent malicious script execution:

- **Customer firstName XSS Prevention**: Tests `<img>` tag with onerror event handler
- **Customer lastName XSS Prevention**: Tests `<script>` tag injection
- **Customer email XSS Prevention**: Tests attribute-based XSS with event handlers
- **Address city XSS Prevention**: Tests img tag injection in address fields
- **SVG Vector XSS Prevention**: Tests SVG-based XSS attacks
- **Address2 Event Handler Prevention**: Tests inline event handler injection
- **Data URL Scheme Prevention**: Tests javascript: protocol injection

**Expected Behavior:**
- No alert dialogs should appear
- No XSS payloads should execute
- Input values should be sanitized by Angular's built-in sanitization
- Console should not contain execution traces

---

### 2. Form Validation Security
**File:** `tests/security.spec.ts` - "Form Validation Security" suite

Tests that verify form validation rules are enforced and prevent invalid data submission:

- **Required Field Validation**: Verifies firstName, lastName, email, addressId, storeId are required in customer form
- **Required Fields in Address Form**: Verifies address, phone, city, district, country are required
- **Email Format Validation**: Tests that invalid email addresses are rejected
- **SQL Injection Prevention**: Tests that SQL injection payloads are treated as literal strings
- **Input Preservation**: Verifies form values are correctly captured and not interpreted

**Expected Behavior:**
- Submit button should be disabled when required fields are empty
- Invalid email formats should show validation errors
- SQL injection attempts should be treated as literal text
- Form fields should have `ng-invalid` class or `aria-invalid` attribute when invalid

**Important Note:** The application currently does NOT have authentication guards. These tests document the security posture and can be expanded once authentication is implemented.

---

### 3. Sensitive Data Exposure
**File:** `tests/security.spec.ts` - "Sensitive Data Exposure" suite

Tests that verify sensitive information is not exposed in page source, headers, or network traffic:

- **Password Field Detection**: Verifies no password fields exist in page source
- **API Key Exposure Check**: Searches for hardcoded API keys in page content
- **Sensitive Headers Monitoring**: Monitors for exposed Authorization or X-API-Key headers
- **Email Display Verification**: Checks that email addresses are properly formatted in displays
- **Data Masking Verification**: Ensures sensitive data follows proper formatting standards

**Expected Behavior:**
- No passwords, API keys, or tokens should be visible in page source
- Authentication headers should be transmitted securely (HTTPS only)
- Email addresses should not be masked unless specifically required by policy
- Sensitive data should follow proper HTML entity encoding

---

### 4. Authentication and Route Guards
**File:** `tests/security.spec.ts` - "Authentication and Route Guards" suite

Tests that document and verify access control to protected routes:

- **Add Customer Route Protection**: Verifies access control to `/add-customer`
- **Edit Customer Route Protection**: Verifies access control to `/edit-customer/:id`
- **Customer List Protection**: Verifies access control to `/customers`
- **Add Address Route Protection**: Verifies access control to `/add-address`
- **Edit Address Route Protection**: Verifies access control to `/edit-address/:id`
- **Address List Protection**: Verifies access control to `/addresses`

**Current Status:** 🛑 **NO AUTHENTICATION GUARDS IMPLEMENTED**

All routes are currently accessible without authentication. To implement proper security:

1. Add Angular route guards
2. Implement authentication service
3. Use JWT or session-based authentication
4. Protect routes with `canActivate` guard
5. Implement role-based access control (RBAC)

---

### 5. CSRF (Cross-Site Request Forgery) Protection
**File:** `tests/security.spec.ts` - "CSRF Protection" suite

Tests that verify CSRF protection mechanisms:

- **CSRF Token Presence**: Checks if forms include CSRF tokens in POST requests
- **Same-Origin Policy Validation**: Verifies API calls originate from the same origin
- **Request Origin Verification**: Monitors request origins to prevent cross-site attacks

**Current Status:** 🛑 **CSRF TOKENS NOT DETECTED**

To implement CSRF protection:

1. Add CSRF token generation on the backend
2. Include CSRF token in all state-changing requests (POST, PUT, DELETE)
3. Use Angular's built-in `HttpClientXsrfModule`
4. Validate tokens on the backend for all state-changing operations
5. Use SameSite cookie attribute

---

### 6. Content Security Policy (CSP)
**File:** `tests/security.spec.ts` - "Content Security Policy (CSP)" suite

Tests that verify Content Security Policy headers are properly configured:

- **CSP Header Detection**: Checks for Content-Security-Policy header in responses

**Current Status:** 🛑 **CSP HEADERS NOT DETECTED**

To implement CSP:

1. Add Content-Security-Policy headers at the server level
2. Configure restrictive policies for scripts, styles, and external resources
3. Use nonce-based or hash-based inline script policies
4. Block unsafe-inline and unsafe-eval directives
5. Regular CSP violation monitoring

---

### 7. Input Sanitization Across Forms
**File:** `tests/security.spec.ts` - "Input Sanitization Across Forms" suite

Tests that verify inputs with special characters, unicode, and null bytes are handled safely:

- **Special Characters Handling**: Tests `!@#$%^&*()[]{}` in form inputs
- **Unicode Character Support**: Tests international characters (Chinese, Hindi emojis)
- **Whitespace Handling**: Tests inputs with leading/trailing whitespace
- **Null Byte Injection Prevention**: Tests null byte (`\0`) injection attempts

**Expected Behavior:**
- Special characters should be preserved as literal values (properly escaped in output)
- Unicode characters should be properly encoded/decoded
- Whitespace should be handled according to business rules
- Null bytes should be stripped or safely handled

---

### 8. HTTP Security Headers
**File:** `tests/security.spec.ts` - "HTTP Security Headers" suite

Tests that verify important HTTP security headers are present:

- **X-Frame-Options Header**: Prevents clickjacking attacks (should be `DENY` or `SAMEORIGIN`)
- **X-Content-Type-Options Header**: Prevents MIME sniffing (should be `nosniff`)
- **X-XSS-Protection Header**: Legacy XSS protection header (for older browsers)

**Current Status:** 🛑 **SECURITY HEADERS NOT DETECTED**

To implement security headers:

Add to backend (e.g., Node.js/Express middleware):
```javascript
app.use((req, res, next) => {
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  next();
});
```

---

### 9. Direct Object Reference (IDOR) Vulnerabilities
**File:** `tests/security.spec.ts` - "Direct Object Reference (IDOR) Vulnerabilities" suite

Tests that verify users cannot access other users' records through URL manipulation:

- **Customer Record IDOR**: Tests access to `/edit-customer/1` vs `/edit-customer/999`
- **Address Record IDOR**: Tests access to `/edit-address/1` vs `/edit-address/999`

**Current Status:** 🛑 **NO ACCESS CONTROL - VULNERABLE TO IDOR**

To fix IDOR vulnerabilities:

1. Verify user identity before returning/modifying records
2. Check that the customer ID belongs to the authenticated user
3. Return 403 Forbidden for unauthorized access attempts
4. Log access attempts for security monitoring
5. Implement proper authorization checks on the backend

---

### 10. Response Data Validation
**File:** `tests/security.spec.ts` - "Response Data Validation" suite

Tests that verify API responses contain only expected data structures:

- **Customer API Response Structure**: Validates response contains proper customer fields
- **No Extra Sensitive Data**: Verifies responses don't include unnecessary sensitive fields
- **Data Type Validation**: Ensures response data types are as expected

---

## Running the Security Tests

### Prerequisites
1. Install dependencies:
```bash
npm install
```

2. Start the Angular development server:
```bash
npm start
```

The application will be available at `http://localhost:4200`

### Run All Security Tests
```bash
npx playwright test tests/security.spec.ts
```

### Run Specific Test Suite
```bash
npx playwright test tests/security.spec.ts -g "XSS"
npx playwright test tests/security.spec.ts -g "Form Validation"
npx playwright test tests/security.spec.ts -g "Sensitive Data"
```

### Run with Debug Mode
```bash
npx playwright test tests/security.spec.ts --debug
```

### View HTML Report
```bash
npx playwright show-report
```

### Run on Specific Browser
```bash
npx playwright test tests/security.spec.ts --project=firefox
npx playwright test tests/security.spec.ts --project=webkit
```

### Set Custom Base URL
```bash
BASE_URL=http://localhost:3000 npx playwright test tests/security.spec.ts
```

---

## Security Vulnerabilities Identified

### Critical Issues
1. **No Authentication/Authorization** - All routes are accessible without login
2. **No CSRF Protection** - State-changing operations lack CSRF tokens
3. **No IDOR Protection** - Users can access any customer/address record
4. **No HTTP Security Headers** - Missing X-Frame-Options, X-Content-Type-Options, etc.
5. **No CSP Policy** - No restrictions on script sources; vulnerable to XSS

### High Priority Issues
1. **No Rate Limiting** - API endpoints vulnerable to brute force attacks
2. **No Input Validation on Backend** - Only frontend validation present
3. **No HTTPS Enforcement** - Using HTTP instead of HTTPS
4. **No API Authentication** - API calls using hardcoded URLs without tokens
5. **No Request Signing** - API requests can be replayed or modified

### Medium Priority Issues
1. **Sensitive Data in URLs** - Customer IDs exposed in URL parameters
2. **No Logging/Auditing** - No record of data access or modifications
3. **No Email Verification** - Email not verified during customer creation
4. **No Password Complexity** - No password fields implemented yet

---

## Remediation Checklist

### Phase 1: Authentication (High Priority)
- [ ] Implement user authentication service (JWT)
- [ ] Create login/logout functionality
- [ ] Implement route guards with `canActivate`
- [ ] Store JWT tokens securely (httpOnly cookies)
- [ ] Add role-based access control (Admin, User)

### Phase 2: API Security (High Priority)
- [ ] Add backend validation for all request payloads
- [ ] Implement CSRF token generation and validation
- [ ] Add rate limiting to API endpoints
- [ ] Enforce HTTPS/TLS for all communication
- [ ] Add API authentication with Bearer tokens

### Phase 3: Security Headers (High Priority)
- [ ] Add X-Frame-Options header
- [ ] Add X-Content-Type-Options header
- [ ] Add Strict-Transport-Security header
- [ ] Implement Content-Security-Policy
- [ ] Add X-XSS-Protection header

### Phase 4: Data Protection (Medium Priority)
- [ ] Implement input validation on backend
- [ ] Add output encoding
- [ ] Implement audit logging
- [ ] Add data encryption for sensitive fields
- [ ] Implement secure password reset flow

### Phase 5: Testing & Monitoring (Medium Priority)
- [ ] Set up continuous security testing in CI/CD
- [ ] Implement error logging and monitoring
- [ ] Add performance monitoring
- [ ] Set up security alerts
- [ ] Document security architecture

---

## Test Results Interpretation

### Passing Tests
Indicates that the specific security check passed. However:
- ✅ **XSS tests passing** = Angular's built-in sanitization is working
- ✅ **Form validation passing** = Frontend validation is enforced
- ✅ **Invalid route tests passing** = Routes are accessible (but unprotected)

### Failing/Documenting Tests
These tests document security gaps:
- ⚠️ **No CSRF tokens** = CSRF protection not implemented
- ⚠️ **No auth guards** = No authentication/authorization
- ⚠️ **No security headers** = Missing important HTTP headers
- ⚠️ **IDOR possible** = Users can access any record

---

## Integration with CI/CD

Add to your CI/CD pipeline (GitHub Actions example):

```yaml
name: Security Tests

on: [push, pull_request]

jobs:
  security-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm install
      - run: npm start &
      - run: npm run test:security
```

---

## References

- [OWASP Top 10 Web Application Security Risks](https://owasp.org/www-project-top-ten/)
- [Angular Security Guide](https://angular.io/guide/security)
- [PortSwigger Web Security Academy](https://portswigger.net/web-security)
- [Playwright Testing Best Practices](https://playwright.dev/docs/best-practices)

---

## Notes

- These tests assume the backend is running on `http://localhost:8083`
- Adjust `BASE_URL` environment variable for different environments
- For production testing, use a dedicated test environment with realistic data
- Always perform security code review alongside automated testing
- Consider periodic penetration testing by security professionals
