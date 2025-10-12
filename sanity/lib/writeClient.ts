import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "../env";

/**
 * Sanity client with write permissions for server-side operations
 * Should only be used in API routes or server components
 * Requires SANITY_API_TOKEN environment variable with write permissions
 */
export const writeClient = createClient({
	apiVersion,
	dataset,
	projectId,
	useCdn: false, // Disable CDN for write operations
	token: process.env.SANITY_API_TOKEN,
});
