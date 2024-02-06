import GalleryHeadLine from '@/components/GalleryHeadLine';
import { PortableComponentsDefinitions as components } from "@/components/PortableComponentsDefinitions";

import { GalleryCustom } from '@/components/GalleryCustom';
import { urlFor } from '@/sanity/lib/client';
import { getGalleryImages, getGalleryNextImages } from '@/sanity/queries/galleries';
import { PortableText } from '@portabletext/react';

const widths = [500, 1000, 1600]
const ratios = [2.2, 4, 6, 8]
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
    lqip: image.lqip,
    hotspot: image.hotspot
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
        <GalleryCustom images={images} widths={widths} ratios={ratios} galleryId={params.galleryId} />
      </article>
    </div >
  );
};
