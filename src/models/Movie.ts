export interface IMovie {
    id: number;
    title: string;
    posterUrl: string;
    rating: number;
    type: 'movie' | 'tv';
}

export class MovieModel {
    private movies: IMovie[] = [];

    async fetchMovies(): Promise<IMovie[]> {
        try {
            const response = await fetch('http://localhost:3000/movies');
            this.movies = await response.json();
            return this.movies;
        } catch (error) {
            console.error('Error fetching movies:', error);
            return [];
        }
    }

    getMovies(): IMovie[] {
        return this.movies;
    }

    getMoviesByType(type: 'movie' | 'tv'): IMovie[] {
        return this.movies.filter(movie => movie.type === type);
    }
}
