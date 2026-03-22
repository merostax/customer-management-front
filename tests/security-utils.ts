/**
 * Security Testing Utilities for Playwright E2E Tests
 *
 * Common helper functions and patterns for security testing
 */

import { Page, expect } from '@playwright/test';

/**
 * XSS Payload vectors for testing
 */
export const XSS_PAYLOADS = {
  imgTag: '<img src=x onerror="alert(\'XSS\')">' ,
  scriptTag: '<script>alert("XSS")</script>',
  svgTag: '<svg onload="alert(\'SVG XSS\')">',
  eventHandler: '" onmouseover="alert(\'XSS\')"',
  dataUrl: 'javascript:alert("XSS")',
  iframeTag: '<iframe src="javascript:alert(\'XSS\')"></iframe>',
  linkTag: '<a href="javascript:alert(\'XSS\')">link</a>',
  styleTag: '<style>body { background: url("javascript:alert(\'XSS\')"); }</style>',
  eventOn: '<body onload="alert(\'XSS\')">',
  metaTag: '<meta http-equiv="refresh" content="0; url=javascript:alert(\'XSS\')">' ,
};

/**
 * SQL Injection payload vectors
 */
export const SQL_INJECTION_PAYLOADS = {
  unionBased: "' UNION SELECT NULL,NULL,NULL--",
  timeBased: "'; WAITFOR DELAY '00:00:05'--",
  booleanBased: "' OR '1'='1",
  errorBased: "' AND 1=CONVERT(int, @@version)--",
  stackedQueries: "'; DROP TABLE users--",
  comment: "' -- ",
  nullByte: "' NUL %00 AND '1'='1",
};

/**
 * Custom validators  
 */
export const VALIDATORS = {
  /**
   * Check if content contains potential XSS payload
   */
  containsXSSPayload(content: string): boolean {
    const xssPatterns = [
      /<script[^>]*>.*?<\/script>/gi,
      /on\w+\s*=/gi,
      /javascript:/gi,
      /<iframe/gi,
      /<object/gi,
      /<embed/gi,
      /vbscript:/gi,
      /onload\s*=/gi,
    ];

    return xssPatterns.some(pattern => pattern.test(content));
  },

  /**
   * Validate email format
   */
  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  /**
   * Check if URL is absolute or relative (for SSRF prevention)
   */
  isAbsoluteUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  },

  /**
   * Validate phone number format (basic)
   */
  isValidPhone(phone: string): boolean {
    // Removes common formatting, checks for 10+ digits
    const digitsOnly = phone.replace(/\D/g, '');
    return digitsOnly.length >= 10;
  },

  /**
   * Check if string contains SQL injection patterns
   */
  containsSQLInjection(input: string): boolean {
    const sqlPatterns = [
      /('|(\/\*)|(--)|(;)|('))/,
      /((\bUNION\b)|(\bSELECT\b)|(\bDROP\b)|(\bINSERT\b)|(\bDELETE\b)|(\bUPDATE\b))/i,
    ];

    return sqlPatterns.some(pattern => pattern.test(input));
  },
};

/**
 * Security Helper Functions
 */

/**
 * Test if a DOM element has proper input validation
 */
export async function hasInputValidation(page: Page, selector: string): Promise<boolean> {
  return await page.evaluate((sel) => {
    const element = document.querySelector(sel) as HTMLInputElement;
    if (!element) return false;

    // Check for validator attributes
    const hasValidators =
      element.required ||
      element.pattern ||
      element.type === 'email' ||
      element.type === 'number' ||
      element.maxLength !== -1;

    // Check for custom validation classes
    const hasValidationClass = element.classList.contains('ng-invalid');

    return hasValidators || hasValidationClass;
  }, selector);
}

/**
 * Monitor page for script execution attempts
 */
export function monitorScriptExecution(page: Page): Promise<string[]> {
  return new Promise((resolve) => {
    const executedScripts: string[] = [];

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        executedScripts.push(msg.text());
      }
    });

    page.on('dialog', async (dialog) => {
      executedScripts.push(dialog.message());
      await dialog.dismiss();
    });

    // Return results after 2 seconds
    setTimeout(() => {
      resolve(executedScripts);
    }, 2000);
  });
}

/**
 * Check if page has proper Content Security Policy
 */
export async function hasCSPHeader(page: Page): Promise<boolean> {
  let cspFound = false;

  page.on('response', (response) => {
    const headers = response.headers();
    if (headers['content-security-policy']) {
      cspFound = true;
    }
  });

  return cspFound;
}

/**
 * Capture all API requests and responses
 */
export async function captureNetwork(
  page: Page,
  callback: () => Promise<void>
): Promise<
  Array<{
    url: string;
    method: string;
    status: number;
    headers: Record<string, string>;
  }>
> {
  const requests: Array<{
    url: string;
    method: string;
    status: number;
    headers: Record<string, string>;
  }> = [];

  page.on('response', (response) => {
    requests.push({
      url: response.url(),
      method: response.request().method(),
      status: response.status(),
      headers: response.headers(),
    });
  });

  await callback();

  return requests;
}

/**
 * Check if sensitive data exists in page content
 */
export async function checkForSensitiveData(page: Page): Promise<string[]> {
  const content = await page.content();
  const findings: string[] = [];

  // Check for common sensitive patterns
  const patterns = [
    { name: 'API Key', regex: /api[_-]?key\s*[:=]/i },
    { name: 'Password', regex: /password\s*[:=]/i },
    { name: 'Secret', regex: /secret\s*[:=]/i },
    { name: 'Token', regex: /token\s*[:=]/i },
    { name: 'Private Key', regex: /private[_-]?key/i },
    { name: 'Credentials', regex: /credentials\s*[:=]/i },
  ];

  patterns.forEach(({ name, regex }) => {
    if (regex.test(content)) {
      findings.push(name);
    }
  });

  return findings;
}

/**
 * Test form field against XSS payloads
 */
export async function testFormFieldXSS(
  page: Page,
  fieldSelector: string,
  payloads: string[] = Object.values(XSS_PAYLOADS)
): Promise<{ payload: string; vulnerable: boolean }[]> {
  const results: { payload: string; vulnerable: boolean }[] = [];

  for (const payload of payloads) {
    // Clear and fill field
    await page.fill(fieldSelector, '');
    await page.fill(fieldSelector, payload);

    // Monitor for execution
    let executed = false;

    const consoleHandler = () => {
      executed = true;
    };

    const dialogHandler = async () => {
      executed = true;
    };

    page.once('console', consoleHandler);
    page.once('dialog', dialogHandler as any);

    await page.waitForTimeout(500);

    page.removeListener('console', consoleHandler);
    page.removeListener('dialog', dialogHandler as any);

    results.push({
      payload,
      vulnerable: executed,
    });
  }

  return results;
}

/**
 * Verify CORS headers are properly set
 */
export async function verifyCORSHeaders(
  page: Page,
  callback: () => Promise<void>
): Promise<{
  hasOriginHeader: boolean;
  hasCorsHeaders: boolean;
  allowedOrigins: string[];
}> {
  const corsInfo = {
    hasOriginHeader: false,
    hasCorsHeaders: false,
    allowedOrigins: [] as string[],
  };

  page.on('response', (response) => {
    const headers = response.headers();

    if (headers['access-control-allow-origin']) {
      corsInfo.hasOriginHeader = true;
      corsInfo.allowedOrigins.push(headers['access-control-allow-origin']);
    }

    if (
      headers['access-control-allow-methods'] ||
      headers['access-control-allow-headers']
    ) {
      corsInfo.hasCorsHeaders = true;
    }
  });

  await callback();

  return corsInfo;
}

/**
 * Test rate limiting on an endpoint
 */
export async function testRateLimiting(
  page: Page,
  endpoint: string,
  requests: number = 100,
  timeout: number = 5000
): Promise<{
  totalRequests: number;
  blockedRequests: number;
  statusCodes: Record<number, number>;
}> {
  const statusCodes: Record<number, number> = {};
  let blockedRequests = 0;

  page.on('response', (response) => {
    const status = response.status();
    statusCodes[status] = (statusCodes[status] || 0) + 1;

    // 429 Too Many Requests indicates rate limiting
    if (status === 429) {
      blockedRequests++;
    }
  });

  // Make multiple rapid requests
  const promises = [];
  for (let i = 0; i < requests; i++) {
    promises.push(
      page
        .request.get(endpoint)
        .then(() => Promise.resolve())
        .catch(() => Promise.resolve())
    );
  }

  await Promise.race([
    Promise.all(promises),
    new Promise((resolve) => setTimeout(resolve, timeout)),
  ]);

  return {
    totalRequests: requests,
    blockedRequests,
    statusCodes,
  };
}

/**
 * Verify output encoding
 */
export async function verifyOutputEncoding(
  page: Page,
  displaySelector: string,
  expectedText: string
): Promise<boolean> {
  const displayedText = await page.textContent(displaySelector);

  // Check if special characters are properly encoded
  // For example, < should be &lt; or >, & should be &amp;, etc.
  const hasUnencoded =
    displayedText?.includes('<') ||
    displayedText?.includes('>') ||
    (displayedText?.includes('&') && !displayedText.includes('&amp;'));

  return !hasUnencoded;
}

/**
 * Get all form validation errors
 */
export async function getFormValidationErrors(
  page: Page,
  formSelector: string
): Promise<string[]> {
  return await page.evaluate((sel) => {
    const form = document.querySelector(sel);
    if (!form) return [];

    const errorMessages: string[] = [];
    const errorElements = form.querySelectorAll('.mat-error, .error, [role="alert"]');

    errorElements.forEach((element) => {
      const text = element.textContent?.trim();
      if (text) {
        errorMessages.push(text);
      }
    });

    return errorMessages;
  }, formSelector);
}

/**
 * Test CSRF token presence and validity
 */
export async function testCSRFToken(page: Page): Promise<{
  tokenFound: boolean;
  tokenValid: boolean;
  tokenName: string | null;
}> {
  const result = {
    tokenFound: false,
    tokenValid: false,
    tokenName: null as string | null,
  };

  // Check for CSRF token in cookies
  const cookies = await page.context().cookies();
  const csrfCookie = cookies.find(
    (c) =>
      c.name.toLowerCase().includes('csrf') ||
      c.name.toLowerCase().includes('_token')
  );

  if (csrfCookie) {
    result.tokenFound = true;
    result.tokenName = csrfCookie.name;
    result.tokenValid = csrfCookie.value.length > 0;
  }

  // Check for CSRF token in forms
  const tokenInForm = await page.evaluate(() => {
    const inputs = document.querySelectorAll('input[name*="csrf"], input[name*="token"]');
    return inputs.length > 0;
  });

  if (tokenInForm) {
    result.tokenFound = true;
  }

  return result;
}

/**
 * Audit page for common security issues
 */
export async function runSecurityAudit(page: Page): Promise<{
  issues: string[];
  warnings: string[];
  info: string[];
}> {
  const audit = {
    issues: [] as string[],
    warnings: [] as string[],
    info: [] as string[],
  };

  // Check for mixed content
  const hasMixedContent = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('img, script, link, iframe')).some(
      (el) => {
        const src = el.getAttribute('src') || el.getAttribute('href');
        return src && src.startsWith('http://') && location.protocol === 'https:';
      }
    );
  });

  if (hasMixedContent) {
    audit.issues.push('Mixed content detected (HTTP in HTTPS page)');
  }

  // Check for unencrypted links
  const unencryptedLinks = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('a[href*="http://"]')).length;
  });

  if (unencryptedLinks > 0) {
    audit.warnings.push(`${unencryptedLinks} links using unencrypted HTTP`);
  }

  // Check for console errors
  const consoleErrors: string[] = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  if (consoleErrors.length > 0) {
    audit.info.push(`${consoleErrors.length} console errors found`);
  }

  return audit;
}

export default {
  XSS_PAYLOADS,
  SQL_INJECTION_PAYLOADS,
  VALIDATORS,
  hasInputValidation,
  monitorScriptExecution,
  hasCSPHeader,
  captureNetwork,
  checkForSensitiveData,
  testFormFieldXSS,
  verifyCORSHeaders,
  testRateLimiting,
  verifyOutputEncoding,
  getFormValidationErrors,
  testCSRFToken,
  runSecurityAudit,
};
