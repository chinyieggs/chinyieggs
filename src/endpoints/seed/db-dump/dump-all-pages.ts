/**
 * Dump all CMS content from the database as JSON files.
 * Includes: pages, globals (header/footer), forms, and media list.
 *
 * Run: npx tsx src/endpoints/seed/db-dump/dump-all-pages.ts
 */
import 'dotenv/config'
import { getPayload } from 'payload'
import config from '@payload-config'
import fs from 'fs'
import path from 'path'

const OUTPUT_DIR = path.dirname(new URL(import.meta.url).pathname)

async function main() {
  const payload = await getPayload({ config })

  // === 1. Pages ===
  const { docs: pages } = await payload.find({
    collection: 'pages',
    limit: 100,
    where: { _status: { equals: 'published' } },
    sort: 'slug',
    depth: 0,
  })

  for (const page of pages) {
    const slug = page.slug || 'unknown'
    const data = {
      slug: page.slug,
      title: page.title,
      hero: page.hero,
      layout: page.layout,
      meta: page.meta,
    }
    const outputPath = path.join(OUTPUT_DIR, `${slug}.json`)
    fs.writeFileSync(outputPath, JSON.stringify(data, null, 2), 'utf-8')
    console.log(`  ✓ page: ${slug}`)
  }

  // === 2. Globals (Header & Footer) ===
  const header = await payload.findGlobal({ slug: 'header', depth: 0 })
  fs.writeFileSync(
    path.join(OUTPUT_DIR, '_global-header.json'),
    JSON.stringify(header, null, 2),
    'utf-8',
  )
  console.log('  ✓ global: header')

  const footer = await payload.findGlobal({ slug: 'footer', depth: 0 })
  fs.writeFileSync(
    path.join(OUTPUT_DIR, '_global-footer.json'),
    JSON.stringify(footer, null, 2),
    'utf-8',
  )
  console.log('  ✓ global: footer')

  // === 3. Forms ===
  const { docs: forms } = await payload.find({
    collection: 'forms',
    limit: 10,
    depth: 0,
  })
  if (forms.length > 0) {
    fs.writeFileSync(
      path.join(OUTPUT_DIR, '_forms.json'),
      JSON.stringify(forms, null, 2),
      'utf-8',
    )
    console.log(`  ✓ forms (${forms.length})`)
  }

  // === 4. Media (list only, for reference) ===
  const { docs: media } = await payload.find({
    collection: 'media',
    limit: 500,
    depth: 0,
  })
  if (media.length > 0) {
    const mediaList = media.map((m) => ({
      id: m.id,
      filename: m.filename,
      alt: m.alt,
      url: m.url,
    }))
    fs.writeFileSync(
      path.join(OUTPUT_DIR, '_media.json'),
      JSON.stringify(mediaList, null, 2),
      'utf-8',
    )
    console.log(`  ✓ media (${media.length} files)`)
  } else {
    console.log('  - media: none')
  }

  console.log(`\nDone! Dumped ${pages.length} pages + 2 globals + ${forms.length} forms + ${media.length} media.`)
  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
