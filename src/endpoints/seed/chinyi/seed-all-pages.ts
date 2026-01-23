import type { Payload, PayloadRequest } from 'payload'
import { upsertPage, getAvailablePageSlugs } from './upsert-page'
import { contactForm as contactFormData } from '../contact-form'

type SeedAllOptions = {
  clearFirst?: boolean // 是否先清除現有頁面資料
  req?: PayloadRequest
}

/**
 * 一次建立所有 Chinyi 頁面
 * @param payload - Payload instance
 * @param options - 選項
 *   - clearFirst: true = 先清除再建立（用於初始化）
 *   - clearFirst: false = 只新增/更新（保留其他資料）
 */
export const seedAllChinyiPages = async (
  payload: Payload,
  options: SeedAllOptions = {},
): Promise<void> => {
  const { clearFirst = false, req } = options
  const pageSlugs = getAvailablePageSlugs()

  payload.logger.info('='.repeat(50))
  payload.logger.info('Seeding Chinyi Eggs pages...')
  payload.logger.info(`Mode: ${clearFirst ? 'CLEAR & CREATE (初始化)' : 'UPSERT (新增/更新)'}`)
  payload.logger.info(`Pages to seed: ${pageSlugs.length}`)
  payload.logger.info('='.repeat(50))

  // 如果選擇清除，先刪除所有頁面和表單
  if (clearFirst) {
    payload.logger.info('— Clearing existing pages and forms...')

    if (req) {
      await payload.db.deleteMany({
        collection: 'pages',
        req,
        where: {},
      })
      await payload.db.deleteMany({
        collection: 'forms',
        req,
        where: {},
      })
    } else {
      // 如果沒有 req，使用 payload.delete
      const allPages = await payload.find({
        collection: 'pages',
        limit: 1000,
      })
      for (const page of allPages.docs) {
        await payload.delete({
          collection: 'pages',
          id: page.id,
        })
      }

      const allForms = await payload.find({
        collection: 'forms',
        limit: 1000,
      })
      for (const form of allForms.docs) {
        await payload.delete({
          collection: 'forms',
          id: form.id,
        })
      }
    }

    payload.logger.info('  ✓ Cleared all existing pages and forms')
  }

  // 建立聯絡表單（如果不存在）
  payload.logger.info('— Creating contact form...')
  const existingForm = await payload.find({
    collection: 'forms',
    where: { title: { equals: 'Contact Form' } },
    limit: 1,
  })

  let contactFormId: number
  if (existingForm.docs.length === 0) {
    const newForm = await payload.create({
      collection: 'forms',
      data: contactFormData,
    })
    contactFormId = newForm.id
    payload.logger.info('  ✓ Contact form created')
  } else {
    contactFormId = existingForm.docs[0].id
    payload.logger.info('  ✓ Contact form already exists')
  }

  // 建立所有頁面
  for (const slug of pageSlugs) {
    await upsertPage(payload, slug)
  }

  payload.logger.info('='.repeat(50))
  payload.logger.info(`✓ Successfully seeded ${pageSlugs.length} pages!`)
  payload.logger.info('='.repeat(50))
}

/**
 * 更新 Header 和 Footer 為日式風格
 */
export const seedChinyiGlobals = async (payload: Payload): Promise<void> => {
  payload.logger.info('— Updating Header & Footer to Japanese style...')

  // 取得 contact 頁面的 ID（如果存在）
  const contactPage = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'contact' } },
    limit: 1,
  })
  const contactPageId = contactPage.docs[0]?.id

  await Promise.all([
    payload.updateGlobal({
      slug: 'header',
      data: {
        style: 'japanese',
        logoText: 'CHINYI EGGS',
        showLanguageSwitch: true,
        navItems: [
          {
            link: { type: 'custom', label: 'Company', url: '/about' },
            submenu: [
              { link: { type: 'custom', label: 'About Chinyi', url: '/about' } },
              { link: { type: 'custom', label: 'Corporate Milestones', url: '/milestones' } },
              { link: { type: 'custom', label: 'Quality Control', url: '/quality-control' } },
              { link: { type: 'custom', label: 'Factory Tour', url: '/factory-tour' } },
            ],
          },
          {
            link: { type: 'custom', label: 'Products', url: '/egg-tart-liquid' },
            submenu: [
              { link: { type: 'custom', label: 'Prepared Egg Liquid', url: '/egg-tart-liquid' } },
              { link: { type: 'custom', label: 'Biotech Ingredients', url: '/hydrolyzed-eggshell-membrane' } },
              { link: { type: 'custom', label: 'High-Protein Foods', url: '/egg-white-products' } },
            ],
          },
          {
            link: contactPageId
              ? { type: 'reference', label: 'Contact', reference: { relationTo: 'pages', value: contactPageId } }
              : { type: 'custom', label: 'Contact', url: '/contact' },
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
          { link: { type: 'custom', label: 'Company', url: '/about' } },
          { link: { type: 'custom', label: 'Products', url: '/egg-tart-liquid' } },
          {
            link: contactPageId
              ? { type: 'reference', label: 'Contact', reference: { relationTo: 'pages', value: contactPageId } }
              : { type: 'custom', label: 'Contact', url: '/contact' },
          },
        ],
      },
    }),
  ])

  payload.logger.info('  ✓ Header & Footer updated')
}
