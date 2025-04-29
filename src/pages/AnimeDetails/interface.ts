export interface Anime {
    title: string;
    title_japanese?: string;
    title_english?: string;
    title_synonyms?: string[];
    trailer?: {
        images?: {
            maximum_image_url?: string;
        };
    };
    images?: {
        jpg?: {
            large_image_url?: string;
            image_url?: string;
        };
    };
    year?: number;
    genres?: { name: string }[];
    episodes?: number;
    synopsis?: string;
    type?: string;
    duration?: string;
    status?: string;
    aired?: {
        from?: string;
        to?: string;
        prop?: {
            from?: {
                day?: number;
                month?: number;
                year?: number;
            };
            to?: {
                day?: number;
                month?: number;
                year?: number;
            };
        };
    };
    season?: string;
    score?: number;
    scored_by?: number;
    rank?: number;
    popularity?: number;
    members?: number;
    favorites?: number;
    studios?: { name: string }[];
    producers?: { name: string }[];
    source?: string;
}