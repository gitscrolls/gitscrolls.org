/**
 * Analytics Module
 * Handles all analytics tracking for GitScrolls
 */

export class Analytics {
    constructor() {
        this.scrollStartTime = Date.now();
        this.maxScrollDepth = 0;
        this.scrollMilestones = [25, 50, 75, 90, 100];
        this.reachedMilestones = new Set();
    }

    /**
     * Track an event with optional data
     * @param {string} eventName - Name of the event
     * @param {Object} eventData - Additional event data
     */
    trackEvent(eventName, eventData = {}) {
        // Umami tracking
        if (typeof window !== 'undefined' && typeof window.umami !== 'undefined') {
            window.umami.track(eventName, eventData);
        }
        
        // Console logging for development
        if (typeof process !== 'undefined' && process.env && process.env.NODE_ENV === 'development') {
            console.log('Analytics Event:', eventName, eventData);
        }
    }

    /**
     * Track scroll depth milestones
     * @param {number} scrollNum - Current scroll number
     * @param {string} scrollTitle - Current scroll title
     */
    trackScrollDepth(scrollNum, scrollTitle) {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = Math.round((scrollTop / docHeight) * 100);
        
        if (scrollPercent > this.maxScrollDepth) {
            this.maxScrollDepth = scrollPercent;
            
            // Check milestones
            this.scrollMilestones.forEach(milestone => {
                if (scrollPercent >= milestone && !this.reachedMilestones.has(milestone)) {
                    this.reachedMilestones.add(milestone);
                    this.trackEvent('scroll_milestone', {
                        scroll_number: scrollNum,
                        scroll_title: scrollTitle,
                        milestone: milestone,
                        time_to_reach: Math.round((Date.now() - this.scrollStartTime) / 1000)
                    });
                }
            });
        }
    }

    /**
     * Track page session when user leaves
     * @param {number} scrollNum - Current scroll number
     * @param {string} scrollTitle - Current scroll title
     */
    trackSession(scrollNum, scrollTitle) {
        const timeOnPage = Math.round((Date.now() - this.scrollStartTime) / 1000);
        this.trackEvent('scroll_session', {
            scroll_number: scrollNum,
            scroll_title: scrollTitle,
            time_on_page: timeOnPage,
            max_scroll_depth: this.maxScrollDepth,
            completed: this.maxScrollDepth >= 90
        });
    }

    /**
     * Track performance metrics
     */
    trackPerformance() {
        if (window.performance && window.performance.timing) {
            const timing = window.performance.timing;
            const metrics = {
                page_load_time: timing.loadEventEnd - timing.navigationStart,
                dom_ready_time: timing.domContentLoadedEventEnd - timing.navigationStart,
                first_paint: timing.responseStart - timing.navigationStart,
                total_resources: window.performance.getEntriesByType('resource').length
            };
            
            this.trackEvent('performance_metrics', metrics);
        }
    }
}

// Export singleton instance
export default new Analytics();