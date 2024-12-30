import { MovieModel } from '../models/Movie';
import { MovieView } from '../views/MovieView';

export class MovieController {
    private model: MovieModel;
    private view: MovieView;

    constructor(model: MovieModel, view: MovieView) {
        this.model = model;
        this.view = view;

        // Initial movies fetch
        this.loadMovies();
    }

    private async loadMovies(): Promise<void> {
        await this.model.fetchMovies();
        this.view.displayMovies(this.model.getMovies());
    }
}
