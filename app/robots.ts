import type { MetadataRoute } from "next";
import { domain } from "portfolio.config";

export default function robots(): MetadataRoute.Robots {
	return {
		rules: [
			{
				userAgent: "*",
				allow: "/",
				disallow: ["/studio/*"],
			},
		],
		sitemap: `${domain}/sitemap.xml`,
	};
}
