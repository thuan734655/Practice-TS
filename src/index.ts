import './styles/main.scss';
import { Router } from './router/Router';
import { HomeView } from './views/HomeView';
import { MoviesView } from './views/MoviesView';
import { TVShowsView } from './views/TVShowsView';

// Define routes
const routes = [
    { path: '/', component: HomeView },
    { path: '/movies', component: MoviesView },
    { path: '/tv', component: TVShowsView }
];

// Initialize router
const router = new Router(routes);
