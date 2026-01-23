import React from 'react'
import RichText from '@/components/RichText'

import type { ContentBlock as ContentBlockProps, Media as MediaType } from '@/payload-types'

import { CMSLink } from '../../components/Link'

export const ContentBlock: React.FC<ContentBlockProps> = (props) => {
  const { columns } = props

  return (
    <div className="max-w-[1200px] mx-auto px-8" style={{ marginTop: '4rem' }}>
      {/* content-narrow: max-width 800px */}
      <div className="max-w-[800px] mx-auto">
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
                  margin: '2rem 0',
                  borderRadius: '4px',
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
          font-size: 1.5rem;
          margin-bottom: 2rem;
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .content-richtext h3::after {
          content: '';
          flex: 1;
          height: 1px;
          background: #E5E2DB;
          max-width: 100px;
        }
        .content-richtext p {
          margin-bottom: 1.5em;
          line-height: 1.8;
        }
        .content-richtext p:last-child {
          margin-bottom: 0;
        }
      ` }} />
    </div>
  )
}
