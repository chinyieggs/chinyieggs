import React from 'react'
import { getServerSideURL } from '@/utilities/getURL'
import { labelMap } from './constants'

interface BreadcrumbJsonLdProps {
  slug: string
}

export const BreadcrumbJsonLd: React.FC<BreadcrumbJsonLdProps> = ({ slug }) => {
  // Homepage doesn't need breadcrumb JSON-LD
  if (slug === 'home') return null

  const serverUrl = getServerSideURL()
  const label =
    labelMap[slug] || slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: serverUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: label,
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
