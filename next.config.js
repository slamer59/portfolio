/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "cdn.sanity.io",
			},
			{
				protocol: "https",
				hostname: "picsum.photos",
			},
			{
				protocol: "https",
				hostname: "images.unsplash.com",
			},
		],
		// domains: ['res.cloudinary.com'],
	},
	experimental: {
		// ppr: true,
	},
	async redirects() {
		return [
			{
				source: "/sitemap.xml",
				destination: "/sitemaps/sitemap.xml",
				permanent: true, // 301 redirect
			},
		];
	},
};

module.exports = nextConfig;
