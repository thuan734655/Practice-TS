interface Media {
    id: string;
    title: string;
    description: string;
    rating: number;
    type: string;
    releaseDate: string;
    runTime: number;
    genres: string[];
    posterImage: string;
    bannerImage: string;
}

export class MediaModel {
    private data: Media[] = [];
    private readonly API_URL = 'http://localhost:3003/movies';

    async fetchData(): Promise<void> {
        try {
            const response = await fetch(this.API_URL);
            const jsonData = await response.json();
            this.data = jsonData;
            console.log('Fetched data:', this.data); // Debug log
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    }

    getAllMedia(): Media[] {
        return this.data;
    }

    getMediaById(id: string): Media | undefined {
        return this.data.find(item => item.id === id);
    }

    filterByType(type: string): Media[] {
        return this.data.filter(item => item.type === type);
    }

    filterByGenre(genre: string): Media[] {
        return this.data.filter(item => item.genres.includes(genre));
    }

    searchMedia(query: string): Media[] {
        return this.data.filter(item => item.title.toLowerCase().includes(query.toLowerCase()) || item.description.toLowerCase().includes(query.toLowerCase()));
    }

    sortMediaByRating(): Media[] {
        return this.data.sort((a, b) => b.rating - a.rating);
    }

    sortMediaByReleaseDate(): Media[] {
        return this.data.sort((a, b) => new Date(a.releaseDate) - new Date(b.releaseDate));
    }
}
