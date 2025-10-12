import { createClient } from "@sanity/client";
import { apiVersion, dataset, projectId } from "../sanity/env";

const client = createClient({
	projectId,
	dataset,
	apiVersion,
	useCdn: true,
});

async function listArticles() {
	console.log("📚 Fetching all articles from Sanity...\n");

	try {
		const articles = await client.fetch(
			`*[_type == "article"] | order(publishedAt desc) {
        _id,
        title,
        slug,
        description,
        publishedAt,
        featured,
        "categories": categories[]->title
      }`,
		);

		if (articles.length === 0) {
			console.log("No articles found.");
			return;
		}

		console.log(`Found ${articles.length} article(s):\n`);

		articles.forEach((article: any, index: number) => {
			console.log(`${index + 1}. ${article.title}`);
			console.log(`   ID: ${article._id}`);
			console.log(`   Slug: ${article.slug?.current || "N/A"}`);
			console.log(`   Published: ${article.publishedAt || "Not published"}`);
			console.log(`   Featured: ${article.featured ? "Yes" : "No"}`);
			console.log(`   Categories: ${article.categories?.join(", ") || "None"}`);
			console.log(
				`   Description: ${article.description?.substring(0, 100)}...`,
			);
			console.log("");
		});
	} catch (error) {
		console.error("Error fetching articles:", error);
	}
}

listArticles();
