"use client";

import { urlFor } from "@/sanity/lib/client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export const FramerImage = motion.create(Image);
export const FeaturedArticle = ({ img, title, time, summary, link }) => {
	return (
		<li className="relative w-full col-span-1 p-4 border border-solid bg-light border-dark rounded-2xl dark:bg-dark dark:border-light">
			<div
				className="absolute  top-0 -right-3 w-[102%] h-[103%] rounded-[2rem] rounded-br-3xl bg-dark 
        -z-10  "
			/>
			<Link
				href={link}
				// target={"_blank"}
				className="inline-block w-full overflow-hidden rounded-lg"
			>
				<FramerImage
					src={urlFor(img).width(710).height(210).format("webp").url()}
					alt={title}
					className="w-full h-auto"
					whileHover={{ scale: 1.05 }}
					transition={{ duration: 0.2 }}
					sizes="100vw"
					width={710}
					height={210}
					priority
					placeholder="blur"
					blurDataURL={img.lqip}
				/>
			</Link>

			<Link
				href={link}
				// target={"_blank"}
			>
				<h2 className="my-2 mt-4 text-2xl font-bold hover:underline xs:text-lg">
					{title}
				</h2>
			</Link>
			<p className="mb-2 text-sm">{summary}</p>
			<span className="font-semibold text-primary dark:text-primaryDark">
				{time}
			</span>
		</li>
	);
};
