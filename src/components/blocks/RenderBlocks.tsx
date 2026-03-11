import React, { Fragment } from 'react'
import { Page } from '@/payload-types'
import { PageHeaderBlock } from './PageHeaderBlock'
import { HeroBlock } from './HeroBlock'
import { FeaturesBlock } from './FeaturesBlock'
import { TestimonialsBlock } from './TestimonialsBlock'
import { TextBlock } from './TextBlock'
import { CardsType1Block } from './CardsType1Block'
import { CardsType2Block } from './CardsType2Block'
import { LongTextBlock } from './LongTextBlock'

const blockComponents = {
  pageHeader: PageHeaderBlock,
  hero: HeroBlock,
  features: FeaturesBlock,
  testimonials: TestimonialsBlock,
  text: TextBlock,
  cardsType1: CardsType1Block,
  cardsType2: CardsType2Block,
  longText: LongTextBlock,
}

export const RenderBlocks: React.FC<{ blocks: Page['layout'] }> = ({ blocks }) => {
  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (!hasBlocks) return null

  return (
    <Fragment>
      {blocks.map((block, index) => {
        const { blockType } = block

        if (blockType && blockType in blockComponents) {
          const Block = blockComponents[blockType]

          if (Block) {
            return (
              <div key={index}>
               {/* @ts-ignore */}
                <Block {...block} />
              </div>
            )
          }
        }
        return null
      })}
    </Fragment>
  )
}
