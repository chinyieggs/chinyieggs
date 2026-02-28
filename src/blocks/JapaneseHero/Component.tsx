import React from 'react'
import { cn } from '@/utilities/ui'
import { Media } from '@/components/Media'
import type { JapaneseHeroBlock as JapaneseHeroBlockType, Media as MediaType } from '@/payload-types'

type Props = JapaneseHeroBlockType & {
  className?: string
}

// Minimum heights as fallback when no image is present
const sizeClasses = {
  small: 'md:min-h-[45vh]',
  medium: 'md:min-h-[55vh]',
  large: 'md:min-h-[75vh]',
  full: 'md:min-h-screen',
}

export const JapaneseHeroBlock: React.FC<Props> = ({
  label,
  title,
  subtitle,
  titleFont = 'serif',
  backgroundImage,
  backgroundImageUrl,
  size = 'medium',
  showDivider = true,
  overlayOpacity = 40,
  className,
}) => {
  // Font family based on titleFont prop
  const titleFontFamily = titleFont === 'sans'
    ? "'Source Sans Pro', -apple-system, sans-serif"
    : "'Cormorant Garamond', 'Noto Serif', 'Noto Serif TC', serif"
  const bgImage = backgroundImage as MediaType | undefined
  const imageUrl = bgImage?.url || backgroundImageUrl

  const hasTextContent = label || title || subtitle

  return (
    <section
      className={cn(
        'relative',
        sizeClasses[size as keyof typeof sizeClasses],
        className,
      )}
    >
      {/* Background Image: natural flow */}
      {imageUrl && (
        <>
          <div className="w-full">
            {bgImage ? (
              <Media
                className="w-full"
                resource={bgImage}
                imgClassName="w-full h-auto block"
                priority
              />
            ) : (
              <img src={imageUrl} alt="" className="w-full h-auto block" />
            )}
          </div>
          {/* Overlay - using kinari color like original HTML */}
          <div
            className="absolute inset-0"
            style={{
              backgroundColor: `rgba(245, 243, 238, ${(overlayOpacity ?? 40) / 100})`,
            }}
          />
        </>
      )}

      {/* Content */}
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <div className="text-center px-6 md:px-8 max-w-[600px] mx-auto">
          {/* Label */}
          {label && (
            <p
              className="text-aka uppercase"
              style={{
                fontSize: '0.75rem',
                letterSpacing: '0.3em',
                marginBottom: '2rem',
              }}
            >
              {label}
            </p>
          )}

          {/* Title */}
          {title && (
            <h1
              className="text-sumi"
              style={{
                fontFamily: titleFontFamily,
                fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                fontWeight: 600,
                letterSpacing: '0.02em',
                marginBottom: '1rem',
              }}
            >
              {title}
            </h1>
          )}

          {/* Divider */}
          {showDivider && hasTextContent && (
            <div
              style={{
                width: '60px',
                height: '1px',
                background: '#E8380D',
                margin: '2rem auto',
              }}
            />
          )}

          {/* Subtitle */}
          {subtitle && (
            <p
              className="text-hai"
              style={{
                fontSize: '1rem',
                fontWeight: 400,
                lineHeight: 1.8,
              }}
            >
              {subtitle}
            </p>
          )}
        </div>
      </div>

    </section>
  )
}

export default JapaneseHeroBlock
