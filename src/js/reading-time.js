/**
 * Reading Time Calculator
 * Estimates reading time for content
 */

const WORDS_PER_MINUTE = 200; // Average reading speed

export function calculateReadingTime(text) {
    // Remove HTML tags and get plain text
    const plainText = text.replace(/<[^>]*>/g, '');
    
    // Count words
    const wordCount = plainText.trim().split(/\s+/).length;
    
    // Calculate time in minutes
    const minutes = Math.ceil(wordCount / WORDS_PER_MINUTE);
    
    return {
        minutes,
        wordCount,
        text: minutes === 1 ? '1 min read' : `${minutes} min read`
    };
}

/**
 * Format reading time for display
 * @param {number} minutes 
 * @returns {string}
 */
export function formatReadingTime(minutes) {
    if (minutes < 1) return '< 1 min';
    if (minutes === 1) return '1 min';
    if (minutes < 60) return `${minutes} min`;
    
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    
    if (mins === 0) return `${hours} hr`;
    return `${hours} hr ${mins} min`;
}