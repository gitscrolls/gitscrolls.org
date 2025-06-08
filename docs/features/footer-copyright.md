# Footer Copyright & License Feature

## Overview
Add a comprehensive footer to all pages with copyright and license information.

## Requirements
1. **Copyright Information**:
   - Copyright symbol and year
   - Author/organization name
   - Link to license

2. **License Details**:
   - License type (e.g., MIT, Creative Commons)
   - Brief description or link to full license
   - Attribution requirements

3. **Additional Footer Elements**:
   - Links to GitHub repository
   - Social media links (if applicable)
   - Contact information
   - "Fork this" encouragement

## Implementation Plan
1. Create reusable footer HTML structure
2. Add to both index.html and scroll.html
3. Style consistently with site theme
4. Include dynamic year update

## Footer Structure
```html
<footer class="site-footer">
    <div class="footer-content">
        <div class="footer-section">
            <h3>The GitScrolls</h3>
            <p>An Epic of Software Wisdom</p>
        </div>
        
        <div class="footer-section">
            <h3>License</h3>
            <p>© 2024 GitScrolls Contributors</p>
            <p>Licensed under <a href="#">MIT License</a></p>
        </div>
        
        <div class="footer-section">
            <h3>Contribute</h3>
            <a href="https://github.com/gitscrolls/gitscrolls">Fork on GitHub</a>
            <a href="https://github.com/gitscrolls/gitscrolls/discussions">Join Discussion</a>
        </div>
    </div>
    
    <div class="footer-bottom">
        <p>"Stop reading. Start helping. The circle is not complete. Your turn is here."</p>
    </div>
</footer>
```

## Styling Considerations
- Dark background (charcoal) with light text
- Bronze accents for links
- Responsive grid layout
- Subtle top border or decoration