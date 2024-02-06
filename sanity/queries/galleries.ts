import { client } from "@/sanity/lib/client";

// https://www.sanity.io/docs/image-metadata
export async function getGalleryImages(slug: string) {
  const query = `
        *[_type == "article" && slug.current == '${slug}'][0] {
            slug,
              title,
              description,
              body,
              "date": publishedAt,
              "gallery": *[_type == "gallery" && references(^._id)][0] {
                images[]{
                  "asset": asset,      
                  "dimensions": asset->metadata.dimensions,
                  "lqip": asset->metadata.lqip,
                  "hotspot": asset->hotspot,
                }
            }
          }`;

  const data = await client.fetch(query);
  return data;
}

export async function getGalleryImageRefs(slug: string) {
  const query = `
  *[_type == "article" && slug.current == "${slug}"][0] {
    "imageRefs": *[_type == "gallery" && references(^._id)][0].images[].asset._ref
}
  `;
  const data = await client.fetch(query);
  return data;
}

export async function getGalleryImage(slug: string, photoId: string) {
  const query = `
  *[_type == "article" && slug.current == '${slug}'][0] {
    "image": *[_type == "gallery" && references(^._id)][0].images[asset._ref == "${photoId}"][0]
  }`;
  const data = await client.fetch(query);
  return data;
}

export async function getGalleryImageByIndex(slug: string, photoId: Number) {
  const query = `
  *[_type == "article" && slug.current == '${slug}'][0] {
      "image": *[_type == "gallery" && references(^._id)].images[${photoId}]
    }`;
  const data = await client.fetch(query);
  return data;
}

