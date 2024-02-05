import { urlFor } from "@/sanity/lib/client";
import Image from "next/image";

export default async function ArticleHead({ author, date, title }: { author: { name: string, image: any, postion: string }, date: string, title: string }) {
    return (
        <div className="w-full max-w-6xl mx-auto format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
            <div className="mb-4 lg:mb-6 not-format">
                <address className="flex items-center mb-6 not-italic">
                    <div className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                        {author.image && (
                            <Image
                                src={urlFor(author.image).size(2 * 128, 2 * 128).format("webp").url()}
                                alt={author.name}
                                width={64}
                                height={64}
                                className="w-16 h-16 mr-4 rounded-full"
                            />
                        )}
                        <div>
                            <a href="#" rel="author" className="text-xl font-bold text-primary dark:text-white">{author.name}</a>
                            <p className="text-base font-light text-gray-500 dark:text-gray-400">{author.postion}</p>
                            <p className="text-base font-light text-gray-500 dark:text-gray-400">
                                <time dateTime={new Date(date).toISOString().split('T')[0]} title={new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}>
                                    {new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                                </time>
                            </p>
                        </div>
                    </div>
                </address>
                <h1 className="inline-block text-dark dark:text-light font-bold w-full capitalize mb-4 !text-4xl !leading-tight lg:!text-3xl sm:!text-3xl xs:!text-xl sm:mb-8 xl:text-4xl" contentEditable={false}>
                    {title}
                </h1>
            </div>
        </div>
    );
};

