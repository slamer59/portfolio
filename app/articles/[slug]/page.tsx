import ArticleHeadLine from "@/components/ArticleHeadLine";
import { PortableComponentsDefinitions as components } from "@/components/PortableComponentsDefinitions";
import { urlFor } from "@/sanity/lib/client";
import { getArticleData } from "@/sanity/queries/articles";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import revalidatePage from "portfolio.config";

export const revalidate = revalidatePage; // revalidate at most 30 seconds

export async function generateMetadata(
    { params, searchParams },
    parent
) {
    const data = await getArticleData(params.slug);
    return {
        title: data.title,
        description: data.description,
        openGraph: {
            title: data.title,
            description: data.description,
            type: "website",
            images: [
                {
                    url: urlFor(data.mainImage).width(800).height(600).format("webp").url(),
                    width: 800,
                    height: 600,
                    alt: `Article Image ${data.title}`,
                },
            ],
        },
    };
}

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