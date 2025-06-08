const MarkdownProcessor = require('./markdown-processor');

describe('MarkdownProcessor', () => {
  let processor;

  beforeEach(() => {
    processor = new MarkdownProcessor();
  });

  describe('process', () => {
    it('returns empty object for empty input', () => {
      const result = processor.process('');
      expect(result).toEqual({
        title: '',
        quote: '',
        poem: '',
        content: '',
        rawContent: ''
      });
    });

    it('removes YAML frontmatter', () => {
      const input = `---
title: The Unbroken Line
number: 1
---

# SCROLL I: THE UNBROKEN LINE

Content here`;

      const result = processor.process(input);
      expect(result.rawContent).not.toContain('---');
      expect(result.rawContent).toContain('# SCROLL I: THE UNBROKEN LINE');
    });

    it('extracts quote from blockquote syntax', () => {
      const input = `# Title

> "Do not trade your history for the illusion of mastery."

Rest of content`;

      const result = processor.process(input);
      expect(result.quote).toBe('Do not trade your history for the illusion of mastery.');
    });

    it('extracts poem from italicized block after quote', () => {
      const input = `# Title

> "A quote"

*In the beginning, there was trunk,*  
*And trunk was good.*  
*All changes lived in harmony,*  
*Until the Feature grew too proud.*

## Next section`;

      const result = processor.process(input);
      expect(result.poem).toContain('In the beginning, there was trunk,');
      expect(result.poem).toContain('Until the Feature grew too proud.');
    });

    it('removes footer navigation', () => {
      const input = `# Title

Main content here

---

*Continue your journey:*

[Continue to Scroll II: Chronicle of Forgotten Messages →](02-Chronicle-Forgotten-Messages.md)

[Return to the Table of Contents](../README.md)`;

      const result = processor.process(input);
      expect(result.content).toContain('Main content here');
      expect(result.content).not.toContain('Continue your journey');
      expect(result.content).not.toContain('Continue to Scroll II');
    });

    it('preserves main content structure', () => {
      const input = `# SCROLL I: THE UNBROKEN LINE

> "A quote"

*A poem*

## The Sacred Timeline

In the days of old, developers knew the truth.

### The Lesson

Code teaches us wisdom.`;

      const result = processor.process(input);
      expect(result.content).toContain('## The Sacred Timeline');
      expect(result.content).toContain('### The Lesson');
      expect(result.content).toContain('In the days of old');
      expect(result.content).toContain('Code teaches us wisdom');
    });

    it('handles missing sections gracefully', () => {
      const input = `# Title

Just some content without quote or poem`;

      const result = processor.process(input);
      expect(result.title).toBe('Title');
      expect(result.quote).toBe('');
      expect(result.poem).toBe('');
      expect(result.content).toContain('Just some content');
    });

    it('extracts title from first heading', () => {
      const input = `# SCROLL I: THE UNBROKEN LINE

Content`;

      const result = processor.process(input);
      expect(result.title).toBe('SCROLL I: THE UNBROKEN LINE');
    });

    it('handles complex markdown with code blocks', () => {
      const input = `# Title

> "Quote"

Content with code:

\`\`\`javascript
function example() {
  return true;
}
\`\`\`

More content`;

      const result = processor.process(input);
      expect(result.content).toContain('```javascript');
      expect(result.content).toContain('function example()');
      expect(result.content).toContain('```');
    });
  });
});