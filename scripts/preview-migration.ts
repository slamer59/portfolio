import { createClient } from "@sanity/client";
import { apiVersion, dataset, projectId } from "../sanity/env";

const client = createClient({
	projectId,
	dataset,
	apiVersion,
	useCdn: true, // Read-only, no token needed
});

// Article IDs to migrate
const ARTICLES_TO_MIGRATE = [
	"f2f6021e-4a26-4ba6-8374-fc2c2351b3ea", // #2: GitAlchemy
	"276ccadd-5298-4b8b-bd47-36a947f2caa1", // #6: GitAchemy App Privacy
	"b999d66c-7e53-446a-8e47-4f6419959507", // #8: Creative Commons
	"d6ee709c-b1ee-499e-b990-6caa31872240", // #10: Renovate code dependencies
];

async function previewMigration() {
	console.log("🔍 PREVIEW MODE - No changes will be made\n");
	console.log("=".repeat(60));
	console.log("\n📋 Fetching articles to preview migration...\n");

	try {
		const articles = await client.fetch(
			`*[_type == "article" && _id in $ids] {
        _id,
        title,
        slug,
        description,
        "bodyLength": length(body),
        "hasMainImage": defined(mainImage),
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

		console.log(`Found ${articles.length} article(s) ready for migration:\n`);

		articles.forEach((article: any, index: number) => {
			console.log(`\n${"=".repeat(60)}`);
			console.log(`📄 Article ${index + 1}: ${article.title}`);
			console.log(`${"=".repeat(60)}`);
			console.log(`ID:           ${article._id}`);
			console.log(`Slug:         ${article.slug?.current || "N/A"}`);
			console.log(`Published:    ${article.publishedAt || "Not set"}`);
			console.log(`Featured:     ${article.featured ? "Yes" : "No"}`);
			console.log(`Has Image:    ${article.hasMainImage ? "Yes" : "No"}`);
			console.log(`Body Length:  ${article.bodyLength || 0} blocks`);
			console.log(`Keywords:     ${article.keywords?.length || 0} keyword(s)`);
			console.log(`\nDescription Preview:`);
			console.log(`"${article.description?.substring(0, 150)}..."`);

			console.log(`\n➡️  Will become Dev Project:`);
			console.log(`   Title:        ${article.title}`);
			console.log(`   Slug:         ${article.slug?.current}`);
			console.log(
				`   Summary:      "${article.description?.substring(0, 100)}..."`,
			);
			console.log(`   Type:         "web" (can be changed manually)`);
			console.log(`   Technologies: [] (to be added manually)`);
			console.log(`   Published:    true`);
			console.log(`   Featured:     ${article.featured ? "true" : "false"}`);
			console.log(`   Views:        0`);
		});

		console.log(`\n${"=".repeat(60)}`);
		console.log("\n✅ Preview complete!");
		console.log("\n📝 Summary:");
		console.log(`   - ${articles.length} articles will be migrated`);
		console.log(`   - Original articles will NOT be deleted`);
		console.log(`   - You'll need to manually add technologies and URLs`);
		console.log(`\n🚀 To proceed with actual migration, run:`);
		console.log(`   bun run scripts/migrate-articles-to-devprojects.ts`);
	} catch (error) {
		console.error("\n❌ Error during preview:", error);
	}
}

previewMigration();
