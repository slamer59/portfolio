"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const MotionLink = motion.create(Link);

const Logo = ({
	className = "flex flex-col items-center justify-center mt-2",
}) => {
	return (
		<div className={className}>
			<MotionLink
				href="/"
				className="flex items-center justify-center w-20 h-20 text-2xl font-bold text-white rounded-full bg-dark dark:border-2 dark:border-solid dark:border-light"
				whileHover={{
					backgroundColor: [
						"#080A40",
						"#59082E",
						"#010326",
						"#D9CEB0",
						"#F2935C",
						"#D95D41",
						"#000",
						"#FFC745",
					],
					transition: { duration: 1, repeat: Number.POSITIVE_INFINITY },
				}}
			>
				TP
			</MotionLink>
		</div>
	);
};

export default Logo;
