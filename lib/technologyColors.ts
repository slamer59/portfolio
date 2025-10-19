/**
 * Technology categorization and color mapping utility
 * Provides accessible, sober color variants with WCAG AA contrast compliance
 * Based on professional UI design best practices for light/dark modes
 */

export type TechnologyCategory =
	| "framework"
	| "cms-database"
	| "language"
	| "tool-service";

export interface TechnologyColorConfig {
	category: TechnologyCategory;
	className: string;
	bgColor: string;
	textColor: string;
	borderColor: string;
}

// Category definitions with associated technologies
const TECHNOLOGY_CATEGORIES: Record<TechnologyCategory, string[]> = {
	framework: [
		"next.js",
		"nextjs",
		"react",
		"react.js",
		"vue",
		"vue.js",
		"angular",
		"svelte",
		"nuxt",
		"nuxt.js",
		"gatsby",
		"remix",
		"astro",
		"solidjs",
		"solid",
		"express",
		"express.js",
		"fastapi",
		"django",
		"flask",
		"spring",
		"spring boot",
		"laravel",
		"nest.js",
		"nestjs",
		"hono",
	],
	"cms-database": [
		"sanity",
		"sanity cms",
		"contentful",
		"strapi",
		"wordpress",
		"mongodb",
		"postgresql",
		"mysql",
		"redis",
		"firebase",
		"supabase",
		"prisma",
		"graphql",
	],
	language: [
		"typescript",
		"javascript",
		"python",
		"java",
		"go",
		"rust",
		"c++",
		"c#",
		"php",
		"ruby",
		"swift",
		"kotlin",
	],
	"tool-service": [
		"docker",
		"kubernetes",
		"k8s",
		"aws",
		"azure",
		"gcp",
		"google cloud",
		"vercel",
		"netlify",
		"cloudflare",
		"github",
		"github actions",
		"git",
		"gitlab",
		"tailwind",
		"tailwind css",
		"tailwindcss",
		"css",
		"scss",
		"sass",
		"less",
		"webpack",
		"vite",
		"turbopack",
		"bun",
		"pnpm",
		"yarn",
		"npm",
		"node",
		"nodejs",
		"node.js",
		"deno",
		"framer motion",
		"framer",
		"motion",
		"gsap",
		"three.js",
		"threejs",
		"groq",
		"rsc",
		"server components",
		"stripe",
		"paypal",
		"jest",
		"vitest",
		"cypress",
		"playwright",
		"testing library",
		"storybook",
	],
};

// Sober, professional color configurations with WCAG AA compliance
// Light mode: desaturated colors on light backgrounds
// Dark mode: even more desaturated colors (20% less saturation) on dark backgrounds
const COLOR_CONFIGS: Record<
	TechnologyCategory | "default",
	TechnologyColorConfig
> = {
	// Blue-gray for frameworks - professional and neutral
	framework: {
		category: "framework",
		className:
			"bg-slate-100 text-slate-700 border-slate-300 dark:bg-slate-800/80 dark:text-slate-200 dark:border-slate-600",
		bgColor: "bg-slate-100 dark:bg-slate-800/80",
		textColor: "text-slate-700 dark:text-slate-200",
		borderColor: "border-slate-300 dark:border-slate-600",
	},
	// Teal for CMS/Database - calm and trustworthy
	"cms-database": {
		category: "cms-database",
		className:
			"bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-900/30 dark:text-teal-300 dark:border-teal-700",
		bgColor: "bg-teal-50 dark:bg-teal-900/30",
		textColor: "text-teal-700 dark:text-teal-300",
		borderColor: "border-teal-200 dark:border-teal-700",
	},
	// Amber for languages - warm but professional
	language: {
		category: "language",
		className:
			"bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-700",
		bgColor: "bg-amber-50 dark:bg-amber-900/30",
		textColor: "text-amber-800 dark:text-amber-300",
		borderColor: "border-amber-200 dark:border-amber-700",
	},
	// Neutral gray for tools - minimal and elegant
	"tool-service": {
		category: "tool-service",
		className:
			"bg-gray-100 text-gray-700 border-gray-300 dark:bg-gray-800/80 dark:text-gray-300 dark:border-gray-600",
		bgColor: "bg-gray-100 dark:bg-gray-800/80",
		textColor: "text-gray-700 dark:text-gray-300",
		borderColor: "border-gray-300 dark:border-gray-600",
	},
	default: {
		category: "tool-service",
		className:
			"bg-gray-100 text-gray-700 border-gray-300 dark:bg-gray-800/80 dark:text-gray-300 dark:border-gray-600",
		bgColor: "bg-gray-100 dark:bg-gray-800/80",
		textColor: "text-gray-700 dark:text-gray-300",
		borderColor: "border-gray-300 dark:border-gray-600",
	},
};

/**
 * Get the category for a given technology name
 */
export function getTechnologyCategory(techName: string): TechnologyCategory {
	const normalized = techName.toLowerCase().trim();

	for (const [category, technologies] of Object.entries(
		TECHNOLOGY_CATEGORIES,
	)) {
		if (technologies.some((tech) => normalized.includes(tech))) {
			return category as TechnologyCategory;
		}
	}

	return "tool-service"; // default category
}

/**
 * Get the color configuration for a technology
 */
export function getTechnologyColorConfig(
	techName: string,
): TechnologyColorConfig {
	const category = getTechnologyCategory(techName);
	return COLOR_CONFIGS[category];
}

/**
 * Get the complete className string for a technology tag
 */
export function getTechnologyClassName(techName: string): string {
	const config = getTechnologyColorConfig(techName);
	return config.className;
}

/**
 * Get a human-readable label for a category
 */
export function getCategoryLabel(category: TechnologyCategory): string {
	const labels: Record<TechnologyCategory, string> = {
		framework: "Framework",
		"cms-database": "CMS/Database",
		language: "Language",
		"tool-service": "Tool/Service",
	};
	return labels[category];
}

/**
 * Get all technologies grouped by category from a list
 */
export function groupTechnologiesByCategory(
	technologies: string[],
): Record<TechnologyCategory, string[]> {
	const grouped: Record<TechnologyCategory, string[]> = {
		framework: [],
		"cms-database": [],
		language: [],
		"tool-service": [],
	};

	for (const tech of technologies) {
		const category = getTechnologyCategory(tech);
		grouped[category].push(tech);
	}

	return grouped;
}
