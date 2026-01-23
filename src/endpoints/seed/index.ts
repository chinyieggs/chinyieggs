import type { CollectionSlug, GlobalSlug, Payload, PayloadRequest, File } from 'payload'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

import { contactForm as contactFormData } from './contact-form'
import { contact as contactPageData } from './contact-page'
import { homePage } from './pages/home-page'
import { image1 } from './image-1'
import { image2 } from './image-2'
import { imageHero1 } from './image-hero-1'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const collections: CollectionSlug[] = [
  'media',
  'pages',
  'forms',
  'form-submissions',
]

const globals: GlobalSlug[] = ['header', 'footer']

// Next.js revalidation errors are normal when seeding the database without a server running
// i.e. running `yarn seed` locally instead of using the admin UI within an active app
// The app is not running to revalidate the pages and so the API routes are not available
// These error messages can be ignored: `Error hitting revalidate route for...`
export const seed = async ({
  payload,
  req,
}: {
  payload: Payload
  req: PayloadRequest
}): Promise<void> => {
  payload.logger.info('Seeding database...')

  // we need to clear the media directory before seeding
  // as well as the collections and globals
  // this is because while `yarn seed` drops the database
  // the custom `/api/seed` endpoint does not
  payload.logger.info(`— Clearing collections and globals...`)

  // clear the database
  await Promise.all(
    globals.map((global) =>
      payload.updateGlobal({
        slug: global,
        data: {
          navItems: [],
        },
        depth: 0,
        context: {
          disableRevalidate: true,
        },
      }),
    ),
  )

  await Promise.all(
    collections.map((collection) => payload.db.deleteMany({ collection, req, where: {} })),
  )

  await Promise.all(
    collections
      .filter((collection) => Boolean(payload.collections[collection].config.versions))
      .map((collection) => payload.db.deleteVersions({ collection, req, where: {} })),
  )

  payload.logger.info(`— Seeding media...`)

  const [image1Buffer, image2Buffer, hero1Buffer] = await Promise.all([
    readLocalFile('image-post1.webp'),
    readLocalFile('image-post2.webp'),
    readLocalFile('image-hero1.webp'),
  ])

  const [image1Doc, image2Doc, imageHomeDoc] = await Promise.all([
    payload.create({
      collection: 'media',
      data: image1,
      file: image1Buffer,
    }),
    payload.create({
      collection: 'media',
      data: image2,
      file: image2Buffer,
    }),
    payload.create({
      collection: 'media',
      data: imageHero1,
      file: hero1Buffer,
    }),
  ])

  payload.logger.info(`— Seeding contact form...`)

  const contactForm = await payload.create({
    collection: 'forms',
    depth: 0,
    data: contactFormData,
  })

  payload.logger.info(`— Seeding pages...`)

  // Create Chinyi Eggs home page (Japanese style)
  const homePageDoc = await payload.create({
    collection: 'pages',
    depth: 0,
    context: { disableRevalidate: true },
    data: homePage(),
  })

  // Create contact page
  const contactPage = await payload.create({
    collection: 'pages',
    depth: 0,
    context: { disableRevalidate: true },
    data: contactPageData({ contactForm: contactForm }),
  })

  payload.logger.info(`— Seeding globals (Japanese style)...`)

  await Promise.all([
    payload.updateGlobal({
      slug: 'header',
      data: {
        style: 'japanese',
        logoText: 'CHINYI EGGS',
        showLanguageSwitch: true,
        navItems: [
          {
            link: {
              type: 'custom',
              label: 'Company',
              url: '/about',
            },
            submenu: [
              { link: { type: 'custom', label: 'About Chinyi', url: '/about' } },
              { link: { type: 'custom', label: 'Corporate Milestones', url: '/milestones' } },
              { link: { type: 'custom', label: 'Quality Control', url: '/quality-control' } },
              { link: { type: 'custom', label: 'Factory Tour', url: '/factory-tour' } },
            ],
          },
          {
            link: {
              type: 'custom',
              label: 'Products',
              url: '/egg-tart-liquid',
            },
            submenu: [
              { link: { type: 'custom', label: 'Prepared Egg Liquid', url: '/egg-tart-liquid' } },
              { link: { type: 'custom', label: 'Biotech Ingredients', url: '/hydrolyzed-eggshell-membrane' } },
              { link: { type: 'custom', label: 'High-Protein Foods', url: '/egg-white-products' } },
            ],
          },
          {
            link: {
              type: 'reference',
              label: 'Contact',
              reference: {
                relationTo: 'pages',
                value: contactPage.id,
              },
            },
          },
        ],
      },
    }),
    payload.updateGlobal({
      slug: 'footer',
      data: {
        style: 'japanese',
        companyName: 'CHINYI EGGS TECHNOLOGY',
        contactInfo: {
          address: 'No. 37, Xinmin Road, Chiayi City, Taiwan',
          phone: '05-2354049',
        },
        navItems: [
          {
            link: {
              type: 'custom',
              label: 'Company',
              url: '/about',
            },
          },
          {
            link: {
              type: 'custom',
              label: 'Products',
              url: '/egg-tart-liquid',
            },
          },
          {
            link: {
              type: 'reference',
              label: 'Contact',
              reference: {
                relationTo: 'pages',
                value: contactPage.id,
              },
            },
          },
        ],
      },
    }),
  ])

  payload.logger.info('Seeded database successfully!')
}

function readLocalFile(filename: string): File {
  const filePath = path.join(__dirname, filename)
  const data = fs.readFileSync(filePath)
  const ext = path.extname(filename).slice(1)

  return {
    name: filename,
    data: Buffer.from(data),
    mimetype: `image/${ext === 'jpg' ? 'jpeg' : ext}`,
    size: data.byteLength,
  }
}
