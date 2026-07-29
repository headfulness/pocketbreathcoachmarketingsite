const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

// Run against production by default; set SITE_URL for a local server, e.g.
//   SITE_URL=http://localhost:8000 npx playwright test
const BASE_URL = process.env.SITE_URL || 'https://pocketbreathcoach.com';

test.describe('Pocket Breath Coach Website', () => {
  test.beforeAll(() => {
    const resultsDir = path.join(__dirname, 'results');
    if (!fs.existsSync(resultsDir)) {
      fs.mkdirSync(resultsDir, { recursive: true });
    }
  });

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
    expect(loadTime).toBeLessThan(3000);
    console.log(`Page loaded in ${loadTime}ms`);

    // Benefit-led hero headline
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('h1')).toContainText('Breathe slower');

    // Store CTAs present (both stores)
    await expect(page.locator('a[href*="apps.apple.com"]').first()).toBeVisible();
    await expect(page.locator('a[href*="play.google.com"]').first()).toBeVisible();

    // Key conversion sections exist
    await expect(page.locator('.hero')).toBeVisible();
    await expect(page.locator('.benefits')).toBeVisible();
    await expect(page.locator('.quotes')).toBeVisible();
    await expect(page.locator('.pricing')).toBeVisible();
    await expect(page.locator('.faq')).toBeVisible();

    // Logo loaded
    await expect(page.locator('img[alt="Pocket Breath Coach"]').first()).toBeVisible();
  });

  test('should have correct meta tags for SEO and social sharing', async ({ page }) => {
    await page.goto(BASE_URL);

    await expect(page).toHaveTitle(/Pocket Breath Coach/);

    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /breathing/i);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://pocketbreathcoach.com/');

    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', /Pocket Breath Coach/);
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', /og-image\.png/);
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute('content', 'summary_large_image');

    // Smart App Banner meta preserved
    await expect(page.locator('meta[name="apple-itunes-app"]')).toHaveAttribute('content', /app-id=6444422222/);

    // Structured data present and well-formed
    const jsonLd = await page.locator('script[type="application/ld+json"]').first().textContent();
    const structured = JSON.parse(jsonLd);
    expect(structured['@type']).toBe('MobileApplication');
    expect(structured.offers.highPrice).toBe('6.99');
  });

  test('should present the primary CTA with free/no-account framing', async ({ page }) => {
    await page.goto(BASE_URL);
    // Friction-reducing microcopy near the CTA
    await expect(page.locator('.hero .hero-microcopy')).toContainText(/No account/i);
    await expect(page.locator('.hero .hero-microcopy')).toContainText(/tracked/i);
  });

  test('should show pricing plans without competitors or a price comparison', async ({ page }) => {
    await page.goto(BASE_URL);

    const pricing = page.locator('.pricing');
    await expect(pricing).toBeVisible();
    await expect(pricing.locator('.plan.premium')).toContainText('$6.99');
    await expect(pricing.locator('.plan.premium')).toContainText('$0.99');

    // Competitor comparison table and privacy band removed
    await expect(page.locator('table.compare')).toHaveCount(0);
    await expect(page.locator('section.privacy')).toHaveCount(0);

    // No competitor brand names anywhere on the page
    await expect(page.locator('body')).not.toContainText('Headspace');
    await expect(page.locator('body')).not.toContainText('Breathwrk');
  });

  test('FAQ accordion expands on click', async ({ page }) => {
    await page.goto(BASE_URL);
    const firstItem = page.locator('.faq-item').first();
    const answer = firstItem.locator('.answer');
    await expect(answer).not.toBeVisible();
    await firstItem.locator('summary').click();
    await expect(answer).toBeVisible();
  });

  test('should be responsive on a mobile viewport with a reachable CTA', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');

    await expect(page.locator('h1')).toBeVisible();
    // A store CTA is reachable on mobile (hero badges)
    await expect(page.locator('.hero a[href*="apps.apple.com"]').first()).toBeVisible();

    // Sticky mobile CTA bar appears after scrolling past the hero
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.4));
    await expect(page.locator('#mobileCta')).toHaveClass(/visible/);
  });
});
