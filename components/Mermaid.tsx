"use client";

import { useEffect, useRef, useState } from "react";

interface MermaidProps {
	chart: string;
}

export function Mermaid({ chart }: MermaidProps) {
	const ref = useRef<HTMLDivElement>(null);
	const [svg, setSvg] = useState<string>("");
	const [error, setError] = useState<string>("");
	const [isDarkMode, setIsDarkMode] = useState(false);
	console.log("🚀 ~ Mermaid ~ isDarkMode:", isDarkMode)

	// Detect dark mode
	useEffect(() => {
		const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
		setIsDarkMode(mediaQuery.matches);

		const handleChange = (e: MediaQueryListEvent) => {
			setIsDarkMode(e.matches);
		};

		mediaQuery.addEventListener("change", handleChange);
		return () => mediaQuery.removeEventListener("change", handleChange);
	}, []);

	useEffect(() => {
		const renderChart = async () => {
			try {
				// Dynamic import of mermaid
				const mermaid = (await import("mermaid")).default;

				// Initialize mermaid with configuration
				mermaid.initialize({
					startOnLoad: false,
					theme: "base",
					securityLevel: "loose",
					fontFamily: "inherit",
					themeVariables: {
						// Midnight Shadows Palette
						background: "#0D0F12",       // Deep charcoal
						primaryColor: "#1A1D22",     // Node fill
						primaryTextColor: "#F5F6F7", // Main text
						secondaryColor: "#23272E",   // Secondary node fill
						tertiaryColor: "#2E323A",    // Clusters / accents
						lineColor: "#5A606C",        // Edge outlines
						border1: "#3A3F47",          // Node borders

						// Link & Accent Highlights
						nodeTextColor: "#FFFFFF",
						labelTextColor: "#E0E0E0",
						signalTextColor: "#59B2FF",  // Subtle neon blue
						loopTextColor: "#79C08B",    // Soft green loops
						actorTextColor: "#C7AFFF",   // Purple highlights

						// Notes & Special
						noteBkgColor: "#15171C",
						noteTextColor: "#E8E8E8",

					}
				});


				// Generate unique ID for this chart
				const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;

				// Render the chart
				const { svg: renderedSvg } = await mermaid.render(id, chart);
				setSvg(renderedSvg);
			} catch (err) {
				console.error("Mermaid rendering error:", err);
				setError(
					err instanceof Error ? err.message : "Failed to render diagram",
				);
			}
		};

		renderChart();
	}, [chart, isDarkMode]);

	if (error) {
		return (
			<div className="p-4 my-6 border border-red-200 rounded-lg bg-red-50 dark:bg-red-900/20 dark:border-red-800">
				<p className="text-sm text-red-800 dark:text-red-200">
					Failed to render Mermaid diagram: {error}
				</p>
				<pre className="mt-2 overflow-x-auto text-xs">
					<code>{chart}</code>
				</pre>
			</div>
		);
	}

	if (!svg) {
		return (
			<div className="flex items-center justify-center p-8 my-6 rounded-lg bg-gray-50 dark:bg-gray-900">
				<p className="text-gray-500 dark:text-gray-400">Loading diagram...</p>
			</div>
		);
	}

	return (
		<div
			ref={ref}
			className="flex items-center justify-center my-6 overflow-x-auto"
			// biome-ignore lint/security/noDangerouslySetInnerHtml: Mermaid generates safe SVG
			dangerouslySetInnerHTML={{ __html: svg }}
		/>
	);
}
