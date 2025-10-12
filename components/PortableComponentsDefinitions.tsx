import { slugToText } from "@/lib/slugToText";
import { urlFor } from "@/sanity/lib/client";
import type { PortableTextReactComponents } from "@portabletext/react";
import { getImageDimensions } from "@sanity/asset-utils";
import Image from "next/image";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

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
					<div className="my-8 rounded-xl overflow-hidden shadow-lg">
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
		},
		block: {
			h1: ({ children }) => (
				<h2 className="text-4xl font-bold mt-16 mb-6 text-dark dark:text-light">
					{children}
				</h2>
			),
			h2: ({ children }) => (
				<h3 className="text-3xl font-bold mt-12 mb-5 text-dark dark:text-light">
					{children}
				</h3>
			),
			h3: ({ children }) => (
				<h4 className="text-2xl font-semibold mt-10 mb-4 text-dark dark:text-light">
					{children}
				</h4>
			),
			h4: ({ children }) => (
				<h5 className="text-xl font-semibold mt-8 mb-3 text-dark dark:text-light">
					{children}
				</h5>
			),
			normal: ({ children }) => (
				<p className="text-lg leading-relaxed mb-6 text-dark dark:text-light">
					{children}
				</p>
			),
			blockquote: ({ children }) => (
				<blockquote className="border-l-4 border-primary pl-6 my-8 italic text-lg text-dark/80 dark:text-light/80">
					{children}
				</blockquote>
			),
		},
		list: {
			bullet: ({ children }) => (
				<ul className="my-6 ml-6 space-y-3 text-lg list-disc marker:text-primary text-dark dark:text-light">
					{children}
				</ul>
			),
			number: ({ children }) => (
				<ol className="my-6 ml-6 space-y-3 text-lg list-decimal marker:text-primary text-dark dark:text-light">
					{children}
				</ol>
			),
		},
		marks: {
			strong: ({ children }) => (
				<strong className="font-semibold text-primary dark:text-light">
					{children}
				</strong>
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
					rel="noopener noreferrer"
					className="text-primary underline hover:opacity-80 transition-opacity"
				>
					{children}
				</a>
			),
		},
	};
