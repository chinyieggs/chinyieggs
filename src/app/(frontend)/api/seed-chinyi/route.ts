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
 * GET /api/seed-chinyi?page=home           - 單獨建立首頁
 * GET /api/seed-chinyi?page=about          - 單獨建立 About 頁面
 * GET /api/seed-chinyi?all=true            - 建立所有頁面（不清除）
 * GET /api/seed-chinyi?all=true&clear=true - 清除並建立所有頁面
 * GET /api/seed-chinyi?globals=true        - 更新 Header/Footer
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
    const page = url.searchParams.get('page')
    const all = url.searchParams.get('all') === 'true'
    const clear = url.searchParams.get('clear') === 'true'
    const globals = url.searchParams.get('globals') === 'true'

    // 顯示使用說明
    if (!page && !all && !globals) {
      const availablePages = getAvailablePageSlugs()
      return Response.json({
        message: 'Chinyi Pages Seed API',
        usage: {
          '單獨建立頁面': '/api/seed-chinyi?page=home',
          '建立所有頁面': '/api/seed-chinyi?all=true',
          '清除並建立所有': '/api/seed-chinyi?all=true&clear=true',
          '更新 Header/Footer': '/api/seed-chinyi?globals=true',
        },
        availablePages,
      })
    }

    // 單獨建立某個頁面
    if (page) {
      await upsertPage(payload, page)
      return Response.json({
        success: true,
        message: `Page "${page}" has been created/updated.`,
      })
    }

    // 建立所有頁面
    if (all) {
      await seedAllChinyiPages(payload, { clearFirst: clear })
      return Response.json({
        success: true,
        message: clear
          ? 'All pages cleared and recreated.'
          : 'All pages created/updated.',
      })
    }

    // 更新 Header/Footer
    if (globals) {
      await seedChinyiGlobals(payload)
      return Response.json({
        success: true,
        message: 'Header and Footer updated to Japanese style.',
      })
    }

    return Response.json({ error: 'Invalid request' }, { status: 400 })
  } catch (error) {
    console.error('Seed error:', error)
    return Response.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 },
    )
  }
}
