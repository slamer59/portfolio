"use client";

import { Check, Copy } from "lucide-react";
import { type ComponentProps, useEffect, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
	oneDark,
	oneLight,
} from "react-syntax-highlighter/dist/esm/styles/prism";

interface CodeBlockProps {
	children: string;
	className?: string;
	inline?: boolean;
}

// Extract language from className (format: language-js, language-typescript, etc.)
function getLanguageFromClassName(className?: string): string {
	if (!className) return "text";
	const match = className.match(/language-(\w+)/);
	return match ? match[1] : "text";
}

// Map common language aliases to display names
const languageDisplayNames: Record<string, string> = {
	js: "JavaScript",
	jsx: "JavaScript (JSX)",
	ts: "TypeScript",
	tsx: "TypeScript (TSX)",
	py: "Python",
	rb: "Ruby",
	go: "Go",
	rs: "Rust",
	java: "Java",
	cpp: "C++",
	c: "C",
	cs: "C#",
	php: "PHP",
	swift: "Swift",
	kt: "Kotlin",
	scala: "Scala",
	sh: "Shell",
	bash: "Bash",
	zsh: "Zsh",
	fish: "Fish",
	powershell: "PowerShell",
	sql: "SQL",
	graphql: "GraphQL",
	json: "JSON",
	yaml: "YAML",
	toml: "TOML",
	xml: "XML",
	html: "HTML",
	css: "CSS",
	scss: "SCSS",
	sass: "Sass",
	less: "Less",
	md: "Markdown",
	mdx: "MDX",
	diff: "Diff",
	docker: "Dockerfile",
	nginx: "Nginx",
	text: "Plain Text",
};

function getLanguageDisplayName(lang: string): string {
	return languageDisplayNames[lang.toLowerCase()] || lang.toUpperCase();
}

export function CodeBlock({ children, className, inline }: CodeBlockProps) {
	const [copied, setCopied] = useState(false);
	const [isDarkMode, setIsDarkMode] = useState(false);

	// Detect dark mode using system preference
	useEffect(() => {
		const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
		setIsDarkMode(mediaQuery.matches);

		const handleChange = (e: MediaQueryListEvent) => {
			setIsDarkMode(e.matches);
		};

		mediaQuery.addEventListener("change", handleChange);
		return () => mediaQuery.removeEventListener("change", handleChange);
	}, []);

	const language = getLanguageFromClassName(className);
	const code = String(children).replace(/\n$/, ""); // Remove trailing newline

	const handleCopy = async () => {
		await navigator.clipboard.writeText(code);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	// Inline code (single backticks)
	if (inline) {
		return (
			<code className="rounded-md bg-dark/10 dark:bg-light/10 px-1.5 py-0.5 font-mono text-sm text-dark dark:text-light">
				{children}
			</code>
		);
	}

	// Code block (triple backticks)
	return (
		<div className="group relative my-6 rounded-lg border border-dark/10 dark:border-light/10 overflow-hidden">
			{/* Header with language and copy button */}
			<div className="flex items-center justify-between bg-dark/5 dark:bg-light/5 px-4 py-2 border-b border-dark/10 dark:border-light/10">
				<span className="text-xs font-semibold text-dark/60 dark:text-light/60 uppercase tracking-wide">
					{getLanguageDisplayName(language)}
				</span>
				<button
					onClick={handleCopy}
					className="flex items-center gap-1.5 px-2 py-1 text-xs font-medium rounded transition-colors bg-dark/5 dark:bg-light/5 hover:bg-dark/10 dark:hover:bg-light/10 text-dark/70 dark:text-light/70"
					type="button"
					aria-label={copied ? "Copied!" : "Copy code"}
				>
					{copied ? (
						<>
							<Check className="w-3.5 h-3.5" />
							<span>Copied!</span>
						</>
					) : (
						<>
							<Copy className="w-3.5 h-3.5" />
							<span>Copy</span>
						</>
					)}
				</button>
			</div>

			{/* Code content with syntax highlighting */}
			<div className="overflow-x-auto">
				<SyntaxHighlighter
					language={language}
					style={isDarkMode ? oneDark : oneLight}
					customStyle={{
						margin: 0,
						padding: "1rem",
						background: "transparent",
						fontSize: "0.875rem",
						lineHeight: "1.5",
					}}
					codeTagProps={{
						style: {
							fontFamily:
								'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
						},
					}}
					showLineNumbers={code.split("\n").length > 5}
					lineNumberStyle={{
						minWidth: "2.5em",
						paddingRight: "1em",
						color: isDarkMode
							? "rgba(255, 255, 255, 0.3)"
							: "rgba(0, 0, 0, 0.3)",
						userSelect: "none",
					}}
				>
					{code}
				</SyntaxHighlighter>
			</div>
		</div>
	);
}

// Pre component that extracts code content and passes to CodeBlock or Mermaid
export function Pre({ children, ...props }: ComponentProps<"pre">) {
	// Extract code element and its props
	if (
		typeof children === "object" &&
		children !== null &&
		"props" in children
	) {
		const codeElement = children as {
			props: { children: string; className?: string };
		};

		const language = getLanguageFromClassName(codeElement.props.className);

		// Render Mermaid diagrams
		if (language === "mermaid") {
			// Dynamic import of Mermaid component
			const Mermaid = require("./Mermaid").Mermaid;
			return <Mermaid chart={codeElement.props.children} />;
		}

		return (
			<CodeBlock className={codeElement.props.className}>
				{codeElement.props.children}
			</CodeBlock>
		);
	}

	// Fallback for non-code pre blocks
	return (
		<pre
			className="mb-4 overflow-x-auto rounded-lg bg-dark/5 dark:bg-light/5 p-4 font-mono text-sm border border-dark/10 dark:border-light/10"
			{...props}
		>
			{children}
		</pre>
	);
}

// Inline code component
export function InlineCode({ children, ...props }: ComponentProps<"code">) {
	return (
		<code
			className="rounded-md bg-dark/10 dark:bg-light/10 px-1.5 py-0.5 font-mono text-sm text-dark dark:text-light"
			{...props}
		>
			{children}
		</code>
	);
}
