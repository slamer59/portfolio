"use client";

import { RepoLink } from "./RepoLink";

interface ViewRepositoryProps {
	url?: string;
	text?: string;
	platform?: "github" | "gitlab";
}

/**
 * ViewRepository component for MDX articles
 *
 * Usage in MDX:
 * 1. Direct with URL: <ViewRepository url="https://github.com/user/repo" />
 * 2. Custom text: <ViewRepository url="https://github.com/user/repo" text="Check out the code" />
 * 3. Custom platform: <ViewRepository url="https://gitlab.com/user/repo" platform="gitlab" />
 *
 * Note: If no URL is provided, the component won't render anything.
 */
export function ViewRepository({ url, text, platform }: ViewRepositoryProps) {
	// Don't render if no URL is provided
	if (!url) {
		return null;
	}

	return (
		<div className="flex justify-center my-8">
			<RepoLink url={url} platform={platform}>
				{text}
			</RepoLink>
		</div>
	);
}
