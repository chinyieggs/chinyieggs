import React from 'react'
import { cn } from '@/utilities/ui'
import { Media } from '@/components/Media'
import type { JapaneseHeroBlock as JapaneseHeroBlockType, Media as MediaType } from '@/payload-types'

type Props = JapaneseHeroBlockType & {
  className?: string
}

// Match original CSS: .hero = 100vh, .hero-small = 50vh
const sizeClasses = {
  small: 'min-h-[50vh]',
  medium: 'min-h-[70vh]',
  large: 'min-h-[100vh]',
  full: 'min-h-screen',
}

export const JapaneseHeroBlock: React.FC<Props> = ({
  label,
  title,
  subtitle,
  titleFont = 'serif',
  backgroundImage,
  backgroundImageUrl,
  size = 'medium',
  overlayOpacity = 40,
  className,
}) => {
  // Font family based on titleFont prop
  const titleFontFamily = titleFont === 'sans'
    ? "'Source Sans Pro', -apple-system, sans-serif"
    : "'Cormorant Garamond', 'Noto Serif', 'Noto Serif TC', serif"
  const bgImage = backgroundImage as MediaType | undefined
  const imageUrl = bgImage?.url || backgroundImageUrl

  return (
    <section
      className={cn(
        'relative flex items-center justify-center overflow-hidden',
        sizeClasses[size as keyof typeof sizeClasses],
        className,
      )}
    >
      {/* Background Image */}
      {imageUrl && (
        <div className="absolute inset-0">
          {bgImage ? (
            <Media
              resource={bgImage}
              fill
              imgClassName="object-cover"
              priority
            />
          ) : (
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${imageUrl})` }}
            />
          )}
          {/* Overlay - using kinari color like original HTML */}
          <div
            className="absolute inset-0"
            style={{
              backgroundColor: 'rgba(245, 243, 238, 0.85)',
            }}
          />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 text-center px-8 max-w-[600px] mx-auto">
        {/* Label - 0.75rem, letter-spacing 0.3em, margin-bottom 2rem */}
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

        {/* Title - clamp(2.5rem, 6vw, 4rem), margin-bottom 1rem */}
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

        {/* Divider - 60px width, margin 2rem auto */}
        <div
          style={{
            width: '60px',
            height: '1px',
            background: '#E8380D',
            margin: '2rem auto',
          }}
        />

        {/* Subtitle - 1rem, line-height 1.8 */}
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
    </section>
  )
}

export default JapaneseHeroBlock
