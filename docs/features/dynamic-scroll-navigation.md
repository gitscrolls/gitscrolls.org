# Dynamic Scroll Navigation Feature

## Overview
Replace "THE SCROLLS" link with a dropdown menu on scroll pages that dynamically fetches available scrolls from the GitHub repository.

## Requirements
1. **Navigation Behavior**:
   - On index.html: "THE GITSCROLLS" remains a simple link
   - On scroll.html: "THE GITSCROLLS" becomes a dropdown
   - Dropdown shows all available scrolls
   - Current scroll is highlighted

2. **Dynamic Data Fetching**:
   - Fetch scroll list from GitHub API
   - Cache results to minimize API calls
   - Fallback to hardcoded list if API fails

3. **User Experience**:
   - Smooth dropdown animation
   - Keyboard navigation support
   - Mobile-friendly touch targets

## Implementation Options

### Option A: GitHub API
```javascript
// Fetch from GitHub API
const response = await fetch('https://api.github.com/repos/gitscrolls/gitscrolls/contents/scrolls');
const files = await response.json();
const scrolls = files.filter(f => f.name.endsWith('.md'));
```

### Option B: GitHub Raw Directory Listing
- Parse HTML from directory listing
- Less reliable but no API rate limits

### Option C: Static JSON + GitHub Actions
- Generate scrolls list during build
- Most reliable but requires CI/CD

**Recommendation**: Option A with localStorage caching

## Implementation Plan
1. Create dropdown component CSS
2. Add JavaScript for:
   - Detecting current page
   - Fetching scroll list
   - Building dropdown menu
   - Caching mechanism (1 hour)
3. Handle loading and error states
4. Add keyboard navigation
5. Style active/hover states

## Dropdown Structure
```html
<div class="nav-dropdown">
    <button class="dropdown-toggle">
        THE GITSCROLLS <span class="arrow">▼</span>
    </button>
    <div class="dropdown-menu">
        <a href="scroll.html?scroll=1" class="dropdown-item active">
            Scroll I: The Unbroken Line
        </a>
        <a href="scroll.html?scroll=2" class="dropdown-item">
            Scroll II: Chronicle of Forgotten Messages
        </a>
        <!-- ... more scrolls ... -->
    </div>
</div>
```

## Caching Strategy
```javascript
const CACHE_KEY = 'gitscrolls_list';
const CACHE_DURATION = 3600000; // 1 hour

function getCachedScrolls() {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_DURATION) {
            return data;
        }
    }
    return null;
}
```