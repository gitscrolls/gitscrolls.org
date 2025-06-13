/**
 * Dropdown Component
 * Reusable dropdown menu component
 */

export class Dropdown {
    constructor(element, options = {}) {
        this.element = element;
        this.toggle = element.querySelector('.dropdown-toggle');
        this.menu = element.querySelector('.dropdown-menu');
        
        this.options = {
            closeOnClickOutside: true,
            closeOnSelect: true,
            onOpen: null,
            onClose: null,
            ...options
        };
        
        this.isOpen = false;
        this.init();
    }

    init() {
        // Toggle button click
        this.toggle.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggle();
        });

        // Close on outside click
        if (this.options.closeOnClickOutside) {
            document.addEventListener('click', () => {
                if (this.isOpen) this.close();
            });
        }

        // Prevent menu clicks from closing
        this.menu.addEventListener('click', (e) => {
            e.stopPropagation();
            if (this.options.closeOnSelect && e.target.matches('a, button')) {
                this.close();
            }
        });

        // Keyboard navigation
        this.element.addEventListener('keydown', (e) => this.handleKeyboard(e));
    }

    toggle() {
        this.isOpen ? this.close() : this.open();
    }

    open() {
        this.isOpen = true;
        this.toggle.classList.add('active');
        this.menu.classList.add('show');
        this.toggle.setAttribute('aria-expanded', 'true');
        
        if (this.options.onOpen) this.options.onOpen();
    }

    close() {
        this.isOpen = false;
        this.toggle.classList.remove('active');
        this.menu.classList.remove('show');
        this.toggle.setAttribute('aria-expanded', 'false');
        
        if (this.options.onClose) this.options.onClose();
    }

    handleKeyboard(e) {
        if (!this.isOpen) return;

        const items = this.menu.querySelectorAll('a, button');
        const currentIndex = Array.from(items).findIndex(item => item === document.activeElement);

        switch(e.key) {
        case 'Escape':
            this.close();
            this.toggle.focus();
            break;
                
        case 'ArrowDown': {
            e.preventDefault();
            const nextIndex = currentIndex + 1 < items.length ? currentIndex + 1 : 0;
            items[nextIndex]?.focus();
            break;
        }
                
        case 'ArrowUp': {
            e.preventDefault();
            const prevIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
            items[prevIndex]?.focus();
            break;
        }
                
        case 'Tab':
            // Trap focus within dropdown
            if (items.length > 0) {
                e.preventDefault();
                if (e.shiftKey) {
                    // Shift+Tab: go to previous item
                    const prevIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
                    items[prevIndex]?.focus();
                } else {
                    // Tab: go to next item
                    const nextIndex = currentIndex + 1 < items.length ? currentIndex + 1 : 0;
                    items[nextIndex]?.focus();
                }
            }
            break;
        }
    }

    destroy() {
        // Remove event listeners
        this.element.removeEventListener('keydown', this.handleKeyboard);
    }
}

/**
 * Initialize dropdown on element
 * @param {Element|string} element - Element or selector
 * @param {Object} options - Dropdown options
 * @returns {Dropdown} Dropdown instance
 */
export function initDropdown(element, options) {
    const el = typeof element === 'string' 
        ? document.querySelector(element) 
        : element;
    
    return el ? new Dropdown(el, options) : null;
}