#!/usr/bin/env bun

import { existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";

interface BrokenLink {
	file: string;
	line: number;
	link: string;
	targetFile: string;
}

const CONTENT_DIR = join(process.cwd(), "content/devprojects");
const LINK_PATTERN = /\[([^\]]+)\]\(([^)]+)\)/g;

function getAllMdxFiles(): string[] {
	try {
		return readdirSync(CONTENT_DIR)
			.filter((file) => file.endsWith(".mdx"))
			.map((file) => join(CONTENT_DIR, file));
	} catch (error) {
		console.error(`Error reading directory ${CONTENT_DIR}:`, error);
		return [];
	}
}

function extractLinks(content: string): Array<{ link: string; line: number }> {
	const links: Array<{ link: string; line: number }> = [];
	const lines = content.split("\n");

	for (let i = 0; i < lines.length; i++) {
		const line = lines[i];
		const matches = Array.from(line.matchAll(LINK_PATTERN));

		for (const match of matches) {
			const link = match[2];
			// Only check relative .md links
			if (
				link.endsWith(".md") &&
				(link.startsWith("./") || link.startsWith("../"))
			) {
				links.push({ link, line: i + 1 });
			}
		}
	}

	return links;
}

function checkBrokenLinks(): BrokenLink[] {
	const brokenLinks: BrokenLink[] = [];
	const mdxFiles = getAllMdxFiles();

	if (mdxFiles.length === 0) {
		console.error("No MDX files found in", CONTENT_DIR);
		return brokenLinks;
	}

	console.log(`\nChecking ${mdxFiles.length} MDX files for broken links...\n`);

	for (const filePath of mdxFiles) {
		const content = readFileSync(filePath, "utf-8");
		const links = extractLinks(content);

		for (const { link, line } of links) {
			// Resolve the link relative to the current file
			const fileDir = dirname(filePath);
			const targetPath = resolve(fileDir, link);

			if (!existsSync(targetPath)) {
				// Extract the target filename to suggest slug-based fix
				const targetFile = link.split("/").pop() || link;
				brokenLinks.push({
					file: filePath.replace(`${CONTENT_DIR}/`, ""),
					line,
					link,
					targetFile,
				});
			}
		}
	}

	return brokenLinks;
}

function suggestFix(targetFile: string): string {
	// Convert filename.md to slug
	const slug = targetFile.replace(/\.mdx?$/, "");
	return `/articles/${slug}`;
}

function main() {
	const brokenLinks = checkBrokenLinks();

	if (brokenLinks.length === 0) {
		console.log("✅ No broken links found!\n");
		process.exit(0);
	}

	console.log(`❌ Found ${brokenLinks.length} broken link(s):\n`);

	// Group by file
	const byFile = new Map<string, BrokenLink[]>();
	for (const broken of brokenLinks) {
		if (!byFile.has(broken.file)) {
			byFile.set(broken.file, []);
		}
		byFile.get(broken.file)?.push(broken);
	}

	// Report
	for (const [file, links] of byFile) {
		console.log(`📄 ${file}`);
		for (const { line, link, targetFile } of links) {
			console.log(`   Line ${line}: ${link}`);
			console.log(`   → Suggested fix: ${suggestFix(targetFile)}`);
		}
		console.log();
	}

	console.log(`\n💡 Summary: ${brokenLinks.length} broken link(s) found`);
	console.log("   Run this script to validate, then fix manually\n");

	process.exit(1);
}

main();
