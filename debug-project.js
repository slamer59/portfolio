const { createClient } = require("next-sanity");

const client = createClient({
	projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
	dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
	apiVersion: "2024-01-01",
	useCdn: false,
});

async function debugProject() {
	// Récupérer le projet par son ID
	const projectById = await client.fetch(`
    *[_id == "cbec2dee-f891-4b50-986c-4a9aa92bc02e"][0] {
      _id,
      title,
      "slug": slug.current,
      published,
      publishedAt
    }
  `);

	console.log("Projet trouvé par ID:");
	console.log(JSON.stringify(projectById, null, 2));

	// Récupérer tous les projets
	const allProjects = await client.fetch(`
    *[_type == "devProject"] {
      _id,
      title,
      "slug": slug.current,
      published,
      publishedAt
    }
  `);

	console.log("\nTous les projets devProject:");
	console.log(JSON.stringify(allProjects, null, 2));
}

debugProject().catch(console.error);
