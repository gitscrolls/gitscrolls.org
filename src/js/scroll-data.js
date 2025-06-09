/**
 * Scroll Data Module
 * Central repository for scroll metadata
 */

export const scrolls = [
    { number: 1, file: '01-Unbroken-Line.md', title: 'The Unbroken Line' },
    { number: 2, file: '02-Chronicle-Forgotten-Messages.md', title: 'Chronicle of Forgotten Messages' },
    { number: 3, file: '03-Oracle-Testament.md', title: 'Oracle\'s Testament of Devotion' },
    { number: 4, file: '04-Schism-Scrolls.md', title: 'The Schism Scrolls' },
    { number: 5, file: '05-Wounding-Hubris.md', title: 'The Wounding of Hubris' },
    { number: 6, file: '06-Songs-Chaos-Sirens.md', title: 'Songs of the Chaos Sirens' },
    { number: 7, file: '07-Between-Monsters-Time.md', title: 'Between the Monsters of Time' },
    { number: 8, file: '08-Ancient-Reviewer.md', title: 'Before the Ancient Reviewer' },
    { number: 9, file: '09-Commandments-Wise.md', title: 'Commandments of the Wise' },
    { number: 10, file: '10-Where-Heroes-Die.md', title: 'Where Heroes Go to Die' }
];

export const heroImages = {
    3: 'public/images/scroll-03-hero.png',
    4: 'public/images/scroll-04-hero.png',
    13: 'public/images/scroll-13-hero.png',
    15: 'public/images/scroll-15-hero.png'
};

export const scrollImages = {
    1: ['scroll-01-02.png', 'scroll-01-03.png', 'scroll-01-04.png'],
    2: ['scroll-02-02.png', 'scroll-02-03.png', 'scroll-02-04.png'],
    3: ['scroll-03-02.png', 'scroll-03-03.png', 'scroll-03-04.png'],
    4: ['scroll-04-02.png', 'scroll-04-03.png', 'scroll-04-04.png']
};

export const ornaments = ['✦', '❦', '✧', '◈', '◆', '✱', '❋', '✾'];

/**
 * Get scroll by number
 * @param {number} num - Scroll number
 * @returns {Object} Scroll data
 */
export function getScroll(num) {
    return scrolls.find(s => s.number === num) || scrolls[0];
}

/**
 * Get hero image path for scroll
 * @param {number} num - Scroll number
 * @returns {string} Image path
 */
export function getHeroImage(num) {
    return heroImages[num] || `public/images/scroll-${String(num).padStart(2, '0')}-01.png`;
}

/**
 * Get section images for scroll
 * @param {number} num - Scroll number
 * @returns {Array} Array of image filenames
 */
export function getSectionImages(num) {
    return scrollImages[num] || [];
}