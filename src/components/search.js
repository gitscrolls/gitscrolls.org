/**
 * Search Component
 * Provides in-page search functionality
 */

export class ScrollSearch {
    constructor(options = {}) {
        this.options = {
            highlightClass: 'search-highlight',
            currentClass: 'search-current',
            ...options
        };
        
        this.searchTerm = '';
        this.matches = [];
        this.currentMatch = -1;
        this.isVisible = false;
    }

    /**
     * Initialize search UI
     */
    init() {
        this.createSearchUI();
        this.attachEventListeners();
    }

    createSearchUI() {
        const searchContainer = document.createElement('div');
        searchContainer.className = 'search-container';
        searchContainer.innerHTML = `
            <div class="search-box">
                <input type="text" 
                       class="search-input" 
                       placeholder="Search in scroll..." 
                       aria-label="Search in scroll">
                <span class="search-count" aria-live="polite"></span>
                <button class="search-nav-btn" 
                        id="searchPrev" 
                        aria-label="Previous match"
                        disabled>
                    ↑
                </button>
                <button class="search-nav-btn" 
                        id="searchNext" 
                        aria-label="Next match"
                        disabled>
                    ↓
                </button>
                <button class="search-close" 
                        aria-label="Close search">
                    ✕
                </button>
            </div>
        `;

        // Add styles
        this.injectStyles();
        
        document.body.appendChild(searchContainer);
        
        this.container = searchContainer;
        this.input = searchContainer.querySelector('.search-input');
        this.countDisplay = searchContainer.querySelector('.search-count');
        this.prevBtn = searchContainer.querySelector('#searchPrev');
        this.nextBtn = searchContainer.querySelector('#searchNext');
        this.closeBtn = searchContainer.querySelector('.search-close');
    }

    attachEventListeners() {
        // Keyboard shortcut to open search
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
                e.preventDefault();
                this.toggle();
            }
            
            if (e.key === 'Escape' && this.isVisible) {
                this.close();
            }
        });

        // Search input
        this.input.addEventListener('input', (e) => {
            this.search(e.target.value);
        });

        // Navigation buttons
        this.prevBtn.addEventListener('click', () => this.navigateToPrevious());
        this.nextBtn.addEventListener('click', () => this.navigateToNext());
        this.closeBtn.addEventListener('click', () => this.close());

        // Search input keyboard navigation
        this.input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                if (e.shiftKey) {
                    this.navigateToPrevious();
                } else {
                    this.navigateToNext();
                }
            }
        });
    }

    toggle() {
        if (this.isVisible) {
            this.close();
        } else {
            this.open();
        }
    }

    open() {
        this.container.classList.add('search-visible');
        this.isVisible = true;
        this.input.focus();
        this.input.select();
    }

    close() {
        this.container.classList.remove('search-visible');
        this.isVisible = false;
        this.clearHighlights();
        this.input.value = '';
        this.searchTerm = '';
        this.updateCount();
    }

    search(term) {
        this.clearHighlights();
        this.searchTerm = term;
        
        if (!term || term.length < 2) {
            this.matches = [];
            this.currentMatch = -1;
            this.updateCount();
            this.updateButtons();
            return;
        }

        const content = document.querySelector('.scroll-content');
        if (!content) return;

        this.matches = this.findAndHighlight(content, term);
        this.currentMatch = this.matches.length > 0 ? 0 : -1;
        
        if (this.currentMatch >= 0) {
            this.scrollToMatch(this.currentMatch);
            this.highlightCurrent(this.currentMatch);
        }

        this.updateCount();
        this.updateButtons();
    }

    findAndHighlight(element, term) {
        const matches = [];
        const walker = document.createTreeWalker(
            element,
            NodeFilter.SHOW_TEXT,
            {
                acceptNode: (node) => {
                    if (node.parentElement.matches('script, style, .search-highlight')) {
                        return NodeFilter.FILTER_REJECT;
                    }
                    return node.textContent.toLowerCase().includes(term.toLowerCase())
                        ? NodeFilter.FILTER_ACCEPT
                        : NodeFilter.FILTER_REJECT;
                }
            }
        );

        let node;
        while (node = walker.nextNode()) {
            const text = node.textContent;
            const regex = new RegExp(`(${term})`, 'gi');
            const parts = text.split(regex);
            
            if (parts.length > 1) {
                const span = document.createElement('span');
                
                parts.forEach((part, index) => {
                    if (index % 2 === 1) {
                        const highlight = document.createElement('mark');
                        highlight.className = this.options.highlightClass;
                        highlight.textContent = part;
                        span.appendChild(highlight);
                        matches.push(highlight);
                    } else if (part) {
                        span.appendChild(document.createTextNode(part));
                    }
                });
                
                node.parentNode.replaceChild(span, node);
            }
        }

        return matches;
    }

    clearHighlights() {
        const highlights = document.querySelectorAll(`.${this.options.highlightClass}`);
        highlights.forEach(highlight => {
            const parent = highlight.parentNode;
            parent.replaceChild(document.createTextNode(highlight.textContent), highlight);
            parent.normalize();
        });
    }

    navigateToNext() {
        if (this.matches.length === 0) return;
        
        this.removeCurrentHighlight();
        this.currentMatch = (this.currentMatch + 1) % this.matches.length;
        this.scrollToMatch(this.currentMatch);
        this.highlightCurrent(this.currentMatch);
        this.updateCount();
    }

    navigateToPrevious() {
        if (this.matches.length === 0) return;
        
        this.removeCurrentHighlight();
        this.currentMatch = this.currentMatch - 1;
        if (this.currentMatch < 0) {
            this.currentMatch = this.matches.length - 1;
        }
        this.scrollToMatch(this.currentMatch);
        this.highlightCurrent(this.currentMatch);
        this.updateCount();
    }

    removeCurrentHighlight() {
        const current = document.querySelector(`.${this.options.currentClass}`);
        if (current) {
            current.classList.remove(this.options.currentClass);
        }
    }

    highlightCurrent(index) {
        if (this.matches[index]) {
            this.matches[index].classList.add(this.options.currentClass);
        }
    }

    scrollToMatch(index) {
        if (this.matches[index]) {
            this.matches[index].scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }
    }

    updateCount() {
        if (this.matches.length === 0) {
            this.countDisplay.textContent = '';
        } else {
            this.countDisplay.textContent = `${this.currentMatch + 1} of ${this.matches.length}`;
        }
    }

    updateButtons() {
        const hasMatches = this.matches.length > 0;
        this.prevBtn.disabled = !hasMatches;
        this.nextBtn.disabled = !hasMatches;
    }

    injectStyles() {
        if (document.getElementById('search-styles')) return;
        
        const styles = document.createElement('style');
        styles.id = 'search-styles';
        styles.textContent = `
            .search-container {
                position: fixed;
                top: -60px;
                right: 2rem;
                z-index: 1000;
                transition: top 0.3s ease;
            }
            
            .search-container.search-visible {
                top: 100px;
            }
            
            .search-box {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                background: var(--bg-primary);
                border: 2px solid var(--bronze);
                border-radius: 8px;
                padding: 0.5rem;
                box-shadow: 0 4px 12px var(--scroll-shadow);
            }
            
            .search-input {
                width: 250px;
                padding: 0.5rem;
                border: 1px solid var(--border-color);
                border-radius: 4px;
                font-family: 'Crimson Text', serif;
                font-size: 1rem;
                background: var(--bg-primary);
                color: var(--text-primary);
            }
            
            .search-count {
                font-family: 'Cinzel', serif;
                font-size: 0.9rem;
                color: var(--bronze);
                min-width: 60px;
                text-align: center;
            }
            
            .search-nav-btn,
            .search-close {
                background: transparent;
                border: 1px solid var(--bronze);
                border-radius: 4px;
                padding: 0.4rem 0.6rem;
                color: var(--bronze);
                cursor: pointer;
                transition: all 0.2s ease;
                font-weight: bold;
            }
            
            .search-nav-btn:hover:not(:disabled),
            .search-close:hover {
                background: var(--bronze);
                color: white;
            }
            
            .search-nav-btn:disabled {
                opacity: 0.5;
                cursor: not-allowed;
            }
            
            .search-highlight {
                background-color: var(--ancient-gold);
                color: var(--charcoal);
                padding: 0 2px;
                border-radius: 2px;
            }
            
            .search-current {
                background-color: var(--bronze);
                color: white;
            }
            
            @media (max-width: 768px) {
                .search-container {
                    right: 1rem;
                    left: 1rem;
                }
                
                .search-box {
                    width: 100%;
                }
                
                .search-input {
                    flex: 1;
                    width: auto;
                }
            }
        `;
        document.head.appendChild(styles);
    }
}

// Initialize search when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.scrollSearch = new ScrollSearch();
        window.scrollSearch.init();
    });
} else {
    window.scrollSearch = new ScrollSearch();
    window.scrollSearch.init();
}