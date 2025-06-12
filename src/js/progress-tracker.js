/**
 * Progress Tracker Module
 * Tracks user reading progress across scrolls
 */

const PROGRESS_KEY = 'gitscrolls-progress';
const LAST_READ_KEY = 'gitscrolls-last-read';

export class ProgressTracker {
    constructor() {
        this.progress = this.loadProgress();
    }

    loadProgress() {
        try {
            return JSON.parse(localStorage.getItem(PROGRESS_KEY) || '{}');
        } catch (e) {
            console.error('Failed to load progress:', e);
            return {};
        }
    }

    saveProgress() {
        try {
            localStorage.setItem(PROGRESS_KEY, JSON.stringify(this.progress));
        } catch (e) {
            console.error('Failed to save progress:', e);
        }
    }

    /**
     * Mark a scroll as started
     * @param {number} scrollNumber 
     */
    markStarted(scrollNumber) {
        if (!this.progress[scrollNumber]) {
            this.progress[scrollNumber] = {
                started: Date.now(),
                completed: false,
                percentRead: 0,
                lastRead: Date.now()
            };
        }
        this.progress[scrollNumber].lastRead = Date.now();
        this.saveProgress();
        this.updateLastRead(scrollNumber);
    }

    /**
     * Update reading progress percentage
     * @param {number} scrollNumber 
     * @param {number} percent 
     */
    updateProgress(scrollNumber, percent) {
        if (!this.progress[scrollNumber]) {
            this.markStarted(scrollNumber);
        }
        
        this.progress[scrollNumber].percentRead = Math.max(
            this.progress[scrollNumber].percentRead,
            Math.round(percent)
        );
        
        // Mark as completed if > 90% read
        if (percent > 90 && !this.progress[scrollNumber].completed) {
            this.markCompleted(scrollNumber);
        }
        
        this.saveProgress();
    }

    /**
     * Mark a scroll as completed
     * @param {number} scrollNumber 
     */
    markCompleted(scrollNumber) {
        if (!this.progress[scrollNumber]) {
            this.markStarted(scrollNumber);
        }
        
        this.progress[scrollNumber].completed = true;
        this.progress[scrollNumber].completedAt = Date.now();
        this.progress[scrollNumber].percentRead = 100;
        
        this.saveProgress();
        this.updateLastRead(scrollNumber);
    }

    /**
     * Get progress for a specific scroll
     * @param {number} scrollNumber 
     * @returns {Object}
     */
    getScrollProgress(scrollNumber) {
        return this.progress[scrollNumber] || {
            started: false,
            completed: false,
            percentRead: 0
        };
    }

    /**
     * Get all progress
     * @returns {Object}
     */
    getAllProgress() {
        return this.progress;
    }

    /**
     * Get reading statistics
     * @returns {Object}
     */
    getStats() {
        const scrolls = Object.keys(this.progress);
        const completed = scrolls.filter(num => this.progress[num].completed);
        const inProgress = scrolls.filter(num => 
            !this.progress[num].completed && this.progress[num].percentRead > 0
        );

        return {
            totalStarted: scrolls.length,
            totalCompleted: completed.length,
            totalInProgress: inProgress.length,
            percentageComplete: scrolls.length > 0 
                ? Math.round((completed.length / 10) * 100) 
                : 0,
            lastRead: this.getLastRead()
        };
    }

    /**
     * Update last read scroll
     * @param {number} scrollNumber 
     */
    updateLastRead(scrollNumber) {
        localStorage.setItem(LAST_READ_KEY, scrollNumber);
    }

    /**
     * Get last read scroll
     * @returns {number|null}
     */
    getLastRead() {
        const lastRead = localStorage.getItem(LAST_READ_KEY);
        return lastRead ? parseInt(lastRead) : null;
    }

    /**
     * Reset all progress
     */
    reset() {
        this.progress = {};
        localStorage.removeItem(PROGRESS_KEY);
        localStorage.removeItem(LAST_READ_KEY);
    }
}

// Create singleton instance
export const progressTracker = new ProgressTracker();