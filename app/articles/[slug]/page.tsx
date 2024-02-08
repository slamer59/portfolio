import ArticleHeadLine from "@/components/ArticleHeadLine";
import { PortableComponentsDefinitions as components } from "@/components/PortableComponentsDefinitions";
import { urlFor } from "@/sanity/lib/client";
import { getArticleData } from "@/sanity/queries/articles";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
export const revalidate = 30; // revalidate at most 30 seconds

export default async function BlogArticle({
    params,
}: {
    params: { slug: string };
}) {
    const data = await getArticleData(params.slug);
    return (
        <div className="container mt-8">
            <ArticleHeadLine author={data.author} date={data._updatedAt} title={data.title} />
            <article className="w-full max-w-6xl mx-auto mb-8 format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
                {data.mainImage &&
                    <Image
                        src={urlFor(data.mainImage).width(1200).height(400).format("webp").url()}
                        width={1200}
                        height={400}
                        alt="Title Image"
                        priority
                        className="w-full max-w-6xl mx-auto border rounded-lg sm:mt-2"
                        placeholder="blur"
                        blurDataURL={data.mainImage.lqip}
                    />
                }
                <div className="mt-8 prose prose-lg prose-blue dark:prose-invert prose-li:marker:text-primary dark:text-light prose-a:text-primary">
                    <PortableText
                        /* @ts-ignore */
                        components={components}
                        value={data.body}
                    />
                </div>
            </article>
        </div>
    );
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