/**
 * Loading Component
 * Provides consistent loading states across the application
 */

export class LoadingSpinner {
    constructor(options = {}) {
        this.options = {
            size: 'medium',
            text: 'Loading...',
            showText: true,
            ...options
        };
    }

    render() {
        const sizes = {
            small: { spinner: 30, fontSize: '0.9rem' },
            medium: { spinner: 50, fontSize: '1.1rem' },
            large: { spinner: 70, fontSize: '1.3rem' }
        };

        const size = sizes[this.options.size] || sizes.medium;

        const container = document.createElement('div');
        container.className = 'loading-container';
        container.setAttribute('role', 'status');
        container.setAttribute('aria-live', 'polite');
        container.setAttribute('aria-busy', 'true');

        container.innerHTML = `
            <span class="sr-only">${this.options.text}</span>
            <div class="loading-spinner" style="width: ${size.spinner}px; height: ${size.spinner}px;"></div>
            ${this.options.showText ? `<div class="loading-text" style="font-size: ${size.fontSize}">${this.options.text}</div>` : ''}
        `;

        return container;
    }

    /**
     * Replace element content with loading spinner
     * @param {Element} element - Element to show loading state in
     * @returns {Function} Function to restore original content
     */
    static showIn(element, options = {}) {
        const originalContent = element.innerHTML;
        const originalClass = element.className;
        
        element.className = `${originalClass} loading`.trim();
        const spinner = new LoadingSpinner(options);
        element.innerHTML = '';
        element.appendChild(spinner.render());

        // Return function to restore original content
        return () => {
            element.innerHTML = originalContent;
            element.className = originalClass;
        };
    }
}

/**
 * Skeleton Loading Component
 * Shows placeholder content while loading
 */
export class SkeletonLoader {
    constructor(options = {}) {
        this.options = {
            lines: 3,
            showCard: true,
            ...options
        };
    }

    render() {
        const container = document.createElement('div');
        
        if (this.options.showCard) {
            container.className = 'skeleton-card';
        }

        const linePatterns = ['short', 'long', 'medium', 'long', 'short'];
        
        for (let i = 0; i < this.options.lines; i++) {
            const line = document.createElement('div');
            line.className = `skeleton-line ${linePatterns[i % linePatterns.length]}`;
            container.appendChild(line);
        }

        return container;
    }

    /**
     * Show skeleton loading in element
     * @param {Element} element - Element to show skeleton in
     * @param {number} count - Number of skeleton cards to show
     * @returns {Function} Function to clear skeletons
     */
    static showIn(element, count = 3) {
        const originalContent = element.innerHTML;
        element.innerHTML = '';

        for (let i = 0; i < count; i++) {
            const skeleton = new SkeletonLoader();
            element.appendChild(skeleton.render());
        }

        return () => {
            element.innerHTML = originalContent;
        };
    }
}

/**
 * Loading overlay for full-page loading states
 */
export class LoadingOverlay {
    constructor(options = {}) {
        this.options = {
            text: 'Loading...',
            fullScreen: true,
            ...options
        };
        this.overlay = null;
    }

    show() {
        if (this.overlay) return;

        this.overlay = document.createElement('div');
        this.overlay.className = 'loading-overlay';
        if (this.options.fullScreen) {
            this.overlay.classList.add('fullscreen');
        }

        const spinner = new LoadingSpinner({
            size: 'large',
            text: this.options.text
        });

        this.overlay.appendChild(spinner.render());
        document.body.appendChild(this.overlay);

        // Trigger animation
        requestAnimationFrame(() => {
            this.overlay.classList.add('show');
        });
    }

    hide() {
        if (!this.overlay) return;

        this.overlay.classList.remove('show');
        setTimeout(() => {
            this.overlay?.remove();
            this.overlay = null;
        }, 300);
    }
}

// Utility function for async operations with loading states
export async function withLoadingState(element, asyncFn, options = {}) {
    const restore = LoadingSpinner.showIn(element, options);
    
    try {
        const result = await asyncFn();
        restore();
        return result;
    } catch (error) {
        restore();
        throw error;
    }
}