import { client } from "@/sanity/lib/client";

export async function getArticleData(slug: string) {
  const query = `
    *[_type == "article" && slug.current == '${slug}'] {
        "currentSlug": slug.current,
          title,
          body,
          "mainImage":{
            "asset": mainImage.asset,      
            "dimensions": mainImage.asset->metadata.dimensions,
            "lqip": mainImage.asset->metadata.lqip
          },
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
          "mainImage":{
            "asset": mainImage.asset,      
            "dimensions": mainImage.asset->metadata.dimensions,
            "lqip": mainImage.asset->metadata.lqip
          },
          "galleryRef": *[_type == "gallery" && references(^._id)]._id,
      }`;

  const data = await client.fetch(query);
  const filteredData = data.filter((article) => article.galleryRef.length == 0)
  return filteredData
}


export async function getArticles() {
  const query = `
    *[_type == "article"] {
        "currentSlug": slug.current,
          title,
          body,
          mainImage,
          "galleryRef": *[_type == "gallery" && references(^._id)]._id,
          _updatedAt
      }`;

  const data = await client.fetch(query);
  const filteredData = data.filter((article) => article.galleryRef.length == 0)
  return filteredData
}

export async function getAllPhotoProjects() {
  const query = `
    *[_type == "article"] {
      "currentSlug": slug.current,
        title,
        featured,
        _updatedAt,
        description,
        _updatedAt,
        "galleryRef": *[_type == "gallery" && references(^._id)]._id,
        "mainImage": {
          "asset": *[_type == "gallery" && references(^._id)].images[0].asset,
          "dimensions": *[_type == "gallery" && references(^._id)].images[0].asset->metadata.dimensions,
          "lqip": *[_type == "gallery" && references(^._id)].images[0].asset->metadata.lqip
        }
  }`;

  const data = await client.fetch(query);
  const filteredData = data.filter((article) => article.galleryRef.length != 0)
  return filteredData
}

// export async function getFeaturedArticlesSitemap() {
//   const query = `
//     *[_type == "article" && featured == true] {
//         "currentSlug": slug.current,
//         _updatedAt,
//           "galleryRef": *[_type == "gallery" && references(^._id)]._id,
//       }`;

//   const data = await client.fetch(query);
//   const filteredData = data.filter((article) => article.galleryRef.length == 0)
//   return filteredData
// }


export async function getArticlesSitemap() {
  const query = `
    *[_type == "article"] {
        "currentSlug": slug.current,
          "galleryRef": *[_type == "gallery" && references(^._id)]._id,
          _updatedAt
      }`;

  const data = await client.fetch(query);
  const filteredData = data.filter((article) => article.galleryRef.length == 0)
  return filteredData
}

export async function getAllPhotoProjectsSitemap() {
  const query = `
    *[_type == "article"] {
      "currentSlug": slug.current,
        title,
        featured,
        _updatedAt,
        description,
        _updatedAt,
        "galleryRef": *[_type == "gallery" && references(^._id)]._id,
        "mainImage": {
          "asset": *[_type == "gallery" && references(^._id)].images[0].asset,
          "dimensions": *[_type == "gallery" && references(^._id)].images[0].asset->metadata.dimensions,
          "lqip": *[_type == "gallery" && references(^._id)].images[0].asset->metadata.lqip
        }
  }`;

  const data = await client.fetch(query);
  const filteredData = data.filter((article) => article.galleryRef.length != 0)
  return filteredData
}




