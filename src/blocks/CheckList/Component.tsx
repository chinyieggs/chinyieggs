import React from 'react'
import { cn } from '@/utilities/ui'
import type { CheckListBlock as CheckListBlockType } from '@/payload-types'

type Props = CheckListBlockType & {
  className?: string
}

const iconMap = {
  check: '✓',
  bullet: '•',
  star: '★',
}

export const CheckListBlock: React.FC<Props> = ({
  title,
  items,
  icon = 'check',
  columns = '1',
  className,
}) => {
  if (!items || items.length === 0) return null

  return (
    <section className={cn('py-8 md:py-12', className)}>
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-3xl mx-auto">
          {title && (
            <h3 className="font-serif text-xl md:text-2xl text-sumi mb-6">{title}</h3>
          )}

          <ul
            className={cn(
              'space-y-3',
              columns === '2' && 'md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-3 md:space-y-0',
            )}
          >
            {items.map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <span
                  className={cn(
                    'flex-shrink-0 w-6 h-6 flex items-center justify-center',
                    'text-aka font-medium',
                    icon === 'check' && 'bg-aka/10 rounded-full text-sm',
                    icon === 'bullet' && 'text-xl',
                    icon === 'star' && 'text-ki',
                  )}
                >
                  {icon === 'number' ? index + 1 : iconMap[icon as keyof typeof iconMap]}
                </span>
                <span className="text-sumi leading-relaxed">{item.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default CheckListBlock
