import { createClient } from "@sanity/client";
import { apiVersion, dataset, projectId } from "../sanity/env";

const client = createClient({
	projectId,
	dataset,
	apiVersion,
	useCdn: false,
	token: process.env.SANITY_API_TOKEN,
});

// Article IDs to migrate
const ARTICLES_TO_MIGRATE = [
	"f2f6021e-4a26-4ba6-8374-fc2c2351b3ea", // #2: GitAlchemy
	"276ccadd-5298-4b8b-bd47-36a947f2caa1", // #6: GitAchemy App Privacy
	"b999d66c-7e53-446a-8e47-4f6419959507", // #8: Creative Commons
	"d6ee709c-b1ee-499e-b990-6caa31872240", // #10: Renovate code dependencies
];

async function migrateArticlesToDevProjects() {
	console.log("🚀 Starting migration of articles to dev projects...\n");

	try {
		// Fetch the articles to migrate
		const articles = await client.fetch(
			`*[_type == "article" && _id in $ids] {
        _id,
        title,
        slug,
        description,
        body,
        mainImage,
        publishedAt,
        featured,
        keywords
      }`,
			{ ids: ARTICLES_TO_MIGRATE },
		);

		if (articles.length === 0) {
			console.log("❌ No articles found with the specified IDs.");
			return;
		}

		console.log(`📦 Found ${articles.length} article(s) to migrate:\n`);
		articles.forEach((article: any) => {
			console.log(`   - ${article.title}`);
		});
		console.log("");

		// Create dev projects from articles
		for (const article of articles) {
			console.log(`\n🔄 Migrating: ${article.title}`);

			// Create the dev project document
			const devProject = {
				_type: "devProject",
				title: article.title,
				slug: article.slug,
				summary: article.description?.substring(0, 200) || "",
				description: article.body, // blockContent from article
				mainImage: article.mainImage,
				publishedAt: article.publishedAt || new Date().toISOString(),
				published: true,
				featured: article.featured || false,
				keywords: article.keywords || [],
				views: 0,
				// You may want to manually set these fields:
				technologies: [], // Extract from content or set manually
				type: "web", // Set based on the project type
				demoUrl: null,
				githubUrl: null,
			};

			// Create the new dev project
			const result = await client.create(devProject);
			console.log(`   ✅ Created dev project: ${result._id}`);
			console.log(`   📍 Slug: ${result.slug.current}`);
		}

		console.log("\n🎉 Migration completed successfully!");
		console.log("\n📝 Next steps:");
		console.log("   1. Review the migrated dev projects in Sanity Studio");
		console.log("   2. Add technologies, type, demoUrl, githubUrl manually");
		console.log("   3. Test the projects on your frontend");
		console.log("   4. Optionally unpublish or archive the original articles");
	} catch (error) {
		console.error("\n❌ Error during migration:", error);
	}
}

migrateArticlesToDevProjects();
