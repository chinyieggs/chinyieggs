import type { Config } from 'src/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { unstable_cache } from 'next/cache'

type Global = keyof Config['globals']

async function getGlobal(slug: Global, depth = 0) {
  try {
    const payload = await getPayload({ config: configPromise })

    const global = await payload.findGlobal({
      slug,
      depth,
    })

    return global
  } catch (error) {
    console.error(`Error fetching global ${slug}:`, error)
    // Return empty default based on slug
    if (slug === 'header') {
      return { navItems: [] } as unknown as Config['globals']['header']
    }
    if (slug === 'footer') {
      return { navItems: [] } as unknown as Config['globals']['footer']
    }
    return {} as unknown as Config['globals'][typeof slug]
  }
}

/**
 * Returns a unstable_cache function mapped with the cache tag for the slug
 */
export const getCachedGlobal = (slug: Global, depth = 0) =>
  unstable_cache(async () => getGlobal(slug, depth), [slug], {
    tags: [`global_${slug}`],
    revalidate: 3600, // 快取 1 小時
  })
