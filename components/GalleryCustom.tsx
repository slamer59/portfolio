import { default as Image, ImageLoader } from 'next/image';
import Link from 'next/link';
import { useId } from 'react';
import { GalleryCalculationProps, calculateImageSizes } from "./calculateImageSizes";

const containerStyle = {
    display: `flex`,
    flexWrap: `wrap`,
} as const

const elementStyle = (aspectRatio: number, sizes: number[]) =>
    sizes.reduce((acc, val, idx) => ((acc[`--next-gallery-${idx + 1}`] = `${val}%`), acc), {
        '--next-gallery-ar': `${aspectRatio}`,
        position: 'relative',
        boxSizing: `border-box`,
        flexShrink: 0,
        flexGrow: 1,
    } as Record<string, any>)

export type GalleryProps = GalleryCalculationProps & {
    widths: number[]
    galleryId: string | number
    overlay?: (index: number) => React.ReactNode
    gap?: string
    percentVw?: number
    imgLoader?: ImageLoader
}

export function GalleryCustom({ widths, gap = '5px', percentVw = 100, overlay, imgLoader, galleryId, ...props }: GalleryProps) {

    if (widths.length + 1 != props.ratios.length) {
        const isShorter = props.ratios.length < widths.length + 1
        throw new Error(
            `'ratios' array is too ${isShorter ? 'short' : 'long'}. It should have length ${widths.length + 1
            } (because ${widths.length} breakpoints were provided), but has ${props.ratios.length}`
        )
    }
    const [sizes, width_left] = calculateImageSizes(props)
    const id = useId().replace(/:/g, '')

    return (
        <>
            <style>
                {`
                .next-gallery__element-${id} {
                    width: var(--next-gallery-1);
                    padding-bottom: calc(var(--next-gallery-1) / var(--next-gallery-ar));
                }
                .next-gallery__wl-${id} {
                    width: var(--next-gallery-1);
                    flex-shrink: 0,
                    flex-grow: 1,
                }` +
                    widths
                        .map(
                            (width, i) => `
                            @media (min-width: ${width}px) {
                                .next-gallery__element-${id} {
                                    width: var(--next-gallery-${i + 2});
                                    padding-bottom: calc(var(--next-gallery-${i + 2}) / var(--next-gallery-ar));
                                }
                                .next-gallery__wl-${id} {
                                    width: var(--next-gallery-${i + 2});
                                }
                            }`
                        )
                        .join('')}
            </style>
            <div style={containerStyle}>
                {sizes.map((size, i) => (
                    <div
                        className={`next-gallery__element-${id}`}
                        key={i}
                        style={elementStyle(props.images[i].aspect_ratio, size)}
                    >
                        <Link
                            // key={image._ref}
                            href={`/?photoId=${i}`}
                            as={`/photographie/${galleryId}/p/${i}?photoId=${i}`}  //${image.asset._ref}`}
                            // ref={image._ref === Number(lastViewedPhoto) ? lastViewedPhotoRef : null}
                            // ref={image.asset._ref}
                            shallow
                            className="relative block after:content group cursor-zoom-in after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight"
                            style={{
                                position: 'absolute',
                                top: gap,
                                left: gap,
                                right: gap,
                                bottom: gap,
                            }}
                        >
                            <Image
                                key={i}
                                src={props.images[i].src}
                                alt={props.images[i].alt ?? ''}
                                className="transition transform rounded-lg brightness-90 will-change-auto group-hover:brightness-110"
                                placeholder="blur"
                                blurDataURL={props.images[i].lqip}
                                /* @ts-ignore */
                                style={{ transform: "translate3d(0, 0, 0)", objectPosition: `${props.images[0]?.hotspot?.x * 100 || 100}% ${props.images[0]?.hotspot?.y * 100 || 100}%` }}
                                fill
                                loader={imgLoader}
                                sizes={
                                    widths
                                        .map((width, i) => `(max-width: ${width}px) ${(percentVw / 100) * size[i]}vw`)
                                        .join(', ') + `, ${(percentVw / 100) * sizes[sizes.length - 1][i]}vw`
                                }
                                {...(props.images[i].nextImageProps ?? {})}

                            />

                            {overlay && (
                                <div
                                    style={{
                                        position: 'absolute',
                                        top: gap,
                                        left: gap,
                                        right: gap,
                                        bottom: gap,
                                        zIndex: 2,
                                    }}
                                >
                                    {overlay(i)}
                                </div>
                            )}
                        </Link>
                    </div>
                ))}
                <div
                    className={`next-gallery__wl-${id}`}
                    style={width_left.reduce(
                        (acc, val, idx) => ((acc[`--next-gallery-${idx + 1}`] = `${val}%`), acc),
                        {} as Record<string, string>
                    )}
                ></div>
            </div>
        </>
    )
}