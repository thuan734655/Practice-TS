import { MediaController } from '../controllers/MediaController';

export class TVShowsView {
    private controller: MediaController;

    constructor() {
        this.controller = new MediaController('media-container');
    }

    render(): HTMLElement {
        const container = document.createElement('div');
        container.innerHTML = `
            <div class="tvshows-view">
                <h1>TV Shows</h1>
                <div id="media-container"></div>
            </div>
        `;
        
        // Initialize and filter TV shows after DOM is ready
        setTimeout(() => {
            this.controller.initialize().then(() => {
                this.controller.filterByType('TV Show');
            });
        }, 0);
        
        return container;
    }
}
