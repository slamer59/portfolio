
// import { PortableText } from "@portabletext/react"
// import groq from "groq"

import ArticleHeadLine from "@/components/ArticleHeadLine";
import { urlFor } from "@/sanity/lib/client";
import { getArticleData } from "@/sanity/queries/articles";
import { PortableText } from "@portabletext/react";
import { getImageDimensions } from "@sanity/asset-utils";
import Image from "next/image";
function slugToText(slug) {
    // Replace hyphens with spaces and capitalize each word
    return slug.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
}
export const revalidate = 30; // revalidate at most 30 seconds

const components = {
    types: {
        image: ({ value }) => {
            const { width, height } = getImageDimensions(value)
            return <>
                <figure className="w-full max-w-6xl mx-auto mt-8 mb-6 text-xl text-primary dark:text-light">
                    <Image
                        src={urlFor(value)
                            .fit("max")
                            .auto("format")
                            .url()}
                        width={width}
                        height={height}
                        alt={value.alt || " "}
                        loading="lazy"
                        className="max-w-2xl mx-auto mt-8 border rounded-lg w-fit"
                        style={{
                            // Display alongside text if image appears inside a block text span
                            // display: isInline ? "inline-block" : "block",

                            // Avoid jumping around with aspect-ratio CSS property
                            // aspectRatio: width / height,
                        }}

                    />
                    <figcaption className="text-sm text-center text-gray-600 dark:text-gray-400">
                        {slugToText(value.alt)}
                    </figcaption>
                </figure>
            </>
        },

        code: props => (
            <pre data-language={props.node.language}>
                <code>{props.node.code}</code>
            </pre>
        ),
    },
    block: {
        // Ex. 1: customizing common block types
        h1: ({ children }) => <h2 className="mt-4 mb-4 text-4xl font-extrabold text-primary dark:text-light sm:text-4xl">{children}</h2>,
        h2: ({ children }) => <h3 className="mt-2 mb-2 text-2xl text- sm:text-2xl">{children}</h3>,
        h3: ({ children }) => <h4 className="mt-2 mb-2 text-xl text-primary dark:text-light sm:text-xl">{children}</h4>,
        h4: ({ children }) => <h5 className="mt-2 mb-2 text-lg text-primary dark:text-light sm:text-lg">{children}</h5>,
        h5: ({ children }) => <h6 className="mt-2 mb-2 text-lg text-primary dark:text-light sm:text-lg">{children}</h6>,
        h6: ({ children }) => <h6 className="mt-2 mb-2 text-lg text-primary dark:text-light sm:text-lg">{children}</h6>,
        // Ex. 2: adding a new block type
        customBlock: ({ children }) => <div className="custom-block">{children}</div>,
        // Ex. 3: wrapping a block type
        blockquote: ({ children }) => <blockquote className="italic">{children}</blockquote>,
    },
    marks: {
        center: props => (
            <div className="text-center">{props.children}</div>
        ),
        highlight: props => (
            <span className="font-bold text-brand-primary">
                {props.children}
            </span>
        ),
        link: props => (
            <a href={props?.value?.href} target="_blank" rel="noopener">
                {props.children}
            </a>
        )
    }
};

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
                        src={urlFor(data.mainImage).url()}
                        width={800}
                        height={800}
                        alt="Title Image"
                        priority
                        className="w-full max-w-6xl mx-auto mt-8 border rounded-lg "
                    />
                }
                <div className="mt-16 prose prose-lg prose-blue dark:prose-invert prose-li:marker:text-primary dark:text-light prose-a:text-primary">
                    <PortableText
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