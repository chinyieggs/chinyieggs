import { getPayload } from 'payload'
import config from '@payload-config'
import { headers } from 'next/headers'
import {
  upsertPage,
  seedAllChinyiPages,
  seedChinyiGlobals,
  getAvailablePageSlugs,
} from '@/endpoints/seed/chinyi'

/**
 * Chinyi Pages Seed API
 *
 * 使用方式：
 * GET /api/seed-chinyi                     - 顯示使用說明
 * GET /api/seed-chinyi?upsert=true         - 同步所有資料（頁面+表單+Header/Footer）
 * GET /api/seed-chinyi?clear=true          - 清除所有頁面和表單
 * GET /api/seed-chinyi?page=home           - 單獨建立首頁（開發用）
 * GET /api/seed-chinyi?globals=true        - 只更新 Header/Footer（開發用）
 * GET /api/seed-chinyi?cleanup=true        - 刪除無標題的孤立頁面
 */
export async function GET(request: Request): Promise<Response> {
  try {
    const payload = await getPayload({ config })
    const requestHeaders = await headers()

    // 驗證是否登入
    const { user } = await payload.auth({ headers: requestHeaders })
    if (!user) {
      return Response.json(
        { error: 'Unauthorized. Please login to admin first.' },
        { status: 401 },
      )
    }

    const url = new URL(request.url)
    const upsert = url.searchParams.get('upsert') === 'true'
    const clear = url.searchParams.get('clear') === 'true'
    const page = url.searchParams.get('page')
    const globals = url.searchParams.get('globals') === 'true'
    const cleanup = url.searchParams.get('cleanup') === 'true'

    // 清理無標題的孤立頁面
    if (cleanup) {
      const allPages = await payload.find({
        collection: 'pages',
        limit: 1000,
        draft: true,
        overrideAccess: true,
      })
      const orphans = allPages.docs.filter((p) => !p.title || !p.slug)
      for (const p of orphans) {
        await payload.delete({
          collection: 'pages',
          id: p.id,
          overrideAccess: true,
          context: { disableRevalidate: true },
        })
      }
      return Response.json({
        success: true,
        message: `Cleaned up ${orphans.length} orphan page(s) without title/slug.`,
        deleted: orphans.map((p) => ({ id: p.id, title: p.title, slug: p.slug })),
      })
    }

    // 同步所有資料（upsert 頁面+表單+Header/Footer）
    if (upsert) {
      await seedAllChinyiPages(payload, { clearFirst: false })
      await seedChinyiGlobals(payload)
      return Response.json({
        success: true,
        message: 'All pages, forms, header and footer synced.',
      })
    }

    // 清除所有頁面和表單（不重建）
    if (clear) {
      const allPages = await payload.find({ collection: 'pages', limit: 1000 })
      for (const p of allPages.docs) {
        await payload.delete({ collection: 'pages', id: p.id })
      }
      const allForms = await payload.find({ collection: 'forms', limit: 1000 })
      for (const f of allForms.docs) {
        await payload.delete({ collection: 'forms', id: f.id })
      }
      return Response.json({
        success: true,
        message: `Cleared ${allPages.docs.length} pages and ${allForms.docs.length} forms.`,
      })
    }

    // 單獨建立某個頁面（開發用）
    if (page) {
      await upsertPage(payload, page)
      return Response.json({
        success: true,
        message: `Page "${page}" has been created/updated.`,
      })
    }

    // 更新 Header/Footer（開發用）
    if (globals) {
      await seedChinyiGlobals(payload)
      return Response.json({
        success: true,
        message: 'Header and Footer updated to Japanese style.',
      })
    }

    // 顯示使用說明
    const availablePages = getAvailablePageSlugs()
    return Response.json({
      message: 'Chinyi Pages Seed API',
      usage: {
        '同步所有資料': '/api/seed-chinyi?upsert=true',
        '清除所有資料': '/api/seed-chinyi?clear=true',
        '單獨建立頁面': '/api/seed-chinyi?page=home',
        '更新 Header/Footer': '/api/seed-chinyi?globals=true',
        '清理孤立頁面': '/api/seed-chinyi?cleanup=true',
      },
      availablePages,
    })
  } catch (error) {
    console.error('Seed error:', error)
    return Response.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 },
    )
  }
}
