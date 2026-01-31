'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/utilities/ui'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { ImageCarouselBlock as ImageCarouselBlockType, Media as MediaType } from '@/payload-types'

type Props = ImageCarouselBlockType & {
  className?: string
  disableInnerContainer?: boolean
}

export const ImageCarouselBlock: React.FC<Props> = ({
  images,
  autoplay = true,
  autoplayInterval = '3',
  pauseOnHover = true,
  showThumbnails = true,
  className,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  const thumbnailsRef = useRef<HTMLDivElement>(null)

  const imageCount = images?.length || 0

  const goToNext = useCallback(() => {
    if (imageCount === 0) return
    setHasInteracted(true)
    setCurrentIndex((prev) => (prev + 1) % imageCount)
  }, [imageCount])

  const goToPrev = useCallback(() => {
    if (imageCount === 0) return
    setCurrentIndex((prev) => (prev - 1 + imageCount) % imageCount)
  }, [imageCount])

  const goToIndex = useCallback((index: number) => {
    setHasInteracted(true)
    setCurrentIndex(index)
  }, [])

  // Autoplay effect
  useEffect(() => {
    if (!autoplay || isPaused || imageCount <= 1) return

    const interval = setInterval(() => {
      goToNext()
    }, parseInt(autoplayInterval || '3') * 1000)

    return () => clearInterval(interval)
  }, [autoplay, autoplayInterval, isPaused, goToNext, imageCount])

  // Scroll thumbnail into view when current index changes (only after user interaction)
  useEffect(() => {
    if (!hasInteracted) return
    if (showThumbnails && thumbnailsRef.current) {
      const thumbnailElement = thumbnailsRef.current.children[currentIndex] as HTMLElement
      if (thumbnailElement) {
        thumbnailElement.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center',
        })
      }
    }
  }, [currentIndex, showThumbnails, hasInteracted])

  if (!images || images.length === 0) return null

  const currentImage = images[currentIndex]
  const mediaObj = currentImage?.image as MediaType | undefined
  // Support imageUrl fallback for seed data
  const currentImageUrl = mediaObj?.url || (currentImage as { imageUrl?: string })?.imageUrl
  const currentImageAlt = mediaObj?.alt || currentImage?.caption || `圖片 ${currentIndex + 1}`

  return (
    <div className={cn('w-full', className)}>
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        {/* Main Image Container - 16:9 Aspect Ratio */}
        <div
          className="relative w-full overflow-hidden rounded-lg bg-kinari"
          style={{ paddingBottom: '56.25%' }}
          onMouseEnter={() => pauseOnHover && setIsPaused(true)}
          onMouseLeave={() => pauseOnHover && setIsPaused(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              {currentImageUrl && (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={currentImageUrl}
                  alt={currentImageAlt}
                  className="w-full h-full object-cover"
                />
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          {imageCount > 1 && (
            <>
              <button
                onClick={goToPrev}
                className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-shiro/80 hover:bg-shiro rounded-full flex items-center justify-center shadow-lg transition-colors z-10"
                aria-label="上一張圖片"
              >
                <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-sumi" />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-shiro/80 hover:bg-shiro rounded-full flex items-center justify-center shadow-lg transition-colors z-10"
                aria-label="下一張圖片"
              >
                <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-sumi" />
              </button>
            </>
          )}

          {/* Image Counter */}
          <div className="absolute bottom-4 right-4 bg-sumi/70 text-shiro px-3 py-1 rounded-full text-sm font-medium z-10">
            {currentIndex + 1} / {imageCount}
          </div>

          {/* Caption */}
          {currentImage?.caption && (
            <div className="absolute bottom-4 left-4 right-20 bg-sumi/70 text-shiro px-4 py-2 rounded-lg text-sm z-10">
              {currentImage.caption}
            </div>
          )}
        </div>

        {/* Thumbnails */}
        {showThumbnails && imageCount > 1 && (
          <div
            ref={thumbnailsRef}
            className="flex gap-2 mt-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-hai/30 scrollbar-track-transparent"
          >
            {images.map((item, index) => {
              const thumbMedia = item.image as MediaType | undefined
              const thumbUrl = thumbMedia?.url || (item as { imageUrl?: string })?.imageUrl
              const isActive = index === currentIndex

              return (
                <button
                  key={index}
                  onClick={() => goToIndex(index)}
                  className={cn(
                    'flex-shrink-0 w-20 h-14 md:w-24 md:h-16 rounded overflow-hidden transition-all duration-200',
                    isActive
                      ? 'ring-2 ring-aka ring-offset-2 ring-offset-shiro opacity-100'
                      : 'opacity-60 hover:opacity-100'
                  )}
                  aria-label={`前往第 ${index + 1} 張圖片`}
                >
                  {thumbUrl && (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={thumbUrl}
                      alt={thumbMedia?.alt || `縮圖 ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  )}
                </button>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default ImageCarouselBlock
