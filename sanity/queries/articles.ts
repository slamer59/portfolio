import { client } from "@/sanity/lib/client";

export async function getArticleData(slug: string) {
  const query = `
    *[_type == "article" && slug.current == '${slug}'] {
        "currentSlug": slug.current,
          title,
          body,
          mainImage,
          _updatedAt,
          author-> {
            name,
            image,
            postion,
          }          
      }[0]`;

  const data = await client.fetch(query);
  return data;
}

export async function getFeaturedArticles() {
  const query = `
    *[_type == "article" && featured == true] {
        "currentSlug": slug.current,
          title,
          body,
          mainImage,
      }`;

  const data = await client.fetch(query);
  return data;
}


export async function getArticles() {
  const query = `
    *[_type == "article"] {
        "currentSlug": slug.current,
          title,
          body,
          mainImage,
          _updatedAt
      }`;

  const data = await client.fetch(query);
  return data;
}