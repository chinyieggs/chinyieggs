import React from 'react'
import { cn } from '@/utilities/ui'

import type { YouTubeBlock as YouTubeBlockProps } from '@/payload-types'

// 從 YouTube URL 中提取影片 ID
function getYouTubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\s?]+)/,
    /youtube\.com\/shorts\/([^&\s?]+)/,
  ]

  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match) return match[1]
  }

  return null
}

// 根據比例計算 padding-bottom 百分比
function getAspectRatioPadding(aspectRatio: string): string {
  switch (aspectRatio) {
    case '16:9':
      return '56.25%'
    case '4:3':
      return '75%'
    case '1:1':
      return '100%'
    case '9:16':
      return '177.78%'
    default:
      return '56.25%'
  }
}

export const YouTubeBlock: React.FC<YouTubeBlockProps> = (props) => {
  const { url, title, width = 100, aspectRatio = '16:9' } = props

  if (!url) return null

  const videoId = getYouTubeId(url)
  if (!videoId) {
    return (
      <div className="container my-8">
        <p className="text-red-500">無效的 YouTube 網址</p>
      </div>
    )
  }

  const embedUrl = `https://www.youtube.com/embed/${videoId}`
  const paddingBottom = getAspectRatioPadding(aspectRatio || '16:9')

  return (
    <div className="container my-8">
      <div
        style={{ width: `${width}%` }}
        className={cn('mx-auto')}
      >
        <div
          className="relative w-full overflow-hidden rounded-lg"
          style={{ paddingBottom }}
        >
          <iframe
            className="absolute top-0 left-0 w-full h-full border-0"
            src={embedUrl}
            title={title || 'YouTube 影片'}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  )
}
