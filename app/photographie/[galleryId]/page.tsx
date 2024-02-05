import { urlFor } from '@/sanity/lib/client';
import { getGalleryImages } from '@/sanity/queries/galleries';
import Image from 'next/image';
import Link from 'next/link';

export default async function ImageGalleryPage({
  params,
}: {
  params: { galleryId: string };
}) {

  const galleryData = await getGalleryImages(params.galleryId)
  return (
    <div>
      {galleryData.title}
      {galleryData.description}
      {galleryData.gallery.images.map((image, index) => (
        <>
          {/* Use client a extraire */}
          <Link
            key={image._ref}
            href={`/?photoId=${index}`}
            as={`/photographie/${params.galleryId}/p/${index}?photoId=${index}`}  //${image.asset._ref}`}
            // ref={image._ref === Number(lastViewedPhoto) ? lastViewedPhotoRef : null}
            // ref={image.asset._ref}
            shallow
            className="relative block w-full mb-5 after:content group cursor-zoom-in after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight"
          >
            <Image
              key={index}
              className="transition transform rounded-lg brightness-90 will-change-auto group-hover:brightness-110"
              src={urlFor(image).width(720).height(480).format("webp").url()}
              alt={image.name}
              width={720}
              height={480}
              // width={image.dimensions.width / 2}
              // height={image.dimensions.height / 2}
              placeholder="blur"
              blurDataURL={image.lqip}
              style={{ transform: "translate3d(0, 0, 0)" }}
              sizes="(max-width: 640px) 100vw,
                  (max-width: 1280px) 50vw,
                  (max-width: 1536px) 33vw,
                  25vw"
            />
          </Link>
        </>
      ))}
    </div>
  );
};
