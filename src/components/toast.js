/**
 * Toast Notification Component
 * Shows temporary notification messages
 */

export class Toast {
    constructor(message, options = {}) {
        this.message = message;
        this.options = {
            duration: 3000,
            position: 'bottom-right',
            type: 'info', // info, success, warning, error
            ...options
        };
        
        this.element = null;
        this.timeout = null;
    }

    render() {
        this.element = document.createElement('div');
        this.element.className = `toast toast-${this.options.type} toast-${this.options.position}`;
        this.element.innerHTML = `
            <div class="toast-content">
                <span class="toast-icon">${this.getIcon()}</span>
                <span class="toast-message">${this.message}</span>
                <button class="toast-close" aria-label="Close">×</button>
            </div>
        `;

        // Add styles if not already present
        this.injectStyles();

        // Close button
        this.element.querySelector('.toast-close').addEventListener('click', () => {
            this.hide();
        });

        return this.element;
    }

    getIcon() {
        const icons = {
            info: 'ℹ',
            success: '✓',
            warning: '⚠',
            error: '✕'
        };
        return icons[this.options.type] || icons.info;
    }

    show() {
        this.render();
        document.body.appendChild(this.element);
        
        // Trigger animation
        requestAnimationFrame(() => {
            this.element.classList.add('toast-show');
        });

        // Auto hide
        if (this.options.duration > 0) {
            this.timeout = setTimeout(() => {
                this.hide();
            }, this.options.duration);
        }
    }

    hide() {
        if (!this.element) return;
        
        clearTimeout(this.timeout);
        this.element.classList.remove('toast-show');
        
        setTimeout(() => {
            this.element?.remove();
            this.element = null;
        }, 300);
    }

    injectStyles() {
        if (document.getElementById('toast-styles')) return;
        
        const styles = document.createElement('style');
        styles.id = 'toast-styles';
        styles.textContent = `
            .toast {
                position: fixed;
                z-index: 9999;
                margin: 1rem;
                opacity: 0;
                transform: translateY(1rem);
                transition: all 0.3s ease;
            }
            
            .toast-show {
                opacity: 1;
                transform: translateY(0);
            }
            
            .toast-content {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                background: var(--charcoal);
                color: white;
                padding: 1rem 1.5rem;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
                min-width: 250px;
            }
            
            .toast-success .toast-content {
                background: #2e7d32;
            }
            
            .toast-warning .toast-content {
                background: #ed6c02;
            }
            
            .toast-error .toast-content {
                background: #d32f2f;
            }
            
            .toast-bottom-right {
                bottom: 0;
                right: 0;
            }
            
            .toast-bottom-left {
                bottom: 0;
                left: 0;
            }
            
            .toast-top-right {
                top: 0;
                right: 0;
            }
            
            .toast-top-left {
                top: 0;
                left: 0;
            }
            
            .toast-close {
                margin-left: auto;
                background: none;
                border: none;
                color: white;
                font-size: 1.5rem;
                cursor: pointer;
                opacity: 0.8;
            }
            
            .toast-close:hover {
                opacity: 1;
            }
        `;
        document.head.appendChild(styles);
    }
}

/**
 * Show toast notification
 * @param {string} message - Toast message
 * @param {Object} options - Toast options
 * @returns {Toast} Toast instance
 */
export function showToast(message, options) {
    const toast = new Toast(message, options);
    toast.show();
    return toast;
}