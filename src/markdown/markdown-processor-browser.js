// Browser-compatible version of MarkdownProcessor
// This file can be included directly in HTML pages

class MarkdownProcessor {
  process(markdown) {
    if (!markdown) {
      return {
        title: '',
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
    const quote = this.extractQuote(withoutFooter);
    const poem = this.extractPoem(withoutFooter);
    const content = this.extractMainContent(withoutFooter, quote, poem);

    return {
      title,
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

  extractQuote(markdown) {
    const quoteMatch = markdown.match(/^>\s*"?([^"\n]+)"?\s*$/m);
    return quoteMatch ? quoteMatch[1].trim() : '';
  }

  extractPoem(markdown) {
    // Look for italicized blocks after the quote
    const lines = markdown.split('\n');
    let inPoem = false;
    let poemLines = [];
    let foundQuote = false;

    for (const line of lines) {
      // Check if we've found the quote
      if (line.startsWith('>')) {
        foundQuote = true;
        continue;
      }

      // Only look for poem after quote
      if (!foundQuote) continue;

      // Check for italicized lines (poem)
      if (line.trim().startsWith('*') && line.trim().endsWith('*')) {
        inPoem = true;
        // Remove the asterisks and add to poem
        const poemLine = line.trim().slice(1, -1).trim();
        if (poemLine) {
          poemLines.push(poemLine);
        }
      } else if (inPoem && line.trim() === '') {
        // Empty line might be part of poem
        continue;
      } else if (inPoem && !line.trim().startsWith('*')) {
        // End of poem
        break;
      }
    }

    return poemLines.join('\n');
  }

  extractMainContent(markdown, quote, poem) {
    let content = markdown;

    // Remove title
    content = content.replace(/^#\s+.+$/m, '').trim();

    // Remove quote
    if (quote) {
      content = content.replace(/^>\s*"?[^"\n]+"?\s*$/m, '').trim();
    }

    // Remove poem
    if (poem) {
      // Remove all italicized lines that make up the poem
      const poemLines = poem.split('\n');
      for (const line of poemLines) {
        content = content.replace(new RegExp(`^\\*${this.escapeRegex(line)}\\*\\s*$`, 'm'), '');
      }
    }

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