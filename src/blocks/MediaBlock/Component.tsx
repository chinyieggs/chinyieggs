import type { StaticImageData } from 'next/image'

import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'

import type { MediaBlock as MediaBlockProps } from '@/payload-types'

import { Media } from '../../components/Media'

type Props = MediaBlockProps & {
  breakout?: boolean
  captionClassName?: string
  className?: string
  enableGutter?: boolean
  imgClassName?: string
  staticImage?: StaticImageData
  disableInnerContainer?: boolean
}

export const MediaBlock: React.FC<Props> = (props) => {
  const {
    captionClassName,
    className,
    media,
    imageUrl,
    alt,
    staticImage,
    disableInnerContainer,
  } = props

  let caption
  if (media && typeof media === 'object') caption = media.caption

  // Check if we have media or fallback imageUrl
  const hasMedia = media || staticImage
  const hasImageUrl = !hasMedia && imageUrl

  // Get media URL for native img tag
  const mediaObj = media as { url?: string; alt?: string } | undefined
  const mediaSrc = mediaObj?.url || ''
  const mediaAlt = mediaObj?.alt || alt || ''

  return (
    // Match static HTML: container > content-narrow > content-image
    <div className="max-w-[1200px] mx-auto px-8">
      <div className="max-w-[800px] mx-auto">
        {/* content-image: width 100%, margin 2rem 0, border-radius 4px */}
        <div
          style={{
            width: '100%',
            margin: '2rem 0',
            borderRadius: '4px',
            overflow: 'hidden',
          }}
        >
          {hasMedia && mediaSrc && (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={mediaSrc}
              alt={mediaAlt}
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
              }}
            />
          )}
          {hasImageUrl && (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={imageUrl}
              alt={alt || ''}
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
              }}
            />
          )}
        </div>
        {caption && (
          <div
            className={cn(
              'mt-6',
              captionClassName,
            )}
          >
            <RichText data={caption} enableGutter={false} />
          </div>
        )}
      </div>
    </div>
  )
}
