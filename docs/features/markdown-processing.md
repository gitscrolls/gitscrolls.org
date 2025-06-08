# Markdown Processing Feature

## Overview
Process GitHub markdown files to remove frontmatter and footer content while preserving the main scroll content.

## Requirements
1. **Frontmatter Removal**:
   - Remove YAML frontmatter (between --- markers)
   - Extract metadata if needed

2. **Footer Removal**:
   - Remove navigation links at bottom
   - Remove "Continue to next scroll" sections
   - Preserve attribution if present

3. **Content Extraction**:
   - Identify and extract quote
   - Identify and extract poem
   - Preserve main content structure

## Current Markdown Structure
```markdown
---
title: The Unbroken Line
number: 1
---

# SCROLL I: THE UNBROKEN LINE

> "Do not trade your history for the illusion of mastery."

*[Poem content]*

## Main content starts here...

---

*Navigation footer*
[Continue to Scroll II](...)
```

## Processing Strategy

### Step 1: Split Content
```javascript
function processMarkdown(rawContent) {
    // Remove frontmatter
    const contentWithoutFrontmatter = rawContent.replace(/^---[\s\S]*?---\n/, '');
    
    // Split by sections
    const sections = contentWithoutFrontmatter.split(/\n---\n/);
    const mainContent = sections[0]; // Everything before footer
    
    return mainContent;
}
```

### Step 2: Extract Components
```javascript
function extractScrollComponents(content) {
    const lines = content.split('\n');
    let quote = '';
    let poem = '';
    let mainContent = '';
    
    // Logic to identify quote (starts with >)
    // Logic to identify poem (italic block after quote)
    // Remaining content is main
    
    return { quote, poem, mainContent };
}
```

### Step 3: Clean Content
- Remove redundant headers (if title shown in hero)
- Clean up extra line breaks
- Preserve formatting for code blocks

## Implementation Plan
1. Create markdown processor module
2. Add regex patterns for content identification
3. Test with all 10 scrolls
4. Handle edge cases (missing sections)
5. Integrate with scroll page rendering

## Alternative Approach
If parsing proves unreliable, consider:
1. Structured data files (JSON/YAML) alongside markdown
2. Custom markdown tags for sections
3. Preprocessing during build step