import { 
    debounce, 
    getUrlParams, 
    updateUrl, 
    cache, 
    toRoman,
    isInViewport 
} from './utils.js';

describe('Utils Module', () => {
    beforeEach(() => {
        // Clear localStorage
        localStorage.clear();
        // Reset URL
        window.history.replaceState({}, '', '/');
    });

    describe('debounce', () => {
        jest.useFakeTimers();

        it('should debounce function calls', () => {
            const mockFn = jest.fn();
            const debouncedFn = debounce(mockFn, 100);

            debouncedFn();
            debouncedFn();
            debouncedFn();

            expect(mockFn).not.toBeCalled();

            jest.runAllTimers();

            expect(mockFn).toBeCalledTimes(1);
        });
    });

    describe('toRoman', () => {
        it('should convert numbers to roman numerals', () => {
            expect(toRoman(1)).toBe('I');
            expect(toRoman(5)).toBe('V');
            expect(toRoman(10)).toBe('X');
        });

        it('should return string for numbers outside range', () => {
            expect(toRoman(0)).toBe('0');
            expect(toRoman(11)).toBe('11');
        });
    });

    describe('cache', () => {
        it('should store and retrieve values', () => {
            cache('test', 'value', 1000);
            expect(cache('test')).toBe('value');
        });

        it('should return null for expired values', () => {
            const now = Date.now();
            jest.spyOn(Date, 'now').mockReturnValue(now);
            
            cache('test', 'value', 1000);
            
            // Fast forward time
            jest.spyOn(Date, 'now').mockReturnValue(now + 2000);
            
            expect(cache('test')).toBeNull();
        });

        it('should return null for non-existent keys', () => {
            expect(cache('nonexistent')).toBeNull();
        });
    });

    describe('isInViewport', () => {
        it('should detect if element is in viewport', () => {
            const element = document.createElement('div');
            element.getBoundingClientRect = jest.fn(() => ({
                top: 0,
                left: 0,
                bottom: 100,
                right: 100
            }));

            expect(isInViewport(element)).toBe(true);
        });

        it('should detect if element is outside viewport', () => {
            const element = document.createElement('div');
            element.getBoundingClientRect = jest.fn(() => ({
                top: -200,
                left: 0,
                bottom: -100,
                right: 100
            }));

            expect(isInViewport(element)).toBe(false);
        });
    });
});