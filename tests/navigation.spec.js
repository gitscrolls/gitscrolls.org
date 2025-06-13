import { test, expect } from '@playwright/test';

test.describe('GitScrolls Navigation', () => {
  test('homepage loads with correct title', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/The GitScrolls/);
    await expect(page.locator('.hero-title')).toContainText('THE GITSCROLLS');
  });

  test('can navigate to first scroll', async ({ page }) => {
    await page.goto('/');
    await page.click('text=Begin the Journey');
    await expect(page).toHaveURL(/scroll\.html\?scroll=1/);
    await expect(page.locator('#scrollTitle')).toBeVisible();
  });

  test('can navigate between scrolls using next/prev buttons', async ({ page }) => {
    await page.goto('/scroll.html?scroll=1');
    
    // Wait for content to load
    await page.waitForSelector('.scroll-content');
    
    // Navigate to next scroll
    await page.click('#nextScroll');
    await expect(page).toHaveURL(/scroll\.html\?scroll=2/);
    
    // Navigate back
    await page.click('#prevScroll');
    await expect(page).toHaveURL(/scroll\.html\?scroll=1/);
  });

  test('keyboard navigation works', async ({ page }) => {
    await page.goto('/scroll.html?scroll=5');
    await page.waitForSelector('.scroll-content');
    
    // Press right arrow
    await page.keyboard.press('ArrowRight');
    await expect(page).toHaveURL(/scroll\.html\?scroll=6/);
    
    // Press J key
    await page.keyboard.press('j');
    await expect(page).toHaveURL(/scroll\.html\?scroll=5/);
  });

  test('mobile menu toggles correctly', async ({ page, isMobile }) => {
    if (!isMobile) {
      test.skip();
    }
    
    await page.goto('/');
    const navLinks = page.locator('#navLinks');
    
    // Initially hidden on mobile
    await expect(navLinks).not.toBeVisible();
    
    // Click hamburger menu
    await page.click('#mobileMenuToggle');
    await expect(navLinks).toBeVisible();
    
    // Click again to close
    await page.click('#mobileMenuToggle');
    await expect(navLinks).not.toBeVisible();
  });
});