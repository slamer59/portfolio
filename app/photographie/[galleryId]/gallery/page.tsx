import { urlFor } from "@/sanity/lib/client";
import { getGalleryImageByIndex, getGalleryImages } from "@/sanity/queries/galleries";
import { Metadata, ResolvingMetadata } from "next";
import GalleryPage from "./GalleryPage";

export async function generateMetadata(
  { params, searchParams },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const photoId = searchParams.photoId ? Number(searchParams.photoId) : 0;
  const galleryData = await getGalleryImages(params.galleryId);
  const galleryImageData = await getGalleryImageByIndex(params.galleryId, photoId);
  const ogImages = [urlFor(galleryImageData.image[0]).format("webp").url()];

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

export default async function ImageGalleryPage({
  params,
  searchParams,
}: {
  params: { galleryId: string },
  searchParams: { photoId?: string }
}) {
  const photoId = searchParams.photoId ? Number(searchParams.photoId) : 0;
  const galleryImageData = await getGalleryImageByIndex(params.galleryId, photoId);
  const galleryData = await getGalleryImages(params.galleryId);

  return (
    <>
      <div className="mx-auto max-w-[1960px] p-4">
        <GalleryPage
          galleryData={galleryData}
          galleryImageData={galleryImageData}
          photoId={searchParams.photoId || '0'}
        />
      </div>
    </>
  );
}
