import type { Metadata } from 'next'

import type { Media, Page, Config } from '../payload-types'

import { mergeOpenGraph } from './mergeOpenGraph'
import { getServerSideURL } from './getURL'

const getImageURL = (image?: Media | Config['db']['defaultIDType'] | null) => {
  const serverUrl = getServerSideURL()

  let url = serverUrl + '/og-image.webp'

  if (image && typeof image === 'object' && 'url' in image) {
    const ogUrl = image.sizes?.og?.url

    url = ogUrl ? serverUrl + ogUrl : serverUrl + image.url
  }

  return url
}

export const generateMeta = async (args: {
  doc: Partial<Page> | null
}): Promise<Metadata> => {
  const { doc } = args

  const ogImage = getImageURL(doc?.meta?.image)

  const rawTitle = doc?.meta?.title
    ? doc.meta.title.replace(/\s*\|\s*Payload Website Template/gi, '').trim()
    : ''

  const title = rawTitle || 'Chinyi Eggs Technology'

  return {
    description: doc?.meta?.description,
    openGraph: mergeOpenGraph({
      description: doc?.meta?.description || '',
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
      title,
      url: Array.isArray(doc?.slug) ? doc?.slug.join('/') : '/',
    }),
    title,
    alternates: {
      canonical: doc?.slug && doc.slug !== 'home' ? `/${doc.slug}` : '/',
      languages: {
        'en': `https://en.chinyieggs.com${doc?.slug && doc.slug !== 'home' ? `/${doc.slug}` : ''}`,
        'zh-Hant': `https://tw.chinyieggs.com${doc?.slug && doc.slug !== 'home' ? `/${doc.slug}` : ''}`,
      },
    },
  }
}
