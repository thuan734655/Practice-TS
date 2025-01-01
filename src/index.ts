import { MediaController } from './controllers/MediaController';
import { Router } from './router/Router';
import './resources/stylesheets/media.scss';

document.addEventListener('DOMContentLoaded', () => {
    const mediaController = new MediaController('app');
    mediaController.initialize();

    // Set up routing
    const router = new Router([
        { path: '/', component: () => mediaController.displayAllMedia() },
        { path: '/movies', component: () => mediaController.filterByType('Movie') },
        { path: '/tvshows', component: () => mediaController.filterByType('TV Show') }
    ]);

    // Set up filter navigation
    const filterButtons = document.querySelectorAll('.filter-nav button');
    filterButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const target = e.target as HTMLElement;
            const type = target.dataset.type;

            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            target.classList.add('active');

            // Filter content
            if (type === 'all') {
                mediaController.displayAllMedia();
            } else {
                mediaController.filterByType(type || '');
            }
        });
    });

    // Initialize router
    router.initialize();
});
