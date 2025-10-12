/**
 * Load dev project from JSON file and add to Sanity
 * Usage: bun run scripts/add-project-from-json.ts scripts/example-project.json
 */

import { readFile } from "node:fs/promises";
import addDevProject from "./add-dev-project";

interface JsonProjectInput {
	title: string;
	slug: string;
	summary: string;
	description?: Array<{
		style?: string;
		text: string;
	}>;
	technologies?: string[];
	keywords?: string[];
	github?: string;
	link?: string;
	featured?: boolean;
	published?: boolean;
	type?: string;
	publishedAt?: string;
}

function convertDescriptionToPortableText(
	description?: Array<{ style?: string; text: string }>,
) {
	if (!description) return undefined;

	return description.map((block) => ({
		_type: "block" as const,
		children: [
			{
				_type: "span" as const,
				text: block.text,
			},
		],
		style: block.style || "normal",
		...(block.style === "normal" && block.text.includes("\n")
			? { listItem: "bullet" as const }
			: {}),
	}));
}

async function main() {
	const filePath = process.argv[2];

	if (!filePath) {
		console.error("❌ Please provide a JSON file path");
		console.error(
			"Usage: bun run scripts/add-project-from-json.ts <file.json>",
		);
		process.exit(1);
	}

	try {
		// Read JSON file
		const fileContent = await readFile(filePath, "utf-8");
		const jsonData: JsonProjectInput = JSON.parse(fileContent);

		console.log("📖 Loaded project data from:", filePath);
		console.log("📝 Title:", jsonData.title);

		// Convert to proper format
		const projectData = {
			...jsonData,
			description: convertDescriptionToPortableText(jsonData.description),
		};

		// Add to Sanity
		await addDevProject(projectData);

		console.log("\n✅ Project added successfully!");
	} catch (error) {
		if (error instanceof Error) {
			console.error("❌ Error:", error.message);
		}
		process.exit(1);
	}
}

main();
