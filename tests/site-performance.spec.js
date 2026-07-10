const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

// Run against production by default; set SITE_URL for a local server, e.g.
//   SITE_URL=http://localhost:8000 npx playwright test
const BASE_URL = process.env.SITE_URL || 'https://pocketbreathcoach.com';

test.describe('Pocket Breath Coach Website', () => {
  // Create results directory if it doesn't exist
  test.beforeAll(() => {
    const resultsDir = path.join(__dirname, 'results');
    if (!fs.existsSync(resultsDir)) {
      fs.mkdirSync(resultsDir, { recursive: true });
    }
  });

  // Take a screenshot after each test
  test.afterEach(async ({ page }, testInfo) => {
    const status = testInfo.status === 'passed' ? 'PASSED' : 'FAILED';
    const now = new Date();
    const datetime = now.toISOString().replace(/[:.]/g, '-').replace('T', '_').split('.')[0];
    const filename = `${status}_${testInfo.title.replace(/[^a-z0-9]+/gi, '-')}_${datetime}.png`;
    const screenshotPath = path.join(__dirname, 'results', filename);

    await page.screenshot({ path: screenshotPath, fullPage: true });
    console.log(`Screenshot saved: ${filename}`);
  });

  test('should load quickly and display main content', async ({ page }) => {
    const startTime = Date.now();

    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');

    const loadTime = Date.now() - startTime;

    // Assert load time is under 3 seconds
    expect(loadTime).toBeLessThan(3000);
    console.log(`Page loaded in ${loadTime}ms`);

    // Verify main heading is visible
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('h1')).toContainText('Breathe slower');

    // Verify app store buttons are present
    const appStoreLinks = page.locator('a[href*="apps.apple.com"]');
    await expect(appStoreLinks.first()).toBeVisible();

    const playStoreLinks = page.locator('a[href*="play.google.com"]');
    await expect(playStoreLinks.first()).toBeVisible();

    // Verify key sections exist
    await expect(page.locator('.hero')).toBeVisible();
    await expect(page.locator('.benefits')).toBeVisible();
    await expect(page.locator('.pricing')).toBeVisible();
    await expect(page.locator('.faq')).toBeVisible();

    // Check that the logo loaded
    const logo = page.locator('img[alt="Pocket Breath Coach"]');
    await expect(logo).toBeVisible();
  });

  test('should have correct meta tags for SEO and social sharing', async ({ page }) => {
    await page.goto(BASE_URL);

    // Check title
    await expect(page).toHaveTitle(/Pocket Breath Coach/);

    // Meta description present
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute('content', /breathing/i);

    // Canonical
    const canonical = page.locator('link[rel="canonical"]');
    await expect(canonical).toHaveAttribute('href', 'https://pocketbreathcoach.com/');

    // Check Open Graph tags
    const ogTitle = page.locator('meta[property="og:title"]');
    await expect(ogTitle).toHaveAttribute('content', /Pocket Breath Coach/);

    const ogImage = page.locator('meta[property="og:image"]');
    await expect(ogImage).toHaveAttribute('content', /og-image\.png/);

    // Check Twitter Card tags
    const twitterCard = page.locator('meta[name="twitter:card"]');
    await expect(twitterCard).toHaveAttribute('content', 'summary_large_image');

    // Structured data (MobileApplication) present with rating
    const jsonLd = await page.locator('script[type="application/ld+json"]').first().textContent();
    const structured = JSON.parse(jsonLd);
    expect(structured['@type']).toBe('MobileApplication');
    expect(structured.aggregateRating.ratingValue).toBe('4.5');
  });

  test('should show pricing with premium price and competitor comparison', async ({ page }) => {
    await page.goto(BASE_URL);

    const pricing = page.locator('.pricing');
    await expect(pricing).toBeVisible();
    await expect(pricing.locator('.plan.premium')).toContainText('$6.99');
    await expect(pricing.locator('.plan.premium')).toContainText('$0.99');

    // Comparison table lists competitors
    const compare = page.locator('table.compare');
    await expect(compare).toContainText('Pocket Breath Coach');
    await expect(compare).toContainText('Calm');
    await expect(compare).toContainText('Headspace');
    await expect(compare).toContainText('Breathwrk');
  });

  test('FAQ accordion on homepage expands and links to full FAQ', async ({ page }) => {
    await page.goto(BASE_URL);

    const firstItem = page.locator('.faq-item').first();
    const answer = firstItem.locator('.answer');
    await expect(answer).not.toBeVisible();
    await firstItem.locator('summary').click();
    await expect(answer).toBeVisible();

    // Link to the full FAQ page exists
    await expect(page.locator('a[href="/faq/"]').first()).toBeAttached();
  });

  test('FAQ page loads with FAQPage structured data', async ({ page }) => {
    await page.goto(`${BASE_URL}/faq/`);
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveTitle(/FAQ/);
    await expect(page.locator('h1')).toContainText('Frequently asked questions');

    const jsonLd = await page.locator('script[type="application/ld+json"]').first().textContent();
    const structured = JSON.parse(jsonLd);
    expect(structured['@type']).toBe('FAQPage');
    expect(structured.mainEntity.length).toBeGreaterThanOrEqual(8);

    // Store links present
    await expect(page.locator('a[href*="apps.apple.com"]').first()).toBeAttached();
    await expect(page.locator('a[href*="play.google.com"]').first()).toBeAttached();
  });

  test('should be responsive on mobile viewport', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');

    // Verify main content is still visible on mobile
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('.hero-buttons')).toBeVisible();

    // No horizontal overflow
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow).toBeLessThanOrEqual(0);
  });

  test('legal pages remain reachable', async ({ page }) => {
    for (const route of ['/privacy/', '/terms/', '/delete-account/']) {
      const response = await page.goto(`${BASE_URL}${route}`);
      expect(response.status()).toBe(200);
    }
  });
});
