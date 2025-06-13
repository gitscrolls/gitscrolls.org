# GitScrolls UI/UX Improvement Tasklist

## 🔴 Critical Priority Issues

### Navigation & Core Functionality
- [x] **Fix mobile navigation** - Nav links disappear on mobile (<768px) with no hamburger menu replacement
- [x] **Fix image path inconsistencies** - Update `public/images/` references in scroll-data.js to `images/`
- [x] **Remove duplicate footer** - Two footer elements in index.html (lines 750 & 905)
- [x] **Add loading states** - No loading indicators when fetching markdown content
- [x] **Add error states** - No error handling for failed API calls or missing content

### Missing Assets
- [ ] **Fix missing background images** - All scroll card background images return 404 (assets/images/*.jpg) - See MISSING_IMAGES.md
- [ ] **Fix hero image paths** - Hero images in scroll-data.js still use incorrect paths - See MISSING_IMAGES.md

## 🟡 High Priority Improvements

### User Experience
- [x] **Implement breadcrumb navigation** - Documentation exists but not implemented in UI
- [x] **Add scroll position indicator** - Missing on scroll.html for reading progress
- [x] **Enhance share functionality** - Currently only copies URL, needs social sharing options
- [x] **Add keyboard navigation** - Missing for scroll prev/next navigation
- [x] **Integrate unused components** - Toast & Dropdown components created but never used

### Performance & Polish
- [x] **Add progressive image loading** - Implement lazy loading for scroll images
- [x] **Add image loading states** - Hero images need skeleton/placeholder while loading
- [x] **Implement offline fallbacks** - Better offline page experience

## 🟢 Medium Priority Enhancements

### Content Discovery
- [x] **Add progress tracking** - Track which scrolls have been read
- [x] **Add reading time estimates** - Show estimated reading time for each scroll
- [x] **Implement search functionality** - Allow searching within scrolls
- [x] **Add bookmark/favorites** - Let users save scrolls for later

### Accessibility
- [x] **Add theme change announcements** - Screen readers should announce theme switches
- [x] **Improve dark mode contrast** - Some text elements have insufficient contrast
- [x] **Add focus trap for modals** - Dropdown/modal components need proper focus management
- [x] **Add skip to scroll navigation** - Quick jump to scroll selection

## 🔵 Low Priority Nice-to-Haves

### Visual Enhancements
- [ ] ~~Add scroll animations~~ - Smooth reveal animations for content sections (REJECTED)
- [x] **Implement print styles** - Optimize scrolls for printing
- [x] **Add reading mode** - Distraction-free reading experience
- [x] **Add font size controls** - Allow users to adjust text size

### Advanced Features
- [ ] ~~Add commenting system~~ - Allow discussion on individual scrolls (Link to GitHub Discussions instead)
- [ ] ~~Implement scroll recommendations~~ - Suggest next scroll based on reading history (REJECTED - misunderstood as social sharing)
- [x] **Add export functionality** - Export scrolls as PDF/EPUB
- [ ] ~~Create mobile app wrapper~~ - PWA to app store deployment (REJECTED)

### Developer Experience
- [ ] ~~Add component documentation~~ - Document component APIs and usage (NOT NEEDED)
- [ ] ~~Create style guide~~ - Visual style guide for consistency (NOT NEEDED)
- [x] **Add E2E tests** - Automated testing for critical user flows (Docker-based setup created)
- [ ] **Implement analytics events** - Track user interactions beyond basic page views
- [x] **Add social share buttons** - WhatsApp and Reddit added to existing Twitter, LinkedIn, Facebook, Email

### Post-Deployment Tasks
- [ ] **Deploy Umami Analytics** - Set up analytics instance (see UMAMI_DEPLOYMENT.md)
- [ ] **Uncomment Umami script tags** - In index.html and scroll.html after deployment
- [ ] **Add missing images** - See MISSING_IMAGES.md for complete list and locations

## 📝 Notes

- **Mobile navigation** is the most critical issue affecting usability
- Image path fixes are quick wins that will immediately improve the experience
- Many features have partial implementations that just need to be connected
- The codebase follows good practices but needs integration work