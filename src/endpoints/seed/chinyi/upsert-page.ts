import type { Payload, RequiredDataFromCollectionSlug } from 'payload'

// Code-based page definitions (fallback)
import { homePage } from '../pages/home-page'
import {
  aboutPage,
  milestonesPage,
  qualityControlPage,
  factoryTourPage,
} from '../pages/company-pages'
import {
  eggTartLiquidPage,
  chawanmushiLiquidPage,
  puddingLiquidPage,
  omeletteLiquidPage,
} from '../pages/prepared-liquid-pages'
import {
  hydrolyzedEggshellMembranePage,
  eggshellMembranePage,
  eggshellCalciumPowderPage,
  calcinedEggshellPowderPage,
  eggOilPage,
} from '../pages/biotech-pages'
import { eggWhiteProductsPage } from '../pages/egg-white-page'
import { eggWhiteProductsPageV2 } from '../pages/egg-white-page-v2'
import { contactPage } from '../pages/contact-page'
import { contactForm } from '../contact-form'

// db-dump JSON（含 media ID 的完整頁面資料）
import dumpHome from '../db-dump/home.json'
import dumpAbout from '../db-dump/about.json'
import dumpMilestones from '../db-dump/milestones.json'
import dumpQualityControl from '../db-dump/quality-control.json'
import dumpFactoryTour from '../db-dump/factory-tour.json'
import dumpEggTartLiquid from '../db-dump/egg-tart-liquid.json'
import dumpChawanmushiLiquid from '../db-dump/chawanmushi-liquid.json'
import dumpPuddingLiquid from '../db-dump/pudding-liquid.json'
import dumpOmeletteLiquid from '../db-dump/omelette-liquid.json'
import dumpHydrolyzedEggshellMembrane from '../db-dump/hydrolyzed-eggshell-membrane.json'
import dumpEggshellMembrane from '../db-dump/eggshell-membrane.json'
import dumpEggshellCalciumPowder from '../db-dump/eggshell-calcium-powder.json'
import dumpCalcinedEggshellPowder from '../db-dump/calcined-eggshell-powder.json'
import dumpEggOil from '../db-dump/egg-oil.json'
import dumpEggWhiteProducts from '../db-dump/egg-white-products.json'
import dumpContact from '../db-dump/contact.json'

// db-dump 資料對照表（優先使用，含 media ID）
const dumpDataMap: Record<string, Record<string, unknown>> = {
  home: dumpHome,
  about: dumpAbout,
  milestones: dumpMilestones,
  'quality-control': dumpQualityControl,
  'factory-tour': dumpFactoryTour,
  'egg-tart-liquid': dumpEggTartLiquid,
  'chawanmushi-liquid': dumpChawanmushiLiquid,
  'pudding-liquid': dumpPuddingLiquid,
  'omelette-liquid': dumpOmeletteLiquid,
  'hydrolyzed-eggshell-membrane': dumpHydrolyzedEggshellMembrane,
  'eggshell-membrane': dumpEggshellMembrane,
  'eggshell-calcium-powder': dumpEggshellCalciumPowder,
  'calcined-eggshell-powder': dumpCalcinedEggshellPowder,
  'egg-oil': dumpEggOil,
  'egg-white-products': dumpEggWhiteProducts,
  contact: dumpContact,
}

// Fallback 頁面資料對照表（程式碼定義，不含 media ID）
const codeDataMap: Record<string, () => ReturnType<typeof homePage>> = {
  home: homePage,
  about: aboutPage,
  milestones: milestonesPage,
  'quality-control': qualityControlPage,
  'factory-tour': factoryTourPage,
  'egg-tart-liquid': eggTartLiquidPage,
  'chawanmushi-liquid': chawanmushiLiquidPage,
  'pudding-liquid': puddingLiquidPage,
  'omelette-liquid': omeletteLiquidPage,
  'hydrolyzed-eggshell-membrane': hydrolyzedEggshellMembranePage,
  'eggshell-membrane': eggshellMembranePage,
  'eggshell-calcium-powder': eggshellCalciumPowderPage,
  'calcined-eggshell-powder': calcinedEggshellPowderPage,
  'egg-oil': eggOilPage,
  'egg-white-products': eggWhiteProductsPageV2,
  contact: () => contactPage(),
}

/**
 * 確保 Contact Form 存在並與 seed 資料同步
 */
const ensureContactForm = async (payload: Payload): Promise<number | string> => {
  const existing = await payload.find({
    collection: 'forms',
    where: {
      title: { equals: 'Contact Form' },
    },
    limit: 1,
  })

  if (existing.docs.length > 0) {
    await payload.update({
      collection: 'forms',
      id: existing.docs[0].id,
      data: contactForm,
    })
    payload.logger.info('  ✓ Updated Contact Form')
    return existing.docs[0].id
  }

  const newForm = await payload.create({
    collection: 'forms',
    data: contactForm,
  })

  payload.logger.info('  ✓ Created Contact Form')
  return newForm.id
}

/**
 * 單獨建立或更新一個頁面（不清除其他資料）
 * 優先使用 db-dump JSON（保留 media ID），找不到才用程式碼定義
 */
export const upsertPage = async (payload: Payload, pageSlug: string): Promise<void> => {
  // Contact 頁面需要先建立 form
  if (pageSlug === 'contact') {
    await ensureContactForm(payload)
  }

  // 1. 優先從 db-dump 讀取（含 media 關聯）
  const dumpData = dumpDataMap[pageSlug]

  let pageData: RequiredDataFromCollectionSlug<'pages'>
  let source: string

  if (dumpData) {
    pageData = { ...dumpData, _status: 'published' } as RequiredDataFromCollectionSlug<'pages'>
    source = 'db-dump'
  } else {
    // 2. Fallback 到程式碼定義
    const getPageData = codeDataMap[pageSlug]
    if (!getPageData) {
      const availablePages = Object.keys(codeDataMap).join(', ')
      throw new Error(`Unknown page: "${pageSlug}". Available pages: ${availablePages}`)
    }
    pageData = getPageData()
    source = 'code'
  }

  payload.logger.info(`— Upserting page: ${pageSlug} (source: ${source})...`)

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
}

/**
 * 取得所有可用的頁面 slug 列表
 */
export const getAvailablePageSlugs = (): string[] => {
  const allSlugs = new Set([...Object.keys(dumpDataMap), ...Object.keys(codeDataMap)])
  return Array.from(allSlugs)
}
