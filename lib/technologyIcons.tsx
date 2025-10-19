/**
 * Technology icon mapping using lucide-react icons
 * Maps technology names to their corresponding icons
 */

import {
	Code2,
	Database,
	type LucideIcon,
	Blocks,
	FileCode,
	Cpu,
	Wrench,
	Zap,
	Package,
	Server,
	Globe,
	Layout,
	Box,
	Container,
	Cloud,
	GitBranch,
	Layers,
	BookOpen,
	Settings,
	Flame,
} from "lucide-react";

export type TechnologyIconMap = Record<string, LucideIcon>;

/**
 * Comprehensive technology to icon mapping
 * Icons are chosen to visually represent each technology's purpose
 */
export const TECHNOLOGY_ICONS: TechnologyIconMap = {
	// Frontend Frameworks
	react: Blocks,
	"react.js": Blocks,
	"next.js": Zap,
	nextjs: Zap,
	vue: Layers,
	"vue.js": Layers,
	angular: Box,
	svelte: Flame,
	nuxt: Layers,
	"nuxt.js": Layers,
	gatsby: Layout,
	remix: Layout,
	astro: Zap,
	solid: Blocks,
	solidjs: Blocks,

	// Backend Frameworks
	express: Server,
	"express.js": Server,
	fastapi: Zap,
	django: Server,
	flask: Server,
	spring: Server,
	"spring boot": Server,
	laravel: Server,
	"node.js": Server,
	nodejs: Server,
	node: Server,
	"nest.js": Server,
	nestjs: Server,
	hono: Zap,

	// Languages
	typescript: FileCode,
	javascript: FileCode,
	python: Code2,
	java: Code2,
	go: Code2,
	rust: Code2,
	"c++": Code2,
	"c#": Code2,
	php: Code2,
	ruby: Code2,
	swift: Code2,
	kotlin: Code2,

	// CMS & Databases
	sanity: BookOpen,
	"sanity cms": BookOpen,
	contentful: BookOpen,
	strapi: BookOpen,
	wordpress: BookOpen,
	mongodb: Database,
	postgresql: Database,
	mysql: Database,
	redis: Database,
	firebase: Database,
	supabase: Database,
	prisma: Database,
	graphql: GitBranch,

	// DevOps & Cloud
	docker: Container,
	kubernetes: Box,
	k8s: Box,
	aws: Cloud,
	azure: Cloud,
	gcp: Cloud,
	"google cloud": Cloud,
	vercel: Cloud,
	netlify: Cloud,
	cloudflare: Cloud,
	github: GitBranch,
	"github actions": GitBranch,
	git: GitBranch,
	gitlab: GitBranch,

	// Tools & Libraries
	tailwind: Layout,
	"tailwind css": Layout,
	tailwindcss: Layout,
	css: Layout,
	scss: Layout,
	sass: Layout,
	less: Layout,
	webpack: Package,
	vite: Zap,
	turbopack: Package,
	bun: Package,
	pnpm: Package,
	yarn: Package,
	npm: Package,
	deno: Server,
	"framer motion": Layers,
	framer: Layers,
	motion: Layers,
	gsap: Layers,
	"three.js": Box,
	threejs: Box,
	groq: Code2,
	rsc: Server,
	"server components": Server,
	stripe: Settings,
	paypal: Settings,
	jest: Wrench,
	vitest: Wrench,
	cypress: Wrench,
	playwright: Wrench,
	"testing library": Wrench,
	storybook: BookOpen,
};

/**
 * Get icon for a technology name
 * Falls back to a generic icon if not found
 */
export function getTechnologyIcon(techName: string): LucideIcon {
	const normalized = techName.toLowerCase().trim();

	// Direct match
	if (TECHNOLOGY_ICONS[normalized]) {
		return TECHNOLOGY_ICONS[normalized];
	}

	// Partial match (e.g., "Next.js 14" matches "next.js")
	for (const [key, icon] of Object.entries(TECHNOLOGY_ICONS)) {
		if (normalized.includes(key) || key.includes(normalized)) {
			return icon;
		}
	}

	// Default fallback
	return Settings;
}

/**
 * Check if a technology has a custom icon
 */
export function hasTechnologyIcon(techName: string): boolean {
	const normalized = techName.toLowerCase().trim();
	return (
		normalized in TECHNOLOGY_ICONS ||
		Object.keys(TECHNOLOGY_ICONS).some(
			(key) => normalized.includes(key) || key.includes(normalized),
		)
	);
}
