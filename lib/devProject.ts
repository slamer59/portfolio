// Type definition for Dev Projects based on Sanity schema
export interface DevProject {
	slug: string;
	title: string;
	date: string; // publishedAt from Sanity
	description?: unknown; // Portable Text content
	summary: string; // Summary for card display
	technologies?: string[]; // Array of technology names
	github?: string;
	link?: string;
	image?: {
		// Sanity image structure
		asset: unknown;
		dimensions: {
			width: number;
			height: number;
			aspectRatio: number;
		};
		lqip: string;
		alt?: string;
	};
	published?: boolean;
	featured: boolean;
	keywords?: string[]; // For search/filter
	type?: string; // Project type
	categories?: Array<{
		_id: string;
		title: string;
		slug: string;
	}>;
	author?: {
		name: string;
		image?: string;
		position?: string;
	};
	views?: number; // View count from Sanity
	lastViewedAt?: string; // Last viewed timestamp from Sanity
}

// Trending post type (extends DevProject with analytics)
export interface TrendingDevProject extends DevProject {
	views?: number;
	trending?: boolean;
}

// Category type for filtering
export interface DevProjectCategory {
	name: string;
	count: number;
	growth?: string;
}
