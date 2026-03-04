'use client'

import React from 'react'
import { cn } from '@/utilities/ui'
import { Media } from '@/components/Media'
import { Separator } from '@/components/ui/separator'
import { AnimatedSection } from '@/components/AnimatedSection'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import RichText from '@/components/RichText'
import { Check } from 'lucide-react'
import type { ProductCatalogBlock as ProductCatalogBlockType, Media as MediaType } from '@/payload-types'

type Props = ProductCatalogBlockType & {
  className?: string
}

const columnClasses = {
  '2': 'grid-cols-1 md:grid-cols-2',
  '3': 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  '4': 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
}

export const ProductCatalogBlock: React.FC<Props> = ({
  sectionLabel,
  sectionTitle,
  items,
  columns = '3',
  backgroundColor = 'shiro',
  className,
}) => {
  if (!items || items.length === 0) return null

  const columnClass = columnClasses[columns as keyof typeof columnClasses] || columnClasses['3']
  const bgClass = backgroundColor === 'kinari' ? 'bg-kinari' : 'bg-shiro'

  return (
    <section className={cn('py-12 md:py-section-sm lg:py-section', bgClass, className)}>
      <div className="container mx-auto px-4 md:px-8">
        {/* Section Header */}
        {(sectionLabel || sectionTitle) && (
          <div className="text-center mb-12 md:mb-16">
            {sectionLabel && (
              <p className="text-sm tracking-[0.3em] text-hai uppercase mb-3">
                {sectionLabel}
              </p>
            )}
            {sectionTitle && (
              <h2 className="font-serif text-3xl md:text-4xl text-sumi mb-4">
                {sectionTitle}
              </h2>
            )}
            <Separator className="w-16 mx-auto bg-aka" />
          </div>
        )}

        {/* Product Grid */}
        <div className={cn('grid gap-8', columnClass)}>
          {items.map((item, index) => (
            <ProductCard key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

type CardProps = {
  item: NonNullable<ProductCatalogBlockType['items']>[number]
  index: number
}

const ProductCard: React.FC<CardProps> = ({ item, index }) => {
  const [open, setOpen] = React.useState(false)
  const image = item.image as MediaType | undefined
  const imageUrl = image?.url || item.imageUrl

  return (
    <AnimatedSection animation="fade-up" delay={index * 0.06}>
      <Dialog open={open} onOpenChange={setOpen}>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="group bg-kinari overflow-hidden transition-shadow hover:shadow-lg w-full text-left"
        >
          {/* Image */}
          {imageUrl && (
            <div className="relative aspect-[4/3] overflow-hidden">
              {image ? (
                <Media
                  resource={image}
                  fill
                  imgClassName="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url(${imageUrl})` }}
                />
              )}
            </div>
          )}

          {/* Content */}
          <div className="p-6">
            {item.title && (
              <h3 className="font-serif text-xl md:text-2xl text-sumi mb-1">
                {item.title}
              </h3>
            )}
            {item.subtitle && (
              <p className="text-sm text-hai mb-3">{item.subtitle}</p>
            )}
            <Separator className="w-8 bg-aka/50 mb-4" />
            <span className="text-sm text-aka group-hover:text-aka-dark transition-colors">
              View Details →
            </span>
          </div>
        </button>

        <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto bg-shiro p-0">
          <ProductModal item={item} />
        </DialogContent>
      </Dialog>
    </AnimatedSection>
  )
}

type ModalProps = {
  item: NonNullable<ProductCatalogBlockType['items']>[number]
}

const ProductModal: React.FC<ModalProps> = ({ item }) => {
  const image = item.image as MediaType | undefined
  const imageUrl = image?.url || item.imageUrl
  const hasFeatures = item.features && item.features.length > 0
  const hasSpecs = item.specs && item.specs.length > 0
  const hasAppImages = item.applicationImages && item.applicationImages.length > 0

  return (
    <div>
      {/* Hero image */}
      {imageUrl && (
        <div className="relative aspect-[16/9] overflow-hidden">
          {image ? (
            <Media
              resource={image}
              fill
              imgClassName="object-cover"
            />
          ) : (
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${imageUrl})` }}
            />
          )}
        </div>
      )}

      <div className="p-6 md:p-8">
        <DialogHeader className="text-left mb-2">
          <DialogTitle className="font-serif text-2xl md:text-3xl text-sumi">
            {item.title}
          </DialogTitle>
          {item.subtitle && (
            <DialogDescription className="text-hai text-base">
              {item.subtitle}
            </DialogDescription>
          )}
        </DialogHeader>

        <Separator className="w-12 bg-aka mb-6" />

        {/* Description */}
        {item.description && (
          <div className="mb-8">
            <RichText
              data={item.description}
              enableGutter={false}
              enableProse
              className="text-sumi prose-sm"
            />
          </div>
        )}

        {/* Features */}
        {hasFeatures && (
          <div className="mb-8">
            <h4 className="font-serif text-lg text-sumi mb-3">Features</h4>
            <ul className="space-y-2">
              {item.features!.map((feature, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-sumi">
                  <Check className="h-4 w-4 text-aka mt-0.5 shrink-0" />
                  <span>{feature.text}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Specs */}
        {hasSpecs && (
          <div className="mb-8">
            <h4 className="font-serif text-lg text-sumi mb-3">Specifications</h4>
            <div className="border border-kinari overflow-hidden rounded">
              {item.specs!.map((spec, i) => (
                <div
                  key={i}
                  className={cn(
                    'flex text-sm',
                    i % 2 === 0 ? 'bg-kinari/50' : 'bg-shiro',
                  )}
                >
                  <span className="w-1/3 p-3 font-medium text-sumi">{spec.label}</span>
                  <span className="w-2/3 p-3 text-hai">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Application images */}
        {hasAppImages && (
          <div>
            <h4 className="font-serif text-lg text-sumi mb-3">Applications</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {item.applicationImages!.map((appImg, i) => {
                const appImage = appImg.image as MediaType | undefined
                const appImageUrl = appImage?.url || appImg.imageUrl

                if (!appImageUrl) return null

                return (
                  <div key={i}>
                    <div className="relative aspect-[4/3] overflow-hidden rounded">
                      {appImage ? (
                        <Media
                          resource={appImage}
                          fill
                          imgClassName="object-cover"
                        />
                      ) : (
                        <div
                          className="absolute inset-0 bg-cover bg-center"
                          style={{ backgroundImage: `url(${appImageUrl})` }}
                        />
                      )}
                    </div>
                    {appImg.caption && (
                      <p className="text-xs text-hai mt-1 text-center">{appImg.caption}</p>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductCatalogBlock
