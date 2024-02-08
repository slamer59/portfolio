"use client";

import { urlFor } from "@/sanity/lib/client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export const FramerImage = motion(Image);

export const PhotoProject = ({ title, summary, date, img, link }) => {
    return (
        <div className="col-span-4 sm:col-span-6">
            <article
                className="relative flex flex-col items-center justify-center w-full p-6 border border-solid shadow-2xl rounded-2xl rounded-br-2xl border-dark bg-light dark:border-light dark:bg-dark xs:p-4 "
            >
                <div className="absolute  top-0 -right-3 -z-10 h-[103%] w-[102%] rounded-[2rem] rounded-br-3xl bg-dark         dark:bg-light  md:-right-2 md:w-[101%] xs:h-[102%]        xs:rounded-[1.5rem]  " />
                <Link
                    href={link}
                    // target={"_blank"}
                    className="w-full overflow-hidden rounded-lg cursor-pointer"
                >
                    <FramerImage
                        src={urlFor(img.asset).width(400).height(400).url()}
                        alt={img.title || "project image"}
                        className="w-full h-auto"
                        width={400}
                        height={400}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                        sizes="(max-width: 768px) 100vw,
                            (max-width: 1200px) 50vw,
                            33vw"
                        placeholder="blur"
                        blurDataURL={img.lqip}
                    />
                </Link>
                <div className="flex flex-col items-start justify-between w-full mt-4">
                    {/* <span className="text-xl font-medium text-primary dark:text-primaryDark lg:text-lg md:text-base">
                        ok
                    </span> */}
                    <Link
                        href={link}
                        // target={"_blank"}
                        className="underline-offset-2 hover:underline"
                    >
                        <h2 className="w-full my-2 text-3xl font-bold text-left lg:text-2xl ">
                            {title}
                        </h2>
                        <p className="text-base font-light text-gray-500 capitalize dark:text-gray-400">
                            <time dateTime={new Date(date).toISOString().split('T')[0]} title={new Date(date).toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}>
                                {new Date(date).toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                            </time>
                        </p>
                        <p className="my-2 font-medium rounded-md text-dark dark:text-light sm:text-sm">
                            {summary}
                        </p>
                    </Link>

                </div>
            </article>
        </div>
    );
};
