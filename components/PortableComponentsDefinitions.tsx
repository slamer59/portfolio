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
        blockquote: ({ children }) => <blockquote className="italic">{children}</blockquote>,
    },
    marks: {
        center: props => (
            <div className="text-center">{props.children}</div>
        ),
        highlight: props => (
            <span className="font-bold text-brand-primary">
                {props.children}
            </span>
        ),
        link: props => (
            <a href={props?.value?.href} target="_blank" rel="noopener">
                {props.children}
            </a>
        )
    }
};
