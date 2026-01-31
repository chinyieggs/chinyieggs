import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { AnimatedBlock } from '@/components/AnimatedBlock'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { YouTubeBlock } from '@/blocks/YouTube/Component'
// 日式 Blocks
import { JapaneseHeroBlock } from '@/blocks/JapaneseHero/Component'
import { StatsGridBlock } from '@/blocks/StatsGrid/Component'
import { ProductGridBlock } from '@/blocks/ProductGrid/Component'
import { PageNavBlock } from '@/blocks/PageNav/Component'
import { TimelineBlock } from '@/blocks/Timeline/Component'
import { FeatureGridBlock } from '@/blocks/FeatureGrid/Component'
import { HighlightBoxBlock } from '@/blocks/HighlightBox/Component'
import { CheckListBlock } from '@/blocks/CheckList/Component'
import { SpecTableBlock } from '@/blocks/SpecTable/Component'
import { CertificationGridBlock } from '@/blocks/CertificationGrid/Component'
import { SectionIntroBlock } from '@/blocks/SectionIntro/Component'
import { ImageCarouselBlock } from '@/blocks/ImageCarousel/Component'

const blockComponents = {
  // 原有 Blocks
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  youtube: YouTubeBlock,
  // 日式 Blocks
  japaneseHero: JapaneseHeroBlock,
  statsGrid: StatsGridBlock,
  productGrid: ProductGridBlock,
  pageNav: PageNavBlock,
  timeline: TimelineBlock,
  featureGrid: FeatureGridBlock,
  highlightBox: HighlightBoxBlock,
  checkList: CheckListBlock,
  specTable: SpecTableBlock,
  certificationGrid: CertificationGridBlock,
  sectionIntro: SectionIntroBlock,
  imageCarousel: ImageCarouselBlock,
}

// 這些區塊不加額外間距（它們自己有 padding/margin）
const noMarginBlocks = ['japaneseHero', 'sectionIntro', 'certificationGrid', 'mediaBlock', 'content', 'timeline', 'highlightBox', 'featureGrid', 'formBlock']

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              const needsMargin = !noMarginBlocks.includes(blockType)
              return (
                <AnimatedBlock
                  key={index}
                  animation="fade-up"
                  delay={index * 0.05}
                  className={needsMargin ? 'my-16' : ''}
                >
                  {/* @ts-expect-error there may be some mismatch between the expected types here */}
                  <Block {...block} disableInnerContainer />
                </AnimatedBlock>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
