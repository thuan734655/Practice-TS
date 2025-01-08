// src/models/movieModel.ts
import axiosAPI from '../utils/configAxios';
import { Media, MovieFormData } from "../types/movietype";

interface ApiResponse {
    meta: {
        totalItems: number;
        totalPages: number;
        currentPage: number;
        itemsPerPage: number;
    };
    data: Media[];
}

class MovieModel {
    static async getAllMovies(): Promise<ApiResponse> {
        try {
            const response = await axiosAPI.get('/media');
            return response.data;
        } catch (error) {
            console.error('Error fetching movies:', error);
            throw error;
        }
    }
    
    static async getMovie(id: number): Promise<Media> {
        try {
            const response = await axiosAPI.get(`/media/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching movie with id ${id}:`, error);
            throw error;
        }
    }

    static async getMovieByType(type: string): Promise<ApiResponse> {
        try {
            const response = await axiosAPI.get(`/media/type/${type}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching movie with id ${type}:`, error);
            throw error;
        }
    }

    static async searchMovies(query: string): Promise<Media[]> {
        try {
            const response = await axiosAPI.get(`/media/search?query=${encodeURIComponent(query)}`);
            return response.data;
        } catch (error) {
            console.error('Error searching movies:', error);
            throw error;
        }
    }

    static async addMovie(movieData: MovieFormData): Promise<Media> {
        try {
            const response = await axiosAPI.post('/media', movieData);
            return response.data;
        } catch (error) {
            console.error('Error adding movie:', error);
            throw error;
        }
    }

    static async updateMovie(id: number, movieData: Partial<MovieFormData>): Promise<Media> {
        try {
            const response = await axiosAPI.put(`/media/${id}`, movieData);
            return response.data;
        } catch (error) {
            console.error('Error updating movie:', error);
            throw error;
        }
    }

    static async deleteMovie(id: number): Promise<boolean> {
        try {
            await axiosAPI.delete(`/media/${id}`);
            return true;
        } catch (error) {
            console.error('Error deleting movie:', error);
            throw error;
        }
    }
}

export default MovieModel;
