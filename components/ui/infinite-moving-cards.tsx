"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { useEffect, useState } from "react";
export const InfiniteMovingCards = ({
	items,
	direction = "left",
	speed = "fast",
	pauseOnHover = true,
	className,
}: {
	items: {
		src: string;
		alt: string;
	}[];
	direction?: "left" | "right";
	speed?: "fast" | "normal" | "slow";
	pauseOnHover?: boolean;
	className?: string;
}) => {
	const containerRef = React.useRef<HTMLDivElement>(null);
	const scrollerRef = React.useRef<HTMLUListElement>(null);

	const [start, setStart] = useState(false);

	const getDirection = () => {
		if (containerRef.current) {
			if (direction === "left") {
				containerRef.current.style.setProperty(
					"--animation-direction",
					"forwards",
				);
			} else {
				containerRef.current.style.setProperty(
					"--animation-direction",
					"reverse",
				);
			}
		}
	};

	const getSpeed = () => {
		if (containerRef.current) {
			if (speed === "fast") {
				containerRef.current.style.setProperty("--animation-duration", "20s");
			} else if (speed === "normal") {
				containerRef.current.style.setProperty("--animation-duration", "40s");
			} else {
				containerRef.current.style.setProperty("--animation-duration", "80s");
			}
		}
	};

	function addAnimation() {
		if (containerRef.current && scrollerRef.current) {
			const scrollerContent = Array.from(scrollerRef.current.children);

			scrollerContent.forEach((item) => {
				const duplicatedItem = item.cloneNode(true);
				if (scrollerRef.current) {
					scrollerRef.current.appendChild(duplicatedItem);
				}
			});

			getDirection();
			getSpeed();
			setStart(true);
		}
	}

	useEffect(() => {
		addAnimation();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<>
			<div
				ref={containerRef}
				className={cn(
					"scroller relative mx-2 z-20 overflow-hidden w-full rounded-2xl bg-black dark:text-light",
					className,
				)}
			>
				<Image
					className="w-full h-4"
					src={"/images/profile/roll.jpg"}
					alt={"placeholder"}
					width="10000"
					height="100"
				/>
				<ul
					ref={scrollerRef}
					className={cn(
						" flex min-w-full shrink-0 gap-4 w-max flex-nowrap",
						start && "animate-scroll ",
						pauseOnHover && "hover:[animation-play-state:paused]",
					)}
				>
					{items.map((item, idx) => (
						<li
							className="relative max-w-full rounded-2xl bg-light"
							key={item.alt}
						>
							<Image
								src={item?.src || "/images/profile/717A0941.png"}
								alt={item?.alt || "placeholder"}
								width="300"
								height="100"
							/>
						</li>
					))}
				</ul>
				<Image
					className="w-full h-4"
					src={"/images/profile/roll.jpg"}
					alt={"placeholder"}
					width="10000"
					height="400"
				/>
			</div>
		</>
	);
};
