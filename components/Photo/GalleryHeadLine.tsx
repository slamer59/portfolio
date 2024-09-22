import Link from "next/link"

export default async function GalleryHeadLine({ date, title }: { date: string, title: string }) {
    return <>
        <div className="w-full max-w-6xl mx-auto format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">

            <div className="mb-4 lg:mb-6 not-format">
                <nav className="flex py-2" aria-label="Breadcrumb">
                    <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                        <li className="inline-flex items-center">
                            <Link href="/" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-dark dark:text-gray-400 dark:hover:text-light">
                                <svg className="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                                </svg>
                                Accueil
                            </Link>
                        </li>
                        <li>
                            <div className="flex items-center">
                                <svg className="block w-3 h-3 mx-1 text-gray-400 rtl:rotate-180 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                                </svg>
                                <Link href="/photographie" className="text-sm font-medium text-gray-700 ms-1 hover:text-dark md:ms-2 dark:text-gray-400 dark:hover:text-light ">Photographie</Link>
                            </div>
                        </li>
                        <li aria-current="page">
                            <div className="flex items-center">
                                <svg className="w-3 h-3 mx-1 text-gray-400 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                                </svg>
                                <span className="text-sm font-medium text-gray-500 ms-1 md:ms-2 dark:text-gray-400">{title}</span>
                            </div>
                        </li>
                    </ol>
                </nav>
                <h1 className="inline-block text-dark dark:text-light font-bold w-full mb-4 !text-4xl !leading-tight lg:!text-3xl sm:!text-3xl xs:!text-xl xl:text-4xl sm:mb-2" contentEditable={false}>
                    {title}
                </h1>
                <address className="flex items-center mb-6 not-italic">
                    <div className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-light">
                        <p className="text-base font-light text-gray-500 dark:text-gray-400">
                            <time dateTime={new Date(date).toISOString().split('T')[0]} title={new Date(date).toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}>
                                {new Date(date).toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                            </time>
                        </p>
                    </div>
                </address>
            </div>
        </div>
    </>
};

