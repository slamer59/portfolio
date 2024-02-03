
// import { PortableText } from "@portabletext/react"
import imageUrlBuilder from "@sanity/image-url";
// import groq from "groq"

import { client } from "@/sanity/lib/client";
import { PortableText } from "@portabletext/react";
import Image from "next/image";

export const revalidate = 30; // revalidate at most 30 seconds

async function getData(slug: string) {
    const query = `
    *[_type == "article" && slug.current == '${slug}'] {
        "currentSlug": slug.current,
          title,
          content,
          titleImage
      }[0]`;

    const data = await client.fetch(query);
    return data;
}

export default async function BlogArticle({
    params,
}: {
    params: { slug: string };
}) {
    const data = await getData(params.slug);
    console.log("🚀 ~ data:", data)

    return (
        <div className="mt-8">
            <h1>
                <span className="block text-base font-semibold tracking-wide text-center uppercase text-primary">
                    Jan Marshal - Blog
                </span>
                <span className="block mt-2 text-3xl font-bold leading-8 tracking-tight text-center sm:text-4xl">
                    {data.title}
                </span>
            </h1>
            {data.mainImage &&
                <Image
                    src={urlFor(data.mainImage).url()}
                    width={800}
                    height={800}
                    alt="Title Image"
                    priority
                    className="mt-8 border rounded-lg"
                />
            }
            <div className="mt-16 prose prose-lg prose-blue dark:prose-invert prose-li:marker:text-primary prose-a:text-primary">
                <PortableText value={data.content} />
            </div>
        </div>
    );
}



function urlFor(source) {
    return imageUrlBuilder(client).image(source)
}

// const ptComponents = {
//     types: {
//         image: ({ value }) => {
//             if (!value?.asset?._ref) {
//                 return null
//             }
//             return (
//                 <img
//                     alt={value.alt || " "}
//                     loading="lazy"
//                     src={urlFor(value).width(320).height(240).fit("max").auto("format")}
//                 />
//             )
//         }
//     }
// }

// const article = ({ article }) => {
//     const {
//         title = "Missing title",
//         name = "Missing name",
//         categories,
//         authorImage,
//         body = []
//     } = article
//     return (
//         <article>
//             <h1>{title}</h1>
//             <span>By {name}</span>
//             {categories && (
//                 <ul>
//                     articleed in
//                     {categories.map(category => <li key={category}>{category}</li>)}
//                 </ul>
//             )}
//             {authorImage && (
//                 <div>
//                     <img
//                         src={urlFor(authorImage)
//                             .width(50)
//                             .url()}
//                         alt={`${name}"s picture`}
//                     />
//                 </div>
//             )}
//             <PortableText
//                 value={body}
//                 components={ptComponents}
//             />
//         </article>
//     )
// }

// const query = groq`*[_type == "article" && slug.current == $slug][0]{
//   title,
//   "name": author->name,
//   "categories": categories[]->title,
//   "authorImage": author->image,
//   body
// }`
// export async function getStaticPaths() {
//     const paths = await client.fetch(
//         groq`*[_type == "article" && defined(slug.current)][].slug.current`
//     )

//     return {
//         paths: paths.map((slug) => ({ params: { slug } })),
//         fallback: true,
//     }
// }

// export async function getStaticProps(context) {
//     // It"s important to default the slug so that it doesn"t return "undefined"
//     const { slug = "" } = context.params
//     const article = await client.fetch(query, { slug })
//     return {
//         props: {
//             article
//         }
//     }
// }
// export default article