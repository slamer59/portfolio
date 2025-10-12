import { config } from "dotenv";
import { writeClient as client } from "../sanity/lib/writeClient";

// Load environment variables
config({ path: ".env.local" });

async function listArticles() {
	console.log("📚 Fetching all articles from Sanity...\n");

	const articles = await client.fetch(
		`*[_type == "article"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      description,
      publishedAt,
      featured,
      "categories": categories[]->title,
      keywords,
      "bodyLength": length(body)
    }`,
	);

	if (articles.length === 0) {
		console.log("No articles found.");
		return;
	}

	console.log(`Found ${articles.length} article(s):\n`);

	articles.forEach((article: any, index: number) => {
		console.log(`${index + 1}. "${article.title}"`);
		console.log(`   ID: ${article._id}`);
		console.log(`   Slug: ${article.slug?.current || "N/A"}`);
		console.log(
			`   Description: ${article.description?.substring(0, 80) || "N/A"}...`,
		);
		console.log(
			`   Published: ${article.publishedAt ? new Date(article.publishedAt).toLocaleDateString() : "Not published"}`,
		);
		console.log(`   Featured: ${article.featured ? "Yes" : "No"}`);
		console.log(`   Categories: ${article.categories?.join(", ") || "None"}`);
		console.log(`   Keywords: ${article.keywords?.join(", ") || "None"}`);
		console.log(`   Body blocks: ${article.bodyLength || 0}`);
		console.log("");
	});
}

listArticles().catch(console.error);
