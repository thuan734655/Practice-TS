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

    async fetchData(): Promise<void> {
        try {
            const response = await fetch('http://localhost:3001/movies');
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
}
