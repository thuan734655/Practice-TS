// src/controllers/movieController.ts
import MovieModel from '../models/movieModel';
import { Media, MovieFilter } from '../types/movieType';

class MovieController {
    async getMovies(_filter?: MovieFilter): Promise<Media[]> {
        try {
            return await MovieModel.getAllMovies();
        } catch (error) {
            console.error('Controller error getting movies:', error);
            throw error;
        }
    }

    async deleteMovie(id: number): Promise<boolean> {
        try {
            const existingMovie = await MovieModel.getMovie(id);
            if (!existingMovie) {
                throw new Error(`Movie with id ${id} not found`);
            }
            return await MovieModel.deleteMovie(id);
        } catch (error) {
            console.error(`Controller error deleting movie ${id}:`, error);
            throw error;
        }
    }
}

export default new MovieController();
