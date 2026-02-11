import React, { Fragment } from 'react'
import { Page } from '@/payload-types'
import { PageHeaderBlock } from './PageHeaderBlock'
import { HeroBlock } from './HeroBlock'
import { FeaturesBlock } from './FeaturesBlock'

const blockComponents = {
  pageHeader: PageHeaderBlock,
  hero: HeroBlock,
  features: FeaturesBlock,
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
