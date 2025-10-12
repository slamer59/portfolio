import {
	getAllPhotoProjectsSitemap,
	getArticlesSitemap,
} from "@/sanity/queries/articles";
import { unstable_noStore as noStore } from "next/cache";
import { NextResponse } from "next/server";

import { domain } from "portfolio.config";

export async function GET() {
	noStore();

	const allPhotoProjects = await getAllPhotoProjectsSitemap();
	const articles = await getArticlesSitemap();

	const staticPages = [
		{
			url: `${domain}/`,
			lastModified: new Date(),
			changeFrequency: "yearly",
			priority: 1,
		},
		{
			url: `${domain}/apropos`,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.8,
		},
		{
			url: `${domain}/articles`,
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 0.5,
		},
		{
			url: `${domain}/photographie`,
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 0.5,
		},
	];

	const listOfPages = articles.map((article) => ({
		url: `${domain}/articles/${article.currentSlug}`,
		lastModified: new Date(article._updatedAt),
		changeFrequency: "monthly",
		priority: 0.8,
	}));

	const listOfPhotoProjects = allPhotoProjects.map((project) => ({
		url: `${domain}/photographie/${project.currentSlug}`,
		lastModified: new Date(project._updatedAt),
		changeFrequency: "monthly",
		priority: 0.8,
	}));

	const allPages = [...staticPages, ...listOfPages, ...listOfPhotoProjects];

	// Generate XML sitemap
	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
	.map(
		(page) => `  <url>
    <loc>${page.url}</loc>
    <lastmod>${page.lastModified.toISOString()}</lastmod>
    <changefreq>${page.changeFrequency}</changefreq>
    <priority>${page.priority}</priority>
  </url>`,
	)
	.join("\n")}
</urlset>`;

	return new NextResponse(sitemap, {
		headers: {
			"Content-Type": "application/xml",
			"Cache-Control": "public, max-age=0, must-revalidate",
		},
	});
}
