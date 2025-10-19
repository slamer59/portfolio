// Type definition for Dev Projects using MDX
export interface DevProject {
	slug: string;
	title: string;
	date: string; // publishedAt date
	content?: string; // MDX content string
	summary: string; // Summary for card display
	technologies?: string[]; // Array of technology names
	github?: string;
	link?: string;
	image?: string; // Local image path (e.g., /images/devprojects/project.jpg)
	published?: boolean;
	featured: boolean;
	keywords?: string[]; // For search/filter
	type?: string; // Project type
	categories?: Array<{
		_id: string;
		title: string;
		slug: string;
	}>;
	author?: string; // Author name (simplified from Sanity object)
	views?: number; // View count (optional, not tracked in MDX)
	lastViewedAt?: string; // Last viewed timestamp (optional, not tracked in MDX)
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
