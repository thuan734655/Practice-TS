export interface Movie {
    id: number;
    title: string;
    posterUrl: string;
    rating: number;
    type: MovieType;
    description?: string;
    releaseDate?: string;
    genres?: string[];
    duration?: number; // in minutes
    director?: string;
    cast?: string[];
}

export type MovieType = 'movie' | 'tv';

export interface MovieFilter {
    title: string; // Tên phim cần tìm kiếm
}


export interface MovieFormData {
    title: string;
    posterUrl: string;
    rating: number;
    type: MovieType;
    description?: string;
    releaseDate?: string;
    genres?: string[];
    duration?: number;
    director?: string;
    cast?: string[];
}
