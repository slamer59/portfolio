import { domain } from "portfolio.config";
// eslint-disable-next-line import/prefer-default-export
export async function GET() {
    // Disallow: /account/*
    const robotTxt = `User-agent: *
Allow: /

Disallow: /studio/*

# Host
Host: ${domain}

Sitemap: ${domain}/sitemap.xml
`;
    // }

    return new Response(robotTxt, {
        status: 200,
        headers: {
            "Cache-Control": "public, max-age=86400, immutable",
            "Content-Type": "text/plain; charset=utf-8",
        },
    });
}
