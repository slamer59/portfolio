
export default async function GalleryHeadLine({ date, title }: { date: string, title: string }) {
    return (
        <div className="w-full max-w-6xl mx-auto format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
            <div className="mb-4 lg:mb-6 not-format">
                <address className="flex items-center mb-6 not-italic">
                    <div className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                        <p className="text-base font-light text-gray-500 capitalize dark:text-gray-400">
                            <time dateTime={new Date(date).toISOString().split('T')[0]} title={new Date(date).toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}>
                                {new Date(date).toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                            </time>
                        </p>
                    </div>
                </address>
                <h1 className="inline-block text-dark dark:text-light font-bold w-full capitalize mb-4 !text-4xl !leading-tight lg:!text-3xl sm:!text-3xl xs:!text-xl xl:text-4xl sm:mb-2" contentEditable={false}>
                    {title}
                </h1>
            </div>
        </div>
    );
};

