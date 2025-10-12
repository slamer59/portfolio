"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { GithubIcon } from "../Icons";

export const FramerImage = motion.create(Image);

export const DevProject = ({
	title,
	type,
	summary,
	date,
	img,
	link,
	github,
	technologies,
}) => {
	return (
		<div className="col-span-4 sm:col-span-12">
			<article className="relative flex flex-col items-center justify-center w-full p-6 border border-solid shadow-2xl rounded-2xl rounded-br-2xl border-dark bg-light dark:border-light dark:bg-dark xs:p-4 ">
				<div className="absolute top-0 -right-3 -z-10 h-[103%] w-[102%] rounded-[2rem] rounded-br-3xl bg-dark dark:bg-light  md:-right-2 md:w-[101%] xs:h-[102%] xs:rounded-[1.5rem]" />
				{link ? (
					<Link
						href={link}
						// target={"_blank"}
						className="w-full overflow-hidden rounded-lg cursor-pointer"
					>
						<FramerImage
							src={img || "/images/projects/project.png"}
							alt={img.title || "project image"}
							className="w-full h-auto rounded-2xl"
							width={400}
							height={400}
							whileHover={{ scale: 1.05 }}
							transition={{ duration: 0.2 }}
							sizes="(max-width: 768px) 100vw,
                            (max-width: 1200px) 50vw,
                            33vw"
							placeholder="blur"
							blurDataURL="data:image/jpeg;base64,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"
						/>
					</Link>
				) : (
					<>
						<FramerImage
							src={img || "/images/projects/project.png"}
							alt={img.title || "project image"}
							className="w-full h-auto rounded-2xl"
							width={400}
							height={400}
							whileHover={{ scale: 1.05 }}
							transition={{ duration: 0.2 }}
							sizes="(max-width: 768px) 100vw,
                            (max-width: 1200px) 50vw,
                            33vw"
							placeholder="blur"
							blurDataURL="data:image/jpeg;base64,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"
						/>
					</>
				)}
				<div className="flex flex-col justify-between w-full mt-4">
					<span className="text-lg font-medium text-primary dark:text-primaryDark xs:text-base">
						{type}
					</span>
					<h2 className="w-full my-2 text-3xl font-bold text-left lg:text-2xl ">
						{title}
					</h2>
					<p className="text-base font-light text-gray-500 dark:text-gray-400">
						<time
							dateTime={new Date(date).toISOString().split("T")[0]}
							title={new Date(date).toLocaleDateString("fr-FR", {
								weekday: "long",
								year: "numeric",
								month: "long",
								day: "numeric",
							})}
						>
							{new Date(date).toLocaleDateString("fr-FR", {
								weekday: "long",
								year: "numeric",
								month: "long",
								day: "numeric",
							})}
						</time>
					</p>
					<p className="my-2 font-medium rounded-md text-dark dark:text-light sm:text-sm">
						{summary}
					</p>
					<div className="flex items-center justify-between mt-2">
						{github && (
							<Link
								href={github}
								// target={"_blank"}
								className="w-10"
								aria-label="Crypto Screener Application github link"
							>
								<GithubIcon className={""} />
							</Link>
						)}
						{link && (
							<Link
								href={link}
								// target={"_blank"}
								className="p-2 px-6 ml-4 text-lg font-semibold rounded-lg bg-dark text-light dark:bg-light dark:text-dark sm:px-4 sm:text-base "
								aria-label="Crypto Screener Application"
							>
								Visiter le Projet
							</Link>
						)}
					</div>
					<div className="flex items-center mt-4">
						<div className="w-36">Technologies :</div>
						<div className="grid justify-between w-2/3 grid-cols-3 gap-4">
							{technologies.map((tech: string, index: number) => (
								<Image
									key={index}
									src={`/images/techs/${tech}.svg`}
									alt={tech}
									width={40}
									height={40}
									className="p-2 border-2 rounded-full border-primaryDark dark:bg-light"
								/>
							))}
						</div>
					</div>
				</div>
			</article>
		</div>
	);
};
