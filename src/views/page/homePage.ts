import { BasePage } from './BasePage';
import Header from '../components/Header';
import movieController from '../../controllers/movieController';
import { Media } from '@/types/movietype';
import LoadMovies from '../components/ListMovie';
import {ICSearch} from '../../resources/assets/icons';

interface HomePageState {
  currentFilter: 'all' | 'movies' | 'tv-shows';
  searchQuery: string;
  media: Media[];
  isLoading: boolean;
}

export class HomePage extends BasePage {
  private isEventListenersAttached: boolean = false;

  constructor() {
    super();
    this.state = {
      currentFilter: 'all',
      searchQuery: '',
      media: [], 
      isLoading: false
    };
  }

  protected async renderContent(): Promise<string> {
    if (!this.state.media.length) {
      await this.fetchMovies();
    }
    return `
      ${new Header().render()}
      <div class="home-page" id="rootApp">
        <div class="section-main--title">
          <h3>MaileHereko</h3>
        </div>
        <div class="section-main--desc">
          <p>List of movies and TV Shows I have watched to date.
          <br> Explore what I have watched and also feel free to make a suggestion. 😉</p>
        </div>
        <div class="section-main--search">
          <div class="search-container">
            <input id="searchInput" class="search-container--input" type="text" placeholder="Search Movies or TV Shows">
            <img class="search-container--icon" src="${ICSearch}" alt="icon search">
          </div>
        </div>

        ${this.renderFilterButtons()}
        <p class="section-main--desc-subNav quantity-videos">
          ${this.state.currentFilter.toUpperCase()} 
          <span>(${this.getFilteredMovies().length})</span>
        </p>
        <div class="section-main--list-movies" id="movieList">
          ${this.state.isLoading ? this.renderLoading() : this.renderMovieList()}
        </div>
      </div>
    `;
  }

  private renderLoading(): string {
    return `
      <div class="loading">
        <p>Loading...</p>
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
                class="subNav-container--btn-${filter} ${this.state.currentFilter === filter ? 'button-active' : ''}">
                ${filter === 'tv-shows' ? 'TV Shows' : filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            `
            )
            .join('')}
        </div>
      </div>
    `;
  }

  private async fetchMovies(filter?: string): Promise<void> {
    try {
      this.setState({ isLoading: true });
      const movies = await movieController.getMovies(filter);
      if (Array.isArray(movies)) {
        this.setState({ media: movies, isLoading: false });
      } else {
        console.error('Unexpected response format:', movies);
        this.setState({ media: [], isLoading: false });
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
      this.setState({ media: [], isLoading: false });
    }
  }

  private getFilteredMovies(): Media[] {
    if (!Array.isArray(this.state.media)) {
      console.error('Media is not an array:', this.state.media);
      return [];
    }
    return this.state.media.filter((movie) => {
      return !this.state.searchQuery ||
        movie.movie_name.toLowerCase().includes(this.state.searchQuery.toLowerCase());
    });
  }

  private renderMovieList(): string {
    const filteredMovies = this.getFilteredMovies();
    if (!filteredMovies.length) {
      return `<p class="no-movies">No movies or TV shows found.</p>`;
    }
    return LoadMovies(filteredMovies);
  }

  private attachEventListeners(): void {
    if (this.isEventListenersAttached) return;

    const filters = ['all', 'movies', 'tv-shows'] as const;

    filters.forEach((filter) => {
      const button = document.getElementById(filter);
      if (button) {
        button.addEventListener('click', async () => {
          if (this.state.currentFilter !== filter) {
            button.classList.add("button-active");
            document.getElementById(this.state.currentFilter)?.classList.remove("button-active");
            
            // Update state and fetch new data
            this.setState({ currentFilter: filter });
            await this.fetchMovies(filter === 'all' ? undefined : filter);
            this.updateFilteredContent();
          }
        });

        button.addEventListener('mouseenter', () => {
          if (!this.state.currentFilter.includes(filter)) {
            button.classList.add('button-hover');
          }
        });

        button.addEventListener('mouseleave', () => {
          button.classList.remove('button-hover');
        });
      }
    });

    // Add search input event listener
    const searchInput = document.getElementById('searchInput') as HTMLInputElement;
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const target = e.target as HTMLInputElement;
        this.setState({ searchQuery: target.value });
        this.updateFilteredContent();
      });
    }

    this.isEventListenersAttached = true;
  }

  private updateFilteredContent(): void {
    const quantityElement = document.querySelector('.quantity-videos');
    const listMoviesElement = document.querySelector('.section-main--list-movies');

    if (quantityElement && listMoviesElement) {
      quantityElement.innerHTML = `
        ${this.state.currentFilter.toUpperCase()}
        <span>(${this.getFilteredMovies().length})</span>
      `;
      listMoviesElement.innerHTML = this.renderMovieList();
    }
  }

  public onMount(): void {
    this.attachEventListeners();
  }
}
