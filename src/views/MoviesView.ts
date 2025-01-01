import { MediaController } from '../controllers/MediaController';

export class MoviesView {
    private controller: MediaController;

    constructor() {
        this.controller = new MediaController('media-container');
    }

    render(): HTMLElement {
        const container = document.createElement('div');
        container.innerHTML = `
            <div class="movies-view">
                <h1>Movies</h1>
                <div id="media-container"></div>
            </div>
        `;
        
        // Initialize and filter movies after DOM is ready
        setTimeout(() => {
            this.controller.initialize().then(() => {
                this.controller.filterByType('Movie');
            });
        }, 0);
        
        return container;
    }
}
