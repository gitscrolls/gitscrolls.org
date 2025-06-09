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
        subtitle: '',
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
_Subtitle_

> "Do not trade your history for the illusion of mastery."  
_Quote attribution line_

Rest of content`;

      const result = processor.process(input);
      expect(result.quote).toBe('Do not trade your history for the illusion of mastery.');
    });

    it('extracts subtitle from italicized line after title', () => {
      const input = `# SCROLL I: THE UNBROKEN LINE
_A lesson in the sanctity of history_

> "Quote"

Content`;

      const result = processor.process(input);
      expect(result.subtitle).toBe('A lesson in the sanctity of history');
    });

    it('extracts poem from section after quote', () => {
      const input = `# Title
_Subtitle_

> "A quote"  
_Attribution_

## Poem Title

<poem line 1>
<poem line 2>
<poem line 3>

---

### First Section Title`;

      const result = processor.process(input);
      expect(result.poem).toContain('<poem line 1>');
      expect(result.poem).toContain('<poem line 2>');
      expect(result.poem).toContain('<poem line 3>');
    });

    it('handles the actual GitScrolls markdown structure', () => {
      const input = `---
frontmatter: true
---

# SCROLL I: THE UNBROKEN LINE
_A lesson in the sanctity of history_

> "Do not trade your history for the illusion of mastery."  
_Linus the Elder, to Tuxicles_

## The Sacred Timeline

In the beginning, there was trunk,
And trunk was good.
All changes lived in harmony,
Until the Feature grew too proud.

---

### The Call to Adventure

Content starts here...`;

      const result = processor.process(input);
      expect(result.title).toBe('SCROLL I: THE UNBROKEN LINE');
      expect(result.subtitle).toBe('A lesson in the sanctity of history');
      expect(result.quote).toBe('Do not trade your history for the illusion of mastery.');
      expect(result.poem).toContain('In the beginning, there was trunk');
      expect(result.content).toContain('### The Call to Adventure');
      expect(result.content).toContain('Content starts here...');
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