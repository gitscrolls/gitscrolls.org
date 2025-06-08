# Breadcrumb Navigation with Table of Contents

## Overview
Add a secondary navigation bar below the main navigation that shows the current location and provides quick access to scroll sections.

## Requirements
1. **Breadcrumb Trail**:
   - Home > Scrolls > Current Scroll
   - Clickable segments for navigation

2. **Table of Contents**:
   - Dynamic extraction from markdown headings
   - Dropdown or inline display
   - Current section highlighting
   - Smooth scroll to section

3. **Scroll Progress**:
   - Visual indicator of reading progress
   - Updates as user scrolls

## Implementation Design

### Structure
```html
<nav class="breadcrumb-nav">
    <div class="breadcrumb-container">
        <!-- Breadcrumb -->
        <div class="breadcrumb">
            <a href="index.html">Home</a>
            <span class="separator">›</span>
            <a href="index.html#scrolls">Scrolls</a>
            <span class="separator">›</span>
            <span class="current">Scroll I: The Unbroken Line</span>
        </div>
        
        <!-- TOC Dropdown -->
        <div class="toc-dropdown">
            <button class="toc-toggle">
                <span class="current-section">The Call to Adventure</span>
                <span class="arrow">▼</span>
            </button>
            <div class="toc-menu">
                <a href="#section-1" class="toc-item active">The Call to Adventure</a>
                <a href="#section-2" class="toc-item">Meeting the Mentor</a>
                <a href="#section-3" class="toc-item">The First Trial</a>
                <!-- ... more sections ... -->
            </div>
        </div>
    </div>
    
    <!-- Progress bar -->
    <div class="reading-progress"></div>
</nav>
```

### Dynamic TOC Generation
```javascript
function generateTOC() {
    const headings = document.querySelectorAll('.scroll-content h2, .scroll-content h3');
    const toc = [];
    
    headings.forEach((heading, index) => {
        const id = `section-${index}`;
        heading.id = id;
        
        toc.push({
            id: id,
            text: heading.textContent,
            level: heading.tagName.toLowerCase(),
            element: heading
        });
    });
    
    return toc;
}
```

### Scroll Position Tracking
```javascript
function updateCurrentSection() {
    const sections = document.querySelectorAll('.scroll-content h2, .scroll-content h3');
    let current = null;
    
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100) {
            current = section;
        }
    });
    
    if (current) {
        // Update breadcrumb current section
        // Update TOC active item
    }
}
```

## Features
1. **Sticky Positioning**: Breadcrumb stays visible while scrolling
2. **Mobile Responsive**: Collapses to essential elements
3. **Keyboard Navigation**: Tab through TOC items
4. **Smooth Scrolling**: Animated scroll to sections
5. **Progress Indicator**: Visual reading progress

## Styling Considerations
- Subtle background to distinguish from main nav
- Bronze accents for current items
- Smooth transitions for dropdown
- Mobile-first responsive design