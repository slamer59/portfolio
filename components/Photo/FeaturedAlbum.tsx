"use client";

import { urlFor } from "@/sanity/lib/client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export const FramerImage = motion(Image);

export const FeaturedAlbumProject = ({ title, summary, date, img, link }) => {
    return (
        <div className="col-span-12">
            <article
                className="relative flex items-center justify-between w-full p-12 border border-solid shadow-2xl rounded-3xl rounded-br-2xl border-dark bg-light dark:border-light dark:bg-dark lg:flex-col lg:p-8 xs:rounded-2xl xs:rounded-br-3xl xs:p-4 "
            >
                <div
                    className="absolute  top-0 -right-3 -z-10 h-[103%] w-[101%] rounded-[2.5rem] rounded-br-3xl bg-dark
         dark:bg-light  xs:-right-2 xs:h-[102%] xs:w-[100%]
        xs:rounded-[1.5rem] "/>

                <Link
                    href={link}
                    // target={"_blank"}
                    className="w-1/2 overflow-hidden rounded-lg cursor-pointer lg:w-full"
                >
                    <FramerImage
                        src={urlFor(img.asset).url()}
                        className="w-full h-auto"
                        alt={img.title || "featured project image"}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                        width={800}
                        height={800}
                        sizes="(max-width: 768px) 100vw,
                            (max-width: 1200px) 50vw,
                        33vw"
                        placeholder="blur"
                        blurDataURL={img.lqip}
                        priority
                    />
                </Link>
                <div className="flex flex-col items-start justify-between w-1/2 pl-6 lg:w-full lg:pl-0 lg:pt-6">
                    <span className="text-xl font-medium text-primary dark:text-primaryDark xs:text-base">
                        Projet Sélectionné
                    </span>
                    <Link
                        href={link}
                        // target={"_blank"}
                        className="underline-offset-2 hover:underline"
                    >
                        <h2 className="w-full my-2 text-4xl font-bold text-left lg:text-3xl xs:text-2xl">
                            {title}
                        </h2>
                        <p className="text-base font-light text-gray-500 dark:text-gray-400">
                            <time dateTime={new Date(date).toISOString().split('T')[0]} title={new Date(date).toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}>
                                {new Date(date).toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                            </time>
                        </p>
                        <p className="my-2 font-medium rounded-md text-dark dark:text-light sm:text-sm">
                            {summary}
                        </p>
                    </Link>
                    {/* <div className="flex items-center mt-2">
                        <Link
                            href={link}
                            // target={"_blank"}
                            className="p-2 px-6 ml-4 text-lg font-semibold rounded-lg bg-dark text-light dark:bg-light dark:text-dark sm:px-4 sm:text-base "
                            aria-label="Crypto Screener Application"
                        >
                            Visit Project
                        </Link>
                    </div> */}
                </div>
            </article>
        </div>
    );
};
