import { MovieModel, IMovie } from '../models/Movie';

export class HomeView {
    private container: HTMLElement;
    private model: MovieModel;

    constructor() {
        this.container = document.getElementById('app') as HTMLElement;
        this.model = new MovieModel();
        this.initializeUI();
        this.loadContent();
    }

    private async loadContent(): Promise<void> {
        await this.model.fetchMovies();
        const allContent = this.model.getMovies();
        this.displayContent(allContent);
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
                    <input type="text" placeholder="Search Movies or TV Shows" />
                </div>
                <h2 class="section-title">All Content</h2>
                <div class="movies-grid" id="moviesGrid"></div>
            </main>
        `;
    }

    private createContentCard(item: IMovie): string {
        return `
            <div class="movie-card">
                <div class="movie-poster">
                    <img src="${item.posterUrl}" alt="${item.title}">
                    <div class="rating">${item.rating}</div>
                </div>
                <h3>${item.title}</h3>
            </div>
        `;
    }

    private displayContent(content: IMovie[]): void {
        const grid = document.getElementById('moviesGrid') as HTMLElement;
        grid.innerHTML = content.map(item => this.createContentCard(item)).join('');
    }
}
