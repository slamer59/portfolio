/**
 * Script to add a dev project to Sanity programmatically
 * Usage: bun run scripts/add-dev-project.ts
 */

import { createClient } from "@sanity/client";
import "dotenv/config";

// Create a client with write access
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

if (!projectId || !dataset) {
	throw new Error(
		"Missing required environment variables: NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET",
	);
}

const client = createClient({
	projectId,
	dataset,
	apiVersion: "2024-02-03",
	useCdn: false,
	token: process.env.SANITY_API_WRITE_TOKEN, // Need write token
});

type PortableTextBlock = {
	_type: "block";
	children: Array<{ _type: "span"; text: string }>;
	style?: string;
	listItem?: string;
};

interface DevProjectInput {
	title: string;
	slug: string;
	summary: string;
	description?: PortableTextBlock[];
	technologies?: string[];
	keywords?: string[];
	github?: string;
	link?: string;
	featured?: boolean;
	published?: boolean;
	type?: string;
	publishedAt?: string;
}

export async function addDevProject(project: DevProjectInput) {
	try {
		// Create the document
		const doc = await client.create({
			_type: "devProject",
			title: project.title,
			slug: {
				_type: "slug",
				current: project.slug,
			},
			summary: project.summary,
			description: project.description || [
				{
					_type: "block",
					children: [
						{
							_type: "span",
							text: project.summary,
						},
					],
				},
			],
			technologies: project.technologies || [],
			keywords: project.keywords || [],
			github: project.github,
			link: project.link,
			featured: project.featured ?? false,
			published: project.published ?? true,
			type: project.type,
			publishedAt: project.publishedAt || new Date().toISOString(),
		});

		console.log("✅ Dev project created successfully!");
		console.log("📄 Document ID:", doc._id);
		console.log(
			"🔗 View in studio:",
			`http://localhost:3000/studio/structure/devProject;${doc._id}`,
		);

		return doc;
	} catch (error) {
		console.error("❌ Error creating dev project:", error);
		throw error;
	}
}

// Example usage when run directly
if (require.main === module) {
	const exampleProject: DevProjectInput = {
		title: "Portfolio avec Next.js et Sanity",
		slug: "portfolio-nextjs-sanity",
		summary:
			"Un portfolio moderne construit avec Next.js 14, Sanity CMS, TypeScript et Tailwind CSS. Intègre des animations Framer Motion et un design responsive.",
		technologies: ["Next.js", "React", "TypeScript", "Sanity", "Tailwind CSS"],
		keywords: ["web", "frontend", "fullstack", "cms"],
		github: "https://github.com/teepeetlse/portfolio",
		link: "https://thomaspedot.fr",
		featured: true,
		published: true,
		type: "Web Application",
		description: [
			{
				_type: "block",
				children: [
					{
						_type: "span",
						text: "Un portfolio professionnel moderne construit avec Next.js 14 et Sanity CMS.",
					},
				],
				style: "normal",
			},
			{
				_type: "block",
				children: [
					{
						_type: "span",
						text: "Fonctionnalités principales :",
					},
				],
				style: "h3",
			},
			{
				_type: "block",
				children: [
					{
						_type: "span",
						text: "Architecture Next.js 14 avec App Router",
					},
				],
				style: "normal",
				listItem: "bullet",
			},
			{
				_type: "block",
				children: [
					{
						_type: "span",
						text: "Gestion de contenu avec Sanity CMS",
					},
				],
				style: "normal",
				listItem: "bullet",
			},
			{
				_type: "block",
				children: [
					{
						_type: "span",
						text: "TypeScript pour la sécurité de type",
					},
				],
				style: "normal",
				listItem: "bullet",
			},
			{
				_type: "block",
				children: [
					{
						_type: "span",
						text: "Animations fluides avec Framer Motion",
					},
				],
				style: "normal",
				listItem: "bullet",
			},
			{
				_type: "block",
				children: [
					{
						_type: "span",
						text: "Design responsive avec Tailwind CSS",
					},
				],
				style: "normal",
				listItem: "bullet",
			},
		],
	};

	addDevProject(exampleProject)
		.then(() => {
			console.log("\n🎉 Done!");
			process.exit(0);
		})
		.catch((error) => {
			console.error("\n💥 Failed:", error.message);
			process.exit(1);
		});
}

export default addDevProject;
