const { test, expect } = require('@playwright/test');

test.describe('Pocket Breath Coach Website', () => {
  test('should load quickly and display main content', async ({ page }) => {
    const startTime = Date.now();

    // Navigate to the production site
    await page.goto('https://pocketbreathcoach.com');

    // Wait for the page to be fully loaded
    await page.waitForLoadState('networkidle');

    const loadTime = Date.now() - startTime;

    // Assert load time is under 3 seconds
    expect(loadTime).toBeLessThan(3000);
    console.log(`Page loaded in ${loadTime}ms`);

    // Verify main heading is visible
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('h1')).toContainText('Relieve Anxiety With Slow, Rhythmic Breathing');

    // Verify app store buttons are present
    const appStoreLinks = page.locator('a[href*="apps.apple.com"]');
    await expect(appStoreLinks.first()).toBeVisible();

    const playStoreLinks = page.locator('a[href*="play.google.com"]');
    await expect(playStoreLinks.first()).toBeVisible();

    // Verify key sections exist
    await expect(page.locator('.hero')).toBeVisible();
    await expect(page.locator('.benefits')).toBeVisible();

    // Check that images loaded
    const logo = page.locator('img[alt="Pocket Breath Coach"]');
    await expect(logo).toBeVisible();
  });

  test('should have correct meta tags for SEO and social sharing', async ({ page }) => {
    await page.goto('https://pocketbreathcoach.com');

    // Check title
    await expect(page).toHaveTitle('Pocket Breath Coach');

    // Check Open Graph tags
    const ogTitle = page.locator('meta[property="og:title"]');
    await expect(ogTitle).toHaveAttribute('content', /Pocket Breath Coach/);

    const ogImage = page.locator('meta[property="og:image"]');
    await expect(ogImage).toHaveAttribute('content', /screenshot1\.png/);

    // Check Twitter Card tags
    const twitterCard = page.locator('meta[name="twitter:card"]');
    await expect(twitterCard).toHaveAttribute('content', 'summary_large_image');
  });

  test('should be responsive on mobile viewport', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    await page.goto('https://pocketbreathcoach.com');
    await page.waitForLoadState('networkidle');

    // Verify main content is still visible on mobile
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('.hero-buttons')).toBeVisible();
  });
});
