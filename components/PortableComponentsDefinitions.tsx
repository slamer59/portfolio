import { slugToText } from "@/lib/slugToText";
import { urlFor } from "@/sanity/lib/client";
import { getImageDimensions } from "@sanity/asset-utils";
import Image from "next/image";

export const PortableComponentsDefinitions = {
    types: {
        image: ({ value }) => {
            const { width, height } = getImageDimensions(value);
            return <>
                <figure className="w-full max-w-6xl mx-auto mt-8 mb-6 text-xl text-primary dark:text-light">
                    <Image
                        src={urlFor(value)
                            .fit("max")
                            .auto("format")
                            .format("webp").url()}
                        width={width}
                        height={height}
                        alt={value.alt || " "}
                        loading="lazy"
                        className="max-w-2xl mx-auto mt-8 border rounded-lg w-fit"
                        style={{
                            // Display alongside text if image appears inside a block text span
                            // display: isInline ? "inline-block" : "block",
                            // Avoid jumping around with aspect-ratio CSS property
                            // aspectRatio: width / height,
                        }} />
                    <figcaption className="text-sm text-center text-gray-600 dark:text-gray-400">
                        {slugToText(value.alt)}
                    </figcaption>
                </figure>
            </>;
        },

        code: props => (
            <pre data-language={props.node.language}>
                <code>{props.node.code}</code>
            </pre>
        ),
    },
    block: {
        // Ex. 1: customizing common block types
        h1: ({ children }) => <h2 className="mt-4 mb-4 text-4xl font-extrabold text-primary dark:text-light sm:text-4xl">{children}</h2>,
        h2: ({ children }) => <h3 className="mt-2 mb-2 text-2xl text- sm:text-2xl">{children}</h3>,
        h3: ({ children }) => <h4 className="mt-2 mb-2 text-xl text-primary dark:text-light sm:text-xl">{children}</h4>,
        h4: ({ children }) => <h5 className="mt-2 mb-2 text-lg text-primary dark:text-light sm:text-lg">{children}</h5>,
        h5: ({ children }) => <h6 className="mt-2 mb-2 text-lg text-primary dark:text-light sm:text-lg">{children}</h6>,
        h6: ({ children }) => <h6 className="mt-2 mb-2 text-lg text-primary dark:text-light sm:text-lg">{children}</h6>,
        // Ex. 2: adding a new block type
        customBlock: ({ children }) => <div className="custom-block">{children}</div>,
        // Ex. 3: wrapping a block type
        blockquote: ({ children }) => <blockquote className="flex items-center justify-center mx-auto mt-10 mb-10 ml-2 mr-2 text-center">
            <div className="relative z-10">
                <p className="text-xl font-semibold text-primary dark:text-light">
                    <em className="relative">
                        <svg className="absolute w-8 h-8 text-primary dark:text-light -top-8 -start-8 size-8" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path d="M7.39762 10.3C7.39762 11.0733 7.14888 11.7 6.6514 12.18C6.15392 12.6333 5.52552 12.86 4.76621 12.86C3.84979 12.86 3.09047 12.5533 2.48825 11.94C1.91222 11.3266 1.62421 10.4467 1.62421 9.29999C1.62421 8.07332 1.96459 6.87332 2.64535 5.69999C3.35231 4.49999 4.33418 3.55332 5.59098 2.85999L6.4943 4.25999C5.81354 4.73999 5.26369 5.27332 4.84476 5.85999C4.45201 6.44666 4.19017 7.12666 4.05926 7.89999C4.29491 7.79332 4.56983 7.73999 4.88403 7.73999C5.61716 7.73999 6.21938 7.97999 6.69067 8.45999C7.16197 8.93999 7.39762 9.55333 7.39762 10.3ZM14.6242 10.3C14.6242 11.0733 14.3755 11.7 13.878 12.18C13.3805 12.6333 12.7521 12.86 11.9928 12.86C11.0764 12.86 10.3171 12.5533 9.71484 11.94C9.13881 11.3266 8.85079 10.4467 8.85079 9.29999C8.85079 8.07332 9.19117 6.87332 9.87194 5.69999C10.5789 4.49999 11.5608 3.55332 12.8176 2.85999L13.7209 4.25999C13.0401 4.73999 12.4903 5.27332 12.0713 5.85999C11.6786 6.44666 11.4168 7.12666 11.2858 7.89999C11.5215 7.79332 11.7964 7.73999 12.1106 7.73999C12.8437 7.73999 13.446 7.97999 13.9173 8.45999C14.3886 8.93999 14.6242 9.55333 14.6242 10.3Z" fill="currentColor" />
                        </svg>
                        <span className="relative z-10">{children}</span>
                    </em>
                </p>
            </div>
        </blockquote>,
    },
    list: {
        bullet: ({ children }: any) => (
            <ul className="my-5 ml-10 list-disc tracking-[0.005em] text-base ">
                {children}
            </ul>
        ),
        number: ({ children }: any) => (
            <ol className="my-5 ml-10 list-decimal tracking-[0.005em] text-base">
                {children}
            </ol>
        ),
    },
    marks: {
        center: props => (
            <div className="text-center">{props.children}</div>
        ),
        highlight: props => (
            <span className="font-semibold text-primary">
                {props.children}
            </span>
        ),
        link: props => (
            <a href={props?.value?.href} target="_blank" rel="noopener">
                {props.children}
            </a>
        ),
        strong: ({ children }) => <strong className="font-semibold text-primary dark:text-light">{children}</strong>,

    }
};
