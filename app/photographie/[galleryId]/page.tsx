
import { GalleryCustom } from "@/components/Photo/GalleryCustom";
import GalleryHeadLine from "@/components/Photo/GalleryHeadLine";
import { PortableComponentsDefinitions as components } from "@/components/PortableComponentsDefinitions";

import { urlFor } from '@/sanity/lib/client';
import { getGalleryImages, getGalleryNextImages } from '@/sanity/queries/galleries';
import { PortableText } from '@portabletext/react';
import { Metadata, ResolvingMetadata } from "next";

import { revalidatePage } from "portfolio.config";

export const revalidate = revalidatePage; // revalidate at most 30 seconds

const widths = [500, 1000, 1600]
const ratios = [2.2, 4, 6, 8]

export async function generateMetadata(
  { params, searchParams },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const galleryData = await getGalleryImages(params.galleryId)
  const galleryNextData = await getGalleryNextImages(params.galleryId);

  const ogImages = galleryNextData.gallery.images.map((image) => urlFor(image).format("webp").url()
  );
  return {
    title: galleryData.title,
    description: galleryData.description,
    openGraph: {
      title: galleryData.title,
      description: galleryData.description,
      type: "website",
      images: ogImages
    },
  }
}

// const overlayStyle: React.CSSProperties = {
//   position: "absolute",
//   top: 0,
//   left: 0,
//   width: "100%",
//   height: "100%",
//   background: "rgba(0,0,0,0.5)",
// }

export default async function ImageGalleryPage({
  params,
}: {
  params: { galleryId: string };
}) {

  const galleryData = await getGalleryImages(params.galleryId)
  const galleryNextData = await getGalleryNextImages(params.galleryId);

  const images = galleryNextData.gallery.images.map((image) => ({
    aspect_ratio: image.aspect_ratio,
    src: urlFor(image).format("webp").url(),
    // pour oeverlays mais marche pas..    alt: image.alt,
    lqip: image.lqip,
    hotspot: image.hotspot,

  }));

  return (
    <div className="container mt-8">
      <GalleryHeadLine date={galleryData.date} title={galleryData.title} />
      <article className="w-full max-w-6xl mx-auto mb-8 format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
        <div className="mt-8 prose prose-lg prose-blue dark:prose-invert prose-li:marker:text-primary dark:text-light prose-a:text-primary">
          <PortableText
            /* @ts-ignore */
            components={components}
            value={galleryData.body}
          />
        </div>
        <GalleryCustom
          images={images} widths={widths} ratios={ratios} galleryId={params.galleryId}
          lastRowBehavior="match-previous" // "match-previous", "fill" or "preserve"
          overlay={(i) =>
            <div key={i} className="z-20 flex flex-col items-center justify-center h-full">
              <div className="text-2xl font-bold text-white">{galleryNextData.gallery.images[i].title}</div>
              <div className="text-lg text-white">{galleryNextData.gallery.images[i].description}</div>
            </div>
          }
        // overlay={(i) => (
        //   <div style={overlayStyle}>
        //     {overlays[i]}
        //   </div>
        // )}
        />
      </article>
    </div >
  );
};
