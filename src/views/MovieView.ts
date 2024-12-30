import { IMovie } from '../models/Movie';

export class MovieView {
    private container: HTMLElement;
    private activeTab: 'all' | 'movies' | 'tv' = 'all';

    constructor() {
        this.container = document.getElementById('app') as HTMLElement;
        this.initializeUI();
    }

    private initializeUI(): void {
        this.container.innerHTML = `
            <header class="header">
                <div class="logo">
                    <h1>MaileHereko</h1>
                </div>
                <nav>
                    <ul>
                        <li><a href="#movies">Movies</a></li>
                        <li><a href="#tv">TV Shows</a></li>
                        <li><a href="#suggest">Suggest me →</a></li>
                    </ul>
                </nav>
            </header>
            <main>
                <div class="search-container">
                    <input type="text" placeholder="Search Movies or TV Shows" />
                </div>
                <div class="tabs">
                    <button class="tab-btn active" data-tab="all">All</button>
                    <button class="tab-btn" data-tab="movies">Movies</button>
                    <button class="tab-btn" data-tab="tv">TV Shows</button>
                </div>
                <div class="movies-grid" id="moviesGrid"></div>
            </main>
        `;

        this.bindTabs();
    }

    private bindTabs(): void {
        const tabs = document.querySelectorAll('.tab-btn');
        tabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                const target = e.target as HTMLElement;
                const tabType = target.dataset.tab as 'all' | 'movies' | 'tv';
                
                tabs.forEach(t => t.classList.remove('active'));
                target.classList.add('active');
                
                this.activeTab = tabType;
                this.updateDisplay();
            });
        });
    }

    private updateDisplay(): void {
        const grid = document.getElementById('moviesGrid') as HTMLElement;
        const movies = this.filteredMovies || [];
        
        grid.innerHTML = movies.map(movie => this.createMovieCard(movie)).join('');
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

    displayMovies(movies: IMovie[]): void {
        this.filteredMovies = movies;
        this.updateDisplay();
    }

    private filteredMovies: IMovie[] | null = null;
}
