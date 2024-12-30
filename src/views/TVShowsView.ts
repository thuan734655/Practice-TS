import { MovieModel, IMovie } from '../models/Movie';

export class TVShowsView {
    private container: HTMLElement;
    private model: MovieModel;

    constructor() {
        this.container = document.getElementById('app') as HTMLElement;
        this.model = new MovieModel();
        this.initializeUI();
        this.loadTVShows();
    }

    private async loadTVShows(): Promise<void> {
        await this.model.fetchMovies();
        const tvShows = this.model.getMoviesByType('tv');
        this.displayTVShows(tvShows);
    }

    private initializeUI(): void {
        this.container.innerHTML = `
            <header class="header">
                <div class="logo">
                    <h1>MaileHereko</h1>
                </div>
                <nav>
                    <ul>
                        <li><a href="/movies">Movies</a></li>
                        <li><a href="/tv">TV Shows</a></li>
                        <li><a href="/suggest">Suggest me →</a></li>
                    </ul>
                </nav>
            </header>
            <main>
                <div class="search-container">
                    <input type="text" placeholder="Search TV Shows" />
                </div>
                <h2 class="section-title">TV Shows</h2>
                <div class="movies-grid" id="moviesGrid"></div>
            </main>
        `;
    }

    private createTVShowCard(show: IMovie): string {
        return `
            <div class="movie-card">
                <div class="movie-poster">
                    <img src="${show.posterUrl}" alt="${show.title}">
                    <div class="rating">${show.rating}</div>
                </div>
                <h3>${show.title}</h3>
            </div>
        `;
    }

    private displayTVShows(shows: IMovie[]): void {
        const grid = document.getElementById('moviesGrid') as HTMLElement;
        grid.innerHTML = shows.map(show => this.createTVShowCard(show)).join('');
    }
}
