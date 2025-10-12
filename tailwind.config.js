/** @type {import('tailwindcss').Config} */
const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
	content: [
		"./app/**/*.{js,ts,jsx,tsx}",
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
		// Or if using `src` directory:
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	darkMode: "class",
	theme: {
		extend: {
			fontFamily: {
				mont: ["var(--font-mont)", ...fontFamily.sans],
			},
			container: {
				center: true,
				padding: {
					DEFAULT: "1rem",
					sm: "2rem",
					lg: "3rem",
					xl: "4rem",
					"2xl": "6rem",
				},
			},
			colors: {
				// https://color.adobe.com/fr/create/image
				dark: "#080A40",
				light: "#D9D4BA",
				primary: "#59082E", // Wine red - for frameworks
				primaryDark: "#FF8C00", // Orange - for dark mode links
				secondary: "#1E5F74", // Teal blue - for CMS/databases
				accent: "#8B5A00", // Amber brown - for languages
			},
			animation: {
				"spin-slow": "spin 8s linear infinite",
				shimmer: "shimmer 2s linear infinite",
				scroll:
					"scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",
			},
			keyframes: {
				shimmer: {
					from: {
						backgroundPosition: "0 0",
					},
					to: {
						backgroundPosition: "-200% 0",
					},
				},
				scroll: {
					to: {
						transform: "translate(calc(-50% - 0.5rem))",
					},
				},
			},
			backgroundImage: {
				circularLight:
					"repeating-radial-gradient(rgba(0,0,0,0.4) 2px,#f5f5f5 5px,#f5f5f5 100px)",
				circularDark:
					"repeating-radial-gradient(rgba(255,255,255,0.5) 2px,#1b1b1b 8px,#1b1b1b 100px)",
				circularLightLg:
					"repeating-radial-gradient(rgba(0,0,0,0.4) 2px,#f5f5f5 5px,#f5f5f5 80px)",

				circularDarkLg:
					"repeating-radial-gradient(rgba(255,255,255,0.5) 2px,#1b1b1b 8px,#1b1b1b 80px)",
				circularLightMd:
					"repeating-radial-gradient(rgba(0,0,0,0.4) 2px,#f5f5f5 5px,#f5f5f5 60px)",

				circularDarkMd:
					"repeating-radial-gradient(rgba(255,255,255,0.5) 2px,#1b1b1b 8px,#1b1b1b 60px)",

				circularLightSm:
					"repeating-radial-gradient(rgba(0,0,0,0.4) 2px,#f5f5f5 5px,#f5f5f5 40px)",

				circularDarkSm:
					"repeating-radial-gradient(rgba(255,255,255,0.5) 2px,#1b1b1b 8px,#1b1b1b 40px)",
			},
			boxShadow: {
				"3xl": "0 15px 15px 1px rgba(80,230,217, 0.4)",
			},
		},
		screens: {
			"2xl": { max: "1535px" },
			// => @media (max-width: 1535px) { ... }

			xl: { max: "1279px" },
			// => @media (max-width: 1279px) { ... }

			lg: { max: "1023px" },
			// => @media (max-width: 1023px) { ... }

			md: { max: "767px" },
			// => @media (max-width: 767px) { ... }

			sm: { max: "639px" },
			// => @media (max-width: 639px) { ... }

			xs: { max: "479px" },
			// => @media (max-width: 479px) { ... }
		},
	},
	plugins: [
		({ addVariant }) => {
			addVariant("child", "& > *");
			addVariant("child-hover", "& > *:hover");
		},
	],
};
