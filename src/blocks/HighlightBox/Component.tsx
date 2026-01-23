import React from 'react'
import { cn } from '@/utilities/ui'
import RichText from '@/components/RichText'
import type { HighlightBoxBlock as HighlightBoxBlockType } from '@/payload-types'

type Props = HighlightBoxBlockType & {
  className?: string
}

export const HighlightBoxBlock: React.FC<Props> = ({
  content,
  className,
}) => {
  if (!content) return null

  return (
    // Match static HTML: container > content-narrow > highlight-box
    <div className={cn('max-w-[1200px] mx-auto px-8', className)}>
      <div className="max-w-[800px] mx-auto">
        {/* highlight-box: bg kinari, border-left 2px aka, padding 2rem 4rem, margin 2rem 0 */}
        <div
          style={{
            background: '#F5F3EE',
            borderLeft: '2px solid #E8380D',
            padding: '2rem 4rem',
            marginTop: '4rem',
            marginBottom: '2rem',
          }}
        >
          <div
            className="[&_p]:mb-0 [&_p]:leading-relaxed"
            style={{ color: '#3D3D3D' }}
          >
            <RichText data={content} enableGutter={false} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default HighlightBoxBlock
