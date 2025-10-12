import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

import Script from "next/script";
import ClientLayout from "./ClientLayout";

import type { Metadata } from "next";

export const metadata: Metadata = {
	title: {
		template: "%s | Portfolio de Thomas PEDOT",
		default: "Portfolio de Thomas PEDOT",
	},
	description:
		"Bienvenue sur mon portfolio, je suis Thomas PEDOT, photographe, docteur en énergétique et développeur de solutions logicels.",
	metadataBase: new URL("https://thomas.pedot.com"),
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="fr" suppressHydrationWarning>
			<body>
				<Script id="theme-switcher" strategy="beforeInteractive">
					{`
 if (
  localStorage.getItem("theme") === "dark" ||
  (!("theme" in localStorage) &&
    window.matchMedia("(prefers-color-scheme: dark)").matches)
) {
  document.documentElement.classList.add("dark");
} else {
  document.documentElement.classList.remove("dark");
}
  `}
				</Script>
				<ClientLayout>{children}</ClientLayout>
				<Analytics />
				<SpeedInsights />
			</body>
		</html>
	);
}
