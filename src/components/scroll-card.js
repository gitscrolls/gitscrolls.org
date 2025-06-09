/**
 * Scroll Card Component
 * Reusable card component for displaying scrolls
 */

export class ScrollCard {
    constructor(data) {
        this.data = data;
    }

    render() {
        const card = document.createElement('article');
        card.className = 'scroll-card';
        card.innerHTML = `
            <div class="card-header">
                <span class="scroll-number">Scroll ${this.data.number}</span>
                <div class="card-decoration">❦</div>
            </div>
            <h3>${this.data.title}</h3>
            <p>${this.data.description || 'Ancient wisdom awaits...'}</p>
            <a href="scroll.html?scroll=${this.data.number}" class="card-link">
                Read this scroll →
            </a>
        `;
        
        // Add click tracking
        card.addEventListener('click', (e) => {
            if (!e.target.matches('a')) {
                e.preventDefault();
                const link = card.querySelector('.card-link');
                link.click();
            }
        });
        
        return card;
    }

    static createGrid(scrolls) {
        const grid = document.createElement('div');
        grid.className = 'scrolls-grid';
        
        scrolls.forEach(scroll => {
            const card = new ScrollCard(scroll);
            grid.appendChild(card.render());
        });
        
        return grid;
    }
}

/**
 * Create scroll card
 * @param {Object} data - Scroll data
 * @returns {Element} Card element
 */
export function createScrollCard(data) {
    const card = new ScrollCard(data);
    return card.render();
}