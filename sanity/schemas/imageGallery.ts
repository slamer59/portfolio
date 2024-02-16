import { defineField, defineType } from "sanity";

const ImageField = defineField({
    name: "image",
    type: "image",
    title: "Image",
    options: {
        hotspot: true, // <-- Defaults to false
        metadata: ["blurhash", "lqip", "palette"],
    },
    fields: [
        defineField({
            name: "alt",
            type: "string",
            title: "Alternative text",
        }),
    ],
});

// const DisplayField = defineField({
//     name: "display",
//     type: "string",
//     title: "Display as",
//     description: "How should we display these images?",
//     options: {
//         list: [
//             { title: "Stacked on top of each other", value: "stacked" },
//             { title: "In-line", value: "inline" },
//             { title: "Carousel", value: "carousel" },
//         ],
//         layout: "radio",
//     },
// });

// const ZoomField = defineField({
//     name: "zoom",
//     type: "boolean",
//     title: "Zoom enabled",
//     description: "Should we enable zooming of images?",
// });

export default defineType({
    name: "gallery",
    type: "document",
    title: "Gallery",
    fields: [
        {
            name: 'article',
            title: 'Article',
            type: 'reference',
            to: [{ type: 'article' }],
        },
        defineField({
            name: "images",
            type: "array",
            title: "Images",
            of: [ImageField],
            options: {
                layout: "grid",
            },
        }),
        // DisplayField,
        // ZoomField,
    ],
    preview: {
        select: {
            article: "article.title",
            images: "images",
            imageAsset: "images.0.asset",
        },
        prepare(selection) {
            const { article, images, imageAsset } = selection;

            return {
                title: `${article} - ${Object.keys(images).length || 0} images`,
                subtitle: `Alt text: ${article}`,
                media: imageAsset,
            };
        },
    },
});