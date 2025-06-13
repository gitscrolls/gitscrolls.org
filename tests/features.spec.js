import { test, expect } from '@playwright/test';

test.describe('GitScrolls Features', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/scroll.html?scroll=1');
    await page.waitForSelector('.scroll-content');
  });

  test('theme toggle switches between light and dark mode', async ({ page }) => {
    const html = page.locator('html');
    
    // Check initial state
    const initialTheme = await html.getAttribute('data-theme');
    
    // Toggle theme
    await page.click('#themeToggle');
    
    // Verify theme changed
    const newTheme = await html.getAttribute('data-theme');
    expect(newTheme).not.toBe(initialTheme);
  });

  test('search functionality works', async ({ page }) => {
    // Open search with Ctrl+F
    await page.keyboard.press('Control+f');
    
    // Verify search box is visible
    const searchContainer = page.locator('.search-container');
    await expect(searchContainer).toHaveClass(/search-visible/);
    
    // Type search term
    await page.fill('.search-input', 'git');
    
    // Verify matches are highlighted
    const highlights = page.locator('.search-highlight');
    await expect(highlights.first()).toBeVisible();
  });

  test('reading mode toggle works', async ({ page }) => {
    // Click reading mode button
    await page.click('#readingModeToggle');
    
    // Verify body has reading-mode class
    await expect(page.locator('body')).toHaveClass(/reading-mode/);
    
    // Verify UI elements are hidden
    await expect(page.locator('.header')).toHaveCSS('opacity', '0');
  });

  test('font size controls work', async ({ page }) => {
    const content = page.locator('.scroll-content');
    const initialSize = await content.evaluate(el => 
      window.getComputedStyle(el).fontSize
    );
    
    // Increase font size
    await page.click('button[aria-label="Increase font size"]');
    
    const newSize = await content.evaluate(el => 
      window.getComputedStyle(el).fontSize
    );
    
    expect(parseFloat(newSize)).toBeGreaterThan(parseFloat(initialSize));
  });

  test('share buttons open in new windows', async ({ page, context }) => {
    // Listen for new page
    const pagePromise = context.waitForEvent('page');
    
    // Click Twitter share
    await page.click('a[aria-label*="Share on Twitter"]');
    
    // Verify new page opened
    const newPage = await pagePromise;
    await expect(newPage).toHaveURL(/twitter\.com/);
    await newPage.close();
  });

  test('copy link button works', async ({ page }) => {
    // Grant clipboard permissions
    await page.context().grantPermissions(['clipboard-write']);
    
    // Click copy link
    await page.click('button[aria-label="Copy link to clipboard"]');
    
    // Verify toast appears
    await expect(page.locator('.toast')).toBeVisible();
    await expect(page.locator('.toast')).toContainText(/copied/i);
  });

  test('export to PDF opens print dialog', async ({ page }) => {
    // Listen for print dialog
    let printDialogOpened = false;
    page.on('dialog', dialog => {
      printDialogOpened = true;
      dialog.dismiss();
    });
    
    // Mock window.print
    await page.evaluate(() => {
      window.print = () => {
        window.dispatchEvent(new Event('beforeprint'));
        window.dispatchEvent(new Event('afterprint'));
      };
    });
    
    // Click export PDF
    await page.click('button[aria-label="Export as PDF"]');
    
    // Verify toast appears
    await expect(page.locator('.toast')).toContainText(/print dialog/i);
  });
});