
import { getAllPhotoProjectsSitemap, getArticlesSitemap } from "@/sanity/queries/articles";
import { unstable_noStore as noStore } from "next/cache";


import { domain } from "portfolio.config";

export default async function sitemap(): Promise<{ url: string; lastModified?: string | Date | undefined; changeFrequency?: "yearly" | "always" | "hourly" | "daily" | "weekly" | "monthly" | "never" | undefined; priority?: number | undefined; }[]> {
    noStore()

    const allPhotoProjects = await getAllPhotoProjectsSitemap()

    const articles = await getArticlesSitemap();

    // Write list of URLs to sitemap.xml
    const staticPages = [
        {
            url: `${domain}/`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 1,
        },
        {
            url: `${domain}/apropos`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${domain}/articles`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.5,
        },
        {
            url: `${domain}/photographie`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.5,
        },
        {
            url: `${domain}/projets-dev`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
    ]

    const listOfPages = articles.map((article) => ({
        url: `${domain}/articles/${article.currentSlug}`,
        lastModified: new Date(article._updatedAt),
        changeFrequency: 'monthly',
        priority: 0.8,
    }))

    const listOfPhotoProjects = allPhotoProjects.map((project) => ({
        url: `${domain}/photographie/${project.currentSlug}`,
        lastModified: new Date(project._updatedAt),
        changeFrequency: 'monthly',
        priority: 0.8,
    }))

    const allPages = [
        ...staticPages,
        ...listOfPages,
        ...listOfPhotoProjects,
    ]

    return allPages
}