// src/models/movieModel.ts
import axiosAPI from '../utils/configAxios';
import { Movie, MovieFormData } from '@/types/movietype';

class MovieModel {
    static async getAllMovies(): Promise<Movie[]> {
        try {
            const response = await axiosAPI.get('/movies');
            return response.data;
        } catch (error) {
            console.error('Error fetching movies:', error);
            throw error;
        }
    }
    
    static async getMovie(id: number): Promise<Movie> {
        try {
            const response = await axiosAPI.get(`/movies/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching movie with id ${id}:`, error);
            throw error;
        }
    }

    static async addMovie(movieData: MovieFormData): Promise<Movie> {
        try {
            const response = await axiosAPI.post('/movies', movieData);
            return response.data;
        } catch (error) {
            console.error('Error adding movie:', error);
            throw error;
        }
    }

    static async updateMovie(id: number, movieData: Partial<MovieFormData>): Promise<Movie> {
        try {
            const response = await axiosAPI.put(`/movies/${id}`, movieData);
            return response.data;
        } catch (error) {
            console.error('Error updating movie:', error);
            throw error;
        }
    }

    static async deleteMovie(id: number): Promise<boolean> {
        try {
            const response = await axiosAPI.delete(`/movies/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting movie:', error);
            throw error;
        }
    }
}

export default MovieModel;
