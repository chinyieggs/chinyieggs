import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description:
    'Taiwan\'s leading egg products brand specializing in pasteurized liquid eggs, egg biotechnology ingredients, and high-protein foods.',
  images: [
    {
      url: `${getServerSideURL()}/og-image.webp`,
      width: 1200,
      height: 630,
      alt: 'Chinyi Eggs Technology',
    },
  ],
  siteName: 'Chinyi Eggs Technology',
  title: 'Chinyi Eggs Technology',
  locale: 'en_US',
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
