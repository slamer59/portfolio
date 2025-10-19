import Link from "next/link";

interface BreadcrumbItem {
	label: string;
	href?: string;
}

interface BreadcrumbProps {
	items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
	return (
		<nav className="flex py-2" aria-label="Breadcrumb">
			<ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
				{items.map((item, index) => {
					const isLast = index === items.length - 1;
					const isFirst = index === 0;
					const key = item.href || item.label;

					if (isFirst) {
						// First item (Home) with home icon
						return (
							<li key={key} className="inline-flex items-center">
								<Link
									href={item.href || "/"}
									className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-dark dark:text-gray-400 dark:hover:text-light"
								>
									<svg
										className="w-3 h-3 me-2.5"
										aria-hidden="true"
										xmlns="http://www.w3.org/2000/svg"
										fill="currentColor"
										viewBox="0 0 20 20"
									>
										<path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
									</svg>
									{item.label}
								</Link>
							</li>
						);
					}

					if (isLast) {
						// Last item (current page) - not a link
						return (
							<li key={key} aria-current="page">
								<div className="flex items-center">
									<svg
										className="w-3 h-3 mx-1 text-gray-400 rtl:rotate-180"
										aria-hidden="true"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 6 10"
									>
										<path
											stroke="currentColor"
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="m1 9 4-4-4-4"
										/>
									</svg>
									<span className="text-sm font-medium text-gray-500 ms-1 md:ms-2 dark:text-gray-400">
										{item.label}
									</span>
								</div>
							</li>
						);
					}

					// Middle items
					return (
						<li key={key}>
							<div className="flex items-center">
								<svg
									className="block w-3 h-3 mx-1 text-gray-400 rtl:rotate-180"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 6 10"
								>
									<path
										stroke="currentColor"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="m1 9 4-4-4-4"
									/>
								</svg>
								<Link
									href={item.href || "#"}
									className="text-sm font-medium text-gray-700 ms-1 hover:text-dark md:ms-2 dark:text-gray-400 dark:hover:text-light"
								>
									{item.label}
								</Link>
							</div>
						</li>
					);
				})}
			</ol>
		</nav>
	);
}
