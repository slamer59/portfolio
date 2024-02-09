import { urlFor } from "@/sanity/lib/client";
import { getGalleryImageByIndex, getGalleryImages } from "@/sanity/queries/galleries";
import { Metadata, ResolvingMetadata } from "next";
import GalleryPage from "./GalleryPage";

export async function generateStaticParams() {
  return [{ id: '1' }, { id: '2' }]
}


export async function generateMetadata(
  { params, searchParams },
  parent: ResolvingMetadata
): Promise<Metadata> {
  let id = Number(params.photoId);
  const galleryData = await getGalleryImages(params.galleryId)
  const galleryImageData = await getGalleryImageByIndex(params.galleryId, id)
  const ogImages = [urlFor(galleryImageData.image[0]).format("webp").url()]

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
}: {
  params: { galleryId: string, photoId: string }
}) {
  let id = Number(params.photoId);
  const galleryImageData = await getGalleryImageByIndex(params.galleryId, id)
  const galleryData = await getGalleryImages(params.galleryId)

  // const currentPhotoUrl = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_2560/${currentPhoto.public_id}.${currentPhoto.format}`;

  return (
    <>
      <div className="mx-auto max-w-[1960px] p-4">
        <GalleryPage galleryData={galleryData} galleryImageData={galleryImageData} photoId={params.photoId} />
      </div>
    </>
  );
}