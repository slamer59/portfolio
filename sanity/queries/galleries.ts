import { client } from "@/sanity/lib/client";

// https://www.sanity.io/docs/image-metadata
export async function getGalleryImages(slug: string) {
	const query = `
        *[_type == "article" && slug.current == '${slug}'][0] {
            slug,
              title,
              description,
              body,
              keywords,
              author->{name, image},
              "date": publishedAt,
              "gallery": *[_type == "gallery" && references(^._id)][0] {
                images[]{
                  alt,
                  title,
                  description,
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

export async function getGalleryNextImages(slug: string) {
	const query = `
        *[_type == "article" && slug.current == '${slug}'][0] {
            slug,
              title,
              description,
              body,
              "date": publishedAt,
              "gallery": *[_type == "gallery" && references(^._id)][0] {
                images[]{
                  alt,
                  title,
                  description,
                  "asset": asset,
                  "aspect_ratio": asset->metadata.dimensions.aspectRatio,
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

export async function getGalleryImageByIndex(slug: string, photoId: number) {
	const query = `
  *[_type == "article" && slug.current == '${slug}'][0] {
      "image": *[_type == "gallery" && references(^._id)].images[${photoId}]{
        alt,
        title,
        description,
        asset,
        "dimensions": asset->metadata.dimensions,
        "lqip": asset->metadata.lqip,
        "hotspot": hotspot,
      }
    }`;
	const data = await client.fetch(query);
	return data;
}
