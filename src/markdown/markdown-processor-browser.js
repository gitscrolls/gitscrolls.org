// Browser-compatible version of MarkdownProcessor
// This file can be included directly in HTML pages

class MarkdownProcessor {
    process(markdown) {
        if (!markdown) {
            return {
                title: '',
                subtitle: '',
                quote: '',
                poem: '',
                content: '',
                rawContent: ''
            };
        }

        // Remove frontmatter
        const withoutFrontmatter = this.removeFrontmatter(markdown);
    
        // Remove footer
        const withoutFooter = this.removeFooter(withoutFrontmatter);
    
        // Extract components
        const title = this.extractTitle(withoutFooter);
        const subtitle = this.extractSubtitle(withoutFooter);
        const quote = this.extractQuote(withoutFooter);
        const poem = this.extractPoem(withoutFooter);
        const content = this.extractMainContent(withoutFooter, subtitle, quote, poem);

        return {
            title,
            subtitle,
            quote,
            poem,
            content,
            rawContent: withoutFooter
        };
    }

    removeFrontmatter(markdown) {
        return markdown.replace(/^---[\s\S]*?---\n*/m, '');
    }

    removeFooter(markdown) {
    // Split by horizontal rule and take everything before the last one
        const parts = markdown.split(/\n---\n/);
        if (parts.length > 1) {
            // Check if the last part contains navigation links
            const lastPart = parts[parts.length - 1];
            if (lastPart.includes('Continue to Scroll') || lastPart.includes('Continue your journey')) {
                parts.pop();
            }
        }
        return parts.join('\n---\n');
    }

    extractTitle(markdown) {
        const titleMatch = markdown.match(/^#\s+(.+)$/m);
        return titleMatch ? titleMatch[1].trim() : '';
    }

    extractSubtitle(markdown) {
        const lines = markdown.split('\n');
        let foundTitle = false;
    
        for (const line of lines) {
            if (line.startsWith('#')) {
                foundTitle = true;
                continue;
            }
      
            if (foundTitle && line.trim().startsWith('_') && line.trim().endsWith('_')) {
                return line.trim().slice(1, -1).trim();
            }
      
            // Stop looking after we hit content
            if (foundTitle && line.trim() && !line.trim().startsWith('_')) {
                break;
            }
        }
    
        return '';
    }

    extractQuote(markdown) {
        const quoteMatch = markdown.match(/^>\s*"([^"]+)"/m);
        return quoteMatch ? quoteMatch[1].trim() : '';
    }

    extractPoem(markdown) {
    // Look for content between ## header and ---
        const lines = markdown.split('\n');
        let inPoemSection = false;
        let poemLines = [];
        let foundQuote = false;

        for (const line of lines) {
            // Check if we've found the quote first
            if (line.startsWith('>')) {
                foundQuote = true;
                continue;
            }

            // Only look for poem after quote
            if (!foundQuote) continue;

            // Start of poem section (## header)
            if (line.trim().startsWith('##')) {
                inPoemSection = true;
                continue;
            }

            // End of poem section (---)
            if (inPoemSection && line.trim() === '---') {
                break;
            }

            // Collect poem lines
            if (inPoemSection && line.trim()) {
                poemLines.push(line.trim());
            }
        }

        return poemLines.join('\n');
    }

    extractMainContent(markdown, subtitle, quote, poem) {
    // Split by --- and take the part after the poem section
        const parts = markdown.split(/\n---\n/);
    
        // The main content is typically after the first --- (after the poem)
        if (parts.length > 1) {
            return parts.slice(1).join('\n---\n').trim();
        }
    
        // Fallback: remove header components manually
        let content = markdown;

        // Remove title
        content = content.replace(/^#\s+.+$/m, '');
    
        // Remove subtitle
        if (subtitle) {
            content = content.replace(/^_.*_$/m, '');
        }

        // Remove quote block (including attribution)
        content = content.replace(/^>\s*"[^"]*"\s*$/m, '');
        content = content.replace(/^_.*_$/m, ''); // Remove attribution line

        // Remove poem section (## header through ---)
        content = content.replace(/^##[^#\n]*\n[\s\S]*?\n---\n/m, '');

        // Clean up extra newlines
        content = content.replace(/\n{3,}/g, '\n\n').trim();

        return content;
    }

    escapeRegex(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
}

// Make it available globally in browser
if (typeof window !== 'undefined') {
    window.MarkdownProcessor = MarkdownProcessor;
}