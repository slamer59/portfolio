/* eslint-disable no-unused-vars */
export interface ImageProps {
	id: number;
	alt: string;
	title?: string;
	description?: string;
	blurDataUrl?: string;
	dimensions?: {
		height: number;
		width: number;
		aspectRatio?: number;
	};
}

export interface SharedModalProps {
	index: number;
	images?: ImageProps[];
	currentPhoto?: ImageProps;
	changePhotoId: (newVal: number) => void;
	closeModal: () => void;
	navigation: boolean;
	direction?: number;
	galleryTitle?: string;
	galleryDescription?: string;
	publishedDate?: string;
}
