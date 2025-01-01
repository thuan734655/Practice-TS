import { MediaController } from '../controllers/MediaController';

export class HomeView {
    private controller: MediaController;
    private container: HTMLElement;

    constructor() {
        this.container = document.createElement('div');
        this.container.className = 'home-view';
        this.container.innerHTML = `
            <h1>Media Library</h1>
            <div id="media-container"></div>
        `;
        
        // Khởi tạo controller sau khi tạo container
        this.controller = new MediaController('media-container');
    }

    async render(): Promise<HTMLElement> {
        // Đợi dữ liệu được tải xong
        await this.controller.initialize();
        return this.container;
    }
}
