import { client } from "@/sanity/lib/client";

// https://www.sanity.io/docs/image-metadata
export async function getGalleryImages(slug: string) {
    const query = `
        *[_type == "article" && slug.current == '${slug}'][0] {
            slug,
              title,
              description,
              "gallery": *[_type == "gallery" && references(^._id)][0] {
              images[]{
                "asset": asset,      
                "dimensions": asset->metadata.dimensions,
                "lqip": asset->metadata.lqip,
                "blurHash": asset->metadata.blurHash
                
              }
            }
          }`;

    const data = await client.fetch(query);
    return data;
}