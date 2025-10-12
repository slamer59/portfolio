"use client";

import { useEffect, useRef } from "react";

interface ViewTrackerProps {
	slug: string;
}

export function ViewTracker({ slug }: ViewTrackerProps) {
	const hasTracked = useRef(false);

	useEffect(() => {
		// Only track once per page load
		if (hasTracked.current) return;

		const trackView = async () => {
			try {
				await fetch(`/api/projects/${slug}/view`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
				});
				hasTracked.current = true;
			} catch (error) {
				console.error("Failed to track view:", error);
			}
		};

		// Track view after a short delay to ensure it's a real visit
		const timer = setTimeout(trackView, 2000);

		return () => clearTimeout(timer);
	}, [slug]);

	// This component doesn't render anything
	return null;
}
