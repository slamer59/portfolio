import { client } from "@/sanity/lib/client";

export interface DevProject {
	currentSlug: string;
	title: string;
	summary: string;
	description?: any; // Portable Text content
	mainImage?: {
		asset: any;
		dimensions: {
			width: number;
			height: number;
			aspectRatio: number;
		};
		lqip: string;
		alt?: string;
	};
	technologies?: string[];
	github?: string;
	link?: string;
	publishedAt?: string;
	featured: boolean;
	published?: boolean;
	keywords?: string[];
	type?: string;
	_updatedAt?: string;
	views?: number;
	lastViewedAt?: string;
}

/**
 * Get all published dev projects, sorted by date (newest first)
 */
export async function getAllDevProjects(): Promise<DevProject[]> {
	const query = `
    *[_type == "devProject" && published == true && defined(publishedAt)] | order(publishedAt desc) {
      "currentSlug": slug.current,
      title,
      summary,
      description,
      "mainImage": {
        "asset": mainImage.asset,
        "dimensions": mainImage.asset->metadata.dimensions,
        "lqip": mainImage.asset->metadata.lqip,
        "alt": mainImage.alt
      },
      technologies,
      github,
      link,
      publishedAt,
      featured,
      published,
      keywords,
      type,
      views,
      lastViewedAt
    }`;

	const data = await client.fetch(query);
	return data;
}

/**
 * Get featured dev projects (published and featured flag set to true)
 */
export async function getFeaturedDevProjects(): Promise<DevProject[]> {
	const query = `
    *[_type == "devProject" && published == true && featured == true && defined(publishedAt)] | order(publishedAt desc) {
      "currentSlug": slug.current,
      title,
      summary,
      description,
      "mainImage": {
        "asset": mainImage.asset,
        "dimensions": mainImage.asset->metadata.dimensions,
        "lqip": mainImage.asset->metadata.lqip,
        "alt": mainImage.alt
      },
      technologies,
      github,
      link,
      publishedAt,
      featured,
      published,
      keywords,
      type
    }`;

	const data = await client.fetch(query);
	return data;
}

/**
 * Get a single dev project by slug
 */
export async function getDevProjectBySlug(
	slug: string,
): Promise<DevProject | null> {
	const query = `
    *[_type == "devProject" && slug.current == '${slug}' && published == true && defined(publishedAt)] {
      "currentSlug": slug.current,
      title,
      summary,
      description,
      "mainImage": {
        "asset": mainImage.asset,
        "dimensions": mainImage.asset->metadata.dimensions,
        "lqip": mainImage.asset->metadata.lqip,
        "alt": mainImage.alt
      },
      technologies,
      github,
      link,
      publishedAt,
      featured,
      published,
      keywords,
      type,
      _updatedAt
    }[0]`;

	const data = await client.fetch(query);
	return data;
}

/**
 * Get dev projects for sitemap (only slug, publishedAt, and updatedAt)
 */
export async function getDevProjectsSitemap() {
	const query = `
    *[_type == "devProject" && published == true && defined(publishedAt)] {
      "currentSlug": slug.current,
      publishedAt,
      _updatedAt
    }`;

	const data = await client.fetch(query);
	return data;
}

/**
 * Get dev projects by type
 */
export async function getDevProjectsByType(projectType: string) {
	const query = `
    *[_type == "devProject" && published == true && type == '${projectType}' && defined(publishedAt)] | order(publishedAt desc) {
      "currentSlug": slug.current,
      title,
      summary,
      "mainImage": {
        "asset": mainImage.asset,
        "dimensions": mainImage.asset->metadata.dimensions,
        "lqip": mainImage.asset->metadata.lqip,
        "alt": mainImage.alt
      },
      technologies,
      github,
      link,
      publishedAt,
      featured,
      published,
      type
    }`;

	const data = await client.fetch(query);
	return data;
}

/**
 * Get trending dev projects based on views and recency
 * Combines view count with time decay (recent views matter more)
 */
export async function getTrendingDevProjects(limit = 5): Promise<DevProject[]> {
	const query = `
    *[_type == "devProject" && published == true && defined(publishedAt)] {
      "currentSlug": slug.current,
      title,
      summary,
      "mainImage": {
        "asset": mainImage.asset,
        "dimensions": mainImage.asset->metadata.dimensions,
        "lqip": mainImage.asset->metadata.lqip,
        "alt": mainImage.alt
      },
      technologies,
      github,
      link,
      publishedAt,
      featured,
      published,
      keywords,
      type,
      views,
      lastViewedAt,
      "trendScore": coalesce(views, 0)
    } | order(trendScore desc, publishedAt desc) [0...${limit}]`;

	const data = await client.fetch(query);
	return data;
}
