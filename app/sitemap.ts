import {
	getAllPhotoProjectsSitemap,
	getArticlesSitemap,
} from "@/sanity/queries/articles";
import type { MetadataRoute } from "next";
import { domain } from "portfolio.config";

export const revalidate = 3600; // Revalidate every hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const allPhotoProjects = await getAllPhotoProjectsSitemap();
	const articles = await getArticlesSitemap();

	// Get the most recent update from content
	const latestArticleDate =
		articles.length > 0
			? new Date(
					Math.max(...articles.map((a) => new Date(a._updatedAt).getTime())),
				)
			: new Date();
	const latestPhotoDate =
		allPhotoProjects.length > 0
			? new Date(
					Math.max(
						...allPhotoProjects.map((p) => new Date(p._updatedAt).getTime()),
					),
				)
			: new Date();
	const latestContentDate = new Date(
		Math.max(latestArticleDate.getTime(), latestPhotoDate.getTime()),
	);

	const staticPages: MetadataRoute.Sitemap = [
		{
			url: `${domain}/`,
			lastModified: latestContentDate,
			changeFrequency: "yearly",
			priority: 1,
		},
		{
			url: `${domain}/apropos`,
			lastModified: latestContentDate,
			changeFrequency: "monthly",
			priority: 0.8,
		},
		{
			url: `${domain}/articles`,
			lastModified: latestArticleDate,
			changeFrequency: "weekly",
			priority: 0.5,
		},
		{
			url: `${domain}/photographie`,
			lastModified: latestPhotoDate,
			changeFrequency: "weekly",
			priority: 0.5,
		},
	];

	const articlePages: MetadataRoute.Sitemap = articles.map((article) => ({
		url: `${domain}/articles/${article.currentSlug}`,
		lastModified: new Date(article._updatedAt),
		changeFrequency: "monthly" as const,
		priority: 0.8,
	}));

	const photoProjectPages: MetadataRoute.Sitemap = allPhotoProjects.map(
		(project) => ({
			url: `${domain}/photographie/${project.currentSlug}`,
			lastModified: new Date(project._updatedAt),
			changeFrequency: "monthly" as const,
			priority: 0.8,
		}),
	);

	return [...staticPages, ...articlePages, ...photoProjectPages];
}
