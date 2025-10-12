import { slugToText } from "@/lib/slugToText";
import { urlFor } from "@/sanity/lib/client";
import type { PortableTextReactComponents } from "@portabletext/react";
import { getImageDimensions } from "@sanity/asset-utils";
import Image from "next/image";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { RepoLink } from "./RepoLink";
import { StyledBlockquote } from "./StyledBlockquote";

export const PortableComponentsDefinitions: Partial<PortableTextReactComponents> =
	{
		types: {
			image: ({ value }) => {
				const { width, height } = getImageDimensions(value);
				return (
					<figure className="w-full max-w-6xl mx-auto mt-8 mb-6 text-xl text-primary dark:text-light">
						<Image
							src={urlFor(value).fit("max").auto("format").format("webp").url()}
							width={width}
							height={height}
							alt={value.alt || " "}
							loading="lazy"
							className="max-w-2xl mx-auto mt-8 border rounded-lg w-fit"
						/>
						<figcaption className="text-sm text-center text-gray-600 dark:text-gray-400">
							{slugToText(value.alt)}
						</figcaption>
					</figure>
				);
			},
			codeBlock: ({ value }) => {
				const language = value.language || "javascript";
				return (
					<div className="my-8 overflow-hidden shadow-lg rounded-xl">
						<SyntaxHighlighter
							language={language}
							style={vscDarkPlus}
							customStyle={{
								margin: 0,
								padding: "1.5rem",
								fontSize: "0.95rem",
								lineHeight: "1.6",
								borderRadius: "0.75rem",
							}}
							showLineNumbers={false}
						>
							{value.code}
						</SyntaxHighlighter>
					</div>
				);
			},
			repoLink: ({ value }) => {
				return (
					<div className="flex justify-center">
						<RepoLink url={value.url} platform={value.platform}>
							{value.text}
						</RepoLink>
					</div>
				);
			},
			table: ({ value }) => {
				const { rows, caption } = value;
				return (
					<figure className="my-8 overflow-hidden rounded-xl shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-2px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_6px_-1px_rgba(255,255,255,0.15),0_2px_4px_-2px_rgba(255,255,255,0.1)]">
						<table className="w-full border-collapse">
							<tbody>
								{rows?.map((row: any, rowIndex: number) => {
									const RowTag = row.isHeader ? "thead" : "tbody";
									const CellTag = row.isHeader ? "th" : "td";
									const isLastRow = rowIndex === rows.length - 1;
									return (
										<tr
											key={rowIndex}
											className={
												row.isHeader
													? "bg-primary dark:bg-light/25"
													: rowIndex % 2 === 0
														? "bg-dark/5 dark:bg-light/5"
														: ""
											}
										>
											{row.cells?.map((cell: string, cellIndex: number) => (
												<CellTag
													key={cellIndex}
													className={`px-4 py-3 text-left border-b ${
														isLastRow
															? "border-b-0"
															: "border-b-dark/10 dark:border-b-light/10"
													} ${
														row.isHeader
															? "font-semibold text-light"
															: "text-dark dark:text-light"
													}`}
												>
													{cell}
												</CellTag>
											))}
										</tr>
									);
								})}
							</tbody>
						</table>
						{caption && (
							<figcaption className="mt-4 text-sm text-center text-dark/60 dark:text-light/60">
								{caption}
							</figcaption>
						)}
					</figure>
				);
			},
		},
		block: {
			h1: ({ children }) => (
				<h1 className="mt-16 mb-6 text-4xl font-bold text-dark dark:text-light">
					{children}
				</h1>
			),
			h2: ({ children }) => (
				<h2 className="mt-12 mb-5 text-3xl font-bold text-dark dark:text-light">
					{children}
				</h2>
			),
			h3: ({ children }) => (
				<h3 className="mt-10 mb-4 text-2xl font-semibold text-dark dark:text-light">
					{children}
				</h3>
			),
			h4: ({ children }) => (
				<h4 className="mt-8 mb-3 text-xl font-semibold text-dark dark:text-light">
					{children}
				</h4>
			),
			normal: ({ children }) => (
				<p className="mb-6 text-lg leading-relaxed text-dark dark:text-light">
					{children}
				</p>
			),
			blockquote: ({ children }) => (
				<StyledBlockquote>{children}</StyledBlockquote>
			),
		},
		list: {
			bullet: ({ children }) => (
				<ul className="my-6 ml-6 space-y-3 text-lg list-disc marker:text-primary dark:marker:text-light text-dark dark:text-light">
					{children}
				</ul>
			),
			number: ({ children }) => (
				<ol className="my-6 ml-6 space-y-3 text-lg list-decimal marker:text-primary dark:marker:text-light text-dark dark:text-light">
					{children}
				</ol>
			),
		},
		marks: {
			strong: ({ children }) => (
				<strong className="font-semibold">{children}</strong>
			),
			em: ({ children }) => <em className="italic">{children}</em>,
			code: ({ children }) => (
				<code className="px-2 py-0.5 rounded bg-dark/10 dark:bg-light/10 text-primary font-mono text-base">
					{children}
				</code>
			),
			link: ({ children, value }) => (
				<a
					href={value?.href}
					target="_blank"
					rel="noopener noreferrer nofollow"
					className="font-medium transition-opacity text-primary dark:text-primaryDark hover:opacity-80"
				>
					{children}
				</a>
			),
		},
	};
