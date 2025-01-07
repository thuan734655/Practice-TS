import { BasePage } from './BasePage';
import Header from '../components/Header';
import movieController from '../../controllers/movieController';

interface Movie {
  id: number;
  title: string;
  posterUrl: string;
  rating: number;
  type: 'movie' | 'tv';
}

interface HomePageState {
  currentFilter: 'all' | 'movies' | 'tv-shows';
  searchQuery: string;
  movies: Movie[];
}

export class HomePage extends BasePage {
  constructor() {
    super();
    this.state = {
      currentFilter: 'all',
      searchQuery: '',
      movies: []
    } as HomePageState;
  }

  protected async renderContent(): Promise<string> {
    await this.fetchMovies();
    return `
      ${new Header().render()}
      <div class="home-page">
        <div class="section-main--title">
          <h3>MaileHereko</h3>
        </div>
        <div class="section-main--desc">
          <p>List of movies and TV Shows I have watched to date.
          <br> Explore what I have watched and also feel free to make a suggestion. 😉</p>
        </div>
        ${this.renderSearchBar()}
        ${this.renderFilterButtons()}
        <p class="section-main--desc-subNav quantity-videos">
          ${(this.state as HomePageState).currentFilter.toUpperCase()} 
          <span>(${this.getFilteredMovies().length})</span>
        </p>
        <div class="section-main--list-movies">
          ${this.renderMovieList()}
        </div>
      </div>
    `;
  }

  private renderSearchBar(): string {
    return `
      <div class="section-main--search">
        <div class="search-container">
          <input 
            id="searchInput" 
            class="search-container--input" 
            type="text" 
            placeholder="Search Movies or TV Shows"
            value="${(this.state as HomePageState).searchQuery}"
          >
            
          <img 
            class="search-container--icon" 
            src="/resources/assets/icons/search-normal.svg" 
            alt="icon search"
          >
        </div>
      </div>
    `;
  }

  private renderFilterButtons(): string {
    const filters = ['all', 'movies', 'tv-shows'] as const;
    return `
      <div class="section-main--subNav">
        <div class="subNav-container">
          ${filters
            .map(
              (filter) => `
            <button 
              id="${filter}" 
              class="subNav-container--btn-${filter} ${(this.state as HomePageState).currentFilter === filter ? 'button-active' : ''}">
              ${filter === 'tv-shows' ? 'TV Shows' : filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          `
            )
            .join('')}
        </div>
      </div>
    `;
  }

  private async fetchMovies(): Promise<void> {
    try {
      const movies = await movieController.getMovies();
      this.setState({ movies });
    } catch (error) {
      console.error('Error fetching movies:', error);
      this.setState({ movies: [] });
    }
  }


  private getFilteredMovies(): Movie[] {
    const state = this.state as HomePageState;
    return state.movies.filter((movie) => {
      const matchesFilter =
        state.currentFilter === 'all' ||
        (state.currentFilter === 'movies' && movie.type === 'movie') ||
        (state.currentFilter === 'tv-shows' && movie.type === 'tv');

      const matchesSearch =
        !state.searchQuery ||
        movie.title.toLowerCase().includes(state.searchQuery.toLowerCase());

      return matchesFilter && matchesSearch;
    });
  }

  private renderMovieList(): string {
    const filteredMovies = this.getFilteredMovies();
    if (!filteredMovies.length) {
      return `<p class="no-movies">No movies or TV shows found.</p>`;
    }
    return filteredMovies
      .map((data) => {
        return `
          <div class="list-movies-container" id="${data.id}" selected="true">
            <div class="list-movies-container--head">
              <div class="head-box">
                <img src="/resources/assets/icons/ic-star.svg" alt="icon star">
                <p>${data.rating.toFixed(1)}</p>
              </div>
            </div>
            <div class="list-movies-container--body">
              <img src="${data.posterUrl}" alt="avatar">
            </div>
            <div class="list-movies-container--footer">
              <p>${data.title}</p>
            </div>
            <div class="action-buttons" style="display: none;">
              <button class="btn-view">View Details</button>
              <button class="btn-edit">Update</button>
              <button class="btn-delete">Delete</button>
            </div>
          </div>
        `;
      })
      .join(' ');
  }
}
