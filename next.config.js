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
    ],
    // domains: ['res.cloudinary.com'],
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
}

module.exports = nextConfig
