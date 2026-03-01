import React from 'react'
import RichText from '@/components/RichText'

import type { ContentBlock as ContentBlockProps, Media as MediaType } from '@/payload-types'

import { CMSLink } from '../../components/Link'

export const ContentBlock: React.FC<ContentBlockProps> = (props) => {
  const { columns } = props

  return (
    <div className="max-w-[1200px] mx-auto px-8" style={{ marginTop: '4rem' }}>
      {/* content-narrow: max-width 800px, centered text */}
      <div className="max-w-[800px] mx-auto text-center">
        {columns &&
          columns.length > 0 &&
          columns.map((col, index) => {
            const {
              enableLink,
              link,
              richText,
              contentType = 'text',
              media,
              mediaPosition = 'above',
            } = col

            const showMedia = (contentType === 'media' || contentType === 'both') && media
            const showText = (contentType === 'text' || contentType === 'both') && richText

            // Get image URL from media
            const mediaObj = media as MediaType | undefined
            const imageUrl = mediaObj?.url || ''
            const imageAlt = mediaObj?.alt || ''

            // Image element matching static HTML .content-image
            const mediaElement = showMedia && imageUrl && (
              <div
                style={{
                  width: '100%',
                  margin: '2.5rem 0',
                  overflow: 'hidden',
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imageUrl}
                  alt={imageAlt}
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                  }}
                />
              </div>
            )

            return (
              <div key={index} style={{ marginBottom: '6rem' }}>
                {mediaPosition === 'above' && mediaElement}

                {showText && (
                  <RichText
                    data={richText}
                    enableGutter={false}
                    className="content-richtext"
                  />
                )}

                {mediaPosition === 'below' && mediaElement}

                {enableLink && <CMSLink {...link} />}
              </div>
            )
          })}
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        .content-richtext h3 {
          font-family: 'Cormorant Garamond', 'Noto Serif', 'Noto Serif TC', serif;
          font-size: 1.75rem;
          font-weight: 700;
          font-style: italic;
          color: hsl(0 0% 8%);
          margin-bottom: 1.5rem;
          margin-top: 3rem;
        }
        .content-richtext h2 {
          font-family: 'Cormorant Garamond', 'Noto Serif', 'Noto Serif TC', serif;
          font-size: clamp(1.75rem, 4vw, 2.25rem);
          font-weight: 700;
          font-style: italic;
          color: hsl(0 0% 8%);
          margin-bottom: 1.5rem;
          margin-top: 3rem;
        }
        .content-richtext p {
          font-family: 'Noto Serif', 'Noto Serif TC', Georgia, serif;
          font-size: 1.0625rem;
          line-height: 1.9;
          letter-spacing: 0.01em;
          color: hsl(0 0% 42%);
          margin-bottom: 1.5em;
        }
        .content-richtext p:last-child {
          margin-bottom: 0;
        }
      ` }} />
    </div>
  )
}
