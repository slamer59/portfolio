import { readdirSync, readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";

const projectsDirectory = join(process.cwd(), "content/devprojects");

export type DevProject = {
	slug: string;
	title: string;
	date: string;
	summary: string;
	author: string;
	content: string; // markdown content
	image?: string; // local path like /images/devprojects/x.jpg
	technologies?: string[];
	github?: string;
	link?: string;
	published?: boolean;
	featured: boolean;
	keywords?: string[];
	type?: string;
	updatedAt?: string; // For sitemap
	views?: number; // Optional view count (not tracked in MDX, for compatibility)
};

// Type for sitemap generation
export type DevProjectSitemapEntry = {
	slug: string;
	date: string;
	updatedAt?: string;
};

// Build a mapping of filenames to their frontmatter slugs
function buildSlugMapping(): Map<string, string> {
	// Check if directory exists
	if (!existsSync(projectsDirectory)) {
		return new Map<string, string>();
	}

	const fileNames = readdirSync(projectsDirectory);
	const slugMap = new Map<string, string>();

	for (const fileName of fileNames) {
		if (!fileName.endsWith(".mdx") && !fileName.endsWith(".md")) continue;

		const fullPath = join(projectsDirectory, fileName);
		const fileContents = readFileSync(fullPath, "utf8");
		const { data } = matter(fileContents);
		const baseFileName = fileName.replace(/\.(mdx|md)$/, "");

		// Use frontmatter slug if available, otherwise use filename
		const slug = (data as any).slug || baseFileName;
		slugMap.set(baseFileName, slug);
	}

	return slugMap;
}

// Process deep links in content using the slug mapping
// Converts [[project-name]] or [[project-name|Display Text]] to markdown links
function processDeepLinks(
	content: string,
	slugMap: Map<string, string>,
): string {
	// Match [[text]] or [[text|label]] patterns
	const linkRegex = /\[\[(.*?)(?:\|(.*?))?\]\]/g;

	return content.replace(linkRegex, (match, target, label) => {
		const displayText = label || target;
		// Remove file extension if present
		const baseTarget = target.replace(/\.(mdx|md)$/, "");
		// Look up the correct slug from our mapping
		const slug = slugMap.get(baseTarget) || baseTarget;
		// Link to /devprojects/[slug]
		return `[${displayText}](/devprojects/${slug})`;
	});
}

/**
 * Get all dev projects from the file system
 * @returns Array of DevProject objects, sorted by date (newest first)
 */
export function getAllDevProjects(): DevProject[] {
	// Check if directory exists
	if (!existsSync(projectsDirectory)) {
		return [];
	}

	const slugMap = buildSlugMapping();
	const fileNames = readdirSync(projectsDirectory);
	const allProjectsData = fileNames
		.filter((fileName) => fileName.endsWith(".mdx") || fileName.endsWith(".md"))
		.map((fileName) => {
			const fileSlug = fileName.replace(/\.(mdx|md)$/, "");
			const fullPath = join(projectsDirectory, fileName);
			const fileContents = readFileSync(fullPath, "utf8");
			const { data, content } = matter(fileContents);

			// Process deep links in content using the slug mapping
			const processedContent = processDeepLinks(content, slugMap);

			// Use frontmatter slug if available, otherwise use filename
			const slug = (data as any).slug || fileSlug;

			return {
				slug,
				content: processedContent,
				image: (data as any).image,
				published: data.published !== false, // Default to true if not specified
				featured: data.featured === true, // Default to false if not specified
				technologies: (data as any).technologies || [],
				github: (data as any).github,
				link: (data as any).link,
				keywords: (data as any).keywords || [],
				type: (data as any).type,
				updatedAt: (data as any).updatedAt,
				...(data as {
					title: string;
					date: string;
					summary: string;
					author: string;
				}),
			};
		})
		.filter((project) => project.published); // Filter out unpublished projects

	return allProjectsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

/**
 * Get a single dev project by slug
 * @param slug - The project slug to look up
 * @returns DevProject object or null if not found
 */
export function getDevProjectBySlug(slug: string): DevProject | null {
	try {
		// Check if directory exists
		if (!existsSync(projectsDirectory)) {
			return null;
		}

		const slugMap = buildSlugMapping();
		// First try to find the file by looking through all files and checking frontmatter
		const fileNames = readdirSync(projectsDirectory);
		const matchingFile = fileNames.find((fileName) => {
			if (!fileName.endsWith(".mdx") && !fileName.endsWith(".md")) return false;

			const fullPath = join(projectsDirectory, fileName);
			const fileContents = readFileSync(fullPath, "utf8");
			const { data } = matter(fileContents);
			return (
				(data as any).slug === slug ||
				fileName === `${slug}.mdx` ||
				fileName === `${slug}.md`
			);
		});

		if (!matchingFile) {
			return null;
		}

		const fullPath = join(projectsDirectory, matchingFile);
		const fileContents = readFileSync(fullPath, "utf8");
		const { data, content } = matter(fileContents);

		// Process deep links in content using the slug mapping
		const processedContent = processDeepLinks(content, slugMap);

		return {
			slug,
			content: processedContent,
			image: (data as any).image,
			published: data.published !== false,
			featured: data.featured === true,
			technologies: (data as any).technologies || [],
			github: (data as any).github,
			link: (data as any).link,
			keywords: (data as any).keywords || [],
			type: (data as any).type,
			updatedAt: (data as any).updatedAt,
			...(data as {
				title: string;
				date: string;
				summary: string;
				author: string;
			}),
		};
	} catch {
		return null;
	}
}

/**
 * Get all featured dev projects
 * @returns Array of featured DevProject objects, sorted by date (newest first)
 */
export function getFeaturedDevProjects(): DevProject[] {
	const allProjects = getAllDevProjects();
	return allProjects.filter((project) => project.featured);
}

/**
 * Get dev projects for sitemap generation
 * @returns Array of DevProjectSitemapEntry with slug, date, and updatedAt
 */
export function getDevProjectsSitemap(): DevProjectSitemapEntry[] {
	const allProjects = getAllDevProjects();
	return allProjects.map((project) => ({
		slug: project.slug,
		date: project.date,
		updatedAt: project.updatedAt,
	}));
}

/**
 * Get trending dev projects (most recent projects)
 * Since we don't have view counts in file-based system, we simulate trending
 * by returning the most recent projects
 * @param limit - Maximum number of projects to return (default: 5)
 * @returns Array of recent DevProject objects
 */
export function getTrendingDevProjects(limit = 5): DevProject[] {
	const allProjects = getAllDevProjects();
	// Return the most recent projects up to the limit
	return allProjects.slice(0, limit);
}
