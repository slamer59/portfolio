
// eslint-disable-next-line import/prefer-default-export
export async function GET() {
  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <sitemap>
        <loc>${process.env.NEXT_PUBLIC_VERCEL_URL}/sitemap-blog.xml</loc>
      </sitemap>
    </sitemapindex>
    `;

  return new Response(xmlContent, {
    headers: {
      "Content-Type": "text/xml",
      // cache for up to 8 hours
      "Cache-Control": "public, max-age=28800, stale-while-revalidate=28800"
    }
  });
}
