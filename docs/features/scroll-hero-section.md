# Scroll Hero Section Feature

## Overview
Replace the simple header card with a full hero section for each scroll, similar to the homepage hero but specific to each scroll's theme.

## Requirements
1. **Hero Section Components**:
   - Background image (unique per scroll)
   - Scroll title and number
   - Featured quote from the scroll
   - Poem section (displayed below hero)
   - Smooth transition to main content

2. **Data Structure Options**:
   
   **Option A: Parse Markdown**
   - Extract quote (usually in blockquote at start)
   - Extract poem (usually follows the quote)
   - Pros: Single source of truth
   - Cons: Complex parsing, fragile if format changes

   **Option B: JSON Metadata File**
   - Create `scrolls-metadata.json` with structured data
   - Include: title, quote, poem, hero_image_path
   - Pros: Clean separation, easy to parse
   - Cons: Needs maintenance when scrolls change

   **Recommendation**: Start with Option B for cleaner implementation

## Implementation Plan
1. Create `scrolls-metadata.json` with scroll information
2. Update scroll.html to fetch and use metadata
3. Design hero section with:
   - Full viewport height
   - Background image with overlay
   - Centered quote in large, styled text
   - Scroll indicator at bottom
4. Add poem section after hero
5. Style transitions between sections

## Visual Design
```
[Hero Section - 100vh]
- Background: scroll-specific image with dark overlay
- Center: Scroll number + title
- Below: Featured quote in italics
- Bottom: Scroll down indicator

[Poem Section - auto height]
- White/parchment background
- Centered poem text
- Ornamental dividers

[Main Content]
- Existing scroll content layout
```

## Assets Needed
- Hero background images for each scroll (10 images)
- Scroll down indicator icon/animation
- Ornamental dividers for poem section