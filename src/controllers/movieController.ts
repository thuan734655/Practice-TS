// src/controllers/movieController.ts
import MovieModel from '../models/movieModel';
import { Media } from '../types/movietype';

class MovieController {
    async getMovies(filter?: string): Promise<Media[]> {
        try {
            let response;
            if (filter) {
                response = await MovieModel.getMovieByType(filter);
            } else {
                response = await MovieModel.getAllMovies();
            }
            // Extract the data array from the response
            return response.data || [];
        } catch (error) {
            console.error('Controller error getting movies:', error);
            throw error;
        }
    }

    async searchMovies(query: string): Promise<Media[]> {
        try {
            return await MovieModel.searchMovies(query);
        } catch (error) {
            console.error('Controller error searching movies:', error);
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
