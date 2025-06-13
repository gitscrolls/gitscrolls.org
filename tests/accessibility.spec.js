import { test, expect } from '@playwright/test';
import { injectAxe, checkA11y } from 'axe-playwright';

test.describe('GitScrolls Accessibility', () => {
  test('homepage passes accessibility checks', async ({ page }) => {
    await page.goto('/');
    await injectAxe(page);
    await checkA11y(page, null, {
      detailedReport: true,
      detailedReportOptions: {
        html: true,
      },
    });
  });

  test('scroll page passes accessibility checks', async ({ page }) => {
    await page.goto('/scroll.html?scroll=1');
    await page.waitForSelector('.scroll-content');
    await injectAxe(page);
    await checkA11y(page, null, {
      detailedReport: true,
    });
  });

  test('skip links work correctly', async ({ page }) => {
    await page.goto('/');
    
    // Focus skip link
    await page.keyboard.press('Tab');
    const skipLink = page.locator('.skip-link:focus');
    await expect(skipLink).toBeVisible();
    await expect(skipLink).toContainText('Skip to scrolls');
    
    // Activate skip link
    await page.keyboard.press('Enter');
    
    // Verify navigation to scrolls section
    const scrollsSection = page.locator('#scrolls');
    await expect(scrollsSection).toBeInViewport();
  });

  test('all interactive elements are keyboard accessible', async ({ page }) => {
    await page.goto('/scroll.html?scroll=1');
    await page.waitForSelector('.scroll-content');
    
    // Tab through all interactive elements
    const interactiveElements = [
      '.skip-link',
      '#mobileMenuToggle',
      '.nav-links a',
      '#themeToggle',
      '#prevScroll',
      '#nextScroll',
      '.share-button',
      '#readingModeToggle',
      '.font-controls button',
    ];
    
    for (const selector of interactiveElements) {
      const element = page.locator(selector).first();
      if (await element.isVisible()) {
        await page.keyboard.press('Tab');
        await expect(element).toBeFocused();
      }
    }
  });

  test('ARIA announcements work for theme changes', async ({ page }) => {
    await page.goto('/');
    
    // Check ARIA live region exists
    const announcer = page.locator('#ariaAnnouncements');
    await expect(announcer).toHaveAttribute('aria-live', 'polite');
    
    // Toggle theme
    await page.click('#themeToggle');
    
    // Verify announcement
    await expect(announcer).toContainText(/theme changed/i);
  });
});