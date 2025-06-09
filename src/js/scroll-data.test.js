import { 
    scrolls, 
    getScroll, 
    getHeroImage, 
    getSectionImages 
} from './scroll-data.js';

describe('Scroll Data Module', () => {
    describe('getScroll', () => {
        it('should return correct scroll by number', () => {
            const scroll = getScroll(1);
            expect(scroll.number).toBe(1);
            expect(scroll.title).toBe('The Unbroken Line');
            expect(scroll.file).toBe('01-Unbroken-Line.md');
        });

        it('should return first scroll as fallback', () => {
            const scroll = getScroll(99);
            expect(scroll.number).toBe(1);
        });
    });

    describe('getHeroImage', () => {
        it('should return specific hero image if available', () => {
            expect(getHeroImage(3)).toBe('public/images/scroll-03-hero.png');
            expect(getHeroImage(4)).toBe('public/images/scroll-04-hero.png');
        });

        it('should return default pattern for others', () => {
            expect(getHeroImage(1)).toBe('public/images/scroll-01-01.png');
            expect(getHeroImage(5)).toBe('public/images/scroll-05-01.png');
        });
    });

    describe('getSectionImages', () => {
        it('should return section images for scroll', () => {
            const images = getSectionImages(1);
            expect(images).toHaveLength(3);
            expect(images[0]).toBe('scroll-01-02.png');
        });

        it('should return empty array for scrolls without images', () => {
            const images = getSectionImages(10);
            expect(images).toEqual([]);
        });
    });

    describe('scrolls data', () => {
        it('should have 10 scrolls', () => {
            expect(scrolls).toHaveLength(10);
        });

        it('should have required properties for each scroll', () => {
            scrolls.forEach(scroll => {
                expect(scroll).toHaveProperty('number');
                expect(scroll).toHaveProperty('file');
                expect(scroll).toHaveProperty('title');
                expect(typeof scroll.number).toBe('number');
                expect(typeof scroll.file).toBe('string');
                expect(typeof scroll.title).toBe('string');
            });
        });
    });
});