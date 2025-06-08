# Development Principles for GitScrolls

## Core Principles

### 1. Test-Driven Development (TDD)
- Write tests FIRST, before implementation
- Red → Green → Refactor cycle
- Tests drive the design

### 2. SOLID Principles
- **S**ingle Responsibility Principle (SRP): Each class/function does ONE thing
- **O**pen/Closed Principle: Open for extension, closed for modification
- **L**iskov Substitution: Derived classes must be substitutable for base classes
- **I**nterface Segregation: Many specific interfaces > one general interface
- **D**ependency Inversion (DI): Depend on abstractions, not concretions

### 3. KISS (Keep It Simple, Stupid) & YAGNI (You Aren't Gonna Need It)
- Write the simplest thing that works
- Don't add features until they're actually needed
- Avoid premature optimization

### 4. Test Behavior, Not Implementation
- Test WHAT the code does, not HOW it does it
- Avoid spies and mocks when possible
- Use test doubles and dependency injection for clean testing
- Focus on inputs and outputs, not internal state

## Practical Application

### File Structure
```
/src
  /markdown
    markdown-processor.js    # Implementation
    markdown-processor.test.js  # Tests
```

### Example Test-First Approach
```javascript
// FIRST: Write the test
describe('MarkdownProcessor', () => {
  it('removes frontmatter from markdown content', () => {
    const input = '---\ntitle: Test\n---\n# Content';
    const processor = new MarkdownProcessor();
    const result = processor.process(input);
    expect(result).toBe('# Content');
  });
});

// THEN: Write minimal implementation to pass
```

### Dependency Injection Example
```javascript
// Bad: Hard dependency
class Service {
  constructor() {
    this.api = new GitHubAPI(); // Hard to test
  }
}

// Good: Dependency injection
class Service {
  constructor(api) {
    this.api = api; // Easy to test with test double
  }
}
```

## Commands to Remember
- Run tests: `npm test`
- Run specific test: `npm test -- markdown-processor`
- Watch mode: `npm test -- --watch`

## Notes
- Keep functions small and focused
- Name things clearly - code should be self-documenting
- When in doubt, choose simplicity over cleverness