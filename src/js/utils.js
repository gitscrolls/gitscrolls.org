/**
 * Utilities Module
 * Common utility functions
 */

/**
 * Debounce function execution
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in ms
 * @returns {Function} Debounced function
 */
export function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Get URL parameters
 * @returns {URLSearchParams} URL parameters
 */
export function getUrlParams() {
    return new URLSearchParams(window.location.search);
}

/**
 * Update URL without reload
 * @param {Object} params - Parameters to update
 */
export function updateUrl(params) {
    const url = new URL(window.location);
    Object.entries(params).forEach(([key, value]) => {
        url.searchParams.set(key, value);
    });
    window.history.replaceState({}, '', url);
}

/**
 * Local storage with expiry
 * @param {string} key - Storage key
 * @param {*} value - Value to store (null to get)
 * @param {number} ttl - Time to live in ms
 * @returns {*} Stored value or null
 */
export function cache(key, value = null, ttl = 3600000) {
    if (value === null) {
        // Get
        const item = localStorage.getItem(key);
        if (!item) return null;
        
        const { data, expiry } = JSON.parse(item);
        if (Date.now() > expiry) {
            localStorage.removeItem(key);
            return null;
        }
        return data;
    } else {
        // Set
        const item = {
            data: value,
            expiry: Date.now() + ttl
        };
        localStorage.setItem(key, JSON.stringify(item));
        return value;
    }
}

/**
 * Smooth scroll to element
 * @param {string|Element} target - Target element or selector
 * @param {number} offset - Offset from top
 */
export function smoothScrollTo(target, offset = 0) {
    const element = typeof target === 'string' 
        ? document.querySelector(target) 
        : target;
    
    if (element) {
        const top = element.offsetTop - offset;
        window.scrollTo({
            top: top,
            behavior: 'smooth'
        });
    }
}

/**
 * Check if element is in viewport
 * @param {Element} element - Element to check
 * @returns {boolean} Is in viewport
 */
export function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/**
 * Format Roman numerals
 * @param {number} num - Number to convert
 * @returns {string} Roman numeral
 */
export function toRoman(num) {
    if (num < 1 || num > 10) return num.toString();
    const romans = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];
    return romans[num - 1];
}