export class MediaView {
    private container: HTMLElement;

    constructor(containerId: string) {
        const element = document.getElementById(containerId);
        if (!element) throw new Error(`Container with id ${containerId} not found`);
        this.container = element;
    }

    private createMediaCard(item: any): HTMLElement {
        console.log('Creating card for:', item); // Debug log
        const card = document.createElement('div');
        card.className = 'media-card';
        card.innerHTML = `
            <div class="media-poster">
                <img src="${item.posterImage}" alt="${item.title}" onerror="this.src='https://via.placeholder.com/300x450'">
                <div class="media-rating">${item.rating}</div>
            </div>
            <div class="media-info">
                <h3>${item.title}</h3>
                <div class="media-meta">
                    <span class="media-type">${item.type}</span>
                    <span class="media-year">${new Date(item.releaseDate).getFullYear()}</span>
                    <span class="media-runtime">${item.runTime} min</span>
                </div>
                <div class="media-genres">
                    ${item.genres.map((genre: string) => `<span class="genre-tag">${genre}</span>`).join('')}
                </div>
            </div>
        `;
        return card;
    }

    render(data: any[]): void {
        console.log('Rendering data:', data); // Debug log
        if (!data || data.length === 0) {
            this.showError('No media items to display');
            return;
        }

        this.container.innerHTML = '';
        const mediaGrid = document.createElement('div');
        mediaGrid.className = 'media-grid';
        
        data.forEach(item => {
            try {
                mediaGrid.appendChild(this.createMediaCard(item));
            } catch (error) {
                console.error('Error creating card for item:', item, error);
            }
        });

        this.container.appendChild(mediaGrid);
    }

    showError(message: string): void {
        console.error('Showing error:', message); // Debug log
        this.container.innerHTML = `<div class="error-message">${message}</div>`;
    }
}
