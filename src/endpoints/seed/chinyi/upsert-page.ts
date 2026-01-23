import type { Payload } from 'payload'

// Home
import { homePage } from '../pages/home-page'

// Company Pages
import {
  aboutPage,
  milestonesPage,
  qualityControlPage,
  factoryTourPage,
} from '../pages/company-pages'

// Prepared Liquid Product Pages
import {
  eggTartLiquidPage,
  chawanmushiLiquidPage,
  puddingLiquidPage,
  omeletteLiquidPage,
} from '../pages/prepared-liquid-pages'

// Biotech Product Pages
import {
  hydrolyzedEggshellMembranePage,
  eggshellMembranePage,
  eggshellCalciumPowderPage,
  calcinedEggshellPowderPage,
  eggOilPage,
} from '../pages/biotech-pages'

// High-Protein Food Page
import { eggWhiteProductsPage } from '../pages/egg-white-page'

// Contact Page
import { contactPage } from '../pages/contact-page'

// Contact Form
import { contactForm } from '../contact-form'

// 頁面資料對照表 (excluding contact which needs special handling)
const pageDataMap: Record<string, () => ReturnType<typeof homePage>> = {
  // Home
  home: homePage,

  // Company Pages
  about: aboutPage,
  milestones: milestonesPage,
  'quality-control': qualityControlPage,
  'factory-tour': factoryTourPage,

  // Prepared Liquid Products
  'egg-tart-liquid': eggTartLiquidPage,
  'chawanmushi-liquid': chawanmushiLiquidPage,
  'pudding-liquid': puddingLiquidPage,
  'omelette-liquid': omeletteLiquidPage,

  // Biotech Products
  'hydrolyzed-eggshell-membrane': hydrolyzedEggshellMembranePage,
  'eggshell-membrane': eggshellMembranePage,
  'eggshell-calcium-powder': eggshellCalciumPowderPage,
  'calcined-eggshell-powder': calcinedEggshellPowderPage,
  'egg-oil': eggOilPage,

  // High-Protein Foods
  'egg-white-products': eggWhiteProductsPage,

  // Contact - handled specially in upsertPage
  contact: () => contactPage(),
}

/**
 * 確保 Contact Form 存在並返回其 ID
 */
const ensureContactForm = async (payload: Payload): Promise<number | string> => {
  // 檢查 contact form 是否已存在
  const existing = await payload.find({
    collection: 'forms',
    where: {
      title: { equals: 'Contact Form' },
    },
    limit: 1,
  })

  if (existing.docs.length > 0) {
    payload.logger.info('  — Contact Form already exists')
    return existing.docs[0].id
  }

  // 建立新的 contact form
  const newForm = await payload.create({
    collection: 'forms',
    data: contactForm,
  })

  payload.logger.info('  ✓ Created Contact Form')
  return newForm.id
}

/**
 * 單獨建立或更新一個頁面（不清除其他資料）
 * @param payload - Payload instance
 * @param pageSlug - 頁面 slug（例如 'home', 'about'）
 */
export const upsertPage = async (payload: Payload, pageSlug: string): Promise<void> => {
  // Special handling for contact page - need to create form first
  if (pageSlug === 'contact') {
    const formId = await ensureContactForm(payload)
    const pageData = contactPage(formId)

    payload.logger.info(`— Upserting page: ${pageSlug}...`)

    // 檢查頁面是否已存在
    const existing = await payload.find({
      collection: 'pages',
      where: {
        slug: { equals: pageSlug },
      },
      limit: 1,
    })

    if (existing.docs.length > 0) {
      await payload.update({
        collection: 'pages',
        id: existing.docs[0].id,
        data: pageData,
        context: { disableRevalidate: true },
      })
      payload.logger.info(`  ✓ Updated existing page: ${pageSlug}`)
    } else {
      await payload.create({
        collection: 'pages',
        data: pageData,
        context: { disableRevalidate: true },
      })
      payload.logger.info(`  ✓ Created new page: ${pageSlug}`)
    }
    return
  }

  const getPageData = pageDataMap[pageSlug]

  if (!getPageData) {
    const availablePages = Object.keys(pageDataMap).join(', ')
    throw new Error(`Unknown page: "${pageSlug}". Available pages: ${availablePages}`)
  }

  const pageData = getPageData()

  payload.logger.info(`— Upserting page: ${pageSlug}...`)

  // 檢查頁面是否已存在
  const existing = await payload.find({
    collection: 'pages',
    where: {
      slug: { equals: pageSlug },
    },
    limit: 1,
  })

  if (existing.docs.length > 0) {
    // 更新現有頁面
    await payload.update({
      collection: 'pages',
      id: existing.docs[0].id,
      data: pageData,
      context: { disableRevalidate: true },
    })
    payload.logger.info(`  ✓ Updated existing page: ${pageSlug}`)
  } else {
    // 建立新頁面
    await payload.create({
      collection: 'pages',
      data: pageData,
      context: { disableRevalidate: true },
    })
    payload.logger.info(`  ✓ Created new page: ${pageSlug}`)
  }
}

/**
 * 取得所有可用的頁面 slug 列表
 */
export const getAvailablePageSlugs = (): string[] => {
  return Object.keys(pageDataMap)
}
