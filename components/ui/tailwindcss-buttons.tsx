"use client";

export const ButtonsCardPrimary = ({
    text,
    className,
    onClick,
}: {
    text: string;
    className?: string;
    onClick?: () => void;
}) => {
    return (
        <>
            <div className="absolute w-full inset-0 dark:bg-dot-white/[0.1] bg-dot-black/[0.1]" />
            <div className="relative z-40 w-96">
                <button className="relative items-center justify-between w-full p-4 py-6 my-2 transition duration-200 bg-transparent text-dark group">
                    <div className="absolute w-full h-full p-2 font-bold transition-all duration-200 border border-b-4 border-r-4 border-solid sm:flex-row rounded-xl text-dark dark:text-light first:mt-0 border-dark dark:bg-light dark:border-dark bg-light bottom-1 right-1 -z-10 group-hover:border-b-2 group-hover:border-r-2 group-hover:bottom-0 group-hover:-right-0 group-hover:text-light group-hover:bg-dark dark:border-primary dark:text-primary">
                        {text}
                    </div>
                </button>
            </div>
        </>
    );
};

export const ButtonsCardSecondary = ({
    text,
    className,
    onClick,
}: {
    text: string;
    className?: string;
    onClick?: () => void;
}) => {
    return (
        <>
            <div className="absolute inset-0  w-full dark:bg-dot-white/[0.1] bg-dot-black/[0.1]" />
            <div className="relative z-40 w-96">
                <button className="relative items-center justify-between w-full p-4 py-6 my-2 transition duration-200 bg-transparent text-light group">
                    <div className="absolute w-full h-full p-2 font-bold transition-all duration-200 border border-b-4 border-r-4 border-solid sm:flex-row rounded-xl text-light dark:text-dark first:mt-0 border-dark dark:bg-dark dark:border-light bg-primary bottom-1 right-1 -z-10 group-hover:border-b-2 group-hover:border-r-2 group-hover:bottom-0 group-hover:-right-0 group-hover:bg-light group-hover:text-primary group-hover:border-primary dark:text-light">
                        {text}
                    </div>
                </button>
            </div>
        </>
    );
};
