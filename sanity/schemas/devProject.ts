import { defineField, defineType } from "sanity";

export default defineType({
	name: "devProject",
	title: "Dev Project",
	type: "document",
	fields: [
		defineField({
			name: "title",
			title: "Title",
			type: "string",
			validation: (Rule) => Rule.required().error("Title is required!"),
		}),
		defineField({
			name: "slug",
			title: "Slug",
			type: "slug",
			options: {
				source: "title",
				maxLength: 96,
			},
			validation: (Rule) => Rule.required().error("Slug is required!"),
		}),
		defineField({
			name: "summary",
			title: "Summary",
			type: "text",
			description: "Short summary of the project (1-2 sentences)",
			validation: (Rule) =>
				Rule.required()
					.max(200)
					.error("Summary is required and must be under 200 characters!"),
		}),
		defineField({
			name: "description",
			title: "Description",
			type: "blockContent",
			description: "Full project description with rich text",
		}),
		defineField({
			name: "mainImage",
			title: "Main Image",
			type: "image",
			options: {
				hotspot: true,
				metadata: ["blurhash", "lqip", "palette"],
			},
			fields: [
				{
					name: "alt",
					type: "string",
					title: "Alternative Text",
				},
			],
		}),
		defineField({
			name: "technologies",
			title: "Technologies",
			type: "array",
			of: [{ type: "string" }],
			description:
				"Technologies used in this project (e.g., React, Next.js, TypeScript)",
		}),
		defineField({
			name: "github",
			title: "GitHub URL",
			type: "url",
			description: "Link to the GitHub repository",
			validation: (Rule) =>
				Rule.uri({
					scheme: ["http", "https"],
				}),
		}),
		defineField({
			name: "link",
			title: "Live Demo URL",
			type: "url",
			description: "Link to the live project/demo",
			validation: (Rule) =>
				Rule.uri({
					scheme: ["http", "https"],
				}),
		}),
		defineField({
			name: "publishedAt",
			title: "Published At",
			type: "datetime",
			description: "When the project was completed/published",
		}),
		defineField({
			name: "featured",
			title: "Featured Project",
			type: "boolean",
			description: "Show this project on the homepage",
			initialValue: false,
		}),
		defineField({
			name: "published",
			title: "Published",
			type: "boolean",
			description: "Make this project visible on the website",
			initialValue: false,
		}),
		defineField({
			name: "keywords",
			title: "Keywords",
			type: "array",
			of: [{ type: "string" }],
			description: "SEO keywords for this project",
		}),
		defineField({
			name: "type",
			title: "Project Type",
			type: "string",
			description:
				"Type of project (e.g., Web App, Mobile App, Library, CLI Tool)",
			options: {
				list: [
					{ title: "Web Application", value: "web-app" },
					{ title: "Mobile Application", value: "mobile-app" },
					{ title: "Library/Package", value: "library" },
					{ title: "CLI Tool", value: "cli" },
					{ title: "API/Backend", value: "api" },
					{ title: "Other", value: "other" },
				],
			},
		}),
	],

	preview: {
		select: {
			title: "title",
			media: "mainImage",
			date: "publishedAt",
			published: "published",
			featured: "featured",
		},
		prepare(selection) {
			const { date, published, featured } = selection;
			const status = published ? "Published" : "Draft";
			const featuredTag = featured ? " • Featured" : "";
			return {
				...selection,
				subtitle: `${status}${featuredTag} - ${date ? new Date(date).toLocaleDateString() : "Not Published"}`,
			};
		},
	},
});
