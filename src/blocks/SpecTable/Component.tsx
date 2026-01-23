import React from 'react'
import { cn } from '@/utilities/ui'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import type { SpecTableBlock as SpecTableBlockType } from '@/payload-types'

type Props = SpecTableBlockType & {
  className?: string
}

export const SpecTableBlock: React.FC<Props> = ({
  title,
  showHeaders = true,
  columnHeaders,
  rows,
  style = 'striped',
  className,
}) => {
  if (!rows || rows.length === 0) return null

  // Use custom headers or defaults
  const labelHeader = columnHeaders?.labelHeader || 'Item'
  const valueHeader = columnHeaders?.valueHeader || 'Specification'

  return (
    <section className={cn('py-8 md:py-12', className)}>
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-3xl mx-auto">
          {title && (
            <h3 className="font-serif text-xl md:text-2xl text-sumi mb-6">{title}</h3>
          )}

          <div
            className={cn(
              'overflow-hidden',
              style === 'bordered' && 'border border-border rounded-lg',
            )}
          >
            <Table>
              {showHeaders && (
                <TableHeader className={style !== 'minimal' ? 'bg-kinari' : ''}>
                  <TableRow>
                    <TableHead className="text-sumi font-medium w-1/3">{labelHeader}</TableHead>
                    <TableHead className="text-sumi font-medium">{valueHeader}</TableHead>
                  </TableRow>
                </TableHeader>
              )}
              <TableBody>
                {rows.map((row, index) => (
                  <TableRow
                    key={index}
                    className={cn(
                      style === 'striped' && index % 2 === 0 && 'bg-shiro',
                      style === 'striped' && index % 2 !== 0 && 'bg-kinari/50',
                      style === 'bordered' && 'border-b border-border',
                    )}
                  >
                    <TableCell className="text-hai font-medium">{row.label}</TableCell>
                    <TableCell className="text-sumi">{row.value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SpecTableBlock
