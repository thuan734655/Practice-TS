import { MediaModel } from '../models/MediaModel';
import { MediaView } from '../views/MediaView';

export class MediaController {
    private model: MediaModel;
    private view: MediaView;

    constructor(containerId: string) {
        this.model = new MediaModel();
        this.view = new MediaView(containerId);
    }

    async initialize(): Promise<void> {
        try {
            await this.model.fetchData();
            this.displayAllMedia();
        } catch (error) {
            this.view.showError('Failed to load media content');
        }
    }

    displayAllMedia(): void {
        const media = this.model.getAllMedia();
        this.view.render(media);
    }

    filterByType(type: string): void {
        const filteredMedia = this.model.filterByType(type);
        this.view.render(filteredMedia);
    }

    filterByGenre(genre: string): void {
        const filteredMedia = this.model.filterByGenre(genre);
        this.view.render(filteredMedia);
    }
}
