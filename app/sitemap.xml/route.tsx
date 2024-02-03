
import { unstable_noStore as noStore } from "next/cache";

// eslint-disable-next-line import/prefer-default-export
export async function GET() {
  noStore()
  const xmlContent = `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
  <url> 
    <loc>${process.env.NEXT_PUBLIC_VERCEL_URL}/</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    </url>
  <url>
    <loc>${process.env.NEXT_PUBLIC_VERCEL_URL}/apropos</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </url>
  <url>
    <loc>${process.env.NEXT_PUBLIC_VERCEL_URL}/articles</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </url>
  <url>
    <loc>${process.env.NEXT_PUBLIC_VERCEL_URL}/photographie</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </url>
  <url>
    <loc>${process.env.NEXT_PUBLIC_VERCEL_URL}/projets-dev</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </url>
  </urlset>
        `

  return new Response(xmlContent, {
    headers: {
      "Content-Type": "text/xml",
      // cache for up to 8 hours
      "Cache-Control": "public, max-age=28800, stale-while-revalidate=28800"
    }
  });
}