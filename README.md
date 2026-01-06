# Pocket Breath Coach Marketing Site

Static marketing website for the Pocket Breath Coach mobile app, hosted at [pocketbreathcoach.com](https://pocketbreathcoach.com).

## Testing

The site includes integration tests using Playwright to verify performance and functionality.

### Setup

```bash
npm install
npx playwright install chromium
```

### Run Tests

```bash
# Run all tests (headless)
npm test

# Run tests with UI
npm run test:ui

# Run tests with browser visible
npm run test:headed
```

### What the Tests Verify

- **Performance**: Page loads in under 3 seconds
- **Content**: Main heading, buttons, and sections display correctly
- **SEO**: Open Graph and Twitter Card meta tags are present
- **Responsive Design**: Site works on mobile viewports
- **Functionality**: App Store links are visible and working

### Test Screenshots

After each test runs, a full-page screenshot is automatically saved to `tests/results/` with the format:
- `PASSED_{datetime}.png` - For successful tests
- `FAILED_{datetime}.png` - For failed tests

This helps with visual regression testing and debugging.

## Development

This is a static site with no build process. Simply edit `index.html` and push to the `main` branch to deploy via GitHub Pages.

```bash
# Preview locally
open index.html

# Or use a simple server
python3 -m http.server 8000
```
