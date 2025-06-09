/**
 * Lazy Loading Module
 * Handles intersection observer for images and elements
 */

export class LazyLoader {
    constructor() {
        this.imageObserver = null;
        this.elementObserver = null;
        this.initObservers();
    }

    initObservers() {
        // Image lazy loading observer
        this.imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.onload = () => {
                            img.classList.add('loaded');
                        };
                        img.onerror = () => {
                            // Use fallback gradient on error
                            if (img.closest('.scroll-hero')) {
                                img.closest('.scroll-hero').style.background = `
                                    linear-gradient(135deg, var(--bronze) 0%, var(--dark-bronze) 50%, var(--charcoal) 100%)
                                `;
                            }
                        };
                    }
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.01
        });

        // Element animation observer
        this.elementObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            rootMargin: '0px 0px',
            threshold: 0.1
        });
    }

    /**
     * Observe images for lazy loading
     * @param {Element|NodeList} images - Images to observe
     */
    observeImages(images) {
        if (images instanceof Element) {
            this.imageObserver.observe(images);
        } else {
            images.forEach(img => this.imageObserver.observe(img));
        }
    }

    /**
     * Observe elements for animation
     * @param {Element|NodeList} elements - Elements to observe
     */
    observeElements(elements) {
        if (elements instanceof Element) {
            this.elementObserver.observe(elements);
        } else {
            elements.forEach(el => this.elementObserver.observe(el));
        }
    }

    /**
     * Setup lazy loading for a container
     * @param {Element} container - Container element
     */
    setupContainer(container) {
        const lazyImages = container.querySelectorAll('img.lazy');
        const animatedElements = container.querySelectorAll('.section-divider, .divider-ornament, .scroll-card');
        
        this.observeImages(lazyImages);
        this.observeElements(animatedElements);
    }

    /**
     * Disconnect all observers
     */
    disconnect() {
        this.imageObserver.disconnect();
        this.elementObserver.disconnect();
    }
}

// Export singleton instance
export default new LazyLoader();