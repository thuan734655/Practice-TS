import { MovieModel, IMovie } from '../models/Movie';

export class MoviesView {
    private container: HTMLElement;
    private model: MovieModel;

    constructor() {
        this.container = document.getElementById('app') as HTMLElement;
        this.model = new MovieModel();
        this.initializeUI();
        this.loadMovies();
    }

    private async loadMovies(): Promise<void> {
        await this.model.fetchMovies();
        const movies = this.model.getMoviesByType('movie');
        this.displayMovies(movies);
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
                    <input type="text" placeholder="Search Movies" />
                </div>
                <h2 class="section-title">Movies</h2>
                <div class="movies-grid" id="moviesGrid"></div>
            </main>
        `;
    }

    private createMovieCard(movie: IMovie): string {
        return `
            <div class="movie-card">
                <div class="movie-poster">
                    <img src="${movie.posterUrl}" alt="${movie.title}">
                    <div class="rating">${movie.rating}</div>
                </div>
                <h3>${movie.title}</h3>
            </div>
        `;
    }

    private displayMovies(movies: IMovie[]): void {
        const grid = document.getElementById('moviesGrid') as HTMLElement;
        grid.innerHTML = movies.map(movie => this.createMovieCard(movie)).join('');
    }
}
